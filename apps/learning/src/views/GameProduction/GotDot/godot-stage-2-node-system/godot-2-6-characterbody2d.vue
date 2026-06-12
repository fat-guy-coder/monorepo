<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">CharacterBody2D</h1><p class="text-sm text-slate-500 mt-1">代码控制的 2D 角色——玩家、敌人的物理基类</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-6</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🏃</span>概述</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>CharacterBody2D ≈ 一个自带碰撞检测的 div——你写代码控制位置，它自动处理"碰到墙就停"。核心方法 <code class="bg-purple-100 px-1 rounded text-xs font-mono">move_and_slide()</code>。</p></aside>
<div class="mb-4"><Code language="gdscript" :code="charCode" title="character_body_2d.gd" /></div></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>关键属性和方法</h2><div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><tr class="bg-slate-100"><th class="px-4 py-2 border">方法/属性</th><th class="px-4 py-2 border">说明</th></tr><tr><td class="px-4 py-2 border font-mono text-xs">velocity: Vector2</td><td class="px-4 py-2 border">运动向量——在 _physics_process 中修改，然后调 move_and_slide()</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">move_and_slide()</td><td class="px-4 py-2 border">执行移动+碰撞处理</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">is_on_floor()</td><td class="px-4 py-2 border">是否在地面上（跳跃判断）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">is_on_wall()</td><td class="px-4 py-2 border">是否碰墙（墙跳）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">floor_max_angle</td><td class="px-4 py-2 border">最大可行走坡度（弧度，默认45°≈0.785）</td></tr></tbody></table></div></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-5-collision2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：碰撞体</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-7-rigidbody2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：RigidBody2D →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"关键属性"}]
const charCode = `extends CharacterBody2D
@export var speed: float = 300.0
@export var jump_velocity: float = -400.0
var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")
@onready var sprite: Sprite2D = $Sprite2D

func _physics_process(delta: float) -> void:
    if not is_on_floor():                       # 重力
        velocity.y += gravity * delta
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = jump_velocity              # 跳跃
    var dir: float = Input.get_axis("move_left", "move_right")
    velocity.x = dir * speed                    # 水平移动
    if dir != 0: sprite.flip_h = dir < 0         # 翻转
    move_and_slide()                            # 执行移动！`
</script>
