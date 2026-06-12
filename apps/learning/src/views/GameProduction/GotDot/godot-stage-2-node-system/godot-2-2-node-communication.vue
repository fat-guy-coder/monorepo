<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">节点间通信</h1><p class="text-sm text-slate-500 mt-1">get_node / $ / % / signal——五种方式找到并调用其他节点</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-2</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📡</span>五种通信方式</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">$Sprite2D</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">document.querySelector('#Sprite2D')</code> | <code class="bg-purple-100 px-1 rounded text-xs font-mono">%MyGroup</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">document.querySelectorAll('.myClass')</code> | Signal ≈ CustomEvent</p></aside>
<div class="mb-4"><Code language="gdscript" :code="commCode" title="node_communication.gd" /></div></section>

<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>五种方式速查</h2><div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">方式</th><th class="px-4 py-2 border font-semibold">语法</th><th class="px-4 py-2 border font-semibold">适用场景</th><th class="px-4 py-2 border font-semibold">前端类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">$</td><td class="px-4 py-2 border font-mono text-xs">$Sprite2D</td><td class="px-4 py-2 border">当前节点的直接子节点</td><td class="px-4 py-2 border">querySelector</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">%</td><td class="px-4 py-2 border font-mono text-xs">$"%MyGroup"</td><td class="px-4 py-2 border">同一节点的唯一名称</td><td class="px-4 py-2 border">getElementById</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">get_node(path)</td><td class="px-4 py-2 border font-mono text-xs">get_node("../Sibling")</td><td class="px-4 py-2 border">相对路径/复杂路径</td><td class="px-4 py-2 border">querySelector(复杂选择器)</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">owner</td><td class="px-4 py-2 border font-mono text-xs">owner.get_node(...)</td><td class="px-4 py-2 border">从子场景访问主场景</td><td class="px-4 py-2 border">跨组件通信</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Signal</td><td class="px-4 py-2 border font-mono text-xs">signal.emit() / .connect()</td><td class="px-4 py-2 border">松耦合通信（推荐）</td><td class="px-4 py-2 border">EventEmitter</td></tr></tbody></table></div></section>

<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>通信原则</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>向下通信：</strong>父→子，直接 $/get_node + 调用方法</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>向上通信：</strong>子→父，用 Signal（不要子节点直接找父节点）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>同级通信：</strong>通过共同父节点中转，或用 Signal Bus（Autoload 单例做事件总线）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>跨场景通信：</strong>Autoload 单例 / Group 分组 / Signal</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-1-node-lifecycle" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Node 生命周期</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-3-node2d-basics" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Node2D 基类 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"五种方式"},{id:"sec-2",name:"速查表"},{id:"sec-3",name:"通信原则"}]
const commCode = `extends Node2D
# 1. $ 语法糖 ——获取直接子节点（最常用！）
@onready var sprite: Sprite2D = $Sprite2D
@onready var anim: AnimationPlayer = $AnimationPlayer

# 2. % 唯一名称 ——在场景中给节点设唯一名称后使用
@onready var health_bar: ProgressBar = $"%HealthBar"

# 3. get_node() ——复杂路径
var sibling: Node = get_node("../Enemy")      # 同级节点
var deep: Node = get_node("Weapon/Sword")     # 深层路径

# 4. owner ——从子场景访问实例化它的主场景
func _ready() -> void:
    var main: Node = owner  # 谁实例化了这个场景
    main.call("on_child_ready")

# 5. Signal ——松耦合通信（最推荐！）
# 子节点:
signal button_pressed
button_pressed.emit()
# 父节点:
$Button.button_pressed.connect(_on_button)`
</script>
