extends Node
## 信号（Signal）Demo ——声明→连接→发射 三步走
## TS ≈ EventEmitter / Vue ≈ $emit  /  DOM ≈ addEventListener
## 运行: 打开 demo_runner.tscn → 附加此脚本 → F6 → 看 Output 面板

# 1. 声明信号（可带参数类型）
signal health_changed(new_health: int, max_health: int)
signal player_died()
signal item_picked(item_name: String, quantity: int)

func _ready() -> void:
	print("========== 信号（Signal）Demo ==========")

	# 2. 连接信号（≈ addEventListener / .on()）
	health_changed.connect(_on_health_changed)
	player_died.connect(_on_player_died)
	# 用 lambda 连接（≈ () => {}）
	item_picked.connect(func(name: String, qty: int) -> void:
		print("🎒 拾取: ", qty, " 个 ", name))

	# 3. 发射信号（≈ emit / dispatchEvent）
	print("\n--- 模拟血量变化 ---")
	health_changed.emit(80, 100)   # 血量 → 80/100
	health_changed.emit(30, 100)   # 血量 → 30/100

	print("\n--- 模拟拾取物品 ---")
	item_picked.emit("长剑", 1)
	item_picked.emit("药水", 3)

	print("\n--- 模拟玩家死亡 ---")
	player_died.emit()

	# === 信号作为 Callable ===
	# GDScript 中信号本身是 Callable 对象——可以当参数传递
	var my_signal: Signal = health_changed  # Signal 类型

	print("\n✅ 信号 Demo 完成。")

# 回调函数
func _on_health_changed(new_hp: int, max_hp: int) -> void:
	print("❤️ 血量变化: ", new_hp, "/", max_hp,
		" (", "%.0f" % (float(new_hp) / max_hp * 100), "%)")

func _on_player_died() -> void:
	print("💀 玩家死亡！触发游戏结束逻辑...")
