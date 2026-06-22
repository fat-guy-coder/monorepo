<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">粒子效果</h1><p class="text-sm text-slate-500 mt-1">GPUParticles2D / CPUParticles2D——火焰、烟雾、爆炸、魔法特效</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-12</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">✨</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>粒子系统 ≈ <strong>CSS 粒子动画库（tsParticles / particles.js）</strong>——用参数描述粒子行为，引擎自动模拟成百上千个粒子。≈ Canvas 2D 粒子效果，但 GPU 加速。</p></aside>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">节点</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th><th class="px-4 py-2 border font-semibold text-slate-700">适用场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs font-semibold">GPUParticles2D</td><td class="px-4 py-2 border"><strong>GPU 加速（推荐）</strong></td><td class="px-4 py-2 border">大量粒子（火焰、烟雾、雨、雪）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">CPUParticles2D</td><td class="px-4 py-2 border">CPU 计算——兼容性好</td><td class="px-4 py-2 border">少量粒子或老设备兼容</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="gdscript" :code="particleCode" title="particles2d.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>Process Material 粒子材质</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">粒子行为由 <strong>Process Material</strong> 控制——这是粒子效果的核心。在 Inspector 中创建 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">ParticleProcessMaterial</code>，然后调整参数：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">参数</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">spread</td><td class="px-4 py-2 border">发射角度范围（0=直线，180=全方向）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">gravity</td><td class="px-4 py-2 border">粒子受重力影响的方向和大小</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">initial_velocity_min/max</td><td class="px-4 py-2 border">初始速度范围（随机取值）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">scale_min/max</td><td class="px-4 py-2 border">粒子大小范围</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">color</td><td class="px-4 py-2 border">粒子颜色渐变（可随时间变色）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">lifetime_randomness</td><td class="px-4 py-2 border">生命周期随机波动（0-1，越大越不均匀）</td></tr>
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
              <tr><td class="px-4 py-2 border font-mono text-xs">amount</td><td class="px-4 py-2 border">粒子数量（影响性能，大数量用 GPU）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">lifetime</td><td class="px-4 py-2 border">每个粒子的存活时间（秒）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">one_shot</td><td class="px-4 py-2 border">true=一次发射完（爆炸），false=持续发射（火焰）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">explosiveness</td><td class="px-4 py-2 border">0=持续发射，1=瞬间全部发射</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">emitting</td><td class="px-4 py-2 border">代码控制：true=发射中，false=停止</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 推荐工作流：</strong>编辑器中视觉调试参数（所见即所得），代码只控制 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">emitting</code> 开关。</p></aside>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-11-audiostream" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：AudioStream</RouterLink><span class="text-slate-300">阶段 2 完成！下一阶段：UI 系统 →</span></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"粒子材质"},{id:"sec-3",name:"关键属性"}]
const particleCode = `# GPUParticles2D ——代码控制
@onready var particles: GPUParticles2D = $GPUParticles2D
func _ready() -> void:
    particles.emitting = false  # 默认不发射
func explode() -> void:
    particles.emitting = true   # one_shot=true 时一次性爆
func start_fire() -> void:
    particles.emitting = true   # one_shot=false 时持续发射
func stop_fire() -> void:
    particles.emitting = false`
</script>
