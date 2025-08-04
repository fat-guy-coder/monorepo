<template>
  <div class="electron-ecosystem-container">
    <div class="hero-section">
      <div class="hero-content">
        <h1>Electron 生态与工具链</h1>
        <p>构建跨平台桌面应用的完整解决方案</p>
        <div class="electron-stats">
          <div class="stat-item">
            <i class="fab fa-github"></i>
            <div class="stat-value">1.1M+</div>
            <div class="stat-label">GitHub Stars</div>
          </div>
          <div class="stat-item">
            <i class="fas fa-desktop"></i>
            <div class="stat-value">3</div>
            <div class="stat-label">支持平台</div>
          </div>
          <div class="stat-item">
            <i class="fas fa-code"></i>
            <div class="stat-value">1000+</div>
            <div class="stat-label">相关工具</div>
          </div>
        </div>
      </div>
      <div class="platform-icons">
        <i class="fab fa-windows"></i>
        <i class="fab fa-apple"></i>
        <i class="fab fa-linux"></i>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- Electron 核心 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-cube"></i>
          <h2>Electron 核心</h2>
        </div>
        <div class="section-content">
          <div class="core-architecture">
            <div class="architecture-diagram">
              <div class="layer">
                <div class="layer-header">Web 技术</div>
                <div class="layer-content">
                  <div class="tech">HTML</div>
                  <div class="tech">CSS</div>
                  <div class="tech">JavaScript</div>
                </div>
              </div>
              <div class="connector">
                <i class="fas fa-arrow-down"></i>
              </div>
              <div class="layer">
                <div class="layer-header">Electron API</div>
                <div class="layer-content">
                  <div class="tech">主进程</div>
                  <div class="tech">渲染进程</div>
                  <div class="tech">IPC 通信</div>
                </div>
              </div>
              <div class="connector">
                <i class="fas fa-arrow-down"></i>
              </div>
              <div class="layer">
                <div class="layer-header">原生 API</div>
                <div class="layer-content">
                  <div class="tech">Node.js</div>
                  <div class="tech">Chromium</div>
                  <div class="tech">系统 API</div>
                </div>
              </div>
            </div>
          </div>

          <div class="core-description">
            <h3><i class="fas fa-lightbulb"></i> Electron 工作原理</h3>
            <p>Electron 结合了 Chromium（用于界面渲染）和 Node.js（用于系统访问），允许开发者使用 Web 技术构建跨平台桌面应用。</p>

            <div class="process-comparison">
              <div class="process">
                <div class="process-header">主进程</div>
                <ul>
                  <li>使用 Node.js 环境</li>
                  <li>创建和管理 BrowserWindow 实例</li>
                  <li>访问所有 Node.js API</li>
                  <li>系统级操作（文件系统、菜单等）</li>
                </ul>
              </div>
              <div class="process">
                <div class="process-header">渲染进程</div>
                <ul>
                  <li>使用 Chromium 环境</li>
                  <li>每个窗口独立的进程</li>
                  <li>运行前端代码（HTML/CSS/JS）</li>
                  <li>通过 IPC 与主进程通信</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 开发工具 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-tools"></i>
          <h2>开发工具</h2>
        </div>
        <div class="section-content">
          <div class="tools-grid">
            <div class="tool-card" v-for="tool in devTools" :key="tool.name">
              <div class="tool-header" :style="{ backgroundColor: tool.color }">
                <i :class="tool.icon"></i>
                <h3>{{ tool.name }}</h3>
              </div>
              <div class="tool-body">
                <p>{{ tool.description }}</p>
                <div class="installation">
                  <h4>安装</h4>
                  <pre>{{ tool.installation }}</pre>
                </div>
                <div class="usage">
                  <h4>使用示例</h4>
                  <pre>{{ tool.usage }}</pre>
                </div>
                <div class="scenario">
                  <h4>使用场景</h4>
                  <ul>
                    <li v-for="(scene, index) in tool.scenarios" :key="index">{{ scene }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 打包工具 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-archive"></i>
          <h2>打包工具</h2>
        </div>
        <div class="section-content">
          <div class="tools-grid">
            <div class="tool-card" v-for="tool in buildTools" :key="tool.name">
              <div class="tool-header" :style="{ backgroundColor: tool.color }">
                <i :class="tool.icon"></i>
                <h3>{{ tool.name }}</h3>
              </div>
              <div class="tool-body">
                <p>{{ tool.description }}</p>
                <div class="config">
                  <h4>配置文件示例</h4>
                  <pre>{{ tool.config }}</pre>
                </div>
                <div class="command">
                  <h4>打包命令</h4>
                  <pre>{{ tool.command }}</pre>
                </div>
                <div class="scenario">
                  <h4>适用场景</h4>
                  <ul>
                    <li v-for="(scene, index) in tool.scenarios" :key="index">{{ scene }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="package-comparison">
            <h3><i class="fas fa-balance-scale"></i> 打包工具比较</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>工具</th>
                    <th>配置复杂度</th>
                    <th>构建速度</th>
                    <th>功能丰富度</th>
                    <th>签名支持</th>
                    <th>自动更新</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in packageComparison" :key="item.tool">
                    <td>{{ item.tool }}</td>
                    <td>{{ item.config }}</td>
                    <td>{{ item.speed }}</td>
                    <td>{{ item.features }}</td>
                    <td><i :class="item.signing ? 'fas fa-check success' : 'fas fa-times error'"></i></td>
                    <td><i :class="item.updates ? 'fas fa-check success' : 'fas fa-times error'"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 调试工具 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-bug"></i>
          <h2>调试工具</h2>
        </div>
        <div class="section-content">
          <div class="tools-grid">
            <div class="tool-card" v-for="tool in debugTools" :key="tool.name">
              <div class="tool-header" :style="{ backgroundColor: tool.color }">
                <i :class="tool.icon"></i>
                <h3>{{ tool.name }}</h3>
              </div>
              <div class="tool-body">
                <p>{{ tool.description }}</p>
                <div class="usage">
                  <h4>使用方法</h4>
                  <pre>{{ tool.usage }}</pre>
                </div>
                <div class="scenario">
                  <h4>最佳实践</h4>
                  <ul>
                    <li v-for="(tip, index) in tool.tips" :key="index">{{ tip }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="debugging-tips">
            <h3><i class="fas fa-tips"></i> Electron 调试技巧</h3>
            <div class="tips-grid">
              <div class="tip-card">
                <div class="tip-icon">
                  <i class="fas fa-window"></i>
                </div>
                <h4>主进程调试</h4>
                <p>使用 VSCode 的调试配置，添加以下配置：</p>
                <pre>{
  "type": "node",
  "request": "launch",
  "name": "Electron Main",
  "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
  "args": ["."],
  "outputCapture": "std"
}</pre>
              </div>

              <div class="tip-card">
                <div class="tip-icon">
                  <i class="fas fa-code"></i>
                </div>
                <h4>渲染进程调试</h4>
                <p>在创建 BrowserWindow 时启用 DevTools：</p>
                <pre>const win = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    devTools: true // 默认已启用
  }
});

// 打开 DevTools
win.webContents.openDevTools();</pre>
              </div>

              <div class="tip-card">
                <div class="tip-icon">
                  <i class="fas fa-exchange-alt"></i>
                </div>
                <h4>IPC 调试</h4>
                <p>在 main.js 中添加 IPC 监听器：</p>
                <pre>ipcMain.on('message', (event, arg) => {
  console.log('Received IPC message:', arg);
  event.reply('reply', 'Message received');
});</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 更新工具 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-sync-alt"></i>
          <h2>应用更新工具</h2>
        </div>
        <div class="section-content">
          <div class="update-options">
            <div class="option-card">
              <div class="option-header">
                <i class="fas fa-cloud"></i>
                <h3>electron-updater</h3>
              </div>
              <div class="option-content">
                <p>基于 electron-builder 的自动更新解决方案，支持多种更新服务器。</p>
                <div class="code-example">
                  <h4>安装</h4>
                  <pre>npm install electron-updater</pre>
                </div>
                <div class="code-example">
                  <h4>使用示例</h4>
                  <pre>const { autoUpdater } = require('electron-updater');

// 检查更新
autoUpdater.checkForUpdatesAndNotify();

// 监听更新事件
autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'info',
    message: '有可用更新',
    detail: '新版本已下载，将在退出后安装'
  });
});</pre>
                </div>
              </div>
            </div>

            <div class="option-card">
              <div class="option-header">
                <i class="fab fa-github"></i>
                <h3>electron-release-server</h3>
              </div>
              <div class="option-content">
                <p>自托管的 Electron 应用发布服务器，提供完整的更新管理功能。</p>
                <div class="code-example">
                  <h4>部署</h4>
                  <pre>git clone https://github.com/ArekSredzki/electron-release-server
cd electron-release-server
npm install
npm start</pre>
                </div>
                <div class="code-example">
                  <h4>客户端配置</h4>
                  <pre>const { autoUpdater } = require('electron-updater');

autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'https://your-update-server.com/updates/latest'
});</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="update-flow">
            <h3><i class="fas fa-project-diagram"></i> 自动更新流程</h3>
            <div class="flow-diagram">
              <div class="flow-step">
                <div class="step-number">1</div>
                <div class="step-content">应用启动</div>
              </div>
              <div class="flow-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="flow-step">
                <div class="step-number">2</div>
                <div class="step-content">检查更新</div>
              </div>
              <div class="flow-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="flow-step">
                <div class="step-number">3</div>
                <div class="step-content">下载更新</div>
              </div>
              <div class="flow-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="flow-step">
                <div class="step-number">4</div>
                <div class="step-content">提示用户</div>
              </div>
              <div class="flow-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
              <div class="flow-step">
                <div class="step-number">5</div>
                <div class="step-content">退出并安装</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 安全工具 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-shield-alt"></i>
          <h2>安全工具</h2>
        </div>
        <div class="section-content">
          <div class="security-grid">
            <div class="security-card">
              <div class="security-icon">
                <i class="fas fa-lock"></i>
              </div>
              <h3>Electron 安全警告</h3>
              <p>Electron 安全扫描工具，识别潜在安全问题</p>
              <pre>npm install @electron/security-warnings</pre>
            </div>

            <div class="security-card">
              <div class="security-icon">
                <i class="fas fa-file-contract"></i>
              </div>
              <h3>Electron 加固</h3>
              <p>应用加固工具，防止源代码泄露</p>
              <pre>npm install electron-asar-updater</pre>
            </div>

            <div class="security-card">
              <div class="security-icon">
                <i class="fas fa-certificate"></i>
              </div>
              <h3>代码签名</h3>
              <p>使用 electron-builder 进行应用签名</p>
              <pre>// package.json
"build": {
  "win": {
    "certificateFile": "cert.pfx",
    "certificatePassword": "password"
  }
}</pre>
            </div>
          </div>

          <div class="security-checklist">
            <h3><i class="fas fa-check-circle"></i> Electron 安全清单</h3>
            <ul>
              <li>禁用 Node.js 集成（在不需要的渲染进程中）</li>
              <li>启用上下文隔离（contextIsolation）</li>
              <li>使用沙盒（sandbox）模式</li>
              <li>验证所有用户输入</li>
              <li>使用 CSP（内容安全策略）</li>
              <li>保持 Electron 和依赖库更新</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 生态资源 -->
      <section class="section">
        <div class="section-header">
          <i class="icon fas fa-book"></i>
          <h2>学习资源与社区</h2>
        </div>
        <div class="section-content">
          <div class="resources-grid">
            <a href="#" class="resource-card">
              <i class="fas fa-book"></i>
              <h3>官方文档</h3>
              <p>electronjs.org/docs</p>
            </a>

            <a href="#" class="resource-card">
              <i class="fab fa-github"></i>
              <h3>Awesome Electron</h3>
              <p>精选 Electron 资源列表</p>
            </a>

            <a href="#" class="resource-card">
              <i class="fab fa-discord"></i>
              <h3>Discord 社区</h3>
              <p>实时交流与问题解决</p>
            </a>

            <a href="#" class="resource-card">
              <i class="fas fa-video"></i>
              <h3>Electron Fiddle</h3>
              <p>交互式学习工具</p>
            </a>
          </div>

          <div class="boilerplates">
            <h3><i class="fas fa-rocket"></i> 热门脚手架</h3>
            <div class="boilerplate-list">
              <div class="boilerplate">
                <div class="bp-icon">
                  <i class="fab fa-vuejs"></i>
                </div>
                <div class="bp-info">
                  <h4>electron-vue</h4>
                  <p>Vue CLI + Electron 集成</p>
                  <pre>vue create my-app
vue add electron-builder</pre>
                </div>
              </div>

              <div class="boilerplate">
                <div class="bp-icon">
                  <i class="fab fa-react"></i>
                </div>
                <div class="bp-info">
                  <h4>electron-react-boilerplate</h4>
                  <p>React + Electron + Webpack</p>
                  <pre>git clone --depth 1 \
  https://github.com/electron-react-boilerplate/electron-react-boilerplate \
  your-project-name</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>Electron 生态与工具链 | 构建下一代桌面应用</p>
      <div class="footer-links">
        <a href="#"><i class="fab fa-github"></i> Electron GitHub</a>
        <a href="#"><i class="fas fa-book"></i> 官方文档</a>
        <a href="#"><i class="fab fa-discord"></i> 社区支持</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 开发工具
const devTools = ref([
  {
    name: "Electron Forge",
    icon: "fas fa-hammer",
    color: "#3b82f6",
    description: "完整的 Electron 开发工具集，包含创建、开发、打包和发布功能",
    installation: "npm install --save-dev @electron-forge/cli\nnpx electron-forge import",
    usage: `// 启动开发环境
npm start

// 打包应用
npm run package

// 发布应用
npm run publish`,
    scenarios: [
      "快速创建 Electron 项目",
      "开发环境热重载",
      "多平台打包与发布"
    ]
  },
  {
    name: "Electron Fiddle",
    icon: "fas fa-vial",
    color: "#8b5cf6",
    description: "交互式 Electron 实验场，快速创建和分享 Electron 代码片段",
    installation: "可从 GitHub 发布页面下载安装包：\ngithub.com/electron/fiddle/releases",
    usage: `// 无需安装，直接运行
// 1. 选择 Electron 版本
// 2. 编写代码
// 3. 运行查看效果
// 4. 导出为可执行项目或 Gist`,
    scenarios: [
      "快速原型设计",
      "Electron API 学习",
      "问题重现与分享"
    ]
  }
]);

// 打包工具
const buildTools = ref([
  {
    name: "electron-builder",
    icon: "fas fa-box-open",
    color: "#10b981",
    description: "功能强大的 Electron 应用打包工具，支持自动更新、代码签名等",
    config: `// package.json
{
  "build": {
    "appId": "com.example.app",
    "productName": "MyApp",
    "directories": {
      "output": "dist"
    },
    "files": ["dist/**/*"],
    "win": {
      "target": "nsis"
    },
    "mac": {
      "target": "dmg"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}`,
    command: "npm run build",
    scenarios: [
      "创建安装包（NSIS, DMG, AppImage）",
      "应用签名（Windows, macOS）",
      "自动更新支持",
      "多平台打包"
    ]
  },
  {
    name: "electron-packager",
    icon: "fas fa-archive",
    color: "#ef4444",
    description: "简单的 Electron 应用打包工具，适合基础打包需求",
    config: `// package.json
{
  "scripts": {
    "package": "electron-packager . --out=dist --overwrite"
  }
}`,
    command: "npm run package -- --platform=win32 --arch=x64",
    scenarios: [
      "快速生成可执行文件",
      "多平台打包（通过命令行参数）",
      "简单项目打包"
    ]
  }
]);

// 打包工具比较
const packageComparison = ref([
  { tool: "electron-builder", config: "中等", speed: "快", features: "丰富", signing: true, updates: true },
  { tool: "electron-packager", config: "简单", speed: "中等", features: "基础", signing: false, updates: false },
  { tool: "electron-forge", config: "复杂", speed: "中等", features: "全面", signing: true, updates: true }
]);

// 调试工具
const debugTools = ref([
  {
    name: "Devtron",
    icon: "fas fa-microscope",
    color: "#f59e0b",
    description: "Electron 开发工具扩展，提供 IPC 监视、事件查看等功能",
    installation: "npm install --save-dev devtron",
    usage: `// 在主进程中
require('devtron').install();

// 在渲染进程中
// 打开 Chrome DevTools -> 添加 Devtron 面板`,
    tips: [
      "监控 IPC 通信",
      "查看 Electron API 使用情况",
      "检查事件监听器"
    ]
  },
  {
    name: "Spectron",
    icon: "fas fa-vial",
    color: "#ec4899",
    description: "Electron 应用测试框架，基于 WebDriverIO",
    installation: "npm install --save-dev spectron",
    usage: `const Application = require('spectron').Application;
const assert = require('assert');

describe('App Test', function () {
  this.timeout(10000);

  beforeEach(() => {
    this.app = new Application({
      path: '/path/to/electron',
      args: ['/path/to/app']
    });
    return this.app.start();
  });

  it('shows a window', async () => {
    const count = await this.app.client.getWindowCount();
    assert.equal(count, 1);
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });
});`,
    tips: [
      "自动化界面测试",
      "模拟用户交互",
      "集成到 CI/CD 流程"
    ]
  }
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.electron-ecosystem-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2d3748;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.hero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;

    h1 {
      font-size: 2.8rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    }

    p {
      font-size: 1.3rem;
      font-weight: 300;
      opacity: 0.9;
      margin: 0 auto 30px;
    }
  }
}

.electron-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.stat-item {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 20px;
  min-width: 150px;
  text-align: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  i {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #c7d2fe;
  }

  .stat-value {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.platform-icons {
  display: flex;
  gap: 40px;
  margin-top: 30px;
  font-size: 3.5rem;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  z-index: 1;
}

.content-wrapper {
  padding: 0 20px;
}

.section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 30px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.section-header {
  display: flex;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;

  .icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.7rem;
    font-weight: 600;
  }
}

.section-content {
  padding: 25px;
}

.core-architecture {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.layer {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  width: 350px;
  border: 2px solid #e2e8f0;

  .layer-header {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #4f46e5;
    text-align: center;
  }
}

.layer-content {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;

  .tech {
    background: #e0f2fe;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.95rem;
  }
}

.connector {
  font-size: 1.5rem;
  color: #94a3b8;
}

.process-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.process {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 1px solid #e2e8f0;

  .process-header {
    font-weight: 600;
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: #4f46e5;
    text-align: center;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 15px;
      line-height: 1.6;
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
}

.tool-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
  }
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  color: white;

  i {
    font-size: 1.8rem;
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
}

.tool-body {
  padding: 25px;

  p {
    color: #4a5568;
    line-height: 1.7;
    margin-bottom: 25px;
  }
}

.installation,
.usage,
.config,
.command {
  margin-bottom: 25px;

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #4f46e5;
    display: flex;
    align-items: center;

    &::before {
      content: "";
      width: 8px;
      height: 8px;
      background: #4f46e5;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

pre {
  background: #1e293b;
  color: #f1f5f9;
  border-radius: 8px;
  padding: 20px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  overflow-x: auto;
  line-height: 1.6;
  margin: 0;
}

.scenario {
  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #4f46e5;
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 12px;
      line-height: 1.6;
    }
  }
}

.package-comparison {
  margin-top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.comparison-table {
  overflow-x: auto;
  margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #4f46e5;
      color: white;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f8fafc;
    }

    .success {
      color: #10b981;
    }

    .error {
      color: #ef4444;
    }
  }
}

.debugging-tips {
  margin-top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.tip-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;

  .tip-icon {
    width: 50px;
    height: 50px;
    background: #e0f2fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #0ea5e9;
    margin-bottom: 20px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1e293b;
  }

  pre {
    margin-top: 15px;
  }
}

.update-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
}

.option-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.option-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  color: white;

  i {
    font-size: 1.8rem;
  }

  h3 {
    margin: 0;
  }
}

.option-content {
  padding: 25px;

  p {
    color: #4a5568;
    line-height: 1.7;
    margin-bottom: 25px;
  }
}

.code-example {
  margin-bottom: 25px;

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #4f46e5;
  }
}

.update-flow {
  margin-top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.flow-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.flow-step {
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .step-number {
    font-size: 1.8rem;
    font-weight: 700;
  }

  .step-content {
    font-size: 0.9rem;
    margin-top: 5px;
  }
}

.flow-arrow {
  color: #94a3b8;
  font-size: 1.5rem;
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.security-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;

  .security-icon {
    width: 60px;
    height: 60px;
    background: #e0f2fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #0ea5e9;
    margin: 0 auto 20px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #1e293b;
  }

  pre {
    margin-top: 15px;
    text-align: left;
  }
}

.security-checklist {
  background: #f0fdf4;
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid #10b981;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 0;
    color: #047857;
  }

  ul {
    padding-left: 20px;
    margin: 15px 0 0;

    li {
      margin-bottom: 12px;
      line-height: 1.6;
    }
  }
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.resource-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  text-decoration: none;
  color: #1e293b;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
    border-color: #c7d2fe;
  }

  i {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #4f46e5;
  }

  h3 {
    margin: 0 0 10px;
  }

  p {
    color: #64748b;
    margin: 0;
  }
}

.boilerplates {
  margin-top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e293b;
  }
}

.boilerplate-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.boilerplate {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;

  .bp-icon {
    width: 60px;
    height: 60px;
    background: #ede9fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #8b5cf6;
    flex-shrink: 0;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #1e293b;
  }

  pre {
    margin-top: 15px;
  }
}

.footer {
  text-align: center;
  padding: 25px;
  color: #64748b;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 15px;

    a {
      color: #4f46e5;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 900px) {
  .hero-content h1 {
    font-size: 2.2rem !important;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }

  .architecture-diagram {
    width: 100%;

    .layer {
      width: 100%;
    }
  }
}

@media (max-width: 600px) {
  .hero-content h1 {
    font-size: 1.8rem !important;
  }

  .hero-content p {
    font-size: 1.1rem !important;
  }

  .section-header h2 {
    font-size: 1.4rem !important;
  }

  .electron-stats {
    gap: 15px;
  }

  .stat-item {
    width: 100%;
  }

  .boilerplate-list {
    grid-template-columns: 1fr;
  }
}
</style>
