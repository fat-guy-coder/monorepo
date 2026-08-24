<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">节点间通信</h1><p class="text-sm text-slate-500 mt-1">get_node / $ / % / owner / signal——五种方式找到并调用其他节点</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/enemy.gd" label="📝 enemy.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📐</span>四种通信方式结构图</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Godot 节点间通信可以归纳为四种模式。按<strong>耦合松紧</strong>排序：直接引用最紧、信号最松。游戏开发经验法则是——<strong>尽量向右走，少向左走</strong>。</p>
        <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="nc-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" /></marker>
            <marker id="nc-dash" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" /></marker>
            <marker id="nc-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" /></marker>
            <marker id="nc-purple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" /></marker>
          </defs>
          <text x="16" y="20" font-size="13" font-family="monospace" fill="#1e293b" font-weight="bold">按"耦合松紧"排序：越靠左越紧、越靠右越松</text>

          <!-- ① 直接引用 $ -->
          <rect x="16" y="32" width="190" height="56" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
          <text x="111" y="54" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">① 直接引用 $</text>
          <text x="111" y="74" text-anchor="middle" font-size="10" font-family="monospace" fill="#0369a1">$Sprite2D · get_node()</text>
          <rect x="250" y="38" width="64" height="30" rx="6" fill="#0ea5e9" />
          <text x="282" y="53" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">节点A</text>
          <line x1="314" y1="53" x2="352" y2="53" stroke="#64748b" stroke-width="2" marker-end="url(#nc-arr)" />
          <rect x="356" y="38" width="76" height="30" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5" />
          <text x="394" y="53" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0369a1">目标节点</text>
          <rect x="600" y="40" width="104" height="28" rx="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
          <text x="652" y="54" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">紧耦合 · 父→子</text>

          <!-- ② 信号 signal -->
          <rect x="16" y="98" width="190" height="56" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
          <text x="111" y="120" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#15803d">② 信号 signal</text>
          <text x="111" y="140" text-anchor="middle" font-size="10" font-family="monospace" fill="#15803d">health_depleted.emit()</text>
          <rect x="250" y="104" width="64" height="30" rx="6" fill="#22c55e" />
          <text x="282" y="119" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">发射方</text>
          <line x1="314" y1="119" x2="352" y2="119" stroke="#22c55e" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#nc-dash)" />
          <text x="333" y="94" text-anchor="middle" font-size="9" font-family="monospace" fill="#16a34a">signal</text>
          <rect x="356" y="104" width="76" height="30" rx="6" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5" />
          <text x="394" y="119" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#15803d">监听方</text>
          <rect x="600" y="106" width="104" height="28" rx="14" fill="#dcfce7" stroke="#22c55e" stroke-width="1" />
          <text x="652" y="120" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">松耦合 · 最推荐</text>

          <!-- ③ 组 group -->
          <rect x="16" y="164" width="190" height="56" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
          <text x="111" y="186" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">③ 组 group</text>
          <text x="111" y="206" text-anchor="middle" font-size="10" font-family="monospace" fill="#b45309">add_to_group("enemy")</text>
          <rect x="250" y="170" width="64" height="30" rx="6" fill="#f59e0b" />
          <text x="282" y="185" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">节点A</text>
          <line x1="314" y1="185" x2="352" y2="185" stroke="#64748b" stroke-width="2" marker-end="url(#nc-amber)" />
          <ellipse cx="376" cy="185" rx="26" ry="18" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3" />
          <text x="376" y="185" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">组</text>
          <line x1="402" y1="185" x2="438" y2="185" stroke="#64748b" stroke-width="2" marker-end="url(#nc-amber)" />
          <rect x="440" y="172" width="56" height="24" rx="5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" />
          <text x="468" y="184" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#475569">敌人1</text>
          <line x1="376" y1="203" x2="376" y2="214" stroke="#64748b" stroke-width="2" marker-end="url(#nc-amber)" />
          <rect x="346" y="216" width="60" height="24" rx="5" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2" />
          <text x="376" y="228" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#475569">敌人2</text>
          <rect x="600" y="172" width="104" height="28" rx="14" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
          <text x="652" y="186" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">一对多广播</text>

          <!-- ④ 自动加载 autoload -->
          <rect x="16" y="230" width="190" height="56" rx="8" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.5" />
          <text x="111" y="252" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#6d28d9">④ 自动加载 autoload</text>
          <text x="111" y="272" text-anchor="middle" font-size="10" font-family="monospace" fill="#6d28d9">Global.score += 10</text>
          <rect x="250" y="236" width="64" height="30" rx="6" fill="#8b5cf6" />
          <text x="282" y="251" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">任意节点</text>
          <line x1="314" y1="251" x2="352" y2="251" stroke="#64748b" stroke-width="2" marker-end="url(#nc-purple)" />
          <rect x="356" y="232" width="100" height="38" rx="6" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="4 3" />
          <text x="406" y="245" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#6d28d9">Global</text>
          <text x="406" y="262" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#6d28d9">全局唯一单例</text>
          <rect x="600" y="238" width="104" height="28" rx="14" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1" />
          <text x="652" y="252" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#6d28d9">全局共享</text>
        </svg>
        <p class="text-xs text-slate-400 mt-1">图 1：四种通信模式 —— 越靠左耦合越紧（快但脆），越靠右耦合越松（慢但稳）</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📡</span>五种通信方式速查</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">$Sprite2D</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">document.querySelector('#Sprite2D')</code> | <code class="bg-purple-100 px-1 rounded text-xs font-mono">%MyGroup</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">document.getElementById('MyGroup')</code> | Signal ≈ CustomEvent / EventEmitter</p></aside>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">方式</th><th class="px-4 py-2 border font-semibold text-slate-700">语法</th><th class="px-4 py-2 border font-semibold text-slate-700">适用场景</th><th class="px-4 py-2 border font-semibold text-slate-700">前端类比</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">$ 直接子节点</td><td class="px-4 py-2 border font-mono text-xs">$Sprite2D</td><td class="px-4 py-2 border">当前节点的直接子节点</td><td class="px-4 py-2 border">querySelector</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">% 唯一名称</td><td class="px-4 py-2 border font-mono text-xs">$"%HealthBar"</td><td class="px-4 py-2 border">场景中任何位置的唯一命名节点</td><td class="px-4 py-2 border">getElementById</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">get_node(path)</td><td class="px-4 py-2 border font-mono text-xs">get_node("../Sibling")</td><td class="px-4 py-2 border">相对路径 / 复杂嵌套路径</td><td class="px-4 py-2 border">querySelector 复杂选择器</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">owner 跨场景</td><td class="px-4 py-2 border font-mono text-xs">owner.get_node(...)</td><td class="px-4 py-2 border">子场景访问实例化它的主场景</td><td class="px-4 py-2 border">跨组件 ref</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Signal 信号</td><td class="px-4 py-2 border font-mono text-xs">signal.emit() / .connect()</td><td class="px-4 py-2 border"><strong>松耦合通信（最推荐）</strong></td><td class="px-4 py-2 border">EventEmitter / emit</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="gdscript" :code="commCode" title="node_communication.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>$ 和 % 的区别详解</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">$Sprite2D</code> 查找<strong>当前节点的直接子节点</strong>中名为 "Sprite2D" 的节点。如果节点名重复，返回<strong>第一个匹配的</strong>。</p>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">$"%HealthBar"</code> 查找<strong>整个场景</strong>中设置了"Scene Unique Name"的节点（右键节点 → Access as Unique Name）。适合跨层级引用。</p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">$</code> 只在<strong>当前节点</strong>的子节点中查找。<code class="bg-amber-100 px-1 rounded text-xs font-mono">%</code> 在<strong>整个场景树</strong>中查找。如果场景中有多个节点同名，<code class="bg-amber-100 px-1 rounded text-xs font-mono">%</code> 的行为是未定义的——所以每个 % 名称必须全局唯一。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>通信原则（必读）</h2>
        <div class="space-y-3 text-slate-600">
          <div class="bg-slate-50 rounded-lg p-4"><strong>向下通信（父→子）：</strong>直接用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">$</code> 获取子节点，调用其方法。这是安全的——父知道子的存在。</div>
          <div class="bg-slate-50 rounded-lg p-4"><strong>向上通信（子→父）：</strong><span class="text-red-500">不要</span>让子节点直接找父节点（<code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">get_parent()</code>）。用 <strong>Signal</strong>——子发射信号，父连接它。这是松耦合的正确姿势。</div>
          <div class="bg-slate-50 rounded-lg p-4"><strong>同级通信：</strong>通过共同父节点中转，或用 Signal Bus（Autoload 单例做事件总线）。</div>
          <div class="bg-slate-50 rounded-lg p-4"><strong>跨场景通信：</strong>用 Autoload 单例 / Group 分组 / Signal。不要用 <code class="bg-slate-200 text-blue-700 px-1 rounded text-xs font-mono">get_node("/root/...")</code> 硬编码绝对路径。</div>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>获取节点引用的时机</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>关键规则：</strong>在 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_ready()</code> 之前，子节点<strong>还没有被加入场景树</strong>，任何 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">$</code> 调用都会返回 null。解决方案：</p>
        <ul class="space-y-1 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>@onready：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@onready var sprite: Sprite2D = $Sprite2D</code>——在 _ready 的第一行赋值，保证节点已存在</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_ready() 中获取：</strong>在 _ready 中调用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">$Sprite2D</code> 是安全的</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>动态创建的节点：</strong><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">add_child()</code> 之后再获取引用</span></li></ul>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 border-l-4 border-l-blue-400">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的通信方式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/enemy.gd</code> 的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">_get_player()</code> 演示了「通过场景根节点做中间人」的通信模式；<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">player.gd</code> / <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">bullet.gd</code> 则大量使用信号 connect：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="enemy.gd + player.gd + bullet.gd — 精简提取" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>Blitz 里"子 → 父"的反馈全部走信号（hurtbox.body_entered.connect），"谁在谁身边"的查询走场景根节点中介（current_scene.get_player()），"全局数据"走主场景公开方法（add_score）——从没出现硬编码绝对路径。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>$ / get_node()</strong> 用于向下（父→子）——快但紧耦合，只对直接子节点安全</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Signal</strong> 用于向上（子→父）与同级——松耦合，<strong>最推荐</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Group</strong> 一对多广播——对一组对象统一操作</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>Autoload 单例</strong> 跨场景共享数据——全局计数、音效、存档</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>引用获取必须在 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">_ready()</code> 之后（<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@onready</code>），否则拿到 null</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-1-node-lifecycle" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Node 生命周期</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-3-node2d-basics" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Node2D 基类 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 结构总览"},{id:"sec-1",name:"五种方式"},{id:"sec-2",name:"$ vs %"},{id:"sec-3",name:"通信原则"},{id:"sec-4",name:"引用时机"},{id:"sec-5",name:"🕹️ Blitz 实战"},{id:"sec-6",name:"小结"}]
const commCode = `extends Node2D
# 1. $ ——获取直接子节点（最常用！）
@onready var sprite: Sprite2D = $Sprite2D
@onready var anim: AnimationPlayer = $AnimationPlayer

# 2. % ——唯一名称（跨层级）
@onready var health_bar: ProgressBar = $"%HealthBar"

# 3. get_node() ——复杂路径
var sibling: Node = get_node("../Enemy")
var deep: Node = get_node("Weapon/Sword")

# 4. owner ——从子场景访问主场景
func _ready() -> void:
    var main: Node = owner

# 5. Signal ——松耦合通信（最推荐！）
signal button_pressed
button_pressed.emit()
$Button.button_pressed.connect(_on_button)`
const blitzCode = `# === enemy.gd — 通过场景根节点做"中间人" ===
# 敌人不知道玩家的类名，只问主场景"给我玩家"
func _get_player() -> Node2D:
    var root: Node = get_tree().current_scene   # 找到当前场景根
    if root and root.has_method("get_player"):  # 鸭子类型：有方法就调用
        return root.get_player()
    return null

# === player.gd — 信号 connect（子 → 父，松耦合）===
func _ready() -> void:
    parry_detector.area_entered.connect(_on_parry_zone_entered)
    hurtbox.body_entered.connect(_on_hurtbox_body_entered)

func _on_hurtbox_body_entered(body: Node2D) -> void:
    if body.has_method("take_damage"):
        take_damage(1)      # 被敌人碰到 = 受伤（事件从子节点向上通知父节点）

# === bullet.gd — 信号 + 层掩码检测 ===
func _ready() -> void:
    body_entered.connect(_on_body_entered)   # 检测物理体（敌人身体）
    area_entered.connect(_on_area_entered)   # 检测 Area（敌人 Hitbox）
    var timer: SceneTreeTimer = get_tree().create_timer(lifetime)
    timer.timeout.connect(queue_free)        # 超时自毁`
</script>
