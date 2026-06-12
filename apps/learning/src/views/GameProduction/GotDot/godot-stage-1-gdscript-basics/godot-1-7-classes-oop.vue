<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">类与面向对象</h1><p class="text-sm text-slate-500 mt-1">class / extends / inner class——GDScript 的 OOP</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-7</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>一个 .gd 文件 = 一个类</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">class Player extends CharacterBody2D {"{}"}</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">class Player(CharacterBody2D):</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">class Player extends CharacterBody2D:</code></p></aside>
<div class="mb-4"><Code language="gdscript" :code="classCode" title="class.gd" /></div></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>class_name——注册全局类型</h2><p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">class_name MyClass</code> 让这个脚本成为全局可用的类型。≈ TS 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">export class</code>。</p><div class="mb-4"><Code language="gdscript" :code="classNameCode" title="class_name.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>内部类</h2><div class="mb-4"><Code language="gdscript" :code="innerClassCode" title="inner_class.gd" /></div></section>
<section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>访问控制</h2><p class="text-slate-600 leading-relaxed">GDScript 没有 public/private 关键字。约定：<strong>下划线开头 _ 表示私有</strong>。编辑器不会在自动补全中提示 _private_var。</p></section>
<section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>一个 .gd 文件 = 一个类（extends 第一行）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">class_name</code> 注册全局类型（≈ export class）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_</code> 前缀 = 约定私有</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-6-functions" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：函数</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-8-signals-basics" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：信号基础 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"类结构"},{id:"sec-2",name:"class_name"},{id:"sec-3",name:"内部类"},{id:"sec-4",name:"访问控制"},{id:"sec-5",name:"小结"}]
const classCode = `extends Node
class_name Player  # 注册为全局类型

var health: int = 100
var speed: float = 300.0

func _init(start_health: int = 100) -> void: health = start_health
func take_damage(amount: int) -> void: health -= amount
func die() -> void: queue_free()`
const classNameCode = `# player.gd
class_name Player
extends CharacterBody2D

# enemy.gd
class_name Enemy
extends CharacterBody2D
var target: Player  # ← Player 类型可直接用！`
const innerClassCode = `extends Node
class InventoryItem:
    var name: String; var count: int
    func _init(n: String, c: int) -> void: name = n; count = c

var items: Array[InventoryItem] = [InventoryItem.new("Sword", 1)]`
</script>
