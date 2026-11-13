extends RefCounted
class_name PlayerRig
## 玩家的**程序化骨架** —— 纯数学, 一行绘制代码都没有 (v0.8)
##
## 📚 涉及学习文档:
##   godot-2-3-node2d-basics  — _draw() / draw_set_transform
##   godot-1-12-static-typing — static 工具函数
##
## ────────────────────────────────────────────────────────────
## 🎮 为什么需要它
## ────────────────────────────────────────────────────────────
## 现在玩家是一块袍子 + 两只脚 + 一条刀。这能读「在走」「在跳」, 但读不出:
##   · 跑步和走路的区别 (只有脚在摆, 躯干没有任何重量转移)
##   · 轻击和重击的区别 —— 两招的**刀**确实不同, 但**身体**完全一样,
##     所以看起来像同一招换了刀速
##   · 施法 —— 落雷和剑阵现在都只是「刀换个角度」, 没有手部动作
##
## 骨架把这几件事分开: 躯干可以前倾/后仰, 两条腿各有大腿+小腿, 两条手臂各有
## 上臂+前臂, 刀绑在持剑手上。于是「重击」= 后仰蓄力 + 跨步 + 双臂大劈,
## 这个姿态**和轻击在剪影上就不一样**, 玩家不用看伤害数字。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 它是纯数据 + 纯函数, 不继承 Node2D, 也不画东西
## ────────────────────────────────────────────────────────────
## 两个理由:
##   ① **可测**。headless 自检可以 new 一份, 对每个状态 × 每个相位跑一遍,
##      断言「骨长不变」「刀柄永远在手心」「相位连续不跳」。挂在场景树上的节点
##      做不到这么便宜的全覆盖枚举。
##   ② **可换**。这个文件是**临时美术**。真精灵接进来那天, 删掉它 + 删掉
##      player.gd 里的 _draw_rig(), 换成按 anim_state() 选帧的 Sprite2D ——
##      状态判断一行都不用动, 因为它们从来不在这个文件里。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 角度约定: 绝对角, 0 = 正上, +PI/2 = 正前, PI = 正下
## ────────────────────────────────────────────────────────────
## 方向 = (sin a, -cos a)。这是一个「罗盘」: 0 指向天上, 往 +x 转是正数。
##   · 手臂垂下 = PI        · 手臂前平举 = PI/2     · 手臂举过头 = 0
##   · 腿垂下   = PI        · 腿向前迈   = PI-0.5   · 腿向后蹬 = PI+0.5
##   · 举剑指天 = 0         · 劈到身前下 = PI*0.78
##
## ⚠️ 为什么用**绝对角**而不是「相对父骨骼」的角:
##    相对角在理论上更「骨骼」, 但每一段的呈现角度都要在脑子里累加
##    (上臂 -0.3 + 前臂 -0.9 = ?), 调一次姿态要算一遍, 而且算错了画面上
##    只是「手的位置有点怪」—— 不会报错。这里的姿态是**整体作者化**的
##    (每个状态一整张表), 绝对角写起来就是「手朝哪」, 没有累加。
##    代价是躯干转动不会自动带着手臂走 —— 所以每个姿态里手臂角都是单独写死的,
##    这恰好也是我们想要的: 大劈砍时肩膀和手本来就该分开调。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 骨架永远是**朝右**的, 朝左由绘制层镜像
## ────────────────────────────────────────────────────────────
## 老代码里 _draw_sword() 每个方向向量都乘一次 f = ±1。那是「忘记镜像」的温床:
## 漏一处就是「朝左挥刀往身后挥」, 画面上只是方向有点怪, 极难发现。
## 现在骨架只产出一套朝右的坐标, 朝左时由 player.gd 在 draw_set_transform 里
## 把 x 缩成 -1 —— 漏镜像在结构上不可能发生。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 四向: 侧视照常解算, 背/正面把 x 压扁
## ────────────────────────────────────────────────────────────
## 背对镜头 (朝上) 和面对镜头 (朝下) 时, 前后摆动在屏幕上只剩纵向分量。
## 完整解算之后把所有点的 x 乘 DEPTH_SQUASH, 就是「前扑后蹬被透视压扁」的效果 ——
## 一个参数解决, 而且躯干宽度不参与压扁 (人从背后看并不会变窄)。
##
## ⚠️ 不要给背/正面单独写一套姿态。那会变成 14 个状态 × 3 个视角 = 42 张表,
##    而它们要表达的其实是同一件事, 只是投影不同。


## 动画状态 —— **这是将来接精灵帧的接口**。
## 换成美术资源时, 这个 enum 直接变成 SpriteFrames 里的动画名, phase 变成帧进度。
enum Anim {
	IDLE,
	RUN,
	JUMP_RISE,
	JUMP_FALL,
	LAND,
	LIGHT,
	HEAVY_CHARGE,
	HEAVY_SWING,
	CAST_LIGHTNING,
	CAST_SWORD_ARRAY,
	BLOCK,
	HIT,
	DASH,
	GUARD_BROKEN,
}

## 视角: 侧面 (左右) / 背面 (朝上) / 正面 (朝下)
enum View { SIDE, BACK, FRONT }

# ============================================================
# 骨长 —— 一律常量, 任何姿态都改不了
# ============================================================
#
# 🏗️ 骨长写死是这套东西最基本的约束: 如果某个姿态能把大腿拉长,
#    那个姿态就是错的, 而不是「这一帧允许」。自检里有一条专门锁这件事。
const TORSO_LEN: float = 12.0
const NECK_LEN: float = 3.0
const HEAD_LEN: float = 6.0
const UPPER_ARM: float = 9.0
const FOREARM: float = 9.0
const THIGH: float = 12.5
const SHIN: float = 13.0
const HEAD_R: float = 6.8
const FOOT_LEN: float = 6.5
const FOOT_H: float = 3.5

## 骨盆的默认高度 (身体局部坐标, 脚底原点)。
## -30 配 THIGH+SHIN = 25.5 → 直立时脚踝在 -4.5, 脚掌 4.5 厚正好落地。
## ⚠️ 这个数**和腿长是一对**: 只改骨盆高度不改腿长, 角色会悬空或陷进地里。
const PELVIS_Y: float = -30.0

## 背/正面时 x 的压扁比例。0.42 ≈ 和地面的 2:1 压扁是同一个量级,
## 太大看不出纵深, 太小两条腿会叠成一根柱子。
const DEPTH_SQUASH: float = 0.42

## 刀身默认长度 (从手心往外量)。重击单独调长 —— 「这一下很重」必须在手上先看到。
const BLADE_LEN: float = 26.0
const BLADE_LEN_HEAVY: float = 33.0

# ============================================================
# 姿态输入 (apply() 写这些)
# ============================================================

## 骨盆位置 (身体局部坐标, 原点在脚底)
var pelvis: Vector2 = Vector2(0.0, PELVIS_Y)
## 骨盆 → 胸口的绝对方向角
var spine: float = 0.0
## 胸口 → 颈根的绝对方向角
var neck: float = 0.0
## 颈根 → 头心的绝对方向角
var head: float = 0.0

## 两条手臂: [上臂绝对角, 前臂绝对角]。
## ⚠️ near = 靠近镜头的这一侧 = **持剑手**。它必须最后画 (压在躯干上),
##    否则刀会被自己的身体挡住 —— 而这恰好是玩家最需要看清的那只手。
var arm_near_upper: float = PI
var arm_near_fore: float = PI
var arm_far_upper: float = PI
var arm_far_fore: float = PI

## 两条腿: [大腿绝对角, 小腿绝对角]
var leg_near_thigh: float = PI
var leg_near_shin: float = PI
var leg_far_thigh: float = PI
var leg_far_shin: float = PI

## 腿的「脚踝落点」模式。开了之后 solve() 用两骨 IK 反推膝盖, 忽略上面四个角度。
##
## 🏗️ 为什么跑步必须用 IK 而不是角度:
##    跑步时脚必须**踩在地上**, 而角度是「大腿抬多少度」—— 大腿一抬, 脚自然就离地了。
##    用角度写跑步, 每调一次摆幅脚就浮起几像素, 而画面上只是「他好像有点飘」,
##    不报错, 也说不清哪里不对 (这一版真踩过: 跨步最大那一帧两只脚全悬空 7px)。
##    给一个落点, 膝盖自己算 —— 「踩在地上」于是成了**算出来的结果**, 不是调参的运气。
##
##    代价: IK 的输入是绝对坐标, 所以躯干上下起伏时膝盖会自动多弯一点,
##    这正是真人的做法 (身体一沉, 膝盖自己吸收)。用角度写反而做不到。
var leg_ik: bool = false
var leg_near_foot: Vector2 = Vector2(1.6, -3.5)
var leg_far_foot: Vector2 = Vector2(-1.6, -3.5)

## 刀的方向角 (绝对) 与长度
var sword_angle: float = PI - 0.72
var sword_len: float = BLADE_LEN

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
## 刀: 柄 = 手心, 尖 = 柄 + 方向 × 长度
var grip: Vector2 = Vector2.ZERO
var tip: Vector2 = Vector2.ZERO


## 方向角 → 单位向量。0 = 上, +PI/2 = 前 (+x), PI = 下。
static func dir_of(angle: float) -> Vector2:
	return Vector2(sin(angle), -cos(angle))


## 两骨 IK: 已知根点 a、末端目标 target、两段骨长, 求**关节点** (膝盖/肘)。
##
## 🏗️ 用余弦定理, 不做迭代: 两骨 IK 有解析解, 迭代解一次要跑十几轮, 而且可能不收敛。
##
## ⚠️ **距离必须夹到可达范围**。目标比 l1+l2 还远时 (比如身体被跑到腿够不到的地方),
##    不夹的话 acos 的参数会出界成 NaN, 而 NaN 传进 draw_colored_polygon 的后果是
##    「这个角色整帧不画」—— 不报错, 只是人不见了。夹住之后最多是「腿伸直了但没踩到」,
##    那是看得见的、可以调的问题。
##
## `bend_forward` 决定膝盖朝哪边翻。人腿的膝盖朝前, 所以腿一律传 true。
static func ik2(a: Vector2, target: Vector2, l1: float, l2: float, bend_forward: bool) -> Vector2:
	var d: Vector2 = target - a
	var raw: float = d.length()
	if raw < 0.001:
		return a + Vector2(0.0, l1)   # 退化: 目标就在根上 → 直接往下伸
	var dist: float = clampf(raw, absf(l1 - l2) + 0.01, l1 + l2 - 0.01)
	var dir: Vector2 = d / raw
	var cos_a: float = clampf((l1 * l1 + dist * dist - l2 * l2) / (2.0 * l1 * dist), -1.0, 1.0)
	var splay: float = acos(cos_a)
	# ⚠️ 旋转方向的符号: 起点朝下 = (0, +1), base = +PI/2。
	#    往 -splay 转得到 +x (朝前), 往 +splay 转得到 -x (朝后)。
	#    写反了腿会像鸟一样朝后翻 —— 画面很怪但不会报错。
	var base: float = atan2(dir.y, dir.x)
	var sgn: float = -1.0 if bend_forward else 1.0
	var ang: float = base + splay * sgn
	return a + Vector2(cos(ang), sin(ang)) * l1


## 关键帧曲线求值。keys = [p0, v0, p1, v1, ...], p 必须递增, t 会被夹到 [p0, p_last]。
##
## 🏗️ 为什么不用 `lerpf(a, b, t)` 一段段拼:
##    一招的动作是**三到四个关键帧**, 拼起来要么写成嵌套 lerp (读不出来),
##    要么每个关键帧各写一个 if (改一个数要动三处)。这张表是「这一招的手在哪」
##    唯一的一处描述, 调手感就改这一行。
static func curve(t: float, keys: Array) -> float:
	var n: int = int(keys.size() / 2.0)   # 关键帧成对出现; 显式 /2.0 避开「整数除法」告警
	if n <= 0:
		return 0.0
	if t <= float(keys[0]):
		return float(keys[1])
	for i: int in range(1, n):
		var p1: float = float(keys[i * 2])
		if t <= p1:
			var p0: float = float(keys[(i - 1) * 2])
			var v0: float = float(keys[(i - 1) * 2 + 1])
			var v1: float = float(keys[i * 2 + 1])
			var span: float = maxf(0.0001, p1 - p0)
			return lerpf(v0, v1, clampf((t - p0) / span, 0.0, 1.0))
	return float(keys[n * 2 - 1])


## 回到「站着不动」的默认姿态。**每次 apply() 前必须先调它** ——
## 否则上一个状态的残留角度会漏进下一个状态 (比如打完重击腿还是那个跨步)。
func reset() -> void:
	pelvis = Vector2(0.0, PELVIS_Y)
	spine = 0.0
	neck = 0.0
	head = 0.0
	arm_near_upper = PI - 0.04
	arm_near_fore = PI - 0.22
	arm_far_upper = PI + 0.06
	arm_far_fore = PI + 0.18
	leg_near_thigh = PI - 0.05
	leg_near_shin = PI - 0.03
	leg_far_thigh = PI + 0.07
	leg_far_shin = PI + 0.02
	leg_ik = false
	leg_near_foot = Vector2(1.6, -3.5)
	leg_far_foot = Vector2(-1.6, -3.5)
	sword_angle = PI - 0.72
	sword_len = BLADE_LEN


## 摆出一个姿态。`phase` 的语义按状态而定:
##   · 循环动作 (IDLE / RUN) → 0~1 的循环进度
##   · 一次性动作 (LIGHT / HEAVY_SWING / CAST_*) → 0~1 的招式进度
##   · 可蓄动作 (HEAVY_CHARGE) → 0~1 的蓄力进度
##   · 瞬时动作 (HIT / DASH / LAND) → 0~1 的剩余时间
##
## ⚠️ 这个函数**不读任何玩家状态**, 只吃 (anim, phase)。这是它可测的全部原因,
##    也是「动画不会和判定漂移」的结构保证: 相位是从判定那套计时器算出来的,
##    这里没有第二个时钟。
func apply(anim: int, phase: float) -> void:
	reset()
	var t: float = clampf(phase, 0.0, 1.0)

	match anim:
		Anim.IDLE:
			_pose_idle(t)
		Anim.RUN:
			_pose_run(t)
		Anim.JUMP_RISE:
			_pose_jump_rise()
		Anim.JUMP_FALL:
			_pose_jump_fall()
		Anim.LAND:
			_pose_land(t)
		Anim.LIGHT:
			_pose_light(t)
		Anim.HEAVY_CHARGE:
			_pose_heavy_charge(t)
		Anim.HEAVY_SWING:
			_pose_heavy_swing(t)
		Anim.CAST_LIGHTNING:
			_pose_cast_lightning(t)
		Anim.CAST_SWORD_ARRAY:
			_pose_cast_sword_array(t)
		Anim.BLOCK:
			_pose_block(t)
		Anim.HIT:
			_pose_hit(t)
		Anim.DASH:
			_pose_dash()
		Anim.GUARD_BROKEN:
			_pose_guard_broken(t)


## 正运动学: 由角度算出所有关节点。
##
## 🏗️ 背/正面 (朝上/朝下) 的透视压扁**只作用在「方向增量」上, 不作用在「站位」上**。
##    这两件事必须分开, 否则会得到一具被压扁的人: 第一版是把解算完的所有点统一乘 x,
##    结果两条手臂被压进身体中线里 —— 从背后看, 人的手臂在**身体两侧**,
##    该压扁的是「前后摆动」, 不是「左右站位」。
##
##    所以: 肩/髋的横向偏移 (lat_arm / lat_hip) 不压;
##    从这些关节点往外伸的每一段 (dir × 长度) 才压。
func solve(view: int = View.SIDE) -> void:
	var wide: bool = view != View.SIDE
	var sx: float = DEPTH_SQUASH if wide else 1.0
	# 侧视时双肩/双髋只差一点点 (那是深度上的错位); 背/正面时它们才真正左右分开。
	# ⚠️ lat_arm 必须略大于袍子上沿半宽 (7.3), 不然两条手臂整条藏在袍子里 ——
	#    背/正面看到的就是「一个布口袋顶着一颗头」。
	var lat_arm: float = 7.0 if wide else 1.2
	var lat_hip: float = 4.6 if wide else 1.6

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

	if leg_ik:
		# 脚踝目标模式: 膝盖由 IK 反推, 脚踝落在目标上 (够不到时骨头仍保持原长)。
		# 目标里的横向站位换成当前视角的髋部位置, 摆动量才按 sx 压扁。
		var fn: Vector2 = Vector2(hip_near.x + (leg_near_foot.x - 1.6) * sx, leg_near_foot.y)
		var ff: Vector2 = Vector2(hip_far.x + (leg_far_foot.x + 1.6) * sx, leg_far_foot.y)
		knee_near = ik2(hip_near, fn, THIGH, SHIN, true)
		ankle_near = knee_near + (fn - knee_near).normalized() * SHIN
		knee_far = ik2(hip_far, ff, THIGH, SHIN, true)
		ankle_far = knee_far + (ff - knee_far).normalized() * SHIN
	else:
		knee_far = hip_far + _delta(leg_far_thigh, THIGH, sx)
		ankle_far = knee_far + _delta(leg_far_shin, SHIN, sx)
		knee_near = hip_near + _delta(leg_near_thigh, THIGH, sx)
		ankle_near = knee_near + _delta(leg_near_shin, SHIN, sx)

	# ⚠️ 刀柄 = 手心, 不是一个单独摆出来的点。单独摆的话, 手一动刀就会脱手悬空,
	#    而那在画面上看起来像「刀在飘」, 不会报错。
	grip = hand_near
	tip = grip + _delta(sword_angle, sword_len, sx)


## 「沿 angle 走 length, 且 x 分量乘 sx」—— 所有骨段的唯一算法, 压扁只发生在这里。
static func _delta(angle: float, length: float, sx: float) -> Vector2:
	return Vector2(sin(angle) * sx, -cos(angle)) * length


# ============================================================
# 姿态表
# ============================================================
#
# 🎮 每个函数只做一件事: 把「这一刻这个人身体是什么样」写成角度。
#    数值是起点, 不是定论 —— F5 看到不对就直接改, 不用改结构。

## 站立: 极小的呼吸。幅度必须小 —— 站桩时躯干一摇, 玩家会以为角色在喘/在蓄力。
func _pose_idle(t: float) -> void:
	var b: float = sin(TAU * t)
	pelvis.y = PELVIS_Y + 0.7 * b
	spine = 0.04 + 0.02 * b
	head = -0.015 * b
	arm_far_upper = PI + 0.06
	arm_far_fore = PI + 0.18


## 跑动: 腿前后交替 + 躯干前倾 + 手臂反相。
##
## 🏗️ 三个「看起来在跑」的必要条件, 少一个就不像:
##   ① 躯干前倾 (0.20 rad ≈ 11°) —— 站着不动的人不会前倾
##   ② 手臂和腿**反相** —— 同手同脚是人形生物最刺眼的破绽
##   ③ 身体随步伐沉浮 —— 没有起伏的跑动像滑冰
func _pose_run(t: float) -> void:
	var th: float = TAU * t
	var c: float = cos(th)
	spine = 0.20
	neck = 0.06
	head = 0.02

	# ⚠️ 起伏方向: **跨步最大时最低** (腿撑开了, 胯自然矮下去), 单脚在身下时最高。
	#    写反了的话, 跨步最大那一帧腿够不到地面 —— IK 会把脚拽离地面, 人就飘了。
	pelvis.y = PELVIS_Y + 0.6 + 1.6 * absf(c)

	# 腿走落点 (见 leg_ik 的注释): 支撑期脚在地上从前往后, 摆动期抬起从后往前
	# ⚠️ 落点是「相对自己那一侧髋部的中线偏移」, 横向站位 (±1.6) 由这里加,
	#    因为 solve() 按视角把站位改宽 (背/正面 3.4), 而摆动量只该随视角压扁。
	leg_ik = true
	leg_near_foot = Vector2(1.6, 0.0) + _run_foot(th)
	leg_far_foot = Vector2(-1.6, 0.0) + _run_foot(th + PI)

	# 手臂与腿反相: 近腿在前时, 近手在后。
	# 持剑手幅度只有一半 —— 手里有把 26px 的刀, 大摆会像在甩鞭子。
	var arm_swing: float = 0.48 * c
	arm_far_upper = PI - arm_swing
	arm_far_fore = arm_far_upper + 0.85
	arm_near_upper = PI + arm_swing * 0.55
	arm_near_fore = arm_near_upper + 0.60

	sword_angle = PI - 0.86
	sword_len = BLADE_LEN


## 跑动时一只脚的落点 —— **中线偏移**(x 不含左右站位, 由调用方加 ±1.6)。
##
## 🏗️ 用 cos 走横向、只在**正弦为负的那半圈**抬脚:
##    支撑期 = 脚贴地, 位置从身前 (+stride) 移到身后 (-stride);
##    摆动期 = 脚抬起, 从身后绕回身前。
##    这正是「脚相对于身体在向后走」的错觉来源 —— 角色没动, 但脚在动。
static func _run_foot(th: float) -> Vector2:
	return Vector2(
		8.0 * cos(th),
		-3.5 + 7.5 * minf(0.0, sin(th)))


## 起跳: 收腿 + 举臂。收腿是「离地」最强的信号, 比高度本身还强。
func _pose_jump_rise() -> void:
	spine = -0.10
	head = -0.06
	leg_near_thigh = PI - 0.72
	leg_near_shin = PI + 0.28
	leg_far_thigh = PI - 0.18
	leg_far_shin = PI + 0.62
	arm_near_upper = PI * 0.34
	arm_near_fore = PI * 0.18
	arm_far_upper = -PI * 0.30
	arm_far_fore = -PI * 0.10
	sword_angle = -PI * 0.12


## 下落: 腿伸开准备落地, 手臂张开保持平衡。
## ⚠️ 和起跳必须**长得不一样** —— 上升和下落是两件事, 用同一个姿态的话,
##    玩家判断不了自己是「还能再高」还是「要砸地了」。
func _pose_jump_fall() -> void:
	spine = 0.08
	head = 0.04
	leg_near_thigh = PI - 0.30
	leg_near_shin = PI - 0.02
	leg_far_thigh = PI + 0.18
	leg_far_shin = PI + 0.34
	arm_near_upper = PI * 0.62
	arm_near_fore = PI * 0.48
	arm_far_upper = -PI * 0.52
	arm_far_fore = -PI * 0.34
	sword_angle = PI - 0.50


## 落地硬直: 蹲一下, 然后弹回。t = 0 是刚落地 (最深), 1 是恢复。
func _pose_land(t: float) -> void:
	var k: float = 1.0 - t
	pelvis.y = PELVIS_Y + 5.5 * k
	spine = 0.10 + 0.34 * k
	head = -0.18 * k
	leg_near_thigh = PI - 0.46 * k
	leg_near_shin = PI + 0.86 * k
	leg_far_thigh = PI + 0.26 * k
	leg_far_shin = PI + 0.58 * k
	arm_near_upper = PI - 0.55 * k
	arm_near_fore = PI - 0.35 * k
	arm_far_upper = PI + 0.40 * k
	arm_far_fore = PI + 0.62 * k
	sword_angle = PI - 0.72


## 轻击 = 横劈。三拍: 拧身蓄 → 横扫 → 收在前下方。
##
## 🏗️ 只有 0.15 秒 (9 帧), 所以**起手必须极短**: 0.28 之前就要开始挥。
##    在这么短的窗口里塞一个完整的「举刀过肩」会糊成一团, 看起来像掉帧。
##    所以轻击的蓄力只体现在**躯干反向拧转**上, 手臂几乎直接从身后扫到身前。
func _pose_light(t: float) -> void:
	# 躯干: 先往后拧 (-), 再往前送 (+) —— 这是「力从腰出」唯一的表达方式
	spine = curve(t, [0.0, 0.02, 0.26, -0.24, 0.58, 0.30, 1.0, 0.16])
	head = curve(t, [0.0, 0.0, 0.30, -0.10, 1.0, 0.08])

	arm_near_upper = curve(t, [
		0.0, PI - 0.10,
		0.26, PI + 0.55,
		0.58, PI * 0.46,
		1.0, PI * 0.72,
	])
	arm_near_fore = curve(t, [
		0.0, PI - 0.24,
		0.26, PI + 0.30,
		0.58, PI * 0.40,
		1.0, PI * 0.62,
	])
	# 副手跟着身体转, 但幅度小 —— 它不参与这一刀
	arm_far_upper = curve(t, [0.0, PI + 0.08, 0.30, PI + 0.42, 1.0, PI + 0.16])
	arm_far_fore = arm_far_upper + 0.45

	# 前脚跨出去半步, 后脚蹬直 —— 扫击的力量必须有落脚点
	leg_near_thigh = curve(t, [0.0, PI - 0.06, 0.50, PI - 0.34, 1.0, PI - 0.20])
	leg_near_shin = leg_near_thigh - 0.10
	leg_far_thigh = curve(t, [0.0, PI + 0.08, 0.50, PI + 0.30, 1.0, PI + 0.18])
	leg_far_shin = leg_far_thigh + 0.22

	sword_angle = curve(t, [
		0.0, PI - 0.60,
		0.26, PI + 0.85,
		0.58, PI * 0.46,
		1.0, PI * 0.66,
	])
	sword_len = BLADE_LEN


## 重击蓄力: 刀拉到身后上方, 身体后仰, 双腿撑开。
## phase = 蓄力进度 (0 刚按下, 1 满蓄)。越满拉得越后 —— 玩家看姿态就知道快满了。
func _pose_heavy_charge(t: float) -> void:
	spine = curve(t, [0.0, 0.02, 1.0, -0.30])
	neck = curve(t, [0.0, 0.0, 1.0, -0.10])
	head = curve(t, [0.0, 0.0, 1.0, -0.16])

	arm_near_upper = curve(t, [0.0, PI + 0.30, 1.0, -0.62])
	arm_near_fore = curve(t, [0.0, PI + 0.05, 1.0, -0.86])
	# 副手也搭上来 —— 「双手握刀」是重击和轻击在剪影上最大的区别之一
	arm_far_upper = curve(t, [0.0, PI + 0.22, 1.0, -0.40])
	arm_far_fore = curve(t, [0.0, PI - 0.10, 1.0, -0.66])

	# 撑步: 前腿在前, 后腿在后, 重心沉下去
	leg_near_thigh = curve(t, [0.0, PI - 0.10, 1.0, PI - 0.34])
	leg_near_shin = leg_near_thigh + 0.14
	leg_far_thigh = curve(t, [0.0, PI + 0.10, 1.0, PI + 0.40])
	leg_far_shin = leg_far_thigh + 0.30
	pelvis.y = PELVIS_Y + 2.0 * t

	sword_angle = curve(t, [0.0, PI - 0.30, 1.0, -0.52])
	sword_len = BLADE_LEN_HEAVY


## 重击落下: 从身后上方一路砸到身前下方, 同时跨步 + 弓腰。
## 0.34 秒, 比轻击长一倍多 —— 慢本身也是「重」的一部分。
func _pose_heavy_swing(t: float) -> void:
	spine = curve(t, [0.0, -0.30, 0.22, 0.10, 0.70, 0.46, 1.0, 0.30])
	neck = curve(t, [0.0, -0.10, 0.70, 0.12, 1.0, 0.06])
	head = curve(t, [0.0, -0.16, 0.70, 0.20, 1.0, 0.10])

	arm_near_upper = curve(t, [0.0, -0.62, 0.42, PI * 0.72, 1.0, PI * 0.92])
	arm_near_fore = curve(t, [0.0, -0.86, 0.42, PI * 0.80, 1.0, PI * 0.96])
	arm_far_upper = curve(t, [0.0, -0.40, 0.42, PI * 0.62, 1.0, PI * 0.84])
	arm_far_fore = curve(t, [0.0, -0.66, 0.42, PI * 0.70, 1.0, PI * 0.90])

	# 跨步: 前腿迈出去并屈膝, 后腿蹬直 —— 最后停在一个「压下去」的低姿态
	leg_near_thigh = curve(t, [0.0, PI - 0.34, 0.55, PI - 0.62, 1.0, PI - 0.52])
	leg_near_shin = curve(t, [0.0, PI - 0.20, 0.55, PI + 0.28, 1.0, PI + 0.20])
	leg_far_thigh = curve(t, [0.0, PI + 0.40, 1.0, PI + 0.58])
	leg_far_shin = curve(t, [0.0, PI + 0.70, 1.0, PI + 0.86])
	pelvis.y = curve(t, [0.0, PELVIS_Y + 2.0, 0.70, PELVIS_Y + 5.0, 1.0, PELVIS_Y + 4.0])

	sword_angle = curve(t, [0.0, -0.52, 0.42, PI * 0.55, 1.0, PI * 0.80])
	sword_len = BLADE_LEN_HEAVY


## 落雷: 举剑引雷。刀竖直向上, 副手在胸前掐诀。
##
## ⚠️ 雷要 0.38 秒才落, 而这一招的动作只有 0.35 秒 —— 收招时雷还没下来。
##    所以姿态是「一直举着」而不是「劈下去」: 让玩家知道伤害还没到。
func _pose_cast_lightning(t: float) -> void:
	var lift: float = curve(t, [0.0, 0.0, 0.30, 1.0, 1.0, 0.92])
	spine = -0.14 * lift
	neck = -0.06 * lift
	head = -0.10 * lift

	arm_near_upper = lerpf(PI - 0.10, 0.16, lift)
	arm_near_fore = lerpf(PI - 0.24, 0.04, lift)
	# 副手: 抬到胸前, 掌心朝上 —— 「掐诀」的占位表达
	arm_far_upper = lerpf(PI + 0.06, PI * 0.42, lift)
	arm_far_fore = lerpf(PI + 0.18, PI * 0.30, lift)

	leg_near_thigh = PI - 0.10
	leg_far_thigh = PI + 0.12
	leg_far_shin = PI + 0.20

	sword_angle = lerpf(PI - 0.72, 0.0, lift)
	sword_len = BLADE_LEN


## 剑阵: 双手下按 + 刀插地。
##
## 🎮 这一招的动作只有 0.25 秒, 而且阵在**按下的瞬间**就已经落好了。
##    所以姿态的任务不是「表现施法过程」, 而是给那个瞬间一个**发力的理由**:
##    刀往地里一插, 正好解释地上为什么凭空多了一圈剑。
func _pose_cast_sword_array(t: float) -> void:
	var push: float = curve(t, [0.0, 0.0, 0.35, 1.0, 1.0, 0.86])
	spine = 0.06 + 0.30 * push
	neck = 0.10 * push
	head = -0.16 * push
	pelvis.y = PELVIS_Y + 3.0 * push

	arm_near_upper = lerpf(PI - 0.06, PI - 0.12, push)
	arm_near_fore = lerpf(PI - 0.22, PI - 0.04, push)
	arm_far_upper = lerpf(PI + 0.08, PI - 0.02, push)
	arm_far_fore = lerpf(PI + 0.20, PI + 0.04, push)

	leg_near_thigh = PI - 0.12 - 0.18 * push
	leg_near_shin = PI + 0.10 + 0.30 * push
	leg_far_thigh = PI + 0.14 + 0.10 * push
	leg_far_shin = PI + 0.22 + 0.28 * push

	# 刀竖直朝下 —— 尖埋进地里
	sword_angle = lerpf(PI - 0.72, PI, push)
	sword_len = BLADE_LEN


## 格挡: 持盾手横在身前, 副手顶住, 重心后坐。
##
## ⚠️ 盾的弧线由 _draw_shield() 画, 这里只负责让**手**到那个位置。
##    手不在盾后面的话, 看起来像盾悬在半空。
func _pose_block(t: float) -> void:
	var b: float = sin(TAU * t) * 0.5
	spine = 0.14 + 0.015 * b
	neck = 0.04
	head = -0.02
	pelvis.y = PELVIS_Y + 1.5

	arm_near_upper = PI * 0.56
	arm_near_fore = PI * 0.70
	arm_far_upper = PI * 0.42
	arm_far_fore = PI * 0.62

	leg_near_thigh = PI - 0.26
	leg_near_shin = PI + 0.16
	leg_far_thigh = PI + 0.30
	leg_far_shin = PI + 0.48

	# 刀挂在前手下面、贴着盾的内侧 —— 让它在盾后面垂着, 而不是从盾上方戳出来
	sword_angle = PI - 0.15
	sword_len = BLADE_LEN


## 受击: 整个人往后折。t = 0 刚被打中, 1 恢复。
func _pose_hit(t: float) -> void:
	var k: float = 1.0 - t
	spine = 0.10 - 0.46 * k
	neck = -0.22 * k
	head = -0.34 * k
	pelvis.y = PELVIS_Y + 2.0 * k

	arm_near_upper = PI - 0.30 * k
	arm_near_fore = PI - 0.70 * k
	arm_far_upper = PI + 0.40 * k
	arm_far_fore = PI + 0.82 * k

	leg_near_thigh = PI + 0.18 * k
	leg_near_shin = PI + 0.26 * k
	leg_far_thigh = PI - 0.26 * k
	leg_far_shin = PI - 0.06 * k

	sword_angle = PI - 1.20 * k - 0.30


## 闪避: 整个人向前扑, 腿拖在后, 手臂往后甩。
func _pose_dash() -> void:
	spine = 0.52
	neck = 0.18
	head = 0.10
	pelvis.y = PELVIS_Y + 3.0

	leg_near_thigh = PI + 0.55
	leg_near_shin = PI + 0.95
	leg_far_thigh = PI + 0.30
	leg_far_shin = PI + 0.78

	arm_near_upper = PI + 0.75
	arm_near_fore = PI + 0.95
	arm_far_upper = PI + 0.60
	arm_far_fore = PI + 0.80

	sword_angle = PI - 0.30
	sword_len = BLADE_LEN


## 破防: 跪伏 + 低头 + 双手垂着。这是「你现在的处境很糟」的身体语言,
## 必须和受击 (还站着) 明显不同 —— 不然玩家分不清「挨了一下」和「盾没了」。
func _pose_guard_broken(t: float) -> void:
	var b: float = sin(TAU * t)
	pelvis.y = PELVIS_Y + 8.0
	spine = 0.62 + 0.03 * b
	neck = 0.30
	head = 0.40

	arm_near_upper = PI - 0.20
	arm_near_fore = PI + 0.10
	arm_far_upper = PI + 0.20
	arm_far_fore = PI + 0.36

	leg_near_thigh = PI - 0.50
	leg_near_shin = PI + 0.95
	leg_far_thigh = PI + 0.20
	leg_far_shin = PI + 0.70

	sword_angle = PI - 0.20
	sword_len = BLADE_LEN
