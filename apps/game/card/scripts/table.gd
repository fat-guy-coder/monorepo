extends Control
## Table — 主牌桌场景
## 绘制牌桌、管理所有玩家座位、社区牌、操作按钮

const CardScript: Script = preload("res://scripts/card.gd")
const PlayerSpotScript: Script = preload("res://scripts/player_spot.gd")

var _table_area: Control
var _community_container: HBoxContainer
var _community_cards: Array[Control] = []
var _player_spots: Array[Control] = []
var _player_card_nodes: Array[Array] = []

var _action_panel: Panel
var _btn_fold: Button
var _btn_check: Button
var _btn_call: Button
var _btn_raise: Button
var _btn_all_in: Button
var _raise_slider: HSlider
var _raise_label: Label

var _pot_label: Label
var _phase_label: Label
var _message_label: Label
var _message_history: RichTextLabel

var _setup_panel: Panel
var _bot_count_slider: HSlider
var _bot_count_label: Label
var _btn_start: Button


func _ready() -> void:
	GameController.game_started.connect(_on_game_started)
	GameController.phase_changed.connect(_on_phase_changed)
	GameController.cards_dealt.connect(_on_cards_dealt)
	GameController.community_updated.connect(_on_community_updated)
	GameController.betting_round_started.connect(_on_betting_round_started)
	GameController.player_acted.connect(_on_player_acted)
	GameController.pot_updated.connect(_on_pot_updated)
	GameController.showdown_complete.connect(_on_showdown_complete)
	GameController.game_message.connect(_on_game_message)

	_create_setup_ui()
	_create_table_ui()
	_create_action_panel()
	_create_message_area()


# ==== 设置界面 ====

func _create_setup_ui() -> void:
	_setup_panel = Panel.new()
	_setup_panel.size = Vector2(350, 220)
	var screen_center: Vector2 = get_viewport_rect().size / 2.0
	_setup_panel.position = screen_center - Vector2(175, 200)
	_setup_panel.z_index = 10

	var style: StyleBoxFlat = StyleBoxFlat.new()
	style.bg_color = Color(0.1, 0.12, 0.2, 0.95)
	style.set_corner_radius_all(12)
	style.border_width_left = 1
	style.border_color = Color(0.0, 0.8, 1.0)
	_setup_panel.add_theme_stylebox_override("panel", style)
	add_child(_setup_panel)

	var vbox: VBoxContainer = VBoxContainer.new()
	vbox.position = Vector2(20, 20)
	vbox.size = Vector2(310, 180)
	vbox.add_theme_constant_override("separation", 12)
	_setup_panel.add_child(vbox)

	var title: Label = Label.new()
	title.text = "🎴 德州扑克"
	title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	title.add_theme_color_override("font_color", Color(0.0, 1.0, 1.0))
	title.add_theme_font_size_override("font_size", 22)
	vbox.add_child(title)

	var spacer1: Control = Control.new()
	spacer1.custom_minimum_size = Vector2(0, 8)
	vbox.add_child(spacer1)

	var bot_hbox: HBoxContainer = HBoxContainer.new()
	vbox.add_child(bot_hbox)

	var bot_label: Label = Label.new()
	bot_label.text = "Bot 数量:"
	bot_label.add_theme_color_override("font_color", Color.WHITE)
	bot_label.add_theme_font_size_override("font_size", 14)
	bot_hbox.add_child(bot_label)

	_bot_count_slider = HSlider.new()
	_bot_count_slider.min_value = 1
	_bot_count_slider.max_value = 8
	_bot_count_slider.value = 4
	_bot_count_slider.step = 1
	_bot_count_slider.custom_minimum_size = Vector2(150, 0)
	bot_hbox.add_child(_bot_count_slider)

	_bot_count_label = Label.new()
	_bot_count_label.text = "4"
	_bot_count_label.add_theme_color_override("font_color", Color(1.0, 0.84, 0.0))
	_bot_count_label.add_theme_font_size_override("font_size", 16)
	bot_hbox.add_child(_bot_count_label)

	_bot_count_slider.value_changed.connect(func(v: float):
		_bot_count_label.text = str(int(v))
	)

	var spacer2: Control = Control.new()
	spacer2.custom_minimum_size = Vector2(0, 8)
	vbox.add_child(spacer2)

	_btn_start = Button.new()
	_btn_start.text = "开始游戏"
	_btn_start.custom_minimum_size = Vector2(0, 40)
	_btn_start.add_theme_font_size_override("font_size", 16)

	var btn_style: StyleBoxFlat = StyleBoxFlat.new()
	btn_style.bg_color = Color(0.0, 0.7, 0.3)
	btn_style.set_corner_radius_all(8)
	_btn_start.add_theme_stylebox_override("normal", btn_style)

	var btn_hover: StyleBoxFlat = StyleBoxFlat.new()
	btn_hover.bg_color = Color(0.0, 0.9, 0.4)
	btn_hover.set_corner_radius_all(8)
	_btn_start.add_theme_stylebox_override("hover", btn_hover)

	_btn_start.pressed.connect(_on_start_game)
	vbox.add_child(_btn_start)

	var hint: Label = Label.new()
	hint.text = "设定 Bot 人数后开始游戏"
	hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	hint.add_theme_color_override("font_color", Color(0.5, 0.5, 0.5))
	hint.add_theme_font_size_override("font_size", 11)
	vbox.add_child(hint)


# ==== 牌桌 ====

func _create_table_ui() -> void:
	_table_area = Control.new()
	_table_area.size = get_viewport_rect().size
	add_child(_table_area)

	var table_bg: Panel = Panel.new()
	table_bg.size = Vector2(800, 420)
	table_bg.position = Vector2(get_viewport_rect().size / 2.0 - Vector2(400, 250))
	var table_style: StyleBoxFlat = StyleBoxFlat.new()
	table_style.bg_color = Color(0.12, 0.42, 0.18)
	table_style.set_corner_radius_all(20)
	table_style.border_width_left = 3
	table_style.border_width_right = 3
	table_style.border_width_top = 3
	table_style.border_width_bottom = 3
	table_style.border_color = Color(0.3, 0.2, 0.1)
	table_bg.add_theme_stylebox_override("panel", table_style)
	_table_area.add_child(table_bg)

	# 公牌区域
	_community_container = HBoxContainer.new()
	_community_container.add_theme_constant_override("separation", 6)
	_community_container.position = Vector2(table_bg.position.x + 150, table_bg.position.y + 140)
	_table_area.add_child(_community_container)

	for i in range(5):
		var card: Control = _create_card_node()
		card.face_up = false
		card.card_id = -1
		card.visible = false
		_community_cards.append(card)
		_community_container.add_child(card)

	# 底池显示
	_pot_label = Label.new()
	_pot_label.position = Vector2(table_bg.position.x + 300, table_bg.position.y + 250)
	_pot_label.size = Vector2(200, 30)
	_pot_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_pot_label.add_theme_color_override("font_color", Color(1.0, 0.84, 0.0))
	_pot_label.add_theme_font_size_override("font_size", 16)
	_pot_label.text = "底池: 0"
	_table_area.add_child(_pot_label)

	# 阶段显示
	_phase_label = Label.new()
	_phase_label.position = Vector2(table_bg.position.x + 300, table_bg.position.y + 275)
	_phase_label.size = Vector2(200, 24)
	_phase_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_phase_label.add_theme_color_override("font_color", Color(0.0, 1.0, 1.0))
	_phase_label.add_theme_font_size_override("font_size", 14)
	_phase_label.text = ""
	_table_area.add_child(_phase_label)

	_table_area.visible = false


func _create_card_node() -> Control:
	var card: Control = Control.new()
	card.set_script(CardScript)
	card.size = Vector2(70, 100)
	card.card_id = -1
	card.face_up = false
	return card


# ==== 玩家座位 ====

func _create_player_spots() -> void:
	for spot: Control in _player_spots:
		if spot.get_parent():
			spot.get_parent().remove_child(spot)
		spot.queue_free()
	_player_spots.clear()
	_player_card_nodes.clear()

	var total: int = GameController.players.size()
	var screen_size: Vector2 = get_viewport_rect().size
	var cx: float = screen_size.x / 2.0
	var cy: float = screen_size.y / 2.0

	for i: int in range(total):
		var spot: Control = Control.new()
		spot.set_script(PlayerSpotScript)
		spot.player_id = i
		spot.custom_minimum_size = Vector2(180, 130)

		var p = GameController.players[i]

		if p.is_human:
			spot.position = Vector2(cx - 90, screen_size.y - 160)
		else:
			var bot_idx: int = i - 1
			var bot_count: int = total - 1

			if bot_count <= 3:
				var spacing: float = 180.0
				var start_x: float = cx - (bot_count - 1) * spacing / 2.0
				spot.position = Vector2(start_x + bot_idx * spacing - 90, 20)
			elif bot_count <= 5:
				if bot_idx == 0:
					spot.position = Vector2(cx - 90, 20)
				elif bot_idx <= 2:
					var sx: float = cx + 160.0 + (bot_idx - 1) * 160.0
					spot.position = Vector2(sx - 90, 40)
				else:
					var sx: float = cx - 160.0 - (bot_idx - 3) * 160.0
					spot.position = Vector2(sx - 90, 40)
			else:
				var row: int = bot_idx / 4
				var col: int = bot_idx % 4
				var row_bots: int = int(min(4, bot_count - row * 4))
				var spacing: float = 180.0
				var start_x: float = cx - (row_bots - 1) * spacing / 2.0
				var y: float = 20.0 + row * 120.0
				spot.position = Vector2(start_x + col * spacing - 90, y)

		_table_area.add_child(spot)
		_player_spots.append(spot)

		var c1: Control = _create_card_node()
		c1.position = Vector2(2, 14)
		c1.size = Vector2(60, 86)
		var c2: Control = _create_card_node()
		c2.position = Vector2(40, 14)
		c2.size = Vector2(60, 86)

		if p.is_human:
			c1.position = Vector2(18, 22)
			c2.position = Vector2(78, 22)

		spot.set_card_nodes(c1, c2)
		_player_card_nodes.append([c1, c2])


# ==== 操作面板 ====

func _create_action_panel() -> void:
	_action_panel = Panel.new()
	_action_panel.size = Vector2(500, 56)
	_action_panel.position = Vector2(get_viewport_rect().size.x / 2.0 - 250, get_viewport_rect().size.y - 52)

	var style: StyleBoxFlat = StyleBoxFlat.new()
	style.bg_color = Color(0.08, 0.10, 0.18, 0.9)
	style.set_corner_radius_all(8)
	style.border_width_left = 1
	style.border_color = Color(0.2, 0.3, 0.5)
	_action_panel.add_theme_stylebox_override("panel", style)
	add_child(_action_panel)

	var hbox: HBoxContainer = HBoxContainer.new()
	hbox.position = Vector2(10, 10)
	hbox.add_theme_constant_override("separation", 8)
	_action_panel.add_child(hbox)

	_btn_fold = _make_action_button("弃牌", Color(0.7, 0.2, 0.2))
	_btn_check = _make_action_button("看牌", Color(0.2, 0.5, 0.7))
	_btn_call = _make_action_button("跟注", Color(0.2, 0.6, 0.3))
	_btn_raise = _make_action_button("加注", Color(0.7, 0.5, 0.1))
	_btn_all_in = _make_action_button("全押!", Color(0.8, 0.1, 0.1))

	for btn: Button in [_btn_fold, _btn_check, _btn_call, _btn_raise, _btn_all_in]:
		hbox.add_child(btn)

	var raise_vbox: VBoxContainer = VBoxContainer.new()
	hbox.add_child(raise_vbox)

	_raise_label = Label.new()
	_raise_label.text = "0"
	_raise_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_raise_label.add_theme_color_override("font_color", Color(1.0, 1.0, 0.0))
	_raise_label.add_theme_font_size_override("font_size", 10)
	raise_vbox.add_child(_raise_label)

	_raise_slider = HSlider.new()
	_raise_slider.custom_minimum_size = Vector2(80, 0)
	_raise_slider.step = 10
	raise_vbox.add_child(_raise_slider)

	_raise_slider.value_changed.connect(func(v: float):
		_raise_label.text = str(int(v))
		_btn_raise.text = "加注 " + str(int(v))
	)

	_btn_fold.pressed.connect(func(): GameController.human_fold())
	_btn_check.pressed.connect(func(): GameController.human_check())
	_btn_call.pressed.connect(func(): GameController.human_call())
	_btn_raise.pressed.connect(func(): GameController.human_raise(int(_raise_slider.value)))
	_btn_all_in.pressed.connect(func(): GameController.human_all_in())

	_action_panel.visible = false


func _make_action_button(text: String, color: Color) -> Button:
	var btn: Button = Button.new()
	btn.text = text
	btn.custom_minimum_size = Vector2(70, 36)
	btn.add_theme_font_size_override("font_size", 13)

	var normal: StyleBoxFlat = StyleBoxFlat.new()
	normal.bg_color = color
	normal.set_corner_radius_all(6)
	btn.add_theme_stylebox_override("normal", normal)

	var hover: StyleBoxFlat = StyleBoxFlat.new()
	hover.bg_color = color.lightened(0.2)
	hover.set_corner_radius_all(6)
	btn.add_theme_stylebox_override("hover", hover)

	var disabled: StyleBoxFlat = StyleBoxFlat.new()
	disabled.bg_color = Color(0.2, 0.2, 0.2)
	disabled.set_corner_radius_all(6)
	btn.add_theme_stylebox_override("disabled", disabled)

	return btn


# ==== 消息区域 ====

func _create_message_area() -> void:
	_message_label = Label.new()
	_message_label.position = Vector2(10, 10)
	_message_label.size = Vector2(400, 24)
	_message_label.add_theme_color_override("font_color", Color(1.0, 1.0, 1.0))
	_message_label.add_theme_font_size_override("font_size", 13)
	_message_label.text = ""
	add_child(_message_label)

	_message_history = RichTextLabel.new()
	_message_history.position = Vector2(10, 34)
	_message_history.size = Vector2(350, 80)
	_message_history.bbcode_enabled = true
	_message_history.fit_content = true
	_message_history.add_theme_font_size_override("normal_font_size", 10)
	add_child(_message_history)


# ==== 信号响应 ====

func _on_start_game() -> void:
	var bot_count: int = int(_bot_count_slider.value)
	GameController.bot_count = bot_count
	_setup_panel.visible = false
	_setup_panel.queue_free()
	GameController.start_game(bot_count)


func _on_game_started() -> void:
	_table_area.visible = true
	_create_player_spots()
	_message_history.clear()


func _on_cards_dealt() -> void:
	_refresh_all_spots()
	_update_action_buttons()


func _on_community_updated() -> void:
	for i: int in range(GameController.community_cards.size()):
		_community_cards[i].card_id = GameController.community_cards[i]
		_community_cards[i].face_up = true
		_community_cards[i].visible = true
	for i: int in range(GameController.community_cards.size(), 5):
		_community_cards[i].visible = false
	_refresh_all_spots()


func _on_betting_round_started() -> void:
	_update_action_buttons()


func _on_phase_changed(phase: int) -> void:
	var names: Array[String] = ["等待", "翻牌前", "翻牌", "转牌", "河牌", "摊牌", "局结束"]
	if phase < names.size():
		_phase_label.text = names[phase]

	if phase == GameController.Phase.SHOWDOWN:
		for i: int in range(_player_spots.size()):
			_refresh_spot(i, false, true)
		_action_panel.visible = false
	elif phase == GameController.Phase.ROUND_OVER or phase == GameController.Phase.WAITING:
		_action_panel.visible = false


func _on_player_acted(player_id: int, _action: String, _amount: int) -> void:
	_refresh_spot(player_id, true)


func _on_pot_updated(pot: int) -> void:
	_pot_label.text = "底池: " + str(pot)


func _on_showdown_complete(winners: Array) -> void:
	for i: int in range(_player_spots.size()):
		var p = GameController.players[i]
		if winners.has(p):
			var spot: Control = _player_spots[i]
			var tween: Tween = create_tween()
			tween.tween_property(spot, "modulate", Color(1.0, 0.84, 0.0), 0.3)
			tween.tween_property(spot, "modulate", Color.WHITE, 0.3)
			tween.set_loops(3)
		_refresh_spot(i, false, true)


func _on_game_message(msg: String) -> void:
	_message_label.text = msg
	_message_history.append_text("[color=#aaa]" + msg + "[/color]\n")


# ==== 辅助 ====

func _refresh_all_spots() -> void:
	for i: int in range(_player_spots.size()):
		_refresh_spot(i, false)


func _refresh_spot(i: int, _is_current: bool = false, force_show: bool = false) -> void:
	if i >= _player_spots.size():
		return
	var spot: Control = _player_spots[i]
	var p = GameController.players[i]
	var is_dealer: bool = (i == GameController.dealer_index)
	var is_current: bool = (i == GameController.current_player_index)
	var show: bool = force_show or (GameController.current_phase == GameController.Phase.SHOWDOWN)
	spot.update_display(p, is_dealer, is_current, show)


func _update_action_buttons() -> void:
	var human_idx: int = -1
	for i: int in range(GameController.players.size()):
		if GameController.players[i].is_human:
			human_idx = i
			break

	var is_human_turn: bool = (human_idx >= 0 and GameController.current_player_index == human_idx)
	var human = GameController.players[human_idx] if human_idx >= 0 else null
	var human_active: bool = human != null and human.status == GameController.PlayerStatus.ACTIVE

	_action_panel.visible = is_human_turn and human_active

	if not _action_panel.visible:
		return

	var actions: Dictionary = GameController.get_available_actions()

	_btn_fold.visible = actions["can_fold"]
	_btn_fold.disabled = not actions["can_fold"]

	_btn_check.visible = actions["can_check"]
	_btn_check.disabled = not actions["can_check"]

	_btn_call.visible = actions["can_call"]
	_btn_call.disabled = not actions["can_call"]
	if actions["can_call"]:
		_btn_call.text = "跟注 " + str(actions["call_amount"])

	_btn_raise.visible = actions["can_raise"]
	_btn_raise.disabled = not actions["can_raise"]

	_btn_all_in.visible = actions["can_all_in"]
	_btn_all_in.disabled = not actions["can_all_in"]

	if actions["can_raise"]:
		var min_r: int = actions["min_raise_to"]
		var max_r: int = human.current_bet + human.chips
		_raise_slider.min_value = min_r
		_raise_slider.max_value = int(max(max_r, min_r + 10))
		_raise_slider.value = min_r
		_raise_label.text = str(min_r)
		_btn_raise.text = "加注 " + str(min_r)
	else:
		_raise_slider.visible = false
		_raise_label.visible = false
