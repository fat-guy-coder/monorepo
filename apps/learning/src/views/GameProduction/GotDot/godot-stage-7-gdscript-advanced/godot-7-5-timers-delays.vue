<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⏱ Timer 与延迟执行</h1><p class="text-sm text-slate-500 mt-1">SceneTreeTimer / Timer 节点 — 游戏中"等 N 秒后做某事"的标准方法</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/bullet.gd" label="📝 bullet.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 7-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>两种 Timer</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border">方式</th><th class="px-4 py-2 border">用法</th><th class="px-4 py-2 border">适合场景</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">get_tree().create_timer(N)</td><td class="px-4 py-2 border">一次性,不创建节点</td><td class="px-4 py-2 border">"3秒后自毁""0.5秒后消失"</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">Timer 节点</td><td class="px-4 py-2 border">可重复,在场景树中可见</td><td class="px-4 py-2 border">"每2秒生成一个敌人""冷却倒计时"</td></tr>
        </tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>SceneTreeTimer — 一次性延迟</h2>
        <div class="mb-4"><Code language="gdscript" :code="sceneTreeCode" title="Blitz 中的用法" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>如果对象在 timer 触发前被 queue_free() 了，timer 的连接会自动断开——不会报错。但如果 timer 的回调里有对其他节点的引用，确保那些节点还活着（用 is_instance_valid 检查）。</p></aside></section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>一次性延迟 → <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">get_tree().create_timer(N)</code></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>重复执行 → <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">Timer</code> 节点 + <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">one_shot = false</code></span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>timer.timeout 是 <strong>Signal</strong>，用 connect 绑定回调。</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-7-gdscript-advanced/godot-7-4-signals-advanced" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：信号进阶</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-7-gdscript-advanced/godot-7-6-rng-noise" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：随机数与噪声 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"两种Timer"},{id:"sec-2",name:"SceneTreeTimer"},{id:"sec-3",name:"小结"}]
const sceneTreeCode = `# === bullet.gd — 子弹超时自毁 ===
func _ready() -> void:
    var timer: SceneTreeTimer = get_tree().create_timer(3.0)
    timer.timeout.connect(queue_free)   # 3秒后自动删除

# === main.gd — 格挡特效 0.5秒后消失 ===
func _spawn_parry_fx(pos: Vector2) -> void:
    var fx: Node2D = Node2D.new()
    fx.position = pos
    # ...设置脚本...
    add_child(fx)
    get_tree().create_timer(0.5).timeout.connect(fx.queue_free)

# === main.gd — 分数弹出动画(Tween)结束后删除 ===
var tween: Tween = create_tween()
tween.tween_property(label, "position:y", y-50, 0.6)
tween.finished.connect(label.queue_free)  # Tween 自己的结束信号

# === enemy.gd — 死亡特效 0.5秒后消失 ===
func _spawn_death_effect() -> void:
    var fx: Node2D = Node2D.new()
    # ...设置脚本和外观...
    get_tree().current_scene.add_child(fx)
    get_tree().create_timer(0.5).timeout.connect(fx.queue_free)`
</script>
