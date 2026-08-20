<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Gin 进阶</h1><p class="text-sm text-slate-500 mt-1">参数验证 · 错误处理 · 日志——生产级 Gin 配置</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/web/go-3-6-gin-advanced.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-6</span></div></div></header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：Context 数据流 + 参数校验流程</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          生产级 Gin 应用有两套核心机制：<strong>① Context 数据流</strong>——中间件用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Set</code> 写入、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Get</code> 读出，把用户信息一路传到 Handler；<strong>② 参数校验</strong>——JSON 先绑定进结构体，再按 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">binding:"..."</code> 标签校验，通过才进业务逻辑。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ga-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="ga-ok" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              <marker id="ga-err" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
            </defs>

            <!-- Panel 1: Context 数据流 -->
            <text x="16" y="24" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">① Context 数据流——c.Set / c.Get 在中间件链中传值</text>
            <rect x="30" y="40" width="180" height="62" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="120" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">Auth 中间件</text>
            <text x="120" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">c.Set("userID", 42)</text>
            <rect x="270" y="40" width="180" height="62" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="360" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">业务中间件</text>
            <text x="360" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">c.GetInt("userID")</text>
            <rect x="510" y="40" width="180" height="62" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="600" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#78350f">Handler</text>
            <text x="600" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#78350f">读取用户信息写业务</text>
            <line x1="210" y1="71" x2="270" y2="71" stroke="#94a3b8" stroke-width="2" marker-end="url(#ga-arr)" />
            <line x1="450" y1="71" x2="510" y2="71" stroke="#94a3b8" stroke-width="2" marker-end="url(#ga-arr)" />
            <text x="240" y="52" text-anchor="middle" font-size="9" font-family="monospace" fill="#15803d">userID 顺着 Context 往下传</text>

            <!-- Panel 2: 参数校验流程 -->
            <text x="16" y="140" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">② 参数绑定校验——JSON → 结构体 → validator → 响应</text>
            <rect x="30" y="160" width="140" height="64" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="100" y="180" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">JSON Body</text>
            <text x="100" y="200" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">{"name":"alice"}</text>
            <rect x="230" y="160" width="190" height="64" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="325" y="178" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">结构体 + 标签</text>
            <text x="325" y="196" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">Name  binding:"required,min=2"</text>
            <text x="325" y="210" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">Email binding:"required,email"</text>
            <rect x="480" y="160" width="100" height="64" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="530" y="185" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">validator</text>
            <text x="530" y="203" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">逐条校验</text>
            <line x1="170" y1="192" x2="230" y2="192" stroke="#94a3b8" stroke-width="2" marker-end="url(#ga-arr)" />
            <line x1="420" y1="192" x2="480" y2="192" stroke="#94a3b8" stroke-width="2" marker-end="url(#ga-arr)" />
            <text x="200" y="152" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">ShouldBindJSON</text>
            <text x="450" y="152" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">自动校验</text>
            <!-- 分叉结果 -->
            <rect x="470" y="260" width="120" height="40" rx="6" fill="#ecfdf5" stroke="#4ade80" stroke-width="1.5" />
            <text x="530" y="280" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">✅ 通过 → 200</text>
            <rect x="620" y="260" width="120" height="40" rx="6" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
            <text x="680" y="280" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b91c1c">❌ 失败 → 400</text>
            <line x1="505" y1="224" x2="505" y2="260" stroke="#4ade80" stroke-width="2" marker-end="url(#ga-ok)" />
            <path d="M 555 224 Q 640 236 665 258" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#ga-err)" />
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：左边是中间件链里用 Context 传用户数据，右边是请求参数从 JSON 到结构体到校验到最终响应的完整链路</figcaption>
        </figure>
      </section>

      <!-- 1. Context 基础 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Context——请求的"全局对象"</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">每个请求都会创建一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*gin.Context</code>，它贯穿请求全程，承载<strong>请求数据、响应、传值、控制流</strong>。Handler 接收 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c *gin.Context</code> 参数，所有读写都通过它。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
        Context ≈ <strong>Express 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">req</code> + <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">res</code> 二合一</strong>，也像 <strong>Koa 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">ctx</code></strong>——一次请求的所有信息都挂在它上面。<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">c.Param</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">req.params</code>，<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">c.Query</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">req.query</code>。
        </p></aside>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">前端对应</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">c.Param("id")</td><td class="px-4 py-2 border">路径参数</td><td class="px-4 py-2 border">req.params.id</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.Query("page")</td><td class="px-4 py-2 border">URL 查询参数</td><td class="px-4 py-2 border">req.query.page</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.PostForm("name")</td><td class="px-4 py-2 border">表单字段（urlencoded/multipart）</td><td class="px-4 py-2 border">req.body.name</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.GetHeader("Token")</td><td class="px-4 py-2 border">请求头</td><td class="px-4 py-2 border">req.headers.token</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.ClientIP()</td><td class="px-4 py-2 border">客户端 IP（自动处理代理）</td><td class="px-4 py-2 border">req.ip</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.Request / c.Writer</td><td class="px-4 py-2 border">原始 http.Request / ResponseWriter</td><td class="px-4 py-2 border">req / res</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="ctxCode" title="context_methods.go" /></div>
      </section>

      <!-- 2. c.Set / c.Get -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>c.Set / c.Get——中间件链里传值</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">中间件（如认证）把计算结果放进 Context，后续中间件和 Handler 再取出来用。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Set(key, value)</code> 存入任意类型；<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Get</code> 返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">(value, exists)</code>；还有类型安全的方法 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.GetString / c.GetInt / c.GetBool / c.GetStringSlice</code>。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">Auth 中间件解析 Token → 得到 userID</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">c.Set("userID", uid)</code> 存进 Context</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">Handler 里 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">c.GetInt("userID")</code> 取回</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="setgetCode" title="context_set_get.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑：</strong>Context 是<strong>按请求隔离</strong>的，一个请求里 Set 的数据另一个请求看不到——别用它做全局状态。并发请求间共享数据要用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sync.Map</code> 或数据库。<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">c.Get</code> 找不到 key 返回 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">(nil, false)</code>，取 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">c.GetString</code> 这类不存在的 key 会得到零值，不会报错。</p></aside>
      </section>

      <!-- 3. 参数绑定校验流程 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>参数绑定校验流程——go-playground/validator</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Gin 的 validator ≈ <strong>TypeScript 的 Zod / Yup</strong>——在结构体标签上声明校验规则（<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">required、min、max、email、gte、lte</code>），ShouldBind 时自动执行。区别：前端在运行时用 JS 对象校验，Go 在编译期用结构体标签声明。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">校验流程分四步：<strong>① ShouldBindJSON 把 JSON 反序列化进结构体 → ② 结构体字段上的 binding 标签被收集 → ③ go-playground/validator 逐条执行规则 → ④ 失败返回 error 字符串</strong>。这个校验器还支持嵌套、跨字段、条件校验。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">声明结构体 + <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">binding:"rule1,rule2"</code> 标签，多个规则用逗号分隔</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">调用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">c.ShouldBindJSON(&req)</code>，绑定 + 校验一气呵成</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">err != nil 说明绑定或校验失败，返回 400；err == nil 说明全部通过</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="validateCode" title="validate.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 1：</strong>校验错误信息是英文且很啰嗦，直接返回给前端体验差。最佳做法是把 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">err.Error()</code> 解析成「字段 + 规则」的结构，自己拼成友好中文提示。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 2：</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">binding:"required"</code> 对 <strong>int 的 0、string 的 ""、指针的 nil 都视为缺失</strong>。若 0 是合法值，改用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">binding:"omitempty,gte=0"</code> 或指针类型 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">*int</code>。</p></aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>常用规则速查——<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">required / omitempty / min / max / len / gte / lte / email / oneof='a b c' / datetime=2006-01-02</code>。参数校验放<strong>入口统一做</strong>，业务函数只处理合法数据，代码更干净。</p></aside>
      </section>

      <!-- 4. 自定义校验器 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>自定义校验器——RegisterValidation</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">内置规则不够用时，用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">binding.Validator.Engine().(*validator.Validate)</code> 拿到底层校验器，再 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">RegisterValidation("名字", 函数)</code> 注册自定义规则。函数签名是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">validator.Func</code>：收到字段值，返回 bool。</p>
        <div class="mb-4"><Code language="go" :code="customCode" title="custom_validator.go" /></div>
        <p class="text-slate-600 text-sm">注册后就能在标签里用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">binding:"required,phone"</code> 了。init() 在程序启动时执行一次注册，全局生效。</p>
      </section>

      <!-- 5. 中间件做 auth 传用户 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>实战组合：Auth 中间件 + Context 传用户信息</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">把「鉴权 + 传用户」合并成一个中间件，是所有需要登录的接口的标准写法：<strong>解析 Token → 查数据库得到用户 → 失败则 Abort → 成功则 Set 进 Context → Handler 直接取用</strong>。这样 Handler 里不用再碰 Token，只关心业务。</p>
        <div class="mb-4"><Code language="go" :code="authCode" title="auth_middleware.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这就像 <strong>Vue Router 的导航守卫</strong>——进入受保护路由前先 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">beforeEach</code> 检查登录态，放行后组件里用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">useUserStore()</code> 取用户。Go 端把"用户"从中间件一路传进 Handler，等价于把 user 塞进 Pinia store。</p></aside>
      </section>

      <!-- 6. Abort -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>c.Abort 家族——中断请求</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">中间件发现请求不合法（未登录、参数错、限流）时，要<strong>阻止后续 Handler 执行</strong>。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Abort()</code> 只设置"已中断"标记，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.AbortWithStatusJSON(code, obj)</code> 中断 + 直接写 JSON。当前中间件仍需 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">return</code>，否则会继续往下走。</p>
        <div class="mb-4"><Code language="go" :code="abortCode" title="abort.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">行为</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">c.Abort()</td><td class="px-4 py-2 border">中断后续，不写响应</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.AbortWithStatus(code)</td><td class="px-4 py-2 border">中断 + 只写状态码</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.AbortWithStatusJSON(code, obj)</td><td class="px-4 py-2 border">中断 + 写 JSON（最常用）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.IsAborted()</td><td class="px-4 py-2 border">查询是否被中断</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>Abort 之后统一 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">return</code>；不要直接 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">os.Exit</code> 或 panic——Recovery 会兜住 panic，但正常流程用 Abort 才是正道。</p></aside>
      </section>

      <!-- 7. 静态文件 / HTML / JSONP -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>静态文件 / HTML 模板 / JSONP</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 内置静态文件服务与模板渲染：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.Static("/static", "./public")</code> 把磁盘目录映射成 URL 前缀；<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.LoadHTMLGlob</code> + <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.HTML</code> 渲染模板；<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.JSONP</code> 支持老式跨域 JSONP。适合"前端打包产物 + 后端静态托管"的单机部署。</p>
        <div class="mb-4"><Code language="go" :code="staticCode" title="static_html.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑：</strong>HTML 模板要在 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Run()</code> 之前用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">LoadHTMLGlob</code> 加载。生产环境通常用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">embed</code> 把模板打进二进制，再 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">LoadHTMLFiles</code> 加载——否则部署时模板文件容易丢。</p></aside>
      </section>

      <!-- 8. 错误处理 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>错误处理——统一响应 + Recovery 兜底</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">生产级 API 要有<strong>统一响应格式</strong>（如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{code, data, message}</code>），并确保<strong>任何 panic 都不能拖垮整个服务</strong>。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">gin.Recovery()</code> 就是干这个的——捕获 panic、记日志、返回 500，服务继续跑。你还可以把业务错误通过 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.Error(err)</code> 收集，由统一错误中间件汇总处理。</p>
        <div class="mb-4"><Code language="go" :code="errorCode" title="error_handling.go" /></div>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ok() / fail()</code> 封装统一响应格式，Handler 里只调函数、不裸写 gin.H</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">自定义 Recovery 中间件：defer + recover 捕获 panic，记日志 + 返回 500</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">业务里 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">c.AbortWithStatusJSON(500, ...)</code> 而不是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">panic</code>——panic 只留给"真的没想到"的错误</div></li>
        </ol>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>错误处理分层——<strong>入口层</strong>（Recovery + 404 + 统一格式）→ <strong>中间件层</strong>（鉴权失败 Abort）→ <strong>业务层</strong>（正常错误 return + fail()）。能预期到的错误全走 return，不要用 panic 做控制流。</p></aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：参数绑定与校验</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「用有效数据」：JSON 的字段逐个绑定进结构体，validator 校验全部通过（✅ 绿色）。点「用无效数据」：
          username 为空导致 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">binding:"required"</code> 失败（❌ 红色），整个请求返回 400。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 字段数: {{ fields.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 绑定 O(n) · 校验 O(n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runBind(true)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 用有效数据绑定</button>
          <button @mousedown="runBind(false)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">用无效数据绑定</button>
          <button @mousedown="resetAnim" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- JSON 面板 -->
              <v-rect :config="jsonPanelCfg" />
              <v-text :config="jsonTitleCfg" />
              <v-rect v-for="(f,i) in fields" :key="'jf'+i" :config="jsonFieldCfg(f,i)" />
              <v-text v-for="(f,i) in fields" :key="'jft'+i" :config="jsonFieldTextCfg(f,i)" />
              <!-- struct 面板 -->
              <v-rect :config="stPanelCfg" />
              <v-text :config="stTitleCfg" />
              <v-rect v-for="(f,i) in fields" :key="'sf'+i" :config="stFieldCfg(f,i)" />
              <v-text v-for="(f,i) in fields" :key="'sft'+i" :config="stFieldTextCfg(f,i)" />
              <!-- 绑定箭头 -->
              <v-arrow v-for="i in fields.length" :key="'ba'+i" :config="bindArrowCfg(i-1)" />
              <!-- 校验结果徽章 -->
              <v-circle v-for="(f,i) in fields" :key="'bd'+i" :config="badgeCfg(f,i)" />
              <v-text v-for="(f,i) in fields" :key="'bdt'+i" :config="badgeTextCfg(f,i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Context</strong> 承载请求全部信息：Param/Query/Header/ClientIP，贯穿中间件与 Handler</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">c.Set / c.Get</code> 在中间件链传值——认证中间件把用户塞进 Context，Handler 取出用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">binding:"required,email,gte"</code> 声明式校验 ≈ Zod/Yup</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">RegisterValidation</code> 自定义校验器（如手机号格式）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">c.Abort / c.AbortWithStatusJSON</code> 中断请求，配合鉴权中间件</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>静态文件 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">r.Static</code>、模板 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">LoadHTMLGlob</code>、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">c.JSONP</code> 跨域</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>错误处理：统一 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">{code,data,message}</code> + Recovery 兜底 panic</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-5-gin" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Gin 入门</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-7-json-serialization" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：JSON 序列化 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
const userStore = useUserStore()

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "Context 基础" },
  { id: "sec-2", name: "c.Set / c.Get 传值" },
  { id: "sec-3", name: "绑定校验流程" },
  { id: "sec-4", name: "自定义校验器" },
  { id: "sec-5", name: "Auth 中间件实战" },
  { id: "sec-6", name: "c.Abort 中断" },
  { id: "sec-7", name: "静态/HTML/JSONP" },
  { id: "sec-8", name: "错误处理" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-9", name: "小结" },
]

// ===== 🎬 参数绑定校验动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(250), W = ref(700)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const JPX = 20, SPX = 430, ROW_W = 260, ROW_H = 36
const rows = [72, 126, 180]

interface Field { key: string; json: string; rule: string; res: string; hl: boolean }
const fields = reactive<Field[]>([
  { key: 'username', json: 'alice', rule: 'required', res: 'none', hl: false },
  { key: 'password', json: '123456', rule: 'required,min=6', res: 'none', hl: false },
  { key: 'age', json: '25', rule: 'gte=0,lte=150', res: 'none', hl: false },
])
const arrowOn = reactive([false, false, false])

const jsonPanelCfg = { x: JPX, y: 40, width: 300, height: 195, fill: '#f1f5f9', cornerRadius: 10, stroke: '#94a3b8', strokeWidth: 1 }
const jsonTitleCfg = { x: JPX, y: 52, width: 300, text: 'JSON Body（请求体）', fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#334155', align: 'center' }
const stPanelCfg = { x: SPX, y: 40, width: 260, height: 195, fill: '#f1f5f9', cornerRadius: 10, stroke: '#94a3b8', strokeWidth: 1 }
const stTitleCfg = { x: SPX, y: 52, width: 260, text: 'LoginRequest struct', fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#334155', align: 'center' }

function jsonFieldCfg(f: Field, i: number) {
  return { x: JPX + 15, y: rows[i], width: 180, height: ROW_H, cornerRadius: 6,
    fill: f.hl ? C.green : '#ffffff', stroke: f.hl ? '#22c55e' : '#94a3b8', strokeWidth: f.hl ? 2 : 1 }
}
function jsonFieldTextCfg(f: Field, i: number) {
  return { x: JPX + 15, y: rows[i], width: 180, height: ROW_H, text: `${f.key}: '${f.json}'`,
    fontSize: 12, fontFamily: 'monospace', fill: '#0f172a', align: 'center', verticalAlign: 'middle' }
}
function stFieldCfg(f: Field, i: number) {
  return { x: SPX + 5, y: rows[i], width: ROW_W, height: ROW_H, cornerRadius: 6,
    fill: f.res === 'fail' ? '#fef2f2' : (f.hl ? '#ecfdf5' : '#ffffff'),
    stroke: f.res === 'fail' ? '#ef4444' : (f.hl ? '#22c55e' : '#94a3b8'), strokeWidth: f.res === 'fail' || f.hl ? 2 : 1 }
}
function stFieldTextCfg(f: Field, i: number) {
  return { x: SPX + 8, y: rows[i], width: ROW_W - 24, height: ROW_H, text: `${f.key}  binding:"${f.rule}"`,
    fontSize: 11, fontFamily: 'monospace', fill: '#334155', verticalAlign: 'middle' }
}
function bindArrowCfg(i: number) {
  const on = arrowOn[i]
  return { points: [JPX + 200, rows[i] + ROW_H / 2, SPX, rows[i] + ROW_H / 2],
    fill: C.green, stroke: C.green, strokeWidth: on ? 2 : 0, opacity: on ? 1 : 0,
    pointerLength: 8, pointerWidth: 6 }
}
function badgeCfg(f: Field, i: number) {
  const r = f.res === 'ok' ? 11 : f.res === 'fail' ? 11 : 0
  return { x: SPX + ROW_W - 4, y: rows[i] + ROW_H / 2, radius: r,
    fill: f.res === 'ok' ? C.green : f.res === 'fail' ? C.red : 'transparent', opacity: r ? 1 : 0 }
}
function badgeTextCfg(f: Field, i: number) {
  const t = f.res === 'ok' ? '✓' : f.res === 'fail' ? '✗' : ''
  return { x: SPX + ROW_W - 15, y: rows[i] + ROW_H / 2 - 10, width: 22, height: 20, text: t,
    fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle', opacity: t ? 1 : 0 }
}

function resetField() {
  fields.forEach(f => { f.res = 'none'; f.hl = false })
  arrowOn.forEach((_, i) => arrowOn[i] = false)
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function runBind(valid: boolean) {
  act(valid ? '绑定有效数据' : '绑定无效数据', async () => {
    resetField()
    const data = valid
      ? { username: 'alice', password: '123456', age: '25' }
      : { username: '', password: '123456', age: '25' }
    fields[0].json = data.username
    fields[1].json = data.password
    fields[2].json = data.age
    // 逐字段绑定
    for (let i = 0; i < fields.length; i++) {
      fields[i].hl = true
      status.value = `绑定 ${fields[i].key} → struct`
      await d(420)
      arrowOn[i] = true
      await d(320)
      fields[i].hl = false
      await d(180)
    }
    status.value = 'validator 开始按 binding 标签校验'
    await d(600)
    // 逐条校验
    for (let i = 0; i < fields.length; i++) {
      const ok = valid || i !== 0   // 无效数据：username 为空 → required 失败
      fields[i].res = ok ? 'ok' : 'fail'
      status.value = `校验 ${fields[i].key}: ${fields[i].rule} → ${ok ? '✅ 通过' : '❌ 失败'}`
      await d(500)
    }
    status.value = valid ? '✅ 校验全部通过 → c.JSON(200)' : '❌ 校验失败 → c.JSON(400, error)'
    await d(900)
    resetField()
    status.value = ''
  })
}

function resetAnim() { busy.value = false; resetField(); status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const ctxCode = `package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/user/:id", func(c *gin.Context) {
        id := c.Param("id")                          // 路径参数
        page := c.DefaultQuery("page", "1")          // query，带默认值
        token := c.GetHeader("Authorization")        // 请求头
        ip := c.ClientIP()                           // 客户端 IP
        c.JSON(200, gin.H{
            "id": id, "page": page, "token": token, "ip": ip,
        })
    })
    r.Run(":8080")
}
// curl '/user/7?page=2' -H 'Authorization: Bearer abc'
// 输出: {"id":"7","page":"2","token":"Bearer abc","ip":"127.0.0.1"}`

const setgetCode = `package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.Use(Auth())                                  // 全局挂认证中间件
    r.GET("/me", func(c *gin.Context) {
        uid := c.GetInt("userID")                  // 类型安全取回 int
        name := c.GetString("userName")            // 取回 string
        c.JSON(200, gin.H{"uid": uid, "name": name})
    })
    r.Run(":8080")
}

// Auth 中间件：解析 Token → 得到用户 → Set 进 Context
func Auth() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
            return
        }
        // 简化：真实项目从这里解析 JWT，查数据库拿到完整用户
        c.Set("userID", 42)
        c.Set("userName", "alice")
        c.Next()
    }
}
// curl /me -H 'Authorization: Bearer xxx'
// 输出: {"uid":42,"name":"alice"}`

const validateCode = `package main

import (
    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
)

type CreateUserReq struct {
    Name  string \`json:"name" binding:"required,min=2,max=50"\`
    Email string \`json:"email" binding:"required,email"\`
    Age   int    \`json:"age" binding:"gte=0,lte=150"\`
}

func main() {
    r := gin.Default()
    r.POST("/users", createUser)
    r.Run(":8080")
}

func createUser(c *gin.Context) {
    var req CreateUserReq
    if err := c.ShouldBindJSON(&req); err != nil {
        // 校验失败：err 里带字段名 + 规则名
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // 走到这里：绑定 + 校验全部通过
    c.JSON(200, gin.H{"created": req.Name})
}
// POST /users  {"name":"A","email":"bad","age":200}
// 输出: {"error":"Key: 'CreateUserReq.Name' Error:Field validation for 'Name' failed on the 'min' tag ..."}
// POST /users  {"name":"Alice","email":"a@b.com","age":25}
// 输出: {"created":"Alice"}`

const customCode = `package main

import (
    "regexp"
    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
    "github.com/gin-gonic/gin/binding"
)

type RegReq struct {
    Phone string \`json:"phone" binding:"required,phone"\`  // 使用自定义规则 phone
}

// 自定义校验函数：校验手机号格式
var phoneValidator validator.Func = func(fl validator.FieldLevel) bool {
    ok, _ := regexp.MatchString(\`^1[3-9]\\d{9}$\`, fl.Field().String())
    return ok
}

func init() {
    // 拿到底层 validator 引擎，注册自定义规则（程序启动时执行一次）
    if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
        v.RegisterValidation("phone", phoneValidator)
    }
}

func main() {
    r := gin.Default()
    r.POST("/register", func(c *gin.Context) {
        var req RegReq
        if err := c.ShouldBindJSON(&req); err != nil {
            c.JSON(400, gin.H{"error": err.Error()})
            return
        }
        c.JSON(200, gin.H{"phone": req.Phone})
    })
    r.Run(":8080")
}
// POST /register  {"phone":"13800138000"}
// 输出: {"phone":"13800138000"}
// POST /register  {"phone":"12345"}
// 输出: {"error":"Key: 'RegReq.Phone' Error:Field validation for 'Phone' failed on the 'phone' tag"}`

const authCode = `package main

import "github.com/gin-gonic/gin"

// 需要登录的接口：先用 AuthRequired 中间件，再进业务
func main() {
    r := gin.Default()
    // 路由级中间件——只有 /profile 需要登录
    r.GET("/profile", AuthRequired(), func(c *gin.Context) {
        // 用户信息已由中间件塞进 Context，直接取用
        uid := c.GetInt("userID")
        c.JSON(200, gin.H{"uid": uid, "profile": "这是你的私人资料"})
    })
    r.Run(":8080")
}

func AuthRequired() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        user, err := findUserByToken(token)
        if err != nil {
            c.AbortWithStatusJSON(401, gin.H{"code": 401, "message": "请先登录"})
            return   // 中断，/profile 的 Handler 不会执行
        }
        c.Set("userID", user.ID)
        c.Set("userName", user.Name)
        c.Next()
    }
}

type User struct { ID int; Name string }

func findUserByToken(token string) (*User, error) {
    if token == "" { return nil, fmt.Errorf("empty") }
    return &User{ID: 42, Name: "alice"}, nil  // 简化
}
// 不带 Token 访问 /profile
// 输出: {"code":401,"message":"请先登录"}
// 带 Token 访问 /profile
// 输出: {"uid":42,"profile":"这是你的私人资料"}`

const abortCode = `package main

import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default()
    r.GET("/secure", AuthRequired(), func(c *gin.Context) {
        c.JSON(200, gin.H{"secret": "ok"})
    })
    r.Run(":8080")
}

func AuthRequired() gin.HandlerFunc {
    return func(c *gin.Context) {
        if c.GetHeader("Authorization") == "" {
            // 中断 + 写 JSON，后续 Handler 不会执行
            c.AbortWithStatusJSON(401, gin.H{"code": 401, "error": "请先登录"})
            return   // 关键：Abort 后仍要 return，否则还会继续执行
        }
        c.Next()
    }
}
// 不带 Token 访问 /secure
// 输出: {"code":401,"error":"请先登录"}（Handler 未执行）
// c.Abort()                 只中断，不写响应
// c.AbortWithStatus(403)    中断 + 状态码
// c.AbortWithStatusJSON()   中断 + JSON（最常用）`

const staticCode = `package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // ① 静态文件目录——/static/xxx 映射到 ./public/xxx
    r.Static("/static", "./public")
    // 单个静态文件
    r.StaticFile("/favicon.ico", "./public/favicon.ico")
    // 用 http.Dir 控制目录（可配合文件系统抽象）
    r.StaticFS("/files", http.Dir("./uploads"))

    // ② HTML 模板渲染
    r.LoadHTMLGlob("templates/*.tmpl")
    r.GET("/index", func(c *gin.Context) {
        c.HTML(200, "index.tmpl", gin.H{"title": "Gin 教程"})
    })

    // ③ JSONP——支持 callback 参数（老式跨域）
    r.GET("/jsonp", func(c *gin.Context) {
        c.JSONP(200, gin.H{"msg": "hi"})
    })

    r.Run(":8080")
}
// curl http://localhost:8080/static/css/app.css  → 返回 ./public/css/app.css 内容
// curl 'http://localhost:8080/jsonp?callback=myCallback'
// 输出: myCallback({"msg":"hi"});`

const errorCode = `package main

import (
    "log"
    "net/http"
    "github.com/gin-gonic/gin"
)

// 统一响应格式：{code, data, message}
func ok(c *gin.Context, data any)     { c.JSON(200, gin.H{"code": 0, "data": data, "message": "ok"}) }
func fail(c *gin.Context, code int, msg string) {
    c.JSON(code, gin.H{"code": code, "data": nil, "message": msg})
}

// 自定义 Recovery——捕获 panic，不让服务崩溃
func Recovery() gin.HandlerFunc {
    return func(c *gin.Context) {
        defer func() {
            if r := recover(); r != nil {
                log.Printf("panic recovered: %v", r)
                fail(c, http.StatusInternalServerError, "internal server error")
                c.Abort()
            }
        }()
        c.Next()
    }
}

func main() {
    r := gin.New()
    r.Use(Recovery())
    r.GET("/ping", func(c *gin.Context) { ok(c, gin.H{"pong": true}) })
    r.GET("/boom", func(c *gin.Context) {
        panic("数据库连接池满了")   // 模拟未预期错误
    })
    r.Run(":8080")
}
// curl /ping
// 输出: {"code":0,"data":{"pong":true},"message":"ok"}
// curl /boom
// 输出: {"code":500,"data":null,"message":"internal server error"}（服务进程不崩溃）`
</script>
