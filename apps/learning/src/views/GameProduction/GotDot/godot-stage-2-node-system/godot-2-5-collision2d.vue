<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">碰撞体</h1><p class="text-sm text-slate-500 mt-1">CollisionShape2D / Area2D / StaticBody2D——检测与阻挡</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-5</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🛡️</span>三种碰撞节点</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>StaticBody2D ≈ 墙壁/地板（不动），CharacterBody2D ≈ 玩家（代码控制移动），RigidBody2D ≈ 足球（物理引擎控制），Area2D ≈ 检测区/触发器（进入范围就触发事件，不产生物理碰撞）。</p></aside>
<div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border">节点</th><th class="px-4 py-2 border">用途</th><th class="px-4 py-2 border">移动方式</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs font-semibold">StaticBody2D</td><td class="px-4 py-2 border">墙壁、地板、平台</td><td class="px-4 py-2 border">不移动（编辑器放置）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs font-semibold">CharacterBody2D</td><td class="px-4 py-2 border">玩家、敌人（代码控制）</td><td class="px-4 py-2 border">move_and_slide()</td></tr><tr><td class="px-4 py-2 border font-mono text-xs font-semibold">RigidBody2D</td><td class="px-4 py-2 border">箱子、足球（物理模拟）</td><td class="px-4 py-2 border">物理引擎自动</td></tr><tr><td class="px-4 py-2 border font-mono text-xs font-semibold">Area2D</td><td class="px-4 py-2 border">检测区域/触发器</td><td class="px-4 py-2 border">代码设置 position</td></tr></tbody></table></div></section>

<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>CollisionShape2D——定义形状</h2><p class="text-slate-600 mb-3 leading-relaxed"><strong>碰撞体本身没有形状！</strong>必须添加 CollisionShape2D 子节点来定义碰撞边界。支持矩形、圆形、胶囊形、凸多边形。</p><div class="mb-4"><Code language="gdscript" :code="collisionCode" title="collision.gd" /></div></section>

<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Area2D——检测区域</h2><div class="mb-4"><Code language="gdscript" :code="areaCode" title="area2d.gd" /></div></section>

<section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>碰撞层与遮罩（Layer & Mask）</h2><p class="text-slate-600 mb-3 leading-relaxed"><strong>Layer</strong> = 我属于哪一层 | <strong>Mask</strong> = 我检测哪些层。≈ 网络中的 subnet mask 概念。</p>
<aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>加了碰撞体但检测不到？90% 是 Layer/Mask 没设对。双方要互相在对方的 Mask 中。</p></aside></section>

<section id="sec-blitz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>Blitz 中的碰撞体</h2>
<p class="text-slate-600 mb-3 leading-relaxed">打开 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">apps/game/blitz/</code> 的 .tscn 文件：</p>
<div class="mb-4"><Code language="gdscript" :code="blitzCode" title="Blitz 各节点的碰撞形状" /></div></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-4-sprite2d-animated" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Sprite2D</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-6-characterbody2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：CharacterBody2D →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"三种碰撞体"},{id:"sec-2",name:"CollisionShape2D"},{id:"sec-3",name:"Area2D"},{id:"sec-4",name:"Layer & Mask"}]
const collisionCode = `# StaticBody2D ——静态碰撞体（墙/地板）
# 添加 CollisionShape2D 子节点，选 RectangleShape2D 作为 shape
# Inspector: shape → 设置大小（如 128x16 的地板）`
const areaCode = `# Area2D ——检测区域（进入/离开触发信号）
extends Area2D
func _ready() -> void:
    body_entered.connect(_on_body_entered)
    body_exited.connect(_on_body_exited)
    area_entered.connect(_on_area_entered)
func _on_body_entered(body: Node2D) -> void:
    if body is Player:  # 类型判断
        print("玩家进入")`
const blitzCode = `# === player.tscn — 圆形碰撞体 ===
# Player (CharacterBody2D)
# └── CollisionShape2D → CircleShape2D(r=15)   # 身体碰撞
# └── ParryDetector(Area2D)
#     └── CollisionShape2D → CircleShape2D(r=42) # 格挡感应区
# └── Hurtbox(Area2D)
#     └── CollisionShape2D → CircleShape2D(r=17) # 受击判定

# === enemy.tscn — 矩形碰撞体 ===
# Enemy (CharacterBody2D)
# └── CollisionShape2D → RectangleShape2D(28x30) # 身体碰撞
# └── Hitbox(Area2D)
#     └── CollisionShape2D → RectangleShape2D(32x34) # 受击框

# === bullet.tscn — 小圆形 ===
# Bullet (Area2D)
# └── CollisionShape2D → CircleShape2D(r=5)`
</script>
