extends Node
## 变量、常量与数据类型 Demo
## TS: let x: number = 1  /  Python: x: int = 1  /  GDScript: var x: int = 1
## 运行: 打开 demo_runner.tscn → 附加此脚本 → F6 → 看 Output 面板

func _ready() -> void:
	print("========== 变量、常量与数据类型 ==========")

	# === var ——变量（≈ TS let / Python var）===
	var health: int = 100
	var speed: float = 300.0
	var player_name: String = "Hero"
	var alive: bool = true

	print("health = ", health, "   (int: ", typeof(health), ")")
	print("speed = ", speed, "   (float: ", typeof(speed), ")")
	print("player_name = ", player_name, "   (String: ", typeof(player_name), ")")
	print("alive = ", alive, "   (bool: ", typeof(alive), ")")

	# === const ——编译时常量（≈ TS const / Python Final）===
	const MAX_HEALTH: int = 200
	const GRAVITY: float = 980.0
	print("MAX_HEALTH = ", MAX_HEALTH, "   GRAVITY = ", GRAVITY)

	# ⚠️ GDScript 的 const 和 JS 的 const 不同——
	# GDScript 的 const 是编译时常量，必须是字面值或简单表达式
	# const now = Time.get_time()  # ❌ 编译错误！不能是函数调用

	# === @export ——Inspector 可编辑（≈ Vue defineProps）===
	# 在 _ready 中这些值已经可用（编辑器设置的值或默认值）
	var exported_speed: float = 400.0  # 实际使用时加 @export 前缀
	print("exported_speed (模拟 @export) = ", exported_speed)

	# === 类型转换 ===
	var raw: String = "42"
	var num: int = int(raw)        # "42" → 42
	var pi_str: String = str(3.14) # 3.14 → "3.14"
	print("int('42') = ", num, "   str(3.14) = ", pi_str)

	# === TS/Python 差异速记 ===
	# TS:  let x: number = 1       → GDScript: var x: int = 1
	# TS:  const PI = 3.14         → GDScript: const PI: float = 3.14
	# TS:  boolean → true/false    → GDScript: bool → true/false (小写!)
	# Py:  str                     → GDScript: String (大写 S!)
	# Py:  None                    → GDScript: null (小写)

	print("\n✅ 变量与类型 Demo 完成。看 Output 面板输出。")
