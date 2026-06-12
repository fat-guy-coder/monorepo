<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">属性 getter/setter</h1><p class="text-sm text-slate-500 mt-1">自定义属性访问逻辑——拦截读写</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-10</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>setget = 自定义读写</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 TS:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">get value() / set value(v)</code> (ES6 getter/setter) | <strong>Python:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">@property</code> 装饰器 | <strong>GDScript:</strong> <code class="bg-purple-100 px-1 rounded text-xs font-mono">var x: set = _set_x, get = _get_x</code></p></aside>
<p class="text-slate-600 mb-3 leading-relaxed">当属性被读取或写入时，触发自定义函数。常见用途：值校验、计算属性、发射变化信号。</p>
<div class="mb-4"><Code language="gdscript" :code="setgetCode" title="setget.gd" /></div></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">2</span>实用场景</h2><div class="mb-4"><Code language="gdscript" :code="setgetUseCode" title="setget_use.gd" /></div></section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-blue-700 text-xs">var x: set = _set_x, get = _get_x</code>——拦截读写</span></li><li class="flex items-start gap-2"><span class="text-blue-500 mt-1">▸</span><span>最大用途：<strong>值变化自动发信号</strong>、校验范围、计算属性</span></li></ul></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-9-enums-constants" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：枚举与常量</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-1-gdscript-basics/godot-1-11-static-typing" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：静态类型注解 →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"setget 基础"},{id:"sec-2",name:"实用场景"},{id:"sec-3",name:"小结"}]
const setgetCode = `# setget ——拦截属性的读写
var health: int = 100:
    set(value):          # 写入时调用（value 是新值）
        health = clampi(value, 0, 100)  # 限制 0-100
    get:                 # 读取时调用
        return health

# 简写：只拦截 set
var speed: float = 300.0:
    set(v): speed = clampf(v, 0.0, 1000.0)`
const setgetUseCode = `# 场景1：属性变化自动发信号
var hp: int = 100:
    set(v):
        hp = v
        health_changed.emit(hp)  # 每次修改自动通知

# 场景2：计算属性（每次读取都计算）
var radius: float = 10.0
var area: float:
    get: return PI * radius * radius  # 只读！`

const setgetFiles: string[] = []
</script>
