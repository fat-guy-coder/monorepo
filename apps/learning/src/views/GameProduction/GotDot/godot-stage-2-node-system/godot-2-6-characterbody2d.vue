<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">CharacterBody2D</h1><p class="text-sm text-slate-500 mt-1">代码控制的 2D 角色——玩家、敌人的物理基类</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🏃</span>概述</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>CharacterBody2D ≈ 一个自带碰撞检测的 div——你写代码控制位置，它自动处理"碰到墙就停"。核心方法 <code class="bg-purple-100 px-1 rounded text-xs font-mono">move_and_slide()</code>。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="charCode" title="character_body_2d.gd" /></div></section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>完整横版动作脚本</h2><p class="text-slate-600 mb-3 leading-relaxed">这是一个可以直接用的横版平台角色脚本——涵盖了重力、跳跃（可变高度）、水平移动、翻转、动画切换。</p>
        <div class="mb-4"><Code language="gdscript" :code="fullPlatformerCode" title="player_full.gd" /></div></section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>move_and_slide() 工作原理</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">这是 CharacterBody2D 最核心的方法，一次调用就完成"移动 + 碰撞 + 状态更新"三件事：</p>
        <svg viewBox="0 0 720 262" class="w-full h-auto mb-4" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="ms-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" /></marker>
          </defs>
          <rect x="270" y="14" width="180" height="42" rx="8" fill="#3b82f6" />
          <text x="360" y="35" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">① 设置 velocity</text>
          <line x1="360" y1="56" x2="360" y2="76" stroke="#64748b" stroke-width="2" marker-end="url(#ms-arr)" />
          <rect x="270" y="76" width="180" height="42" rx="8" fill="#3b82f6" />
          <text x="360" y="97" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">② move_and_slide()</text>
          <line x1="360" y1="118" x2="360" y2="136" stroke="#64748b" stroke-width="2" marker-end="url(#ms-arr)" />
          <polygon points="360,136 440,164 360,192 280,164" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
          <text x="360" y="158" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">碰到</text>
          <text x="360" y="172" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">障碍物？</text>
          <line x1="280" y1="164" x2="160" y2="164" stroke="#64748b" stroke-width="2" />
          <line x1="160" y1="164" x2="160" y2="194" stroke="#64748b" stroke-width="2" marker-end="url(#ms-arr)" />
          <text x="205" y="160" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">否</text>
          <line x1="440" y1="164" x2="560" y2="164" stroke="#64748b" stroke-width="2" />
          <line x1="560" y1="164" x2="560" y2="194" stroke="#64748b" stroke-width="2" marker-end="url(#ms-arr)" />
          <text x="508" y="160" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">是</text>
          <rect x="85" y="196" width="150" height="40" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
          <text x="160" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#334155">直接移动到位</text>
          <rect x="470" y="196" width="180" height="40" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
          <text x="560" y="208" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#15803d">是 — 沿表面滑动</text>
          <text x="560" y="226" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#15803d">更新 is_on_floor() / is_on_wall()</text>
          <text x="360" y="254" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#1d4ed8">③ 调用后，is_on_floor() / is_on_wall() / get_last_slide_collision() 才更新</text>
        </svg>
        <div class="mb-4"><Code language="gdscript" :code="moveAndSlideCode" title="move_and_slide_explained.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">move_and_slide()</code> <strong>之前</strong>读 <code class="bg-amber-100 px-1 rounded text-xs font-mono">is_on_floor()</code>——上一帧的地面状态是<strong>过期的</strong>。先移动、再判断，顺序不能反。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>move_and_slide vs move_and_collide</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">特性</th><th class="px-4 py-2 border font-semibold text-slate-700">move_and_slide()</th><th class="px-4 py-2 border font-semibold text-slate-700">move_and_collide()</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">碰撞响应</td><td class="px-4 py-2 border"><strong>沿表面滑动</strong>（自动）</td><td class="px-4 py-2 border"><strong>停下来</strong>，返回碰撞信息</td></tr>
              <tr><td class="px-4 py-2 border">地面检测</td><td class="px-4 py-2 border">is_on_floor() 自动更新</td><td class="px-4 py-2 border">需要手动判断</td></tr>
              <tr><td class="px-4 py-2 border">使用场景</td><td class="px-4 py-2 border">平台角色（90% 情况）</td><td class="px-4 py-2 border">需要精确碰撞响应的场景</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 text-sm">简单规则：<strong>角色移动用 move_and_slide()，需要知道"撞到了什么"用 move_and_collide()。</strong></p></section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>常见问题</h2><div class="space-y-3 text-slate-600 text-sm"><div class="bg-slate-50 rounded-lg p-3"><strong>Q: 角色卡在墙上抖动？</strong> A: 把 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">floor_max_angle</code> 设小一点（如 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">deg_to_rad(30)</code>）。或者检查 CollisionShape2D 是否突出到角色外面。</div><div class="bg-slate-50 rounded-lg p-3"><strong>Q: is_on_floor() 在斜坡上不触发？</strong> A: 增大 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">floor_max_angle</code>（默认 45°=0.785 弧度）。如果斜坡 > 45°，用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">deg_to_rad(60)</code>。</div><div class="bg-slate-50 rounded-lg p-3"><strong>Q: 跳跃有时失灵？</strong> A: 先在 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">_process</code> 里 print 一下 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">is_on_floor()</code>，很可能是地面判断用了<strong>旧帧</strong>——把跳跃逻辑放到 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">move_and_slide()</code> 之后。</div></div></section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键属性</h2><div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">方法/属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">velocity: Vector2</td><td class="px-4 py-2 border">运动向量——在 _physics_process 中修改，然后调 move_and_slide()</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">move_and_slide()</td><td class="px-4 py-2 border">执行移动+碰撞处理</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">is_on_floor()</td><td class="px-4 py-2 border">是否在地面上（跳跃判断）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">is_on_wall()</td><td class="px-4 py-2 border">是否碰墙（墙跳）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">floor_max_angle</td><td class="px-4 py-2 border">最大可行走坡度（弧度，默认45°≈0.785）</td></tr></tbody></table></div></section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的 player.gd</h2><p class="text-slate-600 mb-3 leading-relaxed">本文档的所有概念（重力、跳跃缓冲、coyote time、可变跳跃高度、空中加速度）都在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/player.gd</code> 中有完整实现。核心移动逻辑（精简提取）：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="player.gd — _process_normal 精简提取" /></div>
        <ul class="space-y-2 text-slate-600 mb-4"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Phase 1 (本页)</strong> — 重力 + move_and_slide() → 看上面这段</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Phase 2</strong> — 加上跳跃 + coyote time → 看 blitz player.gd:_process_normal()</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Phase 3</strong> — 冲刺无敌帧 + 可变跳跃高度 + 状态机 → 看 blitz player.gd 完整实现</span></li></ul><aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 学习建议：</strong>不要在浏览器里读完整个文件。打开 Godot → 开一个变量（如 gravity）→ 看文档理解含义 → 改值 → F5 看效果 → 继续下一个变量。</p></aside></section>

      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>CharacterBody2D = 代码控制的物理体</strong>——你改 velocity，引擎负责碰撞与滑动</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>标准流程：改 velocity → <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">move_and_slide()</code> → 再读 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">is_on_floor()</code>（顺序不能反）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>水平移动用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">move_toward()</code> 做加减速，有惯性手感更好（Blitz 做法）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>重力只在<strong>非地面</strong>时施加；跳跃 = 直接把 velocity.y 设为负数</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>斜坡/抖动问题查 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">floor_max_angle</code> 和 CollisionShape2D 是否超出身体</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-5-collision2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：碰撞体</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-7-rigidbody2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：RigidBody2D →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"完整脚本"},{id:"sec-3",name:"move_and_slide原理"},{id:"sec-4",name:"slide vs collide"},{id:"sec-5",name:"常见问题"},{id:"sec-6",name:"关键属性"},{id:"sec-7",name:"🕹️ Blitz 实战"},{id:"sec-8",name:"小结"}]
const charCode = `extends CharacterBody2D
@export var speed: float = 300.0
@export var jump_velocity: float = -400.0
var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")
@onready var sprite: Sprite2D = $Sprite2D
func _physics_process(delta: float) -> void:
    if not is_on_floor(): velocity.y += gravity * delta
    if Input.is_action_just_pressed("jump") and is_on_floor(): velocity.y = jump_velocity
    var dir: float = Input.get_axis("move_left", "move_right")
    velocity.x = dir * speed
    if dir != 0: sprite.flip_h = dir < 0
    move_and_slide()`
const fullPlatformerCode = `extends CharacterBody2D
@export var speed: float = 300.0
@export var jump_velocity: float = -400.0
@export var acceleration: float = 1500.0
@export var air_acceleration: float = 800.0
@export var coyote_time: float = 0.1
@export var jump_buffer_time: float = 0.1
var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")
var coyote_timer: float = 0.0
var jump_buffer_timer: float = 0.0
@onready var sprite: Sprite2D = $Sprite2D
@onready var anim: AnimationPlayer = $AnimationPlayer
func _physics_process(delta: float) -> void:
    _apply_gravity(delta); _handle_jump(delta); _handle_move(delta)
    _update_animation(); move_and_slide()
func _apply_gravity(delta: float) -> void:
    if not is_on_floor(): velocity.y += gravity * delta; coyote_timer -= delta
    else: coyote_timer = coyote_time
func _handle_jump(_delta: float) -> void:
    jump_buffer_timer -= _delta
    if Input.is_action_just_pressed("jump"): jump_buffer_timer = jump_buffer_time
    if jump_buffer_timer > 0 and coyote_timer > 0:
        velocity.y = jump_velocity; coyote_timer = 0.0; jump_buffer_timer = 0.0
    if Input.is_action_just_released("jump") and velocity.y < 0: velocity.y *= 0.5
func _handle_move(delta: float) -> void:
    var dir: float = Input.get_axis("move_left", "move_right")
    var accel: float = acceleration if is_on_floor() else air_acceleration
    velocity.x = move_toward(velocity.x, dir * speed, accel * delta)
    if dir != 0: sprite.flip_h = dir < 0
func _update_animation() -> void:
    if not is_on_floor(): anim.play("jump")
    elif absf(velocity.x) > 10: anim.play("run")
    else: anim.play("idle")`
const moveAndSlideCode = `func _physics_process(delta: float) -> void:
    velocity.y += gravity * delta
    move_and_slide()
    # ↑ 调用后，下面这些方法才更新：
    # is_on_floor() / is_on_wall() / is_on_ceiling()
    # get_last_slide_collision() — 最后一次碰撞的详细信息`
const blitzCode = `# === blitz player.gd — _process_normal() 核心移动（Phase 1 基础）===
func _process_normal(delta: float) -> void:
    # ── 水平移动：move_toward 做加减速（有惯性）──
    var input_dir: float = Input.get_axis("move_left", "move_right")
    if input_dir != 0.0:
        facing_right = input_dir > 0.0
        velocity.x = move_toward(velocity.x, input_dir * move_speed, move_accel * delta)
    else:
        velocity.x = move_toward(velocity.x, 0.0, move_decel * delta)

    # ── 重力：只有空中才加速下落，且有最大下落速度 ──
    if not is_on_floor():
        velocity.y += gravity * delta
        velocity.y = min(velocity.y, max_fall_speed)

    # ── 跳跃：jump buffer + coyote time 组合 ──
    if _jump_buffer_timer > 0.0 and _coyote_timer > 0.0:
        velocity.y = jump_velocity
        _jump_buffer_timer = 0.0
        _coyote_timer = 0.0

    # ── 关键：move_and_slide() 之后 is_on_floor() 才是本帧最新值 ──
    move_and_slide()`
</script>
