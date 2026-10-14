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

	print("=== Blitz v0.2 集成自检 ===")

	var player: BlitzPlayer = _game.player
	var floor_layer: IsoFloor = _game.floor
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
		# 把敌人挪到玩家正下方 (facing_dir 默认 DOWN) 的判定框范围内
		player.facing_dir = Vector2.DOWN
		enemy.global_position = player.global_position + Vector2(0.0, 34.0)
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
	# 四道墙是**旋转过**的 (沿菱形斜边), 旋转碰撞体是最容易「看着在但拦不住」的东西,
	# 而且拦不住时症状是「能走出地图」, 不会报任何错。
	var center: Vector2 = b.position + b.size * 0.5
	var north_y: float = center.y - b.size.y * 0.5
	player.global_position = center
	for i: int in range(150):
		player.velocity = Vector2(0.0, -420.0)
		await get_tree().physics_frame
	_ok("向北猛冲 150 帧后仍在墙内", player.global_position.y > north_y - 6.0,
		"feet.y=%.1f  北顶点 y=%.1f (无墙的话会到 %.1f 以下)" % [
			player.global_position.y, north_y, north_y - 700.0])

	print("-- 输入映射 (旧横版按键必须已清掉) --")
	for action: String in ["move_up", "move_down", "attack_light", "attack_heavy", "dash", "block", "debug_toggle"]:
		_ok("已注册 %s" % action, InputMap.has_action(action))
	for action: String in ["jump", "shoot"]:
		_ok("已删除旧键 %s" % action, not InputMap.has_action(action))

	print("-- IsoFloor 坐标桥 --")
	var c1: Vector2i = Vector2i(7, 13)
	_ok("center_of 可往返", floor_layer.cell_of(floor_layer.center_of(c1)) == c1)
	var span: Vector2 = floor_layer.center_of_span(Vector2i(13, 7), Vector2i(1, 2))
	var single: Vector2 = floor_layer.center_of(Vector2i(13, 7))
	_ok("center_of_span 与单格中心不同 (多格区域确实偏了半格)", span.distance_to(single) > 1.0,
		"span=%s single=%s" % [span, single])

	# v0.3 战斗手感 (单独放在最后: 它会大幅改动玩家状态, 不能影响上面的走位断言)
	await _run_combat(_game)

	print("=== 自检结束: %d 项检查, %d 项失败 ===" % [_checks, _fails])


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

	# headless 下鼠标恒在屏幕原点, 扇形判定根本没法测 —— 用覆写出口指定朝向。
	# (这个出口的三个真实消费者写在 player.gd 的 block_aim_override 上方)
	player.block_aim_override = Vector2.UP      # 面朝北
	player.velocity = Vector2.ZERO

	await _check_guard(player, enemies)
	await _check_stamina(player)
	await _check_heavy(player, enemies)
	await _check_armor(player, enemies)
	await _check_charge_cancel(player)
	await _check_hitbox_shapes(player)
	await _check_enemy_attack_lands(player, enemies)
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

	# ① 走**完整输入路径**进格挡 (按真键), 而不是直接调 _enter_blocking()
	Input.action_press("block")
	await get_tree().physics_frame
	await get_tree().physics_frame
	_ok("按住格挡键进入 BLOCKING", player.is_guard_up(),
		"state=%s" % BlitzPlayer.State.keys()[player.state])
	_ok("刚按下时精准窗口是开的", player.is_parry_window_open())

	# ② 精准格挡: 窗口内被**正面**攻击 → 零伤 + 零耗 + 攻击者硬直
	var frontal: Vector2 = player.global_position + Vector2(0.0, -40.0)   # 北面来 = 正前方
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

	# ④ 扇形格挡的核心: **背后照常掉血**
	#    这是整段里最容易写错的一条 —— 写成全方位的话这里会变绿, 而游戏里
	#    「转身面对敌人」这个动作会彻底失去意义。
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.stamina.refill()
	player._enter_blocking()
	player._parry_window_timer = 0.0
	hp0 = player.health
	player.take_damage(1, player.global_position + Vector2(0.0, 40.0), attacker)   # 南面来 = 背后
	_ok("背后挨打照常掉血 (扇形判定生效, 没写成全方位)", player.health < hp0,
		"hp %d -> %d" % [hp0, player.health])

	# ⑤ 把锥角钉死在 ±90°: 只测正前/正后的话, ±60° 甚至全方位都能通过
	#    斜前 45° (dot = +0.71) 应挡住; 斜后 135° (dot = -0.71) 应挡住失败
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.stamina.refill()
	player._enter_blocking()
	player._parry_window_timer = 0.0
	player.take_damage(1, player.global_position + Vector2(30.0, -30.0), null)   # 东北 45°
	_ok("斜前方 45° 算正面 (锥角 >= ±45°)", player.health == player.max_health,
		"hp %d / %d" % [player.health, player.max_health])

	player.invincible_timer = 0.0
	player.stamina.refill()
	player._enter_blocking()
	player._parry_window_timer = 0.0
	hp0 = player.health
	player.take_damage(1, player.global_position + Vector2(30.0, 30.0), null)    # 东南 135°
	_ok("斜后方 135° 算背后 (锥角 <= ±90°)", player.health < hp0,
		"hp %d -> %d" % [hp0, player.health])

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

	_prep_dummy(dummy, player, Vector2(0.0, 34.0))
	player.stamina.refill()
	player.health = player.max_health
	player.invincible_timer = 0.0

	# 满蓄必须真的是 1.0 —— 否则「破霸体阈值 0.9」会因浮点误差永远够不到
	_ok("满蓄比例 = 1.0 (charge_ratio 的量化正确)",
		is_equal_approx(_full_charge_ratio(player), 1.0), "%.2f" % _full_charge_ratio(player))

	var hp0: int = dummy.health
	player.state = BlitzPlayer.State.NORMAL
	player.facing_dir = Vector2.DOWN
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
	_prep_dummy(dummy, player, Vector2(0.0, 34.0))
	player.facing_dir = Vector2.DOWN
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
# 共享 RectangleShape2D 有没有被污染 (约束 ①)
# ------------------------------------------------------------
func _check_hitbox_shapes(player: BlitzPlayer) -> void:
	print("-- 判定框尺寸 (共享 RectangleShape2D 有没有被污染) --")
	# ⚠️ 顺序是关键: 必须**先重击后轻击**。
	#    attack_hitbox.tscn 的 rect_hitbox 是 sub_resource, instantiate() 出的实例
	#    共享同一个 shape 对象。若 _ready() 里漏了 duplicate(), 重击就会把那个共享
	#    形状改大, 于是**之后生成的轻击**也变成大框 —— 一刀扫穿一排敌人, 且不报错。
	#    反过来先轻击后重击的话, 这个 bug 测不出来 (轻击本来就是小的)。
	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL
	player._begin_attack(BlitzPlayer.AttackKind.HEAVY, 1.0)
	var heavy_size: Vector2 = _first_hitbox_size(player)

	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL
	player._state_enter_attack()
	var light_size: Vector2 = _first_hitbox_size(player)

	_ok("重击判定框比轻击大", heavy_size.length() > light_size.length(),
		"重 %s  轻 %s" % [heavy_size, light_size])
	_ok("重击之后生成的轻击**没有被污染** (共享形状已 duplicate)",
		light_size != Vector2.ZERO and light_size.length() < heavy_size.length() * 0.9,
		"轻击框 = %s  (重击框 %s)" % [light_size, heavy_size])
	_free_hitboxes(player)
	player.state = BlitzPlayer.State.NORMAL


# ------------------------------------------------------------
# 敌人出招真的能打到玩家
# ------------------------------------------------------------
func _check_enemy_attack_lands(player: BlitzPlayer, enemies: Array) -> void:
	print("-- 敌人出招真的能打到玩家 --")
	var striker: BlitzEnemy = _first_live_enemy(enemies)
	if striker == null:
		_ok("找到出招测试敌人", false)
		return

	player.state = BlitzPlayer.State.NORMAL
	player.block_aim_override = Vector2.ZERO
	player.invincible_timer = 0.0
	player.health = player.max_health
	player.velocity = Vector2.ZERO

	# 不靠 AI —— 手动驱动一个完整出招, 才可复现 (AI 的起手时机依赖距离和冷却)
	_prep_dummy(striker, player, Vector2(0.0, -34.0))
	striker.facing_dir = Vector2.DOWN
	striker.attack_phase = BlitzEnemy.AttackPhase.WINDUP
	striker._phase_timer = 0.03         # 两三帧后进 STRIKE

	var hp0: int = player.health
	for i: int in range(40):
		await get_tree().physics_frame
		if player.health < hp0:
			break
	_ok("敌人的挥砍打到了玩家 (bit2/bit3 与玩家 Hurtbox 都接上了)",
		player.health < hp0,
		"hp %d -> %d" % [hp0, player.health])
	player.invincible_timer = 0.0
	player.health = player.max_health


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


func _first_hitbox_size(player: BlitzPlayer) -> Vector2:
	for c: Node in player.get_children():
		if not (c is AttackHitbox):
			continue
		for g: Node in c.get_children():
			if g is CollisionShape2D and (g as CollisionShape2D).shape is RectangleShape2D:
				return ((g as CollisionShape2D).shape as RectangleShape2D).size
	return Vector2.ZERO
