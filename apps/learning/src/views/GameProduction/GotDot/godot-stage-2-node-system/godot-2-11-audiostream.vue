<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔊 AudioStreamPlayer</h1>
          <p class="text-sm text-slate-500 mt-1">2D 音效播放 — 背景音乐、音效、UI 声音</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-11</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🔊</span>
          概述
        </h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800">
            <strong>🔗 前端类比：</strong>
            AudioStreamPlayer ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">&lt;audio src="sfx.ogg" /&gt;</code>
            + <code class="bg-purple-100 px-1 rounded text-xs font-mono">audio.play()</code> — 2D 音效（无空间定位），不受距离影响音量。
          </p>
        </aside>

        <div class="mb-4">
          <Code language="gdscript" :code="audioCode" title="audio_stream_player.gd" />
        </div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚙️</span>
          音频节点家族
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          Godot 提供了多个音频相关节点，按使用场景选择：
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100">
                <th class="px-4 py-2 border border-slate-200 text-left font-semibold text-slate-700">节点</th>
                <th class="px-4 py-2 border border-slate-200 text-left font-semibold text-slate-700">用途</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioStreamPlayer</td>
                <td class="px-4 py-2 border border-slate-200"><strong>2D 音效</strong>（最常用）— UI 音效 / 背景音乐</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioStreamPlayer2D</td>
                <td class="px-4 py-2 border border-slate-200">2D 空间音效 — 随距离衰减音量</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioStreamPlayer3D</td>
                <td class="px-4 py-2 border border-slate-200">3D 空间音效</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">AudioBus</td>
                <td class="px-4 py-2 border border-slate-200">音频总线（Master / SFX / Music — 混音控制）</td>
              </tr>
            </tbody>
          </table>
        </div>
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
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "音频节点家族" },
]

const audioCode = `# AudioStreamPlayer — 播放音效 / 背景音乐
@onready var sfx: AudioStreamPlayer = $SFX
@onready var music: AudioStreamPlayer = $Music

func _ready() -> void:
    sfx.stream = preload("res://jump.ogg")
    music.stream = preload("res://bgm.ogg")
    music.play()           # 播放背景音乐

func on_jump() -> void:
    sfx.play()             # 播放跳跃音效

func stop_music() -> void:
    music.stop()

# 全局音频总线控制
# AudioServer.set_bus_volume_db(0, -6)  # Master 音量 -6dB`
</script>
