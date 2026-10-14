extends Node2D
## Blitz 主场景 — 等距仙侠 ARPG (v0.3 战斗手感)
##
## 📚 涉及学习文档:
##   godot-4-1-scene-tree          — 场景树: 谁是父谁是子决定了绘制顺序
##   godot-4-2-scene-instantiation — PackedScene.instantiate()
##   godot-2-8-tilemap             — 等距 Y-sort 深度排序 (本文件最重要的结构决策)
##   godot-2-9-camera2d            — Camera2D 边界限制
##   godot-1-8-signals-basics      — 信号接线: 玩家/敌人/复活点 → 本文件
##   godot-7-8-state-machines      — 呼吸: 本文件不再有状态机, 它只是「编排者」
##
## 🎮 v0.3 相对 v0.2 只多了三件事 (战线刻意压得很窄, 本体没动):
##   ① 玩家的 parried / blocked / guard_broken 三个新信号接线 —— 见 _create_player()
##   ② 三个信号处理器 —— 格挡反馈的「看/听/读」三层全靠它们, 见下方
##   ③ 敌人配置多了一个 can_attack 开关 + 固定靶血厚到 10 (当肉桩试重击)
##   关卡结构、相机、地面、障碍一个字节都没改 —— v0.2 的 31 项自检原样通过就是证据。
##
## 🎮 本文件从 794 行砍到 ~330 行。砍掉的是**不属于编排者的东西**:
##   旧的 main.gd 里塞了 6 个用 `GDScript.new() + source_code` 运行时编译的内联脚本
##   (星空/草线/格挡物/格挡特效/终点旗帜/Boss 血条)。它们存在的理由是
##   「只有这个关卡用, 不值得单开文件」—— 但那个理由的代价是:
##     · 编辑器完全没有补全和报错, 写错只能等运行时;
##     · 每次实例化都重新编译一遍源码;
##     · 想改一个特效的数值, 得先在 794 行里找到那段字符串。
##   现在它们各自成了 scripts/world/*.gd 和 scripts/fx/*.gd 里带 class_name 的文件,
##   整个代码库**不再有任何运行时编译**。
##
## 🏗️ 场景树结构 (绘制顺序 = 这个结构的直接结果, 改结构前先读这段):
##
##   Game (Node2D)                    ← 本脚本
##   ├── Backdrop    (z_index -20)    ← 星空。**不是** World 的子节点
##   ├── Floor       (z_index -10)    ← IsoFloor。**必须是 World 的兄弟**, 见下
##   ├── World       (y_sort_enabled) ← Y-sort 根
##   │   ├── Wall_*      (不可见, 只有碰撞 + Line2D 描边)
##   │   ├── Obstacle_*  (原点在底面菱形中心)
##   │   ├── RespawnPoint_*
##   │   ├── Enemy_*
##   │   └── Player      ← 原点在脚底
##   ├── Fx          (z_index 40, group "fx_layer")
##   ├── UI          (Hud, CanvasLayer 100)
##   └── DebugOverlay(CanvasLayer 200 + 世界空间菱形高亮)
##
## 🏗️ 为什么地面必须是 World 的**兄弟**而不是子节点:
##   父节点开了 y_sort_enabled 时, 一个自己没开 y-sort 的子节点会被当成
##   **一整个整体**按它自己的 position 参与排序。地面做子节点时「碰巧」看着是对的
##   (因为地面在原点附近), 直到有物体落在负 y 才会神秘失效 —— 是最难查的那类 bug。
##   用 z_index = -10 的兄弟节点则是**确定性正确**的: z_index 先于 y-sort 结算。

# ============================================================
# 关卡常量
# ============================================================
## 地格数 (宽, 高)。24×24 → 世界尺寸约 1536×752, 比 1280×720 的视口大,
## 这样相机才会真的「跟」起来 —— 地图比视口小的话相机只会锁死在中心,
## 那就完全验证不了边界限制有没有生效。
const FLOOR_CELLS: Vector2i = Vector2i(24, 24)
## 地格 (0,0) 的世界坐标
const FLOOR_ORIGIN: Vector2 = Vector2(200.0, 300.0)
## 出生地格。角色初始位置 + 初始复活点**共用**这一个常量 ——
## 分两处写的话, 改了出生点却忘了改复活点, 一死就会被送回旧位置。
const START_CELL: Vector2i = Vector2i(8, 11)
## 边界墙厚度
const WALL_THICKNESS: float = 22.0
## 边界墙内缩: 让碰撞面落在最外圈地砖**稍微靠里**一点, 免得角色半个身子压在砖外
const WALL_MARGIN: float = 10.0

# ============================================================
# 节点引用
# ============================================================
var floor: IsoFloor = null
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
	floor = IsoFloor.new()
	floor.name = "Floor"
	floor.position = FLOOR_ORIGIN
	floor.z_index = -10
	add_child(floor)
	floor.fill_rect(Rect2i(Vector2i.ZERO, FLOOR_CELLS))
	# 朝向自检: 打印引擎换算 ↔ 纯数学公式的对照表 + 变体分布。
	# 这不是「调试残留」—— 它是等距映射的回归门。改了 Iso 的公式或 TileSet 的
	# tile_layout, 这里会立刻从「✅ 完全一致」变成「❌ N 个格子不一致」。
	floor.debug_print_orientation()


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


## 四道边界墙 —— **贴着菱形的四条边**, 而不是绕着包围盒。
##
## 🏗️ 为什么不能围着包围盒:
##   地面是个菱形, 包围盒的四角是**空的** (没有地砖)。围着包围盒放墙,
##   玩家就能走到菱形斜边之外的虚空里站着 —— 看起来像「走出了地图」。
##   沿着四条斜边放墙 (每道墙旋转 ±26.57°, 正好等于 TILE_H/TILE_W 的坡度),
##   可行走区域就精确等于看得见的地砖范围。
##
## 🏗️ 墙的**长度要超出边长一个厚度**: 菱形四角是 90° 的转折, 两块有限厚的
##   矩形在拐角处会留下一个小楔形缺口; 每端多伸半个厚度正好补上。
func _create_border_walls() -> void:
	var b: Rect2 = floor.bounds_global()
	var c: Vector2 = b.position + b.size * 0.5
	var hw: float = b.size.x * 0.5
	var hh: float = b.size.y * 0.5
	# 菱形的四个顶点: 北 东 南 西
	var corners: Array[Vector2] = [
		c + Vector2(0.0, -hh),
		c + Vector2(hw, 0.0),
		c + Vector2(0.0, hh),
		c + Vector2(-hw, 0.0),
	]
	for i: int in range(4):
		var a: Vector2 = corners[i]
		var d: Vector2 = corners[(i + 1) % 4]
		var edge: Vector2 = d - a
		var mid: Vector2 = (a + d) * 0.5
		var dir: Vector2 = edge.normalized()
		# 外法线 (指向远离中心那一侧)
		var out_n: Vector2 = Vector2(dir.y, -dir.x)
		if out_n.dot(mid - c) < 0.0:
			out_n = -out_n
		_make_wall(mid + out_n * (WALL_MARGIN + WALL_THICKNESS * 0.5), dir, edge.length() + WALL_THICKNESS)


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
	var layout: Array[Dictionary] = [
		{ cell = Vector2i(4, 4),   cells = Vector2i(2, 1), height = 42.0 },
		{ cell = Vector2i(9, 3),   cells = Vector2i(1, 1), height = 30.0 },
		{ cell = Vector2i(13, 7),  cells = Vector2i(1, 2), height = 50.0 },
		{ cell = Vector2i(18, 11), cells = Vector2i(2, 2), height = 36.0 },
		{ cell = Vector2i(6, 14),  cells = Vector2i(1, 1), height = 30.0 },
		{ cell = Vector2i(15, 18), cells = Vector2i(1, 1), height = 30.0 },
		{ cell = Vector2i(20, 16), cells = Vector2i(1, 1), height = 38.0 },
		{ cell = Vector2i(3, 19),  cells = Vector2i(2, 1), height = 40.0 },
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

	var cells: Array[Vector2i] = [
		START_CELL,
		Vector2i(4, 3),
		Vector2i(16, 20),
		Vector2i(20, 6),
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
	_create_enemy(Vector2i(5, 10), BlitzEnemy.Type.PATROL, Vector2.DOWN, 70.0)
	_create_enemy(Vector2i(10, 6), BlitzEnemy.Type.PATROL, Vector2.RIGHT, 85.0)
	_create_enemy(Vector2i(12, 12), BlitzEnemy.Type.STATIONARY, Vector2.DOWN, 0.0, 10, false)
	_create_enemy(Vector2i(16, 15), BlitzEnemy.Type.CHASER, Vector2.DOWN, 95.0)
	_create_enemy(Vector2i(19, 8), BlitzEnemy.Type.CHASER, Vector2.DOWN, 80.0)


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
	# 边界从**地面**推导, 不写死常量 (旧版 limit_left=-50 / limit_right=3250 是
	# 给 3200px 宽的横版关卡用的, 套在等距地图上相机会大段飘到空地外面)
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
#   等距视角的几类错误**截图完全看不出来** —— 碰撞体是零面积、旋转过的边界墙拦不住人、
#   死亡后复活到了错的地方。这些都不报错, 只是「玩起来怪怪的」。
#   headless 断言是唯一能在改代码后 2 秒内发现它们的办法。
#
# 用法: godot --headless --path <项目> -- --smoke     (31 项检查, 有失败则退出码 1)
func _maybe_run_test_hooks() -> void:
	var args: PackedStringArray = OS.get_cmdline_user_args()
	# 🚧 临时 (v0.3 验收后删): 给起手预警拍图。⚠️ 不能加 --headless
	if "--v03probe" in args:
		var probe: Node = Node.new()
		probe.name = "V03Probe"
		probe.set_script(load("res://scripts/_v03_probe.gd"))
		add_child(probe)
		probe.run(self)
		return
	if "--smoke" in args:
		var smoke: Node = Node.new()
		smoke.name = "SmokeTest"
		smoke.set_script(load("res://scripts/smoke_test.gd"))
		add_child(smoke)
		smoke.run(self)
