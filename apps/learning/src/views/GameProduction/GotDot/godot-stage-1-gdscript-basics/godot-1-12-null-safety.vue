<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">null 安全与判空</h1>
          <p class="text-sm text-slate-500 mt-1">处理空值——GDScript 的 null 安全模式</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/enemy.gd" label="📝 enemy.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-12</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>null 在 GDScript 中</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">null / undefined</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">None</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">null</code>（小写！）<br/>GDScript 只有 null，没有 undefined。和 JS 一样用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">== null</code> 判断。<strong>最大的区别：GDScript 没有 <code class="bg-purple-100 px-1 rounded text-xs font-mono">?. </code> 和 <code class="bg-purple-100 px-1 rounded text-xs font-mono">??</code> 运算符</strong>（Godot 4.x），判空要靠 if 语句。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>代码中的 null 安全</h2>
        <div class="mb-4"><Code language="gdscript" :code="nullCode" title="null_safety.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>is_instance_valid 与 get_node_or_null</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">is_instance_valid(x)</code> 检查对象是否<strong>还活着</strong>（未被 free）；<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">get_node_or_null(path)</code> 找不到节点返回 null 而非抛错。它们是游戏里处理「动态销毁节点」的两大护身符。</p>
        <div class="mb-4"><Code language="gdscript" :code="nullSafe2Code" title="instance_valid.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 为什么要 is_instance_valid 而不是 == null？</strong>节点 <code class="bg-amber-100 px-1 rounded text-xs font-mono">queue_free()</code> 后，引用会变成一个<strong>「已释放实例」</strong>（Freed instance），它 <code class="bg-amber-100 px-1 rounded text-xs font-mono">!= null</code>，但调用方法会直接崩溃。<code class="bg-amber-100 px-1 rounded text-xs font-mono">is_instance_valid()</code> 才能识别这种「尸体」。前端里没有完全对应的概念，最接近的是「已卸载组件的引用」。</p>
        </aside>
      </section>

      <section id="sec-blitz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 项目中的判空</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的敌人追玩家、主场景读玩家状态，都先判空再访问——<strong>场景节点动态增删是常态，判空是基本功</strong>。打开 enemy.gd / main.gd 对照看：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzNullCode" title="Blitz 判空模式（精简）" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">get_node_or_null</code> ≈ Vue 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">$refs.someRef?.xxx</code>（可选链）；<code class="bg-purple-100 px-1 rounded text-xs font-mono">is_instance_valid</code> ≈ React 里组件 <code class="bg-purple-100 px-1 rounded text-xs font-mono">isMounted()</code> 的防呆检查。<strong>GDScript 没有 ?. 语法糖，所以每个读引用的地方都要自己包一层 if。</strong></p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-lg p-3"><strong>1. 用 == null 判断已 free 的节点 → 漏判：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">if enemy == null: return</code> 拦不住「Freed instance」。要用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">is_instance_valid(enemy)</code>。对<strong>动态销毁的节点</strong>一律用 is_instance_valid。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>2. 忘判空直接调用 → 崩溃：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">target.queue_free()</code> 当 target 为 null 时报 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Invalid call to method 'queue_free'</code>。<strong>访问任何「可能不存在的引用」前先 if 判断</strong>，特别是 @export 引用和 get_node 结果。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>3. Dictionary 用 [] 取不存在 key → 报错：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">data["hp"]</code> 键不存在会报错；用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">data.get("hp", 0)</code> 安全取值。<code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">data.has("hp")</code> 可先判断键是否存在。</div>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">null</code>（小写）= JS null / Python None</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">if node: </code> ≈ TS 的 truthy check</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>没有 ?. / ?? 运算符</strong>（Godot 4.x 暂无），用 if 判断或 .get() 方法</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">is_instance_valid(x)</code> 判断已释放对象；<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">get_node_or_null()</code> 替代 get_node</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Dictionary 用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">.get(key, default)</code> 安全取值</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-11-static-typing" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：静态类型注解</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-13-string-formatting" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：字符串格式化 →</RouterLink>
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
  { id: "sec-1", name: "null 概念" },
  { id: "sec-2", name: "null 安全代码" },
  { id: "sec-3", name: "instance_valid" },
  { id: "sec-blitz", name: "🕹️ Blitz实战" },
  { id: "sec-4", name: "常见错误" },
  { id: "sec-5", name: "小结" },
]

const nullCode = `# null ——小写，只有 null 没有 undefined
var target: Node = null

# 检查 null：直接 if 判断（truthy/falsy）
if target:   # null → falsy
    target.queue_free()

# 显式检查
if target == null:
    print("没有目标")

# 安全调用：先检查再调用（Godot 4.x 没有 ?. ）
if is_instance_valid(target):
    target.queue_free()

# Dictionary 安全取值
var hp: int = data.get("health", 0)  # 不存在返回默认值 0

# 不写类型注解时变量初始化为 null
var something  # 此时是 null（Variant 类型）`

const nullSafe2Code = `# is_instance_valid —— 判断引用是否还指向"活着"的对象
var enemy: Node = get_node_or_null("Enemy")
# 敌人已被 queue_free()，但引用还握着旧地址
if is_instance_valid(enemy):
    enemy.take_damage(5)      # 安全调用
else:
    print("敌人已销毁")

# get_node_or_null —— 找不到节点返回 null 而不是报错
var label: Label = get_node_or_null("UI/ScoreLabel")
if label:
    label.text = "Score: 10"
# 对比 get_node：找不到直接抛错中断场景

# 类型化 + 判空链（常见的防御写法）
var player: CharacterBody2D = get_node_or_null("/root/Main/Player") as CharacterBody2D
if player and player.has_method("take_damage"):
    player.take_damage(1)`

const blitzNullCode = `# === enemy.gd — 追玩家时的 null 保护 ===
func _process_chase(_delta: float) -> void:
    var player_ref: Node2D = _get_player()
    if not is_instance_valid(player_ref):
        return               # 玩家已销毁/不存在，直接跳过
    var to_player: Vector2 = player_ref.position - position
    facing_right = to_player.x > 0.0

# === enemy.gd — 跨节点引用可能返回 null ===
func _get_player() -> Node2D:
    var root: Node = get_tree().current_scene
    if root and root.has_method("get_player"):
        return root.get_player()
    return null              # 拿不到就返回 null，调用方要判空

# === main.gd — 每帧判空再访问（防坠亡检查） ===
func _process(_delta: float) -> void:
    if player and is_instance_valid(player):
        if player.position.y > LEVEL_HEIGHT + 80:
            player.take_damage(999)   # 掉出关卡底部直接死`
</script>
