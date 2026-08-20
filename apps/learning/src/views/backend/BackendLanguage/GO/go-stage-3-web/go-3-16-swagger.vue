<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📖 Swagger 文档</h1>
          <p class="text-sm text-slate-500 mt-1">OpenAPI 自动生成——swaggo/swag 注解驱动，代码即文档</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-16-swagger.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-16</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：Swagger 自动生成工作流
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Swagger 的核心理念是<strong>代码即文档</strong>：你在 handler 上方的注释里写 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">@Summary</code>、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">@Param</code>、<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">@Router</code> 等<strong>结构化注解</strong>，
  运行 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">swag init</code> 扫描它们生成 <strong>OpenAPI 规范的 swagger.json</strong>，
  再用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">swaggo/http-swagger</code>（或 gin-swagger）把这个 JSON 托管成<strong>可交互的网页文档</strong>——前端照着就能对接，还能在网页里直接试调 API。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sw-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="sw-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
            </defs>

            <!-- 标题 -->
            <text x="360" y="20" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#1e293b">源码注解 → swag 自动生成 → 在线交互文档（全程零手写文档）</text>

            <!-- ① 源码注解 -->
            <rect x="14" y="44" width="130" height="150" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="79" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">① 源码加注解</text>
            <rect x="30" y="76" width="98" height="22" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="79" y="87" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#475569">// @Summary 获取用户</text>
            <rect x="30" y="102" width="98" height="22" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="79" y="113" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#475569">// @Param id path</text>
            <rect x="30" y="128" width="98" height="22" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="79" y="139" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#475569">// @Success 200</text>
            <rect x="30" y="154" width="98" height="22" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="79" y="165" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#475569">// @Router /users/{id} [get]</text>
            <text x="79" y="186" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">写在 handler 注释里</text>

            <line x1="144" y1="119" x2="152" y2="119" stroke="#94a3b8" stroke-width="2" marker-end="url(#sw-arr)" />

            <!-- ② swag init -->
            <rect x="152" y="44" width="130" height="150" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="217" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">② swag init</text>
            <text x="217" y="94" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#92400e">扫描所有注释</text>
            <text x="217" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#92400e">生成 docs/ 目录</text>
            <text x="217" y="140" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#92400e">已安装:</text>
            <text x="217" y="156" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#92400e">go install</text>
            <text x="217" y="170" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#92400e">swaggo/swag</text>

            <line x1="282" y1="119" x2="290" y2="119" stroke="#94a3b8" stroke-width="2" marker-end="url(#sw-arr)" />

            <!-- ③ swagger.json -->
            <rect x="290" y="44" width="130" height="150" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="355" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">③ OpenAPI 产物</text>
            <text x="355" y="90" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">swagger.json</text>
            <text x="355" y="108" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">swagger.yaml</text>
            <text x="355" y="134" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#ecfdf5">//go:embed docs/*</text>
            <text x="355" y="150" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">嵌入二进制随服务发布</text>
            <text x="355" y="170" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">OpenAPI 3.0 规范</text>

            <line x1="420" y1="119" x2="428" y2="119" stroke="#94a3b8" stroke-width="2" marker-end="url(#sw-arr)" />

            <!-- ④ http-swagger -->
            <rect x="428" y="44" width="130" height="150" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
            <text x="493" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">④ http-swagger</text>
            <text x="493" y="94" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#166534">注册路由</text>
            <text x="493" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#166534">/swagger/*</text>
            <text x="493" y="140" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#166534">提供 Swagger UI</text>
            <text x="493" y="156" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">(前端静态资源 + JSON)</text>

            <line x1="558" y1="119" x2="566" y2="119" stroke="#94a3b8" stroke-width="2" marker-end="url(#sw-green)" />

            <!-- ⑤ Swagger UI -->
            <rect x="566" y="44" width="140" height="150" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="636" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">⑤ 可交互文档</text>
            <text x="636" y="94" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#14532d">浏览器访问</text>
            <text x="636" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#14532d">/swagger/index.html</text>
            <text x="636" y="140" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#14532d">查看每个接口</text>
            <text x="636" y="156" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#14532d">Try it out 直接调</text>

            <text x="360" y="222" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">手写文档？不需要——注解和代码永远待在一起，改代码顺手改注解，文档永不过期</text>
            <text x="360" y="244" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">前端/测试/QA 拿到 swagger.json 就能写 Mock、生成 SDK、做接口联调</text>

            <text x="360" y="280" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">链路：注解(①) → swag init(②) → swagger.json(③) → http-swagger(④) → Swagger UI(⑤)</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Swagger 工作流——handler 注释加注解 → swag init 生成 OpenAPI JSON → embed 进二进制 → http-swagger 托管 → 浏览器里可交互的 Swagger UI</figcaption>
        </figure>
      </section>

      <!-- 1. 什么是 Swagger / OpenAPI -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Swagger / OpenAPI — 先理清两个名字
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>OpenAPI</strong> 是一套描述 HTTP API 的<strong>标准规范</strong>（JSON/YAML 文档），规定接口的路径、参数、响应、鉴权怎么描述。
          <strong>Swagger</strong> 是围绕这套规范的工具全家桶：<strong>Swagger UI</strong> 是渲染成网页的可视化工具，
          <strong>Swagger Editor/Codegen</strong> 负责生成文档或 SDK。Go 这边最流行的实现是
          <strong>swaggo/swag</strong>（生成器）+ <strong>swaggo/http-swagger</strong> 或 <strong>swaggo/gin-swagger</strong>（托管器）。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>规范化</strong>：OpenAPI 是行业标准，不管后端用 Go/Python/Java，描述格式统一，前端和测试都能看懂。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>可交互</strong>：Swagger UI 上能直接 <strong>Try it out</strong>——填参数、点发送、看真实响应，前端联调不用翻代码。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>可复用</strong>：swagger.json 是纯数据，能喂给 OpenAPI Codegen 生成客户端 SDK、给 Postman 导入、给 mock 服务。</div>
          </li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Swagger 注解 ≈ <strong>NestJS 的 @ApiTags/@ApiOperation 装饰器</strong>、<strong>TS 的 tsoa 装饰器</strong>、Express 的 <strong>swagger-jsdoc</strong>——
          都是"写代码时顺手声明 API 元数据，构建时自动生成文档"。<br/>
          也 ≈ TS 的 <strong>JSDoc + 类型推断</strong>生成 .d.ts：类型/签名只写一次，声明文件自动产出，不会和实现脱节。
          前端拿到 swagger.json 就像拿到一份<strong>可执行的接口类型声明</strong>。
          </p>
        </aside>
      </section>

      <!-- 2. 安装与 swag init -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          安装 swag + 第一次生成
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">swag</code> 是命令行工具。装好后在项目根目录跑 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">swag init</code>，
          它会扫描入口文件（main）和所有含注解的 handler，生成 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">docs/</code> 目录（含 swagger.json / swagger.yaml / docs.go）。
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">docs.go</code> 里用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">//go:embed</code> 把 JSON 打包，所以 <strong>记得 import 空导入 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">_ "你的项目/docs"</code></strong> 让 swagger.json 注册进程序。
        </p>

        <div class="mb-4"><Code language="bash" :code="installCode" title="install.sh — 安装与生成" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>加全局注解</strong>：在 main 上方写 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">@title / @version / @host / @BasePath</code>——这是整个文档的元信息。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>给每个 handler 写注解</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">@Summary/@Param/@Success/@Router</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>跑 swag init</strong>：重新生成 docs/；改过注解后每次都要重跑（可加进 Makefile/CI）。</div>
          </li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：swag 找 main 入口。</strong>默认从当前目录找 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">main.go</code>。
          main 不在根目录时用 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">swag init -g cmd/server/main.go</code> 指定；
          新加了 handler 却不重跑 init，文档就会"缺接口"。建议写进 Makefile：<code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">make docs</code>。</p>
        </aside>
      </section>

      <!-- 3. 注解详解 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          注解详解 — @Summary 到 @Router
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          注解全部写在 handler 函数<strong>紧上方的注释块</strong>里。swag 约定注释以 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">@</code> 开头即视为注解。
          下面一张完整的例子 + 一张速查表，覆盖日常 90% 的写法。
        </p>

        <div class="mb-4"><Code language="go" :code="annoCode" title="user_handler.go — 完整注解示例" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">注解</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Summary</td><td class="px-4 py-2 border border-slate-200">一句话摘要（列表页标题）</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Summary 获取用户列表</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Description</td><td class="px-4 py-2 border border-slate-200">详细说明（支持多行）</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Description 分页返回所有用户</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Tags</td><td class="px-4 py-2 border border-slate-200">分组标签（UI 里按组折叠）</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Tags users</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Accept</td><td class="px-4 py-2 border border-slate-200">请求 Content-Type</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Accept json</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Produce</td><td class="px-4 py-2 border border-slate-200">响应 Content-Type</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Produce json</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Param</td><td class="px-4 py-2 border border-slate-200">参数：name + 位置 + 类型 + 必填 + 说明</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Param id path int true "用户ID"</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Success</td><td class="px-4 py-2 border border-slate-200">成功响应：状态码 + 返回模型</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Success 200 {object} User</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Failure</td><td class="px-4 py-2 border border-slate-200">错误响应</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Failure 404 {object} Error</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Router</td><td class="px-4 py-2 border border-slate-200">路由路径 + HTTP 方法</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">@Router /users/{id} [get]</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">@Param 的五种位置与 @Success 的三种返回类型</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">@Param 位置</h4>
            <ul class="space-y-2 text-slate-600 text-sm">
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">path</code> — URL 路径段：<code class="bg-slate-100 px-1 rounded text-xs font-mono">/users/{id}</code></span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">query</code> — URL 查询串：<code class="bg-slate-100 px-1 rounded text-xs font-mono">?page=1</code></span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">header</code> — 请求头：<code class="bg-slate-100 px-1 rounded text-xs font-mono">Authorization</code></span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">body</code> — 请求体：类型写 Go struct 名</span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">formData</code> — 表单字段（multipart）</span></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">@Success 返回类型</h4>
            <ul class="space-y-2 text-slate-600 text-sm">
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">{object} User</code> — 单个对象</span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">{array} User</code> — 对象数组</span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">{string} string</code> — 普通字符串</span></li>
              <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>模型字段用 struct tag：<code class="bg-slate-100 px-1 rounded text-xs font-mono">json:"id" example:"1"</code> 控制展示</span></li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 4. 集成 http-swagger -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          集成 http-swagger / gin-swagger
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          生成完 docs/，再把它"挂"到 HTTP 服务上：标准库用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">swaggo/http-swagger</code>，
          Gin 用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">swaggo/gin-swagger</code>。
          关键一行：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">import _ "你的项目/docs"</code>——
          空导入触发 docs.go 的 init，把 swagger.json 注册好。之后访问 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">/swagger/index.html</code> 就是 UI 页面。
        </p>

        <div class="mb-4"><Code language="go" :code="ginSwaggerCode" title="gin_swagger.go — Gin 集成（最常用）" /></div>
        <div class="mb-4"><Code language="go" :code="stdSwaggerCode" title="std_swagger.go — 标准库 net/http 集成" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：docs 包没空导入 → 404。</strong>忘写 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">import _ "project/docs"</code> 是最常见的"swagger 页面打不开"原因。
          另外 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">@host</code> 注解写的是生产域名，本地联调记得在 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">httpSwagger.URL</code> 处覆盖，或用环境变量控制。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：生产环境别裸奔 Swagger。</strong>Swagger 页面会暴露全部接口细节，方便攻击者侦察。
          生产建议<strong>关闭</strong>或加 Basic Auth / IP 白名单；只在 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">dev</code> / <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">staging</code> 环境开启。</p>
        </aside>
      </section>

      <!-- 5. swagger.json 结构 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          swagger.json 长什么样 — 为什么用 OpenAPI
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          生成的 swagger.json 是<strong>标准 OpenAPI 文档</strong>。顶层有 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">openapi</code> 版本、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">info</code>（标题/版本）、<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">paths</code>（所有接口）、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">components/schemas</code>（所有模型）。
          看懂结构，你就知道<strong>为什么它是"接口的类型声明"</strong>——前端可以直接拿它生成 TypeScript 类型和请求客户端。
        </p>

        <div class="mb-4"><Code language="json" :code="swaggerJsonCode" title="docs/swagger.json（核心结构）" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>paths 描述接口</strong>：每个路径下的 get/post 节点，包含 parameters、requestBody、responses。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>schemas 描述模型</strong>：字段名 + 类型 + 是否必填，等价一份 Go struct 的 JSON 镜像。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>生态互通</strong>：同是 OpenAPI 的工具（Stoplight、Redoc、openapi-generator）都能消费这份 JSON。</div>
          </li>
        </ol>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么用 OpenAPI 而不是自己写文档：</strong>① 文档与代码同源，改了注解重跑 init 就同步；② 机器可读，能生成 SDK/Mock/类型；③ 行业标准，团队内外沟通零成本；④ Swagger UI 自带 Try it out，联调效率翻倍。</p>
        </aside>
      </section>

      <!-- 6. 最佳实践 + 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          API 文档最佳实践 + 对比
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">手写文档（Word/README）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Swagger 自动生成</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">同步性</td><td class="px-4 py-2 border border-slate-200 text-red-600">极易过期，没人维护就废了</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">改代码改注解，重跑即同步</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">可交互</td><td class="px-4 py-2 border border-slate-200">只能看文字</td><td class="px-4 py-2 border border-slate-200">Try it out 直接调真实接口</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">机器可读</td><td class="px-4 py-2 border border-slate-200">无</td><td class="px-4 py-2 border border-slate-200">生成 SDK / Mock / TS 类型</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">成本</td><td class="px-4 py-2 border border-slate-200">写一份还要更新一份</td><td class="px-4 py-2 border border-slate-200">注解跟着代码写，一次到位</td></tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>✅ <strong>注解写在 handler 上</strong>，和实现贴在一起，看代码即看文档。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>✅ 响应模型用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">{object} 你的结构体</code>，别用 map 糊弄——模型详情的价值就在这里。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>✅ 统一错误结构：定义 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">Error{code,message}</code> 并在 @Failure 引用，前端只需处理一种错误形状。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>✅ 把 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">swag init</code> 加进 Makefile / CI，注解改动不重新生成就是"无声过期"。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>⚠️ 生产环境关闭 Swagger 或加鉴权；@host/@BasePath 用环境变量区分环境。</span></li>
        </ul>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话总结：</strong>Swagger 把"写文档"从一份独立维护的作业，变成"写代码时顺手加注解"的副产品——
          文档永远不会比代码旧，前端联调有真数据可点，这是现代后端 API 的标配。</p>
        </aside>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>OpenAPI</strong> 是描述 API 的标准规范，<strong>Swagger</strong> 是工具全家桶（UI/Editor/Codegen）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>核心注解：<strong>@Summary @Tags @Param @Success @Failure @Router</strong>，全在 handler 注释里</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">swag init</code> 生成 docs/（swagger.json + docs.go），<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">import _ "docs"</code> 注册进程序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>http-swagger / gin-swagger</strong> 托管 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">/swagger/*</code>，UI 里 Try it out 可直接调接口</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>swagger.json 是标准 OpenAPI 数据：<strong>paths（接口）+ components/schemas（模型）</strong>，可生成 SDK/TS 类型</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>与手写文档比：<strong>永远同步、可交互、机器可读</strong>；生产环境记得关掉或加鉴权</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-15-template-embed" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：模板与Embed</RouterLink>
        <span class="text-slate-300">阶段 3 完成！下一阶段：数据库与存储 →</span>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "Swagger / OpenAPI" },
  { id: "sec-2", name: "安装与 swag init" },
  { id: "sec-3", name: "注解详解" },
  { id: "sec-4", name: "集成 http-swagger" },
  { id: "sec-5", name: "swagger.json 结构" },
  { id: "sec-6", name: "最佳实践与对比" },
  { id: "sec-7", name: "小结" },
]

// ===== 代码示例 =====
const installCode = `# 安装 swag 命令行工具
go install github.com/swaggo/swag/cmd/swag@latest

# 在项目根目录（含 main.go 的位置）生成 docs/
swag init
# 生成 docs/swagger.json + docs/swagger.yaml + docs/docs.go

# main 不在根目录时指定入口
swag init -g cmd/server/main.go

# 顺手加进 Makefile
# docs:
# \tswag init && go run main.go`

const annoCode = `// user_handler.go — 完整注解示例（Gin 版）
package main

// User 用户模型——@Success/@Param 里引用的类型
type User struct {
    ID   int    \`json:"id" example:"1"\`
    Name string \`json:"name" example:"Alice"\`
    Role string \`json:"role" example:"admin"\`
}

// GetUsers 获取用户列表
//
// @Summary      获取用户列表
// @Description  分页返回所有用户
// @Tags         users
// @Accept       json
// @Produce      json
// @Param        page    query    int    false "页码"      default(1)
// @Param        size    query    int    false "每页数量"  default(10)
// @Success      200     {array}  User
// @Failure      400     {object} Error
// @Router       /users [get]
func GetUsers(c *gin.Context) {
    c.JSON(200, []User{{ID: 1, Name: "Alice", Role: "admin"}})
}

// GetUser 获取单个用户
//
// @Summary      获取单个用户
// @Tags         users
// @Produce      json
// @Param        id   path  int  true "用户 ID"  minimum(1)
// @Success      200  {object}  User
// @Failure      404  {object}  Error
// @Router       /users/{id} [get]
func GetUser(c *gin.Context) {
    // 参数校验、查库...
    c.JSON(200, User{ID: 1, Name: "Alice", Role: "admin"})
}
// 访问 /swagger/index.html 就能看到：GET /users 和 GET /users/{id} 两个接口 */
`
const ginSwaggerCode = `// gin_swagger.go — Gin 集成 swagger
package main

import (
    _ "your-project/docs"          // ⚠️ 空导入：触发 docs.go 注册 swagger.json

    "github.com/gin-gonic/gin"
    swaggerFiles "github.com/swaggo/files"
    ginSwagger "github.com/swaggo/gin-swagger"
)

// @title        用户服务 API
// @version       1.0
// @description   用户增删改查示例
// @host          localhost:8080
// @BasePath      /api
func main() {
    r := gin.Default()

    // 业务路由
    api := r.Group("/api")
    {
        api.GET("/users", GetUsers)
        api.GET("/users/:id", GetUser)
    }

    // 文档路由——访问 /swagger/index.html
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    r.Run(":8080")
}
// 浏览器打开 http://localhost:8080/swagger/index.html
// 每个接口右上角都有 Try it out 按钮，点开就能直接发请求！`

const stdSwaggerCode = `// std_swagger.go — 标准库 net/http 集成
package main

import (
    _ "your-project/docs"
    "net/http"

    "github.com/swaggo/http-swagger"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/users", listUsers)

    // 文档路由
    mux.Handle("/swagger/", httpSwagger.WrapHandler)

    http.ListenAndServe(":8080", mux)
}
// 访问 /swagger/index.html 同样能看到可交互文档`

const swaggerJsonCode = `{
  "openapi": "3.0.0",
  "info": {
    "title": "用户服务 API",
    "version": "1.0",
    "description": "用户增删改查示例"
  },
  "paths": {
    "/users": {
      "get": {
        "tags": ["users"],
        "summary": "获取用户列表",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "required": false,
            "type": "integer",
            "default": 1
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": { "type": "array", "items": { "$ref": "#/components/schemas/User" } }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "id":   { "type": "integer", "example": 1 },
          "name": { "type": "string",  "example": "Alice" },
          "role": { "type": "string",  "example": "admin" }
        }
      }
    }
  }
}
// paths = 接口；components/schemas = 模型——前端能直接生成 TS 类型和请求客户端`
</script>
