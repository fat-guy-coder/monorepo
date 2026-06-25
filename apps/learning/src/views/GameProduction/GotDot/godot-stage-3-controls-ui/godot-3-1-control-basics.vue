<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Control 基类</h1><p class="text-sm text-slate-500 mt-1">锚点与边距——Godot UI 的布局基石</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🖼️</span>Control = UI 节点的基类</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Control ≈ <strong>CSS 的 div</strong>——所有 UI 元素的根。它有<strong>锚点（Anchor）≈ top/left/right/bottom</strong>、<strong>边距（Margin / Offset）≈ margin/padding</strong>、<strong>大小标志 ≈ width/height</strong>。如果你会 CSS Flexbox，Control 的锚点系统就是同一套思维。</p></aside>
        <p class="text-slate-600 leading-relaxed">Godot 的所有 UI 节点（Button、Label、Panel、ScrollContainer 等）都继承自 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">Control</code>。Control 的布局系统基于<strong>锚点 + 偏移</strong>——理解了这个就等于理解了整个 UI 系统。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>锚点（Anchor）——控制元素如何跟随父容器</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">锚点定义了 Control 的<strong>四条边到父容器四条边的"绑定关系"</strong>。四个锚点值（left/top/right/bottom）范围 0~1，表示距离父容器对应边的百分比。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">锚点设置</th><th class="px-4 py-2 border font-semibold text-slate-700">效果</th><th class="px-4 py-2 border font-semibold text-slate-700">前端类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">(0,0)-(0,0)</td><td class="px-4 py-2 border">固定在左上角，大小不变</td><td class="px-4 py-2 border font-mono text-xs">position:absolute; left:0; top:0</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">(0,0)-(1,1)</td><td class="px-4 py-2 border"><strong>铺满整个父容器</strong>（全屏）</td><td class="px-4 py-2 border font-mono text-xs">width:100%; height:100%</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">(0.5,0)-(0.5,1)</td><td class="px-4 py-2 border">固定在水平中央，高度拉伸</td><td class="px-4 py-2 border font-mono text-xs">left:50%; width:auto</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">(1,0)-(1,1)</td><td class="px-4 py-2 border">固定在右侧，高度拉伸</td><td class="px-4 py-2 border font-mono text-xs">position:fixed; right:0</td></tr></tbody></table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 可视化操作：</strong>在编辑器中选中 Control → Inspector → Layout 菜单 → 选择预设锚点（如"Full Rect"全屏、"Center Top"顶部居中）。也可以手动拖拽锚点——编辑器左上角的绿色小点。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>边距（Offset/Margin）——from 锚点到实际位置</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">锚点定义了"理论上在哪里"，<strong>偏移量</strong>定义了"实际在哪里"。四个偏移（offset_left/top/right/bottom）是从<strong>对应锚点</strong>到实际边的像素距离。正值向中心缩小，负值向外扩大。</p>
        <div class="mb-4"><Code language="gdscript" :code="anchorCode" title="control_anchor.gd" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Size Flags——控制大小行为</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">标志</th><th class="px-4 py-2 border font-semibold text-slate-700">效果</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">SIZE_FILL</td><td class="px-4 py-2 border">填充父容器剩余空间（≈ flex-grow: 1）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">SIZE_EXPAND</td><td class="px-4 py-2 border">扩展父容器大小（推动父容器变大）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">SIZE_SHRINK_CENTER</td><td class="px-4 py-2 border">收缩到内容大小并居中</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">SIZE_SHRINK_END</td><td class="px-4 py-2 border">收缩到内容大小并靠右/底部</td></tr></tbody></table></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>锚点 ≈ CSS position</strong>——4个值控制元素跟随父容器的哪条边</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>偏移量 ≈ CSS margin</strong>——从锚点位置向内或向外偏移像素</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Size Flags ≈ CSS flex-grow / flex-shrink</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>编辑器中可视化调整</strong>——拖拽绿色锚点和蓝色边距</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-12-particle2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：粒子效果</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-2-theme-system" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Theme 主题系统 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Control基类"},{id:"sec-2",name:"锚点"},{id:"sec-3",name:"边距"},{id:"sec-4",name:"Size Flags"},{id:"sec-5",name:"小结"}]
const anchorCode = `# 铺满父容器（全屏 UI）
anchor_left = 0.0; anchor_top = 0.0
anchor_right = 1.0; anchor_bottom = 1.0
# 偏移为 0——紧贴四边
offset_left = 0; offset_top = 0
offset_right = 0; offset_bottom = 0

# 居中 200x100 的按钮
anchor_left = 0.5; anchor_top = 0.5
anchor_right = 0.5; anchor_bottom = 0.5
offset_left = -100; offset_top = -50   # 向左上偏移一半宽高
offset_right = 100; offset_bottom = 50  # 向右下偏移一半宽高`
</script>
