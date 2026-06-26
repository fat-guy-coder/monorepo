<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🎬 Tween 代码补间动画</h1><p class="text-sm text-slate-500 mt-1">create_tween() → tween_property() — 几行代码让任何属性平滑过渡</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/main.gd" label="📝 main.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 5-8</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>Tween = 自动补间</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Tween 让任意属性从当前值平滑过渡到目标值。不需要写每帧插值逻辑——Godot 引擎帮你做了。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>≈ CSS transition / GSAP gsap.to()。≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">element.animate([{opacity:1},{opacity:0}], 600)</code>。</p></aside></section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>三步：create → tween_property → finished</h2>
        <div class="mb-4"><Code language="gdscript" :code="basicCode" title="Tween 基本用法" /></div></section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Blitz 实战：分数弹出动画</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 的加分效果：金色 "+100" 文字向上飘 50px 并同时渐隐，0.6 秒后删除。这是 Tween 最典型的游戏 UI 用法。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="main.gd — 分数弹出 Tween" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ parallel() 是关键：</strong>两个 tween_property 用 parallel() 同时执行。不加 parallel() 会排队（一个完了才下一个）。</p></aside></section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>create_tween() 绑到当前节点的生命期，节点 free 时 tween 自动取消。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>tween_property(obj, "property:sub", target, duration) — 注意冒号写子属性。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>parallel() 让多个属性同时变化，不加就是串行。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>finished.connect(fn) 在动画完成后做清理（如 queue_free）。</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-5-input-animation/godot-5-7-animationtree" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：AnimationTree</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-5-input-animation/godot-5-9-shader-intro" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Shader 入门 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"基本用法"},{id:"sec-3",name:"Blitz实战"},{id:"sec-4",name:"小结"}]
const basicCode = `# 1. 创建 Tween (绑到当前节点)
var tween: Tween = create_tween()

# 2. 定义动画 — 参数: (对象, "属性", 目标值, 持续时间)
tween.tween_property($Sprite, "position:y", 100.0, 0.5)  # y 下移
tween.tween_property($Sprite, "modulate:a", 0.0, 0.3)     # 渐隐

# 3. 完成回调
tween.finished.connect(func(): print("动画结束"))

# 常用属性写法:
# "position"       → Vector2 位置
# "position:y"     → 只改 y
# "modulate"       → Color 颜色
# "modulate:a"     → 只改 alpha
# "scale"          → Vector2 缩放`
const blitzCode = `# main.gd — 加分 "+100" 弹出并消失
func _pop_score_text(amount: int, at_pos: Vector2 = Vector2.ZERO) -> void:
    var label: Label = Label.new()
    label.text = "+%d" % amount
    label.position = at_pos - Vector2(20, 0)
    label.z_index = 50   # 保证在最上层
    add_child(label)

    var tween: Tween = create_tween()
    # ↑ 往上飘 50px
    tween.tween_property(label, "position:y", at_pos.y - 50, 0.6)
    # → 同时渐隐 (parallel 让两个属性并行变化)
    tween.parallel().tween_property(label, "modulate:a", 0.0, 0.6)
    # 动画结束后删除 Label
    tween.finished.connect(label.queue_free)`
</script>
