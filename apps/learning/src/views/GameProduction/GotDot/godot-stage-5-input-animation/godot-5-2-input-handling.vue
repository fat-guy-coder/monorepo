<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⌨️ Input 单例与输入处理</h1><p class="text-sm text-slate-500 mt-1">is_action_pressed / get_axis / get_vector / InputMap 代码注册</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/demos/stage-2-nodes/demo_isometric_move.gd" label="📝 等距 demo" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 5-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>两种输入方式</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">方式</th><th class="px-4 py-2 border font-semibold text-slate-700">API</th><th class="px-4 py-2 border font-semibold text-slate-700">场景</th><th class="px-4 py-2 border font-semibold text-slate-700">键盘/鼠标/手柄</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-medium">InputMap 动作</td><td class="px-4 py-2 border font-mono text-xs">Input.is_action_pressed("jump")</td><td class="px-4 py-2 border">游戏逻辑（90% 情况）</td><td class="px-4 py-2 border">✅ 全部支持，一键改键位</td></tr>
              <tr><td class="px-4 py-2 border font-medium">物理按键</td><td class="px-4 py-2 border font-mono text-xs">Input.is_physical_key_pressed(KEY_SPACE)</td><td class="px-4 py-2 border">调试/编辑器工具</td><td class="px-4 py-2 border">❌ 仅键盘，不支持手柄</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：游戏逻辑永远用 InputMap 动作。</strong>InputMap 是物理按键和逻辑动作之间的抽象层——换键位、加手柄支持、改灵敏度都只改一处。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>方法一：InputMap 动作（推荐）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">先在 Project Settings → Input Map 中定义动作，或在<strong>代码中注册</strong>（推荐——不依赖 project.godot 的 Object 格式，跨版本兼容性更好）。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">在代码中注册 InputMap</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_ready()</code> 中批量注册所有动作。</p>
        <div class="mb-4"><Code language="gdscript" :code="inputMapCode" title="注册 InputMap" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">三种检测方式</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">API</th><th class="px-4 py-2 border font-semibold text-slate-700">返回值</th><th class="px-4 py-2 border font-semibold text-slate-700">典型用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">is_action_just_pressed("jump")</td><td class="px-4 py-2 border">bool: 这一帧刚按下</td><td class="px-4 py-2 border">跳跃、冲刺（触发一次）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">is_action_pressed("attack")</td><td class="px-4 py-2 border">bool: 当前按住中</td><td class="px-4 py-2 border">蓄力（按住检测）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">get_axis("move_left","move_right")</td><td class="px-4 py-2 border">float: -1.0 到 1.0</td><td class="px-4 py-2 border">单轴移动</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>InputMap ≈ keybindings.json。动作名("jump")≈ 事件名。物理键(KEY_SPACE)≈ 键码。换键位只需改 InputMap，不改游戏代码——类似前端改 CSS 不改 HTML。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>get_axis() 详解（单轴）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Input.get_axis("negative_action", "positive_action")</code> 是最优雅的单轴移动输入方式。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>两个动作都触发时返回 <strong>0</strong>（按住 A+D = 不动）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>按左(A)返回 <strong>-1.0</strong>，按右(D)返回 <strong>1.0</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>支持键盘 <strong>和</strong> 手柄摇杆——摇杆推一半就是 0.5</span></li>
        </ul>
        <div class="mb-4"><Code language="gdscript" :code="getAxisCode" title="用法示例" /></div>
      </section>

      <section id="sec-vec" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>get_vector() 详解（八向移动）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">等距/俯视角游戏需要<strong>八向移动</strong>（上下左右 + 对角线），这时用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Input.get_vector(left, right, up, down)</code> 一次拿到二维向量。</p>
        <div class="mb-4"><Code language="gdscript" :code="getVectorCode" title="八向输入" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>get_vector ≈ 把两个 get_axis 合成一个 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Vector2(x, y)</code>，并且自动做了 <code class="bg-purple-100 px-1 rounded text-xs font-mono">normalize()</code>（归一化）。自己手写要 <code class="bg-purple-100 px-1 rounded text-xs font-mono">v / sqrt(v.x² + v.y²)</code>，引擎帮你做好了。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 经典坑：</strong>自己用两个 get_axis 组合成 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Vector2(axis_x, axis_y)</code> 再移动，对角线速度会变成 <strong>√2 倍</strong>（约 1.414×），角色斜着走更快。get_vector 内部已归一化，对角线长度 = 1。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>is_action_just_pressed vs is_action_pressed</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">这是新手最容易搞混的地方。<strong>just_pressed = 边沿触发，pressed = 电平触发。</strong></p>
        <div class="mb-4"><Code language="gdscript" :code="justVsPressedCode" title="对比" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 经典错误：</strong>用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">is_action_pressed</code> 做跳跃 → 角色每帧都在跳。用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">is_action_just_pressed</code> 做蓄力 → 永远检测不到持续按住。<strong>跳跃/冲刺用 just_pressed，蓄力/连发用 pressed。</strong></p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：等距移动的八向输入</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">demo_isometric_move.gd</code> 用 get_vector 实现等距八向移动：新建场景 → Node2D 根 → 附加脚本 → F6，WASD 在菱形网格上移动。打开源码对照看：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_setup_input()</strong> — InputMap 代码注册 move_left/right/up/down 四个方向</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_physics_process()</strong> — Input.get_vector 拿八向向量，乘速度乘 delta</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_world_to_screen()</strong> — 移动是 2D 的，等距只在渲染时投影（见 godot-2-8-tilemap）</span></li>
        </ul>
        <div class="mb-4"><Code language="gdscript" :code="isometricInputCode" title="等距移动的输入（精简）" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 为什么用代码注册而不是 project.godot？</strong>project.godot 的 Input Map 格式用 Object(...) 语法，Godot 版本间兼容性差。代码注册用 InputEventKey.new()，跨 4.0~4.6 全兼容。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键 API 清单</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">API</th><th class="px-4 py-2 border font-semibold text-slate-700">参数</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.is_action_just_pressed(name)</td><td class="px-4 py-2 border">StringName</td><td class="px-4 py-2 border">这一帧刚按下？</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.is_action_pressed(name)</td><td class="px-4 py-2 border">StringName</td><td class="px-4 py-2 border">当前按住？</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.is_action_just_released(name)</td><td class="px-4 py-2 border">StringName</td><td class="px-4 py-2 border">这一帧刚松开？</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.get_axis(neg, pos)</td><td class="px-4 py-2 border">两个 StringName</td><td class="px-4 py-2 border">-1.0 到 1.0 的轴值（单轴）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.get_vector(l, r, u, d)</td><td class="px-4 py-2 border">四个 StringName</td><td class="px-4 py-2 border">归一化二维向量（八向）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">InputMap.has_action(name)</td><td class="px-4 py-2 border">StringName</td><td class="px-4 py-2 border">动作是否已注册？</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">InputMap.add_action(name)</td><td class="px-4 py-2 border">StringName</td><td class="px-4 py-2 border">注册新动作</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">InputMap.action_add_event(name, ev)</td><td class="px-4 py-2 border">StringName, InputEvent</td><td class="px-4 py-2 border">给动作绑定按键</td></tr>
        </tbody></table></div>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-5-input-animation/godot-5-1-input-map" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Input Map 配置</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-5-input-animation/godot-5-3-mouse-touch" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：鼠标与触屏输入 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"两种方式"},{id:"sec-2",name:"InputMap动作"},{id:"sec-3",name:"get_axis详解"},{id:"sec-vec",name:"get_vector八向"},{id:"sec-4",name:"just_pressed"},{id:"sec-5",name:"等距实战"},{id:"sec-6",name:"API清单"}]

const inputMapCode = `# 在 _ready() 中批量注册 InputMap 动作
func _setup_input() -> void:
    var actions: Dictionary = {
        "move_left":  [KEY_A, KEY_LEFT],
        "move_right": [KEY_D, KEY_RIGHT],
        "move_up":    [KEY_W, KEY_UP],
        "move_down":  [KEY_S, KEY_DOWN],
    }
    for action_name: String in actions:
        # 只在动作不存在时才注册（避免重复）
        if not InputMap.has_action(action_name):
            InputMap.add_action(action_name)
            for key: Key in actions[action_name]:
                var ev: InputEventKey = InputEventKey.new()
                ev.physical_keycode = key   # 物理键码,不受键盘布局影响
                InputMap.action_add_event(action_name, ev)`

const getAxisCode = `# 单轴移动（横版左右）
var direction: float = Input.get_axis("move_left", "move_right")
# direction = -1.0 (纯左) / 0.5 (摇杆推一半) / 0.0 (不动) / 1.0 (纯右)

velocity.x = direction * SPEED  # 帧无关: 方向 × 速度

if direction != 0.0:
    facing_right = direction > 0.0`

const getVectorCode = `# 八向移动（等距/俯视角）
# 一次拿到归一化 Vector2: 上下左右 + 对角线
var input_vec: Vector2 = Input.get_vector("move_left", "move_right", "move_up", "move_down")

# 对角线 (W+D) 时 input_vec = (0.707, 0.707), 长度仍为 1
# 移动不会因为斜着走而变快

position += input_vec * SPEED * delta  # 直接加二维向量

# 对比: 自己手写要手动归一化
# var raw = Vector2(axis_x, axis_y)
# if raw.length() > 0: raw = raw.normalized()  # ← get_vector 已替你做了`

const justVsPressedCode = `# ✅ 跳跃/冲刺: 用 just_pressed (只触发一次)
if Input.is_action_just_pressed("jump"):
    velocity.y = JUMP_VELOCITY

# ✅ 蓄力/连发: 用 pressed (按住检测)
if Input.is_action_pressed("attack"):
    charge_time += delta  # 按住越久蓄力越高

# ❌ 错误: 用 pressed 做跳跃
if Input.is_action_pressed("jump"):  # 每帧都跳!
    velocity.y = JUMP_VELOCITY`

const isometricInputCode = `# === demo_isometric_move.gd 的八向输入 ===
# 逻辑层: 2D 八向移动 (和普通 2D 没区别)
func _physics_process(delta: float) -> void:
    var input_vec: Vector2 = Input.get_vector(
        "move_left", "move_right", "move_up", "move_down"
    )
    if input_vec != Vector2.ZERO:
        world_pos += input_vec * MOVE_SPEED * delta  # 对角线已归一化
        queue_redraw()

# 渲染层: 等距投影 (见 godot-2-8-tilemap)
func _world_to_screen(world: Vector2) -> Vector2:
    return SCREEN_CENTER + Vector2(
        (world.x - world.y) * TILE_W / 2.0,
        (world.x + world.y) * TILE_H / 2.0
    )`
</script>
