extends Node
## 控制流 Demo——if/match/for/while
## 运行: 打开 demo_runner.tscn → 附加此脚本 → F6 → Output
## TS: if(x>0){} / Python: if x>0:  /  GDScript: if x>0:

func _ready() -> void:
	print("========== 控制流 Demo ==========")

	# === if / elif / else ===
	var hp: int = 50
	if hp <= 0:
		print("状态: 死亡")
	elif hp < 30:
		print("状态: 危险 (hp=%d)" % hp)
	else:
		print("状态: 存活 (hp=%d)" % hp)
	# 输出: 状态: 存活 (hp=50)

	# === match（≈ Python match-case / TS switch） ===
	var state: String = "run"
	match state:
		"idle":   print("动作: 待机")
		"run":    print("动作: 跑步")
		"jump":   print("动作: 跳跃")
		_:        print("动作: 未知")
	# 输出: 动作: 跑步

	# match 数组模式
	var pos := Vector2(0, 100)
	match [pos.x, pos.y]:
		[0, 0]:         print("位置: 原点")
		[var x, 0]:     print("位置: x轴 ", x)
		[0, var y]:     print("位置: y=", y)
		[var x, var y]: print("位置: (", x, ", ", y, ")")
	# 输出: 位置: y=100

	# === for in ——没有 C 风格的 for(;;)！ ===
	print("\nfor in range(5):")
	for i: int in range(5):
		print("  i=%d" % i, " | " if i < 4 else "")
	# 输出: i=0 i=1 i=2 i=3 i=4

	print("\nfor score in [100,200,300]:")
	for score: int in [100, 200, 300]:
		print("  score=%d" % score)
	# 输出: score=100 score=200 score=300

	# === while ===
	print("\nwhile 循环:")
	var count: int = 0
	while count < 3:
		print("  count=%d" % count)
		count += 1  # 没有 count++！
	# 输出: count=0 count=1 count=2

	print("\n✅ 控制流 Demo 完成。")
