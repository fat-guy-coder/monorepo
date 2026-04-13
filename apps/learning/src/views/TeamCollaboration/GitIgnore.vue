<template>
  <div class="gitignore-docs">
    <header>
      <h1>📄 .gitignore 完全指南</h1>
      <p class="subtitle">让 Git 忽略不该提交的文件 —— 规则、语法与最佳实践</p>
    </header>

    <!-- 作用区域 -->
    <section class="intro">
      <h2>🎯 作用</h2>
      <div class="card">
        <p><code>.gitignore</code> 文件用于指定 Git 应该<strong>忽略</strong>的未跟踪文件（不纳入版本控制）。典型场景包括：</p>
        <ul>
          <li>📦 依赖目录：<code>node_modules/</code>、<code>vendor/</code></li>
          <li>🔐 敏感信息：<code>.env</code>、<code>secrets.json</code></li>
          <li>⚙️ 编译产物：<code>dist/</code>、<code>build/</code>、<code>*.pyc</code></li>
          <li>🖥️ IDE 配置：<code>.vscode/</code>、<code>.idea/</code></li>
          <li>📁 临时文件：<code>.DS_Store</code>、<code>*.log</code>、<code>*.tmp</code></li>
        </ul>
      </div>
    </section>

    <!-- 格式与语法 -->
    <section class="syntax">
      <h2>✍️ 配置格式与语法规则</h2>
      <div class="card">
        <p><code>.gitignore</code> 每一行代表一条忽略规则，支持简单的 glob 模式匹配。</p>
        <div class="rules-grid">
          <div class="rule-item">
            <div class="rule-pattern"># 注释</div>
            <div class="rule-desc">以 <code>#</code> 开头的行是注释，会被忽略。</div>
          </div>
          <div class="rule-item">
            <div class="rule-pattern">logs/</div>
            <div class="rule-desc">忽略根目录下 <code>logs</code> 文件夹及其所有内容。</div>
          </div>
          <div class="rule-item">
            <div class="rule-pattern">*.log</div>
            <div class="rule-desc">忽略所有 <code>.log</code> 后缀的文件（递归）。</div>
          </div>
          <div class="rule-item">
            <div class="rule-pattern">!important.log</div>
            <div class="rule-desc">取反规则，不忽略 <code>important.log</code>（覆盖前面的 <code>*.log</code>）。</div>
          </div>
          <div class="rule-item">
            <div class="rule-pattern">/build/</div>
            <div class="rule-desc">开头的 <code>/</code> 表示只忽略仓库根目录下的 <code>build</code> 文件夹。</div>
          </div>
          <div class="rule-item">
            <div class="rule-pattern">doc/*.txt</div>
            <div class="rule-desc">忽略 <code>doc/</code> 目录下的 <code>.txt</code> 文件，但不包括子目录（如 <code>doc/sub/</code>）。
            </div>
          </div>
          <div class="rule-item">
            <div class="rule-pattern">doc/**/*.pdf</div>
            <div class="rule-desc">忽略 <code>doc/</code> 下任意层级的 <code>.pdf</code> 文件（需要 Git 1.8.2+）。</div>
          </div>
          <div class="rule-item">
            <div class="rule-pattern">temp?</div>
            <div class="rule-desc"><code>?</code> 匹配任意单个字符，如 <code>temp1</code>、<code>tempa</code>。</div>
          </div>
          <div class="rule-item">
            <div class="rule-pattern">[abc].txt</div>
            <div class="rule-desc">匹配 <code>a.txt</code>、<code>b.txt</code>、<code>c.txt</code>。</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 全局忽略与优先级 -->
    <section class="advanced">
      <h2>🔧 高级特性</h2>
      <div class="card">
        <div class="feature">
          <h4>🌍 全局 .gitignore</h4>
          <p>可配置全局忽略文件，应用于所有本地仓库：</p>
          <pre><code>git config --global core.excludesfile ~/.gitignore_global</code></pre>
          <p>通常用于忽略 IDE 配置、OS 特定文件（如 <code>.DS_Store</code>）。</p>
        </div>
        <div class="feature">
          <h4>📌 忽略已跟踪的文件</h4>
          <p>如果文件已经被 Git 跟踪，<code>.gitignore</code> 对它无效。需要先停止跟踪：</p>
          <pre><code>git rm --cached &lt;file&gt;   # 从版本库删除但保留工作区</code></pre>
        </div>
        <div class="feature">
          <h4>⚡ 规则优先级</h4>
          <p>后出现的规则会覆盖之前的规则。<code>!</code> 取反规则优先级最高，可重新包含被忽略的文件。</p>
        </div>
      </div>
    </section>

    <!-- 实际示例 -->
    <section class="examples">
      <h2>📂 常见 .gitignore 示例</h2>
      <div class="card">
        <h3>Node.js 项目</h3>
        <pre><code>node_modules/
dist/
.env
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store</code></pre>

        <h3>Python 项目</h3>
        <pre><code>__pycache__/
*.py[cod]
*.so
.Python
env/
venv/
.venv/
*.egg-info/
dist/
build/
.idea/
.vscode/</code></pre>

        <h3>Java / Maven 项目</h3>
        <pre><code>target/
*.class
*.jar
*.war
.idea/
*.iml
.settings/
.project
.classpath</code></pre>

        <h3>Vue / React 前端项目</h3>
        <pre><code>node_modules/
dist/
dist-ssr/
*.local
.env.local
.env.*.local
.DS_Store</code></pre>
      </div>
    </section>

    <!-- 常见问题提醒 -->
    <section class="tips">
      <h2>💡 实用小贴士</h2>
      <div class="card">
        <ul>
          <li>✔️ 建议在项目初始化时就创建 <code>.gitignore</code>，避免误提交敏感文件。</li>
          <li>✔️ 使用 <code>git status --ignored</code> 查看哪些文件被忽略。</li>
          <li>✔️ 如果规则不生效，执行 <code>git check-ignore -v &lt;file&gt;</code> 查看是哪条规则匹配。</li>
          <li>✔️ GitHub 官方提供了各种语言的 <code>.gitignore</code> 模板：<a href="https://github.com/github/gitignore"
              target="_blank" rel="noopener">github/gitignore</a></li>
        </ul>
      </div>
    </section>

    <footer>
      <p>📌 一份好的 <code>.gitignore</code> 能让仓库干净、安全、协作更顺畅。</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 纯展示组件，无逻辑
</script>

<style lang="less" scoped>
.gitignore-docs {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: system-ui, 'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif;
  background: #f8fafc;
  color: #0f172a;

  header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      background: linear-gradient(135deg, #1e293b, #3b82f6);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #475569;
      font-size: 1rem;
    }
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 600;
    border-left: 5px solid #3b82f6;
    padding-left: 1rem;
    margin: 2rem 0 1rem;
  }

  .card {
    background: white;
    border-radius: 1rem;
    padding: 1.2rem 1.8rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    margin-bottom: 1.5rem;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    p,
    ul {
      line-height: 1.5;
    }

    code {
      background: #f1f5f9;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
      font-size: 0.85rem;
    }

    pre {
      background: #0f172a;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 12px;
      overflow-x: auto;
      font-size: 0.8rem;
      margin: 1rem 0;

      code {
        background: transparent;
        color: inherit;
        padding: 0;
      }
    }

    h3 {
      font-size: 1.1rem;
      margin: 1rem 0 0.5rem;
      font-weight: 600;
    }

    h4 {
      font-size: 1rem;
      margin: 0 0 0.25rem;
    }
  }

  .rules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;

    .rule-item {
      border-bottom: 1px solid #eef2ff;
      padding-bottom: 0.6rem;

      .rule-pattern {
        font-family: monospace;
        font-weight: 600;
        background: #eef2ff;
        display: inline-block;
        padding: 0.2rem 0.6rem;
        border-radius: 16px;
        font-size: 0.8rem;
        margin-bottom: 0.3rem;
      }

      .rule-desc {
        font-size: 0.85rem;
        color: #334155;

        code {
          font-size: 0.75rem;
        }
      }
    }
  }

  .feature {
    margin-bottom: 1rem;

    h4 {
      margin-bottom: 0.3rem;
    }

    p {
      margin: 0.2rem 0;
    }

    pre {
      margin: 0.5rem 0;
    }
  }

  .tips ul {
    padding-left: 1.2rem;

    li {
      margin: 0.6rem 0;
    }

    a {
      color: #3b82f6;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  footer {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.85rem;
    color: #475569;
    border-top: 1px solid #e2e8f0;
    padding-top: 1.5rem;

    code {
      background: #e2e8f0;
      padding: 0.2rem 0.4rem;
      border-radius: 6px;
    }
  }

  @media (max-width: 760px) {
    padding: 1rem;

    .card {
      padding: 1rem;
    }

    .rules-grid {
      grid-template-columns: 1fr;
    }

    pre {
      font-size: 0.7rem;
    }
  }
}
</style>
