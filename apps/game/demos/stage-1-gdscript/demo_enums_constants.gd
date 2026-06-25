extends Node
## 枚举与常量 Demo —— enum / const / @export_enum
## TS: enum State { IDLE, RUN } / Python: class State(Enum): IDLE=1

func _ready() -> void:
	print("========== 枚举与常量 Demo ==========")

	# === enum（≈ TS enum / Python Enum） ===
	var state: State = State.RUN
	print("当前状态: ", State.keys()[state])  # RUN
	# 输出: 当前状态: RUN

	var err: ErrorCode = ErrorCode.NOT_FOUND
	print("错误码: ", err)  # 404
	# 输出: 错误码: 404

	# === match + enum 配合 ===
	match state:
		State.IDLE: print("→ 播放待机动画")
		State.RUN:  print("→ 播放跑步动画")
		State.JUMP: print("→ 播放跳跃动画")
	# 输出: → 播放跑步动画

	# === const 编译时常量 ===
	print("\nconst 常量:")
	print("  MAX_HEALTH = ", MAX_HEALTH)
	print("  GRAVITY = ", GRAVITY)
	print("  GAME_TITLE = ", GAME_TITLE)
	# 输出: MAX_HEALTH=200, GRAVITY=980.0, GAME_TITLE=My Game

	# === @export_enum（Inspector 下拉选择） ===
	# 编辑器 Inspector 面板会出现下拉框选择 Warrior/Mage/Archer
	var class_type: String = "Mage"
	print("\n职业选择: ", class_type)
	# 输出: 职业选择: Mage

	print("\n✅ 枚举与常量 Demo 完成。")

# === 枚举定义 ===
enum State { IDLE, RUN, JUMP, DEAD }  # IDLE=0, RUN=1, JUMP=2, DEAD=3
enum ErrorCode { OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500 }

# === 编译时常量 ===
const MAX_HEALTH: int = 200
const GRAVITY: float = 980.0
const GAME_TITLE: String = "My Game"
