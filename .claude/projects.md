# 项目技术栈

## Godot 学习内容进度

> 文档路径: `apps/learning/src/views/GameProduction/GotDot/`
> 样式规范: go-doc-style skill（Godot 用 blue 主色调，TS+Python 双类比，强类型 GDScript）

| 阶段 | 状态 | 篇数 | 备注 |
|------|------|------|------|
| 阶段0: 引擎概览 | ✅ 完成 | 8/8 | 已补全 debug/project-settings |
| 阶段1: GDScript | ✅ 完成 | 14/14 | signals 已关联 Blitz |
| 阶段2: Node系统 | ✅ 完成 | 12/12 | collision2d 已关联 Blitz |
| 阶段3: UI系统 | 🚧 进行中 | 3/12 | button-family ✅, 其余待写 |
| 阶段4: 场景管理 | 🚧 进行中 | 2/10 | scene-instantiation ✅, 其余待写 |
| 阶段5: 输入+动画 | 🚧 进行中 | 3/10 | input-handling/tween ✅ |
| 阶段6: 物理 | 🚧 进行中 | 5/8 | area2d/collision-layers/charbody/platformer ✅ |
| 阶段7: GDScript进阶 | 🚧 进行中 | 3/12 | state-machines/timers ✅ |
| 阶段8: 编辑器工具 | ⏳ 待写 | 0/8 | — |
| 阶段9: 实战项目 | ⏳ 待写 | 0/5 | — |

> 已完成: 50篇 | 总计: 96+篇 | 进度: ~52% (本轮 +19 篇)

### 已扩展的核心文档（含实战案例）

- `godot-1-8-signals-basics.vue` — 健康系统+信号总线+Callable传递+常见错误
- `godot-1-6-functions.vue` — Callable深入+static+lambda陷阱+回调实战
- `godot-2-6-characterbody2d.vue` — 完整平台脚本(coyote time+jump buffer)+move_and_slide原理+FAQ

### Godot Demo 文件（可运行的实战练习）

> 路径: `apps/game/demos/`
> 用法: 打开 `demo_runner.tscn` → 附加对应 demo .gd → F6 → Output 面板看结果
> 原则: 一个文件只讲一个概念，20-50行，注释标注 TS/Python 对应写法

| 阶段 | Demo 文件 | 对应文档 | 状态 |
|------|----------|---------|------|
| 1-GDScript | demo_variables_types.gd | godot-1-2 | ✅ |
| 1-GDScript | demo_arrays_dicts.gd | godot-1-4 | ✅ |
| 1-GDScript | demo_signals.gd | godot-1-8 | ✅ |
| 2-Nodes | demo_lifecycle.gd | godot-2-1 | ✅ |
| 1-GDScript | demo_operators.gd ~ demo_setget.gd | godot-1-3~1-13 | ⏳ 待写 |

## 🎮 Blitz — 2D Run & Gun Platformer (进行中)

> 项目路径: `apps/game/blitz/`
> 设计文档: `apps/game/blitz/DESIGN.md`
> 用 Godot 4.6 打开 `apps/game/blitz/project.godot`

**定位**: 边做游戏边学 Godot 的实战项目。2D 横版跳跃躲避射击，灵感来自茶杯头 (Cuphead)。

**当前核心系统** (v0.1):
- CharacterBody2D 玩家: 移动/跳跃/冲刺/射击/格挡, 4 状态机
- 敌人 AI: 巡逻/固定/追踪 3 种行为
- Area2D 碰撞: 6 bit 碰撞层系统 (玩家/敌人/子弹/墙壁/格挡/终点)
- UI: 生命值/分数/冲刺冷却/死亡面板 (YOU DIED 卡片 + RESTART 按钮)
- 全部视觉用 `_draw()` 程序化绘制, 零外部素材

**学习文档关联**:
- 每个 .gd 脚本顶部标注了对应的学习文档 (godot-X-Y-xxx)
- 每个 .vue 学习文档底部有 "实战参考: blitz" 章节指向具体代码
- 先读文档理解概念 → 打开 Godot 看节点/改参数/F5 → 再读下一个文档

**文档更新进度** (与 Blitz 相关的):
| 文档 | 状态 | 内容 |
|------|------|------|
| godot-0-7-debugging-basics | ✅ 本轮新增 | print() 三板斧 + Blitz 调试技巧 |
| godot-0-8-project-settings | ✅ 本轮新增 | project.godot 配置 + Blitz 配置解析 |
| godot-1-8-signals-basics | ✅ 本轮更新 | +Blitz 4种内置信号实战 |
| godot-2-5-collision2d | ✅ 本轮更新 | +Blitz 各节点碰撞形状一览 |
| godot-3-5-button-family | ✅ 本轮新增 | StyleBoxFlat + RESTART 按钮完整代码 |
| godot-4-2-scene-instantiation | ✅ 本轮新增 | instantiate 三步 + Blitz 三种模式 |
| godot-5-2-input-handling | ✅ 已更新 | InputMap 代码注册 + Blitz 输入系统 |
| godot-5-8-tween | ✅ 本轮新增 | create_tween + Blitz 分数弹出动画 |
| godot-6-2-area2d-deep | ✅ 本轮新增 | bullet/hitbox/hurtbox/parry 四种用法 |
| godot-6-4-collision-layers | ✅ 本轮新增 | Blitz 6-bit 层级表 + 交互矩阵 |
| godot-6-5-characterbody-deep | ✅ 本轮新增 | velocity 模式 + move_and_slide 后状态查询 |
| godot-6-6-platformer-physics | ✅ 本轮新增 | coyote/jump buffer/可变高度 三件套 |
| godot-7-5-timers-delays | ✅ 本轮新增 | SceneTreeTimer + Blitz 超时/特效用法 |
| godot-7-8-state-machines | ✅ 本轮新增 | enum+match 四状态 + Blitz 转换图 |
| godot-0-5-first-project | ✅ 已更新 | 加入 Blitz 实战延伸章节 |
| godot-2-6-characterbody2d | ✅ 已更新 | 加入 player.gd 代码参考 |

## apps/learning

### Dependencies (package.json)
- vue: 3.6.0-alpha.1
- vue-router: 4.5.0
- pinia: 3.0.1
- @vue/compiler-sfc: 3.5.25
- codemirror: 6.0.2
- prismjs: 1.29.0
- less: 4.4.2
- magic-string: 0.30.21
- utils: workspace:^

### DevDependencies
- @vitejs/plugin-vue: beta
- @vitejs/plugin-vue-jsx: beta
- typescript
- vue-tsc
- vite
- eslint / prettier
- vitest

## apps/main

### Dependencies (项目特有)
- gsap: ^3.13.0

### DevDependencies (项目特有)
- @tailwindcss/postcss: ^4.2.1
- tailwindcss: ^4.2.1
- postcss / autoprefixer

## 根目录 Workspace 共享依赖

### devDependencies
- tailwindcss: ^4.2.1
- @tailwindcss/postcss: ^4.2.1
- postcss: ^8.5.8
- autoprefixer: ^10.4.27
- vite: ^7.2.4
- vite-plugin-solid: ^2.11.8
- typescript: ^5.9.2
