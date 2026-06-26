<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⌨️ Input 单例与输入处理</h1><p class="text-sm text-slate-500 mt-1">is_action_pressed / get_axis / InputMap 代码注册——两种输入检测方式</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 blitz 源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 5-2</span></div></div></header>
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
        <p class="text-slate-600 mb-3 leading-relaxed">在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_ready()</code> 中批量注册所有动作。这是 <strong>blitz 的做法</strong>，避免了 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">project.godot</code> 中脆弱的 Object 格式。</p>
        <div class="mb-4"><Code language="gdscript" :code="inputMapCode" title="main.gd — _setup_input_map()" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">三种检测方式</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">API</th><th class="px-4 py-2 border font-semibold text-slate-700">返回值</th><th class="px-4 py-2 border font-semibold text-slate-700">典型用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">is_action_just_pressed("jump")</td><td class="px-4 py-2 border">bool: 这一帧刚按下</td><td class="px-4 py-2 border">跳跃、冲刺（触发一次）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">is_action_pressed("shoot")</td><td class="px-4 py-2 border">bool: 当前按住中</td><td class="px-4 py-2 border">射击（按住连发）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">get_axis("move_left","move_right")</td><td class="px-4 py-2 border">float: -1.0 到 1.0</td><td class="px-4 py-2 border">移动（模拟摇杆/键盘）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>InputMap ≈ keybindings.json。动作名("jump")≈ 事件名。物理键(KEY_SPACE)≈ 键码。换键位只需改 InputMap，不改游戏代码——类似前端改 CSS 不改 HTML。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>get_axis() 详解</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Input.get_axis("negative_action", "positive_action")</code> 是最优雅的移动输入方式。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>两个动作都触发时返回 <strong>0</strong>（按住 A+D = 不动）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>按左(A)返回 <strong>-1.0</strong>，按右(D)返回 <strong>1.0</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>支持键盘 <strong>和</strong> 手柄摇杆——摇杆推一半就是 0.5</span></li>
        </ul>
        <div class="mb-4"><Code language="gdscript" :code="getAxisCode" title="用法示例" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>is_action_just_pressed vs is_action_pressed</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">这是新手最容易搞混的地方。<strong>just_pressed = 边沿触发，pressed = 电平触发。</strong></p>
        <div class="mb-4"><Code language="gdscript" :code="justVsPressedCode" title="对比" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 经典错误：</strong>用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">is_action_pressed</code> 做跳跃 → 角色每帧都在跳（因为按住时空格每帧都是 true）。<strong>跳跃/冲刺用 just_pressed，射击/蹲下用 pressed。</strong></p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：blitz 的输入系统</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">blitz 在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">main.gd</code> 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_setup_input_map()</code> 中注册了 6 个动作，在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">player.gd</code> 中使用这些动作控制角色。打开源码对照看：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>main.gd: _setup_input_map()</strong> — 用 InputMap.add_action() + InputEventKey 在代码中注册按键</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>player.gd: _get_input_dir()</strong> — Input.get_axis("move_left","move_right") 获取移动方向</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>player.gd: _jump_input_just_pressed()</strong> — Input.is_action_just_pressed("jump") 触发跳跃</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>player.gd: _shoot_input_pressed()</strong> — Input.is_action_pressed("shoot") 按住连发</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>player.gd: _dash_input_just_pressed()</strong> — Input.is_action_just_pressed("dash") 触发冲刺</span></li>
        </ul>
        <div class="mb-4"><Code language="gdscript" :code="cupheadInputCode" title="blitz 的输入系统（精简版）" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 为什么用代码注册而不是 project.godot？</strong>project.godot 的 Input Map 格式用 Object(...) 语法，Godot 版本间兼容性差。代码注册用 InputEventKey.new()，跨 4.0~4.6 全兼容。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键 API 清单</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">API</th><th class="px-4 py-2 border font-semibold text-slate-700">参数</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.is_action_just_pressed(name)</td><td class="px-4 py-2 border">StringName</td><td class="px-4 py-2 border">这一帧刚按下？</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.is_action_pressed(name)</td><td class="px-4 py-2 border">StringName</td><td class="px-4 py-2 border">当前按住？</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.is_action_just_released(name)</td><td class="px-4 py-2 border">StringName</td><td class="px-4 py-2 border">这一帧刚松开？（可变跳高用）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Input.get_axis(neg, pos)</td><td class="px-4 py-2 border">两个 StringName</td><td class="px-4 py-2 border">-1.0 到 1.0 的轴值</td></tr>
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
const navList = [{id:"sec-1",name:"两种方式"},{id:"sec-2",name:"InputMap动作"},{id:"sec-3",name:"get_axis详解"},{id:"sec-4",name:"just_pressed"},{id:"sec-5",name:"cuphead实战"},{id:"sec-6",name:"API清单"}]

const inputMapCode = `# 在 _ready() 中批量注册 InputMap 动作
# 这是 blitz 的做法 —— 不依赖 project.godot 的 Object 格式
func _setup_input_map() -> void:
    var actions: Dictionary = {
        "move_left":  [KEY_A, KEY_LEFT],
        "move_right": [KEY_D, KEY_RIGHT],
        "jump":       [KEY_SPACE, KEY_W, KEY_UP],
        "dash":       [KEY_SHIFT, KEY_K],
        "shoot":      [KEY_J, KEY_Z],
        "restart":    [KEY_R, KEY_ENTER],
    }
    for action_name: String in actions:
        # 只在动作不存在时才注册（避免重复）
        if not InputMap.has_action(action_name):
            InputMap.add_action(action_name)
            for key: Key in actions[action_name]:
                var ev: InputEventKey = InputEventKey.new()
                ev.physical_keycode = key   # 物理键码,不受键盘布局影响
                InputMap.action_add_event(action_name, ev)

    # 鼠标也支持射击
    if InputMap.has_action("shoot"):
        var mev: InputEventMouseButton = InputEventMouseButton.new()
        mev.button_index = MOUSE_BUTTON_LEFT
        InputMap.action_add_event("shoot", mev)`

const getAxisCode = `# _physics_process 中获取移动方向
var direction: float = Input.get_axis("move_left", "move_right")
# direction = -1.0 (纯左) / 0.5 (摇杆推一半) / 0.0 (不动) / 1.0 (纯右)

# 帧无关移动: 方向 × 速度 × delta
velocity.x = direction * SPEED

# 也可以用方向判断朝向
if direction != 0.0:
    facing_right = direction > 0.0`

const justVsPressedCode = `# ✅ 跳跃: 用 just_pressed (只触发一次)
if Input.is_action_just_pressed("jump"):
    velocity.y = JUMP_VELOCITY

# ✅ 射击: 用 pressed (按住连发)
if Input.is_action_pressed("shoot"):
    spawn_bullet()

# ❌ 错误: 用 pressed 做跳跃
if Input.is_action_pressed("jump"):  # 每帧都跳!
    velocity.y = JUMP_VELOCITY`

const cupheadInputCode = `# === blitz 的输入系统 ===
# main.gd 注册, player.gd 使用

# --- main.gd: 注册 ---
func _ready():
    _setup_input_map()  # 注册 move_left/move_right/jump/dash/shoot/restart

# --- player.gd: 使用 ---
func _get_input_dir() -> float:
    return Input.get_axis("move_left", "move_right")

func _jump_input_just_pressed() -> bool:
    return Input.is_action_just_pressed("jump")

func _dash_input_just_pressed() -> bool:
    return Input.is_action_just_pressed("dash")

func _shoot_input_pressed() -> bool:
    return Input.is_action_pressed("shoot")  # 按住连发`
</script>
