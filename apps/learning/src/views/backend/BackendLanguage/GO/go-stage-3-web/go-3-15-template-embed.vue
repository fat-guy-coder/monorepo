<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📄 模板与文件嵌入</h1>
          <p class="text-sm text-slate-500 mt-1">html/template · go:embed —— 单二进制部署 + 安全模板渲染</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/web/go-3-15-template-embed.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-15</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：go:embed 打包流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">//go:embed</code> 是<strong>编译期指令</strong>：
          在 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">var</code> 声明前的注释里写上它，Go 编译器就会把指定的文件<strong>原样塞进二进制</strong>。
          运行时程序读到的是一份<strong>只读的内存文件系统（embed.FS）</strong>——不再依赖磁盘上的 templates/ 目录。
          模板再交给 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">template.ParseFS</code> 解析、<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">Execute</code> 注入数据渲染成 HTML。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 330" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="te-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="te-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
            </defs>

            <!-- ① 模板源文件 -->
            <text x="89" y="26" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#1e293b">① 模板源文件 templates/</text>
            <rect x="14" y="36" width="150" height="170" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <rect x="34" y="56" width="110" height="32" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="89" y="72" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#334155">index.html</text>
            <rect x="34" y="96" width="110" height="32" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="89" y="112" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#334155">list.html</text>
            <rect x="34" y="136" width="110" height="32" rx="4" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
            <text x="89" y="152" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#334155">layout.html</text>
            <text x="89" y="192" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">编译时被读取</text>

            <line x1="164" y1="120" x2="228" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#te-arr)" />

            <!-- ② go build -->
            <text x="295" y="26" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#1e293b">② go build 编译</text>
            <rect x="230" y="88" width="130" height="64" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="295" y="108" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">//go:embed</text>
            <text x="295" y="126" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#b45309">把文件字节</text>
            <text x="295" y="140" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#b45309">打包进二进制</text>

            <line x1="360" y1="120" x2="418" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#te-arr)" />

            <!-- ③ 二进制 -->
            <rect x="420" y="70" width="160" height="110" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="500" y="92" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">③ 二进制可执行文件</text>
            <text x="500" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">embed.FS</text>
            <text x="500" y="130" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">只读内存文件系统</text>
            <text x="500" y="158" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ecfdf5">部署只需这一个文件！</text>

            <line x1="500" y1="180" x2="500" y2="212" stroke="#94a3b8" stroke-width="2" marker-end="url(#te-arr)" />

            <!-- ④ ParseFS -->
            <rect x="420" y="214" width="160" height="52" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="500" y="230" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0369a1">④ template.ParseFS</text>
            <text x="500" y="248" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#0369a1">从 embed.FS 解析模板</text>

            <line x1="580" y1="240" x2="612" y2="240" stroke="#94a3b8" stroke-width="2" marker-end="url(#te-green)" />

            <!-- ⑤ Execute -->
            <rect x="614" y="214" width="92" height="52" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="660" y="230" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">⑤ t.Execute</text>
            <text x="660" y="248" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#14532d">w, data 渲染</text>

            <text x="360" y="300" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">⑥ 输出：渲染好的完整 HTML → 作为 HTTP 响应返回浏览器</text>

            <text x="360" y="324" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#ef4444">⚠️ go:embed 只能注解 package 级静态 var 声明；路径编译期确定；嵌入内容只读，运行时改不了</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：go:embed 打包流程——模板文件在编译时进二进制 → 运行只读的 embed.FS → ParseFS 解析 → Execute 注入数据渲染 HTML，全程不碰磁盘</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么用 embed -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要 embed — 运行时读文件的三个坑
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">embed</code> 出现之前（Go 1.16 前），服务端模板文件只能用
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">os.ReadFile("templates/index.html")</code> 运行时从磁盘读。
          这在<strong>部署时是灾难</strong>：你得把二进制 + templates/ 目录一起拷到服务器，还要保证相对路径对。
          Docker 里路径一歪就 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">file not found</code>。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>坑 1：部署要带一堆文件</strong>。二进制 + 模板 + 静态资源，少拷一个就 500。embed 后<strong>只有一个二进制</strong>，拷一个文件就是全部。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>坑 2：相对路径依赖工作目录</strong>。用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">systemd</code> 时工作目录可能不是二进制所在目录，路径全乱。embed 与工作目录无关。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>坑 3：Docker 镜像变大、层更复杂</strong>。多阶段构建时要把文件 COPY 进镜像；embed 后镜像只有一层，还能配合 scratch 镜像做<strong>几 MB 的极简容器</strong>。</div>
          </li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">//go:embed</code> ≈ <strong>Webpack / Vite 的静态资源打包</strong>——
          构建时把 HTML/CSS/JS 打进 bundle，部署只上一个 dist 目录（甚至打进镜像）；<br/>
          也 ≈ <strong>import.meta.glob 批量导入文件</strong>——都是"编译时知道有哪些文件、运行时当作常量用"。
          区别是 Go 更进一步，把文件变成了<strong>只读内存文件系统</strong>，模板还能在里面直接解析。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>embed 是<strong>编译期</strong>行为。改模板后不重新 <code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">go build</code>，线上还是旧内容——
          没有"改完就生效"，需要配合 CI/CD 重新构建发布。也正因为只读，<strong>运行时不可能被篡改</strong>，安全性反而更好。</p>
        </aside>
      </section>

      <!-- 2. go:embed 三种形式 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          go:embed 三种形式 + 只读限制
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          嵌入的目标类型决定你拿到的是什么：
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">string</code>（一个文件的内容当字符串）、
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">[]byte</code>（一个文件的原始字节）、
          <strong><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">embed.FS</code></strong>（<strong>一批文件</strong>，能按路径读取，是模板解析的标准搭配）。
          <strong>硬性约束</strong>：只能是<strong> package 级 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">var</code> 声明</strong>（不能注解局部变量、不能注解 const），
          嵌入路径<strong>编译期确定</strong>（不能是变量或通配出动态路径），内容<strong>只读</strong>。
        </p>

        <div class="mb-4"><Code language="go" :code="formsCode" title="embed_forms.go — 三种形式" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>模式语法</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">//go:embed dir/*</code> 匹配目录下所有文件（含子目录用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">dir/**/*</code>）；匹配不到文件会<strong>编译报错</strong>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>embed.FS 的路径</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fs.ReadFile(fs, "templates/index.html")</code> 用<strong>正斜杠 + 相对 embed 模式的前缀路径</strong>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>禁止的写法</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">//go:embed</code> 不能用于 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">const</code>、不能带 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">../</code> 越界、不能嵌入隐藏文件（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">_</code>/<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">.</code> 开头）。</div>
          </li>
        </ol>
      </section>

      <!-- 3. ParseFS + Execute -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          template.ParseFS + t.Execute — 数据注入
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">template.ParseFS(fs, "templates/*.html")</code>
          会扫描 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">embed.FS</code> 里匹配模式的<strong>所有</strong>文件，各解析成一个模板并放进同一个 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">*template.Template</code>。
          之后 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">ExecuteTemplate(w, "index.html", data)</code> 挑出名字叫 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">index.html</code> 的那个渲染，把 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">data</code> 注入进去。
          <strong>名字就是文件名本身</strong>（除非文件里用 <code v-pre class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">{{define}}</code> 重命名）。
        </p>

        <div class="mb-4"><Code language="go" :code="parseCode" title="template_parse.go — 完整渲染流程" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>ParseFS 一次搞定所有模板</strong>——别对每个文件调一次 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Parse</code>，否则会各自成独立集合。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>ExecuteTemplate 按名字渲染</strong>；只有一个模板时可直接 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Execute(w, data)</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>数据是任意 struct/map</strong>：<code v-pre class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">{{.Title}}</code> 取字段，字段名<strong>大小写不敏感</strong>（不推荐依赖），暴露了 Setter 也行。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>模板可以定义函数</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">template.New("x").Funcs(template.FuncMap{"upper": strings.ToUpper})</code>，模板里 <code v-pre class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">{{.Name | upper}}</code> 管道调用。</div>
          </li>
        </ol>
      </section>

      <!-- 4. 自动转义防 XSS -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          html/template 自动转义 — 白捡的 XSS 防护
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">text/template</code> 渲染 HTML 等于裸奔——
          用户输入 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">&lt;script&gt;alert(1)&lt;/script&gt;</code> 会被原样插进页面执行。
          而 <strong><code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">html/template</code></strong> 会在渲染时<strong>根据上下文自动转义</strong>：
          在标签内容里转义成 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">&amp;lt;script&amp;gt;…</code>，在属性值/URL/JS 里也各有对应转义规则。
          它甚至能识别 <code v-pre class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">&lt;a href="{{.URL}}"&gt;</code> 里的 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">javascript:</code> 危险协议并过滤。
        </p>

        <div class="mb-4"><Code language="go" :code="xssCode" title="xss.go — 自动转义 vs 裸奔" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别用 template.HTML 白名单。</strong><code class="bg-amber-100 text-amber-700 px-1 rounded text-xs font-mono">template.HTML("...")</code> 会跳过转义。
          只有在你<strong>完全信任</strong>内容是自家渲染出来的（如 markdown 转出的安全 HTML）才用；用户输入直接包 template.HTML 等于亲手关掉防护。
          富文本场景请用经过 sanitize 的白名单库。</p>
        </aside>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">html/template</code> 的自动转义 ≈ React/Vue 的<strong>默认文本插值</strong>：
          Vue 的 <code v-pre class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">{{ name }}</code> 会把值当文本、自动转义，
          而 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">v-html</code> 就像 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">template.HTML</code>——能注入 HTML，也同时是 XSS 的口子。
          前端的 XSS 治理经验（<strong>默认转义、白名单、禁用 v-html</strong>）在 Go 里一字不差地复用。
          </p>
        </aside>
      </section>

      <!-- 5. 模板语法 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          模板语法 — <span v-pre>{{.}} {{if}} {{range}}</span> 与 Layout 复用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          模板语法核心就三个：<strong v-pre>{{.}}</strong>（当前数据）、<strong v-pre>{{if}}</strong>（条件）、<strong v-pre>{{range}}</strong>（循环）。
          它们都支持 <strong>else</strong> 分支。大站点普遍用 <strong>Layout 模板</strong>：
          把公共外壳（head/nav/footer）写进 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">layout.html</code>，页面模板用
          <code v-pre class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">{{define "content"}}</code> 定义内容块，Layout 里用
          <code v-pre class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">{{template "content" .}}</code> 注入。
        </p>

        <div class="mb-4"><Code language="go" :code="syntaxCode" title="templates/ — 模板文件（注意 html/template 会转义）" /></div>
        <div class="mb-4"><Code language="go" :code="layoutGoCode" title="layout.go — Layout 复用渲染" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">语法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr v-pre><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{.}}</td><td class="px-4 py-2 border border-slate-200">当前数据对象</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{.Title}}</td></tr>
              <tr v-pre><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{if}}</td><td class="px-4 py-2 border border-slate-200">条件分支（空值=false）</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{if .Admin}}…{{else}}…{{end}}</td></tr>
              <tr v-pre><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{range}}</td><td class="px-4 py-2 border border-slate-200">遍历 slice/map</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{range .Items}}…{{end}}</td></tr>
              <tr v-pre><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{define}}</td><td class="px-4 py-2 border border-slate-200">定义命名块</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{define "content"}}…{{end}}</td></tr>
              <tr v-pre><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{template}}</td><td class="px-4 py-2 border border-slate-200">调用命名块</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{template "content" .}}</td></tr>
              <tr v-pre><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{. | fn}}</td><td class="px-4 py-2 border border-slate-200">管道：传给函数</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">{{.Name | upper}}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. 最佳实践 + 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          运行时读文件 vs embed + 最佳实践
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">运行时读文件</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">go:embed</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">部署</td><td class="px-4 py-2 border border-slate-200">二进制 + 模板/静态资源都要带上</td><td class="px-4 py-2 border border-slate-200"><strong>单文件</strong>，拷一个就齐</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">运行时依赖</td><td class="px-4 py-2 border border-slate-200">依赖工作目录/文件系统</td><td class="px-4 py-2 border border-slate-200">无，内容在内存里</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">修改生效</td><td class="px-4 py-2 border border-slate-200">改文件即生效（开发爽）</td><td class="px-4 py-2 border border-slate-200">必须重新 build</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">安全</td><td class="px-4 py-2 border border-slate-200">文件可被外部篡改</td><td class="px-4 py-2 border border-slate-200">只读，运行时改不了</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">适用</td><td class="px-4 py-2 border border-slate-200">模板频繁改、想热更新的内部工具</td><td class="px-4 py-2 border border-slate-200"><strong>生产服务首选</strong>（版本锁死，可复现）</td></tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>✅ <strong>优先 html/template 而非 text/template</strong>——自动转义是免费的 XSS 防护。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>✅ <strong>ParseFS 一次打包所有模板</strong>，用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">template.Must</code> 包住——解析失败宁愿启动就崩，也不要运行到一半才报错。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>✅ <strong>Layout 复用外壳</strong>，页面只写内容块，别每个页面复制一遍 nav。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>✅ 静态资源（CSS/JS/图片）同样 embed，用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">http.FileServer(http.FS(staticFS))</code> 托管。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>⚠️ 别把 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">template.HTML</code> 用在用户输入上；embed 文件改了必须重新构建发布。</span></li>
        </ul>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 落地效果：</strong>web 服务 + 模板 + 静态资源全部 embed 后，<code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">go build</code> 出一个可执行文件，
          配合 <code class="bg-emerald-100 text-emerald-700 px-1 rounded text-xs font-mono">FROM scratch</code> 的 Dockerfile，镜像能压到十几 MB——这正是「单二进制部署」的核心卖点。</p>
        </aside>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">//go:embed</code> 编译期把文件打进二进制，三种形态：<strong>string / []byte / embed.FS</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>只注解 <strong>package 级静态 var</strong>，路径编译期确定，内容<strong>只读</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">template.ParseFS</code> 批量解析 → <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">ExecuteTemplate(w, name, data)</code> 注入数据渲染</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>html/template 自动转义</strong>防 XSS；<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">template.HTML</code> 是例外，慎用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>语法核心：<strong v-pre>{{.}} / {{if}} / {{range}}</strong>，Layout 用 <code v-pre class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">{{define}} + {{template}}</code> 复用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>收益：<strong>单二进制部署</strong>、与工作目录无关、镜像极小、内容不可篡改</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-14-graceful-shutdown" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：优雅关停</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-16-swagger" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Swagger →</RouterLink>
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
  { id: "sec-1", name: "为什么用 embed" },
  { id: "sec-2", name: "三种形式与限制" },
  { id: "sec-3", name: "ParseFS 与 Execute" },
  { id: "sec-4", name: "自动转义防 XSS" },
  { id: "sec-5", name: "模板语法与 Layout" },
  { id: "sec-6", name: "对比与最佳实践" },
  { id: "sec-7", name: "小结" },
]

// ===== 代码示例 =====
const formsCode = `// embed_forms.go — go:embed 的三种形式
package main

import (
    "embed"
    "io/fs"
    "log"
)

// 形式一：嵌入单个文件 → string（适合小配置）
//
//go:embed version.txt
var version string

// 形式二：嵌入单个文件 → []byte（适合二进制内容）
//
//go:embed logo.png
var logo []byte

// 形式三：嵌入一批文件 → embed.FS（模板/静态资源首选）
//
//go:embed templates/*
//go:embed static/*
var content embed.FS

func main() {
    log.Println("version:", version)
    log.Println("logo 字节数:", len(logo))

    // embed.FS 按路径读取（正斜杠，前缀是 embed 模式）
    b, err := fs.ReadFile(content, "templates/index.html")
    if err != nil {
        log.Fatal(err)
    }
    log.Printf("模板 %d 字节", len(b))
}
// 输出:
// version: v1.0.0
// logo 字节数: 2048
// 模板 1024 字节`

const parseCode = `// template_parse.go — ParseFS 解析 + Execute 注入数据
package main

import (
    "html/template"
    "log"
    "net/http"
)

//go:embed templates/*.html
var tmplFS embed.FS

type PageData struct {
    Title   string
    Message string
    Users   []string
}

func main() {
    // 一次解析全部模板；Must 让解析失败在启动时就崩
    tmpl := template.Must(template.ParseFS(tmplFS, "templates/*.html"))

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        data := PageData{
            Title:   "首页",
            Message: "欢迎回来",
            Users:   []string{"Alice", "Bob"},
        }
        // 按模板名渲染（名字默认就是文件名）
        if err := tmpl.ExecuteTemplate(w, "index.html", data); err != nil {
            http.Error(w, err.Error(), 500)
        }
    })

    log.Println("listening :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
// 浏览器访问 / 看到:
// <h1>首页</h1><p>欢迎回来</p><ul><li>Alice</li><li>Bob</li></ul>`

const xssCode = `// xss.go — html/template 自动转义 vs 裸奔
package main

import (
    "html/template"
    "os"
)

func main() {
    userInput := "<script>alert('xss')<\/script>"
    evilLink := "javascript:alert(1)"

    // ✅ html/template：自动转义，脚本变成无害文本
    t, _ := template.New("safe").Parse(
        "<p>{{.}}</p><a href=\"{{.URL}}\">go</a>")
    t.Execute(os.Stdout, struct {
        Input string
        URL   string
    }{userInput, evilLink})
    // 输出:
    // <p>&lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;</p>
    // <a href="ZgotmplZ">go</a>      ← 危险协议被替换成 ZgotmplZ 占位

    // ❌ 用 text/template 就裸奔了
    t2, _ := template.New("raw").Parse("<p>{{.}}</p>")
    t2.Execute(os.Stdout, userInput)
    // 输出: <p><script>alert('xss')<\/script></p>   ← 浏览器会执行！
}

// ⚠️ template.HTML() 会跳过转义——只有绝对信任才用
// html := template.HTML("<b>自家生成的</b>")`

const syntaxCode = `<!-- templates/index.html — 模板文件（配合 html/template 自动转义） -->
<html>
<head><title>{{.Title}}</title></head>
<body>
  <h1>{{.Message}}</h1>

  <!-- {{if}} 条件：空值/零值 = false -->
  {{if .IsAdmin}}
    <a href="/admin">管理后台</a>
  {{else}}
    <span>普通用户</span>
  {{end}}

  <!-- {{range}} 循环遍历 -->
  <ul>
  {{range .Users}}
    <li>{{.}}</li>          <!-- {{.}} 在 range 内是当前元素 -->
  {{end}}
  </ul>

  <!-- 管道调用模板函数 -->
  <p>{{.Title | upper}}</p>
</body>
</html>

<!-- layouts/layout.html — 公共外壳，内容块用 {{template "content" .}} 占位 -->
<html>
<head><title>{{.Title}}</title></head>
<body>
  <nav>Logo · 首页 · 关于</nav>
  {{template "content" .}}   <!-- 页面内容注入到这里 -->
  <footer>© 2026</footer>
</body>
</html>

<!-- pages/home.html — 页面只定义内容块 -->
{{define "content"}}
<h1>{{.Title}}</h1>
<p>{{.Message}}</p>
{{end}}`

const layoutGoCode = `// layout.go — Layout 复用：外壳 + 内容块拼装
func render(w http.ResponseWriter, page string, data any) {
    // 解析时把 layout 和 pages 一起放进同一个集合
    tmpl, err := template.ParseFS(fs,
        "layouts/layout.html",       // 外壳（含 {{template "content" .}}）
        "pages/*.html",              // 各页面（都 {{define "content"}}）
    )
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }
    // 执行外壳模板；它内部会自动调用名为 content 的块
    if err := tmpl.ExecuteTemplate(w, "layout.html", data); err != nil {
        http.Error(w, err.Error(), 500)
    }
}

// 好处：nav/footer 只写一次；加新页面只需新增一个 pages/xx.html
// 各页面共用同一外壳，改 Layout 全局生效，符合"DRY"原则`
</script>
