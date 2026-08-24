<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">项目结构与文件管理</h1>
          <p class="text-sm text-slate-500 mt-1">组织你的 Godot 项目——目录规范、文件类型、资源管理</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-4</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 目录结构图 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>Godot 项目目录结构总览</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Godot 项目只有一个硬性要求——<strong>根目录必须有 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">project.godot</code></strong>。其余目录（scenes / scripts / assets…）是社区约定的惯例，让团队协作时"闭着眼睛都能找到文件"。下图是推荐结构：</p>
        <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="dir-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          <!-- 根节点 → 一级目录 -->
          <line x1="100" y1="69" x2="65" y2="113" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="100" y1="69" x2="185" y2="113" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="100" y1="69" x2="305" y2="113" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="100" y1="69" x2="425" y2="113" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="100" y1="69" x2="545" y2="113" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="100" y1="69" x2="665" y2="113" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />

          <!-- 根节点 -->
          <rect x="30" y="25" width="140" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="100" y="47" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">res://</text>

          <!-- 一级：文件与目录 -->
          <rect x="10" y="115" width="110" height="40" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
          <text x="65" y="135" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#334155">project.godot</text>

          <rect x="130" y="115" width="110" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="185" y="135" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">scenes/</text>

          <rect x="250" y="115" width="110" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="305" y="135" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">scripts/</text>

          <rect x="370" y="115" width="110" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="425" y="135" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">assets/</text>

          <rect x="490" y="115" width="110" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="545" y="135" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">resources/</text>

          <rect x="610" y="115" width="110" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="665" y="135" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">addons/</text>

          <!-- scenes 的子目录 -->
          <line x1="185" y1="155" x2="130" y2="213" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="185" y1="155" x2="185" y2="213" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="185" y1="155" x2="240" y2="213" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <rect x="75" y="215" width="110" height="40" rx="6" fill="#67e8f9" stroke="#0891b2" stroke-width="1.2" />
          <text x="130" y="235" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">levels/</text>
          <rect x="130" y="215" width="110" height="40" rx="6" fill="#67e8f9" stroke="#0891b2" stroke-width="1.2" />
          <text x="185" y="235" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">characters/</text>
          <rect x="185" y="215" width="110" height="40" rx="6" fill="#67e8f9" stroke="#0891b2" stroke-width="1.2" />
          <text x="240" y="235" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">ui/</text>

          <!-- assets 的子目录 -->
          <line x1="425" y1="155" x2="365" y2="213" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="425" y1="155" x2="425" y2="213" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="425" y1="155" x2="485" y2="213" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <line x1="425" y1="155" x2="545" y2="213" stroke="#94a3b8" stroke-width="2" marker-end="url(#dir-arr)" />
          <rect x="310" y="215" width="110" height="40" rx="6" fill="#67e8f9" stroke="#0891b2" stroke-width="1.2" />
          <text x="365" y="235" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">sprites/</text>
          <rect x="370" y="215" width="110" height="40" rx="6" fill="#67e8f9" stroke="#0891b2" stroke-width="1.2" />
          <text x="425" y="235" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">audio/</text>
          <rect x="430" y="215" width="110" height="40" rx="6" fill="#67e8f9" stroke="#0891b2" stroke-width="1.2" />
          <text x="485" y="235" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">fonts/</text>
          <rect x="490" y="215" width="110" height="40" rx="6" fill="#67e8f9" stroke="#0891b2" stroke-width="1.2" />
          <text x="545" y="235" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#155e75">shaders/</text>
        </svg>
        <p class="text-xs text-slate-400 mt-2">📌 深蓝框 = 一级目录；浅蓝框 = 二级子目录；灰色虚线框 = 唯一必需的文件 project.godot。</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📁</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Godot 项目 ≈ <strong>一个 Vite/Next.js 项目的 src 目录</strong>。有约定俗成的文件夹划分，但不强制。关键的 3 个目录：scenes/（页面/组件）、scripts/（逻辑代码）、assets/（静态资源）。<strong>整个项目全是纯文本 + 资源文件，没有黑盒二进制</strong>——这是对程序员最友好的设计。</p></aside>
        <p class="text-slate-600 leading-relaxed">Godot 项目的核心是 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">project.godot</code>——一个类似 package.json 的配置文件。有了它，Godot 就识别"这是一个项目"。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>project.godot</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">纯文本项目配置文件。双击它 → Godot 打开项目。可以手动编辑，也通过 Project Settings 编辑。</p>
        <div class="mb-4"><Code language="text" :code="projectGodotCode" title="project.godot" /></div>
        <ul class="space-y-1 text-slate-600 text-sm">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">config/name</code>：项目名称</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">run/main_scene</code>：F5 运行的主场景</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">display/window/size/</code>：窗口尺寸</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">input/</code>：输入映射（Input Map）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">autoload/</code>：全局单例脚本</span></li>
        </ul>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>推荐目录结构</h2>
        <div class="mb-4"><Code language="text" :code="dirStructureCode" title="推荐目录结构" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">目录</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">存放内容</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">前端类比</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">scenes/</td><td class="px-4 py-2 border border-slate-200">.tscn 场景文件</td><td class="px-4 py-2 border border-slate-200">src/pages/</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">scripts/</td><td class="px-4 py-2 border border-slate-200">.gd GDScript 脚本</td><td class="px-4 py-2 border border-slate-200">src/components/</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">assets/sprites/</td><td class="px-4 py-2 border border-slate-200">精灵图/纹理 (.png/.svg)</td><td class="px-4 py-2 border border-slate-200">public/images/</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">assets/audio/</td><td class="px-4 py-2 border border-slate-200">音效/音乐 (.ogg/.mp3)</td><td class="px-4 py-2 border border-slate-200">public/audio/</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">assets/fonts/</td><td class="px-4 py-2 border border-slate-200">字体 (.ttf/.otf)</td><td class="px-4 py-2 border border-slate-200">public/fonts/</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">assets/shaders/</td><td class="px-4 py-2 border border-slate-200">着色器 (.gdshader)</td><td class="px-4 py-2 border border-slate-200">src/shaders/</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">resources/</td><td class="px-4 py-2 border border-slate-200">.tres 资源（材质/主题）</td><td class="px-4 py-2 border border-slate-200">src/config/</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">addons/</td><td class="px-4 py-2 border border-slate-200">第三方插件</td><td class="px-4 py-2 border border-slate-200">node_modules/</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 命名规范：</strong>文件名用 <strong>snake_case</strong>。场景：<code class="bg-emerald-100 px-1 rounded text-xs font-mono">player.tscn</code>。脚本：<code class="bg-emerald-100 px-1 rounded text-xs font-mono">player.gd</code>。不要用空格和中文。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>文件类型与 Git</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">后缀</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Git</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.tscn</td><td class="px-4 py-2 border border-slate-200">场景文件</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">纯文本，节点树+属性，可 diff</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.gd</td><td class="px-4 py-2 border border-slate-200">GDScript</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">纯文本游戏逻辑代码</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.tres</td><td class="px-4 py-2 border border-slate-200">资源文件</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">纯文本，材质/主题/自定义资源</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.import</td><td class="px-4 py-2 border border-slate-200">导入配置</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">自动生成，记录导入参数</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.godot/</td><td class="px-4 py-2 border border-slate-200">编辑器缓存</td><td class="px-4 py-2 border border-slate-200 text-red-600">❌</td><td class="px-4 py-2 border border-slate-200">.gitignore 忽略</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">project.godot</td><td class="px-4 py-2 border border-slate-200">项目配置</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">纯文本，所有项目设置</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="text" :code="gitignoreCode" title=".gitignore" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>res:// 与 user:// 路径</h2>
        <ul class="space-y-2 text-slate-600 text-sm">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">res://</code> = 项目根目录（Resource）。最常用。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">user://</code> = 用户数据目录（存档/配置）。跨平台自动映射。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">uid://</code> = 唯一 ID 路径（Godot 4.4+，资源重命名后不断链）。</span></li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 不要用绝对路径。</strong>只在代码中使用 res:// 和 user://。</p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>资源导入</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">拖入外部资源 → Godot 自动生成 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">.import</code> → 立即可用。支持格式：图片（PNG/PSD/SVG）、音频（OGG/MP3/WAV）、3D（GLTF/FBX）、字体（TTF/OTF）、翻译（CSV/PO）。</p>
        <p class="text-slate-600 mb-3 leading-relaxed">选中 .import 文件 → Import 面板调整导入参数：<strong>纹理</strong>（Filter: Nearest 像素风）、<strong>音频</strong>（Loop、Stream vs Sample）。</p>
      </section>

      <!-- 实战：Blitz -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的项目结构</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 项目严格遵循推荐结构——场景在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">scenes/</code>，脚本在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">scripts/</code>，且<strong>一个脚本对应一个同名的 .tscn</strong>（父子模块化）：</p>
        <div class="mb-4"><Code language="text" :code="blitzStructure" title="apps/game/blitz/ 目录" /></div>
        <p class="text-slate-600 mb-3 leading-relaxed">而 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">main.gd</code> 用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">preload("res://...")</code> 引用其它场景/脚本——这就是 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">res://</code> 路径在代码里的实际用法：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzPreloadCode" title="blitz/scripts/main.gd（节选）" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 反哺：</strong>因为 Godot 用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">res://</code> 虚拟路径而不是 Windows 绝对路径，<strong>项目拷贝到任何电脑 / 导出到任何平台都不需要改代码</strong>。这是 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">user://</code> + <code class="bg-emerald-100 px-1 rounded text-xs font-mono">res://</code> 体系的核心价值。</p>
        </aside>
      </section>

      <!-- 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>项目结构常见错误</h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 1：把 <code class="bg-amber-100 px-1 rounded text-xs font-mono">.godot/</code> 缓存目录提交进 Git。</strong><br/>
            它包含导入缓存、着色器缓存，每次打开项目都变、体积大、跨平台不同，会造成大量无意义的 merge 冲突。必须在 .gitignore 里忽略。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 2：文件名用中文/空格/大写驼峰。</strong><br/>
            <code class="bg-amber-100 px-1 rounded text-xs font-mono">我的角色.tscn</code> 或 <code class="bg-amber-100 px-1 rounded text-xs font-mono">My Player.gd</code> 会导致导入路径含特殊字符、跨平台导出失败。Godot 社区约定<strong>一律 snake_case + 小写 + 英文</strong>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 3：脚本和场景文件混在一个目录。</strong><br/>
            当项目超过 20 个文件时，单目录会完全失控。哪怕只有一个 <code class="bg-amber-100 px-1 rounded text-xs font-mono">scenes/</code> + <code class="bg-amber-100 px-1 rounded text-xs font-mono">scripts/</code> 的粗粒度划分，也比全堆在根目录强得多。</p>
          </aside>
        </div>
      </section>

      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>project.godot = package.json，res:// = 项目根目录</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>推荐：scenes/ + scripts/ + assets/（sprites/audio/fonts）+ resources/</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>snake_case 命名，<strong>.tscn/.gd/.tres/.import 提交 Git</strong>，.godot/ 忽略</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>拖拽导入 → 自动 .import → 调整导入选项</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>代码里只用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">res://</code> / <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">user://</code>，不用绝对路径——跨平台零修改</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-3-scene-node-concept" class="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">← 上一节：场景与节点核心概念</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-5-first-project" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">下一节：第一个项目：Hello Godot →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-overview", name: "📐 目录结构图" },
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "project.godot" },
  { id: "sec-3", name: "目录结构" },
  { id: "sec-4", name: "文件类型与Git" },
  { id: "sec-5", name: "res:// 路径" },
  { id: "sec-6", name: "资源导入" },
  { id: "sec-7", name: "🕹️ 实战：Blitz" },
  { id: "sec-8", name: "⚠️ 常见错误" },
  { id: "sec-9", name: "小结" },
]

const projectGodotCode = `; Engine configuration file.
config_version=5

[application]
config/name="My Game"
config/icon="res://icon.svg"
run/main_scene="res://scenes/main.tscn"

[display]
window/size/viewport_width=1280
window/size/viewport_height=720

[input]
move_left={ "events": [Object(InputEventKey,"physical_keycode":65)] }
move_right={ "events": [Object(InputEventKey,"physical_keycode":68)] }
jump={ "events": [Object(InputEventKey,"physical_keycode":32)] }

[autoload]
GlobalEvents="*res://scripts/global_events.gd"`

const dirStructureCode = `res://
├── project.godot              # 项目配置（≈ package.json）
├── scenes/                    # 场景文件 (.tscn)
│   ├── levels/                #   关卡场景
│   ├── characters/            #   角色（玩家/敌人/NPC）
│   ├── ui/                    #   UI（菜单/HUD/对话框）
│   └── props/                 #   道具/装饰
├── scripts/                   # GDScript 脚本 (.gd)
│   ├── player/                #   玩家逻辑
│   ├── enemies/               #   敌人 AI
│   └── utils/                 #   工具函数
├── assets/                    # 原始资源
│   ├── sprites/               #   精灵图/纹理
│   ├── audio/music/ sfx/      #   音频
│   ├── fonts/                 #   字体
│   └── shaders/               #   着色器 (.gdshader)
├── resources/                 # Godot 资源 (.tres)
│   ├── materials/             #   材质
│   └── themes/                #   UI 主题
└── addons/                    # 第三方插件`

const gitignoreCode = `# Godot
.godot/
*.translation
build/
export/
.DS_Store
Thumbs.db`

const blitzStructure = `apps/game/blitz/
├── project.godot              # 项目配置（F5 入口 main.tscn）
├── icon.svg                   # 项目图标
├── scenes/                    # 场景文件（一个角色一个场景）
│   ├── main.tscn              #   主场景（关卡在代码中搭建）
│   ├── player.tscn            #   玩家（CharacterBody2D 树）
│   ├── enemy.tscn             #   敌人
│   ├── bullet.tscn            #   子弹
│   └── attack_hitbox.tscn     #   近战判定框
└── scripts/                   # 脚本（与场景一一对应）
    ├── main.gd
    ├── player.gd
    ├── enemy.gd
    ├── bullet.gd
    ├── attack_hitbox.gd
    └── drawable_rect.gd`

const blitzPreloadCode = `# apps/game/blitz/scripts/main.gd（节选）
# res:// 虚拟路径在代码中的实际用法（≈ import 语句）
var PlayerScene: PackedScene = preload("res://scenes/player.tscn")
var EnemyScene: PackedScene  = preload("res://scenes/enemy.tscn")
var AttackHitboxScene: PackedScene = preload("res://scenes/attack_hitbox.tscn")
var DrawableRect: Script     = preload("res://scripts/drawable_rect.gd")

func _ready() -> void:
	_setup_input_map()
	_build_level()      # 关卡：平台/敌人/格挡对象
	_create_player()    # 玩家：PlayerScene.instantiate()
	_create_ui()        # HUD / 死亡面板 / 胜利面板`
</script>
