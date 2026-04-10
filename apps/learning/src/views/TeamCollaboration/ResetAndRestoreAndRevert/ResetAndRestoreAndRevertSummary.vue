<template>
  <div class="git-commands-container">
    <header class="header">
      <div class="logo-container">
        <div class="git-logo">
          <div class="git-branch"></div>
          <div class="git-commit" v-for="(commit, index) in commits" :key="index" :style="commitStyle(index)"
            :class="commitClasses(commit)"></div>
        </div>
        <h1>Git 版本控制命令解析</h1>
      </div>
      <p class="subtitle">理解 reset、restore 和 revert 的核心区别与应用场景</p>
    </header>

    <div class="command-section reset">
      <div class="command-header">
        <h2>git reset</h2>
        <div class="command-icon">⏪</div>
      </div>
      <div class="command-content">
        <div class="concept">
          <h3>概念</h3>
          <p><code>git reset</code> 用于移动当前分支的HEAD指针到指定的提交，可以修改提交历史。</p>
        </div>

        <div class="principle">
          <h3>工作原理</h3>
          <p>通过移动HEAD指针和当前分支引用到目标提交，可选择是否修改暂存区和工作目录：</p>
          <ul>
            <li><strong>--soft</strong>：只移动HEAD指针，不修改暂存区和工作目录</li>
            <li><strong>--mixed</strong>（默认）：移动HEAD指针并重置暂存区</li>
            <li><strong>--hard</strong>：移动HEAD指针，重置暂存区和工作目录</li>
          </ul>
        </div>

        <div class="usage">
          <h3>使用场景</h3>
          <ul>
            <li>撤销尚未推送的本地提交</li>
            <li>将暂存区恢复到上次提交的状态</li>
            <li>完全丢弃未提交的更改</li>
            <li>重新组织本地提交历史</li>
          </ul>
        </div>

        <div class="examples">
          <h3>代码示例</h3>
          <div class="code-block">
            <pre><code># 撤销最后一次提交，保留更改在暂存区
git reset --soft HEAD~1

# 撤销最后一次提交，保留更改在工作目录
git reset HEAD~1

# 完全丢弃最后两次提交的所有更改
git reset --hard HEAD~2

# 取消暂存所有文件
git reset</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="command-section restore">
      <div class="command-header">
        <h2>git restore</h2>
        <div class="command-icon">📥</div>
      </div>
      <div class="command-content">
        <div class="concept">
          <h3>概念</h3>
          <p><code>git restore</code> 是Git 2.23版本引入的命令，用于恢复工作目录或暂存区的文件到指定状态。</p>
        </div>

        <div class="principle">
          <h3>工作原理</h3>
          <p>从指定源恢复文件到工作目录或暂存区：</p>
          <ul>
            <li><strong>--source</strong>：指定恢复来源（提交、分支等）</li>
            <li><strong>--staged</strong>：仅恢复暂存区</li>
            <li><strong>--worktree</strong>：仅恢复工作目录</li>
            <li><strong>--source HEAD</strong>：从最新提交恢复</li>
          </ul>
        </div>

        <div class="usage">
          <h3>使用场景</h3>
          <ul>
            <li>放弃工作目录中未暂存的更改</li>
            <li>撤销已暂存但未提交的更改</li>
            <li>恢复被删除的文件</li>
            <li>将文件恢复到历史版本</li>
          </ul>
        </div>

        <div class="examples">
          <h3>代码示例</h3>
          <div class="code-block">
            <pre><code># 恢复工作目录中指定文件
git restore file.js

# 恢复暂存区中的文件（取消暂存）
git restore --staged file.js

# 恢复工作目录和暂存区的文件
git restore --staged --worktree file.js

# 从特定提交恢复文件
git restore --source HEAD~2 file.js</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="command-section revert">
      <div class="command-header">
        <h2>git revert</h2>
        <div class="command-icon">↩️</div>
      </div>
      <div class="command-content">
        <div class="concept">
          <h3>概念</h3>
          <p><code>git revert</code> 创建一个新的提交来撤销指定提交的更改，保留项目历史记录。</p>
        </div>

        <div class="principle">
          <h3>工作原理</h3>
          <p>通过分析目标提交引入的更改，生成一个新的提交来反向应用这些更改：</p>
          <ul>
            <li>创建一个新的提交，该提交是目标提交的反向操作</li>
            <li>不会修改现有提交历史</li>
            <li>保留所有历史记录，包括被撤销的提交</li>
            <li>可能产生冲突，需要手动解决</li>
          </ul>
        </div>

        <div class="usage">
          <h3>使用场景</h3>
          <ul>
            <li>撤销已推送到远程仓库的提交</li>
            <li>安全地撤销公共历史中的更改</li>
            <li>记录撤销操作的历史</li>
            <li>修复错误但保留历史记录</li>
          </ul>
        </div>

        <div class="examples">
          <h3>代码示例</h3>
          <div class="code-block">
            <pre><code># 撤销最后一次提交
git revert HEAD

# 撤销特定提交
git revert a1b2c3d

# 撤销多个提交
git revert older_commit..newer_commit

# 撤销提交但不自动提交（手动修改后提交）
git revert --no-commit a1b2c3d</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-header">
        <h2>命令对比</h2>
        <div class="section-icon">🔍</div>
      </div>
      <div class="comparison-table">
        <div class="table-row header">
          <div class="table-cell">特性</div>
          <div class="table-cell">reset</div>
          <div class="table-cell">restore</div>
          <div class="table-cell">revert</div>
        </div>
        <div class="table-row">
          <div class="table-cell">修改历史</div>
          <div class="table-cell">是</div>
          <div class="table-cell">否</div>
          <div class="table-cell">否</div>
        </div>
        <div class="table-row">
          <div class="table-cell">安全用于公共提交</div>
          <div class="table-cell">❌</div>
          <div class="table-cell">✅</div>
          <div class="table-cell">✅</div>
        </div>
        <div class="table-row">
          <div class="table-cell">操作范围</div>
          <div class="table-cell">提交级别</div>
          <div class="table-cell">文件级别</div>
          <div class="table-cell">提交级别</div>
        </div>
        <div class="table-row">
          <div class="table-cell">创建新提交</div>
          <div class="table-cell">❌</div>
          <div class="table-cell">❌</div>
          <div class="table-cell">✅</div>
        </div>
        <div class="table-row">
          <div class="table-cell">适用场景</div>
          <div class="table-cell">本地未推送更改</div>
          <div class="table-cell">丢弃未提交更改</div>
          <div class="table-cell">撤销已推送提交</div>
        </div>
        <div class="table-row">
          <div class="table-cell">风险等级</div>
          <div class="table-cell">高（可能丢失工作）</div>
          <div class="table-cell">中（可能丢失未提交更改）</div>
          <div class="table-cell">低（安全撤销）</div>
        </div>
      </div>
    </div>

    <div class="usage-guide">
      <div class="section-header">
        <h2>使用指南</h2>
        <div class="section-icon">📝</div>
      </div>
      <div class="guide-content">
        <div class="guide-card">
          <div class="guide-icon">✅</div>
          <h3>何时使用 reset</h3>
          <ul>
            <li>撤销本地分支上的提交（尚未推送）</li>
            <li>完全放弃未提交的工作</li>
            <li>修改本地提交历史（交互式变基）</li>
          </ul>
        </div>

        <div class="guide-card">
          <div class="guide-icon">✅</div>
          <h3>何时使用 restore</h3>
          <ul>
            <li>放弃工作目录中的修改</li>
            <li>取消已暂存的文件</li>
            <li>恢复被意外删除的文件</li>
            <li>将文件恢复到特定版本</li>
          </ul>
        </div>

        <div class="guide-card">
          <div class="guide-icon">✅</div>
          <h3>何时使用 revert</h3>
          <ul>
            <li>撤销已推送到远程仓库的提交</li>
            <li>安全地修复公共分支上的错误</li>
            <li>记录撤销操作的历史</li>
            <li>保留完整的项目历史</li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>理解 reset、restore 和 revert 的区别是掌握 Git 版本控制的关键。根据你的场景选择合适的命令：</p>
      <div class="command-summary">
        <div class="summary-item">
          <span class="command">reset</span> - 修改历史，适用于本地操作
        </div>
        <div class="summary-item">
          <span class="command">restore</span> - 恢复文件，不修改历史
        </div>
        <div class="summary-item">
          <span class="command">revert</span> - 安全撤销，创建新提交
        </div>
      </div>
      <div class="resources">
        <a href="https://git-scm.com/docs" target="_blank">Git 官方文档</a>
        <a href="https://git-scm.com/book/en/v2" target="_blank">Pro Git 书籍</a>
        <a href="https://ohmygit.org/" target="_blank">Oh My Git! 学习资源</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 提交历史数据
const commits = ref([
  { id: 'c1', message: '初始提交', active: false },
  { id: 'c2', message: '添加功能A', active: false },
  { id: 'c3', message: '添加功能B', active: true },
  { id: 'c4', message: '修复功能A', active: false },
  { id: 'c5', message: '最新提交', active: false }
]);

// 提交位置计算
const commitStyle = (index: number) => {
  return {
    left: `${10 + index * 20}%`
  };
};

// 提交类名
const commitClasses = (commit: any) => {
  return {
    'active-commit': commit.active,
    'inactive-commit': !commit.active
  };
};
</script>

<style lang="less" scoped>


// 颜色变量
@reset-color: #ef4444;
@restore-color: #3b82f6;
@revert-color: #10b981;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@code-bg: #1e293b;
@header-bg: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.git-commands-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-color;
  background-color: @background;
}

.header {
  background: @header-bg;
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  .box-shadow();

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .git-logo {
    position: relative;
    height: 120px;
    width: 100%;
    margin-bottom: 2rem;
  }

  .git-branch {
    position: absolute;
    top: 60px;
    left: 10%;
    right: 10%;
    height: 4px;
    background: #64748b;
    border-radius: 2px;
  }

  .git-commit {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    top: 54px;
    transform: translateY(-50%);
    .box-shadow();
    .transition();

    &.active-commit {
      background: #3b82f6;
      border: 3px solid white;
      transform: translateY(-50%) scale(1.2);
      z-index: 2;
    }

    &.inactive-commit {
      background: #cbd5e1;
    }

    &:hover {
      transform: translateY(-50%) scale(1.3);
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin: 0 0 0.5rem 0;
    color: #1e293b;
  }

  .subtitle {
    font-size: 1.25rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.command-section {
  border-radius: 16px;
  overflow: hidden;
  .box-shadow();
  margin-bottom: 2rem;

  &.reset {
    border-top: 4px solid @reset-color;

    .command-header {
      background: fade(@reset-color, 10%);
    }
  }

  &.restore {
    border-top: 4px solid @restore-color;

    .command-header {
      background: fade(@restore-color, 10%);
    }
  }

  &.revert {
    border-top: 4px solid @revert-color;

    .command-header {
      background: fade(@revert-color, 10%);
    }
  }
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;

  h2 {
    font-size: 1.8rem;
    margin: 0;
  }

  .command-icon {
    font-size: 2.5rem;
  }
}

.command-content {
  background: @card-bg;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  >div {
    h3 {
      font-size: 1.3rem;
      color: #475569;
      margin-top: 0;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
    }
  }
}

.concept {
  p {
    line-height: 1.7;
    margin: 0 0 1rem;
  }
}

.principle {
  ul {
    padding-left: 1.25rem;
    margin: 0;

    li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
    }
  }
}

.usage {
  ul {
    padding-left: 1.25rem;
    margin: 0;

    li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
    }
  }
}

.code-block {
  background: @code-bg;
  border-radius: 8px;
  overflow: hidden;

  pre {
    margin: 0;
    padding: 1.25rem;
    overflow-x: auto;

    code {
      color: #cbd5e1;
      font-family: 'Fira Code', 'Source Code Pro', monospace;
      font-size: 0.95rem;
      line-height: 1.5;

      .comment {
        color: #94a3b8;
      }

      .keyword {
        color: #f472b6;
      }

      .string {
        color: #34d399;
      }
    }
  }
}

.comparison-section {
  background: @card-bg;
  border-radius: 16px;
  overflow: hidden;
  .box-shadow();
  margin-bottom: 2rem;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 2rem;
    background: linear-gradient(90deg, #475569, #334155);

    h2 {
      font-size: 1.5rem;
      color: white;
      margin: 0;
    }

    .section-icon {
      font-size: 1.8rem;
      margin-left: 1rem;
      color: white;
    }
  }
}

.comparison-table {
  padding: 1.5rem;

  .table-row {
    display: flex;

    &:nth-child(even) {
      background-color: #f8fafc;
    }

    &.header {
      background-color: #e2e8f0;
      font-weight: 600;

      .table-cell {
        border-bottom: 2px solid #cbd5e1;
      }
    }
  }

  .table-cell {
    flex: 1;
    padding: 1rem;
    border-bottom: 1px solid #e2e8f0;

    &:first-child {
      font-weight: 500;
    }
  }
}

.usage-guide {
  background: @card-bg;
  border-radius: 16px;
  overflow: hidden;
  .box-shadow();
  margin-bottom: 2rem;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 2rem;
    background: linear-gradient(90deg, #0f172a, #1e293b);

    h2 {
      font-size: 1.5rem;
      color: white;
      margin: 0;
    }

    .section-icon {
      font-size: 1.8rem;
      margin-left: 1rem;
      color: white;
    }
  }
}

.guide-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.guide-card {
  background: #f1f5f9;
  border-radius: 12px;
  padding: 1.5rem;
  .transition();

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .guide-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #1e293b;
  }

  ul {
    padding-left: 1.25rem;
    margin: 0;

    li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
    }
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  color: @text-secondary;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;

  .command-summary {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
    margin: 1.5rem 0;

    .summary-item {
      background: #f1f5f9;
      padding: 0.75rem 1.5rem;
      border-radius: 30px;
      font-weight: 500;

      .command {
        font-weight: 700;
        font-family: 'Fira Code', monospace;
      }
    }
  }

  .resources {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;

    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
      .transition();

      &:hover {
        color: darken(#3b82f6, 15%);
        text-decoration: underline;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .git-commands-container {
    padding: 1.25rem;
  }

  .header {
    padding: 2rem 1rem;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .command-content {
    padding: 1.5rem;
    grid-template-columns: 1fr;
  }

  .guide-content {
    grid-template-columns: 1fr;
  }

  .command-summary {
    flex-direction: column;
    align-items: center;
  }
}
</style>
