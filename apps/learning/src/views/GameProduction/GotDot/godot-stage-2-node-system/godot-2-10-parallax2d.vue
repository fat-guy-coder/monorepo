<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Parallax2D</h1><p class="text-sm text-slate-500 mt-1">视差滚动——多层背景以不同速度移动</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-10</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🌄</span>概述</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Parallax2D ≈ <strong>CSS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">background-attachment: fixed</code> + 多层不同速度</strong>——远处的山移动慢（近处），近处的树移动快。≈ 游戏里的"多层卷轴效果"。</p></aside>
<div class="mb-4"><Code language="gdscript" :code="parallaxCode" title="parallax2d.gd" /></div></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-9-camera2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Camera2D</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-11-audiostream" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：AudioStream →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"}]
const parallaxCode = `# Parallax2D + ParallaxLayer ——多层视差背景
# 编辑器操作:
# 1. Parallax2D → 添加 ParallaxLayer 子节点
# 2. 每个 ParallaxLayer → 添加 Sprite2D 作为子节点
# 3. ParallaxLayer.motion_scale —设置移动速度倍率
#    (=0,0) 固定不动，(0.5,0) 半速，(1,1) 和相机同速，(2,2) 比相机快`
</script>
