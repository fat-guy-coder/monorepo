<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">类与面向对象</h1><p class="text-sm text-slate-500 mt-1">class / extends / inner class——GDScript 的 OOP</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-7</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

  <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>继承层级：一个物理体体系</h2>
    <p class="text-slate-600 mb-4 leading-relaxed">Godot 内置的 2D 物理节点是一棵继承树。写脚本时用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">extends</code> 挂到树上，就自动获得父类的全部能力：</p>
    <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr-1-7" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#94a3b8"/></marker>
      </defs>
      <rect x="285" y="12" width="150" height="38" rx="8" fill="#dbeafe" stroke="#93c5fd" stroke-width="1.5"/>
      <text x="360" y="36" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">Node2D</text>
      <rect x="60" y="110" width="160" height="38" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
      <text x="140" y="133" text-anchor="middle" font-size="12" fill="#1e3a8a">CharacterBody2D</text>
      <rect x="280" y="110" width="160" height="38" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
      <text x="360" y="133" text-anchor="middle" font-size="12" fill="#1e3a8a">Area2D</text>
      <rect x="500" y="110" width="160" height="38" rx="8" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5"/>
      <text x="580" y="133" text-anchor="middle" font-size="12" fill="#1e3a8a">StaticBody2D</text>
      <line x1="330" y1="50" x2="155" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr-1-7)"/>
      <line x1="375" y1="50" x2="375" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr-1-7)"/>
      <line x1="420" y1="50" x2="565" y2="110" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arr-1-7)"/>
      <rect x="35" y="200" width="210" height="72" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 3"/>
      <text x="140" y="222" text-anchor="middle" font-size="11" fill="#475569">player.gd / enemy.gd</text>
      <text x="140" y="240" text-anchor="middle" font-size="10" fill="#64748b">移动/跳跃/攻击状态机</text>
      <text x="140" y="256" text-anchor="middle" font-size="10" fill="#64748b">物理碰撞 → 会反弹</text>
      <rect x="255" y="200" width="210" height="72" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 3"/>
      <text x="360" y="222" text-anchor="middle" font-size="11" fill="#475569">bullet.gd / attack_hitbox.gd</text>
      <text x="360" y="240" text-anchor="middle" font-size="10" fill="#64748b">感应区 → 只检测重叠</text>
      <text x="360" y="256" text-anchor="middle" font-size="10" fill="#64748b">body_entered 信号触发</text>
      <rect x="475" y="200" width="210" height="72" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 3"/>
      <text x="580" y="222" text-anchor="middle" font-size="11" fill="#475569">平台 / 墙体</text>
      <text x="580" y="240" text-anchor="middle" font-size="10" fill="#64748b">静止不动的碰撞体</text>
      <line x1="140" y1="148" x2="140" y2="200" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arr-1-7)"/>
      <line x1="360" y1="148" x2="360" y2="200" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arr-1-7)"/>
      <line x1="580" y1="148" x2="580" y2="200" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#arr-1-7)"/>
    </svg>
    <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-4"><p class="text-sm text-amber-800"><strong>⚠️ 选对父类：</strong>要物理运动（玩家/敌人）用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">CharacterBody2D</code>；只做碰撞检测（子弹/受击框）用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Area2D</code>；完全静止的墙用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">StaticBody2D</code>。</p></aside>
  </section>

  <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>一个 .gd 文件 = 一个类</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">class Player extends CharacterBody2D {"{}"}</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">class Player(CharacterBody2D):</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">extends CharacterBody2D</code> + <code class="bg-purple-100 px-1 rounded text-xs font-mono">class_name Player</code></p></aside>
    <div class="mb-4"><Code language="gdscript" :code="classCode" title="class.gd" /></div></section>

  <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>class_name——注册全局类型</h2><p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">class_name MyClass</code> 让这个脚本成为全局可用的类型。≈ TS 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">export class</code>。</p><div class="mb-4"><Code language="gdscript" :code="classNameCode" title="class_name.gd" /></div></section>

  <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>内部类</h2><div class="mb-4"><Code language="gdscript" :code="innerClassCode" title="inner_class.gd" /></div></section>

  <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>访问控制</h2><p class="text-slate-600 leading-relaxed">GDScript 没有 public/private 关键字。约定：<strong>下划线开头 _ 表示私有</strong>。编辑器不会在自动补全中提示 _private_var。</p></section>

  <!-- 🕹️ 实战：Blitz -->
  <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的继承体系</h2>
    <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的五个脚本各自 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">extends</code> 不同的物理体，各司其职，再用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">class_name</code> + 鸭子类型互相对接：</p>
    <div class="mb-4"><Code language="gdscript" :code="blitzOopCode" title="Blitz 继承体系（精简）" /></div>
    <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">extends CharacterBody2D</code> ≈ TS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">class Player extends Phaser.Physics.Arcade.Sprite</code>——游戏引擎都靠继承复用基类能力；<br/><code class="bg-purple-100 px-1 rounded text-xs font-mono">has_method("take_damage")</code> ≈ TS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">if ("take_damage" in obj)</code>——不依赖具体类，接口即协议。</p></aside>
  </section>

  <!-- ⚠️ 常见错误 -->
  <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
    <div class="mb-4"><Code language="gdscript" :code="oopPitfallsCode" title="oop_pitfalls.gd" /></div>
  </section>

  <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>一个 .gd 文件 = 一个类（<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">extends</code> 声明继承哪个基类）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">class_name</code> 注册全局类型（≈ export class），名字全局唯一</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>单继承</strong>——想复用多个能力用组合（挂子节点/组件）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_</code> 前缀 = 约定私有；<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_init</code> 构造、<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_ready</code> 入场景树</span></li></ul></section></main>
  <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-6-functions" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：函数</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-8-signals-basics" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：信号基础 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 继承层级"},{id:"sec-1",name:"类结构"},{id:"sec-2",name:"class_name"},{id:"sec-3",name:"内部类"},{id:"sec-4",name:"访问控制"},{id:"sec-5",name:"🕹️ 实战：Blitz"},{id:"sec-6",name:"⚠️ 常见错误"},{id:"sec-7",name:"小结"}]
const classCode = `extends CharacterBody2D
class_name Player  # 注册为全局类型

var health: int = 100
var speed: float = 300.0

func _init(start_health: int = 100) -> void: health = start_health
func take_damage(amount: int) -> void: health -= amount
func die() -> void: queue_free()`
const classNameCode = `# player.gd
class_name BlitzPlayer
extends CharacterBody2D

# enemy.gd
class_name BlitzEnemy
extends CharacterBody2D
var target: BlitzPlayer  # ← BlitzPlayer 类型可直接用！`
const innerClassCode = `extends Node
class InventoryItem:
    var name: String; var count: int
    func _init(n: String, c: int) -> void: name = n; count = c

var items: Array[InventoryItem] = [InventoryItem.new("Sword", 1)]`
const blitzOopCode = `# 1) 同一个体系，不同的职责（五个脚本 extends 不同基类）
# player.gd / enemy.gd → 会运动、会碰撞
extends CharacterBody2D
class_name BlitzPlayer

# bullet.gd / attack_hitbox.gd → 只做碰撞检测
extends Area2D

# 平台 / 墙体 → 静止不动
extends StaticBody2D

# 2) 子类里用 _ready / 虚函数扩展父类能力
# drawable_rect.gd（extends Node2D）
@export var rect_color: Color = Color(0.4, 0.3, 0.2, 1.0)
func _draw() -> void:          # 重写 CanvasItem 的虚函数
    draw_rect(Rect2(0, 0, 32, 32), rect_color)

# 3) class_name 全局类型：敌我共享同一个"受击协议"
# enemy.gd
extends CharacterBody2D
class_name BlitzEnemy
func take_damage(amount: int) -> void:
    if hp <= 0: return
    hp -= amount
    if hp <= 0: die()

# 4) 鸭子类型：不管具体子类，只要会 take_damage（bullet.gd 精简）
if body.has_method("take_damage"):
    body.take_damage(damage)   # 敌人 / Boss / 玩家都能打`
const oopPitfallsCode = `# ⚠️ 错误 1：class_name 重名 —— 全局类型冲突
class_name BlitzPlayer
# 另一个文件也写 class_name BlitzPlayer → 编译报错
# ✅ class_name 必须全局唯一（项目里搜索确认）

# ⚠️ 错误 2：单继承，不能 extends 多个类
extends CharacterBody2D
# extends Area2D   ← ❌ 多继承，语法错误
# ✅ 组合优于继承：把功能拆成子节点/脚本组件挂上去

# ⚠️ 错误 3：_init 里访问场景树
func _init() -> void:
    # get_node("Sprite")   ❌ 此刻节点还没进入场景树
func _ready() -> void:
    $Sprite.visible = false   # ✅ 进树后才能访问子节点

# ⚠️ 错误 4：extends / class_name 写在了函数或变量之后
var x: int = 1
extends Node2D   # ❌ extends 必须放在文件最顶部（注释除外）
# ✅ 文件结构：extends → class_name → 变量 → 函数`
</script>
