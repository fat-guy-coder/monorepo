<template>
  <div class="commander-container">
    <header class="commander-header">
      <div class="title-wrapper">
        <h1>Commander.js 开发指南</h1>
        <p class="subtitle">创建强大的Node.js命令行工具</p>
        <p><a href="https://commander.nodejs.cn/docs/" target="_blank">Commander.js 中文文档</a></p>
      </div>
      <div class="logo">
        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-buttons">
              <span class="close"></span>
              <span class="minimize"></span>
              <span class="maximize"></span>
            </div>
            <div class="terminal-title">node-cli</div>
          </div>
          <div class="terminal-body">
            <div class="terminal-line">$ my-cli greet John --caps</div>
            <div class="terminal-line output">HELLO, JOHN!</div>
            <div class="terminal-line">$ my-cli calculate 5 10 --multiply</div>
            <div class="terminal-line output">Result: 50</div>
            <div class="terminal-line">$ my-cli --help</div>
            <div class="terminal-line output">
              <div>Usage: my-cli [options] [command]</div>
              <div>...</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📦</span>
          Commander.js 是什么？
        </h2>
        <div class="intro">
          <p>
            Commander.js 是一个完整的 Node.js 命令行解决方案，灵感来自 Ruby 的
            commander。它提供了以下核心功能：
          </p>
          <div class="features-grid">
            <div class="feature">
              <div class="feature-icon">📝</div>
              <h3>命令解析</h3>
              <p>自动解析命令、选项和参数</p>
            </div>
            <div class="feature">
              <div class="feature-icon">❓</div>
              <h3>帮助生成</h3>
              <p>自动生成格式化的帮助信息</p>
            </div>
            <div class="feature">
              <div class="feature-icon">⚙️</div>
              <h3>选项处理</h3>
              <p>支持短选项、长选项和必需选项</p>
            </div>
            <div class="feature">
              <div class="feature-icon">🔄</div>
              <h3>异步操作</h3>
              <p>支持异步命令和操作</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          快速开始
        </h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>安装依赖</h3>
              <pre class="code-block">npm install commander</pre>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>创建基本CLI结构</h3>
              <pre class="code-block">
#!/usr/bin/env node

const { program } = require('commander');

program
  .name('my-cli')
  .description('一个基于Commander.js的命令行工具')
  .version('1.0.0');

program.parse();</pre
              >
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>添加第一个命令</h3>
              <pre class="code-block">
program
  .command('greet &lt;name&gt;')
  .description('向用户打招呼')
  .option('-c, --caps', '使用大写字母')
  .action((name, options) => {
    const greeting = `Hello, ${name}!`;
    console.log(options.caps ? greeting.toUpperCase() : greeting);
  });</pre
              >
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>运行你的命令</h3>
              <pre class="code-block">
$ node cli.js greet John
Hello, John!

$ node cli.js greet John --caps
HELLO, JOHN!</pre
              >
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🔧</span>
          核心功能基础介绍
        </h2>
        <div class="features">
          <div class="feature">
            <h3>命令定义</h3>
            <p>使用 <code>.command()</code> 定义命令及其参数</p>
            <pre class="code-block">
program
  .command('add &lt;num1&gt; &lt;num2&gt;')
  .description('添加两个数字')
  .action((num1, num2) => {
    const sum = Number(num1) + Number(num2);
    console.log(`结果: ${sum}`);
  });</pre
            >
          </div>
          <div class="feature">
            <h3>选项处理</h3>
            <p>使用 <code>.option()</code> 定义短/长选项</p>
            <pre class="code-block">
program
  .option('-d, --debug', '开启调试模式')
  .option('-p, --port &lt;number&gt;', '设置端口号', 3000)
  .option('-c, --config &lt;path&gt;', '配置文件路径');</pre
            >
          </div>
          <div class="feature">
            <h3>必需参数</h3>
            <p>使用尖括号 <code>&lt;required&gt;</code> 标记必需参数</p>
            <pre class="code-block">
program
  .command('create &lt;project-name&gt;')
  .description('创建新项目')
  .action((projectName) => {
    console.log(`创建项目: ${projectName}`);
  });</pre
            >
          </div>
          <div class="feature">
            <h3>可选参数</h3>
            <p>使用方括号 <code>[optional]</code> 标记可选参数</p>
            <pre class="code-block">
program
  .command('search [keyword]')
  .description('搜索内容')
  .action((keyword = 'default') => {
    console.log(`搜索关键词: ${keyword}`);
  });</pre
            >
          </div>
          <div class="feature">
            <h3>选项参数</h3>
            <p>使用 <code>.requiredOption()</code> 定义必需选项</p>
            <pre class="code-block">
program
  .requiredOption('-u, --username &lt;name&gt;', '用户名(必需)')
  .option('-p, --password &lt;pass&gt;', '密码', 'defaultPass');</pre
            >
          </div>
          <div class="feature">
            <h3>自定义帮助</h3>
            <p>使用 <code>.addHelpText()</code> 添加自定义帮助信息</p>
            <pre class="code-block">
program.addHelpText('after', `
示例:
  $ my-cli create my-project
  $ my-cli calculate 5 10 --multiply
`);</pre
            >
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🚦</span>
          高级功能
        </h2>
        <div class="advanced-features">
          <div class="feature">
            <h3>命令分组</h3>
            <pre class="code-block">
// 创建命令分组
const admin = program.command('admin');

admin.command('add-user &lt;name&gt;')
  .description('添加新用户')
  .action((name) => { /* ... */ });

admin.command('delete-user &lt;id&gt;')
  .description('删除用户')
  .action((id) => { /* ... */ });</pre
            >
          </div>
          <div class="feature">
            <h3>参数验证</h3>
            <pre class="code-block">
program
  .command('divide &lt;a&gt; &lt;b&gt;')
  .description('除法运算')
  .action((a, b) => {
    if (b == 0) {
      console.error('错误: 除数不能为零');
      process.exit(1);
    }
    console.log(a / b);
  });</pre
            >
          </div>
          <div class="feature">
            <h3>自定义参数处理</h3>
            <pre class="code-block">
function myParseInt(value) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new Error('请输入有效数字');
  }
  return parsedValue;
}

program
  .option('-n, --number &lt;value&gt;', '整数', myParseInt);</pre
            >
          </div>
          <div class="feature">
            <h3>钩子函数</h3>
            <pre class="code-block">
program
  .command('build')
  .description('构建项目')
  .hook('preAction', (thisCommand) => {
    console.log('开始构建...');
  })
  .action(() => { /* 构建逻辑 */ })
  .hook('postAction', (thisCommand) => {
    console.log('构建完成!');
  });</pre
            >
          </div>
          <div class="feature">
            <h3>执行其他命令</h3>
            <pre class="code-block">
program
  .command('greet &lt;name&gt;')
  .description('执行其他命令')
  .action((name) => {
    console.log(`执行其他命令: ${name}`);
  });</pre
            >
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💡</span>
          最佳实践
        </h2>
        <div class="best-practices">
          <div class="practice">
            <div class="practice-icon">1</div>
            <div class="practice-content">
              <h3>清晰的命令结构</h3>
              <p>将相关命令分组，保持命令结构清晰</p>
            </div>
          </div>
          <div class="practice">
            <div class="practice-icon">2</div>
            <div class="practice-content">
              <h3>提供丰富的帮助信息</h3>
              <p>为每个命令和选项添加描述</p>
            </div>
          </div>
          <div class="practice">
            <div class="practice-icon">3</div>
            <div class="practice-content">
              <h3>使用默认值</h3>
              <p>为常用选项提供合理的默认值</p>
            </div>
          </div>
          <div class="practice">
            <div class="practice-icon">4</div>
            <div class="practice-content">
              <h3>参数验证</h3>
              <p>验证输入参数，提供友好的错误提示</p>
            </div>
          </div>
          <div class="practice">
            <div class="practice-icon">5</div>
            <div class="practice-content">
              <h3>模块化组织</h3>
              <p>将命令处理逻辑拆分为独立模块</p>
            </div>
          </div>
          <div class="practice">
            <div class="practice-icon">6</div>
            <div class="practice-content">
              <h3>错误处理</h3>
              <p>使用try/catch捕获异步操作中的错误</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📦</span>
          完整示例
        </h2>
        <pre class="code-block">
#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
  .name('file-manager')
  .description('文件管理工具')
  .version('1.0.0');

// 创建文件命令
program
  .command('create &lt;filename&gt;')
  .description('创建新文件')
  .option('-c, --content &lt;text&gt;', '文件内容', '')
  .action((filename, options) => {
    fs.writeFileSync(filename, options.content);
    console.log(`文件已创建: ${filename}`);
  });

// 列出目录命令
program
  .command('list [dir]')
  .description('列出目录内容')
  .option('-a, --all', '显示所有文件(包括隐藏文件)')
  .action((dir = '.', options) => {
    const files = fs.readdirSync(dir);
    const visibleFiles = options.all
      ? files
      : files.filter(file => !file.startsWith('.'));

    console.log(`目录内容: ${dir}`);
    visibleFiles.forEach(file => console.log(`- ${file}`));
  });

// 文件信息命令
program
  .command('info &lt;filepath&gt;')
  .description('显示文件信息')
  .action((filepath) => {
    const stats = fs.statSync(filepath);
    console.log(`文件: ${path.basename(filepath)}`);
    console.log(`路径: ${path.resolve(filepath)}`);
    console.log(`大小: ${stats.size} bytes`);
    console.log(`创建时间: ${stats.birthtime.toLocaleString()}`);
  });

program.parse(process.argv);</pre
        >
      </div>
    </div>

    <footer class="commander-footer">
      <p>Commander.js 提供了强大而灵活的工具，用于创建专业的命令行应用</p>
      <div class="conclusion">开始使用Commander.js，提升你的Node.js命令行工具开发体验</div>
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
@terminal-bg: #2c3e50;
@terminal-text: #ecf0f1;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.commander-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.commander-header {
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

  .logo {
    flex: 1;
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;

    .terminal-window {
      width: 100%;
      max-width: 500px;
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
        min-height: 200px;

        .terminal-line {
          color: @terminal-text;
          margin-bottom: 10px;
          font-size: 0.95rem;

          &.output {
            color: #3498db;
            margin-left: 20px;
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
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

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

// 介绍部分
.intro {
  p {
    margin-bottom: 20px;
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;

  .feature {
    text-align: center;
    padding: 25px 15px;
    background: #eaf7ff;
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      background: #d4edff;
    }

    .feature-icon {
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

// 功能展示
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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

    p {
      margin-bottom: 10px;
      color: @light-text;
    }
  }
}

// 高级功能
.advanced-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
  }
}

// 最佳实践
.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .practice {
    display: flex;
    gap: 15px;
    padding: 20px;
    background: #eaf7ff;
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      background: #d4edff;
    }

    .practice-icon {
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
    }

    .practice-content {
      h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: @text-color;
      }

      p {
        color: @light-text;
        font-size: 0.95rem;
      }
    }
  }
}

.commander-footer {
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
  .commander-header {
    flex-direction: column;

    h1 {
      font-size: 2.2rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }

  .steps .step {
    flex-direction: column;
  }
}
</style>
