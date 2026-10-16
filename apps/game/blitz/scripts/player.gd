extends CharacterBody2D
class_name BlitzPlayer
## 武侠角色控制器 — 2.5D 横版 (belt-scroll) 走位 + 跳跃 + 格挡/精准格挡 + 蓄力重击 (v0.4)
##
## 📚 涉及学习文档:
##   godot-2-6-characterbody2d    — CharacterBody2D: move_and_slide / velocity
##   godot-6-5-characterbody-deep — 可变跳跃高度 / jump buffer
##   godot-6-6-platformer-physics — 跳跃物理: 重力 / 终端速度 / 松键截断
##   godot-2-8-tilemap            — 方形地格: X 左右 + Z 纵深 (见 belt_floor.gd)
##   godot-7-8-state-machines     — 状态机: 8 个状态, 每个状态独占一帧
##   godot-5-1-input-map          — InputMap: project.godot 里的按键映射
##   godot-5-2-input-handling     — Input.get_vector / is_action_pressed / just_released
##   godot-6-2-area2d-deep        — Area2D: 攻击判定框 / 受击判定区
##   godot-6-4-collision-layers   — 位掩码: layer vs mask
##   godot-2-3-node2d-basics      — _draw() 画角色外观 / draw_set_transform 整体抬高
##   godot-1-8-signals-basics     — 自定义信号: health_changed / parried / blocked
##   godot-1-1-gdscript-basics    — 强类型标注: `var x: Vector2`
##
## ⚠️⚠️ 世界坐标模型 —— 读这个文件之前必须先接受它, 否则每一行都会看错:
##
##   世界是三个数:   x (左右)     z (纵深)     height (离地高度)
##   引擎里存成:     global_position = Vector2(x, -z × DEPTH_SCALE)   ← 纵深吃**负的**屏幕 Y
##                   height: float 单独一个变量                      ← 跳跃高度
##
##   于是「屏幕 Y 往下」= 「z 变小」= 离镜头更近。画面**上方**的敌人更远,
##   画面**下方**的离你更近 —— 正是横版清关 (DNF / 三国战纪) 的观感。
##
## ⚠️⚠️ 纵深被**压扁一半** (DEPTH_SCALE = 0.5), 换算只在 belt_space.gd 里有一份。
##   这是本文件最容易写错的一处, 规矩只有一条:
##     · `velocity` / `global_position` **是屏幕空间** —— 引擎只认它, 别动
##     · 输入方向 / 速度上限 / 射程 / 半径 **是世界空间** —— 玩法数学在这里做
##   少了自己换算的那一步, 症状是「上下走得飞快、斜着走角度是歪的」,
##   这类错**一句报错都没有**, 只是玩起来怪。
##
##   区分办法: 屏幕上量到的距离 ≠ 世界距离。往纵深走 64 世界单位, 屏幕上只动 32px。
##
##   这个模型白送了三个好处, 也是它能不推翻 v0.2/v0.3 就换视角的全部原因:
##     ① Y-sort **一行都不用改**: 排序键就是 global_position.y, 而「屏幕 Y 更大 =
##        更靠前」本来就是纵深排序。
##     ② 重力**只作用在 height 上, 永远不碰 position.y**。v0.2 那句「绝不能让重力
##        碰 position.y」换个形式继续成立, 而且这次它有物理含义: 碰它 = 角色往屏幕
##        **里面**掉, 症状是「走到一半人不见了」, 看起来像相机坏了。
##     ③ 跳跃是**纯加法**: 身体画在 `原点 + (0, -height)`, 影子留在原点。
##        和「原点在脚底、一律往负 Y 画」的既有约定天然兼容。
##
## ⚠️⚠️ 四条骨 (v0.2 定了三条, v0.4 换掉一条 —— 换的那条有代价, 见 ④):
##
##   ① **重力只改 height, 不改 position.y** (v0.2 的原话是「没有重力」)。
##
##   ② **必须 MOTION_MODE_FLOATING**。默认的 GROUNDED 会把南边的墙当成地面,
##      `is_on_floor()` 一阵乱跳。而 FLOATING 下 `is_on_floor()` **永远返回 false** ——
##      所以「在不在空中」只能自己看 height, 问不了引擎。见 _apply_vertical()。
##
##   ③ **原点在脚底**, `_draw()` 一律用负 Y 往上。Y-sort 的排序键是
##      global_position.y —— 原点在脚底, 「谁在前面」才等于「谁的 y 更大」。
##
##   ④ **朝向是 int (±1), 不再是 Vector2**。这条和 v0.2/v0.3 **正好相反**,
##      是换视角唯一一处真正的语义回退。等距时代「朝向是连续向量」是必须的
##      (八个方向都要表达); 而地平面一旦变成 XZ 矩形平面, 「上/下」就不再是朝向,
##      而是**纵深位置**。硬留着 Vector2 会立刻长出两类错:
##        · 角色朝「上」时侧视美术没有任何一帧能画 —— 画出来是个人往屏幕里钻
##        · 判定框会跑到敌人的纵深上面去, 而玩家以为自己「对着他」
##      后一条正是本轮要修的原始痛点, 所以这不是简化, 是把错误模型删掉。
##
## 🏗️ 碰撞层 (必须与 enemy.gd / attack_hitbox.gd / obstacle.gd 一致):
##   bit0 = 玩家身体   ↑本文件 collision_layer
##   bit1 = 敌人身体
##   bit2 = 玩家攻击
##   bit3 = 敌人攻击   ↓本文件 Hurtbox mask (**只监听这一个** —— 见 _ready())
##   bit4 = 墙壁/障碍  ↑本文件 collision_mask (只跟墙碰撞)
##   bit5 = 交互物/复活点
##
## 🎮 v0.3 引入的三件事 (v0.4 全部保留, 只换了朝向的表示):
##
##   **格挡** —— 免伤, 但扣精力, 而且只挡**面朝的那一边**, 背后挨打照常掉血。
##   **精准格挡** —— 按下格挡的**那一瞬间**有个 0.16s 窗口, 窗口内挨打则零伤害、
##     零消耗、还把攻击者打出 1.2s 硬直 (反击窗口)。
##   **蓄力重击** —— 按住 K/右键蓄力, 松开挥出; 满蓄**破霸体**。
##
##   这三件事缺一不可: 没有敌人出招, 格挡无从谈起; 没有精力成本,
##   举着盾就是无敌; 没有满蓄重击, 敌人起手时你除了躲没有别的解法。
##   (敌人出招见 enemy.gd 的 AttackPhase 三相位)
##
## 🏗️ v0.4 删掉的东西, 以及**为什么删它不是偷懒**:
##
##   · **鼠标瞄准 (_aim_direction)** —— 和 ④ 是同一件事。朝向只剩左右之后,
##     「鼠标指着哪个方向」不再是一个能被表达的状态: 鼠标在角色正上方时该朝左还是朝右?
##     没有答案。v0.3 那条「格挡时朝向跟随鼠标」的规则**是被等距逼出来的补丁**,
##     换成横版之后它自己没有意义了 —— 于是格挡时朝向 = 当前 facing, 和其他状态一致。
##     (留着 block_aim_override 这个出口, 自检要靠它指定朝向。见那个变量。)
##
##   · **coyote time (土狼时间)** —— 它的定义是「刚离开地面的一小段时间里仍然可以跳」,
##     前提是**有地面边缘可以掉下去**。横版清关的地面是一整块平地 (见 belt_floor.gd),
##     没有坑也没有平台, 唯一的离地方式就是自己跳起来 —— 那就等于「每次起跳都自带
##     coyote」, 这个机制失去全部意义。**这不是砍功能, 是砍一个已经空转的计时器。**
##
##   · **facing8() 八向吸附** —— 没有八个方向可以吸附了。

# ============================================================
# 信号 — 让 HUD / main.gd 被动接收, 而不是每帧轮询
# ============================================================

## 血量变化 (HUD 订阅它刷新血格)
signal health_changed(current: int, maximum: int)
## 精力变化 (HUD 订阅它刷新精力条)
signal stamina_changed(current: float, maximum: float)
## 死亡 (main.gd 订阅它安排复活)
signal died()
## 闪避开始
signal dashed(direction: Vector2)
## 攻击命中 (main.gd 订阅它震屏 —— 命中反馈的一半来自镜头)
signal hit_landed(at: Vector2)
## 精准格挡成功 (零伤害零消耗 + 攻击者硬直)
signal parried(at: Vector2)
## 普通格挡成功 (免伤, 扣了精力)
signal blocked(at: Vector2)
## 精力耗尽被打崩
signal guard_broken()

# ============================================================
# 节点引用 (player.tscn 里预创建)
# ============================================================
@onready var hurtbox: Area2D = $Hurtbox

## 受击框的**世界**半径。屏幕上它是 15×7.5 的椭圆 (2:1 压扁)。
##
## ⚠️ 数值和 v0.2/v0.3 那个 CircleShape2D(15) 一模一样 —— 但**量的是不同的东西**。
##    横向一字未改 (15 屏幕 px == 15 世界单位), 纵深从 ±30 缩到 ±15。
##    这不是调手感, 是修一个「明明躲开了却掉血」(见 _ready 里的说明)。
const HURTBOX_RADIUS: float = 15.0

# ============================================================
# 移动参数
# ============================================================
## ⚠️ 从这里往下, 速度/距离一律是**世界单位**(屏幕 px 只在 x 轴上恰好相等)。
##    纵深方向屏幕上只走一半 —— 那是压扁, 不是「走得慢」。见文件头坐标模型。
@export var move_speed: float = 320.0        ## 最大移动速度 (世界单位/s, **八个方向一致**)
@export var move_accel: float = 2000.0       ## 加速度 (屏幕单位/s², 逐轴)
@export var move_decel: float = 1600.0       ## 减速度 (屏幕单位/s², 松键时)

# ============================================================
# 跳跃参数 (物理段抄自 v0.1 横版, git 0bef2af —— 但符号翻了, 见下)
# ============================================================
## 跳跃动作名 (在 project.godot 的 [input] 里定义)。
##
## 🏗️ 用常量而不是到处写 "jump": 名字拼错时 InputMap 里根本没有这个动作, 而
##    `Input.is_action_just_pressed()` 对**不存在的动作直接返回 false** —— 不报错、
##    不警告, 只是角色永远跳不起来。集中成一个常量, 拼错至少只错一个地方。
const JUMP_ACTION: String = "jump"

## 起跳初速度 (px/s)。**正数**, 因为 height 是「向上为正」的高度。
##
## ⚠️ v0.1 里这个值是 -520, 因为那时它直接写进 velocity.y, 而屏幕 Y 向下为正。
##    现在它写进 _height_vel, 而 height 向上为正 —— 保留负数会让角色一头扎进地里,
##    而且**不会报任何错**。这是换坐标模型时最容易忽略的一处符号翻转。
@export var jump_speed: float = 520.0
## 重力加速度 px/s²。只作用在 _height_vel 上。
@export var gravity: float = 1400.0
## 下落终端速度 (px/s) —— 没有它, 从高处掉下来的速度会无限增长
@export var max_fall_speed: float = 700.0
## 松键时保留的上升速度比例。越小跳得越「一顿一顿」, 越大越接近「按多久跳多高」。
##
## 🏗️ 这是**可变跳跃高度**的实现方式, 也是跳跃手感的全部来源:
##    起跳瞬间给满初速度, 松开按键就把剩余上升速度砍掉 —— 于是轻点和长按的
##    高度差是连续的, 玩家能靠手感精确控制落点。固定高度的跳跃做不出这个。
@export var jump_cut_multiplier: float = 0.45
## 落地前提前按跳的**输入缓冲** (秒)。
##
## 🏗️ 为什么留着它, 而 coyote time 被删了 (见文件头):
##    这两个机制常被当成一对, 但它们的**前提完全不同**。coyote 需要「有边缘可掉」,
##    横版平地没有 —— 空转。而输入缓冲解决的是另一个问题: 玩家在离地还有几像素时
##    就按了跳, 那一帧不能起跳, 输入就**丢了**。这不是手感问题, 是输入丢失,
##    在平地横版里一样会发生。所以这个留, 那个删。
@export var jump_buffer_time: float = 0.08
## 走路摆动周期的换算系数: _walk_phase 每秒推进 velocity.length() * 这个值。
## 调大 = 腿摆得更快 (步子显得更碎)。
@export var walk_phase_rate: float = 0.055

# ============================================================
# 闪避参数
# ============================================================
@export var dash_speed: float = 900.0
@export var dash_duration: float = 0.15
@export var dash_cooldown: float = 0.5

# ============================================================
# 轻击 = 横劈 (扇形) —— 贴着身扫一大圈, 但够不着远处
# ============================================================
@export var attack_light_damage: int = 1
@export var attack_light_duration: float = 0.15   ## 判定框存在时长 / 出刀硬直
@export var attack_light_cooldown: float = 0.25

## 横劈半径 (世界单位)。格宽 64, 所以 66 ≈ 一格出头。
@export var light_sweep_radius: float = 66.0
## 横劈以朝向为轴张开的角度 (度, 单边)。
##
## 🏗️ 75° 是「纵深容差」调出来的数, 不是随手填的:
##    站在同一个 x 上、纵深差 Δz 的敌人, 和你的夹角是 90°(他在正前方偏上/下)。
##    所以 75° 意味着**站在你正前方偏一个身位的人扫不到**, 得再把它调宽容 ——
##    但 90° 就是「身前整个半圆」, 已经没有任何方向性可言。
##    最终取 75° + 半径 66: 正前方能罩住纵深 ±63 (≈ ±1 格), 斜前方略窄。
##    用户要的「离他几格纵深都能打到」就落在这个 ±63 上。
@export var light_sweep_half_angle: float = 75.0
## 横劈最多扫到几个目标。扇形本来就该能一扫一片 —— 但也不是无限,
## 否则站在怪堆里连点轻击就是最优解, 重击的「要瞄准」就没有存在意义了。
@export var light_max_targets: int = 3

# ============================================================
# 重击参数 (蓄力) = 突刺/重劈 (矩形) —— 远而窄, 逼你瞄准
# ============================================================
@export var heavy_charge_max: float = 0.75        ## 蓄满所需时间 (秒)
## 蓄到这个比例就算「满蓄」, 可以破霸体。
## 留 10% 宽容度是有意的: 差一点点没蓄满就完全不算, 玩家会觉得「明明满了却不破」,
## 而那个瞬间的困惑比这点宽容带来的收益大得多。
@export var heavy_armor_break_ratio: float = 0.9
@export var heavy_damage_min: int = 2             ## 点一下就松 (几乎没蓄) 的伤害
@export var heavy_damage_max: int = 4             ## 满蓄伤害
@export var heavy_duration: float = 0.34          ## 出刀硬直 (轻击的两倍多, 挥空就是挨打)
@export var heavy_cooldown: float = 0.5
## 重击向前的长度 (世界单位)。96 = 一格半 —— 明显比横劈够得远, 这是它换掉覆盖面换来的。
@export var heavy_reach: float = 96.0
## 重击的纵深容差 (世界单位, 总宽)。
##
## 🏗️ 52 ≈ 0.8 格, 比横劈的 ±63 **窄一半** —— 这就是两种招的分工:
##    横劈「闭着眼扫, 谁在旁边打谁」; 重击「对准了才打得中, 但打得疼、打得远」。
##    两者如果纵深容差一样, 玩家就只会用伤害高的那个, 另一招直接废掉。
@export var heavy_depth: float = 52.0
@export var heavy_max_targets: int = 3            ## 重击可以扫到多个目标
@export var charge_move_scale: float = 0.5        ## 蓄力时可以慢走 (用户选定的手感)

# ============================================================
# 技能: 落雷 (圆) —— 面朝方向一定距离处, 延迟生效
# ============================================================
## 落雷的伤害。比满蓄重击略低、比横劈高得多 —— 它的价值在「远」和「一片全中」,
## 伤害再给到最高的话, 另外两招就都没有存在理由了。
@export var skill_damage: int = 3
## 落点离角色多远 (世界单位)。132 ≈ 两格 —— 刚好是「横劈够不到、走过去又要一步」的距离。
@export var skill_distance: float = 132.0
## 落雷圈的半径 (世界单位)。46 ≈ 0.7 格; 在 2:1 压扁下屏幕上是一个 92×46 的椭圆。
@export var skill_radius: float = 46.0
## 从天而降需要的时间 (秒)。**这是这一招唯一的代价** —— 见下面 _cast_skill 的 🏗️。
@export var skill_arm_delay: float = 0.38
## 出招硬直 (抬手 → 手放下)。这段里不能动也不能防, 放空了就是白挨一下。
@export var skill_recovery: float = 0.35
@export var skill_cooldown: float = 0.9
@export var skill_cost: float = 35.0
## 0 = 范围内的全中 (落雷就该是这样, 不用像横劈那样限量)
@export var skill_max_targets: int = 0

# ============================================================
# 格挡参数
# ============================================================
## 精准格挡窗口 (秒)。按下的**那一瞬间**开始算, 过了就只是普通格挡。
## 0.16s @60Hz ≈ 9.6 物理帧 —— 既在魂系的 0.13~0.2 区间内,
## 又足够让 headless 自检确定性地命中它 (见 smoke_test.gd)。
@export var parry_window: float = 0.16
## 精准窗口的冷却。**必须有** —— 否则最优解是疯狂连点 Shift,
## 每一下都重开窗口, 于是「精准格挡」变成一个没有代价的按键宏,
## 本轮要验的「高频决策」直接退化成「高频无脑按」。
@export var parry_cooldown: float = 0.45
## 格挡时的移动速度倍率
@export var block_move_scale: float = 0.4
## ⚠️ **横版里已经不起作用, 保留只是为了让旧存档/旧注释不至于对不上**。
##
## 它的原义是「格挡扇形的半角余弦」: 0.0 = ±90° 的半平面, 0.7 收窄成 ±45°。
## 横版朝向只有 ±1, 判定退化成一次符号比较 (见 _is_in_guard_cone), 0.0 是唯一
## 有意义的取值 —— 调它不会改变任何行为。第 6 步 (格挡改造) 会把它删掉。
@export var block_cone_cos: float = 0.0
@export var guard_break_duration: float = 0.9     ## 破防硬直
@export var guard_break_knockback: float = 300.0

# ============================================================
# 精力参数 (见 scripts/combat/stat_pool.gd)
# ============================================================
@export var stamina_max: float = 100.0
@export var stamina_regen: float = 45.0
@export var stamina_regen_delay: float = 0.7
@export var dash_cost: float = 25.0
@export var heavy_cost: float = 30.0
@export var block_drain_per_sec: float = 12.0     ## 举着盾时的持续消耗
@export var block_hit_cost: float = 20.0          ## 硬吃一下的消耗 (会乘伤害值)
@export var guard_break_regen_lock: float = 1.1   ## 破防后锁住回复的秒数

# ============================================================
# 受击参数
# ============================================================
@export var max_health: int = 3
@export var invincible_duration: float = 1.2
@export var hit_stun_duration: float = 0.28
@export var knockback_speed: float = 380.0
@export var knockback_decel: float = 1800.0

# ============================================================
# 状态机
# ============================================================
enum State { NORMAL, BLOCKING, CHARGING, ATTACKING, DASHING, HIT, GUARD_BROKEN, DEAD }
## 攻击种类 —— ATTACKING 一段代码要同时伺候三种出招, 靠它分流时长/挥刀弧度/特效
##
## 三招对应三种**形状** (见 combat/attack_shape.gd), 这是它们真正的分野:
##   LIGHT    扇形 —— 贴着身扫一圈, 扫得到一片
##   HEAVY    矩形 —— 身前一条窄而远的长条, 要瞄准
##   SKILL    圆   —— 身前一格半处的落雷, 延迟 0.38 秒生效
enum AttackKind { LIGHT, HEAVY, SKILL }

var state: State = State.NORMAL
var _attack_kind: AttackKind = AttackKind.LIGHT
## 当前这一刀的**总时长** (判定框 lifetime 和挥刀插值都用它)
var _attack_total: float = 0.15

## 朝向: +1 = 面朝**右**, -1 = 面朝**左**。不要改回 Vector2 —— 见文件头 ⚠️④。
##
## 🏗️ 初始值朝右 (而不是「不朝任何方向」): 横版里没有「未定向」这个状态,
##    角色从第一帧起就必须面向某一边, 否则 _draw 里的侧脸和眼睛没有可用的输入。
var facing: int = 1

## ── 跳跃状态 ──
## 离地高度 (px, **向上为正**)。恒 >= 0。
##
## ⚠️⚠️ 这是本文件和 v0.2/v0.3 最大的区别, 也是唯一一个「加了新变量」的地方。
##    height **不是位置** —— 它不参与 move_and_slide, 不参与碰撞, 不进 global_position。
##    它是「身体相对脚下那个点抬起了多少」, 纯加法地用在 _draw() 里。
##    这么设计之后: 跳跃和平面碰撞**完全解耦**, 不会出现「跳起来卡在墙顶」这类问题。
var height: float = 0.0
## 高度方向速度 (px/s, 向上为正)
var _height_vel: float = 0.0
## 是否站在地面上。⚠️ 问不了引擎 (FLOATING 模式下 is_on_floor() 恒 false), 只能自己维护。
var _grounded: bool = true
## 落地前提前按跳的缓冲计时器
var _jump_buffer_timer: float = 0.0
## 走路摆动相位。腿的摆动只跟**位移速度**有关, 站着不动就停住 —— 见 _draw_legs()
var _walk_phase: float = 0.0

## 格挡朝向的**覆写出口**: 0 = 不覆写 (用当前 facing), +1/-1 = 强制朝右/朝左。
##
## 🏗️ 留这个出口的两个真实消费者:
##   ① **headless 自检** —— 自检要把「攻击从正面来 / 从背后来」精确摆出来,
##      不指定朝向就只能靠先按住移动键来转向, 那会把「输入路径」和「格挡判定」两件事
##      混在同一条断言里, 一红就分不清是哪一边坏了。
##   ② 未来的锁定/自动转向。
##
## ⚠️ v0.3 它是 Vector2 (鼠标瞄准的覆写)。取消鼠标瞄准之后, 能表达的状态只剩左右,
##    于是它也退化成一个 int —— 保留接口的形状跟着模型走, 不要留一个「什么都能指」
##    的出口, 那种出口迟早会被人用来绕过朝向规则。
var block_aim_override: int = 0

var health: int = 0
var invincible_timer: float = 0.0

## 精力池 (自己进树/出树都不需要它, 所以是 RefCounted 而不是 Node)
var stamina: StatPool = null

# ── 内部计时器 ──
var _dash_timer: float = 0.0
var _dash_cooldown_timer: float = 0.0
var _attack_timer: float = 0.0
var _attack_cooldown_timer: float = 0.0
var _hit_stun_timer: float = 0.0
var _hit_flash_timer: float = 0.0
var _charge_timer: float = 0.0
var _parry_window_timer: float = 0.0
var _parry_cooldown_timer: float = 0.0
var _parry_flash_timer: float = 0.0
var _block_flash_timer: float = 0.0
var _guard_break_timer: float = 0.0
var _skill_cooldown_timer: float = 0.0

## 落雷的特效节点 (挂在 FX 层)。出招被打断时要**主动**收掉它 ——
## 它自己只会到点消失 (雷劈完就走), 而「雷还没落就断招」时它必须当场没影,
## 否则玩家会看着一个还在倒计时的圈, 以为那一下还会来。
var _skill_fx: LightningBolt = null

## 正在生效的攻击形状 (null = 没在出招)。
##
## 🏗️ 只给 **调试面板** 用: F1 打开时把当前招式的范围画在脚下,
##    这样「这个距离到底打不打得到」是可以直接看出来的, 不用靠反复试。
##    它不参与任何判定 —— 真判定在 AttackHitbox 里, 那边拿的是同一个对象 (见 player.light_shape)。
var _active_shape: AttackShape = null

## 攻击判定框场景。用 preload 常量而非 main.gd 注入 —— 依赖写死在这里,
## 少了「忘了注入 → 攻击静默失效」这一整类 bug。
const ATTACK_HITBOX_SCENE: PackedScene = preload("res://scenes/attack_hitbox.tscn")


# ============================================================
# 初始化
# ============================================================
func _ready() -> void:
	# ⚠️ 俯视角必须 FLOATING —— 见文件头 ⚠️②
	motion_mode = CharacterBody2D.MOTION_MODE_FLOATING

	health = max_health

	# bit0: "我是玩家"
	collision_layer = 1 << 0
	# bit4: "我只跟墙壁/障碍碰撞" —— 地面是纯视觉的 (见 belt_floor.gd)
	collision_mask = 1 << 4
	#
	# ⚠️ 这个**身体**框 (player.tscn 里的 CircleShape2D(12) @ (0,-16)) 故意**保持**屏幕空间,
	#    和下面刚改成贴地椭圆的受击框是两回事 —— 别顺手一起改:
	#      · 它只用于撞墙, 不参与任何伤害判定 (受击看 hurtbox, 打人看 AttackHitbox 找 bit1);
	#      · 它和 `main.gd` 里那圈边界墙是**配套调出来的**: 自检实测南北猛冲都恰好停在
	#        地界内 2px (见「向北/向南猛冲后仍在墙内」)。它抬在脚上方 16px, 墙的摆放
	#        就是照着这个抬高度推的 —— 单改一边, 撞墙就会整体偏掉一格。
	#    真要改的话: 连 _create_border_walls 一起重算, 并且顺手把「撞墙」也纳入
	#    `_check_ground_bodies` 那一类「活在同一平面」的判据。

	# 受击判定区: **只监听敌人的攻击判定区 (bit3)**
	# ⚠️ v0.2 这里还有 bit1 (敌人身体), 因为那时敌人靠「贴身碰撞」造成伤害。
	#    v0.3 删掉了接触伤害 → bit1 也一并去掉。留着的话敌人走过来仍会触发
	#    body_entered, 只是没人接 —— 属于安静的误导 (下一个人会以为接触伤害还在)。
	hurtbox.collision_layer = 0
	hurtbox.collision_mask = 1 << 3
	hurtbox.area_entered.connect(_on_hurtbox_area_entered)

	# ── 受击框必须是**贴地椭圆**, 不是离地 16px 的屏幕正圆 ──
	#
	# 🏗️ 这条是「预警画的就是判定」能不能成立的最后一环。
	#    player.tscn 里原本是一个 CircleShape2D(15), 画在脚上方 16px 处。
	#    在 v0.2/v0.3 那会儿两边都在屏幕空间, 它是对的 —— 但现在攻击范围活在
	#    **地面平面**上 (BeltSpace.to_screen 把纵深压了一半), 而屏幕正圆在地面平面里
	#    是一个「纵深 ±30 世界单位」的巨椭圆 (圆心还被抬高到 +32):
	#      · 站在敌人脚下**对着镜头方向一两格**的人, 会被扇形扫到;
	#      · 而地上画的那片红根本没到那儿。
	#    玩家看到的就是「我明明站在外面」—— 这正是这次重构要消灭的那类静默失败,
	#    只不过它藏在碰撞体里 (形状 vs 形状的测试看不见它, 见 smoke_test 的 ⑨)。
	#
	#    换成世界圆之后, 受击框和 draw_telegraph 画的是**同一个平面里的同一块地**。
	#    BeltSpace.ground_circle_shape 的文档写的就是这件事。
	var hb: CollisionShape2D = hurtbox.get_node("CollisionShape2D")
	hb.position = Vector2.ZERO
	hb.shape = BeltSpace.ground_circle_shape(HURTBOX_RADIUS)

	# 敌人靠这个组找玩家 (BlitzEnemy._get_player)。
	add_to_group("player")

	stamina = StatPool.new(stamina_max, stamina_regen, stamina_regen_delay)
	stamina.changed.connect(_on_stamina_changed)

	health_changed.emit(health, max_health)
	stamina_changed.emit(stamina.current, stamina.max_value)


# ============================================================
# 主物理循环
# ============================================================
func _physics_process(delta: float) -> void:
	if state == State.DEAD:
		return

	_update_timers(delta)
	stamina.tick(delta)

	match state:
		State.NORMAL:
			_process_normal(delta)
		State.BLOCKING:
			_process_blocking(delta)
		State.CHARGING:
			_process_charging(delta)
		State.ATTACKING:
			_process_attacking(delta)
		State.DASHING:
			_process_dash(delta)
		State.HIT:
			_process_hit(delta)
		State.GUARD_BROKEN:
			_process_guard_broken(delta)

	# 🔑 跳跃完全在状态机**之外**: 它和「我在做什么」正交 ——
	#    走路能跳、举盾能跳、出刀也能跳 (DNF 同款), 挨打和破防时不能。
	#    放进 match 里的话, 每加一个状态都要记得把跳跃那段抄一遍, 迟早漏一个。
	_apply_vertical(delta)

	move_and_slide()
	queue_redraw()


func _update_timers(delta: float) -> void:
	_dash_cooldown_timer = maxf(0.0, _dash_cooldown_timer - delta)
	_attack_cooldown_timer = maxf(0.0, _attack_cooldown_timer - delta)
	_skill_cooldown_timer = maxf(0.0, _skill_cooldown_timer - delta)
	invincible_timer = maxf(0.0, invincible_timer - delta)
	_hit_stun_timer = maxf(0.0, _hit_stun_timer - delta)
	_hit_flash_timer = maxf(0.0, _hit_flash_timer - delta)
	# ⚠️ 精准窗口在这里递减 —— 它在 _process_normal 里被**开启**, 而 _update_timers
	#    跑在状态处理**之前**。所以开启的那一帧不会被立刻扣掉, 窗口的帧数是准的。
	_parry_window_timer = maxf(0.0, _parry_window_timer - delta)
	_parry_cooldown_timer = maxf(0.0, _parry_cooldown_timer - delta)
	_parry_flash_timer = maxf(0.0, _parry_flash_timer - delta)
	_block_flash_timer = maxf(0.0, _block_flash_timer - delta)
	_guard_break_timer = maxf(0.0, _guard_break_timer - delta)


# ============================================================
# 跳跃 / 重力 —— 世界坐标模型里唯一一个**不碰 position** 的物理段
# ============================================================
#
# 🔑 整个函数只读写 height / _height_vel 两个变量。
#    **一行都不碰 global_position 或 velocity 的 y 分量。**
#
#   为什么把这条当成纪律而不是巧合 —— 因为写错的后果**不报错也不像 bug**:
##     · 写成 `velocity.y += gravity * delta` → 角色一边跳一边往屏幕**深处**漂,
##       跳几次就跑到敌人后面去了。看起来像「敌人 AI 在乱动」。
##     · 写成 `global_position.y -= height` → 直接和 move_and_slide 打架,
##       而且 Y-sort 会按「抬高后的 y」排序, 角色一跳就跑到障碍物背后。
##   两个错法都不会崩, 只会让「位置对不上」, 而排查方向会全错。
func _apply_vertical(delta: float) -> void:
	_jump_buffer_timer = maxf(0.0, _jump_buffer_timer - delta)

	# ① 记录「这一帧按了跳」。⚠️ 不在这里直接起跳 —— 缓冲的意义就是
	#    「在落地之前按的那一下要留着」, 所以只记时间戳, 起跳交给 ②。
	if _can_jump() and Input.is_action_just_pressed(JUMP_ACTION):
		_jump_buffer_timer = jump_buffer_time

	# ② 起跳: 缓冲没过期 且 人在空中以外的地面上。
	#    ⚠️ 这里用 _grounded 而不是「height <= 0」: 起跳的那一帧 height 还是 0,
	#       只看 height 会连跳 (同一帧里判一次、下帧又判一次)。
	if _jump_buffer_timer > 0.0 and _grounded:
		_jump_buffer_timer = 0.0
		_grounded = false
		_height_vel = jump_speed

	# ③ 可变跳跃高度: 松键的那一帧把剩余上升速度砍掉。
	#    ⚠️ 必须用 just_released (只在松键那一帧为真) 而不是 is_action_pressed。
	#       用后者的话, 只要松着键, 每一帧都会乘一次系数 —— 高度会以指数速度塌掉,
	#       表现是「轻轻点一下跳只能离地一丁点」, 看起来像跳跃力没调够。
	if Input.is_action_just_released(JUMP_ACTION) and _height_vel > 0.0:
		_height_vel *= jump_cut_multiplier

	# ④ 重力积分。落地判定也在这里 —— height 到 0 就是地面, 没有别的地方能落地。
	if not _grounded:
		_height_vel = maxf(_height_vel - gravity * delta, -max_fall_speed)
		height += _height_vel * delta
		if height <= 0.0:
			height = 0.0
			_height_vel = 0.0
			_grounded = true

	# ⑤ 走路相位: 只跟位移速度挂钩, 站着不动就停住。
	#    ⚠️ 用速度而不是「有没有按键」—— 松键滑行的那一小段腿还在动,
	#       看起来才对; 而撞在墙上速度归零时, 腿**必须**停下, 否则是原地踏步。
	#    ⚠️ 用**世界**速度, 不是 velocity.length()。纵深走同样的世界距离只占屏幕上
	#       一半的位移, 用屏幕速度算的话腿会摆得慢一半 —— 表现是「上下走像在滑冰」。
	_walk_phase += BeltSpace.screen_speed_to_world(velocity) * walk_phase_rate * delta


## 当前这一刻能不能起跳。
##
## 🏗️ 硬直里**不收**起跳输入, 而不是「收了但不管」:
##    缓冲是个 0.08s 的计时器, 如果受击时把它记下来, 硬直一结束就会自动弹起来 ——
##    表现是「被打飞之后莫名其妙自己跳了一下」, 而且因为缓冲很短, 极难复现。
func _can_jump() -> bool:
	return state != State.HIT and state != State.GUARD_BROKEN


## 是否站在地面上。给 debug 面板 / 自检读。
func is_grounded() -> bool:
	return _grounded


# ============================================================
# NORMAL — 走位 + 起手所有动作
# ============================================================
func _process_normal(delta: float) -> void:
	var input_dir: Vector2 = _input_screen_dir()
	_apply_move(input_dir, move_accel, move_decel, delta)
	# 朝向只看水平分量 —— 纵深移动不转身 (见文件头 ④)
	_face(input_dir.x)

	# 格挡优先于一切 —— 它是「防御姿态」, 按下就该立刻生效
	if Input.is_action_pressed("block"):
		_enter_blocking()
		return

	if Input.is_action_just_pressed("dash") and _can_dash():
		_start_dash(input_dir)
		return

	if Input.is_action_just_pressed("attack_heavy") and _can_start_heavy():
		_enter_charging()
		return

	# 技能排在重击**之后**: 蓄力是按住型的, 重击一旦进入 CHARGING 就吃掉后续输入,
	# 顺序反过来会让「按住 K 的同时碰了一下 U」变成放技能 (玩家想蓄力却放了雷)。
	if Input.is_action_just_pressed("attack_skill") and _can_cast_skill():
		_begin_attack(AttackKind.SKILL, 0.0)
		return

	if Input.is_action_just_pressed("attack_light") and _attack_cooldown_timer <= 0.0:
		_state_enter_attack()


## input_dir: **屏幕空间**的移动方向 (即已压扁过的), 见 _input_screen_dir()。
## 逐轴 move_toward 是关键: **向量版** move_toward 会按向量长度一次性逼近,
## 手感会从「先加速直线冲」变成「先拐弯再加速」, 原来的惯性感就没了。
##
## speed_scale: 上限倍率 (格挡 40% / 蓄力 50% / 出刀 55%)。
## ⚠️ 只缩放 accel 是**不够**的 —— 那只会让你更慢地到达同一个上限速度,
##    看起来像「手感变重」而不是「移动变慢」, 是两回事。
##
## 🏗️ 为什么这里可以直接按屏幕轴逐轴逼近, 而不会让速度「上下走得飞快」:
##    因为 move_speed 是**世界**速度, 而 input_dir 已经被压扁过一次 ——
##    纵深分量的上限是 0.5 × move_speed (屏幕上), 换算回世界正好又是 move_speed。
##    两条压扁**互相抵消**, 结果是八个方向的世界速度全都等于 move_speed。
##    这套抵消只在这里成立: 一旦有人把未压扁的输入直接塞进来, 上下立刻变成两倍速。
func _apply_move(input_dir: Vector2, accel: float, decel: float, delta: float, speed_scale: float = 1.0) -> void:
	var top: float = move_speed * speed_scale
	if input_dir.x != 0.0:
		velocity.x = move_toward(velocity.x, input_dir.x * top, accel * delta)
	else:
		velocity.x = move_toward(velocity.x, 0.0, decel * delta)

	if input_dir.y != 0.0:
		velocity.y = move_toward(velocity.y, input_dir.y * top, accel * delta)
	else:
		velocity.y = move_toward(velocity.y, 0.0, decel * delta)


## 本帧的移动输入, **已换算成屏幕方向** —— 所有走位状态 (NORMAL/BLOCKING/
## CHARGING/ATTACKING) 的入口都走这里, 免得四份调用各自漏掉压扁。
##
## ⚠️ 必须用 Input.get_vector 而不是 get_axis 拼两个分量:
##    get_vector 返回**已归一化**的向量, 所以斜着走 (同时按右+下) 时世界速度仍是 320,
##    而不是 320×√2=452。横版的「斜」是**地面上**的斜面 (X 和纵深同时动),
##    不是等距那个「斜向格子的边」—— 归一化在这里依然必要, 理由和视角无关。
##
## 🏗️ 为什么这里只有一次乘法, 却值得单独一个函数:
##    输入轴 **就是** 世界轴 (按上 = 世界 +z), 所以「世界方向」不需要任何换算;
##    需要的是「世界方向 → 屏幕方向」那一步 (压扁), 交给 belt_space。
##    这就是切横版省下来的那一整套投影数学 —— 旧等距版要做的是
##    「输入旋转 45° 再压扁再对账」, 现在是「乘一个 0.5」。
func _input_screen_dir() -> Vector2:
	var iv: Vector2 = Input.get_vector("move_left", "move_right", "move_up", "move_down")
	return BeltSpace.input_to_screen(iv)


## 按水平输入转向。传的是**输入量本身** (带符号即可), 不要求已归一化。
##
## 🏗️ 为什么纵深方向 (input.y) 完全不参与朝向 —— 这是 ④ 唯一的落点, 也是最容易
##    顺手写错的一处: 写成 `if input_dir != Vector2.ZERO: facing = sign(input_dir.x)`
##    的话, 只按上下时 sign(0) = 0, 朝向会被清零 —— 角色站在那里面朝「0」, 侧视美术
##    只能画成正面站着, 而玩家下一步往左走时会看到脸**突然**翻过去。
##    这里显式忽略 x == 0 的情况, 保持上一次的朝向。
func _face(from_x: float) -> void:
	if from_x > 0.0:
		facing = 1
	elif from_x < 0.0:
		facing = -1


## 朝向的单位向量 (恒为 ±X)。给判定框偏移 / 绘制 / 自检用。
func facing_vec() -> Vector2:
	return Vector2(float(facing), 0.0)

# ============================================================
# BLOCKING — 举盾。免伤 + 扣精力
# ============================================================
func _process_blocking(delta: float) -> void:
	var input_dir: Vector2 = _input_screen_dir()
	_apply_move(input_dir, move_accel * 0.7, move_decel, delta, block_move_scale)

	# 朝向和别的状态一致: 你往哪走就朝哪。**不再跟随鼠标** —— 见文件头「删掉的东西」。
	_face(input_dir.x)
	if block_aim_override != 0:
		facing = block_aim_override

	# 闪避是**万能取消**: 举着盾也能翻滚出去。
	# 没有它的话, 被围住时玩家只剩「举盾硬扛」和「放盾跑」两个选项,
	# 而「举盾时想跑」这个最自然的反应会变成一次白挨打。
	if Input.is_action_just_pressed("dash") and _can_dash():
		_start_dash(input_dir)
		return

	# 持续消耗精力 —— 举盾不是免费的姿态
	stamina.drain(block_drain_per_sec * delta)
	if stamina.is_empty():
		_enter_guard_broken(Vector2.INF)
		return

	if not Input.is_action_pressed("block"):
		state = State.NORMAL


# ============================================================
# CHARGING — 蓄力重击 (按住 K/右键)
# ============================================================
func _process_charging(delta: float) -> void:
	_charge_timer = minf(_charge_timer + delta, heavy_charge_max)

	var input_dir: Vector2 = _input_screen_dir()
	# 蓄力时可以慢走 (用户选定的手感) —— 但朝向仍按移动方向, 和 NORMAL 一致
	_apply_move(input_dir, move_accel * 0.6, move_decel, delta, charge_move_scale)
	_face(input_dir.x)

	# 闪避取消 —— 蓄力的泄压阀。
	# 它同时也是「卡在 CHARGING」这条死路的兜底 (见文件头 ⚠️ 与 _apply_damage 里的清零)
	if Input.is_action_just_pressed("dash") and _can_dash():
		_charge_timer = 0.0
		_start_dash(input_dir)
		return

	if Input.is_action_just_released("attack_heavy"):
		_release_heavy()


# ============================================================
# ATTACKING — 出刀硬直 (可以走, 但明显变钝)
# ============================================================
func _process_attacking(delta: float) -> void:
	_attack_timer -= delta
	if _attack_timer <= 0.0:
		state = State.NORMAL
		_active_shape = null     # 出招结束 —— 调试面板别再画了
		return

	var input_dir: Vector2 = _input_screen_dir()
	# 出刀期间能走但明显变钝: 加速度砍到 35%, 减速度只砍 20% (收招时还得刹得住)
	# 重击比轻击更钝 —— 「挥空就是挨打」是重击唯一的代价, 必须给足
	var is_heavy: bool = _attack_kind == AttackKind.HEAVY
	var accel_scale: float = 0.18 if is_heavy else 0.35
	var speed_scale: float = 0.40 if is_heavy else 0.55
	_apply_move(input_dir, move_accel * accel_scale, move_decel * 0.8, delta, speed_scale)

	# ⚠️ 出刀期间**不改朝向**。刀往哪扫是在挥出的那一瞬间定死的,
	#    中途改朝向会让挥刀弧线突然跳一下, 而且判定框留在原地、刀却转了, 看着像脱手。


# ============================================================
# DASHING — 无敌位移
# ============================================================
func _process_dash(delta: float) -> void:
	_dash_timer -= delta
	if _dash_timer <= 0.0:
		state = State.NORMAL
		# 收尾时把速度砍到正常上限 —— 否则闪避结束会「弹射」一段,
		# 看起来像多冲了一下 (旧版就有这个毛病)
		# ⚠️ 走 limit_world_speed 而不是 velocity.limit_length: 后者比的是**屏幕**长度,
		#    会把纵深方向的冲刺多砍一半 (见 belt_space.gd 里那条注释)。
		velocity = BeltSpace.limit_world_speed(velocity, move_speed)


# ============================================================
# HIT — 受击硬直
# ============================================================
func _process_hit(delta: float) -> void:
	# ⚠️ 退出条件**只有**计时器。不要加 is_on_floor() —— 见文件头 ⚠️②
	velocity = velocity.move_toward(Vector2.ZERO, knockback_decel * delta)
	if _hit_stun_timer <= 0.0:
		state = State.NORMAL


# ============================================================
# GUARD_BROKEN — 精力耗尽被打崩
# ============================================================
func _process_guard_broken(delta: float) -> void:
	velocity = velocity.move_toward(Vector2.ZERO, knockback_decel * delta)
	if _guard_break_timer <= 0.0:
		state = State.NORMAL


# ============================================================
# 格挡 / 精准格挡
# ============================================================

## 进入格挡。
##
## 🏗️ 精准窗口在**按下的那一瞬间**开 —— 这就是「精准格挡」和「举着盾」的全部区别。
##    之后一直按着就只是普通格挡 (免伤但扣精力), 而且**不会**再开窗口。
func _enter_blocking() -> void:
	state = State.BLOCKING
	_charge_timer = 0.0
	# 立刻定朝向, 否则进入格挡的第一帧还是旧朝向 —— 那正好是最需要挡的一帧
	if block_aim_override != 0:
		facing = block_aim_override

	if _parry_cooldown_timer <= 0.0:
		_parry_window_timer = parry_window
		_parry_cooldown_timer = parry_cooldown


## 攻击是不是从**面朝的那一边**来的。
##
## 🏗️ 横版里这就是「前后半平面」: 只看 X 方向的差, **纵深 (Y) 完全不参与**。
##    这正好实现了用户要的效果 —— 「站得比我靠前/靠后一点都还算在正面」。
##    在等距时代这里是个 ±90° 的扇形 (要连续算角度, 还得跟鼠标瞄准对齐);
##    现在退化成一次符号比较, 而且**没有可以调窄的余地** —— 因为朝向本来就只有两个值,
##    所以 block_cone_cos 在横版里只剩 0.0 一个合法取值 (见那个变量)。
##
## ⚠️ 用的是「玩家 → 攻击者」这个向量, 不是「攻击者 → 玩家」。
##    写成反的会让正面和背面整个对调 —— 表现是「正面的挡不住、背后的反而挡住了」,
##    而这两件事在屏幕上看起来都只是「格挡有时候不灵」。
func _is_in_guard_cone(from_position: Vector2) -> bool:
	if not from_position.is_finite():
		# 没有来源信息时按「挡得住」处理: 宁可对玩家有利, 也不要静默变成背刺
		return true
	var dx: float = from_position.x - global_position.x
	# 完全正对 (同一个 x) 时算正面 —— 和旧版「距离太近就算挡住」同样的宽容取向
	if absf(dx) <= 0.01:
		return true
	# dx 的符号和 facing 一致 ⇒ 在面朝的那一边
	return (dx > 0.0) == (facing > 0)



## 精准格挡 / 破防时要把**攻击者**打硬直。判定区自己背着 source (见 enemy_attack.gd)。
func _stagger_attacker(source: Node2D) -> void:
	if source == null or not is_instance_valid(source):
		return
	# 用 has_method 而不是强类型: 将来树/机关/别的玩家也会攻击, 不该只认 BlitzEnemy
	if source.has_method("on_parried"):
		source.on_parried()


func _enter_guard_broken(from_position: Vector2) -> void:
	state = State.GUARD_BROKEN
	_parry_window_timer = 0.0
	_guard_break_timer = guard_break_duration
	# 破防后**锁住回复**: 「被打崩」必须比「主动收手」更痛, 否则玩家没有动机去管精力
	stamina.hold_regen(guard_break_regen_lock)

	var away: Vector2 = -facing_vec()
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		# ⚠️ normalize_world 而不是 normalized(): d 是**屏幕**位移, 屏幕上的单位向量
		#    换回世界是斜的 (纵深方向会长一倍)。用 normalized() 的话,
		#    「从纵深方向被打崩」会被推得比「从正面被打崩」远一倍 —— 同样是世界速度上限
		#    却推出两种距离, 而且只在特定受击方向上才看得出来。
		away = BeltSpace.normalize_world(d) if d.length() > 0.01 else -facing_vec()
	velocity = away * guard_break_knockback
	guard_broken.emit()


# ============================================================
# 攻击
# ============================================================

## 轻击入口 (自检也在用它, 名字别改)
func _state_enter_attack() -> void:
	_begin_attack(AttackKind.LIGHT, 1.0)


func _enter_charging() -> void:
	state = State.CHARGING
	_charge_timer = 0.0


## 松开重击 —— 挥出。
func _release_heavy() -> void:
	var ratio: float = charge_ratio()
	# 精力在**挥出的那一刻**扣, 不在蓄力期间扣 ——
	# 蓄力中扣的话, 玩家会在蓄到一半时突然被踢出状态, 而且不知道原因。
	if not stamina.spend(heavy_cost):
		# 兜底: 理论上蓄力中只能慢走, 花不掉精力; 但万一真的不够,
		# 宁可取消这一刀, 也不要让玩家白嫖一次满蓄破霸体。
		state = State.NORMAL
		_charge_timer = 0.0
		return
	_begin_attack(AttackKind.HEAVY, ratio)


## charge: 0~1 的蓄力比例, 决定伤害和是否破霸体。
func _begin_attack(kind: AttackKind, charge: float) -> void:
	_attack_kind = kind
	state = State.ATTACKING
	_charge_timer = 0.0

	match kind:
		AttackKind.LIGHT:
			_attack_total = attack_light_duration
			_attack_timer = attack_light_duration
			_attack_cooldown_timer = attack_light_cooldown
			_spawn_attack_hitbox(light_shape(), attack_light_damage, false, light_max_targets)
		AttackKind.HEAVY:
			_attack_total = heavy_duration
			_attack_timer = heavy_duration
			_attack_cooldown_timer = heavy_cooldown
			var dmg: int = int(round(lerpf(float(heavy_damage_min), float(heavy_damage_max), clampf(charge, 0.0, 1.0))))
			var breaks: bool = charge >= heavy_armor_break_ratio
			_spawn_attack_hitbox(heavy_shape(), dmg, breaks, heavy_max_targets)
		AttackKind.SKILL:
			_cast_skill()


## 落雷 —— 这一招唯一有「延迟」的攻击, 所以它单独一个函数。
##
## 🏗️ 为什么要用 `arm_delay` 而不是「挥完手再生成一个判定框」:
##   两者看起来一样, 但差在**出招被打断**的时候。挂在同一次出招上的话,
##   玩家在这 0.38 秒里被敌人打断 → 判定框和特效随出招一起消失, 圈不见了、雷也没了,
##   玩家看到的是「我按了, 圈亮了一下, 然后什么都没发生, 但我挨了一下」。
##   这个因果链在屏幕上是**读不出来**的 (玩家不会知道是自己被打断了)。
##   现在的行为是: 打断就整招取消, 圈**当场消失** —— 至少「圈没了 = 这招废了」是自洽的。
##   ⚠️ 所以取消出招 (take_damage) 时必须把特效和判定框一起收掉, 见 _cancel_attack_children。
##
## ⚠️ 别在这里算落点。`LightningBolt` 和 `AttackHitbox` 一样, 挂在**玩家脚下**
##    (传 global_position), 由 shape 自己说出范围在身前哪儿。
##    第一版在这里加了 `+ sh.collision_offset(facing)`, 而 FX 内部画预警时也按
##    「origin = 攻击者脚下」的约定又偏了一次 —— 于是圈被推到了离落点 132px 的地方,
##    也就是「预警说这儿、伤害在那边」。两个消费者遵守同一条摆放规则, 这类双偏移
##    在结构上才不可能发生。
func _cast_skill() -> void:
	if not stamina.spend(skill_cost):
		# 精力不够 —— 不该走到这里 (_can_cast_skill 已经拦过), 但不能靠上游的检查活着:
		# 上游改了而这里没跟上, 表现就是「精力没了还能放技能」, 静默且不会报错。
		state = State.NORMAL
		return

	_attack_total = skill_recovery
	_attack_timer = skill_recovery
	_skill_cooldown_timer = skill_cooldown

	var sh: AttackShape = skill_shape()
	# 判定: 带 arm_delay, 前 0.38 秒完全不生效
	_spawn_attack_hitbox(sh, skill_damage, false, skill_max_targets, skill_arm_delay)
	# 视觉: 和判定同一次出招、同一个 shape
	var at: Vector2 = global_position
	var fx: LightningBolt = LightningBolt.spawn(
		get_tree(), at, sh, facing, skill_arm_delay)
	if fx != null:
		_skill_fx = fx


## 轻击的形状 —— **横劈**: 以自己为圆心、朝向为轴张开的扇形。
##
## 🏗️ 做成函数而不是 `const`/`@export` 的一个形状对象, 是因为 AttackShape 是 Resource:
##    共享一份实例的话, 任何一处「临时改一下半径试试手感」都会波及所有使用者,
##    而且那种 bug 只在「同时有两个攻击」时才出现。每次 new 一份, 便宜且不可能出事。
##
## 警告 —— 调试面板**也**调这个函数来画预览, 这样「面板上看到的范围」和「真的判定」
## 是同一个函数算出来的 (见 debug_overlay.gd)。
func light_shape() -> AttackShape:
	return AttackShape.make_arc(light_sweep_radius, light_sweep_half_angle)


## 重击的形状 —— 身前一长条矩形, 纵深容差比横劈窄一半 (见 heavy_depth 的 🏗️)。
func heavy_shape() -> AttackShape:
	return AttackShape.make_rect(heavy_reach, heavy_depth)


## 落雷的形状 —— 身前一格半处的一个圆。
##
## ⚠️ 圆心偏移写在**局部朝向系**里 (x 向前), 所以朝左时它自动落到左边。
##    在调用方自己乘 facing 的话, 这里是一个圆、那里是一个乘了 -1 的圆心,
##    迟早会有一处漏乘 —— 而漏乘的表现是「朝左放技能, 雷劈在身后」。
func skill_shape() -> AttackShape:
	return AttackShape.make_circle(skill_radius, Vector2(skill_distance, 0.0))


## 把「已经挥出去、但还没开始生效」的东西全部收掉。
##
## 🏗️ 为什么需要它 —— 这是**延迟招式**独有的失败模式:
##   轻击/重击的判定框在 add_child 的那一帧就生效, 所以「打断」天然等于「什么都没有」。
##   落雷不一样: 它挂着一个 0.38 秒的蓄势。玩家在这段里挨打 → 状态进 HIT,
##   但那个 AttackHitbox 还活着、还在自己数秒 —— 时间一到, 它照样在远处炸开把敌人劈了。
##   于是「被打断」这件事在玩法上不成立: 你挨了打, 伤害照样出去。
##   更糟的是画面上看不出异常 —— 圈本来就在那儿, 你只会以为技能正常放了。
##
## ⚠️ 收的是**玩家自己生的**判定框和特效, 不是全场扫描。
##    扫全场会把敌人的攻击判定框也删掉 —— 那等于「一挨打敌人就失去攻击能力」,
##    而且它不报错, 只是敌人再也打不死你。
func _cancel_pending_attack() -> void:
	for c: Node in get_children():
		if c is AttackHitbox and not (c as AttackHitbox).is_armed():
			# remove_child + queue_free 一起做: 只 queue_free 的话它要到帧末才离开场景树,
			# 而它**这一帧**仍在物理世界里 —— 蓄势刚好在这一帧结束的话会照样命中。
			remove_child(c)
			c.queue_free()
	# 特效只撤「还没落」的那一发。已经劈下来的留着把闪光播完 —— 伤害都出去了,
	# 这时候抹掉视觉只会让人以为那一下没打中。
	if _skill_fx != null and is_instance_valid(_skill_fx) and _skill_fx.is_pending():
		_skill_fx.queue_free()
	_skill_fx = null


## 正在生效的攻击形状 (null = 没在出招)。**只给调试面板用**, 不参与判定。
func active_shape() -> AttackShape:
	return _active_shape if state == State.ATTACKING else null


## 技能能不能放。三个条件缺一不可: 不在冷却、精力够、不在别的动作里。
##
## 🏗️ 和 `_can_start_heavy` 拆成两个函数 (而不是合成一个带参数的),
##    是因为将来的技能会越来越多, 每个的成本/冷却/前置条件都不同 ——
##    合并的话那个 if 会迅速长成一堆 `if kind == X then ... elif kind == Y ...`。
func _can_cast_skill() -> bool:
	return _skill_cooldown_timer <= 0.0 and stamina.can_spend(skill_cost)


## 生成攻击判定框 —— 挂在**玩家自己**身上 (而不是 current_scene)。
##
## 🏗️ 为什么挂自己身上:
##   判定框的 position 是纯局部坐标, 父节点 (y-sort 的 World) 怎么摆都不影响,
##   也不会漏删。挂 current_scene 则要求两套坐标系一致, 一旦玩家被放进有偏移的
##   父节点里, 判定框就会凭空错位。
##
## ⚠️ position 恒为 Vector2.ZERO —— 判定框就压在**脚下原点**上,
##    「往前伸多少」写在 shape 里 (AttackShape.collision_offset)。两处都偏移就是偏两次,
##    症状是「朝左打的时候范围整块往前错一截」。
func _spawn_attack_hitbox(
	shape: AttackShape, damage: int, breaks_armor: bool, max_targets: int, arm_delay: float = 0.0
) -> void:
	var hb: AttackHitbox = ATTACK_HITBOX_SCENE.instantiate()
	hb.damage = damage
	# ⚠️ lifetime 要把蓄势时间**算进去** —— 它是「这个节点活多久」, 不是「生效多久」。
	#    漏掉的话落雷的判定框会在雷落地前就自毁, 表现是「雷劈下来了但没人掉血」。
	hb.lifetime = _attack_total + arm_delay
	hb.arm_delay = arm_delay
	hb.attack_shape = shape
	hb.facing = facing                   # 同上, _ready() 要拿它建形状
	hb.breaks_armor = breaks_armor
	hb.max_targets = max_targets
	hb.hit_landed.connect(_on_hitbox_landed)
	add_child(hb)
	_active_shape = shape


func _on_hitbox_landed(at: Vector2, _direction: Vector2) -> void:
	hit_landed.emit(at)


func charge_ratio() -> float:
	return clampf(_charge_timer / maxf(0.001, heavy_charge_max), 0.0, 1.0)


func _can_dash() -> bool:
	return _dash_cooldown_timer <= 0.0 and stamina.can_spend(dash_cost)


func _can_start_heavy() -> bool:
	return _attack_cooldown_timer <= 0.0 and stamina.can_spend(heavy_cost)


## 闪避方向: 有输入就按输入方向 (地面上的任意方向, 含纵深), 没输入就按朝向。
##
## 🏗️ 闪避**保持**平面自由 (不像朝向那样砍成 ±1): 侧闪进纵深是横版清关里
##    绕背和拉开距离的主要手段, 砍掉它等于把走位砍掉一半。
##    所以这里出现一个刻意的**解耦** —— 位移方向可以是斜的, 而朝向只能是左右。
func _start_dash(input_dir: Vector2) -> void:
	if not stamina.spend(dash_cost):
		return
	# ⚠️ 归一化必须走 BeltSpace.normalize_world, 不能写 input_dir.normalized() ——
	#    屏幕上的单位向量换回世界比 1 长 (斜向是 1.27), 而 dash_speed 是世界速度上限,
	#    用前者的话「斜着闪避比正着闪避多冲 27%」, 且只有斜着闪才发现。
	var dir: Vector2 = BeltSpace.normalize_world(input_dir) if input_dir != Vector2.ZERO else facing_vec()
	_face(dir.x)
	state = State.DASHING
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	_dash_timer = dash_duration
	_dash_cooldown_timer = dash_cooldown
	invincible_timer = dash_duration + 0.05
	velocity = dir * dash_speed
	dashed.emit(dir)


# ============================================================
# 受伤 / 死亡 / 复活
# ============================================================

## amount: 伤害值。from_position: 伤害来源坐标 (用来算击退方向 **和扇形格挡判定**)。
## source: 攻击者节点。只有敌人的攻击判定区会传 —— 精准格挡要靠它把对方打硬直。
##
## ⚠️ 第三个参数和 BlitzEnemy.take_damage 的同位参数含义**不同**
##    (那边是 breaks_armor: bool)。两者靠鸭子类型调用, 编译器不会提醒。
##    之所以现在没问题: 玩家的攻击判定框 mask 只够得着敌人, 永远打不到玩家自己。
func take_damage(amount: int = 1, from_position: Vector2 = Vector2.INF, source: Node2D = null) -> void:
	if state == State.DEAD or invincible_timer > 0.0:
		return

	# 举着盾 → 走格挡结算 (见下方决策表)。这是本轮唯一新增的受击分支。
	if state == State.BLOCKING:
		_resolve_guard(amount, from_position, source)
		return

	_apply_damage(amount, from_position)


## 格挡状态下的受击结算 —— **本轮决策表 (A) 的唯一落点**。
##
##   | 来自 | 精准窗口内 | 精力够 | 结果
##   |------|-----------|--------|------------------------------------------
##   | 正面 | 是        | 不计   | 精准格挡: 零伤零耗 + 攻击者长硬直
##   | 正面 | 否        | 是     | 格挡: 零伤, 扣精力
##   | 正面 | 否        | 否     | 破防: 零伤但进 GUARD_BROKEN + 击退
##   | 背后 | 无所谓    | 无所谓 | **照常掉血**
func _resolve_guard(amount: int, from_position: Vector2, source: Node2D) -> void:
	# ① 背后的攻击挡不住 —— 这是扇形格挡的**核心**。
	#    写成全方位的话玩家永远不会知道自己站错了位置, 只会觉得格挡时灵时不灵。
	if not _is_in_guard_cone(from_position):
		_apply_damage(amount, from_position)
		return

	# ② 精准窗口内 → 精准格挡
	if _parry_window_timer > 0.0:
		_parry_window_timer = 0.0
		_parry_flash_timer = PARRY_FLASH_TIME
		# 给一点点无敌, 免得同一帧里第二个判定区又把这次精准格挡打穿
		invincible_timer = maxf(invincible_timer, 0.2)
		_stagger_attacker(source)
		parried.emit(global_position + Vector2(0.0, -22.0))
		return

	# ③ 普通格挡 —— 免伤, 但要付精力
	var cost: float = block_hit_cost * float(maxi(1, amount))
	if stamina.spend(cost):
		_block_flash_timer = 0.14
		invincible_timer = maxf(invincible_timer, 0.1)
		blocked.emit(global_position + Vector2(0.0, -22.0))
	else:
		_enter_guard_broken(from_position)


## 真正扣血的那条路。格挡/精准格挡都不走这里 —— 所以「有没有掉血」和
## 「有没有挡到」在代码上是**两个不同的分支**, 不可能出现「挡住了但还是掉血」。
func _apply_damage(amount: int, from_position: Vector2) -> void:
	health -= amount
	health_changed.emit(maxi(health, 0), max_health)

	if health <= 0:
		_die()
		return

	state = State.HIT
	invincible_timer = invincible_duration
	_hit_stun_timer = hit_stun_duration
	_hit_flash_timer = 0.12
	# ⚠️ 受击必须把所有「按住型」状态清干净。尤其 _charge_timer:
	#    蓄力靠 is_action_just_released 退出, 一旦被打进 HIT, 那个释放事件
	#    可能永远不会来 —— 玩家会**永久卡在蓄力态** (不能动不能打, 像死机)。
	#    这里是那条死路的唯一出口, 别删。
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	# 出招被这一下打断 —— 把还没生效的东西收干净 (见 _cancel_pending_attack)。
	# ⚠️ 和 _charge_timer 是同一类问题: 留着的话, 落雷的圈会继续在远处倒计时,
	#    0.38 秒后照样劈下来把敌人劈了 —— 等于「已经挨打硬直了还能靠它输出」,
	#    而且画面上那一圈一直在, 看起来完全不像已经被打断了。
	_cancel_pending_attack()

	# 击退方向 = 从伤害来源指向自己 (几何算法, 不依赖朝向)
	# ⚠️ normalize_world —— 理由同 _enter_guard_broken: 屏幕上的单位向量不是世界单位向量
	var away: Vector2 = -facing_vec()
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		away = BeltSpace.normalize_world(d) if d.length() > 0.01 else -facing_vec()
	velocity = away * knockback_speed


func _die() -> void:
	state = State.DEAD
	velocity = Vector2.ZERO
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	# 层清 0: 死后不再挡路、不再被判定框找到 (隐身但仍在场景里, 等 main.gd 安排复活)
	collision_layer = 0
	hurtbox.collision_mask = 0
	hide()
	died.emit()


## 由 main.gd 在复活点调用 —— 低惩罚死亡循环的落点
func respawn(at: Vector2) -> void:
	global_position = at
	velocity = Vector2.ZERO
	health = max_health
	state = State.NORMAL
	_dash_timer = 0.0
	_attack_timer = 0.0
	_skill_cooldown_timer = 0.0
	_cancel_pending_attack()
	_active_shape = null
	_hit_stun_timer = 0.0
	_hit_flash_timer = 0.0
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	_parry_flash_timer = 0.0
	_guard_break_timer = 0.0
	# ⚠️ 跳跃状态必须一起清 —— 死在空中的话 height 是正数, 不清就**复活在半空中**,
	#    然后慢慢落下来。看起来像「复活点在天上」, 而复活点明明是画在地上的法阵。
	height = 0.0
	_height_vel = 0.0
	_grounded = true
	_jump_buffer_timer = 0.0
	_walk_phase = 0.0
	# 精力回满 —— 复活后还带着上一次的精力亏空, 会让「重生」这件事没有感觉
	stamina.refill()
	# 复活后给一段无敌: 否则在敌人旁边复活会被立刻连打死, 变成死亡循环
	invincible_timer = invincible_duration
	collision_layer = 1 << 0
	hurtbox.collision_mask = 1 << 3
	show()
	health_changed.emit(health, max_health)


# ============================================================
# 信号回调
# ============================================================
## 被敌人的攻击判定区扫到。
##
## ⚠️ 这里同时读 damage / source 三个字段 —— 说明玩家和敌人之间的伤害契约
##    是「判定区自己背着数据」。v0.2 的写法是 `area.has_method("take_damage")`
##    然后硬编码伤害 1, 那种写法下「敌人的伤害值」这个概念根本无处安放。
func _on_hurtbox_area_entered(area: Area2D) -> void:
	if area is EnemyAttack:
		var atk: EnemyAttack = area
		take_damage(atk.damage, atk.global_position, atk.source)


func _on_stamina_changed(current: float, maximum: float) -> void:
	stamina_changed.emit(current, maximum)


# ============================================================
# 对外查询
# ============================================================

## 是否举着盾。**从 state 派生**而不是维护一个平行的 is_blocking 变量 ——
## 两份「我在不在格挡」迟早会有一份忘了同步, 而那种 bug 表现为
## 「挡住了却掉血」或者「没挡却免伤」, 极难定位。
func is_guard_up() -> bool:
	return state == State.BLOCKING


## 精准窗口是否还开着。给 debug 面板和自检看。
func is_parry_window_open() -> bool:
	return _parry_window_timer > 0.0


## 是否在蓄力中。
##
## 🏗️ UI **不要**直接写 `player.state == BlitzPlayer.State.CHARGING`, 改成问这个方法。
##    区别在于依赖什么:
##      · 直接比枚举成员 → UI 依赖了 State 的**成员名单**。于是「给玩家加一个新状态」
##        会连带改到 HUD 和调试面板, 而且崩在一个跟新状态毫无关系的地方。
##      · 问这个方法   → UI 只依赖「玩家能回答这个问题」。
##
##    ⚠️ 这不是理论洁癖, 是一个真的踩过的坑: v0.3 加完 CHARGING/GUARD_BROKEN 之后,
##       HUD 和调试面板曾因为类缓存里还留着上一版的 State 名字表而**整个脚本加载失败**
##       (Cannot find member "CHARGING" in base "BlitzPlayer.State")。
##       把成员名集中到 player.gd 这一处之后, 就算缓存再过期,
##       受影响的也只有 player.gd 一个文件, 而不是所有引用过 State 的地方。
func is_charging() -> bool:
	return state == State.CHARGING


## 是否处于被破防的硬直中 (精力见底被打崩)
func is_guard_broken() -> bool:
	return state == State.GUARD_BROKEN


# ============================================================
# 外观 —— 原点在**脚底**, 一律负 Y 往上
# ============================================================
const ROBE_TOP: Color = Color(0.22, 0.34, 0.62)     ## 道袍主色 (青蓝)
const ROBE_BOTTOM: Color = Color(0.13, 0.19, 0.38)  ## 袍角 (暗)
const SKIN: Color = Color(0.94, 0.80, 0.66)
const HAIR: Color = Color(0.10, 0.09, 0.14)
const BLADE: Color = Color(0.88, 0.94, 1.0)
const SASH: Color = Color(0.85, 0.30, 0.32)         ## 腰带 (朱红)
const SHIELD_COLOR: Color = Color(0.5, 0.95, 1.0)   ## 护盾弧
const PARRY_READY_COLOR: Color = Color(1.0, 0.9, 0.4)  ## 精准窗口开着时的护盾弧
const CHARGE_COLOR: Color = Color(0.65, 0.85, 1.0)     ## 蓄力 (还没满)
const CHARGE_READY_COLOR: Color = Color(1.0, 0.8, 0.25) ## 蓄满 (可破霸体)
const GUARD_BREAK_COLOR: Color = Color(0.9, 0.3, 0.35)  ## 破防
## 精准格挡爆闪的时长 (秒)
const PARRY_FLASH_TIME: float = 0.32


func _draw() -> void:
	if state == State.DEAD:
		return

	# 无敌闪烁。⚠️ 闪避时不闪 (会把拖影闪断成几截),
	#    格挡/破防时也不闪 —— 否则护盾弧会跟着一起消失, 看起来像「盾没了」。
	if invincible_timer > 0.0 \
			and state != State.DASHING and state != State.BLOCKING and state != State.GUARD_BROKEN:
		if fmod(invincible_timer * 12.0, 2.0) >= 1.0:
			return

	# ══════════════════════════════════════════════════════════
	# 地面层 —— **不抬高**
	# ══════════════════════════════════════════════════════════
	# 🔑 这一刀切分是「跳跃能被读出来」的全部秘密: 身体抬起来、影子留在原地,
	#    眼睛立刻就知道人离地了。影子要是跟着身体一起抬, 跳跃会**完全看不出来**——
	#    角色只是在屏幕上平移了一下, 和走位没有区别。
	_draw_shadow()
	_draw_dash_trail()
	# 出招的地面残留 —— 和判定同源 (都从 light_shape()/heavy_shape() 来), 见各自的注释
	if state == State.ATTACKING:
		_draw_attack_ground()
	if state == State.CHARGING:
		_draw_charge_ground_ring()

	# ══════════════════════════════════════════════════════════
	# 身体层 —— 整体抬高 height
	# ══════════════════════════════════════════════════════════
	# 🏗️ 用 draw_set_transform 整体平移, 而不是给每个 _draw_xxx 传一个 offset 参数:
	#    抬高是**全局属性**, 传参的写法每新增一个 _draw_xxx 就要记得传一次,
	#    漏一个就是「跳跃时刀留在原地」—— 看起来像刀脱手飞了, 而且只在跳跃时出现。
	#    整体平移一次, 这类漏传在结构上不可能发生。
	draw_set_transform(Vector2(0.0, -height), 0.0, Vector2.ONE)

	var flash: bool = _hit_flash_timer > 0.0
	var body_color: Color = ROBE_TOP
	if state == State.GUARD_BROKEN:
		body_color = GUARD_BREAK_COLOR
	elif state == State.CHARGING:
		# 蓄力时袍色往冷光偏 —— 和地面的金色蓄力环形成对比, 更醒目
		body_color = ROBE_TOP.lerp(CHARGE_COLOR, 0.25 * charge_ratio())

	if state == State.DASHING:
		_draw_body(Color(0.35, 0.95, 1.0), flash)
	else:
		_draw_body(Color.WHITE if flash else body_color, flash)
		_draw_sword()
		if state == State.BLOCKING:
			_draw_shield()
	if state == State.CHARGING:
		_draw_charge_head_ring()
	_draw_contact_flash()

	# 复位。抬高只该作用于上面这一段 —— 后面若再加绘制, 不该莫名其妙跟着飘起来。
	draw_set_transform(Vector2.ZERO, 0.0, Vector2.ONE)


## 出招时**地面上**的残留。贴地画, 不随跳跃抬高。
##
## 🏗️ 这是横版里「攻击范围」唯一的表达方式。
##    侧视里一把刀只能画出**一条线**, 而判定是**一块面**; 玩家看到的和被打到的
##    如果不一致, 就会觉得「明明没碰到我却掉血」。所以每一招都必须在**地面平面**上
##    把它扫过的面积亮一下 —— 侧视里地面平面 = 屏幕上那个被压扁的椭圆平面。
##
## ⚠️ 几何全部来自 `light_shape()` / `heavy_shape()`, 和真实判定是同一个来源。
##    在这里另写一套极坐标/矩形画法, 调完手感后必然对不上, 而且是双向的:
##    既可能「画大了打不到」, 也可能「画小了一扫一片」。
func _draw_attack_ground() -> void:
	var total: float = maxf(0.001, _attack_total)
	var t: float = 1.0 - clampf(_attack_timer / total, 0.0, 1.0)

	if _attack_kind == AttackKind.SKILL:
		# 落雷的地面圈由 LightningBolt 自己画 —— 它要活 0.6 秒 (跨过伤害窗口),
		# 而本函数只在 ATTACKING 期间跑。两处都画的话, 出招结束那一刻圈会闪一下。
		return

	if _attack_kind == AttackKind.LIGHT:
		# 横劈: 一道**扫过去**的扇环, 前段窄后段宽 —— 读出「刚扫过这儿」。
		# 扫过的角度区间跟着招式进度走, 而不是整片一起闪。
		var shape: AttackShape = light_shape()
		var half: float = light_sweep_half_angle
		# 拖尾只保留最后 ~55% 的行程, 太长会糊成一个整扇形, 看不出「扫」的方向
		var from_deg: float = lerpf(-half, half, clampf(t - 0.55, 0.0, 1.0))
		var to_deg: float = lerpf(-half, half, t)
		var fade: float = 1.0 - t * t
		var pts: PackedVector2Array = shape.sweep_trail_points(
			Vector2.ZERO, facing, from_deg, to_deg, 0.34)
		if pts.size() >= 6:
			draw_colored_polygon(pts, Color(1.0, 1.0, 0.92, 0.30 * fade))
			# 外缘描一道亮线 —— 扇环本身很淡, 靠这道边把范围**定死**给眼睛看。
			# sweep_trail_points 的返回值前半段就是外缘 (先正着扫外圈, 再倒着扫内圈),
			# 所以直接取前一半, 不用再算一遍几何。
			var edge: PackedVector2Array = PackedVector2Array()
			for i: int in range(pts.size() / 2):
				edge.append(pts[i])
			draw_polyline(edge, Color(1.0, 0.98, 0.8, 0.7 * fade), 2.0, true)
	else:
		# 重击: 身前一条**纵深很窄**的长条 —— 形状本身就是「你得对准了才行」。
		# 直接画 shape 的轮廓 (和敌人预警同一个函数), 只是更淡。
		var fade: float = 1.0 - t * t
		heavy_shape().draw_telegraph(
			self, Vector2.ZERO, facing,
			Color(1.0, 0.85, 0.45, 0.16 * fade),
			Color(1.0, 0.8, 0.4, 0.55 * fade))


## 脚下阴影 —— 横版里它承担两件事, 缺一不可:
##   ① 「我站在哪个格子上」—— 原点在脚底, 影子画在原点就是格子里的落点
##   ② 「我离地多高」—— 跳起来时影子缩小变淡, 这是空中状态**最强的**视觉信号
func _draw_shadow() -> void:
	# 越高 → 影子越小越淡。
	# ⚠️ 不能反过来 (越高越大) —— 那个读起来像「跳起来更重」, 而且会让人以为
	#    影子是某种攻击预警圈。
	#
	# 160px 这个分母不是随手取的: 满跳高度 = jump_speed² / (2×gravity)
	# = 520² / 2800 ≈ 96px。所以满跳时影子还剩约 40% 的尺寸, 落地前的收缩是连续的,
	# 不会在半空突然「啪」一下消失。
	var k: float = clampf(1.0 - height / 260.0, 0.55, 1.0)
	# ⚠️ 影子画在**地面**上, 所以必须跟着地面一起压扁 (世界半径 13 → 屏幕 13×6.5)。
	#    画成正圆的话它就不是「地上的一摊影子」, 而是「贴在镜头玻璃上的一片黑」——
	#    因为地面的格子是 2:1 的, 正圆影子摆在上面一眼就假。走 ground_circle 别手写。
	var pts: PackedVector2Array = BeltSpace.ground_circle(13.0 * k, 16)
	# ⚠️ 缩小和变淡用的是**两个不同的分母, 而且都不缩到 0**。
	#    第一版两个都用「和尺寸同一个 k」直接乘, 结果满跳时影子只剩 4px 半径 + 0.14 alpha,
	#    在深色地板上**基本看不见** —— 而影子是「他离地了」唯一的参照物, 它一没,
	#    跳跃就退化成「角色在屏幕上平移了一下」。地板本身是深色 (0.17,0.18,0.24),
	#    纯黑压在它上面靠的就是 alpha, 所以 alpha 的下限必须留够。
	#
	# ⚠️ alpha 从 0.46 提到 0.62, 是**压扁逼出来的**, 不是为了更好看:
	#    同样的世界圆压扁之后屏幕面积只剩一半, 同样的 alpha 就只剩一半的「墨」。
	#    实测在 1 倍画面下滞空影子淡到几乎看不见 —— 而那正是它唯一的用途。
	#    面积减半 → alpha 补回来, 是唯一能把读数拉回原样的办法 (把半径调大是错的,
	#    那会让影子比角色本身还宽, 读起来变成「角色站在一个圆坑里」)。
	var fade: float = clampf(1.0 - height / 420.0, 0.55, 1.0)
	draw_colored_polygon(pts, Color(0.0, 0.0, 0.0, 0.62 * fade))


## 腿 + 脚 —— **走路读得出来的主要线索**。
##
## 🏗️ 为什么值得单独画: 横版里「输入有没有生效」是玩家持续要确认的事,
##    而被墙挡住、被击退、滑行减速这三种情况在**没有腿**的时候长得一模一样
##    (都是「人在动但不确定自己有没有在走」)。腿一摆, 这三件事立刻分开:
##      · 站着不动 → 腿停住
##      · 被墙顶住 → 速度归零 → 腿停住 (和上面一致, 正确)
##      · 松键滑行 → 速度还在 → 腿还在摆 (正确)
func _draw_legs() -> void:
	var sw: float = sin(_walk_phase)
	var back: Color = ROBE_BOTTOM.darkened(0.25)
	var front: Color = ROBE_BOTTOM
	if not _grounded:
		# 空中: 两脚并拢往上收 —— 「缩起来」和「站在地上」一眼分得开,
		# 也是除了影子之外第二个「我在空中」的提示。
		# ⚠️ 收上去的幅度必须**大于袍摆高度** (-12), 否则脚被袍子吃掉、
		#    「缩起来」这个姿态根本看不见, 就退化成「和站着一样」了。
		_draw_foot(Vector2(-3.0, -8.0), back)
		_draw_foot(Vector2(3.5, -10.0), front)
		return
	# 前后各一只脚: 一只往前摆的同时另一只往后摆 (差半周期 = 反向)
	_draw_foot(Vector2(-sw * 6.0, -maxf(0.0, -sw) * 3.0), back)
	_draw_foot(Vector2(sw * 6.0, -maxf(0.0, sw) * 3.0), front)


## 一只腿 + 脚。at 是脚踝位置 (y=0 就是地面), 所以整条腿画在它**上方**。
##
## ⚠️ 小腿那一截不是装饰 —— 袍摆落在 y=-12, 只画脚掌的话整只脚会待在袍子里面,
##    走路摆动会**完全看不见** (这个 bug 真出现过: 截图里角色像一块倒扣的布,
##    按 D 走和站着不动长得一模一样)。
func _draw_foot(at: Vector2, c: Color) -> void:
	# 脚跟落在 at, 脚跟之上的小腿从袍摆里伸出来
	draw_line(at + Vector2(0.0, -11.0), at, c, 3.0)
	# 脚掌: 侧视里脚是有方向的, 脚尖朝朝向那一侧多伸一点
	var f: float = float(facing)
	var toe: float = 5.0 * f
	var heel: float = -2.0 * f
	var x0: float = at.x + minf(toe, heel)
	draw_rect(Rect2(x0, at.y - 4.0, absf(toe - heel), 4.0), c, true)


## 侧视身体。
##
## 🏗️ 和等距版 (正面站着) 的区别在**轮廓**, 不在配色:
##    等距版是从斜上方看, 看到的是「袍子前后一样宽的梯形」;
##    侧视看到的是人的**侧面** —— 肩窄、身厚、下摆喇叭, 而且脸的朝向必须靠
##    「五官往哪边偏」表达 (没有第二个轴可以用了)。
func _draw_body(body_color: Color, flash: bool) -> void:
	var f: float = float(facing)

	_draw_legs()

	# 袍身: 侧视轮廓 —— 偏窄偏厚, 下摆往后拖出一点 (跑动时袍角向后是这种视角的常识)
	#
	# ⚠️ 下摆必须停在 y=-12, **不能落到 0**。落到底就是「角色整个人埋进地里」,
	#    而且会把腿脚整段盖住 —— 见 _draw_foot 上面那条注释, 这是个踩过的坑。
	#    留出的这 12px 正好够小腿 + 脚掌露在外面。
	# ⚠️ 肩宽 (7) 必须 ≥ 头半径 (7.2)。第一版肩只有 6、头却有 7.6 ——
	#    画出来是「一颗头架在一根棍上」, 侧视剪影完全不像人。
	var robe: PackedVector2Array = PackedVector2Array([
		Vector2(-7.0, -40.0), Vector2(7.0, -40.0),
		Vector2(11.0, -12.0), Vector2(-11.0, -12.0),
	])
	draw_colored_polygon(robe, body_color)
	# 下摆更暗, 做出体积感
	if not flash:
		draw_colored_polygon(PackedVector2Array([
			Vector2(-9.2, -26.0), Vector2(8.6, -26.0),
			Vector2(11.0, -12.0), Vector2(-11.0, -12.0),
		]), Color(ROBE_BOTTOM.r, ROBE_BOTTOM.g, ROBE_BOTTOM.b, 0.85))

	# 腰带 —— 侧视时是一小段, 不是横贯的整条
	draw_line(Vector2(-6.0, -33.0), Vector2(7.0, -33.0), SASH, 3.0)

	# 头。整体往朝向偏一点点 —— 人的头不会正好居中在肩上
	var head: Vector2 = Vector2(f * 1.5, -48.0)
	draw_circle(head, 7.2, SKIN)

	# 头发: 盖住**后脑 + 头顶**那一侧 (朝向的反面往上偏) + 一个发髻拖在更后面。
	# 这一条是侧视里「他面朝哪」最主要的信号 —— 比眼睛更早被看到。
	#
	# ⚠️ 后偏量 (4.0) 和半径 (6.8) 是一对, 不能只改一个:
	#    脸的可见宽度 ≈ sqrt((后偏+头半径)² + 上偏²) - 发半径。
	#    第一版用 2.2/7.0 算出只有 3px, 画面上头就是**一颗纯黑的球**,
	#    朝向完全读不出来 (而这一项正是切换视角要解决的那个痛点)。
	draw_circle(head + Vector2(-f * 4.0, -3.0), 6.8, HAIR)
	draw_circle(head + Vector2(-f * 6.4, -4.2), 3.2, HAIR)

	# 五官: 一只眼 + 一个鼻尖, 都压在朝向那一侧
	draw_circle(head + Vector2(f * 3.4, -0.5), 1.5, HAIR)
	# 鼻尖: 用小三角表达侧脸 —— 这是让「侧视」读起来不像「正面的圆」的关键一笔
	draw_colored_polygon(PackedVector2Array([
		head + Vector2(f * 6.5, -1.0),
		head + Vector2(f * 10.0, 1.6),
		head + Vector2(f * 6.5, 2.6),
	]), SKIN.darkened(0.12))


## 手里的刀 —— 侧视时刀在**竖直平面**里抡: 从身后上方劈到身前下方。
##
## 🏗️ 两招的肢体语言**故意分开**, 因为它们的判定形状本来就不同:
##   · **横劈 (轻击, 扇形)** —— 刀从头一侧横着扫到另一侧, 轨迹偏**水平**,
##     地面上同时拖出一道扇环 (见 _draw_sweep_trail)。「一片都被扫到了」靠扇环说,
##     不靠刀本身 —— 侧视里一把刀是画不出「面」的。
##   · **重劈 (重击, 矩形)** —— 竖直的大劈砍, 从身后上方一路砸到身前下方,
##     刀更长、幅度更大, 而且盯的是**前方一条线**。
##
## ⚠️ 角度要按朝向**镜像**: 朝左时把方向向量的 x 取反。
##    忘了镜像的话, 朝左挥刀会朝**身后**挥 —— 而画面上只是「刀的方向有点怪」,
##    极难注意到, 但会让玩家觉得判定框在乱打。
func _draw_sword() -> void:
	var f: float = float(facing)
	# 枢轴在**肩前**: 侧视时手在身体朝向前方那一侧
	var pivot: Vector2 = Vector2(f * 5.0, -32.0)
	## 静止时刀斜垂在身前下方 (≈ +1.1 rad)
	var swing: float = 1.1
	var reach: float = 26.0

	if state == State.ATTACKING:
		var total: float = maxf(0.001, _attack_total)
		var t: float = 1.0 - clampf(_attack_timer / total, 0.0, 1.0)
		match _attack_kind:
			AttackKind.HEAVY:
				# 重击: 从身后上方一路劈到身前下方, 而且刀更长 ——
				# 「这一下很重」必须在动作上就看得出来, 不能只靠伤害数字
				swing = lerpf(-2.5, 0.9, t)
				reach = 34.0
			AttackKind.SKILL:
				# 落雷: 刀**竖举向天**并且一直举着 —— 这一招的动势是「引雷」,
				# 不是砍。举起的刀也是给玩家的一个提示: 现在在施法, 不能动。
				# ⚠️ 举到头侧接近竖直 (-PI/2 ≈ 向上), 而不是举到正上方 ——
				#    正上方会和蓄力那一下的姿势撞脸, 两个「举刀」看起来一样就白分了。
				swing = lerpf(1.1, -1.5, clampf(t * 3.0, 0.0, 1.0))
				reach = 30.0
			_:
				# 横劈: 起手抬到身后偏上, 收在身前偏下 —— 全程贴近水平,
				# 和重劈那道夸张的竖直大劈在**剪影上**就能一眼分开
				swing = lerpf(-1.35, 0.75, t)
	elif state == State.CHARGING:
		# 蓄力: 把刀往**身后上方**拉, 越满拉得越靠后
		# (和敌人起手是同一套肢体语言 —— 玩家不用学第二遍)
		var ct: float = charge_ratio()
		swing = lerpf(1.1, -2.6, ct)
		reach = lerpf(26.0, 32.0, ct)

	# 屏幕坐标系里角度 0 = 向右, +PI/2 = 向下。朝左时镜像 x。
	var blade_dir: Vector2 = Vector2(cos(swing), sin(swing)) * Vector2(f, 1.0)
	var tip: Vector2 = pivot + blade_dir * reach

	# 出刀时的残留刀光: 沿扫描方向往回拖三条渐隐的弧
	if state == State.ATTACKING:
		for i: int in range(3):
			var a: float = swing - float(i + 1) * 0.22
			var d2: Vector2 = Vector2(cos(a), sin(a)) * Vector2(f, 1.0)
			draw_line(pivot, pivot + d2 * reach,
				Color(1.0, 1.0, 1.0, 0.45 - float(i) * 0.13), 3.0)

	# 刀身 + 刀柄。蓄满时刀身发金光 —— 「可以破霸体了」的第二个提示
	var blade_color: Color = BLADE
	if state == State.CHARGING and charge_ratio() >= heavy_armor_break_ratio:
		blade_color = CHARGE_READY_COLOR
	draw_line(pivot, tip, blade_color, 2.6)
	draw_line(pivot, pivot - blade_dir * 5.0, Color(0.25, 0.18, 0.12), 3.4)


## 蓄力地面光环 —— **不随跳跃抬高** (它贴在地上, 是人相对地面的参照)。
##
## 🏗️ 这里故意和头顶进度环拆成两个函数: 一个在地面层、一个在身体层。
##    合在一起写的话, 要么光环跟着人飞 (它就不再是「地面」参照了),
##    要么进度环留在地上 (那就没法看: 人跳起来时环离头越来越远)。
func _draw_charge_ground_ring() -> void:
	var t: float = charge_ratio()
	var c: Color = _charge_color(t)
	# 贴在地面上 → 跟着地面压扁。半径是世界单位, 屏幕上成 2:1 椭圆。
	var ring: PackedVector2Array = BeltSpace.ground_circle(15.0 + t * 15.0, 20)
	draw_colored_polygon(ring, Color(c.r, c.g, c.b, 0.10 + t * 0.12))


## 蓄力头顶进度环 —— 随身体一起抬高。
##
## 🎮 玩家必须能**一眼判断蓄到几成了**, 否则「满蓄破霸体」就是盲猜。
##    三重提示: 地面光环 (大小) + 头顶进度环 (角度) + 满蓄时的脉动。
func _draw_charge_head_ring() -> void:
	var t: float = charge_ratio()
	var is_charged: bool = t >= heavy_armor_break_ratio
	var c: Color = _charge_color(t)

	var pivot: Vector2 = Vector2(0.0, -64.0)
	var steps: int = maxi(2, int(t * 44.0))
	var pts: PackedVector2Array = PackedVector2Array()
	for i: int in range(steps + 1):
		var a: float = -PI * 0.5 + TAU * t * (float(i) / float(steps))
		pts.append(pivot + Vector2(cos(a), sin(a)) * 9.0)
	if pts.size() >= 2:
		draw_polyline(pts, c, 3.0)

	# 满蓄脉动: 最后这一下是「现在松手就能破霸体」的信号
	if is_charged:
		var pulse: float = 0.5 + 0.5 * sin(_charge_timer * 24.0)
		draw_circle(pivot, 11.0 + pulse * 4.0, Color(c.r, c.g, c.b, 0.2 + pulse * 0.35))


## 蓄力充足度对应的颜色 (满蓄转金)。
##
## ⚠️ 别把返回值赋给一个叫 `ready` 的变量 —— Node 基类自己有一个同名 signal,
##    会触发 SHADOWED_VARIABLE_BASE_CLASS 警告, 而且真去 emit("ready") 时行为诡异。
##    (这是 v0.3 踩过的坑, 换视角时顺手把它收进这个函数, 免得再犯。)
func _charge_color(t: float) -> Color:
	return CHARGE_READY_COLOR if t >= heavy_armor_break_ratio else CHARGE_COLOR


## 护盾 —— 侧视时是**身前的一面竖弧**。
##
## 🏗️ 位置本身就是教学: 盾只画在朝向那一侧。玩家看到盾挂在右边, 就知道
##    从左边来的攻击挡不住 —— 不需要额外画什么边界线。
##
## ⚠️ v0.3 那两条「扇形边界线」删掉了, 而且**不能**搬过来:
##    它们标的是连续朝向时代「±90° 扇形的两条边」, 那是可以调、可以站错的。
##    横版朝向只有左右, 边界恒好在角色的正中线上 —— 一条永远垂直、永远不动的线,
##    画出来只会让人以为「盾牌有角度要调」, 是一个纯误导。
func _draw_shield() -> void:
	var f: float = float(facing)
	var parry_ready: bool = is_parry_window_open()
	var c: Color = PARRY_READY_COLOR if parry_ready else SHIELD_COLOR

	# 身前一道竖弧: 从头顶高度挡到膝盖高度。中间鼓出去一点, 像一面盾。
	var arc: PackedVector2Array = PackedVector2Array()
	var steps: int = 12
	for i: int in range(steps + 1):
		var t: float = float(i) / float(steps)
		var y: float = lerpf(-52.0, -6.0, t)
		var bulge: float = sin(t * PI) * 4.0
		arc.append(Vector2(f * (18.0 + bulge), y))
	draw_polyline(arc, c, 3.2 if parry_ready else 2.4)

	# 内侧淡填充: 补一圈回到身体, 表达「这是一面挡在身前的盾」
	var fan: PackedVector2Array = arc.duplicate()
	fan.append(Vector2(f * 6.0, -30.0))
	draw_colored_polygon(fan, Color(c.r, c.g, c.b, 0.16))


## 精准格挡 / 普通格挡的即时反馈
func _draw_contact_flash() -> void:
	if _parry_flash_timer > 0.0:
		var r: float = 1.0 - _parry_flash_timer / PARRY_FLASH_TIME
		draw_arc(Vector2(0.0, -22.0), lerpf(12.0, 44.0, r), 0.0, TAU, 26,
			Color(1.0, 0.95, 0.55, (1.0 - r) * 0.9), 3.0)
	if _block_flash_timer > 0.0:
		var br: float = _block_flash_timer / 0.14
		draw_arc(Vector2(0.0, -22.0), 28.0, 0.0, TAU, 20,
			Color(SHIELD_COLOR.r, SHIELD_COLOR.g, SHIELD_COLOR.b, br * 0.8), 2.0)


## 闪避拖影: 沿反向留三团渐隐的影子。
##
## ⚠️ 方向取自**实际速度**, 不是朝向 —— 闪避可以斜着闪 (侧闪进纵深是横版清关里
##    绕背的主要手段, 见 _start_dash)。用朝向画的话, 斜闪时会拖出一条和运动方向
##    不符的影子, 看起来像在滑冰。
func _draw_dash_trail() -> void:
	if state != State.DASHING:
		return
	var d: Vector2 = velocity.normalized() if velocity.length() > 1.0 else facing_vec()
	for i: int in range(3):
		var at: Vector2 = -d * float(i + 1) * 11.0
		var a: float = 0.30 - float(i) * 0.09
		draw_circle(at + Vector2(0.0, -20.0), 12.0 - float(i) * 2.5, Color(0.35, 0.85, 1.0, a))
