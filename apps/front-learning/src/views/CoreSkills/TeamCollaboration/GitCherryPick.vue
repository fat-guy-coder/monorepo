<template>
  <div class="cherry-pick-guide">
    <header class="header">
      <div class="header-content">
        <h1>Git Cherry-Pick 指南</h1>
        <p class="subtitle">精准挑选提交的 Git 高级技巧</p>
        <div class="command-preview">
          <span class="prompt">$</span>
          <span class="command">git cherry-pick &lt;commit-hash&gt;</span>
        </div>
      </div>
      <div class="header-illustration">
        <div class="branch-diagram">
          <div class="branch master">
            <div class="branch-name">main</div>
            <div class="commits">
              <div class="commit">A</div>
              <div class="commit">B</div>
              <div class="commit">C</div>
            </div>
          </div>
          <div class="branch feature">
            <div class="branch-name">feature</div>
            <div class="commits">
              <div class="commit">D</div>
              <div class="commit">E</div>
              <div class="commit highlight">F</div>
            </div>
          </div>
          <div class="arrow">→</div>
          <div class="branch master-after">
            <div class="branch-name">main</div>
            <div class="commits">
              <div class="commit">A</div>
              <div class="commit">B</div>
              <div class="commit">C</div>
              <div class="commit highlight">F'</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="section">
        <h2 class="section-title">📚 什么是 Cherry-Pick？</h2>
        <div class="concept-cards">
          <div class="concept-card">
            <div class="concept-icon">🍒</div>
            <h3>核心概念</h3>
            <p>Cherry-pick 是 Git 的一个命令，允许你将特定提交从一个分支应用到另一个分支，而不需要合并整个分支。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>与合并的区别</h3>
            <div class="comparison">
              <div class="comparison-item">
                <h4>Cherry-Pick</h4>
                <ul>
                  <li>选择单个提交</li>
                  <li>不引入分支历史</li>
                  <li>创建新的提交</li>
                </ul>
              </div>
              <div class="comparison-item">
                <h4>Merge</h4>
                <ul>
                  <li>合并整个分支</li>
                  <li>保留分支历史</li>
                  <li>创建合并提交</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="concept-card">
            <div class="concept-icon">⚙️</div>
            <h3>工作机制</h3>
            <ul class="workflow">
              <li>1. 获取提交的更改差异</li>
              <li>2. 在当前分支应用这些更改</li>
              <li>3. 创建新的提交对象</li>
              <li>4. 保留原始提交信息</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">✨ 为什么使用 Cherry-Pick？</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">🎯</div>
            <h3>精准选择</h3>
            <p>只引入特定的提交，而不是整个分支的所有变更</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🧩</div>
            <h3>灵活组合</h3>
            <p>从多个分支挑选所需的提交组合到新分支</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">📦</div>
            <h3>解决冲突</h3>
            <p>当合并整个分支不可行时，选择性引入变更</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🚚</div>
            <h3>代码复用</h3>
            <p>在不同分支间复用特定功能或修复</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🔀</div>
            <h3>避免合并</h3>
            <p>绕过不必要的合并提交，保持历史清晰</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon">🧪</div>
            <h3>隔离测试</h3>
            <p>在安全环境中测试特定变更</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">🛠️ 如何使用 Cherry-Pick</h2>
        <div class="usage-grid">
          <div class="usage-step">
            <div class="step-number">1</div>
            <h3>查找提交哈希</h3>
            <pre><code class="language-bash">$ git log --oneline feature-branch
e6f5a0d (HEAD -> feature-branch) Add new API endpoint
<b>a1b2c3d</b> Fix security vulnerability
d4e5f6a Refactor user service</code></pre>
          </div>

          <div class="usage-step">
            <div class="step-number">2</div>
            <h3>切换到目标分支</h3>
            <pre><code class="language-bash">$ git checkout main
Switched to branch 'main'</code></pre>
          </div>

          <div class="usage-step">
            <div class="step-number">3</div>
            <h3>执行 Cherry-Pick</h3>
            <pre><code class="language-bash">$ git cherry-pick a1b2c3d
[main 9f7e6d1] Fix security vulnerability
 Date: Mon Oct 2 14:30:22 2023 +0800
 2 files changed, 15 insertions(+), 3 deletions(-)</code></pre>
          </div>

          <div class="usage-step">
            <div class="step-number">4</div>
            <h3>高级用法</h3>
            <div class="advanced-commands">
              <div class="command-item">
                <div class="command">git cherry-pick -n</div>
                <div class="desc">应用更改但不提交</div>
              </div>
              <div class="command-item">
                <div class="command">git cherry-pick -x</div>
                <div class="desc">添加来源提交哈希到提交消息</div>
              </div>
              <div class="command-item">
                <div class="command">git cherry-pick A^..B</div>
                <div class="desc">挑选提交范围</div>
              </div>
              <div class="command-item">
                <div class="command">git cherry-pick --abort</div>
                <div class="desc">取消 cherry-pick 操作</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">⚠️ 处理 Cherry-Pick 冲突</h2>
        <div class="conflict-resolution">
          <div class="conflict-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>解决冲突</h4>
                <p>手动编辑冲突文件</p>
                <pre><code class="language-diff">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
console.log('Current branch code');
=======
console.log('Incoming cherry-pick code');
&gt;&gt;&gt;&gt;&gt;&gt;&gt; a1b2c3d</code></pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>标记已解决</h4>
                <p>使用 git add 标记解决的文件</p>
                <pre><code class="language-bash">$ git add path/to/resolved-file.js</code></pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>继续 Cherry-Pick</h4>
                <p>完成操作</p>
                <pre><code class="language-bash">$ git cherry-pick --continue</code></pre>
              </div>
            </div>
          </div>

          <div class="conflict-tips">
            <h3>冲突解决技巧</h3>
            <ul>
              <li>使用 <code>git status</code> 查看冲突文件</li>
              <li>VS Code 等编辑器提供图形化冲突解决工具</li>
              <li>使用 <code>git diff</code> 查看冲突差异</li>
              <li>必要时手动编辑冲突标记</li>
              <li>完成后务必运行测试</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">💼 Cherry-Pick 使用场景</h2>
        <div class="scenarios">
          <div class="scenario-card">
            <div class="scenario-icon">🐛</div>
            <h3>修复生产缺陷</h3>
            <p>将修复补丁应用到生产分支而无需合并整个功能分支</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔁</div>
            <h3>代码迁移</h3>
            <p>将提交从旧仓库迁移到新仓库</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🧩</div>
            <h3>部分功能移植</h3>
            <p>将某个功能的提交应用到不同版本的分支</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🧪</div>
            <h3>隔离测试</h3>
            <p>在测试分支中单独测试某个提交的变更</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>重构分离</h3>
            <p>从重构分支中挑选出功能性变更</p>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📝</div>
            <h3>提交整理</h3>
            <p>在 rebase 过程中重新组织提交顺序</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">📝 最佳实践与注意事项</h2>
        <div class="best-practices">
          <div class="dos-donts">
            <div class="dos">
              <h3>✅ 推荐做法</h3>
              <ul>
                <li>挑选小型、独立的提交</li>
                <li>每次操作后运行测试</li>
                <li>使用 <code>-x</code> 选项保留原始提交信息</li>
                <li>确认目标分支处于干净状态</li>
                <li>编写清晰的提交消息</li>
              </ul>
            </div>

            <div class="donts">
              <h3>❌ 避免做法</h3>
              <ul>
                <li>挑选合并提交（使用 <code>-m</code> 选项）</li>
                <li>频繁使用导致历史碎片化</li>
                <li>替代正常的合并工作流</li>
                <li>挑选依赖其他提交的变更</li>
                <li>忽视冲突解决</li>
              </ul>
            </div>
          </div>

          <div class="practice-tips">
            <h3>高级技巧</h3>
            <ol>
              <li>使用 <code>git cherry</code> 查看可挑选的提交</li>
              <li>结合 <code>git rebase -i</code> 整理提交历史</li>
              <li>使用 <code>git range-diff</code> 验证挑选结果</li>
              <li>对提交签名增加 <code>-S</code> 选项</li>
              <li>使用 <code>--strategy-option</code> 解决复杂冲突</li>
            </ol>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Git Cherry-Pick 技术指南  | 精准选择提交，灵活管理代码 | 使用前请务必理解其工作原理</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const activeStep = ref(1);
</script>

<style lang="less" scoped>
.cherry-pick-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #2c3e50;
  background: #f8fafc;
  line-height: 1.6;
}

.header {
  display: flex;
  background: linear-gradient(135deg, #1a2a6c 0%, #b91d73 100%);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 40px;
  color: white;
  box-shadow: 0 10px 30px rgba(26, 42, 108, 0.2);

  .header-content {
    flex: 1;
    padding: 40px;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      margin-bottom: 30px;
    }

    .command-preview {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      padding: 15px 20px;
      font-family: 'Fira Code', monospace;
      display: inline-flex;
      align-items: center;

      .prompt {
        color: #50fa7b;
        margin-right: 10px;
      }

      .command {
        font-weight: 500;
      }
    }
  }

  .header-illustration {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: rgba(255, 255, 255, 0.1);

    .branch-diagram {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .branch {
        display: flex;
        width: 100%;
        margin-bottom: 30px;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          left: 80px;
          top: 50%;
          height: 2px;
          background: rgba(255, 255, 255, 0.5);
        }

        .branch-name {
          width: 80px;
          font-weight: 600;
          opacity: 0.9;
        }

        .commits {
          display: flex;
          gap: 15px;

          .commit {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

            &.highlight {
              background: #ffc107;
              color: #1a2a6c;
              animation: pulse 2s infinite;
            }
          }
        }

        &.master:before {
          width: calc(100% - 90px);
        }

        &.feature:before {
          width: calc(60% - 90px);
        }
      }

      .arrow {
        font-size: 2rem;
        margin: 10px 0 30px;
        animation: bounce 2s infinite;
      }
    }
  }
}

.section {
  margin-bottom: 50px;

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #eaecef;
    color: #1a2a6c;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .concept-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #b91d73;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1a2a6c;
  }

  p,
  ul {
    color: #555;
  }

  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 15px;

    .comparison-item {
      padding: 15px;
      border-radius: 8px;
      background: #f8f9fc;

      h4 {
        margin-top: 0;
        color: #1a2a6c;
        border-bottom: 1px solid #eaecef;
        padding-bottom: 10px;
      }

      ul {
        padding-left: 20px;
        margin: 10px 0 0 0;

        li {
          margin-bottom: 8px;
          color: #555;
        }
      }
    }
  }

  .workflow {
    padding-left: 20px;

    li {
      margin-bottom: 12px;
      padding-left: 8px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -18px;
        top: 8px;
        width: 8px;
        height: 8px;
        background: #b91d73;
        border-radius: 50%;
      }
    }
  }
}

.benefits-grid,
.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.benefit-card,
.scenario-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .benefit-icon,
  .scenario-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #b91d73;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1a2a6c;
  }

  p {
    color: #555;
    margin: 0;
  }
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.usage-step {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;

  .step-number {
    position: absolute;
    top: -15px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #b91d73;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(185, 29, 115, 0.3);
  }

  h3 {
    margin-top: 5px;
    color: #1a2a6c;
  }

  pre {
    margin: 15px 0 0 0;
    padding: 15px;
    background: #2d2d2d;
    color: #f8f8f2;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;

    code {
      font-family: inherit;

      b {
        color: #ffc107;
        font-weight: bold;
      }
    }
  }

  .advanced-commands {
    margin-top: 15px;

    .command-item {
      padding: 12px 15px;
      background: #f8f9fc;
      border-radius: 8px;
      margin-bottom: 10px;

      .command {
        font-family: 'Fira Code', monospace;
        font-weight: 500;
        color: #b91d73;
      }

      .desc {
        color: #555;
        font-size: 0.95rem;
        margin-top: 5px;
      }
    }
  }
}

.conflict-resolution {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  .conflict-steps {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .step {
      display: flex;
      gap: 15px;
      align-items: flex-start;

      .step-number {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #b91d73;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }

      .step-content {
        h4 {
          margin: 0 0 8px 0;
          color: #1a2a6c;
          font-size: 1.1rem;
        }

        p {
          margin: 0 0 10px 0;
          color: #555;
        }

        pre {
          margin: 10px 0 0 0;
          padding: 12px;
          background: #2d2d2d;
          color: #f8f8f2;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;

          code {
            font-family: inherit;
          }
        }
      }
    }
  }

  .conflict-tips {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      color: #1a2a6c;
      padding-bottom: 10px;
      border-bottom: 1px solid #eaecef;
    }

    ul {
      padding-left: 20px;
      margin: 15px 0 0 0;

      li {
        margin-bottom: 12px;
        color: #555;
        line-height: 1.6;

        code {
          background: #f8f9fc;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }
      }
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  .dos-donts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    .dos,
    .donts {
      padding: 20px;
      border-radius: 8px;

      h3 {
        margin-top: 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #eaecef;
      }

      ul {
        padding-left: 20px;
        margin: 15px 0 0 0;

        li {
          margin-bottom: 12px;
          color: #555;
          position: relative;
          padding-left: 25px;

          &:before {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }

    .dos {
      background: rgba(185, 29, 115, 0.05);
      border-left: 4px solid #b91d73;

      li:before {
        content: '✓';
        color: #28a745;
      }
    }

    .donts {
      background: rgba(239, 118, 122, 0.05);
      border-left: 4px solid #ef767a;

      li:before {
        content: '✕';
        color: #dc3545;
      }
    }
  }

  .practice-tips {
    background: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      color: #1a2a6c;
    }

    ol {
      padding-left: 25px;
      margin: 15px 0 0 0;

      li {
        margin-bottom: 12px;
        color: #555;
        padding-left: 8px;

        code {
          background: #f8f9fc;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.95rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7);
  }

  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 193, 7, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(10px);
  }
}

@media (max-width: 900px) {
  .header {
    flex-direction: column;

    .header-content {
      padding: 30px 20px;
    }
  }

  .conflict-resolution,
  .best-practices {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .dos-donts {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 768px) {
  .header-content {
    h1 {
      font-size: 2rem !important;
    }

    .subtitle {
      font-size: 1.1rem !important;
    }
  }

  .section-title {
    font-size: 1.5rem !important;
  }
}
</style>
