extends Node2D
## 茶杯头 Demo 主场景 — 关卡搭建 + 游戏管理 + UI 系统
##
## 📚 涉及学习文档:
##   godot-4-1-scene-tree       — 场景树: add_child/get_node 节点管理
##   godot-4-2-scene-instantiation — PackedScene.instantiate() 场景实例化
##   godot-5-1-input-map        — InputMap: 代码注册按键动作
##   godot-5-8-tween            — Tween: 分数弹出动画
##   godot-3-5-button-family    — Button: 死亡 UI 的 RESTART 按钮
##   godot-3-4-label-richtext   — Label: HUD 文字/分数显示
##   godot-3-3-container-nodes  — VBoxContainer/HBoxContainer 布局
##   godot-2-9-camera2d         — Camera2D: 跟随玩家/边界限制
##   godot-7-8-state-machines   — 状态管理: is_game_over 布尔状态
##   godot-1-8-signals-basics   — 信号: Button.pressed.connect()
##
## 🏗️ 碰撞层 Bit 分配 (全局统一):
##   Bit 0 = 玩家身体     Bit 3 = 敌人攻击 (预留)
##   Bit 1 = 敌人身体     Bit 4 = 墙壁/平台
##   Bit 2 = 玩家攻击     Bit 5 = 格挡对象
##                        Bit 6 = 终点
##                        Bit 7 = (预留)

# ============================================================
# 关卡尺寸常量
# ============================================================
const LEVEL_WIDTH: float = 3200.0
const LEVEL_HEIGHT: float = 720.0
const GROUND_Y: float = 670.0       ## 地面顶部的 Y 坐标
const GROUND_THICKNESS: float = 40.0

# ============================================================
# 预加载场景和脚本 (preload 在编译时加载,性能最优)
# ============================================================
var PlayerScene: PackedScene = preload("res://scenes/player.tscn")
var EnemyScene: PackedScene  = preload("res://scenes/enemy.tscn")
var AttackHitboxScene: PackedScene = preload("res://scenes/attack_hitbox.tscn")
var DrawableRect: Script     = preload("res://scripts/drawable_rect.gd")

# ============================================================
# 运行时引用
# ============================================================
var player: CharacterBody2D
var score: int = 0
var is_game_over: bool = false
var _goal_activated: bool = false

# UI 节点 (延迟初始化)
var _score_label: Label
var _health_container: HBoxContainer
var _game_over_panel: Control
var _dash_cooldown_bar: ColorRect

# 追踪所有格挡对象 (供调试/统计)
var _parry_objects: Array[Area2D] = []


# ============================================================
# 初始化 — Godot 场景的入口点
# ============================================================
func _ready() -> void:
	# 1. 先注册输入 (必须在任何 Input.is_action_xxx 调用之前)
	_setup_input_map()
	# 2. 搭建关卡 (平台/敌人/格挡对象)
	_build_level()
	# 3. 创建玩家 (从 .tscn 实例化)
	_create_player()
	# 4. UI 系统 (HUD/死亡面板/胜利面板)
	_create_ui()
	# 5. 操作说明
	_create_instructions()
	# 6. 背景色
	RenderingServer.set_default_clear_color(Color(0.06, 0.06, 0.14, 1.0))


# ── InputMap 注册 ──
# 在代码中动态注册按键动作,比 project.godot 的 Object 格式更可靠
# 详见 godot-5-1-input-map
func _setup_input_map() -> void:
	var actions: Dictionary = {
		"move_left":  [KEY_A, KEY_LEFT],
		"move_right": [KEY_D, KEY_RIGHT],
		"jump":       [KEY_SPACE, KEY_W, KEY_UP],
		"dash":       [KEY_SHIFT],
		"attack_light": [KEY_J],
		"attack_heavy": [KEY_K],
		"restart":    [KEY_R, KEY_ENTER],
	}
	for action_name: String in actions:
		if not InputMap.has_action(action_name):
			InputMap.add_action(action_name)
			for key: Key in actions[action_name]:
				var ev: InputEventKey = InputEventKey.new()
				ev.physical_keycode = key
				InputMap.action_add_event(action_name, ev)



# ============================================================
# 关卡搭建
# ============================================================

func _build_level() -> void:
	_create_starfield()
	_create_ground()
	_create_platforms()
	_create_parry_objects()
	_create_enemies()
	_create_boss()
	_create_goal()


# ── 星空背景 ──
func _create_starfield() -> void:
	var stars: Node2D = Node2D.new()
	stars.name = "Starfield"
	stars.z_index = -10
	stars.set_script(_starfield_script())
	add_child(stars)


# ── 地面 ──
func _create_ground() -> void:
	# 主地面 — StaticBody2D 是不动的物理体,玩家/敌人可站在上面
	_create_wall(
		Vector2(LEVEL_WIDTH / 2.0, GROUND_Y + GROUND_THICKNESS / 2.0),
		Vector2(LEVEL_WIDTH, GROUND_THICKNESS),
		Color(0.22, 0.18, 0.12)
	)
	# 草地装饰线
	var grass: Node2D = Node2D.new()
	grass.position = Vector2(0, GROUND_Y - 2)
	grass.set_script(_grass_line_script())
	add_child(grass)


# ── 浮动平台 ──
func _create_platforms() -> void:
	var platforms: Array[Dictionary] = [
		{ pos = Vector2(350, 510), size = Vector2(170, 16) },
		{ pos = Vector2(620, 420), size = Vector2(150, 16) },
		{ pos = Vector2(900, 480), size = Vector2(160, 16) },
		{ pos = Vector2(1250, 380), size = Vector2(180, 16) },
		{ pos = Vector2(1650, 470), size = Vector2(180, 16) },
		{ pos = Vector2(2000, 370), size = Vector2(200, 16) },
		{ pos = Vector2(2400, 450), size = Vector2(160, 16) },
		{ pos = Vector2(2700, 360), size = Vector2(170, 16) },
	]
	for p in platforms:
		_create_wall(p.pos, p.size, Color(0.35, 0.25, 0.15))


# ── 格挡对象 (粉色菱形) ──
func _create_parry_objects() -> void:
	var positions: Array[Vector2] = [
		Vector2(280, GROUND_Y - 60),
		Vector2(670, 370),
		Vector2(1300, 330),
		Vector2(1950, 320),
		Vector2(2750, 310),
	]
	for pos in positions:
		var obj: Area2D = _make_parry_object(pos)
		_parry_objects.append(obj)
		add_child(obj)


# ── 敌人 ──
func _create_enemies() -> void:
	# enemy_type: 0=PATROL, 1=STATIONARY, 2=CHASER
	_create_enemy(Vector2(450, GROUND_Y - 20), 0)
	_create_enemy(Vector2(750, GROUND_Y - 20), 0)
	_create_enemy(Vector2(1050, GROUND_Y - 20), 0)
	_create_enemy(Vector2(900, 440), 1)
	_create_enemy(Vector2(1650, 430), 1)
	_create_enemy(Vector2(1500, GROUND_Y - 20), 2)
	_create_enemy(Vector2(2100, GROUND_Y - 20), 2)
	_create_enemy(Vector2(2400, 410), 0)


# ── Boss ──
func _create_boss() -> void:
	var boss: CharacterBody2D = EnemyScene.instantiate()
	boss.position = Vector2(2950, GROUND_Y - 35)
	boss.name = "MiniBoss"
	boss.enemy_type = 0       # PATROL
	boss.move_speed = 100.0
	boss.patrol_range = 120.0
	boss.max_health = 8
	boss.score_value = 500
	add_child(boss)

	var hp_bar: Node2D = _create_hp_bar(boss)
	add_child(hp_bar)


# ── 终点 ──
func _create_goal() -> void:
	var flag: Area2D = Area2D.new()
	flag.name = "Goal"
	flag.position = Vector2(3100, GROUND_Y - 55)
	flag.collision_layer = 1 << 6
	flag.collision_mask  = 1 << 0   # 检测玩家
	flag.monitoring = false          # Boss 死后才激活
	var shape: CollisionShape2D = CollisionShape2D.new()
	var rect: RectangleShape2D = RectangleShape2D.new()
	rect.size = Vector2(40, 130)
	shape.shape = rect
	flag.add_child(shape)

	var visual: Node2D = Node2D.new()
	visual.set_script(_goal_visual_script())
	flag.add_child(visual)

	flag.body_entered.connect(func(_b): _on_goal_reached())
	add_child(flag)


# ============================================================
# 玩家创建 — 从 player.tscn 实例化
# ============================================================
func _create_player() -> void:
	# PackedScene.instantiate() 克隆场景中的所有节点
	# 比逐个 new() + add_child() 更简洁,且 Godot 编辑器可见
	player = PlayerScene.instantiate()
	player.name = "Player"
	player.position = Vector2(120, GROUND_Y - 40)
	# 注入攻击判定框引用 (player 需要它来生成近战攻击)
	player.attack_hitbox_scene = AttackHitboxScene
	add_child(player)

	# 摄像机跟随 — 作为 player 的子节点自动跟随
	var cam: Camera2D = Camera2D.new()
	cam.position_smoothing_enabled = true
	cam.position_smoothing_speed = 10.0
	cam.limit_left   = -50
	cam.limit_right  = int(LEVEL_WIDTH) + 50
	cam.limit_top    = -200
	cam.limit_bottom = int(LEVEL_HEIGHT)
	player.add_child(cam)


# ============================================================
# UI 系统
# ============================================================
func _create_ui() -> void:
	var ui: CanvasLayer = CanvasLayer.new()
	ui.name = "UI"
	ui.layer = 100
	add_child(ui)

	# 左上: 生命值 (红/灰方块)
	_health_container = HBoxContainer.new()
	_health_container.position = Vector2(24, 20)
	ui.add_child(_health_container)
	_update_health_display()

	# 右上: 分数
	_score_label = Label.new()
	_score_label.position = Vector2(1180, 20)
	_score_label.size = Vector2(80, 30)
	_score_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	_score_label.add_theme_font_size_override("font_size", 22)
	_score_label.add_theme_color_override("font_color", Color(1, 0.9, 0.3))
	_score_label.text = "⭐ 0"
	ui.add_child(_score_label)

	# 冲刺冷却条
	_dash_cooldown_bar = ColorRect.new()
	_dash_cooldown_bar.position = Vector2(24, 54)
	_dash_cooldown_bar.size = Vector2(100, 6)
	_dash_cooldown_bar.color = Color(0.2, 0.8, 1.0, 0.8)
	ui.add_child(_dash_cooldown_bar)

	# 死亡面板 (初始隐藏)
	_game_over_panel = _make_game_over_panel()
	_game_over_panel.hide()
	ui.add_child(_game_over_panel)

	# 胜利面板 (初始隐藏)
	var win_panel: Control = _make_win_panel()
	win_panel.name = "WinPanel"
	win_panel.hide()
	ui.add_child(win_panel)


# ── 操作说明 HUD ──
func _create_instructions() -> void:
	var ui: CanvasLayer = CanvasLayer.new()
	ui.layer = 100
	add_child(ui)

	var panel: Panel = Panel.new()
	panel.position = Vector2(24, LEVEL_HEIGHT - 70)
	panel.size = Vector2(600, 48)
	panel.modulate = Color(1, 1, 1, 0.7)
	ui.add_child(panel)

	var text: Label = Label.new()
	text.position = Vector2(36, LEVEL_HEIGHT - 64)
	text.text = "A/D 移动 | W/空格 跳跃 | Shift 闪避 | J 轻击 | K 重击 | 空中靠近🩷按跳 = 格挡"
	text.add_theme_font_size_override("font_size", 12)
	text.add_theme_color_override("font_color", Color(0.8, 0.8, 0.8))
	ui.add_child(text)


# ============================================================
# 游戏主循环
# ============================================================
func _process(_delta: float) -> void:
	if is_game_over:
		return

	_score_label.text = "⭐ %d" % score
	_update_health_display()

	# 冲刺冷却条
	if player and is_instance_valid(player):
		var cd_ratio: float = 1.0 - (player._dash_cooldown_timer / player.dash_cooldown)
		_dash_cooldown_bar.size.x = cd_ratio * 100.0
		_dash_cooldown_bar.color = Color(0.2, 0.8, 1.0, 0.8) if cd_ratio >= 1.0 else Color(0.5, 0.5, 0.5, 0.5)

	_check_boss_defeated()

	# 掉落死亡: 掉出关卡底部 80px 直接死
	if player and is_instance_valid(player) and player.position.y > LEVEL_HEIGHT + 80:
		player.take_damage(999)


# ============================================================
# 公开方法 (供 player/enemy 通过 current_scene 调用)
# ============================================================

## 加分 (由 enemy.die() 调用)
func add_score(amount: int) -> void:
	score += amount
	_pop_score_text(amount)


## 格挡回调 (由 player._perform_parry() 调用)
func on_player_parry(target: Area2D) -> void:
	if target and is_instance_valid(target):
		var pos: Vector2 = target.position
		target.queue_free()
		score += 150
		_pop_score_text(150, pos)
		_spawn_parry_fx(pos)


## 玩家死亡回调
func on_player_died() -> void:
	is_game_over = true
	_game_over_panel.show()


## 获取玩家引用 (由 enemy._get_player() 调用)
func get_player() -> Node2D:
	return player


# ============================================================
# 内部辅助 — 关卡构建
# ============================================================

## 创建一面墙/平台 (StaticBody2D + 碰撞形状 + 可视化矩形)
func _create_wall(pos: Vector2, size: Vector2, color: Color) -> void:
	var body: StaticBody2D = StaticBody2D.new()
	body.position = pos
	body.collision_layer = 1 << 4   # bit4: 墙壁层
	body.collision_mask  = 0        # 不检测任何东西

	var col_shape: CollisionShape2D = CollisionShape2D.new()
	var rect: RectangleShape2D = RectangleShape2D.new()
	rect.size = size
	col_shape.shape = rect
	body.add_child(col_shape)

	var visual: Node2D = Node2D.new()
	visual.set_script(DrawableRect)
	visual.rect_color = color
	visual.rect_size = size
	visual.border_color = color.lightened(0.15)
	visual.border_width = 1.5
	body.add_child(visual)

	add_child(body)


## 在指定位置创建一个敌人 (从 enemy.tscn 实例化)
## etype: 0=PATROL, 1=STATIONARY, 2=CHASER
func _create_enemy(pos: Vector2, etype: int) -> void:
	var enemy: CharacterBody2D = EnemyScene.instantiate()
	enemy.position = pos
	enemy.enemy_type = etype
	add_child(enemy)


## 创建一个格挡对象 (粉色发光菱形 Area2D)
func _make_parry_object(pos: Vector2) -> Area2D:
	var obj: Area2D = Area2D.new()
	obj.position = pos
	obj.collision_layer = 1 << 5   # bit5: 格挡对象
	obj.collision_mask  = 0
	obj.name = "ParryObject"

	var col_shape: CollisionShape2D = CollisionShape2D.new()
	var circle: CircleShape2D = CircleShape2D.new()
	circle.radius = 18.0
	col_shape.shape = circle
	obj.add_child(col_shape)

	var visual: Node2D = Node2D.new()
	visual.set_script(_parry_visual_script())
	obj.add_child(visual)

	return obj


func _create_hp_bar(target: Node2D) -> Node2D:
	var bar: Node2D = Node2D.new()
	bar.name = "HPBar"
	bar.set_script(_hp_bar_follow_script())
	bar.set_meta("target", target)
	return bar


# ============================================================
# 游戏结束 / 胜利
# ============================================================

## 游戏结束面板 — 半透明遮罩 + 居中卡片 + RESTART 按钮
func _make_game_over_panel() -> Control:
	# 全屏半透明黑色遮罩
	var overlay: ColorRect = ColorRect.new()
	overlay.color = Color(0, 0, 0, 0.7)
	overlay.size = Vector2(1280, 720)
	overlay.z_index = 200

	# 居中卡片
	var card: Panel = Panel.new()
	card.size = Vector2(400, 280)
	card.position = Vector2(440, 180)
	card.z_index = 201
	var card_style: StyleBoxFlat = StyleBoxFlat.new()
	card_style.bg_color = Color(0.08, 0.06, 0.06, 0.97)
	card_style.border_width_left   = 3
	card_style.border_width_right  = 3
	card_style.border_width_top    = 3
	card_style.border_width_bottom = 3
	card_style.border_color = Color(1, 0.15, 0.15, 0.8)
	card_style.corner_radius_top_left     = 16
	card_style.corner_radius_top_right    = 16
	card_style.corner_radius_bottom_left  = 16
	card_style.corner_radius_bottom_right = 16
	card.add_theme_stylebox_override("panel", card_style)

	var vbox: VBoxContainer = VBoxContainer.new()
	vbox.position = Vector2(0, 30)
	vbox.size = Vector2(400, 220)
	vbox.alignment = BoxContainer.ALIGNMENT_CENTER
	card.add_child(vbox)

	# YOU DIED 标题
	var title: Label = Label.new()
	title.text = "YOU DIED"
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	title.add_theme_font_size_override("font_size", 42)
	title.add_theme_color_override("font_color", Color(1, 0.15, 0.15))
	vbox.add_child(title)

	vbox.add_child(_make_spacer(10))

	# 最终分数
	var score_label: Label = Label.new()
	score_label.name = "FinalScore"
	score_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	score_label.add_theme_font_size_override("font_size", 20)
	score_label.add_theme_color_override("font_color", Color(1, 0.85, 0.2))
	score_label.text = "Score: 0"
	vbox.add_child(score_label)

	vbox.add_child(_make_spacer(24))

	# RESTART 按钮 — 使用 Godot 的 Button 控件
	var restart_btn: Button = Button.new()
	restart_btn.text = "RESTART"
	restart_btn.custom_minimum_size = Vector2(200, 50)
	restart_btn.add_theme_font_size_override("font_size", 20)

	var btn_style: StyleBoxFlat = StyleBoxFlat.new()
	btn_style.bg_color = Color(0.85, 0.15, 0.15, 1)
	btn_style.corner_radius_top_left     = 8
	btn_style.corner_radius_top_right    = 8
	btn_style.corner_radius_bottom_left  = 8
	btn_style.corner_radius_bottom_right = 8
	restart_btn.add_theme_stylebox_override("normal", btn_style)

	var btn_hover: StyleBoxFlat = StyleBoxFlat.new()
	btn_hover.bg_color = Color(1, 0.25, 0.25, 1)
	btn_hover.corner_radius_top_left     = 8
	btn_hover.corner_radius_top_right    = 8
	btn_hover.corner_radius_bottom_left  = 8
	btn_hover.corner_radius_bottom_right = 8
	restart_btn.add_theme_stylebox_override("hover", btn_hover)

	restart_btn.add_theme_color_override("font_color", Color.WHITE)
	restart_btn.pressed.connect(_on_restart_pressed)
	vbox.add_child(restart_btn)

	vbox.add_child(_make_spacer(10))

	var hint: Label = Label.new()
	hint.text = "or press R"
	hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	hint.add_theme_font_size_override("font_size", 13)
	hint.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5))
	vbox.add_child(hint)

	overlay.add_child(card)
	overlay.set_meta("score_label", score_label)
	overlay.set_meta("card", card)

	return overlay


## 重新开始
func _on_restart_pressed() -> void:
	get_tree().reload_current_scene()


## 胜利面板
func _make_win_panel() -> Control:
	var panel: Panel = Panel.new()
	panel.size = Vector2(400, 240)
	panel.position = Vector2(440, 210)
	panel.z_index = 200
	panel.modulate = Color(0.05, 0.12, 0.08, 0.95)

	var vbox: VBoxContainer = VBoxContainer.new()
	vbox.position = Vector2(40, 30)
	vbox.size = Vector2(320, 180)
	panel.add_child(vbox)

	var title: Label = Label.new()
	title.text = "🏆 关卡通过!"
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	title.add_theme_font_size_override("font_size", 28)
	title.add_theme_color_override("font_color", Color(0.3, 1, 0.5))
	vbox.add_child(title)

	vbox.add_child(_make_spacer(12))

	var score_label: Label = Label.new()
	score_label.name = "WinScore"
	score_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	score_label.add_theme_font_size_override("font_size", 18)
	score_label.add_theme_color_override("font_color", Color(1, 0.9, 0.3))
	vbox.add_child(score_label)
	panel.set_meta("score_label", score_label)

	vbox.add_child(_make_spacer(16))

	var restart: Label = Label.new()
	restart.text = "按 R 键重新开始"
	restart.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	restart.add_theme_font_size_override("font_size", 14)
	restart.add_theme_color_override("font_color", Color(0.7, 0.7, 0.7))
	vbox.add_child(restart)

	return panel


func _on_goal_reached() -> void:
	if is_game_over:
		return
	is_game_over = true
	var win: Control = get_node_or_null("UI/WinPanel") as Control
	if win:
		var sl: Label = win.get_meta("score_label") as Label
		if sl:
			sl.text = "最终得分: ⭐ %d" % score
		win.show()


func _check_boss_defeated() -> void:
	if _goal_activated:
		return
	var boss: Node = get_node_or_null("MiniBoss")
	if boss == null or not is_instance_valid(boss):
		_goal_activated = true
		var goal: Node = get_node_or_null("Goal")
		if goal:
			goal.visible = true
			goal.monitoring = true


# ── 键盘重启 (R 键) ──
func _input(event: InputEvent) -> void:
	if is_game_over and Input.is_action_just_pressed("restart"):
		get_tree().reload_current_scene()


# ============================================================
# UI 更新
# ============================================================

func _update_health_display() -> void:
	for c in _health_container.get_children():
		c.queue_free()

	if not player or not is_instance_valid(player):
		return

	for i in range(player.max_health):
		var heart: ColorRect = ColorRect.new()
		heart.size = Vector2(22, 22)
		heart.color = Color(1, 0.2, 0.2) if i < player.health else Color(0.3, 0.3, 0.3)
		_health_container.add_child(heart)
		if i < player.max_health - 1:
			var spacer: Control = Control.new()
			spacer.size = Vector2(4, 0)
			_health_container.add_child(spacer)

	if _game_over_panel:
		var sl: Label = _game_over_panel.get_meta("score_label") as Label
		if sl:
			sl.text = "Score: %d" % score


## 分数弹出动画 (Tween)
func _pop_score_text(amount: int, at_pos: Vector2 = Vector2.ZERO) -> void:
	var label: Label = Label.new()
	label.text = "+%d" % amount
	label.add_theme_font_size_override("font_size", 16)
	label.add_theme_color_override("font_color", Color(1, 0.9, 0.2))
	if at_pos == Vector2.ZERO:
		at_pos = player.position + Vector2(0, -40) if player and is_instance_valid(player) else Vector2(640, 300)
	label.position = at_pos - Vector2(20, 0)
	label.z_index = 50
	add_child(label)

	# Tween 动画: 文字上浮 + 渐隐
	var tween: Tween = create_tween()
	tween.tween_property(label, "position:y", at_pos.y - 50, 0.6)
	tween.parallel().tween_property(label, "modulate:a", 0.0, 0.6)
	tween.finished.connect(label.queue_free)


func _spawn_parry_fx(pos: Vector2) -> void:
	var fx: Node2D = Node2D.new()
	fx.position = pos
	fx.z_index = 20
	fx.set_script(_parry_fx_script())
	add_child(fx)
	get_tree().create_timer(0.5).timeout.connect(fx.queue_free)


func _make_spacer(h: float) -> Control:
	var s: Control = Control.new()
	s.size = Vector2(0, h)
	return s


# ============================================================
# 动态特效脚本 (运行时编译的 GDScript)
# 这些脚本只在这个关卡使用,不像 player.gd 那样需要复用
# 所以用 GDScript.new() + source_code 的方式"内联"创建
# ============================================================

func _starfield_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D
var _stars: Array = []
func _ready():
	for _i in range(80):
		_stars.append({
			x = randf_range(0, 3200),
			y = randf_range(0, 660),
			r = randf_range(0.5, 2.0),
			speed = randf_range(0.2, 1.0),
			brightness = randf_range(0.3, 1.0),
		})
func _draw():
	for star in _stars:
		var c: Color = Color(1, 1, 1, star.brightness * (0.5 + 0.5 * sin(Time.get_ticks_msec() * 0.001 * star.speed)))
		draw_circle(Vector2(star.x, star.y), star.r, c)
"""
	s.reload()
	return s


func _grass_line_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D
func _draw():
	for x in range(0, 3200, 8):
		var h: float = randf_range(4.0, 10.0)
		draw_line(Vector2(x, 0), Vector2(x, -h), Color(0.25, 0.5, 0.15, 0.6), 2.0)
"""
	s.reload()
	return s


func _parry_visual_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D
var _t: float = 0.0
func _process(delta):
	_t += delta
	queue_redraw()
func _draw():
	var pulse: float = 1.0 + sin(_t * 5.0) * 0.25
	draw_circle(Vector2.ZERO, 18 * pulse, Color(1.0, 0.25, 0.65, 0.25))
	draw_circle(Vector2.ZERO, 12 * pulse, Color(1.0, 0.3, 0.65, 0.6))
	var sz: float = 8.0 * pulse
	var pts: PackedVector2Array = PackedVector2Array([
		Vector2(0, -sz), Vector2(sz * 0.7, 0),
		Vector2(0, sz), Vector2(-sz * 0.7, 0)
	])
	draw_polygon(pts, [Color(1, 0.45, 0.75, 0.8)])
	draw_circle(Vector2.ZERO, 3, Color(1, 0.8, 0.9, 0.9))
"""
	s.reload()
	return s


func _parry_fx_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D
var _t: float = 0.0
func _process(delta):
	_t += delta
	queue_redraw()
	if _t > 0.5: queue_free()
func _draw():
	var r: float = _t / 0.5
	for i in range(8):
		var angle: float = float(i) / 8.0 * TAU
		var dist: float = lerp(0.0, 40.0, r)
		draw_circle(Vector2(cos(angle), sin(angle)) * dist,
			lerp(6.0, 1.0, r), Color(1, 0.4, 0.8, 1.0 - r))
"""
	s.reload()
	return s


func _goal_visual_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D
var _t: float = 0.0
func _process(delta):
	_t += delta
	queue_redraw()
func _draw():
	draw_rect(Rect2(-2, -90, 4, 90), Color(0.8, 0.8, 0.5))
	var wave: float = sin(_t * 3.0) * 4.0
	var flag_pts: PackedVector2Array = PackedVector2Array([
		Vector2(0, -85), Vector2(30 + wave, -70),
		Vector2(25 + wave * 0.5, -55), Vector2(0, -50)
	])
	draw_polygon(flag_pts, [Color(0.2, 0.8, 0.3, 0.9)])
	draw_circle(Vector2(15, -60), 20 + sin(_t * 2.0) * 5, Color(1, 1, 0.3, 0.2))
"""
	s.reload()
	return s


func _hp_bar_follow_script() -> Script:
	var s: GDScript = GDScript.new()
	s.source_code = """extends Node2D

func _process(_delta):
	var raw = get_meta("target")
	if not raw or not is_instance_valid(raw):
		queue_free()
		return
	var target: Node2D = raw
	position = target.position + Vector2(0, -40)
	queue_redraw()

func _draw():
	var raw = get_meta("target")
	if not is_instance_valid(raw):
		return
	var target: Node2D = raw
	var max_hp: int = target.get("max_health") if target.get("max_health") != null else 5
	var hp: int = target.get("health") if target.get("health") != null else 0
	var ratio: float = float(hp) / float(max_hp)
	var w: float = 50.0
	draw_rect(Rect2(-w/2, 0, w, 6), Color(0.2, 0.2, 0.2, 0.8))
	var c: Color = Color.RED if ratio > 0.5 else Color.ORANGE if ratio > 0.25 else Color.YELLOW
	draw_rect(Rect2(-w/2, 0, w * ratio, 6), c)
"""
	s.reload()
	return s
