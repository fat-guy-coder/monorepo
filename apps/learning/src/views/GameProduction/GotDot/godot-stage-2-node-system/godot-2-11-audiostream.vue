<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔊 AudioStreamPlayer</h1>
          <p class="text-sm text-slate-500 mt-1">2D 音效播放 — 背景音乐、音效、UI 声音</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-11</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🔊</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>AudioStreamPlayer ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">&lt;audio src="sfx.ogg" /&gt;</code> + <code class="bg-purple-100 px-1 rounded text-xs font-mono">audio.play()</code>——2D 音效（无空间定位），不受距离影响音量。而 <code class="bg-purple-100 px-1 rounded text-xs font-mono">AudioStreamPlayer2D</code> 更像 Web Audio 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">PannerNode</code>，随距离衰减。</p></aside>
        <div class="mb-4"><Code language="gdscript" :code="audioCode" title="audio_stream_player.gd" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>音频节点家族</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Godot 提供了多个音频相关节点，按使用场景选择：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100">
                <th class="px-4 py-2 border border-slate-200 text-left font-semibold text-slate-700">节点</th>
                <th class="px-4 py-2 border border-slate-200 text-left font-semibold text-slate-700">用途</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioStreamPlayer</td><td class="px-4 py-2 border border-slate-200"><strong>2D 音效</strong>（最常用）— UI 音效 / 背景音乐</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioStreamPlayer2D</td><td class="px-4 py-2 border border-slate-200">2D 空间音效 — 随距离衰减音量（敌人脚步声、远处爆炸）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioStreamPlayer3D</td><td class="px-4 py-2 border border-slate-200">3D 空间音效</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioStream（资源）</td><td class="px-4 py-2 border border-slate-200">音频数据本身（AudioStreamOggVorbis / AudioStreamWAV），通过 stream 属性挂给播放器</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioBus</td><td class="px-4 py-2 border border-slate-200">音频总线（Master / SFX / Music — 混音控制）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 提示：</strong>UI 音效和背景音乐用 AudioStreamPlayer；只有当「声音该从场景里某个位置发出来、远了听不见」时才用 AudioStreamPlayer2D。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>播放控制 API</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">高频音效（连点射击、连续跳跃）直接反复 play() 会「机械重复」——用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">pitch_scale</code> 每次随机微调音高，听感立刻自然。</p>
        <div class="mb-4"><Code language="gdscript" :code="controlCode" title="playback_control.gd" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>音频总线与音量</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">总线的意义：把声音<strong>分组</strong>。玩家需要「关掉音乐、保留音效」，就得让 BGM 走 Music 总线、SFX 走 SFX 总线，然后只调某一组的音量。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">总线</th><th class="px-4 py-2 border font-semibold text-slate-700">默认</th><th class="px-4 py-2 border font-semibold text-slate-700">用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">Master</td><td class="px-4 py-2 border">存在</td><td class="px-4 py-2 border">总音量 / 全局静音</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">SFX</td><td class="px-4 py-2 border">需新建</td><td class="px-4 py-2 border">所有游戏音效（射击/跳跃/受击）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Music</td><td class="px-4 py-2 border">需新建</td><td class="px-4 py-2 border">背景音乐（可单独调低）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="gdscript" :code="busCode" title="audio_bus.gd" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>Godot 音量单位是<strong>分贝（dB，对数）</strong>，不是线性百分比。<code class="bg-amber-100 px-1 rounded text-xs font-mono">volume_db = -6</code> 大约减半，<code class="bg-amber-100 px-1 rounded text-xs font-mono">-12</code> 大约到 1/4。调音量请用 dB，别写 0~100 的线性值。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 给每个子弹/敌人各建一个 AudioStreamPlayer：</strong>几十个播放器节点会拖垮性能。做法：全局建一个「音效管理器」单例，或维护一个播放器池（预创建 8~16 个，轮换复用）。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 音量用线性 0~100 而不是 dB：</strong>Godot 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">volume_db</code> 是分贝。写 <code class="bg-amber-100 px-1 rounded text-xs font-mono">volume_db = 50</code> 会炸耳朵。想用 0~100 的滑条，自己映射：<code class="bg-amber-100 px-1 rounded text-xs font-mono">db = lerpf(-80, 0, percent)</code>。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 所有声音都挤在 Master 总线：</strong>玩家就没法单独关音乐。至少分 SFX / Music 两条总线，播放器在 Inspector 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Bus</code> 下拉里选择。</p></aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 背景音乐挂在会 queue_free 的节点上：</strong>切场景/击杀敌人时音乐突然断掉。BGM 放在常驻节点（场景根、全局单例或 UI 层），切换场景用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">get_tree().change_scene_to_file()</code> 不会销毁的节点。</p></aside>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：给 Blitz 加音效</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Blitz 目前<strong>还没有音频</strong>。下面用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">apps/game/blitz/scripts/player.gd</code> 的真实触发点演示：在 player.tscn 里加一个 AudioStreamPlayer 子节点（命名 SFX），然后在跳跃/冲刺/受击三处调用 play()。</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzAudioCode" title="player.gd — 加音效" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>音效用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">pitch_scale = randf_range(0.9, 1.1)</code> 随机化音高；BGM 用循环（音频导入时勾选 Loop）。先让游戏「能玩」，再花半天把声音配齐——声音对游戏质感的提升非常显著。</p></aside>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><strong>AudioStreamPlayer</strong>：2D 通用音效/BGM；<strong>AudioStreamPlayer2D</strong>：空间音效（随距离衰减）</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>播放：<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">play()/stop()</code>、<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">stream_paused</code>、<code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">finished</code> 信号</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>去机械感：每次播放随机 <code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">pitch_scale</code> ±10%</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>音量单位是 <strong>dB</strong>（对数），不是线性百分比</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>分 SFX / Music 总线，方便单独静音；BGM 放常驻节点</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>大量音效用<strong>播放器池</strong>复用，别一个对象一个播放器</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-10-parallax2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：Parallax2D</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-12-particle2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：粒子效果 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "音频节点家族" },
  { id: "sec-3", name: "播放控制" },
  { id: "sec-4", name: "音频总线" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-6", name: "🕹️ 实战 Blitz" },
  { id: "sec-7", name: "小结" },
]

const audioCode = `extends AudioStreamPlayer
## 播放音效 / 背景音乐 —— 最常用的 2D 音频节点

@export var jump_sound: AudioStream   # 在 Inspector 里拖入 jump.ogg

func _ready() -> void:
    stream = jump_sound
    volume_db = -6.0    # 音量 -6dB(可调)
    play()              # 立刻播放

func play_once() -> void:
    play()

func stop_all() -> void:
    stop()

func toggle_pause() -> void:
    stream_paused = not stream_paused   # 暂停/恢复`

const controlCode = `# 播放控制进阶 —— 音高随机化,避免音效"机械重复"
@onready var sfx: AudioStreamPlayer = $SFX

func play_with_variation() -> void:
    # 每次播放随机 ±10% 音高,听感更自然
    pitch_scale = randf_range(0.9, 1.1)
    # 随机 ±3dB 音量
    volume_db = randf_range(-9.0, -3.0)
    play()

# finished 信号: 播放结束后触发(循环播完一轮时用)
func _ready() -> void:
    finished.connect(_on_finished)

func _on_finished() -> void:
    print("音效播完了")`

const busCode = `# 音频总线 —— 把声音分组控制(单独静音/调音量)
# 默认总线: Master;SFX 和 Music 需要在编辑器 Audio 面板里新建

# 1. 把播放器指定到某条总线(代码方式,编辑器里也可在 Bus 下拉选):
@onready var music: AudioStreamPlayer = $Music
func _ready() -> void:
    music.bus = "Music"     # 指定到 Music 总线

# 2. 全局调某条总线的音量 / 静音
func set_music_volume(db: float) -> void:
    var idx: int = AudioServer.get_bus_index("Music")
    AudioServer.set_bus_volume_db(idx, db)

func mute_all() -> void:
    var master: int = AudioServer.get_bus_index("Master")
    AudioServer.set_bus_mute(master, true)`

const blitzAudioCode = `# Blitz player.gd —— 在真实触发点加音效
# 前提: 在 player.tscn 里加一个 AudioStreamPlayer 子节点(命名 SFX),
#       并把 jump/dash/hit 音效挂成 @export 资源

@onready var sfx: AudioStreamPlayer = $SFX

func _perform_jump() -> void:
    velocity.y = jump_velocity
    # 跳跃音效: 随机音高,避免机械重复
    sfx.pitch_scale = randf_range(0.9, 1.1)
    sfx.play()

func _start_dash() -> void:
    state = State.DASHING
    _dash_timer = dash_duration
    _dash_cooldown_timer = dash_cooldown
    invincible_timer = dash_duration + 0.05
    # 冲刺音效: sfx.stream = dash_sound; sfx.play()
    var d: float = 1.0 if facing_right else -1.0
    velocity = Vector2(d * dash_speed, 0.0)

func take_damage(amount: int = 1) -> void:
    if invincible_timer > 0.0 or state == State.DEAD:
        return
    # 受击音效: sfx.stream = hit_sound; sfx.play()
    health -= amount
    if health <= 0:
        _die()`
</script>
