<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">数组与字典</h1>
          <p class="text-sm text-slate-500 mt-1">GDScript 的核心集合类型——Array 与 Dictionary</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-4</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📦</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 三语对照：</strong> TS: <code class="bg-purple-100 px-1 rounded text-xs font-mono">let a: number[] = [1,2]</code> | Python: <code class="bg-purple-100 px-1 rounded text-xs font-mono">a: list[int] = [1,2]</code> | GDScript: <code class="bg-purple-100 px-1 rounded text-xs font-mono">var a: Array[int] = [1,2]</code><br/>TS: <code class="bg-purple-100 px-1 rounded text-xs font-mono">Record&lt;S,n&gt;</code> | Python: <code class="bg-purple-100 px-1 rounded text-xs font-mono">dict[str,int]</code> | GDScript: <code class="bg-purple-100 px-1 rounded text-xs font-mono">var d: Dictionary = {"{}"}</code></p>
        </aside>
        <p class="text-slate-600 leading-relaxed">Array（数组）和 Dictionary（字典）是游戏里出现频率最高的两种数据结构——敌人的列表、平台的配置、道具的背包、技能的字典。GDScript 的数组接口几乎和 JS 一样（filter/map/reduce），字典和 Python 一样灵活（键类型不限）。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>Array（数组）</h2>
        <div class="mb-4"><Code language="gdscript" :code="arrayCode" title="array.gd" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">TS 对应</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 font-mono text-xs">
              <tr><td class="px-4 py-2 border">append(v)</td><td class="px-4 py-2 border">末尾追加</td><td class="px-4 py-2 border">push(v)</td></tr>
              <tr><td class="px-4 py-2 border">pop_back()</td><td class="px-4 py-2 border">移除末尾</td><td class="px-4 py-2 border">pop()</td></tr>
              <tr><td class="px-4 py-2 border">insert(i,v)</td><td class="px-4 py-2 border">索引 i 插入</td><td class="px-4 py-2 border">splice(i,0,v)</td></tr>
              <tr><td class="px-4 py-2 border">remove_at(i)</td><td class="px-4 py-2 border">移除索引 i</td><td class="px-4 py-2 border">splice(i,1)</td></tr>
              <tr><td class="px-4 py-2 border">find(v)</td><td class="px-4 py-2 border">查找索引</td><td class="px-4 py-2 border">indexOf(v)</td></tr>
              <tr><td class="px-4 py-2 border">has(v)</td><td class="px-4 py-2 border">是否包含</td><td class="px-4 py-2 border">includes(v)</td></tr>
              <tr><td class="px-4 py-2 border">size()</td><td class="px-4 py-2 border">长度</td><td class="px-4 py-2 border">length</td></tr>
              <tr><td class="px-4 py-2 border">filter(func)</td><td class="px-4 py-2 border">过滤</td><td class="px-4 py-2 border">filter(func)</td></tr>
              <tr><td class="px-4 py-2 border">map(func)</td><td class="px-4 py-2 border">映射</td><td class="px-4 py-2 border">map(func)</td></tr>
              <tr><td class="px-4 py-2 border">reduce(func,init)</td><td class="px-4 py-2 border">归约</td><td class="px-4 py-2 border">reduce(func,init)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 好消息：</strong>Array 有 filter/map/reduce——和 JS 的函数式编程体验几乎一样。比 Python 的 list comprehension 更接近前端习惯。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Dictionary（字典）</h2>
        <div class="mb-4"><Code language="gdscript" :code="dictCode" title="dictionary.gd" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Packed 数组</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">元素类型固定时用 Packed 数组可大幅降低内存。常用于顶点数据、网络传输。</p>
        <div class="mb-4"><Code language="gdscript" :code="packedCode" title="packed_array.gd" /></div>
      </section>

      <!-- 🕹️ 实战：Blitz -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 用集合组织关卡与战斗</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的关卡数据、敌人列表、攻击判定"去重"全部靠 Array / Dictionary：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCollectionsCode" title="main.gd / attack_hitbox.gd（精简）" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">Array[Dictionary]</code> ≈ TS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">{"{"}pos: Vector2, size: Vector2{"}"}[]</code>（数组里放对象字面量）；<br/><code class="bg-purple-100 px-1 rounded text-xs font-mono">if body in _has_hit</code> ≈ TS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">hitSet.has(body)</code>——用数组模拟"已处理集合"，防止同一帧重复命中。</p>
        </aside>
      </section>

      <!-- ⚠️ 常见错误 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="mb-4"><Code language="gdscript" :code="arrayPitfallsCode" title="array_dict_pitfalls.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 铁律：</strong>访问字典前先想"键一定存在吗"——不确定就用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">.get()</code>；<br/>修改数组时先想"我正在遍历它吗"——是就改用 filter / 倒序删除；<br/>共享数组时先想"我改动会影响别人吗"——需要独立副本就用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">duplicate()</code>。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：数组操作</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">点击按钮观察数组操作。注意 Push/Pop 只在<strong>末尾</strong>操作（O(1)），Insert/Remove 需要<strong>移动后续元素</strong>（O(n)），Search 需要逐个比较（O(n)）。</p>

        <!-- 动态信息标签 -->
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 复杂度: {{ opLabel }}</span>
        </div>

        <!-- 控制按钮 -->
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button v-for="btn in ctrlBtns" :key="btn.label" @mousedown="btn.action" :disabled="busy"
            :class="[btn.cls, 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
                     'active:scale-95 active:shadow-inner',
                     'disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">{{ btn.label }}</button>
          <input v-if="showInp" v-model="inpVal" type="number"
            class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="值" />
          <input v-if="showIdx" v-model="inpIdx" type="number"
            class="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="索引" />
          <button v-if="showInp || showIdx" @click="confirmInp" :disabled="busy"
            class="px-2.5 py-1.5 bg-cyan-500 text-white rounded-lg text-xs font-medium hover:bg-cyan-600 active:scale-95 transition-all duration-150 disabled:opacity-40">确认</button>
          <button v-if="showInp || showIdx" @click="cancelInp" :disabled="busy"
            class="px-2 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-500 hover:bg-slate-100 active:scale-95 transition-all duration-150 disabled:opacity-40">取消</button>
        </div>

        <!-- Canvas -->
        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bars" :key="b.id" :config="rectCfg(b)" />
              <v-text v-for="b in bars" :key="'v' + b.id" :config="valCfg(b)" />
              <v-text v-for="(b, i) in bars" :key="'i' + b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span
            class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Array[T]</code>——强类型数组，有 filter/map/reduce</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Dictionary</code>——键值对，用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">.get(key, default)</code> 安全取值</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>遍历：<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">for item in array:</code>（和 Python 一样）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Array/Dictionary 是引用类型</strong>——赋值共享数据，独立副本用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">duplicate()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Push/Pop O(1)，Insert/Remove/Search O(n)——末尾操作永远最快</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-3-operators" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：运算符与表达式</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-5-control-flow" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：控制流 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const userStore = useUserStore()
const navList = [{ id: "sec-1", name: "概述" }, { id: "sec-2", name: "Array" }, { id: "sec-3", name: "Dictionary" }, { id: "sec-4", name: "Packed数组" }, { id: "sec-5", name: "🕹️ 实战：Blitz" }, { id: "sec-6", name: "常见错误" }, { id: "sec-viz", name: "🎬 动画演示" }, { id: "sec-7", name: "小结" }]

// ===== 🎬 数组动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(300), W = ref(700), BW = 54, G = 9, MXH = 220, BASE = 255
interface Bar { id: number; val: number; color: string; s?: number; _x?: number; _y?: number; _h?: number }
const bars = reactive<Bar[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const showInp = ref(false), showIdx = ref(false), inpVal = ref(0), inpIdx = ref(0)
let pend = ''
const box = ref<HTMLDivElement>()
const sh = (v: number) => Math.max(4, v)

function init(d: number[] = [5,3,8,1,9,4]) {
  bars.length = 0; d.forEach((v,i) => bars.push({id:i+1, val:v, color:C.cyan, s:1}))
  layout()
}
function layout() {
  const total = bars.length*(BW+G)-G, sx = Math.max(10,(W.value-total)/2)
  const maxV = Math.max(...bars.map(b=>b.val),1)
  bars.forEach((b,i) => {
    b._x = sx+i*(BW+G)
    b._h = Math.max(30,(b.val/maxV)*MXH)
    b._y = BASE-(b._h||30)
  })
}
function rectCfg(b: any) {
  const s = b.s ?? 1; const isGhost = b.color===C.ghost
  return {
    x: b._x+(BW*(1-s))/2, y: b._y, width: BW*s, height: sh(b._h||30)*s,
    fill: b.color, cornerRadius: [4,4,0,0],
    stroke: isGhost?'transparent':'#94a3b8', strokeWidth: isGhost?0:1,
    shadowColor: isGhost?'transparent':'rgba(0,0,0,0.12)',
    shadowBlur: isGhost?0:6, shadowOffsetY: isGhost?0:2,
    opacity: isGhost?0:1,
  }
}
function valCfg(b: any) {
  const s = b.s ?? 1; const h = sh(b._h||30)*s
  return { x:b._x+(BW*(1-s))/2, y:b._y+2, width:BW*s, height:h-4, text:h>20?String(b.val):'', fontSize:Math.round(14*s), fontFamily:'monospace', fontStyle:'bold', fill:h>32?'#fff':C.text, align:'center', verticalAlign:'middle' }
}
function idxCfg(i: number) { return { x:(bars[i]as any)?._x||0, y:BASE+6, width:BW, text:'['+i+']', fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center' } }
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value=true; status.value=msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value=false; status.value='' }
}

function doPush() { act('Push  O(1)', async () => {
  const v = Math.floor(Math.random()*90+10)
  const nb: Bar = { id:nid.value++, val:v, color:C.green, s:0 }; bars.push(nb); layout()
  await d(80); nb.s=1; layout(); await d(500); nb.color=C.cyan
})}
function doPop() { if (!bars.length) return; act('Pop  O(1)', async () => {
  const lb = bars[bars.length-1]; lb.color=C.red; await d(400)
  lb.s=0; layout(); await d(350); bars.pop(); layout()
})}
function askIns() { showInp.value=true; showIdx.value=true; pend='ins' }
function askRem() { showInp.value=false; showIdx.value=true; pend='rem' }
function askSea() { showInp.value=true; showIdx.value=false; pend='sea' }

async function confirmInp() {
  showInp.value=false; showIdx.value=false
  if (pend==='ins') {
    const v = +inpVal.value, i = +inpIdx.value
    if (isNaN(v)||isNaN(i)||i<0||i>bars.length) return
    await act('Insert  O(n)', async () => {
      const nb:Bar={id:nid.value++,val:v,color:C.green,s:0}; bars.splice(i,0,nb); layout()
      await d(80); nb.s=1; layout(); await d(600); nb.color=C.cyan
    })
  } else if (pend==='rem') {
    const i = +inpIdx.value
    if (isNaN(i)||i<0||i>=bars.length) return
    await act('Remove  O(n)', async () => {
      bars[i].color=C.red; await d(400)
      bars[i].color=C.ghost; bars[i].s=0; layout(); await d(350); bars.splice(i,1); layout()
    })
  } else if (pend==='sea') {
    const t = +inpVal.value; if (isNaN(t)) return
    await act('Search  O(n)', async () => {
      for (let i=0;i<bars.length;i++) {
        bars[i].color=C.orange; bars[i].s=1.08; await d(280)
        if (bars[i].val===t) { bars[i].color=C.green; bars[i].s=1; return }
        bars[i].color=C.cyan; bars[i].s=1
      }
    })
  }
}
function cancelInp() { showInp.value=false; showIdx.value=false }
function doReset() { init(); status.value='' }

const opLabel = computed(() => {
  if (status.value.includes('Insert') || status.value.includes('Remove') || status.value.includes('Search')) return 'O(n)'
  if (status.value.includes('Push') || status.value.includes('Pop')) return 'O(1)'
  return ''
})

const ctrlBtns = computed(() => [
  { label:'Push', action:doPush, cls:'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm' },
  { label:'Pop', action:doPop, cls:'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm' },
  { label:'Insert', action:askIns, cls:'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm' },
  { label:'Remove', action:askRem, cls:'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm' },
  { label:'Search', action:askSea, cls:'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm' },
  { label:'↺ Reset', action:doReset, cls:'bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm' },
])

let ro: ResizeObserver|null = null
onMounted(() => {
  init()
  if (box.value) { W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w=e[0]?.contentRect.width; if(w&&w>100){W.value=w;layout()} })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const arrayCode = `# === 强类型数组（推荐）===
var scores: Array[int] = [100, 200, 300]
scores.append(400)                  # [100,200,300,400]
var idx: int = scores.find(200)     # 1（未找到返回 -1）
var has_it: bool = scores.has(100)  # true
var len: int = scores.size()        # 4

# === filter / map / reduce（和 JS 一样！）===
var big: Array[int] = scores.filter(func(s: int) -> bool: return s > 150)
var doubled: Array[int] = scores.map(func(s: int) -> int: return s * 2)
var total: int = scores.reduce(func(acc: int, s: int) -> int: return acc + s, 0)

# === 遍历 ===
for score: int in scores:
    print(score)`
const dictCode = `var player: Dictionary = { "name": "Hero", "health": 100 }
var hp: int = player["health"]             # 100（键不存在会报错！）
var hp_safe: int = player.get("health", 0)  # 安全取值，不存在返回 0
var has_key: bool = player.has("name")      # true
player["weapon"] = "sword"                  # 新键直接赋值即添加
player.erase("weapon")                      # 删除
for key: String in player.keys():
    print(key, ": ", player[key])`
const packedCode = `# Packed 数组——内存紧凑，固定元素类型
var bytes: PackedByteArray = [0x48, 0x65]          # 字节数组
var vecs: PackedVector2Array = [Vector2(0,0)]        # 向量数组
# 比普通 Array 省 2-4x 内存，但元素类型不可变`
const blitzCollectionsCode = `# 1) Array[Dictionary]：一个字典描述一个浮动平台（main.gd）
var platforms: Array[Dictionary] = [
    { pos = Vector2(350, 510), size = Vector2(170, 16) },
    { pos = Vector2(620, 420), size = Vector2(150, 16) },
    { pos = Vector2(900, 480), size = Vector2(160, 16) },
]
for p: Dictionary in platforms:
    _create_wall(p.pos, p.size, Color(0.35, 0.25, 0.15))  # 字典点号访问

# 2) Array[Vector2]：敌人出生点列表
var positions: Array[Vector2] = [
    Vector2(450, GROUND_Y - 20),
    Vector2(750, GROUND_Y - 20),
]
for pos: Vector2 in positions:
    _create_enemy(pos, 0)

# 3) Array[Area2D]：对象数组保存引用（供统计/调试）
var _parry_objects: Array[Area2D] = []
_parry_objects.append(obj)          # 追加引用

# 4) 数组当"已命中集合"——in 运算符判断包含（attack_hitbox.gd）
var _has_hit: Array[Node2D] = []
func _on_body_entered(body: Node2D) -> void:
    if body in _has_hit:            # in = "是否包含该元素"
        return
    _has_hit.append(body)`
const arrayPitfallsCode = `# ⚠️ 错误 1：字典键不存在时直接下标访问会崩溃
var d: Dictionary = { "hp": 100 }
# print(d["mp"])             # ❌ KeyError！脚本直接报错
print(d.get("mp", 0))        # ✅ 安全取值，缺省返回 0

# ⚠️ 错误 2：Array 赋值是引用传递，不是复制！
var a: Array[int] = [1, 2, 3]
var b: Array[int] = a        # b 和 a 指向同一个数组
b.append(4)                  # a 也变成 [1,2,3,4]！（引用共享）
var c: Array[int] = a.duplicate()   # ✅ 复制一份独立数组

# ⚠️ 错误 3：遍历时删除元素会跳过/越界
var list: Array[int] = [1, 2, 3, 4]
for v in list:
    list.erase(v)            # ❌ 边遍历边改数组，行为不可预期
# ✅ 正确：用 filter 重建（或倒序遍历删除）
list = list.filter(func(x: int) -> bool: return x != 2)`
</script>
