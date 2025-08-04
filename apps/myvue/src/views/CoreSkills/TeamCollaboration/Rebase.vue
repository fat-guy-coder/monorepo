<template>
  <div class="rebase-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>Git Rebase 详解</h1>
        <p class="subtitle">优雅地整合分支变更</p>
      </div>
      <div class="demo-area">
        <div class="rebase-visualization">
          <div class="branch-diagram">
            <div class="branch master">
              <div class="branch-label">master</div>
              <div class="commits">
                <div
                  class="commit"
                  v-for="(commit, index) in masterCommits"
                  :key="'m' + index"
                  :style="{ '--order': index }"
                >
                  <div class="commit-node"></div>
                  <div class="commit-info">
                    <div class="commit-hash">{{ commit.hash }}</div>
                    <div class="commit-message">{{ commit.message }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="branch feature">
              <div class="branch-label">feature</div>
              <div class="commits">
                <div
                  class="commit"
                  v-for="(commit, index) in featureCommits"
                  :key="'f' + index"
                  :style="{ '--order': index }"
                >
                  <div class="commit-node"></div>
                  <div class="commit-info">
                    <div class="commit-hash">{{ commit.hash }}</div>
                    <div class="commit-message">{{ commit.message }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="branch-connection"></div>
          </div>

          <div class="rebase-controls">
            <button class="rebase-button" @click="showRebase = true">执行 Rebase</button>
            <div class="rebase-result" v-if="showRebase">
              <div class="result-message">Rebase 成功完成！</div>
              <div class="post-rebase-diagram">
                <div class="branch master">
                  <div class="branch-label">master</div>
                  <div class="commits">
                    <div
                      class="commit"
                      v-for="(commit, index) in masterCommits"
                      :key="'m' + index"
                      :style="{ '--order': index }"
                    >
                      <div class="commit-node"></div>
                      <div class="commit-info">
                        <div class="commit-hash">{{ commit.hash }}</div>
                        <div class="commit-message">{{ commit.message }}</div>
                      </div>
                    </div>
                    <div
                      class="commit"
                      v-for="(commit, index) in featureCommits"
                      :key="'fr' + index"
                      :style="{ '--order': masterCommits.length + index }"
                    >
                      <div class="commit-node feature-node"></div>
                      <div class="commit-info">
                        <div class="commit-hash">{{ commit.hash }}</div>
                        <div class="commit-message">{{ commit.message }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <section class="intro-section">
        <div class="intro-card">
          <h2>什么是 Rebase？</h2>
          <p>
            <strong>Rebase（变基）</strong>是 Git
            中用于整合分支变更的一种方法。它通过将当前分支的提交移动到另一个分支的最新提交之后，
            创建一系列新的提交，从而实现更线性的项目历史。
          </p>

          <div class="rebase-flow">
            <div class="flow-step">
              <div class="step-icon">1</div>
              <h3>检出目标分支</h3>
              <p>切换到需要变基的分支</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">2</div>
              <h3>执行变基</h3>
              <p>将当前分支提交应用到目标分支</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">3</div>
              <h3>解决冲突</h3>
              <p>处理可能出现的代码冲突</p>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">4</div>
              <h3>完成变基</h3>
              <p>创建线性整洁的提交历史</p>
            </div>
          </div>
        </div>
      </section>

      <section class="comparison-section">
        <h2 class="section-title">Rebase vs Merge</h2>
        <div class="comparison-table">
          <div class="table-header">
            <div class="col-criteria">特性</div>
            <div class="col-type">Rebase</div>
            <div class="col-type">Merge</div>
          </div>
          <div class="table-row" v-for="(row, index) in comparisonData" :key="index">
            <div class="col-criteria">{{ row.criteria }}</div>
            <div class="col-type">{{ row.rebase }}</div>
            <div class="col-type">{{ row.merge }}</div>
          </div>
        </div>
      </section>

      <section class="workflow-section">
        <h2 class="section-title">Rebase 工作流程</h2>
        <div class="workflow-steps">
          <div class="step" v-for="(step, index) in workflowSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-code">
                <pre><code>{{ step.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="use-cases">
        <h2 class="section-title">适用场景</h2>
        <div class="cases-grid">
          <div class="case-card" v-for="(useCase, index) in useCases" :key="index">
            <div class="case-icon">{{ useCase.icon }}</div>
            <div class="case-content">
              <h3>{{ useCase.title }}</h3>
              <p>{{ useCase.description }}</p>
              <div class="case-example">
                <pre><code>{{ useCase.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">Rebase 最佳实践</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="(practice, index) in bestPractices" :key="index">
            <div class="practice-number">{{ index + 1 }}</div>
            <div class="practice-content">
              <h3>{{ practice.title }}</h3>
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Rebase 是 Git 工作流中强大的工具，合理使用可以创建更清晰、更线性的项目历史</p>
      <div class="resources">
        <h3>推荐资源：</h3>
        <ul>
          <li>
            <a href="https://git-scm.com/book/en/v2/Git-Branching-Rebasing" target="_blank"
              >Git 官方文档 - Rebasing</a
            >
          </li>
          <li>
            <a href="https://www.atlassian.com/git/tutorials/merging-vs-rebasing" target="_blank"
              >Atlassian - Merging vs. Rebasing</a
            >
          </li>
          <li><a href="https://github.com/git/git" target="_blank">Git 源代码</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showRebase = ref(false)

const masterCommits = ref([
  { hash: 'c1a2b3', message: '初始化项目' },
  { hash: 'd4e5f6', message: '添加核心功能' },
  { hash: 'e7f8a9', message: '修复登录问题' },
])

const featureCommits = ref([
  { hash: 'a1b2c3', message: '开始开发新功能' },
  { hash: 'b4c5d6', message: '实现功能A' },
  { hash: 'c7d8e9', message: '实现功能B' },
])

const comparisonData = ref([
  { criteria: '提交历史', rebase: '线性整洁', merge: '保留分支结构' },
  { criteria: '历史记录', rebase: '重写提交历史', merge: '保留原始提交' },
  { criteria: '使用场景', rebase: '个人分支整理', merge: '公共分支整合' },
  { criteria: '复杂性', rebase: '较高（需要解决冲突）', merge: '较低（自动处理）' },
  { criteria: '安全性', rebase: '谨慎使用（重写历史）', merge: '安全（不修改历史）' },
  { criteria: '可视化', rebase: '单一直线', merge: '分支合并点' },
])

const workflowSteps = ref([
  {
    title: '检出功能分支',
    description: '切换到需要变基的分支',
    code: `git checkout feature-branch`,
  },
  {
    title: '执行变基操作',
    description: '将当前分支变基到目标分支',
    code: `git rebase main`,
  },
  {
    title: '解决冲突',
    description: '处理变基过程中出现的代码冲突',
    code: `# 编辑冲突文件
git add <冲突文件>
git rebase --continue`,
  },
  {
    title: '完成变基',
    description: '所有冲突解决后完成变基过程',
    code: `# 变基成功
git rebase --continue`,
  },
  {
    title: '更新主分支',
    description: '将变基后的分支合并回主分支',
    code: `git checkout main
git merge feature-branch`,
  },
])

const useCases = ref([
  {
    icon: '🧹',
    title: '整理提交历史',
    description: '在合并分支前整理本地提交，创建更清晰、更有逻辑的提交历史',
    example: `# 交互式变基（整理最近3次提交）
git rebase -i HEAD~3`,
  },
  {
    icon: '📦',
    title: '同步上游变更',
    description: '将功能分支更新到主分支的最新状态，避免合并冲突',
    example: `# 在功能分支上同步主分支变更
git checkout feature
git rebase main`,
  },
  {
    icon: '🔀',
    title: '合并多个提交',
    description: '将多个小提交合并为更有意义的单个提交',
    example: `# 交互式变基合并提交
git rebase -i HEAD~5
# 将pick改为squash或fixup`,
  },
  {
    icon: '🔄',
    title: '修改历史提交',
    description: '修改过去的提交信息或内容（仅限于尚未推送的提交）',
    example: `# 修改最近一次提交
git commit --amend

# 修改更早的提交
git rebase -i HEAD~3
# 将pick改为edit`,
  },
])

const bestPractices = ref([
  {
    title: '不要变基公共分支',
    description: '永远不要对已经推送到远程仓库的分支执行变基，这会破坏其他协作者的工作',
  },
  {
    title: '频繁同步主分支',
    description: '定期将功能分支变基到主分支，减少最终合并时的冲突',
  },
  {
    title: '使用交互式变基',
    description: '交互式变基（-i）可以整理、修改和合并提交，创建更清晰的历史',
  },
  {
    title: '小步提交，定期整理',
    description: '开发时小步提交，然后使用变基整理提交历史',
  },
  {
    title: '理解冲突解决',
    description: '变基时可能需要多次解决冲突，准备好处理冲突',
  },
  {
    title: '备份重要分支',
    description: '在执行重要变基操作前，创建备份分支以防万一',
  },
])
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap');

// 颜色变量
@primary-color: #4a6cf7;
@primary-light: #e6eeff;
@secondary-color: #3a56d4;
@accent-color: #ff9800;
@text-color: #2c3e50;
@light-gray: #f8f9fc;
@border-color: #e0e6ed;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #4caf50;
@warning-color: #ffc107;

// 基础样式
.rebase-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-wrapper {
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: @secondary-color;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.3rem;
      color: #666;
      font-weight: 300;
    }
  }
}

.demo-area {
  max-width: 900px;
  margin: 0 auto;

  .rebase-visualization {
    background: @light-gray;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: @card-shadow;

    .branch-diagram {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      position: relative;
      padding-left: 50px;

      .branch {
        position: relative;

        .branch-label {
          position: absolute;
          left: -50px;
          top: 10px;
          font-weight: 600;
          color: @secondary-color;
        }

        &.master .branch-label {
          color: @primary-color;
        }

        &.feature .branch-label {
          color: @accent-color;
        }

        .commits {
          display: flex;
          flex-direction: column;
          gap: 2rem;

          .commit {
            position: relative;
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 2;

            &::before {
              content: '';
              position: absolute;
              left: 10px;
              top: -20px;
              height: 20px;
              width: 2px;
              background: @border-color;
              z-index: 1;
            }

            &:first-child::before {
              display: none;
            }

            .commit-node {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: @primary-color;
              border: 2px solid white;
              box-shadow: 0 0 0 2px @primary-color;
              z-index: 3;
              flex-shrink: 0;

              &.feature-node {
                background: @accent-color;
                box-shadow: 0 0 0 2px @accent-color;
              }
            }

            .commit-info {
              background: white;
              border-radius: 8px;
              padding: 0.8rem 1.2rem;
              box-shadow: @card-shadow;
              border: 1px solid @border-color;

              .commit-hash {
                font-family: 'Source Code Pro', monospace;
                font-size: 0.8rem;
                color: #666;
                margin-bottom: 0.3rem;
              }

              .commit-message {
                font-size: 0.95rem;
              }
            }
          }
        }
      }

      .branch-connection {
        position: absolute;
        left: 20px;
        top: 100px;
        bottom: 100px;
        width: 2px;
        background: @border-color;
        z-index: 1;
      }
    }

    .rebase-controls {
      margin-top: 2rem;
      text-align: center;

      .rebase-button {
        background: @primary-color;
        color: white;
        border: none;
        padding: 0.8rem 1.8rem;
        border-radius: 30px;
        font-size: 1.1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: darken(@primary-color, 10%);
          transform: translateY(-2px);
        }
      }

      .rebase-result {
        margin-top: 2rem;
        padding: 1.5rem;
        background: #e8f5e9;
        border-radius: 12px;
        border-left: 4px solid @success-color;

        .result-message {
          font-size: 1.1rem;
          font-weight: 500;
          color: @success-color;
          margin-bottom: 1.5rem;
          text-align: center;
        }
      }
    }
  }
}

.content {
  display: grid;
  gap: 3rem;
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.8rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, @primary-color, @accent-color);
    border-radius: 2px;
  }
}

.intro-section {
  .intro-card {
    background: @light-gray;
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: @card-shadow;

    h2 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    p {
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.8;

      strong {
        color: @primary-color;
      }
    }
  }

  .rebase-flow {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1.5rem;

    .flow-step {
      flex: 1;
      min-width: 200px;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: @card-shadow;

      .step-icon {
        width: 50px;
        height: 50px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }

      h3 {
        color: @primary-color;
        margin: 0.5rem 0;
        font-size: 1.3rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #666;
      }
    }

    .flow-arrow {
      display: flex;
      align-items: center;
      color: #777;
      font-weight: 700;
      min-width: 50px;
      text-align: center;
      font-size: 1.5rem;

      @media (max-width: 768px) {
        transform: rotate(90deg);
        margin: 1rem 0;
      }
    }
  }
}

.comparison-section {
  .comparison-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    border: 1px solid @border-color;

    .table-header {
      display: flex;
      background: @primary-color;
      color: white;
      font-weight: 500;

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        text-align: center;
      }

      .col-criteria {
        flex: 1.5;
        text-align: left;
      }
    }

    .table-row {
      display: flex;
      border-bottom: 1px solid @border-color;

      &:nth-child(even) {
        background: @light-gray;
      }

      &:last-child {
        border-bottom: none;
      }

      > div {
        padding: 1.2rem 1.5rem;
        flex: 1;
        display: flex;
        align-items: center;
      }

      .col-criteria {
        flex: 1.5;
        font-weight: 500;
      }

      .col-type {
        text-align: center;
        justify-content: center;
      }
    }
  }
}

.workflow-section {
  .workflow-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 1.5rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    .step {
      display: flex;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @card-shadow;
      gap: 1.2rem;
      border-left: 4px solid @primary-color;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .step-number {
        width: 40px;
        height: 40px;
        background: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: 700;
        flex-shrink: 0;
      }

      .step-content {
        flex: 1;

        h3 {
          color: @secondary-color;
          margin-top: 0;
          margin-bottom: 0.8rem;
          font-size: 1.2rem;
        }

        p {
          margin: 0 0 1rem;
          font-size: 0.95rem;
          color: #555;
          line-height: 1.7;
        }
      }

      .step-code {
        background: #2d2d2d;
        border-radius: 6px;
        padding: 0.8rem;
        margin-top: 0.5rem;

        pre {
          margin: 0;

          code {
            font-family: 'Source Code Pro', monospace;
            color: #f8f8f2;
            font-size: 0.9rem;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.use-cases {
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 1.5rem;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .case-card {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: @card-shadow;
    gap: 1.2rem;
    border-top: 3px solid @primary-color;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .case-icon {
      width: 50px;
      height: 50px;
      background: @primary-light;
      color: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .case-content {
      flex: 1;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
      }

      p {
        margin: 0 0 1rem;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }

    .case-example {
      background: #2d2d2d;
      border-radius: 6px;
      padding: 0.8rem;
      margin-top: 0.5rem;

      pre {
        margin: 0;

        code {
          font-family: 'Source Code Pro', monospace;
          color: #f8f8f2;
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
}

.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .practice-card {
    display: flex;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: @card-shadow;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .practice-number {
      width: 50px;
      min-height: 100%;
      background: @primary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .practice-content {
      padding: 1.5rem;

      h3 {
        color: @secondary-color;
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.25rem;
      }

      p {
        margin: 0;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
      }
    }
  }
}

.footer {
  margin-top: 4rem;
  padding: 2rem;
  text-align: center;
  background: @light-gray;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 500;
  color: @secondary-color;
  box-shadow: @card-shadow;
  border-top: 2px solid fade(@primary-color, 30%);

  p {
    margin-bottom: 1.5rem;
  }

  .resources {
    margin-top: 1.5rem;

    h3 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;

      li a {
        color: @primary-color;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .rebase-container {
    padding: 1.5rem 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .intro-card {
    padding: 1.5rem !important;
  }

  .workflow-steps {
    grid-template-columns: 1fr !important;
  }

  .cases-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
