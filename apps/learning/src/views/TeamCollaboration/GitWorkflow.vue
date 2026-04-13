<template>
  <div class="workflow-docs">
    <header>
      <h1>🌿 Git 工作流指南</h1>
      <p class="subtitle">从个人项目到大型协作 —— 规范、清晰、可落地的 Git 实践</p>
    </header>

    <!-- 基础概念区 -->
    <section class="concept">
      <h2>📌 什么是 Git 工作流？</h2>
      <div class="concept-content">
        <p>Git 工作流是指团队或个人在使用 Git 时约定的一套<strong>分支管理策略、协作流程和提交规范</strong>。良好的工作流可以：</p>
        <ul>
          <li>✅ 减少代码冲突，提高协作效率</li>
          <li>✅ 保持提交历史清晰，便于回溯和 Code Review</li>
          <li>✅ 实现自动化部署（CI/CD）与版本发布的无缝衔接</li>
        </ul>
        <p>下面针对不同规模的场景，推荐最适合的工作流规范。</p>
      </div>
    </section>

    <!-- 三种工作流卡片 -->
    <div class="workflows">
      <!-- 个人项目 -->
      <div class="card personal">
        <div class="card-header">
          <span class="icon">👤</span>
          <h3>个人项目</h3>
        </div>
        <div class="card-body">
          <div class="badge">简单 · 高效 · 无负担</div>
          <h4>推荐工作流：<span class="highlight">单主干 + 临时分支</span></h4>
          <ul>
            <li><strong>主分支</strong>：<code>main</code> 或 <code>master</code> —— 始终是可发布状态</li>
            <li><strong>开发方式</strong>：直接在 <code>main</code> 上提交，或按功能创建 <code>feature/xxx</code> 分支，完成后合并删除</li>
            <li><strong>提交规范</strong>：推荐 <code>&lt;type&gt;: &lt;subject&gt;</code>（如 <code>feat: 添加登录</code>），不强求但应清晰</li>
            <li><strong>标签管理</strong>：每次发布使用 <code>git tag v1.0.0</code> 标记版本</li>
            <li><strong>合并策略</strong>：使用 <code>--no-ff</code> 保留分支历史（可选）</li>
          </ul>
          <div class="note">
            💡 小技巧：利用 <code>git commit -am</code> 快速提交，定期 <code>git push</code> 备份到远程。
          </div>
        </div>
      </div>

      <!-- 小项目 / 初创团队 -->
      <div class="card small-team">
        <div class="card-header">
          <span class="icon">👥</span>
          <h3>小项目 / 初创团队</h3>
        </div>
        <div class="card-body">
          <div class="badge">2~10 人 · 轻量协作</div>
          <h4>推荐工作流：<span class="highlight">GitHub Flow 轻量版</span></h4>
          <ul>
            <li><strong>常驻分支</strong>：仅 <code>main</code> 一条主干，<strong>所有更改通过 Pull Request (PR)</strong> 合入</li>
            <li><strong>开发分支</strong>：<code>feature/&lt;name&gt;</code>、<code>fix/&lt;name&gt;</code>，从 <code>main</code> 拉出，完成后发起 PR</li>
            <li><strong>分支命名</strong>：<code>feature/login-page</code>、<code>fix/navbar-bug</code></li>
            <li><strong>PR 规范</strong>：至少一人 Review，通过 CI 测试后合并</li>
            <li><strong>提交规范</strong>：使用 Conventional Commits（如 <code>feat:</code>, <code>fix:</code>, <code>docs:</code>, <code>refactor:</code>）</li>
            <li><strong>合并方式</strong>：采用 <code>Squash and Merge</code> 保持主干线性，或 <code>Merge commit</code> 保留完整历史</li>
          </ul>
          <div class="note">
            🔁 每天开始前执行 <code>git pull --rebase</code> 避免多余的合并提交。
          </div>
        </div>
      </div>

      <!-- 大型项目 / 严谨团队 -->
      <div class="card large-project">
        <div class="card-header">
          <span class="icon">🏢</span>
          <h3>大型项目 / 企业级</h3>
        </div>
        <div class="card-body">
          <div class="badge">10+ 人 · 多环境 · 严格管控</div>
          <h4>推荐工作流：<span class="highlight">Git Flow 或 GitLab Flow</span></h4>
          <ul>
            <li><strong>长期分支</strong>：<code>main</code>（生产）、<code>develop</code>（集成）、<code>release/&lt;version&gt;</code>（发布准备）</li>
            <li><strong>临时分支</strong>：<code>feature/*</code>（从 develop 拉出）、<code>hotfix/*</code>（从 main 拉出，修复后合并回 main & develop）</li>
            <li><strong>分支命名规范</strong>：<code>feature/JIRA-123-login</code>、<code>hotfix/v1.2.1-crash</code></li>
            <li><strong>提交规范</strong>：严格遵循 Conventional Commits + <strong>scope</strong>（如 <code>feat(auth): 添加 OAuth2</code>）</li>
            <li><strong>合并要求</strong>：PR 必须通过所有 CI 检查、至少 2 人 Approve、解决冲突后重新测试</li>
            <li><strong>版本发布</strong>：从 develop 切 release 分支，测试通过后合并到 main 并打 tag，同时合并回 develop</li>
            <li><strong>辅助工具</strong>：使用 <code>git hooks</code>（commitlint、pre-commit）、自动生成 CHANGELOG</li>
          </ul>
          <div class="note">
            🚀 强烈建议配合 GitLab / GitHub Actions 实现自动化：分支保护、强制线性历史、禁止直接 push 到主干。
          </div>
        </div>
      </div>
    </div>

    <!-- 补充规范表格：通用最佳实践 -->
    <section class="best-practices">
      <h2>📋 通用最佳实践（适用于所有规模）</h2>
      <div class="practice-grid">
        <div class="practice-item">
          <h4>✍️ 提交信息模板</h4>
          <pre><code>&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;
&lt;BLANK LINE&gt;
&lt;body&gt;
&lt;BLANK LINE&gt;
&lt;footer&gt;</code></pre>
          <p>Type: feat, fix, docs, style, refactor, test, chore</p>
        </div>
        <div class="practice-item">
          <h4>🔒 保护分支规则</h4>
          <ul>
            <li>禁止直接 push 到 <code>main</code> / <code>develop</code></li>
            <li>PR 合并前需通过 CI 测试</li>
            <li>要求线性历史（rebase 而非 merge）</li>
          </ul>
        </div>
        <div class="practice-item">
          <h4>🧹 定期清理</h4>
          <ul>
            <li>删除已合并的远程分支：<code>git push origin --delete &lt;branch&gt;</code></li>
            <li>本地清理：<code>git remote prune origin</code> + <code>git branch -d</code></li>
          </ul>
        </div>
        <div class="practice-item">
          <h4>📦 版本标签</h4>
          <p>遵循语义化版本 <code>vMAJOR.MINOR.PATCH</code>，并附注说明 <code>git tag -a v1.0.0 -m "release"</code></p>
        </div>
      </div>
    </section>

    <footer>
      <p>📖 选择适合你团队的工作流，保持沟通一致，Git 会成为最可靠的合作伙伴。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无需逻辑
</script>

<style lang="less" scoped>
.workflow-docs {
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif;
  background: #f9fafb;
  color: #1e293b;

  header {
    text-align: center;
    margin-bottom: 2.5rem;
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      background: linear-gradient(120deg, #0f172a, #3b82f6);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      font-size: 1rem;
      color: #475569;
      letter-spacing: 0.3px;
    }
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 600;
    border-left: 5px solid #3b82f6;
    padding-left: 1rem;
    margin: 1.8rem 0 1.2rem;
  }

  .concept {
    background: white;
    border-radius: 1.2rem;
    padding: 1.5rem 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    margin-bottom: 2rem;
    border: 1px solid #e2e8f0;
    p {
      line-height: 1.5;
      margin: 0.5rem 0;
    }
    ul {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      li {
        margin: 0.3rem 0;
      }
    }
    strong {
      color: #1e40af;
    }
  }

  .workflows {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.8rem;
    margin: 1.5rem 0;
  }

  .card {
    background: white;
    border-radius: 1.2rem;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #eef2ff;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 30px -12px rgba(0,0,0,0.1);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 1.5rem;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;

      .icon {
        font-size: 1.8rem;
      }
      h3 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 600;
      }
    }

    .card-body {
      padding: 1.2rem 1.5rem 1.8rem;

      .badge {
        display: inline-block;
        background: #e0f2fe;
        color: #0369a1;
        font-size: 0.7rem;
        font-weight: 600;
        padding: 0.2rem 0.8rem;
        border-radius: 20px;
        margin-bottom: 1rem;
      }

      h4 {
        font-size: 1rem;
        margin: 0.8rem 0 0.5rem;
        font-weight: 600;
        .highlight {
          background: #fef9c3;
          padding: 0 0.2rem;
          border-radius: 4px;
        }
      }

      ul {
        padding-left: 1.2rem;
        margin: 0.5rem 0;
        li {
          margin: 0.5rem 0;
          line-height: 1.4;
          font-size: 0.9rem;
        }
        code {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 6px;
          font-size: 0.85rem;
        }
      }

      .note {
        margin-top: 1rem;
        background: #fef9e3;
        padding: 0.6rem 1rem;
        border-radius: 12px;
        font-size: 0.85rem;
        border-left: 3px solid #facc15;
        color: #854d0e;
      }
    }
  }

  .personal .card-header {
    background: #eef2ff;
    border-bottom-color: #cbd5e1;
  }
  .small-team .card-header {
    background: #dcfce7;
    border-bottom-color: #bbf7d0;
  }
  .large-project .card-header {
    background: #ffe4e6;
    border-bottom-color: #fecdd3;
  }

  .best-practices {
    margin-top: 2rem;

    .practice-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.2rem;
      margin-top: 1rem;
    }

    .practice-item {
      background: white;
      border-radius: 1rem;
      padding: 1rem 1.2rem;
      border: 1px solid #e2e8f0;
      transition: all 0.2s;

      h4 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
      }
      pre {
        background: #0f172a;
        color: #e2e8f0;
        padding: 0.5rem;
        border-radius: 8px;
        overflow-x: auto;
        font-size: 0.75rem;
        margin: 0.5rem 0;
      }
      code {
        background: #f1f5f9;
        padding: 0.2rem 0.3rem;
        border-radius: 4px;
        font-size: 0.85rem;
      }
      ul {
        margin: 0.2rem 0;
        padding-left: 1rem;
        li {
          margin: 0.2rem 0;
          font-size: 0.85rem;
        }
      }
      p {
        font-size: 0.85rem;
        margin: 0.5rem 0 0;
      }
    }
  }

  footer {
    margin-top: 3rem;
    text-align: center;
    font-size: 0.85rem;
    color: #475569;
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;
  }

  @media (max-width: 760px) {
    padding: 1rem;
    .workflows {
      grid-template-columns: 1fr;
    }
    .practice-grid {
      grid-template-columns: 1fr;
    }
    .card .card-body ul li {
      font-size: 0.85rem;
    }
  }
}
</style>