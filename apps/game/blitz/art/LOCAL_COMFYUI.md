# 本地 ComfyUI 出像素（RTX 5060）

> 目标：让**家里的 5060** 独立产出「像素底图」，不再依赖 Retro Diffusion 的余额和境外支付。
> 关联：[ART_PIPELINE.md](../ART_PIPELINE.md) · [ART_ROUTE_DECISION.md](../ART_ROUTE_DECISION.md) · [MCP_SETUP.md](MCP_SETUP.md) · [style_bible/palette.gpl](style_bible/palette.gpl)
>
> 状态：**未在本机验证过**（本文是按 RTX 5060 8GB 的显存预算写的配置单）。第一次跑通后回来把「实测速度」补进 §1。

---

## 0. 这条线负责什么，不负责什么

| 能可靠做 | 不能可靠做 |
|---|---|
| 角色**单帧**候选（定长相、定配色） | 同一角色**多帧**的一致性（走路 8 帧，每帧衣服会抖） |
| 场景 / 地砖 / 建筑体块 | 精确的 32px 网格对齐（AI 不懂网格） |
| 道具 / 图标 / UI 元素 | 手和脸的细节（112px 下也无所谓） |
| 风格变体探索（同一 prompt 换 seed 出一批） | 精修 —— 最后一公里永远在 Aseprite |

> **多帧角色动画走 3D 预渲染**（见 [ART_ROUTE_DECISION.md §11](ART_ROUTE_DECISION.md)）。
> 本地 ComfyUI 的定位是：**给 3D 路线出贴图/参考/场景，给 2D 支线出静态资产和候选**。

---

## 1. 硬件账（RTX 5060 = 8GB）

`5060` 是 8GB 显存（`Ti` 才是 8/16 两档）。这决定什么能跑、什么别扭：

| 模型 | 8GB 能不能跑 | 说明 |
|---|---|---|
| **SDXL 1024×1024** | ✅ 舒服 | 主力。加 `--fp8_e4m3fn-text-enc` 省下 text encoder 的 ~2.5GB |
| SD1.5 768 | ✅ 很轻松 | 快，但画质和像素 LoRA 生态都弱一档 |
| **Flux.1 dev** | ⚠️ 能跑，慢 | 必须 GGUF 量化（Q4）+ t5xxl_fp8，单图 1–2 分钟。**不建议当主力** |
| SDXL LoRA 训练 | ⚠️ 极限 | 768 分辨率 + gradient checkpointing + adafactor + 只训 UNet，8GB 能跑 |

**预期速度**（5060 级别，30 步、1024²、batch 4）：一轮 4 张约 **1–2 分钟**。
比 Retro Diffusion 慢，但不要钱、不怕断供、可以无限试。

---

## 2. 下载清单

> 全部放在**同一块 SSD**上，别放系统盘的小分区。总量约 15GB（不含 LoRA 训练素材）。

### 2.1 必须

| 项 | 放哪 | 大小 | 从哪拿 |
|---|---|---|---|
| **ComfyUI 便携版（NVIDIA）** | 任意目录，如 `D:/ComfyUI` | ~1.9GB | [ComfyUI Releases](https://github.com/comfyanonymous/ComfyUI/releases) → `ComfyUI_windows_portable_nvidia.7z` |
| **SDXL base 1.0** | `ComfyUI/models/checkpoints/` | ~6.9GB | [stabilityai/stable-diffusion-xl-base-1.0](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0) → `sd_xl_base_1.0.safetensors`（HF 需要登录并点同意） |
| **SDXL VAE（fp16 fix）** | `ComfyUI/models/vae/` | ~335MB | [madebyollin/sdxl-vae-fp16-fix](https://huggingface.co/madebyollin/sdxl-vae-fp16-fix) |

> VAE 不是可选项：SDXL 自带的 fp16 VAE 在部分显卡上会出**全黑图**，`fp16-fix` 就是修这个的。

### 2.2 强烈建议（决定像素味）

| 项 | 放哪 | 大小 | 说明 |
|---|---|---|---|
| **Pixel Art XL**（SDXL 底模） | `models/checkpoints/` | ~6.5GB | Civitai 搜 `Pixel Art XL`。直接出 2D 像素风，比 base + prompt 稳得多 |
| **2D Pixel Toolkit LoRA** | `models/loras/` | ~200MB | Civitai 搜 `2D Pixel Toolkit`。出**平涂 + 精灵**更好用，配 base SDXL |
| **ComfyUI-Manager** | `custom_nodes/` | 小 | 后面装节点用：`git clone https://github.com/ltdrdata/ComfyUI-Manager custom_nodes/ComfyUI-Manager` |

### 2.3 可选

| 项 | 用途 |
|---|---|
| `ComfyUI-GGUF`（Manager 装） | 只有想试 Flux 时才要 |
| Flux1-dev GGUF `Q4_K_S` + `t5xxl_fp8` | 想试 Flux 时再下，共约 11GB，8GB 显存靠 `--lowvram` 硬挤 |

> **不要**下 ControlNet / IP-Adapter 全家桶。现在用不上，白占空间，还会让工作流变复杂。

---

## 3. 装起来、跑第一张

```bash
# 1) 解压到 D:/ComfyUI（7z 用 7-Zip 或 Windows 11 自带解压）
# 2) 把模型按 §2 的「放哪」放好
# 3) 启动（Git Bash 写法；也可以直接双击 run_nvidia_gpu.bat）
cd /d/ComfyUI
./python_embeded/python.exe -s ComfyUI/main.py --fp8_e4m3fn-text-enc
```

浏览器开 `http://127.0.0.1:8188`。

> 如果报显存不足（OOM），再加 `--lowvram`。**先加 `--fp8_e4m3fn-text-enc`，那个救得更多。**

---

## 4. 工作流

仓库里有一份**只用内置节点**的工作流，保证能直接导入、不依赖任何自定义节点：

```
art/tools/comfy_pixel_sdxl.json
```

用法：ComfyUI 页面里把 JSON **拖进画布**即可。它长这样：

```
Checkpoint ─┬─ CLIP ─→ 正向提示词 ─┐
            │         负向提示词 ─┤
            ├─ MODEL ───────────→ KSampler → VAEDecode → SaveImage
            ├─ VAE ───────────────┘   ↑
            └─ EmptyLatent(1024², ×4) ┘
```

**开跑前改三个地方：**

1. `CheckpointLoaderSimple` 选你实际下载的文件名（默认写的是 `sd_xl_base_1.0.safetensors`）。
   用 Pixel Art XL 就换成它。
2. `EmptyLatentImage` 的 batch_size = **4**：一轮出 4 张候选，别一张一张试。
3. `KSampler` 的 seed：先固定一个（比如 `20261030`），换 seed 只改这一格，才能对比「同一 prompt 不同 seed」。

**提示词**写在 `CLIPTextEncode` 里，模板见 [style_bible/prompts.md](style_bible/prompts.md)。
加 LoRA 的话，在 `CheckpointLoaderSimple` 和 `KSampler` 之间插一个 `LoraLoader`，
权重从 `0.6` 起试（`1.0` 经常过拟合，画面会糊成一片平色）。

> **不要**在工作流里加 pixelize 节点。理由见下一节。

---

## 5. 像素化：用脚本，不用节点

ComfyUI 的 pixel 节点参数藏在工作流 JSON 里 —— 换一张图就要重调，而且结果不可复现。
所以分工是：**ComfyUI 只负责出 1024 的「大图」，像素化交给 `art/tools/palette_quantize.py`。**

```bash
cd apps/game/blitz

# 单张：1024 大图 → 112 高、吸附 palette.gpl、带 1px 描边
python art/tools/palette_quantize.py <ComfyUI输出>/blitz_raw_00001_.png \
    -o art/export/comfy/char_side_01.png -H 112 --median 3 --outline

# 整目录批量（ComfyUI 的输出目录直接指过去）
python art/tools/palette_quantize.py D:/ComfyUI/output -o art/export/comfy --batch -H 112 --median 3 --outline

# 只检查：出图合不合规（颜色是否都在调色板里、alpha 是否只有 0/255）
python art/tools/palette_quantize.py art/export/comfy --check
```

脚本做四件事，顺序不能换：

| 步 | 做什么 | 为什么 |
|---|---|---|
| 1 | **面积平均**降采样（`--downscale box`） | LANCZOS 会在边缘产生振铃，出「脏边」；BOX 取块平均，最接近手绘像素 |
| 2 | 中值滤波（`--median 3`） | 压掉降采样留下的孤立杂点（一个像素的亮斑在 1× 下非常刺眼） |
| 3 | **感知距离**吸附到 `.gpl` | RGB 欧氏距离会把暗部的差异算小，LAB 下才准 |
| 4 | 1px 外描边（`--outline`） | 只往**透明像素**上画，不啃掉原有像素 |

**尺寸怎么定**：角色高度按 [rules.md §3](style_bible/rules.md) 的画布规格（小人 112 / 常规 128 / Boss 192），
给 `-H`。**不要**后期缩放素材去凑尺寸（禁用清单第 6 条）。

---

## 6. 从出图到进 Godot 的完整链路

```bash
# ① ComfyUI 出一批候选（在网页里点 Run，batch=4）
# ② 量化 + 描边
python art/tools/palette_quantize.py D:/ComfyUI/output -o art/export/comfy --batch -H 112 --median 3 --outline
# ③ 自检
python art/tools/palette_quantize.py art/export/comfy --check
# ④ 挑 1 张，Aseprite 手修（对齐脚底、修剪影、补眼睛）
# ⑤ 手修后把源文件存 art/pixel/char/xxx.aseprite；导出 PNG → art/export/char/
# ⑥ Godot 导入：Filter = Nearest，Mipmaps = off，Compress = Lossless
```

第 ⑤ 步是硬规矩：**`art/export/` 里的东西永远可重新生成，不许手改**（见 [README.md](README.md) 三条硬规矩）。

---

## 7. 角色一致性（进阶，等锚图定了再做）

单个角色要出「同一张脸、同一件衣服」的 3 个方向 × 多个动作，光靠 prompt 不够。两条路：

### A. 参考图（便宜，先试这个）
ComfyUI 内置的 `IPAdapter` 或 `img2img`（denoise 0.45~0.6）喂锚图。
装 IP-Adapter 需要额外节点和模型（约 2GB），比 LoRA 简单得多。**先试这个，不够再训 LoRA。**

### B. 训一个角色 LoRA（贵，但一劳永逸）
- 素材：锚图 + turnarounds + 手修的 10~20 张，**同一个角色、多种角度**
- 工具：kohya_ss（或 ComfyUI 的 LoRA 训练节点）
- 8GB 能跑的参数：768 分辨率、batch 1、`--gradient_checkpointing`、`--optimizer_type adafactor`、
  `--mixed_precision fp8`、只训 UNet
- 耗时：约 1~2 小时；训练集做不好会学成一坨
- **判据**：能稳定出「背对镜头」的姿态，才算训成 —— 正面好出，背面暴露一致性

> 这条只在**确定走 2D 路线**时才值得投入。走 3D 路线的话，一致性由骨骼和蒙皮天然解决，
> 本地 ComfyUI 只需要出场景和贴图。

---

## 8. 排错

| 现象 | 原因 | 解决 |
|---|---|---|
| 出图**全黑** | SDXL fp16 VAE 溢出 | 换 `sdxl-vae-fp16-fix`，或在 VAEDecode 里指定这个 VAE |
| `OOM` / 显存不足 | 8GB 太紧 | 启动加 `--fp8_e4m3fn-text-enc`，再不行加 `--lowvram` |
| 图里有**文字/签名** | SDXL 训练集残留 | 负向提示词加 `text, watermark, signature` |
| 出来的「像素」是**假像素**（尺寸对但边缘发虚） | 模型本身画的是写实图 | 换 Pixel Art XL 底模；或降 `--height` 到 64 再放大对比 |
| 颜色一片灰 | 提示词没给明度关系 | 按 [rules.md §0](style_bible/rules.md) 写「角色明度高于背景、危险红、奖励金」 |
| 一张图里有**两个角色** | SDXL 常见 | 负向加 `multiple characters, two people, duplicate`；加 `full body, solo` |
| 降采样后**眼睛没了** | 眼睛在 1024 下只有 3px | 正常。眼睛在 Aseprite 里补，别指望 AI 给 |

---

## 9. 和其它工具怎么分工

| 环节 | 工具 | 备注 |
|---|---|---|
| 定长相 / 出候选 | **即梦**（免费额度）或 **LiblibAI**（支付宝/微信） | 国内的活，不用等本地 |
| 批量变体 / 场景 / 贴图 | **本地 ComfyUI + SDXL** | 一次 4 张，随便试 |
| 角色多方向 / 多动作 | **3D 预渲染**（Tripo/Meshy → Blender） | 见 [ART_ROUTE_DECISION.md §11](ART_ROUTE_DECISION.md) |
| 像素化 / 描边 / 拼表 | **`art/tools/palette_quantize.py`** | 一条命令，可重跑 |
| 手修 / 对齐网格 | **Aseprite**（Steam，支付宝） | 最后一公里只能是它 |

---

## 10. 验收

跑通的标准不是「能出图」，是这三条全过：

- [ ] 单张 1024 出图 ≤ 40 秒（batch 4 ≤ 2 分钟）
- [ ] `palette_quantize.py --check` 通过（无调色板外颜色）
- [ ] 1× 下能看出角色剪影（缩小到 112px 高仍分得清头和肩）

第三条过不了，说明画的不是「剪影可读」的资产 —— 这是 M0 的硬门槛，
见 [M0_CHECKLIST.md](style_bible/M0_CHECKLIST.md)。
