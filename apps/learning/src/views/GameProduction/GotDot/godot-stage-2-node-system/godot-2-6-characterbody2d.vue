<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">CharacterBody2D</h1><p class="text-sm text-slate-500 mt-1">代码控制的 2D 角色——玩家、敌人的物理基类</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🏃</span>概述</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>CharacterBody2D ≈ 一个自带碰撞检测的 div——你写代码控制位置，它自动处理"碰到墙就停"。核心方法 <code class="bg-purple-100 px-1 rounded text-xs font-mono">move_and_slide()</code>。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="charCode" title="character_body_2d.gd" /></div></section>
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>完整横版动作脚本</h2><p class="text-slate-600 mb-3 leading-relaxed">这是一个可以直接用的横版平台角色脚本——涵盖了重力、跳跃（可变高度）、水平移动、翻转、动画切换。</p>
        <div class="mb-4"><Code language="gdscript" :code="fullPlatformerCode" title="player_full.gd" /></div></section>
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>move_and_slide() 工作原理</h2><p class="text-slate-600 mb-3 leading-relaxed">这是 CharacterBody2D 最核心的方法。它做了 3 件事：</p><ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed"><li><strong>移动</strong>：根据 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">velocity</code> 移动角色</li><li><strong>碰撞检测</strong>：遇到 StaticBody2D/RigidBody2D/TileMap 时<strong>沿表面滑动</strong></li><li><strong>更新状态</strong>：调用后 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">is_on_floor()/is_on_wall()</code> 才更新</li></ol>
        <div class="mb-4"><Code language="gdscript" :code="moveAndSlideCode" title="move_and_slide_explained.gd" /></div></section>
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
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>常见问题</h2><div class="space-y-3 text-slate-600 text-sm"><div class="bg-slate-50 rounded-lg p-3"><strong>Q: 角色卡在墙上抖动？</strong> A: 把 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">floor_max_angle</code> 设小一点（如 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">deg_to_rad(30)</code>）。或者检查 CollisionShape2D 是否突出到角色外面。</div><div class="bg-slate-50 rounded-lg p-3"><strong>Q: is_on_floor() 在斜坡上不触发？</strong> A: 增大 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">floor_max_angle</code>（默认 45°=0.785 弧度）。如果斜坡 > 45°，用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">deg_to_rad(60)</code>。</div></div></section>
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键属性</h2><div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">方法/属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">velocity: Vector2</td><td class="px-4 py-2 border">运动向量——在 _physics_process 中修改，然后调 move_and_slide()</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">move_and_slide()</td><td class="px-4 py-2 border">执行移动+碰撞处理</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">is_on_floor()</td><td class="px-4 py-2 border">是否在地面上（跳跃判断）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">is_on_wall()</td><td class="px-4 py-2 border">是否碰墙（墙跳）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">floor_max_angle</td><td class="px-4 py-2 border">最大可行走坡度（弧度，默认45°≈0.785）</td></tr></tbody></table></div></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-5-collision2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：碰撞体</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-7-rigidbody2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：RigidBody2D →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"完整脚本"},{id:"sec-3",name:"move_and_slide原理"},{id:"sec-4",name:"slide vs collide"},{id:"sec-5",name:"常见问题"},{id:"sec-6",name:"关键属性"}]
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
</script>
