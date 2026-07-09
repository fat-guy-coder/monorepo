<template>
  <div class="html5-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📋 HTML5 面试知识点全集</h1>
          <p class="text-sm text-slate-500 mt-1">语义化 · 新API · 性能优化 · 兼容性 — 涵盖 2024 年最新 HTML 标准</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">⭐⭐⭐ 面试高频</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 语义化标签 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          语义化标签（Semantic HTML）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          HTML5 引入了一系列语义化标签替代 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&lt;div class="header"&gt;</code> 的写法。
          <strong>核心价值：</strong>SEO 友好（搜索引擎理解页面结构）、无障碍访问（屏幕阅读器）、代码可维护性。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">标签</th><th class="px-4 py-2 border border-slate-200 font-semibold">语义</th><th class="px-4 py-2 border border-slate-200 font-semibold">替换的 div 写法</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;header&gt;</td><td class="px-4 py-2 border">页头/区块头</td><td class="px-4 py-2 border font-mono text-xs">div.header / div#header</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;nav&gt;</td><td class="px-4 py-2 border">导航链接组</td><td class="px-4 py-2 border font-mono text-xs">div.nav</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;main&gt;</td><td class="px-4 py-2 border">页面<strong>唯一</strong>主要内容</td><td class="px-4 py-2 border font-mono text-xs">div.main / div#content</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;section&gt;</td><td class="px-4 py-2 border">主题相关的内容分组（通常带标题）</td><td class="px-4 py-2 border font-mono text-xs">div.section</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;article&gt;</td><td class="px-4 py-2 border">独立、可分发的内容（博客、新闻卡片）</td><td class="px-4 py-2 border font-mono text-xs">div.post / div.article</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;aside&gt;</td><td class="px-4 py-2 border">侧边栏/补充内容</td><td class="px-4 py-2 border font-mono text-xs">div.sidebar</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;footer&gt;</td><td class="px-4 py-2 border">页脚/区块尾</td><td class="px-4 py-2 border font-mono text-xs">div.footer</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;figure&gt; + &lt;figcaption&gt;</td><td class="px-4 py-2 border">配图/图表 + 说明文字</td><td class="px-4 py-2 border font-mono text-xs">div.img-wrap + p.caption</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;time&gt;</td><td class="px-4 py-2 border">日期/时间（带 datetime 属性）</td><td class="px-4 py-2 border font-mono text-xs">span.date</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;mark&gt;</td><td class="px-4 py-2 border">高亮/标记文本</td><td class="px-4 py-2 border font-mono text-xs">span.highlight</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;details&gt; + &lt;summary&gt;</td><td class="px-4 py-2 border">原生折叠面板（无需 JS）</td><td class="px-4 py-2 border font-mono text-xs">需要 JS 实现</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&lt;dialog&gt;</td><td class="px-4 py-2 border">原生模态框/对话框</td><td class="px-4 py-2 border font-mono text-xs">div.modal + JS</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 面试考点：</strong>section vs article vs div 的区别？section 一般带标题、表达文档大纲；article 可独立分发（RSS 阅读器可直接提取）；div 纯粹是布局容器，无语义。</p>
        </aside>
      </section>

      <!-- 2. 表单增强 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          表单增强（Form Improvements）
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">新的 input type（自带校验 + 移动端键盘适配）</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">type</th><th class="px-4 py-2 border border-slate-200 font-semibold">用途</th><th class="px-4 py-2 border border-slate-200 font-semibold">移动端键盘</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">email</td><td class="px-4 py-2 border">邮箱（自动校验 @ 和域名）</td><td class="px-4 py-2 border">带 @ 的英文键盘</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">url</td><td class="px-4 py-2 border">网址</td><td class="px-4 py-2 border">带 .com 的英文键盘</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">tel</td><td class="px-4 py-2 border">电话号码</td><td class="px-4 py-2 border">数字拨号键盘</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">number</td><td class="px-4 py-2 border">数字（min/max/step）</td><td class="px-4 py-2 border">数字键盘</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">date / time / datetime-local</td><td class="px-4 py-2 border">日期/时间选择器</td><td class="px-4 py-2 border">原生日期选择器</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">color</td><td class="px-4 py-2 border">颜色选择器</td><td class="px-4 py-2 border">原生取色器</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">range</td><td class="px-4 py-2 border">滑块</td><td class="px-4 py-2 border">滑块控件</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">search</td><td class="px-4 py-2 border">搜索框（带清除按钮）</td><td class="px-4 py-2 border">搜索键盘</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">新表单属性</h3>
        <div class="mb-4"><Code language="html" :code="formAttrsCode" title="form_attrs.html" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 面试要点：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">form</code> 属性可以让输入框<strong>放在 form 标签外面</strong>仍然属于该表单，只需匹配 form 的 id。这在复杂布局中非常有用。</p>
        </aside>
      </section>

      <!-- 3. 多媒体 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          多媒体（Audio / Video / Canvas / SVG）
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">&lt;audio&gt; 和 &lt;video&gt; — 告别 Flash</h3>
        <div class="mb-4"><Code language="html" :code="mediaCode" title="media.html" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">属性/事件</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">controls</td><td class="px-4 py-2 border">显示浏览器原生控制条</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">autoplay / muted</td><td class="px-4 py-2 border">自动播放（现代浏览器需静音）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">loop</td><td class="px-4 py-2 border">循环播放</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">poster（video）</td><td class="px-4 py-2 border">视频加载前的封面图</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">preload</td><td class="px-4 py-2 border">none / metadata / auto</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">playsinline（video）</td><td class="px-4 py-2 border">iOS 内联播放（不强制全屏）</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">Canvas vs SVG 对比（高频面试题）</h3>
        <div class="overflow-x-auto mb-2">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">Canvas</th><th class="px-4 py-2 border border-slate-200 font-semibold">SVG</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">渲染方式</td><td class="px-4 py-2 border"><strong>像素</strong>（位图）</td><td class="px-4 py-2 border"><strong>矢量</strong>（XML 描述的图形）</td></tr>
              <tr><td class="px-4 py-2 border">缩放</td><td class="px-4 py-2 border">放大失真</td><td class="px-4 py-2 border">任意缩放不失真</td></tr>
              <tr><td class="px-4 py-2 border">事件处理</td><td class="px-4 py-2 border">需手动计算坐标</td><td class="px-4 py-2 border">每个元素可绑定 DOM 事件</td></tr>
              <tr><td class="px-4 py-2 border">性能</td><td class="px-4 py-2 border">大量对象时更好</td><td class="px-4 py-2 border">对象多时变慢（DOM 开销）</td></tr>
              <tr><td class="px-4 py-2 border">适用场景</td><td class="px-4 py-2 border">游戏、图表、图像处理</td><td class="px-4 py-2 border">图标、数据可视化、地图</td></tr>
              <tr><td class="px-4 py-2 border">SEO</td><td class="px-4 py-2 border">不友好（纯像素）</td><td class="px-4 py-2 border">可被搜索引擎索引</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. Web Storage -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          Web Storage：localStorage / sessionStorage / Cookie 对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          面试必问。三者的核心区别在于<strong>存储容量、生命周期、是否随请求发送</strong>。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">Cookie</th><th class="px-4 py-2 border border-slate-200 font-semibold">localStorage</th><th class="px-4 py-2 border border-slate-200 font-semibold">sessionStorage</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">容量</td><td class="px-4 py-2 border">~4KB</td><td class="px-4 py-2 border">~5MB</td><td class="px-4 py-2 border">~5MB</td></tr>
              <tr><td class="px-4 py-2 border">生命周期</td><td class="px-4 py-2 border">可设过期时间</td><td class="px-4 py-2 border">永久（手动删除）</td><td class="px-4 py-2 border">关闭标签页即清除</td></tr>
              <tr><td class="px-4 py-2 border">随 HTTP 请求发送</td><td class="px-4 py-2 border">✅ 自动带上</td><td class="px-4 py-2 border">❌ 不发送</td><td class="px-4 py-2 border">❌ 不发送</td></tr>
              <tr><td class="px-4 py-2 border">跨标签页共享</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">❌（同标签页内）</td></tr>
              <tr><td class="px-4 py-2 border">API</td><td class="px-4 py-2 border">document.cookie（繁琐）</td><td class="px-4 py-2 border">简单 K-V API</td><td class="px-4 py-2 border">简单 K-V API</td></tr>
              <tr><td class="px-4 py-2 border">典型用途</td><td class="px-4 py-2 border">登录态、追踪</td><td class="px-4 py-2 border">用户偏好、主题</td><td class="px-4 py-2 border">表单草稿、临时状态</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 安全注意：</strong>敏感数据（token/密码）绝不放在 localStorage 中——XSS 攻击可读取。登录 token 应使用 <strong>HttpOnly Cookie</strong>（JS 不可访问）或内存中存储。</p>
        </aside>
      </section>

      <!-- 5. Web Workers -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          Web Workers — 真正的多线程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          JavaScript 是单线程的，CPU 密集任务会阻塞 UI。Web Worker 在<strong>独立的后台线程</strong>中运行 JS，不阻塞主线程。通过 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">postMessage</code> 通信。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">主线程</h4>
            <Code language="js" :code="workerMainCode" title="main.js" />
          </div>
          <div>
            <h4 class="font-semibold text-slate-700 mb-2">Worker 线程</h4>
            <Code language="js" :code="workerCode" title="worker.js" />
          </div>
        </div>

        <div class="mb-4"><Code language="js" :code="sharedWorkerCode" title="SharedWorker（多标签页共享）" /></div>

        <ul class="space-y-2 text-slate-600 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Worker 不能操作 DOM</strong>、不能访问 window 对象（只有 self）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Service Worker</strong> 是一种特殊的 Worker，用作<strong>离线缓存代理</strong>（PWA 核心）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SharedWorker</strong> 可被<strong>同源的多个标签页/iframe</strong>共享</span></li>
        </ul>
      </section>

      <!-- 6. 拖拽、Geolocation、History -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          拖拽 API / Geolocation / History API
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Drag & Drop API</h3>
        <div class="mb-4"><Code language="html" :code="dragCode" title="drag_drop.html" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">Geolocation API（HTTPS only）</h3>
        <div class="mb-4"><Code language="js" :code="geoCode" title="geolocation.js" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">History API — SPA 路由的基石</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">
          Vue Router 的 history 模式和 React Router 的 BrowserRouter 底层都依赖此 API。
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">pushState</code> 改变 URL 不刷新页面，<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">popstate</code> 监听浏览器前进后退。
        </p>
        <div class="mb-4"><Code language="js" :code="historyCode" title="history_api.js" /></div>
      </section>

      <!-- 7. WebSocket 与 SSE -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          WebSocket / Server-Sent Events / fetch
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">WebSocket — 全双工实时通信</h3>
        <div class="mb-4"><Code language="js" :code="wsCode" title="websocket.js" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">SSE — 服务器单向推送</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">相比 WebSocket，SSE 更简单（基于 HTTP，自动重连），但只能服务器→客户端。适合股票行情、新闻推送、日志流。</p>
        <div class="mb-4"><Code language="js" :code="sseCode" title="sse.js" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">fetch API — 替代 XMLHttpRequest</h3>
        <div class="mb-4"><Code language="js" :code="fetchCode" title="fetch.js" /></div>
      </section>

      <!-- 8. 性能优化新特性 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          性能优化 & 资源加载新特性
        </h2>

        <div class="mb-4"><Code language="html" :code="perfCode" title="performance.html" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">loading="lazy"</td><td class="px-4 py-2 border">图片/iframe 懒加载（原生，无需 JS），进入视口前不下载</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">decoding="async"</td><td class="px-4 py-2 border">图片异步解码，不阻塞主线程渲染</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">fetchpriority="high/low"</td><td class="px-4 py-2 border">资源加载优先级提示（LCP 图片用 high）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;link rel="preload"&gt;</td><td class="px-4 py-2 border">提前加载当前页关键资源（字体、CSS、JS）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;link rel="prefetch"&gt;</td><td class="px-4 py-2 border">空闲时预取下一页资源</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;link rel="preconnect"&gt;</td><td class="px-4 py-2 border">提前建立连接（DNS+TCP+TLS），减少跨域请求延迟</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;link rel="dns-prefetch"&gt;</td><td class="px-4 py-2 border">仅提前 DNS 解析</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">content-visibility: auto</td><td class="px-4 py-2 border">CSS 属性，跳过屏幕外元素的渲染（大幅提升长列表性能）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 9. 新属性与 API 速查 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          其他新属性 & API 速查
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">语法/API</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">data-* 自定义属性</td><td class="px-4 py-2 border font-mono text-xs">&lt;div data-user-id="123"&gt;</td><td class="px-4 py-2 border">JS 中 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">el.dataset.userId</code> 访问</td></tr>
              <tr><td class="px-4 py-2 border">contenteditable</td><td class="px-4 py-2 border font-mono text-xs">&lt;div contenteditable="true"&gt;</td><td class="px-4 py-2 border">元素可编辑（富文本编辑器基础）</td></tr>
              <tr><td class="px-4 py-2 border">hidden 属性</td><td class="px-4 py-2 border font-mono text-xs">&lt;div hidden&gt;</td><td class="px-4 py-2 border">等价 display:none，但语义更强</td></tr>
              <tr><td class="px-4 py-2 border">spellcheck</td><td class="px-4 py-2 border font-mono text-xs">spellcheck="false"</td><td class="px-4 py-2 border">关闭浏览器拼写检查</td></tr>
              <tr><td class="px-4 py-2 border">translate</td><td class="px-4 py-2 border font-mono text-xs">translate="no"</td><td class="px-4 py-2 border">禁止浏览器翻译（品牌名/代码）</td></tr>
              <tr><td class="px-4 py-2 border">inputmode</td><td class="px-4 py-2 border font-mono text-xs">inputmode="numeric"</td><td class="px-4 py-2 border">控制虚拟键盘类型（比 type 更精细）</td></tr>
              <tr><td class="px-4 py-2 border">enterkeyhint</td><td class="px-4 py-2 border font-mono text-xs">enterkeyhint="send"</td><td class="px-4 py-2 border">控制回车键的显示文字</td></tr>
              <tr><td class="px-4 py-2 border">Notification API</td><td class="px-4 py-2 border font-mono text-xs">new Notification("title", opts)</td><td class="px-4 py-2 border">浏览器桌面通知（需授权）</td></tr>
              <tr><td class="px-4 py-2 border">Clipboard API</td><td class="px-4 py-2 border font-mono text-xs">navigator.clipboard.writeText()</td><td class="px-4 py-2 border">剪贴板读写（替代 document.execCommand）</td></tr>
              <tr><td class="px-4 py-2 border">Fullscreen API</td><td class="px-4 py-2 border font-mono text-xs">el.requestFullscreen()</td><td class="px-4 py-2 border">元素全屏显示</td></tr>
              <tr><td class="px-4 py-2 border">Page Visibility API</td><td class="px-4 py-2 border font-mono text-xs">document.visibilityState</td><td class="px-4 py-2 border">页面是否可见（切标签页时暂停动画/请求）</td></tr>
              <tr><td class="px-4 py-2 border">Intersection Observer</td><td class="px-4 py-2 border font-mono text-xs">new IntersectionObserver(cb)</td><td class="px-4 py-2 border">检测元素是否在视口中（替代 scroll 监听）</td></tr>
              <tr><td class="px-4 py-2 border">Mutation Observer</td><td class="px-4 py-2 border font-mono text-xs">new MutationObserver(cb)</td><td class="px-4 py-2 border">监听 DOM 变化</td></tr>
              <tr><td class="px-4 py-2 border">Resize Observer</td><td class="px-4 py-2 border font-mono text-xs">new ResizeObserver(cb)</td><td class="px-4 py-2 border">监听元素尺寸变化（比 window.resize 精确）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 10. 已废弃的元素 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">10</span>
          HTML5 中已废弃的元素 & 做法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          面试中常问"HTML5 废弃了什么"。核心趋势：<strong>表现层交给 CSS，行为层交给 JS，结构层留给 HTML。</strong>
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">已废弃</th><th class="px-4 py-2 border border-slate-200 font-semibold">原因</th><th class="px-4 py-2 border border-slate-200 font-semibold">替代方案</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;center&gt;, &lt;font&gt;, &lt;big&gt;, &lt;strike&gt;</td><td class="px-4 py-2 border">表现层标签</td><td class="px-4 py-2 border">CSS text-align / font / font-size / text-decoration</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;frame&gt;, &lt;frameset&gt;</td><td class="px-4 py-2 border">破坏页面结构、SEO 差</td><td class="px-4 py-2 border">&lt;iframe&gt;</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;applet&gt;, &lt;embed&gt;</td><td class="px-4 py-2 border">依赖 Java/Flash 插件</td><td class="px-4 py-2 border">&lt;object&gt;, &lt;canvas&gt;, &lt;video&gt;</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;marquee&gt;</td><td class="px-4 py-2 border">非标准、体验差</td><td class="px-4 py-2 border">CSS animation / JS</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">&lt;bgsound&gt;</td><td class="px-4 py-2 border">仅 IE 支持</td><td class="px-4 py-2 border">&lt;audio&gt;</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">name 属性 (a, img, form)</td><td class="px-4 py-2 border">被 id 取代（form 例外）</td><td class="px-4 py-2 border">id 属性</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">align / bgcolor / border 等</td><td class="px-4 py-2 border">表现层属性</td><td class="px-4 py-2 border">CSS</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 11. 面试速记卡 -->
      <section id="sec-11" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          面试速记卡
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm">
            <strong class="text-blue-700">Q: HTML5 新特性有哪些？</strong>
            <p class="text-blue-600 mt-1">语义标签、表单增强、Audio/Video、Canvas/SVG、Web Storage、WebSocket、Web Worker、Geolocation、History API、Drag & Drop、新属性（data-*/contenteditable/lazy loading）</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm">
            <strong class="text-blue-700">Q: localStorage vs sessionStorage vs Cookie</strong>
            <p class="text-blue-600 mt-1">localStorage 永久 5MB 不随请求发送；session 关闭标签页即清；Cookie 4KB 自动随请求发送</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm">
            <strong class="text-blue-700">Q: Canvas vs SVG</strong>
            <p class="text-blue-600 mt-1">Canvas 位图（像素操作，适合游戏/图表）；SVG 矢量（DOM 元素，适合图标/地图，支持事件和 SEO）</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm">
            <strong class="text-blue-700">Q: defer vs async</strong>
            <p class="text-blue-600 mt-1">defer 保证执行顺序、DOM 解析完后执行；async 下载完就执行、不保证顺序</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm">
            <strong class="text-blue-700">Q: preload vs prefetch</strong>
            <p class="text-blue-600 mt-1">preload 当前页必须用（优先加载）；prefetch 下页可能用（空闲时加载）</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-3 border border-blue-200 text-sm">
            <strong class="text-blue-700">Q: section vs article vs div</strong>
            <p class="text-blue-600 mt-1">section = 有主题的内容组（带标题）；article = 独立可分发的内容；div = 纯布局容器</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'

const navList = [
  { id: "sec-1", name: "语义化标签" },
  { id: "sec-2", name: "表单增强" },
  { id: "sec-3", name: "多媒体" },
  { id: "sec-4", name: "Web Storage" },
  { id: "sec-5", name: "Web Workers" },
  { id: "sec-6", name: "拖拽/定位/History" },
  { id: "sec-7", name: "WebSocket/SSE/fetch" },
  { id: "sec-8", name: "性能优化" },
  { id: "sec-9", name: "新属性 & API" },
  { id: "sec-10", name: "已废弃的元素" },
  { id: "sec-11", name: "面试速记卡" },
]

const formAttrsCode = `<!-- placeholder — 占位提示 -->
<input type="text" placeholder="请输入姓名" />

<!-- required — 必填校验 -->
<input type="email" required />

<!-- pattern — 正则校验 -->
<input type="text" pattern="[A-Za-z]{3,}" title="至少3个字母" />

<!-- autofocus — 页面加载后自动聚焦 -->
<input type="text" autofocus />

<!-- autocomplete — 自动填充控制 -->
<input type="text" autocomplete="off" />

<!-- form — 输入框可以放在 <form> 外面！ -->
<form id="myForm"><button>提交</button></form>
<input name="email" form="myForm" required />

<!-- datalist — 输入建议列表（自动补全） -->
<input list="browsers" />
<datalist id="browsers">
  <option value="Chrome" /><option value="Firefox" />
</datalist>

<!-- output — 计算结果显示 -->
<output name="result" for="a b">0</output>

<!-- multiple — 文件多选 -->
<input type="file" multiple accept="image/*,.pdf" />`

const mediaCode = `<!-- 音频 -->
<audio controls preload="metadata">
  <source src="music.mp3" type="audio/mpeg" />
  <source src="music.ogg" type="audio/ogg" />
  您的浏览器不支持 audio 标签。
</audio>

<!-- 视频 — 带封面、静音自动播放 -->
<video controls width="640" poster="cover.jpg" muted autoplay playsinline loop>
  <source src="video.mp4" type="video/mp4" />
  <track src="subtitles.vtt" kind="subtitles" srclang="zh" label="中文" />
</video>

<!-- Canvas 2D -->
<canvas id="canvas" width="400" height="300"></canvas>
<script>
  const ctx = document.getElementById('canvas').getContext('2d')
  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(10, 10, 100, 50)
<\/script>`

const workerMainCode = `// main.js — 主线程
const worker = new Worker('worker.js')

// 向 Worker 发送数据
worker.postMessage({ type: 'compute', data: largeArray })

// 接收 Worker 返回的结果
worker.onmessage = (e) => {
  console.log('计算结果:', e.data)
}

worker.onerror = (e) => {
  console.error('Worker 错误:', e.message)
}

// 用完终止
worker.terminate()`

const workerCode = `// worker.js — Worker 线程
self.onmessage = (e) => {
  const { type, data } = e.data
  if (type === 'compute') {
    // 耗时计算 —— 不阻塞主线程 UI
    const result = heavyComputation(data)
    self.postMessage(result)
  }
}

function heavyComputation(arr) {
  return arr.reduce((sum, n) => sum + n, 0)
}`

const sharedWorkerCode = `// ① SharedWorker（多标签页共享同一个 Worker）
// shared-worker.js
self.onconnect = (e) => {
  const port = e.ports[0]  // 每个连接有一个 port
  port.onmessage = (ev) => {
    console.log('来自某标签页:', ev.data)
    port.postMessage('收到！')
  }
}

// ② Service Worker（PWA 离线缓存）
// 拦截网络请求，实现离线可用
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  )
})`

const dragCode = `<!-- 可拖拽元素 -->
<div draggable="true"
  ondragstart="e.dataTransfer.setData('text', e.target.id)"
  ondragend="console.log('拖拽结束')">
  拖我！
</div>

<!-- 放置目标 -->
<div
  ondragover="e.preventDefault()"
  ondrop="e.preventDefault();
    const id = e.dataTransfer.getData('text');
    e.target.appendChild(document.getElementById(id))">
  放在这里
</div>

<!-- 文件拖拽上传 -->
<div ondrop="e.preventDefault();
  const files = e.dataTransfer.files;
  uploadFiles(files)">
  拖文件到这里上传
</div>`

const geoCode = `// 获取当前位置（需用户授权 + HTTPS）
navigator.geolocation.getCurrentPosition(
  (pos) => {
    console.log('纬度:', pos.coords.latitude)
    console.log('经度:', pos.coords.longitude)
    console.log('精度:', pos.coords.accuracy, '米')
  },
  (err) => {
    switch (err.code) {
      case err.PERMISSION_DENIED: console.log('用户拒绝了')  // 1
      case err.POSITION_UNAVAILABLE: console.log('位置不可用') // 2
      case err.TIMEOUT: console.log('超时')                   // 3
    }
  },
  { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
)

// 持续追踪位置变化
const watchId = navigator.geolocation.watchPosition(success, error, opts)
navigator.geolocation.clearWatch(watchId)`

const historyCode = `// pushState — 改变 URL 不刷新（SPA 路由核心）
history.pushState({ page: 1 }, '', '/page/1')
// URL 变成 /page/1，页面不刷新

// replaceState — 替换当前历史记录（不新增）
history.replaceState({ page: 2 }, '', '/page/2')

// popstate — 监听浏览器前进/后退
window.addEventListener('popstate', (e) => {
  console.log('导航到:', location.pathname, e.state)
})

// 前进/后退
history.back()    // 等价 history.go(-1)
history.forward() // 等价 history.go(1)`

const wsCode = `// WebSocket — 全双工实时通信
const ws = new WebSocket('wss://api.example.com/ws')

ws.onopen = () => {
  ws.send(JSON.stringify({ type: 'subscribe', channel: 'news' }))
}

ws.onmessage = (e) => {
  const data = JSON.parse(e.data)
  console.log('收到:', data)
}

ws.onerror = (e) => console.error('错误:', e)
ws.onclose = (e) => console.log('关闭:', e.code, e.reason)

// 心跳检测（防止断连）
setInterval(() => {
  if (ws.readyState === WebSocket.OPEN) ws.send('ping')
}, 30000)`

const sseCode = `// SSE — 服务器→客户端单向推送（基于 HTTP）
const source = new EventSource('/api/events')

source.onmessage = (e) => {
  console.log('收到:', JSON.parse(e.data))
}

// 自定义事件类型
source.addEventListener('notification', (e) => {
  showNotification(JSON.parse(e.data))
})

source.onerror = () => {
  // SSE 自动重连，无需手动处理
  console.log('连接断开，自动重连中...')
}`

const fetchCode = `// fetch API — 替代 XMLHttpRequest
// 基础用法
const res = await fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'test' }),
})
if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
const data = await res.json()

// 请求超时（AbortController）
const controller = new AbortController()
setTimeout(() => controller.abort(), 5000)
try {
  await fetch('/api/slow', { signal: controller.signal })
} catch (e) {
  if (e.name === 'AbortError') console.log('请求超时')
}

// 流式读取（Streaming）
const response = await fetch('/api/stream')
const reader = response.body.getReader()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  console.log('收到 chunk:', value)
}`

const perfCode = `<!-- 图片懒加载（原生，无需 Intersection Observer） -->
<img src="photo.jpg" loading="lazy" decoding="async" />

<!-- LCP 关键图片 — 提高加载优先级 -->
<img src="hero.jpg" fetchpriority="high" />

<!-- 响应式图片 — 根据屏幕宽度加载不同尺寸 -->
<img src="small.jpg"
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
  alt="描述" />

<!-- WebP/AVIF 格式降级 -->
<picture>
  <source srcset="photo.avif" type="image/avif" />
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="fallback" />
</picture>

<!-- 资源提示 -->
<link rel="preconnect" href="https://api.example.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
<link rel="prefetch" href="/page2.html" as="document" />

<!-- Script 加载策略 -->
<script src="critical.js"><\/script>                          <!-- 阻塞 -->
<script src="lib.js" defer><\/script>                         <!-- DOM 解析完后执行，保持顺序 -->
<script src="analytics.js" async><\/script>                   <!-- 下载完就执行，不保证顺序 -->
<script type="module" src="app.js"><\/script>                 <!-- ES Module，默认 defer -->
`
</script>
