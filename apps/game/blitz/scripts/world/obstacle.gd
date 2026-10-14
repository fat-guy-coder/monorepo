extends StaticBody2D
class_name Obstacle
## 等距立方体障碍物 — 纯代码画出立体的「石块/箱子」+ 碰撞
##
## 📚 涉及学习文档:
##   godot-2-8-tilemap        — 等距投影: 菱形底面 + 抬起顶面 = 立方体错觉
##   godot-2-3-node2d-basics  — draw_colored_polygon / draw_polyline 绘制多边形
##   godot-2-5-collision2d    — RectangleShape2D: 代码里创建碰撞形状
##   godot-6-4-collision-layers — bit4 = 墙壁/障碍
##
## 🎮 为什么障碍物是「独立节点」而不是瓦片:
##   Y-sort 的价值在于「我能走到它后面被挡住」。平铺的瓦片画不出立体高度,
##   所以障碍物用独立节点画成一个立方体 —— 这是让深度排序**肉眼可见**的关键。
##   一个开了 Y-sort 却没有遮挡物的关卡, 等于没验证过 Y-sort。
##
## 🏗️ 原点约定: **position = 底面菱形的中心**。
##   为什么用底面中心而不是最前面的顶点当排序锚点:
##     Y-sort 比的是 global_position.y。角色站在障碍物「前面边缘」时,
##     它的 y 应该大于障碍物的排序键 → 才画在前面。
##     用底面**中心**当锚点: 前边缘 = 中心 + TILE_H/2, 角色 y 更大 → 画在前 ✓
##     用最前**顶点**当锚点: 角色刚踏进底面就 y 更小 → 被吸到后面 ✗
##
## 🏗️ 碰撞体为什么比视觉小:
##   菱形里能塞下的最大**轴对齐矩形**只有 (半宽, 半高)。
##   但 floating 模式下沿菱形斜边滑动会抖动 (45° 边每跨一格都微调方向),
##   所以碰撞体用轴对齐矩形 —— 沿 AABB 滑动是平滑的。
##   collision_scale 略微放大以补手感, 视觉上允许一点重叠。


@export var cells: Vector2i = Vector2i.ONE      ## 占地格数 (菱形底面尺寸 = cells × 单格)
@export var height_px: float = 34.0             ## 立方体视觉高度 (px)
@export var collision_scale: float = 1.45       ## 碰撞体相对内接矩形的放大系数

@export var top_color: Color = Color(0.42, 0.44, 0.52)      ## 顶面 (最亮)
@export var right_color: Color = Color(0.26, 0.27, 0.34)    ## 右前面 (中)
@export var left_color: Color = Color(0.17, 0.18, 0.24)     ## 左前面 (最暗)
@export var edge_color: Color = Color(0.09, 0.09, 0.13)     ## 描边

## 底面菱形的半宽 / 半高
var _hw: float = 0.0
var _hh: float = 0.0


func _ready() -> void:
	# bit4 = 墙壁/障碍 (与 player 的 collision_mask 对应)
	collision_layer = 1 << 4
	collision_mask = 0
	# ⚠️ 顺序不能反: _build_collision() 读 _hw/_hh, 必须先算尺寸。
	#    反了的话碰撞体是 Vector2(0,0), 一个零面积的 CollisionShape2D ——
	#    Godot 不会报任何错, 只是障碍物**穿过去毫无阻挡**,
	#    看起来像「玩家碰撞坏了」, 排查方向会完全跑偏。
	_recompute_size()
	_build_collision()


## 由 main.gd 在摆放时调用。只写数据 —— 尺寸与碰撞体交给 _ready(), 那里顺序有保证。
func configure(p_cells: Vector2i, p_height: float) -> void:
	cells = p_cells
	height_px = p_height
	if is_inside_tree():
		_recompute_size()
		_build_collision()
		queue_redraw()


## 底面菱形的半宽 / 半高。
##
## ⚠️ 是 (i+j) 的和, 不是各自单独乘 —— 等距投影里世界 x 取决于 i+j, 世界 y 取决于 j-i。
##    所以一块 cx×cy 的区域的半宽 = (cx+cy)·TILE_W/4, **只跟和有关**, 跟长宽比无关:
##      1×1 → 半宽 32 半高 16      2×1 → 半宽 48 半高 24
##      1×2 → 半宽 48 半高 24      2×2 → 半宽 64 半高 32
##    (旧代码写的是 cells.x * TILE_W/2, 1×1 碰巧对, 2×1 会宽出一倍)
func _recompute_size() -> void:
	var span: float = float(cells.x + cells.y)
	_hw = span * Iso.TILE_W_F * 0.25
	_hh = span * Iso.TILE_H_F * 0.25


func _build_collision() -> void:
	# 复用已存在的 CollisionShape2D, 避免重复添加
	var cs: CollisionShape2D = null
	for child: Node in get_children():
		if child is CollisionShape2D:
			cs = child
			break
	if cs == null:
		cs = CollisionShape2D.new()
		add_child(cs)
	var rect: RectangleShape2D = RectangleShape2D.new()
	# ⚠️ 菱形 |x|/hw + |y|/hh ≤ 1 内能塞下的最大**轴对齐矩形**是 (hw/2, hh/2), 不是 (hw, hh)。
	#    (在 x = hw/2 处菱形允许的 |y| 上限正好是 hh/2)
	#    再乘 collision_scale 补手感 —— 等距游戏里碰撞体略大于视觉比略小舒服得多。
	rect.size = Vector2(_hw, _hh) * 0.5 * collision_scale
	cs.shape = rect


# ============================================================
# 绘制 — 底面菱形 + 抬起顶面 + 两个前侧面
# ============================================================
func _draw() -> void:
	_recompute_size()

	# 底面菱形的四个顶点 (原点 = 底面中心)
	var n: Vector2 = Vector2(0.0, -_hh)   # 后 (北)
	var e: Vector2 = Vector2(_hw, 0.0)    # 右 (东)
	var s: Vector2 = Vector2(0.0, _hh)    # 前 (南)
	var w: Vector2 = Vector2(-_hw, 0.0)   # 左 (西)
	var up: Vector2 = Vector2(0.0, -height_px)

	# 画出顺序很有讲究: 先两个**前侧面**, 再**顶面**盖上去。
	# 反过来画的话顶面会被侧面压住, 立方体会「塌」成两个梯形。
	draw_colored_polygon(PackedVector2Array([w, s, s + up, w + up]), left_color)
	draw_colored_polygon(PackedVector2Array([s, e, e + up, s + up]), right_color)
	draw_colored_polygon(PackedVector2Array([n + up, e + up, s + up, w + up]), top_color)

	# 描边: 让立方体的棱清楚, 旋转/走位时才看得出这是个立体的块
	draw_polyline(PackedVector2Array([n, e, s, w, n]), edge_color, 1.5)
	draw_polyline(PackedVector2Array([n + up, e + up, s + up, w + up, n + up]), edge_color, 1.5)
	# 三条可见的竖棱 (后棱被顶面挡住, 不画)
	for v: Vector2 in [s, w, e]:
		draw_line(v, v + up, edge_color, 1.5)
