<template>
  <div class="ora-container">
    <header class="header">
      <div class="logo-container">
        <div class="ora-logo">
          <div class="spinner"></div>
        </div>
        <h1>Ora.js - 命令行加载动画库</h1>
      </div>
      <p class="subtitle">优雅的命令行加载指示器，提升 CLI 用户体验</p>
    </header>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content">
      <!-- 概述部分 -->
      <section v-show="activeTab === 'overview'" class="section overview-section">
        <div class="intro-card">
          <h2>什么是 Ora.js？</h2>
          <p>
            Ora 是一个流行的 Node.js 库，用于在命令行界面中显示优雅的加载动画。 它提供简单易用的 API
            来管理异步操作的加载状态，提升命令行应用的用户体验。
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>轻量高效</h3>
            <p>极小的库体积，零依赖，不影响应用性能</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>丰富动画</h3>
            <p>内置 70+ 种加载动画，满足各种场景需求</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h3>简单易用</h3>
            <p>直观的 API 设计，快速集成到任何 CLI 工具</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3>高度可定制</h3>
            <p>支持自定义文本、颜色、动画速度和样式</p>
          </div>
        </div>

        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-value">70+</div>
            <div class="stat-label">内置动画</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">0</div>
            <div class="stat-label">依赖项</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">10M+</div>
            <div class="stat-label">月下载量</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">7.5K+</div>
            <div class="stat-label">GitHub Star</div>
          </div>
        </div>

        <div class="basic-usage">
          <h2>基本用法</h2>
          <div class="code-block">
            <pre>
// 安装 ora
npm install ora

// 基本使用示例
import ora from 'ora';

const spinner = ora('正在处理...').start();

setTimeout(() => {
  spinner.succeed('处理完成！');
}, 2000);</pre
            >
          </div>
        </div>
      </section>

      <!-- API 文档部分 -->
      <section v-show="activeTab === 'api'" class="section api-section">
        <h2>Ora.js API 参考</h2>
        <p class="api-intro">Ora 提供了简洁而强大的 API 来控制加载动画的状态和样式。</p>

        <div class="api-methods">
          <div class="api-card" v-for="(method, index) in apiMethods" :key="index">
            <div class="api-header">
              <div class="api-name">{{ method.name }}</div>
              <div class="api-params">{{ method.parameters }}</div>
              <div class="api-returns">返回: {{ method.returns }}</div>
            </div>
            <div class="api-description">{{ method.description }}</div>
            <div v-if="method.example" class="api-example">
              <pre>{{ method.example }}</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 示例部分 -->
      <section v-show="activeTab === 'examples'" class="section examples-section">
        <h2>使用示例</h2>

        <div class="example-cards">
          <div class="example-card">
            <h3>基本使用</h3>
            <div class="code-block">
              <pre>
import ora from 'ora';

// 创建并启动加载器
const spinner = ora('正在加载数据...').start();

// 模拟异步操作
setTimeout(() => {
  spinner.succeed('数据加载完成！');
}, 3000);</pre
              >
            </div>
          </div>

          <div class="example-card">
            <h3>自定义动画</h3>
            <div class="code-block">
              <pre>
import ora from 'ora';

const spinner = ora({
  text: '正在处理文件',
  spinner: {
    interval: 80,  // 帧间隔（毫秒）
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  },
  color: 'cyan'
}).start();</pre
              >
            </div>
          </div>

          <div class="example-card">
            <h3>Promise 自动处理</h3>
            <div class="code-block">
              <pre>
import ora from 'ora';

const fetchData = () => new Promise(resolve => {
  setTimeout(resolve, 2000);
});

ora.promise(fetchData(), {
  text: '获取远程数据',
  successText: '数据获取成功！',
  failText: '数据获取失败'
});</pre
              >
            </div>
          </div>

          <div class="example-card">
            <h3>多步骤任务</h3>
            <div class="code-block">
              <pre>
import ora from 'ora';

async function runTasks() {
  const spinner = ora();

  spinner.start('第一步: 初始化...');
  await task1();

  spinner.text = '第二步: 处理数据...';
  await task2();

  spinner.text = '第三步: 生成报告...';
  await task3();

  spinner.succeed('所有任务完成！');
}

runTasks();</pre
              >
            </div>
          </div>
        </div>
      </section>

      <!-- 动画展示部分 -->
      <section v-show="activeTab === 'spinners'" class="section spinners-section">
        <h2>内置动画效果</h2>
        <p>Ora.js 提供了 70 多种内置加载动画，以下是一些常用效果：</p>

        <div class="spinner-grid">
          <div v-for="(spinner, index) in spinners" :key="index" class="spinner-card">
            <div class="spinner-preview">
              <div class="spinner-animation" :style="{ color: spinner.color }">
                {{ spinner.frames[frameIndex % spinner.frames.length] }}
              </div>
            </div>
            <div class="spinner-info">
              <div class="spinner-name">{{ spinner.name }}</div>
              <div class="spinner-id">ID: {{ spinner.id }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Ora.js 文档 | 让命令行应用更优雅</p>
      <div class="footer-links">
        <a href="https://github.com/sindresorhus/ora" target="_blank">GitHub 仓库</a>
        <a href="https://www.npmjs.com/package/ora" target="_blank">NPM 包</a>
        <a href="https://sindresorhus.com/" target="_blank">作者主页</a>
      </div>
      <p class="version">当前版本: 7.0.1 | 最后更新: {{ currentDate }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentDate = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// 标签页
const tabs = ref([
  { id: 'overview', label: '概述' },
  { id: 'api', label: 'API 参考' },
  { id: 'examples', label: '使用示例' },
  { id: 'spinners', label: '动画效果' },
])
const activeTab = ref('overview')

// API 方法列表
const apiMethods = ref([
  {
    name: 'ora(text)',
    parameters: 'text?: string',
    returns: 'OraInstance',
    description: '创建一个新的加载器实例。可以传入初始文本。',
    example: `const spinner = ora('正在处理...');`,
  },
  {
    name: 'ora(options)',
    parameters: 'options?: OraOptions',
    returns: 'OraInstance',
    description: '使用配置选项创建加载器实例。支持自定义文本、动画、颜色等。',
    example: `const spinner = ora({
  text: '处理中',
  spinner: 'dots',
  color: 'yellow'
});`,
  },
  {
    name: 'start(text)',
    parameters: 'text?: string',
    returns: 'OraInstance',
    description: '启动加载动画。可以传入新文本替换初始文本。',
    example: `spinner.start('开始处理...');`,
  },
  {
    name: 'stop()',
    parameters: '',
    returns: 'OraInstance',
    description: '停止加载动画，保留当前文本。',
    example: `spinner.stop();`,
  },
  {
    name: 'succeed(text)',
    parameters: 'text?: string',
    returns: 'OraInstance',
    description: '停止加载器并显示成功状态（✓）。可传入新文本。',
    example: `spinner.succeed('处理成功！');`,
  },
  {
    name: 'fail(text)',
    parameters: 'text?: string',
    returns: 'OraInstance',
    description: '停止加载器并显示失败状态（✖）。可传入新文本。',
    example: `spinner.fail('处理失败！');`,
  },
  {
    name: 'warn(text)',
    parameters: 'text?: string',
    returns: 'OraInstance',
    description: '停止加载器并显示警告状态（⚠）。可传入新文本。',
    example: `spinner.warn('处理完成，但有警告');`,
  },
  {
    name: 'info(text)',
    parameters: 'text?: string',
    returns: 'OraInstance',
    description: '停止加载器并显示信息状态（ℹ）。可传入新文本。',
    example: `spinner.info('处理完成，查看日志');`,
  },
  {
    name: 'stopAndPersist(options)',
    parameters: 'options?: { symbol?: string; text?: string; }',
    returns: 'OraInstance',
    description: '停止加载器并保留最终状态。可自定义符号和文本。',
    example: `spinner.stopAndPersist({
  symbol: '✨',
  text: '操作完成'
});`,
  },
  {
    name: 'text',
    parameters: '',
    returns: 'string',
    description: '获取当前加载器文本。',
    example: `const currentText = spinner.text;`,
  },
  {
    name: 'text = value',
    parameters: 'value: string',
    returns: 'void',
    description: '设置加载器文本（支持动态更新）。',
    example: `spinner.text = '新状态：处理中...';`,
  },
  {
    name: 'color',
    parameters: '',
    returns: 'string',
    description: '获取当前加载器颜色。',
    example: `const currentColor = spinner.color;`,
  },
  {
    name: 'color = value',
    parameters: 'value: string',
    returns: 'void',
    description: '设置加载器颜色（支持动态更新）。',
    example: `spinner.color = 'magenta';`,
  },
  {
    name: 'ora.promise(action, options)',
    parameters: 'action: Promise, options?: PromiseOptions',
    returns: 'Promise',
    description: '自动处理 Promise 的加载状态。根据 Promise 的结果显示成功/失败状态。',
    example: `await ora.promise(fetchData(), {
  text: '加载数据',
  successText: '数据加载成功',
  failText: '数据加载失败'
});`,
  },
])

// 内置动画效果
const spinners = ref([
  {
    id: 'dots',
    name: '点状动画',
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    color: '#4361ee',
    interval: 80,
  },
  {
    id: 'dots2',
    name: '点状动画2',
    frames: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
    color: '#3a0ca3',
    interval: 80,
  },
  {
    id: 'dots3',
    name: '点状动画3',
    frames: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
    color: '#4cc9f0',
    interval: 80,
  },
  {
    id: 'line',
    name: '线状动画',
    frames: ['-', '\\', '|', '/'],
    color: '#f72585',
    interval: 130,
  },
  {
    id: 'arrow',
    name: '箭头动画',
    frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
    color: '#7209b7',
    interval: 120,
  },
  {
    id: 'triangle',
    name: '三角动画',
    frames: ['◢', '◣', '◤', '◥'],
    color: '#f8961e',
    interval: 150,
  },
  {
    id: 'bouncingBar',
    name: '弹跳条',
    frames: [
      '[    ]',
      '[=   ]',
      '[==  ]',
      '[=== ]',
      '[ ===]',
      '[  ==]',
      '[   =]',
      '[    ]',
      '[   =]',
      '[  ==]',
      '[ ===]',
      '[====]',
      '[=== ]',
      '[==  ]',
      '[=   ]',
    ],
    color: '#43aa8b',
    interval: 80,
  },
  {
    id: 'weather',
    name: '天气动画',
    frames: ['☀️', '☁️', '⛅', '🌧️', '❄️', '🌦️'],
    color: '#90be6d',
    interval: 200,
  },
])

// 动画帧索引
const frameIndex = ref(0)
let animationTimer: number | null = null

// 设置动画定时器
onMounted(() => {
  animationTimer = setInterval(() => {
    frameIndex.value++
  }, 100)
})

// 清除定时器
onUnmounted(() => {
  if (animationTimer) {
    clearInterval(animationTimer)
  }
})
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #333;
@text-light: #666;
@text-lighter: #999;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

.ora-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7ff;
  min-height: 100vh;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .ora-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    .spinner {
      width: 60px;
      height: 60px;
      border: 4px solid fade(@primary-color, 20%);
      border-top: 4px solid @accent-color;
      border-radius: 50%;
      animation: spin 1.5s linear infinite;
    }
  }

  h1 {
    margin: 0;
    font-size: 2.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    margin-top: 15px;
    opacity: 0.9;
    font-weight: 300;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  .tab-btn {
    padding: 12px 25px;
    background: @card-bg;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background: darken(@card-bg, 3%);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 4px 12px fade(@primary-color, 40%);
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.overview-section {
  .intro-card {
    background: fade(@primary-color, 5%);
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 30px;
    border-left: 4px solid @primary-color;

    h2 {
      margin-top: 0;
      color: @secondary-color;
    }
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;

  .feature-card {
    background: @card-bg;
    border-radius: 10px;
    padding: 25px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
    border: 1px solid #f0f0f0;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    h3 {
      margin: 0 0 10px;
      color: @primary-color;
    }

    p {
      color: @text-light;
      margin: 0;
    }
  }
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  .stat-item {
    text-align: center;
    min-width: 140px;
    padding: 20px;
    background: @card-bg;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: @primary-color;
      margin-bottom: 5px;
    }

    .stat-label {
      color: @text-light;
      font-size: 0.95rem;
    }
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 20px 0;

  pre {
    margin: 0;
    white-space: pre-wrap;
  }
}

.api-section {
  .api-intro {
    font-size: 1.1rem;
    margin-bottom: 30px;
    color: @text-light;
  }
}

.api-methods {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.api-card {
  background: #f9f9ff;
  border-radius: 10px;
  padding: 25px;
  border-left: 4px solid @accent-color;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .api-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;

    .api-name {
      font-weight: bold;
      font-size: 1.1rem;
      color: @primary-color;
      font-family: 'Fira Code', monospace;
    }

    .api-params {
      background: fade(@accent-color, 15%);
      color: darken(@accent-color, 20%);
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 0.9rem;
      font-family: 'Fira Code', monospace;
    }

    .api-returns {
      color: @text-light;
      font-size: 0.95rem;
    }
  }

  .api-description {
    margin-bottom: 15px;
  }

  .api-example {
    background: #2d3748;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 15px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;

    pre {
      margin: 0;
      white-space: pre-wrap;
    }
  }
}

.examples-section {
  .example-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    gap: 25px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .example-card {
    background: #f9f9ff;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #f0f0f0;

    h3 {
      margin-top: 0;
      color: @primary-color;
      padding-bottom: 15px;
      border-bottom: 1px solid #f0f0f0;
    }
  }
}

.spinners-section {
  .spinner-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 25px;
  }

  .spinner-card {
    background: @card-bg;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    }
  }

  .spinner-preview {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
  }

  .spinner-info {
    .spinner-name {
      font-weight: bold;
      margin-bottom: 5px;
    }

    .spinner-id {
      color: @text-light;
      font-size: 0.9rem;
      font-family: 'Fira Code', monospace;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 60px;
  padding: 30px 0;
  color: @text-lighter;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin: 15px 0;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .version {
    margin-top: 8px;
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .stats-bar {
    gap: 15px;

    .stat-item {
      min-width: 120px;
      padding: 15px;
    }
  }
}
</style>
