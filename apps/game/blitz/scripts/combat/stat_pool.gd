extends RefCounted
class_name StatPool
## 通用资源池 — 本轮是**精力**, v0.4 加真气时直接复用同一个类
##
## 📚 涉及学习文档:
##   godot-1-7-classes-oop         — class_name + _init 带默认参数
##   godot-1-8-signals-basics      — 自定义信号 changed(current, maximum)
##   godot-1-9-enums-constants     — 类内常量
##   godot-1-14-builtin-math-types — clampf / maxf / is_equal_approx
##   godot-7-5-timers-delays       — 为什么用「累加 delta 的计时器」而不是 Timer 节点
##
## 🎮 为什么值得单独开一个文件 (而不是在 player.gd 里写 `var stamina: float`):
##   「消耗 → 延迟 → 回复」这套规则有四个容易写错的地方, 而它们**全都不报错,
##   只是玩起来怪**:
##     ① 消耗后**立刻**开始回复 → 精力永远用不完, 资源系统彻底失效
##        (症状: 你感觉不到「精力不够」, 只会觉得「闪避有时候卡一下」)
##     ② 回复不钳制上限 → 精力涨到 120/100, 血条画到屏幕外面
##     ③ 扣不动时**扣一半** → 玩家以为闪避成功了, 其实精力已经透支
##     ④ 每帧无条件 emit → HUD 每帧重绘, 和「变了才刷新」的初衷正好相反
##   把这四条收进一个类, 它们只需要被写对一次。
##
## 🏗️ 为什么是 RefCounted 而不是 Node:
##   它不需要进场景树、不需要 _process、不需要被 queue_free ——
##   本质上只是「一个带规则的数字」, Node 的生命周期管理在这里纯属负担。
##   计时靠外部每帧喂 delta (见 tick), 而不是自建 Timer 节点: 那样池子必须进树,
##   而且 Timer 的精度/暂停/是否 process 又凭空多出一层要理解的规则。
##
## 🏗️ 本类是**纯逻辑, 零节点依赖** —— 所以它能被 headless 自检直接 new 出来断言,
##   不需要先搭一个场景。这是 v0.2「最大风险点先做纯逻辑」经验的延续。


## 数值变化时发出 (扣 / 回 / 重置都会发)。HUD 订阅它刷新, 不轮询。
signal changed(current: float, maximum: float)

## 上限
var max_value: float = 100.0
## 当前值
var current: float = 100.0
## 每秒回复量
var regen_rate: float = 45.0
## 消耗后要等多久才开始回复 (秒) —— **「不能无脑连按」的全部来源**
var regen_delay: float = 0.7

## 回复延迟倒计时。> 0 期间不回复。
var _hold: float = 0.0


func _init(p_max: float = 100.0, p_regen_rate: float = 45.0, p_regen_delay: float = 0.7) -> void:
	max_value = maxf(0.001, p_max)
	regen_rate = maxf(0.0, p_regen_rate)
	regen_delay = maxf(0.0, p_regen_delay)
	current = max_value


# ============================================================
# 查询
# ============================================================

## 够不够扣 —— 只查询, 不改任何状态。给 UI 灰显 / 预览用。
func can_spend(amount: float) -> bool:
	return amount <= 0.0 or current >= amount


func ratio() -> float:
	if max_value <= 0.0:
		return 0.0
	return clampf(current / max_value, 0.0, 1.0)


func is_empty() -> bool:
	return current <= 0.0


func is_full() -> bool:
	return current >= max_value


## 是否正处在「消耗后的回复延迟」里。
## 🎮 HUD 用它把精力条压暗 —— 玩家必须能一眼看出「我现在还没开始回」,
##    否则「刚闪完就接着闪」时他会以为是游戏吞了输入, 而不是自己没等够。
func is_regen_locked() -> bool:
	return _hold > 0.0


# ============================================================
# 消耗
# ============================================================

## 扣一笔。**不够就整笔不扣**并返回 false。
##
## ⚠️ 不做「有多少扣多少」的部分扣减: 调用方 (闪避/重击) 拿返回值当门槛,
##    若部分扣减它就会以为成功了 —— 玩家精力早已透支却照样闪出去,
##    资源系统退化成一个「有时候不灵」的装饰, 而且完全不会报错。
func spend(amount: float) -> bool:
	if amount <= 0.0:
		return true
	if current < amount:
		return false
	_set_current(current - amount)
	_hold = regen_delay
	return true


## 持续消耗 (格挡举盾时每帧调)。与 spend 的区别: **扣到 0 就停, 不失败**,
## 调用方用 is_empty() 判断「破了」。
##
## 🏗️ 为什么用 drain 而不是「每帧 spend 然后看返回值」:
##    那样在精力只剩 5 点时会扣不动 (spend 返回 false 且不扣), 格挡就白举了 ——
##    正确行为是「榨干最后 5 点, 然后破防」。
func drain(amount: float) -> void:
	if amount <= 0.0:
		return
	_set_current(current - amount)
	_hold = regen_delay


# ============================================================
# 恢复
# ============================================================

## 每帧喂 delta。停止消耗 regen_delay 秒后才开始回复。
##
## ⚠️ 注意 `_hold` 归零那一帧**直接 return**: 若写成「先减 hold 再判断」,
##    回复会在 hold 刚变 0 的当帧就开始, 但 int 语义下这会让延迟少一帧。
##    这里显式 return 是为了让「延迟期间」和「回复期间」是两个绝不重叠的阶段。
func tick(delta: float) -> void:
	if _hold > 0.0:
		_hold = maxf(0.0, _hold - delta)
		return
	if current >= max_value:
		return
	_set_current(current + regen_rate * delta)


## 回满 (复活时用)。同时清掉回复延迟 —— 复活后不该还带着上一次的惩罚。
func refill() -> void:
	_hold = 0.0
	_set_current(max_value)


## 把回复延迟**顶到**至少 seconds 秒 (只延长, 不缩短)。
## 破防后用它锁一段更长的回复延迟, 让「硬吃破防」比「主动收手」更痛。
func hold_regen(seconds: float) -> void:
	_hold = maxf(_hold, seconds)


# ============================================================
# 内部 — 唯一改 current 的入口
# ============================================================
## 钳制 + 「变了才发信号」两件事都收在这里, 所以不可能漏。
## 分散在四个方法里各写一遍的话, 迟早有一个忘了钳制 (见文件头 ②)。
func _set_current(v: float) -> void:
	var clamped: float = clampf(v, 0.0, max_value)
	if is_equal_approx(clamped, current):
		return
	current = clamped
	changed.emit(current, max_value)
