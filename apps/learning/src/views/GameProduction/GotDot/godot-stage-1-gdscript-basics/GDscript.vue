<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">GDScript 语言概览</h1>
          <p class="text-sm text-slate-500 mt-1">Godot 的专属脚本语言——Python 风格、引擎深度集成、为游戏而生</p>
        </div>
        <div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段
            1</span></div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎮</span>什么是
          GDScript</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 一句话定位：</strong>GDScript ≈ <strong>Python 的缩进语法 + TypeScript
              的类型注解 + Godot 的原生 API</strong>。它是一门<strong>领域特定语言（DSL）</strong>——就像 JSX 是 React 的 DSL。不追求通用，追求<strong>在
              Godot 中写游戏逻辑的最高效率</strong>。</p>
        </aside>
        <pre class="code-block"><code>{{ quickExample }}</code></pre>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么
          Godot 创建了自己的语言</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Godot 团队最初尝试过 Lua、Python、Squirrel
          作为脚本语言，但都有问题。最终决定<strong>自己造一个</strong>——用 Python 的缩进语法，去掉全局解释器锁和内存开销，为游戏引擎量身定制。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border font-semibold text-slate-700">候选</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">被否决的原因</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border font-mono text-xs">Lua</td>
                <td class="px-4 py-2 border">数组从 1 开始、没有类、生态小</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-xs">Python</td>
                <td class="px-4 py-2 border">CPython 慢、GIL、嵌入 C++ 复杂、内存占用大</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-xs">Squirrel</td>
                <td class="px-4 py-2 border">小众、文档稀缺</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-xs">C#</td>
                <td class="px-4 py-2 border">跨语言调用开销大、Mono/.NET 运行时体积大</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>TS /
          Python / GDScript 三语对照</h2>
        <div class="overflow-x-auto mb-4">    
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border font-semibold text-slate-700">概念</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">TypeScript</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">Python</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">GDScript</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 font-mono text-xs">
              <tr>
                <td class="px-4 py-2 border">变量</td>
                <td class="px-4 py-2 border">let x: number = 1</td>
                <td class="px-4 py-2 border">x: int = 1</td>
                <td class="px-4 py-2 border text-blue-700">var x: int = 1</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">常量</td>
                <td class="px-4 py-2 border">const PI = 3.14</td>
                <td class="px-4 py-2 border">PI: Final[float]</td>
                <td class="px-4 py-2 border text-blue-700">const PI: float = 3.14</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">函数</td>
                <td class="px-4 py-2 border">function f(x: number): void</td>
                <td class="px-4 py-2 border">def f(x: int) -> None:</td>
                <td class="px-4 py-2 border text-blue-700">func f(x: int) -> void:</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">类</td>
                <td class="px-4 py-2 border">class A extends B</td>
                <td class="px-4 py-2 border">class A(B):</td>
                <td class="px-4 py-2 border text-blue-700">class A extends B:</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">循环</td>
                <td class="px-4 py-2 border">for (const v of arr)</td>
                <td class="px-4 py-2 border">for v in arr:</td>
                <td class="px-4 py-2 border text-blue-700">for v: int in arr:</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">数组</td>
                <td class="px-4 py-2 border">const a: number[] = [1,2]</td>
                <td class="px-4 py-2 border">a: list[int] = [1,2]</td>
                <td class="px-4 py-2 border text-blue-700">var a: Array[int] = [1,2]</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">字典</td>
                <td class="px-4 py-2 border">Record&lt;S,n&gt;</td>
                <td class="px-4 py-2 border">dict[str,int]</td>
                <td class="px-4 py-2 border text-blue-700">var d: Dictionary = {}</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">null</td>
                <td class="px-4 py-2 border">null / undefined</td>
                <td class="px-4 py-2 border">None</td>
                <td class="px-4 py-2 border text-blue-700">null（小写）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">布尔</td>
                <td class="px-4 py-2 border">true / false</td>
                <td class="px-4 py-2 border">True / False</td>
                <td class="px-4 py-2 border text-blue-700">true / false（小写！）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">逻辑</td>
                <td class="px-4 py-2 border">&amp;&amp; || !</td>
                <td class="px-4 py-2 border">and or not</td>
                <td class="px-4 py-2 border text-blue-700">and or not</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">Lambda</td>
                <td class="px-4 py-2 border">(x) =&gt; x * 2</td>
                <td class="px-4 py-2 border">lambda x: x * 2</td>
                <td class="px-4 py-2 border text-blue-700">func(x): return x * 2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>核心语法亮点
        </h2>
        <h3 class="text-base font-semibold text-slate-700 mb-3">信号系统（Signal）</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">Godot 的信号是<strong>语言级特性</strong>。≈ Vue 的 emit +
          EventEmitter 的合体，但类型安全、编辑器可视化。</p>
        <pre class="code-block"><code>{{ signalExample }}</code></pre>

        <h3 class="text-base font-semibold text-slate-700 mb-3 mt-5">$ 节点引用</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed"><code
            class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">$Sprite2D</code> ≈ <code
            class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">document.querySelector('#Sprite2D')</code>——直接返回强类型节点，IDE
          自动补全所有属性。</p>
        <pre class="code-block"><code>{{ dollarExample }}</code></pre>

        <h3 class="text-base font-semibold text-slate-700 mb-3 mt-5">@export — Inspector 可编辑属性</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">≈ Vue 的 <code
            class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">defineProps</code>——在编辑器中直接调参，不用改代码。</p>
        <pre class="code-block"><code>{{ exportExample }}</code></pre>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>强类型 vs
          动态类型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>本文档所有示例使用强类型写法。</strong>和 TypeScript 的 strict mode
          一样——多写几个字符的类型标注，换 IDE 补全 + 编译检查 + 性能提升。</p>
        <pre class="code-block"><code>{{ typedVsDynamic }}</code></pre>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">动态类型</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">强类型</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border">IDE 补全</td>
                <td class="px-4 py-2 border">❌ 无</td>
                <td class="px-4 py-2 border text-emerald-600">✅ 完整</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">编译检查</td>
                <td class="px-4 py-2 border">❌ 运行时</td>
                <td class="px-4 py-2 border text-emerald-600">✅ 保存时</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border">性能</td>
                <td class="px-4 py-2 border">需类型推断</td>
                <td class="px-4 py-2 border text-emerald-600">直接执行</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>适合独立游戏开发的理由
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200" v-for="r in reasons" :key="r.title">
            <h3 class="font-semibold text-slate-700 mb-1">{{ r.icon }} {{ r.title }}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{{ r.desc }}</p>
          </div>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>学习路径
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed">本阶段包含 14 篇文档，从变量声明到内置数学类型，覆盖 GDScript
          全部核心语法。建议<strong>顺序学习</strong>，每篇 15-30 分钟，配合 Godot 编辑器动手实践。</p>
        <ul class="space-y-1 text-slate-600 text-sm">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>
              <Link route="godot-1-1-gdscript-intro" text="GDScript 简介与设计哲学" />
            </span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>
              <Link route="godot-1-2-variables-types" text="变量、常量与数据类型" />
            </span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>
              <Link route="godot-1-3-operators" text="运算符与表达式" />
            </span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>
              <Link route="godot-1-4-arrays-dicts" text="数组与字典" /> ·
              <Link route="godot-1-5-control-flow" text="控制流" /> ·
              <Link route="godot-1-6-functions" text="函数" />
            </span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>
              <Link route="godot-1-7-classes-oop" text="类与面向对象" /> ·
              <Link route="godot-1-8-signals-basics" text="信号基础" />
            </span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>枚举、setget、静态类型、null
              安全、字符串格式化、<strong>内置数学类型</strong></span></li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Nav, Link } from 'components'

const navList = [
  { id: "sec-1", name: "什么是 GDScript" },
  { id: "sec-2", name: "为什么自创语言" },
  { id: "sec-3", name: "三语对照表" },
  { id: "sec-4", name: "核心语法亮点" },
  { id: "sec-5", name: "强类型 vs 动态" },
  { id: "sec-6", name: "独立开发优势" },
  { id: "sec-7", name: "学习路径" },
]

const reasons = [
  { icon: '⚡', title: '零编译时间', desc: '修改代码即刻在编辑器中看到效果，无需等待编译链接。极速迭代是独立开发的最大利器。' },
  { icon: '🧩', title: '深度引擎集成', desc: '与 Godot 的场景树、信号系统、动画节点完美融合，所有 API 都触手可及。' },
  { icon: '📖', title: '语法平易近人', desc: 'Python 风格缩进语法。TypeScript 开发者几乎零学习成本。' },
  { icon: '🎯', title: '游戏专用类型', desc: '内置 Vector2、Color、Transform2D 等游戏类型。物理帧回调、输入处理都开箱即用。' },
  { icon: '🌍', title: '跨平台一键导出', desc: '配合 Godot 引擎，一份代码即可导出到 Windows、macOS、Linux、Android、iOS 及 Web。' },
  { icon: '💰', title: '完全免费无抽成', desc: 'MIT 开源协议。没有授权费，没有收入抽成。你赚的每一分钱都归你自己。' },
]

const quickExample = `extends CharacterBody2D
## 玩家角色——5 行代码实现四方向移动
@export var speed: float = 400.0

func _physics_process(delta: float) -> void:
    var dir: Vector2 = Input.get_vector("left", "right", "up", "down")
    velocity = dir * speed
    move_and_slide()`

const signalExample = `# 声明信号
signal health_changed(new_hp: int)
# 发射
health_changed.emit(80)
# 连接（≈ addEventListener）
player.health_changed.connect(_update_hp_bar)`

const dollarExample = `@onready var sprite: Sprite2D = $Sprite2D
@onready var anim: AnimationPlayer = $AnimationPlayer
# sprite.position.x += 10  # ← IDE 自动补全所有属性`

const exportExample = `@export var jump_force: float = -600.0
@export var max_jumps: int = 2
# ↑ 在 Inspector 面板直接拖拽调整，不用改代码`

const typedVsDynamic = `# ❌ 动态类型——无补全、无检查
var x = 10

# ✅ 强类型——IDE 补全 + 编译检查 + 更快
var x: int = 10
func get_hp() -> int: return health`
</script>

<style scoped>
.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  white-space: pre;
}
</style>
