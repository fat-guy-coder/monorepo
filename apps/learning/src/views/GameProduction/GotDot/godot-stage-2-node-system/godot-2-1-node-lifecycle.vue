<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Node 生命周期</h1><p class="text-sm text-slate-500 mt-1">_init / _enter_tree / _ready / _process / _physics_process / _exit_tree</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🔄</span>生命周期全景</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Node 生命周期 ≈ <strong>React 组件生命周期 + requestAnimationFrame</strong>。<code class="bg-purple-100 px-1 rounded text-xs font-mono">_ready</code> ≈ useEffect(()=&gt;{}, []) | <code class="bg-purple-100 px-1 rounded text-xs font-mono">_process</code> ≈ requestAnimationFrame | <code class="bg-purple-100 px-1 rounded text-xs font-mono">_exit_tree</code> ≈ componentWillUnmount</p></aside>
        <ol class="list-decimal list-inside space-y-3 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>_init()</strong> — 对象构造（new 时调用，<strong>不在场景树中</strong>）。很少需要写。</li>
          <li><strong>_enter_tree()</strong> — 节点被 add_child 加入场景树时调用。<strong>此时子节点可能还没准备好。</strong></li>
          <li><strong>_ready()</strong> — <strong>最重要的回调。</strong>节点+所有子节点都加入树后，<strong>从子到父</strong>依次调用。</li>
          <li><strong>_process(delta)</strong> — 每帧调用（可变帧率）。视觉、输入、动画。</li>
          <li><strong>_physics_process(delta)</strong> — 固定 60Hz。物理、移动。delta≈0.0167。</li>
          <li><strong>_exit_tree()</strong> — 从场景树移除时。清理：断开信号、停止音效。</li>
        </ol>
        <div class="mb-4"><Code language="gdscript" :code="lifecycleCode" title="lifecycle_demo.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>执行时序图</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">理解精确的执行顺序对于避免"为什么我的节点引用是 null"至关重要。加入场景树后的真实调用顺序：</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>构造（不在树中）</strong>：<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">new</code> 时依次执行 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_init()</code>——<strong>父先于子</strong>（先构造父，再构造子）。</li>
          <li><strong>进入场景树</strong>：<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">add_child()</code> 触发 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_enter_tree()</code>——<strong>父先于子</strong>，从上到下逐层进入。</li>
          <li><strong>就绪（子先于父）</strong>：整棵子树都进树后，<strong>子节点先执行 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_ready()</code></strong>，最后才是父节点的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_ready()</code>——从下到上，与 _enter_tree 相反。</li>
          <li><strong>运行</strong>：<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_physics_process()</code>（固定 60Hz）与 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_process()</code>（每帧）按树中先后顺序依次被调用。</li>
          <li><strong>移除</strong>：<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">remove_child()</code> / <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">queue_free()</code> 时触发 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_exit_tree()</code>——<strong>父先于子</strong>退出，随后节点被销毁。</li>
        </ol>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>关键规则：子节点的 _ready 先于父节点。</strong>这意味着在父节点的 _ready 中，所有子节点已经初始化完毕——可以安全获取子节点引用。</p>
        <div class="mb-4"><Code language="gdscript" :code="readyOrderCode" title="ready_order.gd" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>_process vs _physics_process</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">_process(delta)</th><th class="px-4 py-2 border font-semibold text-slate-700">_physics_process(delta)</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-medium">频率</td><td class="px-4 py-2 border">可变（取决于帧率）</td><td class="px-4 py-2 border"><strong>固定 60Hz</strong></td></tr>
              <tr><td class="px-4 py-2 border font-medium">delta</td><td class="px-4 py-2 border">实际帧间隔（~0.0167s @ 60fps）</td><td class="px-4 py-2 border">固定 1/60 ≈ 0.0167s</td></tr>
              <tr><td class="px-4 py-2 border font-medium">用途</td><td class="px-4 py-2 border">动画、UI、视觉效果、输入检测</td><td class="px-4 py-2 border"><strong>物理移动、碰撞响应</strong></td></tr>
              <tr><td class="px-4 py-2 border font-medium">前端类比</td><td class="px-4 py-2 border">requestAnimationFrame</td><td class="px-4 py-2 border">setInterval(fn, 16.7)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 关键：</strong>不要把物理移动放在 _process 里——帧率波动会导致移动距离不一致。放在 _physics_process 中保证每次物理步进移动距离相同。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>常见的生命周期错误</h2>
        <div class="space-y-3 text-slate-600 text-sm">
          <div class="bg-slate-50 rounded-lg p-3"><strong>1. 在 _init 中访问 $ 节点：</strong>节点还没加入场景树，<code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">$Sprite2D</code> 返回 null。→ 用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">@onready</code> 或在 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">_ready</code> 中访问。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>2. 忘记 _physics_process 存在：</strong>所有物理相关代码放在 _physics_process。用 _process 做物理会导致不同帧率下行为不同。</div>
          <div class="bg-slate-50 rounded-lg p-3"><strong>3. 在 _process 中做大量计算：</strong>如果 _process 耗时超过 16ms，帧率会下降。复杂计算移到单独的线程或用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">call_deferred</code> 分摊。</div>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：生命周期时序</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">点击「＋ 加入场景树」逐步演示 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_init → _enter_tree → _ready</code> 的触发顺序（注意场景树区域里<strong>子节点先就绪</strong>）；再点「▶ _process」观察每帧调用；最后「✖ 移除出树」触发 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_exit_tree</code>。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📍 阶段: <strong class="text-blue-700">{{ cur >= 0 ? phases[cur].name : '空闲' }}</strong></span>
          <span class="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">🌳 在场景树: {{ inTree ? '✓ 是' : '✗ 否' }}</span>
          <span v-if="cur >= 2" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">👶 子节点就绪: {{ childrenReady ? '✓' : '…' }}</span>
          <span v-if="frames > 0" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">🎞 _process 帧: {{ frames }}</span>
          <span class="ml-auto bg-slate-100 px-2 py-1 rounded-full text-slate-500">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doAddToTree" :disabled="busy" class="bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">＋ 加入场景树</button>
          <button @mousedown="doProcessFrames" :disabled="busy" class="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ _process ×4 帧</button>
          <button @mousedown="doExitTree" :disabled="busy" class="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">✖ 移除出树</button>
          <button @mousedown="doReset" class="bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{ height: H + 'px' }">
          <v-stage :config="{ width: W, height: H }">
            <v-layer>
              <v-arrow v-for="(p,i) in phases.slice(0,-1)" :key="'a'+i" :config="phaseArrow(i)" />
              <v-rect v-for="(p,i) in phases" :key="p.name" :config="phaseRect(i)" />
              <v-text v-for="(p,i) in phases" :key="'t'+p.name" :config="phaseText(i)" />
              <v-rect :config="treeContainer" />
              <v-text :config="treeTitle" />
              <v-line :config="parentChildArrow('a')" />
              <v-line :config="parentChildArrow('b')" />
              <v-rect :config="childRect('a')" />
              <v-rect :config="childRect('b')" />
              <v-text :config="childText('a')" />
              <v-text :config="childText('b')" />
              <v-rect :config="parentRect" />
              <v-text :config="parentText" />
              <v-circle :config="nodeCircle" />
              <v-text :config="nodeLabel" />
              <v-text :config="canvasStatus" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 里的生命周期</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/player.gd</code> 就是节点生命周期的教科书——<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_ready()</code> 做初始化（碰撞层/信号连接），<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_physics_process()</code> 做固定 60Hz 的移动。主场景 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">main.gd</code> 则在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_ready()</code> 里按顺序搭建整个关卡：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="player.gd + main.gd — 精简提取" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 观察：</strong>所有 <code class="bg-blue-100 px-1 rounded text-xs font-mono">@onready var xxx = $节点</code> 都在 <code class="bg-blue-100 px-1 rounded text-xs font-mono">_ready()</code> 之前由 Godot 自动赋值——这正是"子节点就绪后才轮到父 _ready"规则的直接应用。</p></aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_ready 做初始化</strong>——此时所有子节点已就绪，可以安全获取引用</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_physics_process 做物理移动</strong>——固定 60Hz，避免帧率波动影响</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_process 做视觉/动画/输入</strong>——每帧更新</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>执行顺序：<strong>_init（父先）→ _enter_tree（父先）→ _ready（子先！）→ _process/_physics_process → _exit_tree（父先）</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>子 _ready 先于父——父 _ready 中可以安全访问子节点</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@onready</code> 声明节点引用——在 _ready 之前赋值</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-14-builtin-math-types" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：内置数学类型</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-2-node-communication" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：节点间通信 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "生命周期全景" },
  { id: "sec-2", name: "执行时序" },
  { id: "sec-3", name: "_process vs _physics" },
  { id: "sec-4", name: "常见错误" },
  { id: "sec-5", name: "🎬 动画演示" },
  { id: "sec-6", name: "🕹️ Blitz 实战" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 生命周期时序动画 =====
const C = { cyan: '#06b6d4', green: '#4ade80', red: '#ef4444', orange: '#f59e0b', text: '#1e293b', muted: '#64748b', ghost: '#e2e8f0' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref('')
const cur = ref(-1)              // 当前阶段索引（-1 = 空闲）
const inTree = ref(false)        // 节点是否在场景树中
const childrenReady = ref(false) // 子节点是否已就绪
const frames = ref(0)            // _process 帧计数
const box = ref<HTMLDivElement>()

const phases = [
  { name: '_init',       desc: '对象构造（new 时调用，不在场景树中）', color: C.cyan },
  { name: '_enter_tree', desc: '加入场景树（父先进入，子节点可能未就绪）', color: C.cyan },
  { name: '_ready',      desc: '子节点 _ready 先于父 → 父 _ready', color: C.green },
  { name: '_process',    desc: '每帧调用（可变帧率）：视觉 / 输入 / 动画', color: C.orange },
  { name: '_exit_tree',  desc: '移出场景树：断开信号、停止音效', color: C.red },
]

const GAP = 12
const phaseBox = reactive<{ _x: number; _y: number }[]>(phases.map(() => ({ _x: 0, _y: 30 })))
const childA = reactive({ x: 0, y: 218 }), childB = reactive({ x: 0, y: 218 })
const parentBox = reactive({ x: 0, y: 184 })
function boxW() { return Math.min(132, Math.max(92, Math.floor((W.value - 40) / phases.length - GAP))) }
function layout() {
  const total = phases.length * (boxW() + GAP) - GAP
  const sx = Math.max(12, (W.value - total) / 2)
  phases.forEach((_, i) => { phaseBox[i]._x = sx + i * (boxW() + GAP) })
  const cx = W.value / 2
  parentBox.x = cx - 44
  childA.x = cx - 150
  childB.x = cx + 56
}

// ── 阶段框 ──
function phaseRect(i: number) {
  const active = i === cur.value
  const done = cur.value > i
  const fill = active ? C.orange : done ? C.green : '#ffffff'
  return {
    x: phaseBox[i]._x, y: phaseBox[i]._y, width: boxW(), height: 56, cornerRadius: 8,
    fill, stroke: active ? '#d97706' : done ? '#22c55e' : '#94a3b8',
    strokeWidth: active ? 2.5 : 1.5,
    shadowColor: active ? 'rgba(245,158,11,.35)' : 'rgba(0,0,0,.06)',
    shadowBlur: active ? 10 : 0, shadowOffsetY: active ? 2 : 0,
  }
}
function phaseText(i: number) {
  const active = i === cur.value
  const done = cur.value > i
  return {
    x: phaseBox[i]._x, y: phaseBox[i]._y + 10, width: boxW(), height: 22,
    text: phases[i].name, fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold',
    fill: (active || done) ? '#fff' : C.text, align: 'center', verticalAlign: 'middle',
  }
}
function phaseArrow(i: number) {
  const a = phaseBox[i], b = phaseBox[i + 1]
  return {
    points: [a._x + boxW() + 2, a._y + 28, b._x - 2, b._y + 28],
    stroke: '#94a3b8', strokeWidth: 1.5, pointerLength: 6, pointerWidth: 5,
  }
}

// ── 节点指示器（沿着阶段框移动）──
const nodePos = computed(() => {
  if (cur.value < 0) return { x: -40, y: 92 }
  return { x: phaseBox[cur.value]._x + boxW() / 2, y: 92 }
})
const nodeCircle = computed(() => ({
  x: nodePos.value.x, y: nodePos.value.y, radius: 13,
  fill: '#ffffff', stroke: '#0891b2', strokeWidth: 2.5,
  shadowColor: 'rgba(8,145,178,.4)', shadowBlur: 12, shadowOffsetY: 2,
}))
const nodeLabel = computed(() => ({
  x: nodePos.value.x - 40, y: nodePos.value.y - 7, width: 80, height: 16,
  text: 'Node', fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold',
  fill: '#0891b2', align: 'center',
}))

// ── 底部场景树可视化 ──
const treeContainer = computed(() => ({
  x: 16, y: 148, width: Math.max(100, W.value - 32), height: H.value - 148 - 40,
  cornerRadius: 12, fill: '#f8fafc',
  stroke: inTree.value ? '#94a3b8' : '#cbd5e1', strokeWidth: 1.5,
  dash: inTree.value ? undefined : [6, 4],
}))
const treeTitle = computed(() => ({
  x: 30, y: 158, width: 260, height: 18,
  text: inTree.value ? '🌳 场景树 (SceneTree) — 节点已加入' : '🌲 未加入场景树（_init 阶段）',
  fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold',
  fill: inTree.value ? '#0f766e' : '#64748b', align: 'left',
}))
function parentChildArrow(k: 'a' | 'b') {
  const x2 = k === 'a' ? childA.x + 40 : childB.x + 40
  return { points: [parentBox.x + 44, parentBox.y + 44, x2, 218],
    stroke: '#94a3b8', strokeWidth: 1.5, pointerLength: 6, pointerWidth: 5 }
}
function childRect(k: 'a' | 'b') {
  const ready = childrenReady.value
  const x = k === 'a' ? childA.x : childB.x
  return {
    x, y: childA.y, width: 80, height: 44, cornerRadius: 8,
    fill: ready ? C.green : '#ffffff',
    stroke: ready ? '#22c55e' : '#94a3b8', strokeWidth: 1.5,
  }
}
function childText(k: 'a' | 'b') {
  const ready = childrenReady.value
  const x = k === 'a' ? childA.x : childB.x
  return {
    x, y: childA.y + 12, width: 80, height: 20,
    text: k === 'a' ? '子节点A' : '子节点B', fontSize: 12, fontFamily: 'monospace',
    fill: ready ? '#fff' : C.text, align: 'center', verticalAlign: 'middle',
  }
}
const parentRect = computed(() => {
  const active = cur.value === 2
  const done = cur.value > 2
  const fill = active ? C.orange : done ? C.green : '#ffffff'
  return {
    x: parentBox.x, y: parentBox.y, width: 88, height: 44, cornerRadius: 8,
    fill, stroke: active ? '#d97706' : done ? '#22c55e' : '#94a3b8',
    strokeWidth: active ? 2.5 : 1.5,
  }
})
const parentText = computed(() => {
  const active = cur.value === 2
  const done = cur.value > 2
  return {
    x: parentBox.x, y: parentBox.y + 12, width: 88, height: 20,
    text: '父节点', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold',
    fill: (active || done) ? '#fff' : C.text, align: 'center', verticalAlign: 'middle',
  }
})
const canvasStatus = computed(() => ({
  x: 20, y: H.value - 32, width: Math.max(100, W.value - 40), height: 20,
  text: status.value || '点击「＋ 加入场景树」开始演示',
  fontSize: 12, fontFamily: 'monospace', fill: C.muted, align: 'center',
}))

// ── 动画控制 ──
const d = (ms: number) => new Promise(r => setTimeout(r, ms))
async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true
  try { await fn() } catch (_) {}
  finally {
    await d(250)
    busy.value = false
    if (cur.value < 0) status.value = ''
  }
}
async function doAddToTree() {
  await act('＋ 加入场景树', async () => {
    cur.value = 0
    status.value = '_init() — 对象构造，此时不在场景树中'
    await d(650)
    cur.value = 1
    inTree.value = true
    status.value = '_enter_tree() — 父节点进入场景树'
    await d(650)
    cur.value = 2
    childrenReady.value = false
    status.value = '子节点先执行 _ready()…'
    await d(650)
    childrenReady.value = true
    status.value = '父节点 _ready() — 子节点已就绪，可安全访问 $ 子节点'
    await d(750)
  })
}
async function doProcessFrames() {
  await act('▶ _process ×4 帧', async () => {
    if (cur.value < 2 || cur.value === 4) cur.value = 3
    for (let i = 1; i <= 4; i++) {
      frames.value = i
      status.value = `_process(delta) 第 ${i} 帧 — 每帧执行一次（视觉 / 输入）`
      await d(430)
    }
  })
}
async function doExitTree() {
  await act('✖ 移除出树', async () => {
    cur.value = 4
    status.value = '_exit_tree() — 从场景树移除，清理资源'
    await d(650)
    inTree.value = false
    childrenReady.value = false
    status.value = '节点已移出场景树 — _exit_tree() 完成，随后销毁'
    await d(550)
    cur.value = -1
  })
}
function doReset() {
  if (busy.value) return
  cur.value = -1; inTree.value = false; childrenReady.value = false; frames.value = 0; status.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  layout()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => {
      const w = e[0]?.contentRect.width
      if (w && w > 100) { W.value = w; layout() }
    })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const lifecycleCode = `extends Node2D

var velocity: Vector2 = Vector2.ZERO

func _init() -> void:
    print("1. _init — 对象构造（new 时调用，此时不在场景树中）")

func _enter_tree() -> void:
    print("2. _enter_tree — 已加入场景树（子节点可能尚未就绪）")

func _ready() -> void:
    print("3. _ready — 节点 + 所有子节点就绪（子先于父）")

func _process(delta: float) -> void:
    print("4. _process — 每帧调用（可变帧率）")
    position.x += 200.0 * delta

func _physics_process(delta: float) -> void:
    print("5. _physics_process — 固定 60Hz 调用")
    velocity.y += 980.0 * delta

func _exit_tree() -> void:
    print("6. _exit_tree — 移出场景树，清理资源（断开信号/停止音效）")`

const readyOrderCode = `# 场景: Parent (CharacterBody2D)
#   ├── Sprite (Sprite2D)
#   └── Collision (CollisionShape2D)
#
# 加入场景树时的真实调用顺序：
#   1. Parent._init()         （父先构造，不在树中）
#   2. Sprite._init() / Collision._init()
#   3. Parent._enter_tree()   （父先进入树）
#   4. Sprite._enter_tree() / Collision._enter_tree()
#   5. Sprite._ready()        （子先 ready！）
#   6. Collision._ready()
#   7. Parent._ready()        （父最后 ready —— 此时所有子节点已就绪）
#
# → 父节点的 _ready 里可以安全使用 $Sprite / $Collision

@onready var sprite: Sprite2D = $Sprite
@onready var collision: CollisionShape2D = $Collision

func _ready() -> void:
    sprite.modulate = Color.WHITE   # 一定非 null，可以放心访问`

const blitzCode = `# === player.gd — _ready 初始化 + _physics_process 固定 60Hz 移动 ===
func _ready() -> void:
    health = max_health              # 运行时状态初始化
    collision_layer = 1 << 0         # bit0: "我是玩家"
    collision_mask  = 1 << 4         # bit4: "我只跟墙壁碰撞"
    parry_detector.area_entered.connect(_on_parry_zone_entered)
    hurtbox.body_entered.connect(_on_hurtbox_body_entered)

func _physics_process(delta: float) -> void:
    if state == State.DEAD:
        return
    _update_timers(delta)
    match state:
        State.NORMAL:     _process_normal(delta)
        State.ATTACKING:  _process_attacking(delta)
        State.DASHING:    _process_dash(delta)
        State.HIT:        _process_hit(delta)
    move_and_slide()       # CharacterBody2D 核心移动
    queue_redraw()         # 外观每帧重绘

# === main.gd — _ready 里按顺序搭建整个关卡 ===
func _ready() -> void:
    _setup_input_map()      # 1. 注册输入（必须在任何 Input 调用之前）
    _build_level()          # 2. 搭建关卡（平台 / 敌人 / 格挡对象）
    _create_player()        # 3. 从 player.tscn 实例化玩家
    _create_ui()            # 4. UI 系统（HUD / 死亡面板）
    _create_instructions()  # 5. 操作说明`
</script>
