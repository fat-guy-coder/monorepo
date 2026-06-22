<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">RigidBody2D</h1><p class="text-sm text-slate-500 mt-1">物理引擎控制的 2D 刚体——重力、碰撞、力与冲量</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-7</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚽</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>RigidBody2D ≈ 把 div 交给<strong>物理引擎（如 Matter.js）</strong>来控制——你施加力/冲量，物理引擎自动计算位置、速度、旋转。≈ CSS 动画的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">@keyframes</code> 物理版。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">vs CharacterBody2D：CharacterBody 你写代码控制每帧移动多少；RigidBody 你施加<strong>力/冲量</strong>，物理引擎算位置。箱子、滚石、弹球、需要真实物理的物体用 RigidBody。</p>
        <div class="mb-4"><Code language="gdscript" :code="rigidCode" title="rigid_body_2d.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>施加力 vs 施加冲量</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">apply_central_force()</th><th class="px-4 py-2 border font-semibold text-slate-700">apply_central_impulse()</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">效果</td><td class="px-4 py-2 border">持续施加力（如火箭推进）</td><td class="px-4 py-2 border">瞬间改变速度（如跳跃、爆炸）</td></tr>
              <tr><td class="px-4 py-2 border">类比</td><td class="px-4 py-2 border">引擎持续推车</td><td class="px-4 py-2 border">一脚踢飞足球</td></tr>
              <tr><td class="px-4 py-2 border">公式</td><td class="px-4 py-2 border font-mono text-xs">F = ma（每帧累加）</td><td class="px-4 py-2 border font-mono text-xs">Δv = F/m（直接加）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚙️</span>关键属性</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">mass</td><td class="px-4 py-2 border">质量（影响惯性和碰撞力度）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">gravity_scale</td><td class="px-4 py-2 border">重力缩放（0=无重力，1=正常，-1=反重力）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">freeze</td><td class="px-4 py-2 border">冻结物理（暂停模拟，节省性能）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">linear_velocity</td><td class="px-4 py-2 border">当前线速度（可读写）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">angular_velocity</td><td class="px-4 py-2 border">当前角速度（旋转速度）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">linear_damp</td><td class="px-4 py-2 border">线性阻尼（0=无摩擦，越大越快停下）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-6-characterbody2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：CharacterBody2D</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-8-tilemap" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：TileMap →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"力 vs 冲量"},{id:"sec-3",name:"关键属性"}]
const rigidCode = `extends RigidBody2D
func _ready() -> void:
    apply_central_impulse(Vector2(0, -500))     # 跳跃冲量
    apply_central_force(Vector2(100, 0))         # 持续推力
    gravity_scale = 0.5   # 半重力（羽毛效果）
    freeze = false        # 解冻物理模拟

# 每物理帧回调——在此修改物理状态
func _integrate_forces(state: PhysicsDirectBodyState2D) -> void:
    var vel := state.linear_velocity
    state.linear_velocity = vel.limit_length(200.0)  # 限制最大速度`
</script>
