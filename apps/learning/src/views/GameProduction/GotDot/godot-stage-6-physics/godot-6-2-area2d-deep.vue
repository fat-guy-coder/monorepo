<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">📡 Area2D 深入</h1><p class="text-sm text-slate-500 mt-1">检测区域、重叠信号、碰撞层——用 Area2D 做子弹 / 受击框 / 感应区</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/bullet.gd" label="📝 bullet.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 6-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>Area2D vs CharacterBody2D</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Area2D ≈ 一个透明的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">div</code> 上有 <code class="bg-purple-100 px-1 rounded text-xs font-mono">onMouseEnter</code> / <code class="bg-purple-100 px-1 rounded text-xs font-mono">onMouseLeave</code> 事件。没有物理碰撞（不会弹开），只是"感应"有什么东西进来了。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">特性</th><th class="px-4 py-2 border font-semibold text-slate-700">CharacterBody2D</th><th class="px-4 py-2 border font-semibold text-slate-700">Area2D</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border">物理碰撞</td><td class="px-4 py-2 border">✅ move_and_slide() 会停下来</td><td class="px-4 py-2 border">❌ 物体直接穿过</td></tr>
          <tr><td class="px-4 py-2 border">检测方式</td><td class="px-4 py-2 border">碰撞响应 (停止/滑动)</td><td class="px-4 py-2 border">信号通知 (body_entered / area_entered)</td></tr>
          <tr><td class="px-4 py-2 border">典型用途</td><td class="px-4 py-2 border">玩家、敌人</td><td class="px-4 py-2 border">子弹、受击框、感应区、拾取物</td></tr>
        </tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>body_entered vs area_entered</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Area2D 有两个核心信号。选哪个取决于"你要检测的东西是什么类型"：</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">信号</th><th class="px-4 py-2 border font-semibold text-slate-700">检测对象</th><th class="px-4 py-2 border font-semibold text-slate-700">触发条件</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">body_entered(body: Node2D)</td><td class="px-4 py-2 border">CharacterBody2D / StaticBody2D / RigidBody2D</td><td class="px-4 py-2 border">物理体的碰撞形状进入 Area2D 范围</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">area_entered(area: Area2D)</td><td class="px-4 py-2 border">另一个 Area2D</td><td class="px-4 py-2 border">另一个 Area2D 的碰撞形状进入</td></tr>
        </tbody></table></div>
        <p class="text-slate-600 text-sm">同一帧内 body_entered 和 area_entered 可能<strong>同时触发</strong>（如果目标既有 CharacterBody2D 又有 Area2D 子节点）。需要加 guard 变量防重复处理。</p>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>实战一：Area2D 做子弹</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">子弹是最经典的 Area2D 用例——不需要物理碰撞（不想把敌人弹开），只需要"检测到敌人就伤害"。</p>
        <div class="mb-4"><Code language="gdscript" :code="bulletCode" title="bullet.gd — Area2D 子弹" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 关键：Area2D 必须有 CollisionShape2D 才能检测！</strong>没有形状的 Area2D 是"幽灵"——body_entered 永远不会触发。这是新手最常见的坑。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>实战二：Area2D 做受击框 (Hitbox/Hurtbox)</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">CharacterBody2D 的碰撞形状通常很小（为了精准的平台碰撞）。但游戏手感的"受击判定"应该比视觉稍大——加一个 Area2D 子节点做专门的受击框。</p>
        <div class="mb-4"><Code language="gdscript" :code="hitboxCode" title="敌人 Hitbox + 玩家 Hurtbox" /></div>
        <ul class="space-y-2 text-slate-600 mb-4"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Hitbox</strong> (敌人身上) — 检测"什么东西打中我了"（玩家子弹）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Hurtbox</strong> (玩家身上) — 检测"什么东西碰到我了"（敌人身体）</span></li></ul>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 为什么不用 CharacterBody2D 自带的碰撞？</strong>因为它的 collision_mask 被墙壁占用了（bit4）。如果你加上敌人层(bit1)，角色会跟敌人<strong>物理碰撞</strong>（推来推去）。而 Area2D 子节点只检测不碰撞——解耦了"平台物理"和"受击判定"。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>实战三：Area2D 做感应区</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">玩家身上的 ParryDetector 是一个 Area2D，只做一件事：检测附近有没有粉色格挡对象。它比子弹的 Area2D 还简单——只需要 area_entered / area_exited 来设置一个 bool。</p>
        <div class="mb-4"><Code language="gdscript" :code="sensorCode" title="player.gd — ParryDetector 感应区" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>monitoring 与 monitorable</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">含义</th><th class="px-4 py-2 border font-semibold text-slate-700">默认</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">monitoring</td><td class="px-4 py-2 border">"我是否在监听？" — 设为 false 时所有进入信号都不触发</td><td class="px-4 py-2 border">true</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">monitorable</td><td class="px-4 py-2 border">"我是否可被其他 Area 检测？" — 设为 false 时别的 Area 检测不到我</td><td class="px-4 py-2 border">true</td></tr>
        </tbody></table></div>
        <p class="text-slate-600 text-sm">Blitz 的终点旗帜初始 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">monitoring = false</code>，Boss 死后才设为 true。这是"条件触发区域"的标准做法。</p>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Area2D = 检测区，没有物理碰撞。子弹/受击框/感应区都用它。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>必须有 CollisionShape2D</strong>，不然永远检测不到东西。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>body_entered 检测物理体，area_entered 检测其他 Area。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>同一帧可能两个信号都触发，用 _has_hit guard 防重复。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>monitoring=false 可以禁用检测（条件触发区域）。</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-6-physics/godot-6-1-physics-intro" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：物理系统总览</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-6-physics/godot-6-3-raycast2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：RayCast2D →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Area2D vs Body"},{id:"sec-2",name:"body vs area信号"},{id:"sec-3",name:"实战:子弹"},{id:"sec-4",name:"实战:受击框"},{id:"sec-5",name:"实战:感应区"},{id:"sec-6",name:"monitoring"},{id:"sec-7",name:"小结"}]

const bulletCode = `# bullet.gd — Area2D 做子弹 (Blitz 项目)
extends Area2D

var direction: Vector2 = Vector2.RIGHT
var speed: float = 700.0
var _has_hit: bool = false

func _ready() -> void:
    # collision_layer = "我是谁"
    collision_layer = 1 << 2   # bit2: player bullets
    # collision_mask  = "我关心谁"
    collision_mask  = (1 << 1) | (1 << 4)  # bit1(敌人) | bit4(墙壁)

    # 连接信号
    body_entered.connect(_on_body_entered)
    area_entered.connect(_on_area_entered)

func _physics_process(delta: float) -> void:
    position += direction * speed * delta

func _on_body_entered(body: Node2D) -> void:
    if _has_hit: return          # 防同一帧 body+area 双重触发
    _has_hit = true
    if body.has_method("take_damage"):
        body.take_damage(damage)
    queue_free()

func _on_area_entered(area: Area2D) -> void:
    if _has_hit: return
    _has_hit = true
    # 往上找父节点 (Area 本身没有 take_damage)
    if area.get_parent().has_method("take_damage"):
        area.get_parent().take_damage(damage)
    queue_free()`

const hitboxCode = `# === enemy.gd — 创建 Hitbox (比身体稍大的受击框) ===
@onready var hitbox: Area2D = $Hitbox  # enemy.tscn 预建

func _ready() -> void:
    # Hitbox 的 layer = bit1 (让子弹的 mask 能检测到)
    hitbox.collision_layer = 1 << 1
    # Hitbox 的 mask = bit2 (检测玩家子弹)
    hitbox.collision_mask  = 1 << 2

# === player.gd — 创建 Hurtbox (检测敌人身体) ===
@onready var hurtbox: Area2D = $Hurtbox  # player.tscn 预建

func _ready() -> void:
    hurtbox.collision_mask = 1 << 1   # 检测敌人身体(bit1)
    hurtbox.body_entered.connect(_on_hurtbox_body_entered)

func _on_hurtbox_body_entered(body: Node2D) -> void:
    if body.has_method("take_damage"):  # 敌人碰到了我
        take_damage(1)`

const sensorCode = `# player.gd — ParryDetector (纯感应,无伤害)
@onready var parry_detector: Area2D = $ParryDetector

func _ready() -> void:
    parry_detector.collision_mask = 1 << 5  # 只检测格挡对象(bit5)
    parry_detector.area_entered.connect(_on_parry_zone_entered)
    parry_detector.area_exited.connect(_on_parry_zone_exited)

# 进入粉色物体范围 → 标记"可以格挡"
func _on_parry_zone_entered(area: Area2D) -> void:
    near_parry_object = true
    _parry_target = area

# 离开范围 → 清除标记
func _on_parry_zone_exited(_area: Area2D) -> void:
    near_parry_object = false

# 然后在 _process_normal 中: 空中按跳 + near_parry_object → 格挡!`
</script>
