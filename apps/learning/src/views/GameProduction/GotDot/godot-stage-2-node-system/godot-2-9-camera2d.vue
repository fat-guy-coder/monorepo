<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Camera2D</h1><p class="text-sm text-slate-500 mt-1">2D 相机——控制玩家视野</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-9</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📷</span>概述</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Camera2D ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">overflow: hidden</code> 的视口——决定玩家看到游戏世界的哪一部分。跟随玩家、限制边界、平滑过渡。</p></aside>
<div class="mb-4"><Code language="gdscript" :code="cameraCode" title="camera2d.gd" /></div></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚙️</span>关键属性</h2><div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><tr class="bg-slate-100"><th class="px-4 py-2 border">属性</th><th class="px-4 py-2 border">说明</th></tr><tr><td class="px-4 py-2 border font-mono text-xs">enabled</td><td class="px-4 py-2 border">是否激活（场景可有多个 Camera2D）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">zoom</td><td class="px-4 py-2 border">缩放（Vector2，1.0=正常）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">limit_left/right/top/bottom</td><td class="px-4 py-2 border">相机边界（限制视野范围）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">position_smoothing_enabled</td><td class="px-4 py-2 border">平滑跟随（推荐开启）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">drag_horizontal_enabled</td><td class="px-4 py-2 border">水平拖拽边距</td></tr></tbody></table></div></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-8-tilemap" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：TileMap</RouterLink></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"关键属性"}]
const cameraCode = `# Camera2D ——跟随玩家，限制边界
@onready var camera: Camera2D = $Camera2D
func _ready() -> void:
    camera.enabled = true
    camera.zoom = Vector2(1.5, 1.5)               # 放大1.5倍
    camera.limit_left = 0; camera.limit_top = 0     # 边界
    camera.limit_right = 3200; camera.limit_bottom = 2400
    camera.position_smoothing_enabled = true         # 平滑跟随

# 震动效果
func shake(intensity: float, duration: float) -> void:
    var tween: Tween = create_tween()
    tween.tween_method(func(offset: Vector2): camera.offset = offset,
        Vector2(intensity, intensity), Vector2.ZERO, duration)`
</script>
