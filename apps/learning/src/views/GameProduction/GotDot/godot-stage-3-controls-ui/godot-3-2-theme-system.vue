<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Theme 主题系统</h1><p class="text-sm text-slate-500 mt-1">StyleBox · Theme 资源——Godot UI 的"CSS"</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd (主题覆盖)" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>Theme 层级覆盖结构图</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">一个 <strong>Theme 资源</strong>应用到根 Control，整棵子树自动继承；某个子节点想特立独行，就用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">add_theme_*_override()</code> 覆盖单项。这就是 <strong>CSS 级联（Cascade）</strong>的翻版。</p>
        <svg viewBox="0 0 720 380" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="thm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          <!-- Theme 资源 -->
          <rect x="250" y="36" width="220" height="48" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
          <text x="360" y="52" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">theme.tres 全局主题</text>
          <text x="360" y="70" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">字体 · 颜色 · Button 样式</text>

          <!-- Theme → Root -->
          <line x1="360" y1="84" x2="360" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#thm-arr)" />
          <text x="372" y="100" font-size="10" font-family="monospace" fill="#64748b">theme 属性 = 应用到根</text>

          <!-- Root Control -->
          <rect x="260" y="116" width="200" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
          <text x="360" y="130" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">Root Control</text>
          <text x="360" y="148" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">继承整个 Theme</text>

          <!-- Root → 子节点 -->
          <line x1="280" y1="160" x2="180" y2="214" stroke="#94a3b8" stroke-width="2" marker-end="url(#thm-arr)" />
          <line x1="360" y1="160" x2="360" y2="214" stroke="#94a3b8" stroke-width="2" marker-end="url(#thm-arr)" />
          <line x1="440" y1="160" x2="540" y2="214" stroke="#94a3b8" stroke-width="2" marker-end="url(#thm-arr)" />

          <!-- 子节点 -->
          <rect x="90" y="220" width="180" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="180" y="236" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#ffffff">Panel 背景卡</text>
          <text x="180" y="252" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">无覆盖</text>
          <rect x="270" y="220" width="180" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="360" y="236" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#ffffff">Button RESTART</text>
          <text x="360" y="252" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">override 覆盖</text>
          <rect x="450" y="220" width="180" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="540" y="236" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#ffffff">Label YOU DIED</text>
          <text x="540" y="252" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">override 覆盖</text>

          <!-- 覆盖标注 -->
          <text x="180" y="300" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">✅ 继承全局 panel 样式</text>
          <text x="360" y="300" text-anchor="middle" font-size="11" font-family="monospace" fill="#ef4444">⚡ add_theme_stylebox_override("normal", 红)</text>
          <text x="540" y="300" text-anchor="middle" font-size="11" font-family="monospace" fill="#ef4444">⚡ add_theme_color_override("font_color", 红)</text>

          <!-- 图例：优先级 -->
          <rect x="130" y="344" width="110" height="20" rx="4" fill="#06b6d4" />
          <text x="185" y="354" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">全局 Theme</text>
          <text x="255" y="354" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">&lt;</text>
          <rect x="280" y="344" width="130" height="20" rx="4" fill="#ef4444" />
          <text x="345" y="354" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">子节点 override</text>
          <text x="440" y="354" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">→ 高优先级</text>
        </svg>
        <p class="text-xs text-slate-400 mt-2">Theme 让整棵树统一风格；override 让单个节点局部定制——优先级：子节点 override &gt; 全局 Theme &gt; 内置默认。</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎨</span>Theme ≈ CSS 样式表</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Theme ≈ <strong>CSS 全局样式表</strong>——定义默认字体、颜色、按钮样式。一个 Theme 资源可以应用到根 Control，所有子 Control 自动继承。≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">:root { --color-primary: blue; }</code> 的 Godot 版。</p></aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 语法类比：TS / Python / GDScript 三语对照</strong><br/>
        <strong>TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">:root { --primary: blue; } .btn { background: red; } // CSS 变量+覆盖</code><br/>
        <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">ttk.Style().configure('TButton', background='red') # ttk 主题</code><br/>
        <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">theme.set_stylebox(...); btn.add_theme_stylebox_override(...)</code><br/>
        关键差异：CSS 靠 <strong>选择器特异性</strong>决定覆盖，Godot 靠 <strong>节点级 override &gt; Theme &gt; 默认</strong> 三层优先级。</p></aside>
        <p class="text-slate-600 leading-relaxed">Theme 是一个 <strong>.tres 资源文件</strong>，包含颜色（Color）、字体（Font）、样式盒（StyleBox）、字号、图标等样式定义。应用 Theme 后，所有 UI 节点自动使用这些样式——不需要每个节点单独设置。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">Theme 内容</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th><th class="px-4 py-2 border font-semibold text-slate-700">CSS 类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">Color</td><td class="px-4 py-2 border">字体色、图标色、修饰色</td><td class="px-4 py-2 border font-mono text-xs">--color-*</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Font / FontSize</td><td class="px-4 py-2 border">全局默认字体和字号</td><td class="px-4 py-2 border font-mono text-xs">font-family / font-size</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">StyleBox</td><td class="px-4 py-2 border">各控件各状态的背景/边框</td><td class="px-4 py-2 border font-mono text-xs">background / border / box-shadow</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Icon</td><td class="px-4 py-2 border">控件图标（如 CheckBox 勾选图）</td><td class="px-4 py-2 border font-mono text-xs">background-image</td></tr></tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>StyleBox——背景/边框/圆角</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">StyleBox 定义了 Control 的<strong>视觉外观</strong>——背景色、边框、圆角、阴影。≈ CSS 的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">background + border + border-radius + box-shadow</code> 合集。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">StyleBox 类型</th><th class="px-4 py-2 border font-semibold text-slate-700">用途</th><th class="px-4 py-2 border font-semibold text-slate-700">CSS 类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">StyleBoxFlat</td><td class="px-4 py-2 border">纯色背景+圆角+边框+阴影（<strong>最常用</strong>）</td><td class="px-4 py-2 border font-mono text-xs">background + border-radius + box-shadow</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">StyleBoxTexture</td><td class="px-4 py-2 border">纹理图片做背景（可九宫格）</td><td class="px-4 py-2 border font-mono text-xs">background-image</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">StyleBoxLine</td><td class="px-4 py-2 border">单线（分隔线）</td><td class="px-4 py-2 border font-mono text-xs">border-left/right</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">StyleBoxEmpty</td><td class="px-4 py-2 border">透明占位（无背景）</td><td class="px-4 py-2 border font-mono text-xs">background: transparent</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="gdscript" :code="styleboxCode" title="stylebox_flat.gd — StyleBoxFlat 完整属性" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 属性分类记忆：</strong>bg（背景）+ border（边框）+ corner（圆角）+ shadow（阴影）+ content_margin（内边距）+ expand_margin（外扩，扩大点击/背景区域）。每个属性都是 <code class="bg-blue-100 px-1 rounded text-xs font-mono">_left/_right/_top/_bottom</code> 四份。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Theme 资源创建流程（编辑器）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">静态 UI（主菜单、设置面板、对话框）适合<strong>编辑器可视化</strong>创建 Theme 资源；动态 UI（游戏内 HUD、死亡面板）才用代码。流程如下：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>新建资源：</strong>FileSystem 面板右键 → <strong>New Resource…</strong> → 搜索 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Theme</code> → 保存为 <code class="bg-slate-100 px-1 rounded text-xs font-mono">ui_theme.tres</code></div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>设全局字体：</strong>选中 .tres，Inspector → <code class="bg-slate-100 px-1 rounded text-xs font-mono">default_font</code> 拖入 .ttf/.otf 字体文件，<code class="bg-slate-100 px-1 rounded text-xs font-mono">default_font_size</code> 设为 16</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>定制控件：</strong>Inspector 里展开 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Button / Label / Panel</code>，点 Styles 下的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">normal / hover / pressed</code> → <strong>New StyleBoxFlat</strong> 就地编辑</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>应用：</strong>把 <code class="bg-slate-100 px-1 rounded text-xs font-mono">ui_theme.tres</code> 拖到<strong>根 Control</strong> 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">theme</code> 属性 → 整棵树自动生效</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>验证覆盖：</strong>任何子 Control 的 Inspector 顶部都有 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Theme Overrides</code> 折叠区——改这里的值只影响该节点</div></li>
        </ol>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 工作流：</strong>创建 Theme 资源 → 在 Inspector 中分配 → 设置 Default Font / Button Styles / Color Palette → 应用到根 Control → 全局生效。想做"一键换皮"（白天/夜晚主题、科技风/像素风）就多建几个 .tres 运行时切换。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>代码中创建 Theme 与覆盖样式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">游戏 UI 常<strong>纯代码</strong>构建——不用 .tres 文件，直接 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Theme.new()</code> 生成。两条 API 别混：<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">theme.set_*(…)</code> 改全局，<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">node.add_theme_*_override(…)</code> 改单个节点。</p>
        <div class="mb-4"><Code language="gdscript" :code="themeCreateCode" title="theme_create.gd — 代码建 Theme" /></div>
        <div class="mb-4"><Code language="gdscript" :code="overrideCode" title="theme_override.gd — 覆盖单个节点" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 死亡面板——StyleBoxFlat + 主题覆盖</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的死亡面板是<strong>纯代码 + 逐节点 override</strong> 的典型——没有全局 Theme，每个控件用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">add_theme_*_override()</code> 单独定制。这正是"CSS 内联样式"的 Godot 版：灵活但只作用于当前节点。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="main.gd — _make_game_over_panel() (精简)" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 设计取舍：</strong>Blitz 只有一个面板，用 override 够快。等 UI 多了（按钮、弹窗、设置页全都要同风格），就该抽一个全局 Theme——否则每个节点重复写 StyleBoxFlat 会累死。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ "改了子节点样式不生效"——没搞清覆盖优先级：</strong>Button 有 <code class="bg-amber-100 px-1 rounded text-xs font-mono">normal / hover / pressed / focus / disabled</code> 多个状态。只 override 了 <code class="bg-amber-100 px-1 rounded text-xs font-mono">normal</code>，鼠标悬停或按下就变回 Theme 样式。或者：你在 Theme 里改了 Button 样式，但某个节点之前 override 过——节点级覆盖永远赢，改 Theme 没用。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ "StyleBox 找不到颜色属性"——类型不对：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">bg_color</code> 只有 <strong>StyleBoxFlat</strong> 有；StyleBoxTexture 是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">texture</code>，StyleBoxLine 是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">line_color</code>。别在所有 StyleBox 上无脑找 bg_color。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ Theme 建了但没生效——忘了应用：</strong>新建 .tres 只存在磁盘上，必须拖到<strong>根 Control 的 theme 属性</strong>（或代码 <code class="bg-amber-100 px-1 rounded text-xs font-mono">root.theme = theme</code>）。只挂在某个子节点上，兄弟节点不会继承。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 覆盖字体用错了方法：</strong>节点上用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">add_theme_font_size_override("font_size", 20)</code>；Theme 资源里用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">theme.set_font_size("font_size", "Label", 20)</code>（多一个控件类型参数）。两者的"key 名 + 目标"格式不一样，照抄会报错或静默失败。</p></aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Theme ≈ CSS 全局样式</strong>——.tres 资源文件，根节点应用、整树继承</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>StyleBoxFlat ≈ background + border-radius</strong>——bg/border/corner/shadow/content_margin 六大类属性</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>优先级：节点 override &gt; 全局 Theme &gt; 内置默认</strong>——子 Control 覆盖父 Theme 的单项</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>改全局用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">theme.set_*(…)</code>，改单节点用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">node.add_theme_*_override(…)</code></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Button 多状态：normal / hover / pressed / focus / disabled 都要覆盖才一致</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>UI 多了就抽全局 Theme，别每个节点重复写 StyleBoxFlat</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-1-control-basics" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Control 基类</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-3-container-nodes" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：容器布局 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 覆盖结构"},{id:"sec-1",name:"Theme概述"},{id:"sec-2",name:"StyleBox"},{id:"sec-3",name:"资源创建"},{id:"sec-4",name:"代码覆盖"},{id:"sec-5",name:"🕹️ Blitz实战"},{id:"sec-6",name:"⚠️ 常见错误"},{id:"sec-7",name:"📋 小结"}]
const styleboxCode = `# StyleBoxFlat 完整属性 — 纯色背景 + 圆角 + 边框 + 阴影 + 内边距
var style := StyleBoxFlat.new()
style.bg_color = Color(0.1, 0.1, 0.15, 0.9)   # 背景色 (带透明度)
style.corner_radius_top_left     = 12         # 四角圆角
style.corner_radius_top_right    = 12
style.corner_radius_bottom_left  = 12
style.corner_radius_bottom_right = 12
style.border_width_left  = 2                  # 四边边框宽度
style.border_width_right = 2
style.border_width_top   = 2
style.border_width_bottom = 2
style.border_color = Color(0.3, 0.6, 1.0)     # 边框色
style.content_margin_left   = 12              # 内边距 ≈ CSS padding
style.content_margin_right  = 12
style.content_margin_top    = 8
style.content_margin_bottom = 8
style.expand_margin_left  = 4                 # 外扩区域(点击/背景大一圈)
style.expand_margin_right = 4
style.shadow_color = Color(0, 0, 0, 0.3)      # 阴影
style.shadow_size   = 8
# 应用到 Panel (override 只影响当前节点)
$Panel.add_theme_stylebox_override("panel", style)`
const themeCreateCode = `# 代码中创建 Theme 资源 (等价于编辑器中建 .tres)
var theme := Theme.new()
theme.default_font_size = 16
theme.set_color("font_color", "Label", Color(0.9, 0.9, 0.9))
theme.set_color("font_color", "Button", Color.WHITE)
theme.set_font_size("font_size", "Button", 18)

# Button 的 normal 样式 (先建好 StyleBoxFlat)
theme.set_stylebox("normal", "Button", make_button_style())
theme.set_stylebox("hover", "Button", make_hover_style())

# 应用到根 Control — 所有子节点自动继承
root_control.theme = theme

# 运行时一键换肤: 换个 Theme 对象即可
# root_control.theme = night_theme   # 夜晚主题
# root_control.theme = pixel_theme   # 像素风主题`
const overrideCode = `# 覆盖单个节点 — 不改 Theme, 不影响兄弟节点
var btn: Button = $Button
btn.add_theme_stylebox_override("normal", red_style)
btn.add_theme_stylebox_override("hover", red_hover_style)
btn.add_theme_color_override("font_color", Color.YELLOW)
btn.add_theme_font_size_override("font_size", 20)

# 取消覆盖 — 恢复从 Theme 继承
btn.remove_theme_stylebox_override("normal")

# 等价于 CSS: 全局 .btn { }  vs  单个 .btn--danger { }
# 节点级 override 特异性最高, 一定会赢过 Theme`
const blitzCode = `# main.gd — Blitz 死亡面板: StyleBoxFlat + 主题覆盖 (精简)
func _make_game_over_panel() -> Control:
    var card: Panel = Panel.new()
    card.size = Vector2(400, 280)

    # 卡片: 深色底 + 3px 红边框 + 16px 圆角
    var card_style: StyleBoxFlat = StyleBoxFlat.new()
    card_style.bg_color = Color(0.08, 0.06, 0.06, 0.97)
    card_style.border_width_left   = 3
    card_style.border_width_right  = 3
    card_style.border_width_top    = 3
    card_style.border_width_bottom = 3
    card_style.border_color = Color(1, 0.15, 0.15, 0.8)
    card_style.corner_radius_top_left     = 16
    card_style.corner_radius_top_right    = 16
    card_style.corner_radius_bottom_left  = 16
    card_style.corner_radius_bottom_right = 16
    card.add_theme_stylebox_override("panel", card_style)

    # 标题: 覆盖字号 + 颜色
    var title: Label = Label.new()
    title.text = "YOU DIED"
    title.add_theme_font_size_override("font_size", 42)
    title.add_theme_color_override("font_color", Color(1, 0.15, 0.15))

    # RESTART 按钮: 覆盖 normal + hover 两种状态
    var btn: Button = Button.new()
    btn.text = "RESTART"
    btn.add_theme_font_size_override("font_size", 20)
    var btn_style: StyleBoxFlat = StyleBoxFlat.new()
    btn_style.bg_color = Color(0.85, 0.15, 0.15, 1)
    btn_style.corner_radius_top_left     = 8
    btn_style.corner_radius_top_right    = 8
    btn_style.corner_radius_bottom_left  = 8
    btn_style.corner_radius_bottom_right = 8
    btn.add_theme_stylebox_override("normal", btn_style)
    btn.pressed.connect(_on_restart_pressed)
    return card`
</script>
