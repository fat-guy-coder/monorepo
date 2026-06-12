<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">信号（Signal）基础</h1><p class="text-sm text-slate-500 mt-1">声明 / 连接 / 发射——Godot 的观察者模式</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-8</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📡</span>信号 = 观察者模式</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">emitter.on('event', handler)</code>（Node.js EventEmitter）| <strong>Vue:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">$emit('event', data)</code> | <strong>DOM:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">element.addEventListener('click', handler)</code><br/><strong>GDScript Signal:</strong> 声明→连接→发射 三步走。信号是 Godot 中<strong>节点间松耦合通信</strong>的核心机制。</p></aside></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>三步走：声明→连接→发射</h2><div class="mb-4"><Code language="gdscript" :code="signalCode" title="signal.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>带参数的信号</h2><div class="mb-4"><Code language="gdscript" :code="signalArgsCode" title="signal_args.gd" /></div></section>
<section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>编辑器连接（无代码）</h2><p class="text-slate-600 mb-3 leading-relaxed">选中节点 → Node 面板（Inspector 旁边）→ 双击信号名 → 选择目标节点和方法 → 自动生成 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_on_xxx</code> 回调函数。编辑器连接适合简单场景，代码连接适合动态实例化的节点。</p></section>
<section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>信号三要素：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">signal xxx</code>（声明）→ <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">xxx.connect(callback)</code>（连接）→ <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">xxx.emit(data)</code>（发射）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>≈ EventEmitter.emit / addEventListener / Vue $emit</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>信号可以带参数，类型安全</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>编辑器连接（无代码）vs 代码连接（灵活）</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-7-classes-oop" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：类与面向对象</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-9-enums-constants" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：枚举与常量 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"声明→连接→发射"},{id:"sec-3",name:"带参数信号"},{id:"sec-4",name:"编辑器连接"},{id:"sec-5",name:"小结"}]
const signalCode = `extends Node
# 1. 声明信号（可以带参数类型）
signal health_changed(new_health: int)
signal player_died()

# 2. 连接信号（通常在 _ready 中）
func _ready() -> void:
    health_changed.connect(_on_health_changed)
    player_died.connect(_on_player_died)

# 3. 发射信号
func take_damage(amount: int) -> void:
    health -= amount
    health_changed.emit(health)  # 发射信号，传递数据
    if health <= 0:
        player_died.emit()

# 回调函数
func _on_health_changed(new_health: int) -> void:
    print("血量变为: ", new_health)
func _on_player_died() -> void:
    print("玩家死亡")`
const signalArgsCode = `# 带多个参数的信号
signal item_picked(item_name: String, quantity: int)
# 连接
item_picked.connect(func(name: String, qty: int) -> void:
    print("拾取了 ", qty, " 个 ", name))
# 发射
item_picked.emit("Sword", 1)

# 断开连接
health_changed.disconnect(_on_health_changed)`
</script>
