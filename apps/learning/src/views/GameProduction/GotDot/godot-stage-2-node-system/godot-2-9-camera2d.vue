<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Camera2D</h1><p class="text-sm text-slate-500 mt-1">2D 相机——控制玩家视野、跟随、震动效果</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-9</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📷</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Camera2D ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">overflow: hidden</code> 的视口——决定玩家看到游戏世界的哪一部分。跟随玩家、限制边界、平滑过渡。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="cameraCode" title="camera2d.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>跟随玩家的两种方式</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">方式1：Camera2D 作为玩家子节点（最简单）</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">直接把 Camera2D 拖到 Player 节点下。相机自动跟随，无需代码。缺点：相机跟随"刚性"——无平滑、无边界限制。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">方式2：代码控制（推荐）</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">Camera2D 独立于 Player，在代码中更新 position。支持平滑、边界限制、震动效果。</p>
        <div class="mb-4"><Code language="gdscript" :code="cameraFollowCode" title="camera_follow.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚙️</span>关键属性</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">enabled</td><td class="px-4 py-2 border">是否激活（场景可有多个 Camera2D，同时只有一个 active）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">zoom</td><td class="px-4 py-2 border">缩放（Vector2，1.0=正常，2.0=放大）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">limit_left/right/top/bottom</td><td class="px-4 py-2 border">相机边界（限制视野范围，地图边界）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">position_smoothing_enabled</td><td class="px-4 py-2 border">平滑跟随（推荐开启，避免画面抖动）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">position_smoothing_speed</td><td class="px-4 py-2 border">平滑速度（值越小越平滑，推荐 5-10）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-8-tilemap" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：TileMap</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-10-parallax2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Parallax2D →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"跟随方式"},{id:"sec-3",name:"关键属性"}]
const cameraCode = `# Camera2D ——跟随玩家，限制边界
@onready var camera: Camera2D = $Camera2D
func _ready() -> void:
    camera.enabled = true; camera.zoom = Vector2(1.5, 1.5)
    camera.limit_left = 0; camera.limit_top = 0
    camera.limit_right = 3200; camera.limit_bottom = 2400
    camera.position_smoothing_enabled = true

# 震动效果（tween offset）
func shake(intensity: float, duration: float) -> void:
    var tween: Tween = create_tween()
    tween.tween_method(func(o: Vector2): camera.offset = o,
        Vector2(intensity, intensity), Vector2.ZERO, duration)`
const cameraFollowCode = `# 代码控制跟随——平滑 + 边界
@onready var camera: Camera2D = $Camera2D
@onready var player: Player = $"../Player"

func _process(_delta: float) -> void:
    camera.global_position = player.global_position

# 更平滑的写法（lerp 插值）
func _process(_delta: float) -> void:
    var target := player.global_position
    camera.global_position = camera.global_position.lerp(target, 0.1)`
</script>
