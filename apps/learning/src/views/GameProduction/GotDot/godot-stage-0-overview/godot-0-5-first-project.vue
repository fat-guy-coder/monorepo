<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">第一个项目：Hello Godot</h1>
          <p class="text-sm text-slate-500 mt-1">从零创建项目 → 场景 → 节点 → 脚本 → 运行——完整实操流程</p>
        </div>
        <div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段
            0-5</span></div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>目标
        </h2>
        <p class="text-slate-600 leading-relaxed">创建一个可运行的 Godot 项目：一个带有文本标签的 2D
          场景，按方向键移动一个精灵，点击按钮弹出对话框。<strong>目标是跑通完整工作流，不追求代码量。</strong></p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>创建项目
        </h2>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">打开 Godot → <strong>新建项目</strong> → 项目名称：<code
                class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">HelloGodot</code> → 选择目录 →
              渲染器选 <strong>Forward+</strong>（桌面游戏推荐）→ 创建。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600">你会看到空白的 3D 视口。切换到 <strong>2D 视图</strong>（顶部工具栏点 "2D" 或按 <code
                class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Ctrl+F1</code>）。</div>
          </li>
        </ol>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>创建第一个场景
        </h2>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">FileSystem 面板 → 右键 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">res://</code> → <strong>New
                Folder</strong> → 输入 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">scenes</code>。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600">右键 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">scenes/</code> → <strong>New
                Scene</strong> → 选择根节点类型为 <strong>Node2D</strong> → 命名为 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Main</code> → Ctrl+S 保存为 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">main.tscn</code>。</div>
          </li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 类比：</strong>创建场景 ≈ <code
              class="bg-purple-100 px-1 rounded text-xs font-mono">touch App.tsx</code>。选 Node2D 作为根节点 ≈ 选 <code
              class="bg-purple-100 px-1 rounded text-xs font-mono">export default function App()</code> 作为根组件。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>添加精灵（Sprite）
        </h2>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">选中 Main 节点 → 点 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">+</code>（或 Ctrl+A）→ 搜索
              <strong>Sprite2D</strong> → 添加。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600">我们需要一个图片。FileSystem 右键 → New Resource → 搜索 <strong>PlaceholderTexture2D</strong>
              → 设置 size 为 64×64 → 保存为 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">placeholder.tres</code>（这是 Godot
              内置的占位纹理，无需外部图片）。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600">选中 Sprite2D → Inspector 面板 → 将 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">placeholder.tres</code> 拖到
              <strong>Texture</strong> 属性上。</div>
          </li>
        </ol>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>写第一个
          GDScript 脚本</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">选中 Main 节点 → 点 <code
            class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">📜</code> 按钮 → 创建脚本，路径 <code
            class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">res://scenes/main.gd</code>。</p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 语法对照（TS / Python / GDScript）：</strong><br />
          <table class="w-full text-xs mt-2">
            <thead>
              <tr class="text-left">
                <th class="pr-4 py-1">TS</th>
                <th class="pr-4 py-1">Python</th>
                <th class="pr-4 py-1">GDScript（强类型）</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="pr-4 py-1 font-mono">let x: number = 5</td>
                <td class="pr-4 py-1 font-mono">x: int = 5</td>
                <td class="pr-4 py-1 font-mono text-blue-700">var x: int = 5</td>
              </tr>
              <tr>
                <td class="pr-4 py-1 font-mono">function foo(x: number): void {"{"}</td>
                <td class="pr-4 py-1 font-mono">def foo(x: int) -> None:</td>
                <td class="pr-4 py-1 font-mono text-blue-700">func foo(x: int) -> void:</td>
              </tr>
              <tr>
                <td class="pr-4 py-1 font-mono">const PI = 3.14</td>
                <td class="pr-4 py-1 font-mono">PI: float = 3.14</td>
                <td class="pr-4 py-1 font-mono text-blue-700">const PI: float = 3.14</td>
              </tr>
              <tr>
                <td class="pr-4 py-1 font-mono">class Foo extends Bar {"{"}</td>
                <td class="pr-4 py-1 font-mono">class Foo(Bar):</td>
                <td class="pr-4 py-1 font-mono text-blue-700">class Foo extends Bar:</td>
              </tr>
            </tbody>
          </table>
          </p>
        </aside>

        <h3 class="text-base font-semibold text-slate-700 mb-3">脚本内容</h3>
        <div class="mb-4"><Code language="gdscript" :code="mainGdCode" title="main.gd" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">逐行解释</h3>
        <div class="space-y-3 text-slate-600 text-sm leading-relaxed">
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">extends Node2D</code> —
              <strong>必须第一行</strong>。告诉 Godot "这个脚本附加到 Node2D 节点上"。≈ TS 的 <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">class Main extends Node2D {"{}"}</code> 或 Python 的
              <code class="bg-slate-200 px-1 rounded text-xs font-mono">class Main(Node2D):</code>。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code
                class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">@onready var sprite: Sprite2D = $Sprite2D</code>
              — <strong>节点引用</strong>。<code class="bg-slate-200 px-1 rounded text-xs font-mono">@onready</code> ≈ 在
              <code class="bg-slate-200 px-1 rounded text-xs font-mono">_ready()</code> 的第一行执行赋值。<code
                class="bg-slate-200 px-1 rounded text-xs font-mono">$Sprite2D</code> ≈ <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">document.querySelector('#Sprite2D')</code> / Vue 的
              <code class="bg-slate-200 px-1 rounded text-xs font-mono">$refs.sprite</code>。<strong>注意：</strong>声明类型
              <code class="bg-slate-200 px-1 rounded text-xs font-mono">: Sprite2D</code> 后编辑器自动补全该节点的所有属性和方法。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">const SPEED: float = 300.0</code>
              — <strong>编译时常量</strong>。全大写是 GDScript 的命名约定。≈ TS 的 <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">const SPEED = 300</code>。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code
                class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">func _process(delta: float) -> void:</code>
              — <strong>每帧调用</strong>。delta 是距上一帧的秒数（60fps 时 ≈0.0167）。≈ TS 的 <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">requestAnimationFrame((timestamp) => {"{}"})</code>。<strong>关键区别：</strong>GDScript
              的函数体用缩进，不用花括号——和 Python 一样。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code
                class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Input.get_axis("move_left", "move_right")</code>
              — 返回 -1.0（左）到 1.0（右）的浮点数。≈ <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">(keyA ? -1 : 0) + (keyD ? 1 : 0)</code> 但更优雅。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code
                class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">sprite.position.x += direction * SPEED * delta</code>
              — <strong>帧无关移动公式</strong>。<code class="bg-slate-200 px-1 rounded text-xs font-mono">SPEED * delta</code>
              将"每秒 300 像素"转换为"这一帧移动多少像素"，确保不同帧率下移动速度一致。≈ <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">x += direction * SPEED * (currentTime - lastTime) / 1000</code>。
            </p>
          </div>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>设置输入映射（Input
          Map）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">代码里用了 <code
            class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">move_left</code> 和 <code
            class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">move_right</code>，但还没有定义它们。Project
          → Project Settings → <strong>Input Map</strong> 标签：</p>
        <ol class="list-decimal list-inside space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>输入 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">move_left</code> → 点 + → 选择
            <strong>A 键</strong> 和 <strong>左箭头</strong></li>
          <li>输入 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">move_right</code> → 点 + → 选择
            <strong>D 键</strong> 和 <strong>右箭头</strong></li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 类比：</strong>Input Map ≈ 定义 <code
              class="bg-purple-100 px-1 rounded text-xs font-mono">keybindings.json</code>。把物理按键（A/D/←/→）映射到逻辑动作（move_left/move_right）。≈
            在游戏引擎里做了一层键盘事件的抽象——类似前端的 design token/抽象层。</p>
        </aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">6</span>设置主场景并运行
        </h2>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600">Project → Project Settings → General → Application → Run → <strong>Main
                Scene</strong> → 选择 <code
                class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">main.tscn</code>。</div>
          </li>
          <li class="flex gap-3"><span
              class="shrink-0 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600">按 <strong>F5</strong> 运行！你应该看到一个白色方块，按 A/D 或 ←/→ 可以左右移动。</div>
          </li>
        </ol>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 恭喜！</strong>你完成了第一个 Godot 项目。下面总结一下你学到了什么，以及和前端开发的对应关系。</p>
        </aside>
      </section>

      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>你学到了什么
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Godot 概念</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">前端/TS 对应</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">你做了什么</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">场景（Scene）</td>
                <td class="px-4 py-2 border border-slate-200">React/Vue 组件</td>
                <td class="px-4 py-2 border border-slate-200">创建了 Main 场景（Node2D 根）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">节点（Node）</td>
                <td class="px-4 py-2 border border-slate-200">DOM 元素</td>
                <td class="px-4 py-2 border border-slate-200">添加了 Sprite2D 子节点</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">GDScript</td>
                <td class="px-4 py-2 border border-slate-200">TS/Python 混合风格</td>
                <td class="px-4 py-2 border border-slate-200">写了 main.gd 脚本</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">extends</td>
                <td class="px-4 py-2 border border-slate-200">class X extends Y / class X(Y)</td>
                <td class="px-4 py-2 border border-slate-200">继承 Node2D</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">@onready var</td>
                <td class="px-4 py-2 border border-slate-200">useRef / $refs / querySelector</td>
                <td class="px-4 py-2 border border-slate-200">引用 Sprite2D 节点</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">_process(delta)</td>
                <td class="px-4 py-2 border border-slate-200">requestAnimationFrame</td>
                <td class="px-4 py-2 border border-slate-200">每帧移动精灵</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">Input Map</td>
                <td class="px-4 py-2 border border-slate-200">keybindings 配置文件</td>
                <td class="px-4 py-2 border border-slate-200">绑定 A/D/←/→ 到 move</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">F5</td>
                <td class="px-4 py-2 border border-slate-200">npm run dev</td>
                <td class="px-4 py-2 border border-slate-200">运行游戏</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>下一步：打开 blitz 实战</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">读完本文档后，直接用 Godot 打开 <strong>同一个仓库里的</strong> <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/project.godot</code>。它把本文档的概念扩展为完整游戏：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>player.tscn</strong> — CharacterBody2D + 碰撞形状 + 受击框 + 格挡检测区，编辑器可见</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>player.gd</strong> — 从本文档的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_process</code> + Sprite2D 升级到重力/跳跃/冲刺/射击/状态机</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>main.gd</strong> — 看 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_setup_input_map()</code> 怎么用代码注册按键，替代本文档的手动 Input Map 配置</span></li>
        </ul>
        <p class="text-slate-600 leading-relaxed"><strong>学习方法：</strong>不要读完整文件。挑一个知识点——比如重力——找到 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">player.gd</code> 里的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">gravity</code> 变量，改值（调到 200 感受"月球重力"，调到 3000 感受"黑洞"），按 F5 看效果。理解一个再下一个。每个脚本顶部都标注了对应的学习文档，可以对照看。</p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-4-project-structure"
          class="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">← 上一节：项目结构与文件管理
        </RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-6-vs-unity-unreal"
          class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">下一节：Godot vs
          Unity vs Unreal →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{ id: "sec-1", name: "目标" }, { id: "sec-2", name: "创建项目" }, { id: "sec-3", name: "创建场景" }, { id: "sec-4", name: "添加精灵" }, { id: "sec-5", name: "写脚本" }, { id: "sec-6", name: "输入映射" }, { id: "sec-7", name: "设置主场景并运行" }, { id: "sec-8", name: "小结" }]
const mainGdCode = `extends Node2D

## 移动速度（像素/秒）
const SPEED: float = 300.0

## 精灵引用（@onready ≈ _ready 时赋值，类似 TS 的 lazy init）
@onready var sprite: Sprite2D = $Sprite2D

## 每帧调用。delta = 距上一帧的秒数（60fps ≈ 0.0167s）
func _process(delta: float) -> void:
    # 获取输入方向：-1.0（左）、0.0（无输入）、1.0（右）
    var direction: float = Input.get_axis("move_left", "move_right")

    # 帧无关移动：方向 × 速度 × delta
    # 相当于 TS 的: x += direction * SPEED * delta
    sprite.position.x += direction * SPEED * delta`
	const phase1Code = `extends CharacterBody2D
	## Phase 1 — 蓝色圆点在平台上左右移动
	const SPEED: float = 300.0
	var gravity: float = 980.0

	func _physics_process(delta: float) -> void:
	    # 1. 重力 — 不在平台上就往下掉
	    if not is_on_floor():
	        velocity.y += gravity * delta

	    # 2. 水平输入: Input.get_axis 返回 -1(左) 0(不动) 1(右)
	    var direction: float = Input.get_axis("move_left", "move_right")
	    velocity.x = direction * SPEED

	    # 3. 移动 + 碰撞检测 (碰到平台自动停)
	    move_and_slide()

	    # 4. 重绘蓝色圆点外观
	    queue_redraw()

	func _draw() -> void:
	    # 蓝色主体 + 白色轮廓 + 高光
	    draw_circle(Vector2.ZERO, 24, Color(0.2, 0.55, 0.95))
	    draw_arc(Vector2.ZERO, 24, 0, 2*PI, 32, Color.WHITE, 2.0)
	    draw_circle(Vector2(-6, -8), 8, Color(1, 1, 1, 0.3))`
</script>
