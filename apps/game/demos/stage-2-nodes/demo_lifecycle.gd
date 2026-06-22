extends Node2D
## Node 生命周期 Demo ——_init → _enter_tree → _ready → _process → _exit_tree
## TS ≈ React component lifecycle + requestAnimationFrame
## 运行: 新建场景 → Node2D 根 → 附加此脚本 → F6 → 看 Output
##      运行时点 Godot 右上角 Stop 或按 F8 可看到 _exit_tree

var _frame_count: int = 0
var _start_time: float = 0.0

# 1. _init ——对象构造（new 时调用，不在场景树中）
func _init() -> void:
	print("[_init] 对象被创建——此时还不在场景树中")
	print("  不能访问 $ 节点！所有 @onready 变量都是 null")

# 2. _enter_tree ——加入场景树时
func _enter_tree() -> void:
	print("[_enter_tree] 加入场景树——但子节点可能还没准备好")
	_start_time = Time.get_ticks_msec() / 1000.0

# 3. _ready ——最重要的回调！所有子节点已就绪
func _ready() -> void:
	print("[_ready] 节点 + 所有子节点已就绪——这里做初始化工作")
	print("  子节点 _ready 先于父节点——所以父 _ready 中可以安全访问子节点")
	print("\n--- 开始每帧更新（显示前 10 帧）---")

# 4. _process ——每帧调用（可变帧率）
func _process(delta: float) -> void:
	_frame_count += 1
	if _frame_count <= 10:
		var elapsed: float = Time.get_ticks_msec() / 1000.0 - _start_time
		print("[_process#%d] delta=%.4fs  elapsed=%.2fs" % [_frame_count, delta, elapsed])
	elif _frame_count == 11:
		print("... (后续帧省略)")

# 5. _exit_tree ——从场景树移除时
func _exit_tree() -> void:
	print("\n[_exit_tree] 从场景树移除——清理：断开信号、停止音效")
	var elapsed: float = Time.get_ticks_msec() / 1000.0 - _start_time
	print("  共运行 %d 帧，耗时 %.1f 秒" % [_frame_count, elapsed])
