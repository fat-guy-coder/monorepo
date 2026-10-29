# MCP 接入流程（美术资源生成）

> 目标：先用一个 MCP 直接生成一版「够不够用」的像素资源；够用就继续，不够再按分工换专用模型。
>
> **当前状态（2026-10-29）**：Retro Diffusion 已接在**用户级** `~/.claude.json`，`claude mcp list` = ✔ Connected。
> 另有一条非 MCP 路线：**即梦 CLI**（见 [§10](#10-即梦-cli国内锚图备选)），用来出风格锚图，按需再装。

---

## 0. 先选哪个

| 顺序 | MCP | 适合 | 先试的理由 |
|---|---|---|---|
| **1** | **Retro Diffusion** | 角色 / 精灵 / 动画 / tileset | 官方托管、真像素网格、自带调色板转换和像素修复，最贴合本项目 |
| 2 | PixelLab | 角色 / 动画 / 8 方向 / tileset / UI 素材 | 动画和方向更全；Retro Diffusion 风格不合适时换它 |
| 3 | Comfy Cloud | Flux / SDXL / LoRA 工作流 | 想用通用模型 + 自选 LoRA 时用；像素后期要自己做 |
| 4 | Replicate + Flux | 高质量概念图 | 审美强，但不是像素原生，后期工作多 |

**建议：先接 Retro Diffusion。** 它是官方 hosted MCP，不用本地显卡，免费账号有起步额度，工具里直接有
`palette_converter`、`color_reducer`、`fix_pixel_art`、`seam_tiling`，正好覆盖本项目的「像素 + 调色板 + 平铺」需求。

---

## 1. Retro Diffusion MCP（首选）

### 1.1 申请 key

1. 打开 <https://retrodiffusion.ai>，注册免费账号（有起步 credits）。
2. 进 **Developer Tools → Create API Key**。
3. 复制 key，格式是 `rdpk-...`。**只显示一次，先存好。**

### 1.2 接入 Claude Code（Windows / Git Bash）

```bash
claude mcp add retro-diffusion https://mcp.retrodiffusion.ai/mcp \
  -t http -s user \
  -H "Authorization: Bearer rdpk-你的KEY"
```

单行版：

```bash
claude mcp add retro-diffusion https://mcp.retrodiffusion.ai/mcp -t http -s user -H "Authorization: Bearer rdpk-你的KEY"
```

参数说明：

| 参数 | 作用 |
|---|---|
| `-t http` | Streamable HTTP transport |
| `-s user` | 写到用户级配置（`~/.claude.json`），**不会进项目仓库** |
| `-H` | 认证头 |

> ⚠️ Windows 上 `${VAR}` 在 HTTP header 里有已知展开问题（#51581）。
> 所以这里直接用**字面 key**，并且用 `-s user`，不要写进项目 `.mcp.json`。
> `claude mcp add` 还可能把环境变量展开后写回文件（#18692），`-s user` 同样能避开。

### 1.3 验证

```bash
claude mcp list
```

应该看到 `retro-diffusion` 已连接。然后**重启 Claude Code / 开新会话**，输入：

```
/mcp
```

确认工具已加载。如果提示 OAuth，按 `/mcp` 里的提示授权；如果有 key，一般不需要。

### 1.4 第一次调用（先别批量生成）

在 Claude Code 里说：

```
用 retro-diffusion：
1. list_available_models
2. list_available_styles
3. 估算生成 6 张 192×192 侧视武侠角色候选的成本
```

对应工具：

| 工具 | 用途 |
|---|---|
| `list_available_models` | RD Fast / Plus / Pro / Mini |
| `list_available_styles` | 90+ 像素风格 |
| `estimate_inference_cost` | **免费**估算成本 |
| `create_inference` | 生成图 / 动画 / tileset |
| `get_inference_result` | 超时后用 `request_id` 取结果，**不要重跑**（会重复扣费） |
| `start_inference_job` / `get_inference_job` / `list_inference_jobs` | 批量 / 动画的异步任务 |
| `run_edit_tool` / `list_edit_tools` | 编辑：调色板转换、降色、平铺、去背景等 |
| `fix_pixel_art` | **免费**恢复原生像素网格 |
| `get_balance` | 查余额 |

### 1.5 生成第一批候选

建议一次只生成 **6 张**，先看方向对不对：

```
用 RD Fast，生成 6 张 192×192、透明背景、侧视、持剑的武侠剑客 idle 姿势。
深青长袍、鎏金边、冷灰蓝背景不出现。
同一个 style，seed 从 1000 到 1005。
```

**关键提示（官方文档明确说的）**：prompt 里**不要写 "pixel art"** —— 你选的 style 已经在做像素化；
只描述主体、视角、姿势、服装、颜色。写了反而会让模型往「像素风插画」跑。

生成后：

```
1. 对每张图跑 fix_pixel_art（免费）
2. 跑 run_edit_tool，tool 用 palette_converter 或 color_reducer，
   把颜色压到 16~24 色，dithering 关掉
3. 保存到 art/export/probe/
```

如果生成超时：用 `get_inference_result` + `request_id` 取回，**不要重新 `create_inference`**。

### 1.6 成本参考

| 项 | 大约 |
|---|---|
| RD Fast | ~$0.015 / 张 |
| RD Pro | ~$0.18 / 张 |
| 动画 | ~$0.07~0.25 |
| Tileset | ~$0.10 |
| 成本估算 | 免费 |

先都用 RD Fast 试方向，定了再换 Plus / Pro。

---

## 2. PixelLab MCP（备选）

适合：动画、8 方向、tileset、UI 素材、字体。

### 2.1 申请 key

1. 打开 <https://www.pixellab.ai>，注册。
2. 进 Dashboard / API 页面创建 secret。

### 2.2 接入

```bash
claude mcp add pixellab https://api.pixellab.ai/mcp -t http -s user -H "Authorization: Bearer 你的SECRET"
```

### 2.3 验证

```bash
claude mcp list
```

重启会话，`/mcp` 确认工具。PixelLab 的工具覆盖角色、动画、旋转、inpaint、tileset、地图物件、UI 素材、字体等。

---

## 3. Comfy Cloud MCP（想用 Flux / LoRA 时）

### 3.1 接入

```bash
claude mcp add comfy-cloud https://cloud.comfy.org/mcp -t http -s user
```

然后 `/mcp` → `comfy-cloud` → Authenticate。
如果有 API key，也可以：

```bash
claude mcp add comfy-cloud https://cloud.comfy.org/mcp -t http -s user -H "X-API-Key: comfyui-你的KEY"
```

### 3.2 插件（可选，提供 slash commands）

```bash
/plugin marketplace add Comfy-Org/comfy-skills
/plugin install comfy-cloud@comfy-skills
```

之后可以用 `/comfy-cloud:generate-image` 等命令。Comfy Cloud 新用户有少量免费次数，之后按量付费。

> 这条适合「我有指定模型 / LoRA / workflow」的情况；默认工作流出的是通用图，
> 像素网格仍要 `fix_pixel_art` 或 Aseprite 后期。

---

## 4. Replicate + Flux MCP（可选）

```bash
claude mcp add flux-mcp --scope user --env REPLICATE_API_TOKEN=r8_你的TOKEN -- npx flux-mcp@latest
```

Token 在 <https://replicate.com/account/api-tokens> 创建（`r8_` 开头）。
Flux 的 prompt 遵循和构图强，但不是像素原生；适合出概念图 / 锚图，不适合直接出 32×32 地砖。

---

## 5. 试完怎么判断「够不够用」

生成 6 张角色 + 4 张地砖 + 2 张 UI 概念，全部过：
`fix_pixel_art` → `palette_converter` / `color_reducer` → 1× 检查。

| 检查 | 通过标准 |
|---|---|
| 像素网格 | 没有 0.5px、没有大小不一的像素 |
| 色数 | 角色 ≤24 色，地砖 ≤8 色（量化后） |
| 剪影 | 112px 下能看出是持剑武侠 |
| 一致性 | 6 张候选像同一个角色，不是 6 个游戏 |
| 调色 | 量化后接近 `palette.gpl`，不出现明显脏色 |
| 地砖 | 4×4 拼接无接缝（用 `seam_tiling`） |
| UI | 边框厚度 / 圆角一致；不一致就手绘 |

**全过** → 第一个盒子直接用这套 MCP 量产。
**部分过** → 按下面换分工。

---

## 6. 不够用时的分工

| 问题 | 换什么 |
|---|---|
| 角色风格不对 / 动作不够 | PixelLab（动画、8 方向） |
| 需要精确控制 / 自选 LoRA | ComfyUI + 本地 ComfyUI MCP（`npx comfyui-mcp`） |
| 角色动作一致性差 | Blender MCP + 3D 预渲染（不是生成模型） |
| UI 每次都不一样 | **不要用生成模型出最终 UI**；Aseprite / Figma 手绘 9-slice |
| 地砖接缝 | Retro Diffusion 的 `seam_tiling`；还不行就手绘边缘砖 |
| 调色板压不准 | Aseprite：`Image → Color Mode → Indexed`，载入 `palette.gpl`，关抖动 |

---

## 7. 安全

- **不要提交 key。** 用 `-s user`，配置在 `~/.claude.json`，不在仓库里。
- 如果一定要用项目级 `.mcp.json`，把它加进 `.gitignore`，或用 `headersHelper` 从环境变量读。
- key 泄露就去官网 revoke，重新生成。
- `claude mcp add` 可能把 `${VAR}` 展开后写进文件，加完检查一下 `git status`。

---

## 8. 一句话流程

```
retrodiffusion.ai 注册 → 创建 rdpk- key
→ claude mcp add ... -t http -s user -H "Authorization: Bearer rdpk-..."
→ claude mcp list / /mcp
→ list_models + list_styles + estimate_cost
→ 生成 6 张 192×192 角色候选（prompt 不写 "pixel art"）
→ fix_pixel_art → palette_converter / color_reducer
→ 1× 检查 → 够用就量产，不够换 PixelLab / ComfyUI / Blender
```

---

## 9. 排错：`Header 'Authorization' has invalid value`

这是实际踩过的坑，按顺序查：

### 9.1 最常见：占位符没替换

`claude mcp add ... -H "Authorization: Bearer rdpk-你的KEY"` **原样执行**了。
Windows 把「你的KEY」按 GBK 写进 `~/.claude.json`，Claude Code 按 UTF-8 读出来是乱码
`rdpk-���KEY` → header 里有非 ASCII 字节 → Node 直接判非法。

检查：

```bash
python -c "import json,os;d=json.load(open(os.path.expanduser('~/.claude.json'),encoding='utf-8'));print(d['mcpServers']['retro-diffusion']['headers'])"
```

看到 `���` 就是它。删掉重加，**key 必须是纯 ASCII 真 key**：

```bash
claude mcp remove retro-diffusion -s user
claude mcp add retro-diffusion https://mcp.retrodiffusion.ai/mcp -t http -s user -H "Authorization: Bearer rdpk-真KEY"
```

### 9.2 `mcpServers` 写错文件

`.claude/settings.json` **不读 `mcpServers`**。它只放 `env` / `permissions` / `hooks`。
MCP 只有两处：

| 位置 | 命令 | 是否进仓库 |
|---|---|---|
| 用户级 `~/.claude.json` | `-s user` | 否 |
| 项目级 `.mcp.json` | 默认 | **会**，别放 key |

写在 settings.json 里的块不会生效，而且白白多存一份 key。

### 9.3 字段写错

| 错误 | 正确 |
|---|---|
| `"type": "https"` | `"type": "http"` |
| `"url": "http://mcp.retrodiffusion.ai/mcp"` | `https://`（少了 s 连不上） |
| `"Authorization": "rdpk-..."` | `"Authorization": "Bearer rdpk-..."`（Bearer + 空格） |

### 9.4 验证顺序

```bash
claude mcp list        # 必须是 ✔ Connected
```

看到 ✔ 之后，**重启 Claude Code / 开新会话**（或 `/mcp` 里 reconnect），工具才会出现在当前会话。
`claude mcp list` 显示连接成功、但会话里没有工具，就是还没重载。

### 9.5 key 泄露

key 一旦出现在聊天记录、截图、提交里，**去官网 revoke，重新生成**。
换 key 后执行 9.1 的两条命令即可，不用改代码。

---

## 10. 即梦 CLI（国内锚图备选）

不是 MCP，是字节官方的**命令行 + Skill**。装完之后 Claude Code 能直接 `dreamina text2image ...`，
不需要再过一遍 MCP 配置，也不消耗 Retro Diffusion 的余额。

即梦给两个 CLI，**功能不重叠**，别装错：

| | 通用创作 CLI（`dreamina`） | 全能画布 CLI（`dreamina-canvas`） |
|---|---|---|
| 一句话 | 一条命令一个生成任务 | 一整个可编辑画布（项目 + 节点图） |
| 安装 | `curl -s https://jimeng.jianying.com/cli \| bash` | 见下方三条（按 shell 选） |
| 装到哪 | `~/.dreamina_cli/dreamina/`（二进制 + `SKILL.md`） | 二进制 + skill 包 → `~/.agents/skills/dreamina-canvas-cli/` |
| 核心命令 | `text2image` / `image2image` / `image_upscale` / `text2video` / `image2video` / `frames2video` / `user_credit` / `session` / `list_task` / `query_result` | `canvas create/ls/use/current`、`model list --type image`、`auth status`、`schema` |
| 认证 | OAuth Device Flow（`dreamina login`，打印 `verification_uri` + `user_code`） | 同样 Device Flow（`auth status` 查状态） |
| 上手成本 | 低：`dreamina <子命令> -h` 就是全部文档 | 高：要先建/选画布、拿 Node ID、过积分报价确认 |
| 适合 | **出锚图、单张迭代、图生图换动作** | 多素材合成、画布式改图、出视频/配音、整张场景拼装 |

### 10.1 先装哪个：**通用创作 CLI**

我们当前这一步是「出 3 张锚图」——文生图 + 图生图 + 放大，正好是通用 CLI 的直接子命令。
画布 CLI 多出来的项目/节点/报价层，在只出一张角色图时**全是额外负担**，等要做 1280×720 的
锚定合成图、或者要把角色和场景拼在一张画布上迭代时再装。

```bash
# 安装（Git Bash / PowerShell 都能用 bash 那条）
curl -s https://jimeng.jianying.com/cli | bash

# 验证 + 登录（会在终端打印授权链接和验证码，需要本人在浏览器里点确认）
dreamina -h
dreamina user_credit
dreamina login          # 或 relogin；--headless 只打印 device_code，之后 checklogin 收尾
```

装完的 skill 在 `~/.dreamina_cli/dreamina/SKILL.md`。想让我在新会话里自动认得它，
把这个目录加到 agent 的 skills 目录（或在该会话里让我读一次 `SKILL.md`）。

### 10.2 全能画布 CLI（需要时再装）

```bash
# macOS / Linux / Git Bash
curl -fsSL https://jimeng.jianying.com/canvas-cli/install.sh | bash

# Windows PowerShell
irm https://jimeng.jianying.com/canvas-cli/install.ps1 | iex

# Windows CMD
curl.exe -fsSLO https://jimeng.jianying.com/canvas-cli/install.bat && install.bat
```

安装脚本从字节 CDN 拉二进制 + `skill.tar.gz`，**校验 SHA-256**，解压到
`~/.agents/skills/dreamina-canvas-cli/`（需要 `tar`）。
可用 `DREAMINA_CANVAS_INSTALL_DIR` / `DREAMINA_CANVAS_SKILL_DIR` 改路径。

### 10.3 和 Retro Diffusion 怎么分工

| 环节 | 用谁 | 理由 |
|---|---|---|
| 锚图（定风格、定角色长相） | **即梦** | 仙侠审美强、角色一致性好、有免费日常额度 |
| 像素化 / 网格修复 | Retro Diffusion `fix_pixel_art` | 即梦出的是「像素风插画」，网格不可控 |
| 量产帧 / 动画 | Retro Diffusion 原生尺寸直出 | 真像素网格 + 按帧计费，最便宜 |
| Retro Diffusion 挂了 / 余额空 | 即梦出图 → 手动量化 | 有兜底，不阻塞 |

> 别拿即梦的图直接进游戏——它给的是**好看的概念图**，不是可用的 112px 精灵。
> 必须过 [prompts.md §9](style_bible/prompts.md) 的 5 步后处理。

### 10.4 注意

- 生成命令**可能扣积分**，跑之前先 `dreamina user_credit`；异步任务用 `submit_id` + `query_result`，
  超时**不要重提**（会重复扣）。
- 下载一律走 `query_result --download_dir=<path>`；输出里的 `image_url` / `video_url` 是预览链接，不是文件。
- 首次遇到 `AigcComplianceConfirmationRequired` 是即梦网页端的合规确认，去网页点一次再重试。
- 安装脚本是 `curl | bash`，执行前先落盘看一眼：`curl -s https://jimeng.jianying.com/cli -o /tmp/jimeng_cli.sh`。
