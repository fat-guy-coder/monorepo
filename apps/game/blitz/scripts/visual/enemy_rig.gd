extends RefCounted
class_name EnemyRig
## 敌人的**程序化骨架** —— 纯数学, 一行绘制代码都没有 (v0.8)
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics  — _draw() / draw_set_transform
##   godot-1-12-static-typing — static 工具函数
##
## ────────────────────────────────────────────────────────────
## 🎮 为什么敌人也要一套骨架
## ────────────────────────────────────────────────────────────
## v0.8 之前敌人是一块梯形 + 一颗头 + **一只**爪子。它的问题是:
##   · 整个身体在出招时一动不动, 只有爪子像一根棍子绕肩膀转;
##   · 两条腿不存在 —— 走动时身体整体滑过去;
##   · 「起手 / 命中 / 收招」只能靠地面预警和变色区分, 身体本身没有戏。
##
## 和 PlayerRig 用的是**同一套架构**, 但**两副不同的骨头**:
##   玩家 = 直立的人 (躯干竖直、膝盖朝前、刀绑在手心);
##   敌人 = 前倾的妖兽 (躯干前扑、**逆关节腿**、双爪、尾巴)。
## 分开写而不是「一个 rig 加参数」, 因为两者的姿态表根本不同 ——
## 硬塞进一个类只会让 14 + 7 张表互相污染。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 同样的三条纪律 (和 player_rig.gd 完全一致)
## ────────────────────────────────────────────────────────────
##   ① **纯数据 + 纯函数**, 不继承 Node2D。可测、可换。
##   ② **绝对角**, 0 = 正上, +PI/2 = 正前, PI = 正下。
##   ③ 骨架永远**朝右**, 朝左由 enemy.gd 的 draw_set_transform 镜像。
##      在本文件里出现任何镜像系数 f 都是双重镜像的 bug。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 背/正面的压扁: 只压「方向增量」, 不压「站位」
## ────────────────────────────────────────────────────────────
## 和玩家踩过的坑一样 (player_rig.gd § 同款注释): 把解算完的点统一乘 x,
## 会把两条手臂压进躯干里。所以肩/髋的横向站位 (lat_arm / lat_hip) 原样保留,
## 只有从关节点往外伸的每一段乘 DEPTH_SQUASH。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 妖兽腿是**逆关节** (digitigrade)
## ────────────────────────────────────────────────────────────
## 人腿膝盖朝前; 鸟/狗的后腿膝盖朝**后**, 踝骨反而像第二个「向前折的关节」。
## 这里用 IK 的 bend_forward = false 把膝盖翻到后面 —— 一行参数,
## 整个剪影就和玩家区分开了 (这是「它们是两种东西」最便宜的表达)。
##
## ⚠️ 腿长和 PELVIS_Y 是一对: 只改骨盆高度不改腿长, 妖兽会悬空或陷进地里。
##    站立默认姿态算过: 髋 -23.5, 大腿 10.5 + 小腿 12 → 脚踝约 -2.7,
##    脚掌 3px 厚 → 脚底 ≈ 0.3, 正好贴地。


## 动画状态 —— **将来接精灵帧的接口** (同 PlayerRig.Anim 的角色)。
enum Anim {
	IDLE,      ## 站桩呼吸
	MOVE,      ## 走/追 (步态由 phase 驱动)
	WINDUP,    ## 起手蓄势 —— 玩家读招的窗口
	STRIKE,    ## 命中帧 —— 爪甩到最前
	RECOVER,   ## 收招破绽
	STUN,      ## 短硬直 (平时挨打)
	STAGGER,   ## 长硬直 (精准格挡 / 破霸体)
}

## 视角: 侧面 (左右) / 背面 (朝上) / 正面 (朝下)
enum View { SIDE, BACK, FRONT }

# ============================================================
# 骨长 —— 一律常量, 任何姿态都改不了
# ============================================================
const TORSO_LEN: float = 13.5
const NECK_LEN: float = 3.5
const HEAD_LEN: float = 4.5
const HEAD_R: float = 7.0
const UPPER_ARM: float = 8.0
const FOREARM: float = 7.5
const CLAW_LEN: float = 6.0
const THIGH: float = 10.5
const SHIN: float = 12.0
const FOOT_LEN: float = 7.0
const FOOT_H: float = 3.0
const TAIL_LEN1: float = 7.0
const TAIL_LEN2: float = 6.0

## 骨盆高度 (身体局部坐标, 脚底原点)。见文件头 § 逆关节腿的 ⚠️。
const PELVIS_Y: float = -23.5

## 背/正面时 x 的压扁比例 (和玩家、地面同一个量级)。
const DEPTH_SQUASH: float = 0.42

## 站姿时脚踝相对髋部的横向站位 (落点模式的基准)。
const FOOT_LAT: float = 1.4

# ============================================================
# 姿态输入 (apply() 写这些)
# ============================================================
var pelvis: Vector2 = Vector2(0.0, PELVIS_Y)
var spine: float = 0.50
var neck: float = 0.30
var head: float = 0.45

## 两条手臂: near = 靠近镜头的一侧 = **出招的那只爪**。
var arm_near_upper: float = 2.55
var arm_near_fore: float = 1.95
var arm_far_upper: float = 2.62
var arm_far_fore: float = 2.02

## 两条腿 (角度模式; leg_ik 打开时被 IK 覆盖)
##
## ⚠️ **大腿角必须在 PI 之后、小腿角在 PI 之前** —— 这才是逆关节:
##    大腿往后下方、小腿往前下方, 中间那个「膝盖」凸在身体后侧。
##    写成「大腿 PI- 、小腿 PI+」(人腿) 的话, 静止时是一个蹲着的人,
##    而 move 用 IK 又是逆关节 → 走起来膝盖会**从朝前弹到朝后**。
##    自检里有一条专门锁这件事。
var leg_near_thigh: float = PI + 0.48
var leg_near_shin: float = PI - 0.42
var leg_far_thigh: float = PI + 0.42
var leg_far_shin: float = PI - 0.36

## 腿的「脚踝落点」模式 —— 走动时必须用, 理由和 player_rig.gd 一模一样:
## 用角度写步态, 每调一次摆幅脚就会浮起/陷地几像素, 而且不报错。
var leg_ik: bool = false
var leg_near_foot: Vector2 = Vector2(FOOT_LAT, -2.7)
var leg_far_foot: Vector2 = Vector2(-FOOT_LAT, -2.7)

## 尾巴两节 (绝对角)。默认从骨盆后方垂下, 尾尖上翘 —— 一个 S 形剪影。
var tail_a: float = -1.90
var tail_b: float = -1.05

## 张嘴程度 0~1。起手时张开是「要咬了」最直接的信号, 由绘制层画成下颌开口。
var mouth_open: float = 0.0

# ============================================================
# 解算结果 (solve() 写这些, 绘制层只读)
# ============================================================
var chest: Vector2 = Vector2.ZERO
var neck_pt: Vector2 = Vector2.ZERO
var head_pt: Vector2 = Vector2.ZERO
var shoulder_near: Vector2 = Vector2.ZERO
var shoulder_far: Vector2 = Vector2.ZERO
var elbow_near: Vector2 = Vector2.ZERO
var elbow_far: Vector2 = Vector2.ZERO
var hand_near: Vector2 = Vector2.ZERO
var hand_far: Vector2 = Vector2.ZERO
var hip_near: Vector2 = Vector2.ZERO
var hip_far: Vector2 = Vector2.ZERO
var knee_near: Vector2 = Vector2.ZERO
var knee_far: Vector2 = Vector2.ZERO
var ankle_near: Vector2 = Vector2.ZERO
var ankle_far: Vector2 = Vector2.ZERO
var tail_base: Vector2 = Vector2.ZERO
var tail_mid: Vector2 = Vector2.ZERO
var tail_tip: Vector2 = Vector2.ZERO
## 爪尖 = 手心 + 前臂方向 × CLAW_LEN
var claw_near: Vector2 = Vector2.ZERO
var claw_far: Vector2 = Vector2.ZERO


## 方向角 → 单位向量。0 = 上, +PI/2 = 前 (+x), PI = 下。
## (和 PlayerRig.dir_of 同一个约定 —— 两边共用一套角度语言。)
static func dir_of(angle: float) -> Vector2:
	return Vector2(sin(angle), -cos(angle))


## 两骨 IK —— 直接借用 PlayerRig 的实现, 包括它的距离夹紧。
##
## 🏗️ 为什么不复制一份: 这套解析解只有一份才是对的。复制意味着以后只有一边
##    会被修 (比如发现夹紧区间写错了), 另一边静默地继续出 NaN —— 而 NaN 进
##    draw_colored_polygon 的表现是「那只腿整帧不画」, 不报错。
static func ik2(a: Vector2, target: Vector2, l1: float, l2: float, bend_forward: bool) -> Vector2:
	return PlayerRig.ik2(a, target, l1, l2, bend_forward)


## 关键帧曲线 —— 同上, 复用 PlayerRig 的唯一实现。
static func curve(t: float, keys: Array) -> float:
	return PlayerRig.curve(t, keys)


## 沿 angle 走 length, x 分量乘 sx —— 压扁只发生在这一处。
static func _delta(angle: float, length: float, sx: float) -> Vector2:
	return Vector2(sin(angle) * sx, -cos(angle)) * length


## 回到站桩默认姿态。**每次 apply() 前必须先调** (理由同 PlayerRig.reset)。
func reset() -> void:
	pelvis = Vector2(0.0, PELVIS_Y)
	spine = 0.50
	neck = 0.30
	head = 0.45
	arm_near_upper = 2.55
	arm_near_fore = 1.95
	arm_far_upper = 2.62
	arm_far_fore = 2.02
	leg_near_thigh = PI + 0.48
	leg_near_shin = PI - 0.42
	leg_far_thigh = PI + 0.42
	leg_far_shin = PI - 0.36
	leg_ik = false
	leg_near_foot = Vector2(FOOT_LAT, -2.7)
	leg_far_foot = Vector2(-FOOT_LAT, -2.7)
	tail_a = -1.90
	tail_b = -1.05
	mouth_open = 0.0


## 摆姿态。phase 语义:
##   · IDLE / MOVE → 0~1 循环进度
##   · WINDUP / STRIKE / RECOVER → 0~1 招式进度
##   · STUN / STAGGER → 0~1 **已过去**的比例 (0 = 刚被打中, 1 = 恢复)
##
## ⚠️ 不读任何敌人状态, 只吃 (anim, phase)。相位由 enemy.gd 从出招计时器算,
##    这里没有第二个时钟 —— 所以「动画」和「判定」不可能各自漂移。
func apply(anim: int, phase: float) -> void:
	reset()
	var t: float = clampf(phase, 0.0, 1.0)

	match anim:
		Anim.IDLE:
			_pose_idle(t)
		Anim.MOVE:
			_pose_move(t)
		Anim.WINDUP:
			_pose_windup(t)
		Anim.STRIKE:
			_pose_strike(t)
		Anim.RECOVER:
			_pose_recover(t)
		Anim.STUN:
			_pose_stun(t)
		Anim.STAGGER:
			_pose_stagger(t)


## 正运动学 + IK。规则的完整解释见 player_rig.gd::solve 的 🏗️ (同一条)。
func solve(view: int = View.SIDE) -> void:
	var wide: bool = view != View.SIDE
	var sx: float = DEPTH_SQUASH if wide else 1.0
	# 背/正面时双臂要真正分到身体两侧; 侧视时只差一点点 (深度错位)。
	var lat_arm: float = 6.0 if wide else 1.0
	var lat_hip: float = 4.0 if wide else 1.4

	chest = pelvis + _delta(spine, TORSO_LEN, sx)
	neck_pt = chest + _delta(neck, NECK_LEN, sx)
	head_pt = neck_pt + _delta(head, HEAD_LEN, sx)

	shoulder_far = chest + Vector2(-lat_arm, 0.8)
	shoulder_near = chest + Vector2(lat_arm, 0.6)
	hip_far = pelvis + Vector2(-lat_hip, 0.8)
	hip_near = pelvis + Vector2(lat_hip, 0.6)

	elbow_far = shoulder_far + _delta(arm_far_upper, UPPER_ARM, sx)
	hand_far = elbow_far + _delta(arm_far_fore, FOREARM, sx)
	elbow_near = shoulder_near + _delta(arm_near_upper, UPPER_ARM, sx)
	hand_near = elbow_near + _delta(arm_near_fore, FOREARM, sx)

	# 爪尖沿着**前臂方向**伸出 —— 爪是手的延伸, 不是一根独立的棍子。
	# ⚠️ 用前臂角而不是再存一个 claw_angle: 多一个可写角度就多一种「爪和手脱节」的姿势。
	claw_far = hand_far + _delta(arm_far_fore, CLAW_LEN, sx)
	claw_near = hand_near + _delta(arm_near_fore, CLAW_LEN, sx)

	if leg_ik:
		# 落点里的横向站位换成当前视角的髋部位置, 只有摆动量按 sx 压扁。
		var fn: Vector2 = Vector2(hip_near.x + (leg_near_foot.x - FOOT_LAT) * sx, leg_near_foot.y)
		var ff: Vector2 = Vector2(hip_far.x + (leg_far_foot.x + FOOT_LAT) * sx, leg_far_foot.y)
		# ⚠️ bend_forward = false = 逆关节 (膝盖朝后)。见文件头 § 逆关节腿。
		knee_near = ik2(hip_near, fn, THIGH, SHIN, false)
		ankle_near = knee_near + (fn - knee_near).normalized() * SHIN
		knee_far = ik2(hip_far, ff, THIGH, SHIN, false)
		ankle_far = knee_far + (ff - knee_far).normalized() * SHIN
	else:
		knee_far = hip_far + _delta(leg_far_thigh, THIGH, sx)
		ankle_far = knee_far + _delta(leg_far_shin, SHIN, sx)
		knee_near = hip_near + _delta(leg_near_thigh, THIGH, sx)
		ankle_near = knee_near + _delta(leg_near_shin, SHIN, sx)

	tail_base = pelvis + Vector2(-4.0, 1.0)
	tail_mid = tail_base + _delta(tail_a, TAIL_LEN1, sx)
	tail_tip = tail_mid + _delta(tail_b, TAIL_LEN2, sx)


# ============================================================
# 姿态表
# ============================================================

## 站桩: 呼吸 + 尾巴轻摆。幅度小 —— 站着不动的敌人不该看起来在蓄力。
func _pose_idle(t: float) -> void:
	var b: float = sin(TAU * t)
	pelvis.y = PELVIS_Y + 0.6 * b
	spine = 0.50 + 0.025 * b
	neck = 0.30 - 0.02 * b
	head = 0.45 + 0.02 * b
	tail_a = -1.90 + 0.10 * b
	tail_b = -1.05 + 0.14 * b


## 移动: 步态周期 + 前倾 + 手臂反相 + 尾巴甩动。
##
## 🏗️ 和玩家跑动同样三个必要条件 (前倾 / 手脚反相 / 身体沉浮), 但幅度都更大:
##    妖兽是前扑的冲刺, 前倾和尾巴是它和「直立的人」在剪影上最大的区别。
func _pose_move(t: float) -> void:
	var th: float = TAU * t
	var c: float = cos(th)

	spine = 0.55 + 0.03 * c
	neck = 0.30
	head = 0.48
	# ⚠️ 和玩家同一条: 跨步最大时最低。写反了 IK 会把脚拽离地面。
	pelvis.y = PELVIS_Y + 0.5 + 1.2 * absf(c)

	leg_ik = true
	leg_near_foot = Vector2(FOOT_LAT, 0.0) + _move_foot(th)
	leg_far_foot = Vector2(-FOOT_LAT, 0.0) + _move_foot(th + PI)

	# 手臂和腿反相: 近腿在前时, 近爪在后。
	var swing: float = 0.30 * c
	arm_far_upper = 2.62 + swing
	arm_far_fore = arm_far_upper - 0.60
	arm_near_upper = 2.55 - swing
	arm_near_fore = arm_near_upper - 0.60

	tail_a = -1.90 + 0.12 * c
	tail_b = -1.05 + 0.16 * c
	mouth_open = 0.15


## 移动时一只脚踝的落点 (中线偏移, 不含 ±FOOT_LAT 站位)。
## 支撑期贴地由前往后滑, 摆动期抬起从后往前绕 —— 和玩家同一个模型, 只是步子短。
static func _move_foot(th: float) -> Vector2:
	return Vector2(5.5 * cos(th), -2.7 + 6.0 * minf(0.0, sin(th)))


## 起手: 身体直起来后仰, 出招爪拉到身后, 张嘴, 尾巴压低。
##
## 🎮 这是整个战斗博弈里**最重要的一段动画**: 玩家必须一眼看出「它要来了」。
##    地面预警负责「打哪儿」, 这个姿态负责「它正在蓄力」—— 缺一个都读不出来。
##
## ⚠️ 爪必须真的**拉到身后** (角度越过 0 = 指向斜后上方)。只抬手不后拉的话,
##    起手和命中在剪影上只差一根棍子的角度, 远处根本分不清。
func _pose_windup(t: float) -> void:
	spine = lerpf(0.50, 0.12, t)
	neck = lerpf(0.30, -0.10, t)
	head = lerpf(0.45, -0.20, t)
	pelvis.y = PELVIS_Y + 1.5 * t

	arm_near_upper = lerpf(2.55, -0.85, t)
	arm_near_fore = lerpf(1.95, -1.45, t)
	# 另一只爪收到胸前护着 —— 两只爪都在身体的**同侧后面**就没法区分主次了
	arm_far_upper = lerpf(2.62, 1.85, t)
	arm_far_fore = arm_far_upper - 0.45

	leg_near_thigh = PI + 0.48 + 0.12 * t
	leg_near_shin = PI - 0.42 - 0.06 * t
	leg_far_thigh = PI + 0.42 + 0.10 * t
	leg_far_shin = PI - 0.36 - 0.05 * t

	tail_a = lerpf(-1.90, -1.35, t)
	tail_b = lerpf(-1.05, -0.70, t)
	mouth_open = t


## 命中: 爪从身后甩到身前, 身体前扑, 尾巴甩直。
## 0.14 秒, 很短 —— 所以要「一下子到底」, 中间帧越少越有打击感。
func _pose_strike(t: float) -> void:
	spine = lerpf(0.20, 0.85, t)
	neck = lerpf(0.10, 0.55, t)
	head = lerpf(0.05, 0.62, t)
	pelvis.y = PELVIS_Y + 1.0
	pelvis.x = 2.5 * sin(PI * t)

	# 出招爪: 从身后一路甩到身前, 停在接近水平的位置 —— 「扫过去」而不是「戳下去」
	arm_near_upper = lerpf(-0.85, 1.43, t)
	arm_near_fore = lerpf(-1.45, 1.68, t)
	# 另一只爪往后甩, 反作用力
	arm_far_upper = lerpf(1.85, 3.00, t)
	arm_far_fore = arm_far_upper + 0.30

	# 前爪那一侧的腿蹬直扑出去, 另一条腿在后蹬地 —— 「冲」是靠腿说的
	leg_near_thigh = lerpf(PI + 0.48, PI + 0.28, t)
	leg_near_shin = lerpf(PI - 0.42, PI - 0.16, t)
	leg_far_thigh = lerpf(PI + 0.42, PI + 0.64, t)
	leg_far_shin = lerpf(PI - 0.36, PI - 0.56, t)

	tail_a = lerpf(-1.35, -2.05, t)
	tail_b = lerpf(-0.70, -1.30, t)
	mouth_open = 1.0


## 收招: 爪顺着惯性落到身前下方, 身体压低 —— 破绽在姿态上是可读的。
func _pose_recover(t: float) -> void:
	spine = curve(t, [0.0, 0.85, 0.50, 0.95, 1.0, 0.60])
	neck = curve(t, [0.0, 0.55, 1.0, 0.32])
	head = curve(t, [0.0, 0.62, 1.0, 0.47])
	pelvis.y = curve(t, [0.0, PELVIS_Y + 2.0, 1.0, PELVIS_Y + 1.0])

	arm_near_upper = curve(t, [0.0, 1.43, 0.45, 2.95, 1.0, 2.62])
	arm_near_fore = curve(t, [0.0, 1.68, 0.45, 2.70, 1.0, 2.05])
	arm_far_upper = curve(t, [0.0, 3.00, 1.0, 2.66])
	arm_far_fore = arm_far_upper - 0.55

	leg_near_thigh = PI + 0.42
	leg_near_shin = PI - 0.30
	leg_far_thigh = PI + 0.56
	leg_far_shin = PI - 0.48

	tail_a = curve(t, [0.0, -2.05, 1.0, -1.80])
	tail_b = curve(t, [0.0, -1.30, 1.0, -1.00])
	mouth_open = curve(t, [0.0, 1.0, 1.0, 0.20])


## 短硬直 (平时挨打): 全身往后一震。t = 0 刚被打中 (幅度最大), 1 恢复。
func _pose_stun(t: float) -> void:
	var k: float = 1.0 - t
	spine = 0.50 - 0.40 * k
	neck = 0.30 - 0.45 * k
	head = 0.45 - 0.70 * k
	pelvis.y = PELVIS_Y + 1.0 * k

	# 两只前爪一起被震得往上翻 —— 和「趴下去」正好相反的方向
	arm_near_upper = 2.55 - 0.90 * k
	arm_near_fore = 1.95 - 0.90 * k
	arm_far_upper = 2.62 - 0.55 * k
	arm_far_fore = 2.02 - 0.75 * k

	leg_near_thigh = PI + 0.48 + 0.10 * k
	leg_near_shin = PI - 0.42 - 0.10 * k
	leg_far_thigh = PI + 0.42 + 0.08 * k
	leg_far_shin = PI - 0.36 - 0.08 * k

	tail_a = -1.90 + 0.35 * k
	tail_b = -1.05 + 0.45 * k
	mouth_open = 0.7 * k


## 长硬直 (精准格挡 / 破霸体): 整只兽被打趴下去。
##
## 🎮 必须和 STUN 明显不同 —— 不然玩家分不清「挨了一下」和「这是反击窗口」。
##    蹲伏、垂头、爪子落地、尾巴塌下, 四处一起压低剪影。
func _pose_stagger(t: float) -> void:
	var k: float = 1.0 - t
	pelvis.y = PELVIS_Y + 7.0 * k
	pelvis.x = -1.5 * k
	spine = 0.50 + 0.55 * k
	neck = 0.30 + 0.50 * k
	head = 0.45 + 0.85 * k

	# 爪子垂到地上
	arm_near_upper = lerpf(2.55, 2.95, k)
	arm_near_fore = lerpf(1.95, 2.85, k)
	arm_far_upper = lerpf(2.62, 3.00, k)
	arm_far_fore = lerpf(2.02, 2.90, k)

	leg_near_thigh = PI + 0.48 + 0.42 * k
	leg_near_shin = PI - 0.42 - 0.48 * k
	leg_far_thigh = PI + 0.42 + 0.40 * k
	leg_far_shin = PI - 0.36 - 0.50 * k

	tail_a = -1.90 + 0.40 * k
	tail_b = -1.05 + 0.35 * k
	mouth_open = 0.4 * k
