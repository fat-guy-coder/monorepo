<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌄 Parallax2D</h1>
          <p class="text-sm text-slate-500 mt-1">视差滚动——多层背景以不同速度移动，营造 2D 纵深</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-10</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🌄</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Parallax2D ≈ <strong>CSS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">background-attachment: fixed</code> + 多层不同速度</strong>——远处的山移动慢（近处），近处的树移动快。≈ 游戏里的「多层卷轴效果」。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">视差 = 相机移动时，<strong>越远的层滚得越慢、越近的层滚得越快</strong>。人类的视觉系统用这个线索判断远近，所以只需 3 层不同速度的背景，2D 游戏就有「纵深」。</p>
        <div class="mb-4"><Code language="gdscript" :code="parallaxCode" title="parallax2d.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>两种实现方式</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">方式</th><th class="px-4 py-2 border font-semibold text-slate-700">节点</th><th class="px-4 py-2 border font-semibold text-slate-700">控制速度的属性</th><th class="px-4 py-2 border font-semibold text-slate-700">适用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">经典方式</td><td class="px-4 py-2 border">ParallaxBackground + 多个 ParallaxLayer</td><td class="px-4 py-2 border font-mono text-xs">layer.motion_scale</td><td class="px-4 py-2 border">Godot 4.0+，兼容性最好</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">新版方式</td><td class="px-4 py-2 border">多个 Parallax2D（一层一个）</td><td class="px-4 py-2 border font-mono text-xs">node.scroll_scale</td><td class="px-4 py-2 border">Godot 4.3+，结构更简单</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed">经典方式用 ParallaxLayer 当「层」，每个 layer 一个 motion_scale；新版 Parallax2D 则是<strong>一个节点就是一层</strong>。本文标题虽是 Parallax2D，但两种都值得会——老项目/插件常是经典写法。</p>
        <div class="mb-4"><Code language="gdscript" :code="classicCode" title="classic_parallax.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>关键参数</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">参数</th><th class="px-4 py-2 border font-semibold text-slate-700">所属</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">scroll_scale</td><td class="px-4 py-2 border">Parallax2D</td><td class="px-4 py-2 border">滚动速度倍率：0.2 慢 / 1.0 与相机同步 / 2.0 快</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">motion_scale</td><td class="px-4 py-2 border">ParallaxLayer</td><td class="px-4 py-2 border">同上，经典方式的速度倍率</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">repeat_size / motion_mirroring</td><td class="px-4 py-2 border">两者</td><td class="px-4 py-2 border">设为<strong>贴图尺寸</strong>，背景才能无缝循环平铺</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">repeat_times</td><td class="px-4 py-2 border">Parallax2D</td><td class="px-4 py-2 border">横向平铺份数（3~4 份即可铺满屏幕）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">scroll_offset / motion_offset</td><td class="px-4 py-2 border">两者</td><td class="px-4 py-2 border">初始滚动偏移（微调层位置）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="gdscript" :code="paramCode" title="parallax_params.gd" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 提示：</strong>常见速度梯度是 <code class="bg-blue-100 px-1 rounded text-xs font-mono">远 0.2× → 中 0.5× → 近 1.0×</code>。层与层之间差距太大会「晕」，太近没有纵深。下面动画演示的就是这个梯度。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 忘了设 repeat_size / motion_mirroring：</strong>背景滚动一小段就露出空白。把 repeat_size（或 motion_mirroring）设为<strong>贴图的实际尺寸</strong>，背景才能无缝循环。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 所有层都用 1.0 速度：</strong>那就不是视差，是「一整张背景跟着相机平移」。至少 2~3 层、速度要有梯度（如 0.2 / 0.5 / 1.0）。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 把 ParallaxLayer 挂到 Parallax2D 下：</strong>两者是<strong>两套体系</strong>——ParallaxLayer 属于 ParallaxBackground，Parallax2D 直接放 Sprite2D 子节点。混用会导致层不滚动或异常。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 速度差过大（如 0.05× 和 3×）：</strong>近层超快 + 远层几乎不动，玩家会眩晕。新手阶段把梯度控制在 0.2~1.0 之间最稳。</p></aside>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的星空背景</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">打开 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/main.gd</code>——Blitz 的背景是一层<strong>静态星空</strong>，用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">z_index = -10</code> 把它压在游戏层后面。星点用「不同闪烁速度」模拟远近：闪得快的像近星、闪得慢的像远星——这是<strong>没有相机滚动时</strong>的轻量纵深方案。若 Blitz 未来加相机滚动，把这几层换成 Parallax2D 即可。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzStarCode" title="main.gd — 星空背景精简" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>没有相机滚动的场景，用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">z_index</code> + 动画即可；相机一滚动，立刻换 Parallax2D 按速度分层。</p></aside>
      </section>

      <!-- 🎬 视差滚动动画 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：视差滚动</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">三层背景以<strong>不同速度</strong>滚动：远山 0.2×、树林 0.5×、草地 1.0×。点「▶ 向右滚动」让相机右移——你会看到<strong>越近的层滚得越快</strong>，橙色竖线是相机中心参考线。这就是视差。</p>
        <!-- 动态信息标签 -->
        <div class="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span class="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-mono">🏔️ 远山 0.2×</span>
          <span class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">🌳 树林 0.5×</span>
          <span class="bg-green-50 text-green-700 px-2 py-1 rounded-full font-mono">🌿 草地 1.0×</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 相机滚动: {{ Math.round(offset) }} px</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '静止（等待操作）' }}</span>
        </div>
        <!-- 控制按钮 -->
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="scrollLeft" class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-150 active:scale-95 active:shadow-inner">◀ 向左滚动</button>
          <button @click="scrollRight" class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-150 active:scale-95 active:shadow-inner">▶ 向右滚动</button>
          <button @click="stopScroll" class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-all duration-150 active:scale-95 active:shadow-inner">⏸ 停止</button>
          <button @click="resetScroll" class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-all duration-150 active:scale-95 active:shadow-inner">↺ 重置</button>
        </div>
        <!-- Canvas -->
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 天空底 -->
              <v-rect :config="{x: 0, y: 0, width: W, height: H, fill: '#f0f4ff'}" />
              <!-- 背景层：远山 0.2× -->
              <v-regular-polygon v-for="(x, i) in mtn" :key="'m' + i" :config="{x: x, y: 66, sides: 3, radius: 34, fill: '#818cf8', opacity: 0.85}" />
              <!-- 中景层：树林 0.5×（树干 + 树冠） -->
              <v-rect v-for="(x, i) in tree" :key="'tr' + i" :config="{x: x - 4, y: 156, width: 8, height: 18, fill: '#8b5a2b'}" />
              <v-circle v-for="(x, i) in tree" :key="'c' + i" :config="{x: x, y: 146, radius: 20, fill: '#34d399', stroke: '#059669', strokeWidth: 1}" />
              <!-- 前景层：草地 1.0×（草丛） -->
              <v-rect v-for="(x, i) in grass" :key="'g' + i" :config="{x: x, y: 236, width: 24, height: 8, fill: '#4ade80', cornerRadius: 3}" />
              <!-- 地面 -->
              <v-rect :config="{x: 0, y: 252, width: W, height: 28, fill: '#166534'}" />
              <!-- 相机中心参考线 -->
              <v-rect :config="{x: W / 2 - 2, y: 0, width: 4, height: H, fill: '#f59e0b', opacity: 0.3}" />
              <v-text :config="{x: W / 2 - 30, y: 8, width: 64, text: '相机中心', fontSize: 10, fontFamily: 'monospace', fill: '#b45309', align: 'center'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>视差 = 多层背景以不同速度滚动，<strong>近快远慢</strong>，用速度差制造纵深</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Parallax2D（4.3+）用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">scroll_scale</code>，一层一个节点，结构简单</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>ParallaxBackground + ParallaxLayer（4.0+）用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">motion_scale</code>，兼容性最好</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>无缝平铺：Parallax2D 设 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">repeat_size</code>，经典方式设 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">motion_mirroring</code> = 贴图尺寸</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>速度梯度建议 0.2 / 0.5 / 1.0；差距太大眩晕，太近没纵深</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Blitz 星空用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">z_index = -10</code> + 闪烁速度分层；加相机滚动后换 Parallax2D</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-9-camera2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Camera2D</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-11-audiostream" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：AudioStream →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "两种实现方式" },
  { id: "sec-3", name: "关键参数" },
  { id: "sec-4", name: "常见错误" },
  { id: "sec-5", name: "🕹️ 实战 Blitz" },
  { id: "sec-viz", name: "🎬 视差滚动动画" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 视差滚动动画 =====
const W = ref(700)
const H = 280
const box = ref<HTMLDivElement>()
const offset = ref(0)       // 相机累计滚动像素
const scrollDir = ref(0)    // -1 向左 / 1 向右 / 0 停止
const status = ref('')
const CAM_SPEED = 1.2       // 每帧相机滚动的像素

// 三层背景的速度比: 远山 0.2× / 树林 0.5× / 草地 1.0×(近快远慢)
// 根据速度比算出一层横向要铺的图案 x 坐标(取模实现无缝循环)
function motifXs(speed: number, spacing: number): number[] {
  const shift = (offset.value * speed) % spacing
  const n = Math.ceil(W.value / spacing) + 2
  const xs: number[] = []
  for (let i = 0; i < n; i++) xs.push(-shift + i * spacing)
  return xs
}

const mtn = computed(() => motifXs(0.2, 140))
const tree = computed(() => motifXs(0.5, 110))
const grass = computed(() => motifXs(1.0, 70))

function scrollLeft() { scrollDir.value = -1 }
function scrollRight() { scrollDir.value = 1 }
function stopScroll() { scrollDir.value = 0; status.value = '⏸ 已停止' }
function resetScroll() { scrollDir.value = 0; offset.value = 0; status.value = '↺ 已重置，回到起点' }

let raf = 0
function loop() {
  if (scrollDir.value !== 0) {
    offset.value += scrollDir.value * CAM_SPEED
    status.value = scrollDir.value < 0 ? '◀ 相机向左滚动' : '▶ 相机向右滚动'
  }
  raf = requestAnimationFrame(loop)
}

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => {
      const w = e[0]?.contentRect.width
      if (w && w > 100) W.value = w
    })
    ro.observe(box.value)
  }
  raf = requestAnimationFrame(loop)
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
})

// ===== 代码示例 =====
const parallaxCode = `extends Parallax2D
# Parallax2D(Godot 4.3+): 一个节点就是一层,scroll_scale 控制滚动速度
#   scroll_scale < 1  → 比相机慢(远处的背景)
#   scroll_scale = 1  → 与相机同速(前景)
#   scroll_scale > 1  → 比相机快(极近的前景,少用)

@export var default_scale: Vector2 = Vector2(0.2, 0.2)

func _ready() -> void:
    scroll_scale = default_scale   # 编辑器中也可直接调

# 代码里动态改速度(比如"进入洞穴背景定格")
func freeze_background(frozen: bool) -> void:
    scroll_scale = Vector2(0, 0) if frozen else default_scale`

const classicCode = `# 经典方式(Godot 4.0+, 兼容性最好): ParallaxBackground + ParallaxLayer
extends ParallaxBackground

# 结构:
#   ParallaxBackground
#   ├── ParallaxLayer  motion_scale=(0.2, 0.2)  ← 远山
#   │     └── Sprite2D
#   ├── ParallaxLayer  motion_scale=(0.5, 0.5)  ← 树林
#   │     └── Sprite2D
#   └── ParallaxLayer  motion_scale=(1.0, 1.0)  ← 前景草地
#         └── Sprite2D
#
# motion_mirroring 设为贴图尺寸 → 无缝循环平铺

func set_layer_speed(layer: ParallaxLayer, speed: Vector2) -> void:
    layer.motion_scale = speed   # 运行时动态改某层速度`

const paramCode = `# 关键参数速查
# Parallax2D:
#   scroll_scale   — 滚动速度倍率 (0.2 慢 / 1.0 同步 / 2.0 快)
#   repeat_size    — 平铺单元尺寸(一般=贴图尺寸)
#   repeat_times   — 平铺份数(3~4 份即可铺满屏幕)
#   scroll_offset  — 初始滚动偏移

# ParallaxLayer(经典方式):
#   motion_scale     — 滚动速度倍率
#   motion_mirroring — 贴图尺寸,设为贴图大小即可无缝循环
#   motion_offset    — 初始偏移

func _ready() -> void:
    repeat_size = Vector2(640, 720)   # 贴图 640×720
    repeat_times = 3                   # 横向平铺 3 份`

const blitzStarCode = `# main.gd 精简 —— Blitz 的星空背景
# 用 z_index 分层 + 不同闪烁速度模拟远近(无相机滚动时的轻量纵深)
func _create_starfield() -> void:
    var stars: Node2D = Node2D.new()
    stars.name = "Starfield"
    stars.z_index = -10          # 画在所有图层后面
    stars.set_script(_starfield_script())
    add_child(stars)

# 星点脚本(运行时编译): 每颗星有独立闪烁速度
func _starfield_script() -> Script:
    var s: GDScript = GDScript.new()
    s.source_code = """extends Node2D
var _stars: Array = []
func _ready():
    for _i in range(80):
        _stars.append({
            x = randf_range(0, 3200),
            y = randf_range(0, 660),
            r = randf_range(0.5, 2.0),
            speed = randf_range(0.2, 1.0),
            brightness = randf_range(0.3, 1.0),
        })
func _draw():
    for star in _stars:
        var c: Color = Color(1, 1, 1, star.brightness * (0.5 + 0.5 * sin(Time.get_ticks_msec() * 0.001 * star.speed)))
        draw_circle(Vector2(star.x, star.y), star.r, c)
"""
    s.reload()
    return s`
</script>
