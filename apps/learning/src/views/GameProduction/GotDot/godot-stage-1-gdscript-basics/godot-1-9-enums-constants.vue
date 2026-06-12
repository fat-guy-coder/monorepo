<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">枚举与常量</h1><p class="text-sm text-slate-500 mt-1">enum / const——让代码更可读的类型安全方案</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-9</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>enum——枚举类型</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">enum State {"{"} Idle, Run, Jump {"}"}</code> | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">class State(Enum): IDLE=1</code> | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">enum State {"{"} IDLE, RUN, JUMP {"}"}</code><br/>GDScript 的 enum 和 TS 几乎一样——花括号、逗号分隔、自动递增整数值。</p></aside>
<div class="mb-4"><Code language="gdscript" :code="enumCode" title="enum.gd" /></div></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>@export_enum——编辑器下拉选择</h2><p class="text-slate-600 mb-3 leading-relaxed">和 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">@export</code> 配合，Inspector 中出现下拉框，比手写字符串更安全。≈ Vue 的 prop validator。</p><div class="mb-4"><Code language="gdscript" :code="exportEnumCode" title="export_enum.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">3</span>const——编译时常量</h2><p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">const</code> 值在<strong>编译时</strong>确定。不能是函数调用的结果。命名全大写（约定）。</p><div class="mb-4"><Code language="gdscript" :code="constCode" title="const.gd" /></div></section>
<section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">enum {"{}"}</code> ≈ TS enum，自动递增整数，可自定义值</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">@export_enum</code> → Inspector 下拉框</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">const</code> 编译时常量（大写命名），不能是运行时值</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-8-signals-basics" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：信号基础</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-10-setget-properties" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：属性 getter/setter →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"enum"},{id:"sec-2",name:"@export_enum"},{id:"sec-3",name:"const"},{id:"sec-4",name:"小结"}]
const enumCode = `# enum ——花括号、逗号分隔、自动递增（从 0 开始）
enum State { IDLE, RUN, JUMP, DEAD }  # IDLE=0, RUN=1, JUMP=2, DEAD=3
var state: State = State.IDLE
if state == State.RUN: print("跑步")
# 自定义值
enum ErrorCode { OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500 }
# 不连续值
enum Priority { LOW = 1, MEDIUM = 5, HIGH = 10 }`
const exportEnumCode = `# @export_enum ——Inspector 下拉选择
@export_enum("Warrior", "Mage", "Archer") var class_type: String = "Warrior"
# 也可以限制范围
@export_enum("Easy:1", "Normal:2", "Hard:3") var difficulty: int = 2`
const constCode = `const MAX_HEALTH: int = 200
const GRAVITY: float = 980.0
const GAME_TITLE: String = "My Game"
# const now = Time.get_time()  # ❌ 编译错误！必须是编译时常量`
</script>
