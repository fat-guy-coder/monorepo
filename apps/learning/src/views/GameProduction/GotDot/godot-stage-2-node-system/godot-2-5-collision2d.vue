<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">碰撞体</h1><p class="text-sm text-slate-500 mt-1">CollisionShape2D / Area2D / StaticBody2D——检测与阻挡</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/attack_hitbox.gd" label="📝 attack_hitbox.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>碰撞体类型结构图</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Godot 的碰撞系统分两大家族：<strong>PhysicsBody2D</strong>（发生物理碰撞：阻挡/反弹/滑动）和 <strong>Area2D</strong>（只检测不阻挡）。无论哪种，<strong>都必须挂一个 CollisionShape2D 子节点</strong>来定义碰撞边界——碰撞体本身是没有形状的。</p>
        <svg viewBox="0 0 720 310" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="ct-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
          </defs>

          <!-- 根 -->
          <rect x="250" y="16" width="220" height="46" rx="8" fill="#3b82f6" />
          <text x="360" y="34" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">CollisionObject2D</text>
          <text x="360" y="52" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dbeafe">所有碰撞对象的基类</text>

          <!-- 分支边 -->
          <line x1="360" y1="62" x2="220" y2="98" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct-arr)" />
          <line x1="360" y1="62" x2="500" y2="98" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct-arr)" />

          <!-- PhysicsBody2D -->
          <rect x="140" y="100" width="160" height="42" rx="8" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5" />
          <text x="220" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#1e3a8a">PhysicsBody2D</text>
          <text x="220" y="134" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#1e3a8a">有物理碰撞：阻挡/反弹/滑动</text>

          <!-- Area2D -->
          <rect x="420" y="100" width="160" height="42" rx="8" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
          <text x="500" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#14532d">Area2D</text>
          <text x="500" y="134" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#14532d">只检测不阻挡（触发器）</text>

          <!-- PhysicsBody2D 子节点边 -->
          <line x1="220" y1="142" x2="125" y2="188" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct-arr)" />
          <line x1="220" y1="142" x2="280" y2="188" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct-arr)" />
          <line x1="220" y1="142" x2="440" y2="188" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct-arr)" />

          <!-- StaticBody2D -->
          <rect x="60" y="190" width="130" height="44" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
          <text x="125" y="205" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#334155">StaticBody2D</text>
          <text x="125" y="224" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">墙壁 / 地板（不动）</text>

          <!-- CharacterBody2D（高亮） -->
          <rect x="205" y="190" width="150" height="44" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
          <text x="280" y="205" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">CharacterBody2D</text>
          <text x="280" y="224" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#ffedd5">代码控制 move_and_slide()</text>

          <!-- RigidBody2D -->
          <rect x="370" y="190" width="140" height="44" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
          <text x="440" y="205" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#334155">RigidBody2D</text>
          <text x="440" y="224" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">物理引擎模拟（箱子/球）</text>

          <!-- 底部：CollisionShape2D 提示条 -->
          <rect x="60" y="254" width="600" height="42" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="5 3" />
          <text x="360" y="269" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#1d4ed8">每种碰撞对象都要挂一个 CollisionShape2D 子节点定义形状</text>
          <text x="360" y="286" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#1e40af">CircleShape2D · RectangleShape2D · CapsuleShape2D · 凸多边形</text>
        </svg>
        <p class="text-xs text-slate-400 mt-1">图 1：碰撞对象类型树 —— PhysicsBody2D 家族（有物理碰撞） + Area2D（只检测），全部依赖 CollisionShape2D 定义边界</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🛡️</span>三种碰撞节点</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>StaticBody2D ≈ 墙壁/地板（不动），CharacterBody2D ≈ 玩家（代码控制移动），RigidBody2D ≈ 足球（物理引擎控制），Area2D ≈ 检测区/触发器（进入范围就触发事件，不产生物理碰撞）。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border">节点</th><th class="px-4 py-2 border">用途</th><th class="px-4 py-2 border">移动方式</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs font-semibold">StaticBody2D</td><td class="px-4 py-2 border">墙壁、地板、平台</td><td class="px-4 py-2 border">不移动（编辑器放置）</td></tr><tr><td class="px-4 py-2 border font-mono text-xs font-semibold">CharacterBody2D</td><td class="px-4 py-2 border">玩家、敌人（代码控制）</td><td class="px-4 py-2 border">move_and_slide()</td></tr><tr><td class="px-4 py-2 border font-mono text-xs font-semibold">RigidBody2D</td><td class="px-4 py-2 border">箱子、足球（物理模拟）</td><td class="px-4 py-2 border">物理引擎自动</td></tr><tr><td class="px-4 py-2 border font-mono text-xs font-semibold">Area2D</td><td class="px-4 py-2 border">检测区域/触发器</td><td class="px-4 py-2 border">代码设置 position</td></tr></tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>CollisionShape2D——定义形状</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>碰撞体本身没有形状！</strong>必须添加 CollisionShape2D 子节点来定义碰撞边界。支持矩形、圆形、胶囊形、凸多边形。</p>
        <div class="mb-4"><Code language="gdscript" :code="collisionCode" title="collision.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>加了 CollisionShape2D 但<strong>忘设 shape</strong>（红三角警告），或形状画在编辑器里但没点开 <code class="bg-amber-100 px-1 rounded text-xs font-mono">editable children</code> 就拖不动。shape 为空 = 没有碰撞。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Area2D——检测区域</h2>
        <div class="mb-4"><Code language="gdscript" :code="areaCode" title="area2d.gd" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 提示：</strong><code class="bg-blue-100 px-1 rounded text-xs font-mono">body_entered</code> 检测<strong>物理体</strong>（StaticBody/CharacterBody/RigidBody），<code class="bg-blue-100 px-1 rounded text-xs font-mono">area_entered</code> 检测<strong>另一个 Area2D</strong>。两者别搞混。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>碰撞层与遮罩（Layer &amp; Mask）</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>Layer</strong> = 我属于哪一层 | <strong>Mask</strong> = 我检测哪些层。≈ 网络中的 subnet mask 概念。</p>
        <div class="mb-4"><Code language="gdscript" :code="layerCode" title="layer_mask.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>加了碰撞体但检测不到？90% 是 Layer/Mask 没设对。双方要互相在对方的 Mask 中。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的碰撞体</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 里每种碰撞对象都挂 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">CollisionShape2D</code>，并用<strong>位掩码</strong>精确控制谁跟谁碰。<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">attack_hitbox.gd</code>（玩家攻击框）和 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">bullet.gd</code>（子弹）是最完整的例子：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="attack_hitbox.gd + bullet.gd — 精简提取" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>项目开始时先定一套<strong>全局 Bit 分配表</strong>（如 Blitz：bit0=玩家、bit1=敌人、bit2=玩家攻击、bit4=墙壁…），每个节点写层时对照注释，避免"碰不到/乱碰"的玄学 bug。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>碰撞体本身没形状</strong>——必须挂 CollisionShape2D 子节点（Circle/Rect/Capsule/凸多边形）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>StaticBody2D</strong> 墙/地板（不动）· <strong>CharacterBody2D</strong> 玩家/敌人（move_and_slide）· <strong>RigidBody2D</strong> 物理模拟</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Area2D</strong> 只检测不阻挡——触发器/感应区/受击判定框，靠 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">body_entered</code>/<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">area_entered</code> 信号</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Layer = 我是谁，Mask = 我检测谁</strong>——检测不到先查这一对</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>位掩码用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">1 &lt;&lt; n</code> 写，配全局 Bit 分配表防错（Blitz 的 1&lt;&lt;0/1&lt;&lt;1/1&lt;&lt;2/1&lt;&lt;4…）</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-4-sprite2d-animated" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Sprite2D</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-6-characterbody2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：CharacterBody2D →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 结构总览"},{id:"sec-1",name:"三种碰撞节点"},{id:"sec-2",name:"CollisionShape2D"},{id:"sec-3",name:"Area2D"},{id:"sec-4",name:"Layer & Mask"},{id:"sec-5",name:"🕹️ Blitz 实战"},{id:"sec-6",name:"小结"}]
const collisionCode = `# 碰撞体本身没有形状！必须用 CollisionShape2D 子节点定义边界
# 方式一：编辑器拖一个 CollisionShape2D 子节点，shape 选 RectangleShape2D

# 方式二：代码创建形状（动态生成场景时常用）
extends StaticBody2D

func _ready() -> void:
    var shape_node: CollisionShape2D = CollisionShape2D.new()
    var rect: RectangleShape2D = RectangleShape2D.new()
    rect.size = Vector2(128, 16)      # 地板大小（128x16）
    shape_node.shape = rect           # 给 CollisionShape2D 赋形状
    add_child(shape_node)             # 挂到碰撞体下`
const areaCode = `# Area2D ——检测区域（进入/离开触发信号）
extends Area2D
func _ready() -> void:
    body_entered.connect(_on_body_entered)   # 物理体进入
    body_exited.connect(_on_body_exited)     # 物理体离开
    area_entered.connect(_on_area_entered)   # 另一个 Area 进入
func _on_body_entered(body: Node2D) -> void:
    if body is Player:   # 类型判断
        print("玩家进入")`
const layerCode = `# Layer = 我属于哪一层（告诉别人我是谁）
# Mask  = 我检测哪些层（告诉引擎我要碰谁）
collision_layer = 1 << 0   # bit0: 我是玩家
collision_mask  = 1 << 4   # bit4: 我只跟墙壁碰撞

# 一个节点可以属于多层，也可以检测多层：
collision_layer = (1 << 0) | (1 << 2)          # 我是玩家 + 玩家攻击
collision_mask  = (1 << 1) | (1 << 4)          # 我检测敌人 + 墙壁`
const blitzCode = `# === attack_hitbox.tscn 结构 ===
# AttackHitbox (Area2D)              ← 短命攻击判定框，0.15s 后自毁
# └── CollisionShape2D → RectangleShape2D

# === attack_hitbox.gd — 位掩码 + 信号 ===
extends Area2D

func _ready() -> void:
    collision_layer = 1 << 2   # bit2: "我是玩家攻击判定"
    collision_mask  = 1 << 1   # bit1: "我检测敌人身体"
    body_entered.connect(_on_body_entered)
    area_entered.connect(_on_area_entered)   # 敌人 Hitbox(Area2D) 也算命中
    var timer: SceneTreeTimer = get_tree().create_timer(lifetime)
    timer.timeout.connect(queue_free)        # 超时自毁（刀光一闪）

func _on_body_entered(body: Node2D) -> void:
    if body in _has_hit:
        return
    _has_hit.append(body)                    # 防止同一目标多次命中
    if body.has_method("take_damage"):
        body.take_damage(damage)

# === bullet.gd — 一层多用：同时检测敌人(bit1) 和 墙壁(bit4) ===
func _ready() -> void:
    collision_layer = 1 << 2                       # bit2: "我是玩家子弹"
    collision_mask  = (1 << 1) | (1 << 4)          # 检测敌人 + 墙壁
    body_entered.connect(_on_body_entered)`
</script>
