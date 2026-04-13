<template>
  <div class="link-container">
    <div class="link-card">
      <!-- 头部 -->
      <div class="header">
        <h1>
          <span class="header-icon">🔗</span>
          软链接 vs 硬链接
        </h1>
        <p class="subtitle">理解 Linux/Unix 文件系统中的链接机制 · 从 inode 到使用场景</p>
      </div>

      <!-- 核心对比区域（双卡片） -->
      <div class="comparison-grid">
        <!-- 硬链接卡片 -->
        <div class="concept-card hard-link">
          <div class="card-header">
            <span class="card-icon">📎</span>
            <h2>硬链接 <span class="badge">Hard Link</span></h2>
          </div>
          <div class="card-content">
            <div class="definition">
              <strong>多个文件名指向同一个 inode</strong>，本质是文件的别名，与原始文件完全平等。
            </div>
            <div class="command-block">
              <span class="cmd-label">创建命令</span>
              <code class="command">ln 源文件 硬链接文件</code>
            </div>
            <ul class="feature-list">
              <li><span class="check">✓</span> 共享同一 inode 和数据块</li>
              <li><span class="check">✓</span> 删除任意一个文件名不影响数据</li>
              <li><span class="check">✓</span> 仅当链接计数归零时数据才被释放</li>
              <li><span class="cross">✗</span> 不能跨文件系统</li>
              <li><span class="cross">✗</span> 不能链接目录（防止循环）</li>
            </ul>
            <div class="stat">
              <span>🔢 链接计数示例：</span>
              <code>ls -l</code> 输出中的数字即为硬链接数
            </div>
          </div>
        </div>

        <!-- 软链接卡片 -->
        <div class="concept-card soft-link">
          <div class="card-header">
            <span class="card-icon">🔗</span>
            <h2>软链接 <span class="badge">Symbolic Link</span></h2>
          </div>
          <div class="card-content">
            <div class="definition">
              <strong>一个特殊文件，存储目标路径的字符串</strong>，类似于 Windows 快捷方式。
            </div>
            <div class="command-block">
              <span class="cmd-label">创建命令</span>
              <code class="command">ln -s 目标文件 软链接文件</code>
            </div>
            <ul class="feature-list">
              <li><span class="check">✓</span> 拥有独立的 inode</li>
              <li><span class="check">✓</span> 可以跨文件系统</li>
              <li><span class="check">✓</span> 可以链接目录</li>
              <li><span class="cross">✗</span> 源文件删除后链接失效（悬空链接）</li>
              <li><span class="cross">✗</span> 多一次路径解析，性能略低</li>
            </ul>
            <div class="stat">
              <span>🔍 查看链接指向：</span>
              <code>ls -l</code> 会显示 <code>-> target</code>
            </div>
          </div>
        </div>
      </div>

      <!-- 底层实现深度对比 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">⚙️</span>
          <h2>底层实现对比</h2>
        </div>
        <div class="impl-grid">
          <div class="impl-item">
            <div class="impl-title">📦 硬链接实现</div>
            <p>目录项中的文件名直接指向 inode 号。多个目录项可以映射到同一个 inode，内核维护该 inode 的<strong>链接计数</strong>。删除文件时，链接计数减一，仅当计数为 0
              且无进程打开时，inode 和数据块才被回收。</p>
            <div class="mini-diagram">
              <span>文件名A → inode 256 (计数=2) ← 文件名B</span>
            </div>
          </div>
          <div class="impl-item">
            <div class="impl-title">📁 软链接实现</div>
            <p>软链接本身是一个<strong>普通文件</strong>，拥有自己的 inode 和数据块。其数据块内容为目标文件的路径字符串。访问软链接时，VFS 识别到文件类型为符号链接，解析其内容并重定向到目标路径。
            </p>
            <div class="mini-diagram">
              <span>软链接文件 (inode 789) → 内容:"/home/user/target"</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <span class="section-icon">🎯</span>
          <h2>典型使用场景</h2>
        </div>
        <div class="scenes-container">
          <div class="scene-group">
            <h3>🔹 硬链接场景</h3>
            <ul>
              <li><strong>备份与快照</strong> — 创建文件副本而不占用额外空间（如 <code>cp -l</code>）。</li>
              <li><strong>防止误删</strong> — 为重要文件创建硬链接，即使删除原文件名数据仍在。</li>
              <li><strong>版本管理</strong> — 部分备份工具利用硬链接节省空间（如 rsync 的 <code>--link-dest</code>）。</li>
              <li><strong>容器/镜像分层</strong> — Docker 镜像层间通过硬链接共享文件。</li>
            </ul>
          </div>
          <div class="scene-group">
            <h3>🔸 软链接场景</h3>
            <ul>
              <li><strong>库版本管理</strong> — <code>libfoo.so.2 -> libfoo.so.2.1.0</code>，便于切换版本。</li>
              <li><strong>路径简化/重定向</strong> — 将长路径映射到短路径，或重定向配置文件位置。</li>
              <li><strong>跨文件系统链接</strong> — 将家目录中的文件夹链接到其他挂载点。</li>
              <li><strong>开发环境切换</strong> — 使用软链接快速切换 Node.js、Python 等版本。</li>
              <li><strong>系统级维护</strong> — <code>/usr/bin/python -> python3</code> 等默认程序指向。</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 底部 -->
      <div class="footer-note">
        <span>💡 硬链接共享 inode，软链接存储路径 —— 选择合适的链接，优化存储与维护。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无额外逻辑
</script>

<style lang="less" scoped>
// 设计变量
@primary-dark: #1e3a5f;
@primary-mid: #2b5a7a;
@accent-soft: #4f8db3;
@bg-light: #fafcff;
@card-bg: #ffffff;
@border-light: #dee9f2;
@text-main: #1f3a4e;
@text-muted: #4e6e8c;

.link-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #f2f7fd 0%, #e7eef6 100%);
  padding: 2.5rem 1.5rem;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
}

.link-card {
  max-width: 1200px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 36px;
  box-shadow: 0 25px 50px -12px rgba(0, 20, 40, 0.12), 0 8px 20px -8px rgba(0, 0, 0, 0.05);
  padding: 2.5rem 2.8rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 30px 60px -14px rgba(15, 45, 70, 0.16);
  }

  @media (max-width: 640px) {
    padding: 1.8rem 1.5rem;
    border-radius: 28px;
  }
}

.header {
  margin-bottom: 2.2rem;
  border-bottom: 1px solid @border-light;
  padding-bottom: 1.5rem;

  h1 {
    font-size: 2.6rem;
    font-weight: 650;
    letter-spacing: -0.02em;
    margin: 0 0 0.25rem 0;
    color: @primary-dark;
    display: flex;
    align-items: center;
    gap: 12px;

    .header-icon {
      font-size: 2.4rem;
      background: #e3eaf2;
      width: 60px;
      height: 60px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      box-shadow: inset 0 1px 2px white, 0 6px 10px -2px rgba(0, 35, 70, 0.06);
    }

    @media (max-width: 480px) {
      font-size: 2rem;

      .header-icon {
        width: 48px;
        height: 48px;
        font-size: 2rem;
      }
    }
  }

  .subtitle {
    font-size: 1.15rem;
    color: @text-muted;
    margin: 0.6rem 0 0 0;
    font-weight: 400;
  }
}

// 对比双卡片
.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-bottom: 2.5rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.concept-card {
  background: @bg-light;
  border-radius: 28px;
  padding: 1.8rem 1.8rem 2rem;
  border: 1px solid @border-light;
  box-shadow: 0 10px 18px -8px rgba(0, 20, 40, 0.04);
  transition: all 0.15s ease;

  &:hover {
    background: white;
    border-color: #c9daea;
    box-shadow: 0 16px 26px -10px rgba(27, 58, 90, 0.08);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px dashed #ccdbea;

    .card-icon {
      font-size: 2.2rem;
      background: white;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
    }

    h2 {
      font-size: 1.7rem;
      font-weight: 620;
      margin: 0;
      color: @primary-dark;
      letter-spacing: -0.3px;
      display: flex;
      align-items: center;
      gap: 8px;

      .badge {
        font-size: 0.8rem;
        background: #e2ebf3;
        padding: 0.2rem 0.8rem;
        border-radius: 30px;
        color: @primary-mid;
        font-weight: 500;
        border: 1px solid #c1d4e5;
      }
    }
  }

  .definition {
    font-size: 1rem;
    line-height: 1.5;
    color: @text-main;
    background: white;
    padding: 0.9rem 1.2rem;
    border-radius: 20px;
    margin-bottom: 1.5rem;
    border: 1px solid #e2ebf3;
  }

  .command-block {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1.2rem;
    flex-wrap: wrap;

    .cmd-label {
      font-weight: 600;
      color: @primary-mid;
      background: #eef3f9;
      padding: 0.2rem 1rem;
      border-radius: 30px;
      font-size: 0.85rem;
    }

    .command {
      background: #0f1e2c;
      color: #e2e8f0;
      padding: 6px 14px;
      border-radius: 28px;
      font-family: 'SF Mono', 'Menlo', monospace;
      font-size: 0.95rem;
      box-shadow: inset 0 0 0 1px #2d4259;
    }
  }

  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.2rem 0;

    li {
      padding: 0.35rem 0;
      color: @text-main;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 8px;

      .check {
        color: #2e7d32;
        font-weight: bold;
        width: 18px;
      }

      .cross {
        color: #b33;
        font-weight: bold;
        width: 18px;
      }
    }
  }

  .stat {
    background: #ecf3fa;
    padding: 0.6rem 1rem;
    border-radius: 18px;
    font-size: 0.9rem;
    color: @primary-mid;
    border: 1px solid #d1e0ee;

    code {
      background: #1a2e40;
      color: #d4e2f0;
      padding: 2px 8px;
      border-radius: 20px;
      font-family: monospace;
    }
  }
}

// 通用章节样式
.section {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.5rem;

  .section-icon {
    font-size: 1.8rem;
    background: #eef3f8;
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    color: @primary-mid;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 580;
    margin: 0;
    color: @primary-mid;
  }
}

// 底层实现网格
.impl-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.impl-item {
  background: #f9fcff;
  padding: 1.4rem 1.8rem;
  border-radius: 22px;
  border: 1px solid @border-light;

  .impl-title {
    font-weight: 650;
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    color: @primary-dark;
  }

  p {
    margin: 0 0 1rem 0;
    line-height: 1.6;
    color: @text-main;
  }

  .mini-diagram {
    background: #e2eaf2;
    padding: 0.6rem 1rem;
    border-radius: 40px;
    font-family: monospace;
    font-size: 0.9rem;
    color: #1e3a5f;
    text-align: center;
    border: 1px solid #b9cee3;
  }
}

// 场景区域
.scenes-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.scene-group {
  background: @bg-light;
  border-radius: 24px;
  padding: 1.3rem 1.6rem;
  border: 1px solid @border-light;

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 0.8rem 0;
    color: @primary-dark;
  }

  ul {
    margin: 0;
    padding-left: 1.4rem;

    li {
      margin-bottom: 0.6rem;
      color: @text-main;
      line-height: 1.5;

      strong {
        color: @primary-mid;
      }

      code {
        background: #eef3f8;
        padding: 2px 6px;
        border-radius: 16px;
        font-family: monospace;
        font-size: 0.9rem;
      }
    }
  }
}

.footer-note {
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid @border-light;
  padding-top: 1.8rem;

  span {
    background: #ecf3fa;
    padding: 0.4rem 1.8rem;
    border-radius: 60px;
    color: @text-muted;
    font-weight: 450;
    border: 1px solid #d1e0ee;
    display: inline-block;
    backdrop-filter: blur(4px);
  }
}

code {
  font-family: 'SF Mono', 'Menlo', 'Monaco', 'Cascadia Code', 'Consolas', monospace;
}
</style>
