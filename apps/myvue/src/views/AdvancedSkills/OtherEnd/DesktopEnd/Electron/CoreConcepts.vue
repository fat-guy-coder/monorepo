<template>
  <div class="electron-container">
    <!-- 头部区域 -->
    <div class="header">
      <div class="header-content">
        <div class="logo-container">
          <div class="electron-logo">
            <div class="electron-orbit">
              <div class="electron-particle"></div>
            </div>
            <div class="electron-orbit">
              <div class="electron-particle"></div>
            </div>
            <div class="electron-orbit">
              <div class="electron-particle"></div>
            </div>
            <div class="electron-core"></div>
          </div>
          <h1>Electron 框架基础介绍</h1>
        </div>
        <p class="subtitle">使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用程序</p>
      </div>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">20M+</div>
          <div class="stat-label">月下载量</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">1000+</div>
          <div class="stat-label">知名应用</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">3</div>
          <div class="stat-label">主要进程</div>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <h2>提供了三类接口</h2>
      <div class="section">
        <h3>浏览器接口(Chromium)</h3>
        <p>用于与浏览器进行交互，如获取浏览器信息、控制浏览器行为等</p>
      </div>
      <div class="section">
        <h3>Node.js 接口(Node.js)</h3>
        <p>用于与Node.js进行交互，如文件操作、网络请求等</p>
      </div>
      <div class="section">
        <h3>原生接口(Native API)</h3>
        <p>用于与操作系统进行交互，如文件操作、网络请求等</p>
      </div>


    </div>

    <!-- 主要内容区域 -->
    <div class="content-grid">
      <!-- 功能概览 -->
      <div class="section">
        <div class="section-header">
          <i class="icon fas fa-cube"></i>
          <h2>Electron 核心功能</h2>
        </div>
        <div class="section-content">
          <div class="features-grid">
            <div v-for="(feature, index) in features" :key="index" class="feature-card">
              <div class="feature-icon" :style="{ backgroundColor: feature.color }">
                <i :class="feature.icon"></i>
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 常用接口 -->
      <div class="section">
        <div class="section-header">
          <i class="icon fas fa-plug"></i>
          <h2>常用 API 接口（按使用频率排序）</h2>
        </div>
        <div class="section-content">
          <div class="api-table">
            <div class="table-header">
              <div>API 模块</div>
              <div>使用频率</div>
              <div>主要功能</div>
              <div>使用场景</div>
            </div>
            <div v-for="(api, index) in apis" :key="index" class="table-row">
              <div>
                <i :class="api.icon" :style="{ color: api.color }"></i>
                <strong>{{ api.module }}</strong>
              </div>
              <div>
                <div class="usage-meter">
                  <div class="meter-bar" :style="{ width: api.usage + '%', backgroundColor: api.color }"></div>
                  <span>{{ api.usage }}%</span>
                </div>
              </div>
              <div>{{ api.function }}</div>
              <div>{{ api.scenario }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 进程通信 -->
      <div class="section">
        <div class="section-header">
          <i class="icon fas fa-exchange-alt"></i>
          <h2>进程模型与通信机制</h2>
        </div>
        <div class="section-content">
          <div class="process-model">
            <div class="process main-process">
              <div class="process-header">
                <i class="fas fa-microchip"></i>
                <h3>主进程 (Main Process)</h3>
              </div>
              <ul>
                <li>使用 Node.js 环境</li>
                <li>管理应用生命周期</li>
                <li>创建 BrowserWindow 实例</li>
                <li>访问所有 Node.js API</li>
                <li>使用 ipcMain 处理通信</li>
              </ul>
            </div>

            <div class="process-connectors">
              <div class="connector" v-for="n in 3" :key="n">
                <div class="connector-line"></div>
                <div class="connector-dot"></div>
                <div class="connector-label">IPC {{ n }}</div>
              </div>
            </div>

            <div class="process renderer-process">
              <div class="process-header">
                <i class="fas fa-window-maximize"></i>
                <h3>渲染进程 (Renderer Process)</h3>
              </div>
              <ul>
                <li>每个窗口独立进程</li>
                <li>运行 Chromium 渲染引擎</li>
                <li>使用 HTML/CSS/JavaScript</li>
                <li>受限的 Node.js 访问</li>
                <li>使用 ipcRenderer 通信</li>
              </ul>
            </div>
          </div>

          <div class="communication-example">
            <h3>IPC 通信示例：</h3>
            <div class="code-tabs">
              <button :class="{ active: activeTab === 'main' }" @click="activeTab = 'main'">主进程代码</button>
              <button :class="{ active: activeTab === 'renderer' }" @click="activeTab = 'renderer'">渲染进程代码</button>
            </div>
            <div class="code-block">
              <CodeBlock v-if="activeTab === 'main'" code="// 主进程 (main.js)
const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
});

// 处理渲染进程的请求
ipcMain.on('request-data', (event, args) => {
  console.log('收到请求:', args);

  // 模拟数据处理
  const result = { data: `处理后的${args.param}` };

  // 发送响应
  event.sender.send('response-data', result);
});

// 向渲染进程发送消息
function sendUpdate() {
  if (mainWindow) {
    mainWindow.webContents.send('app-update', {
      version: '1.2.3',
      time: new Date()
    });
  }
}

// 定时发送更新
setInterval(sendUpdate, 5000);" language="js" />
              <CodeBlock v-if="activeTab === 'renderer'" code="// 渲染进程 (renderer.js)
const { ipcRenderer } = require('electron');

// 向主进程发送请求
document.getElementById('requestBtn').addEventListener('click', () => {
  ipcRenderer.send('request-data', {
    param: '示例参数'
  });
});

// 接收主进程的响应
ipcRenderer.on('response-data', (event, data) => {
  console.log('收到响应:', data);
  document.getElementById('result').innerText = data.data;
});

// 接收主进程的更新
ipcRenderer.on('app-update', (event, update) => {
  console.log('应用更新:', update);
  document.getElementById('updateInfo').innerText =
    `版本: ${update.version} 时间: ${update.time.toLocaleTimeString()}`;
});" language="js" />
            </div>
          </div>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="section">
        <div class="section-header">
          <i class="icon fas fa-star"></i>
          <h2>最佳实践与安全建议</h2>
        </div>
        <div class="section-content">
          <div class="practices">
            <div class="practice-card">
              <h3><i class="fas fa-shield-alt"></i> 安全实践</h3>
              <ul>
                <li>启用 contextIsolation 和 nodeIntegration 的安全组合</li>
                <li>使用 Content Security Policy (CSP) 限制资源加载</li>
                <li>仅加载安全来源的内容 (HTTPS)</li>
                <li>验证和清理所有用户输入</li>
              </ul>
            </div>
            <div class="practice-card">
              <h3><i class="fas fa-tachometer-alt"></i> 性能优化</h3>
              <ul>
                <li>使用 BrowserView 替代 webview 标签</li>
                <li>在不可见时暂停或降低隐藏窗口的资源消耗</li>
                <li>使用原生模块处理 CPU 密集型任务</li>
                <li>启用内存和 CPU 分析工具</li>
              </ul>
            </div>
            <div class="practice-card">
              <h3><i class="fas fa-box"></i> 打包与分发</h3>
              <ul>
                <li>使用 electron-builder 进行应用打包</li>
                <li>为不同平台生成特定格式的包</li>
                <li>实现自动更新功能</li>
                <li>代码签名确保应用来源可信</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <div class="footer-content">
        <p>Electron {{ electronVersion }} | Vue3 技术文档 | </p>
        <div class="electron-apps">
          <span>知名 Electron 应用：</span>
          <div class="app-icons">
            <i class="fab fa-vscode" title="VS Code"></i>
            <i class="fab fa-slack" title="Slack"></i>
            <i class="fab fa-discord" title="Discord"></i>
            <i class="fab fa-figma" title="Figma"></i>
            <i class="fab fa-skype" title="Skype"></i>
            <i class="fab fa-trello" title="Trello"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CodeBlock from '@/components/Code/index.vue';

// Electron 版本信息
const electronVersion = '23.1.1';

// 功能列表
const features = ref([
  {
    title: '跨平台构建',
    description: '使用一套代码构建 Windows、macOS 和 Linux 应用程序',
    icon: 'fab fa-windows',
    color: '#00adef'
  },
  {
    title: 'Web 技术栈',
    description: '使用 HTML、CSS 和 JavaScript 构建原生应用界面',
    icon: 'fab fa-html5',
    color: '#e34f26'
  },
  {
    title: '完整系统访问',
    description: '通过 Node.js 集成访问操作系统底层功能',
    icon: 'fab fa-node-js',
    color: '#68a063'
  },
  {
    title: '原生菜单与通知',
    description: '创建原生应用菜单、系统托盘、通知和对话框',
    icon: 'fas fa-bell',
    color: '#f1c40f'
  },
  {
    title: '自动更新',
    description: '内置应用自动更新机制，简化部署流程',
    icon: 'fas fa-sync-alt',
    color: '#9b59b6'
  },
  {
    title: '崩溃报告',
    description: '收集应用程序崩溃报告，帮助诊断问题',
    icon: 'fas fa-bug',
    color: '#e74c3c'
  }
]);

// API 接口列表
const apis = ref([
  {
    module: 'app',
    usage: 100,
    function: '控制应用程序生命周期',
    scenario: '启动/退出应用、获取路径、处理事件',
    icon: 'fas fa-power-off',
    color: '#e74c3c'
  },
  {
    module: 'BrowserWindow',
    usage: 95,
    function: '创建和控制浏览器窗口',
    scenario: '创建应用窗口、设置尺寸、加载内容',
    icon: 'fas fa-window-restore',
    color: '#3498db'
  },
  {
    module: 'ipcMain/ipcRenderer',
    usage: 90,
    function: '进程间通信',
    scenario: '主进程与渲染进程之间的消息传递',
    icon: 'fas fa-exchange-alt',
    color: '#9b59b6'
  },
  {
    module: 'Menu',
    usage: 85,
    function: '创建原生应用菜单',
    scenario: '应用菜单、上下文菜单、快捷键',
    icon: 'fas fa-bars',
    color: '#1abc9c'
  },
  {
    module: 'dialog',
    usage: 80,
    function: '系统对话框',
    scenario: '文件选择、消息提示、错误对话框',
    icon: 'fas fa-comment-alt',
    color: '#f1c40f'
  },
  {
    module: 'Tray',
    usage: 70,
    function: '系统托盘图标',
    scenario: '创建和管理系统托盘图标',
    icon: 'fas fa-compress',
    color: '#e67e22'
  },
  {
    module: 'Notification',
    usage: 65,
    function: '系统通知',
    scenario: '显示操作系统原生通知',
    icon: 'fas fa-bell',
    color: '#2ecc71'
  },
  {
    module: 'shell',
    usage: 60,
    function: '系统桌面集成',
    scenario: '打开文件、URL、管理回收站等',
    icon: 'fas fa-external-link-alt',
    color: '#7f8c8d'
  }
]);

// 当前激活的代码标签页
const activeTab = ref('main');
</script>

<style lang="less" scoped>



// 颜色变量
@primary-color: #47848f;
@secondary-color: #2ecc71;
@accent-color: #9b59b6;
@dark-color: #2c3e50;
@text-color: #34495e;
@light-color: #ecf0f1;
@background-light: #f8fafc;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

.electron-container {
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  background: @background-light;
  color: @text-color;
  line-height: 1.6;
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background: linear-gradient(135deg, #1a2a3a, #2c3e50);
  border-radius: 16px;
  box-shadow: @card-shadow;
  padding: 30px;
  margin-bottom: 30px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71, #9b59b6);
  }

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    .logo-container {
      display: flex;
      align-items: center;
      gap: 20px;

      h1 {
        font-size: 2.4rem;
        font-weight: 700;
        margin: 0;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 10px;
    }
  }

  .stats {
    display: flex;
    gap: 15px;

    .stat-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 15px 20px;
      text-align: center;
      min-width: 120px;
      backdrop-filter: blur(5px);

      .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 5px;
        color: white;
      }

      .stat-label {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

.electron-logo {
  position: relative;
  width: 80px;
  height: 80px;

  .electron-core {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 25px;
    background: linear-gradient(135deg, #3498db, #9b59b6);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
  }

  .electron-orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);

    &:nth-child(1) {
      width: 100%;
      height: 100%;
      animation: orbit 12s linear infinite;
    }

    &:nth-child(2) {
      width: 70%;
      height: 70%;
      animation: orbit 8s linear infinite reverse;
    }

    &:nth-child(3) {
      width: 50%;
      height: 50%;
      animation: orbit 6s linear infinite;
    }

    .electron-particle {
      position: absolute;
      top: -8px;
      left: 50%;
      width: 16px;
      height: 16px;
      background: linear-gradient(135deg, #2ecc71, #3498db);
      border-radius: 50%;
      transform: translateX(-50%);
      box-shadow: 0 0 10px rgba(46, 204, 113, 0.7);
    }
  }
}

@keyframes orbit {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.section {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px 30px;
  background: linear-gradient(to right, @primary-color, darken(@primary-color, 10%));
  color: white;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    font-size: 18px;
  }

  h2 {
    font-size: 1.6rem;
    margin: 0;
    font-weight: 600;
  }
}

.section-content {
  padding: 30px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;

  .feature-card {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s ease;

    &:hover {
      border-color: @primary-color;
      box-shadow: 0 5px 15px rgba(71, 132, 143, 0.1);
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 24px;
      color: white;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @dark-color;
    }

    p {
      color: @text-color;
      margin: 0;
      font-size: 1.05rem;
    }
  }
}

.api-table {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;

  .table-header,
  .table-row {
    display: grid;
    grid-template-columns: 1.5fr 1.2fr 2fr 2fr;
    padding: 15px 20px;

    >div {
      padding: 12px;
      display: flex;
      align-items: center;
    }
  }

  .table-header {
    background: @primary-color;
    color: white;
    font-weight: 600;
  }

  .table-row {
    border-bottom: 1px solid #e2e8f0;

    &:nth-child(odd) {
      background: #f9fbfd;
    }

    &:last-child {
      border-bottom: none;
    }

    i {
      font-size: 1.2rem;
      margin-right: 10px;
    }
  }
}

.usage-meter {
  background: #e2e8f0;
  border-radius: 10px;
  height: 20px;
  position: relative;
  overflow: hidden;

  .meter-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 10px;
  }

  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
    z-index: 2;
  }
}

.process-model {
  display: flex;
  justify-content: space-between;
  margin: 30px 0;

  .process {
    width: 45%;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 25px;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    &.main-process {
      border-top: 4px solid #3498db;
    }

    &.renderer-process {
      border-top: 4px solid #2ecc71;
    }

    .process-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      i {
        font-size: 1.8rem;
        margin-right: 15px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }
    }

    &.main-process .process-header i {
      background: #3498db;
    }

    &.renderer-process .process-header i {
      background: #2ecc71;
    }

    h3 {
      margin: 0;
      font-size: 1.4rem;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 10px 0;
        border-bottom: 1px dashed #e2e8f0;
        padding-left: 30px;
        position: relative;

        &:before {
          content: "•";
          position: absolute;
          left: 0;
          color: @primary-color;
          font-size: 1.5rem;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .process-connectors {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .connector {
      margin: 15px 0;
      text-align: center;

      .connector-line {
        width: 2px;
        height: 40px;
        background: linear-gradient(to bottom, #3498db, #2ecc71);
        margin: 0 auto;
      }

      .connector-dot {
        width: 12px;
        height: 12px;
        background: @accent-color;
        border-radius: 50%;
        margin: 5px auto;
      }

      .connector-label {
        font-size: 0.85rem;
        color: @accent-color;
        font-weight: 500;
      }
    }
  }
}

.communication-example {
  margin-top: 40px;

  h3 {
    font-size: 1.3rem;
    color: @dark-color;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e8f0;
  }
}

.code-tabs {
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 20px;

  button {
    background: none;
    border: none;
    padding: 12px 25px;
    font-size: 1rem;
    font-weight: 500;
    color: #7f8c8d;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;

    &.active {
      color: @primary-color;
      font-weight: 600;

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        background: @primary-color;
        border-radius: 3px 3px 0 0;
      }
    }

    &:hover:not(.active) {
      color: darken(@primary-color, 10%);
    }
  }
}

.code-block {
  background: #2d3748;
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.5;

  pre {
    margin: 0;
  }

  code {
    display: block;

    // 语法高亮
    .comment {
      color: #81a1c1;
    }

    /* 注释 */
    .keyword {
      color: #c678dd;
    }

    /* 关键字 */
    .function {
      color: #61afef;
    }

    /* 函数名 */
    .string {
      color: #98c379;
    }

    /* 字符串 */
    .number {
      color: #d19a66;
    }

    /* 数字 */
    .operator {
      color: #56b6c2;
    }

    /* 操作符 */
  }
}

.practices {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;

  .practice-card {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 25px;
    background: white;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.2rem;
      margin-top: 0;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f1f5f9;

      i {
        color: @primary-color;
      }
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 10px 0;
        border-bottom: 1px dashed #e2e8f0;
        position: relative;
        padding-left: 25px;

        &:before {
          content: "•";
          position: absolute;
          left: 0;
          color: @primary-color;
          font-size: 1.5rem;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

.footer {
  background: white;
  border-radius: 16px;
  box-shadow: @card-shadow;
  padding: 20px;
  margin-top: 40px;

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      color: #7f8c8d;
      font-size: 0.95rem;
    }
  }
}

.electron-apps {
  display: flex;
  align-items: center;
  gap: 15px;

  span {
    font-size: 0.9rem;
    color: #7f8c8d;
  }

  .app-icons {
    display: flex;
    gap: 12px;

    i {
      font-size: 1.4rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      &.fa-vscode {
        color: #0078d7;
      }

      &.fa-slack {
        color: #4a154b;
      }

      &.fa-discord {
        color: #5865f2;
      }

      &.fa-figma {
        color: #f24e1e;
      }

      &.fa-skype {
        color: #00aff0;
      }

      &.fa-trello {
        color: #0079bf;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 20px;

    .header-content {
      flex-direction: column;
      text-align: center;

      .logo-container {
        flex-direction: column;
        margin-bottom: 20px;
      }
    }

    .stats {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .process-model {
    flex-direction: column;

    .process {
      width: 100%;
      margin-bottom: 30px;
    }

    .process-connectors {
      width: 100%;
      flex-direction: row;
      justify-content: space-around;
      margin: 20px 0;

      .connector {
        margin: 0 10px;

        .connector-line {
          width: 40px;
          height: 2px;
        }
      }
    }
  }

  .footer-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;

    .electron-apps {
      justify-content: center;
    }
  }
}
</style>
