extends RefCounted
class_name Facing
## 四向朝向 —— **世界平面**上的单位向量，只有 4 个合法值。
##
## 📚 涉及学习文档:
##   godot-1-14-builtin-math-types — Vector2 / 点积
##   godot-1-9-enums-constants     — const 常量的作用域
##
## ────────────────────────────────────────────────────────────
## 🏗️ 为什么朝向是 4 个方向，而移动是 8 个方向
## ────────────────────────────────────────────────────────────
## v0.4 的朝向是 `int ±1`（只有左右）。那套模型在纵向移动时会露馅：
## 玩家按 W 往屏幕里走，角色却还是侧着身子 —— 看起来像滑冰，而不是走路。
##
## belt-scroll 的标准答案（DNF / 怒之铁拳 / 三国战纪）是：
##   · **移动** 8 向（两个轴各自独立，斜着走是常态）
##   · **朝向** 4 向（左 / 右 / 上=背面 / 下=正面）
##   · 斜着走时朝向**吸附到主轴**，不是慢慢转过去
##
## 美术上这是 3 套唯一图（侧视镜像 / 背面 / 正面），不是 8 套 —— 见 DESIGN.md。
##
## ────────────────────────────────────────────────────────────
## ⚠️ 轴的方向（写反了不会报错，只会「朝上走却背对镜头」）
## ────────────────────────────────────────────────────────────
## 本项目的世界空间是 (x, z)，z **越大越远 = 画面越靠上**（belt_space.gd）。
## 所以：
##   `UP`   = Vector2(0, +1)  → 屏幕上向上 = 走向纵深远处 = 看到**背面**
##   `DOWN` = Vector2(0, -1)  → 屏幕上向下 = 走向镜头 = 看到**正面**
##
## ⚠️ 别用 Vector2.UP / Vector2.DOWN：Godot 的屏幕坐标里 UP 是 (0,-1)，
##    和这里的「世界纵深」正好相反 —— 混用会得到「按上却朝下」，
##    而且四个方向的判定全都跟着翻，画面上只是「朝向不太对」。

const RIGHT: Vector2 = Vector2(1.0, 0.0)
const LEFT: Vector2 = Vector2(-1.0, 0.0)
const UP: Vector2 = Vector2(0.0, 1.0)
const DOWN: Vector2 = Vector2(0.0, -1.0)

## 主轴吸附的相对阈值。斜向输入时，新轴要**比当前轴大这么多倍**才换向。
##
## 🏗️ 没有它的话，斜着走 (0.71, 0.71) 会让朝向在「右」和「下」之间逐帧抖 ——
##    角色的头和刀每帧翻一次，看起来像卡带。手感的正确读法是「咬住一个方向」。
const SWITCH_RATIO: float = 1.25


## 是不是一个合法的四向朝向。
static func is_valid(f: Vector2) -> bool:
	return absf(f.x) + absf(f.y) > 0.5 and absf(f.x * f.y) < 0.01


## 把任意世界方向吸附到最近的 4 向之一。零向量返回 ZERO（调用方自己决定保不保持）。
static func snap(world_dir: Vector2) -> Vector2:
	if world_dir.length_squared() < 0.0001:
		return Vector2.ZERO
	if absf(world_dir.x) >= absf(world_dir.y):
		return RIGHT if world_dir.x > 0.0 else LEFT
	return UP if world_dir.y > 0.0 else DOWN


## 带迟滞的换向 —— 大多数时候应该用它，而不是直接 `snap()`。
##
## 规则:
##   1. 输入太小 → 保持当前朝向（站着不动不该突然转身）
##   2. 新方向和当前方向在**同一个轴**上（左右互换 / 上下互换）→ 立刻转
##   3. 换轴（横向 ↔ 纵向）→ 新轴分量必须明显更大，否则保持
##
## 第 2 条和第 3 条的区别是手感的关键：
## 「往左走时按右」应该立即转身（这是明确意图），
## 而「往右走时稍微带一点下」不该把侧视换成正面。
static func choose(current: Vector2, world_dir: Vector2, ratio: float = SWITCH_RATIO) -> Vector2:
	var s: Vector2 = snap(world_dir)
	if s == Vector2.ZERO:
		return current
	if current == Vector2.ZERO or not is_valid(current):
		return s
	# 同轴（含反向）—— 立即生效
	if absf(s.dot(current)) > 0.5:
		return s
	# 换轴 —— 要明显压过当前轴
	var new_mag: float = absf(world_dir.dot(s))
	var cur_mag: float = absf(world_dir.dot(current))
	return s if new_mag > cur_mag * ratio else current


## 垂直于朝向的世界方向（+90°）。预警 / 格挡半平面 / 局部坐标系的第二根轴都用它。
##
## 约定: `perp(RIGHT) = Vector2(0, 1)` —— 和 v0.3 的「面朝右时局部 y 就是世界 z」一致。
static func perp(f: Vector2) -> Vector2:
	var u: Vector2 = snap(f) if not is_valid(f) else f
	return Vector2(-u.y, u.x)


## 朝向在**屏幕**上的单位方向 —— 只给绘制用（箭头 / 眼睛 / 脚掌）。
##
## ⚠️ 必须过 `BeltSpace.dir_to_screen` 再归一化：世界里的「上」在屏幕上要压扁，
##    但画朝向箭头时我们要的是「指向上」而不是「指向上而且短一半」。
static func to_screen_dir(f: Vector2) -> Vector2:
	var s: Vector2 = BeltSpace.dir_to_screen(f)
	return s.normalized() if s.length_squared() > 0.0001 else Vector2.RIGHT


## 给人读的名字 —— 调试面板和自检失败信息用。
static func describe(f: Vector2) -> String:
	if f.is_equal_approx(RIGHT):
		return "右 →"
	if f.is_equal_approx(LEFT):
		return "← 左"
	if f.is_equal_approx(UP):
		return "↑ 上（背面）"
	if f.is_equal_approx(DOWN):
		return "↓ 下（正面）"
	return "非法(%s)" % str(f)
