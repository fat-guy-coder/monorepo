extends Node
## 函数 Demo——声明 / 参数 / lambda / Callable
## TS: function f(x:number):void {} / Python: def f(x:int)->None:

func _ready() -> void:
	print("========== 函数 Demo ==========")

	# === 基本函数 ===
	var result: int = add(3, 5)
	print("add(3,5) = ", result)
	# 输出: add(3,5) = 8

	# === 默认参数 + 命名调用 ===
	greet("Player")          # 用默认 size
	greet("Boss", 24)        # 覆盖默认值
	# 输出: Hello Player (size=14), Hello Boss (size=24)

	# === Lambda / Callable ===
	var doubler: Callable = func(x: int) -> int: return x * 2
	print("doubler(5) = ", doubler.call(5))
	# 输出: doubler(5) = 10

	# === filter/map/reduce（和 JS 一模一样！） ===
	var scores: Array[int] = [1, 2, 3, 4, 5]
	var big: Array[int] = scores.filter(func(s: int) -> bool: return s > 2)
	print("filter(>2) → ", big)
	# 输出: filter(>2) → [3, 4, 5]

	var doubled: Array[int] = scores.map(func(s: int) -> int: return s * 2)
	print("map(*2) → ", doubled)
	# 输出: map(*2) → [2, 4, 6, 8, 10]

	var total: int = scores.reduce(func(acc: int, s: int) -> int: return acc + s, 0)
	print("reduce(sum) → ", total)
	# 输出: reduce(sum) → 15

	# === Callable bind ===
	var logger: Callable = func(level: String, msg: String) -> void:
		print("[%s] %s" % [level, msg])
	var err_log: Callable = logger.bind("ERROR")
	err_log.call("something went wrong")
	# 输出: [ERROR] something went wrong

	print("\n✅ 函数 Demo 完成。")

func add(a: int, b: int) -> int:
	return a + b

func greet(name: String, size: int = 14) -> void:
	print("Hello %s (size=%d)" % [name, size])
