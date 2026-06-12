<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">项目结构与文件管理</h1><p class="text-sm text-slate-500 mt-1">组织你的 Godot 项目——目录规范、文件类型、资源管理</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 0-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📁</span>概述</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Godot 项目 ≈ <strong>一个 Vite/Next.js 项目的 src 目录</strong>。有约定俗成的文件夹划分，但不强制。关键的 3 个目录：scenes/（页面/组件）、scripts/（逻辑代码）、assets/（静态资源）。<strong>整个项目全是纯文本 + 资源文件，没有黑盒二进制</strong>——这是对程序员最友好的设计。</p></aside>
        <p class="text-slate-600 leading-relaxed">Godot 项目的核心是 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono">project.godot</code>——一个类似 package.json 的配置文件。有了它，Godot 就识别"这是一个项目"。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>project.godot</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">纯文本项目配置文件。双击它 → Godot 打开项目。可以手动编辑，也通过 Project Settings 编辑。</p>
        <div class="mb-4"><Code language="text" :code="projectGodotCode" title="project.godot" /></div>
        <ul class="space-y-1 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">config/name</code>：项目名称</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">run/main_scene</code>：F5 运行的主场景</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">display/window/size/</code>：窗口尺寸</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">input/</code>：输入映射（Input Map）</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">autoload/</code>：全局单例脚本</span></li></ul>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>推荐目录结构</h2>
        <div class="mb-4"><Code language="text" :code="dirStructureCode" title="推荐目录结构" /></div>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">目录</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">存放内容</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">前端类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">scenes/</td><td class="px-4 py-2 border border-slate-200">.tscn 场景文件</td><td class="px-4 py-2 border border-slate-200">src/pages/</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">scripts/</td><td class="px-4 py-2 border border-slate-200">.gd GDScript 脚本</td><td class="px-4 py-2 border border-slate-200">src/components/</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">assets/sprites/</td><td class="px-4 py-2 border border-slate-200">精灵图/纹理 (.png/.svg)</td><td class="px-4 py-2 border border-slate-200">public/images/</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">assets/audio/</td><td class="px-4 py-2 border border-slate-200">音效/音乐 (.ogg/.mp3)</td><td class="px-4 py-2 border border-slate-200">public/audio/</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">assets/fonts/</td><td class="px-4 py-2 border border-slate-200">字体 (.ttf/.otf)</td><td class="px-4 py-2 border border-slate-200">public/fonts/</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">assets/shaders/</td><td class="px-4 py-2 border border-slate-200">着色器 (.gdshader)</td><td class="px-4 py-2 border border-slate-200">src/shaders/</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">resources/</td><td class="px-4 py-2 border border-slate-200">.tres 资源（材质/主题）</td><td class="px-4 py-2 border border-slate-200">src/config/</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">addons/</td><td class="px-4 py-2 border border-slate-200">第三方插件</td><td class="px-4 py-2 border border-slate-200">node_modules/</td></tr></tbody></table></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 命名规范：</strong>文件名用 <strong>snake_case</strong>。场景：<code class="bg-emerald-100 px-1 rounded text-xs font-mono">player.tscn</code>。脚本：<code class="bg-emerald-100 px-1 rounded text-xs font-mono">player.gd</code>。不要用空格和中文。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>文件类型与 Git</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">后缀</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Git</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.tscn</td><td class="px-4 py-2 border border-slate-200">场景文件</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">纯文本，节点树+属性，可 diff</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.gd</td><td class="px-4 py-2 border border-slate-200">GDScript</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">纯文本游戏逻辑代码</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.tres</td><td class="px-4 py-2 border border-slate-200">资源文件</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">纯文本，材质/主题/自定义资源</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.import</td><td class="px-4 py-2 border border-slate-200">导入配置</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">自动生成，记录导入参数</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">.godot/</td><td class="px-4 py-2 border border-slate-200">编辑器缓存</td><td class="px-4 py-2 border border-slate-200 text-red-600">❌</td><td class="px-4 py-2 border border-slate-200">.gitignore 忽略</td></tr><tr><td class="px-4 py-2 border border-slate-200 font-mono text-xs">project.godot</td><td class="px-4 py-2 border border-slate-200">项目配置</td><td class="px-4 py-2 border border-slate-200 text-emerald-600">✅</td><td class="px-4 py-2 border border-slate-200">纯文本，所有项目设置</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="text" :code="gitignoreCode" title=".gitignore" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">4</span>res:// 与 user:// 路径</h2>
        <ul class="space-y-2 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">res://</code> = 项目根目录（Resource）。最常用。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">user://</code> = 用户数据目录（存档/配置）。跨平台自动映射。</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">uid://</code> = 唯一 ID 路径（Godot 4.4+，资源重命名后不断链）。</span></li></ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 不要用绝对路径。</strong>只在代码中使用 res:// 和 user://。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">5</span>资源导入</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">拖入外部资源 → Godot 自动生成 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">.import</code> → 立即可用。支持格式：图片（PNG/PSD/SVG）、音频（OGG/MP3/WAV）、3D（GLTF/FBX）、字体（TTF/OTF）、翻译（CSV/PO）。</p>
        <p class="text-slate-600 mb-3 leading-relaxed">选中 .import 文件 → Import 面板调整导入参数：<strong>纹理</strong>（Filter: Nearest 像素风）、<strong>音频</strong>（Loop、Stream vs Sample）。</p>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>project.godot = package.json，res:// = 项目根目录</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>推荐：scenes/ + scripts/ + assets/（sprites/audio/fonts）+ resources/</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>snake_case 命名，<strong>.tscn/.gd/.tres/.import 提交 Git</strong>，.godot/ 忽略</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>拖拽导入 → 自动 .import → 调整导入选项</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-3-scene-node-concept" class="text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">← 上一节：场景与节点核心概念</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-0-overview/godot-0-5-first-project" class="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">下一节：第一个项目：Hello Godot →</RouterLink></nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"project.godot"},{id:"sec-3",name:"目录结构"},{id:"sec-4",name:"文件类型与Git"},{id:"sec-5",name:"res:// 路径"},{id:"sec-6",name:"资源导入"},{id:"sec-7",name:"小结"}]
const projectGodotCode = `; Engine configuration file.
config_version=5

[application]
config/name="My Game"
config/icon="res://icon.svg"
run/main_scene="res://scenes/main.tscn"

[display]
window/size/viewport_width=1280
window/size/viewport_height=720

[input]
move_left={ "events": [Object(InputEventKey,"physical_keycode":65)] }
move_right={ "events": [Object(InputEventKey,"physical_keycode":68)] }
jump={ "events": [Object(InputEventKey,"physical_keycode":32)] }

[autoload]
GlobalEvents="*res://scripts/global_events.gd"`

const dirStructureCode = `res://
├── project.godot              # 项目配置（≈ package.json）
├── scenes/                    # 场景文件 (.tscn)
│   ├── levels/                #   关卡场景
│   ├── characters/            #   角色（玩家/敌人/NPC）
│   ├── ui/                    #   UI（菜单/HUD/对话框）
│   └── props/                 #   道具/装饰
├── scripts/                   # GDScript 脚本 (.gd)
│   ├── player/                #   玩家逻辑
│   ├── enemies/               #   敌人 AI
│   └── utils/                 #   工具函数
├── assets/                    # 原始资源
│   ├── sprites/               #   精灵图/纹理
│   ├── audio/music/ sfx/      #   音频
│   ├── fonts/                 #   字体
│   └── shaders/               #   着色器 (.gdshader)
├── resources/                 # Godot 资源 (.tres)
│   ├── materials/             #   材质
│   └── themes/                #   UI 主题
└── addons/                    # 第三方插件`

const gitignoreCode = `# Godot
.godot/
*.translation
build/
export/
.DS_Store
Thumbs.db`
</script>
