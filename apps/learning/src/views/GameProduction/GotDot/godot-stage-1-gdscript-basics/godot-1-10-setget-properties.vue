<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">属性 getter/setter</h1>
          <p class="text-sm text-slate-500 mt-1">自定义属性访问逻辑——拦截读写（Godot 4 属性访问器）</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-10</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>属性访问器 = 自定义读写</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">get value() / set value(v)</code> (ES6 getter/setter) | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">@property</code> 装饰器 | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">var x: int:<br/>&nbsp;&nbsp;&nbsp;&nbsp;set(v): ...<br/>&nbsp;&nbsp;&nbsp;&nbsp;get: ...</code></p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 版本说明：</strong>Godot 3 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">setget</code> 关键字在 Godot 4 中被<strong>属性访问器</strong>（set/get 块）取代。<code class="bg-blue-100 px-1 rounded text-xs font-mono">var x: int = 0: set(v): ... get: ...</code> 是现在唯一的标准写法。</p>
        </aside>
        <p class="text-slate-600 mb-3 leading-relaxed">当属性被读取或写入时，触发自定义函数。常见用途：值校验、计算属性、发射变化信号。</p>
        <div class="mb-4"><Code language="gdscript" :code="setgetCode" title="accessors.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>三大实用场景</h2>
        <div class="mb-4"><Code language="gdscript" :code="setgetUseCode" title="accessors_use.gd" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>「属性变化自动发信号」≈ Vue 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">watch(health, handler)</code>；「计算属性」≈ Vue 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">computed()</code>；「校验」≈ TS class 里 setter 加范围断言。<strong>Godot 的做法是把逻辑焊在赋值语句上</strong>——调用方 <code class="bg-purple-100 px-1 rounded text-xs font-mono">node.hp = 80</code> 时副作用自动发生，不需要记得手动同步。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>setget vs 普通方法：何时用哪个？</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">不是所有逻辑都适合塞进 setter。<strong>简单的数据副作用</strong>（校验/发信号/同步）用访问器；<strong>多步骤操作</strong>（扣血+判断死亡+播动画）用方法。</p>
        <div class="mb-4"><Code language="gdscript" :code="setgetVsMethodCode" title="setget_vs_method.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 经验法则：</strong>把<strong>顺序敏感</strong>、<strong>有条件</strong>、<strong>需要返回值</strong>的逻辑放进 setter 会让代码难以阅读（赋值语句里藏了业务流程）。setter 只做「<strong>总是要发生</strong>」的同步动作。</p>
        </aside>
      </section>

      <section id="sec-blitz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 中的健康值管理</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的 player.gd <strong>目前用的是普通方法 + 手动同步</strong>（`take_damage` 里同时改血量、状态、无敌帧）。下面展示用 setget 改写后的效果——UI 血条通过信号自动跟随，不再需要手动刷新。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzSetgetCode" title="player.gd 健康值（现状 vs setget 改写）" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 为什么 Blitz 不用 setget？</strong>「扣血」不只是改一个数——它还要<strong>检查死亡、切换状态、设置无敌时间、给击退速度</strong>，是多步骤业务流程。<code class="bg-purple-100 px-1 rounded text-xs font-mono">take_damage()</code> 方法更合适。setget 适合把「<strong>纯数据变化</strong>」自动广播出去。两者配合最佳：方法里改数据，setter 负责通知。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-lg p-3"><strong>1. Setter 里忘了真正赋值 → 值永远不变：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">var hp: int: set(v): print(v)</code> 只打印不赋值，<code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">hp = 50</code> 后 hp 仍为默认值。Godot 4 里 setter 内直接给同名属性赋值就是<strong>写底层字段</strong>（不会递归），所以必须在 setter 里补上 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">hp = v</code>。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>2. 在 setter 里调用需要顺序的方法 → 隐藏 Bug：</strong>setter 是无条件、无返回值的。如果 setter 里 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">queue_free()</code>，任何赋值都会删节点——包括 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">_init</code> 初始化时的赋值。<strong>带副作用的条件逻辑放方法里。</strong></div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>3. 用 setget 做「重计算」在每帧被读取 → 性能下降：</strong>计算属性每次读都执行。如果 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">_physics_process</code> 每帧读一次，setter 里做复杂的遍历/排序就白烧 CPU。重计算用 <strong>缓存</strong>：只有依赖变化时才重算。</div>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Godot 4 写法 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">var x: T: set(v): ... get: ...</code>——拦截读写；Godot 3 的 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">setget</code> 已废弃</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>最大用途：<strong>值变化自动发信号</strong>、校验范围、计算属性</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>≈ TS <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">get/set</code> / Python <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@property</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>多步骤业务流程（扣血+死亡检查+动画）用方法，纯数据副作用用 setget</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-9-enums-constants" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：枚举与常量</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-11-static-typing" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：静态类型注解 →</RouterLink>
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
  { id: "sec-1", name: "访问器基础" },
  { id: "sec-2", name: "三大场景" },
  { id: "sec-3", name: "setget vs 方法" },
  { id: "sec-blitz", name: "🕹️ Blitz实战" },
  { id: "sec-4", name: "常见错误" },
  { id: "sec-5", name: "小结" },
]

const setgetCode = `extends Node
signal health_changed(new_health: int)

# Godot 4 属性访问器 —— 拦截属性的读写
var health: int = 100:
    set(value):          # 写入时调用（value 是新值）
        health = clampi(value, 0, 100)  # 限制 0-100
    get:                 # 读取时调用
        return health

# 简写：只拦截 set（自动 clamp 到合法范围）
var speed: float = 300.0:
    set(v):
        speed = clampf(v, 0.0, 1000.0)

func _ready() -> void:
    health = 500   # 自动被 clamp 到 100
    print(health)  # 100`

const setgetUseCode = `extends Node
signal health_changed(new_health: int)

# 场景1：属性变化自动发信号 —— setter 里 emit
var hp: int = 100:
    set(v):
        hp = v
        health_changed.emit(hp)   # 每次修改自动通知 UI

# 场景2：计算属性（每次读取都计算）—— 只读！
var radius: float = 10.0
var area: float:
    get: return PI * radius * radius

# 场景3：校验 + 归一化（技能冷却，负数视为 0）
var cooldown: float = 0.0:
    set(v):
        cooldown = max(0.0, v)`

const setgetVsMethodCode = `# ✅ 用访问器: 属性是"数据"，改动需要副作用（校验/信号/同步）
var health: int = 100:
    set(v):
        health = v
        health_changed.emit(health)

# ✅ 用普通方法: 操作是"步骤序列"（顺序敏感 + 条件 + 多个副作用）
func take_damage(amount: int) -> void:
    if invincible_timer > 0.0 or state == State.DEAD:
        return                      # 条件：无敌时跳过
    health -= amount                # setter 自动发信号
    if health <= 0:
        _die()                      # 额外逻辑：死亡
    else:
        state = State.HIT           # 顺序很重要：先扣血再切状态
        invincible_timer = 1.5`

const blitzSetgetCode = `# === player.gd（现状）：健康值用手动方法 + 手动同步 ===
@export var max_health: int = 3
var health: int

func _ready() -> void:
    health = max_health

func take_damage(amount: int = 1) -> void:
    if invincible_timer > 0.0 or state == State.DEAD:
        return
    health -= amount
    if health <= 0:
        _die()
    else:
        state = State.HIT
        invincible_timer = invincible_duration
        _hit_stun_timer = 0.3
        var kb_dir: float = -1.0 if facing_right else 1.0
        velocity = Vector2(kb_dir * 250.0, -280.0)

# === 如果用 setget 改写（概念演示）===
# signal health_changed(new_health: int)
# var health: int:
#     set(v):
#         health = v
#         health_changed.emit(health)   # 血条自动跟随，无需手动同步
#     get:
#         return health`
</script>
