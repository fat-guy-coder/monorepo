<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">编辑器界面与工作流</h1>
          <p class="text-sm text-slate-500 mt-1">熟悉 Godot 编辑器的各个面板、快捷键和日常操作流程</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🖥️</span>概述
        </h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Godot 编辑器 ≈ <strong>VS Code + Chrome DevTools + 画板</strong>的三合一。<br/>
          文件系统面板 = VS Code 的 Explorer 侧栏，脚本编辑器 = VS Code 的编辑区，Inspector = DevTools 的 Elements > Styles（但改的是节点属性而不是 CSS），视口 = 设计稿预览。<br/>
          最酷的是：<strong>你编辑的场景文件（.tscn）和代码文件（.gd）都是纯文本</strong>，可以用 Git 管理、可以 diff、可以 code review——这对程序员来说是天大的福音。
          </p>
        </aside>

        <p class="text-slate-600 leading-relaxed">
          Godot 编辑器<strong>本身就是一个 Godot 游戏</strong>——它的所有 UI 面板、按钮、对话框都是用 Godot 的 Control 节点构建的。这意味着两件事：第一，编辑器非常轻量（启动只需几秒）；第二，你能在编辑器里做到的 UI，你的游戏也能做到。
        </p>
      </section>

      <!-- 整体布局 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>整体布局（Workspace）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Godot 的工作区由多个<strong>可拖拽、可停靠、可自由组合</strong>的面板（Dock）组成。所有面板都可以拖出来变成独立窗口——适合多显示器。布局有预设（顶部菜单 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Editor → Editor Layout</code>）。</p>

        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">
          <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">面板</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">位置（默认）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">前端类比</th></tr></thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">FileSystem</td><td class="px-4 py-2 border border-slate-200">左下</td><td class="px-4 py-2 border border-slate-200">项目文件树（场景/脚本/资源）</td><td class="px-4 py-2 border border-slate-200">VS Code File Explorer</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">Scene</td><td class="px-4 py-2 border border-slate-200">左上</td><td class="px-4 py-2 border border-slate-200">当前场景的<strong>节点树</strong>（树形结构）</td><td class="px-4 py-2 border border-slate-200">React DevTools 组件树</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">Inspector</td><td class="px-4 py-2 border border-slate-200">右侧</td><td class="px-4 py-2 border border-slate-200">选中节点的<strong>所有属性</strong></td><td class="px-4 py-2 border border-slate-200">DevTools Styles 面板</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">Viewport</td><td class="px-4 py-2 border border-slate-200">中央</td><td class="px-4 py-2 border border-slate-200">2D/3D <strong>可视化编辑区</strong></td><td class="px-4 py-2 border border-slate-200">浏览器视口 / Figma 画布</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">Script Editor</td><td class="px-4 py-2 border border-slate-200">中央（切到 Script 视图）</td><td class="px-4 py-2 border border-slate-200">代码编辑器（语法高亮/自动补全）</td><td class="px-4 py-2 border border-slate-200">VS Code 编辑区</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">Node</td><td class="px-4 py-2 border border-slate-200">Inspector 旁边</td><td class="px-4 py-2 border border-slate-200">选中节点的<strong>信号列表</strong></td><td class="px-4 py-2 border border-slate-200">组件暴露的事件列表</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">Output</td><td class="px-4 py-2 border border-slate-200">底部</td><td class="px-4 py-2 border border-slate-200">print() 输出 / 错误 / 调试</td><td class="px-4 py-2 border border-slate-200">Terminal / Console</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">Debugger</td><td class="px-4 py-2 border border-slate-200">底部（调试 Tab）</td><td class="px-4 py-2 border border-slate-200">断点/调用栈/变量监视</td><td class="px-4 py-2 border border-slate-200">VS Code Debug 面板</td></tr>
          </tbody>
        </table></div>
      </section>

      <!-- 四个核心面板 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>四个核心面板详解
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">2.1 FileSystem（文件系统）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">右键 → <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">New Folder / New Scene / New Script / New Resource</code>。项目根目录有一个默认的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">res://</code> 路径，所有资源都在这个目录下。支持拖拽导入资源（图片拖进来自动成为 Texture2D，字体拖进来自动成为 FontFile）。</p>
        <ul class="space-y-1 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">*.tscn</code> → 场景文件（Scene）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">*.gd</code> → GDScript 脚本文件</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">*.tres</code> → 资源文件（Resource，如材质、主题）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">*.import</code> → 自动生成，原始资源的导入配置</span></li>
        </ul>

        <h3 class="text-base font-semibold text-slate-700 mb-3">2.2 Scene（场景面板）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">左侧树形结构显示当前场景的所有节点。可以<strong>拖拽调整父子关系</strong>、右键实例化子场景（<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Instantiate Child Scene</code>）。每个节点左侧有眼睛图标（可见性切换）和锁图标（锁定选择）。</p>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>关键操作：</strong>选中一个节点 → 点击 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">+</code> 按钮添加子节点 → 弹出搜索框 → 输入节点名（如 "Sprite2D"）→ Enter。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">2.3 Inspector（检查器）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">选中一个节点后，Inspector 显示它的<strong>所有可编辑属性</strong>。这里你可以改位置（Transform）、颜色（Modulate）、碰撞形状、材质等。属性分为多组（Node、Transform、Visibility 等），可以直接输入值，也可以拖拽数字滑动。</p>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>小技巧：</strong>属性名右侧的<strong>回旋箭头图标</strong>表示"恢复到默认值"。深蓝色高亮的属性表示"被修改过"。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">2.4 Script Editor（脚本编辑器）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">选中一个节点 → 点击顶部 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">📜 Script</code> 按钮（或右键节点 → Attach Script）→ 创建或打开脚本。编辑器功能：语法高亮、自动补全、<strong>右键 → Lookup Symbol 跳转定义</strong>、错误标记。内置文档：Ctrl+Click 任何 Godot 类名或方法名直接打开文档。</p>
        <div class="mb-4"><Code language="gdscript" :code="scriptExample" title="attached_script.gd" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 习惯养成：</strong>GDScript 文件<strong>第一行</strong>写 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">extends Node</code>（或对应的父类）。这是告诉 Godot"这个脚本附加到什么类型的节点上"。没有这一行，自动补全不会工作。</p>
        </aside>
      </section>

      <!-- 视口操作 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>视口（Viewport）操作
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">顶部有 4 个视图切换按钮：<strong>2D / 3D / Script / AssetLib</strong>。最常用的是 2D 和 Script，用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Ctrl+F1/F2/F3/F4</code> 快速切换。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">
          <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">快捷键</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border border-slate-200">平移画布</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">鼠标中键拖拽</td><td class="px-4 py-2 border border-slate-200">或按住 Space 拖拽</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">缩放</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Ctrl+滚轮</td><td class="px-4 py-2 border border-slate-200">编辑器缩放，不影响游戏</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">移动工具</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">W</td><td class="px-4 py-2 border border-slate-200">Move（移动选中节点）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">旋转工具</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">E</td><td class="px-4 py-2 border border-slate-200">Rotate（旋转）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">缩放工具</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">S</td><td class="px-4 py-2 border border-slate-200">Scale（缩放）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">选择工具</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Q</td><td class="px-4 py-2 border border-slate-200">默认选择模式</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">居中视图</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">F</td><td class="px-4 py-2 border border-slate-200">Focus 选中节点</td></tr>
          </tbody>
        </table></div>
        <p class="text-slate-600 text-sm">W/E/S/Q 这套快捷键和 <strong>Blender（3D 建模软件）</strong> 是一模一样的。如果你用过 Blender，肌肉记忆直接迁移。</p>
      </section>

      <!-- 日常工作流 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>日常开发工作流
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">下面是最典型的"从零到运行"的流程。掌握这个流程后，80% 的开发时间都在这个循环里。</p>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>创建场景：</strong>FileSystem 右键 → New Scene → 选择根节点类型（如 Node2D、CharacterBody2D、Control）。<span class="text-xs text-slate-400">→ 得到 .tscn 文件</span></div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>添加子节点：</strong>在 Scene 面板选中根节点 → 点 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">+</code> → 搜索并添加需要的节点（Sprite2D、CollisionShape2D 等）。<span class="text-xs text-slate-400">→ 节点树搭起来</span></div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>调整属性：</strong>选中节点 → Inspector 面板修改属性（位置、大小、颜色等）。<span class="text-xs text-slate-400">→ 视觉调整</span></div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>附加脚本：</strong>选中节点 → 点 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">📜</code> 按钮 → 创建 GDScript。<span class="text-xs text-slate-400">→ 写代码</span></div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>写逻辑代码：</strong>在 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_ready()</code> 初始化，在 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_process(delta)</code> 写每帧逻辑。<span class="text-xs text-slate-400">→ 游戏活起来了</span></div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span><div class="text-slate-600"><strong>运行测试：</strong>点 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">F5</code>（Run Project）或 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">F6</code>（Run Current Scene）。<span class="text-xs text-slate-400">→ 即时看到效果</span></div></li>
        </ol>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 F6 vs F5：</strong><br/>
          <code class="bg-blue-100 px-1 rounded text-xs font-mono">F6</code> 只运行<strong>当前打开的场景</strong>（调试单个场景时用，快）。<br/>
          <code class="bg-blue-100 px-1 rounded text-xs font-mono">F5</code> 运行<strong>项目主场景</strong>（Project Settings → Application → Run → Main Scene 指定的场景）。</p>
        </aside>
      </section>

      <!-- 快捷键清单 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>必备快捷键清单
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">不需要全部记住，但下面这几个能<strong>成倍提升效率</strong>。花一天适应值得。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">
          <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">快捷键</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">功能</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th></tr></thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Ctrl+S</td><td class="px-4 py-2 border border-slate-200">保存场景</td><td class="px-4 py-2 border border-slate-200">随时按，养成肌肉记忆</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">F5</td><td class="px-4 py-2 border border-slate-200">运行主场景</td><td class="px-4 py-2 border border-slate-200">测试整个游戏</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">F6</td><td class="px-4 py-2 border border-slate-200">运行当前场景</td><td class="px-4 py-2 border border-slate-200">单独测试当前场景</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">F8</td><td class="px-4 py-2 border border-slate-200">停止运行</td><td class="px-4 py-2 border border-slate-200">回到编辑器</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Ctrl+A</td><td class="px-4 py-2 border border-slate-200">添加子节点</td><td class="px-4 py-2 border border-slate-200">打开节点搜索框（高频！）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Ctrl+D</td><td class="px-4 py-2 border border-slate-200">复制节点</td><td class="px-4 py-2 border border-slate-200">Duplicate</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Ctrl+Shift+F</td><td class="px-4 py-2 border border-slate-200">全局搜索文件</td><td class="px-4 py-2 border border-slate-200">Quick Open（类 VS Code Ctrl+P）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Ctrl+Click 类名</td><td class="px-4 py-2 border border-slate-200">跳转到文档</td><td class="px-4 py-2 border border-slate-200">脚本编辑器中点任何内置类</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Q/W/E/S</td><td class="px-4 py-2 border border-slate-200">选择/移动/旋转/缩放</td><td class="px-4 py-2 border border-slate-200">视口中操作节点</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">Ctrl+1/2/3/4</td><td class="px-4 py-2 border border-slate-200">切换视图</td><td class="px-4 py-2 border border-slate-200">2D / 3D / Script / AssetLib</td></tr>
          </tbody>
        </table></div>
      </section>

      <!-- 实战：Blitz -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的关卡是怎么搭出来的
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">你在编辑器 Scene 面板里拖拽搭节点树，其实<strong>每一棵节点树都能用代码搭出来</strong>。Blitz 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">main.gd</code> 就全部用代码搭建了关卡——这是理解"编辑器 = 节点树的图形化编辑"的最佳案例：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzBuildWall" title="blitz/scripts/main.gd（节选）" /></div>
        <p class="text-slate-600 mb-3 leading-relaxed">这段代码做的事，和你在编辑器里"添加 StaticBody2D 节点 → 添加 CollisionShape2D 子节点 → 设置 RectangleShape2D 形状 → 写脚本画外观"完全等价。对比一下：</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">
          <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">编辑器操作</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对应代码</th></tr></thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border border-slate-200">Scene 面板点 + 添加节点</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">StaticBody2D.new() + add_child()</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">Inspector 改 position/size</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">body.position = pos</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">给节点拖一个脚本</td><td class="px-4 py-2 border border-slate-200 font-mono text-xs">visual.set_script(DrawableRect)</td></tr>
          </tbody>
        </table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 怎么选？</strong>静态的东西（地形、平台、UI 布局）适合在编辑器里拖；动态/批量生成的东西（100 个敌人、程序化关卡）适合用代码。Godot 两种方式无缝混用——你可以先在编辑器搭好，再用 <code class="bg-blue-100 px-1 rounded text-xs font-mono">duplicate()</code> 在代码里批量复制。</p>
        </aside>
      </section>

      <!-- 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>编辑器常见错误
        </h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 1：改了节点名，代码里 <code class="bg-amber-100 px-1 rounded text-xs font-mono">$旧名字</code> 没跟着改。</strong><br/>
            节点重命名后，所有 <code class="bg-amber-100 px-1 rounded text-xs font-mono">$NodeName</code> / <code class="bg-amber-100 px-1 rounded text-xs font-mono">get_node("...")</code> 引用立即失效，运行时返回 null，报 "Invalid get index 'position'"。<strong>养成先写节点名再写引用，或用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">@onready var</code> 一次性缓存引用。</strong></p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 2：改了属性/加了节点没保存就 F6。</strong><br/>
            编辑器会自动保存场景文件的时机有限，<strong>忘按 Ctrl+S 就运行，改的东西完全不生效</strong>——这是新手最常困惑的"我明明改了为什么没变"。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 3：在错误的视图里找节点。</strong><br/>
            2D 场景的节点只出现在 2D 视图，3D 节点只在 3D 视图。切到 Script 视图就看不到 Scene 面板了（会被挤到侧边）。用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Ctrl+F1/F2/F3/F4</code> 快速切换视图，别用鼠标点。</p>
          </aside>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>FileSystem</strong> 管理文件，<strong>Scene</strong> 显示节点树，<strong>Inspector</strong> 改属性，<strong>Viewport</strong> 可视化编辑</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>核心循环：<strong>加节点 → 调属性 → 写脚本 → F6 测试</strong>，循环迭代</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Ctrl+A 添加节点</strong>（高频！）、F5/F6 运行、Ctrl+S 保存——第一天就养成肌肉记忆</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>编辑器里拖出来的节点树 = <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">add_child()</code> 代码，两者完全等价</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>编辑器本身就是 Godot 做的——轻量、可定制、Git 友好（.tscn 是纯文本）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-1-what-is-godot" class="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">← 上一节：什么是 Godot 引擎</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-3-scene-node-concept" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">下一节：场景与节点核心概念 →</RouterLink>
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
  { id: "sec-2", name: "整体布局" },
  { id: "sec-3", name: "四个核心面板" },
  { id: "sec-4", name: "视口操作" },
  { id: "sec-5", name: "日常开发工作流" },
  { id: "sec-6", name: "必备快捷键" },
  { id: "sec-7", name: "🕹️ 实战：Blitz" },
  { id: "sec-8", name: "⚠️ 常见错误" },
  { id: "sec-9", name: "小结" },
]

const scriptExample = `extends Node2D

## 第一行 extends 决定这个脚本能挂到哪种节点上
## 没有 extends，编辑器不会提供任何自动补全

@onready var label: Label = $Label
## @onready 表示"等节点树就绪后再赋值"
## $Label = get_node("Label") 的简写（≈ querySelector）

func _ready() -> void:
	# 编辑器里拖出来的节点，代码里直接引用
	label.text = "编辑器搭树，脚本写逻辑"`

const blitzBuildWall = `# apps/game/blitz/scripts/main.gd（节选）
## 用代码搭一面墙——等价于在编辑器 Scene 面板拖节点
func _create_wall(pos: Vector2, size: Vector2, color: Color) -> void:
	# 1. 创建物理体（编辑器：点 + 添加 StaticBody2D）
	var body: StaticBody2D = StaticBody2D.new()
	body.position = pos
	body.collision_layer = 1 << 4   # bit4: 墙壁层

	# 2. 挂碰撞形状子节点（编辑器：添加 CollisionShape2D 子节点）
	var col_shape: CollisionShape2D = CollisionShape2D.new()
	var rect: RectangleShape2D = RectangleShape2D.new()
	rect.size = size
	col_shape.shape = rect
	body.add_child(col_shape)

	# 3. 挂可视化外观（编辑器：给节点拖脚本）
	var visual: Node2D = Node2D.new()
	visual.set_script(DrawableRect)
	body.add_child(visual)

	# 4. 把整棵树挂到当前场景（编辑器：最终就是 .tscn 的节点树）
	add_child(body)`
</script>
