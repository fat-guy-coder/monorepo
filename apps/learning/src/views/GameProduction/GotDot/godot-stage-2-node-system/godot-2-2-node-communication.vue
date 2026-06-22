<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">节点间通信</h1><p class="text-sm text-slate-500 mt-1">get_node / $ / % / owner / signal——五种方式找到并调用其他节点</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📡</span>五种通信方式速查</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">$Sprite2D</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">document.querySelector('#Sprite2D')</code> | <code class="bg-purple-100 px-1 rounded text-xs font-mono">%MyGroup</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">document.getElementById('MyGroup')</code> | Signal ≈ CustomEvent / EventEmitter</p></aside>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">方式</th><th class="px-4 py-2 border font-semibold text-slate-700">语法</th><th class="px-4 py-2 border font-semibold text-slate-700">适用场景</th><th class="px-4 py-2 border font-semibold text-slate-700">前端类比</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">$ 直接子节点</td><td class="px-4 py-2 border font-mono text-xs">$Sprite2D</td><td class="px-4 py-2 border">当前节点的直接子节点</td><td class="px-4 py-2 border">querySelector</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">% 唯一名称</td><td class="px-4 py-2 border font-mono text-xs">$"%HealthBar"</td><td class="px-4 py-2 border">场景中任何位置的唯一命名节点</td><td class="px-4 py-2 border">getElementById</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">get_node(path)</td><td class="px-4 py-2 border font-mono text-xs">get_node("../Sibling")</td><td class="px-4 py-2 border">相对路径 / 复杂嵌套路径</td><td class="px-4 py-2 border">querySelector 复杂选择器</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">owner 跨场景</td><td class="px-4 py-2 border font-mono text-xs">owner.get_node(...)</td><td class="px-4 py-2 border">子场景访问实例化它的主场景</td><td class="px-4 py-2 border">跨组件 ref</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Signal 信号</td><td class="px-4 py-2 border font-mono text-xs">signal.emit() / .connect()</td><td class="px-4 py-2 border"><strong>松耦合通信（最推荐）</strong></td><td class="px-4 py-2 border">EventEmitter / emit</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="gdscript" :code="commCode" title="node_communication.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>$ 和 % 的区别详解</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">$Sprite2D</code> 查找<strong>当前节点的直接子节点</strong>中名为 "Sprite2D" 的节点。如果节点名重复，返回<strong>第一个匹配的</strong>。</p>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">$"%HealthBar"</code> 查找<strong>整个场景</strong>中设置了"Scene Unique Name"的节点（右键节点 → Access as Unique Name）。适合跨层级引用。</p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">$</code> 只在<strong>当前节点</strong>的子节点中查找。<code class="bg-amber-100 px-1 rounded text-xs font-mono">%</code> 在<strong>整个场景树</strong>中查找。如果场景中有多个节点同名，<code class="bg-amber-100 px-1 rounded text-xs font-mono">%</code> 的行为是未定义的——所以每个 % 名称必须全局唯一。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>通信原则（必读）</h2>
        <div class="space-y-3 text-slate-600">
          <div class="bg-slate-50 rounded-lg p-4"><strong>向下通信（父→子）：</strong>直接用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">$</code> 获取子节点，调用其方法。这是安全的——父知道子的存在。</div>
          <div class="bg-slate-50 rounded-lg p-4"><strong>向上通信（子→父）：</strong><span class="text-red-500">不要</span>让子节点直接找父节点（<code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">get_parent()</code>）。用 <strong>Signal</strong>——子发射信号，父连接它。这是松耦合的正确姿势。</div>
          <div class="bg-slate-50 rounded-lg p-4"><strong>同级通信：</strong>通过共同父节点中转，或用 Signal Bus（Autoload 单例做事件总线）。</div>
          <div class="bg-slate-50 rounded-lg p-4"><strong>跨场景通信：</strong>用 Autoload 单例 / Group 分组 / Signal。不要用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">get_node("/root/...")</code> 硬编码绝对路径。</div>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>获取节点引用的时机</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>关键规则：</strong>在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_ready()</code> 之前，子节点<strong>还没有被加入场景树</strong>，任何 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">$</code> 调用都会返回 null。解决方案：</p>
        <ul class="space-y-1 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>@onready：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@onready var sprite: Sprite2D = $Sprite2D</code>——在 _ready 的第一行赋值，保证节点已存在</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_ready() 中获取：</strong>在 _ready 中调用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">$Sprite2D</code> 是安全的</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>动态创建的节点：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">add_child()</code> 之后再获取引用</span></li></ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-1-node-lifecycle" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Node 生命周期</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-3-node2d-basics" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Node2D 基类 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"五种方式"},{id:"sec-2",name:"$ vs %"},{id:"sec-3",name:"通信原则"},{id:"sec-4",name:"引用时机"}]
const commCode = `extends Node2D
# 1. $ ——获取直接子节点（最常用！）
@onready var sprite: Sprite2D = $Sprite2D
@onready var anim: AnimationPlayer = $AnimationPlayer

# 2. % ——唯一名称（跨层级）
@onready var health_bar: ProgressBar = $"%HealthBar"

# 3. get_node() ——复杂路径
var sibling: Node = get_node("../Enemy")
var deep: Node = get_node("Weapon/Sword")

# 4. owner ——从子场景访问主场景
func _ready() -> void:
    var main: Node = owner

# 5. Signal ——松耦合通信（最推荐！）
signal button_pressed
button_pressed.emit()
$Button.button_pressed.connect(_on_button)`
</script>
