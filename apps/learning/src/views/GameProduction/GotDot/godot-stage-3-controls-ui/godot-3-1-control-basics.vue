<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Control 基类</h1><p class="text-sm text-slate-500 mt-1">锚点与边距——Godot UI 的布局基石</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd (HUD)" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 3-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：Control 继承树</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Godot 的 <strong>所有 UI 节点</strong>都最终继承自 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Control</code>。学会 Control，就拿到了整棵 UI 树的"公共 API"——位置、大小、锚点、信号、样式覆盖。</p>
        <svg viewBox="0 0 860 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="ctl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>

          <!-- 连线：Control → 大类 -->
          <line x1="430" y1="82" x2="165" y2="140" stroke="#94a3b8" stroke-width="2" marker-end="url(#ctl-arr)" />
          <line x1="430" y1="82" x2="425" y2="140" stroke="#94a3b8" stroke-width="2" marker-end="url(#ctl-arr)" />
          <line x1="430" y1="82" x2="625" y2="140" stroke="#94a3b8" stroke-width="2" marker-end="url(#ctl-arr)" />
          <line x1="430" y1="82" x2="765" y2="140" stroke="#94a3b8" stroke-width="2" marker-end="url(#ctl-arr)" />

          <!-- 根节点 Control -->
          <rect x="340" y="36" width="180" height="46" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
          <text x="430" y="52" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">Control 基类</text>
          <text x="430" y="70" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">锚点 · 偏移 · 信号 · 样式</text>

          <!-- 四大类 -->
          <rect x="100" y="150" width="130" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="165" y="170" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#ffffff">Container 布局</text>
          <rect x="360" y="150" width="130" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="425" y="170" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#ffffff">BaseButton 按钮</text>
          <rect x="560" y="150" width="130" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="625" y="170" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#ffffff">Label 文本</text>
          <rect x="700" y="150" width="130" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="765" y="170" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#ffffff">Panel 面板</text>

          <!-- 连线：大类 → 具体控件 -->
          <line x1="165" y1="190" x2="105" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="165" y1="190" x2="165" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="165" y1="190" x2="225" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="425" y1="190" x2="385" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="425" y1="190" x2="445" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="425" y1="190" x2="505" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="625" y1="190" x2="585" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="625" y1="190" x2="645" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="765" y1="190" x2="745" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />
          <line x1="765" y1="190" x2="805" y2="238" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ctl-arr)" />

          <!-- 具体控件（叶子） -->
          <rect x="65" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="105" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">HBox</text>
          <rect x="125" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="165" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">VBox</text>
          <rect x="185" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="225" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">Grid</text>
          <rect x="345" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="385" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">Button</text>
          <rect x="405" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="445" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">CheckBox</text>
          <rect x="465" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="505" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">MenuBtn</text>
          <rect x="545" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="585" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">Label</text>
          <rect x="605" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="645" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">RichText</text>
          <rect x="705" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="745" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">Panel</text>
          <rect x="765" y="244" width="80" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
          <text x="805" y="260" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">ColorRect</text>
        </svg>
        <p class="text-xs text-slate-400 mt-2">所有 UI 节点都继承自 Control——共享 position/size、锚点、mouse 信号、主题覆盖等基础能力。</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🖼️</span>Control = UI 节点的基类</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Control ≈ <strong>CSS 的 div</strong>——所有 UI 元素的根。它有<strong>锚点（Anchor）≈ top/left/right/bottom</strong>、<strong>边距（Margin / Offset）≈ margin/padding</strong>、<strong>大小标志 ≈ width/height</strong>。如果你会 CSS Flexbox，Control 的锚点系统就是同一套思维。</p></aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 语法类比：TS / Python / GDScript 三语对照</strong><br/>
        <strong>TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">el.style.left = '50%' // CSS 定位</code><br/>
        <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">widget.place(relx=0.5, y=0) # tkinter 相对定位</code><br/>
        <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">anchor_left = 0.5 # 相对父容器 50%</code><br/>
        关键差异：CSS 定位基于<strong>文档流 + 像素</strong>，Godot 锚点基于<strong>父容器百分比 + 像素偏移</strong>，容器会按锚点自动重排。</p></aside>
        <p class="text-slate-600 leading-relaxed">Godot 的所有 UI 节点（Button、Label、Panel、ScrollContainer 等）都继承自 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">Control</code>。Control 的布局系统基于<strong>锚点 + 偏移</strong>——理解了这个就等于理解了整个 UI 系统。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>锚点（Anchor）——控制元素如何跟随父容器</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">锚点定义了 Control 的<strong>四条边到父容器四条边的"绑定关系"</strong>。四个锚点值（left/top/right/bottom）范围 0~1，表示距离父容器对应边的百分比。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">锚点设置</th><th class="px-4 py-2 border font-semibold text-slate-700">效果</th><th class="px-4 py-2 border font-semibold text-slate-700">前端类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">(0,0)-(0,0)</td><td class="px-4 py-2 border">固定在左上角，大小不变</td><td class="px-4 py-2 border font-mono text-xs">position:absolute; left:0; top:0</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">(0,0)-(1,1)</td><td class="px-4 py-2 border"><strong>铺满整个父容器</strong>（全屏）</td><td class="px-4 py-2 border font-mono text-xs">width:100%; height:100%</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">(0.5,0)-(0.5,1)</td><td class="px-4 py-2 border">固定在水平中央，高度拉伸</td><td class="px-4 py-2 border font-mono text-xs">left:50%; width:auto</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">(1,0)-(1,1)</td><td class="px-4 py-2 border">固定在右侧，高度拉伸</td><td class="px-4 py-2 border font-mono text-xs">position:fixed; right:0</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="gdscript" :code="presetCode" title="set_anchors_preset.gd" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 可视化操作：</strong>在编辑器中选中 Control → Inspector → Layout 菜单 → 选择预设锚点（如"Full Rect"全屏、"Center Top"顶部居中）。也可以手动拖拽锚点——编辑器左上角的绿色小点。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>边距（Offset/Margin）——from 锚点到实际位置</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">锚点定义了"理论上在哪里"，<strong>偏移量</strong>定义了"实际在哪里"。四个偏移（offset_left/top/right/bottom）是从<strong>对应锚点</strong>到实际边的像素距离。正值向中心缩小，负值向外扩大。</p>
        <div class="mb-4"><Code language="gdscript" :code="anchorCode" title="control_anchor.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>只有当四条锚点值<strong>全部相等</strong>时，<code class="bg-amber-100 px-1 rounded text-xs font-mono">position/size</code> 属性才是"可写"的。一旦锚点被拉成两两不同（如 (0,0)-(1,1) 全屏），位置就由锚点+偏移决定，直接设 position 不会生效——改 offset 才对。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Size Flags——控制大小行为</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">当 Control 放在 <strong>Container</strong> 里时，size/position 会被容器接管，改由 <strong>size_flags_horizontal / size_flags_vertical</strong> 决定如何分配空间。≈ CSS flex 的 grow/shrink。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">标志</th><th class="px-4 py-2 border font-semibold text-slate-700">效果</th><th class="px-4 py-2 border font-semibold text-slate-700">CSS 类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">SIZE_FILL</td><td class="px-4 py-2 border">填充父容器剩余空间</td><td class="px-4 py-2 border font-mono text-xs">flex-grow: 1</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">SIZE_EXPAND</td><td class="px-4 py-2 border">扩展父容器大小（推动父容器变大）</td><td class="px-4 py-2 border font-mono text-xs">flex: 1 1 auto</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">SIZE_SHRINK_CENTER</td><td class="px-4 py-2 border">收缩到内容大小并居中</td><td class="px-4 py-2 border font-mono text-xs">justify-content: center</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">SIZE_SHRINK_END</td><td class="px-4 py-2 border">收缩到内容大小并靠右/底部</td><td class="px-4 py-2 border font-mono text-xs">justify-content: flex-end</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="gdscript" :code="sizeCode" title="control_size.gd" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 经验：</strong>不想被容器压缩太小就用 <code class="bg-blue-100 px-1 rounded text-xs font-mono">custom_minimum_size</code>（等价于 CSS 的 min-width）。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz HUD——代码里摆 UI</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的 HUD（生命值 / 分数 / 冲刺冷却条）全部用代码创建。核心是 <strong>CanvasLayer + Control</strong>：CanvasLayer 让 UI 永远渲染在最上层（不随相机移动），Control 的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">position/size</code> 直接给出绝对坐标。因为 HUD 不需要缩放适配，直接用像素坐标最简单。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="main.gd — _create_ui() (精简)" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 什么时候用锚点，什么时候直接写像素？</strong>HUD 想铺满全屏或跟随窗口缩放→用锚点；固定大小的小元素（分数、血条、冷却条）→直接 position/size 更直观。Blitz 是固定 1280×720，所以两种都行。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 改了 position/size 但没生效：</strong>节点在 <strong>Container</strong> 里，布局被容器接管。解决：用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">custom_minimum_size</code> 保底，或调 size_flags，别在容器内硬设 size。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 锚点拉成非全等后，position 属性变灰：</strong>编辑器里锚点一旦变成"拉伸模式"（如 Full Rect），position/size 就不可写，必须改 offset 四边。新手最常犯：想做一个贴底部的条，却去设 position.y。</p></aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 子节点溢出父容器没有裁剪：</strong>Control 默认 <code class="bg-amber-100 px-1 rounded text-xs font-mono">clip_contents = false</code>，子元素画到外面照样显示。想遮罩就手动开 clip_contents（等价于 CSS overflow: hidden）。</p></aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>所有 UI 节点都继承 Control</strong>——位置/大小/锚点/信号是公共能力</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>锚点 ≈ CSS position</strong>——4 个值控制元素跟随父容器的哪条边</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>偏移量 ≈ CSS margin</strong>——从锚点位置向内或向外偏移像素</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Size Flags ≈ CSS flex</strong>——FILL 填充、EXPAND 扩展、SHRINK 收缩对齐</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>在 Container 里时 size 被接管，用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">custom_minimum_size</code> 保底</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>游戏 HUD 常用 CanvasLayer + 绝对坐标</strong>——固定 1280×720 下最省事</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-12-particle2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：粒子效果</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-2-theme-system" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Theme 主题系统 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 继承结构"},{id:"sec-1",name:"Control基类"},{id:"sec-2",name:"锚点"},{id:"sec-3",name:"边距/偏移"},{id:"sec-4",name:"SizeFlags"},{id:"sec-5",name:"🕹️ Blitz实战"},{id:"sec-6",name:"⚠️ 常见错误"},{id:"sec-7",name:"📋 小结"}]
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
const presetCode = `# 代码设置锚点预设（等价于编辑器 Layout 菜单）
func setup_anchors(root: Control) -> void:
    # 全屏拉伸——填满父容器
    root.set_anchors_preset(Control.PRESET_FULL_RECT)
    # 顶部居中（可配 set_offsets_preset 调整边距）
    root.set_anchors_preset(Control.PRESET_CENTER_TOP)
    root.set_offsets_preset(Control.PRESET_CENTER_TOP, Control.PRESET_MODE_MINSIZE, 8)

# 常用预设常量：
#   PRESET_TOP_LEFT / TOP_RIGHT / BOTTOM_LEFT / BOTTOM_RIGHT  # 四角
#   PRESET_CENTER  / CENTER_TOP / CENTER_BOTTOM               # 居中
#   PRESET_FULL_RECT                                          # 全屏`
const sizeCode = `# Control 的坐标系统: position = 左上角, size = 宽高
@onready var hp_bar: ColorRect = $UI/HPBar

func setup() -> void:
    # position/size 直接设置（仅当锚点全等时有效）
    hp_bar.position = Vector2(24, 54)
    hp_bar.size = Vector2(100, 6)

    # 读回"结算后"的矩形（含锚点+偏移），不是简单 position+size
    var rect: Rect2 = hp_bar.get_rect()
    print("最终位置: ", rect.position, " 尺寸: ", rect.size)

    # 最小尺寸——防止被容器压缩到看不见
    hp_bar.custom_minimum_size = Vector2(80, 6)`
const blitzCode = `# main.gd — Blitz HUD 绝对定位 (Control position/size)
func _create_ui() -> void:
    # CanvasLayer: UI 永远在最上层渲染, 不随相机移动
    var ui: CanvasLayer = CanvasLayer.new()
    ui.layer = 100
    add_child(ui)

    # 生命值方块: HBoxContainer 自动横排 (Control 是基类)
    _health_container = HBoxContainer.new()
    _health_container.position = Vector2(24, 20)   # 左上角
    ui.add_child(_health_container)

    # 分数: Label 直接定位在右上角
    _score_label = Label.new()
    _score_label.position = Vector2(1180, 20)
    _score_label.size = Vector2(80, 30)
    _score_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
    _score_label.add_theme_font_size_override("font_size", 22)
    _score_label.add_theme_color_override("font_color", Color(1, 0.9, 0.3))
    _score_label.text = "⭐ 0"
    ui.add_child(_score_label)

    # 冲刺冷却条: ColorRect 用 size.x 当进度条
    _dash_cooldown_bar = ColorRect.new()
    _dash_cooldown_bar.position = Vector2(24, 54)
    _dash_cooldown_bar.size = Vector2(100, 6)
    ui.add_child(_dash_cooldown_bar)`
</script>
