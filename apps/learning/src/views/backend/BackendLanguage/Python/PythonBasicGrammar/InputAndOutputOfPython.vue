<template>
  <div class="io-file-guide">
    <!-- 头部 -->
    <header class="guide-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>输入输出与文件操作</h1>
        </div>
        <p class="subtitle">程序与外界交互的桥梁 · 数据持久化基础</p>
        <div class="divider"></div>
        <p class="intro-text">
          Python 提供了简洁的 <code>input()</code> 和 <code>print()</code> 实现控制台交互，
          通过内置的 <code>open()</code> 函数与丰富的文件方法实现文件读写。掌握这些操作是构建实用程序的关键一步。
        </p>
      </div>
    </header>

    <!-- 输入方法区域 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">⌨️</span>
        <h2>输入方法</h2>
      </div>
      <div class="methods-grid">
        <div class="method-card">
          <h3><code>input()</code> — 标准输入</h3>
          <p>从控制台读取一行文本，始终返回字符串。</p>
          <pre class="code-block"><code>name = input("请输入用户名: ")
age = int(input("请输入年龄: "))  # 需手动转换类型</code></pre>
          <div class="note-box small">
            <span>💡 注意：<code>input()</code> 会阻塞程序，直到用户按下回车。</span>
          </div>
        </div>
        <div class="method-card">
          <h3>命令行参数 — <code>sys.argv</code></h3>
          <p>获取执行脚本时传入的命令行参数。</p>
          <pre class="code-block"><code>import sys
script_name = sys.argv[0]
arg1 = sys.argv[1]   # 第一个参数
print(f"参数个数: {len(sys.argv)}")</code></pre>
        </div>
      </div>
    </section>

    <!-- 输出方法区域 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🖨️</span>
        <h2>输出方法</h2>
      </div>
      <div class="methods-grid">
        <div class="method-card">
          <h3><code>print()</code> 基础</h3>
          <p>将对象输出到控制台，可指定分隔符、结束符和输出流。</p>
          <pre class="code-block"><code>print("Hello", "World", sep="-")  # Hello-World
print("Hi", end="!")               # 不以换行结束
print("Error", file=sys.stderr)    # 输出到标准错误</code></pre>
        </div>
        <div class="method-card">
          <h3>格式化输出</h3>
          <ul class="format-list">
            <li><strong>f-string (推荐):</strong> <code>f"值: {value}"</code></li>
            <li><strong>format():</strong> <code>"{}".format(value)</code></li>
            <li><strong>% 旧式:</strong> <code>"%s" % value</code></li>
          </ul>
          <pre class="code-block"><code>name = "Alice"; score = 95.5
print(f"{name} 得分: {score:.1f}")  # Alice 得分: 95.5
print("{0} 得分: {1:.2f}".format(name, score))</code></pre>
        </div>
      </div>
    </section>

    <!-- 文件操作核心区域 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">📂</span>
        <h2>文件操作</h2>
      </div>

      <!-- 打开模式表格 -->
      <h3 class="subsection-title">📝 文件打开模式</h3>
      <div class="table-wrapper">
        <table class="mode-table">
          <thead>
            <tr>
              <th>模式</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mode in fileModes" :key="mode.mode">
              <td><code>{{ mode.mode }}</code></td>
              <td>{{ mode.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 文件读取方法 -->
      <h3 class="subsection-title">📖 文件读取方法</h3>
      <div class="methods-grid">
        <div class="method-card">
          <h4><code>read(size)</code></h4>
          <p>读取指定字节数，无参数则读取全部。</p>
          <pre class="code-block"><code>with open("file.txt", "r") as f:
    content = f.read()          # 读取整个文件
    first_10 = f.read(10)       # 读取10个字符</code></pre>
        </div>
        <div class="method-card">
          <h4><code>readline()</code></h4>
          <p>每次读取一行，返回字符串（含换行符）。</p>
          <pre class="code-block"><code>with open("file.txt", "r") as f:
    line = f.readline()         # 读取第一行
    while line:
        print(line, end="")
        line = f.readline()</code></pre>
        </div>
        <div class="method-card">
          <h4><code>readlines()</code></h4>
          <p>一次性读取所有行，返回列表。</p>
          <pre class="code-block"><code>with open("file.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        print(line.strip())</code></pre>
        </div>
        <div class="method-card">
          <h4><code>遍历文件对象</code></h4>
          <p>文件对象可迭代，内存友好。</p>
          <pre class="code-block"><code>with open("file.txt", "r") as f:
    for line in f:              # 逐行迭代
        print(line.rstrip())</code></pre>
        </div>
      </div>

      <!-- 文件写入方法 -->
      <h3 class="subsection-title">✏️ 文件写入方法</h3>
      <div class="methods-grid">
        <div class="method-card">
          <h4><code>write(str)</code></h4>
          <p>写入字符串到文件，返回写入的字符数。</p>
          <pre class="code-block"><code>with open("output.txt", "w") as f:
    f.write("Hello, World!\n")
    f.write("第二行内容")</code></pre>
        </div>
        <div class="method-card">
          <h4><code>writelines(seq)</code></h4>
          <p>写入字符串序列，不会自动添加换行符。</p>
          <pre class="code-block"><code>lines = ["第一行\n", "第二行\n"]
with open("output.txt", "w") as f:
    f.writelines(lines)</code></pre>
        </div>
      </div>

      <!-- 上下文管理器与异常处理 -->
      <h3 class="subsection-title">🔒 上下文管理器 <code>with</code></h3>
      <div class="note-block">
        <p>使用 <code>with</code> 语句可以自动关闭文件，即使发生异常也能保证资源释放。</p>
        <pre class="code-block"><code>with open("data.txt", "r") as file:
    content = file.read()
# 文件在这里自动关闭，无需手动调用 close()</code></pre>
      </div>

      <h3 class="subsection-title">⚠️ 异常处理</h3>
      <div class="note-block">
        <pre class="code-block"><code>try:
    with open("nonexistent.txt", "r") as f:
        data = f.read()
except FileNotFoundError:
    print("文件不存在")
except PermissionError:
    print("没有读取权限")
except IOError as e:
    print(f"IO错误: {e}")</code></pre>
      </div>
    </section>

    <!-- 路径与os模块 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🗂️</span>
        <h2>常用路径与文件操作模块</h2>
      </div>
      <div class="methods-grid">
        <div class="method-card">
          <h4><code>os</code> 模块</h4>
          <ul class="os-list">
            <li><code>os.getcwd()</code> — 当前工作目录</li>
            <li><code>os.listdir(path)</code> — 列出目录内容</li>
            <li><code>os.mkdir(name)</code> — 创建目录</li>
            <li><code>os.remove(file)</code> — 删除文件</li>
            <li><code>os.path.exists(path)</code> — 判断路径是否存在</li>
            <li><code>os.path.join(a, b)</code> — 拼接路径</li>
          </ul>
        </div>
        <div class="method-card">
          <h4><code>shutil</code> 模块</h4>
          <ul class="os-list">
            <li><code>shutil.copy(src, dst)</code> — 复制文件</li>
            <li><code>shutil.move(src, dst)</code> — 移动文件</li>
            <li><code>shutil.rmtree(path)</code> — 删除目录树</li>
          </ul>
        </div>
        <div class="method-card">
          <h4><code>pathlib</code> (面向对象路径)</h4>
          <pre class="code-block"><code>from pathlib import Path
p = Path("data/file.txt")
if p.exists():
    print(p.read_text())
p.write_text("新内容")</code></pre>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="guide-footer">
      <p>🔧 掌握文件 I/O 是数据处理和脚本自动化的核心技能。结合 <code>with</code> 和最合适的读取方式，让代码既安全又高效。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 文件打开模式数据
interface FileMode {
  mode: string;
  desc: string;
}

const fileModes: FileMode[] = [
  { mode: 'r', desc: '只读模式（默认）。文件必须存在，否则报错。' },
  { mode: 'w', desc: '写入模式。文件不存在则新建，存在则清空内容。' },
  { mode: 'a', desc: '追加模式。文件不存在则新建，存在则在末尾追加内容。' },
  { mode: 'x', desc: '排他性创建模式。文件已存在则报错，不存在则新建。' },
  { mode: 'b', desc: '二进制模式（可与其他模式组合，如 rb, wb）。' },
  { mode: 't', desc: '文本模式（默认，如 rt）。' },
  { mode: '+', desc: '更新模式（读写），如 r+, w+。' },
];
</script>

<style lang="less" scoped>
// ========== 简约现代变量 ==========
@primary-blue: #306998;
@primary-yellow: #FFD43B;
@bg-page: #f8fafc;
@card-bg: #ffffff;
@text-dark: #1e293b;
@text-soft: #475569;
@text-light: #64748b;
@border-light: #e2e8f0;
@code-bg: #1e293b;
@code-text: #e2e8f0;
@shadow-sm: 0 6px 14px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.02);
@shadow-hover: 0 12px 24px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.02);
@border-radius-lg: 24px;
@border-radius-md: 16px;
@transition: all 0.2s ease;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.io-file-guide {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: @bg-page;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

// ----- 头部 -----
.guide-header {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 2.2rem 2.5rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;

  .header-content {
    .title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 0.5rem;

      .python-icon {
        font-size: 3.2rem;
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, @primary-blue 0%, #1e4a6b 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
    }

    .subtitle {
      font-size: 1.3rem;
      font-weight: 500;
      color: @primary-blue;
      margin-bottom: 1rem;
    }

    .divider {
      width: 60px;
      height: 4px;
      background: @primary-yellow;
      border-radius: 4px;
      margin: 1.2rem 0 1.5rem;
    }

    .intro-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: @text-soft;
      max-width: 85%;

      code {
        background: #ecfdf3;
        padding: 0.2rem 0.4rem;
        border-radius: 6px;
        color: #0f5c3e;
      }
    }
  }
}

// ----- 通用卡片 -----
.section-card {
  background: @card-bg;
  border-radius: @border-radius-lg;
  padding: 1.8rem 2rem;
  box-shadow: @shadow-sm;
  border: 1px solid @border-light;
  transition: @transition;

  &:hover {
    box-shadow: @shadow-hover;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.8rem;
    border-bottom: 1.5px dashed @border-light;
    padding-bottom: 0.8rem;

    .section-icon {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 650;
      color: @text-dark;
    }
  }

  .subsection-title {
    font-size: 1.4rem;
    font-weight: 650;
    color: @text-dark;
    margin: 1.8rem 0 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid @border-light;
  }
}

// 方法网格
.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.method-card {
  background: #fbfdff;
  border-radius: @border-radius-md;
  padding: 1.2rem 1.4rem;
  border: 1px solid @border-light;

  h3,
  h4 {
    font-size: 1.2rem;
    font-weight: 650;
    margin-bottom: 0.8rem;
    color: @text-dark;
  }

  p {
    color: @text-soft;
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }

  .code-block {
    background: @code-bg;
    color: @code-text;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    overflow-x: auto;
    line-height: 1.5;

    code {
      background: transparent;
    }
  }
}

// 表格样式
.table-wrapper {
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.mode-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.8rem 1.2rem;
    text-align: left;
    border-bottom: 1px solid @border-light;
  }

  th {
    font-weight: 600;
    color: @primary-blue;
    background: #f9fbfd;
  }

  td code {
    background: #ecfdf3;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    color: #0f5c3e;
  }
}

.format-list {
  list-style: none;
  margin: 0.5rem 0;

  li {
    padding: 0.2rem 0;
  }
}

.note-box {
  background: #fef3e7;
  border-left: 4px solid @primary-yellow;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  margin: 1rem 0;

  &.small {
    padding: 0.5rem 1rem;
  }

  p {
    color: #7a4e1a;
    margin-bottom: 0.5rem;
  }

  .code-block {
    margin-top: 0.5rem;
  }
}

.os-list {
  list-style: none;

  li {
    padding: 0.3rem 0;

    code {
      background: #ecfdf3;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
    }
  }
}

// 底部
.guide-footer {
  text-align: center;
  margin-top: 0.5rem;

  p {
    background: @card-bg;
    display: inline-block;
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    box-shadow: @shadow-sm;
    border: 1px solid @border-light;
    color: @text-light;
  }
}

// 响应式
@media (max-width:768px) {
  .io-file-guide {
    padding: 1.2rem 1rem;
  }

  .guide-header {
    padding: 1.8rem 1.5rem;

    .header-content .title-row h1 {
      font-size: 2.2rem;
    }
  }

  .methods-grid {
    grid-template-columns: 1fr;
  }
}
</style>
