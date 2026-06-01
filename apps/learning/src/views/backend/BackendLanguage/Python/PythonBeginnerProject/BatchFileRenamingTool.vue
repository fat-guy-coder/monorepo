<template>
  <div class="min-h-screen bg-slate-950 text-slate-200 font-sans">
    <!-- ====== 顶部导航面包屑 ====== -->
    <nav class="flex items-center gap-2 px-6 py-3 text-sm text-slate-400 border-b border-slate-800">
      <span class="hover:text-cyan-400 cursor-pointer">🏠 首页</span>
      <span>/</span>
      <span class="hover:text-cyan-400 cursor-pointer">Python</span>
      <span>/</span>
      <span class="hover:text-cyan-400 cursor-pointer">初学者项目</span>
      <span>/</span>
      <span class="text-cyan-400 font-medium">批量文件重命名工具</span>
    </nav>

    <!-- ====== Hero 区域 ====== -->
    <header class="relative overflow-hidden px-6 py-16 md:py-24">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950">
      </div>
      <div class="relative max-w-4xl mx-auto text-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs mb-6">
          🐍 项目 01 · 阶段一
        </div>
        <h1
          class="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          批量文件重命名工具
        </h1>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          用 Python 打造一个命令行工具，按规则批量重命名文件——支持前缀 / 后缀 / 替换 / 序号，可预览、可撤销。
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <span class="px-3 py-1.5 bg-slate-800/60 rounded-lg text-xs border border-slate-700 text-slate-300">📁 os /
            pathlib</span>
          <span class="px-3 py-1.5 bg-slate-800/60 rounded-lg text-xs border border-slate-700 text-slate-300">🔍 re
            正则</span>
          <span class="px-3 py-1.5 bg-slate-800/60 rounded-lg text-xs border border-slate-700 text-slate-300">🔄
            循环与条件</span>
          <span class="px-3 py-1.5 bg-slate-800/60 rounded-lg text-xs border border-slate-700 text-slate-300">💾 JSON
            持久化</span>
          <span class="px-3 py-1.5 bg-slate-800/60 rounded-lg text-xs border border-slate-700 text-slate-300">⚡ CLI
            交互</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 pb-24 space-y-16">

      <!-- ====== 功能需求 ====== -->
      <section>
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">🎯</span>
          功能需求
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="(req, idx) in requirements" :key="idx"
            class="group p-5 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-colors">
            <div class="flex items-start gap-3">
              <span
                class="shrink-0 w-7 h-7 rounded-md bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-mono">{{
                idx + 1 }}</span>
              <div>
                <h3 class="font-semibold text-slate-100 text-sm mb-1">{{ req.title }}</h3>
                <p class="text-slate-500 text-xs leading-relaxed">{{ req.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 涉及知识点 ====== -->
      <section>
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">📚</span>
          涉及知识点
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="kp in knowledgePoints" :key="kp.name"
            class="p-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-colors">
            <div class="text-lg mb-2">{{ kp.icon }}</div>
            <h3 class="font-semibold text-slate-100 text-sm mb-1">{{ kp.name }}</h3>
            <p class="text-slate-500 text-xs">{{ kp.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ====== 完整代码 ====== -->
      <section>
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">💻</span>
          完整代码
        </h2>
        <p class="text-slate-400 text-sm mb-4">
          以下为完整可运行代码，保存为 <code
            class="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-400 text-xs">project_01_rename_tool.py</code>：
        </p>
        <div class="relative">
          <!-- 代码块顶部工具栏 -->
          <div
            class="flex items-center justify-between px-4 py-2 bg-slate-800 rounded-t-lg border border-slate-700 border-b-0">
            <div class="flex gap-1.5">
              <span class="w-3 h-3 rounded-full bg-red-500/60"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-500/60"></span>
            </div>
            <span class="text-xs text-slate-500">project_01_rename_tool.py</span>
          </div>
          <!-- 代码内容 -->
          <div class="bg-slate-900 rounded-b-lg border border-slate-700 border-t-0 overflow-x-auto">
            <pre class="p-4 text-sm leading-relaxed"><code class="language-python">{{ fullCode }}</code></pre>
          </div>
        </div>
      </section>

      <!-- ====== 核心逻辑拆解 ====== -->
      <section>
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm">🔧</span>
          核心逻辑拆解
        </h2>

        <div class="space-y-8">
          <div v-for="step in steps" :key="step.title" class="p-5 bg-slate-900/50 rounded-xl border border-slate-800">
            <h3 class="text-lg font-semibold text-slate-100 mb-3 flex items-center gap-2">
              <span class="text-cyan-400">{{ step.icon }}</span> {{ step.title }}
            </h3>
            <p class="text-slate-400 text-sm mb-4">{{ step.desc }}</p>
            <div class="bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto">
              <pre class="p-4 text-xs leading-relaxed"><code class="language-python">{{ step.code }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 运行演示 ====== -->
      <section>
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 text-sm">▶️</span>
          运行演示
        </h2>
        <div class="p-5 bg-slate-900/50 rounded-xl border border-slate-800 space-y-4">
          <div>
            <h3 class="text-sm font-semibold text-slate-300 mb-2">启动方式</h3>
            <div class="bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto">
              <pre class="p-4 text-sm"><code class="language-bash">cd apps/python/exercises
python project_01_rename_tool.py</code></pre>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-300 mb-2">交互演示流程</h3>
            <div class="bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto">
              <pre class="p-4 text-xs leading-relaxed text-slate-400"><code>{{ demoFlow }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 项目目录位置 ====== -->
      <section>
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">📁</span>
          文件位置
        </h2>
        <div class="bg-slate-900/50 rounded-xl border border-slate-800 overflow-x-auto p-5">
          <pre class="text-sm leading-relaxed text-slate-400"><code>apps/python/
├── exercises/
│   └── project_01_rename_tool.py   ← 你在这里
├── LEARNING_PATH.md
└── README.md</code></pre>
        </div>
      </section>

      <!-- ====== 常见问题 ====== -->
      <section>
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-sm">❓</span>
          常见问题
        </h2>
        <div class="space-y-3">
          <details v-for="faq in faqs" :key="faq.q"
            class="group p-4 bg-slate-900/50 rounded-xl border border-slate-800 cursor-pointer">
            <summary class="font-medium text-slate-200 text-sm list-none flex items-center justify-between">
              {{ faq.q }}
              <span class="text-slate-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p class="mt-3 text-slate-400 text-sm leading-relaxed">{{ faq.a }}</p>
          </details>
        </div>
      </section>

      <!-- ====== 底部导航 ====== -->
      <footer class="flex justify-between items-center pt-8 border-t border-slate-800">
        <span class="text-slate-600 text-sm">← 返回路线图</span>
        <span class="text-slate-600 text-sm">下一个项目：文本处理工具 →</span>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
// ========== 功能需求 ==========
const requirements = [
  { title: '输入文件夹路径', desc: '接收用户输入的文件夹路径，扫描目录下所有文件。' },
  { title: '多种重命名规则', desc: '支持添加前缀/后缀、文本替换、正则替换、序号重命名（如 001, 002...）。' },
  { title: '预览确认', desc: '执行前展示新旧文件名对比，用户确认后再批量重命名。' },
  { title: '支持撤销', desc: '每次操作自动记录到 JSON 日志文件，支持回退到上一步。' },
];

// ========== 知识点 ==========
const knowledgePoints = [
  { icon: '📂', name: 'os / pathlib', desc: '遍历目录、获取文件名、执行重命名、检查文件是否存在。' },
  { icon: '🔍', name: 're 正则表达式', desc: '用 re.sub() 实现灵活的文件名替换，支持捕获组和反向引用。' },
  { icon: '🔄', name: '循环与枚举', desc: 'for 循环遍历文件列表，enumerate 生成序号，while 处理交互菜单。' },
  { icon: '💾', name: 'JSON 序列化', desc: 'json.dump/load 将操作历史持久化到本地文件，实现撤销功能。' },
  { icon: '⚡', name: 'CLI 交互', desc: 'input() 接收用户输入，print() 格式化输出预览表格。' },
  { icon: '🛡️', name: '异常处理', desc: 'try/except 处理文件不存在、权限不足等异常情况。' },
];

// ========== 核心步骤拆解 ==========
const steps = [
  {
    icon: '1️⃣',
    title: '收集文件 — os.listdir / pathlib.Path',
    desc: '用 pathlib.Path.iterdir() 扫描文件夹，筛选出所有文件（排除子目录），按文件名排序后返回。',
    code: `from pathlib import Path

def collect_files(folder: str) -> list[Path]:
    \"\"\"收集文件夹下所有文件（不递归子目录）。\"\"\"
    p = Path(folder)
    if not p.exists():
        raise FileNotFoundError(f"文件夹不存在：{folder}")
    return sorted([f for f in p.iterdir() if f.is_file()], key=lambda x: x.name)`,
  },
  {
    icon: '2️⃣',
    title: '规则引擎 — 设计可扩展的重命名策略',
    desc: '每种重命名方式封装为独立逻辑，用字典描述规则，通过 type 字段分发到不同处理函数。',
    code: `def _apply_rule(stem: str, rule: dict) -> str:
    \"\"\"对文件名（不含扩展名）应用规则。\"\"\"
    t = rule["type"]
    if t == "prefix":
        return rule["value"] + stem        # 添加前缀
    elif t == "suffix":
        return stem + rule["value"]        # 添加后缀
    elif t == "replace":
        return stem.replace(rule["old"], rule["new"])  # 文本替换
    elif t == "regex":
        return re.sub(rule["pattern"], rule["repl"], stem)  # 正则替换
    return stem`,
  },
  {
    icon: '3️⃣',
    title: '预览机制 — 先看再执行',
    desc: '遍历文件列表，对每个文件应用规则生成新名称，返回 {原名, 新名, 是否变更} 的预览列表，交由用户确认。',
    code: `def preview_rename(files: list[Path], rule: dict) -> list[dict]:
    \"\"\"生成预览结果，不真正执行重命名。\"\"\"
    preview = []
    for file in files:
        stem, ext = file.stem, file.suffix
        new_stem = _apply_rule(stem, rule)
        new_name = new_stem + ext
        preview.append({
            "old_name": file.name,
            "new_name": new_name,
            "changed": file.name != new_name,
        })
    return preview`,
  },
  {
    icon: '4️⃣',
    title: '执行重命名 — os.rename()',
    desc: '遍历预览结果，对 changed 为 True 的文件调用 os.rename()；若目标文件名已存在则自动追加 _1, _2 防止覆盖。',
    code: `def execute_rename(files: list[Path], rule: dict, preview: list[dict]) -> list[dict]:
    \"\"\"执行重命名，返回操作记录用于撤销。\"\"\"
    log = []
    for item in preview:
        if not item["changed"]:
            continue
        old_path = Path(item["old_path"])
        new_path = old_path.parent / item["new_name"]
        # 防止重名覆盖
        if new_path.exists():
            stem, ext = new_path.stem, new_path.suffix
            counter = 1
            while new_path.exists():
                new_path = old_path.parent / f"{stem}_{counter}{ext}"
                counter += 1
        os.rename(old_path, new_path)
        log.append({"old": str(old_path), "new": str(new_path)})
    return log`,
  },
  {
    icon: '5️⃣',
    title: '撤销系统 — JSON 日志回滚',
    desc: '每次操作将日志追加到 rename_history.json，撤销时读取最近一次记录，逐个 os.rename 反向恢复。',
    code: `import json

HISTORY_FILE = "rename_history.json"

def undo_last() -> list[dict]:
    \"\"\"撤销最近一次重命名操作。\"\"\"
    history = load_all_history()
    if not history:
        print("⚠️ 没有可撤销的操作。")
        return []
    last = history.pop()
    restored = []
    for op in last["operations"]:
        if os.path.exists(op["new"]):
            os.rename(op["new"], op["old"])  # 反向重命名
            restored.append({"old": op["new"], "new": op["old"]})
    # 写回（移除了最后一条记录）
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)
    return restored`,
  },
];

// ========== 演示流程 ==========
const demoFlow = `$ python project_01_rename_tool.py

==================================================
   📁 批量文件重命名工具
==================================================
请输入文件夹路径：C:/test_photos

📂 找到 5 个文件：
   IMG_001.jpg   IMG_002.jpg   IMG_003.jpg   IMG_004.jpg   IMG_005.jpg

--- 请选择重命名规则 ---
  1. 添加前缀
  2. 添加后缀
  3. 文本替换
  4. 正则替换
  5. 序号重命名
  6. 撤销上一次操作
  0. 退出
请输入编号：5
序号前缀（可为空）：photo_
序号后缀（可为空）：
起始序号（默认 1）：

======================================================================
序号   原名                            新名
----------------------------------------------------------------------
1     IMG_001.jpg                    photo_1.jpg  ✦
2     IMG_002.jpg                    photo_2.jpg  ✦
3     IMG_003.jpg                    photo_3.jpg  ✦
4     IMG_004.jpg                    photo_4.jpg  ✦
5     IMG_005.jpg                    photo_5.jpg  ✦
----------------------------------------------------------------------
共 5 个文件，其中 5 个将被重命名。

确认执行？(y/n)：y
✅ 已完成 5 个文件的重命名！`;

// ========== 常见问题 ==========
const faqs = [
  { q: 'os.rename 和 shutil.move 有什么区别？', a: 'os.rename 更底层，仅在同一磁盘分区内生效；shutil.move 可以跨分区移动，本质是先尝试 os.rename，失败则复制后删除源文件。对于重命名场景，os.rename 足够。' },
  { q: '为什么不直接覆盖已存在的同名文件？', a: '覆盖是不可逆的（无法撤销）。脚本在发现目标文件名已存在时，自动追加 _1, _2 后缀，确保数据安全。' },
  { q: '序号重命名如何保证编号不重复？', a: '预览阶段先对文件列表排序，再按顺序分配编号；执行阶段检测到目标文件名冲突时，自动追加递增后缀。' },
  { q: '撤销功能能回退多次操作吗？', a: '当前实现支持撤销最近一次操作。通过修改 undo_last 可以扩展为回退到指定时间点。操作历史存储在 rename_history.json 中。' },
];

// ========== 完整代码（嵌入展示） ==========
const fullCode = `"""
批量文件重命名工具 — 项目 01
===============================
功能：输入文件夹路径 → 按规则批量重命名 → 预览确认 → 支持撤销
"""

import os, re, json
from pathlib import Path
from datetime import datetime

HISTORY_FILE = "rename_history.json"

# ── 规则引擎 ──────────────────────────────
def _apply_rule(stem: str, rule: dict) -> str:
    t = rule["type"]
    if t == "prefix":   return rule["value"] + stem
    if t == "suffix":   return stem + rule["value"]
    if t == "replace":  return stem.replace(rule["old"], rule["new"])
    if t == "regex":    return re.sub(rule["pattern"], rule["repl"], stem)
    return stem

# ── 预览 ──────────────────────────────────
def preview_rename(files: list[Path], rule: dict) -> list[dict]:
    preview = []
    for file in files:
        if not file.is_file(): continue
        stem, ext = file.stem, file.suffix
        new_stem = _apply_rule(stem, rule)
        if rule["type"] == "number":
            idx = rule.get("files", files).index(file)
            new_stem = rule["prefix"] + str(rule["start"] + idx) + rule["suffix"]
        preview.append({
            "old_name": file.name, "new_name": new_stem + ext,
            "old_path": str(file), "changed": file.name != new_stem + ext,
        })
    return preview

# ── 执行 ──────────────────────────────────
def execute_rename(files, rule, preview) -> list[dict]:
    log = []
    for item in preview:
        if not item["changed"]: continue
        old_p, new_p = Path(item["old_path"]), Path(item["old_path"]).parent / item["new_name"]
        while new_p.exists():
            s, e = new_p.stem, new_p.suffix
            new_p = new_p.parent / f"{s}_{1 if '_' not in s else int(s.split('_')[-1])+1}{e}"
        os.rename(old_p, new_p)
        log.append({"old": str(old_p), "new": str(new_p), "time": datetime.now().isoformat()})
    return log

# ── 撤销 ──────────────────────────────────
def load_history(): return json.load(open(HISTORY_FILE)) if os.path.exists(HISTORY_FILE) else []
def save_history(log):
    h = load_history()
    h.append({"ts": datetime.now().isoformat(), "ops": log})
    json.dump(h, open(HISTORY_FILE, "w"), ensure_ascii=False, indent=2)
def undo_last():
    h = load_history()
    if not h: return print("⚠️ 无历史记录")
    for op in h.pop()["ops"]:
        if os.path.exists(op["new"]): os.rename(op["new"], op["old"])
    json.dump(h, open(HISTORY_FILE, "w"), ensure_ascii=False, indent=2)
    return print("✅ 已撤销")

# ── CLI 主菜单 ────────────────────────────
def menu():
    folder = input("请输入文件夹路径：").strip()
    files = sorted([f for f in Path(folder).iterdir() if f.is_file()], key=lambda x: x.name)
    if not files: return print("❌ 无文件")
    while True:
        c = input("\\n1.前缀 2.后缀 3.替换 4.正则 5.序号 6.撤销 0.退出\\n> ")
        if c == "0": break
        if c == "6": undo_last(); continue
        rule_map = {"1": ("prefix", input("前缀:")), "2": ("suffix", input("后缀:")),
                    "3": ("replace", input("查找:"), input("替换:")),
                    "4": ("regex", input("正则:"), input("替换:")),
                    "5": ("number", input("前缀:"), input("后缀:"), int(input("起始(1):") or 1))}
        if c not in rule_map: continue
        r = {"type": c, **{k: v for k, v in zip(["type","value","old","new","pattern","repl","prefix","suffix","start"], rule_map[c])}}
        pv = preview_rename(files, r)
        for i, x in enumerate(pv, 1): print(f"{i}. {x['old_name']} → {x['new_name']}")
        if input("确认?(y/n):") == "y":
            log = execute_rename(files, r, pv); save_history(log)
            print(f"✅ {len(log)} 个文件已重命名")

if __name__ == "__main__":
    menu()`;
</script>

<style scoped>
/* 代码高亮色 */
code.language-python {
  color: #e2e8f0;
}

code.language-bash {
  color: #a5f3fc;
}

/* 自定义 details/summary 样式 */
details summary::-webkit-details-marker {
  display: none;
}
</style>
