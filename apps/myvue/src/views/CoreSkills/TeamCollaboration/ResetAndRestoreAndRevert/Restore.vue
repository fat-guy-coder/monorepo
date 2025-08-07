<template>
  <div class="git-restore-container">
    <header class="header">
      <h1 class="title">Git Restore 命令指南</h1>
      <p class="subtitle">高效管理工作区和暂存区的文件状态</p>
    </header>

    <div class="content-wrapper">
      <section class="section">
        <div class="section-header">
          <h2><i class="icon fas fa-lightbulb"></i> 概念与作用</h2>
        </div>
        <div class="section-content">
          <p>
            <code>git restore</code> 是 Git 2.23 版本引入的新命令，用于替代部分 <code>git checkout</code> 和 <code>git reset</code> 的功能。
          </p>
          <div class="card">
            <div class="card-header">核心作用</div>
            <ul>
              <li>恢复工作目录中未暂存的修改</li>
              <li>将文件从暂存区移回工作区</li>
              <li>恢复指定提交版本的文件</li>
            </ul>
          </div>
          <div class="note">
            <i class="fas fa-exclamation-circle"></i>
            注意：<code>git restore</code> 只影响工作区和暂存区，不会修改提交历史
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2><i class="icon fas fa-cogs"></i> 主要参数</h2>
        </div>
        <div class="section-content">
          <div class="parameter-grid">
            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">无参数</code>
                <span class="param-badge">常用</span>
              </div>
              <div class="param-description">
                撤销工作区的修改，恢复到暂存区或最新提交的状态
              </div>
              <div class="example">
                <div class="example-title">示例：</div>
                <pre>git restore file.txt</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--staged</code>
                <span class="param-badge">重要</span>
              </div>
              <div class="param-description">
                将暂存区的文件移回工作区，但保留工作区的修改
              </div>
              <div class="example">
                <div class="example-title">示例：</div>
                <pre>git restore --staged file.txt</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--source</code>
                <span class="param-badge">高级</span>
              </div>
              <div class="param-description">
                从指定提交恢复文件（默认是HEAD）
              </div>
              <div class="example">
                <div class="example-title">示例：</div>
                <pre>git restore --source HEAD~2 file.txt</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--worktree</code>
                <span class="param-badge">显式指定</span>
              </div>
              <div class="param-description">
                显式指定恢复工作区文件（默认行为）
              </div>
              <div class="example">
                <div class="example-title">示例：</div>
                <pre>git restore --worktree file.txt</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-header">
          <h2><i class="icon fas fa-scenario"></i> 使用场景</h2>
        </div>
        <div class="section-content">
          <div class="scenario-list">
            <div class="scenario-card">
              <div class="scenario-icon"><i class="fas fa-undo-alt"></i></div>
              <div>
                <h3>撤销本地修改</h3>
                <p>当你在工作区做了一些修改但尚未暂存，想要放弃这些修改时：</p>
                <pre>git restore file.txt</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon"><i class="fas fa-exchange-alt"></i></div>
              <div>
                <h3>取消暂存</h3>
                <p>当你将文件添加到暂存区后，想要取消暂存但保留工作区的修改：</p>
                <pre>git restore --staged file.txt</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon"><i class="fas fa-history"></i></div>
              <div>
                <h3>恢复旧版本文件</h3>
                <p>当你想将文件恢复到之前的某个提交版本：</p>
                <pre>git restore --source=commit-hash file.txt</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon"><i class="fas fa-bomb"></i></div>
              <div>
                <h3>恢复所有文件</h3>
                <p>当你想要恢复所有修改的文件（包括工作区和暂存区）：</p>
                <pre>git restore .  # 恢复工作区所有文件
git restore --staged .  # 取消所有暂存文件</pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Git Restore 命令总结 | 版本管理最佳实践</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>



.git-restore-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #2d3748;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(120deg, #4f46e5, #7c3aed);
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }

  .subtitle {
    font-size: 1.2rem;
    font-weight: 300;
    opacity: 0.9;
    position: relative;
    z-index: 1;
  }
}

.content-wrapper {
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;
  padding: 16px 24px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    display: flex;
    align-items: center;

    .icon {
      margin-right: 12px;
    }
  }
}

.section-content {
  padding: 24px;

  p {
    line-height: 1.7;
    margin-bottom: 20px;
    color: #4a5568;
  }
}

.card {
  background: #f8fafc;
  border-left: 4px solid #4f46e5;
  border-radius: 0 8px 8px 0;
  padding: 18px;
  margin: 20px 0;

  .card-header {
    font-weight: 600;
    color: #4f46e5;
    margin-bottom: 12px;
    font-size: 1.1rem;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
  }
}

.note {
  background: #e0f2fe;
  border-left: 4px solid #0ea5e9;
  padding: 12px 16px;
  border-radius: 0 6px 6px 0;
  display: flex;
  align-items: flex-start;
  margin: 25px 0;

  i {
    color: #0ea5e9;
    margin-right: 10px;
    margin-top: 3px;
  }
}

.parameter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.parameter-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);

  &:hover {
    border-color: #c7d2fe;
    box-shadow: 0 5px 15px rgba(79, 70, 229, 0.08);
  }

  .param-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .param-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #4f46e5;
  }

  .param-badge {
    background: #eef2ff;
    color: #4f46e5;
    font-size: 0.8rem;
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 600;
  }

  .param-description {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .example {
    background: #f8fafc;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.95rem;

    .example-title {
      font-size: 0.85rem;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 5px;
      font-weight: 600;
    }

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Courier New', monospace;
      color: #334155;
      overflow-x: auto;
      white-space: pre-wrap;
    }
  }
}

.scenario-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.scenario-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
    border-color: #c7d2fe;
  }

  .scenario-icon {
    background: #eef2ff;
    color: #4f46e5;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    flex-shrink: 0;
    font-size: 1.2rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 12px;
    color: #1e293b;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 12px;
  }

  pre {
    background: #f8fafc;
    padding: 10px;
    border-radius: 6px;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.9rem;
    color: #334155;
    overflow-x: auto;
    margin: 0;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: #64748b;
  font-size: 0.9rem;
  border-top: 1px solid #e2e8f0;
}

@media (max-width: 768px) {
  .header .title {
    font-size: 2rem;
  }

  .parameter-grid,
  .scenario-list {
    grid-template-columns: 1fr;
  }

  .scenario-card {
    flex-direction: column;

    .scenario-icon {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
}
</style>
