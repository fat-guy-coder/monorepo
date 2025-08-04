<template>
  <div class="child-process-container">
    <!-- 头部介绍 -->
    <div class="header-section">
      <div class="title-group">
        <div class="logo-container">
          <div class="node-logo">
            <div class="n">N</div>
          </div>
        </div>
        <div class="text-content">
          <h1>Node.js child_process 模块</h1>
          <p class="subtitle">在Node.js中创建和管理子进程的强大工具</p>
        </div>
      </div>

      <div class="intro-cards">
        <div class="intro-card">
          <div class="card-icon">🚀</div>
          <div class="card-content">
            <h3>核心功能</h3>
            <p>执行系统命令、运行外部程序、处理耗时任务</p>
          </div>
        </div>
        <div class="intro-card">
          <div class="card-icon">🔌</div>
          <div class="card-content">
            <h3>主要API</h3>
            <p>spawn, exec, execFile, fork</p>
          </div>
        </div>
        <div class="intro-card">
          <div class="card-icon">⚙️</div>
          <div class="card-content">
            <h3>适用场景</h3>
            <p>CLI工具、自动化脚本、进程管理</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 模块介绍 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">📚</div>
        <h2>child_process 模块介绍</h2>
      </div>
      <div class="section-content">
        <div class="info-card">
          <p>
            <strong>child_process</strong> 是 Node.js
            的核心模块，提供了创建和管理子进程的能力。它允许 Node.js
            应用程序执行系统命令、运行外部脚本以及与操作系统交互，从而扩展了 Node.js 的单线程限制。
          </p>

          <div class="key-points">
            <div class="point">
              <div class="point-icon">✅</div>
              <div class="point-text">在独立的进程中执行系统命令</div>
            </div>
            <div class="point">
              <div class="point-icon">✅</div>
              <div class="point-text">处理长时间运行的任务而不阻塞事件循环</div>
            </div>
            <div class="point">
              <div class="point-icon">✅</div>
              <div class="point-text">提供多种进程创建和通信方式</div>
            </div>
            <div class="point">
              <div class="point-icon">✅</div>
              <div class="point-text">支持进程间通信(IPC)</div>
            </div>
          </div>

          <div class="comparison">
            <div class="comparison-item">
              <h4>为什么需要子进程？</h4>
              <ul>
                <li>Node.js 是单线程的，CPU密集型任务会阻塞事件循环</li>
                <li>某些功能只能通过系统命令实现</li>
                <li>需要隔离崩溃或内存泄漏的代码</li>
                <li>利用多核CPU并行处理任务</li>
              </ul>
            </div>
            <div class="comparison-item">
              <h4>核心概念</h4>
              <ul>
                <li><strong>stdin</strong> - 标准输入流</li>
                <li><strong>stdout</strong> - 标准输出流</li>
                <li><strong>stderr</strong> - 标准错误流</li>
                <li><strong>exit code</strong> - 进程退出码</li>
                <li><strong>IPC</strong> - 进程间通信</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- API详解 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🔧</div>
        <h2>child_process API详解</h2>
      </div>
      <div class="section-content">
        <div class="api-tabs">
          <button
            v-for="(api, index) in apis"
            :key="index"
            :class="{ active: activeApi === index }"
            @click="activeApi = index"
          >
            {{ api.name }}
          </button>
        </div>

        <div class="api-details" v-if="activeApi !== null">
          <div class="api-info">
            <h3>{{ apis[activeApi].name }}</h3>
            <p>{{ apis[activeApi].description }}</p>

            <div class="usage-box">
              <h4>使用方式:</h4>
              <pre><code>{{ apis[activeApi].usage }}</code></pre>
            </div>
          </div>

          <div class="api-params">
            <h4>参数说明:</h4>
            <div class="params-table">
              <div class="header-row">
                <div>参数</div>
                <div>类型</div>
                <div>说明</div>
              </div>
              <div v-for="(param, index) in apis[activeApi].params" :key="index" class="param-row">
                <div>{{ param.name }}</div>
                <div>{{ param.type }}</div>
                <div>{{ param.description }}</div>
              </div>
            </div>
          </div>

          <div class="api-example">
            <h4>代码示例:</h4>
            <pre><code>{{ apis[activeApi].example }}</code></pre>
          </div>

          <div class="api-notes">
            <h4>注意事项:</h4>
            <ul>
              <li v-for="(note, index) in apis[activeApi].notes" :key="index">{{ note }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 适用场景 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🚀</div>
        <h2>适用场景</h2>
      </div>
      <div class="section-content">
        <div class="scenario-grid">
          <div class="scenario-card">
            <div class="scenario-icon">💻</div>
            <h3>命令行工具</h3>
            <p>创建类似git、npm等命令行工具，执行系统命令和外部程序</p>
            <div class="example-code">
              <pre><code>exec('ls -la', (err, stdout) => {
  console.log(stdout);
});</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📊</div>
            <h3>数据处理</h3>
            <p>执行Python/R脚本进行数据分析或机器学习</p>
            <div class="example-code">
              <pre><code>spawn('python', ['data_analysis.py', 'input.csv']);</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔧</div>
            <h3>构建工具</h3>
            <p>在构建过程中执行打包、压缩等任务</p>
            <div class="example-code">
              <pre><code>execFile('webpack', ['--config', 'webpack.prod.js']);</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">📦</div>
            <h3>微服务架构</h3>
            <p>使用fork创建子进程处理特定任务</p>
            <div class="example-code">
              <pre><code>const worker = fork('./worker.js');
worker.send({ task: 'processData' });</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔄</div>
            <h3>任务自动化</h3>
            <p>自动化文件操作、部署任务等</p>
            <div class="example-code">
              <pre><code>exec('git pull && npm install && npm run build');</code></pre>
            </div>
          </div>

          <div class="scenario-card">
            <div class="scenario-icon">🔗</div>
            <h3>进程监控</h3>
            <p>监控子进程状态并重启崩溃的进程</p>
            <div class="example-code">
              <pre><code>const child = spawn('server.js');
child.on('exit', (code) => {
  if (code !== 0) restartChild();
});</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🌟</div>
        <h2>最佳实践与安全提示</h2>
      </div>
      <div class="section-content">
        <div class="best-practices">
          <div class="practice-card">
            <div class="practice-icon">🔒</div>
            <h3>安全注意事项</h3>
            <ul>
              <li>永远不要直接执行用户输入的命令</li>
              <li>使用execFile代替exec执行固定命令</li>
              <li>验证和清理所有输入参数</li>
              <li>设置超时防止进程挂起</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">⚡</div>
            <h3>性能优化</h3>
            <ul>
              <li>使用spawn处理大量数据流</li>
              <li>避免在循环中频繁创建进程</li>
              <li>使用进程池管理多个子进程</li>
              <li>优先使用fork进行IPC通信</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🛠️</div>
            <h3>错误处理</h3>
            <ul>
              <li>始终检查err参数</li>
              <li>监听error和exit事件</li>
              <li>处理不同操作系统的兼容性问题</li>
              <li>记录详细错误日志</li>
            </ul>
          </div>
        </div>

        <div class="comparison-table">
          <h3>API方法比较</h3>
          <div class="table-container">
            <div class="table-row header">
              <div>方法</div>
              <div>适用场景</div>
              <div>数据流</div>
              <div>Shell使用</div>
              <div>性能</div>
            </div>
            <div class="table-row">
              <div><strong>spawn</strong></div>
              <div>大数据流处理</div>
              <div>流式</div>
              <div>可选</div>
              <div>高</div>
            </div>
            <div class="table-row">
              <div><strong>exec</strong></div>
              <div>简单命令</div>
              <div>缓冲</div>
              <div>是</div>
              <div>中</div>
            </div>
            <div class="table-row">
              <div><strong>execFile</strong></div>
              <div>执行可执行文件</div>
              <div>缓冲</div>
              <div>否</div>
              <div>高</div>
            </div>
            <div class="table-row">
              <div><strong>fork</strong></div>
              <div>Node.js模块</div>
              <div>IPC</div>
              <div>否</div>
              <div>高</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="summary-section">
      <h3>child_process 使用总结</h3>
      <div class="summary-content">
        <p>
          <strong>child_process</strong> 是 Node.js
          中处理外部进程的核心模块，提供了多种创建和管理子进程的方式：
        </p>

        <div class="summary-points">
          <div class="point">
            <div class="point-icon">1</div>
            <div class="point-text">使用 <code>spawn</code> 处理流式输入/输出的长时进程</div>
          </div>
          <div class="point">
            <div class="point-icon">2</div>
            <div class="point-text">使用 <code>exec</code> 执行简单命令并获取输出</div>
          </div>
          <div class="point">
            <div class="point-icon">3</div>
            <div class="point-text">使用 <code>execFile</code> 安全地执行可执行文件</div>
          </div>
          <div class="point">
            <div class="point-icon">4</div>
            <div class="point-text">使用 <code>fork</code> 运行 Node.js 模块并进行 IPC 通信</div>
          </div>
        </div>

        <div class="final-tip">
          <div class="tip-icon">💡</div>
          <p>根据具体场景选择合适的API，并始终遵循安全最佳实践，避免命令注入攻击。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeApi = ref(0)

const apis = ref([
  {
    name: 'spawn',
    description:
      '启动一个子进程来执行命令，返回流(stdout/stderr)。适用于长时间运行的进程，支持流式数据处理。',
    usage: 'child_process.spawn(command[, args][, options])',
    params: [
      { name: 'command', type: 'string', description: '要运行的命令' },
      { name: 'args', type: 'Array<string>', description: '字符串参数列表' },
      { name: 'options', type: 'Object', description: '配置选项 (cwd, env, stdio等)' },
    ],
    example: `const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(\`stdout: \${data}\`);
});

ls.stderr.on('data', (data) => {
  console.error(\`stderr: \${data}\`);
});

ls.on('close', (code) => {
  console.log(\`子进程退出，退出码 \${code}\`);
});`,
    notes: [
      '适用于处理大量数据或长时间运行的进程',
      '数据通过流(Stream)处理，内存效率高',
      '不默认在shell中执行命令，更安全',
      '可以使用stdio选项配置输入/输出流',
    ],
  },
  {
    name: 'exec',
    description: '在shell中执行命令并将输出缓冲。适用于执行简单命令并获取全部输出结果。',
    usage: 'child_process.exec(command[, options][, callback])',
    params: [
      { name: 'command', type: 'string', description: '要执行的命令，包含空格分隔的参数' },
      { name: 'options', type: 'Object', description: '配置选项 (cwd, env, timeout等)' },
      { name: 'callback', type: 'Function', description: '进程终止时回调 (error, stdout, stderr)' },
    ],
    example: `const { exec } = require('child_process');

exec('ls -lh /usr', (error, stdout, stderr) => {
  if (error) {
    console.error(\`执行错误: \${error}\`);
    return;
  }
  console.log(\`stdout: \${stdout}\`);
  console.error(\`stderr: \${stderr}\`);
});`,
    notes: [
      '在shell中执行命令，支持命令行语法（管道、重定向等）',
      '输出被缓冲，可能会消耗大量内存',
      '适合执行快速命令并获取全部输出',
      '存在命令注入风险，不要直接执行用户输入',
    ],
  },
  {
    name: 'execFile',
    description: '直接执行可执行文件，无需shell。比exec更安全，但不支持shell特性。',
    usage: 'child_process.execFile(file[, args][, options][, callback])',
    params: [
      { name: 'file', type: 'string', description: '要运行的可执行文件的名称或路径' },
      { name: 'args', type: 'Array<string>', description: '字符串参数列表' },
      { name: 'options', type: 'Object', description: '配置选项 (cwd, env等)' },
      { name: 'callback', type: 'Function', description: '进程终止时回调 (error, stdout, stderr)' },
    ],
    example: `const { execFile } = require('child_process');

execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) throw error;
  console.log(\`Node版本: \${stdout}\`);
});`,
    notes: [
      '直接执行可执行文件，不启动shell',
      '比exec更安全，避免shell注入攻击',
      '不支持shell特性（管道、通配符等）',
      '适合执行已知的安全可执行文件',
    ],
  },
  {
    name: 'fork',
    description: '创建一个新的Node.js进程，并建立IPC通信通道。专门用于运行Node.js模块。',
    usage: 'child_process.fork(modulePath[, args][, options])',
    params: [
      { name: 'modulePath', type: 'string', description: '要在子进程中运行的模块路径' },
      { name: 'args', type: 'Array<string>', description: '字符串参数列表' },
      { name: 'options', type: 'Object', description: '配置选项 (cwd, env, execPath等)' },
    ],
    example: `// 父进程 parent.js
const { fork } = require('child_process');
const child = fork('./child.js');

child.send({ message: 'Hello from parent' });

child.on('message', (msg) => {
  console.log('来自子进程的消息:', msg);
});

// 子进程 child.js
process.on('message', (msg) => {
  console.log('来自父进程的消息:', msg);
  process.send({ message: 'Hello from child' });
});`,
    notes: [
      '专门用于创建新的Node.js进程',
      '自动创建IPC通道用于父子进程通信',
      '子进程使用独立的V8实例和内存',
      '适合CPU密集型任务或多进程架构',
    ],
  },
])
</script>

<style lang="less" scoped>
@primary-color: #026e00;
@secondary-color: #4caf50;
@accent-color: #8bc34a;
@background-light: #f8faf8;
@card-bg: #ffffff;
@text-primary: #1a3c1e;
@text-secondary: #4a6b4f;
@border-color: #e0ede2;
@success-color: #4caf50;
@shadow-light:
  0 4px 6px -1px rgba(0, 100, 0, 0.05),
  0 2px 4px -1px rgba(0, 80, 0, 0.06);
@code-bg: #f7f9f7;

body {
  background-color: @background-light;
}

.child-process-container {
  font-family:
    'Segoe UI',
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.header-section {
  margin: 2rem 0 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  .title-group {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .logo-container {
      .node-logo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, @primary-color, @secondary-color);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 12px rgba(0, 100, 0, 0.15);

        .n {
          color: white;
          font-size: 3.5rem;
          font-weight: 800;
          font-family: 'Arial Rounded MT Bold', 'Arial', sans-serif;
          transform: translateY(-2px);
        }
      }
    }

    .text-content {
      h1 {
        font-size: 2.4rem;
        margin: 0 0 0.5rem;
        color: @text-primary;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.3rem;
        color: @text-secondary;
        margin: 0;
      }
    }
  }

  .intro-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    .intro-card {
      background: @card-bg;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: @shadow-light;
      display: flex;
      gap: 1rem;
      transition: transform 0.3s ease;
      border-left: 4px solid @accent-color;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 15px -3px rgba(0, 100, 0, 0.1);
      }

      .card-icon {
        font-size: 2rem;
        min-width: 50px;
        height: 50px;
        border-radius: 50%;
        background: fade(@secondary-color, 15%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: @primary-color;
      }

      .card-content {
        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.3rem;
        }

        p {
          margin: 0;
          color: @text-secondary;
          font-size: 0.95rem;
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .header-section .intro-cards {
    grid-template-columns: 1fr;
  }
}

.section {
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid @border-color;

  .section-icon {
    font-size: 1.8rem;
    color: @primary-color;
  }

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
  }
}

.section-content {
  .info-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @shadow-light;

    p {
      margin-top: 0;

      strong {
        color: @primary-color;
      }
    }

    .key-points {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin: 1.5rem 0;

      .point {
        display: flex;
        gap: 0.8rem;
        align-items: flex-start;

        .point-icon {
          font-size: 1.1rem;
          color: @success-color;
          margin-top: 0.2rem;
        }

        .point-text {
          flex: 1;
        }
      }
    }

    .comparison {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;

      .comparison-item {
        background: lighten(@border-color, 5%);
        border-radius: 10px;
        padding: 1.5rem;

        h4 {
          margin-top: 0;
          color: @primary-color;
          border-bottom: 1px solid @border-color;
          padding-bottom: 0.5rem;
        }

        ul {
          padding-left: 1.5rem;
          margin-bottom: 0;

          li {
            margin-bottom: 0.8rem;
          }
        }
      }
    }
  }
}

.api-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  button {
    padding: 0.8rem 1.5rem;
    background: lighten(@border-color, 7%);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
    color: @text-secondary;

    &.active {
      background: @primary-color;
      color: white;
    }

    &:hover:not(.active) {
      background: darken(@border-color, 5%);
    }
  }
}

.api-details {
  background: @card-bg;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: @shadow-light;

  .api-info {
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid @border-color;

    h3 {
      margin-top: 0;
      color: @primary-color;
      font-size: 1.6rem;
    }

    .usage-box {
      background: @code-bg;
      border-radius: 8px;
      padding: 1.2rem;
      margin-top: 1rem;

      h4 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: @text-secondary;
      }
    }
  }

  .api-params {
    margin-bottom: 1.5rem;

    h4 {
      margin-top: 0;
    }

    .params-table {
      display: grid;
      grid-template-columns: 1fr 2fr 5fr;
      border: 1px solid @border-color;
      border-radius: 8px;
      overflow: hidden;

      .header-row,
      .param-row {
        display: contents;

        > div {
          padding: 1rem;
        }
      }

      .header-row > div {
        background: fade(@primary-color, 8%);
        font-weight: 600;
      }

      .param-row > div {
        border-top: 1px solid @border-color;
        padding: 0.8rem 1rem;
      }
    }
  }

  .api-example {
    margin-bottom: 1.5rem;

    h4 {
      margin-top: 0;
    }
  }

  .api-notes {
    background: fade(@accent-color, 8%);
    border-radius: 8px;
    padding: 1.5rem;

    h4 {
      margin-top: 0;
    }

    ul {
      padding-left: 1.5rem;
      margin-bottom: 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

pre {
  background: @code-bg;
  border-radius: 8px;
  padding: 1.2rem;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 1rem 0;

  code {
    color: #2c3e29;
  }
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .scenario-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.8rem;
    box-shadow: @shadow-light;
    transition: transform 0.3s ease;
    border-top: 3px solid @secondary-color;

    &:hover {
      transform: translateY(-5px);
    }

    .scenario-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    h3 {
      margin: 0 0 1rem;
      font-size: 1.3rem;
    }

    p {
      color: @text-secondary;
      margin-bottom: 1.5rem;
    }

    .example-code {
      background: @code-bg;
      border-radius: 8px;
      padding: 1rem;
      font-size: 0.9rem;
    }
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .practice-card {
    background: @card-bg;
    border-radius: 12px;
    padding: 1.8rem;
    box-shadow: @shadow-light;

    .practice-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: @primary-color;
    }

    h3 {
      margin: 0 0 1rem;
      font-size: 1.3rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid @border-color;
    }

    ul {
      padding-left: 1.2rem;
      margin-bottom: 0;

      li {
        margin-bottom: 0.8rem;
      }
    }
  }
}

.comparison-table {
  .table-container {
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: @shadow-light;
    background: white;

    .table-row {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr 1fr 1fr;

      &.header {
        background: fade(@primary-color, 8%);
        font-weight: 600;
      }

      > div {
        padding: 1rem;
        border-bottom: 1px solid @border-color;

        &:not(:last-child) {
          border-right: 1px solid @border-color;
        }
      }
    }
  }
}

.summary-section {
  margin-top: 3rem;
  background: linear-gradient(to bottom, fade(@secondary-color, 5%), transparent);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid @border-color;

  h3 {
    text-align: center;
    margin-top: 0;
    font-size: 1.8rem;
    color: @primary-color;
  }

  .summary-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: @shadow-light;

    p {
      margin-top: 0;

      strong {
        color: @primary-color;
      }
    }

    .summary-points {
      margin: 1.5rem 0;

      .point {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        align-items: center;

        .point-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: @primary-color;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }

        .point-text {
          code {
            background: @code-bg;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-weight: 500;
            color: @primary-color;
          }
        }
      }
    }

    .final-tip {
      display: flex;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid @border-color;
      margin-top: 1.5rem;

      .tip-icon {
        font-size: 1.5rem;
        color: @primary-color;
      }

      p {
        margin-bottom: 0;
        font-style: italic;
      }
    }
  }
}

@media (max-width: 768px) {
  .info-card .comparison,
  .comparison-table .table-row,
  .api-params .params-table {
    grid-template-columns: 1fr;
  }

  .api-params .params-table > div:first-child {
    background: fade(@primary-color, 8%);
    font-weight: 600;
  }

  .comparison-table .table-row > div:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid @border-color;
  }
}
</style>
