<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">函数</h1><p class="text-sm text-slate-500 mt-1">声明、参数、返回值、lambda——GDScript 的函数系统</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/bullet.gd" label="📝 bullet.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>函数声明</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">function foo(x: number): void {"{}"}</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">def foo(x: int) -> None:</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">func foo(x: int) -> void:</code><br/>GDScript = Python 的 def → func，类型标注风格像 TS。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="funcCode" title="functions.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>参数详解</h2>
        <div class="mb-4"><Code language="gdscript" :code="paramsCode" title="parameters.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Lambda / 匿名函数</h2>
        <div class="mb-4"><Code language="gdscript" :code="lambdaCode" title="lambda.gd" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">(x) => x * 2</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">lambda x: x * 2</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">func(x): return x * 2</code><br/><strong>GDScript 没有箭头函数</strong>——但匿名 func 的写法也很简洁。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>Callable 深入——函数是一等公民</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">GDScript 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Callable</code> 类型让函数可以像变量一样传递、存储、延迟调用。≈ TS 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Function</code> 类型。</p>
        <div class="mb-4"><Code language="gdscript" :code="callableCode" title="callable.gd" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>static 函数 + 回调实战</h2>
        <div class="mb-4"><Code language="gdscript" :code="staticCallbackCode" title="static_and_callbacks.gd" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">6</span>lambda 捕获变量的坑</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">和 JS 的闭包一样——lambda 捕获的是<strong>引用</strong>，不是值。在循环中创建 lambda 时需要特别注意。</p>
        <div class="mb-4"><Code language="gdscript" :code="lambdaTrapCode" title="lambda_trap.gd" /></div>
      </section>

      <!-- 🕹️ 实战：Blitz -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的函数与回调</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的子弹命中、敌人受击、延迟销毁全靠函数 + Callable 回调组织：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzFunctionsCode" title="bullet.gd / enemy.gd / main.gd（精简）" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">body.has_method("take_damage")</code> + 调用 ≈ TS 里的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">if ("take_damage" in body)</code> 结构判断；<br/><code class="bg-purple-100 px-1 rounded text-xs font-mono">timer.timeout.connect(fx.queue_free)</code> ≈ TS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">setTimeout(() =&gt; fx.remove(), 1000)</code>，但传的是函数引用（一等公民）。</p></aside>
      </section>

      <!-- ⚠️ 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="mb-4"><Code language="gdscript" :code="functionPitfallsCode" title="function_pitfalls.gd" /></div>
      </section>

      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">func name(params) -> ReturnType:</code>——和 Python 的 def 类似，但用 func</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>参数默认值、命名参数调用、可变参数（不推荐用无类型可变参数）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>没有箭头函数</strong>，匿名函数用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">func(x): return x * 2</code></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Callable 是一等公民</strong>——信号连接、定时器回调、<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">bind()</code> 预填参数全靠它</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>鸭子类型：<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">has_method()</code> 检查接口再调用，扩展新敌人不用改子弹代码</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-5-control-flow" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：控制流</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-7-classes-oop" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：类与面向对象 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"函数声明"},{id:"sec-2",name:"参数详解"},{id:"sec-3",name:"Lambda"},{id:"sec-4",name:"Callable"},{id:"sec-5",name:"static+回调"},{id:"sec-6",name:"lambda陷阱"},{id:"sec-7",name:"🕹️ 实战：Blitz"},{id:"sec-8",name:"⚠️ 常见错误"},{id:"sec-9",name:"小结"}]
const funcCode = `# === 基本函数（强类型）===
func add(a: int, b: int) -> int:
    return a + b

# === 无返回值 ===
func log(msg: String) -> void:
    print(msg)

# === 无参数 ===
func get_version() -> String:
    return "1.0.0"

# === 多返回值（实际返回 Vector2）===
func get_position() -> Vector2:
    return Vector2(100, 200)`
const paramsCode = `# === 默认参数值 ===
func greet(name: String = "Player") -> void:
    print("Hello, ", name)

# === 命名参数调用（推荐，提高可读性）===
func create_ui(text: String, size: int = 14, color: Color = Color.WHITE) -> void:
    pass
create_ui("OK", size = 24, color = Color.RED)  # 命名参数

# === 可变参数（不推荐用无类型版本）===
func sum_all(values: Array[int]) -> int:
    var total: int = 0
    for v in values: total += v
    return total`
const callableCode = `# Callable ——函数当变量存储
var actions: Array[Callable] = []
actions.append(func(): print("A"))
actions.append(func(): print("B"))
for cb: Callable in actions: cb.call()

# bind ——预填参数（≈ functools.partial / .bind()）
var logger: Callable = func(msg: String, level: int) -> void:
    print("[%d] %s" % [level, msg])
var err_log: Callable = logger.bind(2)  # 预填 level=2
err_log.call("error!")  # 输出: [2] error!

# unbind ——取消绑定个数
var original: Callable = err_log.unbind(1)
original.call("msg", 3)  # 输出: [3] msg`

const staticCallbackCode = `# static 函数 ——不需要实例
class_name MathUtils
static func clamp_val(v: float, lo: float, hi: float) -> float:
    return clampf(v, lo, hi)
# 调用：MathUtils.clamp_val(1.5, 0.0, 1.0) → 1.0

# 回调实战：定时器+动画完成回调
func delayed_call(delay: float, cb: Callable) -> void:
    var timer: SceneTreeTimer = get_tree().create_timer(delay)
    timer.timeout.connect(cb)

func _ready() -> void:
    delayed_call(1.0, func(): print("1秒后执行"))
    # 动画完成后隐藏
    var tween: Tween = create_tween()
    tween.tween_property(self, "modulate:a", 0.0, 0.5)
    tween.tween_callback(func(): hide())`

const lambdaTrapCode = `# ❌ 循环中创建 lambda 的经典坑（和 JS 一样！）
var buttons: Array[Button] = []
for i: int in 3:
    var btn := Button.new()
    btn.pressed.connect(func(): print(i))  # ← 捕获的是 i 的引用
    buttons.append(btn)
# 所有按钮都打印 2（最后一次的值）！

# ✅ 解法1：局部变量捕获当前值
for i: int in 3:
    var idx: int = i  # 每次迭代创建新变量
    var btn := Button.new()
    btn.pressed.connect(func(): print(idx))  # 0, 1, 2 ✓

# ✅ 解法2：bind 预填参数
for i: int in 3:
    var btn := Button.new()
    btn.pressed.connect(func(idx: int): print(idx).bind(i))  # bind 在连接时求值`

const lambdaCode = `# Lambda / 匿名函数
var doubler: Callable = func(x: int) -> int: return x * 2
print(doubler.call(5))  # 10

# 直接作为参数传递（filter/map 的回调）
var scores: Array[int] = [1, 2, 3, 4, 5]
var big: Array[int] = scores.filter(func(s: int) -> bool: return s > 2)

# Callable 类型（一等公民）
var action: Callable = func(): print("clicked")
action.call()`
const blitzFunctionsCode = `# 1) 鸭子类型：只检查方法，不检查具体类（bullet.gd 精简）
func _on_body_entered(body: Node2D) -> void:
    if _has_hit:
        return                      # 提前返回：防止重复命中
    _has_hit = true
    if body.has_method("take_damage"):
        body.take_damage(damage)    # 运行期动态分发：敌人/玩家都行
    _hit_and_die()

# 2) 信号连接 Callable：超时自毁
# timer.timeout.connect(fx.queue_free)  — 直接把方法引用传出去

# 3) 生命周期回调（GDScript 内置虚函数）
func _ready() -> void:
    body_entered.connect(_on_body_entered)   # 信号 → 方法引用
    var timer: SceneTreeTimer = get_tree().create_timer(lifetime)
    timer.timeout.connect(queue_free)        # 3 秒后自动销毁子弹

# 4) 特效延迟销毁（bullet.gd 精简）
func _spawn_hit_effect() -> void:
    var fx: Node2D = Node2D.new()
    fx.position = position
    get_tree().current_scene.add_child(fx)
    var t: SceneTreeTimer = get_tree().create_timer(0.3)
    t.timeout.connect(fx.queue_free)         # 0.3 秒后销毁特效

# 5) lambda 连接信号（main.gd 精简）
flag.body_entered.connect(func(_b): _on_goal_reached())`
const functionPitfallsCode = `# ⚠️ 错误 1：void 函数却 return 了值
func set_hp(v: int) -> void:
    return v        # ❌ "Cannot return a value from a void function"
# ✅ void 只能 return（无值）或省略
func set_hp(v: int) -> void:
    hp = v
    return

# ⚠️ 错误 2：调用时参数数量不匹配
func greet(name: String) -> void:
    print(name)
greet()             # ❌ 少一个参数
greet("a", "b")     # ❌ 多一个参数

# ⚠️ 错误 3：强类型函数传错类型
func add(a: int, b: int) -> int:
    return a + b
add(1, "two")       # ❌ String 不能转成 int

# ⚠️ 错误 4：GDScript 没有箭头函数！
var fn = (x): x * 2    # ❌ 语法错误
var fn = func(x: int) -> int: return x * 2   # ✅ 匿名 func 才是正解`
</script>
