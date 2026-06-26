<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🦘 平台跳跃物理</h1><p class="text-sm text-slate-500 mt-1">coyote time / jump buffer / 可变跳跃高度 — 让跳跃"舒服"的三个技巧</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 6-6</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>三个技巧，一个目标</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">基础的"is_on_floor + 设 jump_velocity" 只能做最基本的跳跃。<strong>真正舒服的平台跳跃手感和这三个技巧有关：</strong></p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border">技巧</th><th class="px-4 py-2 border">解决什么问题</th><th class="px-4 py-2 border">Celeste 用了吗</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-medium">Coyote Time</td><td class="px-4 py-2 border">离开平台边缘后还能跳（解决"我明明按了跳但没跳起来"）</td><td class="px-4 py-2 border">✅</td></tr>
          <tr><td class="px-4 py-2 border font-medium">Jump Buffer</td><td class="px-4 py-2 border">落地前提前按跳，落地后自动执行（解决"我按早了"）</td><td class="px-4 py-2 border">✅</td></tr>
          <tr><td class="px-4 py-2 border font-medium">可变跳跃高度</td><td class="px-4 py-2 border">按住跳键=高跳，轻按=小跳（解决"跳过头了"）</td><td class="px-4 py-2 border">✅</td></tr>
        </tbody></table></div></section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>Blitz 的完整实现</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">打开 Blitz 的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">player.gd</code>，coyote time 和 jump buffer 在 _process_normal 中，可变跳跃高度在跳跃执行后。以下是浓缩版：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzCode" title="三个技巧的完整实现" /></div></section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>调参指南</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border">参数</th><th class="px-4 py-2 border">Blitz 默认值</th><th class="px-4 py-2 border">调太小→</th><th class="px-4 py-2 border">调太大→</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono">coyote_time</td><td class="px-4 py-2 border">0.08s (≈5帧)</td><td class="px-4 py-2 border">边缘起跳困难</td><td class="px-4 py-2 border">感觉"飘",不精确</td></tr>
          <tr><td class="px-4 py-2 border font-mono">jump_buffer_time</td><td class="px-4 py-2 border">0.08s</td><td class="px-4 py-2 border">落地前按跳失败</td><td class="px-4 py-2 border">落地后延迟跳起</td></tr>
          <tr><td class="px-4 py-2 border font-mono">jump_cut_multiplier</td><td class="px-4 py-2 border">0.45</td><td class="px-4 py-2 border">松键几乎不减速</td><td class="px-4 py-2 border">松键瞬间停住("卡顿感")</td></tr>
          <tr><td class="px-4 py-2 border font-mono">gravity</td><td class="px-4 py-2 border">1400</td><td class="px-4 py-2 border">月球重力,飘很久</td><td class="px-4 py-2 border">铅球,跳不起来</td></tr>
        </tbody></table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 调参方法：</strong>改一个值 → F5 → 跳几次感受手感 → 再改。不要同时改两个——你不知道哪个值影响了什么。</p></aside></section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Coyote time：着地时每帧刷新 timer，离地后短暂保留。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Jump buffer：按跳时设 timer，在 timer 内落地自动起跳。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>可变高度：松键时用乘数削减 y 速度（只在上半段有效）。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>三个技巧组合是平台跳跃的业界标准。</strong></span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-6-physics/godot-6-5-characterbody-deep" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：CharacterBody 深入</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-6-physics/godot-6-7-rigidbody-deep" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：RigidBody 深入 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"三个技巧"},{id:"sec-2",name:"完整实现"},{id:"sec-3",name:"调参指南"},{id:"sec-4",name:"小结"}]
const blitzCode = `# → godot-6-6-platformer-physics
# player.gd — coyote time + jump buffer + 可变跳跃高度

# 计时器 (在 _update_timers 中每帧 -delta)
var _coyote_timer: float = 0.0
var _jump_buffer_timer: float = 0.0

func _physics_process(delta: float) -> void:
    _update_timers(delta)
    # ...移动/重力/冲刺...
    move_and_slide()

    # ★ Coyote Time: 着地时持续刷新
    if is_on_floor():
        _coyote_timer = coyote_time   # 0.08s

func _process_normal(delta: float) -> void:
    # ★ Jump Buffer: 按跳时记录
    if Input.is_action_just_pressed("jump"):
        _jump_buffer_timer = jump_buffer_time

    # 条件满足 → 执行跳跃
    if _jump_buffer_timer > 0 and _coyote_timer > 0:
        velocity.y = jump_velocity    # -520
        _jump_buffer_timer = 0
        _coyote_timer = 0

    # ★ 可变跳跃高度: 松键时削减上升速度
    if not Input.is_action_pressed("jump"):
        if velocity.y < 0:            # 只在上升阶段
            velocity.y *= (jump_cut_multiplier)`
</script>
