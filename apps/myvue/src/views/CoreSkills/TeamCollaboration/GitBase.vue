<template>
  <div class="git-container">
    <header class="header">
      <div class="logo-container">
        <div class="git-logo">
          <div class="git-branch"></div>
          <div
            class="git-commit"
            v-for="(commit, index) in commits"
            :key="index"
            :style="commitStyle(index)"
            :class="commitClasses(commit)"
          ></div>
        </div>
        <h1>Git 版本控制系统</h1>
      </div>
      <p class="subtitle">分布式版本控制工具，高效管理代码历史</p>
    </header>

    <div class="content-section concept">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>核心概念</h2>
      </div>
      <div class="section-content">
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🗄️</div>
            <h3>版本控制</h3>
            <p>记录文件内容变化，允许回退到任意历史版本</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🌐</div>
            <h3>分布式系统</h3>
            <p>每个开发者都有完整的仓库副本，可离线工作</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">📦</div>
            <h3>仓库 (Repository)</h3>
            <p>包含项目所有文件和历史记录的数据存储</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">📝</div>
            <h3>提交 (Commit)</h3>
            <p>项目在特定时间点的快照，包含变更描述</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🌿</div>
            <h3>分支 (Branch)</h3>
            <p>独立开发线，允许在不影响主线的情况下工作</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>合并 (Merge)</h3>
            <p>将不同分支的更改整合到一起</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section workflow">
      <div class="section-header">
        <div class="section-icon">⚙️</div>
        <h2>Git 工作流程</h2>
      </div>
      <div class="section-content">
        <div class="workflow-diagram">
          <div class="workflow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>工作目录</h3>
              <p>修改项目文件</p>
            </div>
          </div>
          <div class="workflow-arrow">➡️</div>
          <div class="workflow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>暂存区</h3>
              <p>添加要包含在下次提交中的更改</p>
            </div>
          </div>
          <div class="workflow-arrow">➡️</div>
          <div class="workflow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>本地仓库</h3>
              <p>提交更改到本地历史记录</p>
            </div>
          </div>
          <div class="workflow-arrow">➡️</div>
          <div class="workflow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>远程仓库</h3>
              <p>推送更改到共享仓库</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section commands">
      <div class="section-header">
        <div class="section-icon">💻</div>
        <h2>常用命令</h2>
      </div>
      <div class="section-content">
        <div class="commands-grid">
          <div class="command-category">
            <h3>仓库管理</h3>
            <div class="command-card">
              <div class="command">git init</div>
              <div class="description">在当前目录初始化新的 Git 仓库</div>
              <div class="example">初始化项目仓库</div>
            </div>
            <div class="command-card">
              <div class="command">git clone &lt;url&gt;</div>
              <div class="description">克隆远程仓库到本地</div>
              <div class="example">git clone https://github.com/user/repo.git</div>
            </div>
          </div>

          <div class="command-category">
            <h3>基本工作流</h3>
            <div class="command-card">
              <div class="command">git add &lt;file&gt;</div>
              <div class="description">将文件添加到暂存区</div>
              <div class="example">git add index.html 或 git add .</div>
            </div>
            <div class="command-card">
              <div class="command">git commit -m "message"</div>
              <div class="description">提交暂存区的更改到仓库</div>
              <div class="example">git commit -m "添加登录功能"</div>
            </div>
            <div class="command-card">
              <div class="command">git status</div>
              <div class="description">查看工作区和暂存区的状态</div>
              <div class="example">检查哪些文件已修改/暂存</div>
            </div>
          </div>

          <div class="command-category">
            <h3>分支管理</h3>
            <div class="command-card">
              <div class="command">git branch</div>
              <div class="description">列出所有本地分支</div>
              <div class="example">查看当前分支</div>
            </div>
            <div class="command-card">
              <div class="command">git checkout &lt;branch&gt;</div>
              <div class="description">切换到指定分支</div>
              <div class="example">git checkout feature/login</div>
            </div>
            <div class="command-card">
              <div class="command">git merge &lt;branch&gt;</div>
              <div class="description">合并指定分支到当前分支</div>
              <div class="example">git merge feature/login</div>
            </div>
          </div>

          <div class="command-category">
            <h3>远程协作</h3>
            <div class="command-card">
              <div class="command">git push</div>
              <div class="description">推送本地提交到远程仓库</div>
              <div class="example">git push origin main</div>
            </div>
            <div class="command-card">
              <div class="command">git pull</div>
              <div class="description">拉取远程更新并合并到本地</div>
              <div class="example">同步最新代码: git pull</div>
            </div>
            <div class="command-card">
              <div class="command">git fetch</div>
              <div class="description">下载远程更改但不合并</div>
              <div class="example">查看远程更新: git fetch</div>
            </div>
          </div>

          <div class="command-category">
            <h3>历史查看</h3>
            <div class="command-card">
              <div class="command">git log</div>
              <div class="description">查看提交历史</div>
              <div class="example">git log --oneline --graph</div>
            </div>
            <div class="command-card">
              <div class="command">git diff</div>
              <div class="description">查看工作区和暂存区的差异</div>
              <div class="example">git diff 或 git diff --staged</div>
            </div>
            <div class="command-card">
              <div class="command">git show &lt;commit&gt;</div>
              <div class="description">显示特定提交的详细信息</div>
              <div class="example">git show a1b2c3d</div>
            </div>
          </div>

          <div class="command-category">
            <h3>撤销操作</h3>
            <div class="command-card">
              <div class="command">git restore &lt;file&gt;</div>
              <div class="description">撤销工作区的修改</div>
              <div class="example">git restore index.html</div>
            </div>
            <div class="command-card">
              <div class="command">git reset &lt;commit&gt;</div>
              <div class="description">重置当前分支到指定提交</div>
              <div class="example">git reset HEAD~1 --soft</div>
            </div>
            <div class="command-card">
              <div class="command">git revert &lt;commit&gt;</div>
              <div class="description">创建新提交来撤销指定提交</div>
              <div class="example">git revert a1b2c3d</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section workflows">
      <div class="section-header">
        <div class="section-icon">🔄</div>
        <h2>Git 工作流程模型</h2>
      </div>
      <div class="section-content">
        <div class="workflow-models">
          <div class="workflow-model">
            <h3>集中式工作流</h3>
            <p>类似SVN，所有开发者直接推送到主分支</p>
            <ul>
              <li>简单直接</li>
              <li>适合小团队</li>
              <li>缺乏代码审查</li>
            </ul>
          </div>
          <div class="workflow-model">
            <h3>功能分支工作流</h3>
            <p>每个新功能在独立分支开发，完成后合并到主分支</p>
            <ul>
              <li>隔离功能开发</li>
              <li>支持Pull Request</li>
              <li>广泛采用</li>
            </ul>
          </div>
          <div class="workflow-model">
            <h3>Gitflow工作流</h3>
            <p>定义严格的分支模型（主分支、开发分支、功能分支、发布分支、热修复分支）</p>
            <ul>
              <li>适合复杂项目</li>
              <li>支持并行开发</li>
              <li>版本发布管理</li>
            </ul>
          </div>
          <div class="workflow-model">
            <h3>Forking工作流</h3>
            <p>每个开发者fork主仓库，独立开发后提交Pull Request</p>
            <ul>
              <li>开源项目标准</li>
              <li>维护者控制合并</li>
              <li>安全隔离</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section benefits">
      <div class="section-header">
        <div class="section-icon">✨</div>
        <h2>Git 的优势</h2>
      </div>
      <div class="section-content">
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">💾</div>
            <h3>完整历史记录</h3>
            <p>跟踪每次更改，包括作者、时间和变更内容</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🧪</div>
            <h3>分支与实验</h3>
            <p>低成本创建分支，安全尝试新想法</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">👥</div>
            <h3>团队协作</h3>
            <p>多人并行工作，高效合并更改</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">⏪</div>
            <h3>错误恢复</h3>
            <p>轻松回退到任何历史版本</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🚀</div>
            <h3>高效性能</h3>
            <p>快速操作，即使在大项目中也保持高效</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔒</div>
            <h3>数据完整性</h3>
            <p>SHA-1哈希确保数据不被篡改</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Git 是现代软件开发的核心工具，掌握 Git 是每位开发者的必备技能。</p>
      <div class="resources">
        <a href="https://git-scm.com/docs" target="_blank">官方文档</a>
        <a href="https://git-scm.com/book/en/v2" target="_blank">Pro Git 书籍</a>
        <a href="https://learngitbranching.js.org/" target="_blank">交互式学习</a>
        <a href="https://github.com/" target="_blank">GitHub</a>
      </div>
      <div class="quote">"Git 不仅是一个工具，它是一种开发哲学"</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 提交历史数据
const commits = ref([
  { id: 'c1', message: '初始提交', active: false },
  { id: 'c2', message: '添加功能A', active: false },
  { id: 'c3', message: '添加功能B', active: true },
  { id: 'c4', message: '修复功能A', active: false },
  { id: 'c5', message: '最新提交', active: false },
])

// 提交位置计算
const commitStyle = (index: number) => {
  return {
    left: `${10 + index * 20}%`,
  }
}

// 提交类名
const commitClasses = (commit: any) => {
  return {
    'active-commit': commit.active,
    'inactive-commit': !commit.active,
  }
}
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

// 颜色变量
@primary-color: #f05032; // Git 主题色
@secondary-color: #6cc644;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@header-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

// 混合宏
.box-shadow() {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.git-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
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
      background: @primary-color;
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
    color: @text-color;
  }

  .subtitle {
    font-size: 1.25rem;
    color: @text-secondary;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.content-section {
  background: @card-bg;
  border-radius: 16px;
  overflow: hidden;
  .box-shadow();
  margin-bottom: 2rem;

  .section-header {
    display: flex;
    align-items: center;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(90deg, @primary-color 0%, darken(@primary-color, 10%) 100%);

    .section-icon {
      font-size: 1.8rem;
      margin-right: 1rem;
      color: white;
    }

    h2 {
      font-size: 1.4rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
  }

  .section-content {
    padding: 2rem;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid fade(@primary-color, 15%);
  .transition();

  &:hover {
    transform: translateY(-5px);
    border-color: fade(@primary-color, 30%);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  p {
    margin: 0;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.workflow-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.workflow-step {
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 180px;
  text-align: center;
  border: 1px solid fade(@primary-color, 15%);

  .step-number {
    width: 36px;
    height: 36px;
    background: @primary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    margin: 0 auto 1rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: @primary-color;
  }

  p {
    margin: 0;
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.workflow-arrow {
  font-size: 1.5rem;
  color: @text-secondary;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.command-category {
  h3 {
    color: @primary-color;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid fade(@primary-color, 20%);
    margin-top: 0;
  }
}

.command-card {
  background: fade(@primary-color, 3%);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 3px solid @primary-color;
  .transition();

  &:hover {
    background: fade(@primary-color, 7%);
    transform: translateX(5px);
  }

  .command {
    font-family: 'Fira Code', monospace;
    font-weight: 600;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    color: @text-color;
  }

  .example {
    font-size: 0.85rem;
    color: @text-secondary;
    font-family: 'Fira Code', monospace;
    background: fade(@primary-color, 5%);
    padding: 0.5rem;
    border-radius: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.workflow-models {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.workflow-model {
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid fade(@primary-color, 15%);

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  p {
    margin: 0 0 1rem 0;
    color: @text-secondary;
    line-height: 1.6;
  }

  ul {
    padding-left: 1.25rem;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
    }
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.benefit-card {
  background: fade(@secondary-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid fade(@secondary-color, 15%);

  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: @secondary-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: darken(@secondary-color, 10%);
  }

  p {
    margin: 0;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.footer {
  text-align: center;
  padding: 2rem;
  color: @text-secondary;
  font-size: 1.05rem;
  line-height: 1.7;

  .resources {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin: 1.5rem 0;
    flex-wrap: wrap;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 30px;
      background: fade(@primary-color, 10%);
      .transition();

      &:hover {
        background: fade(@primary-color, 20%);
        color: darken(@primary-color, 10%);
      }
    }
  }

  .quote {
    font-style: italic;
    margin-top: 1.5rem;
    color: darken(@text-secondary, 10%);
    border-top: 1px solid @border-color;
    padding-top: 1.5rem;
    max-width: 600px;
    margin: 1.5rem auto 0;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .git-container {
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

  .content-section .section-content {
    padding: 1.5rem;
  }

  .workflow-diagram {
    flex-direction: column;

    .workflow-arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
  }

  .resources {
    flex-direction: column;
    align-items: center;
  }
}
</style>
