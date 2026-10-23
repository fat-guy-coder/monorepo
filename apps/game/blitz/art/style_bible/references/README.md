# references/ — 风格锚参考图

把**你想要的观感**放在这里，不要放「大概像」的图。建议按下面分类：

| 目录 | 放什么 |
|---|---|
| `characters/` | 主角 / 小兵 / Boss 的服装、剪影、动作参考 |
| `environment/` | 地砖、悬崖、道具、光照、色温 |
| `vfx/` | 刀光、雷、树根的形态和颜色 |
| `ui/` | 血条、图标、字体、面板 |
| `games/` | Dead Cells / DNF / 三国战纪 等成品截图（只做观感参照） |

规则：

- 每张图注明**参考的是哪一点**（配色？剪影？动作节奏？），不要只丢图。
- 参考图不直接进游戏；它只用来定 `palette.gpl` 和 `rules.md`。
- 参考图里如果有版权素材，只做内部对照，不进最终资产。

## AI 锚图（替代手收集）

走 AI 路线时，这 3 张由 AI 生成、再由你挑出来，**就是锚图本身**：

| 文件 | 放哪 | 定什么 |
|---|---|---|
| `anchor_character.png` | `characters/` | 比例、服装、描边、明度 |
| `anchor_environment.png` | `environment/` | 地砖、悬崖、光照、色温 |
| `anchor_ui.png` | `ui/` | 边框、圆角、语义色、字体样张 |

要求：已过 `fix_pixel_art` + 量化到 `palette.gpl` + 1× 检查。
后续所有生成都带这三张（IP-Adapter / img2img / style reference），不要从零 prompt。
流程见 [M0_CHECKLIST.md §0.5](../M0_CHECKLIST.md) 和 [MCP_SETUP.md](../../MCP_SETUP.md)。
