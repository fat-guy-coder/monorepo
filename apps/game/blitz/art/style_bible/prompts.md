# AI 提示词模板（M0 草稿）

> 用途：生成**底图 / 关键姿势 / 场景件**，然后必须在 Aseprite 里手修并量化到 `palette.gpl`。
> AI 不做最终帧，只做起点。

---

## 1. 通用前缀（所有提示词都带）

```
pixel art, side view, orthographic, 2.5D beat-em-up, xianxia dark fantasy,
limited palette of 40 colors, 1px dark outline, upper-left light source,
crisp pixels, no anti-aliasing, no gradients, no blur,
transparent background, centered, full body
```

> ⚠️ **例外：Retro Diffusion 的 style 已经在做像素化，prompt 里不要写 `pixel art`。**
> 用它时把开头那句改成只描述主体（`side view, orthographic, xianxia dark fantasy, ...`）。
> 写了反而会往「像素风插画」跑，网格不可控。见 [MCP_SETUP.md](../MCP_SETUP.md) §1.5。

**负面提示词**：

```
3d render, smooth shading, anti-aliasing, blurry, gradient, soft shadow,
photorealistic, isometric, top-down, perspective, text, watermark,
extra limbs, deformed hands, cropped feet
```

---

## 2. 角色底图

```
{通用前缀}, a wuxia swordsman in dark teal robe with gold trim,
holding a straight sword, idle stance, feet on ground,
{pixel height}px tall, readable silhouette
```

**关键点**：

- 先只生成 **idle 一张**，定死比例、服装、配色。
- 再用同一角色做 `--cref` / 参考图，生成攻击关键姿势。
- 每一帧都要过 Aseprite：修手、修剑、修衣摆、对齐脚底。

---

## 3. 场景 / 地砖

```
{通用前缀}, seamless stone floor tile, 32x32, dark blue-gray stone,
subtle cracks, moss variant, top-down-ish side view, tileable
```

- 先做 **1 块基础砖 + 1 块边缘砖**，拼成 4×4 看接缝。
- 再批量做变体；所有变体量化到同一调色板。
- 边缘 / 拐角砖必须能盖住掩码的阶梯边。

---

## 4. 道具

```
{通用前缀}, ancient stone pillar, 64x64, weathered, jade accents,
bottom-center anchor, transparent background
```

- 锚点在底部中点。
- 一个道具一个文件；不要拼成一张大图。

---

## 5. VFX

```
{通用前缀}, horizontal sword slash arc, cyan-white energy, 4 frames,
transparent background, additive glow, no character
```

- 刀光 / 雷 / 树根都做**独立帧**，不要烘进角色。
- 发光物用加法混合；颜色仍取自调色板。
- 帧数控制在 3~8 帧，多了在 24fps 下看不清。

---

## 6. UI

```
{通用前缀}, game UI bar frame, 9-slice, dark stone with gold trim,
horizontal health bar, 48px tall, no text
```

- 9-slice：四角不拉伸，边和中心拉伸。
- 图标 48×48，背景透明。
- 字体单独找像素字体，不要用 AI 生成文字。

---

## 7. 国内可用工具链（备选）

| 环节 | 工具 |
|---|---|
| 底图 / 风格探索 | LiblibAI、即梦、通义万相 |
| 像素化 / 动画 | Retro Diffusion、PixelLab |
| 手修 / 调色板 | Aseprite（付费）或 Pixelorama（免费） |
| 3D 底模 | 腾讯混元 3D、Tripo |
| 法线 / 光照辅助 | Laigter |

> 工具会变，规则不变：**底图只是起点，最终帧必须手修 + 量化到同一调色板。**

---

## 8. 锁定参数（AI 优先路线）

> 全 AI 生成可以，但必须锁参数；否则第 1 张和第 10 张像两个游戏。

每次生成记录：

| 项 | 例子 |
|---|---|
| 模型 / checkpoint | Retro Diffusion / Flux / SDXL + pixel LoRA |
| LoRA | 像素风 LoRA / 角色 LoRA |
| seed | 固定或记录 |
| sampler / steps / CFG | 记录实际值 |
| 分辨率 | 生成分辨率 + 目标 1× 尺寸 |
| 参考图 | 锚图路径 / IP-Adapter 权重 |
| 调色板 | `palette_core.gpl` / 区域色 |
| prompt | 完整文本 |
| negative prompt | 完整文本 |

**锚图三件套**：

- `anchor_character.png` —— 角色比例、服装、描边
- `anchor_environment.png` —— 地砖、悬崖、光照
- `anchor_ui.png` —— 边框、语义色、字体

后续生成都带锚图（IP-Adapter / `--sref` / img2img），不要从零 prompt。

---

## 9. 生成后处理（像素专用）

AI 出的图不能直接用，必须过这 5 步：

1. 降采样到目标尺寸（nearest / 像素专用模型输出）
2. 量化到 `palette.gpl`（索引色，关抖动）
3. 检查像素网格：有没有 0.5px / 大小不一的像素
4. 加 1px 深色描边（角色 / 道具；地砖不需要）
5. 1× 检查 + 全屏 1.5× 检查

**UI 特别说明**：AI 适合出概念，不适合批量出 9-slice。边框厚度、圆角、字体必须每次一样，
最终在 Aseprite 里重画 / 对齐一次。

---

## 10. 模型选择（AI 优先）

| 用途 | 首选 | 备选 | 说明 |
|---|---|---|---|
| 角色 / 敌人（像素原生） | Retro Diffusion | PixelLab | 真像素网格、角色 / 动画、API |
| 地砖 / 道具 | Retro Diffusion / PixelLab | Flux + tile LoRA（ComfyUI） | 平铺和边缘更可控 |
| 风格锚图 / 氛围 | 即梦（Seedream） | Flux / Midjourney | 仙侠审美强；Midjourney 国内不方便 |
| UI 概念 | 即梦 / Flux | Midjourney | 最终 9-slice 在 Aseprite 重画 |
| 完全可控 + MCP | ComfyUI + Flux/SDXL + pixel LoRA | RunningHub / LiblibAI | 固定 seed / workflow，可接 MCP |

**不要用**：通用 DALL·E / Gemini 直接出最终像素资产——它们出的是「像素风插画」，
像素网格和色数不可控。

### 模型不认识 .gpl

`palette.gpl` 是给 Aseprite 和后期量化用的，模型读不进去。三种做法：

1. 在 prompt 里写 hex（最省事）
2. 用调色板色块图当参考图
3. **生成后量化到 `palette.gpl`（最可靠，必做）**

Prompt 里加一句：

```
limited palette, max 16 colors:
#40485E #30364A #545C74 #20605C #CCA440 #C42830 #80E0F8 #C8C8D0
```

> 全局 43 色不等于每张图都用 43 色。单个角色 12~20 色就够，多了反而脏。
