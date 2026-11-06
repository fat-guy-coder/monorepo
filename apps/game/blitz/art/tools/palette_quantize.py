#!/usr/bin/env python3
"""把 AI 出的大图变成能直接放进 Godot 的像素图。

做的事（顺序不能换）：
    1. 面积平均降采样到目标像素尺寸（--height / --size）
    2. 可选中值滤波，压掉降采样留下的孤立杂点
    3. 量化到 .gpl 调色板（感知距离，不是 RGB 欧氏距离）
    4. 可选 1px 外描边（只在 alpha 边缘外侧加，不啃掉原有像素）

为什么不用 ComfyUI 里的 pixel 节点：
    节点参数藏在工作流 JSON 里，换一张图就得重调；脚本是一条命令、可重跑、
    结果可 diff。导出物必须可重新生成（见 art/README.md 三条硬规矩）。

用法：
    # 单张：1024 高的大图 → 112 高、26 色、带描边
    python palette_quantize.py in.png -o out.png -H 112

    # 整目录批量
    python palette_quantize.py art/export/comfy -o art/pixel/char --batch -H 112

    # 只检查已有像素图合不合规（不写文件）
    python palette_quantize.py art/pixel/char/idle_00.png --check

依赖：Pillow（pip install pillow）
"""

from __future__ import annotations

import argparse
import math
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except (AttributeError, OSError):  # 老版本 Python / 重定向的流
    pass

try:
    from PIL import Image, ImageFilter
except ImportError:  # pragma: no cover
    sys.exit("缺少 Pillow：pip install pillow")

# 单张精灵最多用多少个颜色。锚图阶段先按 32 卡，量产时可放到 48。
DEFAULT_MAX_COLORS = 32
# alpha 低于这个值直接判为透明（AI 出的图常有 1~3 的浮点残留）
ALPHA_CUTOFF = 128


# ---------------------------------------------------------------- 调色板

def load_gpl(path: Path) -> list[tuple[int, int, int]]:
    """读 GIMP .gpl。返回 [(r, g, b), ...]，跳过表头和注释。"""
    colors: list[tuple[int, int, int]] = []
    for line in path.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if line.lower().startswith(("gimp palette", "name:", "columns:")):
            continue
        parts = line.split()
        if len(parts) < 3:
            continue
        try:
            r, g, b = (int(p) for p in parts[:3])
        except ValueError:
            continue
        colors.append((r, g, b))
    if not colors:
        raise SystemExit(f"调色板是空的或格式不对：{path}")
    return colors


# ------------------------------------------------- 感知距离（sRGB → CIELAB）

def _srgb_to_linear(c: int) -> float:
    v = c / 255.0
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def rgb_to_lab(rgb: tuple[int, int, int]) -> tuple[float, float, float]:
    """标准 sRGB(D65) → CIELAB。近似即可，目的是让暗部差异别被低估。"""
    r, g, b = (_srgb_to_linear(c) for c in rgb)
    x = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    y = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 1.00000
    z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883

    def f(t: float) -> float:
        return t ** (1 / 3) if t > 0.008856 else (7.787 * t + 16 / 116)

    fx, fy, fz = f(x), f(y), f(z)
    return 116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)


def nearest(rgb: tuple[int, int, int], palette: list[tuple[int, int, int]],
            palette_lab: list[tuple[float, float, float]]) -> tuple[int, int, int]:
    """返回调色板里感知最近的颜色。调色板很小（<200），线性扫足够快。"""
    lab = rgb_to_lab(rgb)
    best_i, best_d = 0, math.inf
    for i, p in enumerate(palette_lab):
        d = (lab[0] - p[0]) ** 2 + (lab[1] - p[1]) ** 2 + (lab[2] - p[2]) ** 2
        if d < best_d:
            best_i, best_d = i, d
    return palette[best_i]


# ---------------------------------------------------------------- 处理

def downscale(img: Image.Image, height: int | None, size: tuple[int, int] | None,
              resample: str) -> Image.Image:
    """按高度等比缩放；给 --size 时直接缩到该尺寸（不保持比例）。"""
    w, h = img.size
    if size:
        tw, th = size
    elif height:
        scale = height / h
        tw, th = max(1, round(w * scale)), height
    else:
        return img
    # BOX = 面积平均，降采样时比 LANCZOS 更少振铃、更接近「每个像素取一块的平均色」
    filters = {
        "box": Image.BOX,
        "nearest": Image.NEAREST,
        "lanczos": Image.LANCZOS,
        "bicubic": Image.BICUBIC,
    }
    if resample not in filters:
        raise SystemExit(f"--downscale 只能是 {sorted(filters)}")
    return img.resize((tw, th), filters[resample])


def quantize(img: Image.Image, palette: list[tuple[int, int, int]]) -> Image.Image:
    """RGB 通道逐像素吸附到调色板，alpha 只做二值化。"""
    palette_lab = [rgb_to_lab(c) for c in palette]
    src = img.convert("RGBA")
    px = src.load()
    out = Image.new("RGBA", src.size)
    op = out.load()
    cache: dict[tuple[int, int, int], tuple[int, int, int]] = {}
    for y in range(src.height):
        for x in range(src.width):
            r, g, b, a = px[x, y]
            if a < ALPHA_CUTOFF:
                op[x, y] = (0, 0, 0, 0)
                continue
            key = (r, g, b)
            hit = cache.get(key)
            if hit is None:
                hit = nearest(key, palette, palette_lab)
                cache[key] = hit
            op[x, y] = (hit[0], hit[1], hit[2], 255)
    return out


def outline(img: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    """在**不透明像素的外侧**加 1px 描边（4 邻接），画布不扩。

    注意方向：是从透明像素去找相邻的不透明像素，所以不会吃掉原有像素。
    """
    src = img.load()
    out = img.copy()
    op = out.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            if src[x, y][3] != 0:
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and src[nx, ny][3] != 0:
                    op[x, y] = (*color, 255)
                    break
    return out


def color_stats(img: Image.Image) -> tuple[int, int]:
    """返回 (不透明像素数, 不同颜色数)。"""
    px = img.convert("RGBA").load()
    colors: set[tuple[int, int, int]] = set()
    opaque = 0
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            opaque += 1
            colors.add((r, g, b))
    return opaque, len(colors)


def process_one(src: Path, dst: Path, palette: list[tuple[int, int, int]],
                args: argparse.Namespace) -> None:
    img = Image.open(src).convert("RGBA")
    before = downscale(img, args.height, args.size, args.downscale)
    if args.median:
        # 中值滤波只对 RGB 生效，先拆 alpha 再合回去，免得把透明边缘糊成黑边
        alpha = before.getchannel("A")
        rgb = before.convert("RGB").filter(ImageFilter.MedianFilter(args.median))
        before = rgb.convert("RGBA")
        before.putalpha(alpha)

    if args.max_colors and not args.no_posterize:
        # 先做一次色数压缩（MEDIANCUT），减少后面逐像素吸附的工作量。
        # PIL 只允许 FASTOCTREE 量化带 alpha 的图，所以 RGB 和 alpha 分开处理。
        alpha = before.getchannel("A")
        rgb = before.convert("RGB").quantize(colors=args.max_colors,
                                             method=Image.MEDIANCUT,
                                             dither=Image.NONE).convert("RGB")
        before = rgb.convert("RGBA")
        before.putalpha(alpha)

    out = quantize(before, palette)
    if args.outline:
        out = outline(out, tuple(args.outline_color))

    dst.parent.mkdir(parents=True, exist_ok=True)
    out.save(dst)
    opaque, ncol = color_stats(out)
    flag = "" if ncol <= len(palette) + (1 if args.outline else 0) else "  [WARN] 超出调色板"
    print(f"{src.name} -> {dst.name}  {out.width}x{out.height}  "
          f"opaque={opaque}px  colors={ncol}/{len(palette)}{flag}")


def check_one(path: Path, palette: list[tuple[int, int, int]],
              outline_color: tuple[int, int, int]) -> bool:
    """校验：颜色数 ≤ 上限，且每个颜色要么在调色板里、要么是描边色。"""
    img = Image.open(path).convert("RGBA")
    allowed = set(palette) | {outline_color}
    px = img.load()
    bad: set[tuple[int, int, int]] = set()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if (a not in (0, 255)) or (r, g, b) not in allowed:
                bad.add((r, g, b))
    ok = not bad
    tag = "[OK]" if ok else f"[FAIL] {len(bad)} 种颜色不在调色板里，例如 {sorted(bad)[:5]}"
    print(f"{path.name}  {img.width}x{img.height}  {tag}")
    return ok


def main() -> int:
    p = argparse.ArgumentParser(description="AI 大图 → 像素图（降采样 + 调色板量化 + 描边）")
    p.add_argument("src", type=Path, help="输入 PNG，或（配 --batch）输入目录")
    p.add_argument("-o", "--out", type=Path, required=False, help="输出 PNG 或目录")
    p.add_argument("--batch", action="store_true", help="src 当目录处理，递归所有 png")
    p.add_argument("-H", "--height", type=int, default=None, help="目标高度（等比）")
    p.add_argument("--size", type=int, nargs=2, metavar=("W", "H"), default=None,
                   help="目标尺寸，不保持比例")
    p.add_argument("--palette", type=Path,
                   default=Path(__file__).resolve().parent.parent / "style_bible" / "palette.gpl")
    p.add_argument("--downscale", default="box", choices=["box", "nearest", "lanczos", "bicubic"])
    p.add_argument("--median", type=int, default=0, metavar="N",
                   help="降采样后做 N×N 中值滤波（3 比较温和）")
    p.add_argument("--max-colors", type=int, default=DEFAULT_MAX_COLORS)
    p.add_argument("--no-posterize", action="store_true", help="跳过滤色，直接全图吸附调色板")
    p.add_argument("--outline", action="store_true", help="加 1px 外描边")
    p.add_argument("--outline-color", type=int, nargs=3, default=[16, 18, 24],
                   metavar=("R", "G", "B"), help="描边色，默认近黑")
    p.add_argument("--check", action="store_true", help="只校验，不写文件")
    args = p.parse_args()

    palette = load_gpl(args.palette)

    if args.check:
        targets = sorted(args.src.glob("**/*.png")) if args.src.is_dir() else [args.src]
        all_ok = True
        for t in targets:
            all_ok &= check_one(t, palette, tuple(args.outline_color))
        print("全部通过" if all_ok else "有文件不合规")
        return 0 if all_ok else 1

    if not args.out:
        raise SystemExit("要么给 -o，要么用 --check")

    if args.batch:
        for src in sorted(args.src.glob("**/*.png")):
            rel = src.relative_to(args.src)
            process_one(src, args.out / rel, palette, args)
    else:
        dst = args.out
        if dst.is_dir() or str(args.out).endswith(("/", "\\")):
            dst = dst / args.src.name
        process_one(args.src, dst, palette, args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
