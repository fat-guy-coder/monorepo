<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Node 生命周期</h1><p class="text-sm text-slate-500 mt-1">_init / _enter_tree / _ready / _process / _physics_process / _exit_tree</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🔄</span>生命周期全景</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Node 生命周期 ≈ <strong>React 组件生命周期 + requestAnimationFrame</strong>。<code class="bg-purple-100 px-1 rounded text-xs font-mono">_ready</code> ≈ useEffect(()=>{},[]) | <code class="bg-purple-100 px-1 rounded text-xs font-mono">_process</code> ≈ requestAnimationFrame | <code class="bg-purple-100 px-1 rounded text-xs font-mono">_exit_tree</code> ≈ componentWillUnmount</p></aside>
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
        <p class="text-slate-600 mb-3 leading-relaxed">理解精确的执行顺序对于避免"为什么我的节点引用是 null"至关重要：</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>函数执行到 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">return X</code></li>
          <li>Go 把返回值 X 赋给返回值变量</li>
          <li><strong>执行所有 defer（LIFO 顺序）</strong></li>
          <li>函数真正返回给调用方</li>
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
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_ready 做初始化</strong>——此时所有子节点已就绪，可以安全获取引用</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_physics_process 做物理移动</strong>——固定 60Hz，避免帧率波动影响</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_process 做视觉/动画/输入</strong>——每帧更新</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>子 _ready 先于父——父 _ready 中可以安全访问子节点</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>用 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@onready</code> 声明节点引用——在 _ready 之前赋值</span></li>
        </ul>
      </section>

    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-13-string-formatting" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：字符串格式化</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-2-node-communication" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：节点间通信 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"生命周期全景"},{id:"sec-2",name:"执行时序"},{id:"sec-3",name:"_process vs _physics"},{id:"sec-4",name:"常见错误"},{id:"sec-5",name:"小结"}]
const lifecycleCode = `extends Node2D
func _init() -> void: print("1. _init - 对象构造")
func _enter_tree() -> void: print("2. _enter_tree - 加入场景树")
func _ready() -> void: print("3. _ready - 所有子节点就绪")
func _process(delta: float) -> void: position.x += 200.0 * delta
func _physics_process(delta: float) -> void: velocity.y += gravity * delta; move_and_slide()
func _exit_tree() -> void: print("6. _exit_tree - 移除清理")`
const readyOrderCode = `# 场景: Parent → Child
# 输出顺序: Child._ready → Parent._ready
# 父节点 _ready 中可安全访问子节点`
</script>
