<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Theme 主题系统</h1><p class="text-sm text-slate-500 mt-1">StyleBox · Theme 资源——Godot UI 的"CSS"</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎨</span>Theme ≈ CSS 样式表</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Theme ≈ <strong>CSS 全局样式表</strong>——定义默认字体、颜色、按钮样式。一个 Theme 资源可以应用到根 Control，所有子 Control 自动继承。≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">:root { --color-primary: blue; }</code> 的 Godot 版。</p></aside>
        <p class="text-slate-600 leading-relaxed">Theme 是一个 <strong>.tres 资源文件</strong>，包含颜色、字体、StyleBox 等样式定义。应用 Theme 后，所有 UI 节点自动使用这些样式——不需要每个节点单独设置。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>StyleBox——背景/边框/圆角</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">StyleBox 定义了 Control 的<strong>视觉外观</strong>——背景色、边框、圆角、阴影。≈ CSS 的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">background + border + border-radius + box-shadow</code> 合集。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">StyleBox 类型</th><th class="px-4 py-2 border font-semibold text-slate-700">用途</th><th class="px-4 py-2 border font-semibold text-slate-700">CSS 类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">StyleBoxFlat</td><td class="px-4 py-2 border">纯色背景+圆角+边框+阴影</td><td class="px-4 py-2 border font-mono text-xs">background + border-radius + box-shadow</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">StyleBoxTexture</td><td class="px-4 py-2 border">纹理图片做背景（可九宫格）</td><td class="px-4 py-2 border font-mono text-xs">background-image</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">StyleBoxLine</td><td class="px-4 py-2 border">单线（分隔线）</td><td class="px-4 py-2 border font-mono text-xs">border-left/right</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">StyleBoxEmpty</td><td class="px-4 py-2 border">透明占位（无背景）</td><td class="px-4 py-2 border font-mono text-xs">background: transparent</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="gdscript" :code="styleboxCode" title="stylebox_flat.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Theme 继承与覆盖</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Theme 可以<strong>层级覆盖</strong>——根 Control 设置全局 Theme → 子 Control 可覆盖单个样式项。≈ <strong>CSS 的级联（Cascade）</strong>——更具体的规则覆盖更宽泛的规则。</p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 工作流：</strong>创建 Theme 资源 → 在 Inspector 中分配 → 设置 Default Font / Button Styles / Color Palette → 应用到根 Control → 全局生效。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Theme ≈ CSS 全局样式</strong>——.tres 资源文件，层级继承</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>StyleBoxFlat ≈ background + border-radius</strong>——最常用的背景样式</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Theme 可以覆盖——子 Control 可以覆盖父 Theme 的单项</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-1-control-basics" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Control 基类</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-3-container-nodes" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：容器布局 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Theme概述"},{id:"sec-2",name:"StyleBox"},{id:"sec-3",name:"继承与覆盖"},{id:"sec-4",name:"小结"}]
const styleboxCode = `# 代码中创建 StyleBoxFlat（纯色+圆角面板背景）
var style := StyleBoxFlat.new()
style.bg_color = Color(0.1, 0.1, 0.15, 0.9)  # 深色半透明背景
style.corner_radius_top_left = 12
style.corner_radius_top_right = 12
style.corner_radius_bottom_left = 12
style.corner_radius_bottom_right = 12
style.border_width_left = 2
style.border_color = Color.BLUE
# 应用到 Panel
$Panel.add_theme_stylebox_override("panel", style)`
</script>
