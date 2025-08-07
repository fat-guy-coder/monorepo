<template>
  <div class="cli-container">
    <header class="cli-header">
      <h1>Node.js 命令行工具开发指南</h1>
      <p class="subtitle">从零开始创建强大的命令行工具</p>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          为什么开发命令行工具？
        </h2>
        <div class="reasons">
          <div class="reason">
            <div class="reason-icon">⏱️</div>
            <h3>自动化工作流</h3>
            <p>减少重复性任务，提升开发效率</p>
          </div>
          <div class="reason">
            <div class="reason-icon">🔧</div>
            <h3>简化复杂操作</h3>
            <p>将多步骤流程封装为简单命令</p>
          </div>
          <div class="reason">
            <div class="reason-icon">📦</div>
            <h3>分发实用工具</h3>
            <p>通过npm分享你的工具给其他开发者</p>
          </div>
          <div class="reason">
            <div class="reason-icon">💻</div>
            <h3>跨平台支持</h3>
            <p>在Windows、macOS和Linux上运行</p>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📦</span>
          核心依赖包
        </h2>
        <div class="packages">
          <div class="package">
            <h3 class="package-name">commander</h3>
            <p class="package-desc">完整的命令行解决方案，支持参数解析、帮助生成等</p>
            <div class="package-install">
              <code>npm install commander</code>
            </div>
          </div>
          <div class="package">
            <h3 class="package-name">chalk</h3>
            <p class="package-desc">终端字符串样式美化工具</p>
            <div class="package-install">
              <code>npm install chalk</code>
            </div>
          </div>
          <div class="package">
            <h3 class="package-name">inquirer</h3>
            <p class="package-desc">交互式命令行界面工具</p>
            <div class="package-install">
              <code>npm install inquirer</code>
            </div>
          </div>
          <div class="package">
            <h3 class="package-name">ora</h3>
            <p class="package-desc">优雅的终端加载动画</p>
            <div class="package-install">
              <code>npm install ora</code>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🛠️</span>
          创建步骤
        </h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>初始化项目</h3>
              <pre class="code-block">mkdir my-cli-tool
cd my-cli-tool
npm init -y</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>安装依赖</h3>
              <pre class="code-block">npm install commander chalk inquirer ora</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>创建入口文件</h3>
              <p>创建 <code>bin/cli.js</code> 并添加以下内容：</p>
              <pre class="code-block">#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

program
  .name('my-cli')
  .description('一个强大的命令行工具')
  .version('1.0.0');

program
  .command('greet &lt;name&gt;')
  .description('向用户打招呼')
  .option('-e, --emoji &lt;type&gt;', '添加表情符号')
  .action((name, options) => {
    let greeting = `你好, ${chalk.green(name)}!`;
    if (options.emoji) {
      greeting += ` ${getEmoji(options.emoji)}`;
    }
    console.log(greeting);
  });

program.parse();</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>配置package.json</h3>
              <pre class="code-block">{
  "name": "my-cli-tool",
  "version": "1.0.0",
  "bin": {
    "my-cli": "./bin/cli.js"
  },
  // 其他配置...
}</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>本地测试</h3>
              <pre class="code-block"># 全局链接你的工具
npm link

# 测试命令
my-cli greet John --emoji=smile</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">6</div>
            <div class="step-content">
              <h3>发布到npm</h3>
              <pre class="code-block"># 登录npm
npm login

# 发布
npm publish</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💡</span>
          高级功能实现
        </h2>
        <div class="features">
          <div class="feature">
            <h3>交互式命令</h3>
            <pre class="code-block">const inquirer = require('inquirer');

async function run() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: '选择框架:',
      choices: ['Vue', 'React', 'Angular', 'Svelte']
    },
    {
      type: 'checkbox',
      name: 'features',
      message: '选择功能:',
      choices: ['TypeScript', 'ESLint', 'Prettier', 'Testing']
    }
  ]);

  console.log(`创建 ${answers.framework} 项目...`);
  console.log(`包含功能: ${answers.features.join(', ')}`);
}</pre>
          </div>
          <div class="feature">
            <h3>加载动画</h3>
            <pre class="code-block">const ora = require('ora');

async function installDependencies() {
  const spinner = ora('正在安装依赖...').start();

  try {
    // 模拟安装过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    spinner.succeed('依赖安装成功!');
  } catch (error) {
    spinner.fail('依赖安装失败');
  }
}</pre>
          </div>
          <div class="feature">
            <h3>文件操作</h3>
            <pre class="code-block">const fs = require('fs');
const path = require('path');

function createProjectStructure(projectName) {
  const projectPath = path.join(process.cwd(), projectName);

  // 创建项目目录
  fs.mkdirSync(projectPath);

  // 创建子目录
  const dirs = ['src', 'public', 'config'];
  dirs.forEach(dir => {
    fs.mkdirSync(path.join(projectPath, dir));
  });

  // 创建基础文件
  const files = {
    'package.json': JSON.stringify({
      name: projectName,
      version: '1.0.0',
      scripts: { start: 'node src/index.js' }
    }, null, 2),
    'README.md': `# ${projectName}\n\n项目描述...`
  };

  Object.entries(files).forEach(([fileName, content]) => {
    fs.writeFileSync(path.join(projectPath, fileName), content);
  });
}</pre>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📝</span>
          最佳实践
        </h2>
        <div class="best-practices">
          <div class="practice">
            <h3>1. 清晰的帮助文档</h3>
            <p>使用 <code>commander</code> 自动生成帮助文档，确保每个命令都有描述</p>
          </div>
          <div class="practice">
            <h3>2. 错误处理</h3>
            <p>捕获所有可能的错误并提供有意义的错误消息</p>
          </div>
          <div class="practice">
            <h3>3. 进度反馈</h3>
            <p>使用加载指示器让用户知道长时间运行的操作进度</p>
          </div>
          <div class="practice">
            <h3>4. 彩色输出</h3>
            <p>使用 <code>chalk</code> 区分重要信息、警告和错误</p>
          </div>
          <div class="practice">
            <h3>5. 配置管理</h3>
            <p>使用 <code>configstore</code> 保存用户偏好设置</p>
          </div>
          <div class="practice">
            <h3>6. 测试</h3>
            <p>使用 <code>jest</code> 和 <code>execa</code> 编写命令行工具测试</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="cli-footer">
      <p>通过Node.js开发命令行工具，你可以将复杂流程自动化，提升开发效率</p>
      <div class="conclusion">现在就开始创建你的第一个命令行工具吧！</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #3498db;
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

.cli-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.cli-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;

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

// 原因展示
.reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .reason {
    text-align: center;
    padding: 25px 15px;
    background: #eaf7ff;
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      background: #d4edff;
    }

    .reason-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @primary-color;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

// 包展示
.packages {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .package {
    padding: 20px;
    background: white;
    border-radius: 8px;
    border-left: 4px solid @primary-color;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    .package-name {
      font-size: 1.4rem;
      color: @primary-color;
      margin-bottom: 8px;
    }

    .package-desc {
      color: @light-text;
      margin-bottom: 15px;
      font-size: 0.95rem;
      min-height: 60px;
    }

    .package-install {
      background: @code-bg;
      padding: 10px;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;

      code {
        color: @primary-color;
        background: none;
        padding: 0;
      }
    }
  }
}

// 步骤展示
.steps {
  display: flex;
  flex-direction: column;
  gap: 25px;

  .step {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 15px;
    background: #f9fbfd;
    border-radius: 8px;
    border-left: 3px solid @primary-color;

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
        margin-bottom: 10px;
        color: @light-text;
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
  color: #2c3e50;

  code {
    display: block;
    white-space: pre;
  }
}

// 高级功能
.features {
  display: flex;
  flex-direction: column;
  gap: 25px;

  .feature {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid @secondary-color;

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @secondary-color;
    }
  }
}

// 最佳实践
.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .practice {
    padding: 20px;
    background: #f0f7ff;
    border-radius: 8px;
    border-left: 4px solid @primary-color;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: @primary-color;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

.cli-footer {
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
  .cli-header h1 {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .steps .step {
    flex-direction: column;
  }
}
</style>
