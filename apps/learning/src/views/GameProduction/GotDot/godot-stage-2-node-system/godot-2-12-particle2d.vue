<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">✨ 粒子效果</h1>
          <p class="text-sm text-slate-500 mt-1">GPUParticles2D / CPUParticles2D——火焰、烟雾、爆炸、魔法特效</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/enemy.gd" label="📝 enemy.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-12</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 粒子系统组成结构图 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>粒子系统组成</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">一个粒子系统 = <strong>Particles 节点</strong>（怎么发/发多少/发多久）→ <strong>粒子材质</strong>（每个粒子怎么飞/长什么样）→ <strong>发射效果</strong>（把参数翻译成成百上千个运动的小点）。</p>
        <figure>
          <svg viewBox="0 0 720 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="pt-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- ① 节点 -->
            <text x="50" y="26" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">① Particles 节点</text>
            <rect x="24" y="40" width="190" height="150" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="24" y="40" width="190" height="26" rx="8" fill="#3b82f6" />
            <text x="119" y="53" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">GPUParticles2D</text>
            <text x="40" y="84" font-size="10" font-family="monospace" fill="#334155">amount=200 (数量)</text>
            <text x="40" y="102" font-size="10" font-family="monospace" fill="#334155">lifetime=1.5s (存活)</text>
            <text x="40" y="120" font-size="10" font-family="monospace" fill="#334155">one_shot=true (一次性)</text>
            <text x="40" y="138" font-size="10" font-family="monospace" fill="#334155">emitting=true (开关)</text>
            <text x="40" y="156" font-size="10" font-family="monospace" fill="#334155">explosiveness=1 (爆发)</text>

            <line x1="220" y1="115" x2="244" y2="115" stroke="#94a3b8" stroke-width="2" marker-end="url(#pt-arr)" />

            <!-- ② 粒子材质 -->
            <text x="260" y="26" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">② 粒子材质</text>
            <rect x="244" y="40" width="210" height="150" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="244" y="40" width="210" height="26" rx="8" fill="#2563eb" />
            <text x="349" y="53" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">ParticleProcessMaterial</text>
            <text x="260" y="84" font-size="10" font-family="monospace" fill="#334155">spread=45° (发射角度)</text>
            <text x="260" y="102" font-size="10" font-family="monospace" fill="#334155">initial_velocity=300 (初速)</text>
            <text x="260" y="120" font-size="10" font-family="monospace" fill="#334155">gravity=(0, 800) (重力)</text>
            <text x="260" y="138" font-size="10" font-family="monospace" fill="#334155">scale_min/max (大小)</text>
            <text x="260" y="156" font-size="10" font-family="monospace" fill="#334155">color 渐变 (颜色)</text>

            <line x1="460" y1="115" x2="484" y2="115" stroke="#94a3b8" stroke-width="2" marker-end="url(#pt-arr)" />

            <!-- ③ 发射效果 -->
            <text x="500" y="26" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">③ 发射效果</text>
            <circle cx="600" cy="120" r="6" fill="#f59e0b" />
            <circle cx="572" cy="92" r="8" fill="#ef4444" opacity="0.85" />
            <circle cx="628" cy="94" r="7" fill="#f97316" opacity="0.8" />
            <circle cx="560" cy="130" r="6" fill="#fbbf24" opacity="0.9" />
            <circle cx="640" cy="132" r="5" fill="#ef4444" opacity="0.8" />
            <circle cx="588" cy="70" r="5" fill="#f97316" opacity="0.7" />
            <circle cx="614" cy="160" r="6" fill="#fbbf24" opacity="0.75" />
            <circle cx="548" cy="108" r="5" fill="#ef4444" opacity="0.6" />
            <circle cx="652" cy="110" r="6" fill="#f97316" opacity="0.7" />
            <text x="600" y="196" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">火焰 / 烟雾 / 爆炸</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：粒子系统组成 —— 节点（发射控制）→ 材质（单粒子行为）→ 发射效果</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">✨</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>粒子系统 ≈ <strong>CSS 粒子动画库（tsParticles / particles.js）</strong>——用参数描述粒子行为，引擎自动模拟成百上千个粒子。≈ Canvas 2D 粒子效果，但 GPU 加速。</p></aside>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">节点</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th><th class="px-4 py-2 border font-semibold text-slate-700">适用场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs font-semibold">GPUParticles2D</td><td class="px-4 py-2 border"><strong>GPU 加速（推荐）</strong></td><td class="px-4 py-2 border">大量粒子（火焰、烟雾、雨、雪）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">CPUParticles2D</td><td class="px-4 py-2 border">CPU 计算——兼容性好</td><td class="px-4 py-2 border">少量粒子或老设备兼容</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="gdscript" :code="particleCode" title="particles2d.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>Process Material 粒子材质</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">粒子行为由 <strong>Process Material</strong> 控制——这是粒子效果的核心。在 Inspector 中创建 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">ParticleProcessMaterial</code>，然后调整参数：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">参数</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">spread</td><td class="px-4 py-2 border">发射角度范围（0=直线，180=全方向）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">gravity</td><td class="px-4 py-2 border">粒子受重力影响的方向和大小</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">initial_velocity_min/max</td><td class="px-4 py-2 border">初始速度范围（随机取值）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">scale_min/max</td><td class="px-4 py-2 border">粒子大小范围</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">color</td><td class="px-4 py-2 border">粒子颜色渐变（可随时间变色）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">lifetime_randomness</td><td class="px-4 py-2 border">生命周期随机波动（0-1，越大越不均匀）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>关键属性与特效组合</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">amount</td><td class="px-4 py-2 border">粒子数量（影响性能，大数量用 GPU）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">lifetime</td><td class="px-4 py-2 border">每个粒子的存活时间（秒）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">one_shot</td><td class="px-4 py-2 border">true=一次发射完（爆炸），false=持续发射（火焰）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">explosiveness</td><td class="px-4 py-2 border">0=持续发射，1=瞬间全部发射</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">emitting</td><td class="px-4 py-2 border">代码控制：true=发射中，false=停止</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="gdscript" :code="comboCode" title="effect_combos.gd" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 推荐工作流：</strong>编辑器中视觉调试参数（所见即所得），代码只控制 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">emitting</code> 开关。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 爆炸忘了 one_shot = true：</strong>爆炸会变成「持续喷火」。一次性特效 = <code class="bg-amber-100 px-1 rounded text-xs font-mono">one_shot = true</code> + <code class="bg-amber-100 px-1 rounded text-xs font-mono">explosiveness = 1.0</code>。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 几百个粒子却用 CPUParticles2D：</strong>CPU 逐粒子模拟会卡。大量粒子（火焰/雨雪）用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">GPUParticles2D</code>；CPUParticles2D 只留给个位数粒子或老设备。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 忘了给粒子材质设 initial_velocity：</strong>粒子初速为 0 就「原地不动」。先给材质设初始速度 + spread，粒子才会飞出去。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 一次性特效播完不清理：</strong>one_shot 播完 emitting 会变 false，但节点还挂着。特效播完用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">finished</code> 信号或 SceneTreeTimer 调 <code class="bg-amber-100 px-1 rounded text-xs font-mono">queue_free()</code>。</p></aside>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的手绘粒子特效</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">打开 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/enemy.gd</code>——Blitz 的死亡特效<strong>没用 GPUParticles2D</strong>，而是用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_draw()</code> 手绘 8 颗粒子。理由：一次性、个位数粒子，手绘零资源、更轻量。子弹命中（bullet.gd）、格挡（main.gd）的特效也都是这个模式。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzParticleCode" title="enemy.gd — 死亡特效精简" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">方案</th><th class="px-4 py-2 border font-semibold text-slate-700">适用</th><th class="px-4 py-2 border font-semibold text-slate-700">优点</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">GPUParticles2D</td><td class="px-4 py-2 border">常驻/大量（火焰、雨、雪、爆炸）</td><td class="px-4 py-2 border">千颗粒子也流畅，参数化可复用</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">_draw() 手绘</td><td class="px-4 py-2 border">一次性/少量（死亡、受击、火花）</td><td class="px-4 py-2 border">零素材零节点，几行代码搞定</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>特效数量少、一次性 → 手绘 _draw()；特效要常驻、数量大 → GPUParticles2D 并放到 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">CanvasLayer</code> 或 z_index 分层。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>粒子系统 = <strong>Particles 节点</strong> + <strong>粒子材质</strong> + <strong>发射参数</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>GPUParticles2D 适合大量；CPUParticles2D 适合少量/老设备</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>一次性（爆炸）= <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">one_shot + explosiveness=1</code>；持续（火焰）= <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">one_shot=false</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>单粒子行为全在材质里：spread / initial_velocity / gravity / color</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>编辑器调参所见即所得，代码只控制 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">emitting</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>一次性小特效可 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_draw()</code> 手绘（Blitz 的死亡/受击特效）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-11-audiostream" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：AudioStream</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-3-controls-ui/godot-3-1-control-basics" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：UI 系统 →</RouterLink>
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
  { id: "sec-overview", name: "📐 粒子系统组成" },
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "粒子材质" },
  { id: "sec-3", name: "关键属性" },
  { id: "sec-4", name: "常见错误" },
  { id: "sec-5", name: "🕹️ 实战 Blitz" },
  { id: "sec-6", name: "小结" },
]

const particleCode = `extends GPUParticles2D
## GPUParticles2D —— 代码控制发射

func _ready() -> void:
    emitting = false    # 默认不发射(等触发)

func explode() -> void:
    one_shot = true     # 一次性爆发(爆炸)
    emitting = true

func start_fire() -> void:
    one_shot = false    # 持续发射(火焰)
    emitting = true

func stop_fire() -> void:
    emitting = false    # 停止发射`

const comboCode = `# 关键属性组合 —— 不同组合 = 不同特效
# 火焰:   one_shot=false + explosiveness=0 + 小初速 + 向上重力
# 爆炸:   one_shot=true  + explosiveness=1 + 大初速 + spread=180
# 下雨:   one_shot=false + 长 lifetime + 恒定速度下落

func setup_explosion() -> void:
    amount = 100
    lifetime = 0.8
    one_shot = true
    explosiveness = 1.0     # 0=持续发射, 1=瞬间全发
    emitting = true`

const blitzParticleCode = `# Blitz enemy.gd 精简 —— 用 _draw() 手绘"粒子爆炸"特效
# 不用 GPUParticles2D 的理由: 一次性 8 颗粒子,手绘更轻量、零资源
func _spawn_death_effect() -> void:
    var fx: Node2D = Node2D.new()
    fx.position = position
    fx.set_script(_death_fx_script())
    get_tree().current_scene.add_child(fx)
    var t: SceneTreeTimer = get_tree().create_timer(0.5)
    t.timeout.connect(fx.queue_free)   # 0.5 秒后自动清理

func _death_fx_script() -> Script:
    var s: GDScript = GDScript.new()
    s.source_code = """extends Node2D

func _draw():
    for i in range(8):
        var angle: float = float(i) / 8.0 * TAU
        var dist: float = randf_range(6.0, 18.0)
        var pos: Vector2 = Vector2(cos(angle), sin(angle)) * dist
        draw_circle(pos, randf_range(2.0, 5.0), Color.ORANGE)
        draw_circle(pos * 0.5, randf_range(1.0, 3.0), Color.YELLOW)
"""
    s.reload()
    return s`
</script>
