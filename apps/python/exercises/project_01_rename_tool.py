"""
批量文件重命名工具 — 项目 01
===============================
功能：
  1. 输入文件夹路径
  2. 按规则批量重命名（前缀 / 后缀 / 替换 / 序号）
  3. 支持预览，确认后再执行
  4. 支持撤销（记录操作日志）

涉及知识：
  - os / pathlib 文件系统操作
  - re 正则表达式替换
  - shutil / os.rename 文件重命名
  - json 记录操作历史
"""

import os
import re
import shutil
import json
from pathlib import Path
from datetime import datetime

HISTORY_FILE = "rename_history.json"


# ============================================================
#  规则引擎：每一种重命名策略封装为一个函数
# ============================================================

def preview_rename(files: list[Path], rule: dict) -> list[dict]:
    """根据规则生成预览结果，不真正执行。

    参数
    ----
    files : list[Path]
        待重命名的文件列表。
    rule : dict
        { "type": "prefix|suffix|replace|number|regex",
          "value": ... } 不同 type 需要的字段不同。

    返回
    ----
    list[dict] — 每个元素包含 old_name / new_name / changed。
    """
    preview = []
    for file in files:
        if not file.is_file():
            continue
        old_name = file.name
        stem, ext = file.stem, file.suffix
        new_stem = _apply_rule(stem, rule)

        # 序号模式需要对每个文件分别编号
        if rule["type"] == "number":
            new_stem = rule["prefix"] + str(rule["start"] + rule["files"].index(file)) + rule["suffix"]
            rule["files"] = rule.get("files", files)  # 保证 files 可用

        new_name = new_stem + ext
        preview.append({
            "old_name": old_name,
            "new_name": new_name,
            "old_path": str(file),
            "changed": old_name != new_name,
        })

    # 序号模式统一计算
    if rule["type"] == "number":
        preview2 = []
        for i, item in enumerate(preview):
            new_stem = rule["prefix"] + str(rule["start"] + i) + rule["suffix"]
            ext = Path(item["old_name"]).suffix
            item["new_name"] = new_stem + ext
            item["changed"] = item["old_name"] != item["new_name"]
            preview2.append(item)
        preview = preview2

    return preview


def _apply_rule(stem: str, rule: dict) -> str:
    """对单个文件名（不含扩展名）应用规则。"""
    t = rule["type"]
    if t == "prefix":
        return rule["value"] + stem
    elif t == "suffix":
        return stem + rule["value"]
    elif t == "replace":
        return stem.replace(rule["old"], rule["new"])
    elif t == "regex":
        return re.sub(rule["pattern"], rule["repl"], stem)
    elif t == "number":
        # 在 preview_rename 外层统一处理
        return stem
    return stem


def execute_rename(files: list[Path], rule: dict, preview: list[dict]) -> list[dict]:
    """执行重命名，返回操作记录（用于撤销）。

    参数
    ----
    files : list[Path]
    rule : dict
    preview : list[dict] — preview_rename 的输出

    返回
    ----
    list[dict] — 操作日志条目。
    """
    log = []
    for item in preview:
        if not item["changed"]:
            continue
        old_path = Path(item["old_path"])
        new_path = old_path.parent / item["new_name"]

        # 如果目标文件名已存在，自动添加编号避免覆盖
        if new_path.exists():
            stem, ext = new_path.stem, new_path.suffix
            counter = 1
            while new_path.exists():
                new_path = old_path.parent / f"{stem}_{counter}{ext}"
                counter += 1
            item["new_name"] = new_path.name

        os.rename(old_path, new_path)
        log.append({
            "old": str(old_path),
            "new": str(new_path),
            "time": datetime.now().isoformat(),
        })
    return log


# ============================================================
#  撤销 & 历史管理
# ============================================================

def save_history(log: list[dict]) -> None:
    """将操作日志追加保存到 JSON 文件。"""
    history = load_all_history()
    history.append({
        "timestamp": datetime.now().isoformat(),
        "operations": log,
    })
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)


def load_all_history() -> list:
    """加载全部历史记录。"""
    if not os.path.exists(HISTORY_FILE):
        return []
    with open(HISTORY_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def undo_last() -> list[dict]:
    """撤销最近一次重命名操作。"""
    history = load_all_history()
    if not history:
        print("⚠️ 没有可撤销的操作。")
        return []

    last = history.pop()
    restored = []
    for op in last["operations"]:
        if os.path.exists(op["new"]):
            os.rename(op["new"], op["old"])
            restored.append({"old": op["new"], "new": op["old"]})

    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False, indent=2)

    return restored


# ============================================================
#  CLI 交互界面
# ============================================================

def collect_files(folder: str) -> list[Path]:
    """收集文件夹下所有文件（不递归子目录）。"""
    p = Path(folder)
    if not p.exists():
        raise FileNotFoundError(f"文件夹不存在：{folder}")
    return sorted([f for f in p.iterdir() if f.is_file()], key=lambda x: x.name)


def print_preview(preview: list[dict]) -> None:
    """打印预览表格。"""
    print("\n" + "=" * 70)
    print(f"{'序号':<6}{'原名':<30}{'新名':<30}")
    print("-" * 70)
    for i, item in enumerate(preview, 1):
        flag = " ✦" if item["changed"] else ""
        print(f"{i:<6}{item['old_name']:<30}{item['new_name']:<30}{flag}")
    print("-" * 70)
    changed_count = sum(1 for x in preview if x["changed"])
    print(f"共 {len(preview)} 个文件，其中 {changed_count} 个将被重命名。")


def menu() -> None:
    """命令行主菜单。"""
    print("\n" + "=" * 50)
    print("   📁 批量文件重命名工具")
    print("=" * 50)

    folder = input("请输入文件夹路径：").strip()
    try:
        files = collect_files(folder)
    except FileNotFoundError as e:
        print(f"❌ {e}")
        return

    if not files:
        print("❌ 文件夹中没有文件。")
        return

    print(f"\n📂 找到 {len(files)} 个文件：")
    for f in files:
        print(f"   {f.name}")

    while True:
        print("\n--- 请选择重命名规则 ---")
        print("  1. 添加前缀")
        print("  2. 添加后缀")
        print("  3. 文本替换")
        print("  4. 正则替换")
        print("  5. 序号重命名")
        print("  6. 撤销上一次操作")
        print("  0. 退出")

        choice = input("请输入编号：").strip()

        if choice == "0":
            print("👋 再见！")
            break
        elif choice == "6":
            restored = undo_last()
            if restored:
                print(f"✅ 已撤销 {len(restored)} 个文件的重命名。")
                for r in restored:
                    print(f"   {Path(r['old']).name} ← {Path(r['new']).name}")
            continue

        rule = _build_rule(choice)
        if rule is None:
            continue

        preview = preview_rename(files, rule)
        print_preview(preview)

        confirm = input("\n确认执行？(y/n)：").strip().lower()
        if confirm == "y":
            log = execute_rename(files, rule, preview)
            save_history(log)
            print(f"✅ 已完成 {len(log)} 个文件的重命名！")
            files = collect_files(folder)  # 刷新文件列表
        else:
            print("❌ 已取消。")


def _build_rule(choice: str) -> dict | None:
    """根据用户选择构建规则字典。"""
    if choice == "1":
        val = input("请输入要添加的前缀：")
        return {"type": "prefix", "value": val}
    elif choice == "2":
        val = input("请输入要添加的后缀：")
        return {"type": "suffix", "value": val}
    elif choice == "3":
        old = input("请输入要被替换的文本：")
        new = input("请输入替换后的文本：")
        return {"type": "replace", "old": old, "new": new}
    elif choice == "4":
        pat = input("请输入正则表达式（如 \\d+）：")
        repl = input("请输入替换文本：")
        return {"type": "regex", "pattern": pat, "repl": repl}
    elif choice == "5":
        prefix = input("序号前缀（可为空）：")
        suffix = input("序号后缀（可为空）：")
        try:
            start = int(input("起始序号（默认 1）：") or "1")
        except ValueError:
            start = 1
        return {"type": "number", "prefix": prefix, "suffix": suffix, "start": start}
    else:
        print("❌ 无效选项，请重新选择。")
        return None


# ============================================================
#  入口
# ============================================================

if __name__ == "__main__":
    menu()
