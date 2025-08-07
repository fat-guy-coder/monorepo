<template>
  <div class="git-reset-container">
    <header class="header">
      <div class="logo-container">
        <div class="git-reset-logo">
          <div class="commit" v-for="(commit, index) in commits" :key="index" :style="commitStyle(index)"
            :class="commitClasses(commit)">
            <div class="commit-id">{{ commit.id }}</div>
          </div>
          <div class="reset-pointer" :style="resetPointerStyle"></div>
        </div>
        <h1>Git Reset 命令基础介绍</h1>
      </div>
      <p class="subtitle">掌握代码历史回溯的核心工具</p>
    </header>

    <div class="content-section concept">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>概念与作用</h2>
      </div>
      <div class="section-content">
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">⏪</div>
            <h3>什么是 reset？</h3>
            <p><code>git reset</code> 是用于移动当前分支的HEAD指针到指定提交的命令，允许你修改提交历史。</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">📝</div>
            <h3>核心作用</h3>
            <p>主要用于撤销提交、取消暂存文件、丢弃本地更改等操作，是版本控制中强大的"后悔药"。</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">⚠️</div>
            <h3>重要提示</h3>
            <p>reset 会改变提交历史，只应在未推送到远程仓库的本地提交上使用。已推送的提交应使用 <code>git revert</code>。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section modes">
      <div class="section-header">
        <div class="section-icon">⚙️</div>
        <h2>Reset 模式基础介绍</h2>
      </div>
      <div class="section-content">
        <div class="mode-tabs">
          <button v-for="mode in resetModes" :key="mode.id" :class="['mode-tab', { active: activeMode === mode.id }]"
            @click="activeMode = mode.id">
            {{ mode.name }}
          </button>
        </div>

        <div class="mode-visualization-image">
          <img :src="gitReset" alt="git reset" />
        </div>

        <div class="mode-content">
          <div v-for="mode in resetModes" :key="mode.id" v-show="activeMode === mode.id" class="mode-detail">
            <div class="mode-description">
              <h3>{{ mode.name }} <code>{{ mode.command }}</code></h3>
              <p>{{ mode.description }}</p>

              <div class="mode-impact">
                <div class="impact-card">
                  <div class="impact-icon">📂</div>
                  <div>
                    <h4>工作目录</h4>
                    <p :class="mode.impact.workingDirectory">{{ mode.impact.workingDirectory }}</p>
                  </div>
                </div>
                <div class="impact-card">
                  <div class="impact-icon">📋</div>
                  <div>
                    <h4>暂存区</h4>
                    <p :class="mode.impact.stagingArea">{{ mode.impact.stagingArea }}</p>
                  </div>
                </div>
                <div class="impact-card">
                  <div class="impact-icon">⏱️</div>
                  <div>
                    <h4>提交历史</h4>
                    <p :class="mode.impact.commitHistory">{{ mode.impact.commitHistory }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mode-visualization">
              <div class="visualization-header">
                <div class="visual-label">HEAD位置</div>
                <div class="visual-label">暂存区状态</div>
                <div class="visual-label">工作目录</div>
              </div>

              <div class="visualization-content">
                <div class="commit-row">
                  <div class="commit-visual" v-for="(commit, idx) in commits" :key="idx">
                    <div class="commit-circle"
                      :class="{ 'head-commit': activeMode === 'hard' ? idx === 1 : activeMode === 'mixed' ? idx === 2 : idx === 3 }">
                      <span>{{ commit.id }}</span>
                    </div>
                  </div>
                </div>

                <div class="state-row">
                  <div class="state before">
                    <div class="state-title">执行前</div>
                    <div class="file" v-for="(file, idx) in mode.visualization.before" :key="'before' + idx">
                      <div class="file-icon">📄</div>
                      <div class="file-name">{{ file.name }}</div>
                      <div class="file-status" :class="file.status">{{ file.status }}</div>
                    </div>
                  </div>

                  <div class="arrow">➡️</div>

                  <div class="state after">
                    <div class="state-title">执行后</div>
                    <div class="file" v-for="(file, idx) in mode.visualization.after" :key="'after' + idx">
                      <div class="file-icon">📄</div>
                      <div class="file-name">{{ file.name }}</div>
                      <div class="file-status" :class="file.status">{{ file.status }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mode-examples">
              <h3>使用示例</h3>
              <div class="example" v-for="(example, idx) in mode.examples" :key="idx">
                <div class="example-description">{{ example.description }}</div>
                <pre><code>{{ example.command }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section scenarios">
      <div class="section-header">
        <div class="section-icon">🔍</div>
        <h2>使用场景</h2>
      </div>
      <div class="section-content">
        <div class="scenarios-grid">
          <div class="scenario-card">
            <div class="scenario-icon">📝</div>
            <h3>撤销本地提交</h3>
            <p>撤销最近的提交，但保留更改在暂存区或工作目录</p>
            <pre><code>git reset --soft HEAD~1</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">📋</div>
            <h3>取消暂存文件</h3>
            <p>将已暂存的文件移出暂存区，保留工作目录的更改</p>
            <pre><code>git reset HEAD file.js</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🗑️</div>
            <h3>丢弃本地更改</h3>
            <p>彻底放弃工作目录和暂存区的所有更改</p>
            <pre><code>git reset --hard HEAD</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>重置分支位置</h3>
            <p>将分支重置到远程分支的状态</p>
            <pre><code>git reset --hard origin/main</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🧩</div>
            <h3>拆分提交</h3>
            <p>将大提交拆分为多个小提交</p>
            <pre><code>git reset --soft HEAD~2
git reset HEAD file1.js
git commit -m "提交文件1"
git add file2.js
git commit -m "提交文件2"</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🔙</div>
            <h3>恢复历史版本</h3>
            <p>将特定文件恢复到历史版本</p>
            <pre><code>git reset a1b2c3d -- file.js</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section comparison">
      <div class="section-header">
        <div class="section-icon">🆚</div>
        <h2>Reset 与相关命令对比</h2>
      </div>
      <div class="section-content">
        <div class="comparison-table">
          <div class="table-row header">
            <div class="table-cell">命令</div>
            <div class="table-cell">是否修改历史</div>
            <div class="table-cell">影响范围</div>
            <div class="table-cell">适用场景</div>
            <div class="table-cell">安全等级</div>
          </div>
          <div class="table-row">
            <div class="table-cell">reset --soft</div>
            <div class="table-cell">是</div>
            <div class="table-cell">仅提交历史</div>
            <div class="table-cell">修改提交消息或拆分提交</div>
            <div class="table-cell">🟢 安全</div>
          </div>
          <div class="table-row">
            <div class="table-cell">reset --mixed</div>
            <div class="table-cell">是</div>
            <div class="table-cell">提交历史和暂存区</div>
            <div class="table-cell">取消暂存文件</div>
            <div class="table-cell">🟡 中等</div>
          </div>
          <div class="table-row">
            <div class="table-cell">reset --hard</div>
            <div class="table-cell">是</div>
            <div class="table-cell">提交历史、暂存区和工作目录</div>
            <div class="table-cell">彻底丢弃更改</div>
            <div class="table-cell">🔴 危险</div>
          </div>
          <div class="table-row">
            <div class="table-cell">git revert</div>
            <div class="table-cell">否</div>
            <div class="table-cell">添加新提交</div>
            <div class="table-cell">撤销已推送的提交</div>
            <div class="table-cell">🟢 安全</div>
          </div>
          <div class="table-row">
            <div class="table-cell">git restore</div>
            <div class="table-cell">否</div>
            <div class="table-cell">工作目录或暂存区</div>
            <div class="table-cell">恢复文件到特定状态</div>
            <div class="table-cell">🟢 安全</div>
          </div>
          <div class="table-row">
            <div class="table-cell">git checkout</div>
            <div class="table-cell">否</div>
            <div class="table-cell">工作目录</div>
            <div class="table-cell">切换分支或恢复文件</div>
            <div class="table-cell">🟡 中等</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section best-practices">
      <div class="section-header">
        <div class="section-icon">✅</div>
        <h2>最佳实践与注意事项</h2>
      </div>
      <div class="section-content">
        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">🔒</div>
            <h3>保护重要提交</h3>
            <p>在执行 reset 前，为当前状态创建分支或标签作为备份</p>
            <pre><code>git branch backup-branch</code></pre>
          </div>
          <div class="practice-card">
            <div class="practice-icon">📤</div>
            <h3>仅用于本地提交</h3>
            <p>切勿在已推送到远程仓库的提交上使用 reset</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🧪</div>
            <h3>优先使用 --soft</h3>
            <p>尽量使用最安全的模式，逐步升级到更"硬"的模式</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">⚠️</div>
            <h3>谨慎使用 --hard</h3>
            <p>--hard 会永久删除工作目录和暂存区的更改</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🔍</div>
            <h3>使用 ORIG_HEAD</h3>
            <p>Git 会在 reset 前保存原始 HEAD 到 ORIG_HEAD</p>
            <pre><code>git reset ORIG_HEAD</code></pre>
          </div>
          <div class="practice-card">
            <div class="practice-icon">📅</div>
            <h3>交互式重置</h3>
            <p>使用交互式 rebase 修改多个提交</p>
            <pre><code>git rebase -i HEAD~3</code></pre>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Git reset 是强大的历史修改工具，理解不同模式的区别并谨慎使用，可以高效管理代码历史。</p>
      <div class="resources">
        <a href="https://git-scm.com/docs/git-reset" target="_blank">官方文档</a>
        <a href="https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified" target="_blank">Reset 基础介绍</a>
        <a href="https://ohshitgit.com/" target="_blank">常见Git问题解决</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import gitReset from '@/assets/git-reset.webp'

// 提交历史数据
const commits = ref([
  { id: 'a1b2c3', message: '添加用户模型', active: false },
  { id: 'd4e5f6', message: '实现登录功能', active: false },
  { id: 'g7h8i9', message: '修复登录bug', active: false },
  { id: 'j0k1l2', message: '添加注销功能', active: true },
  { id: 'm3n4o5', message: '最新提交', active: false }
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
    'active-commit': commit.active
  };
};

// 重置指针位置
const resetPointerStyle = computed(() => {
  return {
    left: `${10 + 2 * 20}%`  // 指向第三个提交
  };
});

// Reset模式数据
const activeMode = ref('soft');

const resetModes = ref([
  {
    id: 'soft',
    name: '软重置 (Soft Reset)',
    command: 'git reset --soft',
    description: '移动 HEAD 指针到目标提交，但不修改暂存区和工作目录。所有更改都保留在暂存区中，适合修改提交历史但保留更改的场景。',
    impact: {
      workingDirectory: '保持不变',
      stagingArea: '包含所有原更改',
      commitHistory: '修改'
    },
    visualization: {
      before: [
        { name: 'index.html', status: 'staged' },
        { name: 'styles.css', status: 'staged' },
        { name: 'script.js', status: 'unstaged' }
      ],
      after: [
        { name: 'index.html', status: 'staged' },
        { name: 'styles.css', status: 'staged' },
        { name: 'script.js', status: 'unstaged' }
      ]
    },
    examples: [
      {
        description: '撤销最近一次提交，保留更改在暂存区',
        command: 'git reset --soft HEAD~1'
      },
      {
        description: '撤销最近两次提交，保留更改在暂存区',
        command: 'git reset --soft HEAD~2'
      },
      {
        description: '重置到特定提交，保留所有更改在暂存区',
        command: 'git reset --soft a1b2c3d'
      }
    ]
  },
  {
    id: 'mixed',
    name: '混合重置 (Mixed Reset)',
    command: 'git reset',
    description: '默认模式。移动 HEAD 指针并重置暂存区，但不修改工作目录。更改保留在工作目录中，适合取消暂存文件。',
    impact: {
      workingDirectory: '保持不变',
      stagingArea: '重置',
      commitHistory: '修改'
    },
    visualization: {
      before: [
        { name: 'index.html', status: 'staged' },
        { name: 'styles.css', status: 'staged' },
        { name: 'script.js', status: 'unstaged' }
      ],
      after: [
        { name: 'index.html', status: 'unstaged' },
        { name: 'styles.css', status: 'unstaged' },
        { name: 'script.js', status: 'unstaged' }
      ]
    },
    examples: [
      {
        description: '取消所有已暂存的文件（默认行为）',
        command: 'git reset'
      },
      {
        description: '取消特定文件的暂存状态',
        command: 'git reset HEAD file.js'
      },
      {
        description: '撤销最近一次提交，保留更改在工作目录',
        command: 'git reset HEAD~1'
      }
    ]
  },
  {
    id: 'hard',
    name: '硬重置 (Hard Reset)',
    command: 'git reset --hard',
    description: '移动 HEAD 指针、重置暂存区和工作目录。丢弃所有更改，使工作目录完全匹配目标提交。使用时需格外谨慎。',
    impact: {
      workingDirectory: '重置',
      stagingArea: '重置',
      commitHistory: '修改'
    },
    visualization: {
      before: [
        { name: 'index.html', status: 'staged' },
        { name: 'styles.css', status: 'staged' },
        { name: 'script.js', status: 'unstaged' }
      ],
      after: [] // 所有更改都被丢弃
    },
    examples: [
      {
        description: '彻底丢弃所有未提交的更改',
        command: 'git reset --hard HEAD'
      },
      {
        description: '重置到特定提交，丢弃所有更改',
        command: 'git reset --hard a1b2c3d'
      },
      {
        description: '重置分支到远程分支状态',
        command: 'git reset --hard origin/main'
      }
    ]
  }
]);
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #f05032; // Git 主题色
@soft-color: #6cc644;
@mixed-color: #6f42c1;
@hard-color: #e34c26;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@header-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
@staged-color: #10b981;
@unstaged-color: #f59e0b;
@unchanged-color: #94a3b8;

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

.mode-visualization-image {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
}

// 基础样式
.git-reset-container {
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

  .git-reset-logo {
    position: relative;
    height: 120px;
    width: 100%;
    margin-bottom: 2rem;
  }

  .commit {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    .box-shadow();
    .transition();
    z-index: 1;

    .commit-id {
      font-size: 0.7rem;
      font-weight: 600;
      color: @text-color;
    }

    &.active-commit {
      background: @primary-color;
      color: white;
      transform: scale(1.1);
      z-index: 2;

      .commit-id {
        color: white;
      }
    }
  }

  .reset-pointer {
    position: absolute;
    top: -20px;
    width: 30px;
    height: 30px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f05032'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat center;
    background-size: contain;
    z-index: 3;
    animation: bounce 2s infinite;
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

.mode-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  .mode-tab {
    padding: 0.75rem 1.5rem;
    background: fade(@primary-color, 10%);
    border: none;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    .transition();

    &:hover {
      background: fade(@primary-color, 20%);
    }

    &.active {
      background: @primary-color;
      color: white;
    }
  }
}

.mode-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.mode-description {
  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @primary-color;

    code {
      background: fade(@primary-color, 10%);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.9em;
    }
  }

  p {
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.mode-impact {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;

  .impact-card {
    display: flex;
    gap: 0.75rem;
    background: fade(@primary-color, 5%);
    border-radius: 8px;
    padding: 1rem;

    .impact-icon {
      font-size: 1.5rem;
      color: @primary-color;
    }

    h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
    }

    p {
      margin: 0;
      font-size: 0.9rem;

      &.保持不变,
      &.未修改 {
        color: @staged-color;
      }

      &.重置,
      &.修改 {
        color: @hard-color;
      }

      &.包含所有原更改 {
        color: @mixed-color;
      }
    }
  }
}

.mode-visualization {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;

  .visualization-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 500;
    color: @text-secondary;
  }

  .visualization-content {
    .commit-row {
      display: flex;
      justify-content: space-around;
      margin-bottom: 2rem;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 24px;
        left: 5%;
        right: 5%;
        height: 2px;
        background: #cbd5e1;
        z-index: 1;
      }

      .commit-visual {
        position: relative;
        z-index: 2;

        .commit-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;

          span {
            font-size: 0.7rem;
            font-weight: 600;
          }

          &.head-commit {
            background: @primary-color;
            color: white;
            transform: scale(1.1);
          }
        }
      }
    }

    .state-row {
      display: flex;
      justify-content: space-between;
      gap: 2rem;

      .state {
        flex: 1;
        background: white;
        border-radius: 8px;
        padding: 1rem;
        .box-shadow();

        .state-title {
          font-weight: 500;
          margin-bottom: 1rem;
          text-align: center;
        }

        .file {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-bottom: 1px solid @border-color;

          &:last-child {
            border-bottom: none;
          }

          .file-icon {
            margin-right: 0.5rem;
          }

          .file-name {
            flex: 1;
            font-size: 0.9rem;
          }

          .file-status {
            font-size: 0.8rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;

            &.staged {
              background: fade(@staged-color, 10%);
              color: darken(@staged-color, 10%);
            }

            &.unstaged {
              background: fade(@unstaged-color, 10%);
              color: darken(@unstaged-color, 10%);
            }

            &.unchanged {
              background: fade(@unchanged-color, 10%);
              color: darken(@unchanged-color, 10%);
            }
          }
        }
      }

      .arrow {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        color: @text-secondary;
      }
    }
  }
}

.mode-examples {
  grid-column: 1 / -1;
  margin-top: 2rem;

  h3 {
    color: @primary-color;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .example {
    margin-bottom: 1.5rem;

    .example-description {
      margin-bottom: 0.5rem;
      color: @text-secondary;
    }

    pre {
      background: #1e293b;
      border-radius: 6px;
      padding: 1rem;
      margin: 0;
      overflow-x: auto;

      code {
        color: #cbd5e1;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid @primary-color;

  .scenario-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  p {
    margin: 0 0 1rem 0;
    color: @text-secondary;
    line-height: 1.6;
  }

  pre {
    background: #1e293b;
    border-radius: 6px;
    padding: 1rem;
    margin: 0;
    overflow-x: auto;

    code {
      color: #cbd5e1;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
  }
}

.comparison-table {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid @border-color;

  .table-row {
    display: flex;

    &:nth-child(even) {
      background-color: fade(@primary-color, 3%);
    }

    &.header {
      background-color: @primary-color;

      .table-cell {
        color: white;
        font-weight: 600;
      }
    }
  }

  .table-cell {
    flex: 1;
    padding: 1rem;

    &:first-child {
      flex: 0 0 200px;
      font-weight: 500;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: fade(@primary-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid fade(@primary-color, 15%);

  .practice-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @primary-color;
  }

  p {
    margin: 0 0 1rem 0;
    color: @text-secondary;
    line-height: 1.6;
  }

  pre {
    background: #1e293b;
    border-radius: 6px;
    padding: 1rem;
    margin: 0;
    overflow-x: auto;

    code {
      color: #cbd5e1;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
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
}

// 动画
@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .git-reset-container {
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

  .mode-detail {
    grid-template-columns: 1fr;
  }
}
</style>
