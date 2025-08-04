<template>
  <div class="npx-container">
    <header class="npx-header">
      <div class="title-wrapper">
        <h1>NPX 命令行工具基础介绍</h1>
        <p class="subtitle">无需全局安装即可运行 Node.js 包</p>
      </div>
      <div class="terminal-demo">
        <div class="terminal">
          <div class="terminal-header">
            <div class="terminal-buttons">
              <span class="close"></span>
              <span class="minimize"></span>
              <span class="maximize"></span>
            </div>
            <div class="terminal-title">npx-demo</div>
          </div>
          <div class="terminal-body">
            <div class="terminal-line">$ npx create-react-app my-app</div>
            <div class="terminal-line output">Creating a new React app in /path/to/my-app...</div>
            <div class="terminal-line">$ npx http-server</div>
            <div class="terminal-line output">Starting up http-server, serving ./</div>
            <div class="terminal-line output">Available on:</div>
            <div class="terminal-line output"> http://localhost:8080</div>
            <div class="terminal-line">$ npx cowsay "Hello NPX!"</div>
            <div class="terminal-line output"> ______________</div>
            <div class="terminal-line output">&lt; Hello NPX! &gt;</div>
            <div class="terminal-line output"> --------------</div>
            <div class="terminal-line output"> \ ^__^</div>
            <div class="terminal-line output"> \ (oo)\_______</div>
            <div class="terminal-line output"> (__)\ )\/\</div>
            <div class="terminal-line output"> ||----w |</div>
            <div class="terminal-line output"> || ||</div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📚</span>
          什么是 NPX？
        </h2>
        <div class="definition">
          <p><strong>npx</strong> 是 npm 5.2.0+ 版本内置的包执行工具，它允许开发者无需全局安装即可运行 Node.js 包。</p>

          <div class="comparison">
            <div class="method">
              <h3>传统方式</h3>
              <ul>
                <li>全局安装包：<code>npm install -g create-react-app</code></li>
                <li>运行命令：<code>create-react-app my-app</code></li>
                <li>需要手动管理全局包</li>
              </ul>
            </div>

            <div class="method highlight">
              <h3>使用 NPX</h3>
              <ul>
                <li>直接运行：<code>npx create-react-app my-app</code></li>
                <li>无需全局安装</li>
                <li>自动使用最新版本</li>
              </ul>
            </div>
          </div>

          <div class="key-points">
            <div class="point">
              <div class="icon">⚡</div>
              <h4>核心优势</h4>
              <p>无需全局安装即可运行任何 npm 包</p>
            </div>
            <div class="point">
              <div class="icon">🔄</div>
              <h4>版本管理</h4>
              <p>每次运行都使用最新版本</p>
            </div>
            <div class="point">
              <div class="icon">📦</div>
              <h4>减少污染</h4>
              <p>避免全局安装过多包</p>
            </div>
            <div class="point">
              <div class="icon">🚀</div>
              <h4>提高效率</h4>
              <p>简化工作流程</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🛠️</span>
          基本使用方法
        </h2>
        <div class="usage">
          <div class="usage-example">
            <h3>运行本地安装的包</h3>
            <pre class="code-block"># 本地安装包
npm install jest

# 使用 npx 运行
npx jest</pre>
            <p class="explanation">当包在本地已安装时，npx 会直接运行本地版本</p>
          </div>

          <div class="usage-example">
            <h3>运行未安装的包</h3>
            <pre class="code-block"># 无需安装，直接运行
npx create-react-app my-app</pre>
            <p class="explanation">npx 会自动下载包并运行，完成后删除下载的文件</p>
          </div>

          <div class="usage-example">
            <h3>指定包版本</h3>
            <pre class="code-block"># 运行特定版本
npx create-react-app@5.1.0 my-app

# 运行旧版本
npx -p node@14 npm run build</pre>
            <p class="explanation">通过 @ 符号指定要运行的包版本</p>
          </div>

          <div class="usage-example">
            <h3>执行 GitHub 上的代码</h3>
            <pre class="code-block"># 运行 GitHub 仓库中的代码
npx https://gist.github.com/user/gist-id</pre>
            <p class="explanation">npx 可以直接运行 GitHub gist 或仓库中的代码</p>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          高级功能
        </h2>
        <div class="advanced-features">
          <div class="feature">
            <h3>临时环境运行</h3>
            <pre class="code-block">npx --package=node@14 npm run build</pre>
            <p>在特定 Node.js 版本环境中运行命令，不影响全局环境</p>
          </div>

          <div class="feature">
            <h3>多包组合使用</h3>
            <pre class="code-block">npx -p cowsay -p lolcatjs -c 'echo "Hello World" | cowsay | lolcatjs'</pre>
            <p>使用 <code>-p</code> 指定多个包，<code>-c</code> 指定要运行的命令</p>
          </div>

          <div class="feature">
            <h3>交互式命令</h3>
            <pre class="code-block">npx -p node@12 -- node -v</pre>
            <p>使用 <code>--</code> 后跟命令可以执行交互式操作</p>
          </div>

          <div class="feature">
            <h3>忽略本地安装</h3>
            <pre class="code-block">npx --ignore-existing create-react-app my-app</pre>
            <p>使用 <code>--ignore-existing</code> 强制忽略本地安装的包</p>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💡</span>
          使用场景
        </h2>
        <div class="use-cases">
          <div class="use-case">
            <div class="icon">🔄</div>
            <div class="content">
              <h3>创建项目脚手架</h3>
              <p>使用各种 CLI 工具初始化项目</p>
              <pre class="code-block">npx create-react-app my-app
npx @vue/cli create my-project
npx degit user/repo my-project</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">⚙️</div>
            <div class="content">
              <h3>运行一次性工具</h3>
              <p>运行不需要长期安装的实用工具</p>
              <pre class="code-block"># 本地 Web 服务器
npx http-server

# 检查包更新
npx npm-check-updates

# 代码格式化
npx prettier --write .</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">🔧</div>
            <div class="content">
              <h3>执行不同版本的工具</h3>
              <p>测试不同版本的包而不影响全局环境</p>
              <pre class="code-block"># 使用旧版本的 create-react-app
npx create-react-app@4.0.0 my-old-app

# 使用特定 Node.js 版本
npx -p node@14 npm run build</pre>
            </div>
          </div>

          <div class="use-case">
            <div class="icon">📦</div>
            <div class="content">
              <h3>运行 GitHub 代码</h3>
              <p>直接运行 GitHub 仓库中的脚本</p>
              <pre class="code-block"># 运行 Gist 中的脚本
npx https://gist.github.com/user/gist-id

# 运行 GitHub 仓库中的脚本
npx github:username/repo-name</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📊</span>
          NPX vs NPM
        </h2>
        <div class="comparison">
          <div class="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>功能</th>
                  <th>NPX</th>
                  <th>NPM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>运行本地包</strong></td>
                  <td>✅ <code>npx package-name</code></td>
                  <td>✅ 通过 package.json scripts 运行</td>
                </tr>
                <tr>
                  <td><strong>运行未安装的包</strong></td>
                  <td>✅ 自动下载并运行</td>
                  <td>❌ 需要先安装</td>
                </tr>
                <tr>
                  <td><strong>全局包管理</strong></td>
                  <td>❌ 不需要全局安装</td>
                  <td>✅ 使用 <code>npm install -g</code></td>
                </tr>
                <tr>
                  <td><strong>指定包版本</strong></td>
                  <td>✅ <code>npx package@version</code></td>
                  <td>❌ 只能运行已安装版本</td>
                </tr>
                <tr>
                  <td><strong>运行 GitHub 代码</strong></td>
                  <td>✅ 支持 GitHub URL</td>
                  <td>❌ 不支持</td>
                </tr>
                <tr>
                  <td><strong>临时环境</strong></td>
                  <td>✅ 使用 <code>--package</code> 参数</td>
                  <td>❌ 不支持</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="key-difference">
            <h3>核心区别</h3>
            <p><strong>npx</strong> 专注于执行包，而 <strong>npm</strong> 专注于包的管理（安装、卸载、版本控制等）。</p>
            <p>使用 npx 可以避免全局安装包，保持开发环境的整洁，同时确保每次使用的都是最新版本。</p>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💎</span>
          实用 NPX 命令示例
        </h2>
        <div class="examples">
          <div class="example">
            <h3>创建 React 应用</h3>
            <pre class="code-block">npx create-react-app my-app</pre>
          </div>
          <div class="example">
            <h3>创建 Vue 应用</h3>
            <pre class="code-block">npx @vue/cli create my-project</pre>
          </div>
          <div class="example">
            <h3>启动本地服务器</h3>
            <pre class="code-block">npx http-server</pre>
          </div>
          <div class="example">
            <h3>检查包更新</h3>
            <pre class="code-block">npx npm-check-updates</pre>
          </div>
          <div class="example">
            <h3>代码格式化</h3>
            <pre class="code-block">npx prettier --write .</pre>
          </div>
          <div class="example">
            <h3>生成随机密码</h3>
            <pre class="code-block">npx generate-password</pre>
          </div>
          <div class="example">
            <h3>显示 ASCII 艺术</h3>
            <pre class="code-block">npx cowsay "Hello NPX!"</pre>
          </div>
          <div class="example">
            <h3>检查网站性能</h3>
            <pre class="code-block">npx lighthouse https://example.com</pre>
          </div>
        </div>
      </div>
    </div>

    <footer class="npx-footer">
      <p>npx 是现代 JavaScript 开发中不可或缺的工具，它简化了包的使用流程</p>
      <div class="conclusion">开始使用 npx，体验更简洁、高效的开发工作流！</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@terminal-bg: #2c3e50;
@terminal-text: #ecf0f1;
@error-color: #e74c3c;
@warning-color: #f39c12;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.npx-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.npx-header {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px 0;
  justify-content: space-between;

  .title-wrapper {
    flex: 1;
    min-width: 300px;

    h1 {
      font-size: 2.8rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 10px;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.2rem;
      color: @light-text;
      max-width: 600px;
    }
  }

  .terminal-demo {
    flex: 1;
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    .terminal {
      width: 100%;
      max-width: 600px;
      background: @terminal-bg;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

      .terminal-header {
        display: flex;
        align-items: center;
        background: darken(@terminal-bg, 5%);
        padding: 10px 15px;

        .terminal-buttons {
          display: flex;
          gap: 8px;

          span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;

            &.close {
              background: #ff5f56;
            }

            &.minimize {
              background: #ffbd2e;
            }

            &.maximize {
              background: #27c93f;
            }
          }
        }

        .terminal-title {
          flex: 1;
          text-align: center;
          color: #95a5a6;
          font-size: 0.9rem;
        }
      }

      .terminal-body {
        padding: 20px;
        font-family: 'Fira Code', monospace;
        min-height: 300px;

        .terminal-line {
          color: @terminal-text;
          margin-bottom: 8px;
          font-size: 0.95rem;
          line-height: 1.5;

          &.output {
            color: #3498db;
          }
        }
      }
    }
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: @text-color;
  font-weight: 600;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 10px;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
  }
}

// 定义部分
.definition {
  p {
    font-size: 1.1rem;
    margin-bottom: 20px;
    line-height: 1.8;
  }
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;

  .method {
    background: white;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: #e0e0e0;
    }

    &.highlight {
      border: 2px solid @primary-color;
      transform: scale(1.02);

      &:before {
        background: @primary-color;
      }

      h3 {
        color: @primary-color;
      }
    }

    h3 {
      font-size: 1.4rem;
      margin-bottom: 15px;
      font-weight: 600;
    }

    ul {
      list-style-type: none;

      li {
        padding: 8px 0;
        position: relative;
        padding-left: 25px;

        &:before {
          content: '•';
          position: absolute;
          left: 10px;
          color: @primary-color;
          font-size: 1.2rem;
        }
      }
    }
  }
}

.key-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 25px;

  .point {
    text-align: center;
    padding: 20px;
    background: #eaf7ff;
    border-radius: 8px;

    .icon {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: @primary-color;
    }

    p {
      color: @light-text;
      font-size: 0.9rem;
    }
  }
}

// 使用方式
.usage {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .usage-example {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid @primary-color;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @primary-color;
    }

    .explanation {
      color: @light-text;
      font-size: 0.95rem;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #eaeaea;
    }
  }
}

// 代码块
.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 15px 0;
  border: 1px solid #e1e4e8;
}

// 高级功能
.advanced-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .feature {
    background: #f0f7ff;
    border-radius: 8px;
    padding: 20px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @primary-color;
      display: flex;
      align-items: center;

      &:before {
        content: '⚡';
        margin-right: 10px;
      }
    }

    p {
      color: @light-text;
      margin-top: 10px;
      font-size: 0.95rem;
    }
  }
}

// 使用场景
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .use-case {
    display: flex;
    gap: 20px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
    border: 1px solid #eaeaea;

    .icon {
      font-size: 2rem;
      flex-shrink: 0;
      margin-top: 5px;
    }

    .content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 10px;
        color: @text-color;
      }

      p {
        color: @light-text;
        margin-bottom: 15px;
        font-size: 0.95rem;
      }
    }
  }
}

// 对比表格
.comparison-table {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #eaeaea;
      }

      th {
        background: #eaf7ff;
        color: @primary-color;
        font-weight: 600;
        position: sticky;
        top: 0;
      }

      tr:hover {
        background: #f9fbfd;
      }

      td {

        &:nth-child(2),
        &:nth-child(3) {
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
        }
      }
    }
  }

  .key-difference {
    background: #e8f5e9;
    border-radius: 8px;
    padding: 20px;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @secondary-color;
    }

    p {
      color: @light-text;
      line-height: 1.7;
      margin-bottom: 15px;
    }
  }
}

// 示例
.examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .example {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid @primary-color;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: @text-color;
    }
  }
}

.npx-footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1rem;

  .conclusion {
    margin-top: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: @primary-color;
    max-width: 800px;
    margin: 20px auto 0;
    padding: 15px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 8px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .npx-header {
    flex-direction: column;

    h1 {
      font-size: 2.2rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
