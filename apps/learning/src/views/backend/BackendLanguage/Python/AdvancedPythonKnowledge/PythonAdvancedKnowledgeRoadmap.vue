<template>
  <div class="advanced-roadmap">
    <!-- 头部 -->
    <header class="roadmap-header">
      <div class="header-content">
        <div class="title-row">
          <span class="python-icon">🐍</span>
          <h1>Python 高阶知识路线图</h1>
        </div>
        <p class="subtitle">从进阶语法到工程化实战 · 系统化成长路径</p>
        <div class="divider"></div>
        <p class="intro-text">
          掌握基础语法后，深入高阶特性是成为专业 Python 开发者的必经之路。
          本路线图涵盖装饰器、并发编程、文件IO、网络、数据库、性能优化及工程部署等核心模块，
          其中<strong>文件操作</strong>作为数据处理的基础，将重点展开详述。
        </p>
      </div>
    </header>

    <!-- 路线图阶段概览 -->
    <section class="section-card">
      <div class="section-header">
        <span class="section-icon">🗺️</span>
        <h2>高阶知识路线图</h2>
        <span class="badge">10 个阶段</span>
      </div>
      <div class="roadmap-phases">
        <div v-for="(phase, index) in roadmapPhases" :key="phase.id" class="phase-card"
          :class="{ highlighted: phase.id === 4 }" :style="{ '--phase-color': phase.color }">
          <div class="phase-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="phase-content">
            <h3>{{ phase.title }}</h3>
            <p>{{ phase.desc }}</p>
            <div class="phase-tags">
              <span v-for="tag in phase.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <div class="phase-highlight" v-if="phase.id === 4">★ 重点</div>
        </div>
      </div>
    </section>

    <!-- 文件操作重点模块 -->
    <section class="section-card file-ops-section">
      <div class="section-header">
        <span class="section-icon">📂</span>
        <h2>文件与IO操作 · 重点详解</h2>
      </div>
      <p class="section-desc">
        文件操作是数据处理、日志记录和配置管理的基础。Python 提供了从基础读写到高级IO的完整工具链。
      </p>

      <!-- 基础概念 -->
      <h3 class="sub-title">📌 核心概念</h3>
      <div class="concept-row">
        <div class="concept-item">
          <span class="concept-icon">📄</span>
          <div>
            <strong>文件对象 (File Object)</strong>
            <p>通过 <code>open()</code> 返回，提供读写、定位等方法。</p>
          </div>
        </div>
        <div class="concept-item">
          <span class="concept-icon">🔤</span>
          <div>
            <strong>文本模式 vs 二进制模式</strong>
            <p>文本模式自动处理编码/换行，二进制模式处理原始字节。</p>
          </div>
        </div>
        <div class="concept-item">
          <span class="concept-icon">🔄</span>
          <div>
            <strong>缓冲 (Buffering)</strong>
            <p>默认全缓冲，可设置行缓冲或无缓冲以控制性能。</p>
          </div>
        </div>
      </div>

      <!-- 文件打开模式 -->
      <h3 class="sub-title">📝 文件打开模式</h3>
      <div class="table-wrapper">
        <table class="mode-table">
          <thead>
            <tr>
              <th>模式</th>
              <th>描述</th>
              <th>文件不存在</th>
              <th>文件存在</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mode in fileModes" :key="mode.mode">
              <td><code>{{ mode.mode }}</code></td>
              <td>{{ mode.desc }}</td>
              <td>{{ mode.notExist }}</td>
              <td>{{ mode.exist }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 基础操作示例 -->
      <h3 class="sub-title">📖 读取方法</h3>
      <div class="code-grid">
        <div class="code-card">
          <h4><code>read(size)</code></h4>
          <p>读取指定字节/字符数，无参数读取全部。</p>
          <pre class="code-block"><code>with open('file.txt', 'r') as f:
    content = f.read()       # 读取全部
    chunk = f.read(1024)     # 读取1KB</code></pre>
        </div>
        <div class="code-card">
          <h4><code>readline()</code></h4>
          <p>每次读取一行，保留换行符。</p>
          <pre class="code-block"><code>with open('file.txt', 'r') as f:
    line = f.readline()
    while line:
        print(line.strip())
        line = f.readline()</code></pre>
        </div>
        <div class="code-card">
          <h4><code>readlines()</code></h4>
          <p>一次性读取所有行，返回列表。</p>
          <pre class="code-block"><code>with open('file.txt', 'r') as f:
    lines = f.readlines()
    for line in lines:
        print(line.rstrip())</code></pre>
        </div>
        <div class="code-card">
          <h4>迭代文件对象</h4>
          <p>逐行迭代，内存友好，推荐大文件使用。</p>
          <pre class="code-block"><code>with open('large.txt', 'r') as f:
    for line in f:
        process(line)</code></pre>
        </div>
      </div>

      <!-- 写入方法 -->
      <h3 class="sub-title">✏️ 写入方法</h3>
      <div class="code-grid two-col">
        <div class="code-card">
          <h4><code>write(str)</code></h4>
          <p>写入字符串，返回写入字符数。需手动添加换行。</p>
          <pre class="code-block"><code>with open('output.txt', 'w') as f:
    f.write("第一行\n")
    f.write("第二行\n")</code></pre>
        </div>
        <div class="code-card">
          <h4><code>writelines(seq)</code></h4>
          <p>写入字符串序列，不自动添加换行符。</p>
          <pre class="code-block"><code>lines = ["line1\n", "line2\n"]
with open('output.txt', 'w') as f:
    f.writelines(lines)</code></pre>
        </div>
      </div>

      <!-- 上下文管理器与异常处理 -->
      <h3 class="sub-title">🔒 上下文管理器与异常处理</h3>
      <div class="code-grid two-col">
        <div class="code-card">
          <h4>with 语句（推荐）</h4>
          <p>自动关闭文件，即使发生异常也能保证资源释放。</p>
          <pre class="code-block"><code>with open('data.txt', 'r') as f:
    content = f.read()
# 此处文件已自动关闭</code></pre>
        </div>
        <div class="code-card">
          <h4>异常处理</h4>
          <p>捕获常见IO异常，保证程序健壮性。</p>
          <pre class="code-block"><code>try:
    with open('file.txt', 'r') as f:
        data = f.read()
except FileNotFoundError:
    print("文件不存在")
except PermissionError:
    print("无权限访问")
except IOError as e:
    print(f"IO错误: {e}")</code></pre>
        </div>
      </div>

      <!-- 序列化操作 -->
      <h3 class="sub-title">📦 序列化与反序列化</h3>
      <div class="code-grid three-col">
        <div class="code-card">
          <h4>JSON</h4>
          <p>轻量级数据交换格式，跨语言通用。</p>
          <pre class="code-block"><code>import json
# 写入
data = {"name": "Alice", "age": 30}
with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)
# 读取
with open('data.json', 'r') as f:
    loaded = json.load(f)</code></pre>
        </div>
        <div class="code-card">
          <h4>CSV</h4>
          <p>表格数据常用格式，可使用 csv 模块或 pandas。</p>
          <pre class="code-block"><code>import csv
# 写入
with open('data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['name', 'age'])
    writer.writerow(['Bob', 25])
# 读取
with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)</code></pre>
        </div>
        <div class="code-card">
          <h4>pickle</h4>
          <p>Python 原生序列化，支持复杂对象。注意安全风险。</p>
          <pre class="code-block"><code>import pickle
# 序列化
data = {"func": lambda x: x*2}
with open('data.pkl', 'wb') as f:
    pickle.dump(data, f)
# 反序列化
with open('data.pkl', 'rb') as f:
    loaded = pickle.load(f)</code></pre>
        </div>
      </div>

      <!-- 路径操作 -->
      <h3 class="sub-title">🗂️ 路径操作</h3>
      <div class="code-grid two-col">
        <div class="code-card">
          <h4>os.path (传统方式)</h4>
          <pre class="code-block"><code>import os
os.path.exists('file.txt')      # 是否存在
os.path.join('dir', 'file.txt') # 拼接路径
os.path.dirname('/a/b/c.txt')   # 目录部分
os.path.basename('/a/b/c.txt')  # 文件名
os.path.splitext('f.txt')       # ('f', '.txt')
os.path.getsize('file.txt')     # 文件大小</code></pre>
        </div>
        <div class="code-card">
          <h4>pathlib (面向对象，推荐)</h4>
          <pre class="code-block"><code>from pathlib import Path
p = Path('dir/file.txt')
p.exists()          # 是否存在
p.parent            # 父目录
p.name              # 文件名
p.stem              # 无扩展名
p.suffix            # 扩展名
p.read_text()       # 读取文本
p.write_text('hi')  # 写入文本
p.stat().st_size    # 文件大小</code></pre>
        </div>
      </div>

      <!-- 高级IO操作 -->
      <h3 class="sub-title">🚀 高级IO操作</h3>
      <div class="advanced-io-grid">
        <div class="io-item">
          <h4><code>shutil</code> — 高级文件操作</h4>
          <pre class="code-block"><code>import shutil
shutil.copy('src.txt', 'dst.txt')    # 复制文件
shutil.move('src.txt', 'dir/')       # 移动文件
shutil.rmtree('dir/')                # 递归删除目录
shutil.make_archive('backup', 'zip', 'dir/')  # 打包</code></pre>
        </div>
        <div class="io-item">
          <h4><code>tempfile</code> — 临时文件</h4>
          <pre class="code-block"><code>import tempfile
with tempfile.NamedTemporaryFile(delete=False) as tmp:
    tmp.write(b'temporary data')
    print(tmp.name)  # 临时文件路径</code></pre>
        </div>
        <div class="io-item">
          <h4><code>mmap</code> — 内存映射</h4>
          <pre class="code-block"><code>import mmap
with open('file.txt', 'r+b') as f:
    with mmap.mmap(f.fileno(), 0) as m:
        print(m.readline())  # 像操作内存一样操作文件</code></pre>
        </div>
        <div class="io-item">
          <h4><code>io</code> 模块 — 流处理</h4>
          <pre class="code-block"><code>from io import StringIO, BytesIO
# 内存中的文本流
sio = StringIO("hello\nworld")
print(sio.readline())  # hello
# 内存中的字节流
bio = BytesIO(b'binary data')</code></pre>
        </div>
      </div>

      <!-- 文件定位与状态 -->
      <h3 class="sub-title">📍 文件定位与状态</h3>
      <div class="code-grid two-col">
        <div class="code-card">
          <h4>文件指针操作</h4>
          <pre class="code-block"><code>with open('file.txt', 'r') as f:
    f.seek(0)          # 移到开头
    f.seek(0, 2)       # 移到末尾
    pos = f.tell()     # 获取当前位置</code></pre>
        </div>
        <div class="code-card">
          <h4>获取文件信息</h4>
          <pre class="code-block"><code>import os
stat = os.stat('file.txt')
stat.st_size     # 文件大小(字节)
stat.st_mtime    # 最后修改时间戳
stat.st_mode     # 文件权限模式</code></pre>
        </div>
      </div>

      <div class="note-box">
        <span>💡 最佳实践：始终使用 <code>with</code> 语句处理文件；大文件使用迭代方式逐行读取；优先使用 <code>pathlib</code> 进行路径操作；敏感数据避免使用
          <code>pickle</code>。</span>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="roadmap-footer">
      <p>🚀 持续学习，持续实践。高阶知识的掌握需要在实际项目中不断锤炼。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 路线图阶段数据
interface RoadmapPhase {
  id: number
  title: string
  desc: string
  tags: string[]
  color: string
}

const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    title: '进阶语法精进',
    desc: '掌握装饰器、生成器、上下文管理器、描述符与元类等核心进阶特性。',
    tags: ['装饰器', '生成器', '上下文管理器', '描述符', '元类', '运算符重载'],
    color: '#306998'
  },
  {
    id: 2,
    title: '面向对象进阶',
    desc: '深入理解SOLID原则、设计模式、Mixin、抽象基类与数据类。',
    tags: ['SOLID', '设计模式', 'Mixin', 'ABC', 'dataclass', '属性管理'],
    color: '#3a7ca5'
  },
  {
    id: 3,
    title: '并发与异步编程',
    desc: '理解GIL机制，掌握线程、进程、asyncio与协程的适用场景。',
    tags: ['线程', '进程', 'asyncio', '协程', 'GIL', 'concurrent.futures'],
    color: '#2b5f7a'
  },
  {
    id: 4,
    title: '文件与IO操作 ★',
    desc: '掌握文件读写、序列化、路径操作及高级IO技术，详见下方详解。',
    tags: ['文件读写', 'JSON/CSV', '序列化', 'pathlib', 'shutil', '流处理'],
    color: '#1e5f6e'
  },
  {
    id: 5,
    title: '网络编程',
    desc: '学习HTTP协议、Socket编程、REST API设计及WebSocket实时通信。',
    tags: ['HTTP', 'Socket', 'REST API', 'WebSocket', 'requests', 'urllib'],
    color: '#4a6fa5'
  },
  {
    id: 6,
    title: '数据库与ORM',
    desc: '掌握关系型与非关系型数据库操作，熟练使用ORM框架。',
    tags: ['SQLite', 'SQLAlchemy', 'Redis', 'MongoDB', '连接池', '迁移'],
    color: '#2e6b5e'
  },
  {
    id: 7,
    title: '测试与代码质量',
    desc: '编写单元测试、集成测试，使用类型注解与静态分析工具提升代码质量。',
    tags: ['pytest', 'unittest', 'mypy', '类型注解', '覆盖率', 'mock'],
    color: '#8f6b2e'
  },
  {
    id: 8,
    title: '性能优化',
    desc: '掌握性能剖析、缓存策略、C扩展及NumPy等高性能计算技术。',
    tags: ['Profiling', '缓存', 'Cython', 'NumPy', '向量化', '内存优化'],
    color: '#7a4b5c'
  },
  {
    id: 9,
    title: '工程化与部署',
    desc: '学习包管理、虚拟环境、Docker容器化、CI/CD流水线与日志系统。',
    tags: ['打包发布', 'Docker', 'CI/CD', '日志', '配置管理', '监控'],
    color: '#5e4b7a'
  },
  {
    id: 10,
    title: '框架与架构',
    desc: '深入Django/Flask/FastAPI，理解微服务架构、消息队列与系统设计。',
    tags: ['Django', 'FastAPI', '微服务', '消息队列', '认证授权', 'GraphQL'],
    color: '#3f6e5e'
  }
]

// 文件模式数据
interface FileModeData {
  mode: string
  desc: string
  notExist: string
  exist: string
}

const fileModes: FileModeData[] = [
  { mode: 'r', desc: '只读（默认）', notExist: '报错 FileNotFoundError', exist: '从开头读取' },
  { mode: 'w', desc: '写入（清空）', notExist: '创建新文件', exist: '清空后写入' },
  { mode: 'a', desc: '追加写入', notExist: '创建新文件', exist: '从末尾追加' },
  { mode: 'x', desc: '排他创建', notExist: '创建新文件', exist: '报错 FileExistsError' },
  { mode: 'r+', desc: '读写（不截断）', notExist: '报错', exist: '从开头读写' },
  { mode: 'w+', desc: '写读（截断）', notExist: '创建新文件', exist: '清空后读写' },
  { mode: 'a+', desc: '追加读写', notExist: '创建新文件', exist: '从末尾追加，可读' },
  { mode: 'b', desc: '二进制模式（可组合）', notExist: '-', exist: '如上，例: rb, wb, ab' }
]
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

.advanced-roadmap {
  max-width: 1400px;
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
.roadmap-header {
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
        font-size: 2.6rem;
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

    .badge {
      margin-left: auto;
      background: #ecf3fa;
      padding: 0.2rem 1rem;
      border-radius: 30px;
      font-size: 0.8rem;
      font-weight: 600;
      color: @primary-blue;
    }
  }

  .section-desc {
    margin-bottom: 1.5rem;
    color: @text-soft;
    line-height: 1.6;
  }
}

.sub-title {
  font-size: 1.3rem;
  font-weight: 650;
  color: @text-dark;
  margin: 1.8rem 0 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid @border-light;
}

// ----- 路线图阶段网格 -----
.roadmap-phases {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.phase-card {
  background: #fbfdff;
  border-radius: @border-radius-md;
  padding: 1.5rem 1.4rem;
  border: 1px solid @border-light;
  border-left: 5px solid var(--phase-color, @primary-blue);
  transition: @transition;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: @shadow-hover;
  }

  &.highlighted {
    background: #f0fdf6;
    border-color: #2e7d32;

    .phase-number {
      background: #2e7d32;
    }
  }

  .phase-number {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--phase-color, @primary-blue);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .phase-content {
    h3 {
      font-size: 1.2rem;
      font-weight: 650;
      margin-bottom: 0.5rem;
      color: @text-dark;
    }

    p {
      color: @text-soft;
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
  }

  .phase-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    .tag {
      background: #f1f5f9;
      padding: 0.2rem 0.7rem;
      border-radius: 20px;
      font-size: 0.78rem;
      color: @text-soft;
      border: 1px solid @border-light;
    }
  }

  .phase-highlight {
    position: absolute;
    top: 12px;
    right: 15px;
    background: #2e7d32;
    color: white;
    padding: 0.15rem 0.6rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }
}

// 概念行
.concept-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  .concept-item {
    display: flex;
    gap: 12px;

    .concept-icon {
      font-size: 1.8rem;
    }

    strong {
      display: block;
      margin-bottom: 4px;
    }

    p {
      color: @text-soft;
      font-size: 0.9rem;

      code {
        background: #ecfdf3;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
      }
    }
  }
}

// 表格
.table-wrapper {
  overflow-x: auto;
  margin-bottom: 1rem;
}

.mode-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.8rem 1rem;
    text-align: left;
    border-bottom: 1px solid @border-light;
  }

  th {
    font-weight: 600;
    color: @primary-blue;
    background: #f9fbfd;
    font-size: 0.85rem;
  }

  td code {
    background: #ecfdf3;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    color: #0f5c3e;
  }
}

// 代码网格
.code-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1rem;

  &.two-col {
    grid-template-columns: repeat(2, 1fr);
  }

  &.three-col {
    grid-template-columns: repeat(3, 1fr);
  }
}

.code-card {
  background: #fbfdff;
  border-radius: @border-radius-md;
  padding: 1.2rem 1.3rem;
  border: 1px solid @border-light;

  h4 {
    font-size: 1.1rem;
    font-weight: 650;
    margin-bottom: 0.4rem;

    code {
      color: @primary-blue;
    }
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
    font-size: 0.82rem;
    overflow-x: auto;
    line-height: 1.5;

    code {
      background: transparent;
    }
  }
}

// 高级IO网格
.advanced-io-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1rem;

  .io-item {
    background: #fbfdff;
    border-radius: @border-radius-md;
    padding: 1.2rem 1.3rem;
    border: 1px solid @border-light;

    h4 {
      font-size: 1.1rem;
      font-weight: 650;
      margin-bottom: 0.6rem;

      code {
        color: @primary-blue;
      }
    }

    .code-block {
      background: @code-bg;
      color: @code-text;
      padding: 0.8rem 1rem;
      border-radius: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      overflow-x: auto;
      line-height: 1.5;

      code {
        background: transparent;
      }
    }
  }
}

// 提示框
.note-box {
  background: #fef3e7;
  border-left: 4px solid @primary-yellow;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  margin-top: 1rem;

  span {
    color: #7a4e1a;
    font-size: 0.95rem;

    code {
      background: #fef3c7;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
    }
  }
}

// 底部
.roadmap-footer {
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

// 文件操作区域高亮
.file-ops-section {
  border-top: 4px solid #2e7d32;
}

// 响应式
@media (max-width:768px) {
  .advanced-roadmap {
    padding: 1.2rem 1rem;
  }

  .roadmap-header {
    padding: 1.8rem 1.5rem;

    .header-content .title-row h1 {
      font-size: 2rem;
    }
  }

  .roadmap-phases {
    grid-template-columns: 1fr;
  }

  .concept-row {
    grid-template-columns: 1fr;
  }

  .code-grid,
  .code-grid.two-col,
  .code-grid.three-col {
    grid-template-columns: 1fr;
  }

  .advanced-io-grid {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 1.5rem 1.2rem;
  }
}
</style>
