extends Resource
class_name SkillDef
## 一个技能的**全部数据** —— 代价 / 形状 / 伤害 / 冷却 / 施法姿势 / 元素 / 标签。
##
## 📚 涉及学习文档:
##   godot-1-7-classes-oop    — Resource + @export + 静态工厂
##   godot-1-9-enums-constants — 位标志用 1 << n
##
## ────────────────────────────────────────────────────────────
## 🎮 为什么要有这张表 (v0.9)
## ────────────────────────────────────────────────────────────
## v0.8 之前, 一个技能 = player.gd 里一组 @export 数值 + 一个**专属施放函数**
## (_cast_skill / _cast_aura / _cast_sword_array)。加第四个技能要同时动:
##   状态机 (ATTACKING 怎么进) · 冷却计时器 · 动画选择 · 输入绑定
## 四处 —— 而「技能是什么」本该只是一份数据。
##
## 现在: 技能 = SkillDef + 一个输入绑定。`family` 决定玩家侧**怎么执行**:
##   STRIKE → 生成一个 AttackShape 判定框 (落雷)
##   BUFF   → 给自己挂一个持续计时器 (罡气)
##   PLACE  → 在地上放一个留在原地的阵 (剑阵)
## 状态机只认 family, 不认具体技能 —— 所以「加技能」不会改到状态机。
##
## ────────────────────────────────────────────────────────────
## 🏗️ 为什么先不写 .tres
## ────────────────────────────────────────────────────────────
## 资源文件适合「设计师在编辑器里拖参数」。现在三个技能是**代码原语**,
## 数值和实现要一起改, 放在 skill_book.gd 的静态表里 diff 是可读的。
## 将来内容量上来 (6 流派 × 5 技能) 时, 给这些字段加 @export、把 make_* 换成
## .tres 即可 —— 消费方读的是同一组字段, 换存储不会动到 player.gd。
##
## ────────────────────────────────────────────────────────────
## ⚠️ 表里暂时没有「命中后做什么」(灼烧 / 冻结 / 反应)
## ────────────────────────────────────────────────────────────
## 那是 v0.9.1 的标签解析。本轮只把「一个技能是什么」收成一份数据,
## 并把第一个标签 (UNBLOCKABLE) 打通到判定层 —— 元素先只是身份, 不是机制。


## 执行方式 —— 决定 player.gd 用哪一段代码把它放出来。
enum Family {
	STRIKE,  ## 立刻 (或延迟) 打出一个 AttackShape
	BUFF,    ## 给自己挂一个持续计时器 (吸收 / 增益)
	PLACE,   ## 在地上放一个留在原地的阵 (布置)
}

## 五行 + 毒。**目前只是身份标签**, 不参与判定 —— 反应表是 v0.9.1。
## ⚠️ 新增流派只加枚举值, 不要给每个技能写一个 if —— 反应应该查表 (见 COMBAT_MATRIX)。
enum Element {
	NONE,
	METAL,   ## 金: 破甲 / 穿透
	WOOD,    ## 木: 回复 / 缠绕
	WATER,   ## 水: 减速 / 凝滞
	FIRE,    ## 火: 灼烧 / 引爆
	EARTH,   ## 土: 护体 / 震地
	POISON,  ## 毒: 叠层 / 爆发
}

# 标签 —— 位标志, 一个技能可以同时带多个。
#
# 🏗️ 为什么用位标志而不是 bool 字段: 每加一个机制 (不可格挡 / 破甲 / 持续伤害 /
#    击退 / 吸血…) 都往 SkillDef 里塞一个 bool 的话, 三个技能的构造代码会变成
#    一长串 `d.unblockable = false; d.armor_break = false; ...`。
#    位标志让「没有标签」= 一个 0, 新增标签不改任何既有构造。
const TAG_NONE: int = 0
## 格挡挡不住 (但闪避/跳跃照常有效)。第一个真正打通到判定层的标签。
const TAG_UNBLOCKABLE: int = 1 << 0
## 能打断霸体 (满蓄重击同款)。留给「所有技能」共用。
const TAG_ARMOR_BREAK: int = 1 << 1
## 命中后造成持续伤害。v0.9.1 的元素层会用它。
const TAG_DOT: int = 1 << 2


# ============================================================
# 身份
# ============================================================
## 唯一 id —— 冷却字典的键, 也是输入绑定引用的名字。
var id: StringName = &""
var display_name: String = ""
var family: Family = Family.STRIKE
var element: Element = Element.NONE
var tags: int = TAG_NONE

# ============================================================
# 代价 / 节奏 —— 三种 family 共用
# ============================================================
var stamina_cost: float = 30.0
var cooldown: float = 1.0
## 施法硬直 (秒)。STRIKE = 出招总时长; PLACE = 锁进攻的时长; BUFF 不用 (0)。
var recovery: float = 0.3
## 将来的 SpriteFrames 动画名。现在直接取 PlayerRig.Anim。
## ⚠️ BUFF 不进状态机, 这个字段对它没有意义 (留 IDLE)。
var cast_anim: PlayerRig.Anim = PlayerRig.Anim.IDLE
## 专属特效的注册名 (player.gd::_spawn_skill_fx 里 match)。
## &"" = 没有专属特效 —— 只出判定和数字 (新技能的默认状态)。
var fx: StringName = &""

# ============================================================
# STRIKE 专用
# ============================================================
var shape_kind: AttackShape.Kind = AttackShape.Kind.CIRCLE
## 世界单位。RECT → 身前长度; ARC/CIRCLE → 半径。
var reach: float = 46.0
## **仅 RECT**: 纵深总宽 (世界单位)。
var depth: float = 40.0
## **仅 ARC**: 朝向两侧各张开的半角 (度)。
var half_angle_deg: float = 60.0
## **仅 CIRCLE**: 圆心沿朝向的偏移 (世界单位, 正 = 身前)。
var offset_forward: float = 0.0
var height_min: float = -INF
var height_max: float = INF
var damage: int = 1
## 0 = 范围内全中。
var max_targets: int = 1
## 生效延迟 (秒) —— 落雷的「从天而降」。
var arm_delay: float = 0.0

# ============================================================
# BUFF / PLACE 专用
# ============================================================
## BUFF → 持续时间; PLACE → 阵的寿命。
var duration: float = 1.5
## **仅 BUFF**: 能吃掉几次伤害。
var absorb_hits: int = 1
## **仅 PLACE**: 阵半径 (世界单位)。
## ⚠️ 和 reach 分开: 阵的范围和「打出去的距离」不是同一个概念,
##    合成一个字段会出现「调阵半径顺手改到某个技能的射程」。
var place_radius: float = 76.0
var tick_interval: float = 0.5
var tick_damage: int = 1


## 这个技能该打出什么范围 —— **形状和几何的唯一来源**。
##
## 🏗️ 判定框 / 调试面板 / 自检全部读这个函数 (或它派生出的 shape 实例),
##    所以「表里写的范围」和「打得到的范围」不可能漂移。
## ⚠️ 每次调用都新建一份 AttackShape (Resource 是共享引用) —— 理由见
##    player.gd::light_shape() 的 🏗️: 共享一份实例时, 任何一处「临时改半径
##    试试手感」都会波及所有使用者。
func make_shape() -> AttackShape:
	var sh: AttackShape
	match shape_kind:
		AttackShape.Kind.RECT:
			sh = AttackShape.make_rect(reach, depth)
		AttackShape.Kind.ARC:
			sh = AttackShape.make_arc(reach, half_angle_deg)
		_:
			sh = AttackShape.make_circle(reach, Vector2(offset_forward, 0.0))
	# 高度带默认 ±INF = 不限制 (落雷/罡气都不看高度)。
	return sh.band(height_min, height_max)


func has_tag(tag: int) -> bool:
	return (tags & tag) != 0


## 给人读的 —— 调试面板 / HUD / 自检失败信息。
func describe() -> String:
	var parts: PackedStringArray = [String(id)]
	if element != Element.NONE:
		parts.append("元素=%s" % element_name(element))
	if has_tag(TAG_UNBLOCKABLE):
		parts.append("不可格挡")
	if has_tag(TAG_ARMOR_BREAK):
		parts.append("破霸体")
	if has_tag(TAG_DOT):
		parts.append("持续伤害")
	return " · ".join(parts)


static func element_name(e: Element = Element.NONE) -> String:
	match e:
		Element.METAL: return "金"
		Element.WOOD: return "木"
		Element.WATER: return "水"
		Element.FIRE: return "火"
		Element.EARTH: return "土"
		Element.POISON: return "毒"
	return "无"
