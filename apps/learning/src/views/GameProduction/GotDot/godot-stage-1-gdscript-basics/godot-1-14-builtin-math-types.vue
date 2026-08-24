<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">内置数学类型</h1>
          <p class="text-sm text-slate-500 mt-1">Vector2/Vector3/Color/Rect2/Transform2D——游戏数学的基石</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/drawable_rect.gd" label="📝 drawable_rect.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-14</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>内置数学类型总览</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">游戏里的一切都是「值类型」——位置、方向、颜色、碰撞盒。GDScript 内置了这些数学类型，<strong>都是栈上值类型</strong>（复制即副本，不是引用）。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">构成</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用途</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">Vector2</td><td class="px-4 py-2 border font-mono">x, y</td><td class="px-4 py-2 border">2D 位置 / 方向 / 速度 / 尺寸</td></tr>
              <tr><td class="px-4 py-2 border font-mono">Vector3</td><td class="px-4 py-2 border font-mono">x, y, z</td><td class="px-4 py-2 border">3D 位置 / 方向</td></tr>
              <tr><td class="px-4 py-2 border font-mono">Color</td><td class="px-4 py-2 border font-mono">r, g, b, a</td><td class="px-4 py-2 border">颜色（0~1 浮点，非 0~255！）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">Rect2</td><td class="px-4 py-2 border font-mono">position, size</td><td class="px-4 py-2 border">2D 矩形 / 碰撞盒 / 视口</td></tr>
              <tr><td class="px-4 py-2 border font-mono">Transform2D</td><td class="px-4 py-2 border font-mono">origin + rotation + scale</td><td class="px-4 py-2 border">2D 变换矩阵（位移/旋转/缩放）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">{x, y}</code> 手写对象 | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">pygame.Vector2</code> 库 | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">Vector2</code> 内建。<br/>前端要写一堆 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Math.hypot</code> / 手动构造对象，GDScript <strong>内置了全套运算</strong>：加法、缩放、长度、归一化、点积一行搞定。这是 Godot 最香的地方之一。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Vector2 / Vector3——向量</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">向量 = 带方向和大小的量。既表示<strong>坐标点</strong>（从原点到该点），也表示<strong>方向+速度</strong>。加减就是「位移合成」，乘标量就是「缩放」，normalized() 得到长度为 1 的纯方向。</p>
        <div class="mb-4"><Code language="gdscript" :code="vectorCode" title="vector.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 高频错点：</strong>用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">dir.normalized() * speed * delta</code> 做移动，但 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Vector2(0, 0)</code> 归一化会报错（零向量没有方向）——<strong>先判断 length() &gt; 0 再归一化</strong>，Blitz 的子弹总是从已有方向生成所以安全。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Color——颜色</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Color(r, g, b, a)</code> 各通道是 <strong>0.0 ~ 1.0 的浮点</strong>，不是 CSS 的 0~255。这是新人第一个坑。</p>
        <div class="mb-4"><Code language="gdscript" :code="colorCode" title="color.gd" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>CSS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">rgba(255,0,0,0.5)</code> → GDScript <code class="bg-purple-100 px-1 rounded text-xs font-mono">Color(1, 0, 0, 0.5)</code>（记得 ÷255）；<code class="bg-purple-100 px-1 rounded text-xs font-mono">#ff6600</code> → <code class="bg-purple-100 px-1 rounded text-xs font-mono">Color.html("#ff6600")</code>。而 <code class="bg-purple-100 px-1 rounded text-xs font-mono">lightened()/darkened()</code> ≈ CSS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">color-mix</code> 提亮压暗。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>Rect2 / Transform2D——区域与变换</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Rect2(左上角, 大小)</code> 是 2D 世界的「盒子」；<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Transform2D</code> 是一个节点相对父节点的<strong>位移+旋转+缩放</strong>封装，游戏里节点树每个 Node2D 都挂着一个。</p>
        <div class="mb-4"><Code language="gdscript" :code="rectCode" title="rect_transform.gd" /></div>
      </section>

      <section id="sec-blitz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 项目中的数学类型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的平台用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Rect2 + Color</code> 纯代码绘制（不用贴图）；子弹用 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">direction * speed * delta</code> 的向量乘法飞出去。打开 drawable_rect.gd / bullet.gd 对照看：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzMathCode" title="Blitz 数学类型片段（精简）" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 这就是「值类型」的威力：</strong>每帧 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">position += direction * speed * delta</code> 都会创建新的 Vector2 再赋回 position，零内存压力（栈上分配）。同样的逻辑放前端 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">requestAnimationFrame</code> 里手搓对象也没问题，但 Godot 把它焊成了内置运算——写起来就是一行。</p>
        </aside>
      </section>

      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎬</span>向量可视化动画</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">A = (3, 2)，B = (1, -2)。点击按钮演示三种向量运算，<strong>绿色箭头为结果</strong>。原点 O 在画布中心，x 轴向右、y 轴向上。</p>
        <div class="flex gap-2 flex-wrap mb-4">
          <button
            @click="runAdd" :disabled="busy"
            class="px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white font-medium transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">向量相加 A+B</button>
          <button
            @click="runScale" :disabled="busy"
            class="px-3 py-1.5 text-xs rounded-lg bg-orange-500 text-white font-medium transition-all hover:bg-orange-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">缩放 A×2</button>
          <button
            @click="runNormalize" :disabled="busy"
            class="px-3 py-1.5 text-xs rounded-lg bg-purple-600 text-white font-medium transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">归一化 A</button>
          <button
            @click="resetDemo" :disabled="busy"
            class="px-3 py-1.5 text-xs rounded-lg bg-slate-100 text-slate-600 font-medium transition-all hover:bg-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">重置</button>
        </div>
        <div ref="box" class="w-full border border-slate-200 rounded-lg overflow-hidden bg-slate-50" :style="{ height: H + 'px' }">
          <v-stage :config="{ width: W, height: H }">
            <v-layer>
              <v-rect :config="rectCfg" />
              <v-line :config="axisX" />
              <v-line :config="axisY" />
              <v-arrow :config="aArrowCfg" />
              <v-text :config="aLabelCfg" />
              <v-arrow v-if="showB" :config="bArrowCfg" />
              <v-text v-if="showB" :config="bLabelCfg" />
              <v-circle v-if="mode === 'normalize'" :config="unitCircleCfg" />
              <template v-if="vr.show">
                <v-arrow :config="rArrowCfg" />
                <v-text :config="rLabelCfg" />
              </template>
            </v-layer>
          </v-stage>
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-3">
          <span class="text-xs text-slate-500">{{ info }}</span>
          <span v-if="vr.show" class="text-xs font-mono bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">结果长度 = {{ resultLen }}</span>
        </div>
        <ul class="mt-3 space-y-1 text-xs text-slate-500 font-mono">
          <li v-for="(log, i) in logs" :key="i">› {{ log }}</li>
        </ul>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-lg p-3"><strong>1. Color 用 0~255 数值 → 颜色发白/发黑：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Color(255, 0, 0)</code> 会被 clamp 到 (1, 0, 0)，等于纯红但<strong>通道取模后全是 1</strong>（255→1）。任何 &gt; 1 的值都会被截成 1。<strong>牢记 0~1，或者用 Color.html("#ff0000")。</strong></div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>2. 零向量归一化 → 运行时报错：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Vector2.ZERO.normalized()</code> 会抛 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Vector2 normalize error</code>（0 不能除）。追逐类 AI 尤其容易踩——玩家正好站在敌人位置上时方向为零向量。<strong>先判 length() &gt; 0。</strong></div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>3. Rect2 构造函数顺序记反：</strong><code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Rect2(Vector2(10, 20), Vector2(200, 100))</code> 的第一个参数是<strong>左上角</strong>，不是中心！把「中心点」当 position 传会让矩形整体偏移半个 size。要居中就用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">Rect2(center - size/2, size)</code>（见 Blitz 实战）。</div>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Vector2</code>：加/减/缩放/长度/归一化/点积，内置齐全，位移公式 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">dir * speed * delta</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Color</code>：0~1 浮点通道（非 0~255），支持命名色/hex/提亮压暗</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Rect2</code>：position(左上角)+size，含 contains/intersects/merge</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Transform2D</code>：位移+旋转+缩放的变换封装（Node2D 的全局/局部坐标都靠它）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>都是<strong>值类型</strong>：赋值即副本，性能零压力</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-13-string-formatting" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：字符串格式化</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-1-node-lifecycle" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：节点生命周期 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { Code, Nav, EditorLink } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "类型总览" },
  { id: "sec-2", name: "Vector2/3" },
  { id: "sec-3", name: "Color" },
  { id: "sec-4", name: "Rect2/Transform" },
  { id: "sec-blitz", name: "🕹️ Blitz实战" },
  { id: "sec-viz", name: "🎬 向量可视化" },
  { id: "sec-6", name: "常见错误" },
  { id: "sec-7", name: "小结" },
]

const vectorCode = `# Vector2 —— 2D 向量(位置/方向/速度/尺寸通用)
var pos: Vector2 = Vector2(100, 200)
var dir: Vector2 = Vector2.RIGHT          # (1, 0)
var a: Vector2 = Vector2(3, 4)

# 向量运算(全部返回 Vector2)
var sum: Vector2 = a + Vector2(1, 0)      # (4, 4)
var len: float = a.length()               # 5.0
var norm: Vector2 = a.normalized()        # (0.6, 0.8) 长度 1
var dot: float = a.dot(Vector2(1, 0))     # 3.0 点积
var dist: float = pos.distance_to(Vector2(100, 200))  # 0.0

# 向量 × 标量 = 缩放
var twice: Vector2 = a * 2.0              # (6, 8)

# Vector3 多一个 z(3D 用),API 与 Vector2 一致
var v3: Vector3 = Vector3(1, 2, 3)
var v3len: float = v3.length()            # sqrt(14)

# 常用常量: ZERO / ONE / LEFT / RIGHT / UP / DOWN`

const colorCode = `# Color —— RGBA, 各通道 0.0~1.0(注意不是 0~255!)
var c: Color = Color(0.2, 0.4, 0.8, 1.0)   # (r, g, b, a)
var red: Color = Color.RED                 # 内置命名色
var semi: Color = Color(1, 0, 0, 0.5)      # 半透明红

# 从 0~255 整数转: 除以 255
var skin: Color = Color(200.0 / 255.0, 150.0 / 255.0, 120.0 / 255.0, 1.0)
# 十六进制(和 CSS 一样)
var from_hex: Color = Color.html("#ff6600")

# 提亮 / 压暗 / 亮度
var brighter: Color = c.lightened(0.2)     # 提亮 20%
var darker: Color = c.darkened(0.2)        # 压暗 20%
var lum: float = c.get_luminance()         # 0~1`

const rectCode = `# Rect2 —— position(左上角) + size
var rect: Rect2 = Rect2(Vector2(10, 20), Vector2(200, 100))
rect.position         # (10, 20) 左上角
rect.size             # (200, 100)
rect.end              # (210, 120) 右下角
rect.get_center()     # (110, 70)

# 点是否在矩形内
rect.has_point(Vector2(100, 80))           # true

# 相交 / 合并
rect.intersects(Rect2(Vector2(0, 0), Vector2(50, 50)))  # true
var union: Rect2 = rect.merge(Rect2(Vector2(0, 0), Vector2(30, 30)))

# Transform2D —— 位移 + 旋转 + 缩放 变换
var t: Transform2D = Transform2D.IDENTITY
t.origin = Vector2(400, 300)   # 平移
t.rotated(0.5)                 # 旋转(弧度)
t.scaled(Vector2(2, 2))        # 缩放 2 倍`

const blitzMathCode = `# === drawable_rect.gd — Rect2 + Color 纯代码画平台 ===
@export var rect_color: Color = Color(0.4, 0.3, 0.2, 1.0)
@export var rect_size: Vector2 = Vector2(200, 20)

func _draw() -> void:
    # 以节点中心为原点的矩形(左边 -size/2, 右边 +size/2)
    var r: Rect2 = Rect2(-rect_size / 2.0, rect_size)
    draw_rect(r, rect_color)                              # 填充
    draw_rect(r, Color(0.5, 0.4, 0.25, 1.0), false, 2.0)  # 边框

# === bullet.gd — Vector2 方向向量驱动子弹飞行 ===
var direction: Vector2 = Vector2.RIGHT   # 归一化方向向量
var speed: float = 700.0

func _physics_process(delta: float) -> void:
    # 方向 × 速度 × 时间 = 位移 —— 所有位移的本质
    position += direction * speed * delta`

/* ============================================================
   向量可视化动画（vue-konva，已全局注册，无需 import）
   ============================================================ */
const UNIT = 34          // 1 个单位 = 34 px
const box = ref<HTMLDivElement | null>(null)
const W = ref(0)
const H = ref(320)
const busy = ref(false)
const info = ref('点击按钮演示向量运算')
const mode = ref<'none' | 'add' | 'scale' | 'normalize'>('none')
const rLabel = ref('')

const va = reactive({ x: 3, y: 2 })
const vb = reactive({ x: 1, y: -2 })
const vr = reactive({ x: 0, y: 0, show: false })
const logs = reactive<Array<string>>([])

const ox = computed(() => W.value / 2)
const oy = computed(() => H.value / 2 + 10)
const px = (v: number) => ox.value + v * UNIT
const py = (v: number) => oy.value - v * UNIT

const showB = computed(() => mode.value === 'add')
const resultLen = computed(() => (vr.show ? Math.hypot(vr.x, vr.y).toFixed(2) : '—'))

const rectCfg = computed(() => ({ x: 0, y: 0, width: W.value, height: H.value, fill: '#f8fafc' }))
const axisX = computed(() => ({ points: [0, oy.value, W.value, oy.value], stroke: '#cbd5e1', strokeWidth: 1, dash: [6, 4] }))
const axisY = computed(() => ({ points: [ox.value, 0, ox.value, H.value], stroke: '#cbd5e1', strokeWidth: 1, dash: [6, 4] }))
const unitCircleCfg = computed(() => ({
  x: ox.value, y: oy.value, radius: UNIT,
  stroke: '#94a3b8', strokeWidth: 1, dash: [4, 4],
}))

const aEnd = computed(() => ({ x: px(va.x), y: py(va.y) }))
const aArrowCfg = computed(() => ({
  points: [ox.value, oy.value, aEnd.value.x, aEnd.value.y],
  stroke: '#2563eb', fill: '#2563eb', strokeWidth: 3, pointerLength: 10, pointerWidth: 8,
}))
const aLabelCfg = computed(() => ({
  x: aEnd.value.x + 6, y: aEnd.value.y - 20,
  text: `A(${va.x}, ${va.y})`, fontSize: 12, fontStyle: 'bold', fill: '#2563eb', fontFamily: 'monospace',
}))

const bStart = computed(() => {
  if (mode.value === 'add') return { x: px(va.x), y: py(va.y) }   // B 从 A 的箭头处出发
  return { x: ox.value, y: oy.value }
})
const bEnd = computed(() => {
  if (mode.value === 'add') return { x: px(va.x + vb.x), y: py(va.y + vb.y) }
  return { x: px(vb.x), y: py(vb.y) }
})
const bArrowCfg = computed(() => ({
  points: [bStart.value.x, bStart.value.y, bEnd.value.x, bEnd.value.y],
  stroke: '#f97316', fill: '#f97316', strokeWidth: 3, pointerLength: 10, pointerWidth: 8,
}))
const bLabelCfg = computed(() => ({
  x: bEnd.value.x + 6, y: bEnd.value.y - 20,
  text: `B(${vb.x}, ${vb.y})`, fontSize: 12, fontStyle: 'bold', fill: '#f97316', fontFamily: 'monospace',
}))

const rEnd = computed(() => ({ x: px(vr.x), y: py(vr.y) }))
const rArrowCfg = computed(() => ({
  points: [ox.value, oy.value, rEnd.value.x, rEnd.value.y],
  stroke: '#16a34a', fill: '#16a34a', strokeWidth: 4, pointerLength: 12, pointerWidth: 9, dash: [8, 4],
}))
const rLabelCfg = computed(() => ({
  x: rEnd.value.x + 6, y: rEnd.value.y - 6,
  text: `${rLabel.value} (${vr.x}, ${vr.y})`, fontSize: 12, fontStyle: 'bold', fill: '#16a34a', fontFamily: 'monospace',
}))

function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms))
}

async function act(label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true
  try {
    info.value = label
    await fn()
  } finally {
    busy.value = false
  }
}

async function runAdd() {
  await act('计算 A + B ...', async () => {
    vr.show = false
    await sleep(160)
    mode.value = 'add'
    vr.x = va.x + vb.x
    vr.y = va.y + vb.y
    rLabel.value = 'A+B'
    vr.show = true
    info.value = 'A + B = (4, 0) —— 把 B 接到 A 的箭头末端，结果就是合向量'
    logs.unshift(`A(${va.x}, ${va.y}) + B(${vb.x}, ${vb.y}) = (${vr.x}, ${vr.y})，长度 ${Math.hypot(vr.x, vr.y).toFixed(2)}`)
  })
}

async function runScale() {
  await act('缩放 A × 2 ...', async () => {
    vr.show = false
    await sleep(160)
    mode.value = 'scale'
    vr.x = va.x * 2
    vr.y = va.y * 2
    rLabel.value = '2A'
    vr.show = true
    info.value = '2A = (6, 4) —— 乘标量 2：方向不变，长度从 3.61 变为 7.21'
    logs.unshift(`2 × A(${va.x}, ${va.y}) = (${vr.x}, ${vr.y})，长度 ${Math.hypot(vr.x, vr.y).toFixed(2)}`)
  })
}

async function runNormalize() {
  await act('归一化 A ...', async () => {
    vr.show = false
    await sleep(160)
    mode.value = 'normalize'
    const len = Math.hypot(va.x, va.y)
    vr.x = va.x / len
    vr.y = va.y / len
    rLabel.value = 'A.norm'
    vr.show = true
    info.value = 'A.normalized() = (0.83, 0.55) —— 长度变为 1，方向不变（虚线圆是单位圆）'
    logs.unshift(`normalized(A) = (${vr.x.toFixed(2)}, ${vr.y.toFixed(2)})，长度 1.00`)
  })
}

function resetDemo() {
  if (busy.value) return
  mode.value = 'none'
  vr.show = false
  rLabel.value = ''
  info.value = '点击按钮演示向量运算'
  logs.splice(0)
}

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(() => {
      if (box.value) W.value = box.value.clientWidth
    })
    ro.observe(box.value)
  }
})
onUnmounted(() => {
  ro?.disconnect()
  ro = null
})
</script>
