extends Node2D
class_name AutoChessGame
## 自走棋游戏控制器

enum Phase { PREPARE, BATTLE }

var gold: int = 10
var health: int = 100
var round: int = 1
var phase: Phase = Phase.PREPARE
var bench_pieces: Array[Piece] = []
var selected_piece: Piece = null
var max_bench: int = 8

@onready var board: Board = $Board
@onready var gold_label: Label = $UI/GoldLabel
@onready var health_label: Label = $UI/HealthLabel
@onready var round_label: Label = $UI/RoundLabel
@onready var phase_btn: Button = $UI/PhaseButton
@onready var shop_container: HBoxContainer = $UI/Shop
@onready var bench_container: HBoxContainer = $UI/Bench

func _ready() -> void:
	_refresh_shop()
	_spawn_enemy_team()
	_give_starter_pieces()
	_update_ui()
	board.cell_clicked.connect(_on_cell_clicked)
	phase_btn.pressed.connect(_on_phase_btn)

func _spawn_enemy_team() -> void:
	var enemy_data: Array[PieceData] = PieceDB.all_pieces()
	var positions: Array[Vector2i] = [
		Vector2i(1, 5), Vector2i(3, 5), Vector2i(5, 5), Vector2i(7, 5),
	]
	for i: int in positions.size():
		var data: PieceData = enemy_data[i % enemy_data.size()]
		var piece: Piece = _make_piece(data, 1)
		piece.board_pos = positions[i]
		piece.global_position = board.grid_to_world(positions[i])
		board.grid[positions[i].x][positions[i].y] = piece

func _give_starter_pieces() -> void:
	var starters: Array[PieceData] = PieceDB.all_pieces().slice(0, 3)
	for data: PieceData in starters:
		var piece: Piece = _make_piece(data, 0)
		bench_pieces.append(piece)
		_add_to_bench(piece)

func _make_piece(data: PieceData, team_id: int) -> Piece:
	var scene: PackedScene = load("res://scenes/piece.tscn") as PackedScene
	var piece: Piece = scene.instantiate() as Piece
	add_child(piece)
	piece.piece_killed.connect(_on_piece_killed)
	piece.setup(data, team_id)
	return piece

func _update_ui() -> void:
	gold_label.text = "💰 %d" % gold
	health_label.text = "❤️ %d" % health
	round_label.text = "Round %d" % round
	phase_btn.text = "⚔️ 战斗" if phase == Phase.PREPARE else "🔄 准备"

func _on_phase_btn() -> void:
	if phase == Phase.PREPARE:
		_start_battle()
	else:
		_start_prepare()

func _start_battle() -> void:
	phase = Phase.BATTLE
	board.clear_highlight()
	_update_ui()
	_do_battle()

func _start_prepare() -> void:
	phase = Phase.PREPARE
	round += 1
	gold += 5 + mini(round, 10)
	_refresh_shop()
	_update_ui()

func _do_battle() -> void:
	await get_tree().create_timer(2.0).timeout
	_start_prepare()

func _refresh_shop() -> void:
	for c: Node in shop_container.get_children():
		c.queue_free()
	var costs: Array[int] = []
	costs.assign([1, 1, 1, 2, 2] if round < 5 else [1, 2, 2, 3, 3])
	for cost: int in costs:
		var pool: Array[PieceData] = PieceDB.pool_by_cost(cost)
		if pool.is_empty():
			continue
		var data: PieceData = pool.pick_random() as PieceData
		var btn := Button.new()
		btn.text = "%s\n💰%d" % [data.display_name, data.cost]
		btn.custom_minimum_size = Vector2(80, 45)
		btn.pressed.connect(func(): _buy_piece(data))
		shop_container.add_child(btn)

func _buy_piece(data: PieceData) -> void:
	if gold < data.cost or bench_pieces.size() >= max_bench:
		return
	gold -= data.cost
	var piece: Piece = _make_piece(data, 0)
	bench_pieces.append(piece)
	_add_to_bench(piece)
	_update_ui()

func _add_to_bench(piece: Piece) -> void:
	var btn := Button.new()
	btn.text = piece.data.display_name
	btn.custom_minimum_size = Vector2(70, 40)
	btn.pressed.connect(func(): _select_bench_piece(piece))
	bench_container.add_child(btn)

func _select_bench_piece(p: Piece) -> void:
	selected_piece = p
	board.clear_highlight()

func _on_cell_clicked(gpos: Vector2i) -> void:
	if phase != Phase.PREPARE:
		return
	if selected_piece and board.is_cell_empty(gpos) and board.is_player_half(gpos):
		board.place_piece(selected_piece, gpos)
		bench_pieces.erase(selected_piece)
		_rebuild_bench_ui()
		selected_piece = null
		board.clear_highlight()

func _rebuild_bench_ui() -> void:
	for c: Node in bench_container.get_children():
		c.queue_free()
	for p: Piece in bench_pieces:
		_add_to_bench(p)

func _on_piece_killed(piece: Piece) -> void:
	if piece.team == 0:
		health -= 2
		_update_ui()
