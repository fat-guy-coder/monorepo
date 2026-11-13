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
##
##   · **block_aim_override (强制朝向出口)** —— 它是鼠标瞄准留下的壳, 存在的唯一理由是
##     「让自检精确摆出'从正面来 / 从背后来'」。删掉它的理由和删鼠标瞄准是同一条:
##     facing 现在**恒为 ±1** (见下面的 var facing), 「未定向」这个状态不存在了,
##     于是「进入格挡前先补一次朝向」也不需要了。
##     自检改成直接写 `player.facing = -1` —— 那正是游戏里真实存在的状态, 没有旁路
##     可以绕过朝向规则, 比留一个「只有测试才用」的出口更可信。
##     (留着的话迟早会有人拿它去写「格挡时自动转向敌人」, 那正好是刚删掉的那套东西。)
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
## 护体罡气张开 (v0.6 —— 「用输出换容错」的第一个技能)
signal aura_cast(at: Vector2)
## 护体罡气吃掉了一次伤害 (罡气随即消失)
signal aura_absorbed(at: Vector2)
## 剑阵落成 (v0.7 —— 「布置」类技能, 世界坐标是阵心)
signal sword_array_cast(at: Vector2)

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

## 身体的**世界**半径 —— 只给「角色之间不能重合」用 (见 body_separation.gd)。
##
## ⚠️ 它和 HURTBOX_RADIUS 是**两个**数, 别合并: 受击框是「被打中」的容差, 本来就该
##    比身体大方一点; 而这里决定的是「人能站多近」, 大了会显得两个角色互相排斥。
##    和敌人的 BODY_RADIUS(11) 加起来是 23 —— 约 1/3 格, 正好是两个人贴住该有的距离。
const BODY_RADIUS: float = 12.0

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

## 落地硬直 (秒) —— **跳跃的代价**。
##
## 🏗️ 为什么需要它: 没有落地硬直的时候, 「跳过去」是躲横扫的**零代价**答案
##    (跳跃高度 96 > 横扫的高度带 40), 玩家根本不需要读招。有了它, 跳 =
##    「用 0.18 秒的输出窗口换安全」—— 而敌人的收招破绽正好是这个长度。
##
## ⚠️ 只锁**进攻** (轻击/重击/技能), **不锁跳跃 / 闪避 / 格挡**:
##    · 锁跳跃会让「落地」变得黏手, 而且跳跃本身不是进攻手段;
##    · 闪避是花了 25 精力买来的, 它本来就该能救场;
##    · 格挡是防御姿态, 落地后第一反应就该是举盾 —— 锁掉它只会让人觉得自己被卡住。
##    锁进攻就够了: 跳跃真正损失的是**敌人的收招破绽**这个输出窗口。
@export var landing_lag_time: float = 0.18
## 触发落地硬直的最小下落速度 (px/s)。低于它 = 小跳/轻微起伏, 不罚。
##
## 可变跳跃高度会让「轻点」的落地速度小很多 (截断后约 -234, 满跳约 -520),
## 所以这个门槛决定「小跳算不算作弊」。150 让两种跳都触发, 只放过真正的细微起伏。
@export var landing_min_impact: float = 150.0
## 落地硬直期间保留的移动能力 (倍率)。
@export var landing_move_scale: float = 0.7
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
# 技能 —— **数值与形状全部在 `scripts/combat/skill_book.gd`** (v0.9)
# ============================================================
#
# 为什么搬走: 原来三个技能 = 15 个 @export + 三个专属施放函数。加第四个技能要
# 同时动状态机 / 冷却 / 动画 / 输入四处 —— 而「技能是什么」本该只是一份数据。
# 现在这里只剩三件事:
#   ① 输入 → SkillBook 的哪个 id   (见 _process_normal)
#   ② 按 family 分派的执行代码      (见 _cast_skill)
#   ③ 冷却字典 (所有技能共用一份, 不再一人一个计时器变量)
# 每一招的数值理由 (落雷的延迟代价 / 罡气的互斥 / 剑阵的布置) 随数值一起
# 搬进了 SkillBook._make_* 的注释里, 没有丢。

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

## 朝向: **四向单位向量** (Facing.RIGHT / LEFT / UP / DOWN), 世界空间。
##
## 🏗️ v0.5 从 `int ±1` 改成四向 —— 纵向移动时必须能看背面/正面,
##    否则「往屏幕里走」看起来就是侧着身子滑冰。移动仍是 8 向, 朝向只取 4 向。
##    见 combat/facing.gd 文件头。
##
## ⚠️ 不要为了省事写回 ±1: 判定 (AttackShape 的局部坐标系) 和绘制都读它,
##    少一个轴不会有任何报错, 只会「朝上攻击打不到人」。
var facing: Vector2 = Facing.RIGHT

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
## 走路摆动相位。腿的摆动只跟**位移速度**有关, 站着不动就停住 —— 见 anim_phase()
var _walk_phase: float = 0.0
## 纯视觉时钟。**只**用于那些没有对应计时器的姿态 (站立呼吸、格挡时的轻微起伏)。
##
## ⚠️ 别拿它去做任何判定相关的事 —— 它的唯一职责是「让静止的角色看起来是活的」。
##    一旦有判定依赖它, 就出现了第二个时钟, 动画和判定会开始各自漂移
##    (那个 bug 的表现是「动画早就打完了, 伤害却在半秒后才出现」, 极难定位)。
var _anim_clock: float = 0.0

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
## 所有技能的冷却, **按 SkillDef.id 索引**。
##
## 🏗️ 一份字典而不是三个计时器变量: 前者对「第 N 个技能」天然成立, 后者每加
##    一个技能就要加一个变量、一行递减、一处复活清理 —— 然后其中一处忘了,
##    表现是「复活后剑阵还在冷却」或「某个技能永远不会冷却」, 都很难看出。
## ⚠️ 键是 SkillDef.id (StringName)。技能目录里 id 唯一由 SkillBook.problems() 守着。
var _cooldowns: Dictionary = {}
## 当前正在放的技能 id —— 动画选择用 (见 anim_state)。
var _cast_skill_id: StringName = &""
## 落地硬直剩余时间 (>0 = 刚落地, 不能进攻)
var _landing_timer: float = 0.0
## 护体罡气剩余时间 (>0 = 罡气开着, 能吃伤害, 也不能输出)
var _aura_timer: float = 0.0
## 罡气还能吃几次伤害 (SkillDef.absorb_hits, 当前 = 1)
var _aura_hits: int = 0
## 罡气被打破时的白光计时 (纯视觉)
var _aura_flash_timer: float = 0.0
## 施放硬直。**只锁进攻**, 不锁走位/闪避/格挡 (和落地硬直、罡气同一条理由:
## 锁一切会读成卡顿, 锁进攻才是「这一下你出不了别的招」)。
## 单独一个计时器而不是借用 _attack_cooldown_timer: 后者只挡轻击和重击,
## 挡不住落雷和下一个剑阵 —— 那样「插阵 → 立刻放雷」会变成无硬直连招。
var _cast_lock_timer: float = 0.0

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
	# 所有技能冷却一起走 —— keys() 返回的是副本, 边删边遍历是安全的。
	for id: StringName in _cooldowns.keys():
		var left: float = float(_cooldowns[id]) - delta
		if left <= 0.0:
			_cooldowns.erase(id)
		else:
			_cooldowns[id] = left
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
	_landing_timer = maxf(0.0, _landing_timer - delta)
	_aura_timer = maxf(0.0, _aura_timer - delta)
	_aura_flash_timer = maxf(0.0, _aura_flash_timer - delta)
	_cast_lock_timer = maxf(0.0, _cast_lock_timer - delta)
	_anim_clock += delta


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
			# ⚠️ 落地速度必须在清零**之前**读 —— 清零之后就没法判断「这是真跳还是轻微起伏」了。
			var impact: float = _height_vel
			height = 0.0
			_height_vel = 0.0
			_grounded = true
			# 落地硬直 —— 跳跃的代价 (见 landing_lag_time 的 🏗️)
			if impact <= -landing_min_impact:
				_landing_timer = landing_lag_time

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
	# 落地硬直只让走位变钝, 不让人定住 —— 定住会读成「卡了」, 变钝才是「还没站稳」。
	var move_scale: float = landing_move_scale if _landing_timer > 0.0 else 1.0
	_apply_move(input_dir, move_accel, move_decel, delta, move_scale)
	# 朝向只看水平分量 —— 纵深移动不转身 (见文件头 ④)
	_face(input_dir)

	# 格挡优先于一切 —— 它是「防御姿态」, 按下就该立刻生效
	if Input.is_action_pressed("block"):
		_enter_blocking()
		return

	if Input.is_action_just_pressed("dash") and _can_dash():
		_start_dash(input_dir)
		return

	# 护体罡气排在进攻之前: 它是**防御反应**, 而这时候玩家往往正被逼到墙角。
	# ⚠️ 它不过 `_can_start_offense` —— 罡气恰恰要在「落地硬直/被逼住」时能开。
	if Input.is_action_just_pressed("aura") and _can_cast(SkillBook.AURA):
		_cast_skill(SkillBook.AURA)
		return

	# 剩下四件都是「进攻」, 统一走一个闸门 (落地硬直 / 罡气期间不能出手)
	if not _can_start_offense():
		return

	# 剑阵排在重击之前: 它是「布置」, 不接续任何一次出手 ——
	# 蓄力中按 O 会被 CHARGING 状态吃掉, 这是对的 (蓄力是按住型输入)。
	if Input.is_action_just_pressed("sword_array") and _can_cast(SkillBook.SWORD_ARRAY):
		_cast_skill(SkillBook.SWORD_ARRAY)
		return

	if Input.is_action_just_pressed("attack_heavy") and _can_start_heavy():
		_enter_charging()
		return

	# 技能排在重击**之后**: 蓄力是按住型的, 重击一旦进入 CHARGING 就吃掉后续输入,
	# 顺序反过来会让「按住 K 的同时碰了一下 U」变成放技能 (玩家想蓄力却放了雷)。
	if Input.is_action_just_pressed("attack_skill") and _can_cast(SkillBook.LIGHTNING):
		_cast_skill(SkillBook.LIGHTNING)
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


## 按移动输入转向。传的是**屏幕方向** (和 _apply_move 拿的是同一个输入), 不要求归一化。
##
## 🏗️ 内部先换回世界空间再吸附 —— 屏幕上的纵轴是压扁过的, 直接拿屏幕 y 去比大小,
##    斜向输入 (右+下) 会被判成「更偏下」, 朝向就永远吸不到右边。
##    世界空间里两个轴同一把尺子, 主轴判断才是公平的。
##
## 🏗️ 换向规则交给 Facing.choose: 同轴立即转 (明确意图), 换轴要明显压过当前轴 (防抖)。
##    直接 snap 的话, 斜向走 (0.707, 0.707) 会逐帧在「右」和「下」之间翻。
func _face(p_screen_dir: Vector2) -> void:
	facing = Facing.choose(facing, BeltSpace.to_world(p_screen_dir))


## 朝向的单位向量 (四向之一)。给判定框 / 绘制 / 自检用。
func facing_vec() -> Vector2:
	return facing


## 侧视绘制用的水平符号 (+1 / -1)。
##
## 🏗️ 占位美术阶段, 上下朝向暂时复用「侧视轮廓 + 正面/背面头部」:
##    面朝上画后脑 (没有五官), 面朝下画正脸 (两只眼), 左右仍然是侧脸。
##    等真美术接进来之后, 这三套就是三个独立的精灵帧 —— 这里的 if 会被
##    「按 facing 选动画」取代, 所以别把任何玩法逻辑塞进这个函数。
func _side_facing() -> float:
	return facing.x if absf(facing.x) > 0.5 else 1.0

# ============================================================
# BLOCKING — 举盾。免伤 + 扣精力
# ============================================================
func _process_blocking(delta: float) -> void:
	var input_dir: Vector2 = _input_screen_dir()
	_apply_move(input_dir, move_accel * 0.7, move_decel, delta, block_move_scale)

	# 朝向和别的状态一致: 你往哪走就朝哪。**不再跟随鼠标** —— 见文件头「删掉的东西」。
	_face(input_dir)

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
	_face(input_dir)

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
	# 这里**不需要**先补一次朝向 —— facing 恒为 ±1 (见 var facing 和文件头
	# block_aim_override 那一条)。v0.3 的 facing 可以是「未定向」的 Vector2,
	# 才必须在进入格挡的第一帧补一次, 而那一帧正好是最需要挡的一帧。

	if _parry_cooldown_timer <= 0.0:
		_parry_window_timer = parry_window
		_parry_cooldown_timer = parry_cooldown


## 攻击是不是从**面朝的那一边**来的。
##
## 🏗️ 四向朝向之后, 这就是「以朝向为法线的半平面」: 攻击者相对玩家的位置
##    在朝向那一侧 (点积 > 0) 就挡得住。左右朝向时它退化成只看 X 的旧判定;
##    朝上/朝下时它自动变成「看纵深」—— 站在背后砍你, 举盾挡不住。
##
## ⚠️ 必须在**世界空间**里点积。直接拿屏幕坐标算的话, 纵向分量被压扁了一半,
##    站在斜后方 45° 的敌人有时算正面、有时算背面 (取决于压扁比),
##    而画面上看起来只是「格挡有时候不灵」。
##
## ⚠️ 用的是「玩家 → 攻击者」这个向量, 不是「攻击者 → 玩家」。
##    写成反的会让正面和背面整个对调 —— 表现是「正面的挡不住、背后的反而挡住了」。
func _is_in_guard_front(from_position: Vector2) -> bool:
	if not from_position.is_finite():
		# 没有来源信息时按「挡得住」处理: 宁可对玩家有利, 也不要静默变成背刺
		return true
	var d: Vector2 = BeltSpace.to_world(from_position - global_position)
	# 完全重合时算正面 —— 和旧版「距离太近就算挡住」同样的宽容取向
	if d.length_squared() < 0.0001:
		return true
	return d.dot(facing) >= 0.0



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

	var away: Vector2 = BeltSpace.dir_to_screen(-facing)
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		# ⚠️ normalize_world 而不是 normalized(): d 是**屏幕**位移, 屏幕上的单位向量
		#    换回世界是斜的 (纵深方向会长一倍)。用 normalized() 的话,
		#    「从纵深方向被打崩」会被推得比「从正面被打崩」远一倍 —— 同样是世界速度上限
		#    却推出两种距离, 而且只在特定受击方向上才看得出来。
		away = BeltSpace.normalize_world(d) if d.length() > 0.01 else BeltSpace.dir_to_screen(-facing)
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
			# ⚠️ SKILL 只是**测试/兼容**入口 (自检直接用 _begin_attack(..., SKILL) 触发落雷)。
			#    真实输入走 _cast_skill(SkillBook.X)。落雷不是唯一的技能, 所以这里必须
			#    显式写 id —— 不能沿用「SKILL 就一定是落雷」的旧假设。
			_cast_skill(SkillBook.LIGHTNING)


## 放一个技能 —— **唯一入口**。按 SkillDef.family 分派到三段执行代码。
##
## 🏗️ 这就是 v0.9 把技能搬进数据表换来的东西: 状态机不再认识「落雷」「罡气」
##    「剑阵」这些名字, 只认识三种**执行方式**。加第四个技能不需要动这里。
##
## ⚠️ 精力不够时不能靠上游的检查活着 (上游改了而这里没跟上, 表现就是
##    「精力没了还能放技能」, 静默且不报错) —— 所以扣费失败要自己回滚状态。
func _cast_skill(id: StringName) -> void:
	var d: SkillDef = SkillBook.get_def(id)
	if d == null:
		state = State.NORMAL
		return
	if not stamina.spend(d.stamina_cost):
		state = State.NORMAL
		return

	# 冷却统一记在字典里 —— 三个技能共用一份, 不再一人一个计时器变量。
	# ⚠️ 键是 def.id 而不是传进来的 id: SkillBook.problems() 会校验两者一致,
	#    但这里也以 def 为准, 未知 id 不可能写进一个没人递减的键。
	_cooldowns[d.id] = d.cooldown
	_cast_skill_id = d.id

	match d.family:
		SkillDef.Family.STRIKE:
			_cast_strike(d)
		SkillDef.Family.BUFF:
			_cast_buff(d)
		SkillDef.Family.PLACE:
			_cast_place(d)


## STRIKE —— 生成判定框 (+ 可选特效), 进 ATTACKING 播施法姿态。
##
## 🏗️ 为什么落雷用 `arm_delay` 而不是「挥完手再生成一个判定框」:
##   两者看起来一样, 但差在**出招被打断**的时候。挂同一次出招上的话, 玩家在延迟里
##   被敌人打断 → 判定框和特效随出招一起消失, 圈不见了、雷也没了, 玩家看到的是
##   「我按了, 圈亮了一下, 然后什么都没发生, 但我挨了一下」。这个因果链在屏幕上
##   **读不出来**。现在的行为是: 打断就整招取消, 圈**当场消失** —— 至少
##   「圈没了 = 这招废了」是自洽的 (见 _cancel_pending_attack)。
##
## ⚠️ 别在这里算落点。`LightningBolt` 和 `AttackHitbox` 一样, 挂在**玩家脚下**
##    (传 global_position), 由 shape 自己说出范围在身前哪儿。第一版在这里加了
##    `+ sh.collision_offset(facing)`, 而 FX 内部又按「origin = 攻击者脚下」偏了一次
##    —— 圈被推到离落点 132px 的地方, 「预警说这儿、伤害在那边」。
##    两个消费者遵守同一条摆放规则, 这类双偏移在结构上才不可能发生。
func _cast_strike(d: SkillDef) -> void:
	_attack_kind = AttackKind.SKILL
	state = State.ATTACKING
	_attack_total = d.recovery
	_attack_timer = d.recovery

	var sh: AttackShape = d.make_shape()
	# 判定: 带 arm_delay, 之前完全不生效
	_spawn_attack_hitbox(sh, d.damage, d.has_tag(SkillDef.TAG_ARMOR_BREAK),
		d.max_targets, d.arm_delay)
	_spawn_skill_fx(d, sh)


## BUFF —— 给自己挂一个持续计时器 (罡气)。**不进 ATTACKING**。
##
## 🏗️ 罡气期间玩家还能走、能闪、能挡; 塞进 ATTACKING 的话得为「出招中怎么移动」
##    再写一套, 还会被 _cancel_pending_attack / 受击打断这些为攻击准备的分支误伤。
func _cast_buff(d: SkillDef) -> void:
	_aura_timer = d.duration
	_aura_hits = d.absorb_hits
	aura_cast.emit(global_position + Vector2(0.0, -22.0))


## PLACE —— 在世界层丢一个留在原地的阵 (剑阵), 自己只留一小段施放硬直。
##
## ⚠️ 阵挂在**玩家父节点** (即 y-sort 的 World) 上, 不是挂在玩家身上, 也不是 FX 层:
##    · 挂玩家身上 → 玩家一动阵就跟着走, 「布置」直接退化成「光环」;
##    · 挂 FX 层 (z=40) → 阵会盖在角色脸前面;
##    · 挂 World → 和敌人、地面同处一个 y-sort 世界, 再用绝对 z=-5 落地。
##
## 🏗️ 施放者**死掉**时阵还在: 这是刻意的。阵是场景物件, 不是玩家状态。
##    玩家被围殴时插一个阵再倒下, 那几秒的持续伤害仍然在帮忙 —— 「先手投资」的味道。
func _cast_place(d: SkillDef) -> void:
	_cast_lock_timer = d.recovery

	# 阵心 = 玩家此刻**脚底**的世界坐标。global_position 已经是 (x, -z) 的屏幕表示,
	# 换回世界才是同一种尺子 —— 不换算的话半径会按屏幕比例被压扁。
	var at: Vector2 = BeltSpace.to_world(global_position)
	var host: Node = get_parent()
	SwordArray.spawn(host, at, d.place_radius, d.duration,
		d.tick_interval, d.tick_damage)

	sword_array_cast.emit(at)


## 技能特效的注册表 —— `SkillDef.fx` 是名字, 这里是「名字 → 怎么生」。
##
## ⚠️ 只有**需要专属特效**的技能才必须改到这里 (新增第 ③ 步, 见 skill_book.gd 文件头)。
##    没有 fx 的技能只出判定和数字 —— 新技能的默认状态。
func _spawn_skill_fx(d: SkillDef, sh: AttackShape) -> void:
	match d.fx:
		&"lightning":
			var fx: LightningBolt = LightningBolt.spawn(
				get_tree(), global_position, sh, facing, d.arm_delay)
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
##
## 🏗️ 几何本身的唯一来源是 SkillDef.make_shape(); 这个函数是给调试面板和自检
##    用的「落雷专用入口」, 不是第二份公式。
func skill_shape() -> AttackShape:
	return lightning_def().make_shape()


## 三个技能的 SkillDef —— 测试 / 截图探针 / 将来的技能栏都通过它们读数值,
## **不再在 player.gd 里存第二份 @export** (两份能改的数 = 两份会漂移的数)。
func lightning_def() -> SkillDef:
	return SkillBook.get_def(SkillBook.LIGHTNING)


func aura_def() -> SkillDef:
	return SkillBook.get_def(SkillBook.AURA)


func sword_array_def() -> SkillDef:
	return SkillBook.get_def(SkillBook.SWORD_ARRAY)


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


## 进攻闸门 —— 落地硬直 / 罡气期间**不能出手**, 但可以走、可以挡、可以闪、可以跳。
##
## 🏗️ 为什么锁「进攻」而不是锁「一切」:
##    锁一切 = 被定住, 玩家会读成卡顿; 只锁进攻 = 用**输出窗口**换安全,
##    这正是这两个机制想在博弈里表达的东西 (见 COMBAT_MATRIX.md §3 ①)。
##    ⚠️ 闪避 / 跳跃 / 格挡**故意不走这个闸门** —— 它们是「止损」, 一锁就会出现
##    「被打进硬直又动不了又挡不了」的死亡螺旋。
func _can_start_offense() -> bool:
	return _landing_timer <= 0.0 and _aura_timer <= 0.0 and _cast_lock_timer <= 0.0


## 技能能不能放 —— **所有技能共用**。三个条件缺一不可: 不在冷却、精力够、不在别的动作里。
##
## 🏗️ 参数是 id 而不是「技能种类」: v0.9 之前这里是 `_can_cast_skill()` /
##    `_can_cast_aura()` / `_can_cast_sword_array()` 三个几乎一样的函数。
##    第四个技能就要写第四个 —— 现在一个函数读完表就能回答。
##
## ⚠️ BUFF 额外要求「自己还没开着」: 冷却通常已经够长, 但这是**状态**不是节奏 ——
##    冷却调短了就会变成「刷新罩子」, 而罩子是可叠加的话, 罡气就从兜底变无敌。
func _can_cast(id: StringName) -> bool:
	var d: SkillDef = SkillBook.get_def(id)
	if d == null:
		return false
	if _cooldown_of(id) > 0.0:
		return false
	if not stamina.can_spend(d.stamina_cost):
		return false
	if d.family == SkillDef.Family.BUFF and _aura_timer > 0.0:
		return false
	return true


## 某个技能还剩多少冷却 (0 = 可放)。给输入 / HUD / 自检用。
func _cooldown_of(id: StringName) -> float:
	return float(_cooldowns.get(id, 0.0))


## 技能冷却剩余 (公开版) —— 将来的技能栏读它画冷却圈。
func cooldown_remaining(id: StringName) -> float:
	return _cooldown_of(id)


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


# 护体罡气 / 剑阵的施放代码已并入 _cast_skill 的 family 分派:
#   · 罡气 = SkillDef.Family.BUFF  → _cast_buff()
#   · 剑阵 = SkillDef.Family.PLACE → _cast_place()
# 设计理由 (为什么罡气不进 ATTACKING / 为什么阵挂在 World 上) 随代码一起搬过去了。
#
# ⚠️ 罡气**不需要**过 `_can_start_offense`: 它是防御反应, 而「落地硬直里被逼到
#    墙角」正是最想开它的时刻。输入顺序 (见 _process_normal) 已经把这一条表达出来了 ——
#    罡气的分支在闸门**之前**。


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
	var dir: Vector2 = BeltSpace.normalize_world(input_dir) if input_dir != Vector2.ZERO else BeltSpace.dir_to_screen(facing)
	_face(dir)
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

## amount: 伤害值。from_position: 伤害来源坐标 (用来算击退方向 **和格挡的前后半平面判定**)。
## source: 攻击者节点。只有敌人的攻击判定区会传 —— 精准格挡要靠它把对方打硬直。
## unblockable: **格挡挡不住这一下** (闪避/跳跃照常有效)。见 EnemyAttack.unblockable。
##
## ⚠️ 第三个参数和 BlitzEnemy.take_damage 的同位参数含义**不同**
##    (那边是 breaks_armor: bool)。两者靠鸭子类型调用, 编译器不会提醒。
##    之所以现在没问题: 玩家的攻击判定框 mask 只够得着敌人, 永远打不到玩家自己。
func take_damage(amount: int = 1, from_position: Vector2 = Vector2.INF, source: Node2D = null, unblockable: bool = false) -> void:
	if state == State.DEAD or invincible_timer > 0.0:
		return

	# 护体罡气 → **排在格挡之前**: 罡气是花精力买来的「一次性免伤」,
	# 它先吃掉这一下, 玩家的格挡精力就不会被白白扣掉。顺序反过来会出现
	# 「开着罡气却因为格挡消耗破了防, 罡气还挂着」—— 玩家会以为罡气没用。
	if _aura_timer > 0.0 and _aura_hits > 0:
		_aura_hits -= 1
		# 次数用光才收罩 —— `absorb_hits` 来自 SkillDef, 现在永远是 1。
		# ⚠️ 别把「吃一次就收」写死在计时器里: 将来「金钟罩」这类多点数的罡气
		#    只需要改表里的数字, 不需要动这里。
		if _aura_hits <= 0:
			_aura_timer = 0.0
		_aura_flash_timer = 0.25
		# 和精准格挡同理: 同一帧里第二个判定区不该把罩子刚挡下的这波又打进来
		invincible_timer = maxf(invincible_timer, 0.25)
		aura_absorbed.emit(global_position + Vector2(0.0, -22.0))
		return

	# 举着盾 → 走格挡结算 (见下方决策表)。
	# ⚠️ 「不可格挡」也走这条分支, 由 _resolve_guard 里的第 ⓪ 条直接放行 ——
	#    不在这里另开一条路, 是为了让「举着盾挨了什么」只有**一个**入口。
	if state == State.BLOCKING:
		_resolve_guard(amount, from_position, source, unblockable)
		return

	_apply_damage(amount, from_position)


## 格挡状态下的受击结算 —— **本轮决策表 (A) 的唯一落点**。
##
##   | 来自 | 精准窗口内 | 精力够 | 结果
##   |------|-----------|--------|------------------------------------------
##   | 不可格挡 | 无所谓 | 无所谓 | **照常掉血** (但闪避/跳跃躲得开)
##   | 正面 | 是        | 不计   | 精准格挡: 零伤零耗 + 攻击者长硬直
##   | 正面 | 否        | 是     | 格挡: 零伤, 扣精力
##   | 正面 | 否        | 否     | 破防: 零伤但进 GUARD_BROKEN + 击退
##   | 背后 | 无所谓    | 无所谓 | **照常掉血**
func _resolve_guard(amount: int, from_position: Vector2, source: Node2D, unblockable: bool = false) -> void:
	# ⓪ 不可格挡 —— 排在**背后判定之前**: 紫红预警的招式不管站哪都挡不住。
	#
	# 🎮 这一条是「读招 → 应对 → 代价」里**换答案**的那一步: 格挡是默认解,
	#    紫红出现时必须换成闪避/跳跃/拉开。⚠️ 注意它**不经过**精准格挡, 也不扣格挡精力 ——
	#    举着一个对这个招式无效的盾, 不该让玩家再赔一次精力 (那会读成「挡漏了」,
	#    而真相是「这招本来就挡不住」)。闪避/跳跃/高度带全都照常有效, 因为
	#    它们在这条分支之外 (无敌帧、高度过滤)。
	if unblockable:
		_apply_damage(amount, from_position)
		return

	# ① 背后的攻击挡不住 —— 这是格挡的**核心** (横版里就是前后半平面)。
	#    写成全方位的话玩家永远不会知道自己站错了位置, 只会觉得格挡时灵时不灵。
	if not _is_in_guard_front(from_position):
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
	var away: Vector2 = BeltSpace.dir_to_screen(-facing)
	if from_position.is_finite():
		var d: Vector2 = global_position - from_position
		away = BeltSpace.normalize_world(d) if d.length() > 0.01 else BeltSpace.dir_to_screen(-facing)
	velocity = away * knockback_speed


func _die() -> void:
	state = State.DEAD
	velocity = Vector2.ZERO
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	# 罡气/落地硬直在死亡期间没有意义, 清掉 —— 否则复活后第一帧还挂着
	# 一个「看起来开了但挡不住任何东西」的罩子 (阴影已 hide, 只剩逻辑残留)。
	_landing_timer = 0.0
	_aura_timer = 0.0
	_aura_hits = 0
	_aura_flash_timer = 0.0
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
	# 复活 = 所有技能冷却清零。留在字典里的旧条目会让「重生」带着上一次的亏空,
	# 而且字典只清一半的话更难发现。
	_cooldowns.clear()
	_cast_skill_id = &""
	_cancel_pending_attack()
	_active_shape = null
	_hit_stun_timer = 0.0
	_hit_flash_timer = 0.0
	_charge_timer = 0.0
	_parry_window_timer = 0.0
	_parry_flash_timer = 0.0
	_guard_break_timer = 0.0
	_landing_timer = 0.0
	_aura_timer = 0.0
	_aura_hits = 0
	_aura_flash_timer = 0.0
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
		# 高度带: 跳得够高就躲得开。**判定点必须在这里**, 不能靠 EnemyAttack 自己查 ——
		# 它是被动伤害标记 (monitoring = false), 根本不检测任何东西;
		# 而物理体活在 2D 平面里, 也表达不了离地高度。
		# 这和 AttackHitbox._try_hit 完全对称: 「谁受伤, 谁拿自己的实际高度去问 shape」。
		# ⚠️ 必须早于 take_damage —— 否则跳过去照样会触发格挡/精准格挡/无敌帧消耗。
		if atk.attack_shape != null and not atk.attack_shape.hits_height(height):
			return
		# ⚠️ 不可格挡要一路传到 _resolve_guard —— 判定区背着「这一招是什么」,
		#    受击方自己不去猜 (和 damage/source 同一条契约)。
		take_damage(atk.damage, atk.global_position, atk.source, atk.unblockable)


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


## 身体的世界半径 —— BodySeparation 的契约 (见 body_separation.gd)。
func body_radius() -> float:
	return BODY_RADIUS


## 能不能被别的角色推开。死亡时不参与 —— 尸体被敌人顶着走很怪,
## 而且复活是**瞬移**的, 那一下会把敌人一起拽过去。
func is_separable() -> bool:
	return state != State.DEAD


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
const AURA_COLOR: Color = Color(0.55, 0.92, 1.0)       ## 护体罡气 (青白)
## 落地硬直期间身体在 Y 方向压扁的最大比例 (0.07 = 压掉 7%, 读「蹲了一下」)
const LANDING_SQUASH: float = 0.07

## 骨架实例。复用同一个 (每帧 new 一个 RefCounted 也能跑, 只是没必要)。
var _rig: PlayerRig = PlayerRig.new()


# ============================================================
# 动画状态 —— **将来接美术资源的接口**
# ============================================================
#
# 🏗️ 这两个函数是 v0.8 唯一新增的「对外契约」:
#    anim_state() 说出「现在该播哪一段」, anim_phase() 说出「播到几成」。
#    绘制层拿这两个值去摆骨架; 将来换成美术资源, 它们直接变成
#    SpriteFrames 的动画名和帧进度 —— **调用方一行都不用改**。
#
# ⚠️ 相位一律从**判定那套计时器**算, 不另开时钟。一旦这里有第二个时钟,
#    动画和判定就会各自漂移, 表现是「刀早就收回来了, 伤害却还没结算」,
#    而且只在某些帧率下出现。

## 现在该播哪一段。优先级 = 下面的判断顺序 (**先写的赢**)。
func anim_state() -> int:
	# 状态机独占的那几个: 它们本身就是「这个人在做什么」的唯一答案
	match state:
		State.DASHING:
			return PlayerRig.Anim.DASH
		State.HIT:
			return PlayerRig.Anim.HIT
		State.GUARD_BROKEN:
			return PlayerRig.Anim.GUARD_BROKEN
		State.BLOCKING:
			return PlayerRig.Anim.BLOCK
		State.CHARGING:
			return PlayerRig.Anim.HEAVY_CHARGE
		State.ATTACKING:
			match _attack_kind:
				AttackKind.HEAVY:
					return PlayerRig.Anim.HEAVY_SWING
				AttackKind.SKILL:
					return _cast_anim()
				_:
					return PlayerRig.Anim.LIGHT

	# ⚠️ 剑阵这类 PLACE 必须排在这里 —— 它们**不进 ATTACKING** (只锁进攻, 不锁走位),
	#    所以没法在上面那个 match 里认出来, 只能靠 _cast_lock_timer 兜底。
	#    它也要排在跑/跳之前: 一边走一边施法时, 该看到的是施法姿态。
	if _cast_lock_timer > 0.0:
		return _cast_anim()
	if not _grounded:
		return PlayerRig.Anim.JUMP_RISE if _height_vel > 0.0 else PlayerRig.Anim.JUMP_FALL
	# 落地硬直排在跑之前: 刚落地时速度往往还在, 但玩家该看到的是「他蹲了一下」,
	# 不是「他立刻开始跑」—— 后者会让落地硬直这件事**看不见**, 读起来像没有代价。
	if _landing_timer > 0.0:
		return PlayerRig.Anim.LAND
	# ⚠️ 用**世界**速度而不是 velocity.length(): 纵深走同样的距离, 屏幕位移只有一半,
	#    用屏幕速度判「在不在跑」的话, 纵向走位会慢半拍才切到跑动。
	if BeltSpace.screen_speed_to_world(velocity) > 12.0:
		return PlayerRig.Anim.RUN
	return PlayerRig.Anim.IDLE


## 当前正在放的技能该用哪个姿势 —— **只查 SkillDef, 不认技能名**。
## 加第四个技能时这里不用改: 姿势写在表里, 状态机只负责把它念出来。
func _cast_anim() -> int:
	if _cast_skill_id == &"":
		return PlayerRig.Anim.IDLE
	var d: SkillDef = SkillBook.get_def(_cast_skill_id)
	return d.cast_anim if d != null else PlayerRig.Anim.IDLE


## 当前动作播到几成 (0~1)。循环动作 (IDLE/RUN) 是循环进度, 一次性动作是招式进度。
func anim_phase() -> float:
	# 一次性进度一律从**判定那套计时器**算, 但用哪个计时器由「谁锁着这个动作」决定,
	# 不看动画名 —— 否则新技能换个姿势就会掉进「相位恒为 0」的静默失败。
	if state == State.ATTACKING:
		return 1.0 - clampf(_attack_timer / maxf(0.001, _attack_total), 0.0, 1.0)
	if _cast_lock_timer > 0.0:
		var def: SkillDef = SkillBook.get_def(_cast_skill_id)
		var rec: float = def.recovery if def != null else _cast_lock_timer
		return 1.0 - clampf(_cast_lock_timer / maxf(0.001, rec), 0.0, 1.0)
	match anim_state():
		PlayerRig.Anim.RUN:
			# _walk_phase 是累加的弧度, 转成 0~1 的循环进度
			return fposmod(_walk_phase / TAU, 1.0)
		PlayerRig.Anim.IDLE, PlayerRig.Anim.BLOCK, PlayerRig.Anim.GUARD_BROKEN:
			return fposmod(_anim_clock * 0.9, 1.0)
		PlayerRig.Anim.HEAVY_CHARGE:
			return charge_ratio()
		PlayerRig.Anim.LAND:
			return 1.0 - clampf(_landing_timer / maxf(0.001, landing_lag_time), 0.0, 1.0)
		PlayerRig.Anim.HIT:
			return 1.0 - clampf(_hit_stun_timer / maxf(0.001, hit_stun_duration), 0.0, 1.0)
	return 0.0


## facing → 骨架视角。上下两个方向靠「把 x 压扁」表达前后摆动, 见 PlayerRig 文件头。
func _rig_view() -> int:
	if facing.y > 0.5:
		return PlayerRig.View.BACK
	if facing.y < -0.5:
		return PlayerRig.View.FRONT
	return PlayerRig.View.SIDE


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
	# 🏗️ 用 draw_set_transform 整体变换, 而不是给每个 _draw_xxx 传 offset 参数:
	#    抬高/压扁都是**全局属性**, 传参的写法每新增一个 _draw_xxx 就要记得传一次,
	#    漏一个就是「跳跃时刀留在原地」—— 看起来像刀脱手飞了, 而且只在跳跃时出现。
	#    整体变换一次, 这类漏传在结构上不可能发生。
	#
	# 落地硬直: 身体压扁一点点, 然后弹回。
	# 🏗️ 用**压扁 (scale.y)** 而不是整体下移 —— 变换以脚底原点为中心缩放,
	#    所以脚仍在原地、只有上半身沉下去, 读起来是「蹲了一下」而不是「陷进地里」。
	# ⚠️ 影子不参与这一层, 它是「脚在哪」唯一的锚点。
	var squash: float = 1.0
	if _landing_timer > 0.0:
		squash = 1.0 - LANDING_SQUASH * (_landing_timer / maxf(0.001, landing_lag_time))

	# 🔑 骨架:**先**按状态摆姿态, **再**解算。之后画的全是解出来的关节点。
	var view: int = _rig_view()
	_rig.reset()
	_rig.apply(anim_state(), anim_phase())
	_rig.solve(view)

	# 🏗️ x 方向乘 f = 镜像。骨架永远只产出一套「朝右」的坐标, 朝左在这里整体翻过来。
	#    老代码是在每个绘制函数里把方向向量的 x 逐个乘 f —— 漏一处就是「朝左时刀往
	#    身后挥」, 而画面上只是「方向有点怪」, 不报错。整体镜像让这类漏乘不可能发生。
	var f: float = _side_facing()
	draw_set_transform(Vector2(0.0, -height), 0.0, Vector2(f, squash))

	var flash: bool = _hit_flash_timer > 0.0
	var body_color: Color = ROBE_TOP
	if state == State.GUARD_BROKEN:
		body_color = GUARD_BREAK_COLOR
	elif state == State.CHARGING:
		# 蓄力时袍色往冷光偏 —— 和地面的金色蓄力环形成对比, 更醒目
		body_color = ROBE_TOP.lerp(CHARGE_COLOR, 0.25 * charge_ratio())

	if state == State.DASHING:
		_draw_rig(Color(0.35, 0.95, 1.0), flash, view)
	else:
		# ⚠️ 背/正面时刀画在**身体之前** (被身体挡住) —— 真人从背后看,
		#    握着刀的手和刀都在身前, 该被自己挡住。侧视则相反, 刀必须压在身上,
		#    否则玩家最需要看清的那只手会消失。
		if view != PlayerRig.View.SIDE:
			_draw_sword()
		_draw_rig(Color.WHITE if flash else body_color, flash, view)
		if view == PlayerRig.View.SIDE:
			_draw_sword()
		if state == State.BLOCKING:
			_draw_shield()
	if state == State.CHARGING:
		_draw_charge_head_ring()
	if _aura_timer > 0.0:
		_draw_aura_bubble()
	if _aura_flash_timer > 0.0:
		_draw_aura_flash()
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
			var edge_n: int = int(pts.size() / 2.0)   # 前半段 = 外缘
			for i: int in range(edge_n):
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
	# 260 这个分母不是随手取的: 满跳高度 = jump_speed² / (2×gravity)
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


## 把骨架画成一个人。
##
## 🏗️ 绘制顺序**就是**遮挡关系, 顺序错了不会报错, 只会让某些肢体莫名其妙消失:
##      侧视:   远臂 → 远腿 → 近腿 → 袍身 → 头 → 近臂 → (刀)
##      背/正面: 远腿 → 近腿 → 袍身 → **远臂** → 头 → 近臂 → (刀)
##    两条腿都压在袍子**底下** —— 这是道袍不是开衩裙, 跑动时该看到的是
##    「小腿从下摆里伸出来」, 而不是「两条光腿贴在袍子上」。
##
## ⚠️ 近臂必须最后画 (刀除外)。它是持剑手, 玩家判断「刀在哪、往哪挥」全靠它;
##    被自己的袍子挡住的话, 挥砍方向就读不出来了 —— 而那是侧视里唯一的攻击预告。
##
## ⚠️ 背/正面时**远臂也要提到袍子之后**。侧视里远臂在身体后面, 该被袍子盖住;
##    但正面/背面看, 两只手臂都在身体两侧、比躯干更靠近镜头 —— 照侧视的顺序画,
##    远臂会整条消失, 只剩一只「独臂人」。
func _draw_rig(body: Color, flash: bool, view: int) -> void:
	# 远侧整体压暗: 两条腿重叠时, 这是唯一能读出「另一条在后面」的线索
	var far_c: Color = Color(0.12, 0.17, 0.32)
	var near_c: Color = Color(0.19, 0.26, 0.45)
	var far_boot: Color = Color(0.22, 0.14, 0.11)
	var near_boot: Color = Color(0.33, 0.21, 0.15)
	# ⚠️ 近侧袖子必须**比袍身暗一点点**, 不能更亮。更亮的袖子和袍子同色系,
	#    叠在一起就是一大片浅蓝, 读起来不是「一条手臂在身前」而是「胸前有块亮斑」。
	var sleeve_far: Color = body.darkened(0.35)
	var sleeve_near: Color = body.darkened(0.18)
	var skin: Color = SKIN
	var hair: Color = HAIR
	if flash:
		far_c = Color(0.62, 0.62, 0.68)
		near_c = Color(0.80, 0.80, 0.86)
		far_boot = Color(0.70, 0.70, 0.74)
		near_boot = Color(0.88, 0.88, 0.92)
		sleeve_far = Color(0.74, 0.74, 0.80)
		sleeve_near = Color.WHITE
		skin = Color.WHITE
		hair = Color(0.80, 0.80, 0.86)

	if view == PlayerRig.View.SIDE:
		_draw_arm(_rig.shoulder_far, _rig.elbow_far, _rig.hand_far, sleeve_far, skin.darkened(0.10))
		_draw_leg(_rig.hip_far, _rig.knee_far, _rig.ankle_far, far_c, far_boot, view)
		_draw_leg(_rig.hip_near, _rig.knee_near, _rig.ankle_near, near_c, near_boot, view)
		_draw_robe(body, flash)
		_draw_head(view, skin, hair)
		_draw_arm(_rig.shoulder_near, _rig.elbow_near, _rig.hand_near, sleeve_near, skin)
	else:
		_draw_leg(_rig.hip_far, _rig.knee_far, _rig.ankle_far, far_c, far_boot, view)
		_draw_leg(_rig.hip_near, _rig.knee_near, _rig.ankle_near, near_c, near_boot, view)
		_draw_robe(body, flash)
		_draw_arm(_rig.shoulder_far, _rig.elbow_far, _rig.hand_far, sleeve_far, skin.darkened(0.10))
		_draw_head(view, skin, hair)
		_draw_arm(_rig.shoulder_near, _rig.elbow_near, _rig.hand_near, sleeve_near, skin)


## 一截**有粗细变化**的肢体: 四点梯形 + 两端的关节圆。
##
## 🏗️ 不用 draw_line: 它的粗细是恒定的, 大腿和小腿一样粗, 画出来是一根棒子。
##    从关节往末端收窄, 才是「这是肢体」而不是「这是棍子」。
##    两端的圆负责补掉折角处的缺口 (膝/肘), 少了它们关节处会露出一个三角缝隙。
func _segment(a: Vector2, b: Vector2, w0: float, w1: float, c: Color) -> void:
	var d: Vector2 = b - a
	var l: float = d.length()
	if l < 0.01:
		return
	var n: Vector2 = Vector2(-d.y, d.x) / l
	draw_colored_polygon(PackedVector2Array([
		a + n * w0 * 0.5, b + n * w1 * 0.5, b - n * w1 * 0.5, a - n * w0 * 0.5,
	]), c)
	draw_circle(a, w0 * 0.5, c)
	draw_circle(b, w1 * 0.5, c)


## 一条手臂: 上臂 → 前臂 → 手。袖口比小臂粗 (道袍宽袖), 也让两条手臂在剪影上分得开。
func _draw_arm(shoulder: Vector2, elbow: Vector2, hand: Vector2, sleeve: Color, skin: Color) -> void:
	_segment(shoulder, elbow, 4.6, 3.4, sleeve)
	_segment(elbow, hand, 3.4, 2.4, sleeve)
	draw_circle(hand, 2.6, skin)


## 一条腿: 大腿 → 小腿 → 脚掌。
##
## ⚠️ 脚掌画成**水平**的矩形, 不跟着小腿转。跟着转的话, 抬腿时脚会竖起来,
##    读起来像「踮着脚尖在跳芭蕾」; 水平脚 + 脚踝离地, 已经是清楚的「抬腿」信号了。
func _draw_leg(hip: Vector2, knee: Vector2, ankle: Vector2, c: Color, boot: Color, view: int) -> void:
	_segment(hip, knee, 5.2, 4.2, c)
	_segment(knee, ankle, 4.2, 3.0, c)
	# 靴子单独一个颜色: 深蓝的腿和深蓝的袍摆挨在一起时, 脚会「消失」在袍子里
	if view == PlayerRig.View.SIDE:
		# 侧视: 脚掌朝前伸 (脚在鞋里是横着放的)
		draw_rect(Rect2(ankle.x - 1.8, ankle.y, PlayerRig.FOOT_LEN + 2.0, PlayerRig.FOOT_H), boot, true)
	else:
		# 背/正面: 看到的是**脚背**, 不朝前伸 —— 照侧视画会变成两只横向的铲子
		draw_rect(Rect2(ankle.x - 2.8, ankle.y, 5.6, PlayerRig.FOOT_H), boot, true)


## 道袍 —— 从胸口到袍摆的一个**跟着脊椎一起弯**的梯形。
##
## 🏗️ 袍身必须由骨架的 chest/pelvis 推出来, 不能写死 (-40 → -12)。
##    写死的话, 躯干一前倾袍子就留在原地, 人看起来像「从袍子里钻出来了」。
##    (老版本的腰带就写死在 y=-33, 蓄力后仰时它会在身体外面飘。)
func _draw_robe(body: Color, flash: bool) -> void:
	var up: Vector2 = PlayerRig.dir_of(_rig.spine)
	var side: Vector2 = Vector2(-up.y, up.x)
	# ⚠️ 肩宽必须 ≥ 头半径。第一版肩 6 / 头 7.6, 画出来是「一颗头架在一根棍上」。
	var shoulder_w: float = PlayerRig.HEAD_R + 0.5
	# ⚠️ 袍摆高度 = 腿可不可见的**唯一旋钮**。腰在 -30、膝在 -17.5,
	#    摆停到 -19.5 时膝以下整段露在外面 —— 那正是跑步全部的可读信息。
	#    第一版停在 -16, 画面上角色就是「一块倒扣的布」, 腿一动都看不见。
	var hem_w: float = 9.0
	var hem_y: float = _rig.pelvis.y + 10.5

	draw_colored_polygon(PackedVector2Array([
		_rig.chest + side * shoulder_w,
		_rig.chest - side * shoulder_w,
		Vector2(_rig.pelvis.x - hem_w, hem_y),
		Vector2(_rig.pelvis.x + hem_w, hem_y),
	]), body)

	# 下摆压暗 + 腰带: 少了这两笔, 袍子就是一整片纯色梯形, 读不出体积
	if flash:
		return
	var waist: Vector2 = _rig.pelvis.lerp(_rig.chest, 0.42)
	draw_colored_polygon(PackedVector2Array([
		waist + side * (hem_w - 1.0),
		waist - side * (hem_w - 1.0),
		Vector2(_rig.pelvis.x - hem_w, hem_y),
		Vector2(_rig.pelvis.x + hem_w, hem_y),
	]), Color(ROBE_BOTTOM.r, ROBE_BOTTOM.g, ROBE_BOTTOM.b, 0.88))
	draw_line(waist + side * 7.6, waist - side * 7.6, SASH, 3.0)


## 头 + **四向的三套画法** —— 这是玩家读出「我面朝哪」的第一信号。
##
## ⚠️ 这里的坐标全部**朝右** (+x = 正前方), 一个 f 都不该出现。
##    朝左由外层 draw_set_transform 的 x 镜像统一处理 —— 这里再乘一次 f
##    就是双重镜像, 表现是「朝左时脸朝后」, 而且只在朝左时错。
##
## ⚠️ 面朝上 (走向纵深) 必须是**后脑**: 整颗头被头发盖住、没有五官。
##    偷懒沿用侧脸的话, 纵向走位就会变成「侧着身子滑冰」——
##    那正是切到横版要解决的原始问题。
func _draw_head(view: int, skin: Color, hair: Color) -> void:
	var h: Vector2 = _rig.head_pt
	var r: float = PlayerRig.HEAD_R

	draw_circle(h, r, skin)

	if view == PlayerRig.View.BACK:
		# 背面: 头发盖满 + 发髻
		draw_circle(h + Vector2(0.0, -0.5), r * 0.97, hair)
		draw_circle(h + Vector2(0.0, -r * 0.94), 3.2, hair)
		return

	if view == PlayerRig.View.FRONT:
		# 正面: 刘海压在上半张脸, 两只眼。
		# ⚠️ 刘海半径和眼睛高度是一对: 第一版眼睛被刘海吞掉半颗, 画面上就是
		#    「正面那张脸没有五官」, 和背面的区别只剩「头发少盖了一点」。
		draw_circle(h + Vector2(0.0, -r * 0.62), r * 0.74, hair)
		draw_circle(h + Vector2(-3.0, 2.6), 1.4, hair)
		draw_circle(h + Vector2(3.0, 2.6), 1.4, hair)
		return

	# 侧视: 头发盖住后脑 + 头顶, 发髻拖在更后面。这是「他面朝哪」最主要的信号。
	# ⚠️ 后偏量和发半径是一对: 第一版算出脸只剩 3px 可见, 头就是一颗纯黑的球。
	draw_circle(h + Vector2(-r * 0.59, -r * 0.44), r * 0.97, hair)
	draw_circle(h + Vector2(-r * 0.94, -r * 0.62), 3.2, hair)

	# 五官: 一只眼 + 一个鼻尖。鼻尖是让「侧视」不像「正面一个圆」的关键一笔
	draw_circle(h + Vector2(r * 0.50, -r * 0.07), 1.5, hair)
	draw_colored_polygon(PackedVector2Array([
		h + Vector2(r * 0.96, -r * 0.15),
		h + Vector2(r * 1.47, r * 0.24),
		h + Vector2(r * 0.96, r * 0.38),
	]), skin.darkened(0.12))


## 手里的刀 —— 绑在**持剑手的手心**上, 由骨架解出来, 不再自己算枢轴。
##
## 🏗️ 这一笔是整个 v0.8 的核心。老版本的枢轴写死在 (f*5, -32): 手臂没有关节,
##    所以刀永远是「从肩膀附近伸出来的一根棍」, 手从来没有真的握住过它。
##    现在 grip = hand_near, 刀跟着手走 —— 于是「举刀 / 挥刀 / 插地」这些动作,
##    身体一动刀就跟着动, 不可能漂移。
##
## 🏗️ 两招的肢体语言仍然**故意分开**, 因为它们的判定形状本来就不同:
##   · **横劈 (轻击, 扇形)** —— 轨迹偏水平, 地面上拖出一道扇环 (见 _draw_attack_ground)。
##     「一片都被扫到了」靠扇环说, 不靠刀本身 —— 侧视里一把刀画不出「面」。
##   · **重劈 (重击, 矩形)** —— 竖直的大劈砍, 从身后上方砸到身前下方, 刀更长。
func _draw_sword() -> void:
	var d: Vector2 = PlayerRig.dir_of(_rig.sword_angle)
	var tip: Vector2 = _rig.tip

	# 出刀时的残留刀光: 沿刚扫过的方向往回拖三条渐隐的弧。
	# ⚠️ 只画**三招里会挥的那两招**; 施法/站立时刀不动, 拖尾会变成一团固定的白雾。
	if state == State.ATTACKING and _attack_kind != AttackKind.SKILL:
		for i: int in range(3):
			var a: float = _rig.sword_angle - float(i + 1) * 0.20
			draw_line(_rig.grip, _rig.grip + PlayerRig.dir_of(a) * _rig.sword_len,
				Color(1.0, 1.0, 1.0, 0.42 - float(i) * 0.12), 3.0)

	# 刀身 + 护手 + 刀柄。蓄满时刀身发金光 —— 「可以破霸体了」的第二个提示
	var blade_color: Color = BLADE
	if state == State.CHARGING and charge_ratio() >= heavy_armor_break_ratio:
		blade_color = CHARGE_READY_COLOR
	var n: Vector2 = Vector2(-d.y, d.x)
	draw_line(_rig.grip, tip, blade_color, 3.0)
	draw_line(_rig.grip + n * 3.2, _rig.grip - n * 3.2, Color(0.55, 0.45, 0.30), 2.0)
	draw_line(_rig.grip, _rig.grip - d * 4.5, Color(0.25, 0.18, 0.12), 2.8)


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
	var parry_ready: bool = is_parry_window_open()
	var c: Color = PARRY_READY_COLOR if parry_ready else SHIELD_COLOR

	# 四向之后盾牌有三态 (占位美术的读法, 真 sprite 接进来时按 facing 选帧):
	#   朝下 (正面) → 盾正对镜头, 画成一个挡在身前的椭圆
	#   朝上 (背面) → 盾在身前、被身体挡住 → 不画
	#   左右       → 原来的竖弧
	if facing.y < -0.5:
		draw_arc(Vector2(0.0, -30.0), 15.0, 0.0, TAU, 24, c, 3.2 if parry_ready else 2.4)
		draw_circle(Vector2(0.0, -30.0), 15.0, Color(c.r, c.g, c.b, 0.14))
		return
	if facing.y > 0.5:
		return

	# 身前一道竖弧: 从头顶高度挡到膝盖高度。中间鼓出去一点, 像一面盾。
	# ⚠️ 坐标一律取**正 x** (身前那侧)。朝左时由外层的 x 镜像翻过去 ——
	#    这里再乘一次 f 就是双重镜像, 盾会跑到背后, 而那不是报错。
	var arc: PackedVector2Array = PackedVector2Array()
	var steps: int = 12
	for i: int in range(steps + 1):
		var t: float = float(i) / float(steps)
		var y: float = lerpf(-46.0, -10.0, t)
		var bulge: float = sin(t * PI) * 4.0
		arc.append(Vector2(18.0 + bulge, y))
	draw_polyline(arc, c, 3.2 if parry_ready else 2.4)

	# 内侧淡填充: 补一圈回到身体, 表达「这是一面挡在身前的盾」
	var fan: PackedVector2Array = arc.duplicate()
	fan.append(Vector2(6.0, -30.0))
	draw_colored_polygon(fan, Color(c.r, c.g, c.b, 0.16))


## 护体罡气罩 —— 罩着整个人身的一层椭圆。
##
## 🏗️ 画成**竖椭圆**而不是地面上的压扁圆: 罡气是「包住人」的, 压扁会读成又一层地面预警圈,
##    和敌人的 telegraph 撞车。竖椭圆才能一眼读出「我在壳里」。
## ⚠️ 快到期时开始闪 —— 不闪的话, 玩家会把「罩子没了」读成「开了但没生效」,
##    而罡气恰恰是**只挡一次**的技能, 失效时机必须看得见。
func _draw_aura_bubble() -> void:
	if _aura_timer < 0.4 and fmod(_aura_timer * 16.0, 2.0) >= 1.0:
		return
	var left_k: float = clampf(_aura_timer / 0.4, 0.0, 1.0)
	var pulse: float = 1.0 + 0.05 * sin(_aura_timer * 16.0)
	var center: Vector2 = Vector2(0.0, -26.0)
	var rx: float = 22.0 * pulse
	var ry: float = 36.0 * pulse
	var steps: int = 28
	var pts: PackedVector2Array = PackedVector2Array()
	for i: int in range(steps):
		var a: float = TAU * float(i) / float(steps)
		pts.append(center + Vector2(cos(a) * rx, sin(a) * ry))
	var alpha: float = 0.30 * (0.55 + 0.45 * left_k)
	draw_colored_polygon(pts, Color(AURA_COLOR.r, AURA_COLOR.g, AURA_COLOR.b, alpha * 0.35))
	pts.append(pts[0])
	draw_polyline(pts, Color(AURA_COLOR.r, AURA_COLOR.g, AURA_COLOR.b, alpha + 0.25), 2.2, true)


## 罡气吃掉一次伤害时的爆散 —— 读作「壳碎了, 那一下被它挡了」
func _draw_aura_flash() -> void:
	var r: float = 1.0 - clampf(_aura_flash_timer / 0.25, 0.0, 1.0)
	draw_arc(Vector2(0.0, -26.0), lerpf(20.0, 56.0, r), 0.0, TAU, 30,
		Color(AURA_COLOR.r, AURA_COLOR.g, AURA_COLOR.b, (1.0 - r) * 0.9), 3.0)


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
	var d: Vector2 = velocity.normalized() if velocity.length() > 1.0 else BeltSpace.dir_to_screen(facing).normalized()
	for i: int in range(3):
		var at: Vector2 = -d * float(i + 1) * 11.0
		var a: float = 0.30 - float(i) * 0.09
		draw_circle(at + Vector2(0.0, -20.0), 12.0 - float(i) * 2.5, Color(0.35, 0.85, 1.0, a))
