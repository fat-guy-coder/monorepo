extends Node
## Blitz 集成自检 — headless 断言, 改完代码跑一遍
##
## 📚 涉及学习文档:
##   godot-4-1-scene-tree          — 从场景根拿各系统引用做断言
##   godot-6-2-area2d-deep         — 用 await physics_frame 等 Area2D 检测落地
##   godot-1-8-signals-basics      — 帧同步 / 计时器等待
##   godot-1-12-static-typing      — 强类型让断言里点错属性直接编译报错
##
## 🎮 为什么必须有它 (截图看不出的那几类错):
##   ① 障碍物碰撞体是**零面积** —— Godot 不报错, 只是走过去毫无阻挡
##   ② 旋转过的边界墙**拦不住人** —— 不报错, 玩家就是能走出地图
##   ③ 死亡 → 复活循环断在哪一环 —— 只在特定时序下暴露
##   ④ 攻击判定框打不到敌人 —— 看起来像「手感问题」, 其实是碰撞层配错
##   这几类都「不报错, 只是玩起来怪」, 靠肉眼盯屏幕能查一整天。
##   断言 2 秒跑完, 而且能进 CI。
##
## 用法: godot --headless --path <项目> -- --smoke
##   全部通过 → 退出码 0; 有失败 → 退出码 1 (可以直接当 CI 门禁)

var _fails: int = 0
var _checks: int = 0
var _game: Node = null


func run(game: Node) -> void:
	_game = game
	await _run()
	get_tree().quit(1 if _fails > 0 else 0)


func _ok(label: String, cond: bool, detail: String = "") -> void:
	_checks += 1
	if cond:
		print("  ✅ ", label, ("  " + detail) if detail != "" else "")
	else:
		_fails += 1
		print("  ❌ ", label, "  ", detail)


func _run() -> void:
	# 等两帧让 _ready 与首次物理检测落地
	await get_tree().physics_frame
	await get_tree().physics_frame

	print("=== Blitz v0.4 (2.5D 横版) 集成自检 ===")

	var player: BlitzPlayer = _game.player
	var floor_layer: BeltFloor = _game.floor
	var world: Node2D = _game.world
	var camera: CameraRig = _game.camera
	var hud: Hud = _game.hud
	var overlay: DebugOverlay = _game.debug_overlay

	print("-- 场景装配 --")
	_ok("player 存在", player != null)
	_ok("floor 存在", floor_layer != null)
	_ok("world 是 y_sort 根", world != null and world.y_sort_enabled)
	_ok("camera 是玩家的子节点", camera != null and camera.get_parent() == player)
	_ok("hud 存在", hud != null)
	_ok("debug_overlay 存在", overlay != null)
	_ok("玩家在 World 下 (参与 y-sort)", player != null and player.get_parent() == world)
	_ok("玩家在 player 组里 (敌人靠它找玩家)", player.is_in_group("player"))

	print("-- 相机边界 --")
	var b: Rect2 = floor_layer.bounds_global()
	_ok("limit_right 覆盖地面右边界", float(camera.limit_right) >= b.position.x + b.size.x - 1.0,
		"limit_right=%d  地面右=%.0f" % [camera.limit_right, b.position.x + b.size.x])
	_ok("limit_bottom 覆盖地面下边界", float(camera.limit_bottom) >= b.position.y + b.size.y - 1.0,
		"limit_bottom=%d  地面下=%.0f" % [camera.limit_bottom, b.position.y + b.size.y])

	print("-- 障碍物碰撞体 (零面积不报错, 只能断言) --")
	var obstacle_count: int = 0
	var zero_area: int = 0
	for child: Node in world.get_children():
		if not (child is Obstacle):
			continue
		obstacle_count += 1
		var ob: Obstacle = child
		var shape_size: Vector2 = Vector2.ZERO
		for c: Node in ob.get_children():
			if c is CollisionShape2D and (c as CollisionShape2D).shape is RectangleShape2D:
				shape_size = ((c as CollisionShape2D).shape as RectangleShape2D).size
		if shape_size.x <= 1.0 or shape_size.y <= 1.0:
			zero_area += 1
			print("     零面积: ", ob.name, " size=", shape_size)
	_ok("障碍物数量 > 0", obstacle_count > 0, "count=%d" % obstacle_count)
	_ok("没有零面积碰撞体", zero_area == 0, "零面积=%d" % zero_area)

	print("-- 攻击判定框能打到敌人 --")
	var enemies: Array = get_tree().get_nodes_in_group("enemies")
	_ok("敌人已生成", enemies.size() > 0, "count=%d" % enemies.size())
	if enemies.size() > 0:
		var enemy: BlitzEnemy = enemies[0]
		# 横版: 判定框沿 X 偏移 (朝向只有左右)。把敌人摆到**同一纵深、正前方**。
		player.facing = 1
		enemy.global_position = player.global_position + Vector2(34.0, 0.0)
		enemy.velocity = Vector2.ZERO
		var hp_before: int = enemy.health
		player._state_enter_attack()
		await get_tree().physics_frame
		await get_tree().physics_frame
		_ok("敌人掉血", enemy.health < hp_before,
			"health %d -> %d" % [hp_before, enemy.health])

	print("-- 死亡 → 复活 循环 --")
	var spawn_before: Vector2 = _game._current_spawn
	player.invincible_timer = 0.0
	for i: int in range(player.max_health):
		player.invincible_timer = 0.0
		player.take_damage(1, player.global_position + Vector2(0.0, 40.0))
	_ok("血量归零后进入 DEAD", player.state == BlitzPlayer.State.DEAD, "state=%d" % player.state)
	# 死亡回调里有 0.7 秒的停顿 (真实时间), 等它跑完
	await get_tree().create_timer(1.2).timeout
	_ok("已复活", player.state == BlitzPlayer.State.NORMAL, "state=%d" % player.state)
	_ok("血量已回满", player.health == player.max_health,
		"%d / %d" % [player.health, player.max_health])
	_ok("复活在记录点", player.global_position.distance_to(spawn_before) < 1.0,
		"pos=%s 期望=%s" % [player.global_position, spawn_before])
	_ok("复活后可见", player.visible)

	print("-- 边界墙能拦住玩家 --")
	# 🏗️ 四道墙现在是**轴对齐**的 (贴着地面矩形的四条边), 不再是沿菱形斜边的旋转体。
	#    但四角仍是最脆弱的地方: 墙比边多伸一个厚度才压得住拐角, 少了的话玩家能从
	#    角上那条缝里挤出去 —— 而症状只是「偶尔能走出地图」, 不报任何错。
	#
	# ⚠️ 旧的测法有个**假绿**: 它一边 `player.velocity = ...` 一边 await physics_frame,
	#    可是 _physics_process 每帧都会跑 _apply_move(), 而没有按键时 move_decel 会把
	#    速度在 ~14 帧内衰减到 0。玩家实际只挪了不到 50px, **根本没走到墙边**,
	#    所以那个断言是「没碰到墙 → 当然还在墙内」。这里改成关掉物理帧、手动 move_and_slide,
	#    并且额外断言「确实跑远了」, 免得再退化成一次空测。
	var center: Vector2 = b.position + b.size * 0.5
	player.set_physics_process(false)
	var dirs: Array[Vector2] = [Vector2.UP, Vector2.DOWN, Vector2.LEFT, Vector2.RIGHT]
	var dir_names: Array[String] = ["北(纵深最远)", "南(纵深最近)", "西", "东"]
	for k: int in range(dirs.size()):
		var d: Vector2 = dirs[k]
		player.global_position = center
		for i: int in range(240):        # 240 帧 × 420px/s = 1680px, 远超半张图的 1280px
			player.velocity = d * 420.0
			player.move_and_slide()
		var moved: float = player.global_position.distance_to(center)
		_ok("向%s猛冲后仍在墙内" % dir_names[k],
			b.grow(2.0).has_point(player.global_position),
			"pos=%s  地面=%s" % [player.global_position, b])
		# ⚠️ 没有这一条, 上面那条在上面的「假绿」模式下会照样全绿
		_ok("向%s确实是冲到了墙边 (不是没走动)" % dir_names[k], moved > 100.0,
			"位移 %.0fpx" % moved)
	player.set_physics_process(true)
	player.global_position = center
	player.velocity = Vector2.ZERO

	print("-- 输入映射 --")
	for action: String in ["move_up", "move_down", "attack_light", "attack_heavy", "dash", "block", "jump", "debug_toggle"]:
		_ok("已注册 %s" % action, InputMap.has_action(action))
	for action: String in ["shoot"]:
		_ok("已删除旧键 %s" % action, not InputMap.has_action(action))

	print("-- BeltFloor 坐标桥 --")
	var c1: Vector2i = Vector2i(7, 3)
	_ok("center_of 可往返", floor_layer.cell_of(floor_layer.center_of(c1)) == c1)
	var span: Vector2 = floor_layer.center_of_span(Vector2i(13, 4), Vector2i(1, 2))
	var single: Vector2 = floor_layer.center_of(Vector2i(13, 4))
	_ok("center_of_span 与单格中心不同 (多格区域确实偏了半格)", span.distance_to(single) > 1.0,
		"span=%s single=%s" % [span, single])

	# 🏗️ 轴向 —— 这是横版的**全部地基**, 也是唯一一条「错了也不报错、只是整个游戏上下颠倒」
	#    的约定。+i 往右, +j 往**下** (往下 = 纵深变浅 = 靠近镜头)。
	# ⚠️ 步长**从地格常量推导**, 不写死数字。写死的话「压扁 2:1」这次改动
	#    会把断言从 ✅ 变成 ❌ —— 而它本来是**对的**, 改断言的人只好凭手感猜一个数,
	#    猜错了就是一条常年没人敢动的假断言。
	var o: Vector2 = floor_layer.center_of(Vector2i(4, 4))
	var di: Vector2 = floor_layer.center_of(Vector2i(5, 4)) - o
	var dj: Vector2 = floor_layer.center_of(Vector2i(4, 5)) - o
	_ok("+i 往右 (+x)", di.x > BeltFloor.CELL_W_F * 0.9 and absf(di.y) < 0.5, "Δ=%s" % di)
	_ok("+j 往下 = 靠近镜头 (+y)", dj.y > BeltFloor.CELL_D_F * 0.9 and absf(dj.x) < 0.5, "Δ=%s" % dj)

	# 🏗️ 压扁比自洽 —— 这一条锁的是「世界一格是正方形, 屏幕纵深是它的一半」。
	#    它证明的静默失败很具体: 有人单独改了 CELL_D 或 DEPTH_SCALE 中的一个,
	#    于是地砖的长宽比和圆形 AoE 的长宽比**各说各话** ——
	#    玩起来「说不上哪里不对」, 而且截图对比也看不出来 (两处都自洽, 只是不互相自洽)。
	_ok("屏幕纵深 = 世界格宽 × DEPTH_SCALE (地砖和圆的压扁比一致)",
		absf(BeltFloor.CELL_D_F - float(BeltFloor.CELL_WORLD) * BeltSpace.DEPTH_SCALE) < 0.001,
		"CELL_D_F=%s 期望=%s" % [BeltFloor.CELL_D_F, float(BeltFloor.CELL_WORLD) * BeltSpace.DEPTH_SCALE])

	# v0.4 跳跃 —— 这一段挑的全是「不报错、只是玩起来怪」的失败模式。
	# ⚠️ 放在这一段的理由: 它紧跟在「走位 / 坐标桥」之后, 此时玩家状态干净
	#    (没有格挡、没有蓄力), 而战斗那段会大幅改动状态。
	await _check_jump(player)


# ============================================================
# v0.4 跳跃 / 高度轴
# ============================================================
#
# 🎮 加跳跃给这个项目带来的**唯一**架构风险是: 高度被接到了错误的轴上。
#    横版的地面平面是 XZ, 而引擎用「负的 Y」存纵深。于是「跳跃」天然有两种写法:
#      · 对的: 抬一个独立的 height 标量, 只用在 _draw() 里
#      · 错的: 直接改 global_position.y
#    后者**能跑、能跳、看起来也对** —— 但它同时改掉了纵深, 于是角色会往屏幕
#    里面钻, 越跳越靠后。而且 Y-sort 会按抬起来之后的 y 排序, 角色一跳就跑到
#    障碍物背后。这两种症状都像是「相机/排序坏了」, 排查方向会完全跑偏。
#    所以下面第 ① 条是这个函数里**最重要**的一条。
func _check_jump(player: BlitzPlayer) -> void:
	print("-- 跳跃 / 高度轴 --")

	player.state = BlitzPlayer.State.NORMAL
	player.invincible_timer = 0.0
	player.velocity = Vector2.ZERO
	player.height = 0.0
	player._grounded = true

	# ① 起跳: 按真键, 走完整输入路径
	var pos_before: Vector2 = player.global_position
	Input.action_press("jump")
	await get_tree().physics_frame
	await get_tree().physics_frame
	_ok("按跳能离地 (height > 0)", player.height > 0.0, "height=%.1f" % player.height)
	_ok("起跳后不再算地面", not player.is_grounded())

	# ② 🔑 重力**不改** global_position.y —— 这是整个坐标模型的守门断言。
	#    写成「重力接在 position.y 上」的话, 这一条会立刻红, 而不是等到玩起来怪。
	var y_at_jump: float = player.global_position.y
	var x_at_jump: float = player.global_position.x
	for i: int in range(6):
		await get_tree().physics_frame
	_ok("滞空期间 global_position.y **完全没变** (重力没接错轴)",
		is_equal_approx(player.global_position.y, y_at_jump),
		"y=%.3f 期望=%.3f" % [player.global_position.y, y_at_jump])
	_ok("滞空期间 global_position.x 也没变 (没有输入)",
		is_equal_approx(player.global_position.x, x_at_jump),
		"x=%.3f" % player.global_position.x)
	_ok("滞空时 height 确实在变 (说明物理段真的在跑)", player.height > 0.0,
		"height=%.1f  y=%.1f" % [player.height, player.global_position.y])

	# ③ 峰值高度应当接近 jump_speed²/(2·gravity) —— 松键在下一帧就发生,
	#    所以这里量的是「可变跳跃高度」被截断之后的值, 只要是个合理的正数即可。
	Input.action_release("jump")

	# ④ 落回地面: height 必须**精确**归零。
	#    浮点残留 (比如 0.0001) 会让角色每跳一次就低一点点, 或者 _grounded 永远不
	#    翻回 true —— 表现是「跳一次之后再也跳不起来」, 而且要跳好几次才复现。
	var landed: bool = false
	for i: int in range(120):
		await get_tree().physics_frame
		if player.is_grounded():
			landed = true
			break
	_ok("能自己落回地面", landed, "height=%.4f" % player.height)
	_ok("落地后 height 精确归零 (没有浮点残留)", is_zero_approx(player.height),
		"height=%.10f" % player.height)
	_ok("落地后 global_position.y 和起跳前一致 (跳一次不改变纵深)",
		is_equal_approx(player.global_position.y, pos_before.y),
		"y=%.4f 期望=%.4f" % [player.global_position.y, pos_before.y])

	# ⑤ 落地之后还能再跳 (第 ④ 条那个「再也跳不起来」的直接对照)
	Input.action_press("jump")
	await get_tree().physics_frame
	await get_tree().physics_frame
	_ok("落地后能再次起跳 (高度状态机没卡住)", player.height > 0.0, "height=%.1f" % player.height)
	Input.action_release("jump")
	for i: int in range(120):
		await get_tree().physics_frame
		if player.is_grounded():
			break

	# ⑥ 硬直里不接受起跳输入 —— 否则被打飞的过程中按一下跳, 硬直结束会自动弹起来。
	#    症状是「受击后莫名其妙跳一下」, 因为缓冲只有 0.08s, 极难复现。
	player.state = BlitzPlayer.State.HIT
	player._hit_stun_timer = 0.28
	Input.action_press("jump")
	await get_tree().physics_frame
	_ok("受击硬直中按跳不会起跳", player.height == 0.0 and player.is_grounded(),
		"height=%.2f grounded=%s" % [player.height, player.is_grounded()])
	Input.action_release("jump")

	# ⑦ 朝向只有 ±1 —— 纵深移动**不转身**。
	#    写成 sign(input.x) 的话只按上下会把朝向清零, 侧视美术会崩掉。
	player.state = BlitzPlayer.State.NORMAL
	player.facing = 1
	player._face(0.0)
	_ok("纵深输入 (x 分量为 0) 不改朝向", player.facing == 1, "facing=%d" % player.facing)
	player._face(-1.0)
	_ok("往左走转向左", player.facing == -1, "facing=%d" % player.facing)
	_ok("facing_vec 是单位水平向量",
		player.facing_vec().is_equal_approx(Vector2.LEFT), "facing_vec=%s" % player.facing_vec())

	player.state = BlitzPlayer.State.NORMAL
	player.velocity = Vector2.ZERO
	player.height = 0.0
	player._grounded = true

	# v0.4 压扁坐标模型
	await _check_belt_space(player)

	# v0.3 战斗手感 (单独放在最后: 它会大幅改动玩家状态, 不能影响上面的走位断言)
	await _run_combat(_game)

	print("=== 自检结束: %d 项检查, %d 项失败 ===" % [_checks, _fails])


# ============================================================
# v0.4 压扁坐标模型 (2:1) 自检
# ============================================================
#
# 🎮 这一段专挑「不报错、只是玩起来怪」的失败模式 —— 而且这批失败模式有个共同特征:
#    **画面完全正常**。压扁只改了「世界距离 ↔ 屏幕距离」的换算, 于是任何一处漏算
#    都不会崩、不会闪、不会报错, 只会让某一种方向的移动/攻击明显不对。
#    靠 F5 盯屏幕基本查不出来 (你没法 одновременно看横向和纵深的手感)。
#
# ⚠️ 最要命的一条是「速度方向一致性」(下面 ④): 漏掉压扁的话, 纵深速度会**变成两倍**。
#    这一条是唯一能自动抓住它的断言。
func _check_belt_space(player: BlitzPlayer) -> void:
	print("-- 压扁坐标模型 (2:1) --")

	# ① 点换算可逆 —— 所有其它结论都建在这一条上
	var p: Vector2 = Vector2(137.0, 421.0)
	_ok("to_screen / to_world 可逆", BeltSpace.to_screen(BeltSpace.to_world(p)).is_equal_approx(p),
		"往返=%s" % BeltSpace.to_screen(BeltSpace.to_world(p)))

	# ② 纵深被压扁**恰好**一半, 而 X 一点没动 —— 两条分开测。
	#    合在一起写 (「结果 ≈ (x, -z/2)」) 的话, 分量互相抵消的错误也能过。
	var dir_screen: Vector2 = BeltSpace.dir_to_screen(Vector2(64.0, 64.0))
	_ok("X 轴不压扁 (世界 64 → 屏幕 64)", is_equal_approx(dir_screen.x, 64.0), "x=%.2f" % dir_screen.x)
	_ok("纵深轴压扁一半 (世界 64 → 屏幕 -32)", is_equal_approx(dir_screen.y, -32.0),
		"y=%.2f 期望=-32" % dir_screen.y)

	# ③ 输入路径和方向路径必须**同源** —— 两条路各写一份的话迟早漂开
	var iv: Vector2 = Vector2(0.6, -0.8)
	var via_dir: Vector2 = BeltSpace.dir_to_screen(Vector2(iv.x, -iv.y))
	_ok("input_to_screen == dir_to_screen(世界化(输入))", BeltSpace.input_to_screen(iv).is_equal_approx(via_dir),
		"%s vs %s" % [BeltSpace.input_to_screen(iv), via_dir])

	# ④ 🔑 八个方向的世界速度都等于 move_speed —— 本段最重要的一条。
	#    漏掉压扁的写法 (_apply_move 直接用 Input.get_vector 的原始 y) 会让
	#    「按上」的世界速度变成 640 = 两倍, 而屏幕上看起来**完全正常**,
	#    只是「上下走特别快、斜着走是歪的」。没有任何别的断言能抓到它。
	player.global_position = _game.floor.center_of(Vector2i(20, 9))
	player.state = BlitzPlayer.State.NORMAL
	for probe: Vector2 in [Vector2.RIGHT, Vector2.UP, Vector2.DOWN, Vector2.LEFT,
			Vector2(1.0, -1.0).normalized(), Vector2(-1.0, 1.0).normalized()]:
		player.velocity = Vector2.ZERO
		player.height = 0.0
		player._grounded = true
		var screen_dir: Vector2 = BeltSpace.input_to_screen(probe)
		# 直接喂 _apply_move: 它就是真实路径上唯一做速度决策的地方
		# (绕开 Input.get_vector 是因为 headless 里按键状态不好精确控制)
		for i: int in range(24):
			player._apply_move(screen_dir, player.move_accel, player.move_decel, 1.0 / 60.0)
		var world_speed: float = BeltSpace.screen_speed_to_world(player.velocity)
		_ok("世界速度 = move_speed (方向 %s)" % probe, absf(world_speed - player.move_speed) < 1.0,
			"世界速度=%.1f 屏幕速度=%.1f 期望=%.1f" % [world_speed, player.velocity.length(), player.move_speed])

	# ⑤ 压扁的归一化: 屏幕上的单位向量换回世界**不等于** 1。这条是 ⑥ 的对照 ——
	#    少了它, ⑥ 可能只是因为「归一化没生效」而碰巧过。
	var unit_screen: Vector2 = Vector2(0.6, -0.8)
	_ok("屏幕单位向量的世界长度 ≠ 1 (所以不能直接 normalized)",
		absf(BeltSpace.to_world(unit_screen).length() - 1.0) > 0.05,
		"世界长度=%.4f" % BeltSpace.to_world(unit_screen).length())
	_ok("normalize_world 之后世界长度 = 1",
		absf(BeltSpace.to_world(BeltSpace.normalize_world(unit_screen)).length() - 1.0) < 0.001,
		"世界长度=%.6f" % BeltSpace.to_world(BeltSpace.normalize_world(unit_screen)).length())

	# ⑥ 世界速度上限要在**世界**空间截断 —— 用 limit_length 的话纵深方向会被多砍一半
	var fast_depth: Vector2 = Vector2(0.0, -600.0)      # 屏幕上纵深 600 ≈ 世界 1200
	var capped: Vector2 = BeltSpace.limit_world_speed(fast_depth, 320.0)
	_ok("纵深超速被截到世界 320 (而不是屏幕 320)", absf(BeltSpace.screen_speed_to_world(capped) - 320.0) < 0.5,
		"世界速度=%.1f 屏幕速度=%.1f" % [BeltSpace.screen_speed_to_world(capped), capped.length()])
	_ok("对照: 直接 limit_length 会截错 (屏幕 320 = 世界 640)",
		absf(BeltSpace.screen_speed_to_world(fast_depth.limit_length(320.0)) - 640.0) < 1.0,
		"世界速度=%.1f" % BeltSpace.screen_speed_to_world(fast_depth.limit_length(320.0)))

	# ⑦ 地面圆 → 屏幕 2:1 椭圆。宽高比错了, 所有 AoE 和法阵都会「看着是个正圆但不贴地」。
	var ring: PackedVector2Array = BeltSpace.ground_circle(40.0, 32)
	var minx: float = 1e9
	var maxx: float = -1e9
	var miny: float = 1e9
	var maxy: float = -1e9
	for q: Vector2 in ring:
		minx = minf(minx, q.x)
		maxx = maxf(maxx, q.x)
		miny = minf(miny, q.y)
		maxy = maxf(maxy, q.y)
	var w: float = maxx - minx
	var h: float = maxy - miny
	_ok("地面圆: 宽 = 2 × 世界半径", absf(w - 80.0) < 0.5, "宽=%.2f" % w)
	_ok("地面圆: 高 = 宽的一半 (2:1 椭圆)", absf(h - w * 0.5) < 0.5, "宽=%.2f 高=%.2f" % [w, h])

	# ⑧ 画在**竖直平面**上的东西不能压扁 —— 角色得是圆的, 不是扁的。
	#    这一条防的是「顺手把 ground_scale 用到角色上」那种过度推广。
	_ok("ground_scale 只在 Y 上压 (X 不动)",
		is_equal_approx(BeltSpace.ground_scale().x, 1.0) and is_equal_approx(BeltSpace.ground_scale().y, 0.5),
		"scale=%s" % BeltSpace.ground_scale())

	player.velocity = Vector2.ZERO
	player.state = BlitzPlayer.State.NORMAL


# ============================================================
# v0.3 战斗手感自检
# ============================================================
#
# 🎮 这一段专挑**「不报错、只是玩起来怪」**的失败模式 —— 也就是截图和肉眼都看不出来的那些。
#    战斗手感的 bug 有一个共同特征: 界面上完全正常, 只是「有时候挡不住」「有时候打不断」。
#    靠 F5 盯屏幕能查一整天, 而这里 2 秒就能定位到具体是哪个 bit / 哪个分支。
#
# ⚠️ 两个贯穿全段的纪律, 破坏了就会得到假绿:
#   ① **格挡相关的断言必须和 _enter_blocking() 在同一个物理帧内完成, 中间不能 await。**
#      headless 里没有按键, _process_blocking 第一帧就会因为 block 没按住而退回 NORMAL,
#      一 await 就变成「在非格挡状态下测试格挡」—— 断言会全绿, 但什么都没测到。
#   ② **先关掉所有敌人的 can_attack。** 这一段要精确控制「攻击从哪个方向来」,
#      让 AI 同时开火会把随机的敌人攻击混进来, 于是测试变成间歇性失败。

func _run_combat(game: Node) -> void:
	var player: BlitzPlayer = game.player
	var enemies: Array = get_tree().get_nodes_in_group("enemies")

	# 见纪律 ②
	for n: Node in enemies:
		if n is BlitzEnemy:
			(n as BlitzEnemy).can_attack = false

	# 把朝向钉死在**左** (-1)。横版朝向只有 ±1, 判定只跟 X 有关 ——
	# 所以下面所有「正面 / 背后」的攻击源坐标都必须落在 X 轴上, 而不是上下。
	# ⚠️ 直接写 facing, 不走任何「测试专用覆写出口」—— v0.3 的 block_aim_override
	#    已经删掉 (理由见 player.gd 文件头)。这样自检摆出来的就是游戏里真实存在的
	#    那个状态, 没有旁路可以绕过朝向规则。
	#    (无头环境下这里不按任何移动键, 所以 _process_blocking 里的 _face(0) 是空操作,
	#     朝向不会被下一帧改回去 —— 这也是它能直接写的前提。)
	player.facing = -1
	player.velocity = Vector2.ZERO

	await _check_guard(player, enemies)
	await _check_stamina(player)
	await _check_heavy(player, enemies)
	await _check_armor(player, enemies)
	await _check_charge_cancel(player)
	# 形状放在判定框尺寸**前面**: 先证明几何本身对, 再证明它被挂到了判定框上
	await _check_attack_shape(player)
	await _check_hitbox_shapes(player)
	await _check_skill(player, enemies)
	await _check_enemy_attack_lands(player, enemies)
	_check_ground_bodies(player, enemies)
	await _check_enemy_cycle(player, enemies)
	await _check_contact_damage_removed(player)


# ------------------------------------------------------------
# 格挡 / 精准格挡
# ------------------------------------------------------------
func _check_guard(player: BlitzPlayer, enemies: Array) -> void:
	print("-- 格挡 / 精准格挡 --")

	var attacker: BlitzEnemy = _first_live_enemy(enemies)
	if attacker == null:
		_ok("找到可用于测试的敌人", false, "全死了")
		return
	attacker.can_attack = false

	# ⚠️ 必须**显式**清掉复活无敌, 不能指望「跑到这里时它自己已经过期了」。
	#    上一段死亡测试的复活会挂一段 invincible_duration 的无敌, 而 take_damage
	#    在无敌期间会直接早退。于是这一段的「零伤害」「不耗精力」会**假绿**,
	#    而真正测到格挡逻辑的「攻击者被打硬直」「窗口立即关闭」反而变红 ——
	#    四条断言里两条假绿两条真红, 看起来像格挡坏了, 其实是无敌挡住了伤害。
	#    (这是实测踩到的: 边界墙那段改成手动 move_and_slide 之后不再消耗游戏时间,
	#     无敌就没被烧掉, 这四条立刻从全绿变成两红。)
	player.invincible_timer = 0.0

	# ① 走**完整输入路径**进格挡 (按真键), 而不是直接调 _enter_blocking()
	Input.action_press("block")
	await get_tree().physics_frame
	await get_tree().physics_frame
	_ok("按住格挡键进入 BLOCKING", player.is_guard_up(),
		"state=%s" % BlitzPlayer.State.keys()[player.state])
	_ok("刚按下时精准窗口是开的", player.is_parry_window_open())

	# ①.5 举盾**不会**偷偷改朝向 —— 朝向是玩家的输入结果, 不是格挡的副作用。
	#       v0.3 靠 block_aim_override 强制朝向, 那条出口删掉之后这里才成为真·不变量
	#       (见 player.gd 文件头)。将来若有人加「格挡时自动面向敌人」, 这里会立刻红 ——
	#       那一套正是本轮删掉的东西, 不该以另一种形式长回来。
	# ⚠️ 不要在这里清 _parry_window_timer: 下面 ② 正要靠「窗口是开的」来测精准格挡。
	#    重新进一次格挡不会重开窗口 (parry_cooldown 还没过), 所以这一次调用是无副作用的。
	var facing_before: int = player.facing
	player._enter_blocking()
	_ok("举盾不改朝向 (没有隐藏的自动转向)", player.facing == facing_before,
		"facing %d -> %d" % [facing_before, player.facing])

	# ② 精准格挡: 窗口内被**正面**攻击 → 零伤 + 零耗 + 攻击者硬直
	# ⚠️ 朝向 = 左 (-1), 所以「正面」在 **-X 方向**。写成上下方向的话判定会
	#    一律算作「正对」而全部通过 —— 那是横版的一条真行为, 但在这里会掩盖掉
	#    「正面/背后分得开吗」这个真正要测的东西。
	var frontal: Vector2 = player.global_position + Vector2(-40.0, 0.0)   # 面朝的那一边
	var hp0: int = player.health
	var st0: float = player.stamina.current
	attacker._stagger_timer = 0.0
	player.take_damage(1, frontal, attacker)
	_ok("精准格挡: 零伤害", player.health == hp0, "hp %d -> %d" % [hp0, player.health])
	_ok("精准格挡: 不耗精力", is_equal_approx(player.stamina.current, st0),
		"精力 %.1f -> %.1f" % [st0, player.stamina.current])
	_ok("精准格挡: 攻击者被打硬直 (反击窗口)", attacker._stagger_timer > 0.0,
		"stagger=%.2fs" % attacker._stagger_timer)
	_ok("精准格挡后窗口立即关闭 (一次窗口只能挡一下)",
		not player.is_parry_window_open(), "剩 %.3fs" % player._parry_window_timer)

	# ③ 窗口过期 → 退化成普通格挡: 免伤, 但**要付精力**
	#    手动把窗口清零, 而不是等帧 —— 等帧的话玩家会因为没按键而掉出 BLOCKING,
	#    那样测的就变成「状态退出」而不是「窗口过期」了。
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.stamina.refill()
	attacker._stagger_timer = 0.0
	player._enter_blocking()
	player._parry_window_timer = 0.0
	_ok("窗口已过期 (构造)", not player.is_parry_window_open())
	hp0 = player.health
	st0 = player.stamina.current
	player.take_damage(1, frontal, attacker)
	_ok("普通格挡: 零伤害", player.health == hp0, "hp %d -> %d" % [hp0, player.health])
	_ok("普通格挡: 扣精力 (格挡不是免费的)", player.stamina.current < st0,
		"精力 %.1f -> %.1f" % [st0, player.stamina.current])
	_ok("普通格挡: 攻击者**没有**被硬直 (和精准格挡的区别)",
		attacker._stagger_timer <= 0.0, "stagger=%.2f" % attacker._stagger_timer)

	# ④ 格挡的核心: **背后照常掉血**
	#    这是整段里最容易写错的一条 —— 写成全方位的话这里会变绿, 而游戏里
	#    「转身面对敌人」这个动作会彻底失去意义。
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.stamina.refill()
	player._enter_blocking()
	player._parry_window_timer = 0.0
	hp0 = player.health
	player.take_damage(1, player.global_position + Vector2(40.0, 0.0), attacker)   # 背对的那一边
	_ok("背后挨打照常掉血 (前后半平面生效, 没写成全方位)", player.health < hp0,
		"hp %d -> %d" % [hp0, player.health])

	# ⑤ 🏗️ 横版**特有**的一条: 纵深完全不参与格挡判定。
	#    这正是用户要的效果 —— 「站得比我靠前/靠后一点, 攻击一样得挡得住」。
	#    在等距时代这里测的是「斜前 45° 算不算正面」(要连续算角度);
	#    换成横版之后, 45° 这个概念消失了, 换来的是「上下无所谓」这一条。
	#    ⚠️ 它同样能抓出「判定框退化成点对点」之类的错 —— 那种实现下
	#       纵深差一点点就挡不住了, 而玩家只会觉得「格挡时灵时不灵」。
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.stamina.refill()
	player._enter_blocking()
	player._parry_window_timer = 0.0
	player.take_damage(1, player.global_position + Vector2(0.0, -60.0), null)   # 正北 = 靠画面里侧
	_ok("纵深方向的攻击也算正面 (站得比我靠里一点, 照样挡得住)",
		player.health == player.max_health, "hp %d / %d" % [player.health, player.max_health])

	player.invincible_timer = 0.0
	player.stamina.refill()
	player._enter_blocking()
	player._parry_window_timer = 0.0
	player.take_damage(1, player.global_position + Vector2(0.0, 60.0), null)    # 正南 = 靠画面外侧
	_ok("纵深方向的攻击也算正面 (另一侧同理)",
		player.health == player.max_health, "hp %d / %d" % [player.health, player.max_health])

	# 斜着来 (X 和纵深都偏) 但 X 在正面 → 仍然挡得住
	player.invincible_timer = 0.0
	player.stamina.refill()
	player._enter_blocking()
	player._parry_window_timer = 0.0
	player.take_damage(1, player.global_position + Vector2(-30.0, 50.0), null)   # 正面 + 大纵深偏移
	_ok("X 在正面时, 纵深偏得多也算正面 (只有 X 的符号决定前后)",
		player.health == player.max_health, "hp %d / %d" % [player.health, player.max_health])

	# ⑥ 精力耗尽 → 破防 (举盾不是无敌)
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.stamina.refill()
	player.stamina.drain(player.stamina.max_value - 5.0)    # 只剩 5 点, 付不起一次格挡
	player._enter_blocking()
	player._parry_window_timer = 0.0
	_ok("精力已见底", player.stamina.current < player.block_hit_cost,
		"精力=%.1f  一次格挡需要 %.1f" % [player.stamina.current, player.block_hit_cost])
	player.take_damage(1, frontal, null)
	_ok("精力不够 → 破防 (GUARD_BROKEN)", player.state == BlitzPlayer.State.GUARD_BROKEN,
		"state=%s" % BlitzPlayer.State.keys()[player.state])
	_ok("破防是零伤害 (被打崩, 不是被打伤)", player.health == player.max_health,
		"hp %d / %d" % [player.health, player.max_health])

	# 收尾: 松键, 让后续测试从干净的状态开始
	Input.action_release("block")
	await get_tree().physics_frame
	player.state = BlitzPlayer.State.NORMAL
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.stamina.refill()

	# ⑦ 精准窗口会**自己过期** —— 只开不关的话格挡会变成永久无敌
	player._parry_cooldown_timer = 0.0
	player._enter_blocking()
	_ok("窗口刚开时是开的", player.is_parry_window_open())
	for i: int in range(12):    # 12 帧 @60Hz = 0.2s > parry_window(0.16s)
		await get_tree().physics_frame
	_ok("推 12 物理帧 (0.2s) 后窗口自动关闭", not player.is_parry_window_open(),
		"剩 %.3fs" % player._parry_window_timer)


# ------------------------------------------------------------
# 精力
# ------------------------------------------------------------
func _check_stamina(player: BlitzPlayer) -> void:
	print("-- 精力 --")
	player.state = BlitzPlayer.State.NORMAL
	player._dash_cooldown_timer = 0.0
	player.stamina.refill()
	var st_full: float = player.stamina.current
	player._start_dash(Vector2.RIGHT)
	_ok("闪避扣精力", player.stamina.current < st_full,
		"%.1f -> %.1f" % [st_full, player.stamina.current])
	_ok("闪避进入 DASHING", player.state == BlitzPlayer.State.DASHING,
		"state=%s" % BlitzPlayer.State.keys()[player.state])

	player.state = BlitzPlayer.State.NORMAL
	player._dash_cooldown_timer = 0.0
	player.stamina.drain(player.stamina.max_value - 10.0)   # 只剩 10 < dash_cost(25)
	var before: float = player.stamina.current
	player._start_dash(Vector2.RIGHT)
	_ok("精力不够时闪不动 (资源门槛真的接上了)",
		player.state != BlitzPlayer.State.DASHING and is_equal_approx(player.stamina.current, before),
		"精力=%.1f  期望消耗=%.1f  state=%s" % [
			player.stamina.current, player.dash_cost, BlitzPlayer.State.keys()[player.state]])

	player.state = BlitzPlayer.State.NORMAL
	player.velocity = Vector2.ZERO


# ------------------------------------------------------------
# 蓄力重击
# ------------------------------------------------------------
func _check_heavy(player: BlitzPlayer, enemies: Array) -> void:
	print("-- 蓄力重击 --")
	var dummy: BlitzEnemy = _first_live_enemy(enemies)
	if dummy == null:
		_ok("找到重击靶子", false)
		return
	# ⚠️ 清掉上一段遗留的判定框 —— 判定框挂在玩家身上并且会跟着走, 不清的话
	#    它会在下一段测试里继续打同一个靶子, 把所有「掉血 N 点」的断言全搅乱。
	#    (实际上第一版就是这么错的: 上一段的满蓄重击又打了一次, 靶子掉到 -1 血。)
	_free_hitboxes(player)
	await get_tree().physics_frame

	_prep_dummy(dummy, player, Vector2(34.0, 0.0))
	player.stamina.refill()
	player.health = player.max_health
	player.invincible_timer = 0.0

	# 满蓄必须真的是 1.0 —— 否则「破霸体阈值 0.9」会因浮点误差永远够不到
	_ok("满蓄比例 = 1.0 (charge_ratio 的量化正确)",
		is_equal_approx(_full_charge_ratio(player), 1.0), "%.2f" % _full_charge_ratio(player))

	var hp0: int = dummy.health
	player.state = BlitzPlayer.State.NORMAL
	player.facing = 1
	player._attack_cooldown_timer = 0.0
	player._begin_attack(BlitzPlayer.AttackKind.HEAVY, 1.0)
	await get_tree().physics_frame
	await get_tree().physics_frame
	var heavy_dmg: int = hp0 - dummy.health
	_ok("满蓄重击命中", heavy_dmg > 0, "掉血 %d" % heavy_dmg)
	_ok("满蓄重击伤害 >= 轻击 (2 倍上下)", heavy_dmg >= player.heavy_damage_min,
		"重击 %d  轻击 %d" % [heavy_dmg, player.attack_light_damage])
	_free_hitboxes(player)

	# 蓄力重击的代价: 出刀硬直比轻击长一倍以上
	_ok("重击硬直明显长于轻击 (挥空就是挨打)", player.heavy_duration > player.attack_light_duration * 1.5,
		"重 %.2fs  轻 %.2fs" % [player.heavy_duration, player.attack_light_duration])


# ------------------------------------------------------------
# 霸体 —— 「正在起手/出招的敌人, 只有满蓄重击打得断」
# ------------------------------------------------------------
func _check_armor(player: BlitzPlayer, enemies: Array) -> void:
	print("-- 霸体 / 破霸体 --")
	var dummy: BlitzEnemy = _first_live_enemy(enemies)
	if dummy == null:
		_ok("找到霸体测试靶子", false)
		return
	_prep_dummy(dummy, player, Vector2(34.0, 0.0))
	player.facing = 1
	player.stamina.refill()
	player.health = player.max_health
	player.invincible_timer = 0.0

	# ① 轻击打中霸体中的敌人 → 掉血, 但**不打断**
	_free_hitboxes(player)
	dummy.health = dummy.max_health
	dummy.attack_phase = BlitzEnemy.AttackPhase.WINDUP
	dummy._phase_timer = 999.0        # 冻在起手, 免得它自己走进 STRIKE 干扰断言
	dummy._stagger_timer = 0.0
	player.state = BlitzPlayer.State.NORMAL
	player._attack_cooldown_timer = 0.0
	player._state_enter_attack()
	await get_tree().physics_frame
	await get_tree().physics_frame
	_ok("轻击打中霸体中的敌人: 掉血", dummy.health < dummy.max_health,
		"hp %d / %d" % [dummy.health, dummy.max_health])
	_ok("轻击**打不断**起手 (霸体生效 —— 否则重击会失去存在意义)",
		dummy.attack_phase == BlitzEnemy.AttackPhase.WINDUP,
		"phase=%s" % BlitzEnemy.AttackPhase.keys()[dummy.attack_phase])

	# ② 满蓄重击打中霸体中的敌人 → 掉血 + 破霸体 + 硬直
	#    ⚠️ 先清掉① 的轻击判定框: 它寿命 0.15s(9 帧) 而这里只等了 2 帧, 还活着。
	#       留着的话它会在②里再打一次, 「掉血」的数字就对不上了。
	_free_hitboxes(player)
	dummy.health = dummy.max_health
	dummy.attack_phase = BlitzEnemy.AttackPhase.WINDUP
	dummy._phase_timer = 999.0
	dummy._stagger_timer = 0.0
	player.state = BlitzPlayer.State.NORMAL
	player._attack_cooldown_timer = 0.0
	player._begin_attack(BlitzPlayer.AttackKind.HEAVY, 1.0)    # 1.0 = 满蓄
	await get_tree().physics_frame
	await get_tree().physics_frame
	_ok("满蓄重击打中霸体中的敌人: 掉血", dummy.health < dummy.max_health,
		"hp %d / %d" % [dummy.health, dummy.max_health])
	_ok("满蓄重击**打断**起手 (破霸体生效 —— breaks_armor 传到了 take_damage)",
		dummy.attack_phase == BlitzEnemy.AttackPhase.NONE,
		"phase=%s" % BlitzEnemy.AttackPhase.keys()[dummy.attack_phase])
	_ok("破霸体后敌人进硬直", dummy._stagger_timer > 0.0, "stagger=%.2fs" % dummy._stagger_timer)
	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL


# ------------------------------------------------------------
# 蓄力必须能被打断 (约束 ④: 否则永久卡在 CHARGING)
# ------------------------------------------------------------
func _check_charge_cancel(player: BlitzPlayer) -> void:
	print("-- 蓄力中受击不会卡死 --")
	# 蓄力靠 is_action_just_released 退出。一旦被打进 HIT, 那个「松开」事件
	# 可能永远不来 —— 没有 _apply_damage 里那行 _charge_timer = 0.0,
	# 玩家会永久卡在蓄力态: 不能动、不能打, 看起来像死机。
	player.state = BlitzPlayer.State.NORMAL
	player.stamina.refill()
	player.health = player.max_health
	player.invincible_timer = 0.0
	player.state = BlitzPlayer.State.CHARGING
	player._charge_timer = player.heavy_charge_max * 0.5
	player.take_damage(1, player.global_position + Vector2(0.0, 40.0))
	_ok("蓄力中受击: 蓄力进度被清零", is_zero_approx(player._charge_timer),
		"_charge_timer=%.3f" % player._charge_timer)
	_ok("蓄力中受击: 脱离 CHARGING", player.state != BlitzPlayer.State.CHARGING,
		"state=%s" % BlitzPlayer.State.keys()[player.state])

	var escaped: bool = false
	for i: int in range(40):        # 受击硬直 0.28s ≈ 17 帧
		await get_tree().physics_frame
		if player.state == BlitzPlayer.State.NORMAL:
			escaped = true
			break
	_ok("受击硬直走完后回到 NORMAL (没有永久卡住)", escaped,
		"state=%s" % BlitzPlayer.State.keys()[player.state])
	player.invincible_timer = 0.0
	player.health = player.max_health


# ------------------------------------------------------------
# 攻击形状 (AttackShape) —— 判定几何本身对不对
# ------------------------------------------------------------
#
# 🏗️ 这一组断言挑的是**不报错、只是玩起来怪**的失败模式。
#    形状相关 bug 的共性是: 游戏照常跑、没有一行报错, 只是「有时候打不到」
#    或者「背后也能打到」。靠玩是能感觉到, 但定位不到是哪一行。
func _check_attack_shape(player: BlitzPlayer) -> void:
	print("-- 攻击形状 (矩形 / 扇形 / 圆) --")

	# ① 矩形: 身前 reach 内、纵深 ±depth/2 内算命中; 背后不算
	var r: AttackShape = AttackShape.make_rect(100.0, 40.0)
	var o: Vector2 = Vector2.ZERO
	_ok("RECT 正前方 50 处命中", r.contains(o, 1, Vector2(50.0, 0.0)))
	_ok("RECT 纵深偏 19 命中 (在 ±20 内)", r.contains(o, 1, Vector2(50.0, 19.0)))
	_ok("RECT 纵深偏 21 **不**命中 (超出 depth/2)",
		not r.contains(o, 1, Vector2(50.0, 21.0)),
		"⚠️ 这条挂了 = 判定框退化成无限纵深, 站一条线就能通吃")
	_ok("RECT 背后 50 处**不**命中", not r.contains(o, 1, Vector2(-50.0, 0.0)))
	_ok("RECT 超出 reach 也不命中", not r.contains(o, 1, Vector2(101.0, 0.0)))
	_ok("RECT 朝左时打的是左边", r.contains(o, -1, Vector2(-50.0, 0.0)) and not r.contains(o, -1, Vector2(50.0, 0.0)))

	# ② 扇形: 半径内的角度约束。⚠️ 纵深方向**不能**退化成无限
	var a: AttackShape = AttackShape.make_arc(100.0, 75.0)
	_ok("ARC 正前方 80 处命中", a.contains(o, 1, Vector2(80.0, 0.0)))
	_ok("ARC 半径外不命中", not a.contains(o, 1, Vector2(120.0, 0.0)))
	# 正前方偏 45° = (70.7, 70.7), 在 75° 内
	_ok("ARC 斜前方 45° 命中", a.contains(o, 1, Vector2(70.7, 70.7)))
	# 张角外的点: (10, 90) → 与朝向夹角 ≈ 83.7°, 超出 75°
	_ok("ARC 张角外**不**命中 (侧后方)",
		not a.contains(o, 1, Vector2(10.0, 90.0)),
		"夹角 %.1f° > 75°" % rad_to_deg(atan2(90.0, 10.0)))
	_ok("ARC 背后不命中", not a.contains(o, 1, Vector2(-50.0, 0.0)))
	_ok("ARC 张角超过 90° 会被夹住 (凸多边形上限)",
		is_equal_approx(AttackShape.make_arc(50.0, 140.0).half_angle_deg, 90.0),
		"%.0f°" % AttackShape.make_arc(50.0, 140.0).half_angle_deg)

	# ③ 扇形的**纵深容差** —— 用户要的「离他几格纵深都能打到」到底是多少
	#
	# 🏗️ 扇形的纵深容差不是一个常数, 它随「站得多靠前」变化:
	#      可命中的条件 = 距离 ≤ R  且  夹角 ≤ half
	#    也就是 |Δz| ≤ min(Δx × tan(half), sqrt(R² − Δx²))。
	#    站在你正前方 Δx=20 处, 能罩住的纵深 = 20 × tan75° = 74.6, 但被半径截到 62.9。
	#    ⚠️ 而在 Δx=0 (同一个 x、只是纵深错开) 处**无论 Δz 多小都打不到** ——
	#       因为夹角恒为 90°, 超出 75°。这不是 bug, 是扇形该有的样子:
	#       扇形的两条边就是它的「方向性」, 砍掉它扇形就退化成半圆了。
	#       真要让正上正下也打到, 得把 half_angle 开到 90 (半圆), 那就没有方向了。
	#       下面两条断言把这两个事实都钉住, 免得以后有人把其中一条当成 bug 去「修」。
	_ok("ARC 纵深容差: 身前一个身位 (Δx=20) 处纵深 ±60 都扫得到",
		a.contains(o, 1, Vector2(20.0, 60.0)) and a.contains(o, 1, Vector2(20.0, -60.0)),
		"20 × tan75° = %.0f, 被半径截到 %.0f" % [20.0 * tan(deg_to_rad(75.0)), sqrt(100.0 * 100.0 - 400.0)])
	_ok("ARC 已知边界: Δx=0 (正上/正下) 扫不到 —— 扇形的方向性所在, 不是 bug",
		not a.contains(o, 1, Vector2(0.0, 30.0)) and not a.contains(o, 1, Vector2(0.0, -30.0)),
		"夹角 90° > 张角 75°")

	# ③ 圆: 半径 + **沿朝向的偏移** (落雷要「在面朝方向一定距离处」)
	var c: AttackShape = AttackShape.make_circle(30.0, Vector2(90.0, 0.0))
	_ok("CIRCLE 圆心处命中", c.contains(o, 1, Vector2(90.0, 0.0)))
	_ok("CIRCLE 圆心外 31 不命中", not c.contains(o, 1, Vector2(121.0, 0.0)))
	_ok("CIRCLE 对**背后**同样位置不命中 (偏移跟着朝向翻)",
		not c.contains(o, 1, Vector2(-90.0, 0.0)) and c.contains(o, -1, Vector2(-90.0, 0.0)))

	# ④ 高度带 —— 默认不限制, 不设置就没有任何行为变化
	_ok("默认高度带 = 不限制 (老招式一条都不用改)",
		r.hits_height(0.0) and r.hits_height(999.0) and r.hits_height(-999.0))
	var low: AttackShape = AttackShape.make_arc(80.0, 80.0).band(0.0, 24.0)
	_ok("设了高度带: 贴地命中", low.contains(o, 1, Vector2(50.0, 0.0), 0.0))
	_ok("设了高度带: 跳起来躲得掉 (这是加跳跃的主要收益)",
		not low.contains(o, 1, Vector2(50.0, 0.0), 60.0))
	_ok("高度带不影响地面判定 (同一位置只差 height)",
		low.contains_ground(o, 1, Vector2(50.0, 0.0)))

	# ⑤ 物理体和纯函数判定**必须给出同一个答案**
	#    🏗️ 这是整个重构的核心不变量: 预警画的是 shape, 判定走的是物理体,
	#       两者若有一丝不一致, 玩家看到的就是「明明躲开了却被打中」。
	#       逐点采样比对, 是唯一能证明它们同源的办法。
	#    ⚠️ 容差 0.25 是**几何上的必然**, 不是放水: 物理体是圆弧的**内接折线**,
	#       弦永远在弧内侧, 所以物理体比解析判定略小一点 (弓高 = R×(1−cos 半步长))。
	#       attack_shape.gd 里把采样密度定成每 5°, 就是为了把这个差压到 0.01px 级。
	#       真有 bug 的话偏差是**几十个单位**级的 (整个方向判反), 0.25 拦得住。
	const TOL: float = 0.25
	# 四个形状: 一条细长矩形、一个宽扇形、一个顶到上限 (90°) 的半圆、一个带圆心偏移的圆。
	# ⚠️ ⑤ 和 ⑤b 两条比对**共用这一份**列表 —— 分成两份写的话, 以后加形状时很容易
	#    只补一边, 而「漏掉的形状没人验」在结果上跟「验过了」长得一模一样。
	var shapes: Array[AttackShape] = [
			AttackShape.make_rect(100.0, 40.0),
			AttackShape.make_arc(100.0, 75.0),
			AttackShape.make_arc(90.0, 90.0),
			AttackShape.make_circle(40.0, Vector2(70.0, 0.0))]
	for s: AttackShape in shapes:
		var bad: int = 0
		var sampled: int = 0
		var hits: int = 0
		var worst: String = ""
		for ix: int in range(-30, 31):
			for iy: int in range(-30, 31):
				var d: Vector2 = Vector2(float(ix) * 5.0, float(iy) * 5.0)
				if d.length() < 1.0:
					continue
				sampled += 1
				var via_math: bool = s.contains_ground(o, 1, d)
				var via_body: bool = _point_in_hitbox(s, d, 1)
				if via_math:
					hits += 1
				if via_math == via_body:
					continue
				# 不一致的点若贴着边界 (内接折线与弧之间的那道薄缝), 属于采样误差;
				# 用「把它从边界推开 TOL 之后结论是否翻转」来判断它是缝还是真错。
				var pushed_out: Vector2 = d * ((d.length() + TOL) / d.length())
				var pushed_in: Vector2 = d * (maxf(0.001, d.length() - TOL) / d.length())
				var near_edge: bool = s.contains_ground(o, 1, pushed_out) != s.contains_ground(o, 1, pushed_in)
				if near_edge:
					continue
				bad += 1
				if worst == "":
					worst = "%s  数学=%s 物理=%s" % [d, via_math, via_body]
		_ok("物理体和 contains() 逐点一致 —— %s" % s.describe(), bad == 0,
			"%d/%d 个采样点不一致  %s" % [bad, sampled, worst])
		# 🏗️ 「自检的自检」: 上面那条断言在**两边都恒为 false** 时也会通过。
		#    这种情况不是假想 —— 采样网格写错 (比如 d 恒为零)、形状坐标算错, 都会让
		#    比对变成「空对空」, 而它看起来和「完美一致」一模一样。
		#
		# ⚠️ 判据是**绝对数量** (≥50), 不是百分比。第一版写的是「≥10% 落在形状内」,
		#    结果矩形和圆失败 —— 不是它们错了, 是**比例**这个工具选错了:
		#    采样框是 ±150 的正方形, 而矩形只有 100×40, 面积占比天然只有 5%。
		#    细长形状的占比永远很低, 和「有没有在空转」根本不是一回事。
		#    (实测: 矩形 5.1%、圆 5.3%、两个扇形 14.1% —— 全都正常。)
		#    要的是「确实有一批点在形状内, 这条比对不是空对空」, 那就直接数个数。
		_ok("  ↑ 这条比对不是空转的 (%d 个采样点落在形状内)" % hits,
			hits >= 50,
			"命中 %d / 采样 %d = %.1f%%  %s" % [hits, sampled, 100.0 * float(hits) / float(sampled), worst])

	# ⑤b 画在**地面上**的那个多边形 ⇔ 解析判定
	#
	# 🏗️ ⑤ 比的是「物理体 vs 纯函数」, 管的是「打不打得到」;
	#    这一条比的是「预警多边形 (telegraph_points) vs 纯函数」, 管的是
	#    「玩家**以为**打不打得到」。两者缺一不可 —— 只验 ⑤ 的话,
	#    预警完全可以画到别处, 而所有测试照样全绿, 玩家看到的是「圈在这儿、伤害在那边」。
	#    落雷就是这么漏过去的 (见 lightning_bolt.gd 文件头那次双偏移事故):
	#    形状对象只有一个、数据也只有一个, 但**两个消费者按不同的规则摆放**。
	#
	# ⚠️ origin 传 Vector2.ZERO = 「攻击者脚下」, 这是 telegraph_points 的合同,
	#    也是所有消费者必须遵守的摆放规则。传别的值就等于自己又加了一遍偏移 ——
	#    而一个只验 shape 内部几何的测试**看不见**调用方摆在哪。
	for s: AttackShape in shapes:
		# 多边形只建一次 —— 塞进 3720 次的内层循环里会白算 3719 遍
		var poly: PackedVector2Array = s.telegraph_points(Vector2.ZERO, 1)
		var bad: int = 0
		var hits: int = 0
		var worst: String = ""
		for ix: int in range(-30, 31):
			for iy: int in range(-30, 31):
				var d: Vector2 = Vector2(float(ix) * 5.0, float(iy) * 5.0)
				if d.length() < 1.0:
					continue
				var via_math: bool = s.contains_ground(Vector2.ZERO, 1, d)
				var via_draw: bool = Geometry2D.is_point_in_polygon(BeltSpace.to_screen(d), poly)
				if via_math:
					hits += 1
				if via_math == via_draw:
					continue
				# 和 ⑤ 同一套「贴边就是缝不是错」的判据: 预警多边形同样是弧的内接折线,
				# 弦与弧之间那道薄缝里的点, 结论翻转属于采样误差。
				var pushed_out: Vector2 = d * ((d.length() + TOL) / d.length())
				var pushed_in: Vector2 = d * (maxf(0.001, d.length() - TOL) / d.length())
				if s.contains_ground(Vector2.ZERO, 1, pushed_out) \
						!= s.contains_ground(Vector2.ZERO, 1, pushed_in):
					continue
				bad += 1
				if worst == "":
					worst = "%s  数学=%s 画出来=%s" % [d, via_math, via_draw]
		_ok("预警多边形和 contains() 逐点一致 —— %s" % s.describe(), bad == 0,
			"%d 个采样点不一致  %s" % [bad, worst])
		_ok("  ↑ 这条比对不是空转的 (%d 个采样点落在形状内)" % hits, hits >= 50,
			"命中 %d  %s" % [hits, worst])

	# ⑥ 共享资源污染 —— 现在从结构上不可能, 但断言留着
	#    (第一版是靠 duplicate() 守住的, 未来有人「优化」掉 build 里的 new 就会复发)
	# ⚠️ 用 get_instance_id() 而不是 `==` / `is_same`:
	#    GDScript 里 Object 的 `==` 未必是引用相等 (Resource 可能自己覆写比较语义),
	#    而 `is_same()` 在 Godot 4 的 Shape2D 上根本不存在 (第一次就踩了, 报
	#    "Nonexistent function 'is_same'")。instance id 是引擎给的唯一身份, 没有歧义。
	var s1: Shape2D = r.build_collision_shape(1)
	var s2: Shape2D = r.build_collision_shape(1)
	_ok("每次 build_collision_shape 都返回新对象 (共享资源污染不可能发生)",
		s1.get_instance_id() != s2.get_instance_id(),
		"id %d vs %d" % [s1.get_instance_id(), s2.get_instance_id()])

	# ⑦ 两个招式的分工 —— 浅的能扫一片, 远的要瞄准
	var ls: AttackShape = player.light_shape()
	var hs: AttackShape = player.heavy_shape()
	_ok("轻击是扇形 / 重击是矩形", ls.kind == AttackShape.Kind.ARC and hs.kind == AttackShape.Kind.RECT,
		"轻 %s  重 %s" % [ls.describe(), hs.describe()])
	_ok("重击够得**更远** (换掉了覆盖面)", hs.reach > ls.reach,
		"重 %.0f > 轻 %.0f" % [hs.reach, ls.reach])
	_ok("横劈的纵深容差**更宽** (两招才各有各的用处)",
		ls.reach * sin(deg_to_rad(ls.half_angle_deg)) > hs.depth * 0.5,
		"横劈 ±%.0f  vs  重击 ±%.0f" % [ls.reach * sin(deg_to_rad(ls.half_angle_deg)), hs.depth * 0.5])

	# ⑧ 出招时生成的判定框真的带上了这两个形状
	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL
	player.facing = 1
	player._attack_cooldown_timer = 0.0
	player._state_enter_attack()
	await get_tree().physics_frame
	var spawned: AttackShape = _first_hitbox_shape(player)
	_ok("轻击生成的判定框持有扇形 (而不是老的那个矩形)",
		spawned != null and spawned.kind == AttackShape.Kind.ARC,
		spawned.describe() if spawned != null else "null")
	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL


## 目标点是否落在 shape 建出来的**物理体**里。
##
## 🏗️ 这一条是「判定和预警同源」的机器证明:
##    contains() 走的是 pure math, 真正的伤害走的是 CollisionShape2D。
##    把物理体还原成多边形采样一遍, 两者必须逐点一致 ——
##    不一致就说明「画出来的范围」和「打得到的范围」已经分家了。
##
## ⚠️ 转换链要和 AttackHitbox._ready() 完全一致:
##    世界偏移 → BeltSpace.to_screen → 减去 collision_offset。
##    这里少减一次偏移, 测试就会报出一堆假的不一致。
func _point_in_hitbox(s: AttackShape, world_delta: Vector2, facing: int) -> bool:
	var sh: Shape2D = s.build_collision_shape(facing)
	var local: Vector2 = BeltSpace.to_screen(world_delta) - s.collision_offset(facing)
	if sh is RectangleShape2D:
		var half: Vector2 = (sh as RectangleShape2D).size * 0.5
		return absf(local.x) <= half.x and absf(local.y) <= half.y
	if sh is ConvexPolygonShape2D:
		return Geometry2D.is_point_in_polygon(local, (sh as ConvexPolygonShape2D).points)
	return false


# ------------------------------------------------------------
# 技能: 落雷 (圆 + 延迟生效)
# ------------------------------------------------------------
#
# 🏗️ 这一组挑的是「延迟招式」独有的失败模式 —— 它们在轻击/重击上**不可能出现**,
#    所以之前那 144 项检查一条都覆盖不到。共性是: 招看起来放了 (圈亮了、雷劈了),
#    但结果和玩家以为的不一样。
func _check_skill(player: BlitzPlayer, enemies: Array) -> void:
	print("-- 技能: 落雷 (圆 + 延迟生效) --")
	var dummy: BlitzEnemy = _first_live_enemy(enemies)
	if dummy == null:
		_ok("找到落雷测试靶子", false)
		return

	player.facing = 1
	player.stamina.refill()
	player.invincible_timer = 0.0
	player.health = player.max_health

	var sh: AttackShape = player.skill_shape()
	_ok("落雷是**圆**, 而且圆心在身前 (不是脚下)",
		sh.kind == AttackShape.Kind.CIRCLE and sh.offset.x > 0.0,
		sh.describe())
	# 圆心在身前 skill_distance 处 —— 这正是「闪电从空中落下然后在区域内造成伤害」的落点
	_ok("落点 = 面朝方向 skill_distance 处",
		is_equal_approx(sh.offset.x, player.skill_distance),
		"offset.x = %.1f  期望 %.1f" % [sh.offset.x, player.skill_distance])

	# ① 站在**落点**上的敌人会中; 站在**身后**同样距离的不会中
	#    ⚠️ 这两条要一起验: 只验前者的话, 一个「圆心偏移忘了乘 facing」的实现
	#       (圆永远落在右边) 也能通过 —— 而那个 bug 的表现是朝左放技能劈在身后。
	_free_hitboxes(player)
	_prep_dummy(dummy, player, Vector2(player.skill_distance, 0.0))
	player.state = BlitzPlayer.State.NORMAL
	player._skill_cooldown_timer = 0.0
	player.stamina.refill()
	player.invincible_timer = 0.0
	var hp0: int = dummy.health
	player._begin_attack(BlitzPlayer.AttackKind.SKILL, 0.0)

	_ok("落雷的判定框带蓄势 (不会立刻生效)", not _first_hitbox(player).is_armed() if _first_hitbox(player) != null else false)
	# 判定框的寿命必须**包含**蓄势时间, 否则雷落地前它就自毁了 (表现: 雷劈了但没人掉血)
	var hb: AttackHitbox = _first_hitbox(player)
	_ok("判定框寿命含蓄势时间 (否则雷还没落就自毁了)",
		hb != null and hb.lifetime > player.skill_arm_delay,
		"lifetime=%.2fs  arm_delay=%.2fs" % [hb.lifetime if hb != null else -1.0, player.skill_arm_delay])

	# ①c 摆放规则 —— 预警圈必须以**真正挨打的那个点**为圆心
	#
	# 🏗️ 这是「预警和判定同源」里最难验、也最容易漏的一环。
	#    shape 对象只有一个、数据也只有一个 —— 但**两个消费者各自决定把自己摆在哪**:
	#      判定框: 挂在攻击者身上, 靠 CollisionShape2D.position 偏移 → 算一遍 ✅
	#      落雷  : 第一版挂在**落点**上, 又按「origin = 攻击者脚下」画预警 → 算两遍 ❌
	#    结果圈画在离真实伤害 132px 的地方。形状内部几何怎么采样都验不出这个
	#    (shape 是对的), 只能直接钉住「圈心 == 挨打的点」。
	#
	# ⚠️ 断言写成「圈心就是那个敌人的位置」, 而不是「偏移等于 skill_distance」——
	#    后者只是把公式抄第二遍, 公式本身错了它照样绿。
	var fx: LightningBolt = player._skill_fx
	_ok("出招后落雷特效真的生成了 (否则下面这条在 null 上空转)", fx != null)
	if fx != null:
		var drawn_center: Vector2 = fx.position + fx._zone_center()
		var gap: float = drawn_center.distance_to(dummy.global_position)
		_ok("预警圈的圆心 = 站在这儿的那个敌人 (画的和挨打的是同一块地)",
			gap < 0.5,
			"圈心 %s  vs  敌人 %s  偏差 %.2fpx" % [drawn_center, dummy.global_position, gap])

	# ② 蓄势期间**绝不掉血** —— 这是「延迟」这件事本身
	await get_tree().physics_frame
	await get_tree().physics_frame
	_ok("蓄势期间站在圈里**不掉血** (延迟是真的)",
		dummy.health == hp0, "hp %d -> %d" % [hp0, dummy.health])

	# ③ 蓄势走完 → 掉血
	for i: int in range(60):
		await get_tree().physics_frame
		if dummy.health < hp0:
			break
	_ok("蓄势走完后劈中圈里的敌人", dummy.health < hp0, "hp %d -> %d" % [hp0, dummy.health])
	_ok("落雷伤害高于横劈 (它的代价是延迟)",
		hp0 - dummy.health >= player.skill_damage,
		"掉血 %d  期望 >= %d" % [hp0 - dummy.health, player.skill_damage])

	# ④ 朝左时落点在**左边** —— 圆心偏移跟着朝向翻
	_free_hitboxes(player)
	_prep_dummy(dummy, player, Vector2(-player.skill_distance, 0.0))
	player.facing = -1
	player.health = player.max_health
	player.invincible_timer = 0.0
	player.stamina.refill()
	player._skill_cooldown_timer = 0.0
	hp0 = dummy.health
	player._begin_attack(BlitzPlayer.AttackKind.SKILL, 0.0)
	for i: int in range(60):
		await get_tree().physics_frame
		if dummy.health < hp0:
			break
	_ok("朝左时落点在左边 (圆心偏移跟着朝向翻)",
		dummy.health < hp0, "hp %d -> %d" % [hp0, dummy.health])

	# ⑤ 🚨 **打断必须取消还没落下的雷** —— 延迟招式最危险的那条静默路径
	#
	#    没有 _cancel_pending_attack() 的话: 玩家按了 U, 0.2 秒后挨打进了 HIT 硬直,
	#    但那个带着蓄势的判定框还挂在玩家身上自己数秒 —— 时间一到, 雷照样劈下来。
	#    玩法上等于「已经被打断了, 输出照样出去」; 画面上**看不出任何异常**
	#    (圈本来就亮着), 所以只能靠自检抓。
	_free_hitboxes(player)
	_prep_dummy(dummy, player, Vector2(player.skill_distance, 0.0))
	player.facing = 1
	player.health = player.max_health
	player.invincible_timer = 0.0
	player.stamina.refill()
	player._skill_cooldown_timer = 0.0
	hp0 = dummy.health
	player._begin_attack(BlitzPlayer.AttackKind.SKILL, 0.0)
	await get_tree().physics_frame
	# 🏗️ 「自检的自检」: 打断**之前**那个待发的判定框必须真的存在。
	#    不加这一条的话, 「打断后被收掉」在「本来就没生成」时也成立 ——
	#    而「本来就没生成」正是 _begin_attack 走错分支时的表现, 两个 bug 会互相掩盖。
	var pending: AttackHitbox = _first_hitbox(player)
	_ok("  ↑ 打断前确实挂着一个待发的判定框 (比对不是空转)",
		pending != null and not pending.is_armed(),
		"判定框 %s" % ("null" if pending == null else "armed=%s" % pending.is_armed()))
	player.invincible_timer = 0.0
	player.take_damage(1, player.global_position + Vector2(60.0, 0.0))   # 打断
	_ok("打断后待发的落雷判定框被收掉了",
		_first_hitbox(player) == null,
		"还剩 %d 个判定框" % _count_hitboxes(player))
	for i: int in range(60):
		await get_tree().physics_frame
	_ok("打断后那发雷**不会**再劈下来 (否则输出照样出去, 且画面看不出异常)",
		dummy.health == hp0, "hp %d -> %d" % [hp0, dummy.health])
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.state = BlitzPlayer.State.NORMAL
	_free_hitboxes(player)


func _first_hitbox(player: BlitzPlayer) -> AttackHitbox:
	for c: Node in player.get_children():
		if c is AttackHitbox:
			return c
	return null


func _count_hitboxes(player: BlitzPlayer) -> int:
	var n: int = 0
	for c: Node in player.get_children():
		if c is AttackHitbox:
			n += 1
	return n


# ------------------------------------------------------------
# 判定框确实挂上了 shape (且不再是共享场景资源)
# ------------------------------------------------------------
func _check_hitbox_shapes(player: BlitzPlayer) -> void:
	print("-- 判定框尺寸 (共享 RectangleShape2D 有没有被污染) --")
	# ⚠️ 顺序仍然是关键: 必须**先重击后轻击**。
	#    即使现在每次 build 都新建对象, 也保留这个顺序 —— 万一哪天有人为了「省一个
	#    对象分配」把 build 改成返回缓存, 先重后轻才能把这个 bug 测出来。
	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL
	player.facing = 1
	player._begin_attack(BlitzPlayer.AttackKind.HEAVY, 1.0)
	var heavy_vec: Vector2 = _first_hitbox_size(player)
	var heavy_shape: AttackShape = _first_hitbox_shape(player)

	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL
	player._state_enter_attack()
	var light_vec: Vector2 = _first_hitbox_size(player)
	var light_shape: AttackShape = _first_hitbox_shape(player)

	_ok("重击的物理体尺寸 = heavy depth × DEPTH_SCALE",
		is_equal_approx(heavy_vec.y, player.heavy_depth * BeltSpace.DEPTH_SCALE),
		"实际 %s  应为 (…, %.1f)" % [heavy_vec, player.heavy_depth * BeltSpace.DEPTH_SCALE])
	_ok("轻击的物理体是**多边形** (扇形), 不是矩形",
		light_shape != null and light_shape.kind == AttackShape.Kind.ARC,
		light_shape.describe() if light_shape != null else "null")
	_ok("重击之后生成的轻击**没有被污染** (两次 build 是两份独立几何)",
		light_vec != heavy_vec and light_shape != heavy_shape,
		"轻 %s  重 %s" % [light_vec, heavy_vec])
	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL


# ------------------------------------------------------------
# 靶子身体活在地面平面上 (判定几何所在的那个平面)
# ------------------------------------------------------------
## 玩家受击框 / 敌人身体框必须是**地面平面**里的图形, 不是屏幕空间的圆或矩形。
##
## 🏗️ 这是「预警画的就是判定」在**靶子这一侧**的一环, 而且只有这么验得出来:
##    `-- 攻击形状 --` 那一段比的是 AttackShape 和它自己的物理体 (形状 vs 形状),
##    结构上看不见「靶子被抬高 / 纵深被拉长」这类错 —— 但它真的会让
##    「脚下站在扇形外面一格半」的人照样挨打。
##    (实测: 把玩家受击框换回旧的屏幕圆 (r=15 画在脚上方 16px),
##     它在地面平面里是「圆心 +32、纵深 ±30」的巨椭圆, 敌人扇形那一段的 ③
##     立刻从 ✅ 翻成 ❌ —— 所以这不是推演出来的顾虑。)
##
## 📐 判据只取**压扁比**, 不取大小也不逐点比:
##    判定几何整个活在地面平面上, 所以一个**世界圆**在屏幕上的包围盒必然是
##    2:1 (BeltSpace.DEPTH_SCALE)。这一条精确到浮点误差, 不是手感。
##    ⚠️ 故意**不**断言半径 —— 靶子多大是手感问题, 锁死它会让以后每次调手感
##       都要来改自检, 而那时候人会顺手把这条删掉。
func _check_ground_bodies(player: BlitzPlayer, enemies: Array) -> void:
	print("-- 靶子身体在地面平面上 --")

	var targets: Array = []
	targets.append(["玩家受击框", player.hurtbox.get_node("CollisionShape2D")])
	for i: int in range(enemies.size()):
		var e: Node = enemies[i]
		# ⚠️ 编号写进标签 —— 五只敌人的断言文字一模一样的话, 挂了也看不出是哪只
		if is_instance_valid(e) and not (e as BlitzEnemy).is_dead:
			targets.append(["敌人#%d 身体框" % i, (e as BlitzEnemy).get_node("CollisionShape2D")])

	if targets.is_empty():
		_ok("找到靶子身体框 (否则本段空转)", false)
		return

	for t: Array in targets:
		var label: String = t[0]
		var cs: CollisionShape2D = t[1]
		var sh: Shape2D = cs.shape
		# CircleShape2D / RectangleShape2D 在这个测试里**必然**挂: 它们在屏幕空间里
		# 是正圆/正矩形, 也就是地面平面里的「纵深长一倍」。类型本身就是判据。
		if not (sh is ConvexPolygonShape2D):
			_ok("%s 是地面多边形 (不是屏幕空间的圆/矩形)" % label, false,
				"实际类型 %s —— 见本函数说明" % sh.get_class())
			continue
		var pts: PackedVector2Array = (sh as ConvexPolygonShape2D).points
		if pts.size() < 3:
			_ok("%s 的多边形有顶点 (空多边形也「通过」压扁比就没意义了)" % label, false,
				"顶点数 %d" % pts.size())
			continue
		var bb: Rect2 = Rect2(pts[0], Vector2.ZERO)
		for p: Vector2 in pts:
			bb = bb.expand(p)
		var ratio: float = bb.size.y / maxf(0.001, bb.size.x)
		_ok("%s 的压扁比 = DEPTH_SCALE (它和我们画的东西在同一个平面里)" % label,
			absf(ratio - BeltSpace.DEPTH_SCALE) < 0.02,
			"屏幕包围盒 %.1f×%.1f → 比 %.3f, 期望 %.3f" % [
				bb.size.x, bb.size.y, ratio, BeltSpace.DEPTH_SCALE])


# ------------------------------------------------------------
# 敌人出招真的能打到玩家
# ------------------------------------------------------------
func _check_enemy_attack_lands(player: BlitzPlayer, enemies: Array) -> void:
	print("-- 敌人出招真的能打到玩家 --")
	var striker: BlitzEnemy = _first_live_enemy(enemies)
	if striker == null:
		_ok("找到出招测试敌人", false)
		return

	# 不靠 AI —— 手动把相位摆到 WINDUP 才可复现 (AI 的起手时机依赖距离和冷却)
	striker.attack_phase = BlitzEnemy.AttackPhase.NONE
	striker._attack_cooldown_timer = 0.0

	# ① 正前方 —— 基本盘: bit3/bit2 和玩家 Hurtbox 真的接上了
	var hit_front: bool = await _drive_enemy_strike(striker, player, Vector2(40.0, 0.0), -1)
	_ok("敌人的挥砍打到了正前方的玩家 (判定层和玩家 Hurtbox 都接上了)", hit_front)

	# ② 纵深错开一格 —— 用户对这一招的原始要求:
	#    「在它的攻击范围内, 离他几根横向轴上都会收到攻击」
	#
	# 🏗️ 一条是**扇形**最该被验的性质: 纵深容差不是一个常量, 它随「站得多靠前」变化
	#    (|Δz| ≤ min(Δx·tan 半角, √(R²−Δx²)))。这里取 Δx=30 / Δz=32 —— 刚好一个地格
	#    的纵深, 夹角 46.8° 在 60° 张角内, 必须打得到。
	var hit_lane: bool = await _drive_enemy_strike(striker, player, Vector2(30.0, 32.0), -1)
	_ok("纵深错开**一整格**照样挨打 (扇形够宽 —— 这是这一招存在的理由)", hit_lane,
		"Δx=30 Δz=32 → 夹角 %.1f° < 张角 %.0f°" % [
			rad_to_deg(atan2(32.0, 30.0)), striker.sweep_half_angle_deg])

	# ③ 但纵深错开太多就该躲得掉 —— 否则「离他几根格」会退化成「无限纵深」
	#    ⚠️ 这条和 ② 是一对, 缺了它的话「扇形」和「一条无限宽的横带」在测试里没区别。
	#       而后者会让玩家长按上下就走位免疫: 战斗里再没有纵深可言。
	var hit_far: bool = await _drive_enemy_strike(striker, player, Vector2(10.0, 48.0), -1)
	_ok("纵深错开太多**打不到** (扇形是有方向的, 不是一条无限宽的横带)", not hit_far,
		"Δx=10 Δz=48 → 夹角 %.1f° > 张角 %.0f°" % [
			rad_to_deg(atan2(48.0, 10.0)), striker.sweep_half_angle_deg])

	# ④ 站在**背后**打不到 —— 朝向真的在起作用 (而不是「只要离得近就中」)
	var hit_behind: bool = await _drive_enemy_strike(striker, player, Vector2(40.0, 0.0), 1)
	_ok("站在敌人**背后**打不到 (朝向真的接上了判定)", not hit_behind)

	# ⑤ 高度带 —— 跳跃能躲开这一刀 (v0.4 步骤 5, 加跳跃的主要收益)
	#
	# 🏗️ 前四条验的都是「在地面上站哪会挨打」; 这一条验**第三条轴**。
	#    ⚠️ 只断言 shape.hits_height() 是不够的 —— 那只能证明**数据对**,
	#       证明不了那条数据真的接进了受击链路 (数据写对、没人读 = 跳跃没收益)。
	#       所以这里走**完整一招**: 手动打进 WINDUP → STRIKE, 让玩家 Hurtbox
	#       真的和 EnemyAttack 重叠, 看最后掉不掉血。
	var band: AttackShape = striker.attack_shape()
	_ok("敌人横扫带低空高度带 (跳起来躲得开的前提)",
		band.height_max < INF and band.height_max > 0.0,
		"height_min=%.0f height_max=%.0f" % [band.height_min, band.height_max])

	# 对照组: 同一位置贴地站 → 这一刀必须真的打得到。
	# 没有它的话, 「跳过去没掉血」也可能只是因为判定根本没接上, 假绿。
	var hit_low: bool = await _drive_enemy_strike_at_height(
		striker, player, Vector2(40.0, 0.0), -1, 0.0)
	_ok("贴地站在同一位置会被横扫打到 (高度带的对照组)", hit_low)

	var dodge_height: float = band.height_max + 20.0
	var hit_high: bool = await _drive_enemy_strike_at_height(
		striker, player, Vector2(40.0, 0.0), -1, dodge_height)
	_ok("跳到 height_max 以上**躲开**横扫 (跳跃真的有战术价值)", not hit_high,
		"height=%.0f > height_max=%.0f" % [dodge_height, band.height_max])

	striker.attack_phase = BlitzEnemy.AttackPhase.NONE
	striker._attack_cooldown_timer = 0.0
	_restore_player(player)


## 把敌人摆到世界平面上 (相对玩家脚下), 然后手动打出一整招。
## 返回: 玩家这一下有没有掉血。
##
## ⚠️ 摆放必须用**世界坐标** —— 判定范围是世界单位。用屏幕坐标摆靶子的话,
##    「纵深差一格」会被算成半格, 测试要么假过要么假失败, 而两种看起来都像判定有 bug。
##    (这也是为什么这里没直接用 _prep_dummy: 它的 offset 是屏幕坐标。)
func _drive_enemy_strike(
	striker: BlitzEnemy, player: BlitzPlayer, world_offset: Vector2, facing: int
) -> bool:
	_prep_dummy(striker, player, BeltSpace.to_screen(world_offset))
	striker.facing = facing
	_restore_player(player)

	striker.attack_phase = BlitzEnemy.AttackPhase.NONE
	striker._attack_cooldown_timer = 0.0
	var hp0: int = player.health
	# 直接进 WINDUP, 两三帧后就是 STRIKE
	striker.attack_phase = BlitzEnemy.AttackPhase.WINDUP
	striker._phase_timer = 0.03

	for i: int in range(30):
		await get_tree().physics_frame
		if player.health < hp0:
			return true
	return false


## 同 `_drive_enemy_strike`, 但把玩家的**离地高度钉在 `at_height`** 上打完整一招。
## 返回: 玩家这一下有没有掉血。
##
## ⚠️ 必须**每帧重设 height / _height_vel**。玩家 `_physics_process` 里有重力,
##    只设一次的话, 等判定区真正生成时人已经掉回地面了 —— 于是「跳着躲开」
##    会假失败, 而失败现象看起来像「高度带没接上」, 排查会往完全错误的方向跑。
##    (自检里直接写私有字段不是偷懒: 这里要精确控制一个**瞬间状态**,
##     走真实输入起跳反而引入了起跳时机这个无关变量。)
func _drive_enemy_strike_at_height(
	striker: BlitzEnemy, player: BlitzPlayer, world_offset: Vector2, facing: int, at_height: float
) -> bool:
	_prep_dummy(striker, player, BeltSpace.to_screen(world_offset))
	striker.facing = facing
	_restore_player(player)

	striker.attack_phase = BlitzEnemy.AttackPhase.NONE
	striker._attack_cooldown_timer = 0.0
	var hp0: int = player.health
	striker.attack_phase = BlitzEnemy.AttackPhase.WINDUP
	striker._phase_timer = 0.03

	for i: int in range(30):
		player.height = at_height
		player._height_vel = 0.0
		await get_tree().physics_frame
		if player.health < hp0:
			return true
	player.height = at_height
	return false


## 把玩家恢复到「能挨打」的干净状态 (不无敌、不满血以外的一切干扰)。
func _restore_player(player: BlitzPlayer) -> void:
	player.state = BlitzPlayer.State.NORMAL
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.velocity = Vector2.ZERO
	player.height = 0.0


# ------------------------------------------------------------
# 敌人出招状态机能自己走完一圈
# ------------------------------------------------------------
func _check_enemy_cycle(player: BlitzPlayer, enemies: Array) -> void:
	print("-- 敌人出招状态机 --")
	var cycler: BlitzEnemy = _first_live_enemy(enemies)
	if cycler == null:
		_ok("找到状态机测试敌人", false)
		return
	# 只关心「相位能不能自己走回 NONE」, 所以放在远处、不还手、打不死
	_prep_dummy(cycler, player, Vector2(0.0, 400.0))
	cycler.attack_phase = BlitzEnemy.AttackPhase.WINDUP
	cycler._phase_timer = cycler.windup_duration

	var cycle_frames: int = int(
		(cycler.windup_duration + cycler.strike_duration + cycler.recover_duration) * 60.0) + 40
	var returned: bool = false
	for i: int in range(cycle_frames):
		await get_tree().physics_frame
		if cycler.attack_phase == BlitzEnemy.AttackPhase.NONE:
			returned = true
			break
	_ok("起手→出招→收招能自己走回 NONE (状态机没有漏 exit 条件)",
		returned, "phase=%s" % BlitzEnemy.AttackPhase.keys()[cycler.attack_phase])
	_ok("走完一轮后进入冷却 (不会立刻再起手)", cycler._attack_cooldown_timer > 0.0,
		"冷却剩 %.2fs" % cycler._attack_cooldown_timer)

	# ── 贴地预警的开关 (v0.4) ──
	#
	# 🏗️ 自检看不见像素, 但「画不画」是个**状态**, 可以断言 —— 而这两件事玩家都会遇到:
	#      · 预警没画出来 → 那片红从没出现过, 玩家只能靠挨打学会出招;
	#      · 预警没关掉   → 收招后地上留着一片永远不消失的假范围。
	#
	#    ⚠️ 第二轮那条是重点, 它专抓一个**已经发生过**的 bug:
	#       第一版把「注册回调」和「现在开不开」塞进同一个字段 (关闭预警 = 把 painter
	#       清空), 于是敌人**第一次收招之后那片扇形就永久消失** ——
	#       而其余 178 条全绿 (自检断言不了像素, 起手时灯确实亮着)。
	#       是截图里扇形整个不见了才逮到的。所以这里必须验**第二轮**, 只验一轮抓不到。
	_ok("收招后贴地预警**关掉**了 (不会留下一片假范围)", not cycler._tg.enabled)
	_ok("收招没有把预警的**注册**一起擦掉 (画家还在)", cycler._tg.painter.is_valid())

	# 第二轮起手: 灯必须还能亮
	cycler._attack_cooldown_timer = 0.0
	cycler.attack_phase = BlitzEnemy.AttackPhase.WINDUP
	cycler._phase_timer = cycler.windup_duration
	await get_tree().physics_frame
	await get_tree().physics_frame
	_ok("**第二轮**起手预警照样亮 (开关不消耗注册)", cycler._tg.enabled)
	cycler.attack_phase = BlitzEnemy.AttackPhase.NONE


# ------------------------------------------------------------
# 接触伤害已删干净 (旧机制残留只会造成安静的误导)
# ------------------------------------------------------------
func _check_contact_damage_removed(player: BlitzPlayer) -> void:
	print("-- 接触伤害已删除 --")
	var proto: Node = (load("res://scenes/enemy.tscn") as PackedScene).instantiate()
	var areas: int = 0
	for c: Node in proto.get_children():
		if c is Area2D:
			areas += 1
	proto.free()
	_ok("enemy.tscn 里没有 Area2D 节点 (贴身碰撞伤害已删干净)", areas == 0,
		"Area2D 数=%d" % areas)
	_ok("玩家 Hurtbox 不再监听敌人身体 (bit1)", (player.hurtbox.collision_mask & (1 << 1)) == 0,
		"mask=%d" % player.hurtbox.collision_mask)
	_ok("玩家 Hurtbox 仍监听敌人攻击 (bit3)", (player.hurtbox.collision_mask & (1 << 3)) != 0,
		"mask=%d" % player.hurtbox.collision_mask)


# ============================================================
# 小工具
# ============================================================
## 把测试靶子设成「打不死 + 不还手」, 并摆到指定位置。
##
## ⚠️ 那两个 999 不是随手写的。敌人默认 4 点血, 而战斗测试会连着挥好几刀
##    (满蓄重击一刀就是 4 点) —— 靶子一旦被打死, 后面所有走 _first_live_enemy
##    的测试都会拿到 null 然后**安静地跳过**, 于是那几项既不算通过也不算失败,
##    整份报告看起来还是绿的。第一版就是这样: 「找到出招测试敌人」直接空着过去了。
##
## can_attack = false 同理: 这一段要精确控制「攻击从哪边来」, 让靶子还手会引入随机性。
func _prep_dummy(e: BlitzEnemy, player: BlitzPlayer, offset: Vector2) -> void:
	e.max_health = 999
	e.health = 999
	e.can_attack = false
	e.global_position = player.global_position + offset
	e.velocity = Vector2.ZERO
	e._stagger_timer = 0.0
	e._stun_timer = 0.0


func _first_live_enemy(list: Array) -> BlitzEnemy:
	for n: Node in list:
		if n is BlitzEnemy and not (n as BlitzEnemy).is_dead:
			return n
	return null


## 蓄满一次测 charge_ratio 的量化 —— 满蓄必须真的是 1.0, 否则「破霸体阈值 0.9」
## 会因为浮点误差而永远够不到 (表现是「明明蓄满了却不破」, 极难查)。
func _full_charge_ratio(player: BlitzPlayer) -> float:
	var keep: float = player._charge_timer
	player._charge_timer = player.heavy_charge_max
	var r: float = player.charge_ratio()
	player._charge_timer = keep
	return r


## ⚠️ 必须 remove_child + queue_free 一起做: 只 queue_free 的话节点要到帧末
##    才真的离开场景树, 于是紧接着的 get_children() 会同时看到新旧两个判定框,
##    _first_hitbox_size 可能读到旧的那个 —— 断言就变成了随机通过。
func _free_hitboxes(player: BlitzPlayer) -> void:
	for c: Node in player.get_children():
		if c is AttackHitbox:
			player.remove_child(c)
			c.queue_free()


## 场上第一个判定框的**物理体包围盒**。
##
## ⚠️ 不能只认 RectangleShape2D —— 轻击现在是扇形 (ConvexPolygonShape2D)。
##    第一版写死了矩形, 于是轻击一律返回 ZERO, 断言 `light != heavy` 就变成
##    拿「零向量」去比, 恒真 —— 一个永远不会失败的测试, 比没有测试更糟。
func _first_hitbox_size(player: BlitzPlayer) -> Vector2:
	var sh: Shape2D = _first_hitbox_shape2d(player)
	if sh is RectangleShape2D:
		return (sh as RectangleShape2D).size
	if sh is ConvexPolygonShape2D:
		var pts: PackedVector2Array = (sh as ConvexPolygonShape2D).points
		if pts.is_empty():
			return Vector2.ZERO
		var r: Rect2 = Rect2(pts[0], Vector2.ZERO)
		for p: Vector2 in pts:
			r = r.expand(p)
		return r.size
	return Vector2.ZERO


## 场上第一个判定框持有的 **AttackShape**(而不是它建出来的物理体)。
## 「判定框到底拿的是哪一招的形状」是这一组断言真正要问的问题。
func _first_hitbox_shape(player: BlitzPlayer) -> AttackShape:
	for c: Node in player.get_children():
		if c is AttackHitbox:
			return (c as AttackHitbox).attack_shape
	return null


func _first_hitbox_shape2d(player: BlitzPlayer) -> Shape2D:
	for c: Node in player.get_children():
		if not (c is AttackHitbox):
			continue
		for g: Node in c.get_children():
			if g is CollisionShape2D:
				return (g as CollisionShape2D).shape
	return null
