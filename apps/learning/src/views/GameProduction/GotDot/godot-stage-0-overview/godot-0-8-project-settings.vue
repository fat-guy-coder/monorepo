<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚙️ 项目设置与 project.godot</h1>
          <p class="text-sm text-slate-500 mt-1">窗口大小 / 渲染器 / Input Map / 主场景 / 调试选项</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/game/blitz/project.godot" label="📝 project.godot" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-8</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🎯</span>project.godot 是什么</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">project.godot</code> ≈ <strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">vite.config.ts</code> + <code class="bg-purple-100 px-1 rounded text-xs font-mono">package.json</code> + <code class="bg-purple-100 px-1 rounded text-xs font-mono">.env</code> 的合体</strong>——窗口尺寸、渲染器、输入映射、自动加载等所有项目级配置都在这一个纯文本文件里。而且它<strong>跟着项目走、提交进 Git</strong>，团队共享同一套配置。</p>
        </aside>
        <p class="text-slate-600 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">project.godot</code> 是 Godot 项目的<strong>根配置文件</strong>。包含窗口尺寸、渲染器、输入映射、自动加载等所有项目级设置。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>最常用的设置项</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border font-semibold text-slate-700">设置</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">路径</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">config/name</td><td class="px-4 py-2 border">[application]</td><td class="px-4 py-2 border">项目名称（窗口标题）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">run/main_scene</td><td class="px-4 py-2 border">[application]</td><td class="px-4 py-2 border">F5 运行时启动的场景</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">window/size/viewport_width</td><td class="px-4 py-2 border">[display]</td><td class="px-4 py-2 border">游戏窗口宽度</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">window/size/viewport_height</td><td class="px-4 py-2 border">[display]</td><td class="px-4 py-2 border">游戏窗口高度</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">rendering_device/driver.windows</td><td class="px-4 py-2 border">[rendering]</td><td class="px-4 py-2 border">Windows 渲染驱动 (d3d12/vulkan)</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">environment/default_clear_color</td><td class="px-4 py-2 border">[rendering]</td><td class="px-4 py-2 border">默认背景色</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">在代码里读写设置</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">ProjectSettings</code> 单例可以在运行时读取（偶尔需要）或修改设置。≈ <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">import.meta.env</code> / <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">process.env</code>：</p>
        <div class="mb-4"><Code language="gdscript" :code="projectSettingsCode" title="读写项目设置" /></div>
      </section>

      <!-- 实战：Blitz -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🕹️</span>实战：Blitz 的 project.godot</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">打开 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">apps/game/blitz/project.godot</code> 对照看：</p>
        <div class="mb-4"><Code language="text" :code="blitzConfig" title="Blitz project.godot（精简）" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">关键决策：Input Map 用代码注册，不用 Object 格式</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">注意 project.godot 的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">[input]</code> 段只写了动作名（<code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">move_left={...}</code>），<strong>按键是在 main.gd 的 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">_setup_input_map()</code> 里注册的</strong>。为什么？因为 project.godot 里手写 <code class="bg-slate-100 text-blue-700 px-1 rounded text-xs font-mono">Object(InputEventKey, ...)</code> 格式在不同 Godot 版本间不兼容、极易手滑出错；代码注册稳定、可版本控制。真实代码：</p>
        <div class="mb-4"><Code language="gdscript" :code="blitzInputMapCode" title="blitz/scripts/main.gd — _setup_input_map()（真实代码）" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 反哺：</strong>这段代码 ≈ 前端把 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">keybindings.json</code> 从配置文件挪进 TS 代码里注册——<strong>用类型安全的代码代替手写魔法字符串</strong>，错误在编译期就暴露。详见 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">godot-5-1-input-map</code>。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>Editor Settings vs Project Settings</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border font-semibold text-slate-700"></th>
                <th class="px-4 py-2 border font-semibold text-slate-700">Editor Settings</th>
                <th class="px-4 py-2 border font-semibold text-slate-700">Project Settings</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">作用范围</td><td class="px-4 py-2 border">当前电脑的所有项目</td><td class="px-4 py-2 border">只有当前项目</td></tr>
              <tr><td class="px-4 py-2 border">存储位置</td><td class="px-4 py-2 border"><code>~/AppData/Roaming/Godot/</code></td><td class="px-4 py-2 border"><code>project.godot</code>（跟着项目走）</td></tr>
              <tr><td class="px-4 py-2 border">典型用途</td><td class="px-4 py-2 border">编辑器主题/字体/语言</td><td class="px-4 py-2 border">窗口尺寸/渲染器/输入/物理参数</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 project.godot 应该提交到 git</strong>——团队成员共享同样的项目设置。Editor Settings 是个人偏好，不提交。这 ≈ 前端把 <code class="bg-blue-100 px-1 rounded text-xs font-mono">.vscode/settings.json</code> 留在 .gitignore 之外、把项目配置提交、个人配置忽略。</p>
        </aside>
      </section>

      <!-- 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误</h2>
        <div class="space-y-3">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 1：手改 <code class="bg-amber-100 px-1 rounded text-xs font-mono">[input]</code> 的 Object 格式。</strong><br/>在 project.godot 里手写 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Object(InputEventKey, "physical_keycode":65)</code> 极易拼错，且版本间不兼容，可能导致项目打不开。推荐 Blitz 的做法：<strong>用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">InputMap.add_action()</code> 在代码里注册</strong>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 2：project.godot 没提交 Git。</strong><br/>队友 clone 后窗口尺寸、主场景、输入全不对，甚至 <code class="bg-amber-100 px-1 rounded text-xs font-mono">run/main_scene</code> 指向不存在的路径直接报 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Cannot open file</code>。project.godot 必须提交，只忽略 <code class="bg-amber-100 px-1 rounded text-xs font-mono">.godot/</code> 缓存目录。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 错误 3：把个人偏好塞进 Project Settings（或反之）。</strong><br/>分辨率、驱动、背景色是<strong>项目</strong>的（提交 Git）；主题、字体大小是<strong>编辑器个人</strong>的（不提交）。搞反了会导致"我这台电脑能跑，你 clone 下来就不行"的经典事故。</p>
          </aside>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>project.godot ≈ vite.config.ts + package.json 的合体</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>[application]/[display]/[rendering]/[input]/[debug] 是最常用的 section</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>Input Map 推荐用代码注册（InputMap.add_action），不用 project.godot 的 Object 格式</span></li>
          <li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>project.godot 提交 Git；Editor Settings 不提交</span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-7-debugging-basics" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：调试基础</RouterLink>
        <RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-1-gdscript-intro" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：GDScript 入门 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav, EditorLink } from 'components'; import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
const navList = [
  { id: "sec-1", name: "project.godot 是什么" },
  { id: "sec-2", name: "常用设置" },
  { id: "sec-3", name: "🕹️ 实战：Blitz" },
  { id: "sec-4", name: "Editor vs Project" },
  { id: "sec-5", name: "⚠️ 常见错误" },
  { id: "sec-6", name: "📋 小结" },
]
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
const projectSettingsCode = `# 读取项目设置 (≈ 读 process.env)
var game_name: String = ProjectSettings.get_setting("application/config/name")
print("项目名:", game_name)   # 输出 "项目名: Blitz"

# 运行时临时修改 — 只在内存生效，不会写回 project.godot
ProjectSettings.set_setting("display/window/size/viewport_width", 1920)

# 自定义设置 (习惯加 app/ 前缀避免冲突)
ProjectSettings.set_setting("app/starting_health", 3)
var hp: int = ProjectSettings.get_setting("app/starting_health")`
const blitzInputMapCode = `# blitz/scripts/main.gd — _setup_input_map()（真实代码）
# 在代码中动态注册按键动作,比 project.godot 的 Object 格式更可靠
func _setup_input_map() -> void:
	var actions: Dictionary = {
		"move_left":  [KEY_A, KEY_LEFT],
		"move_right": [KEY_D, KEY_RIGHT],
		"jump":       [KEY_SPACE, KEY_W, KEY_UP],
		"dash":       [KEY_SHIFT],
		"attack_light": [KEY_J],
		"attack_heavy": [KEY_K],
		"restart":    [KEY_R, KEY_ENTER],
	}
	for action_name: String in actions:
		if not InputMap.has_action(action_name):
			InputMap.add_action(action_name)
			for key: Key in actions[action_name]:
				var ev: InputEventKey = InputEventKey.new()
				ev.physical_keycode = key
				InputMap.action_add_event(action_name, ev)`
</script>
