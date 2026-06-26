<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⚙️ 项目设置与 project.godot</h1><p class="text-sm text-slate-500 mt-1">窗口大小 / 渲染器 / Input Map / 主场景 / 调试选项</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/game/blitz/project.godot" label="📝 project.godot" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-8</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>project.godot 是什么</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">project.godot</code> 是 Godot 项目的<strong>根配置文件</strong>。包含窗口尺寸、渲染器、输入映射、自动加载等所有项目级设置。≈ 前端的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">vite.config.ts</code> + <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">package.json</code> 的合并。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>最常用的设置项</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">设置</th><th class="px-4 py-2 border font-semibold text-slate-700">路径</th><th class="px-4 py-2 border font-semibold text-slate-700">说明</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">config/name</td><td class="px-4 py-2 border">[application]</td><td class="px-4 py-2 border">项目名称（窗口标题）</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">run/main_scene</td><td class="px-4 py-2 border">[application]</td><td class="px-4 py-2 border">F5 运行时启动的场景</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">window/size/viewport_width</td><td class="px-4 py-2 border">[display]</td><td class="px-4 py-2 border">游戏窗口宽度</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">window/size/viewport_height</td><td class="px-4 py-2 border">[display]</td><td class="px-4 py-2 border">游戏窗口高度</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">rendering_device/driver.windows</td><td class="px-4 py-2 border">[rendering]</td><td class="px-4 py-2 border">Windows 渲染驱动 (d3d12/vulkan)</td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">environment/default_clear_color</td><td class="px-4 py-2 border">[rendering]</td><td class="px-4 py-2 border">默认背景色</td></tr>
        </tbody></table></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>实战：Blitz 的 project.godot</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">打开 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">apps/game/blitz/project.godot</code> 对照看：</p>
        <div class="mb-4"><Code language="text" :code="blitzConfig" title="Blitz project.godot (精简)" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>Blitz 的 Input Map 没有在 project.godot 中定义完整事件——它在 main.gd 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">_setup_input_map()</code> 中用代码注册。这是 Intentional 的设计：project.godot 的 Object 格式在不同 Godot 版本间不兼容，代码注册更稳定。详见 <code class="bg-amber-100 px-1 rounded text-xs font-mono">godot-5-2-input-handling</code>。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>Editor Settings vs Project Settings</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">Editor Settings</th><th class="px-4 py-2 border font-semibold text-slate-700">Project Settings</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border">作用范围</td><td class="px-4 py-2 border">当前电脑的所有项目</td><td class="px-4 py-2 border">只有当前项目</td></tr>
          <tr><td class="px-4 py-2 border">存储位置</td><td class="px-4 py-2 border"><code>~/AppData/Roaming/Godot/</code></td><td class="px-4 py-2 border"><code>project.godot</code> (跟着项目走)</td></tr>
          <tr><td class="px-4 py-2 border">典型用途</td><td class="px-4 py-2 border">编辑器主题/字体/语言</td><td class="px-4 py-2 border">窗口尺寸/渲染器/输入/物理参数</td></tr>
        </tbody></table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 project.godot 应该提交到 git——</strong>团队成员共享同样的项目设置。Editor Settings 是个人偏好，不提交。</p></aside></section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>project.godot ≈ vite.config.ts + package.json 的合体</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>[application]/[display]/[rendering]/[input]/[debug] 是最常用的 section</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Input Map 推荐用代码注册（InputMap.add_action），不用 project.godot 的 Object 格式</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-7-debugging-basics" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：调试基础</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-1-gdscript-intro" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：GDScript 入门 →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"常用设置"},{id:"sec-3",name:"Blitz 配置"},{id:"sec-4",name:"Editor vs Project"},{id:"sec-5",name:"小结"}]
const blitzConfig = `; project.godot — Blitz 项目配置
config_version=5

[application]
config/name="Blitz"
run/main_scene="res://scenes/main.tscn"   ; F5 启动的场景
config/features=PackedStringArray("4.6", "Forward Plus")

[display]
window/size/viewport_width=1280
window/size/viewport_height=720
window/size/resizable=false              ; 固定窗口大小

[rendering]
rendering_device/driver.windows="d3d12"
environment/default_clear_color=Color(0.05,0.05,0.12,1)  ; 深色背景

[debug]
gdscript/warnings/enable=false           ; 关闭严格类型警告

[input]                                   ; 动作声明(按键在代码中注册)
move_left={...}  move_right={...}  jump={...}
dash={...}       shoot={...}       restart={...}`
</script>
