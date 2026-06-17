extends Node2D
class_name Board
## 自走棋棋盘——8x8 格子，处理点击放置棋子

const GRID_SIZE: int = 8
const CELL_SIZE: int = 80
const BOARD_OFFSET := Vector2(60, 100)

signal cell_clicked(grid_pos: Vector2i)
signal piece_placed(piece: Piece, grid_pos: Vector2i)

var grid: Array[Array] = []           # 8x8，每个元素是 Array（存 Piece 或 null）
var highlight: ColorRect               # 选中的格子高亮

func _ready() -> void:
    _init_grid()
    _draw_board()
    _create_highlight()

func _init_grid() -> void:
    grid.clear()
    for x: int in GRID_SIZE:
        var col: Array = []
        col.resize(GRID_SIZE)
        grid.append(col)

func _draw_board() -> void:
    for x: int in GRID_SIZE:
        for y: int in GRID_SIZE:
            var rect := ColorRect.new()
            rect.size = Vector2(CELL_SIZE - 2, CELL_SIZE - 2)
            rect.position = grid_to_world(Vector2i(x, y)) - rect.size / 2
            rect.color = _cell_color(x, y)
            add_child(rect)

            # 交互区域
            var btn := Area2D.new()
            btn.name = "cell_%d_%d" % [x, y]
            btn.position = grid_to_world(Vector2i(x, y))
            var shape := CollisionShape2D.new()
            shape.shape = RectangleShape2D.new()
            shape.shape.size = Vector2(CELL_SIZE, CELL_SIZE)
            btn.add_child(shape)
            btn.input_event.connect(_on_cell_input.bind(x, y))
            add_child(btn)

func _cell_color(x: int, y: int) -> Color:
    # 己方半场（0-3行）vs 敌方半场（4-7行）颜色不同
    var base := Color(0.25, 0.22, 0.18) if y < 4 else Color(0.18, 0.18, 0.25)
    if (x + y) % 2 == 0:
        base = base.lightened(0.08)
    return base

func _create_highlight() -> void:
    highlight = ColorRect.new()
    highlight.size = Vector2(CELL_SIZE, CELL_SIZE)
    highlight.color = Color(1, 1, 0, 0.3)
    highlight.visible = false
    add_child(highlight)

func _on_cell_input(_viewport: Node, event: InputEvent, _shape_idx: int, x: int, y: int) -> void:
    if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
        highlight.visible = true
        highlight.position = grid_to_world(Vector2i(x, y)) - highlight.size / 2
        cell_clicked.emit(Vector2i(x, y))

func grid_to_world(gpos: Vector2i) -> Vector2:
    return BOARD_OFFSET + Vector2(gpos.x * CELL_SIZE, gpos.y * CELL_SIZE)

func world_to_grid(wpos: Vector2) -> Vector2i:
    var local := (wpos - BOARD_OFFSET) / CELL_SIZE
    return Vector2i(int(local.x), int(local.y))

func is_in_bounds(gpos: Vector2i) -> bool:
    return gpos.x >= 0 and gpos.x < GRID_SIZE and gpos.y >= 0 and gpos.y < GRID_SIZE

func is_cell_empty(gpos: Vector2i) -> bool:
    return is_in_bounds(gpos) and (grid[gpos.x][gpos.y] as Piece) == null

func is_player_half(gpos: Vector2i) -> bool:
    return gpos.y < 4   # 行 0-3 = 己方半场

func place_piece(piece: Piece, gpos: Vector2i) -> bool:
    if not is_cell_empty(gpos) or not is_player_half(gpos):
        return false
    piece.board_pos = gpos
    piece.global_position = grid_to_world(gpos)
    grid[gpos.x][gpos.y] = piece
    piece_placed.emit(piece, gpos)
    return true

func remove_piece(gpos: Vector2i) -> Piece:
    var p: Piece = grid[gpos.x][gpos.y] as Piece
    grid[gpos.x][gpos.y] = null
    return p

func get_adjacent_cells(gpos: Vector2i) -> Array[Vector2i]:
    var dirs: Array[Vector2i] = [Vector2i(0,-1), Vector2i(1,0), Vector2i(0,1), Vector2i(-1,0)]
    var result: Array[Vector2i] = []
    for d: Vector2i in dirs:
        var n: Vector2i = gpos + d
        if is_in_bounds(n):
            result.append(n)
    return result

func get_enemy_adjacent(gpos: Vector2i) -> Array[Piece]:
    var enemies: Array[Piece] = []
    for n: Vector2i in get_adjacent_cells(gpos):
        var p: Piece = grid[n.x][n.y] as Piece
        if p and p.team != _piece_at(gpos).team:
            enemies.append(p)
    return enemies

func _piece_at(gpos: Vector2i) -> Piece:
    return grid[gpos.x][gpos.y] as Piece if is_in_bounds(gpos) else null

func clear_highlight() -> void:
    highlight.visible = false