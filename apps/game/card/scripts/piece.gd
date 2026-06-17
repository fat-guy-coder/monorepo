extends Node2D
class_name Piece
## 自走棋棋子——显示为彩色方块+文字

signal piece_killed(piece: Piece)

var data: PieceData
var team: int = 0           # 0=己方, 1=敌方
var star_level: int = 1     # 星级（1/2/3）
var current_health: int
var board_pos: Vector2i

@onready var color_rect: ColorRect = $ColorRect
@onready var name_label: Label = $NameLabel
@onready var hp_bar: ColorRect = $HpBar
@onready var hp_bar_bg: ColorRect = $HpBarBg
@onready var star_label: Label = $StarLabel

func setup(piece_data: PieceData, team_id: int) -> void:
	data = piece_data
	team = team_id
	current_health = data.max_health * star_level
	_update_display()

func _ready() -> void:
	_update_display()

func _update_display() -> void:
	if not data: return
	var base_color := data.icon_color
	if team == 1:  # 敌方加红色调
		base_color = base_color.lerp(Color.RED, 0.3)
	color_rect.color = base_color
	name_label.text = data.display_name
	name_label.add_theme_color_override("font_color", Color.WHITE if team == 0 else Color.RED)
	star_label.text = "★" if star_level == 1 else ("★★" if star_level == 2 else "★★★")
	_update_hp_bar()

func _update_hp_bar() -> void:
	var ratio: float = float(current_health) / float(data.max_health * star_level)
	hp_bar.size.x = hp_bar_bg.size.x * clampf(ratio, 0.0, 1.0)

func take_damage(amount: int) -> void:
	current_health -= amount
	_update_hp_bar()
	# 受伤闪烁
	var tween := create_tween()
	tween.tween_property(color_rect, "modulate", Color.RED, 0.1)
	tween.tween_property(color_rect, "modulate", Color.WHITE, 0.1)
	if current_health <= 0:
		die()

func die() -> void:
	piece_killed.emit(self)
	var tween := create_tween()
	tween.tween_property(self, "scale", Vector2.ZERO, 0.2)
	tween.tween_callback(queue_free)

func attack_target(target: Piece) -> void:
	# 攻击动画：前冲→后退
	var orig_pos := position
	var dir := (target.position - position).normalized()
	var tween := create_tween()
	tween.tween_property(self, "position", position + dir * 20, 0.1)
	tween.tween_callback(func(): target.take_damage(data.attack * star_level))
	tween.tween_property(self, "position", orig_pos, 0.1)

func get_attack_range() -> int:
	return data.attack_range

func get_attack_speed() -> float:
	return data.attack_speed
