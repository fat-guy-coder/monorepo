<template>
  <div class="branch-management-container">
    <header class="header">
      <div class="logo-container">
        <div class="git-logo">
          <div class="branch" v-for="(branch, index) in branches" :key="index" :style="branchStyle(index)"
            :class="branchClasses(branch)">
            <div class="branch-name">{{ branch.name }}</div>
            <div class="branch-commits">
              <div class="commit" v-for="(c, i) in branch.commits" :key="i"></div>
            </div>
          </div>
        </div>
        <h1>Git 分支管理策略</h1>
      </div>
      <p class="subtitle">生产环境中的高效协作与发布流程</p>
    </header>

    <div class="content-section importance">
      <div class="section-header">
        <div class="section-icon">🌟</div>
        <h2>分支管理的重要性</h2>
      </div>
      <div class="section-content">
        <div class="importance-grid">
          <div class="importance-card">
            <div class="icon">🔄</div>
            <h3>并行开发</h3>
            <p>允许多功能同时开发，互不干扰</p>
          </div>
          <div class="importance-card">
            <div class="icon">🚀</div>
            <h3>持续交付</h3>
            <p>确保稳定版本随时可部署</p>
          </div>
          <div class="importance-card">
            <div class="icon">🛡️</div>
            <h3>风险隔离</h3>
            <p>实验性代码不会影响生产环境</p>
          </div>
          <div class="importance-card">
            <div class="icon">🧪</div>
            <h3>安全实验</h3>
            <p>新功能可在隔离环境中测试</p>
          </div>
          <div class="importance-card">
            <div class="icon">🔀</div>
            <h3>高效协作</h3>
            <p>团队协作更顺畅，减少冲突</p>
          </div>
          <div class="importance-card">
            <div class="icon">⏱️</div>
            <h3>快速修复</h3>
            <p>紧急问题可快速处理并部署</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section models">
      <div class="section-header">
        <div class="section-icon">📊</div>
        <h2>主流分支管理模型</h2>
      </div>
      <div class="section-content">
        <div class="model-tabs">
          <button v-for="model in models" :key="model.id" :class="['model-tab', { active: activeModel === model.id }]"
            @click="activeModel = model.id">
            {{ model.name }}
          </button>
        </div>

        <div class="model-content">
          <div v-for="model in models" :key="model.id" v-show="activeModel === model.id" class="model-detail">
            <div class="model-description">
              <h3>{{ model.name }}</h3>
              <p>{{ model.description }}</p>
              <div class="model-stats">
                <div class="stat">
                  <div class="stat-label">适用团队规模</div>
                  <div class="stat-value">{{ model.teamSize }}</div>
                </div>
                <div class="stat">
                  <div class="stat-label">发布频率</div>
                  <div class="stat-value">{{ model.releaseFrequency }}</div>
                </div>
                <div class="stat">
                  <div class="stat-label">复杂度</div>
                  <div class="stat-value">{{ model.complexity }}</div>
                </div>
              </div>
            </div>

            <div class="model-diagram">
              <div class="branch-line main">main</div>
              <div class="branch-line development" v-if="model.id === 'gitflow'">develop</div>

              <div class="feature-branches">
                <div class="feature-branch" v-for="(fb, idx) in model.featureBranches" :key="idx">
                  <div class="branch-label">feature/{{ fb.name }}</div>
                  <div class="branch-line"></div>
                </div>
              </div>

              <div class="release-branch" v-if="model.id === 'gitflow'">
                <div class="branch-label">release/v1.0</div>
                <div class="branch-line"></div>
              </div>

              <div class="hotfix-branch" v-if="model.id === 'gitflow'">
                <div class="branch-label">hotfix/bug-fix</div>
                <div class="branch-line"></div>
              </div>

              <div class="merge-arrows">
                <div class="arrow" v-for="(arrow, idx) in model.mergeArrows" :key="idx" :style="arrow.style">
                  <div class="arrow-head"></div>
                  <div class="arrow-line"></div>
                </div>
              </div>
            </div>

            <div class="model-pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li v-for="(pro, idx) in model.pros" :key="idx">{{ pro }}</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li v-for="(con, idx) in model.cons" :key="idx">{{ con }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section workflow">
      <div class="section-header">
        <div class="section-icon">🔄</div>
        <h2>生产环境标准工作流程</h2>
      </div>
      <div class="section-content">
        <div class="workflow-steps">
          <div class="step" v-for="(step, index) in workflowSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-commands" v-if="step.commands">
                <pre v-for="(cmd, cmdIdx) in step.commands" :key="cmdIdx"><code>{{ cmd }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section best-practices">
      <div class="section-header">
        <div class="section-icon">🏆</div>
        <h2>分支管理最佳实践</h2>
      </div>
      <div class="section-content">
        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">🏷️</div>
            <h3>命名规范</h3>
            <ul>
              <li>feature/功能名称</li>
              <li>bugfix/问题描述</li>
              <li>release/版本号</li>
              <li>hotfix/紧急描述</li>
            </ul>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🧹</div>
            <h3>分支清理</h3>
            <ul>
              <li>合并后立即删除分支</li>
              <li>定期清理陈旧分支</li>
              <li>使用自动化清理脚本</li>
            </ul>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🛡️</div>
            <h3>分支保护</h3>
            <ul>
              <li>保护主分支</li>
              <li>要求Pull Request</li>
              <li>要求代码审查</li>
              <li>要求CI通过</li>
            </ul>
          </div>
          <div class="practice-card">
            <div class="practice-icon">📏</div>
            <h3>分支规模</h3>
            <ul>
              <li>小型功能分支</li>
              <li>单任务分支</li>
              <li>生命周期短（1-3天）</li>
            </ul>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🔁</div>
            <h3>定期同步</h3>
            <ul>
              <li>每日从主分支rebase</li>
              <li>避免大型合并冲突</li>
              <li>保持分支更新</li>
            </ul>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🧪</div>
            <h3>环境对应</h3>
            <ul>
              <li>main -> 生产环境</li>
              <li>staging -> 预生产环境</li>
              <li>develop -> 集成环境</li>
              <li>feature/* -> 开发环境</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section tools">
      <div class="section-header">
        <div class="section-icon">🛠️</div>
        <h2>分支管理工具</h2>
      </div>
      <div class="section-content">
        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-icon">📊</div>
            <h3>Git Flow</h3>
            <p>经典分支模型自动化工具</p>
            <div class="tool-command">git flow init</div>
          </div>
          <div class="tool-card">
            <div class="tool-icon">🐙</div>
            <h3>GitHub</h3>
            <p>Pull Requests + Protected Branches</p>
            <div class="tool-command">分支保护规则</div>
          </div>
          <div class="tool-card">
            <div class="tool-icon">🦊</div>
            <h3>GitLab</h3>
            <p>Merge Requests + CI/CD Pipelines</p>
            <div class="tool-command">自动化部署流程</div>
          </div>
          <div class="tool-card">
            <div class="tool-icon">🚦</div>
            <h3>CI/CD 系统</h3>
            <p>自动化测试和部署</p>
            <div class="tool-command">Jenkins, GitLab CI, GitHub Actions</div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>高效的分支管理是团队协作和持续交付的基石，选择适合团队的分支策略并坚持最佳实践是成功的关键。</p>
      <div class="resources">
        <a href="https://nvie.com/posts/a-successful-git-branching-model/" target="_blank">Git Flow 模型</a>
        <a href="https://guides.github.com/introduction/flow/" target="_blank">GitHub Flow</a>
        <a href="https://docs.gitlab.com/ee/topics/gitlab_flow.html" target="_blank">GitLab Flow</a>
        <a href="https://www.atlassian.com/git/tutorials/comparing-workflows" target="_blank">工作流比较</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 分支数据
const branches = ref([
  {
    name: 'main',
    type: 'main',
    commits: Array(5).fill(null),
    active: true
  },
  {
    name: 'develop',
    type: 'develop',
    commits: Array(8).fill(null),
    active: false
  },
  {
    name: 'feature/login',
    type: 'feature',
    commits: Array(3).fill(null),
    active: true
  },
  {
    name: 'release/v1.2',
    type: 'release',
    commits: Array(2).fill(null),
    active: false
  },
  {
    name: 'hotfix/security-patch',
    type: 'hotfix',
    commits: Array(1).fill(null),
    active: true
  }
]);

// 分支位置计算
const branchStyle = (index: number) => {
  const positions = [
    { top: '10%', left: '50%' },
    { top: '30%', left: '30%' },
    { top: '30%', left: '70%' },
    { top: '50%', left: '50%' },
    { top: '70%', left: '50%' }
  ];

  return {
    top: positions[index].top,
    left: positions[index].left,
    animationDelay: `${index * 0.2}s`
  };
};

// 分支类名
const branchClasses = (branch: any) => {
  return {
    'main-branch': branch.type === 'main',
    'develop-branch': branch.type === 'develop',
    'feature-branch': branch.type === 'feature',
    'release-branch': branch.type === 'release',
    'hotfix-branch': branch.type === 'hotfix',
    'active-branch': branch.active
  };
};

// 分支模型数据
const activeModel = ref('gitflow');

const models = ref([
  {
    id: 'gitflow',
    name: 'Git Flow',
    description: '严格的模型，为发布、功能开发、热修复等定义特定的分支类型，适合有固定发布周期的项目。',
    teamSize: '中大型团队',
    releaseFrequency: '定期发布（每2-4周）',
    complexity: '高',
    featureBranches: [
      { name: 'user-auth' },
      { name: 'payment' },
      { name: 'notifications' }
    ],
    mergeArrows: [
      { style: { top: '25%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } },
      { style: { top: '40%', left: '30%', width: '100px', transform: 'rotate(20deg)' } }
    ],
    pros: [
      '明确的发布管理流程',
      '支持并行开发多个功能',
      '热修复独立于新功能开发',
      '适合有严格发布周期的项目'
    ],
    cons: [
      '学习曲线陡峭',
      '分支结构复杂',
      '合并冲突可能较多',
      '不适合持续部署'
    ]
  },
  {
    id: 'githubflow',
    name: 'GitHub Flow',
    description: '简化模型，只有主分支和功能分支，适合持续部署和快速迭代的项目。',
    teamSize: '小型敏捷团队',
    releaseFrequency: '持续部署（每天多次）',
    complexity: '低',
    featureBranches: [
      { name: 'dark-mode' },
      { name: 'search' },
      { name: 'profile' }
    ],
    mergeArrows: [
      { style: { top: '25%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } },
      { style: { top: '40%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } },
      { style: { top: '55%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } }
    ],
    pros: [
      '简单易学',
      '支持持续部署',
      '减少合并冲突',
      '适合SaaS和Web应用'
    ],
    cons: [
      '缺乏发布分支',
      '紧急修复可能复杂',
      '不适合有预发布周期的项目',
      '主分支需要高度稳定'
    ]
  },
  {
    id: 'gitlabflow',
    name: 'GitLab Flow',
    description: '结合Git Flow和GitHub Flow的优点，引入环境分支和上游优先原则。',
    teamSize: '各种规模团队',
    releaseFrequency: '灵活（持续交付或定期发布）',
    complexity: '中',
    featureBranches: [
      { name: 'analytics' },
      { name: 'settings' }
    ],
    mergeArrows: [
      { style: { top: '25%', left: '70%', width: '100px', transform: 'rotate(-20deg)' } },
      { style: { top: '40%', left: '30%', width: '100px', transform: 'rotate(20deg)' } },
      { style: { top: '60%', left: '50%', width: '80px', transform: 'rotate(0deg)' } }
    ],
    pros: [
      '支持环境分支（production, staging）',
      '上游优先原则减少冲突',
      '结合CI/CD自动化',
      '适合有多个环境的项目'
    ],
    cons: [
      '比GitHub Flow复杂',
      '需要理解上游优先原则',
      '环境分支可能增加复杂性'
    ]
  }
]);

// 工作流程步骤
const workflowSteps = ref([
  {
    title: '从主分支创建功能分支',
    description: '基于最新的主分支代码创建新分支进行功能开发',
    commands: [
      'git checkout main',
      'git pull',
      'git checkout -b feature/new-feature'
    ]
  },
  {
    title: '开发并定期提交',
    description: '在功能分支上进行开发，定期提交小粒度的变更',
    commands: [
      'git add .',
      'git commit -m "添加新功能X的初始实现"',
      'git push origin feature/new-feature'
    ]
  },
  {
    title: '同步主分支变更',
    description: '定期将主分支的更新合并到功能分支，减少冲突',
    commands: [
      'git checkout main',
      'git pull',
      'git checkout feature/new-feature',
      'git rebase main'
    ]
  },
  {
    title: '创建Pull Request',
    description: '功能完成后创建PR，触发CI/CD流程',
    commands: [
      '# 在GitHub/GitLab上创建Pull Request',
      '# 关联Issue，添加描述'
    ]
  },
  {
    title: '代码审查与讨论',
    description: '团队成员审查代码，提出改进建议',
    commands: []
  },
  {
    title: '解决反馈并更新',
    description: '根据反馈修改代码，推送到功能分支',
    commands: [
      'git add .',
      'git commit -m "根据反馈优化实现"',
      'git push origin feature/new-feature'
    ]
  },
  {
    title: '合并到主分支',
    description: '通过CI/CD后，将功能分支合并到主分支',
    commands: [
      'git checkout main',
      'git merge --no-ff feature/new-feature',
      'git push origin main'
    ]
  },
  {
    title: '部署到生产环境',
    description: '自动或手动将主分支部署到生产环境',
    commands: [
      '# CI/CD系统自动部署',
      '# 或手动触发部署流程'
    ]
  },
  {
    title: '清理功能分支',
    description: '合并后删除功能分支，保持仓库整洁',
    commands: [
      'git branch -d feature/new-feature',
      'git push origin --delete feature/new-feature'
    ]
  }
]);
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #f05032; // Git 主题色
@develop-color: #6cc644;
@feature-color: #6f42c1;
@release-color: #f1e05a;
@hotfix-color: #e34c26;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@header-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.branch-management-container {
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
    height: 300px;
    width: 100%;
    margin-bottom: 2rem;
  }

  .branch {
    position: absolute;
    width: 180px;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    .box-shadow();
    .transition();
    z-index: 1;

    .branch-name {
      font-weight: 600;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .branch-commits {
      display: flex;
      gap: 4px;

      .commit {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #cbd5e1;
      }
    }

    &.active-branch {
      transform: scale(1.05);
      z-index: 2;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    &.main-branch {
      border-top: 3px solid @primary-color;

      .branch-name {
        color: @primary-color;
      }

      .commit {
        background: @primary-color;
      }
    }

    &.develop-branch {
      border-top: 3px solid @develop-color;

      .branch-name {
        color: @develop-color;
      }

      .commit {
        background: @develop-color;
      }
    }

    &.feature-branch {
      border-top: 3px solid @feature-color;

      .branch-name {
        color: @feature-color;
      }

      .commit {
        background: @feature-color;
      }
    }

    &.release-branch {
      border-top: 3px solid @release-color;

      .branch-name {
        color: @release-color;
      }

      .commit {
        background: @release-color;
      }
    }

    &.hotfix-branch {
      border-top: 3px solid @hotfix-color;

      .branch-name {
        color: @hotfix-color;
      }

      .commit {
        background: @hotfix-color;
      }
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

.importance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.importance-card {
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

  .icon {
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

.model-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  .model-tab {
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

.model-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.model-description {
  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  p {
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.model-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  .stat {
    background: fade(@primary-color, 5%);
    border-radius: 8px;
    padding: 1rem;
    text-align: center;

    .stat-label {
      font-size: 0.85rem;
      color: @text-secondary;
      margin-bottom: 0.25rem;
    }

    .stat-value {
      font-weight: 600;
    }
  }
}

.model-diagram {
  position: relative;
  height: 300px;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;

  .branch-line {
    height: 4px;
    background: #cbd5e1;
    border-radius: 2px;
    position: absolute;

    &.main {
      width: 80%;
      top: 20%;
      left: 10%;
      background: @primary-color;
    }

    &.development {
      width: 80%;
      top: 40%;
      left: 10%;
      background: @develop-color;
    }
  }

  .feature-branches {
    position: absolute;
    top: 25%;
    right: 10%;
    width: 30%;

    .feature-branch {
      margin-bottom: 1.5rem;

      .branch-label {
        font-size: 0.8rem;
        color: @feature-color;
        margin-bottom: 0.25rem;
      }

      .branch-line {
        height: 4px;
        background: @feature-color;
        width: 100%;
      }
    }
  }

  .release-branch {
    position: absolute;
    top: 60%;
    left: 10%;
    width: 30%;

    .branch-label {
      font-size: 0.8rem;
      color: @release-color;
      margin-bottom: 0.25rem;
    }

    .branch-line {
      height: 4px;
      background: @release-color;
      width: 100%;
    }
  }

  .hotfix-branch {
    position: absolute;
    top: 80%;
    left: 10%;
    width: 30%;

    .branch-label {
      font-size: 0.8rem;
      color: @hotfix-color;
      margin-bottom: 0.25rem;
    }

    .branch-line {
      height: 4px;
      background: @hotfix-color;
      width: 100%;
    }
  }

  .merge-arrows {
    .arrow {
      position: absolute;

      .arrow-head {
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 10px solid @primary-color;
        position: absolute;
        top: 0;
        right: 0;
      }

      .arrow-line {
        height: 2px;
        background: @primary-color;
        width: 100%;
        position: absolute;
        top: 5px;
      }
    }
  }
}

.model-pros-cons {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros,
  .cons {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1.5rem;

    h4 {
      margin-top: 0;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e9ecef;
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

  .pros {
    border-left: 4px solid @develop-color;
  }

  .cons {
    border-left: 4px solid @hotfix-color;
  }
}

.workflow-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: fade(@primary-color, 3%);
  border-radius: 12px;
  border-left: 4px solid @primary-color;

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
    flex-shrink: 0;
  }

  .step-content {
    h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: @primary-color;
    }

    p {
      margin: 0 0 1rem 0;
      color: @text-secondary;
      line-height: 1.6;
    }
  }

  .step-commands {
    pre {
      background: #1e293b;
      border-radius: 6px;
      padding: 1rem;
      margin: 0.5rem 0;
      overflow-x: auto;

      code {
        color: #cbd5e1;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
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
    margin-bottom: 1rem;
    color: @primary-color;
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

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  .box-shadow();
  border-top: 3px solid @primary-color;

  .tool-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: @primary-color;
  }

  p {
    margin: 0 0 1rem 0;
    color: @text-secondary;
    line-height: 1.6;
  }

  .tool-command {
    font-family: 'Fira Code', monospace;
    background: fade(@primary-color, 10%);
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.9rem;
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

// 响应式设计
@media (max-width: 768px) {
  .branch-management-container {
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

  .model-detail {
    grid-template-columns: 1fr;
  }
}
</style>
