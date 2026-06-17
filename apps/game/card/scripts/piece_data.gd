extends Resource
class_name PieceData
## 棋子数据定义（类似 TFT 的英雄池）

@export var piece_name: String = ""
@export var display_name: String = ""
@export var cost: int = 1
@export var max_health: int = 500
@export var attack: int = 50
@export var attack_speed: float = 1.0
@export var attack_range: int = 1   # 攻击距离（1=近战）
@export var tribe: String = ""     # 种族/羁绊（如 "warrior"）
@export var job: String = ""       # 职业（如 "tank"）
@export var icon_color: Color = Color.WHITE
@export var icon_frame: int = 0    # 后续用于精灵图帧索引
