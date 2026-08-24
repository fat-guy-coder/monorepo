<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Sprite2D 与 AnimatedSprite2D</h1><p class="text-sm text-slate-500 mt-1">精灵渲染与帧动画——显示图片、播放动画序列</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🖼️</span>Sprite2D——显示一张图</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Sprite2D ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">&lt;img src="player.png" style="position:absolute" /&gt;</code>——在画布上放一张图，可以移动、旋转、缩放、调色。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="spriteCode" title="sprite2d.gd" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 modulate 的妙用：</strong>受击闪白 = <code class="bg-blue-100 px-1 rounded text-xs font-mono">modulate = Color.WHITE</code>；受击变红 = <code class="bg-blue-100 px-1 rounded text-xs font-mono">modulate = Color.RED</code>；淡出 = 调 <code class="bg-blue-100 px-1 rounded text-xs font-mono">modulate.a</code> 透明度——不用换贴图就能做状态反馈。</p></aside></section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎬</span>AnimatedSprite2D——帧动画</h2><p class="text-slate-600 mb-3 leading-relaxed">需要先创建 <strong>SpriteFrames 资源</strong>（包含多张纹理的不同动画）。然后在代码中切换和播放。</p>
        <div class="mb-4"><Code language="gdscript" :code="animCode" title="animated_sprite2d.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>切换动画前先确认动画名存在（编辑器里拼错了运行时报 "Animation not found"）。播放结束后想回 idle，用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">animation_finished</code> 信号连接回调，而不是在 _process 里反复判断当前动画。</p></aside></section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚙️</span>关键属性</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">texture</td><td class="px-4 py-2 border">要显示的纹理（Sprite2D）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">modulate</td><td class="px-4 py-2 border"><strong>颜色叠加</strong>（Color——调色/透明度/闪烁）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">flip_h / flip_v</td><td class="px-4 py-2 border">水平/垂直翻转</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">centered</td><td class="px-4 py-2 border">是否以中心点为原点（默认 true）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">offset</td><td class="px-4 py-2 border">纹理相对于节点位置的偏移</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的"代码精灵"</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 角色<strong>不用 Sprite2D 贴图</strong>——全部用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_draw()</code> 纯代码绘制。它演示了"帧动画"的另一种实现：按状态换颜色/形状，用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">queue_redraw()</code> 每帧重绘，用朝向变量替代 flip_h：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="player.gd — 精简提取" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">方案</th><th class="px-4 py-2 border font-semibold text-slate-700">Sprite2D + AnimatedSprite2D</th><th class="px-4 py-2 border font-semibold text-slate-700">_draw() 代码绘制（Blitz）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-medium">素材</td><td class="px-4 py-2 border">需要美术贴图 / 帧序列</td><td class="px-4 py-2 border">零素材，纯代码</td></tr>
              <tr><td class="px-4 py-2 border font-medium">动画切换</td><td class="px-4 py-2 border font-mono text-xs">anim.play("run")</td><td class="px-4 py-2 border font-mono text-xs">match state: 换颜色/形状</td></tr>
              <tr><td class="px-4 py-2 border font-medium">翻转</td><td class="px-4 py-2 border font-mono text-xs">flip_h = true</td><td class="px-4 py-2 border font-mono text-xs">ed = 1.0 if facing_right else -1.0</td></tr>
              <tr><td class="px-4 py-2 border font-medium">重绘</td><td class="px-4 py-2 border">引擎自动</td><td class="px-4 py-2 border font-mono text-xs">queue_redraw() 每帧</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>做独立游戏原型阶段，用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">_draw()</code> 画色块/圆形起步最快；需要正式美术后再换 Sprite2D/AnimatedSprite2D。两者都用 Node2D 的 position/rotation/scale，迁移成本很低。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Sprite2D</strong> 显示一张静态图：texture / modulate（调色/透明）/ flip_h（翻转）/ centered</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>AnimatedSprite2D</strong> 播放帧序列：SpriteFrames 资源 + <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">play("run")</code> / <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">animation_finished</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>角色转向用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">flip_h = velocity.x &lt; 0</code>——比旋转 180° 更省、更清晰</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>受击反馈用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">modulate</code> 闪白/变红，不用换贴图</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>原型阶段可用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_draw()</code> 纯代码画角色（Blitz 做法），正式美术再换贴图</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-3-node2d-basics" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Node2D 基类</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-5-collision2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：碰撞体 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Sprite2D"},{id:"sec-2",name:"AnimatedSprite2D"},{id:"sec-3",name:"关键属性"},{id:"sec-4",name:"🕹️ Blitz 实战"},{id:"sec-5",name:"小结"}]
const spriteCode = `# Sprite2D ——显示一张纹理
@onready var sprite: Sprite2D = $Sprite2D
func _ready() -> void:
    sprite.texture = preload("res://player.png")
    sprite.modulate = Color.RED       # 叠加红色
    sprite.flip_h = true              # 水平翻转（角色转向）
    sprite.position = Vector2(400, 300)`
const animCode = `extends CharacterBody2D   # 需要 velocity 属性
@onready var anim: AnimatedSprite2D = $AnimatedSprite2D

func _ready() -> void:
    anim.sprite_frames = preload("res://player_frames.tres")
    anim.play("idle")
    anim.animation_finished.connect(_on_animation_finished)

func _physics_process(delta: float) -> void:
    if velocity.x != 0:
        anim.play("run")                # 切换为跑步动画
        anim.flip_h = velocity.x < 0    # 根据方向翻转
    else:
        anim.play("idle")

func _on_animation_finished() -> void:
    anim.play("idle")                   # 播完回到待机`
const blitzCode = `# === player.gd — "帧动画"用 match state 模拟 ===
# Sprite2D 方案用多张贴图播动画；Blitz 用 _draw() 按状态换颜色/形状
func _draw() -> void:
    if state == State.DEAD:
        return
    var body_color: Color
    match state:
        State.DASHING:   body_color = Color.CYAN              # 青色闪避
        State.ATTACKING: body_color = Color.WHITE             # 白色出刀
        State.HIT:       body_color = Color.RED               # 红色受伤
        _:               body_color = Color(0.2, 0.55, 0.95)  # 蓝色正常
    draw_circle(Vector2.ZERO, 15, body_color)

# 每物理帧 queue_redraw() → 状态一变，外观立刻更新
func _physics_process(delta: float) -> void:
    match state:
        State.NORMAL:     _process_normal(delta)
        State.ATTACKING:  _process_attacking(delta)
        State.DASHING:    _process_dash(delta)
        State.HIT:        _process_hit(delta)
    queue_redraw()

# 朝向翻转：Sprite2D.flip_h ≈ 这里的 ed 系数（眼睛朝右 / 左）
var facing_right: bool = true
func _draw_eye() -> void:
    var ed: float = 1.0 if facing_right else -1.0
    draw_circle(Vector2(5.0 * ed, -5.0), 3.5, Color.WHITE)
    draw_circle(Vector2(7.0 * ed, -5.0), 2.0, Color.BLACK)`
</script>
