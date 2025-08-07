<template>
  <div class="git-revert-container">
    <header class="header">
      <div class="logo-container">
        <div class="git-revert-logo">
          <div class="commit" v-for="(commit, index) in commits" :key="index" :style="commitStyle(index)"
            :class="commitClasses(commit)">
            <div class="commit-id">{{ commit.id }}</div>
          </div>
          <div class="revert-commit" :style="revertCommitStyle">
            <div class="revert-icon">↩️</div>
          </div>
        </div>
        <h1>Git Revert 命令基础介绍</h1>
      </div>
      <p class="subtitle">安全撤销已推送提交的最佳实践</p>
    </header>

    <div class="content-section concept">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>概念与作用</h2>
      </div>
      <div class="section-content">
        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">↩️</div>
            <h3>什么是 revert？</h3>
            <p><code>git revert</code> 是用于创建一个新提交来撤销指定提交更改的命令。它不会修改现有历史，而是添加新的提交来反转更改。</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🛡️</div>
            <h3>安全撤销</h3>
            <p>与 reset 不同，revert 是安全的撤销方式，特别适合已推送到远程仓库的提交，因为它不会重写公共历史。</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>工作原理</h3>
            <p>Revert 分析目标提交引入的更改，然后创建一个新提交来应用反向更改，从而撤销原始提交的效果。</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section parameters">
      <div class="section-header">
        <div class="section-icon">⚙️</div>
        <h2>参数基础介绍</h2>
      </div>
      <div class="section-content">
        <div class="parameters-grid">
          <div class="parameter-card">
            <div class="param-header">
              <div class="param-icon">🔑</div>
              <h3>提交标识符</h3>
            </div>
            <div class="param-content">
              <p>指定要撤销的提交，可以是完整哈希值、短哈希或引用（如 HEAD~1）</p>
              <pre><code>git revert a1b2c3d</code></pre>
              <pre><code>git revert HEAD~2</code></pre>
            </div>
          </div>

          <div class="parameter-card">
            <div class="param-header">
              <div class="param-icon">📝</div>
              <h3>-n / --no-commit</h3>
            </div>
            <div class="param-content">
              <p>撤销更改但不自动提交，允许在提交前进行额外修改</p>
              <pre><code>git revert -n a1b2c3d
# 进行额外修改
git commit -m "撤销提交并修复相关问题"</code></pre>
            </div>
          </div>

          <div class="parameter-card">
            <div class="param-header">
              <div class="param-icon">🧩</div>
              <h3>-m parent-number</h3>
            </div>
            <div class="param-content">
              <p>撤销合并提交时指定主分支（通常为1）</p>
              <pre><code>git revert -m 1 &lt;merge-commit&gt;</code></pre>
              <p class="note">合并提交有两个父提交，-m 1 表示保留第一个父分支的历史</p>
            </div>
          </div>

          <div class="parameter-card">
            <div class="param-header">
              <div class="param-icon">✏️</div>
              <h3>--edit</h3>
            </div>
            <div class="param-content">
              <p>默认行为，允许编辑提交消息</p>
              <pre><code>git revert --edit a1b2c3d</code></pre>
            </div>
          </div>

          <div class="parameter-card">
            <div class="param-header">
              <div class="param-icon">📄</div>
              <h3>--no-edit</h3>
            </div>
            <div class="param-content">
              <p>使用自动生成的提交消息，不打开编辑器</p>
              <pre><code>git revert --no-edit a1b2c3d</code></pre>
            </div>
          </div>

          <div class="parameter-card">
            <div class="param-header">
              <div class="param-icon">🚫</div>
              <h3>--abort</h3>
            </div>
            <div class="param-content">
              <p>取消正在进行的revert操作，解决冲突时使用</p>
              <pre><code>git revert --abort</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section workflow">
      <div class="section-header">
        <div class="section-icon">🔄</div>
        <h2>Revert 工作流程</h2>
      </div>
      <div class="section-content">
        <div class="workflow-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>识别问题提交</h3>
              <p>使用 <code>git log</code> 或 GUI 工具找到需要撤销的提交</p>
              <pre><code>git log --oneline</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>执行 Revert 命令</h3>
              <p>运行 revert 命令并指定提交标识符</p>
              <pre><code>git revert a1b2c3d</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>解决冲突（如有）</h3>
              <p>如果撤销导致冲突，手动解决冲突后继续</p>
              <pre><code># 解决冲突
git add .
git revert --continue</code></pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>编辑提交消息</h3>
              <p>在编辑器中查看或修改自动生成的提交消息</p>
              <div class="commit-message">
                <div>Revert "原提交消息"</div>
                <div>This reverts commit a1b2c3d.</div>
              </div>
            </div>
          </div>
          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>推送到远程仓库</h3>
              <p>将撤销提交推送到远程仓库</p>
              <pre><code>git push origin main</code></pre>
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
            <div class="scenario-icon">🚨</div>
            <h3>修复生产环境问题</h3>
            <p>快速撤销导致生产问题的提交，而不影响其他开发</p>
            <pre><code>git revert 0a1b2c3 # 导致问题的提交
git push origin main</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🧩</div>
            <h3>撤销合并提交</h3>
            <p>撤销整个合并请求引入的更改</p>
            <pre><code>git revert -m 1 d4e5f67 # 合并提交</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🔁</div>
            <h3>临时移除功能</h3>
            <p>临时禁用某个功能，后续可再恢复</p>
            <pre><code>git revert feature-commit</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">⏳</div>
            <h3>撤销历史提交</h3>
            <p>撤销非最近提交而不影响后续提交</p>
            <pre><code>git revert old-commit</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🧪</div>
            <h3>安全实验</h3>
            <p>安全地尝试新想法，可随时撤销</p>
            <pre><code># 尝试新功能
# 如果不成功
git revert experiment-commit</code></pre>
          </div>
          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>撤销多个提交</h3>
            <p>按顺序撤销多个提交</p>
            <pre><code>git revert older_commit..newer_commit</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section comparison">
      <div class="section-header">
        <div class="section-icon">🆚</div>
        <h2>Revert 与相关命令对比</h2>
      </div>
      <div class="section-content">
        <div class="comparison-table">
          <div class="table-row header">
            <div class="table-cell">特性</div>
            <div class="table-cell">revert</div>
            <div class="table-cell">reset</div>
            <div class="table-cell">restore</div>
            <div class="table-cell">checkout</div>
          </div>
          <div class="table-row">
            <div class="table-cell">是否修改历史</div>
            <div class="table-cell">❌ 添加新提交</div>
            <div class="table-cell">✅ 重写历史</div>
            <div class="table-cell">❌ 不修改历史</div>
            <div class="table-cell">❌ 不修改历史</div>
          </div>
          <div class="table-row">
            <div class="table-cell">适用提交状态</div>
            <div class="table-cell">已提交</div>
            <div class="table-cell">已提交</div>
            <div class="table-cell">未提交</div>
            <div class="table-cell">未提交/已提交</div>
          </div>
          <div class="table-cell">
            <div class="table-cell">安全用于公共分支</div>
            <div class="table-cell">✅ 安全</div>
            <div class="table-cell">❌ 危险</div>
            <div class="table-cell">✅ 安全</div>
            <div class="table-cell">✅ 安全</div>
          </div>
          <div class="table-row">
            <div class="table-cell">影响范围</div>
            <div class="table-cell">提交历史（添加新提交）</div>
            <div class="table-cell">提交历史、暂存区、工作目录</div>
            <div class="table-cell">工作目录或暂存区</div>
            <div class="table-cell">工作目录</div>
          </div>
          <div class="table-row">
            <div class="table-cell">主要用途</div>
            <div class="table-cell">撤销已推送的提交</div>
            <div class="table-cell">撤销本地提交</div>
            <div class="table-cell">恢复文件</div>
            <div class="table-cell">切换分支或恢复文件</div>
          </div>
          <div class="table-row">
            <div class="table-cell">冲突处理</div>
            <div class="table-cell">✅ 支持</div>
            <div class="table-cell">❌ 不支持</div>
            <div class="table-cell">❌ 不支持</div>
            <div class="table-cell">✅ 支持</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section best-practices">
      <div class="section-header">
        <div class="section-icon">✅</div>
        <h2>最佳实践</h2>
      </div>
      <div class="section-content">
        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">🔍</div>
            <h3>精确撤销</h3>
            <p>只撤销有问题的特定提交，而不是大范围撤销</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">📝</div>
            <h3>清晰提交信息</h3>
            <p>在revert提交中说明撤销原因和原始提交</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🧪</div>
            <h3>测试撤销</h3>
            <p>在本地测试revert效果后再推送到远程</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🧩</div>
            <h3>处理合并提交</h3>
            <p>使用 <code>-m</code> 参数正确撤销合并提交</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">🔁</div>
            <h3>顺序撤销</h3>
            <p>按顺序撤销多个提交，避免冲突</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">💬</div>
            <h3>团队沟通</h3>
            <p>通知团队成员已撤销的提交，避免代码被重新引入</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section revert-tips">
      <div class="section-header">
        <div class="section-icon">💡</div>
        <h2>高级技巧</h2>
      </div>
      <div class="section-content">
        <div class="tips-grid">
          <div class="tip-card">
            <h3>撤销 revert</h3>
            <p>如果需要恢复被撤销的更改，可以revert revert提交</p>
            <pre><code>git revert revert-commit</code></pre>
          </div>
          <div class="tip-card">
            <h3>交互式revert</h3>
            <p>使用 <code>-i</code> 参数交互式选择要撤销的提交</p>
            <pre><code>git revert -i HEAD~3</code></pre>
          </div>
          <div class="tip-card">
            <h3>撤销并修改</h3>
            <p>结合 <code>--no-commit</code> 在撤销后添加额外修复</p>
            <pre><code>git revert --no-commit bad-commit
# 添加额外修复
git commit -m "撤销并修复相关问题"</code></pre>
          </div>
          <div class="tip-card">
            <h3>自动化revert</h3>
            <p>在CI/CD流水线中自动revert特定标记的提交</p>
            <pre><code># 查找标记为[revert-me]的提交
git log --grep="\[revert-me\]"</code></pre>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Git revert 是撤销已推送更改的安全方法，保留了完整的历史记录，是团队协作中不可或缺的工具。</p>
      <div class="resources">
        <a href="https://git-scm.com/docs/git-revert" target="_blank">官方文档</a>
        <a href="https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified" target="_blank">Git工具基础介绍</a>
        <a href="https://ohshitgit.com/" target="_blank">常见Git问题解决</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 提交历史数据
const commits = ref([
  { id: 'a1b2c3', message: '添加用户模型', active: false },
  { id: 'd4e5f6', message: '实现登录功能', active: false },
  { id: 'g7h8i9', message: '添加注销功能', active: true },
  { id: 'j0k1l2', message: '最新提交', active: false }
]);

// 提交历史数据

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

// revert提交位置
const revertCommitStyle = computed(() => {
  return {
    left: `${10 + 2 * 20}%`  // 指向第三个提交
  };
});
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #f05032; // Git 主题色
@revert-color: #3b82f6;
@background: #f8fafc;
@card-bg: #ffffff;
@text-color: #1e293b;
@text-secondary: #64748b;
@border-color: #e2e8f0;
@header-bg: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
@success-color: #10b981;
@warning-color: #f59e0b;
@danger-color: #ef4444;

// 混合宏
.box-shadow() {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.transition(@property: all, @duration: 0.3s) {
  transition: @property @duration ease;
}

// 基础样式
.git-revert-container {
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

  .git-revert-logo {
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

  .revert-commit {
    position: absolute;
    top: -25px;
    width: 60px;
    height: 60px;
    background: @revert-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    animation: pulse 2s infinite;

    .revert-icon {
      font-size: 1.5rem;
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
    background: linear-gradient(90deg, @revert-color 0%, darken(@revert-color, 10%) 100%);

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
  background: fade(@revert-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid fade(@revert-color, 15%);
  .transition();

  &:hover {
    transform: translateY(-5px);
    border-color: fade(@revert-color, 30%);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: @revert-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @revert-color;
  }

  p {
    margin: 0;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.parameters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.parameter-card {
  background: fade(@revert-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid @revert-color;

  .param-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .param-icon {
      font-size: 1.8rem;
      color: @revert-color;
    }

    h3 {
      margin: 0;
      color: @revert-color;
    }
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
    margin: 0.5rem 0;
    overflow-x: auto;

    code {
      color: #cbd5e1;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
  }

  .note {
    font-size: 0.9rem;
    color: @warning-color;
    font-style: italic;
    margin-top: 0.5rem;
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
  background: fade(@revert-color, 5%);
  border-radius: 12px;
  border-left: 4px solid @revert-color;

  .step-number {
    width: 36px;
    height: 36px;
    background: @revert-color;
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
      color: @revert-color;
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
      margin: 0.5rem 0;
      overflow-x: auto;

      code {
        color: #cbd5e1;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }

    .commit-message {
      background: #f1f5f9;
      border-radius: 6px;
      padding: 1rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      border-left: 3px solid @revert-color;
    }
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: fade(@revert-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid @revert-color;

  .scenario-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: @revert-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @revert-color;
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
      background-color: fade(@revert-color, 3%);
    }

    &.header {
      background-color: @revert-color;

      .table-cell {
        color: white;
        font-weight: 600;
      }
    }
  }

  .table-cell {
    flex: 1;
    padding: 1rem;
    text-align: center;

    &:first-child {
      flex: 0 0 200px;
      font-weight: 500;
      text-align: left;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-card {
  background: fade(@revert-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid fade(@revert-color, 15%);

  .practice-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: @revert-color;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: @revert-color;
  }

  p {
    margin: 0;
    color: @text-secondary;
    line-height: 1.6;
  }
}

.revert-tips {
  .section-content {
    padding: 2rem;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  background: fade(@revert-color, 5%);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid @revert-color;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: @revert-color;
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
      color: @revert-color;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 30px;
      background: fade(@revert-color, 10%);
      .transition();

      &:hover {
        background: fade(@revert-color, 20%);
        color: darken(@revert-color, 10%);
      }
    }
  }
}

// 动画
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .git-revert-container {
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

  .step {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
