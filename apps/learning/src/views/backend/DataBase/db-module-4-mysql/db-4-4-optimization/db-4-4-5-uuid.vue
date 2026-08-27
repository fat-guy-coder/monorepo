<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">🔑 UUID 主键：底层算法与优缺点</h1>
          <p class="text-sm text-gray-500 mt-1">为什么 Go 后端用 uuid.NewString() 生成主键？128 位到底怎么来的、存数据库划算吗？</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/backend/internal/repository/menu_repo.go" label="📝 查看 Go 源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">db-4-4-5</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- ============ 1. UUID 是什么 ============ -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          UUID 是什么：一个 128 位的全球唯一标识
        </h2>
        <p class="text-gray-600 mb-4 leading-relaxed">
          <strong>UUID</strong>（Universally Unique Identifier，通用唯一标识符）是一个
          <strong>128 位</strong>（16 字节）的数字，标准由 <strong>RFC 4122</strong> 定义。
          它不需要中心服务器协调，任何一台机器都能独立生成「理论上不重复」的 ID——这正是后端分布式场景最需要的能力。
        </p>

        <div class="bg-gray-50 rounded-lg p-4 mb-4 font-mono text-sm text-gray-700 overflow-x-auto">
          <span class="text-gray-400">// 32 位十六进制 + 4 个连字符，形如：</span><br/>
          <span class="text-cyan-700">550e8400-e29b-41d4-a716-446655440000</span><br/><br/>
          <span class="text-gray-400">// 结构：8-4-4-4-12</span><br/>
          550e8400 <span class="text-gray-400">-</span> e29b <span class="text-gray-400">-</span> 41d4 <span class="text-gray-400">-</span> a716 <span class="text-gray-400">-</span> 446655440000
        </div>

        <p class="text-gray-600 mb-4 leading-relaxed">
          这 128 位不是随便 128 个随机 bit——其中 122 位是数据，<strong>4 位版本号</strong>（version）、
          <strong>2 位变体位</strong>（variant）用于标注「这个 UUID 是哪个算法生成的、走哪条兼容规则」。
          这就决定了同一串 32 位十六进制，不同版本读出来的含义完全不同。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          UUID 就像 <code class="text-xs">crypto.randomUUID()</code>（浏览器原生 API）生成的 ID——
          Vue 项目里 <code class="text-xs">nanoid</code> 生成短 ID、后端菜单的 <code class="text-xs">id</code> 用 UUID，
          都是「让每个实体在全局有个不撞车的名片」。区别只是 UUID 有 RFC 标准、可跨语言解析版本号。
          </p>
        </aside>
      </section>

      <!-- ============ 2. 底层算法 ============ -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          底层算法：128 位里的「版本位」和「变体位」
        </h2>
        <p class="text-gray-600 mb-4 leading-relaxed">
          先看 v4 的完整位布局。读的时候可以把它想成「<strong>一行的内存布局</strong>」：
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-gray-100 text-left">
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">字段</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">位数</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">含义</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">示例(十六进制)</th>
              </tr>
            </thead>
            <tbody class="text-gray-600">
              <tr><td class="px-4 py-2 border border-gray-200">time_low</td><td class="px-4 py-2 border border-gray-200">32</td><td class="px-4 py-2 border border-gray-200">时间戳低位 / 随机</td><td class="px-4 py-2 border border-gray-200 font-mono text-xs">550e8400</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">time_mid</td><td class="px-4 py-2 border border-gray-200">16</td><td class="px-4 py-2 border border-gray-200">时间戳中位 / 随机</td><td class="px-4 py-2 border border-gray-200 font-mono text-xs">e29b</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">time_hi + <strong>version</strong></td><td class="px-4 py-2 border border-gray-200">16</td><td class="px-4 py-2 border border-gray-200">时间戳高位 + 4 位版本号</td><td class="px-4 py-2 border border-gray-200 font-mono text-xs"><span class="text-cyan-700 font-semibold">4</span>1d4</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">clock_seq_hi + <strong>variant</strong></td><td class="px-4 py-2 border border-gray-200">16</td><td class="px-4 py-2 border border-gray-200">时钟序列 + 2 位变体</td><td class="px-4 py-2 border border-gray-200 font-mono text-xs"><span class="text-purple-700 font-semibold">a</span>716</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">node</td><td class="px-4 py-2 border border-gray-200">48</td><td class="px-4 py-2 border border-gray-200">MAC 地址 / 随机</td><td class="px-4 py-2 border border-gray-200 font-mono text-xs">446655440000</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-gray-600 mb-4 leading-relaxed">
          读法诀窍：看 <strong>第 13 个十六进制字符</strong> 就是版本号——上例 <code class="text-cyan-700">4</code>1d4
          里的 <code class="text-cyan-700">4</code> 说明是 <strong>v4</strong>；第 17 个字符
          <code class="text-purple-700">a</code>（二进制 101x）说明是 RFC 4122 变体。
          这也是为什么「<code class="text-xs">xxxxxxxx-xxxx-<b>4</b>xxx-<b>a</b>xxx-...</code>」
          固定长那样——<strong>版本位写死了，一眼可辨</strong>。
        </p>

        <div class="mb-4">
          <Code language="go" :code="parseCode" title="version_and_variant.go" />
        </div>
      </section>

      <!-- ============ 3. 各版本算法 ============ -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          各版本算法：时间戳系 vs 随机系 vs 哈希系 vs 排序系
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-gray-100 text-left">
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">版本</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">算法</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">特征</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">缺点</th>
              </tr>
            </thead>
            <tbody class="text-gray-600">
              <tr>
                <td class="px-4 py-2 border border-gray-200 font-mono">v1</td>
                <td class="px-4 py-2 border border-gray-200">60 位时间戳(100ns) + 14 位时钟序列 + 48 位 <b>MAC 地址</b></td>
                <td class="px-4 py-2 border border-gray-200">排序性好、可回溯生成时间</td>
                <td class="px-4 py-2 border border-gray-200">⚠️ 泄漏网卡 MAC 和生成时间（隐私）；同一机器在相同时间戳冲突需时钟序列兜底</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-gray-200 font-mono">v2</td>
                <td class="px-4 py-2 border border-gray-200">v1 + 4 位 DCE 安全本地标识</td>
                <td class="px-4 py-2 border border-gray-200">给 DCE 安全域用（POSIX UID）</td>
                <td class="px-4 py-2 border border-gray-200">极少使用，标准复杂，基本被淘汰</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-gray-200 font-mono">v3 / v5</td>
                <td class="px-4 py-2 border border-gray-200">MD5(v3) / SHA-1(v5) 哈希「namespace + name」</td>
                <td class="px-4 py-2 border border-gray-200"><b>确定性</b>：同 namespace+name 永远同 UUID（幂等生成）</td>
                <td class="px-4 py-2 border border-gray-200">基于 name 派生，无随机性；SHA-1 已不推荐</td>
              </tr>
              <tr class="bg-cyan-50">
                <td class="px-4 py-2 border border-gray-200 font-mono text-cyan-700 font-semibold">v4</td>
                <td class="px-4 py-2 border border-gray-200">122 位全部 <b>加密随机数</b>（6 bit 留给版本/变体）</td>
                <td class="px-4 py-2 border border-gray-200">✅ 最简单、无隐私泄漏、`uuid.NewString()` 就是它</td>
                <td class="px-4 py-2 border border-gray-200">⚠️ 完全随机 → 不可排序、数据库主键会「乱序插入」</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-gray-200 font-mono">v6 / v7</td>
                <td class="px-4 py-2 border border-gray-200">高 48~60 位放<b>毫秒时间戳</b> + 剩余随机（v7 重排序）</td>
                <td class="px-4 py-2 border border-gray-200">✅ 时间前缀 → <b>可排序</b>，聚簇索引友好（新草案 RFC 4122 修订）</td>
                <td class="px-4 py-2 border border-gray-200">库支持不全；v7 需时间戳 + 随机数双来源</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-gray-200 font-mono">v8</td>
                <td class="px-4 py-2 border border-gray-200">自定义 122 位（实验性）</td>
                <td class="px-4 py-2 border border-gray-200">厂商自定义语义</td>
                <td class="px-4 py-2 border border-gray-200">无标准，互操作差</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-gray-600 mb-4 leading-relaxed">
          一句话记忆：<strong>v1/v6/v7 是时间戳系（可排序），v4 是纯随机（最简单），v3/v5 是哈希系（幂等）</strong>。
          后端默认无脑用 v4 是安全的；但给数据库当主键，v7 在「排序 + 唯一」上更优（见第 5 节）。
        </p>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>「uuid 提到了很多次」的 Go 后端里，<code class="text-xs">uuid.NewString()</code> =
          <strong>v4</strong>（随机）。它保证唯一性，但如果你要按主键范围查询或追求聚簇索引性能，v4 反而最差——这就是优缺点要谈的核心。</p>
        </aside>
      </section>

      <!-- ============ 4. 数据库主键场景：优缺点 ============ -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          优缺点（数据库主键视角）：为什么 DBA 对 UUID 又爱又恨
        </h2>

        <h3 class="font-semibold text-gray-700 mb-2">✅ 优点</h3>
        <ul class="space-y-2 text-gray-600 mb-5">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>全局唯一、无需协调</strong>——任何节点独立生成，天然适合微服务/分库分表/离线生成，这是自增 ID 做不到的</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>不泄漏业务信息</strong>——不像自增 ID 暴露「我总共注册了多少用户」（他人可枚举 1、2、3…）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>可提前在应用层生成</strong>——无需先 INSERT 拿到自增 id 再建关联，方便做批量导入、跨服务引用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>跨库合并安全</strong>——数据迁移/主从切换时不会撞主键</span></li>
        </ul>

        <h3 class="font-semibold text-gray-700 mb-2">❌ 缺点（重点是数据库侧）</h3>
        <ul class="space-y-2 text-gray-600 mb-5">
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>占空间</strong>——36 字符字符串 = 每个索引多几十字节；即使存 <code class="text-xs">BINARY(16)</code> 也比 BIGINT 的 8 字节大一倍，主键还要被每个二级索引复制一份</span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>v4 乱序 → 聚簇索引「页分裂」</strong>——InnoDB 主键是聚簇索引，按主键物理排布；随机 UUID 导致新行插到任意位置，频繁触发页分裂 + 碎片（对照 db-2-1-2-btree / db-2-2-1-clustered）</span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>不可排序、范围查询差</strong>——随机 v4 无法按生成时间排序，ORDER BY id 等于随机序</span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>v1 隐私风险</strong>——MAC + 时间戳可能被用来反查机器、推断上线时间</span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>无业务含义</strong>——排查问题时没法从 ID 看出「这是哪台机器/哪个时间段的单子」</span></li>
        </ul>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-gray-100 text-left">
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">维度</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">自增 BIGINT</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">UUID v4</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">UUID v7</th>
                <th class="px-4 py-2 border border-gray-200 font-semibold text-gray-700">雪花 ID</th>
              </tr>
            </thead>
            <tbody class="text-gray-600">
              <tr><td class="px-4 py-2 border border-gray-200">存储</td><td class="px-4 py-2 border border-gray-200">8 B</td><td class="px-4 py-2 border border-gray-200">16 B（字符串 36 B）</td><td class="px-4 py-2 border border-gray-200">16 B</td><td class="px-4 py-2 border border-gray-200">8 B</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">全局唯一</td><td class="px-4 py-2 border border-gray-200">✗ 单库</td><td class="px-4 py-2 border border-gray-200">✓</td><td class="px-4 py-2 border border-gray-200">✓</td><td class="px-4 py-2 border border-gray-200">✓（需配机器位）</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">排序性</td><td class="px-4 py-2 border border-gray-200">✓ 单调</td><td class="px-4 py-2 border border-gray-200">✗ 随机</td><td class="px-4 py-2 border border-gray-200">✓ 按时间</td><td class="px-4 py-2 border border-gray-200">✓ 按时间</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">聚簇索引</td><td class="px-4 py-2 border border-gray-200">✓ 顺序插入</td><td class="px-4 py-2 border border-gray-200">✗ 页分裂</td><td class="px-4 py-2 border border-gray-200">✓ 近似顺序</td><td class="px-4 py-2 border border-gray-200">✓ 近似顺序</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">依赖外部协调</td><td class="px-4 py-2 border border-gray-200">✗</td><td class="px-4 py-2 border border-gray-200">✗</td><td class="px-4 py-2 border border-gray-200">✗</td><td class="px-4 py-2 border border-gray-200">需要机器 ID / 时钟</td></tr>
              <tr><td class="px-4 py-2 border border-gray-200">适用</td><td class="px-4 py-2 border border-gray-200">单机小表、日志</td><td class="px-4 py-2 border border-gray-200">通用、安全、教学默认</td><td class="px-4 py-2 border border-gray-200">大表主键、分库分表</td><td class="px-4 py-2 border border-gray-200">高并发分布式订单号</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ============ 5. 数据库怎么存 UUID ============ -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          数据库实战：存成 BINARY(16) 而不是 VARCHAR(36)
        </h2>
        <p class="text-gray-600 mb-4 leading-relaxed">
          同样一个 UUID，MySQL 里存 <strong>VARCHAR(36)</strong> 和 <strong>BINARY(16)</strong> 的存储量差一倍多，
          索引大小随之膨胀。正确的姿势是应用层生成 UUID 字符串，<strong>转成 16 字节二进制</strong>再入库。
        </p>

        <div class="mb-4">
          <Code language="sql" :code="sqlStoreCode" title="schema.sql" />
        </div>

        <div class="mb-4">
          <Code language="go" :code="goStoreCode" title="store_uuid.go" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>PostgreSQL 可以直接用 <code class="text-xs">UUID</code> 类型（backend 的 menu.id 就是它）；MySQL 用 <code class="text-xs">BINARY(16)</code>。
          排序需求强、表又大时优先 <strong>UUIDv7</strong>（时间前缀）替代 v4。</p>
        </aside>
      </section>

      <!-- ============ 6. Go 实战 ============ -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          Go 实战：backend 里到底是怎么用的
        </h2>
        <p class="text-gray-600 mb-4 leading-relaxed">
          项目里 <code class="text-xs">github.com/google/uuid</code> 是纯 Go 实现（对照 go-4-1），
          <code class="text-xs">uuid.NewString()</code> 生成的就是 v4 随机字符串，
          作为菜单主键写入 PostgreSQL 的 <code class="text-xs">uuid</code> 列。
        </p>

        <div class="mb-4">
          <Code language="go" :code="goUsageCode" title="menu_repo.go（摘录）" />
        </div>

        <h3 class="font-semibold text-gray-700 mb-2">常见 Go 操作</h3>
        <div class="mb-4">
          <Code language="go" :code="goOpsCode" title="uuid_ops.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>
          ① <code class="text-xs">uuid.MustParse</code> 遇到非法字符串直接 <b>panic</b>——用户输入要用 <code class="text-xs">uuid.Parse</code> 判断错误；
          ② UUID 字符串不区分大小写，但哈希/索引可能因大小写不一致导致查不到；
          ③ 别拿 v4 去 <code class="text-xs">ORDER BY</code>，排序是随机的。</p>
        </aside>
      </section>

      <!-- ============ 7. 小结 ============ -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          📝 小结
        </h2>
        <ul class="space-y-2 text-gray-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>UUID = 128 位（16 字节）</strong>，RFC 4122，格式 8-4-4-4-12；第 13 个字符是版本号</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>v4 = 纯随机</strong>（uuid.NewString() 默认），最简单无隐私，但不可排序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>v7 = 时间戳前缀</strong>，可排序、聚簇索引友好，是新主推的方向</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优缺点核心</strong>：全局唯一/免协调/不枚举 vs 占空间大/随机插入页分裂/不可范围查询</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>存法</strong>：BINARY(16) 或 PG uuid 类型，别存 VARCHAR(36)</span></li>
        </ul>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关联阅读：</strong>
          聚簇索引的「页分裂」机理见 db-2-2-1-clustered；索引到底怎么存储见 db-2-1-2-btree；
          MySQL 的 schema 数据类型取舍见 db-4-4-1-schema。</p>
        </aside>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8 flex justify-between text-sm border-t border-gray-200">
      <Link :route="prevDoc.name" :text="prevDoc.label" animation="none" size="small"
        class="p-0! text-gray-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
      <Link :route="nextDoc.name" :text="nextDoc.label" animation="none" size="small"
        class="p-0! text-cyan-600! hover:text-cyan-700! font-medium! bg-transparent! border-none! inline!" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "UUID 是什么" },
  { id: "sec-2", name: "底层算法" },
  { id: "sec-3", name: "各版本算法" },
  { id: "sec-4", name: "优缺点" },
  { id: "sec-5", name: "数据库存储" },
  { id: "sec-6", name: "Go 实战" },
  { id: "sec-7", name: "小结" },
]

// 上一篇 / 下一篇（db-4-4 模块内）
const prevDoc = { name: 'db-4-4-4-partition', label: '← 分区表' }
const nextDoc = { name: 'db-learning-path', label: '数据库学习路线图 →' }

// 解析 UUID 的版本号与变体位
const parseCode = `package main

import (
    "fmt"

    "github.com/google/uuid"
)

func main() {
    // 字符串 → UUID（16 字节二进制）
    u, err := uuid.Parse("550e8400-e29b-41d4-a716-446655440000")
    if err != nil {
        panic(err)
    }

    fmt.Printf("版本号(version) = %d\\n", u.Version())   // 4 → v4（随机）
    fmt.Printf("变体(variant)   = %v\\n", u.Variant())   // RFC4122

    // 从第 13 个字符也能肉眼判断：
    // 550e8400-e29b-41d4-...  →  '4' 就是版本号
}`

// MySQL 里用 BINARY(16) 存 UUID
const sqlStoreCode = `-- ❌ 别这么存：36 字符，索引膨胀
CREATE TABLE menu_bad (
  id CHAR(36) PRIMARY KEY
);

-- ✅ 这么存：16 字节，索引小一半
CREATE TABLE menu (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(64),
  created_at DATETIME
);

-- 查询时转回字符串
SELECT id, HEX(id), created_at FROM menu;`

// Go 里字符串 ↔ 二进制互转
const goStoreCode = `package main

import (
    "fmt"

    "github.com/google/uuid"
)

func main() {
    id := uuid.NewString() // v4 随机字符串，如 "550e8400-..."

    // 入库前：字符串 → 16 字节
    b, err := uuid.MustParse(id).MarshalBinary()
    if err != nil {
        panic(err)
    }
    fmt.Printf("入库(16字节): %x\\n", b) // 例如 550e8400e29b41d4a716446655440000

    // 读出后：16 字节 → 字符串
    var u uuid.UUID
    _ = u.UnmarshalBinary(b)
    fmt.Printf("出库(字符串): %s\\n", u.String())
}`

// backend 里 menu_repo.go 的真实用法
const goUsageCode = `// menu_repo.go — 创建菜单时生成主键
func (r *MenuRepository) InsertMenu(in model.MenuCreate, path string, order int) (*model.Menu, error) {
    id := uuid.NewString() // 👈 就是这里，128 位 v4 随机主键
    now := time.Now()

    _, err := r.db.Exec(\`INSERT INTO menu
        (id, name, label, path, icon, "order", project, parent_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)\`,
        id, in.Name, in.Label, path, in.Icon, order, in.Project, in.ParentID, now, now)
    if err != nil {
        return nil, fmt.Errorf("插入菜单失败: %w", err)
    }
    return &model.Menu{ID: id, ...}, nil
}`

// Go 常用操作
const goOpsCode = `package main

import (
    "fmt"

    "github.com/google/uuid"
)

func main() {
    // 1. 生成（v4 随机）
    id := uuid.NewString()

    // 2. 解析（用户输入用 Parse，不要用 MustParse——后者非法会 panic）
    u, err := uuid.Parse(id)
    if err != nil {
        fmt.Println("非法 UUID:", err)
        return
    }

    // 3. 判断空 UUID（全是 0）
    if u == uuid.Nil {
        fmt.Println("空 UUID")
    }

    // 4. 生成 v7（时间戳前缀，可排序）——需要支持 v7 的库或手写
    //    例如 github.com/gofrs/uuid 或新版本 google/uuid
    fmt.Println("uuid:", u.String(), "version:", u.Version())
}`
</script>
