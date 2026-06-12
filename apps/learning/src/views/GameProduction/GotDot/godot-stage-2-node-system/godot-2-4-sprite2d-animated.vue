<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Sprite2D 与 AnimatedSprite2D</h1><p class="text-sm text-slate-500 mt-1">精灵渲染与帧动画——显示图片、播放动画序列</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-4</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🖼️</span>Sprite2D——显示一张图</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Sprite2D ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">&lt;img src="player.png" style="position:absolute" /&gt;</code>——在画布上放一张图，可以移动、旋转、缩放、调色。</p></aside>
<div class="mb-4"><Code language="gdscript" :code="spriteCode" title="sprite2d.gd" /></div></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎬</span>AnimatedSprite2D——帧动画</h2><p class="text-slate-600 mb-3 leading-relaxed">需要先创建 <strong>SpriteFrames 资源</strong>（包含多张纹理的不同动画）。然后在代码中切换和播放。</p>
<div class="mb-4"><Code language="gdscript" :code="animCode" title="animated_sprite2d.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚙️</span>关键属性</h2><div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><tr class="bg-slate-100"><th class="px-4 py-2 border">属性</th><th class="px-4 py-2 border">说明</th></tr><tr><td class="px-4 py-2 border font-mono text-xs">texture</td><td class="px-4 py-2 border">要显示的纹理（Sprite2D）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">modulate</td><td class="px-4 py-2 border"><strong>颜色叠加</strong>（Color——调色/透明度/闪烁）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">flip_h / flip_v</td><td class="px-4 py-2 border">水平/垂直翻转</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">centered</td><td class="px-4 py-2 border">是否以中心点为原点（默认 true）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">offset</td><td class="px-4 py-2 border">纹理相对于节点位置的偏移</td></tr></tbody></table></div></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-3-node2d-basics" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Node2D 基类</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-5-collision2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：碰撞体 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Sprite2D"},{id:"sec-2",name:"AnimatedSprite2D"},{id:"sec-3",name:"关键属性"}]
const spriteCode = `# Sprite2D ——显示一张纹理
@onready var sprite: Sprite2D = $Sprite2D
func _ready() -> void:
    sprite.texture = preload("res://player.png")
    sprite.modulate = Color.RED       # 叠加红色
    sprite.flip_h = true              # 水平翻转（角色转向）
    sprite.position = Vector2(400, 300)`
const animCode = `@onready var anim: AnimatedSprite2D = $AnimatedSprite2D
func _ready() -> void:
    anim.sprite_frames = preload("res://player_frames.tres")
    anim.play("idle")               # 播放 idle 动画
func _physics_process(delta: float) -> void:
    if velocity.x != 0:
        anim.play("run")            # 切换为跑步动画
        anim.flip_h = velocity.x < 0  # 根据方向翻转
    else:
        anim.play("idle")
# animation_finished 信号——动画播完回调
anim.animation_finished.connect(func(): anim.play("idle"))`
</script>
