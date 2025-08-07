<template>
  <div class="npm-container">
    <header class="npm-header">
      <div class="logo-container">
        <div class="npm-logo">npm</div>
        <div class="npm-slogan">Node Package Manager</div>
      </div>
      <h1>Node.js 包管理器</h1>
      <p class="subtitle">JavaScript 生态系统的基石</p>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📦</span>
          什么是 NPM？
        </h2>
        <div class="definition">
          <p><strong>NPM (Node Package Manager)</strong> 是世界上最大的软件注册表，拥有超过 200 万个 JavaScript 包。它是 Node.js 的默认包管理器，也是现代
            JavaScript 开发的基石。</p>

          <div class="key-points">
            <div class="point">
              <div class="icon">🌐</div>
              <h4>全球软件注册表</h4>
              <p>包含数百万个可重用的代码包</p>
            </div>
            <div class="point">
              <div class="icon">🔧</div>
              <h4>命令行工具</h4>
              <p>用于安装、管理和发布 JavaScript 包</p>
            </div>
            <div class="point">
              <div class="icon">🏗️</div>
              <h4>依赖管理</h4>
              <p>管理项目依赖关系和版本控制</p>
            </div>
            <div class="point">
              <div class="icon">🚀</div>
              <h4>自动化工具</h4>
              <p>运行脚本、测试代码和部署应用</p>
            </div>
          </div>

          <div class="npm-stats">
            <div class="stat">
              <div class="number">2,000,000+</div>
              <div class="label">可用软件包</div>
            </div>
            <div class="stat">
              <div class="number">42,000,000+</div>
              <div class="label">开发者</div>
            </div>
            <div class="stat">
              <div class="number">2,100,000,000+</div>
              <div class="label">每周下载量</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          核心功能
        </h2>
        <div class="core-features">
          <div class="feature">
            <div class="icon">📦</div>
            <div class="content">
              <h3>包管理</h3>
              <p>安装、更新和卸载项目依赖项</p>
              <pre class="code-block">npm install &lt;package&gt;
npm update &lt;package&gt;
npm uninstall &lt;package&gt;</pre>
            </div>
          </div>

          <div class="feature">
            <div class="icon">📝</div>
            <div class="content">
              <h3>依赖管理</h3>
              <p>通过 package.json 文件管理项目依赖关系</p>
              <pre class="code-block">{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "eslint": "^8.45.0"
  }
}</pre>
            </div>
          </div>

          <div class="feature">
            <div class="icon">🚀</div>
            <div class="content">
              <h3>脚本自动化</h3>
              <p>定义和运行自定义脚本简化工作流程</p>
              <pre class="code-block">{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest",
    "lint": "eslint ."
  }
}</pre>
            </div>
          </div>

          <div class="feature">
            <div class="icon">🌍</div>
            <div class="content">
              <h3>包发布</h3>
              <p>将你的代码作为包发布到 npm 注册表</p>
              <pre class="code-block"># 创建账户
npm adduser

# 发布包
npm publish

# 更新版本
npm version patch
npm publish</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🛠️</span>
          常用命令
        </h2>
        <div class="commands">
          <div class="command-category">
            <h3>项目管理</h3>
            <div class="command">
              <div class="name">npm init</div>
              <div class="description">创建新的 package.json 文件</div>
              <pre class="code-block">npm init -y  # 快速创建使用默认值</pre>
            </div>
            <div class="command">
              <div class="name">npm install</div>
              <div class="description">安装项目所有依赖</div>
              <pre class="code-block">npm install   # 安装所有依赖
npm i         # 简写形式</pre>
            </div>
            <div class="command">
              <div class="name">npm ci</div>
              <div class="description">根据 package-lock.json 精确安装依赖</div>
              <pre class="code-block">npm ci  # 用于持续集成环境</pre>
            </div>
          </div>

          <div class="command-category">
            <h3>依赖管理</h3>
            <div class="command">
              <div class="name">npm install &lt;package&gt;</div>
              <div class="description">安装包作为生产依赖</div>
              <pre class="code-block">npm install react
npm i react</pre>
            </div>
            <div class="command">
              <div class="name">npm install --save-dev &lt;package&gt;</div>
              <div class="description">安装包作为开发依赖</div>
              <pre class="code-block">npm install --save-dev eslint
npm i -D eslint  # 简写形式</pre>
            </div>
            <div class="command">
              <div class="name">npm update</div>
              <div class="description">更新所有依赖到最新版本</div>
              <pre class="code-block">npm update     # 更新所有依赖
npm update react  # 更新特定包</pre>
            </div>
          </div>

          <div class="command-category">
            <h3>脚本执行</h3>
            <div class="command">
              <div class="name">npm run &lt;script&gt;</div>
              <div class="description">运行 package.json 中的脚本</div>
              <pre class="code-block">npm run start
npm run build
npm run test</pre>
            </div>
            <div class="command">
              <div class="name">npm start</div>
              <div class="description">运行 "start" 脚本的快捷方式</div>
              <pre class="code-block">npm start  # 等同于 npm run start</pre>
            </div>
            <div class="command">
              <div class="name">npm test</div>
              <div class="description">运行 "test" 脚本的快捷方式</div>
              <pre class="code-block">npm test  # 等同于 npm run test</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📂</span>
          核心文件解析
        </h2>
        <div class="core-files">
          <div class="file">
            <div class="file-header">
              <div class="icon">📝</div>
              <h3>package.json</h3>
            </div>
            <div class="file-content">
              <p>项目的清单文件，包含元数据、依赖关系和脚本</p>
              <div class="file-structure">
                <pre class="code-block">{
  "name": "项目名称",
  "version": "版本号",
  "description": "项目描述",
  "main": "入口文件",
  "scripts": {
    "start": "启动脚本",
    "build": "构建脚本"
  },
  "dependencies": {
    "生产依赖": "版本范围"
  },
  "devDependencies": {
    "开发依赖": "版本范围"
  },
  "repository": {
    "type": "git",
    "url": "仓库地址"
  },
  "keywords": ["关键词"],
  "author": "作者",
  "license": "许可证"
}</pre>
              </div>
            </div>
          </div>

          <div class="file">
            <div class="file-header">
              <div class="icon">🔒</div>
              <h3>package-lock.json</h3>
            </div>
            <div class="file-content">
              <p>精确描述依赖树，确保安装一致性</p>
              <ul class="features">
                <li>锁定依赖版本，避免"依赖地狱"</li>
                <li>描述依赖关系的完整树形结构</li>
                <li>确保团队和部署环境的一致性</li>
                <li>不应手动编辑，由 npm 自动管理</li>
              </ul>
            </div>
          </div>

          <div class="file">
            <div class="file-header">
              <div class="icon">⚙️</div>
              <h3>node_modules</h3>
            </div>
            <div class="file-content">
              <p>存储所有安装的依赖包的目录</p>
              <div class="key-points">
                <div class="point">
                  <div class="icon">📦</div>
                  <p>包含项目所有依赖包</p>
                </div>
                <div class="point">
                  <div class="icon">🗂️</div>
                  <p>通常不需要加入版本控制</p>
                </div>
                <div class="point">
                  <div class="icon">🚫</div>
                  <p>可通过 <code>.gitignore</code> 忽略</p>
                </div>
                <div class="point">
                  <div class="icon">🔁</div>
                  <p>运行 <code>npm install</code> 重新生成</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🔍</span>
          依赖版本管理
        </h2>
        <div class="version-management">
          <div class="version-system">
            <h3>语义化版本 (SemVer)</h3>
            <p>版本格式：主版本号.次版本号.修订号 (Major.Minor.Patch)</p>
            <div class="version-examples">
              <div class="version">
                <div class="number">1.2.3</div>
                <div class="description">
                  <strong>主版本 1</strong> - 重大变更，不兼容旧版本<br>
                  <strong>次版本 2</strong> - 新增功能，向下兼容<br>
                  <strong>修订号 3</strong> - 问题修复，向下兼容
                </div>
              </div>
            </div>
          </div>

          <div class="version-syntax">
            <h3>版本范围语法</h3>
            <div class="syntax-examples">
              <div class="syntax">
                <pre class="code-block">"react": "18.2.0"</pre>
                <p>精确安装 18.2.0 版本</p>
              </div>
              <div class="syntax">
                <pre class="code-block">"react": "^18.2.0"</pre>
                <p>安装兼容的最新版本 (18.x.x)</p>
              </div>
              <div class="syntax">
                <pre class="code-block">"react": "~18.2.0"</pre>
                <p>安装兼容的最新修订版本 (18.2.x)</p>
              </div>
              <div class="syntax">
                <pre class="code-block">"react": ">=16.8.0 <18.0.0"</pre>
                <p>安装 16.8.0 到 18.0.0 之间的版本</p>
              </div>
              <div class="syntax">
                <pre class="code-block">"react": "latest"</pre>
                <p>安装最新版本 (不推荐，可能破坏项目)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          现代 JavaScript 工作流
        </h2>
        <div class="workflow">
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>项目初始化</h3>
                <p>创建项目并初始化 package.json</p>
                <pre class="code-block">npm init -y</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>安装依赖</h3>
                <p>添加项目所需依赖</p>
                <pre class="code-block">npm install react react-dom
npm install -D typescript eslint</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>配置脚本</h3>
                <p>在 package.json 中定义自动化脚本</p>
                <pre class="code-block">"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "jest",
  "lint": "eslint ."
}</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>开发与测试</h3>
                <p>运行开发服务器和测试</p>
                <pre class="code-block">npm start  # 启动开发服务器
npm test   # 运行测试</pre>
              </div>
            </div>

            <div class="step">
              <div class="step-number">5</div>
              <div class="step-content">
                <h3>构建与部署</h3>
                <p>构建生产版本并部署</p>
                <pre class="code-block">npm run build  # 创建生产构建
npm publish    # 发布包到 npm 注册表</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="npm-footer">
      <p>NPM 是现代 JavaScript 开发的基石，掌握它是成为高效开发者的关键一步</p>
      <div class="conclusion">开始使用 NPM，探索 JavaScript 生态系统的无限可能！</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #cb3837; // NPM 品牌红色
@secondary-color: #2ecc71;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@success-color: #27ae60;
@warning-color: #f39c12;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.npm-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.npm-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  .npm-logo {
    font-size: 4rem;
    font-weight: 800;
    color: @primary-color;
    text-transform: uppercase;
    letter-spacing: -2px;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .npm-slogan {
    font-size: 1.5rem;
    color: @light-text;
    font-weight: 500;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: @text-color;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    max-width: 600px;
    margin: 0 auto;
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

.key-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 25px;

  .point {
    text-align: center;
    padding: 20px;
    background: #fef6f6;
    border-radius: 8px;
    border-top: 4px solid @primary-color;

    .icon {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 8px;
      color: @text-color;
    }

    p {
      color: @light-text;
      font-size: 0.9rem;
    }
  }
}

.npm-stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 40px;

  .stat {
    text-align: center;
    min-width: 200px;

    .number {
      font-size: 1.8rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 8px;
    }

    .label {
      color: @light-text;
      font-size: 1rem;
    }
  }
}

// 核心功能
.core-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;

  .feature {
    display: flex;
    gap: 20px;
    background: #fef6f6;
    border-radius: 8px;
    padding: 25px;
    border-left: 4px solid @primary-color;

    .icon {
      font-size: 2.5rem;
      flex-shrink: 0;
      color: @primary-color;
    }

    .content {
      flex: 1;

      h3 {
        font-size: 1.4rem;
        margin-bottom: 12px;
        color: @text-color;
      }

      p {
        color: @light-text;
        margin-bottom: 15px;
      }
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

// 命令部分
.commands {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .command-category {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 20px;
    border-top: 4px solid @primary-color;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eaeaea;
      color: @text-color;
    }
  }

  .command {
    margin-bottom: 20px;

    .name {
      font-weight: 600;
      color: @primary-color;
      margin-bottom: 5px;
      font-size: 1.1rem;
    }

    .description {
      color: @light-text;
      margin-bottom: 10px;
      font-size: 0.95rem;
    }
  }
}

// 核心文件
.core-files {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;

  .file {
    background: #f9fbfd;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #eaeaea;

    .file-header {
      display: flex;
      align-items: center;
      padding: 20px;
      background: #fef6f6;
      border-bottom: 1px solid #eaeaea;

      .icon {
        font-size: 2rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        font-size: 1.5rem;
        color: @text-color;
      }
    }

    .file-content {
      padding: 20px;

      p {
        color: @light-text;
        margin-bottom: 15px;
        font-size: 1.05rem;
      }
    }
  }
}

.features {
  list-style-type: none;

  li {
    padding: 10px 0;
    position: relative;
    padding-left: 30px;

    &:before {
      content: '✓';
      position: absolute;
      left: 0;
      color: @success-color;
      font-weight: bold;
    }
  }
}

// 版本管理
.version-management {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.version-system {
  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: @text-color;
  }

  p {
    color: @light-text;
    margin-bottom: 20px;
  }
}

.version-examples {
  .version {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 15px;
    border-left: 4px solid @primary-color;

    .number {
      font-size: 1.8rem;
      font-weight: 700;
      color: @primary-color;
      margin-bottom: 10px;
    }
  }
}

.version-syntax {
  h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: @text-color;
  }
}

.syntax-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;

  .syntax {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 15px;
    border-left: 4px solid @primary-color;

    p {
      color: @light-text;
      margin-top: 8px;
      font-size: 0.95rem;
    }
  }
}

// 工作流
.workflow {
  .workflow-steps {
    display: flex;
    flex-direction: column;
    gap: 25px;
    counter-reset: step-counter;

    .step {
      display: flex;
      gap: 20px;
      align-items: flex-start;

      .step-number {
        min-width: 40px;
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
        margin-top: 5px;
      }

      .step-content {
        flex: 1;

        h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: @text-color;
        }

        p {
          color: @light-text;
          margin-bottom: 15px;
        }
      }
    }
  }
}

.npm-footer {
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
    background: rgba(203, 56, 55, 0.1);
    border-radius: 8px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .npm-header h1 {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .core-files {
    grid-template-columns: 1fr;
  }

  .version-management {
    grid-template-columns: 1fr;
  }
}
</style>
