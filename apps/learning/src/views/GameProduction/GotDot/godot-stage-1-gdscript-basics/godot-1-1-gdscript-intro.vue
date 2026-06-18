<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">GDScript 简介与设计哲学</h1>
          <p class="text-sm text-slate-500 mt-1">为什么 Godot 有自己的语言——Python 风格、引擎深度集成、为游戏而生</p>
        </div>
        <div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段
            1-1</span></div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📝</span>概述
        </h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 一句话定位：</strong>GDScript ≈ <strong>Python 的缩进语法 + TypeScript
              的类型注解 + Godot 的原生 API</strong>。它是一门专为游戏开发的<strong>领域特定语言（DSL）</strong>——就像 JSX 是 React 的 DSL、GraphQL
            是数据查询的 DSL。它不追求通用，追求<strong>在 Godot 中写游戏逻辑的最高效率</strong>。</p>
        </aside>
        <p class="text-slate-600 leading-relaxed">GDScript 是 Godot 的<strong>一等公民</strong>脚本语言。它和引擎共享同一个进程、同一个内存空间——调用
          <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">move_and_slide()</code>
          不需要跨语言 FFI、不需要序列化。这就是它比 C# 脚本快（调用开销小）的原因。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么
          Godot 创造了自己的语言？</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Godot 团队（Juan Linietsky 等人）最初尝试过
          <strong>Lua、Python、Squirrel</strong> 作为脚本语言，但都有问题：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">候选语言</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">问题</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">Lua</td>
                <td class="px-4 py-2 border border-slate-200">数组从 1 开始（游戏坐标通常从 0 开始）、没有类、生态小</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">Python</td>
                <td class="px-4 py-2 border border-slate-200">慢（CPython）、GIL 阻碍多线程、嵌入 C++ 复杂、内存占用大</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">Squirrel</td>
                <td class="px-4 py-2 border border-slate-200">小众、社区几乎为零、文档稀缺</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">C#</td>
                <td class="px-4 py-2 border border-slate-200">跨语言调用开销大、Mono/.NET 运行时体积大、不适合轻量脚本</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed">最终决定<strong>自己造一个</strong>——用 Python 的缩进语法（开发者喜欢），去掉 Python
          的全局解释器锁和内存开销，<strong>为游戏引擎量身定制</strong>。结果就是 GDScript：语法学 Python、运行时像 Lua（轻量 VM）、API 是 Godot 原生的。</p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>GDScript 不是"弱化版 Python"——它是"为 Godot
            场景树优化的专用语言"。<code class="bg-blue-100 px-1 rounded text-xs font-mono">$Sprite2D</code> 这个语法糖在 Python
            中不可能实现——需要在语言层面支持。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>一个
          GDScript 文件长什么样？</h2>
        <div class="mb-4"><Code language="gdscript" :code="firstScriptCode" title="player.gd（典型 GDScript 文件）" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">逐元素解释</h3>
        <div class="space-y-3 text-slate-600 text-sm leading-relaxed">
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">extends CharacterBody2D</code> —
              <strong>必须第一行。</strong>告诉 Godot "这个脚本附加到 CharacterBody2D 类型的节点上"。≈ TS 的 <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">class Player extends CharacterBody2D {"{}"}</code>。决定了你能用哪些方法和属性（如
              <code class="bg-slate-200 px-1 rounded text-xs font-mono">velocity</code>、<code
                class="bg-slate-200 px-1 rounded text-xs font-mono">move_and_slide()</code>）。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">## 注释</code> — 双 <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">##</code> 开头是<strong>文档注释</strong>（类似
              JSDoc/TSDoc），编辑器会显示在提示中。单 <code class="bg-slate-200 px-1 rounded text-xs font-mono">#</code> 是普通注释。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code
                class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">@export var speed: float = 300.0</code>
              — <strong>导出变量到编辑器</strong>。Inspector 面板会出现一个可编辑的 speed 字段。≈ Vue 的 <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">defineProps&lt;{"{"}speed: number{"}"}&gt;()</code>。
            </p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code
                class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">@onready var sprite: Sprite2D = $Sprite2D</code>
              — <strong>延迟初始化的节点引用</strong>。在 <code class="bg-slate-200 px-1 rounded text-xs font-mono">_ready()</code>
              之前赋值。声明类型 <code class="bg-slate-200 px-1 rounded text-xs font-mono">: Sprite2D</code> 后，IDE
              自动补全该节点的所有属性和方法。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">func _ready() -> void:</code> —
              <strong>生命周期回调</strong>。节点及其子节点都加入场景树后调用。≈ React 的 <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">useEffect(() => {"{}"}, [])</code> / Vue 的 <code
                class="bg-slate-200 px-1 rounded text-xs font-mono">onMounted()</code>。</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p><code
                class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">func _physics_process(delta: float) -> void:</code>
              — <strong>每物理帧调用</strong>（固定 60Hz）。物理相关代码放这里。<code
                class="bg-slate-200 px-1 rounded text-xs font-mono">delta</code> 是固定值 1/60 ≈ 0.0167 秒。</p>
          </div>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>语法速览：TS
          vs Python vs GDScript</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">你同时熟悉 TypeScript 和 Python。以下对照表覆盖日常开发 80% 的语法：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">概念</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">TypeScript</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Python</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">GDScript</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 font-mono text-xs">
              <tr>
                <td class="px-4 py-2 border border-slate-200">变量声明</td>
                <td class="px-4 py-2 border border-slate-200">let x: number = 1</td>
                <td class="px-4 py-2 border border-slate-200">x: int = 1</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">var x: int = 1</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">常量</td>
                <td class="px-4 py-2 border border-slate-200">const PI = 3.14</td>
                <td class="px-4 py-2 border border-slate-200">PI: float = 3.14</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">const PI: float = 3.14</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">函数</td>
                <td class="px-4 py-2 border border-slate-200">function f(x: number): void {"{}"}</td>
                <td class="px-4 py-2 border border-slate-200">def f(x: int) -> None:</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">func f(x: int) -> void:</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">条件</td>
                <td class="px-4 py-2 border border-slate-200">if (x > 0) {"{}"} else {"{}"}</td>
                <td class="px-4 py-2 border border-slate-200">if x > 0:\n ...\nelse:</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">if x > 0:\n ...\nelse:</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">for 循环</td>
                <td class="px-4 py-2 border border-slate-200">for (const v of arr) {"{}"}</td>
                <td class="px-4 py-2 border border-slate-200">for v in arr:</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">for v in arr:</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">数组</td>
                <td class="px-4 py-2 border border-slate-200">const a: number[] = [1,2]</td>
                <td class="px-4 py-2 border border-slate-200">a: list[int] = [1,2]</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">var a: Array[int] = [1,2]</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">字典</td>
                <td class="px-4 py-2 border border-slate-200">const o: Record&lt;string,int&gt; = {"{}"}</td>
                <td class="px-4 py-2 border border-slate-200">d: dict[str,int] = {"{}"}</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">var d: Dictionary = {"{}"}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">类</td>
                <td class="px-4 py-2 border border-slate-200">class A extends B {"{}"}</td>
                <td class="px-4 py-2 border border-slate-200">class A(B):</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">class A extends B:</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">null</td>
                <td class="px-4 py-2 border border-slate-200">null / undefined</td>
                <td class="px-4 py-2 border border-slate-200">None</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">null</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">布尔</td>
                <td class="px-4 py-2 border border-slate-200">true / false</td>
                <td class="px-4 py-2 border border-slate-200">True / False</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">true / false</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">字符串拼接</td>
                <td class="px-4 py-2 border border-slate-200">`Hello ${"{"}name{"}"}`</td>
                <td class="px-4 py-2 border border-slate-200">f"Hello {"{"}name{"}"}"</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">"Hello %s" % name</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">逻辑运算</td>
                <td class="px-4 py-2 border border-slate-200">&& || !</td>
                <td class="px-4 py-2 border border-slate-200">and or not</td>
                <td class="px-4 py-2 border border-slate-200 text-blue-700">and or not</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>核心设计原则
        </h2>
        <ul class="space-y-4 text-slate-600">
          <li class="flex items-start gap-3"><span class="text-blue-500 font-bold text-lg mt-0.5">1</span>
            <div><strong class="text-slate-700">隐式类型 + 可选标注</strong>
              <p class="text-sm mt-1">变量默认是动态类型（<code
                  class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">var x = 1</code>），但你<strong>应该</strong>写类型标注（<code
                  class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">var x: int = 1</code>）。好处：编辑器自动补全、编译期错误检查、性能提升（避免运行时类型推断）。
              </p>
            </div>
          </li>
          <li class="flex items-start gap-3"><span class="text-blue-500 font-bold text-lg mt-0.5">2</span>
            <div><strong class="text-slate-700">Python 缩进、C 系命名</strong>
              <p class="text-sm mt-1">缩进定义代码块（和 Python 一样），但命名风格是 <strong>snake_case</strong>（和 C 系一样：<code
                  class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">func get_player_name()</code>）。布尔值小写（<code
                  class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">true/false</code>），null 小写。</p>
            </div>
          </li>
          <li class="flex items-start gap-3"><span class="text-blue-500 font-bold text-lg mt-0.5">3</span>
            <div><strong class="text-slate-700">引擎深度集成</strong>
              <p class="text-sm mt-1">GDScript 不是"嵌入的 Python 解释器"——它是 Godot 引擎的一部分。调用 <code
                  class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">move_and_slide()</code> 直接进 C++
                引擎层，没有中间层。这就是 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">$</code> 语法糖能直接查
                SceneTree 的原因——语言 VM 和引擎共享内存。</p>
            </div>
          </li>
          <li class="flex items-start gap-3"><span class="text-blue-500 font-bold text-lg mt-0.5">4</span>
            <div><strong class="text-slate-700">游戏优先的设计</strong>
              <p class="text-sm mt-1">内置 <code
                  class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Vector2</code>、<code
                  class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Color</code>、<code
                  class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Transform2D</code> 等数学类型，不需要
                import。信号（Signal）是语言关键字。协程（await）是语言特性而非库。≈ 就像 JSX 是 React 的 DSL——GDScript 是 Godot 的 DSL。</p>
            </div>
          </li>
        </ul>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>强类型 vs
          动态类型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>本文档所有代码示例使用强类型写法。</strong>这是最佳实践：</p>
        <div class="mb-4"><Code language="gdscript" :code="typedVsDynamicCode" title="typed_vs_dynamic.gd" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">动态（无标注）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">强类型（有标注）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200">IDE 补全</td>
                <td class="px-4 py-2 border border-slate-200">❌ 不知道类型</td>
                <td class="px-4 py-2 border border-slate-200"><span class="text-emerald-600">✅</span> 完整补全</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">编译检查</td>
                <td class="px-4 py-2 border border-slate-200">❌ 运行时才报错</td>
                <td class="px-4 py-2 border border-slate-200"><span class="text-emerald-600">✅</span> 保存时检查</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">运行性能</td>
                <td class="px-4 py-2 border border-slate-200">需要类型推断</td>
                <td class="px-4 py-2 border border-slate-200"><span class="text-emerald-600">✅</span> 直接执行（快 2-3x）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">可读性</td>
                <td class="px-4 py-2 border border-slate-200">弱</td>
                <td class="px-4 py-2 border border-slate-200"><span class="text-emerald-600">✅</span> 强——一眼看出类型</td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 类比：</strong>这和 TypeScript 的 <code
              class="bg-emerald-100 px-1 rounded text-xs font-mono">strict: true</code> 哲学一致——多写几个字符的类型标注，换来的是 IDE
            自动补全、编译期错误检查和更好的代码文档。</p>
        </aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>GDScript = <strong>Python 缩进
                + TS 类型注解 + Godot 原生 API</strong> 的专用语言</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code
                class="bg-slate-100 px-1 rounded text-blue-700 text-xs">extends</code> 是第一行——告诉引擎这个脚本附加到什么节点上</span>
          </li>
          <li class="flex items-start gap-2"><span
              class="text-blue-500 mt-1">▸</span><span><strong>始终写类型注解</strong>（<code
                class="bg-slate-100 px-1 rounded text-blue-700 text-xs">: int</code>、<code
                class="bg-slate-100 px-1 rounded text-blue-700 text-xs">-> void</code>）——和 TS strict 一个道理</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>和 Python 最大的不同：<code
                class="bg-slate-100 px-1 rounded text-blue-700 text-xs">true/false</code> 小写、<code
                class="bg-slate-100 px-1 rounded text-blue-700 text-xs">null</code> 不是 None、<code
                class="bg-slate-100 px-1 rounded text-blue-700 text-xs">func</code> 不是 def</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-6-vs-unity-unreal"
          class="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">← 上一节：Godot vs Unity vs
          Unreal</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-2-variables-types"
          class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">下一节：变量、常量与数据类型
          →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{ id: "sec-1", name: "概述" }, { id: "sec-2", name: "为什么自创语言" }, { id: "sec-3", name: "文件结构" }, { id: "sec-4", name: "语法速览" }, { id: "sec-5", name: "设计原则" }, { id: "sec-6", name: "强类型 vs 动态" }, { id: "sec-7", name: "小结" }]
const firstScriptCode = `extends CharacterBody2D
## 玩家角色脚本——处理移动和动画
class_name Player

# ===== 导出属性（编辑器可调） =====
@export var speed: float = 300.0
@export var jump_velocity: float = -400.0

# ===== 节点引用 =====
@onready var sprite: Sprite2D = $Sprite2D
@onready var anim_player: AnimationPlayer = $AnimationPlayer

# ===== 生命周期 =====
func _ready() -> void:
    pass  # 节点就绪后执行的初始化

func _physics_process(delta: float) -> void:
    # 每物理帧执行（固定 60Hz）
    velocity.y += get_gravity() * delta
    move_and_slide()`

const typedVsDynamicCode = `# ❌ 动态类型：编辑器不知道 x 是什么
var x = 10
x = "hello"     # 运行时才出错——但不报错，因为动态类型允许改变类型

# ✅ 强类型：编辑器知道 x 是 int
var x: int = 10
# x = "hello"   # ← 保存时编辑器就标红了

# ✅ 函数返回值标注
func add(a: int, b: int) -> int:
    return a + b     # 返回非 int 会标红

# ✅ 数组类型标注
var scores: Array[int] = [100, 200, 300]
# scores.append("bad")    # ← 编译器阻止`

const filesList: string[] = []
</script>
