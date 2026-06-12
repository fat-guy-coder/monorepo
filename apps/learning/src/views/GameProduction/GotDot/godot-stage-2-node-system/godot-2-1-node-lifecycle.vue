<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Node 生命周期</h1><p class="text-sm text-slate-500 mt-1">_ready / _process / _physics_process——每个节点的生老病死</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-1</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🔄</span>生命周期全景</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Node 生命周期 ≈ <strong>React 组件生命周期 + requestAnimationFrame</strong>。<code class="bg-purple-100 px-1 rounded text-xs font-mono">_enter_tree</code> ≈ componentDidMount | <code class="bg-purple-100 px-1 rounded text-xs font-mono">_ready</code> ≈ useEffect(()=>{},[]) | <code class="bg-purple-100 px-1 rounded text-xs font-mono">_process</code> ≈ requestAnimationFrame | <code class="bg-purple-100 px-1 rounded text-xs font-mono">_exit_tree</code> ≈ componentWillUnmount</p></aside>
<ol class="list-decimal list-inside space-y-3 text-slate-600 mb-4 text-sm leading-relaxed"><li><strong>_init()</strong> — 对象构造（new 时调用，<strong>不在场景树中</strong>）。很少需要写。</li><li><strong>_enter_tree()</strong> — 节点被 add_child 加入场景树时。<strong>此时子节点可能还没准备好。</strong></li><li><strong>_ready()</strong> — <strong>最重要的回调。</strong>节点+所有子节点都加入树后，<strong>从子到父</strong>依次调用。这里做一切初始化。</li><li><strong>_process(delta)</strong> — 每帧调用（可变帧率）。视觉、输入、动画放这里。</li><li><strong>_physics_process(delta)</strong> — 固定 60Hz。物理、移动放这里。delta≈0.0167。</li><li><strong>_exit_tree()</strong> — 从场景树移除时。清理：断开信号、停止音效。</li></ol></section>

<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>完整演示代码</h2><div class="mb-4"><Code language="gdscript" :code="lifecycleCode" title="lifecycle_demo.gd" /></div></section>

<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>_ready 的父子顺序</h2><p class="text-slate-600 mb-3 leading-relaxed"><strong>关键规则：子节点的 _ready 先于父节点。</strong>这意味着在父节点的 _ready 中，所有子节点已经初始化完毕——可以安全获取子节点引用。</p><div class="mb-4"><Code language="gdscript" :code="readyOrderCode" title="ready_order.gd" /></div></section>

<section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>_process vs _physics_process</h2><div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">_process(delta)</th><th class="px-4 py-2 border font-semibold text-slate-700">_physics_process(delta)</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-medium">频率</td><td class="px-4 py-2 border">可变（取决于帧率）</td><td class="px-4 py-2 border"><strong>固定 60Hz</strong>（可配置）</td></tr><tr><td class="px-4 py-2 border font-medium">delta</td><td class="px-4 py-2 border">实际帧间隔（≈0.0167s @ 60fps）</td><td class="px-4 py-2 border">固定 1/60 ≈ 0.0167s</td></tr><tr><td class="px-4 py-2 border font-medium">用途</td><td class="px-4 py-2 border">动画、UI、视觉效果、输入检测</td><td class="px-4 py-2 border"><strong>物理移动、碰撞响应、力的计算</strong></td></tr><tr><td class="px-4 py-2 border font-medium">前端类比</td><td class="px-4 py-2 border">requestAnimationFrame</td><td class="px-4 py-2 border">setInterval(fn, 16.7)</td></tr></tbody></table></div>
<aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 关键：</strong>不要把物理移动放在 _process 里——帧率波动会导致移动距离不一致（delta 可变）。放在 _physics_process 中保证每次物理步进移动距离相同。</p></aside></section>

<section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_ready 做初始化</strong>——此时所有子节点已就绪</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_physics_process 做物理移动</strong>——固定 60Hz，避免帧率波动</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>_process 做视觉/动画/输入</strong>——每帧更新</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>子 _ready 先于父——父 _ready 中可以安全访问子节点</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-13-string-formatting" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：字符串格式化</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-2-node-communication" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：节点间通信 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"生命周期全景"},{id:"sec-2",name:"完整演示"},{id:"sec-3",name:"_ready 父子顺序"},{id:"sec-4",name:"_process vs _physics"},{id:"sec-5",name:"小结"}]
const lifecycleCode = `extends Node2D
# 1._init —对象构造（不在场景树中，很少用）
func _init() -> void: print("1. _init")

# 2._enter_tree —加入场景树时（子节点可能未就绪）
func _enter_tree() -> void: print("2. _enter_tree")

# 3._ready —所有子节点就绪后（最重要！这里做初始化）
func _ready() -> void:
    print("3. _ready —初始化代码放这里")
    var sprite: Sprite2D = $Sprite2D  # 子节点已就绪，安全引用

# 4._process —每帧（可变帧率，delta 可变）
func _process(delta: float) -> void:
    position.x += 200.0 * delta  # 帧无关移动

# 5._physics_process —固定 60Hz（物理相关代码放这里）
func _physics_process(delta: float) -> void:
    velocity.y += GRAVITY * delta  # delta 固定 1/60
    move_and_slide()

# 6._exit_tree —移除时清理
func _exit_tree() -> void:
    print("6. _exit_tree —清理资源")`
const readyOrderCode = `# 场景: Parent → Child
# 输出顺序: Child._ready → Parent._ready
# 父节点 _ready 中可安全访问子节点——子已初始化完毕`
</script>
