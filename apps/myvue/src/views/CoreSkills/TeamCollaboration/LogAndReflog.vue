<template>
  <div class="git-log-container">
    <div class="hero-section">
      <h1 class="hero-title">Git Log 与 Reflog 基本介绍</h1>
      <p class="hero-subtitle">掌握Git历史记录与操作追踪的核心工具</p>
      <div class="hero-icons">
        <div class="icon-circle log-icon">
          <i class="fas fa-history"></i>
          <span>Git Log</span>
        </div>
        <div class="icon-divider">
          <i class="fas fa-exchange-alt"></i>
        </div>
        <div class="icon-circle reflog-icon">
          <i class="fas fa-redo-alt"></i>
          <span>Git Reflog</span>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 概念与作用 -->
      <div class="section concept-section">
        <div class="section-header">
          <i class="fas fa-lightbulb"></i>
          <h2>概念与作用</h2>
        </div>

        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-header log-bg">
              <h3>Git Log</h3>
              <i class="fas fa-history"></i>
            </div>
            <div class="concept-body">
              <p>显示项目的提交历史记录，按时间顺序列出从最新到最旧的提交。</p>
              <ul>
                <li>查看项目演变历史</li>
                <li>追踪特定文件的修改记录</li>
                <li>分析分支结构和合并情况</li>
                <li>查找特定提交的元数据</li>
              </ul>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-header reflog-bg">
              <h3>Git Reflog</h3>
              <i class="fas fa-redo-alt"></i>
            </div>
            <div class="concept-body">
              <p>记录本地仓库中HEAD指针和分支引用的所有变更历史，包括"丢失"的提交。</p>
              <ul>
                <li>恢复意外删除的分支或提交</li>
                <li>追踪所有HEAD变更（包括重置、合并等操作）</li>
                <li>找回因rebase等操作"丢失"的提交</li>
                <li>查看分支的完整操作历史</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 参数基础介绍 -->
      <div class="section">
        <div class="section-header">
          <i class="fas fa-cogs"></i>
          <h2>参数基础介绍</h2>
        </div>

        <div class="tabs">
          <button :class="['tab-button', { active: activeTab === 'log' }]" @click="activeTab = 'log'">
            <i class="fas fa-history"></i> Git Log 参数
          </button>
          <button :class="['tab-button', { active: activeTab === 'reflog' }]" @click="activeTab = 'reflog'">
            <i class="fas fa-redo-alt"></i> Git Reflog 参数
          </button>
        </div>

        <div class="parameter-section">
          <!-- Git Log 参数 -->
          <div v-if="activeTab === 'log'" class="parameter-grid">
            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--oneline</code>
                <span class="param-badge">常用</span>
              </div>
              <div class="param-description">
                简洁显示，每个提交只显示一行（提交哈希前7位 + 提交信息）
              </div>
              <div class="example">
                <pre>git log --oneline</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--graph</code>
                <span class="param-badge">常用</span>
              </div>
              <div class="param-description">
                以ASCII图形显示分支合并历史
              </div>
              <div class="example">
                <pre>git log --graph --oneline</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">-p</code>
                <span class="param-badge">详细</span>
              </div>
              <div class="param-description">
                显示每个提交引入的差异（patch）
              </div>
              <div class="example">
                <pre>git log -p</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--stat</code>
                <span class="param-badge">统计</span>
              </div>
              <div class="param-description">
                显示每个提交更改的文件统计信息
              </div>
              <div class="example">
                <pre>git log --stat</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--since/--until</code>
                <span class="param-badge">过滤</span>
              </div>
              <div class="param-description">
                按时间范围过滤提交记录
              </div>
              <div class="example">
                <pre>git log --since="2023-01-01" --until="2023-06-30"</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--author</code>
                <span class="param-badge">过滤</span>
              </div>
              <div class="param-description">
                按作者过滤提交记录
              </div>
              <div class="example">
                <pre>git log --author="John"</pre>
              </div>
            </div>
          </div>

          <!-- Git Reflog 参数 -->
          <div v-if="activeTab === 'reflog'" class="parameter-grid">
            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">show</code>
                <span class="param-badge">默认</span>
              </div>
              <div class="param-description">
                显示引用日志（默认命令）
              </div>
              <div class="example">
                <pre>git reflog</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--relative-date</code>
                <span class="param-badge">时间格式</span>
              </div>
              <div class="param-description">
                以相对时间格式显示（如"2 hours ago"）
              </div>
              <div class="example">
                <pre>git reflog --relative-date</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--date=iso</code>
                <span class="param-badge">时间格式</span>
              </div>
              <div class="param-description">
                以ISO标准格式显示时间
              </div>
              <div class="example">
                <pre>git reflog --date=iso</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">branch_name</code>
                <span class="param-badge">过滤</span>
              </div>
              <div class="param-description">
                查看特定分支的引用日志
              </div>
              <div class="example">
                <pre>git reflog show main</pre>
              </div>
            </div>

            <div class="parameter-card">
              <div class="param-header">
                <code class="param-name">--all</code>
                <span class="param-badge">完整</span>
              </div>
              <div class="param-description">
                显示所有引用的日志（包括分支、标签等）
              </div>
              <div class="example">
                <pre>git reflog --all</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="section">
        <div class="section-header">
          <i class="fas fa-scenario"></i>
          <h2>使用场景</h2>
        </div>

        <div class="scenario-tabs">
          <div class="scenario-column">
            <h3 class="scenario-title log-bg"><i class="fas fa-history"></i> Git Log 使用场景</h3>
            <div class="scenario-card">
              <div class="scenario-icon">
                <i class="fas fa-search"></i>
              </div>
              <div class="scenario-content">
                <h4>代码审查准备</h4>
                <p>查看特定分支上的所有提交，准备代码审查材料</p>
                <pre>git log main..feature/login --oneline</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">
                <i class="fas fa-bug"></i>
              </div>
              <div class="scenario-content">
                <h4>问题排查</h4>
                <p>查找特定文件何时被修改，定位问题引入的提交</p>
                <pre>git log -p src/utils/validator.js</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">
                <i class="fas fa-code-branch"></i>
              </div>
              <div class="scenario-content">
                <h4>分支分析</h4>
                <p>可视化分支结构，理解分支合并历史</p>
                <pre>git log --graph --oneline --all</pre>
              </div>
            </div>
          </div>

          <div class="scenario-column">
            <h3 class="scenario-title reflog-bg"><i class="fas fa-redo-alt"></i> Git Reflog 使用场景</h3>
            <div class="scenario-card">
              <div class="scenario-icon">
                <i class="fas fa-undo"></i>
              </div>
              <div class="scenario-content">
                <h4>恢复误删分支</h4>
                <p>找回意外删除的分支</p>
                <pre>git reflog
git checkout -b feature/new  # 从哈希值创建分支
git branch feature/new 2d3f5g1</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <div class="scenario-content">
                <h4>撤销错误重置</h4>
                <p>恢复因<code>git reset --hard</code>丢失的提交</p>
                <pre>git reflog
git reset --hard HEAD@{2}  # 恢复到重置前的状态</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">
                <i class="fas fa-sync-alt"></i>
              </div>
              <div class="scenario-content">
                <h4>找回rebase丢失的提交</h4>
                <p>恢复在复杂rebase操作中丢失的提交</p>
                <pre>git reflog
git cherry-pick 4c5d6e7  # 恢复特定提交</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 区别对比 -->
      <div class="section">
        <div class="section-header">
          <i class="fas fa-difference"></i>
          <h2>关键区别</h2>
        </div>

        <div class="comparison-table">
          <div class="table-header">
            <div class="header-cell"></div>
            <div class="header-cell log-bg">Git Log</div>
            <div class="header-cell reflog-bg">Git Reflog</div>
          </div>

          <div class="table-row">
            <div class="row-header">记录范围</div>
            <div>整个项目提交历史</div>
            <div>本地仓库操作历史</div>
          </div>

          <div class="table-row">
            <div class="row-header">数据存储</div>
            <div>永久存储在Git对象数据库中</div>
            <div>临时存储在.git/logs目录中</div>
          </div>

          <div class="table-row">
            <div class="row-header">记录内容</div>
            <div>提交元数据（作者、日期、消息）</div>
            <div>HEAD和分支引用变更操作</div>
          </div>

          <div class="table-row">
            <div class="row-header">时效性</div>
            <div>永久保存</div>
            <div>默认保留90天（可通过配置更改）</div>
          </div>

          <div class="table-row">
            <div class="row-header">共享性</div>
            <div>在克隆仓库时会被共享</div>
            <div>仅本地存储，不会推送到远程仓库</div>
          </div>

          <div class="table-row">
            <div class="row-header">主要用途</div>
            <div>查看项目历史，代码审查</div>
            <div>恢复丢失的提交/分支，错误操作回退</div>
          </div>
        </div>

        <div class="summary-card">
          <h3>总结：何时使用哪个？</h3>
          <div class="summary-content">
            <div class="summary-item">
              <i class="fas fa-check-circle log-color"></i>
              <p>使用 <strong>git log</strong> 查看项目历史、分析代码变更、准备发布说明</p>
            </div>
            <div class="summary-item">
              <i class="fas fa-check-circle reflog-color"></i>
              <p>使用 <strong>git reflog</strong> 恢复丢失的工作、撤销错误操作、找回被覆盖的提交</p>
            </div>
            <div class="summary-item">
              <i class="fas fa-exclamation-triangle"></i>
              <p>注意：Reflog是本地操作记录，不会与其他开发者共享</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>Git Log & Reflog 命令指南 | 版本控制的核心工具</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref<'log' | 'reflog'>('log');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.git-log-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  .hero-title {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 15px;
    position: relative;
    z-index: 1;
    letter-spacing: -0.5px;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    position: relative;
    z-index: 1;
    max-width: 700px;
    margin: 0 auto 30px;
  }

  .hero-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
    z-index: 1;

    .icon-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 1.1rem;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease;

      i {
        font-size: 2.5rem;
        margin-bottom: 10px;
      }

      &:hover {
        transform: translateY(-5px);
      }
    }

    .log-icon {
      background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    }

    .reflog-icon {
      background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
    }

    .icon-divider {
      color: #c7d2fe;
      font-size: 1.8rem;
    }
  }
}

.content-wrapper {
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;

  i {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;
  padding: 25px;
}

.concept-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.concept-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  i {
    font-size: 2rem;
  }
}

.log-bg {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.reflog-bg {
  background: linear-gradient(90deg, #8b5cf6, #a78bfa);
}

.concept-body {
  padding: 25px;
  background: #f8fafc;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 20px;
    color: #334155;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 12px;
      line-height: 1.6;
      position: relative;
      padding-left: 25px;

      &::before {
        content: "•";
        color: #4f46e5;
        font-weight: bold;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 25px;
  margin-top: 10px;
}

.tab-button {
  padding: 15px 25px;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  i {
    font-size: 1.2rem;
  }

  &:hover {
    color: #4f46e5;
  }

  &.active {
    color: #4f46e5;
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 3px;
      background: #4f46e5;
      border-radius: 3px 3px 0 0;
    }
  }
}

.parameter-section {
  padding: 25px;
}

.parameter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.parameter-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.03);

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
    font-size: 1.15rem;
    font-weight: 600;
    color: #4f46e5;
    font-family: 'Fira Code', monospace;
  }

  .param-badge {
    background: #eef2ff;
    color: #4f46e5;
    font-size: 0.85rem;
    padding: 4px 10px;
    border-radius: 20px;
    font-weight: 600;
  }

  .param-description {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 1.05rem;
  }

  .example {
    background: #f8fafc;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.95rem;

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Courier New', monospace;
      color: #334155;
      overflow-x: auto;
      white-space: pre-wrap;
      font-size: 0.95rem;
    }
  }
}

.scenario-tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 25px;
  padding: 25px;
}

.scenario-column {
  .scenario-title {
    padding: 15px 20px;
    color: white;
    border-radius: 8px;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.4rem;

    i {
      font-size: 1.6rem;
    }
  }
}

.scenario-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.06);
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
    flex-shrink: 0;
    font-size: 1.4rem;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #1e293b;
    font-size: 1.2rem;
  }

  p {
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 12px;
    font-size: 1.05rem;
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

.comparison-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 25px;
  background: white;

  .table-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-weight: 600;
    text-align: center;

    .header-cell {
      padding: 18px;
      color: white;
      font-size: 1.1rem;
    }
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    >div {
      padding: 15px 20px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
    }

    .row-header {
      font-weight: 600;
      background: #f8fafc;
      color: #334155;
    }
  }

  .table-row:nth-child(odd) {
    background: #f8fafc;
  }
}

.summary-card {
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  border-radius: 0 8px 8px 0;
  padding: 25px;
  margin: 25px;

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #0369a1;
    font-size: 1.4rem;
  }
}

.summary-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;

  i {
    font-size: 1.4rem;
    margin-top: 3px;
  }

  .log-color {
    color: #3b82f6;
  }

  .reflog-color {
    color: #8b5cf6;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #334155;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 25px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
}

@media (max-width: 900px) {

  .concept-grid,
  .scenario-tabs {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 2.2rem !important;
  }

  .hero-icons {
    flex-direction: column;
    gap: 20px !important;
  }

  .parameter-grid {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    grid-template-columns: 1fr;
    margin: 15px;

    .table-header {
      display: none;
    }

    .table-row {
      grid-template-columns: 1fr;
      border-bottom: 1px solid #e2e8f0;

      .row-header {
        background: #4f46e5;
        color: white;
        padding: 12px 20px;
        font-weight: 500;
      }

      >div {
        padding: 12px 20px;
      }
    }
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 1.8rem !important;
  }

  .hero-subtitle {
    font-size: 1.1rem !important;
  }

  .icon-circle {
    width: 90px !important;
    height: 90px !important;
    font-size: 0.9rem !important;

    i {
      font-size: 1.8rem !important;
    }
  }

  .section-header h2 {
    font-size: 1.4rem !important;
  }

  .tabs {
    flex-direction: column;
  }
}
</style>
