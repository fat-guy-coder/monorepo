<template>
  <div class="backend-intro-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4"><h1 class="text-2xl font-bold text-slate-800">🖥️ 后端开发介绍</h1><p class="text-sm text-slate-500 mt-1">什么是后端？后端做什么？——从 Web 架构到中国后端语言生态全景</p></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>后端是什么？——前端是"脸面"，后端是"大脑"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你在浏览器里看到的页面是<strong>前端</strong>——它负责界面、交互、动画。但当你点击"登录"按钮时，密码发给谁校验？当你搜索商品时，商品数据从哪来？这些"看不见"的工作就是<strong>后端</strong>——<strong>运行在服务器上的代码</strong>，负责业务逻辑、数据处理和安全。</p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 一句话理解：</strong>如果网站是个餐厅，<strong>前端 = 大堂（服务员 + 菜单 + 装修）</strong>，<strong>后端 = 后厨（厨师 + 冰箱 + 菜谱）</strong>。你点的菜从厨房出来，服务员端给你。你不需要知道厨房怎么做菜——这就是前后端分离。</p></aside>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200"><h4 class="font-semibold text-slate-700 mb-2">前端做的事</h4><ul class="space-y-1 text-slate-600"><li>· 页面布局、样式、动画</li><li>· 按钮点击、表单输入</li><li>· 调用后端 API 获取数据</li><li>· 数据展示和筛选</li></ul></div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200"><h4 class="font-semibold text-slate-700 mb-2">后端做的事</h4><ul class="space-y-1 text-slate-600"><li>· 接收请求、验证身份</li><li>· 业务逻辑处理（算钱、权限）</li><li>· 读写数据库</li><li>· 返回 JSON 数据给前端</li></ul></div>
        </div>
      </section>

      <!-- 2. 干什么 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>后端具体干什么？——Web 请求的完整链路</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">一个典型的 Web 请求从浏览器发出到收到响应，经过以下步骤。这就是<strong>后端的工作全貌</strong>。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>DNS 解析 + 负载均衡</strong> — 域名→IP 地址→Nginx/网关转发请求到具体服务器。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>中间件处理</strong> — 认证（这个用户是谁？）、限流（一秒多少次？）、CORS、日志记录。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>路由匹配 + 参数校验</strong> — URL 匹配到对应的处理函数。校验参数是否合法（邮箱格式？）</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>业务逻辑</strong> — 核心代码。计算订单金额、检查库存、调用第三方 API（支付、短信）。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>数据库操作</strong> — CRUD（增删改查）、事务（转账要么全成功要么全回滚）、缓存（Redis）。</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span><div class="text-slate-600"><strong>返回响应</strong> — 业务数据 → JSON 序列化 → HTTP Response → 前端拿到数据渲染页面。</div></li>
        </ol>
      </section>

      <!-- 3. 角色 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>后端工程师的角色与职责</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">职责领域</th><th class="px-4 py-2 border font-semibold">具体工作</th><th class="px-4 py-2 border font-semibold">常用技术</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-medium">API 设计</td><td class="px-4 py-2 border">RESTful / GraphQL / gRPC 接口设计，URL 命名，状态码</td><td class="px-4 py-2 border">Swagger, Postman</td></tr>
          <tr><td class="px-4 py-2 border font-medium">业务逻辑</td><td class="px-4 py-2 border">订单、支付、权限、推荐算法、数据校验</td><td class="px-4 py-2 border">Go, Java, Python, Node.js</td></tr>
          <tr><td class="px-4 py-2 border font-medium">数据存储</td><td class="px-4 py-2 border">表结构设计、索引优化、事务、主从复制</td><td class="px-4 py-2 border">MySQL, PostgreSQL, MongoDB, Redis</td></tr>
          <tr><td class="px-4 py-2 border font-medium">性能优化</td><td class="px-4 py-2 border">缓存策略、SQL 优化、连接池、消息队列削峰</td><td class="px-4 py-2 border">Redis, Kafka, RabbitMQ</td></tr>
          <tr><td class="px-4 py-2 border font-medium">安全防护</td><td class="px-4 py-2 border">SQL 注入、XSS、CSRF、加密、鉴权</td><td class="px-4 py-2 border">JWT, OAuth2, HTTPS</td></tr>
          <tr><td class="px-4 py-2 border font-medium">运维部署</td><td class="px-4 py-2 border">CI/CD、容器化、监控告警、日志</td><td class="px-4 py-2 border">Docker, K8s, Prometheus</td></tr>
        </tbody></table></div>
      </section>

      <!-- 4. 语言生态 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>中国互联网后端语言生态</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">中国后端开发的<strong>主力语言</strong>和全球趋势有所不同——Java 在中国具有绝对统治地位，Go 增长最快。</p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">市场占比估算（2024-2025 中国互联网行业）</h3>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">语言</th><th class="px-4 py-2 border font-semibold">市场占比</th><th class="px-4 py-2 border font-semibold">趋势</th><th class="px-4 py-2 border font-semibold">主要应用场景</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs font-bold">Java</td><td class="px-4 py-2 border">~45%</td><td class="px-4 py-2 border text-amber-500">稳定</td><td class="px-4 py-2 border">电商（淘宝/京东）、金融（银行）、大企业、微服务（Spring Boot）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs font-bold">Go</td><td class="px-4 py-2 border">~25%</td><td class="px-4 py-2 border text-emerald-600">↑ 快速增长</td><td class="px-4 py-2 border">云原生（K8s/Docker）、中间件、高并发服务（字节/腾讯/百度）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs font-bold">Python</td><td class="px-4 py-2 border">~15%</td><td class="px-4 py-2 border text-amber-500">稳定</td><td class="px-4 py-2 border">AI/机器学习、数据分析、爬虫、运维脚本、Django/Flask Web</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs font-bold">C/C++</td><td class="px-4 py-2 border">~8%</td><td class="px-4 py-2 border text-amber-500">稳定</td><td class="px-4 py-2 border">游戏服务器、数据库内核、搜索引擎、嵌入式</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs font-bold">Node.js</td><td class="px-4 py-2 border">~5%</td><td class="px-4 py-2 border text-amber-500">稳定</td><td class="px-4 py-2 border">BFF 层、SSR、实时应用（聊天/协作）、全栈小团队</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs font-bold">Rust/C#/PHP</td><td class="px-4 py-2 border">~2%</td><td class="px-4 py-2 border">—</td><td class="px-4 py-2 border">Rust（系统工具）、C#（Unity/企业）、PHP（遗留 CMS/WordPress）</td></tr>
        </tbody></table></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">各语言核心框架</h3>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">语言</th><th class="px-4 py-2 border font-semibold">主流框架</th><th class="px-4 py-2 border font-semibold">特点</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">Java</td><td class="px-4 py-2 border">Spring Boot, Spring Cloud, MyBatis</td><td class="px-4 py-2 border">生态最全，中间件丰富，但重、启动慢</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Go</td><td class="px-4 py-2 border">Gin, Echo, Kratos, go-zero</td><td class="px-4 py-2 border">编译快、部署简单（单二进制）、高并发天然优势</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Python</td><td class="px-4 py-2 border">Django, FastAPI, Flask</td><td class="px-4 py-2 border">开发快、生态好（AI/数据），但性能瓶颈明显</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Node.js</td><td class="px-4 py-2 border">Express, Nest.js, Koa, Fastify</td><td class="px-4 py-2 border">前后端同语言、I/O 密集场景好，CPU 密集弱</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Rust</td><td class="px-4 py-2 border">Actix-web, Axum, Rocket</td><td class="px-4 py-2 border">性能极致、内存安全，学习曲线陡</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">C#</td><td class="px-4 py-2 border">ASP.NET Core, Entity Framework</td><td class="px-4 py-2 border">微软生态、Unity 游戏、企业 Windows 环境</td></tr>
        </tbody></table></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">为什么中国 Java 占比这么高？</h3>
        <ul class="space-y-2 text-slate-600 text-sm mb-3">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>历史惯性：</strong>阿里、美团、京东等巨头 2010 年前后全面 Java 化，积累了海量的中间件和人才池。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>高校教育：</strong>中国大学计算机专业几乎清一色教 Java，应届生默认会 Java。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Spring 生态：</strong>Spring Boot + Spring Cloud 提供了一站式微服务解决方案，极大降低了分布式系统开发门槛。</span></li>
        </ul>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">Go 为什么在快速增长？</h3>
        <ul class="space-y-2 text-slate-600 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>云原生浪潮：</strong>Docker/K8s/Prometheus 全是 Go 写的。做基础设施和中间件，Go 是事实标准。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>字节跳动效应：</strong>字节几乎全用 Go，大量工程师从 Java 转 Go——带动了整个行业的技术选型。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>简洁与性能的平衡：</strong>比 Python 快 50-100 倍，比 Java 简洁得多，编译快部署简单。</span></li>
        </ul>
      </section>

      <!-- 5. 学习路线 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>后端工程师的学习路线</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">从 0 到后端工程师，推荐的学习顺序：</p>
        <ol class="space-y-2 text-slate-600 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">1</span><span><strong>选一门语言</strong>（Go 或 Java），掌握基础语法 → 数据结构 → 并发编程</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">2</span><span><strong>数据库：</strong>SQL（MySQL/PostgreSQL）→ 索引优化 → Redis 缓存</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">3</span><span><strong>Web 框架：</strong>Gin / Spring Boot → RESTful API 设计 → 中间件</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">4</span><span><strong>工程化：</strong>Git → Docker → CI/CD → 日志/监控</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 shrink-0 w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-xs font-bold">5</span><span><strong>进阶：</strong>微服务 → 消息队列 → 分布式系统 → 高可用设计</span></li>
        </ol>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>后端 = 服务器上的代码</strong>——处理业务逻辑、数据库、安全，返回数据给前端</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>中国 Java ~45%、Go ~25%、Python ~15%</strong>——Java 统治大厂，Go 增速最快</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前后端通过 HTTP API (JSON) 通信</strong>——REST 或 GraphQL，各司其职</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>学习路线：</strong>语言→数据库→Web 框架→工程化→分布式。Go 是 2025 年性价比最高的选择</span></li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import { Nav } from 'components'
const navList = [{id:"sec-1",name:"后端是什么"},{id:"sec-2",name:"后端干什么"},{id:"sec-3",name:"角色与职责"},{id:"sec-4",name:"中国语言生态"},{id:"sec-5",name:"学习路线"},{id:"sec-6",name:"关键点"}]
</script>
