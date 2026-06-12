<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">场景与节点核心概念</h1><p class="text-sm text-slate-500 mt-1">Godot 架构的基石——理解场景树和节点系统</p></div>
        <div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-3</span></div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🌲</span>概述</h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-5">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          把 Godot 的游戏理解为<strong>一棵巨大的 React 组件树</strong>：<br/>
          <strong>场景（Scene）≈ TSX/JSX 组件文件</strong>——独立的 .tscn 文件，可复用、可嵌套。<br/>
          <strong>节点（Node）≈ DOM 元素 / React Element</strong>——树上的每个点都有类型、属性和回调。<br/>
          <strong>场景树（SceneTree）≈ React Root + Fiber 树</strong>——运行时的根节点，每帧调度所有节点的 _process。<br/>
          <strong>实例化（Instantiate）≈ 导入并使用组件</strong>——<code class="bg-purple-100 px-1 rounded text-xs font-mono">PackedScene.instantiate()</code> 就像 <code class="bg-purple-100 px-1 rounded text-xs font-mono">React.createElement(MyComponent)</code>。
          </p>
        </aside>

        <p class="text-slate-600 leading-relaxed">理解场景和节点是掌握 Godot 的<strong>第一道门槛</strong>。一旦理解了"游戏 = 场景树 + 节点间信号通信"，后续所有概念（脚本、物理、UI、动画）都自然而然地串联起来。</p>
      </section>

      <!-- Scene -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>场景（Scene）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>场景 = 一个可复用的节点子树。</strong>每个场景保存为一个 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">.tscn</code> 文件，有一个<strong>根节点</strong>和若干子节点。场景可以嵌套——一个场景把另一个场景作为子节点实例化。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">.tscn 文件里是什么？</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">.tscn 是<strong>纯文本文件</strong>，类似 JSON 的 Godot 自定义格式。可以用任何文本编辑器打开。这是 Godot 对程序员最友好的设计之一——<strong>场景文件 = 可版本控制的配置文件</strong>。</p>
        <div class="mb-4"><Code language="text" :code="tscnExample" title="player.tscn（简化版）" /></div>
        <p class="text-slate-600 mb-4 text-sm leading-relaxed">可以看到：场景文件记录了<strong>节点层级（父子关系）</strong>、每个节点的<strong>属性值</strong>（position、texture）、附加的<strong>脚本引用</strong>。这就是 Git diff 能看到的东西。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">场景的三大特性</h3>
        <ul class="space-y-3 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1 font-bold text-lg">1</span><span><strong>可复用（Reusable）：</strong>一个"敌人"场景设计好之后，可以在关卡中实例化 100 个——每个实例独立运行，修改原场景会同步到所有实例。≈ React 组件定义 vs 组件实例。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1 font-bold text-lg">2</span><span><strong>可组合（Composable）：</strong>一个复杂的"玩家"场景可以由多个子场景组合（身体 + 武器 + 血条 UI），每个子场景独立设计和维护。≈ Component Composition。</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1 font-bold text-lg">3</span><span><strong>可继承（Inheritable）：</strong>场景可以继承另一个场景——子场景覆盖或扩展父场景的节点和属性。≈ 类继承，但作用在场景层级。</span></li>
        </ul>
      </section>

      <!-- Node -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>节点（Node）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>节点是 Godot 中最基本的构建块。</strong>所有东西都是节点——精灵图是 Sprite2D 节点、碰撞体是 CollisionShape2D 节点、按钮是 Button 节点、声音是 AudioStreamPlayer 节点。<strong>游戏 = 一棵由各种类型的节点组成的树。</strong></p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">节点类型继承树（部分）</h3>
        <div class="mb-4"><Code language="text" :code="nodeHierarchyCode" title="node_hierarchy.txt" /></div>
        <p class="text-slate-600 mb-4 text-sm leading-relaxed">理解继承链很重要：比如 CharacterBody2D 继承 PhysicsBody2D 继承 CollisionObject2D 继承 Node2D 继承 Node。这意味着 CharacterBody2D<strong>拥有所有这些父类的属性和方法</strong>。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">节点的通用属性</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">所有节点（继承自 Node 基类）都有以下通用能力：</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">
          <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">属性/方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">前端类比</th></tr></thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">name</td><td class="px-4 py-2 border border-slate-200">节点名称（场景中唯一标识）</td><td class="px-4 py-2 border border-slate-200">DOM 的 id 属性</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">owner</td><td class="px-4 py-2 border border-slate-200">所属的场景根节点</td><td class="px-4 py-2 border border-slate-200">组件所属的组件树根</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">get_parent()</td><td class="px-4 py-2 border border-slate-200">获取父节点</td><td class="px-4 py-2 border border-slate-200">element.parentElement</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">get_children()</td><td class="px-4 py-2 border border-slate-200">获取子节点数组</td><td class="px-4 py-2 border border-slate-200">element.children</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">add_child(node)</td><td class="px-4 py-2 border border-slate-200">添加子节点</td><td class="px-4 py-2 border border-slate-200">element.appendChild(node)</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">remove_child(node)</td><td class="px-4 py-2 border border-slate-200">移除子节点</td><td class="px-4 py-2 border border-slate-200">element.removeChild(node)</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">queue_free()</td><td class="px-4 py-2 border border-slate-200">标记删除（当前帧结束后释放）</td><td class="px-4 py-2 border border-slate-200">setTimeout(() => remove(), 0)</td></tr>
          </tbody>
        </table></div>
      </section>

      <!-- Node Lifecycle -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>节点的生命周期</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">每个节点从创建到销毁经历固定的生命周期。这是写脚本最重要的概念——<strong>你把代码放在哪个回调里，决定了它什么时候执行</strong>。</p>

        <ol class="list-decimal list-inside space-y-3 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>构造函数（_init）</strong> —— 节点对象被 new 出来时调用。此时节点还没有被加入场景树。<em>很少需要写，除非你手动 new 节点。</em></li>
          <li><strong>进入场景树（_enter_tree）</strong> —— 节点被 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">add_child</code> 加入场景树时调用。<em>适合做一次性初始化：连接信号、设置引用。</em></li>
          <li><strong>准备就绪（_ready）</strong> —— <strong>最重要的回调。</strong>节点和<strong>所有子节点</strong>都加入场景树后，从子到父依次调用。子节点的 _ready 先于父节点执行。<em>这里做一切初始化工作：获取子节点引用、设置初始值、加载资源。</em></li>
          <li><strong>每帧更新（_process(delta) / _physics_process(delta)）</strong> —— 每秒 60 帧（或物理帧）调用一次。<em>写游戏逻辑的地方：移动、检测、动画。</em></li>
          <li><strong>退出场景树（_exit_tree）</strong> —— 节点从场景树移除时调用。<em>清理：断开信号、停止音效。</em></li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ _ready vs _enter_tree 的区别（重要！）：</strong><br/>
          • <code class="bg-amber-100 px-1 rounded text-xs font-mono">_enter_tree</code>：节点加入树时 <strong>立即</strong> 调用，此时子节点可能还没准备好。<br/>
          • <code class="bg-amber-100 px-1 rounded text-xs font-mono">_ready</code>：节点 <strong>及其所有子节点</strong> 都加入树后才调用。子节点的 _ready 先执行，父节点后执行。<br/>
          <strong>90% 的情况用 _ready。</strong>只有当你需要在节点一加入树就做某事（不管子节点）时才用 _enter_tree。
          </p>
        </aside>

        <h3 class="text-base font-semibold text-slate-700 mb-3">_process vs _physics_process</h3>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">
          <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700"></th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">_process(delta)</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">_physics_process(delta)</th></tr></thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">频率</td><td class="px-4 py-2 border border-slate-200">每帧（60fps = 16ms/帧，但不保证）</td><td class="px-4 py-2 border border-slate-200">固定 <strong>60 次/秒</strong>（可配置，默认 60Hz）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">用途</td><td class="px-4 py-2 border border-slate-200">视觉效果、动画、UI 更新、输入响应</td><td class="px-4 py-2 border border-slate-200"><strong>物理相关</strong>：移动、碰撞、力的计算</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">delta 值</td><td class="px-4 py-2 border border-slate-200">距上一帧的实际时间（可变）</td><td class="px-4 py-2 border border-slate-200">固定值 1/60（=0.0167）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200 font-medium">前端类比</td><td class="px-4 py-2 border border-slate-200">requestAnimationFrame</td><td class="px-4 py-2 border border-slate-200">setInterval(16ms)</td></tr>
          </tbody>
        </table></div>
        <p class="text-slate-600 text-sm"><strong>经验法则：</strong>角色移动用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_physics_process</code>（涉及碰撞检测），视觉效果和 UI 用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_process</code>。</p>
      </section>

      <!-- SceneTree -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>SceneTree — 游戏的主循环</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>SceneTree 是运行时所有场景的根。</strong>它不是你创建的——Godot 自动管理它。你在任何脚本中都可以通过 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">get_tree()</code> 访问它。SceneTree 是游戏的主循环引擎。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">SceneTree 的职责</h3>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>管理场景切换：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">get_tree().change_scene_to_file("res://game.tscn")</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>驱动游戏循环：</strong>每帧遍历场景树，从根到叶调用 _process 和 _physics_process</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>管理 Group（分组）：</strong>可以用 group 给节点打标签，然后批量调用。如 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">get_tree().call_group("enemies", "take_damage")</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>暂停和调试：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">get_tree().paused = true</code> 暂停所有 _process</span></li>
        </ul>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>SceneTree ≈ React 的 <strong>Fiber 调度器（Scheduler）+ 事件循环</strong>。React 每帧遍历 Fiber 树决定哪些组件需要更新；Godot 每帧遍历 SceneTree 调用节点的 _process。两者的核心思想都是"遍历树、调度更新"。</p>
        </aside>
      </section>

      <!-- 实例化 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>场景实例化</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">场景实例化是将一个 .tscn 文件<strong>变成运行时的节点子树</strong>的过程。操作分两步：</p>
        <div class="mb-4"><Code language="gdscript" :code="instantiateCode" title="instantiate.gd" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">实例化 vs 复制</h3>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>实例化（Instantiate）</strong>：从 .tscn 文件创建新实例。修改原场景 → 所有实例同步更新。<strong>复制（Duplicate）</strong>：拷贝一个已有的节点。修改原节点 → 副本不受影响。日常开发中实例化更常用，复制用于快速创建变体。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">路径访问节点：$ 语法糖</h3>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">$Sprite2D</code> 是 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">get_node("Sprite2D")</code> 的简写。这是 GDScript 最常用的语法之一。路径支持多层：<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">$Weapon/Sword</code> 获取名为 Weapon 的子节点下的 Sword 子节点。</p>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">$Weapon</code> 时如果 Weapon 节点<strong>存在</strong>（编译不报错）但后来被移除了（运行时报错），会返回 null。习惯性做法是在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">_ready</code> 中获取引用并检查 <code class="bg-amber-100 px-1 rounded text-xs font-mono">if not node: push_error("...")</code>。</p>
        </aside>
      </section>

      <!-- 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>场景 ≈ React 组件</strong>（.tscn 文件、可复用、可嵌套）——纯文本，Git 友好</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>节点 ≈ DOM 元素</strong>（有类型、属性、生命周期、父子关系）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>生命周期：<strong>_ready（初始化，最常用）→ _process(delta)（每帧）→ _exit_tree（清理）</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_process</strong> 用于视觉和输入（可变帧率），<strong>_physics_process</strong> 用于物理和移动（固定 60Hz）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>SceneTree ≈ Fiber 调度器 + 事件循环</strong>，每帧遍历树调用回调</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>实例化场景 = <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">load("res://x.tscn").instantiate()</code> + <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">add_child(instance)</code></span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-2-editor-tour" class="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">← 上一节：编辑器界面与工作流</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-4-project-structure" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">下一节：项目结构与文件管理 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "场景（Scene）" },
  { id: "sec-3", name: "节点（Node）" },
  { id: "sec-4", name: "节点生命周期" },
  { id: "sec-5", name: "SceneTree" },
  { id: "sec-6", name: "场景实例化" },
  { id: "sec-7", name: "小结" },
]

const tscnExample = `[gd_scene load_steps=2 format=3 uid="uid://abc123"]
[ext_resource type="Script" path="res://player.gd" id="1_script"]
[ext_resource type="Texture2D" path="res://player.png" id="2_tex"]

[node name="Player" type="CharacterBody2D"]
script = ExtResource("1_script")

[node name="Sprite2D" type="Sprite2D" parent="."]
texture = ExtResource("2_tex")
position = Vector2(0, -10)

[node name="CollisionShape2D" type="CollisionShape2D" parent="."]
shape = SubResource("CapsuleShape2D_abc")`

const nodeHierarchyCode = `Node                          ← 所有节点的基类
├── Node2D                     ← 2D 游戏的空间节点
│   ├── Sprite2D              ← 显示纹理/图片
│   ├── AnimatedSprite2D      ← 播放帧动画
│   ├── CollisionShape2D      ← 碰撞形状
│   ├── Area2D                ← 检测区域（进入/离开）
│   ├── CharacterBody2D       ← 代码控制的物理体（角色）
│   ├── RigidBody2D           ← 物理模拟的刚体
│   ├── StaticBody2D          ← 静态碰撞体（墙壁/地板）
│   ├── TileMap               ← 瓦片地图
│   ├── Camera2D              ← 2D 相机
│   └── Parallax2D            ← 视差背景
├── Node3D                     ← 3D 游戏的空间节点
├── Control                    ← UI 控件的基类
│   ├── Button / Label / LineEdit / ...
│   ├── Panel / ScrollContainer / TabContainer / ...
│   └── VBoxContainer / HBoxContainer / GridContainer / ...
└── AudioStreamPlayer          ← 音效播放节点`

const instantiateCode = `# 方式1：运行时加载并实例化
var bullet_scene = preload("res://bullet.tscn")
var bullet = bullet_scene.instantiate()
bullet.position = $Muzzle.global_position
add_child(bullet)

# 方式2：编辑器里拖拽到场景（不需要写代码）
# 在 Scene 面板选中父节点 → 点 🔗 图标 → 选 .tscn 文件

# 方式3：定时器自动生成（子弹发射器）
func _on_timer_timeout():
    var bullet = preload("res://bullet.tscn").instantiate()
    bullet.position = position
    get_parent().add_child(bullet)`
</script>
