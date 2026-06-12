extends Control
## PlayerSpot — 牌桌上每个玩家的座位
## 显示玩家头像、名字、筹码、底牌和状态

@export var player_id: int = 0

var _name_label: Label
var _chips_label: Label
var _status_label: Label
var _card1: Control
var _card2: Control
var _dealer_marker: Label
var _bet_label: Label
var _highlight: ColorRect


func _ready() -> void:
	setup_ui()


func setup_ui() -> void:
	custom_minimum_size = Vector2(150, 140)

	_highlight = ColorRect.new()
	_highlight.size = custom_minimum_size
	_highlight.color = Color(1.0, 0.84, 0.0, 0.15)
	_highlight.visible = false
	add_child(_highlight)

	_dealer_marker = Label.new()
	_dealer_marker.text = "D"
	_dealer_marker.add_theme_color_override("font_color", Color.WHITE)
	_dealer_marker.add_theme_font_size_override("font_size", 11)
	_dealer_marker.position = Vector2(2, 2)
	_dealer_marker.visible = false
	add_child(_dealer_marker)

	_name_label = Label.new()
	_name_label.add_theme_color_override("font_color", Color.WHITE)
	_name_label.add_theme_font_size_override("font_size", 13)
	_name_label.position = Vector2(20, 2)
	add_child(_name_label)

	_chips_label = Label.new()
	_chips_label.add_theme_color_override("font_color", Color(1.0, 0.84, 0.0))
	_chips_label.add_theme_font_size_override("font_size", 11)
	_chips_label.position = Vector2(20, 18)
	add_child(_chips_label)

	_status_label = Label.new()
	_status_label.add_theme_color_override("font_color", Color(1.0, 0.5, 0.5))
	_status_label.add_theme_font_size_override("font_size", 11)
	_status_label.position = Vector2(2, 34)
	_status_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	add_child(_status_label)

	_bet_label = Label.new()
	_bet_label.add_theme_color_override("font_color", Color(0.0, 0.9, 0.5))
	_bet_label.add_theme_font_size_override("font_size", 12)
	_bet_label.position = Vector2(0, 110)
	_bet_label.size = Vector2(150, 20)
	_bet_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	add_child(_bet_label)


func set_card_nodes(c1: Control, c2: Control) -> void:
	_card1 = c1
	_card2 = c2
	if _card1:
		add_child(_card1)
	if _card2:
		add_child(_card2)


func update_display(player: Object, is_dealer: bool, is_current: bool, show_cards: bool) -> void:
	_name_label.text = player.name
	_chips_label.text = "💰 " + str(player.chips)
	_dealer_marker.visible = is_dealer
	_highlight.visible = is_current

	# 状态
	var status: int = player.status
	match status:
		GameController.PlayerStatus.FOLDED:
			_status_label.text = "弃牌"
			_status_label.visible = true
		GameController.PlayerStatus.ALL_IN:
			_status_label.text = "ALL IN!"
			_status_label.visible = true
		GameController.PlayerStatus.OUT:
			_status_label.text = "淘汰"
			_status_label.visible = true
		_:
			_status_label.text = ""
			_status_label.visible = false

	# 下注
	var bet: int = player.current_bet
	if bet > 0:
		_bet_label.text = "下注: " + str(bet)
		_bet_label.visible = true
	else:
		_bet_label.visible = false

	# 手牌
	if _card1 and _card2:
		_card1.visible = true
		_card2.visible = true

		var cards: Array = player.hole_cards
		if cards.size() >= 2:
			var human: bool = player.is_human
			if show_cards or human:
				_card1.face_up = true
				_card1.card_id = cards[0]
				_card2.face_up = true
				_card2.card_id = cards[1]
			else:
				_card1.face_up = false
				_card1.card_id = -1
				_card2.face_up = false
				_card2.card_id = -1
		else:
			_card1.visible = false
			_card2.visible = false

	# 弃牌变灰
	var folded_out: bool = (status == GameController.PlayerStatus.FOLDED or status == GameController.PlayerStatus.OUT)
	modulate = Color(0.5, 0.5, 0.5) if folded_out else Color.WHITE
