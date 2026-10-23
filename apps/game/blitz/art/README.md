# Blitz 美术目录（art/）

> 这是 M0 的骨架，不是最终资产。所有数字以 [SLICE_01_PLAN.md](../SLICE_01_PLAN.md) 和
> [style_bible/rules.md](style_bible/rules.md) 为准。

## 目录

```
art/
├── README.md                 ← 本文件
├── manifest.example.json     ← 动画清单模板（3D / 像素共用）
├── MCP_SETUP.md              ← AI 出图 MCP 接入流程（Retro Diffusion / PixelLab / Comfy）
├── rooms/
│   └── room_01.txt           ← 第一个房间的 ASCII 可行走掩码
└── style_bible/
    ├── M0_CHECKLIST.md       ← 风格锚定执行清单（按它做）
    ├── palette.gpl           ← M0 并集（Aseprite 一次载入用）
    ├── palette_core.gpl      ← 核心色：UI / 角色 / VFX，所有地图共用
    ├── palette_region_01_temple.gpl ← 第一张地图「夜寺」的环境色
    ├── rules.md              ← 机位 / 密度 / 描边 / 光照 / 禁用项
    ├── prompts.md            ← AI 生成提示词模板
    └── references/           ← 参考图（风格锚）
```

> **一致性策略：UI / 角色 / VFX 锁死，地图按区域换色。**
> 换色时守住可读性规则（可走地面比虚空亮、危险红、奖励金、角色明度高于背景），
> 见 [style_bible/rules.md §0](style_bible/rules.md)。

后续会出现的目录（现在不建，等管线跑通再建）：

```
art/3d/              ← .blend 源文件
art/export/          ← 从 Blender 导出的 PNG 序列 / 精灵表（可重新生成）
art/pixel/           ← 手绘 / AI 像素源文件（.aseprite / .pxo）
art/rooms/           ← 更多房间的 ASCII 掩码
```

## 三条硬规矩

1. **导出物永远可重新生成。** 真源是 `.blend` + 渲染脚本，或 `.aseprite` 源文件。
   **不要手改 `art/export/` 里的 PNG** —— 改一版动作就全废了。
2. **一个角色只走一条管线。** 人形角色 / 敌人 / Boss 走 3D 预渲染；
   场景 / 道具 / 特效 / UI 走像素。不要一半 3D 一半手绘。
3. **接触阴影单独做。** 不要烘焙进角色帧；跳起来时影子必须留在地面。

## 房间 ASCII 图例

`rooms/room_01.txt`：

| 字符 | 含义 | 是否可走 |
|---|---|---|
| `#` | 地面 | ✓ |
| `.` | 虚空 / 悬崖外 | ✗ |
| `S` | 玩家出生点 | ✓ |
| `E` | 小兵出生点 | ✓ |
| `B` | Boss 出生点 | ✓ |
| `P` | 道具 / 装饰锚点 | ✓ |

- 一行 = 一个纵深格（屏幕 Y），一列 = 一个 X 格。
- 尺寸 80×18 格 = 5120×576 屏幕像素（约 4 屏宽）。
- **纵深最多 18 格**：再深相机会开始上下滚，横版观感就没了。
- 图里必须有且只有一个 `S`。

## 命名

| 类型 | 规则 | 例子 |
|---|---|---|
| 动作 | `角色_动作`，小写下划线 | `player_slash_horizontal` |
| 帧文件 | `动作_000.png`，三位补零 | `player_slash_horizontal_003.png` |
| 精灵表 | `动作.png` | `player_slash_horizontal.png` |
| 源文件 | 和导出同名 | `player.blend` / `player.aseprite` |
| 房间 | `room_01.txt` | |

## 关联文档

- [SLICE_01_PLAN.md](../SLICE_01_PLAN.md) —— 第一个盒子的范围、流程、资产规格
- [ART_PIPELINE.md](../ART_PIPELINE.md) —— 完整美术生产手册
- [ART_ROUTE_DECISION.md](../ART_ROUTE_DECISION.md) —— 逐帧像素 vs 三渲二的决策依据
- [MCP_SETUP.md](MCP_SETUP.md) —— AI 出图 MCP 的 key 申请、接入命令、试产验收、备选分工
- [DESIGN.md](../DESIGN.md) —— 玩法与视角
