<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">静态类型注解</h1>
          <p class="text-sm text-slate-500 mt-1">Type Hints——GDScript 的 TypeScript 模式</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-11</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么写类型？</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">let x: number = 1</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">x: int = 1</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">var x: int = 1</code><br/>GDScript 的类型系统和 Python 的类型注解理念一致——<strong>可选、渐进、编译时检查</strong>。和 TS 的 strict mode 一样，类型越多越好。</p>
        </aside>
        <p class="text-slate-600 mb-3 leading-relaxed">类型注解的收益：<strong>IDE 自动补全（最重要的）、编译时错误捕获（保存时标红）、运行性能提升（省去类型推断开销）。</strong></p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 本文档约定：所有示例都写类型注解。</strong>和 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">tsconfig strict: true</code> 同理——多写几个字符，换补全 + 检查 + 性能。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>类型注解速查</h2>
        <div class="mb-4"><Code language="gdscript" :code="typingCode" title="type_hints.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>类型化不止变量——信号、回调、类</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">类型注解能用在所有「有数据流动」的地方：信号参数、lambda 回调、自定义类引用。类型标注得越全，错误越早被发现。</p>
        <div class="mb-4"><Code language="gdscript" :code="typeSignalCode" title="typed_signal_class.gd" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 类比：</strong>给信号参数标类型 ≈ TS 里 <code class="bg-purple-100 px-1 rounded text-xs font-mono">EventEmitter&lt;{'health': number}&gt;</code> 的类型泛型；给 <code class="bg-purple-100 px-1 rounded text-xs font-mono">class_name</code> 引用标类型 ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">import type</code> 后的静态检查。<strong>类型就是活文档。</strong></p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>类型推断</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">GDScript 支持类型推断——如果变量声明时直接赋值了明确类型的值，可以省略类型标注。但<strong>推荐仍然写标注</strong>——显式优于隐式。</p>
        <div class="mb-4"><Code language="gdscript" :code="inferenceCode" title="type_inference.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">:=</code> 推断只对<strong>字面量直接赋值</strong>可靠。如果赋的是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">get_node("X")</code> 这类返回值，推断出来是 Node/Variant，补全就没用了——<strong>节点引用请显式标注类型</strong>。</p>
        </aside>
      </section>

      <section id="sec-blitz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 项目的全文件强类型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的每个脚本都坚持强类型——<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">@export</code> 属性、<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">@onready</code> 节点、函数签名全部标注。打开 player.gd / enemy.gd 对照看：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzTypingCode" title="Blitz 强类型片段（精简）" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 实战收益：</strong>在 Godot 编辑器里点 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">parry_detector.</code> 会弹出 Area2D 的全部方法/属性；把参数误传成 String 保存时就标红——<strong>强类型让 25KB 的主场景脚本改起来也不慌。</strong></p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-lg p-3"><strong>1. 数组/字典不标元素类型 → 取出来全是 Variant：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">var items: Array = []</code> 里混入 int 和 String 都不会报错，<code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">items[i].hp</code> 拿不到补全。<strong>用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Array[int]</code> / <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Array[Node2D]</code> 约束。</strong></div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>2. 返回值类型与声明不符 → 保存时标红：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">func find() -&gt; Node2D:</code> 却 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">return null</code> 是合法的（null 兼容），但 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">return "not found"</code> 编译直接报错。返回值类型是<strong>函数的契约</strong>。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>3. 信号参数类型不匹配 → 运行时警告：</strong>信号 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">signal s(v: int)</code>，回调写 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">func _on_s(v: String)</code>，连接时不会报错但发射时会<strong>类型转换告警</strong>。参数类型要保持一致。</div>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>类型注解 = <strong>IDE 补全 + 编译检查 + 性能提升</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>支持推断（<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">:=</code>），但<strong>显式标注更安全</strong>（和 TS strict 一样）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>内置类型用大写（int/float/String），数组用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Array[T]</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>信号参数、lambda、<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">class_name</code> 引用都能标类型</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>节点引用显式标注，<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">:=</code> 推断会退化成 Variant</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-10-setget-properties" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：属性 getter/setter</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-12-null-safety" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：null 安全 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "为什么写类型" },
  { id: "sec-2", name: "类型速查" },
  { id: "sec-3", name: "信号/回调/类" },
  { id: "sec-4", name: "类型推断" },
  { id: "sec-blitz", name: "🕹️ Blitz实战" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-6", name: "小结" },
]

const typingCode = `# 变量类型
var score: int = 0
var name: String = "Hero"
var speed: float = 300.0
var alive: bool = true
var dir: Vector2 = Vector2.ZERO
var col: Color = Color.WHITE

# 集合类型
var scores: Array[int] = [1, 2, 3]
var map: Dictionary = {"key": "value"}

# 函数签名
func add(a: int, b: int) -> int:
    return a + b
func log(msg: String) -> void:
    print(msg)

# 节点引用（类型标注后 IDE 自动补全！）
@onready var sprite: Sprite2D = $Sprite2D
sprite.position.x += 10  # ← IDE 知道 position 是 Vector2`

const typeSignalCode = `# 类型化的信号 —— 参数也标类型，连接时自动检查
signal health_changed(new_health: int)
signal on_win(player_name: String)

# 类型化的回调（lambda 也可以标）
health_changed.connect(func(new_health: int) -> void:
    print("HP: ", new_health))

# 自定义类作类型
class_name Player extends CharacterBody2D
var target: Player = null   # ← 引用其他自定义类，补全全部属性

# 参数为「某种节点」+ 鸭子类型
func damage(target: Node2D) -> void:
    if target.has_method("take_damage"):
        target.take_damage(10)`

const inferenceCode = `# 类型推断——可以省略，但不推荐
var x := 10            # 推断为 int
var name := "Hero"     # 推断为 String
# 推荐写法（显式）
var x: int = 10
var name: String = "Hero"

# ⚠️ 推断的坑：get_node 返回 Node，推断后丢失子类补全
# var sprite := $Sprite2D          # 推断为 Node，补全变少
# var sprite: Sprite2D = $Sprite2D # ✅ 显式标注，补全完整`

const blitzTypingCode = `# === player.gd — 全文件强类型 ===
@export var move_speed: float = 320.0
@export var jump_velocity: float = -520.0
@export var max_health: int = 3
enum State { NORMAL, ATTACKING, DASHING, HIT, DEAD }
var state: State = State.NORMAL

@onready var parry_detector: Area2D = $ParryDetector
@onready var hurtbox: Area2D = $Hurtbox

func _physics_process(delta: float) -> void:
    var input_dir: float = Input.get_axis("move_left", "move_right")
    velocity.x = move_toward(velocity.x, input_dir * move_speed, move_accel * delta)
    move_and_slide()

# === enemy.gd — 返回值类型 + 鸭子类型 ===
func _get_player() -> Node2D:
    var root: Node = get_tree().current_scene
    if root and root.has_method("get_player"):
        return root.get_player()
    return null`
</script>
