<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">什么是 Godot 引擎</h1>
          <p class="text-sm text-slate-500 mt-1">开源、免费、无门槛的游戏引擎——独立开发者的首选</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/project.godot" label="📝 project.godot" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎮</span>
          概述
        </h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-5">
          <p class="text-sm text-purple-800"><strong>🔗 程序员视角：</strong><br/>
          Godot 就像一个<strong>自带游戏引擎的 Vite/Webpack</strong>——你写代码、导入资源、配置场景，然后一键导出到 Windows/Mac/Linux/Web/Android/iOS。<br/>
          如果你是前端开发者，Godot 的<strong>场景（Scene）≈ React 组件树</strong>，<strong>节点（Node）≈ DOM 节点</strong>，<strong>信号（Signal）≈ EventEmitter / addEventListener</strong>。<br/>
          如果你用过 Unity，Godot 就是"开源、轻量、用 Python 风格语言写脚本的 Unity 替代品"。
          </p>
        </aside>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>Godot（读音 /ɡəˈdoʊ/，类似"戈多"）</strong> 是一个完全开源、免费、社区驱动的跨平台游戏引擎。它支持 2D 和 3D 游戏开发，由阿根廷开发者 Juan Linietsky 和 Ariel Manzur 于 2007 年发起，2014 年开源。目前最新稳定版是 Godot 4.x。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">Godot 的核心定位</h3>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>完全免费，无抽成：</strong>MIT 协议。你做游戏赚了 100 万，一分钱都不用给 Godot。对比 Unity（按收入收费）和 Unreal（超过 100 万美元收 5%），这是巨大的商业优势。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>编辑器即 Godot 程序：</strong>Godot 编辑器本身就用 Godot 引擎构建——这是个经典的"吃自己的狗粮"（dogfooding）案例。这意味着编辑器的 UI 系统就是你能用的 UI 系统。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>轻量高效：</strong>Godot 安装包不到 50MB，启动只需几秒。对比 Unity（几个 GB）和 Unreal（几十 GB），这是天壤之别。适合快速迭代和原型开发。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>2D 引擎一流：</strong>Godot 的 2D 引擎是业界公认的顶级水平。它的 2D 渲染器从底层就是为像素游戏设计的，不像 Unity 的 2D 是从 3D "降维"的。</span></li>
        </ul>
      </section>

      <!-- Godot 的设计哲学 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Godot 的设计哲学
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">一切皆场景，一切皆节点</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Godot 的核心思想可以用一句话概括：<strong>游戏 = 场景树（Scene Tree）</strong>。一个场景是一个可复用的"组件"（可以是一个关卡、一个角色、一个 UI 面板），场景由<strong>节点（Node）</strong>组成，节点之间通过<strong>信号（Signal）</strong>通信。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>场景 ≈ React 组件</strong>——可以嵌套、可以复用、有自己的生命周期。<br/>
          <strong>节点 ≈ DOM 元素</strong>——每个节点有类型（Sprite2D、CollisionShape2D）、属性和子节点。<br/>
          <strong>信号 ≈ CustomEvent / EventEmitter</strong>——"按钮被点击了"→ 发射信号 → 订阅者收到通知。<br/>
          <strong>场景树 ≈ DOM 树</strong>——根节点是 SceneTree，游戏运行就是这棵树的每一帧 tick。
          </p>
        </aside>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Godot 概念</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">前端类比</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">Scene（场景）</td><td class="px-4 py-2 border border-slate-200">React Component</td><td class="px-4 py-2 border border-slate-200">可复用的 .tscn 文件，可嵌套实例化</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">Node（节点）</td><td class="px-4 py-2 border border-slate-200">DOM Element</td><td class="px-4 py-2 border border-slate-200">有类型、属性、子节点、生命周期回调</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">SceneTree</td><td class="px-4 py-2 border border-slate-200">DOM Tree + Event Loop</td><td class="px-4 py-2 border border-slate-200">运行时的根，每帧遍历树触发 _process</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">Signal（信号）</td><td class="px-4 py-2 border border-slate-200">EventEmitter / CustomEvent</td><td class="px-4 py-2 border border-slate-200">观察者模式，发射→订阅</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">Resource（资源）</td><td class="px-4 py-2 border border-slate-200">import 的 .json/.png</td><td class="px-4 py-2 border border-slate-200">.tres 文件，数据与逻辑分离</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">GDScript</td><td class="px-4 py-2 border border-slate-200">Python 风格 + DOM API</td><td class="px-4 py-2 border border-slate-200">内置脚本语言，可附加到任意节点</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">写第一个 Godot 程序</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">在 Godot 里，脚本不是"主函数入口"——它是<strong>挂在一个节点上的类</strong>。这个最基本的例子能让你立刻理解"一切皆节点"：</p>
        <div class="mb-4"><Code language="gdscript" :code="helloCode" title="hello.gd" /></div>

        <div class="mb-4"><Code language="gdscript" :code="nodeTreeCode" title="scene_in_code.gd" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">"房间里的 C++"——为什么 Godot 快？</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          你写的 GDScript 代码在"房间里"运行（一个相对安全的脚本 VM），而引擎核心用 C++ 写。这就像 Node.js 的架构——JS 在 V8 里跑，底层 libuv 用 C 做 I/O。Godot 也是这样：<strong>GDScript 负责游戏逻辑（怎么玩），C++ 引擎负责渲染、物理、音频（底层实现）。</strong>
        </p>
        <p class="text-slate-600 mb-3 leading-relaxed">
          如果 GDScript 性能不够，Godot 还支持用 <strong>C#、C++（GDExtension）、Rust</strong> 写性能关键模块。渐进式类型化的灵活性。
        </p>
      </section>

      <!-- Godot 可以做什么 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Godot 能做什么游戏？
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 class="font-semibold text-slate-700 mb-2">🎮 2D 游戏（最强项）</h3>
            <p class="text-xs text-slate-500 leading-relaxed">平台跳跃、横版动作、俯视角射击、Roguelike、银河恶魔城、弹幕射击——Godot 的 2D 引擎是这个领域的王者。《Cassette Beasts》《Brotato》等爆款就是用 Godot 做的。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 class="font-semibold text-slate-700 mb-2">🧊 3D 游戏</h3>
            <p class="text-xs text-slate-500 leading-relaxed">Godot 4.x 的 3D 渲染器大幅升级（Vulkan 后端、SDFGI 全局光照）。虽然不如 Unreal 的 Nanite/Lumen，但做独立 3D 游戏完全够用。《Sonic Colors: Ultimate》就是用 Godot 3D 做的。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 class="font-semibold text-slate-700 mb-2">📱 移动游戏</h3>
            <p class="text-xs text-slate-500 leading-relaxed">一键导出 Android APK 和 iOS。2D 手游是 Godot 非常成熟的领域。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 class="font-semibold text-slate-700 mb-2">🌐 Web 游戏</h3>
            <p class="text-xs text-slate-500 leading-relaxed">导出 HTML5/WebAssembly，在你的学习网站上就能跑！对前端开发者来说这是最酷的特性。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 class="font-semibold text-slate-700 mb-2">🛠️ 工具类应用</h3>
            <p class="text-xs text-slate-500 leading-relaxed">Godot 的 UI 系统（Control 节点）非常强大，可以开发非游戏应用：地图编辑器、关卡编辑器、数据可视化工具。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 class="font-semibold text-slate-700 mb-2">🖥️ 桌面应用</h3>
            <p class="text-xs text-slate-500 leading-relaxed">因为 Godot 编辑器本身就是用 Godot 做的，所以用 Godot 做桌面应用是完全可行的。Pixelorama（像素画编辑器）就是 Godot 做的。</p>
          </div>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 独立游戏成功案例：</strong>《Cassette Beasts》（Steam 好评如潮）、《Brotato》（Steam 销量百万）、《Dome Keeper》、《The Case of the Golden Idol》——都是用 Godot 开发的。这些游戏证明 Godot 完全能做出商业级产品。</p>
        </aside>
      </section>

      <!-- 为什么选 Godot -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>
          为什么选 Godot 而不是 Unity/Unreal？
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Godot</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Unity</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Unreal</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">价格</td><td class="px-4 py-2 border border-slate-200 text-emerald-600 font-semibold">完全免费</td><td class="px-4 py-2 border border-slate-200">按收入收费（Runtime Fee 风波）</td><td class="px-4 py-2 border border-slate-200">收入超$100万收5%</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">安装体积</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">~50MB</td><td class="px-4 py-2 border border-slate-200">~5GB+</td><td class="px-4 py-2 border border-slate-200">~40GB+</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">2D 能力</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">⭐⭐⭐⭐⭐ 原生2D</td><td class="px-4 py-2 border border-slate-200">⭐⭐⭐ 3D降维2D</td><td class="px-4 py-2 border border-slate-200">⭐⭐ Paper2D(已废弃)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">3D 能力</td><td class="px-4 py-2 border border-slate-200">⭐⭐⭐ 4.x大幅提升</td><td class="px-4 py-2 border border-slate-200">⭐⭐⭐⭐ 成熟</td><td class="px-4 py-2 border border-slate-200">⭐⭐⭐⭐⭐ 行业顶流</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">脚本语言</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">GDScript(类Python)+C#</td><td class="px-4 py-2 border border-slate-200">C#</td><td class="px-4 py-2 border border-slate-200">C++ / Blueprint</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">学习曲线</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">⭐⭐ 低（GDScript 易上手）</td><td class="px-4 py-2 border border-slate-200">⭐⭐⭐ 中</td><td class="px-4 py-2 border border-slate-200">⭐⭐⭐⭐ 高</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">开源</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅ MIT协议</td><td class="px-4 py-2 border border-slate-200">❌ 闭源</td><td class="px-4 py-2 border border-slate-200">✅ 源码可看、不可分发</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">适合</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">独立游戏/2D/原型</td><td class="px-4 py-2 border border-slate-200">手游/中型3D</td><td class="px-4 py-2 border border-slate-200">AAA/写实3D</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">对于你（前端开发者 / 独立游戏开发者）</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>GDScript 像 Python + TypeScript 的结合：</strong>动态类型 + 可选静态标注。你写 JS/TS 的习惯基本无缝迁移。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>场景/节点模型 ≈ 组件树：</strong>你每天都在和 DOM 树打交道，理解 SceneTree 是本能。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>信号系统 ≈ EventEmitter：</strong>松耦合通信，和你在 Node.js/浏览器里用的事件监听一模一样。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>免费无抽成：</strong>做独立游戏最大的成本压力就是引擎授权费，Godot 彻底消除这个顾虑。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Web 导出：</strong>你的游戏可以直接跑在浏览器里——这对前端开发者来说是降维打击。</span></li>
        </ul>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 诚实地说：</strong>Godot 也有短板——3D 不如 Unreal、移动端优化不如 Unity 成熟、插件生态不如二者丰富。但如果你的目标是<strong>2D 独立游戏</strong>，Godot 是目前最好的选择，没有之一。</p>
        </aside>
      </section>

      <!-- Godot 4.x 新特性 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>
          Godot 4.x 新特性概览
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">如果你之前用过 Godot 3.x，4.x 是一个巨大的跨越。如果你从零开始，这些是你应该知道的基础能力：</p>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Vulkan 渲染后端：</strong>替代 OpenGL，性能大幅提升。移动端自动 fallback 到 OpenGL ES。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>全新的 TileMap 系统：</strong>支持多图层、自动拼接（terrain autotiling）、运行时高效编辑。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>GDScript 2.0：</strong>类型注解更完善、lambda 表达式、await 协程更优雅、性能提升约 2-3 倍。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>增强的动画系统：</strong>AnimationTree 状态机、Tween 重写（更简洁的 API）。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>新的 UI 主题编辑器：</strong>可视化编辑 Theme、StyleBox，告别手写主题资源。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>物理引擎可选：</strong>默认 GodotPhysics，可切换为 Jolt Physics（更稳定、更快的第三方物理引擎）。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Web 导出优化：</strong>WebAssembly 多线程支持、更好的浏览器兼容性。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>面向数据的渲染：</strong>Forward+ 和 Mobile 两种渲染器，按需选择。</span></li>
        </ul>
      </section>

      <!-- 实战：Blitz -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>
          实战：Blitz 项目
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">本仓库的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/</code> 就是一个真实的 Godot 项目。它的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">project.godot</code> 就是"识别这是一个 Godot 项目"的钥匙：</p>
        <div class="mb-4"><Code language="text" :code="blitzProjectConfig" title="blitz/project.godot（节选）" /></div>
        <p class="text-slate-600 mb-3 leading-relaxed">而 Blitz 的玩家角色 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">player.gd</code> 演示了"一切皆节点 + 脚本挂在节点上"——它的每个 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">@export</code> 属性都能在编辑器 Inspector 里调整：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzPlayerSnippet" title="blitz/scripts/player.gd（节选）" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 学习方法：</strong>把这段代码和本文档的概念对照着看——<code class="bg-emerald-100 px-1 rounded text-xs font-mono">extends CharacterBody2D</code> 是"脚本挂节点"，<code class="bg-emerald-100 px-1 rounded text-xs font-mono">@export</code> 是"编辑器可调"，<code class="bg-emerald-100 px-1 rounded text-xs font-mono">_physics_process</code> 是"每帧逻辑入口"。</p>
        </aside>
      </section>

      <!-- 常见错误 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>
          新手常见错误与误区
        </h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 1：用 Godot 3 的教程学 Godot 4。</strong><br/>
            Godot 3 和 4 的 API 差别巨大：3 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">move_and_slide()</code> 带参数、<code class="bg-amber-100 px-1 rounded text-xs font-mono">Vector2</code> 用乘法、UI 主题系统完全不同。网上大量旧教程会让你复制代码报错。<strong>只学标注"Godot 4.x"的内容，本项目全部基于 Godot 4.x。</strong></p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 2："GDScript 是玩具语言，只能做小游戏"。</strong><br/>
            GDScript 是 Godot 的<strong>原生语言</strong>，深度集成引擎（自动补全、类型推导、编辑器热重载）。《Brotato》等百万销量游戏就用 GDScript 写的。只有极端性能需求（如物理引擎、大场景流式加载）才需要 C#/GDExtension。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 3：写完代码不写类型注解。</strong><br/>
            GDScript 允许 <code class="bg-amber-100 px-1 rounded text-xs font-mono">var speed = 300.0</code>，但一旦变量多起来，编辑器就无法帮你查错和自动补全。本项目<strong>强制所有变量/函数写类型注解</strong>（<code class="bg-amber-100 px-1 rounded text-xs font-mono">var speed: float = 300.0</code>）——这是从 TS 带过来的好习惯，还能让错误在编辑阶段暴露。</p>
          </aside>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Godot 是一个<strong>开源、免费、轻量</strong>的跨平台游戏引擎，MIT 协议无抽成</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>核心模型：<strong>场景（Scene）≈ 组件 · 节点（Node）≈ 元素 · 信号（Signal）≈ 事件</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>脚本不是"主函数"，而是<strong>挂在节点上的类</strong>——这是 Godot 与普通编程最大的心智差异</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>2D 引擎是业界顶级水平，3D 在 4.x 版本大幅提升</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>GDScript 是内置脚本语言，<strong>语法类似 Python，可选类型标注，易于前端开发者上手</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>可选 C#、C++（GDExtension）、Rust 作为性能关键模块的语言</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>最适合：<strong>2D 独立游戏、像素游戏、移动游戏、Web 游戏、快速原型</strong></span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-1-what-is-godot" class="text-slate-300 cursor-default">← 上一节：无（已是第一篇）</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-2-editor-tour" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">下一节：编辑器界面与工作流 →</RouterLink>
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
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "设计哲学" },
  { id: "sec-3", name: "能做什么游戏" },
  { id: "sec-4", name: "为什么选 Godot" },
  { id: "sec-5", name: "Godot 4.x 新特性" },
  { id: "sec-6", name: "🕹️ 实战：Blitz" },
  { id: "sec-7", name: "⚠️ 常见错误" },
  { id: "sec-8", name: "小结" },
]

const helloCode = `extends Node

## _ready 是节点加入场景树后自动调用的入口
## （≈ React 组件挂载后的 useEffect，只执行一次）
func _ready() -> void:
	print("Hello, Godot! 👋")
	# 输出: Hello, Godot! 👋

## _process 每帧调用一次（≈ requestAnimationFrame）
func _process(delta: float) -> void:
	# delta = 距上一帧的秒数，60fps 时约 0.0167
	rotation += delta * 2.0   # 每秒转 2 弧度`

const nodeTreeCode = `extends Node2D

## 用代码搭建一棵"场景树"（≈ React.createElement 一棵子树）
func _ready() -> void:
	# 1. 创建一个 Sprite2D 节点
	var sprite: Sprite2D = Sprite2D.new()
	sprite.name = "Hero"
	sprite.position = Vector2(100, 200)
	add_child(sprite)          # 把 sprite 挂到当前节点下

	# 2. 通过节点路径访问它
	print(get_node("Hero").name)  # 输出: Hero
	print(get_child_count())      # 输出: 1

	# 3. 游戏运行时，这棵树会每一帧被 SceneTree 遍历并触发回调
	print("游戏 = 场景树！")`

const blitzProjectConfig = `; apps/game/blitz/project.godot（节选）
config_version=5

[application]
config/name="Blitz"
run/main_scene="res://scenes/main.tscn"   ; F5 启动的主场景

[display]
window/size/viewport_width=1280
window/size/viewport_height=720`

const blitzPlayerSnippet = `# apps/game/blitz/scripts/player.gd（节选）
extends CharacterBody2D
class_name BlitzPlayer

## @export 让属性出现在编辑器 Inspector 面板（≈ Vue 的 defineProps）
@export var move_speed: float = 320.0   ## 最大移动速度 px/s
@export var jump_velocity: float = -520.0

## 每物理帧调用——角色控制的核心循环
func _physics_process(delta: float) -> void:
	var direction: float = Input.get_axis("move_left", "move_right")
	velocity.x = direction * move_speed
	move_and_slide()`
</script>
