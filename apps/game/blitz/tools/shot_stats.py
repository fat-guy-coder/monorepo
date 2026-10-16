"""量一张截图里某个方框的平均亮度, 和旁边一块「干净的参照」对比。

🏗️ 为什么需要它:
   本项目大量结论只能靠看图 (影子/预警圈/压扁比), 而「看得见吗」这件事
   靠肉眼在小图上判断极不可靠 —— 尤其是「淡了但还在」和「根本没画」这两种。
   它把「可见度」变成一个可比的数: 中心亮度 / 参照亮度。
   0.65 = 明显更暗, 0.95 = 基本看不出来。

⚠️ 用之前先确认测量框里**没有别的东西**: HUD 的十字准星、箭头、伤害数字
   都会污染读数, 而且污染的方式是「看起来像影子消失了」—— 我第一次量影子
   就是这么被骗的。要么把框挪开, 要么截图时关掉 F1 面板。

不引入 PIL —— PNG 的 RGBA8 非隔行格式自己解就行 (zlib 解压 + 逐行反滤波)。
   只支持 color_type 2/6 (RGB/RGBA), depth 8, 非隔行 —— Godot 的 save_png 就是这个。

用法: python -I tools/shot_stats.py <png 路径> <中心 x> <中心 y> <半宽>
   参照框自动取「中心框右侧再挪两个框宽」的位置 (同一块地砖邻域)。
"""
import struct
import sys
import zlib

png_path, cx, cy, half = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])

with open(png_path, "rb") as fh:
    raw = fh.read()

if raw[:8] != b"\x89PNG\r\n\x1a\n":
    raise SystemExit("not a png")

pos = 8
idat = b""
width = height = 0
channels = 0
while pos < len(raw):
    (length,) = struct.unpack(">I", raw[pos : pos + 4])
    chunk_type = raw[pos + 4 : pos + 8]
    data = raw[pos + 8 : pos + 8 + length]
    if chunk_type == b"IHDR":
        width, height, depth, color_type, _, _, interlace = struct.unpack(">IIBBBBB", data)
        if depth != 8 or interlace != 0 or color_type not in (2, 6):
            raise SystemExit("unsupported png: depth=%d type=%d interlace=%d" % (depth, color_type, interlace))
        channels = 3 if color_type == 2 else 4
    elif chunk_type == b"IDAT":
        idat += data
    elif chunk_type == b"IEND":
        break
    pos += 12 + length

stride = width * channels
buf = zlib.decompress(idat)
rows = []
prev = bytearray(stride)
off = 0
for _ in range(height):
    filt = buf[off]
    line = bytearray(buf[off + 1 : off + 1 + stride])
    off += 1 + stride
    for i in range(stride):
        a = line[i - channels] if i >= channels else 0
        b = prev[i]
        c = prev[i - channels] if i >= channels else 0
        if filt == 1:
            line[i] = (line[i] + a) & 0xFF
        elif filt == 2:
            line[i] = (line[i] + b) & 0xFF
        elif filt == 3:
            line[i] = (line[i] + (a + b) // 2) & 0xFF
        elif filt == 4:
            p = a + b - c
            pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
            pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
            line[i] = (line[i] + pr) & 0xFF
    rows.append(line)
    prev = line


def lum(x, y):
    i = x * channels
    r, g, b = rows[y][i], rows[y][i + 1], rows[y][i + 2]
    return 0.299 * r + 0.587 * g + 0.114 * b


def box_mean(x0, y0, x1, y1):
    x0, y0 = max(0, x0), max(0, y0)
    x1, y1 = min(width, x1), min(height, y1)
    tot = 0.0
    n = 0
    for y in range(y0, y1):
        for x in range(x0, x1):
            tot += lum(x, y)
            n += 1
    return tot / max(1, n)


centre = box_mean(cx - half, cy - half, cx + half, cy + half)
# 参照: 同一行往右挪开 3 倍的半宽 (仍是同一块地砖/相邻砖, 但躲开影子)
ref = box_mean(cx + half * 3 + 6, cy - half, cx + half * 5 + 6, cy + half)
print("%s  中心亮度=%.1f  参照亮度=%.1f  比值=%.3f" % (png_path.split("/")[-1], centre, ref, centre / max(0.001, ref)))
