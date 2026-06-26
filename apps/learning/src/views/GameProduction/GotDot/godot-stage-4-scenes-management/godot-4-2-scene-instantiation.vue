<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">📦 场景实例化</h1><p class="text-sm text-slate-500 mt-1">PackedScene.instantiate() — 游戏里绝大多数对象的来源</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>为什么用 .instantiate() 而不是 .new()</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">CharacterBody2D.new()</code> 只创建一个空节点——没脚本、没子节点、没碰撞形状。<strong>你需要手动 add_child 每个子节点 + set_script 每个脚本。</strong></p>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">player.tscn</code> → <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">preload</code> → <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">.instantiate()</code> 一步克隆整个节点树——包括所有子节点、脚本、碰撞形状、属性值。<strong>编辑器里看到的=运行时得到的。</strong></p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>.tscn ≈ React 组件定义（JSX+props）。preload ≈ import。instantiate() ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">React.createElement(Component)</code> 然后 <code class="bg-purple-100 px-1 rounded text-xs font-mono">appendChild</code> 到 DOM。</p></aside></section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>标准三步</h2>
        <div class="mb-4"><Code language="gdscript" :code="basicCode" title="preload → instantiate → add_child" /></div></section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Blitz 中的三种实例化模式</h2>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="Blitz 的实例化用法" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 关键：在 add_child 之前修改属性。</strong>因为 _ready() 在进入场景树时才触发——你在 add_child 前设的属性，_ready 里都能读到。Blitz 的 bullet 就是靠这个传 direction 和 speed。</p></aside></section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>preload 在类加载时编译，只执行一次。instantiate() 可调用无数次。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>add_child 前设属性 → _ready 能读到。add_child 后才调用 _ready。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>@export 属性可以在代码中覆盖（enemy.enemy_type = 1）。</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-4-scenes-management/godot-4-1-scene-tree" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：场景树</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-4-scenes-management/godot-4-3-scene-change" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：场景切换 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"instantiate vs new"},{id:"sec-2",name:"标准三步"},{id:"sec-3",name:"Blitz三种模式"},{id:"sec-4",name:"小结"}]
const basicCode = `# 1. preload — 编译时加载，只执行一次
var BulletScene: PackedScene = preload("res://scenes/bullet.tscn")

func _shoot() -> void:
    # 2. instantiate — 克隆整个节点树
    var bullet: Area2D = BulletScene.instantiate()

    # 3. 在 add_child 前设置属性（_ready 能读到）
    bullet.position = muzzle_position
    bullet.direction = Vector2.RIGHT

    # 4. 加入场景树（此时调用 bullet._ready()）
    get_tree().current_scene.add_child(bullet)`
const blitzCode = `# === 模式1: 子弹 — 每次射击生成一个 ===
# main.gd
var BulletScene: PackedScene = preload("res://scenes/bullet.tscn")
player.bullet_scene = BulletScene

# player.gd
func _shoot() -> void:
    var bullet: Area2D = bullet_scene.instantiate()
    bullet.position = position + Vector2(20*d, -4)
    bullet.direction = Vector2(d, 0)    # ← add_child 前设
    bullet.speed = bullet_speed
    get_tree().current_scene.add_child(bullet)  # ← 此时 _ready()

# === 模式2: 敌人 — 关卡搭建时批量生成 ===
var EnemyScene: PackedScene = preload("res://scenes/enemy.tscn")

func _create_enemy(pos: Vector2, etype: int) -> void:
    var enemy: CharacterBody2D = EnemyScene.instantiate()
    enemy.position = pos
    enemy.enemy_type = etype       # 覆盖 @export 默认值
    add_child(enemy)

# === 模式3: 玩家 — 只生成一次，后续复用引用 ===
var PlayerScene: PackedScene = preload("res://scenes/player.tscn")

func _create_player() -> void:
    player = PlayerScene.instantiate()  # 存为成员变量
    player.position = Vector2(120, 630)
    add_child(player)`
</script>
