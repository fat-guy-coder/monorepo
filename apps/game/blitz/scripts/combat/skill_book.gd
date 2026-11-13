extends RefCounted
class_name SkillBook
## 技能目录 —— 全部 SkillDef 的**唯一来源**。
##
## 📚 涉及学习文档:
##   godot-1-7-classes-oop      — 静态类 / _static_init
##   godot-1-9-enums-constants  — StringName 常量
##
## ────────────────────────────────────────────────────────────
## 🎮 v0.9: 三个技能从 player.gd 的 @export 迁到这里, **数值一个没改**
## ────────────────────────────────────────────────────────────
## 落雷 (35 精力) · 护体罡气 (30) · 剑阵 (30) —— 三个技能抢同一管精力。
## 原来的设计说明 (每一招的代价为什么是那个数) 跟着数值一起搬过来了, 没有丢。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 新增一个技能的步骤 (这张表存在的意义)
## ────────────────────────────────────────────────────────────
##   ① 下面加一个 id 常量 + 一个 _make_xxx()
##   ② player.gd 的输入分支里绑一个键 (`_cast_skill(id)`)
##   ③ 只有需要专属特效时才改代码: player.gd::_spawn_skill_fx 的 match 加一行
##   —— 状态机 / 冷却 / 动画选择 / 受击打断全都不用动。
##
## ⚠️ id 既是字典键也是冷却字典的键。重复的 id 会让后面的覆盖前面的,
##    所以 smoke_test 里有一条「每个 def 的 id == 它注册的键」。


const LIGHTNING: StringName = &"lightning"
const AURA: StringName = &"aura"
const SWORD_ARRAY: StringName = &"sword_array"

## 目录顺序 = HUD / 将来的技能栏顺序。
const ORDER: Array[StringName] = [LIGHTNING, AURA, SWORD_ARRAY]

static var _defs: Dictionary = {}


static func _static_init() -> void:
	_register(_make_lightning())
	_register(_make_aura())
	_register(_make_sword_array())


static func _register(d: SkillDef) -> void:
	_defs[d.id] = d


## id → SkillDef。未知 id 返回 null 并报错 (静默返回空技能会在别处炸得更难查)。
static func get_def(id: StringName) -> SkillDef:
	var d: SkillDef = _defs.get(id)
	if d == null:
		push_error("SkillBook: 未知技能 id '%s'" % id)
	return d


static func all() -> Array[SkillDef]:
	var out: Array[SkillDef] = []
	for id: StringName in ORDER:
		var d: SkillDef = _defs.get(id)
		if d != null:
			out.append(d)
	return out


## 结构自检 —— smoke_test 调它。返回问题列表, 空 = 表是自洽的。
##
## 🏗️ 为什么把校验放在这里而不是测试里: 将来加技能的人只看这张表。
##    校验和表放在同一个文件, 他改表时必然从这一屏上滚过去。
static func problems() -> PackedStringArray:
	var out: PackedStringArray = []
	for id: StringName in _defs.keys():
		var d: SkillDef = _defs[id]
		if d.id != id:
			out.append("键 %s 与 def.id %s 不一致 (冷却会记到别的键上)" % [id, d.id])
		if d.stamina_cost <= 0.0:
			out.append("%s: 精力消耗必须 > 0" % id)
		if d.cooldown <= 0.0:
			out.append("%s: 冷却必须 > 0 (否则无 CD 连放)" % id)
		if d.family == SkillDef.Family.STRIKE and d.reach <= 0.0:
			out.append("%s: STRIKE 的 reach 必须 > 0" % id)
		if d.family == SkillDef.Family.PLACE and d.place_radius <= 0.0:
			out.append("%s: PLACE 的 place_radius 必须 > 0" % id)
	return out


# ============================================================
# 技能定义
# ============================================================

## 落雷 —— 面朝方向一定距离处, 延迟生效的圆。
##
## 🎮 数值理由 (迁自 player.gd):
##   伤害 3 —— 比满蓄重击略低、比横劈高得多。它的价值在「远」和「一片全中」,
##   伤害再给到最高, 另外两招就没有存在理由了。
##   落点 132 ≈ 两格 —— 刚好是「横劈够不到、走过去又要一步」的距离。
##   半径 46 ≈ 0.7 格 (2:1 压扁下屏幕上是 92×46 的椭圆)。
##   0.38s 的 arm_delay 是**这一招唯一的代价** —— 见 player.gd::_cast_skill 的 🏗️。
static func _make_lightning() -> SkillDef:
	var d: SkillDef = SkillDef.new()
	d.id = LIGHTNING
	d.display_name = "落雷"
	d.family = SkillDef.Family.STRIKE
	d.shape_kind = AttackShape.Kind.CIRCLE
	d.reach = 46.0
	d.offset_forward = 132.0
	d.damage = 3
	d.max_targets = 0                 # 0 = 范围内全中 (落雷就该是这样)
	d.arm_delay = 0.38
	d.recovery = 0.35                 # 出招硬直 (抬手 → 手放下), 放空就是白挨一下
	d.cooldown = 0.9
	d.stamina_cost = 35.0
	d.cast_anim = PlayerRig.Anim.CAST_LIGHTNING
	d.fx = &"lightning"
	return d


## 护体罡气 —— 张开一层持续 1.5s 的罩子, 吃掉下一次伤害。
##
## 🎮 数值理由 (迁自 player.gd):
##   精力 30 和落雷同档 (35 vs 30): 两者是**互斥的选择** —— 同一管精力,
##   这一下是打出去还是护住自己。
##   冷却 3s 比持续时间 1.5s 长一倍, 防止「罡气 → 输出 → 罡气」无缝循环。
##
## 🏗️ 它不是攻击, 所以没有 AttackShape、不进 ATTACKING —— 只是一段计时器。
##    这样罡气期间玩家还能走/闪/挡; 塞进 ATTACKING 的话得为「出招中怎么移动」
##    再写一套, 还会被 _cancel_pending_attack / 受击打断这些为攻击准备的分支误伤。
static func _make_aura() -> SkillDef:
	var d: SkillDef = SkillDef.new()
	d.id = AURA
	d.display_name = "护体罡气"
	d.family = SkillDef.Family.BUFF
	d.duration = 1.5
	d.absorb_hits = 1
	d.recovery = 0.0                  # 不锁进攻 —— 它本身就是「用输出换容错」
	d.cooldown = 3.0
	d.stamina_cost = 30.0
	d.cast_anim = PlayerRig.Anim.IDLE  # 不进状态机, 这个字段对它没有意义
	return d


## 剑阵 —— 在脚下落一座阵, 之后**留在原地**, 不再跟随玩家。
##
## 🎮 数值理由 (迁自 player.gd):
##   半径 76 ≈ 一格多一点: 够把一条走廊横切一半, 又不至于让敌人「根本进不来」
##   (那就变成无敌区了)。
##   持续 3s ≈ 一次交手的长度 —— 必须覆盖「敌人绕过来打你」的窗口,
##   否则敌人只是晚半秒到, 玩家感受不到「它被逼走了」。
##   跳伤 0.5s 一跳 → 3s 共 6 跳 × 1 = 6 点, 约敌人满血 (4) 的 1.5 倍:
##   「整段站里面」一定死, 走开一半就还有命。
##   ⚠️ 跳伤走 take_dot, **不破霸体、不硬直** —— 剑阵的价值是逼位, 不是控场。
##   施放硬直 0.25s 很短, 但**必须有**: 不然它是一个无风险的免费动作。
##   冷却 4.5s > 持续 3s, 让「两个阵无缝铺满」不可能 —— 能连铺的话最优解
##   就是站桩刷阵, 读招博弈直接消失。
##
## 🏗️ 它没有「自己的计时器」: 施放只是 ①扣精力 ②进冷却 ③丢一个 SwordArray
##    ④一小段出招硬直。之后寿命/跳伤/绘制全归 SwordArray —— 阵是场景物件,
##    不是玩家状态。记在玩家身上的话, 玩家死亡/重生会让引用悬空。
static func _make_sword_array() -> SkillDef:
	var d: SkillDef = SkillDef.new()
	d.id = SWORD_ARRAY
	d.display_name = "剑阵"
	d.family = SkillDef.Family.PLACE
	d.reach = 0.0                     # PLACE 不用 reach, 用 place_radius
	d.place_radius = 76.0
	d.duration = 3.0
	d.tick_interval = 0.5
	d.tick_damage = 1
	d.recovery = 0.25
	d.cooldown = 4.5
	d.stamina_cost = 30.0
	d.cast_anim = PlayerRig.Anim.CAST_SWORD_ARRAY
	return d
