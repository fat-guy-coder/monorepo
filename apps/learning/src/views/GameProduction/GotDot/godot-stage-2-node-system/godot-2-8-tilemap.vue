<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗺️ TileMap 与等距投影</h1>
          <p class="text-sm text-slate-500 mt-1">瓦片地图 + 等距 3/4 视角的核心数学 + Y-sort 深度排序</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 Blitz main.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-8</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 TileMap 层级结构图 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>TileMap 层级结构</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">一条完整链路：<strong>TileSet 图块集</strong>（定义有哪些瓦片 + 碰撞）→ <strong>TileMapLayer 节点</strong>（把图块铺到格子坐标）→ <strong>单元格</strong>（世界坐标 ↔ 格子坐标换算）→ <strong>碰撞</strong>（图块自带的碰撞形状参与物理）。</p>
        <figure>
          <svg viewBox="0 0 720 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="tl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- ① TileSet 图块集 -->
            <text x="50" y="26" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">① TileSet 图块集</text>
            <rect x="24" y="40" width="120" height="120" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="32" y="48" width="50" height="50" rx="2" fill="#4ade80" />
            <rect x="86" y="48" width="50" height="50" rx="2" fill="#38bdf8" />
            <rect x="32" y="102" width="50" height="50" rx="2" fill="#94a3b8" />
            <rect x="86" y="102" width="50" height="50" rx="2" fill="#fbbf24" />
            <text x="84" y="176" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">一组瓦片图</text>

            <line x1="150" y1="100" x2="174" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#tl-arr)" />

            <!-- ② TileMapLayer 节点 -->
            <text x="190" y="26" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">② TileMapLayer 节点</text>
            <rect x="180" y="40" width="120" height="120" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="192" y="56" width="24" height="24" rx="2" fill="#4ade80" />
            <rect x="218" y="56" width="24" height="24" rx="2" fill="#4ade80" />
            <rect x="244" y="56" width="24" height="24" rx="2" fill="#38bdf8" />
            <rect x="192" y="82" width="24" height="24" rx="2" fill="#4ade80" />
            <rect x="218" y="82" width="24" height="24" rx="2" fill="#38bdf8" />
            <rect x="244" y="82" width="24" height="24" rx="2" fill="#4ade80" />
            <rect x="192" y="108" width="24" height="24" rx="2" fill="#fbbf24" />
            <rect x="218" y="108" width="24" height="24" rx="2" fill="#4ade80" />
            <rect x="244" y="108" width="24" height="24" rx="2" fill="#4ade80" />
            <text x="240" y="176" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">把图块铺到格子</text>

            <line x1="306" y1="100" x2="330" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#tl-arr)" />

            <!-- ③ 单元格 -->
            <text x="346" y="26" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">③ 单元格</text>
            <rect x="336" y="40" width="120" height="120" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="376" y="70" width="40" height="40" rx="2" fill="#4ade80" stroke="#2563eb" stroke-width="2" />
            <text x="396" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#ffffff">草</text>
            <text x="396" y="124" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">local_to_map(world)</text>
            <text x="396" y="140" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">→ 取格子坐标</text>

            <line x1="462" y1="100" x2="486" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#tl-arr)" />

            <!-- ④ 碰撞 -->
            <text x="502" y="26" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">④ 碰撞</text>
            <rect x="492" y="40" width="120" height="120" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="532" y="70" width="40" height="40" rx="2" fill="#cbd5e1" />
            <rect x="532" y="70" width="40" height="40" rx="2" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3" />
            <text x="552" y="124" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">TileSet 里给图块</text>
            <text x="552" y="140" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">添加碰撞形状</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：TileMap 层级链路 —— TileSet（资源）→ TileMapLayer（节点）→ 单元格 → 碰撞</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🗺️</span>TileMap = 关卡编辑器</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>TileMap ≈ <strong>CSS Grid + 精灵图册（Sprite Sheet）</strong>——用一个个小方块拼出整个关卡。类似用 emoji 拼字符画，但是用图片瓦片。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">三要素：<strong>TileSet</strong>（瓦片图集资源）→ <strong>TileMapLayer 节点</strong>（图层）→ <strong>绘制</strong>（编辑器画笔）。支持多层（地面层/装饰层/碰撞层）、自动拼接（terrain autotiling）、动画瓦片。</p>
        <div class="mb-4"><Code language="gdscript" :code="tilemapCode" title="tilemap.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>普通 TileMap 工作流</h2>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 text-sm leading-relaxed">
          <li>准备瓦片图片（如 16×16 或 32×32 的 tileset.png）</li>
          <li>创建 TileSet 资源 → 拖入图片 → 设置切片大小 → 添加物理碰撞/导航</li>
          <li>创建 TileMapLayer 节点 → 分配 TileSet → 选画笔工具绘制</li>
          <li>添加多个 TileMapLayer 图层（地面/装饰/碰撞）</li>
        </ol>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>等距 3/4 视角：纯 2D 的「立体感」</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">哈迪斯、暗黑、怪猎同款视角——<strong>等距 3/4 不是 3D</strong>，它是「2D 移动逻辑 + 等距投影渲染」两层分离。角色在普通 (x, y) 世界坐标里移动，渲染时用投影公式画到菱形网格上。</p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>等距投影 ≈ <strong>数据模型 vs 视图渲染</strong>。world 坐标是 state（数据），screen 坐标是 DOM（视图）——两者通过一个纯函数（投影）转换，就像 React 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">state → render()</code>。</p></aside>

        <p class="text-slate-600 mb-3 leading-relaxed">核心就是两个公式（2:1 菱形 tile，宽 64 高 32）：</p>
        <div class="mb-4"><Code language="gdscript" :code="isometricCode" title="等距投影公式" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">world 坐标</th><th class="px-4 py-2 border font-semibold text-slate-700">screen 坐标</th><th class="px-4 py-2 border font-semibold text-slate-700">视觉方向</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">(1, 0)</td><td class="px-4 py-2 border font-mono text-xs">(+32, +16)</td><td class="px-4 py-2 border">向右下</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">(0, 1)</td><td class="px-4 py-2 border font-mono text-xs">(-32, +16)</td><td class="px-4 py-2 border">向左下</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">(1, 1)</td><td class="px-4 py-2 border font-mono text-xs">(0, +32)</td><td class="px-4 py-2 border">正下方（菱形顶点）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 关键点：</strong>移动逻辑里 <code class="bg-blue-100 px-1 rounded text-xs font-mono">world_pos += input * speed * delta</code> 和普通 2D 八向移动<strong>一模一样</strong>。区别只在 <code class="bg-blue-100 px-1 rounded text-xs font-mono">_draw()</code> 里多一步投影。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Y-sort：谁挡谁</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">等距视角下，<strong>world.y 越大的物体离镜头越近</strong>（越靠屏幕下方），应该后绘制、盖住别人。这就是深度排序。</p>
        <div class="mb-4"><Code language="gdscript" :code="ysortCode" title="Y-sort 用法" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-amber-800"><strong>⚠️ 经典坑：</strong>忘了开 <code class="bg-amber-100 px-1 rounded text-xs font-mono">y_sort_enabled</code>，角色会「穿墙」——明明在树后面，却被画到树前面。必须让<strong>父节点</strong>开 Y-sort，且所有需要排序的节点（角色/敌人/障碍物）都是它的直接或间接子节点。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：等距移动 demo</h2>
        <div class="mb-3 flex items-center gap-3">
          <EditorLink file-path="apps/game/demos/stage-2-nodes/demo_isometric_move.gd" label="📝 demo_isometric_move.gd" :is-admin="userStore.isAdmin" />
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">demo_isometric_move.gd</code> 把等距投影 + 八向移动做成了一个可运行 demo：新建场景 → Node2D 根 → 附加脚本 → F6，就能用 WASD 在菱形网格上移动角色。核心代码：</p>
        <div class="mb-4"><Code language="gdscript" :code="demoCode" title="demo_isometric_move.gd — 精简" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>等距游戏先把「等距网格 + 八向移动」这一根针跑通，再往上加战斗/装备。移动是等距的一切基础。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 不用 TileMap 的程序化建图</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">打开 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/main.gd</code>——Blitz 的关卡<strong>没有用 TileMap</strong>，而是用代码循环创建 StaticBody2D 墙块。适用场景不同：<strong>手绘艺术关</strong>用 TileMap（快、所见即所得）；<strong>程序化生成/固定数值关卡</strong>用代码（灵活、可算）。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzLevelCode" title="main.gd — 精简" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 提示：</strong>两种方式可以混用——大背景用 TileMap 手绘，动态机关/程序化房间用代码生成，各取所长。</p></aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 忘了在 TileSet 里给瓦片添加碰撞：</strong>角色会直接穿过地面。地面层使用的每个瓦片都要在 TileSet 编辑器的「Collision」里画上碰撞形状，或用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">TileSetPhysicsOptions</code> 批量设置。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 把「像素坐标」当成「格子坐标」传给 set_cell：</strong>set_cell 的第 2 个参数是<strong>格子坐标</strong>（如 Vector2i(3,5)），不是像素坐标。世界坐标 → 格子坐标要用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">local_to_map(world_pos)</code> 转换。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 等距 TileMap 忘了开 Y-sort：</strong>等距图里角色和树谁盖谁，由 world.y 决定。不开 <code class="bg-amber-100 px-1 rounded text-xs font-mono">y_sort_enabled</code>，角色就会在树上面「穿墙」。这是等距游戏最经典的视觉 Bug。</p></aside>
          <div class="mb-4"><Code language="gdscript" :code="setCellCode" title="set_cell 正确用法" /></div>
        </div>
      </section>

      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>TileMap 层级</strong>：TileSet（图块集）→ TileMapLayer（节点）→ 单元格 → 碰撞</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>普通 TileMap 用方形 tile，等距 TileMap 用菱形 tile（2:1 宽高比）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>等距 = <strong>2D 移动 + 投影渲染</strong>，投影公式 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">sx=(x-y)*W/2, sy=(x+y)*H/2</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Y-sort 用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">y_sort_enabled = true</code> 自动按 world.y 排序遮挡</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>手绘关用 TileMap；程序化关（如 Blitz）用代码循环建 StaticBody2D</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-7-rigidbody2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：RigidBody2D</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-9-camera2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Camera2D →</RouterLink>
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
  { id: "sec-overview", name: "📐 层级结构图" },
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "工作流" },
  { id: "sec-3", name: "等距投影" },
  { id: "sec-4", name: "Y-sort" },
  { id: "sec-5", name: "等距demo" },
  { id: "sec-6", name: "🕹️ 实战 Blitz" },
  { id: "sec-7", name: "常见错误" },
  { id: "sec-8", name: "小结" },
]

const tilemapCode = `# 运行时操作 TileMapLayer（常用于程序化生成地图）
@onready var tilemap: TileMapLayer = $TileMapLayer
func place_tile(pos: Vector2i, tile_id: int) -> void:
    tilemap.set_cell(pos, tile_id, Vector2i(0, 0))  # 格子坐标,瓦片ID,图集坐标
func get_tile(pos: Vector2i) -> int:
    return tilemap.get_cell_source_id(pos)  # 获取某位置的瓦片ID
func remove_tile(pos: Vector2i) -> void:
    tilemap.erase_cell(pos)
func world_to_tile(world_pos: Vector2) -> Vector2i:
    return tilemap.local_to_map(world_pos)  # 世界坐标→格子坐标`

const isometricCode = `# 等距投影: world (x,y) → screen (sx,sy)
# 2:1 菱形 tile (宽 64, 高 32)
const TILE_W: float = 64.0
const TILE_H: float = 32.0
const SCREEN_CENTER: Vector2 = Vector2(640, 240)

func world_to_screen(world: Vector2) -> Vector2:
    var sx: float = (world.x - world.y) * TILE_W / 2.0
    var sy: float = (world.x + world.y) * TILE_H / 2.0
    return SCREEN_CENTER + Vector2(sx, sy)

# 反向: screen → world (鼠标点选格子时用)
func screen_to_world(screen: Vector2) -> Vector2:
    var rel: Vector2 = screen - SCREEN_CENTER
    var x: float = (rel.x / (TILE_W / 2.0) + rel.y / (TILE_H / 2.0)) / 2.0
    var y: float = (rel.y / (TILE_H / 2.0) - rel.x / (TILE_W / 2.0)) / 2.0
    return Vector2(x, y)`

const ysortCode = `# Y-sort: 等距视角下谁挡谁
# 世界坐标 y 越大 = 越靠屏幕下方 = 离镜头越近 = 应后绘制

# 父节点开启 Y-sort (角色/敌人/障碍物都是它的子节点)
func _ready() -> void:
    y_sort_enabled = true   # 子节点按 world.y 自动排序
    # y 大的后绘制, 盖住 y 小的 (角色走到树后面会被树挡住)

# 手动控制时用 z_index (y 越大 z_index 越高)
func update_z_index() -> void:
    z_index = int(global_position.y)  # 简单的"离镜头越近越靠上"`

const demoCode = `# demo_isometric_move.gd 核心逻辑 (等距八向移动)
var world_pos: Vector2 = Vector2(5, 5)  # 世界坐标(逻辑层)

func _physics_process(delta: float) -> void:
    # 八向输入(归一化) + 世界坐标移动 —— 和普通 2D 一样
    var input_vec: Vector2 = Input.get_vector("move_left", "move_right", "move_up", "move_down")
    world_pos += input_vec * MOVE_SPEED * delta
    queue_redraw()

func _draw() -> void:
    # 渲染层: 世界坐标 → 屏幕坐标 → 绘制
    var p: Vector2 = _world_to_screen(world_pos)
    draw_circle(p, 12, Color(0.3, 0.7, 1.0))  # 角色圆点

func _world_to_screen(world: Vector2) -> Vector2:
    return SCREEN_CENTER + Vector2(
        (world.x - world.y) * TILE_W / 2.0,
        (world.x + world.y) * TILE_H / 2.0
    )`

const blitzLevelCode = `# main.gd 精简 —— Blitz 不用 TileMap,用代码铺关卡
# 为什么? 关卡是程序化算出来的(平台坐标写死在数组里),
# 直接 new StaticBody2D 比手绘 TileMap 更灵活。

func _create_wall(pos: Vector2, size: Vector2, color: Color) -> void:
    var body: StaticBody2D = StaticBody2D.new()
    body.position = pos
    body.collision_layer = 1 << 4   # bit4: 墙壁层

    var col_shape: CollisionShape2D = CollisionShape2D.new()
    var rect: RectangleShape2D = RectangleShape2D.new()
    rect.size = size
    col_shape.shape = rect
    body.add_child(col_shape)
    add_child(body)

func _create_platforms() -> void:
    var platforms: Array[Dictionary] = [
        { pos = Vector2(350, 510), size = Vector2(170, 16) },
        { pos = Vector2(620, 420), size = Vector2(150, 16) },
    ]
    for p: Dictionary in platforms:
        _create_wall(p.pos, p.size, Color(0.35, 0.25, 0.15))`

const setCellCode = `# ✅ 正确: 第 2 个参数是格子坐标(不是像素)
tilemap.set_cell(Vector2i(3, 5), source_id, Vector2i(1, 0))
#                ↑ 格子坐标       ↑ 图块id   ↑ 图集内子坐标

# ❌ 常见错误: 把像素坐标直接当格子坐标
tilemap.set_cell(Vector2i(96, 160), source_id, Vector2i(1, 0))

# ✅ 正确: 先用 local_to_map 换算
var cell: Vector2i = tilemap.local_to_map(world_mouse_pos)
tilemap.set_cell(cell, source_id, Vector2i(1, 0))`
</script>
