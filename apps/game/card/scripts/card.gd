extends Control
## Card — 单张扑克牌组件
## 使用 _draw() 绘制牌面，支持正面/背面显示

@export var card_id: int = -1:
	set(v):
		card_id = v
		queue_redraw()

@export var face_up: bool = true:
	set(v):
		face_up = v
		queue_redraw()

const CARD_WIDTH: float = 70.0
const CARD_HEIGHT: float = 100.0
const CORNER_RADIUS: float = 6.0

func _ready() -> void:
	custom_minimum_size = Vector2(CARD_WIDTH, CARD_HEIGHT)
	queue_redraw()


func _draw() -> void:
	var size: Vector2 = get_size()

	if not face_up or card_id < 0:
		_draw_card_back(size)
	else:
		_draw_card_front(size)


func _draw_card_back(size: Vector2) -> void:
	var bg: Rect2 = Rect2(Vector2.ZERO, size)
	draw_rect(bg, Color(0.1, 0.15, 0.35), true, CORNER_RADIUS)

	draw_rect(bg, Color(0.3, 0.5, 0.8), false, CORNER_RADIUS, 1.5)

	var inner: Rect2 = Rect2(Vector2(3, 3), size - Vector2(6, 6))
	draw_rect(inner, Color(0.5, 0.7, 0.9), false, CORNER_RADIUS - 1, 1.0)

	var center: Vector2 = size / 2.0
	var diamond: PackedVector2Array = PackedVector2Array([
		center + Vector2(0, -18),
		center + Vector2(12, 0),
		center + Vector2(0, 18),
		center + Vector2(-12, 0),
	])
	draw_colored_polygon(diamond, Color(0.4, 0.6, 0.9, 0.6))

	var font: Font = ThemeDB.fallback_font
	draw_string(font, center - Vector2(10, 4), "PKR", HORIZONTAL_ALIGNMENT_CENTER, -1, 12, Color(0.7, 0.8, 1.0))


func _draw_card_front(size: Vector2) -> void:
	var rank_idx: int = CardDeck.get_rank_index(card_id)
	var suit: int = CardDeck.get_suit(card_id)
	var rank_str: String = CardDeck.RANK_NAMES[rank_idx]
	var suit_str: String = CardDeck.SUIT_NAMES[suit]
	var text_color: Color = CardDeck.get_suit_color(card_id)

	var bg: Rect2 = Rect2(Vector2.ZERO, size)
	draw_rect(bg, Color(0.98, 0.98, 0.98), true, CORNER_RADIUS)

	draw_rect(bg, Color(0.2, 0.2, 0.2), false, CORNER_RADIUS, 0.8)

	var font: Font = ThemeDB.fallback_font
	draw_string(font, Vector2(5, 5), rank_str, HORIZONTAL_ALIGNMENT_LEFT, -1, 14, text_color)
	draw_string(font, Vector2(5, 20), suit_str, HORIZONTAL_ALIGNMENT_LEFT, -1, 12, text_color)

	draw_string(font, Vector2(size.x - 5, size.y - 5), rank_str, HORIZONTAL_ALIGNMENT_RIGHT, -1, 14, text_color)
	draw_string(font, Vector2(size.x - 5, size.y - 20), suit_str, HORIZONTAL_ALIGNMENT_RIGHT, -1, 12, text_color)

	var center_suit: String = _get_center_suit_pattern(suit, rank_idx)
	draw_string(font, size / 2.0 + Vector2(0, 5), center_suit, HORIZONTAL_ALIGNMENT_CENTER, -1, 28, text_color)


func _get_center_suit_pattern(suit: int, _rank: int) -> String:
	var suits: Array[String] = ["♠", "♥", "♣", "♦"]
	return suits[suit]
