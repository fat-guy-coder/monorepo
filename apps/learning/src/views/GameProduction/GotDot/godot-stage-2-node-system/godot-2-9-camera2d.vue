<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Camera2D</h1>
          <p class="text-sm text-slate-500 mt-1">2D 相机——控制玩家视野、跟随、边界、震动效果</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-9</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📷</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Camera2D ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">overflow: hidden</code> 的视口——决定玩家看到游戏世界的哪一部分。跟随玩家、限制边界、平滑过渡，就像浏览器里的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">scrollTo</code> + 平滑滚动。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="cameraCode" title="camera2d.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>跟随玩家的两种方式</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">方式 1：Camera2D 作为玩家子节点（最简单，0 代码）</h3>
        <div class="mb-4"><Code language="gdscript" :code="childMethodCode" title="child_camera.gd" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">方式 2：代码控制（推荐，可平滑 + 边界）</h3>
        <div class="mb-4"><Code language="gdscript" :code="cameraFollowCode" title="camera_follow.gd" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>游戏里<strong>两种方式混用</strong>——相机仍挂在玩家子节点下（省去每帧同步），再用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">position_smoothing_enabled</code> 平滑，加 limits 限界。Blitz 就是这种组合（见实战章节）。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>平滑与边界</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">相机直接锁定玩家会「硬邦邦」地跳；玩家跑到地图边缘时若没有边界，会看到地图外的空白。平滑 + 边界是 2D 相机的两个标配。</p>
        <div class="mb-4"><Code language="gdscript" :code="smoothCode" title="camera_setup.gd" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">属性</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">enabled</td><td class="px-4 py-2 border">是否激活（场景可有多个 Camera2D，同时只有一个 active）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">zoom</td><td class="px-4 py-2 border">缩放（Vector2，1.0=正常，2.0=放大，0.5=拉远）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">limit_left/right/top/bottom</td><td class="px-4 py-2 border">相机边界（限制视野范围，防止看到地图外）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">position_smoothing_enabled</td><td class="px-4 py-2 border">平滑跟随（推荐开启，避免画面抖动）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">position_smoothing_speed</td><td class="px-4 py-2 border">平滑速度（值越小越平滑，推荐 5-10）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">offset</td><td class="px-4 py-2 border">相机偏移（震动、瞄准时微调视野用）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 提示：</strong>手动平滑也可以用帧率无关的 lerp——<code class="bg-blue-100 px-1 rounded text-xs font-mono">weight = 1.0 - exp(-8.0 * delta)</code>。这样无论 60fps 还是 120fps，平滑速度都一致。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>相机震动与缩放</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">受击、爆炸、掉血时的「屏幕震一下」，用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">offset</code> + 随机数实现；缩放用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">zoom</code> 平滑渐变（Boss 战拉近、结算拉远）。</p>
        <div class="mb-4"><Code language="gdscript" :code="shakeCode" title="camera_shake.gd" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 提示：</strong>缩放的平滑过渡用 Tween：<code class="bg-blue-100 px-1 rounded text-xs font-mono">create_tween().tween_property(camera, "zoom", Vector2(0.8, 0.8), 0.5)</code>。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 场景里多个 Camera2D 同时 enabled：</strong>Godot 同一时间只有一个相机真正渲染，后激活的会「抢走」画面，导致闪黑/视角瞬移。切场景或切镜头时，先 <code class="bg-amber-100 px-1 rounded text-xs font-mono">old_cam.enabled = false</code> 再 <code class="bg-amber-100 px-1 rounded text-xs font-mono">new_cam.enabled = true</code>。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ position_smoothing_speed 设得太小：</strong>相机「跟不上」玩家，角色会跑出屏幕边缘一小段才被追上。建议 5~10；如果角色冲刺速度很快，把 smoothing_speed 调到 12+。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 忘了设 limit_* 边界：</strong>玩家走到地图边缘，画面露出一大片空白背景。地图铺完记得设 <code class="bg-amber-100 px-1 rounded text-xs font-mono">limit_left/right/top/bottom</code>，或直接在编辑器中点击「自动设边界」。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 震动不衰减：</strong>offset 一直加随机值却不清零，画面持续抖动。震动实现必须包含「衰减」——每帧按时间把 shake_strength 减小，震幅才逐渐停。</p></aside>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的相机配置</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">打开 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/main.gd</code> 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_create_player()</code>——Blitz 用「相机挂在玩家子节点 + 平滑 + 边界」的组合，代码极少但效果完整：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="main.gd — 相机部分" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>先把相机当玩家子节点跑起来（0 代码），再逐步加 smoothing、limits、zoom——每一步都能立刻在 F5 里看到效果。</p></aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Camera2D = 2D 游戏的视口，<strong>同一时间只有一个 enabled 生效</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>跟随：子节点零代码 / 代码控制可加平滑与边界</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>平滑用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">position_smoothing_enabled</code>，或帧率无关的 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">lerp + exp(-speed·delta)</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>边界用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">limit_left/right/top/bottom</code>，防止看到地图外</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>震动 = offset + 随机数，且必须随时间衰减</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Blitz（main.gd）：相机挂 player 子节点 + smoothing + limits，一步到位</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-8-tilemap" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：TileMap</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-10-parallax2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Parallax2D →</RouterLink>
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
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "跟随方式" },
  { id: "sec-3", name: "平滑与边界" },
  { id: "sec-4", name: "震动与缩放" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-6", name: "🕹️ 实战 Blitz" },
  { id: "sec-7", name: "小结" },
]

const cameraCode = `extends Camera2D
## Camera2D 是 2D 游戏的"视口" —— 决定玩家看到世界哪一块

func _ready() -> void:
    enabled = true                       # 激活(场景里同时只有一个相机生效)
    zoom = Vector2(1.5, 1.5)             # 放大 1.5 倍(数字越小看得越广)
    limit_left = 0; limit_top = 0        # 相机边界(防看到地图外)
    limit_right = 3200; limit_bottom = 2400
    position_smoothing_enabled = true    # 平滑跟随,避免画面抖动
    position_smoothing_speed = 8.0       # 平滑速度(越小越"粘")`

const childMethodCode = `# 方式 1: Camera2D 作为 Player 的子节点 —— 零代码自动跟随
# 场景树:
#   Player (CharacterBody2D)
#   └── Camera2D          ← 只要 enabled = true,自动跟着玩家走
#
# 优点: 写 0 行代码
# 缺点: 刚性跟随,无平滑;边界需要手动在相机上设 limits`

const cameraFollowCode = `# 方式 2: Camera2D 独立于 Player,代码跟随 —— 可控性最强
@onready var camera: Camera2D = $Camera2D
@onready var player: CharacterBody2D = $"../Player"

func _physics_process(_delta: float) -> void:
    camera.global_position = player.global_position

# 更平滑的写法(帧率无关的 lerp 插值)
func _physics_process(delta: float) -> void:
    var target: Vector2 = player.global_position
    var weight: float = 1.0 - exp(-8.0 * delta)   # 8 = 平滑系数
    camera.global_position = camera.global_position.lerp(target, weight)`

const smoothCode = `# 平滑跟随三要素: smoothing / limits / zoom
func setup_camera() -> void:
    # 1. 平滑(推荐开) —— 否则相机逐像素跟,画面会抖
    position_smoothing_enabled = true
    position_smoothing_speed = 8.0     # 推荐 5~10,越小越平滑

    # 2. 边界 —— 防止看到地图外的空白
    limit_left = 0
    limit_top = 0
    limit_right = 3200
    limit_bottom = 720

    # 3. 缩放 —— 2D 常用固定值,想"拉近/拉远"再动态改
    zoom = Vector2(1, 1)`

const shakeCode = `# 相机震动 —— 受击/爆炸时"屏幕震一下"
var shake_strength: float = 0.0

func _process(delta: float) -> void:
    # 衰减震动强度(不衰减就会一直抖)
    shake_strength = maxf(0.0, shake_strength - delta * 30.0)
    # 用随机偏移控制震幅
    offset = Vector2(
        randf_range(-1.0, 1.0) * shake_strength,
        randf_range(-1.0, 1.0) * shake_strength
    )

func add_shake(strength: float) -> void:
    shake_strength = minf(shake_strength + strength, 20.0)

# 用法: 玩家受击时调用 add_shake(12.0)`

const blitzCode = `# main.gd 精简 —— Blitz 的相机配置
# 相机作为 player 的子节点,自动跟随;再叠加 smoothing + limits
func _create_player() -> void:
    player = PlayerScene.instantiate()
    player.name = "Player"
    player.position = Vector2(120, GROUND_Y - 40)
    add_child(player)

    # 摄像机跟随 —— 作为 player 的子节点自动跟随
    var cam: Camera2D = Camera2D.new()
    cam.position_smoothing_enabled = true
    cam.position_smoothing_speed = 10.0
    cam.limit_left   = -50
    cam.limit_right  = int(LEVEL_WIDTH) + 50   # LEVEL_WIDTH = 3200
    cam.limit_top    = -200
    cam.limit_bottom = int(LEVEL_HEIGHT)       # LEVEL_HEIGHT = 720
    player.add_child(cam)`
</script>
