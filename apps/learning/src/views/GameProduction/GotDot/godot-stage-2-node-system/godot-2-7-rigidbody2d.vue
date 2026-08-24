<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">RigidBody2D</h1>
          <p class="text-sm text-slate-500 mt-1">物理引擎控制的 2D 刚体——重力、碰撞、力与冲量</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-7</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 三种物理体对比图 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>三种物理体对比</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Godot 的 2D 物理体分为三种，核心区别是<strong>「谁在控制移动」</strong>。写代码前先想清楚：这个物体需要多强的物理真实性？</p>
        <figure>
          <svg viewBox="0 0 720 236" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>

            <!-- StaticBody2D 卡片 -->
            <rect x="40" y="36" width="190" height="178" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <rect x="40" y="36" width="190" height="30" rx="10" fill="#94a3b8" />
            <text x="135" y="51" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">StaticBody2D</text>
            <text x="135" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">谁来动：谁都不动</text>
            <rect x="96" y="118" width="78" height="12" rx="3" fill="#94a3b8" />
            <rect x="130" y="98" width="18" height="20" rx="2" fill="#475569" />
            <text x="135" y="150" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#334155">▸ 地面 / 墙 / 平台</text>
            <text x="135" y="168" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#334155">▸ 不响应力 / 不反弹</text>
            <text x="135" y="186" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#334155">▸ 性能开销最小</text>

            <!-- CharacterBody2D 卡片 -->
            <rect x="265" y="36" width="190" height="178" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <rect x="265" y="36" width="190" height="30" rx="10" fill="#2563eb" />
            <text x="360" y="51" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">CharacterBody2D</text>
            <text x="360" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">谁来动：代码控制</text>
            <circle cx="360" cy="120" r="16" fill="#3b82f6" />
            <line x1="360" y1="120" x2="328" y2="120" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#ov-arr)" />
            <text x="360" y="150" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#334155">▸ 每帧设 velocity</text>
            <text x="360" y="168" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#334155">▸ move_and_slide() 移动</text>
            <text x="360" y="186" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#334155">▸ 玩家 / 敌人（手感可预测）</text>

            <!-- RigidBody2D 卡片（本文主角） -->
            <rect x="490" y="36" width="190" height="178" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="2" />
            <rect x="490" y="36" width="190" height="30" rx="10" fill="#1d4ed8" />
            <text x="585" y="51" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">RigidBody2D ★</text>
            <text x="585" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">谁来动：物理引擎</text>
            <circle cx="585" cy="118" r="16" fill="#f59e0b" />
            <line x1="585" y1="118" x2="618" y2="118" stroke="#1d4ed8" stroke-width="2.5" />
            <text x="585" y="150" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#334155">▸ 施加力 / 冲量</text>
            <text x="585" y="168" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#334155">▸ 自动算碰撞 / 旋转</text>
            <text x="585" y="186" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#1d4ed8">▸ 箱子 / 弹球 / 滚石</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：三种物理体 —— 核心区别是「谁在控制移动」。本文主角 RigidBody2D 把运动完全交给物理引擎。</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚽</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>RigidBody2D ≈ 把 div 交给<strong>物理引擎（如 Matter.js）</strong>来控制——你只施加力/冲量，引擎自动计算位置、速度、旋转。≈ CSS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">@keyframes</code> 物理版，只是动画由「模拟」而非「关键帧」驱动。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">vs CharacterBody2D：CharacterBody 你写代码控制每帧移动多少；RigidBody 你施加<strong>力/冲量</strong>，物理引擎算位置。箱子、滚石、弹球、需要真实物理的物体用 RigidBody。</p>
        <div class="mb-4"><Code language="gdscript" :code="rigidCode" title="rigid_body_2d.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>施加力 vs 施加冲量</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">apply_central_force()</th><th class="px-4 py-2 border font-semibold text-slate-700">apply_central_impulse()</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">效果</td><td class="px-4 py-2 border">持续施加力（如火箭推进）</td><td class="px-4 py-2 border">瞬间改变速度（如跳跃、爆炸）</td></tr>
              <tr><td class="px-4 py-2 border">调用时机</td><td class="px-4 py-2 border"><strong>每物理帧重复调用</strong>才有效</td><td class="px-4 py-2 border"><strong>一次调用</strong>即生效</td></tr>
              <tr><td class="px-4 py-2 border">类比</td><td class="px-4 py-2 border">引擎持续推车</td><td class="px-4 py-2 border">一脚踢飞足球</td></tr>
              <tr><td class="px-4 py-2 border">公式</td><td class="px-4 py-2 border font-mono text-xs">F = ma（逐帧累加）</td><td class="px-4 py-2 border font-mono text-xs">Δv = F·t/m（直接加）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="gdscript" :code="forceImpulseCode" title="force_vs_impulse.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚙️</span>刚体 API：_integrate_forces 与速度控制</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">刚体特有的回调是 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_integrate_forces(state)</code>——它在物理引擎解算<strong>之前</strong>触发，是安全读写速度/角速度的唯一正规入口。</p>
        <div class="mb-4"><Code language="gdscript" :code="apiCode" title="rigidbody_api.gd" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 提示：</strong>普通移动/跳跃/推箱子用 <code class="bg-blue-100 px-1 rounded text-xs font-mono">_physics_process</code> 里施加力即可；需要<strong>精确控制速度</strong>（限速、击退、传送后复位）才需要 <code class="bg-blue-100 px-1 rounded text-xs font-mono">_integrate_forces</code>。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>关键属性</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">mass</td><td class="px-4 py-2 border">质量（影响惯性和碰撞力度）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">gravity_scale</td><td class="px-4 py-2 border">重力缩放（0=无重力，1=正常，-1=反重力）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">freeze</td><td class="px-4 py-2 border">冻结物理（暂停模拟，节省性能）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">linear_velocity</td><td class="px-4 py-2 border">当前线速度（读写在 _integrate_forces 中更安全）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">angular_velocity</td><td class="px-4 py-2 border">当前角速度（旋转速度）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">linear_damp</td><td class="px-4 py-2 border">线性阻尼（0=无摩擦，越大越快停下）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">sleeping</td><td class="px-4 py-2 border">是否睡眠（静止后自动睡眠，唤醒=设为 false）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 在 _physics_process 里直接改 linear_velocity：</strong>刚体的速度由物理引擎管理，直接赋值会被当作「瞬移修正」，导致抖动或互相抵消。要改速度，请在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">_integrate_forces(state)</code> 里改 <code class="bg-amber-100 px-1 rounded text-xs font-mono">state.linear_velocity</code>，或在 _physics_process 里用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">apply_central_impulse()</code>。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 用 RigidBody2D 做角色控制：</strong>角色移动要求「我按一下、立刻动」，RigidBody 交给引擎模拟会有惯性、手感像「推一个有惯性的球」。角色/敌人请用 CharacterBody2D，RigidBody2D 留给箱子、弹球等物理道具。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ apply_central_force 只在 _ready 里调一次：</strong>力是<strong>逐帧累积</strong>的，只在初始化时调用一次相当于什么都没做。持续力要放在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">_physics_process</code> 里每帧施加。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 忘了限制最大速度：</strong>刚体在陡坡或大冲量下可能高速穿透薄墙（隧道效应）。用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">state.linear_velocity.limit_length(max_speed)</code> 兜底，同时把碰撞体厚度做大一点。</p></aside>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 为什么不用 RigidBody2D</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">打开 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/player.gd</code>，Blitz 的主角（player.gd）和敌人（enemy.gd）<strong>全部用 CharacterBody2D</strong>，因为平台跳跃需要「按一下、立刻跳」的确定性手感。三者的分工正好验证图 1：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>角色/敌人</strong> → CharacterBody2D（精确控制，见 player.gd）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>地面/平台</strong> → StaticBody2D（见 main.gd 的 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_create_wall</code>）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>掉落物/弹射道具</strong> → 这里才是 RigidBody2D 的用武之地</span></li>
        </ul>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="player.gd — 精简" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>需要「精确控制 + 地面检测」→ CharacterBody；需要「真实碰撞/反弹/旋转」→ RigidBody；完全静止 → StaticBody。别用 RigidBody 写平台跳跃。</p></aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>三种物理体</strong>：StaticBody 静止 / CharacterBody 代码控制 / RigidBody 引擎模拟</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>力 = 持续</strong>（每帧调用）、<strong>冲量 = 瞬间</strong>（一次调用）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>改速度用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_integrate_forces(state)</code>，不要直接改 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">linear_velocity</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>角色用 CharacterBody2D，物理道具（箱子/弹球/滚石）用 RigidBody2D</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>静止刚体自动睡眠省性能；<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">freeze = true</code> 彻底停模拟</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>大冲量场景务必用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">limit_length()</code> 限制最大速度，防高速穿墙</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-6-characterbody2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：CharacterBody2D</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-8-tilemap" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：TileMap →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-overview", name: "📐 三种物理体对比" },
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "力 vs 冲量" },
  { id: "sec-3", name: "刚体 API" },
  { id: "sec-4", name: "关键属性" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-6", name: "🕹️ 实战 Blitz" },
  { id: "sec-7", name: "小结" },
]

const rigidCode = `extends RigidBody2D
## 一个简单的弹球 —— 物理引擎完全接管运动

@export var launch_impulse: float = 500.0

func _ready() -> void:
    # 施加一次瞬间冲量(发射/爆炸/跳跃)
    apply_central_impulse(Vector2(0, -launch_impulse))
    # 施加持续力(火箭推进)——每个物理帧都会累加
    apply_central_force(Vector2(80, 0))

## _integrate_forces 是刚体特有的回调:
## 在物理引擎解算之前,允许你安全修改速度/角速度
func _integrate_forces(state: PhysicsDirectBodyState2D) -> void:
    var vel: Vector2 = state.linear_velocity
    # 限制最大速度,防止刚体高速穿墙
    state.linear_velocity = vel.limit_length(600.0)`

const forceImpulseCode = `extends RigidBody2D
## 力(F) vs 冲量(Δp)—— 区别就在「持续」 vs 「瞬间」

func _apply_force(direction: Vector2, strength: float) -> void:
    # 持续力: 每帧都要重复调用,速度才会持续变化
    # F = ma,逐帧累加 —— 适合推进器 / 风 / 引力
    apply_central_force(direction.normalized() * strength)

func _apply_impulse(direction: Vector2, strength: float) -> void:
    # 冲量: 一次性立即改变速度
    # Δv = F·t / m —— 适合跳跃 / 爆炸 / 击飞
    apply_central_impulse(direction.normalized() * strength)

func _on_explode() -> void:
    _apply_impulse(Vector2.UP, 600.0)          # 爆炸:瞬间速度突变

func _physics_process(delta: float) -> void:
    _apply_force(Vector2.RIGHT, 300.0 * delta) # 推进器:持续加速`

const apiCode = `extends RigidBody2D
## 刚体常用 API 一览

# —— 力 / 冲量(作用于质心) ——
# apply_central_force(v)      持续施加力
# apply_central_impulse(v)    瞬间冲量
# apply_torque(t)             持续施加扭矩(自旋)
# apply_torque_impulse(t)     瞬间扭矩(急转)

# —— 速度 / 旋转 ——
func teleport(to: Vector2) -> void:
    linear_velocity = Vector2.ZERO  # 重置线速度
    angular_velocity = 0.0          # 停止自旋
    position = to                   # 直接搬移位置

# —— 睡眠 / 冻结 ——
func wake() -> void:
    sleeping = false                # 刚体静止后自动睡眠省性能,可手动唤醒

func freeze_physics() -> void:
    freeze = true                   # 彻底暂停模拟(结算界面常用)`

const blitzCode = `extends CharacterBody2D
## Blitz player.gd 精简 —— 为什么「角色」不用 RigidBody2D?
## 角色要求: 即时响应 + 手感可预测 + 地面检测

@export var move_speed: float = 320.0
@export var jump_velocity: float = -520.0
var gravity: float = 1400.0

func _physics_process(delta: float) -> void:
    # 1. 直接改 velocity(每帧精确控制,而非「施加力等引擎解算」)
    var input_dir: float = Input.get_axis("move_left", "move_right")
    velocity.x = move_toward(velocity.x, input_dir * move_speed, 2000.0 * delta)
    if not is_on_floor():
        velocity.y += gravity * delta
    # 2. move_and_slide() 处理碰撞,并更新 is_on_floor()/is_on_wall()
    move_and_slide()`
</script>
