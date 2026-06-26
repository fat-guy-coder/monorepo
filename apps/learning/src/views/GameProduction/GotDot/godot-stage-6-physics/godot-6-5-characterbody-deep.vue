<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🏃 CharacterBody2D 深入</h1><p class="text-sm text-slate-500 mt-1">velocity / move_and_slide / is_on_floor — 代码控制物理的精髓</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 6-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>设计哲学：你控制 velocity，Godot 处理碰撞</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">CharacterBody2D 区别于 RigidBody2D：<strong>不是物理引擎推你，是你的代码推你。</strong>每帧设 velocity → move_and_slide() 执行 → 碰到墙自动停。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>≈ 手动 <code class="bg-purple-100 px-1 rounded text-xs font-mono">transform: translate()</code> + 自动碰撞检测（而不是浏览器布局引擎自动排）。</p></aside></section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>velocity 模式 — 每帧三步</h2>
        <div class="mb-4"><Code language="gdscript" :code="velocityCode" title="标准流程" /></div></section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>move_and_slide() 后的状态查询</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>必须在 move_and_slide() 之后调用才有效。</strong></p>
        <div class="mb-4"><Code language="gdscript" :code="stateCode" title="状态查询" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 不要在 _ready() 里调 is_on_floor()——</strong>那时还没执行过 move_and_slide()，返回值不可预测。只在 _physics_process 中用。</p></aside></section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Blitz player.gd 的完整物理循环</h2>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="player.gd — 主循环结构" /></div></section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>velocity = 每帧移动指令，move_and_slide() = 执行</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>is_on_floor/wall/ceiling 只在 move_and_slide() 后有效</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>顺序: 改 velocity → move_and_slide() → 查状态 → 下帧</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-6-physics/godot-6-4-collision-layers" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：碰撞层</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-6-physics/godot-6-6-platformer-physics" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：平台跳跃物理 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"设计哲学"},{id:"sec-2",name:"velocity模式"},{id:"sec-3",name:"状态查询"},{id:"sec-4",name:"Blitz实战"},{id:"sec-5",name:"小结"}]
const velocityCode = `# 每帧三步: 改 velocity → move_and_slide() → 查状态
func _physics_process(delta: float) -> void:
    # 1. 重力（只有空中才加速下落）
    if not is_on_floor():
        velocity.y += gravity * delta
        velocity.y = min(velocity.y, max_fall)

    # 2. 水平输入
    var dir: float = Input.get_axis("move_left", "move_right")
    velocity.x = dir * SPEED

    # 3. 跳跃（直接设 velocity.y = 负值）
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_VELOCITY   # -520 → 向上

    # 4. 执行移动 + 碰撞
    move_and_slide()`
const stateCode = `move_and_slide()
# 下面这些方法此时才有正确的返回值 ↓

is_on_floor()     # 脚底有平台? → 跳跃判断
is_on_wall()      # 碰到墙壁? → 墙跳检测
is_on_ceiling()   # 头顶有天花板? → 撞头

# 获取上一次碰撞的详细信息
var last_collision: KinematicCollision2D = get_last_slide_collision()
if last_collision:
    var collider = last_collision.get_collider()  # 碰到了谁`
const blitzCode = `# player.gd — Blitz 玩家的主循环结构
func _physics_process(delta: float) -> void:
    if state == State.DEAD: return

    _update_timers(delta)          # 所有倒计时 -delta
    match state:                   # 状态机分发
        State.NORMAL:  _process_normal(delta)
        State.DASHING: _process_dash(delta)
        State.HIT:     _process_hit(delta)

    # → godot-6-6: coyote time 在 move_and_slide 前设
    if is_on_floor():
        _coyote_timer = coyote_time

    move_and_slide()               # 执行 velocity
    queue_redraw()                 # 重绘蓝色圆点`
</script>
