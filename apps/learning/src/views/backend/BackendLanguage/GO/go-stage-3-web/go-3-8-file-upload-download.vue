<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">文件上传与下载</h1><p class="text-sm text-slate-500 mt-1">单文件/多文件上传 · 静态服务 · 流式下载</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/web/go-3-8-file-upload-download.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-8</span></div></div></header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：multipart 上传 &amp; 下载流程</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>上传</strong>：浏览器用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">multipart/form-data</code> 把文件切成带 boundary 的 body → 服务器 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ParseMultipartForm</code> 解析 → <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">FormFile</code> 取出 → 落盘。<strong>下载</strong>：服务器 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.File</code> 返回文件，配合 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Content-Disposition: attachment</code> 强制浏览器下载。
        </p>

        <figure>
          <svg viewBox="0 0 720 330" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="fu-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
            </defs>

            <!-- 上传流程 -->
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">上传：浏览器 → multipart body → 服务器 → 磁盘</text>
            <text x="85" y="46" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">① 表单提交</text>
            <text x="243" y="46" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">② 网络传输</text>
            <text x="431" y="46" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">③ 解析请求</text>
            <text x="622" y="46" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">④ 保存落盘</text>

            <rect x="20" y="56" width="110" height="66" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="75" y="82" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">浏览器</text>
            <text x="75" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">&lt;input file&gt;</text>

            <rect x="168" y="56" width="150" height="66" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="243" y="82" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">multipart body</text>
            <text x="243" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">boundary 分隔块</text>

            <rect x="356" y="56" width="150" height="66" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="431" y="82" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">Gin 服务器</text>
            <text x="431" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">ParseMultipartForm</text>

            <rect x="544" y="56" width="156" height="66" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="622" y="82" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">磁盘</text>
            <text x="622" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#14532d">uploads/photo.jpg</text>

            <line x1="130" y1="89" x2="168" y2="89" stroke="#4ade80" stroke-width="2" marker-end="url(#fu-g)" />
            <line x1="318" y1="89" x2="356" y2="89" stroke="#4ade80" stroke-width="2" marker-end="url(#fu-g)" />
            <line x1="506" y1="89" x2="544" y2="89" stroke="#4ade80" stroke-width="2" marker-end="url(#fu-g)" />
            <text x="149" y="134" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">Content-Type: multipart/form-data</text>
            <text x="337" y="134" text-anchor="middle" font-size="9" font-family="monospace" fill="#64748b">FormFile → io.Copy</text>

            <!-- 下载流程 -->
            <text x="16" y="152" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">下载：服务器 → Content-Disposition → 客户端</text>
            <text x="85" y="176" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">① 读取文件</text>
            <text x="270" y="176" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">② 强制下载头</text>
            <text x="455" y="176" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">③ 浏览器落盘</text>

            <rect x="20" y="186" width="130" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="85" y="210" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b45309">磁盘文件</text>
            <text x="85" y="230" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">go.png</text>

            <rect x="190" y="186" width="160" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="270" y="210" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">c.File / ServeFile</text>
            <text x="270" y="230" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">Content-Disposition</text>

            <rect x="390" y="186" width="130" height="60" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
            <text x="455" y="210" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">浏览器</text>
            <text x="455" y="230" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">自动保存</text>

            <line x1="150" y1="216" x2="190" y2="216" stroke="#4ade80" stroke-width="2" marker-end="url(#fu-g)" />
            <line x1="350" y1="216" x2="390" y2="216" stroke="#4ade80" stroke-width="2" marker-end="url(#fu-g)" />

            <text x="360" y="286" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">attachment = 强制下载 · inline = 浏览器内预览 · 中文文件名用 filename*=UTF-8'' 编码</text>
            <text x="360" y="306" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">上传大小限制 MaxBytesReader · 内存阈值 MaxMultipartMemory · 断点续传用 http.ServeContent</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：上半部分是上传（multipart 四步），下半部分是下载（响应头驱动）；上传下载都是文件块的流式移动</figcaption>
        </figure>
      </section>

      <!-- 1. multipart/form-data 原理 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>multipart/form-data——文件上传的编码方式</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
        浏览器 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">&lt;form enctype="multipart/form-data"&gt;</code> 或 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">new FormData()</code> + <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">fetch</code>，就会生成这种 body。前端 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">formData.append('file', fileInput.files[0])</code> ↔ 后端 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">c.FormFile("file")</code>——两边的 <strong>key 必须一致</strong>。
        </p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">普通表单用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">application/x-www-form-urlencoded</code>（键值对），不适合二进制文件。multipart 用随机 <strong>boundary</strong> 把 body 切成多个块，每块自带 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Content-Disposition</code>，既能传文件又能传普通字段。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">前端设置 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Content-Type: multipart/form-data; boundary=----xxx</code></div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">body 由多个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">--boundary</code> 分隔的块组成，每个块头部声明 name 和文件名</div></li>
          <li class="flex gap-3"><span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">服务器按 boundary 拆分，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">name</code> 相同的块合并成文件/字段</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="uploadCode" title="upload.go" /></div>
      </section>

      <!-- 2. 单文件上传 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>单文件上传——c.FormFile + SaveUploadedFile</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Gin 把 multipart 解析封装得很简洁：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.FormFile("file")</code> 返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*multipart.FileHeader</code>（含文件名、大小、Content-Type 元信息），<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.SaveUploadedFile(header, 路径)</code> 内部用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">io.Copy</code> 流式落盘，不会把整个文件读进内存。</p>
        <div class="mb-4"><Code language="go" :code="singleCode" title="single_upload.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 1：</strong>文件名是<strong>客户端传的</strong>，直接 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">file.Filename</code> 拼路径有<strong>路径穿越攻击</strong>风险（如 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">../../etc/passwd</code>）。要 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">filepath.Base()</code> 清洗 + 生成随机名（UUID）+ 校验后缀白名单。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑 2：</strong>前端 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">FormData</code> 的 key 和后端 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">FormFile</code> 的字符串不一致会返回 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">"http: no such file"</code>。同名 input 加 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">multiple</code> 属性时，用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">MultipartForm()</code> 而不是 FormFile。</p></aside>
      </section>

      <!-- 3. 多文件 + 大小限制 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>多文件上传 + 上传大小限制</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">多文件用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.MultipartForm()</code> 拿到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">form.File["photos"]</code> 切片循环处理。生产环境<strong>必须限制请求体大小</strong>：用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.MaxBytesReader</code> 包一层 Body，超限的请求会被拒绝，防止恶意大文件打爆内存和磁盘。</p>
        <div class="mb-4"><Code language="go" :code="multiCode" title="multi_upload.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">手段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">注意</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">http.MaxBytesReader</td><td class="px-4 py-2 border">限制请求体总大小，超限报错</td><td class="px-4 py-2 border">超出后返回 "http: request body too large"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">MaxMultipartMemory</td><td class="px-4 py-2 border">小于阈值放内存，大于写临时文件</td><td class="px-4 py-2 border">默认 32MB；调小可降低内存峰值</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">c.FormFile 前校验</td><td class="px-4 py-2 border">拒绝超大/非法后缀</td><td class="px-4 py-2 border">file.Size / file.Header.Get("Content-Type")</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>设置合理的上传上限（如图片 5MB、视频 100MB），按文件类型建子目录（<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">/uploads/img/2026/08/</code>），文件名用 UUID + 后缀，避免同名校覆盖与路径穿越。</p></aside>
      </section>

      <!-- 4. 流式保存 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>手动流式保存——io.Copy 边收边写</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">SaveUploadedFile</code> 是开箱即用的封装。需要更多控制（校验内容、边读边处理、写到对象存储）时，用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">file.Open()</code> 拿到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">io.Reader</code>，配合 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">io.Copy</code> 流式写入目标。内存占用恒定为一个小缓冲，传多少 MB 的文件都稳。</p>
        <div class="mb-4"><Code language="go" :code="streamSaveCode" title="stream_save.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-blue-800"><strong>💡 原理：</strong>multipart 解析本身也是流式的——<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">*multipart.File</code> 是「按需读取的流」，不是整个文件在内存里。所以从它 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs">io.Copy</code> 到磁盘时，内存里永远只有一个 32KB 缓冲。</p></aside>
      </section>

      <!-- 5. multipart.Writer 客户端 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>multipart.Writer——用 Go 手工构造上传请求</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">写客户端、爬虫、测试工具时，需要<strong>手动构造 multipart 请求</strong>。用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">mime/multipart</code> 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">multipart.NewWriter</code>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">WriteField</code> 加普通字段，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">CreateFormFile</code> 加文件，最后 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Close()</code> 写收尾 boundary。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">w.FormDataContentType()</code> 返回带 boundary 的完整 Content-Type。</p>
        <div class="mb-4"><Code language="go" :code="clientCode" title="multipart_client.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑：</strong>忘了 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">w.Close()</code> 的话，body 没有结束 boundary，服务器会一直等不到文件结尾而超时或报错。构造完 body 再发请求，<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">defer w.Close()</code> 也行。</p></aside>
      </section>

      <!-- 6. 下载 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>下载与 Content-Disposition——控制浏览器行为</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c.File(path)</code> 直接返回文件；配合 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Content-Disposition</code> 响应头控制行为：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">attachment</code> 强制下载，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">inline</code> 浏览器内预览。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">r.Static</code> / <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.FileServer</code> 提供整个目录的静态服务。</p>
        <div class="mb-4"><Code language="go" :code="downloadCode" title="download.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 坑：</strong>中文文件名直接塞进 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Content-Disposition</code> 会乱码/被浏览器忽略。<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">filename=</code> 用 ASCII 兜底（如 report.pdf），<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">filename*=UTF-8''%E6%8A%A5%E8%A1%A8</code> 给现代浏览器。Windows 下 curl 传中文同理会乱码——用 Python 脚本或 URL 编码。</p></aside>
      </section>

      <!-- 7. 大文件与分片 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>大文件流式传输与分片上传</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">大文件（视频、安装包）用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">http.ServeContent</code> 支持 <strong>Range 断点续传</strong>——下载中断后从上次位置继续。超大文件上传用<strong>分片</strong>：前端切块逐片传，服务器暂存、最后合并，失败只重传失败的那片。</p>
        <div class="mb-4"><Code language="go" :code="chunkCode" title="large_file.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">推荐方案</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">关键点</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">小文件（&lt; 10MB）</td><td class="px-4 py-2 border font-mono text-xs">FormFile + SaveUploadedFile</td><td class="px-4 py-2 border">最简单</td></tr>
              <tr><td class="px-4 py-2 border">中文件（&lt; 100MB）</td><td class="px-4 py-2 border font-mono text-xs">流式 io.Copy + MaxBytesReader</td><td class="px-4 py-2 border">内存恒定、限大小</td></tr>
              <tr><td class="px-4 py-2 border">大文件下载</td><td class="px-4 py-2 border font-mono text-xs">http.ServeContent</td><td class="px-4 py-2 border">支持 Range 断点续传</td></tr>
              <tr><td class="px-4 py-2 border">超大文件上传</td><td class="px-4 py-2 border font-mono text-xs">分片上传（前端切块）</td><td class="px-4 py-2 border">失败重传单片</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>生产环境文件存储优先考虑<strong>对象存储</strong>（阿里云 OSS / MinIO），分片上传、断点续传、CDN 分发都是现成的，服务器只留元数据。自建时注意目录权限与磁盘监控。</p></aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：文件分块上传与下载</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点「⬆ 上传」：文件被切成 {{ CHUNKS }} 块，一块块从客户端移动到服务器（绿色到达，服务器进度增长）。
          点「⬇ 下载」：反向，块从服务器回到客户端（橙色）。这正是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">io.Copy</code> 流式传输的视觉化。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 分块数: {{ CHUNKS }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 上传/下载 O(n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doUpload" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⬆ 上传（客户端 → 服务器）</button>
          <button @mousedown="doDownload" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⬇ 下载（服务器 → 客户端）</button>
          <button @mousedown="resetAnim" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 客户端 / 服务器盒子 -->
              <v-rect :config="clientRectCfg" />
              <v-text :config="clientLabelCfg" />
              <v-rect :config="serverRectCfg" />
              <v-text :config="serverLabelPos" />
              <!-- 通道箭头 -->
              <v-arrow :config="chanCfg" />
              <!-- 移动的块 -->
              <v-circle v-if="moving" :config="chunkCfg" />
              <!-- 已到达的块堆 -->
              <v-rect v-for="k in serverPile" :key="'sp'+k" :config="pileCfg(k, true)" />
              <v-rect v-for="k in clientPile" :key="'cp'+k" :config="pileCfg(k, false)" />
              <!-- 进度文字 -->
              <v-text :config="progServerCfg" />
              <v-text :config="progClientCfg" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 8. 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>上传用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">multipart/form-data</code>，前端 FormData 的 key 必须和后端 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">c.FormFile("file")</code> 一致</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">SaveUploadedFile</code> 落盘 / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">io.Copy</code> 流式边收边写，内存 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>多文件用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">c.MultipartForm()</code> 的 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">form.File["photos"]</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>限制大小：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">http.MaxBytesReader</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">MaxMultipartMemory</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>下载：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">c.File</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Content-Disposition: attachment</code>；静态目录 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">r.Static</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>中文文件名：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">filename*=UTF-8''</code> 编码，别直接拼</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>大文件：下载 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">http.ServeContent</code>（Range 续传）；上传用分片；生产用对象存储</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-7-json-serialization" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：JSON</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-3-web/go-3-9-restful-api" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：RESTful API →</RouterLink></nav></footer>
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
  { id: "sec-1", name: "multipart 原理" },
  { id: "sec-2", name: "单文件上传" },
  { id: "sec-3", name: "多文件与大小限制" },
  { id: "sec-4", name: "流式保存" },
  { id: "sec-5", name: "multipart.Writer" },
  { id: "sec-6", name: "下载与 Content-Disposition" },
  { id: "sec-7", name: "大文件与分片" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 上传/下载分块动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(230), W = ref(700)
const CHUNKS = 8
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const CY = 110
const chunk = reactive({ x: -100, y: CY, color: C.green })
const moving = ref(false)
const serverPile = ref(0)
const clientPile = ref(0)

const clientRectCfg = computed(() => ({ x: 20, y: CY - 45, width: 150, height: 90, cornerRadius: 10, fill: '#e0f2fe', stroke: '#0ea5e9', strokeWidth: 1.5 }))
const clientLabelCfg = { x: 20, y: CY - 20, width: 150, text: '客户端', fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0369a1', align: 'center' }
const serverRectCfg = computed(() => ({ x: W.value - 170, y: CY - 45, width: 150, height: 90, cornerRadius: 10, fill: '#e0f2fe', stroke: '#0ea5e9', strokeWidth: 1.5 }))

const serverLabelPos = computed(() => ({ x: W.value - 170, y: CY - 20, width: 150, text: '服务器', fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0369a1', align: 'center' }))

const chanCfg = computed(() => ({
  points: [175, CY, W.value - 170, CY], fill: '#94a3b8', stroke: '#94a3b8', strokeWidth: 2, pointerLength: 8, pointerWidth: 6, dash: [8, 6],
}))
const chunkCfg = computed(() => ({
  x: chunk.x - 12, y: chunk.y - 12, radius: 12, fill: chunk.color,
  shadowColor: chunk.color, shadowBlur: 12, stroke: '#0f172a', strokeWidth: 1.5,
}))
function pileCfg(k: number, isServer: boolean) {
  const bx = isServer ? W.value - 170 + 10 : 30
  return { x: bx + (k - 1) * 13, y: CY + 30, width: 11, height: 11, cornerRadius: 3,
    fill: isServer ? C.green : C.orange, stroke: isServer ? '#22c55e' : '#d97706', strokeWidth: 1 }
}
const progServerCfg = computed(() => ({
  x: W.value - 170, y: CY + 48, width: 150, text: `服务器已收 ${serverPile.value}/${CHUNKS} 块`,
  fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center',
}))
const progClientCfg = computed(() => ({
  x: 20, y: CY + 48, width: 150, text: `客户端已收 ${clientPile.value}/${CHUNKS} 块`,
  fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center',
}))

function clientRight() { return 185 }
function serverLeft() { return W.value - 180 }

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function fly(from: number, to: number, color: string) {
  chunk.color = color
  chunk.x = from
  moving.value = true
  while (Math.abs(chunk.x - to) > 4) {
    chunk.x += Math.sign(to - from) * 30
    if (Math.sign(to - from) === 1 && chunk.x > to) chunk.x = to
    if (Math.sign(to - from) === -1 && chunk.x < to) chunk.x = to
    await d(30)
  }
  chunk.x = to
  await d(180)
}

async function doUpload() {
  act('上传分块（客户端 → 服务器）', async () => {
    serverPile.value = 0; clientPile.value = 0
    status.value = '开始上传，逐块发送'
    await d(400)
    for (let i = 0; i < CHUNKS; i++) {
      status.value = `发送第 ${i + 1}/${CHUNKS} 块`
      await fly(clientRight(), serverLeft(), C.green)
      serverPile.value++
    }
    status.value = '✅ 上传完成 100%'
    moving.value = false
    await d(900)
    resetAnim()
    status.value = ''
  })
}

async function doDownload() {
  act('下载分块（服务器 → 客户端）', async () => {
    serverPile.value = 0; clientPile.value = 0
    status.value = '开始下载，逐块接收'
    await d(400)
    for (let i = 0; i < CHUNKS; i++) {
      status.value = `接收第 ${i + 1}/${CHUNKS} 块`
      await fly(serverLeft(), clientRight(), C.orange)
      clientPile.value++
    }
    status.value = '✅ 下载完成 100%'
    moving.value = false
    await d(900)
    resetAnim()
    status.value = ''
  })
}

function resetAnim() { busy.value = false; moving.value = false; chunk.x = -100; serverPile.value = 0; clientPile.value = 0; status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const uploadCode = `package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    // 前端表单:
    // <form action="/upload" method="post" enctype="multipart/form-data">
    //   <input type="file" name="file">
    //   <button>上传</button>
    // </form>
    r.POST("/upload", upload)
    r.Run(":8080")
}

func upload(c *gin.Context) {
    // ① 从表单取文件（name 必须和前端 input 的 name 一致）
    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(400, gin.H{"error": "no file"})
        return
    }
    // ② 保存到磁盘（内部是 io.Copy，内存占用小）
    dst := "./uploads/" + file.Filename
    if err := c.SaveUploadedFile(file, dst); err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, gin.H{"ok": true, "saved": dst, "size": file.Size})
}
// curl -F "file=@./demo.txt" http://localhost:8080/upload
// 输出: {"ok":true,"saved":"./uploads/demo.txt","size":14}`

const singleCode = `package main

import (
    "log"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.POST("/upload", upload)
    r.Run(":8080")
}

func upload(c *gin.Context) {
    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(400, gin.H{"error": "no file"})
        return
    }
    // 元信息：文件名 / 大小 / 内容类型
    log.Printf("文件: %s, 大小: %d 字节, type: %s",
        file.Filename, file.Size, file.Header.Get("Content-Type"))
    // 输出日志:
    // 文件: demo.txt, 大小: 14 字节, type: text/plain

    if err := c.SaveUploadedFile(file, "./uploads/"+file.Filename); err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, gin.H{"ok": true, "filename": file.Filename})
}`

const multiCode = `package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    // 限制请求体总大小：10MB（单位字节，10<<20 = 10 * 1024 * 1024）
    r.Use(func(c *gin.Context) {
        c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 10<<20)
        c.Next()
    })
    // multipart 内存阈值：超过 8MB 的部分落临时文件
    r.MaxMultipartMemory = 8 << 20

    r.POST("/upload", uploadMulti)
    r.Run(":8080")
}

func uploadMulti(c *gin.Context) {
    // 前端 <input type="file" name="photos" multiple>
    form, err := c.MultipartForm()
    if err != nil {
        c.JSON(400, gin.H{"error": "not multipart"})
        return
    }
    files := form.File["photos"]   // []*multipart.FileHeader
    for _, f := range files {
        c.SaveUploadedFile(f, "./uploads/"+f.Filename)
    }
    c.JSON(200, gin.H{"ok": true, "count": len(files)})
}
// curl -F "photos=@a.png" -F "photos=@b.png" http://localhost:8080/upload
// 输出: {"ok":true,"count":2}
// 超过 10MB 时返回错误: http: request body too large`

const streamSaveCode = `package main

import (
    "io"
    "os"
    "github.com/gin-gonic/gin"
)

func upload(c *gin.Context) {
    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(400, gin.H{"error": "no file"})
        return
    }

    // ① 打开上传文件流（multipart.File 是按需读取的流）
    src, err := file.Open()
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    defer src.Close()

    // ② 创建目标文件
    dst, err := os.Create("./uploads/" + file.Filename)
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    defer dst.Close()

    // ③ 流式复制——内存恒定，传多少 MB 都稳
    n, err := io.Copy(dst, src)
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, gin.H{"ok": true, "bytes": n})
}
// 传 500MB 大文件内存峰值约 32KB（io.Copy 默认缓冲）
// 输出: {"ok":true,"bytes":524288000}`

const clientCode = `package main

import (
    "bytes"
    "fmt"
    "io"
    "mime/multipart"
    "net/http"
    "os"
)

func main() {
    // 用 multipart.Writer 手工构造上传请求（写客户端 / 测试工具）
    var buf bytes.Buffer
    w := multipart.NewWriter(&buf)

    // ① 普通字段
    w.WriteField("title", "我的头像")

    // ② 文件字段
    fw, err := w.CreateFormFile("file", "avatar.png")
    if err != nil { panic(err) }
    data, _ := os.ReadFile("avatar.png")
    fw.Write(data)

    w.Close()   // 必须！写收尾 boundary，否则服务器等不到文件结束

    // ③ 发请求——Content-Type 用 FormDataContentType()（含 boundary）
    resp, err := http.Post("http://localhost:8080/upload",
        w.FormDataContentType(), &buf)
    if err != nil { panic(err) }
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
    // 输出: {"ok":true,"saved":"./uploads/avatar.png","size":1234}
}`

const downloadCode = `package main

import (
    "fmt"
    "net/url"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // ① 直接返回文件（Gin 自动设 Content-Type）
    r.GET("/file/:name", func(c *gin.Context) {
        c.File("./uploads/" + c.Param("name"))
    })

    // ② 强制下载——attachment 让浏览器保存而不是打开
    r.GET("/download/:name", func(c *gin.Context) {
        name := c.Param("name")
        c.Header("Content-Disposition", "attachment; filename="+name)
        c.File("./uploads/" + name)
    })

    // ③ 中文文件名：RFC 5987 编码（filename* 部分给现代浏览器）
    r.GET("/dl2", func(c *gin.Context) {
        filename := "报表 2026.pdf"
        encoded := url.PathEscape(filename)
        c.Header("Content-Disposition",
            fmt.Sprintf("attachment; filename=%q; filename*=UTF-8''%s", filename, encoded))
        c.File("./uploads/report.pdf")
    })

    // ④ 静态目录：/static/xxx 映射到 ./public/xxx
    r.Static("/static", "./public")

    r.Run(":8080")
}
// curl -O http://localhost:8080/download/go.png
// 保存为 go.png（响应头含 Content-Disposition: attachment; filename=go.png）`

const chunkCode = `package main

import (
    "net/http"
    "os"
    "github.com/gin-gonic/gin"
)

// 大文件下载：http.ServeContent 支持 Range 断点续传
func stream(c *gin.Context) {
    f, err := os.Open("./uploads/big.mp4")
    if err != nil {
        c.JSON(404, gin.H{"error": "not found"})
        return
    }
    defer f.Close()

    info, _ := f.Stat()
    c.Header("Content-Disposition", "attachment; filename=big.mp4")
    http.ServeContent(c.Writer, c.Request, "big.mp4", info.ModTime(), f)
}
// 请求带 Range: bytes=1000-1999 时，只返回这一段（下载器断点续传基础）

// 分片上传（前端配合）概念流程:
// ① 前端把大文件切成 N 片，逐片 POST /upload/chunk {index,total,chunk}
// ② 服务器每片写入 tmp 目录（按分片号命名），返回该片序号
// ③ 全部传完后 POST /upload/merge，合并分片为最终文件
// ④ 优点: 单片失败只重传单片；缺点: 需处理续传/校验/合并
// 生产: 用 tus 协议（tusd 服务）或对象存储（OSS/MinIO）分片上传`
</script>
