extends Node
## 数组与字典 Demo
## 运行: 打开 demo_runner.tscn → 附加此脚本 → F6 → 看 Output 面板

func _ready() -> void:
	print("========== 数组（Array） ==========")

	# === 强类型数组（推荐）===
	# TS: let scores: number[] = [1,2,3]
	# Py: scores: list[int] = [1,2,3]
	var scores: Array[int] = [100, 200, 300]
	print("scores = ", scores)

	# 常用方法（和 JS 几乎一样！）
	scores.append(400)
	print("append(400) → ", scores)

	var idx: int = scores.find(200)     # ≈ JS indexOf
	print("find(200) → index ", idx)

	var has_it: bool = scores.has(100)  # ≈ JS includes
	print("has(100) → ", has_it)

	print("size() → ", scores.size())   # ≈ JS .length

	# === filter / map / reduce（和 JS 一模一样的体验！）===
	var big: Array[int] = scores.filter(func(s: int) -> bool: return s > 150)
	print("filter(s>150) → ", big)

	var doubled: Array[int] = scores.map(func(s: int) -> int: return s * 2)
	print("map(*2) → ", doubled)

	var total: int = scores.reduce(func(acc: int, s: int) -> int: return acc + s, 0)
	print("reduce(sum) → ", total)

	# === 遍历 ===
	print("\n遍历:")
	for score: int in scores:
		print("  score = ", score)

	print("\n========== 字典（Dictionary） ==========")

	# TS: Record<string,int> / Py: dict[str,int]
	var player: Dictionary = {
		"name": "Hero",
		"health": 100,
		"position": Vector2(100, 200),
	}
	print("player = ", player)

	# 安全取值
	var hp: int = player.get("health", 0)  # 键不存在返回默认值
	print("player.get('health', 0) = ", hp)
	print("player.get('mana', 0) = ", player.get("mana", 0))  # 0 (默认)

	# 新增键
	player["weapon"] = "sword"
	print("新增 weapon → ", player)

	print("\n✅ 数组与字典 Demo 完成。")
