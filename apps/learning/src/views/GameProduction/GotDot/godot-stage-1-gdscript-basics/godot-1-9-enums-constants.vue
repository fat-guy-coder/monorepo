<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">枚举与常量</h1>
          <p class="text-sm text-slate-500 mt-1">enum / const——让代码更可读的类型安全方案</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/enemy.gd" label="📝 enemy.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-9</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>enum——枚举类型</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">enum State {"{"} Idle, Run, Jump {"}"}</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">class State(Enum): IDLE=1</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">enum State {"{"} IDLE, RUN, JUMP {"}"}</code><br/>GDScript 的 enum 和 TS 几乎一样——花括号、逗号分隔、自动递增整数值。和 Python 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">IntEnum</code> 语义相同（底层就是 int）。</p>
        </aside>
        <div class="mb-4"><Code language="gdscript" :code="enumCode" title="enum.gd" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么不用魔法数字？</strong><code class="bg-blue-100 px-1 rounded text-xs font-mono">if state == 2</code> 没人知道 2 是什么；<code class="bg-blue-100 px-1 rounded text-xs font-mono">if state == State.JUMP</code> 一目了然。IDE 补全还会提示所有合法取值——杜绝拼错字符串。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>@export_enum——编辑器下拉选择</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">和 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">@export</code> 配合，Inspector 中出现下拉框，比手写字符串更安全。≈ Vue 的 prop validator。</p>
        <div class="mb-4"><Code language="gdscript" :code="exportEnumCode" title="export_enum.gd" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">@export_enum</code> ≈ Vue 里给 <code class="bg-purple-100 px-1 rounded text-xs font-mono">defineProps</code> 加一个 <code class="bg-purple-100 px-1 rounded text-xs font-mono">validator</code> + 用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">&lt;select&gt;</code> 渲染——编辑器里就能挑，永远输不错。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>const——编译时常量</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">const</code> 值在<strong>编译时</strong>确定。不能是函数调用的结果。命名全大写（约定）。</p>
        <div class="mb-4"><Code language="gdscript" :code="constCode" title="const.gd" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">const MAX_HP = 100</code>（用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">as const</code> 保真）| <strong>Python:</strong> 无原生 const，用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Final</code>（typing）| <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">const MAX_HP: int = 100</code>。<br/>GDScript 的 const 是<strong>真·编译时常量</strong>——值被直接内联进编译结果，比 TS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">const</code>（运行时绑定）更严格。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>enum + match——状态机的经典组合</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">enum 最常见的用法是配合 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">match</code> 写状态机（游戏角色状态的骨架）。<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">State.keys()</code> 能反向把数字映射回名字，调试输出特别方便。</p>
        <div class="mb-4"><Code language="gdscript" :code="enumMatchCode" title="enum_match.gd" /></div>
      </section>

      <section id="sec-blitz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 项目中的 enum 与 const</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的敌人脚本用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">enum Type</code> 定义三种 AI 行为；主场景用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">const</code> 定义关卡尺寸——改一个数字整关布局跟着变。打开 enemy.gd / main.gd 对照看：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzEnumsCode" title="Blitz 中的 enum 与 const（精简）" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-purple-800"><strong>🔗 实战经验：</strong>main.gd 里 <code class="bg-purple-100 px-1 rounded text-xs font-mono">_create_enemy(pos, 0)</code> 直接传 0/1/2 这种<strong>魔法数字</strong>其实是个反例——注释虽然解释了 0=PATROL，但如果改为直接传 <code class="bg-purple-100 px-1 rounded text-xs font-mono">enemy.Type.PATROL</code> 会更安全（类型检查 + 可读性）。这就是 enum 的价值。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-lg p-3"><strong>1. 枚举值从 0 开始，容易和"默认值/未设置"混淆：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">enum State {"{"} IDLE, RUN {"}"}</code> 中 IDLE 是 0。如果某些逻辑用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">if state:</code> 判断"有状态"，IDLE 会被当成 falsy 跳过。<strong>主动给第一个值赋 1</strong> 或永远用枚举名比较。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>2. const 赋值运行时值 → 编译报错：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">const NOW: int = Time.get_ticks_msec()</code> 非法——const 必须编译期可知。需要运行时值用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">var</code>，或 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">@onready</code> 在节点就绪后赋值。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>3. @export_enum 字符串值 vs int 值：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">@export_enum("Easy:1","Normal:2")</code> 的 1/2 是<strong>字典语义</strong>，写死在标签里；如果后面改动枚举值顺序，下拉框显示会错位。枚举值一旦发布就尽量<strong>只增不改</strong>。</div>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">enum {"{}"}</code> ≈ TS enum / Python IntEnum，自动递增整数，可自定义值</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@export_enum</code> → Inspector 下拉框，杜绝输错</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">const</code> 编译时常量（大写命名），不能是运行时值</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>enum + match 是状态机的骨架（Blitz 敌人 AI 就是这套）</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-8-signals-basics" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：信号基础</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-10-setget-properties" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：属性 getter/setter →</RouterLink>
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
  { id: "sec-1", name: "enum" },
  { id: "sec-2", name: "@export_enum" },
  { id: "sec-3", name: "const" },
  { id: "sec-4", name: "enum+match" },
  { id: "sec-blitz", name: "🕹️ Blitz实战" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-6", name: "小结" },
]

const enumCode = `# enum ——花括号、逗号分隔、自动递增（从 0 开始）
enum State { IDLE, RUN, JUMP, DEAD }  # IDLE=0, RUN=1, JUMP=2, DEAD=3
var state: State = State.IDLE
if state == State.RUN: print("跑步")

# 自定义值
enum ErrorCode { OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500 }
# 不连续值
enum Priority { LOW = 1, MEDIUM = 5, HIGH = 10 }

# 枚举可以声明在脚本最外层，也可以写在 class 里
# 内部类枚举: Enemy.Type —— 见 Blitz 实战章节`

const exportEnumCode = `# @export_enum ——Inspector 下拉选择
@export_enum("Warrior", "Mage", "Archer") var class_type: String = "Warrior"
# 也可以限制范围（字典语法: 显示名:值）
@export_enum("Easy:1", "Normal:2", "Hard:3") var difficulty: int = 2

# 更安全: 用 @export 配合 enum 类型（Godot 4.4+）
# @export var enemy_type: Type = Type.PATROL`

const constCode = `const MAX_HEALTH: int = 200
const GRAVITY: float = 980.0
const GAME_TITLE: String = "My Game"

# const 数组 / 字典 也可以（内容编译期固定）
const DIRECTIONS: Array[Vector2] = [Vector2.LEFT, Vector2.RIGHT]
const ENEMY_SPAWN: Dictionary = { "rate": 2.0, "max": 10 }

# ❌ 编译错误：const 必须是编译时常量，不能是函数调用
# const NOW: float = Time.get_ticks_msec()
# 需要运行时值 → 用 var 或 @onready`

const enumMatchCode = `# enum + match —— 状态机的经典组合
enum State { IDLE, RUN, JUMP, DEAD }
var state: State = State.IDLE

func _process_state() -> void:
    match state:
        State.IDLE:   print("站立")
        State.RUN:    print("跑步")
        State.JUMP:   print("跳跃")
        State.DEAD:   print("死亡")

# 反向查找: 数字 → 枚举名（调试输出很有用）
func state_name(s: State) -> String:
    return State.keys()[s]  # "IDLE" / "RUN" / "JUMP" / "DEAD"`

const blitzEnumsCode = `# === enemy.gd — enum 定义 AI 行为类型 ===
enum Type {
    PATROL = 0,      ## 巡逻 — 在起始点左右来回移动
    STATIONARY = 1,  ## 固定 — 不移动,充当"炮台"
    CHASER = 2,      ## 追踪 — 朝玩家方向移动
}
@export var enemy_type: Type = Type.PATROL

func _physics_process(delta: float) -> void:
    # enum 值直接用于 match 分支 —— 比 if/elif 链更清晰
    match enemy_type:
        Type.PATROL:
            _process_patrol(delta)
        Type.STATIONARY:
            velocity.x = move_toward(velocity.x, 0.0, 400.0 * delta)
        Type.CHASER:
            _process_chase(delta)

# === main.gd — const 定义关卡尺寸常量 ===
const LEVEL_WIDTH: float = 3200.0
const LEVEL_HEIGHT: float = 720.0
const GROUND_Y: float = 670.0
# 整个关卡构建都引用这些常量，改一处全变
var platforms: Array[Dictionary] = [
    { pos = Vector2(350, 510), size = Vector2(170, 16) },
    { pos = Vector2(620, 420), size = Vector2(150, 16) },
]`
</script>
