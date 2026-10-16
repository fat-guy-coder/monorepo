extends Node2D
## Blitz 主场景 — 横版 (2.5D) 仙侠 ARPG (v0.4 视角重构)
##
## 📚 涉及学习文档:
##   godot-4-1-scene-tree          — 场景树: 谁是父谁是子决定了绘制顺序
##   godot-4-2-scene-instantiation — PackedScene.instantiate()
##   godot-2-8-tilemap             — TileMapLayer + Y-sort 深度排序 (本文件最重要的结构决策)
##   godot-2-9-camera2d            — Camera2D 边界限制
##   godot-1-8-signals-basics      — 信号接线: 玩家/敌人/复活点 → 本文件
##   godot-7-8-state-machines      — 呼吸: 本文件没有状态机, 它只是「编排者」
##
## 🎮 v0.4 是一场**视角重构**: 等距 3/4 → 2.5D 横版 (DNF / 三国战纪 那个维度)。
##   改动集中在世界层 (地面/障碍/摆放/相机/边界墙) 和角色的朝向与绘制;
##   战斗系统 —— 8 状态机 / 精力 / 精准格挡 / 蓄力破霸体 / 敌人三段出招 ——
##   **一个字节都没动**。那不是运气: v0.3 的东西本来就是维度无关的,
##   因为 v0.2 定下过「物理跑在未投影的屏幕 XY 上, 投影只是画面」。
##
## 🏗️ 坐标系 (全项目统一, 完整推导在 belt_floor.gd 文件头):
##   地面平面 = **X(左右) × Z(纵深)**, 引擎里存成 `global_position = Vector2(x, -z)`。
##   屏幕 Y 往下 = Z 变小 = **靠近镜头**。跳跃高度是**另一个变量**, 不占 position。
##   于是「Y-sort 按 global_position.y 排序」= 「按纵深排序」—— 一行都不用改。
##
## 🎮 本文件从 v0.1 的 794 行砍到 ~330 行 (v0.2 做的), 那个决定继续有效:
##   旧 main.gd 里塞了 6 个用 `GDScript.new() + source_code` 运行时编译的内联脚本
##   (星空/草线/格挡物/格挡特效/终点旗帜/Boss 血条)。它们各自成了
##   scripts/world/*.gd 和 scripts/fx/*.gd 里带 class_name 的文件,
##   整个代码库**不再有任何运行时编译**。
##
## 🏗️ 场景树结构 (绘制顺序 = 这个结构的直接结果, 改结构前先读这段):
##
##   Game (Node2D)                    ← 本脚本
##   ├── Backdrop    (z_index -20)    ← 星空。**不是** World 的子节点
##   ├── Floor       (z_index -10)    ← BeltFloor。**必须是 World 的兄弟**, 见下
##   ├── World       (y_sort_enabled) ← Y-sort 根 (按纵深排序)
##   │   ├── Wall_*      (不可见, 只有碰撞 + Line2D 描边)
##   │   ├── Obstacle_*  (原点在底面矩形中心)
##   │   ├── RespawnPoint_*
##   │   ├── Enemy_*
##   │   └── Player      ← 原点在脚底
##   ├── Fx          (z_index 40, group "fx_layer")
##   ├── UI          (Hud, CanvasLayer 100)
##   └── DebugOverlay(CanvasLayer 200 + 世界空间高亮)
##
## 🏗️ 为什么地面必须是 World 的**兄弟**而不是子节点:
##   父节点开了 y_sort_enabled 时, 一个自己没开 y-sort 的子节点会被当成
##   **一整个整体**按它自己的 position 参与排序。地面做子节点时「碰巧」看着是对的
##   (因为地面在原点附近), 直到有物体落在负 y 才会神秘失效 —— 是最难查的那类 bug。
##   用 z_index = -10 的兄弟节点则是**确定性正确**的: z_index 先于 y-sort 结算。
##   ⚠️ 横版里这条**更容易踩**: 纵深 = -position.y, 所以「负 y」现在是常态而不是边缘情况。

# ============================================================
# 关卡常量
# ============================================================
## 地格数 (宽, 纵深)。40×18 格 × (64×32)px = 屏幕 **2560×576**,
## 世界空间则是 **2560×1152** (纵深被压扁了一半)。
##
## 🏗️ 为什么纵深是 **18** 而不是 9:
##   压扁把一格从 64px 变成 32px。如果格数不变, 地面在屏幕上就只剩 288px 高 ——
##   关卡整个扁掉, 所有障碍物/复活点/敌人的**屏幕位置全部要重摆重看**。
##   把行数翻倍正好抵消压扁, 屏幕尺寸和布局**一个像素都不动** ——
##   这一次改的只是「格子在屏幕上有多高」和「世界纵深有多少格」。
##   世界纵深从 576 变成 1152, 也就是纵深方向的**可走距离翻倍**:
##   横版里「绕后 / 拉开纵深」本来就是要走起来才有意义的动作。
##
## 🏗️ 这个长宽比同时决定了关卡形状和相机行为 (这一条没变):
##   · 屏幕宽 2560 > 视口宽 1280  → 相机在 X 上真的会「跟」起来
##   · 屏幕深 576 < 视口高 720   → CameraRig._fit_axis 走进「锁死中心」分支
##                                → 相机在纵深上**完全不动** = 横版该有的样子
##   把纵深调到 720 以上, 相机立刻开始上下漂 —— 那是平台跳跃的观感。
##   「横版相机只横着滚」不是特判出来的, 是这两个数字自己长出来的。
const FLOOR_CELLS: Vector2i = Vector2i(40, 18)
## 地格 (0,0) 的世界坐标 —— 即地图左上角 = X 最小、纵深**最远**的那一格
const FLOOR_ORIGIN: Vector2 = Vector2(0.0, 0.0)
## 出生地格。角色初始位置 + 初始复活点**共用**这一个常量 ——
## 分两处写的话, 改了出生点却忘了改复活点, 一死就会被送回旧位置。
##
## ⚠️ 行号 (9) 看上去像随手写的, 其实有来历: 行数是 18, 9 正好在正中间。
##    压扁前它是 4/9, 压扁后写 9/18 才是同一个位置 (j 全部 ×2, 见 _create_obstacles)。
const START_CELL: Vector2i = Vector2i(4, 9)
## 边界墙厚度
const WALL_THICKNESS: float = 22.0
## 边界墙内缩: 让碰撞面落在最外圈地砖**稍微靠里**一点, 免得角色半个身子压在砖外
const WALL_MARGIN: float = 10.0

# ============================================================
# 节点引用
# ============================================================
var floor: BeltFloor = null
var world: Node2D = null
var fx: Node2D = null
var player: BlitzPlayer = null
var camera: CameraRig = null
var hud: Hud = null
var debug_overlay: DebugOverlay = null

var score: int = 0
## 当前复活点位置。死亡后回到这里 —— 低惩罚死亡循环 (见 DESIGN.md)
var _current_spawn: Vector2 = Vector2.ZERO
## 正在复活的过场中, 防止死亡信号重复触发 (无敌帧外还有一击致死等边界情况)
var _respawning: bool = false


# ============================================================
# 入口
# ============================================================
func _ready() -> void:
	RenderingServer.set_default_clear_color(Color(0.05, 0.05, 0.11))

	# 顺序有依赖: 地面 → (世界/障碍/敌人要用地面的坐标桥) → 玩家 → 相机(要用地面的边界)
	_build_floor()
	_build_backdrop()
	_build_world()
	_create_player()
	_create_camera()
	_create_fx_layer()
	_create_hud()
	_create_debug_overlay()

	_maybe_run_test_hooks()


func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("restart"):
		get_tree().reload_current_scene()


# ============================================================
# 地面
# ============================================================
func _build_floor() -> void:
	floor = BeltFloor.new()
	floor.name = "Floor"
	floor.position = FLOOR_ORIGIN
	floor.z_index = -10
	add_child(floor)
	floor.fill_rect(Rect2i(Vector2i.ZERO, FLOOR_CELLS))
	# 坐标约定自检: 换算是否可逆 + 轴向是否与横版设计一致 + 深度明暗分布。
	# 这不是「调试残留」—— 它是**回归门**。把 +j 的方向弄反 (让画面上方变成「近」),
	# 整个游戏会上下颠倒却**不报任何错**, 只是「玩起来怪怪的」——
	# 正是那种截图看不出来、只能靠断言抓的错误。
	floor.debug_print_grid()


func _build_backdrop() -> void:
	var bd: Backdrop = Backdrop.new()
	bd.name = "Backdrop"
	# 星空范围跟着地面走并外扩 —— 写死矩形的话, 地图一改尺寸就会露出空背景
	bd.area = floor.bounds_global().grow(700.0)
	add_child(bd)


# ============================================================
# 世界 (Y-sort 根)
# ============================================================
func _build_world() -> void:
	world = Node2D.new()
	world.name = "World"
	world.y_sort_enabled = true
	add_child(world)

	_create_border_walls()
	_create_obstacles()
	_create_respawn_points()
	_create_enemies()


## 四道边界墙 —— 轴对齐, 贴着地面矩形的四条边。
##
## 🏗️ 比等距版简单得多, 而且简单的**原因**值得记下来:
##   等距地面是**菱形**, 包围盒的四角是空的 (没有地砖)。围着包围盒放墙, 玩家就能
##   走到菱形斜边之外的虚空里站着 —— 看起来像「走出了地图」。所以旧代码必须沿
##   四条**斜边**放墙 (每道旋转 ±26.57°), 还得让每道墙两端各多伸半个厚度,
##   去补 90° 拐角处两块有限厚矩形留下的楔形缺口。
##   横版地面就是个**矩形**, 四道墙正着摆即可, 拐角天然闭合。
func _create_border_walls() -> void:
	var b: Rect2 = floor.bounds_global()
	var cx: float = b.position.x + b.size.x * 0.5
	var cy: float = b.position.y + b.size.y * 0.5
	var off: float = WALL_MARGIN + WALL_THICKNESS * 0.5
	# 每道墙比对应的边长多一个厚度, 让四角互相压住 (矩形拐角没有楔形缺口要补,
	# 但重叠一段仍然比精确对齐更稳 —— 浮点上「刚好接住」是不该指望的)
	var lx: float = b.size.x + WALL_THICKNESS
	var ly: float = b.size.y + WALL_THICKNESS

	# 里侧墙 (最远) 和外侧墙 (最近) 是横着的; 左右两侧是竖着的
	_make_wall(Vector2(cx, b.position.y - off), Vector2.RIGHT, lx)
	_make_wall(Vector2(cx, b.position.y + b.size.y + off), Vector2.RIGHT, lx)
	_make_wall(Vector2(b.position.x - off, cy), Vector2.DOWN, ly)
	_make_wall(Vector2(b.position.x + b.size.x + off, cy), Vector2.DOWN, ly)


func _make_wall(center: Vector2, dir: Vector2, length: float) -> void:
	var body: StaticBody2D = StaticBody2D.new()
	body.position = center
	body.rotation = dir.angle()
	body.collision_layer = 1 << 4   # bit4: 墙壁
	body.collision_mask = 0

	var cs: CollisionShape2D = CollisionShape2D.new()
	var rect: RectangleShape2D = RectangleShape2D.new()
	rect.size = Vector2(length, WALL_THICKNESS)
	cs.shape = rect
	body.add_child(cs)

	# 视觉用内建的 Line2D (不需要脚本): 一条暗色底线 + 一条亮色高光,
	# 两道线就能表达「齐腰的石栏」, 也让玩家一眼看出可行走区域的边界在哪。
	var base_line: Line2D = Line2D.new()
	base_line.points = PackedVector2Array([Vector2(-length * 0.5, 0.0), Vector2(length * 0.5, 0.0)])
	base_line.width = 8.0
	base_line.default_color = Color(0.15, 0.16, 0.22)
	body.add_child(base_line)

	var top_line: Line2D = Line2D.new()
	top_line.points = PackedVector2Array([Vector2(-length * 0.5, -4.0), Vector2(length * 0.5, -4.0)])
	top_line.width = 3.0
	top_line.default_color = Color(0.40, 0.45, 0.58)
	body.add_child(top_line)

	world.add_child(body)


## 障碍物 —— 让 Y-sort 的遮挡效果**肉眼可见**的关键。
## 一个开了 Y-sort 却没有遮挡物的关卡, 等于没验证过 Y-sort。
func _create_obstacles() -> void:
	# { cell = 起点地格, cells = 占地格数, height = 视觉高度 }
	#
	# 🎮 摆位是**为了验收**而不是关卡设计 (和 v0.3 的敌人配比同一个理由):
	#   横版要验的是「纵深遮挡读不读得出来」, 所以箱子专门摆成能跟玩家、
	#   跟彼此前后错开的样子 —— 站到箱子后面被挡住, 才算验过 Y-sort。
	#
	# ⚠️ 纵深 (j) 和纵深格数 (cells.y) **都是压扁前那个数的两倍**。
	#    压扁把一格从 64px 变成 32px, 所以 ×2 之后屏幕位置和屏幕尺寸**完全不变** ——
	#    这一行里改的是「世界纵深多少格」, 不是「箱子摆在哪」。见 FLOOR_CELLS。
	var layout: Array[Dictionary] = [
		{ cell = Vector2i(6, 2),   cells = Vector2i(2, 2), height = 44.0 },
		{ cell = Vector2i(11, 12), cells = Vector2i(1, 2), height = 30.0 },
		{ cell = Vector2i(16, 4),  cells = Vector2i(1, 4), height = 52.0 },
		{ cell = Vector2i(23, 10), cells = Vector2i(2, 4), height = 38.0 },
		{ cell = Vector2i(29, 2),  cells = Vector2i(1, 2), height = 30.0 },
		{ cell = Vector2i(33, 12), cells = Vector2i(2, 2), height = 40.0 },
		{ cell = Vector2i(37, 6),  cells = Vector2i(1, 2), height = 34.0 },
	]
	for item: Dictionary in layout:
		var cell: Vector2i = item.cell
		var cells: Vector2i = item.cells
		var ob: Obstacle = Obstacle.new()
		ob.name = "Obstacle_%d_%d" % [cell.x, cell.y]
		# ⚠️ 位置必须用 center_of_span (多格区域的重心), 不能用 center_of:
		#    后者返回**起点那一格**的菱形中心, 2×1 的方块会整体偏半格。
		ob.position = floor.center_of_span(cell, cells)
		ob.configure(cells, item.height)
		world.add_child(ob)


func _create_respawn_points() -> void:
	# 出生点直接就是初始复活点 (不靠「列表里第一个碰巧是它」这种隐式约定)
	_current_spawn = floor.center_of(START_CELL)

	# 沿关卡横向一字排开 —— 横版是「一条走廊」, 复活点也该是沿路分布的补给点
	var cells: Array[Vector2i] = [
		START_CELL,
		Vector2i(14, 8),
		Vector2i(25, 8),
		Vector2i(37, 10),
	]
	for cell: Vector2i in cells:
		var rp: RespawnPoint = RespawnPoint.new()
		rp.name = "RespawnPoint_%d_%d" % [cell.x, cell.y]
		rp.position = floor.center_of(cell)
		rp.activated.connect(_on_respawn_activated)
		world.add_child(rp)
		if cell == START_CELL:
			# 出生点一开始就是亮的 —— 玩家一进游戏就该看到「我脚下是个安全点」
			rp.is_active = true
			rp.queue_redraw()


## 敌人配置。
##
## 🎮 v0.3 的配比是**为了验收**而定的, 不是关卡设计:
##   · 固定靶 (can_attack = false, 血厚) —— 用来试**重击伤害和破霸体**,
##     它不会还手, 所以你能安静地对比「轻击 1 下 / 重击 1 下 / 满蓄 1 下」各掉多少血。
##   · 会出招的敌人 —— 用来试**格挡 / 精准格挡**。血量调低 (4) 是因为
##     本轮的验收对象是「挡得爽不爽」, 不是「打得久不久」。
func _create_enemies() -> void:
	# 巡逻轴现在有两个真正不同的含义, 都会被看到:
	#   Vector2.RIGHT —— 横向巡逻 (横版最经典的杂兵)
	#   Vector2.DOWN  —— **沿纵深**巡逻 (横版独有: 在前后方向上踱步, 逼你处理纵深)
	#
	# ⚠️ 已知的待办 (归到「敌人」那一步一起做, 不在压扁这一步里):
	#    这里的速度值 (70~95) 现在是**屏幕**单位 —— 敌人沿纵深走时, 世界速度会是
	#    横向的两倍, 和玩家「八个方向世界速度一致」的规则对不上。
	#    压扁这一步**没有让它变坏** (屏幕上的一切都和压扁前逐像素相同),
	#    所以留着不动是安全的; 但敌人一旦要用世界单位算射程/出招距离,
	#    这处就必须一起换算 —— 否则「狗追不上你, 但隔老远就砍到你」。
	_create_enemy(Vector2i(9, 8), BlitzEnemy.Type.PATROL, Vector2.RIGHT, 70.0)
	_create_enemy(Vector2i(16, 10), BlitzEnemy.Type.PATROL, Vector2.DOWN, 85.0)
	_create_enemy(Vector2i(21, 6), BlitzEnemy.Type.STATIONARY, Vector2.DOWN, 0.0, 10, false)
	_create_enemy(Vector2i(28, 4), BlitzEnemy.Type.CHASER, Vector2.DOWN, 95.0)
	_create_enemy(Vector2i(34, 10), BlitzEnemy.Type.CHASER, Vector2.DOWN, 80.0)


func _create_enemy(
	cell: Vector2i,
	type: BlitzEnemy.Type,
	axis: Vector2,
	speed: float,
	hp: int = 4,
	can_attack: bool = true
) -> void:
	var e: BlitzEnemy = ENEMY_SCENE.instantiate()
	e.name = "Enemy_%d_%d" % [cell.x, cell.y]
	e.position = floor.center_of(cell)
	e.enemy_type = type
	e.patrol_axis = axis
	e.max_health = hp
	e.health = hp
	e.can_attack = can_attack
	if speed > 0.0:
		e.move_speed = speed
	e.died.connect(_on_enemy_died)
	e.parried.connect(_on_enemy_parried)
	e.armor_broken.connect(_on_enemy_armor_broken)
	world.add_child(e)


# ============================================================
# 玩家 / 相机 / 特效层 / UI
# ============================================================
func _create_player() -> void:
	player = PLAYER_SCENE.instantiate()
	player.name = "Player"
	player.global_position = _current_spawn
	player.died.connect(_on_player_died)
	player.hit_landed.connect(_on_player_hit_landed)
	player.parried.connect(_on_player_parried)
	player.blocked.connect(_on_player_blocked)
	player.guard_broken.connect(_on_player_guard_broken)
	world.add_child(player)


## 相机是玩家的**子节点** —— 跟随是自动的, 不需要在 _process 里手写 position 赋值
## (那样反而会和平滑插值打架)。子节点只负责「怎么跟」和「跟到哪为止」。
func _create_camera() -> void:
	camera = CameraRig.new()
	camera.name = "CameraRig"
	player.add_child(camera)
	# 边界从**地面**推导, 不写死常量。
	# ⚠️ v0.1 横版恰好就是栽在写死上: 它把 limit_left=-50 / limit_right=3250 直接
	#    塞在 main.gd 里, 只对「那一个 3200px 宽的关卡」成立。地图一改尺寸就废。
	#    现在走 fit_to_floor(), 关卡尺寸改了边界自动跟着变 —— 见 CameraRig 文件头。
	camera.fit_to_floor(floor, _viewport_size())
	camera.make_current()


## 特效层。所有一次性特效 (命中火花/死亡爆散/飘分) 都挂这里, 而不是挂 current_scene ——
## 挂这里它们就自动「永远画在世界之上」, 也不会因为被塞进 y-sort 的 World 而被角色挡住。
func _create_fx_layer() -> void:
	fx = Node2D.new()
	fx.name = "Fx"
	fx.z_index = 40
	fx.add_to_group("fx_layer")
	add_child(fx)


func _create_hud() -> void:
	hud = Hud.new()
	hud.name = "Hud"
	add_child(hud)
	hud.bind_player(player)
	hud.set_score(score)


func _create_debug_overlay() -> void:
	debug_overlay = DebugOverlay.new()
	debug_overlay.name = "DebugOverlay"
	add_child(debug_overlay)
	debug_overlay.setup(floor, player)


## 视口尺寸从**项目设置**读, 不读 get_viewport_rect():
## _ready() 时视口可能还没完成布局, 读出来是 0×0 或旧尺寸, 相机边界会算错。
func _viewport_size() -> Vector2:
	return Vector2(
		float(ProjectSettings.get_setting("display/window/size/viewport_width", 1280)),
		float(ProjectSettings.get_setting("display/window/size/viewport_height", 720))
	)


# ============================================================
# 信号处理 —— 所有跨节点通知都汇到这里, 节点之间互相不认识
# ============================================================

func _on_enemy_died(score_value: int) -> void:
	score += score_value
	if hud != null:
		hud.set_score(score)


## 敌人的 parried —— 在**敌人那一头**炸火花。
##
## ⚠️ 这里**故意不震屏**。玩家的 parried 和敌人的 parried 是同一件事的两端,
##    同一次精准格挡里**两个信号都会发**, 中间只隔着几微秒。
##    而 CameraRig.shake() 是**赋值**不是累加 (`_shake_trauma = ...`),
##    所以同帧内第二次调用会直接盖掉第一次 —— 谁赢取决于信号发射顺序,
##    属于「改了无关代码就会漂移」的脆弱行为。
##    把震屏统一收在 _on_player_parried 一处, 顺序就无关紧要了。
func _on_enemy_parried(at: Vector2) -> void:
	HitSpark.spawn(get_tree(), at, Color(1.0, 0.9, 0.35), 34.0)


## 敌人被满蓄重击破霸体 —— 比精准格挡更重的一击, 震屏也给得更狠
func _on_enemy_armor_broken(at: Vector2) -> void:
	HitSpark.spawn(get_tree(), at, Color(1.0, 0.55, 0.2), 42.0)
	if camera != null:
		camera.shake(7.0, 0.3)


## 玩家**精准格挡成功** —— 本轮最需要「爽」的一个瞬间。
##
## 🎮 反馈设计的三层, 少一层这个机制就不成立:
##   ① 金色扩散环 (ParryFlash) —— 在**撞击的位置**炸开, 不跟着玩家走
##   ② 震屏 8.0 (全场最重, 比破霸体的 7.0 还高) —— 弹反的本质是「力的对撞」
##   ③ 飘字「精准格挡!」—— 玩家必须**知道刚才那下叫什么**,
##      否则他没法有意识地去复现它, 只会当成运气好
func _on_player_parried(at: Vector2) -> void:
	ParryFlash.spawn(get_tree(), at, true)
	if camera != null:
		camera.shake(8.0, 0.25)
	_pop_text("精准格挡!", at + Vector2(0.0, -18.0), Color(1.0, 0.92, 0.45))


## 玩家**普通格挡** —— 反馈必须和精准格挡**一眼可辨地不同**。
##
## ⚠️ 这一条不是「做得好不好看」, 是机制能不能学会的前提:
##    普通格挡之后该撤 (精力掉了), 精准格挡之后该冲上去反打 ——
##    两者后续操作**完全相反**。如果反馈长得像, 玩家就没有任何线索去区分
##    「我按对了」和「我按早了」, 精准格挡这个机制就退化成了随机数。
##    所以这里: 青色小环 + 轻微震屏 + **不给飘字** (飘字是精准格挡的专属奖励)。
func _on_player_blocked(at: Vector2) -> void:
	ParryFlash.spawn(get_tree(), at, false)
	if camera != null:
		camera.shake(2.5, 0.1)


## 玩家**破防** (精力见底被打崩) —— 本轮第二重的反馈, 比精准格挡还重。
##
## 🎮 它必须痛到让玩家下次不敢硬挡: DESIGN.md 的准则是不惩罚死亡, 但**要惩罚决策**。
##    硬扛到破防就是一个纯粹的坏决策, 而它唯一的「学费」就是这 0.9 秒的硬直。
##    如果这一下看起来不痛, 玩家学到的就是「硬挡其实没啥代价」——
##    整个精力系统会退化成一根没人看的装饰条。
func _on_player_guard_broken() -> void:
	if camera != null:
		camera.shake(9.0, 0.4)
	_pop_text("破防!", player.global_position + Vector2(0.0, -46.0), Color(0.95, 0.3, 0.35))


func _on_player_hit_landed(_at: Vector2) -> void:
	# 命中反馈的一半来自镜头: 没有震屏的打击就像打在棉花上
	if camera != null:
		camera.shake(3.0, 0.16)


func _on_respawn_activated(point: RespawnPoint) -> void:
	_current_spawn = point.spawn_position()
	_pop_text("复活点已点亮", point.spawn_position(), Color(0.45, 0.95, 0.78))


## 死亡 → 短暂停顿 → 在最近点亮的复活点复活。
## **没有「游戏结束」这一说**: DESIGN.md 明确写了低惩罚死亡 (只损失一点资源),
## 所以旧的 YOU DIED 面板 + RESTART 按钮 + 胜利面板约 150 行被整个删掉了。
func _on_player_died() -> void:
	if _respawning:
		return
	_respawning = true

	DeathBurst.spawn(get_tree(), player.global_position + Vector2(0.0, -20.0), Color(0.45, 0.75, 1.0))
	if camera != null:
		camera.shake(7.0, 0.35)

	# 停顿一下再复活: 立刻复活会让玩家完全意识不到自己死了
	await get_tree().create_timer(0.7).timeout
	if not is_instance_valid(player):
		return
	player.respawn(_current_spawn)
	_respawning = false


# ============================================================
# 飘字
# ============================================================
func _pop_text(text: String, at: Vector2, color: Color) -> void:
	if fx == null:
		return
	var label: Label = Label.new()
	label.text = text
	label.add_theme_font_size_override("font_size", 15)
	label.add_theme_color_override("font_color", color)
	label.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.9))
	label.add_theme_constant_override("outline_size", 4)
	# ⚠️ 非交互 UI 一定要 IGNORE: 否则这块区域的鼠标点击会被它吃掉, 左键轻击静默失效
	label.mouse_filter = Control.MOUSE_FILTER_IGNORE
	label.position = at - Vector2(24.0, 10.0)
	fx.add_child(label)

	var tw: Tween = create_tween()
	tw.tween_property(label, "position:y", label.position.y - 44.0, 0.7)
	tw.parallel().tween_property(label, "modulate:a", 0.0, 0.7)
	tw.finished.connect(label.queue_free)


# ============================================================
# 预加载场景
# ============================================================
const PLAYER_SCENE: PackedScene = preload("res://scenes/player.tscn")
const ENEMY_SCENE: PackedScene = preload("res://scenes/enemy.tscn")


# ── 集成自检钩子 ──
# 只在命令行显式要求时启动, 正常 F5 跑游戏不会碰到它。
#
# 🎮 为什么值得留一个测试入口在 main.gd 里:
#   视角相关的几类错误**截图完全看不出来** —— 碰撞体是零面积、边界墙拦不住人、
#   死亡后复活到了错的地方。这些都不报错, 只是「玩起来怪怪的」。
#   headless 断言是唯一能在改代码后 2 秒内发现它们的办法。
#
# 用法: godot --headless --path <项目> -- --smoke     (全部通过退出码 0, 有失败则 1)
func _maybe_run_test_hooks() -> void:
	var args: PackedStringArray = OS.get_cmdline_user_args()
	if "--smoke" in args:
		var smoke: Node = Node.new()
		smoke.name = "SmokeTest"
		smoke.set_script(load("res://scripts/smoke_test.gd"))
		add_child(smoke)
		smoke.run(self)
	# 临时验收探针: 把「必须肉眼确认」的姿态截成 PNG (见 _shot_probe.gd 文件头)
	if "--shots" in args:
		var probe: Node = Node.new()
		probe.name = "ShotProbe"
		probe.set_script(load("res://scripts/_shot_probe.gd"))
		add_child(probe)
		probe.setup(self)
