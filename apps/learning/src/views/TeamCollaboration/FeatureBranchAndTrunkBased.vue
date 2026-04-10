<template>
  <div class="git-strategy-container">
    <header class="header">
      <h1>Git 分支策略比较</h1>
      <p class="subtitle">Feature Branch vs Trunk-Based Development</p>
    </header>

    <div class="strategy-intro">
      <p>在现代软件开发中，选择合适的分支策略对团队协作和交付效率至关重要。以下是两种主流策略的详细介绍。</p>
    </div>

    <div class="strategies-grid">
      <section class="strategy-card feature-branch">
        <h2 class="strategy-title">
          <span class="icon">🌿</span>
          Feature Branch 工作流
        </h2>

        <div class="strategy-content">
          <h3>概念介绍</h3>
          <p>Feature Branch 工作流是为每个新功能或任务创建独立的分支，在该分支上完成开发并通过代码评审后，再合并回主分支（如 <code>main</code> 或 <code>master</code>）。</p>

          <h3>如何使用</h3>
          <ol>
            <li>从主分支创建新功能分支：<code>git checkout -b feature/xxx</code></li>
            <li>在功能分支上提交更改</li>
            <li>完成开发后，创建 Pull Request/Merge Request</li>
            <li>经过代码评审后合并到主分支</li>
            <li>删除已合并的功能分支</li>
          </ol>

          <h3>适用场景</h3>
          <ul>
            <li>需要严格代码评审的团队</li>
            <li>长期功能开发（超过1天）</li>
            <li>开源项目协作</li>
            <li>发布周期较长的项目</li>
          </ul>

          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li>代码隔离，减少主分支不稳定风险</li>
                <li>便于代码审查和讨论</li>
                <li>适合分布式团队协作</li>
                <li>历史记录清晰</li>
              </ul>
            </div>
            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li>合并冲突可能较多</li>
                <li>集成频率较低</li>
                <li>分支生命周期可能过长</li>
                <li>需要更多分支管理</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="strategy-card trunk-based">
        <h2 class="strategy-title">
          <span class="icon">🪵</span>
          Trunk-Based Development
        </h2>

        <div class="strategy-content">
          <h3>概念介绍</h3>
          <p>Trunk-Based Development (TBD) 是开发者直接向主分支（trunk）提交小批量更改，通常每天多次。需要发布时，从主分支创建发布分支。</p>

          <h3>如何使用</h3>
          <ol>
            <li>所有开发者直接在主分支上工作</li>
            <li>小批量、频繁提交（每次提交应保持系统可运行）</li>
            <li>使用功能开关控制未完成功能的暴露</li>
            <li>需要发布时创建短命的发布分支</li>
            <li>可能结合特性开关（Feature Flags）</li>
          </ol>

          <h3>适用场景</h3>
          <ul>
            <li>持续交付/部署环境</li>
            <li>小型到中型协作团队</li>
            <li>需要快速迭代的项目</li>
            <li>成熟的高效能工程实践团队</li>
          </ul>

          <div class="pros-cons">
            <div class="pros">
              <h3>优点</h3>
              <ul>
                <li>减少合并冲突</li>
                <li>持续集成，快速反馈</li>
                <li>简化分支管理</li>
                <li>促进小批量更改</li>
                <li>更快的交付周期</li>
              </ul>
            </div>
            <div class="cons">
              <h3>缺点</h3>
              <ul>
                <li>需要严格的工程实践</li>
                <li>需要完善的自动化测试</li>
                <li>不适合长期功能开发</li>
                <li>对代码质量要求高</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="comparison-section">
      <h2>策略选择建议</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>考虑因素</th>
              <th>Feature Branch</th>
              <th>Trunk-Based</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>团队规模</td>
              <td>适合各种规模</td>
              <td>更适合中小团队</td>
            </tr>
            <tr>
              <td>发布频率</td>
              <td>较低频率（周/月）</td>
              <td>高频率（天/小时）</td>
            </tr>
            <tr>
              <td>工程成熟度</td>
              <td>中等要求</td>
              <td>高要求（测试、CI/CD）</td>
            </tr>
            <tr>
              <td>功能开发周期</td>
              <td>长周期功能</td>
              <td>短周期功能</td>
            </tr>
            <tr>
              <td>学习曲线</td>
              <td>较低</td>
              <td>较高</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="conclusion">对于大多数团队，可以从 Feature Branch 开始，随着工程实践成熟度提高，逐步向 Trunk-Based 过渡。两种策略也可以结合使用，例如在 Trunk-Based 中使用短命的特性分支。</p>
    </section>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加组件逻辑（如果需要）
</script>

<style lang="less" scoped>
.git-strategy-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;

  .header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.2rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .strategy-intro {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .strategies-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .strategy-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }

    .strategy-title {
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #eee;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 0.5rem;
        font-size: 1.8rem;
      }
    }

    h3 {
      font-size: 1.2rem;
      color: #2c3e50;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
    }

    ol, ul {
      padding-left: 1.5rem;
      margin: 0.75rem 0;
    }

    li {
      margin-bottom: 0.5rem;
    }

    code {
      background-color: #f3f4f6;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.9em;
      color: #d6336c;
    }

    .pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 1.5rem;

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }

      .pros, .cons {
        padding: 1rem;
        border-radius: 6px;
      }
    }
  }

  .feature-branch {
    border-top: 4px solid #4CAF50;

    .pros {
      background-color: #f1f8e9;
      border: 1px solid #c8e6c9;
    }

    .cons {
      background-color: #ffebee;
      border: 1px solid #ffcdd2;
    }
  }

  .trunk-based {
    border-top: 4px solid #2196F3;

    .pros {
      background-color: #e3f2fd;
      border: 1px solid #bbdefb;
    }

    .cons {
      background-color: #fff8e1;
      border: 1px solid #ffecb3;
    }
  }

  .comparison-section {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);

    h2 {
      font-size: 1.5rem;
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .comparison-table {
      overflow-x: auto;
      margin-bottom: 1.5rem;

      table {
        width: 100%;
        border-collapse: collapse;

        th, td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background-color: #f8f9fa;
          font-weight: 600;
        }

        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      }
    }

    .conclusion {
      font-style: italic;
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 6px;
      border-left: 4px solid #9c27b0;
    }
  }
}
</style>
