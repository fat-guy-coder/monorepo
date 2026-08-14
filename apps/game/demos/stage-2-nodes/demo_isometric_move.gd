extends Node2D
## 等距八向移动 Demo —— 2D 移动逻辑 + 等距投影渲染
##
## 📚 涉及学习文档:
##   godot-2-8-tilemap        — 等距 TileMap + Y-sort 深度排序
##   godot-5-2-input-handling — Input.get_vector 八向输入归一化
##   godot-5-1-input-map      — InputMap 代码注册按键
##   godot-2-3-node2d-basics  — _draw() 自定义绘制
##
## 🎯 核心思想: 等距 ≠ 3D。它是「2D 移动逻辑」+「等距投影渲染」两层分离。
##   - 逻辑层: 角色在 world 坐标 (x, y) 里移动, 和普通 2D 八向移动一模一样
##   - 渲染层: _draw 时用投影公式把 world (x,y) 画到屏幕的菱形网格上
##
## 🔗 TS/Python 类比:
##   Input.get_vector ≈ 归一化二维向量 (TS: 手动 sqrt 归一化, 这里引擎内置)
##   _draw() ≈ Canvas API 的绘制回调 (TS: ctx.draw 在 rAF 里)
##   world 坐标 vs 屏幕坐标 ≈ 数据模型 vs 视图渲染 (TS: state vs DOM)
##
## 运行: 新建场景 → Node2D 根 → 附加此脚本 → F6 → WASD/方向键 八向移动

# ── 等距 tile 尺寸 (2:1 菱形) ──
const TILE_W: float = 64.0      ## 菱形宽
const TILE_H: float = 32.0      ## 菱形高 (2:1 是经典等距比例)
const GRID_SIZE: int = 10       ## 网格 10×10
const MOVE_SPEED: float = 4.0   ## 每秒移动的格子数
const SCREEN_CENTER: Vector2 = Vector2(400, 140)  ## 网格原点投影到屏幕的位置

# 角色在等距世界中的坐标 (格子的浮点坐标, 可以是 5.3 这种小数)
var world_pos: Vector2 = Vector2(5, 5)


func _ready() -> void:
	_setup_input()
	_print_isometric_math()


func _setup_input() -> void:
	# → godot-5-1-input-map: 注册 WASD + 方向键
	# TS 类比: 这相当于在 config 里声明快捷键, 然后 Input 单例统一读取
	var actions: Dictionary = {
		"move_left":  [KEY_A, KEY_LEFT],
		"move_right": [KEY_D, KEY_RIGHT],
		"move_up":    [KEY_W, KEY_UP],
		"move_down":  [KEY_S, KEY_DOWN],
	}
	for action_name: String in actions:
		if not InputMap.has_action(action_name):
			InputMap.add_action(action_name)
			for key: Key in actions[action_name]:
				var ev: InputEventKey = InputEventKey.new()
				ev.physical_keycode = key
				InputMap.action_add_event(action_name, ev)


func _print_isometric_math() -> void:
	print("========== 等距八向移动 ==========")
	print("核心公式: world (x,y) → screen (sx,sy)")
	print("  sx = (x - y) * TILE_W / 2")
	print("  sy = (x + y) * TILE_H / 2")
	print("")

	# → godot-2-8-tilemap: 等距投影, 验证几个坐标
	print("验证坐标投影:")
	print("  world (0,0) → screen ", _world_to_screen(Vector2(0, 0)))
	# 输出: world (0,0) → screen (400, 140)
	print("  world (1,0) → screen ", _world_to_screen(Vector2(1, 0)), "  ← 向右下")
	# 输出: world (1,0) → screen (432, 156)  ← 向右下
	print("  world (0,1) → screen ", _world_to_screen(Vector2(0, 1)), "  ← 向左下")
	# 输出: world (0,1) → screen (368, 156)  ← 向左下
	print("  world (1,1) → screen ", _world_to_screen(Vector2(1, 1)), "  ← 菱形顶点(正下)")
	# 输出: world (1,1) → screen (400, 172)  ← 菱形顶点(正下)
	print("")

	# → godot-5-2-input-handling: 八向输入归一化
	print("八向输入: Input.get_vector(left, right, up, down)")
	print("  - 返回归一化 Vector2, 对角线长度 = 1 (不是 √2)")
	print("  - get_axis 只返回单轴(-1~1), get_vector 返回二维向量")
	print("  - 对比: 自己写 = 手动除 sqrt(x²+y²), 引擎帮你做好了")
	print("")

	print("Y-sort: 等距视角下 world.y 大的物体离镜头近, 应后绘制(盖住别人)")
	print("  Godot 用 y_sort_enabled = true 自动处理 (详见 godot-2-8-tilemap)")
	print("")
	print("👉 现在用 WASD / 方向键 移动画面里的蓝色圆点, 观察菱形网格上的走位。")
	print("")


# ── 每物理帧: 八向移动 (逻辑层) ──
func _physics_process(delta: float) -> void:
	# → godot-5-2-input-handling: get_vector 直接给归一化二维向量
	var input_vec: Vector2 = Input.get_vector("move_left", "move_right", "move_up", "move_down")

	if input_vec != Vector2.ZERO:
		# 逻辑层: 直接在世界坐标里移动, 和普通 2D 没区别
		world_pos += input_vec * MOVE_SPEED * delta

		# 限制在网格范围内 (clamp ≈ TS Math.min/max)
		world_pos.x = clampf(world_pos.x, 0.0, float(GRID_SIZE - 1))
		world_pos.y = clampf(world_pos.y, 0.0, float(GRID_SIZE - 1))

		queue_redraw()


# ── 等距投影: world → screen (渲染层核心) ──
# → godot-2-8-tilemap: 这就是"等距"的全部数学
func _world_to_screen(world: Vector2) -> Vector2:
	var sx: float = (world.x - world.y) * TILE_W / 2.0
	var sy: float = (world.x + world.y) * TILE_H / 2.0
	return SCREEN_CENTER + Vector2(sx, sy)


# ── 渲染: 画等距网格 + 角色 ──
func _draw() -> void:
	_draw_grid()
	_draw_player()


func _draw_grid() -> void:
	# 遍历每个格子, 画菱形
	for gx in range(GRID_SIZE):
		for gy in range(GRID_SIZE):
			var center: Vector2 = _world_to_screen(Vector2(gx, gy))
			# 菱形四个顶点 (上/右/下/左)
			var pts: PackedVector2Array = PackedVector2Array([
				center + Vector2(0, -TILE_H / 2.0),
				center + Vector2(TILE_W / 2.0, 0),
				center + Vector2(0, TILE_H / 2.0),
				center + Vector2(-TILE_W / 2.0, 0),
			])
			# 棋盘格交替颜色
			var c: Color = Color(0.28, 0.31, 0.36) if (gx + gy) % 2 == 0 else Color(0.22, 0.25, 0.30)
			draw_polygon(pts, [c])
			# 边框 (闭合: 首尾点重复)
			draw_polyline(pts + PackedVector2Array([pts[0]]), Color(0.45, 0.5, 0.56, 0.5), 1.0)


func _draw_player() -> void:
	# 渲染层: 世界坐标 → 屏幕坐标后再画
	var p: Vector2 = _world_to_screen(world_pos)

	# 阴影 (脚底, 略低于身体)
	draw_circle(p + Vector2(0, 6), 10, Color(0, 0, 0, 0.25))

	# 身体
	draw_circle(p, 12, Color(0.3, 0.7, 1.0))
	draw_arc(p, 12, 0, TAU, 32, Color(0.15, 0.4, 0.7), 2.0)

	# 朝向指示点 (白色 + 瞳孔)
	draw_circle(p + Vector2(4, -4), 3, Color.WHITE)
	draw_circle(p + Vector2(5, -4), 1.5, Color.BLACK)
