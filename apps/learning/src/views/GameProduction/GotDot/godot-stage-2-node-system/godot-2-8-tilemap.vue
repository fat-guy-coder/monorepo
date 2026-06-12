<template><div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50"><header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">TileMap</h1><p class="text-sm text-slate-500 mt-1">瓦片地图——批量绘制关卡世界的利器</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-8</span></div></div></header><main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
<section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">🗺️</span>TileMap = 关卡编辑器</h2><aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>TileMap ≈ <strong>CSS Grid + 精灵图册（Sprite Sheet）</strong>——用一个个小方块拼出整个关卡。类似用 emoji 拼字符画，但是用图片瓦片。</p></aside>
<p class="text-slate-600 mb-3 leading-relaxed">三要素：<strong>TileSet</strong>（瓦片图集资源）→ <strong>TileMap 节点</strong>（图层）→ <strong>绘制</strong>（编辑器画笔）。支持多层（地面层/装饰层/碰撞层）、自动拼接（terrain autotiling）、动画瓦片。</p>
<div class="mb-4"><Code language="gdscript" :code="tilemapCode" title="tilemap.gd" /></div></section>
<section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">1</span>工作流</h2><ol class="list-decimal list-inside space-y-1 text-slate-600 text-sm"><li>准备瓦片图片（如 16×16 或 32×32 的 tileset.png）</li><li>创建 TileSet 资源 → 拖入图片 → 设置切片大小 → 添加物理碰撞/导航</li><li>创建 TileMap 节点 → 分配 TileSet → 选画笔工具绘制</li><li>添加多个 TileMap 图层（地面/装饰/碰撞）</li></ol></section></main>
<footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-7-rigidbody2d" class="text-slate-500 hover:text-blue-600 flex items-center gap-1">← 上一节：RigidBody2D</RouterLink><RouterLink to="/GameProduction/GotDot/godot-stage-2-node-system/godot-2-9-camera2d" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">下一节：Camera2D →</RouterLink></nav></footer></div></template>
<script setup lang="ts">import { Code, Nav } from 'components'; import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"概述"},{id:"sec-2",name:"工作流"}]
const tilemapCode = `# 运行时操作 TileMap（常用于程序化生成地图）
@onready var tilemap: TileMap = $TileMap
func place_tile(pos: Vector2i, tile_id: int) -> void:
    tilemap.set_cell(0, pos, tile_id, Vector2i(0, 0))  # 图层0,坐标,瓦片ID,图集坐标
func get_tile(pos: Vector2i) -> int:
    return tilemap.get_cell_source_id(0, pos)  # 获取某位置的瓦片ID
func remove_tile(pos: Vector2i) -> void:
    tilemap.erase_cell(0, pos)
func world_to_tile(world_pos: Vector2) -> Vector2i:
    return tilemap.local_to_map(world_pos)  # 世界坐标→瓦片坐标`
</script>
