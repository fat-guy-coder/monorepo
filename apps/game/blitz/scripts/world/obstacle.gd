extends StaticBody2D
class_name Obstacle
## 横版障碍物 — 纯代码画出「石块/箱子」+ 碰撞
##
## 📚 涉及学习文档:
##   godot-2-8-tilemap        — TileMapLayer 的地格尺寸 (本文件跟它共用 BeltFloor 的格宽)
##   godot-2-3-node2d-basics  — draw_colored_polygon / draw_polyline 绘制多边形
##   godot-2-5-collision2d    — RectangleShape2D: 代码里创建碰撞形状
##   godot-6-4-collision-layers — bit4 = 墙壁/障碍
##
## 🎮 为什么障碍物是「独立节点」而不是瓦片:
##   Y-sort 的价值在于「我能走到它后面被挡住」。平铺的瓦片画不出高度,
##   所以障碍物用独立节点画成一个箱子 —— 这是让深度排序**肉眼可见**的关键。
##   一个开了 Y-sort 却没有遮挡物的关卡, 等于没验证过 Y-sort。
##
## 🏗️ 坐标系 (见 belt_floor.gd 文件头):
##   position = **底面矩形的中心**。屏幕 Y 往下 = 纵深变浅 = 靠近镜头。
##
## 🏗️ 原点约定: position = 底面矩形**中心**。
##   为什么用底面中心而不是前边缘当排序锚点:
##     Y-sort 比的是 global_position.y。角色站在障碍物**前面**时, 它的 y 必须大于
##     障碍物的排序键 → 才画在前面。
##     用底面**中心**当锚点: 前边缘 = 中心 + 半纵深, 角色越靠前 y 越大 → 画在前 ✓
##     用最前**边缘**当锚点: 角色刚踏进底面就 y 更小 → 被吸到后面 ✗
##
## 🏗️ 画法 (横版没有透视, 所以只有两个可见面):
##   **顶面** + **正面**。等距版本要画「左前 / 右前」两个侧面, 那是因为菱形底面
##   把镜头摆在了角上; 横版的镜头正对着箱子, 两个侧面都看不见。
##   顶面画成**整个底面那个大小的矩形**上移 height_px —— 顶面是「从上往下偏一点看」
##   看到的那块面, 而它和底面在世界空间里本来就是一回事, 所以投到屏幕上尺寸相同。
##   (底面是 2:1 压扁过的, 顶面跟着一样扁 —— 这正是同一个世界平面应有的结果。)
##   ⚠️ 这里**不需要**任何压扁代码: _recompute_size() 直接读 BeltFloor.CELL_D_F,
##      而那个常量已经含了 DEPTH_SCALE。手写第二处压扁 = 压两次, 箱子会矮一半。


@export var cells: Vector2i = Vector2i.ONE      ## 占地格数 (底面矩形尺寸 = cells × 单格)
@export var height_px: float = 34.0             ## 箱子视觉高度 (px)
## 碰撞体相对底面的缩放。横版里底面**看不见** (被顶面盖住的是箱体的上表面),
## 所以碰撞基本就是底面本身 —— 1.0 是正确值, 留这个出口只是给手感微调用。
@export var collision_scale: float = 1.0

@export var top_color: Color = Color(0.44, 0.46, 0.54)      ## 顶面 (最亮, 受光)
@export var front_color: Color = Color(0.24, 0.25, 0.32)    ## 正面 (中, 背光)
@export var edge_color: Color = Color(0.09, 0.09, 0.13)     ## 描边

## 底面矩形的半宽 (X 方向) / 半纵深 (屏幕 Y 方向)
var _hw: float = 0.0
var _hd: float = 0.0


func _ready() -> void:
	# bit4 = 墙壁/障碍 (与 player 的 collision_mask 对应)
	collision_layer = 1 << 4
	collision_mask = 0
	# ⚠️ 顺序不能反: _build_collision() 读 _hw/_hd, 必须先算尺寸。
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


## 底面矩形的半宽 / 半纵深。
##
## 🏗️ 这里**不再是等距那个 (i+j) 的和** —— 那是菱形底面的产物, 已随等距一起删掉。
##   矩形底面每个轴各管各的: 半宽只看 cells.x, 半纵深只看 cells.y。
func _recompute_size() -> void:
	_hw = float(cells.x) * BeltFloor.CELL_W_F * 0.5
	_hd = float(cells.y) * BeltFloor.CELL_D_F * 0.5


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
	rect.size = Vector2(_hw * 2.0, _hd * 2.0) * collision_scale
	cs.shape = rect


# ============================================================
# 绘制 — 正面 + 顶面
# ============================================================
func _draw() -> void:
	_recompute_size()

	# 底面矩形的四个角 (原点 = 底面中心)。屏幕 Y 越小 = 越靠里 (远)。
	var back_l: Vector2 = Vector2(-_hw, -_hd)    # 里·左
	var back_r: Vector2 = Vector2(_hw, -_hd)     # 里·右
	var front_l: Vector2 = Vector2(-_hw, _hd)    # 外·左 (靠近镜头)
	var front_r: Vector2 = Vector2(_hw, _hd)     # 外·右
	var up: Vector2 = Vector2(0.0, -height_px)

	# 先正面, 再顶面 —— 顶面在屏幕上方, 两者不重叠, 但先画正面对描边顺序更直观
	draw_colored_polygon(
		PackedVector2Array([front_l, front_r, front_r + up, front_l + up]), front_color)
	draw_colored_polygon(
		PackedVector2Array([back_l + up, back_r + up, front_r + up, front_l + up]), top_color)

	# 描边: 让箱子的棱清楚, 走位时才看得出这是个立体的块
	draw_polyline(PackedVector2Array([front_l, front_r, front_r + up, front_l + up, front_l]),
		edge_color, 1.5)
	draw_polyline(
		PackedVector2Array([back_l + up, back_r + up, front_r + up, front_l + up, back_l + up]),
		edge_color, 1.5)
	# 四条竖棱 —— 正面两条 + 里侧两条 (里侧那两条只有顶部一点露得出来, 但少了箱子会「缺角」)
	for v: Vector2 in [front_l, front_r, back_l, back_r]:
		draw_line(v, v + up, edge_color, 1.5)
