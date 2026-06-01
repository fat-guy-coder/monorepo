<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- 头部 -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          📁 Python 文件与 IO 操作
        </h1>
        <p class="text-slate-500 mt-2">open · pathlib · shutil · JSON / CSV</p>
        <div class="flex justify-center gap-2 mt-3 text-xs text-slate-400">
          <span>文件读写</span><span>•</span>
          <span>路径处理</span><span>•</span>
          <span>高级复制/移动</span><span>•</span>
          <span>序列化</span>
        </div>
      </div>

      <!-- 卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- 内置 open 函数 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
          <div class="bg-indigo-50 px-4 py-2 border-b border-indigo-100 flex items-center gap-2">
            <span class="text-xl">📄</span>
            <h2 class="font-semibold text-indigo-800">内置 open()</h2>
            <span class="text-xs bg-indigo-200 text-indigo-700 px-2 py-0.5 rounded-full ml-auto">基础 IO</span>
          </div>
          <div class="p-4 space-y-3">
            <p class="text-slate-600 text-sm">读写文本/二进制文件，支持上下文管理器（with）。</p>
            <div class="bg-slate-800 rounded-md p-3 overflow-x-auto">
              <pre class="text-slate-200 text-xs font-mono"><code># 读文本
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# 写文本
with open('out.txt', 'w') as f:
    f.write('Hello, Python!')

# 追加
with open('log.txt', 'a') as f:
    f.write('new line\n')

# 二进制读写图片
with open('img.jpg', 'rb') as src, open('copy.jpg', 'wb') as dst:
    dst.write(src.read())</code></pre>
            </div>
            <div class="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
              <span>🔹 模式: 'r'读, 'w'写, 'a'追加, 'b'二进制</span>
              <span>🔹 务必使用 with 自动关闭</span>
            </div>
          </div>
        </div>

        <!-- pathlib 模块 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
          <div class="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center gap-2">
            <span class="text-xl">🗂️</span>
            <h2 class="font-semibold text-emerald-800">pathlib</h2>
            <span class="text-xs bg-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full ml-auto">面向对象路径</span>
          </div>
          <div class="p-4 space-y-3">
            <p class="text-slate-600 text-sm">面向对象的文件系统路径操作，替代 os.path。</p>
            <div class="bg-slate-800 rounded-md p-3 overflow-x-auto">
              <pre class="text-slate-200 text-xs font-mono"><code>from pathlib import Path

p = Path('./data')
p.mkdir(exist_ok=True)          # 创建目录

# 拼接路径
file_path = p / 'info.txt'
file_path.write_text('content') # 快捷写入

# 读取
text = file_path.read_text()

# 遍历目录
for f in Path('.').glob('*.py'):
    print(f.name, f.stat().st_size)

# 属性
print(file_path.parent, file_path.stem, file_path.suffix)</code></pre>
            </div>
            <div class="text-xs text-slate-500">
              ✨ 推荐使用 Path 对象，支持 / 操作符拼接，跨平台兼容。
            </div>
          </div>
        </div>

        <!-- shutil 高级文件操作 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
          <div class="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-center gap-2">
            <span class="text-xl">📦</span>
            <h2 class="font-semibold text-amber-800">shutil</h2>
            <span class="text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full ml-auto">高级操作</span>
          </div>
          <div class="p-4 space-y-3">
            <p class="text-slate-600 text-sm">复制、移动、删除目录树，压缩打包。</p>
            <div class="bg-slate-800 rounded-md p-3 overflow-x-auto">
              <pre class="text-slate-200 text-xs font-mono"><code>import shutil

# 复制文件
shutil.copy2('src.txt', 'dst.txt')

# 复制整个目录
shutil.copytree('src_dir', 'dst_dir')

# 移动/重命名
shutil.move('old.txt', 'new.txt')

# 删除非空目录
shutil.rmtree('temp_folder')

# 创建压缩包
shutil.make_archive('archive', 'zip', 'folder_name')

# 解压
shutil.unpack_archive('archive.zip', 'extract_dir')</code></pre>
            </div>
            <div class="text-xs text-slate-500">
              ⚡ 注意：rmtree 不可恢复，谨慎使用。
            </div>
          </div>
        </div>

        <!-- JSON / CSV 处理 -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
          <div class="bg-rose-50 px-4 py-2 border-b border-rose-100 flex items-center gap-2">
            <span class="text-xl">📊</span>
            <h2 class="font-semibold text-rose-800">JSON & CSV</h2>
            <span class="text-xs bg-rose-200 text-rose-700 px-2 py-0.5 rounded-full ml-auto">数据序列化</span>
          </div>
          <div class="p-4 space-y-3">
            <p class="text-slate-600 text-sm">读写 JSON 和 CSV 格式数据，内置模块。</p>
            <div class="bg-slate-800 rounded-md p-3 overflow-x-auto">
              <pre class="text-slate-200 text-xs font-mono"><code>import json, csv

# JSON
data = {'name': 'Alice', 'age': 30}
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

with open('data.json') as f:
    loaded = json.load(f)

# CSV
rows = [['name', 'age'], ['Bob', 25], ['Eve', 28]]
with open('data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(rows)

with open('data.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row['name'], row['age'])</code></pre>
            </div>
            <div class="text-xs text-slate-500">
              💡 大 JSON 用 json.load() 逐行读取；CSV 可用 pandas 更强大。
            </div>
          </div>
        </div>
      </div>

      <!-- 额外：临时文件与目录 -->
      <div class="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xl">🧪</span>
          <h2 class="font-semibold text-slate-800">临时文件与目录 (tempfile)</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-slate-800 rounded-md p-3 overflow-x-auto">
            <pre class="text-slate-200 text-xs font-mono"><code>import tempfile

# 临时文件（自动删除）
with tempfile.TemporaryFile(mode='w+') as tf:
    tf.write('temporary data')
    tf.seek(0)
    print(tf.read())

# 临时目录
with tempfile.TemporaryDirectory() as tmpdir:
    print(f'临时目录: {tmpdir}')
    # 在此目录下操作...</code></pre>
          </div>
          <div class="text-sm text-slate-600">
            <p><code>tempfile</code> 模块创建安全的临时文件/目录，退出上下文后自动清理，适合测试和中间数据处理。</p>
          </div>
        </div>
      </div>

      <!-- 总结建议 -->
      <div class="mt-8 text-center text-xs text-slate-400 border-t border-slate-200 pt-5">
        <p>📌 最佳实践：使用 pathlib 处理路径，with 语句管理文件，JSON/CSV 优先使用标准库，大文件考虑逐行读写。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需逻辑
</script>

<style scoped>
/* 微调代码块滚动条 */
pre {
  white-space: pre-wrap;
  word-break: break-word;
}

code {
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
}
</style>
