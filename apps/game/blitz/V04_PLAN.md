# Blitz v0.4 — 视角转 2.5D 横版（belt-scroll）· 剩余工作

> **状态：步骤 1–5 已完成并通过双闸门 + 截图探针，步骤 6–7 未开始。**
> 本文件是跨机器/跨会话的**唯一权威计划**（原先的计划文件在某个会话的 `~/.claude/plans/` 里，那份是本机文件，换电脑就没了 —— 所以搬到这里）。

---

## 一、这一轮在干什么

v0.2 把 Blitz 从横版改成等距，v0.3 在等距上把战斗手感做完了。但实测发现等距下**「跟野怪对不上」**：

- `Iso.ground()`（2:1 压扁）**只用在 `_draw()` 里画影子和光圈**，实体位置/速度/判定框全是未投影的屏幕 XY
- 而输入 `Input.get_vector(...)` 直接就是屏幕横竖
- 地面画的菱形，网格的两根轴是屏幕的**斜线**

→ 按 W 走直线向上，脚下地砖却是斜的，**怎么走都跟网格错开半格**。

**目标**：地面轴改成 X（左右）+ Z（纵深），朝向 ±1，加真跳跃（Y 高度），敌人攻击改成**每个招式自带形状的范围判定**并画出预警。

### 用户已拍板的 4 个决策

| 项 | 决策 |
|---|---|
| 视角 | **切 2.5D 横版**（DNF 维度） |
| 大地图探索 | **还没想清楚** —— 先按「城镇 + 房间副本」的房间制做，不锁死 |
| 跳跃 | **要** |
| 攻击判定 | **每个招式自带形状**（矩形/扇形/圆），不是统一矩形带 |

### 用户的原始需求（逐字，仍是验收标准）

> 「范围攻击就是在 x 和在纵深轴画一个范围，可以是圆形(应该是椭圆形更准确)、扇形，矩形。比如横劈动作就是一个扇形，扇形区域内的敌人或者玩家(敌人发起的动作)会受到伤害。可以做一个横批的攻击(敌人也做上)，再给玩家来一个技能，可以在玩家面朝方向一定距离的圆形(视角内椭圆形？)造成伤害，就是闪电从空中落下然后在区域内造成伤害」

> 「敌人的攻击可以是一个横向轴的单独判断，也可以是一个范围工具，就是在它的攻击范围内，离他几根横向轴上都会收到攻击」

---

## 二、坐标模型（整个重构的地基，已实现）

```
世界 = 3 个数:  x (左右)   z (纵深)   height (离地高度)
引擎里存: global_position = Vector2(x, -z * DEPTH_SCALE)    DEPTH_SCALE = 0.5
          height: float 单独一个变量
```

权威实现与推导在 **[scripts/belt_space.gd](scripts/belt_space.gd)**：

| 函数 | 用途 |
|---|---|
| `to_screen(world)` / `to_world(screen)` | 世界 ↔ 屏幕（线性，唯一桥） |
| `ground_circle(r, steps)` | 世界正圆 → 屏幕 2:1 椭圆顶点 |
| `ground_circle_shape(r, steps)` | **碰撞形状**（贴地椭圆）。⚠️ 不能用 `CircleShape2D` |
| `ground_scale()` | 配 `draw_set_transform` 用，让一串地面装饰自动压扁 |

三个白送的好处：Y-sort 一行不用改；重力只作用在 `height`，永远不碰 `position.y`；跳跃是纯加法。

---

## 三、已完成（步骤 1–5）

### 步骤 1–2：地平面 + 侧视角色 + 跳跃 ✅
- `belt_floor.gd`（平铺地面条带）取代菱形 TileSet；`iso_floor.gd` / `iso.gd` **已删**
- `main.gd` 摆放数学改矩形，四面**轴对齐**墙；`camera_rig` 极限来源改 `belt_floor.bounds_global()`
- 玩家：侧视绘制 + `height`/跳跃（重力 1200 / 起跳 -520 / coyote 0.08 / jump buffer 0.08）+ 可变跳跃高度
- `project.godot` 加了 `jump` action（**C 键**）

### 步骤 3：`AttackShape` + 玩家攻击改用它 ✅
- 新增 **[scripts/combat/attack_shape.gd](scripts/combat/attack_shape.gd)** —— `RECT` / `ARC` / `CIRCLE` 三种，`Resource`，纯数据 + 两个方法：
  - `contains_ground(origin_world, facing, point_world)` — 判定
  - `draw_telegraph(canvas, origin, facing, fill, edge)` — 预警
- **核心不变量**：一招 = **一个 `AttackShape` 实例**；预警、`CollisionShape2D` 和自检读的都是它 → 漂移在结构上不可能
- 玩家的横劈 = `ARC(66, ±75°)`，重劈 = `RECT(96 × 纵深 52)`，落雷 = `CIRCLE(46, 偏移 (132, 0))`（`fx/lightning_bolt.gd`）

### 步骤 4：敌人 ✅（本轮刚完成）
- `enemy.gd`：`facing: int ±1`（朝向与移动方向**解耦**）；移动速度改**世界单位**；`attack_shape()` 出招 + 画预警读同一对象
- **`attack_reach` / `attack_trigger_range` 已删** —— 换成「我这一刀够不够得着」直接问 `contains_ground()`
- 敌人的横劈 = `ARC(54, ±60°)`，故意**小于**玩家的 `(66, ±75°)`
- 击退/格挡反冲**故意仍是屏幕单位**（见 `enemy.gd` 文件头）
- 【新】**[scripts/fx/ground_telegraph.gd](scripts/fx/ground_telegraph.gd)** —— 贴地预警图层（绝对 `z_index = -5`）
- 【新】身体框/受击框改**贴地椭圆**（`BeltSpace.ground_circle_shape`）

### 步骤 5：跳跃的战术价值 —— AttackShape 接高度带 ✅（本轮完成）

`AttackShape` 的 `height_min` / `height_max` 字段接进了实际受击链路：

- **敌人横扫 = 低空扇形**：`enemy.gd` 新增 `sweep_height_max = 40`，`attack_shape()`
  返回 `ARC(54, ±60°).band(0.0, 40)`。满跳高度 112.7，起跳后很快越过 40 →
  「看到起手就跳」是一个真操作。
- **判定点在受击方**（物理体表达不了离地高度）：
  - `player.gd _on_hurtbox_area_entered` 用**玩家自己的 `height`** 调
    `attack_shape.hits_height()` —— 这是敌人打玩家这条链路；
  - `AttackHitbox._try_hit` 原本就用 `_body_height(body)`（鸭子类型读 `height`）——
    这是玩家打敌人那条链路，两者现在是对称的。
- **自检新增 3 条**（181 → 184）：横扫确实带低空高度带 · 贴地对照组会挨打 ·
  跳到 `height_max + 20` 躲得开。第三条走完整一招（WINDUP → STRIKE → Hurtbox 重叠），
  不是只断言 `hits_height()` 的纯函数结果。
- 截图探针 17 张全部正常，敌人预警/命中帧的扇形未受影响。

---

## 四、剩余工作（步骤 6–7）

### 步骤 6：格挡改造
- 扇形格挡 → **前后半平面**（只有 X 的符号决定前后；纵深方向一律算正面）
  - 现在 `_is_in_guard_cone` 走的是 `block_cone_cos` + `block_aim_override`，是 v0.3 等距时代的产物
- **删掉鼠标瞄准**：`block_aim_override` 是 `int`（0 = 无覆盖，±1 = 强制朝向），`_check_skill` 里被设成 `-1`
  - 朝向只有左右之后，鼠标瞄准没有存在意义 —— 它是被等距逼出来的补丁
- `debug_overlay.gd` 里对应的可视化跟着改

### 步骤 7：自检重写 + 文档
- `smoke_test.gd`：等距断言（Y-sort / 菱形 / 边界墙 / 坐标桥）已基本重写完；补上面两步的新断言
- **`DESIGN.md` 整份仍是 v0.2 等距版**（标题还写着「等距视角仙侠动作 RPG」）—— 要回填成 v0.4 横版
  - 顺带纠正它自己的两个错误论据：①「2D 横版只有左右+跳，装不下 XY 平面走位」——那是**平台跳跃**版横版，belt-scroll 有 X + Z 两条地面轴；②「真 2.5D 要 4-8 方向资产」——belt-scroll 朝向只分左右，美术 2 张，比等距八向**便宜 4 倍**
- 根 `README.md` 的 Blitz 段落按需微调（现在写「2D 横版像素风」, 方向一致）

---

## 五、两道闸门（每次改完必跑）

```bash
GODOT="D:/Godot/Godot_v4.6.3-stable_win64_console.exe"
P="C:/Users/Administrator/Desktop/monorepo/apps/game/blitz"

# 闸门 1：解析。⚠️ Godot 报错也返回 0 —— grep 才是真闸门, 输出为空才算过
"$GODOT" --headless --path "$P" --editor --quit 2>&1 \
  | grep -nE "SCRIPT ERROR|Parse Error|ERROR|Failed to load|WARNING"

# 闸门 2：自检
"$GODOT" --headless --path "$P" --quit-after 3000 -- --smoke 2>&1 \
  | grep -E "❌|自检结束"
```

**当前（步骤 5 完成后）：闸门 1 空 · 闸门 2 = 184 项检查 0 项失败 · 截图探针 17 张正常。**

### 第三层：截图探针（自检看不见渲染，这层不能省）

```bash
# ⚠️ 不能 --headless（无头没有渲染器）。参数全在 -- 之后。
"$GODOT" --path "$P" -- --shots --zoom=3 --focus=40,-2
# 输出目录: C:/Users/Administrator/AppData/Roaming/Godot/app_userdata/Blitz/shots
```

已经靠这一层逮到过一个**181 条自检全绿**的 bug（见下）。

---

## 六、已知问题 / 刻意的取舍

| 项 | 说明 |
|---|---|
| **玩家身体框仍是屏幕空间** | `player.tscn` 的 `CircleShape2D(12) @ (0,-16)` —— 它**只用于撞墙**，不参与任何伤害判定，且和 `main.gd` 的边界墙是**配套调出来的**（自检实测南北猛冲都恰好停在地界内 2px）。单改一边撞墙会整体偏掉一格。真要改就连 `_create_border_walls` 一起重算 |
| **命中帧闪光画在角色层** | `enemy_attack.gd` 的 `_draw` 故意不贴地：起手预警要看清「我的脚站哪」，命中帧要的是「谁从哪边打的我」。形状同源，衔接看不出接缝 |
| **`attack_hitbox.gd._draw` 是死代码** | 它被 `show_debug_rect = false` 挡着。屏幕上那片玩家攻击范围预览来自 `debug_overlay`（F1），本就该在最上层 —— 那是调试面板，不是游戏内提示 |
| **`godot-2-8-tilemap.vue` 文档过期** | 第 137 / 254 行仍写「Blitz 不用 TileMap」—— v0.2 起就不成立了 |
| **未决** | ① `restart` 是否留在 Enter 键；② `attack_light`/`attack_heavy` 上的鼠标键要不要删；③ HUD 要不要常驻一行「F1 按键」提示 |

---

## 七、踩过的坑（别重复踩）

1. **摆放规则必须统一：`telegraph_points(origin, facing)` 的 `origin` 是「攻击者脚下」**，三种形状都如此（CIRCLE 的 `offset` 已烘焙进多边形）。所有消费者挂在攻击者脚下、只让 `collision_offset(facing)` 决定物理体中心。**两处都偏 = 偏两次**。
2. **靶子的碰撞形状必须活在地面平面上**。曾经玩家受击框是「离地 16px、半径 15 的屏幕正圆」→ 在地面平面里是「圆心 +32、纵深 ±30」的巨椭圆 → **站在扇形外面一格半照样掉血**。反证过：换回旧形状，敌人出招那条「纵深错开太多打不到」立刻翻红。
3. **`ConvexPolygonShape2D` 是弦近似**，永远略小于理想形状 → 固定用 5°/步的弧、48 段圆，测试里有 0.25 单位的容差。
4. **扇形的纵深容差不是常量**：`|Δz| ≤ min(Δx·tan(半角), √(R²−Δx²))`；`Δx = 0` **按设计就打不到**（扇形的方向性），不是 bug。
5. **「注册什么」和「现在开不开」是两个状态**：第一版 `GroundTelegraph` 把两者塞进同一个字段，敌人**第一次收招之后那片扇形永久消失** —— 而 178 条自检全绿（自检断言不了像素）。教训写进了 `ground_telegraph.gd` 的 `enabled` 注释。
6. **`z_index` 先于 y-sort 结算**，且 `z_as_relative` 必须关掉才是绝对层级（开着等于没改，静默）。
7. `%` 格式化**不支持 `%g`**；`Object.is_same()` 不存在（用 `get_instance_id()`）；CJK 字形是双宽。

---

## 八、人工验收（自检证明不了，必须 F5 真开窗口）

1. **横向对得上了吗** —— 按 D 向右走，脚下地砖跟人一起动、不再斜着错开
2. **跳跃读得出来吗** —— 起跳/滞空/落地三阶段，影子有没有留在原地当参照
3. **攻击范围看得见吗** —— 敌人起手时地上那片扇形，是不是一眼就知道该站哪（⚠️ 它必须画在**角色下面**，不能盖住玩家的脚）
4. **纵深容差合适吗** —— 站在敌人上下一点点，该中招吗？会不会太宽容
5. **跳跃躲得开吗** —— 跳起来躲低攻击，是不是个有意义的操作（**步骤 5 已做完，可以验了**；若不合适就调 `enemy.gd` 的 `sweep_height_max`）

---

## 九、不在本轮范围

- 城镇/NPC/多房间切换（决策是「还没想清楚」，本轮只保证房间制**装得下**）
- 远程敌人/投射物（`bullet.gd` 在 git 历史里有）
- 装备/技能/真气（原 v0.4 内容，本轮是视角重构）
- 音效
- 像素美术（继续 `_draw()` 几何占位）

---

## 十、继续指令

对新会话的 AI 说：

> **「继续 Blitz 的 v0.4 开发，读 apps/game/blitz/V04_PLAN.md，从步骤 6（格挡前后半平面 / 删鼠标瞄准）开始」**

⚠️ 先跑一遍第五节的**闸门 1 + 闸门 2**，确认基线是「184 项 0 失败」，再动手。
