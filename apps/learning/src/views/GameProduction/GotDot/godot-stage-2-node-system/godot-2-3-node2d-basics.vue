<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Node2D：2D 节点基类</h1><p class="text-sm text-slate-500 mt-1">所有 2D 节点的根——position、rotation、scale、transform</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/drawable_rect.gd" label="📝 drawable_rect.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📍</span>Node2D = 2D 空间中的位置</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Node2D ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">div { position: absolute; left: X; top: Y; transform: rotate(R) scale(S) }</code>——它在 2D 空间中有位置、旋转和缩放。<strong>子节点的 position 相对于父节点</strong>（≈ CSS 的 position: relative + absolute 组合）。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="node2dCode" title="node2d.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>全局坐标 vs 局部坐标</h2>
        <div class="mb-4"><Code language="gdscript" :code="coordCode" title="coordinates.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>读位置用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">global_position</code> 一定是世界坐标；但<strong>设置</strong> <code class="bg-amber-100 px-1 rounded text-xs font-mono">global_position = x</code> 会把 x 当作世界坐标再反算回局部坐标。想相对父节点摆放就用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">position</code>——两者别混用。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>核心属性速查</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">类型</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">position</td><td class="px-4 py-2 border font-mono text-xs">Vector2</td><td class="px-4 py-2 border">相对于父节点的位置（像素）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">global_position</td><td class="px-4 py-2 border font-mono text-xs">Vector2</td><td class="px-4 py-2 border">世界坐标（只读，用 global_position= 设置）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">rotation</td><td class="px-4 py-2 border font-mono text-xs">float</td><td class="px-4 py-2 border">旋转（弧度，非角度！）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">scale</td><td class="px-4 py-2 border font-mono text-xs">Vector2</td><td class="px-4 py-2 border">缩放（1.0=原始大小）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">z_index</td><td class="px-4 py-2 border font-mono text-xs">int</td><td class="px-4 py-2 border">渲染层级（≈ z-index，越大越前面）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">visible</td><td class="px-4 py-2 border font-mono text-xs">bool</td><td class="px-4 py-2 border">是否可见（≈ display:none vs block）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 里的 Node2D</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 项目里所有节点都继承 Node2D。看三个最典型用法——<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">drawable_rect.gd</code> 用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_draw()</code> 在局部坐标画矩形；<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">bullet.gd</code> 每帧改 position 让子弹飞行；<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">player.gd</code> 用朝向变量做视觉翻转（替代 flip_h）：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="drawable_rect.gd + bullet.gd + player.gd — 精简提取" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 关键：</strong><code class="bg-blue-100 px-1 rounded text-xs font-mono">position += direction * speed * delta</code> 改的是<strong>局部坐标</strong>。Blitz 里子弹是主场景（Node2D）的直接子节点，所以它的 position 直接等于屏幕位置。一旦子弹挂到会移动的父节点下，就得改用 global_position 了。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Node2D = 2D 空间锚点</strong>——所有 2D 节点（Sprite2D/物理体/Area2D）都是它的子类</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>position 是局部坐标</strong>（相对父节点），global_position 是世界坐标</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>移动物体改 position（每帧或每物理帧），rotation 用<strong>弧度</strong>，用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">deg_to_rad()</code> 换算</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>z_index 控制渲染层级</strong>，visible 控制显示</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>无贴图也能显示——继承 Node2D 重写 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_draw()</code> + <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">queue_redraw()</code>（Blitz 全部角色都这么画）</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-2-node-communication" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：节点间通信</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-4-sprite2d-animated" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Sprite2D →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Node2D 基础"},{id:"sec-2",name:"全局vs局部坐标"},{id:"sec-3",name:"属性速查"},{id:"sec-4",name:"🕹️ Blitz 实战"},{id:"sec-5",name:"小结"}]
const node2dCode = `extends Node2D
func _ready() -> void:
    position = Vector2(100, 200)       # 相对于父节点的位置
    rotation = deg_to_rad(45.0)        # 旋转 45°（弧度！）
    scale = Vector2(2.0, 2.0)          # 放大 2 倍
    z_index = 10                        # 渲染层级（越大越在上层）
    visible = false                     # 隐藏节点`
const coordCode = `# position ——相对父节点的局部坐标
$Child.position = Vector2(50, 0)    # 在父节点右方 50px
# global_position ——世界坐标（所有 Transform 叠加后）
var world_pos: Vector2 = $Child.global_position
$Child.global_position = Vector2(500, 300)
# 弧度 vs 角度
var rad: float = deg_to_rad(90.0)    # 1.5708
var deg: float = rad_to_deg(PI)      # 180.0`
const blitzCode = `# === drawable_rect.gd — Node2D + _draw() 纯代码绘制 ===
@export var rect_color: Color = Color(0.4, 0.3, 0.2, 1.0)
@export var rect_size: Vector2 = Vector2(200, 20)
func _draw() -> void:
    var r: Rect2 = Rect2(-rect_size / 2.0, rect_size)  # 以节点原点为中心
    draw_rect(r, rect_color)                           # 填充矩形

# === bullet.gd — 每物理帧改 position 让子弹飞行 ===
func _physics_process(delta: float) -> void:
    position += direction * speed * delta   # 局部坐标位移
    queue_redraw()                          # 触发 _draw() 重绘

# === player.gd — 用朝向变量做"翻转"（替代 Sprite2D.flip_h）===
var facing_right: bool = true
func _draw() -> void:
    var ed: float = 1.0 if facing_right else -1.0
    draw_circle(Vector2(5.0 * ed, -5.0), 3.5, Color.WHITE)  # 眼睛朝向右 / 左`
</script>
