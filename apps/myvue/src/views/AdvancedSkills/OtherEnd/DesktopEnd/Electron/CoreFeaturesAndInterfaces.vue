<template>
  <div class="electron-guide-container">
    <header class="header">
      <div class="logo-container">
        <div class="electron-logo"></div>
        <h1>Electron 核心功能与接口</h1>
      </div>
      <p class="subtitle">构建跨平台桌面应用的强大框架</p>
    </header>

    <div class="content-wrapper">
      <nav class="navigation">
        <div
          v-for="(section, index) in sections"
          :key="index"
          :class="['nav-item', { active: activeSection === index }]"
          @click="activeSection = index"
        >
          <span class="nav-icon">{{ section.icon }}</span>
          <span class="nav-text">{{ section.title }}</span>
        </div>
      </nav>

      <main class="main-content">
        <section v-if="activeSection === 0" class="content-section">
          <h2><span class="icon">🚀</span> 主进程与渲染进程</h2>
          <p>Electron应用基于Chromium和Node.js，分为两个主要进程类型：</p>
          <div class="process-diagram">
            <div class="process main-process">
              <h3>主进程 (Main Process)</h3>
              <ul>
                <li>使用Node.js环境</li>
                <li>创建应用窗口（BrowserWindow）</li>
                <li>访问完整操作系统API</li>
                <li>管理应用生命周期</li>
              </ul>
            </div>
            <div class="arrow">⇄</div>
            <div class="process render-process">
              <h3>渲染进程 (Renderer Process)</h3>
              <ul>
                <li>使用Chromium渲染页面</li>
                <li>每个窗口独立进程</li>
                <li>类似浏览器环境（DOM, CSS, JS）</li>
                <li>通过IPC与主进程通信</li>
              </ul>
            </div>
          </div>

          <h3>主进程示例代码</h3>
          <CodeBlock :code="mainProcessCode" lang="typescript" />
        </section>

        <section v-if="activeSection === 1" class="content-section">
          <h2><span class="icon">📡</span> 进程间通信 (IPC)</h2>
          <p>Electron 提供了进程间通信 (IPC) 机制，允许主进程和渲染进程之间进行双向通信。</p>

          <div class="ipc-flow">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>渲染进程 → 主进程 (ipcRenderer.send)</h3>
                <CodeBlock :code="ipcRendererSend" lang="typescript" />
              </div>
            </div>

            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>主进程监听 (ipcMain.on)</h3>
                <CodeBlock :code="ipcMainOn" lang="typescript" />
              </div>
            </div>

            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>主进程 → 渲染进程 (webContents.send)</h3>
                <CodeBlock :code="webContentsSend" lang="typescript" />
              </div>
            </div>

            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>渲染进程监听 (ipcRenderer.on)</h3>
                <CodeBlock :code="ipcRendererOn" lang="typescript" />
              </div>
            </div>
          </div>
        </section>

        <section v-if="activeSection === 2" class="content-section">
          <h2><span class="icon">🔌</span> 原生API访问</h2>
          <p>Electron 提供对操作系统原生功能的访问：</p>

          <div class="api-grid">
            <div class="api-card">
              <div class="api-icon">📁</div>
              <h3>文件系统</h3>
              <CodeBlock :code="fsExample" lang="typescript" />
            </div>

            <div class="api-card">
              <div class="api-icon">🖥️</div>
              <h3>系统托盘</h3>
              <CodeBlock :code="trayExample" lang="typescript" />
            </div>

            <div class="api-card">
              <div class="api-icon">📋</div>
              <h3>剪贴板</h3>
              <CodeBlock :code="clipboardExample" lang="typescript" />
            </div>

            <div class="api-card">
              <div class="api-icon">🔔</div>
              <h3>系统通知</h3>
              <CodeBlock :code="notificationExample" lang="typescript" />
            </div>
          </div>
        </section>

        <section v-if="activeSection === 3" class="content-section">
          <h2><span class="icon">💻</span> 窗口与菜单</h2>
          <p>Electron 提供了创建原生窗口和菜单的能力。</p>

          <div class="window-menu-demo">
            <div class="window-controls">
              <h3>窗口控制</h3>
              <CodeBlock :code="windowControls" lang="typescript" />
            </div>

            <div class="menu-controls">
              <h3>应用菜单</h3>
              <CodeBlock :code="appMenu" lang="typescript" />
            </div>
          </div>

          <div class="context-menu">
            <h3>上下文菜单</h3>
            <CodeBlock :code="contextMenu" lang="typescript" />
          </div>
        </section>

        <section v-if="activeSection === 4" class="content-section">
          <h2><span class="icon">⚙️</span> 打包与分发</h2>
          <p>Electron 应用可以使用多种工具打包分发。</p>

          <div class="packaging-options">
            <div class="option">
              <h3>electron-builder</h3>
              <CodeBlock :code="electronBuilder" lang="json" />
            </div>

            <div class="option">
              <h3>electron-forge</h3>
              <CodeBlock :code="electronForge" lang="bash" />
            </div>
          </div>

          <div class="distribution-tips">
            <h3>分发注意事项：</h3>
            <ul>
              <li>代码签名 (Windows/macOS)</li>
              <li>自动更新实现</li>
              <li>多平台构建</li>
              <li>应用沙箱化</li>
              <li>减小应用体积</li>
            </ul>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>Electron {{ electronVersion }} | Vue 3 | TypeScript</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/Code/index.vue'

// 模拟 Electron 版本
const electronVersion = '26.0.0'

// 当前激活的部分
const activeSection = ref(0)

// 导航部分
const sections = [
  { icon: '🧠', title: '进程模型' },
  { icon: '📞', title: '进程通信' },
  { icon: '🔧', title: '原生 API' },
  { icon: '🖼️', title: '窗口菜单' },
  { icon: '📦', title: '打包分发' },
]

// 示例代码
const mainProcessCode = `// main.ts
import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});`

const ipcRendererSend = `// renderer.ts
import { ipcRenderer } from 'electron';

// 向主进程发送消息
ipcRenderer.send('perform-action', {
  type: 'save-data',
  payload: data
});`

const ipcMainOn = `// main.ts
import { ipcMain } from 'electron';

ipcMain.on('perform-action', (event, args) => {
  console.log('Received action:', args.type);

  // 处理请求
  if (args.type === 'save-data') {
    saveDataToFile(args.payload);
  }

  // 可选：回复消息
  event.reply('action-reply', { success: true });
});`

const webContentsSend = `// main.ts
import { BrowserWindow } from 'electron';

// 获取当前窗口
const win = BrowserWindow.getFocusedWindow();

// 向渲染进程发送消息
win.webContents.send('update-data', {
  message: 'Data updated successfully'
});`

const ipcRendererOn = `// renderer.ts
import { ipcRenderer } from 'electron';

// 监听来自主进程的消息
ipcRenderer.on('update-data', (event, data) => {
  console.log('Received update:', data.message);
  // 更新UI
});`

const fsExample = `// 使用Node.js fs模块
import fs from 'fs';

// 读取文件
fs.readFile('path/to/file', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 写文件
fs.writeFile('log.txt', 'Hello Electron!', (err) => {
  if (err) throw err;
  console.log('File saved!');
});`

const trayExample = `// 系统托盘
import { Tray, Menu } from 'electron';
import path from 'path';

const tray = new Tray(path.join(__dirname, 'icon.png'));

const contextMenu = Menu.buildFromTemplate([
  { label: 'Show App', click: () => mainWindow.show() },
  { label: 'Quit', click: () => app.quit() }
]);

tray.setToolTip('My Electron App');
tray.setContextMenu(contextMenu);`

const clipboardExample = `// 剪贴板操作
import { clipboard } from 'electron';

// 写入文本
clipboard.writeText('Hello from Electron!');

// 读取文本
const text = clipboard.readText();
console.log('Clipboard content:', text);`

const notificationExample = `// 系统通知
import { Notification } from 'electron';

new Notification({
  title: '任务完成',
  body: '文件已成功保存!'
}).show();`

const windowControls = `// 窗口控制
const win = new BrowserWindow({ /* options */ });

// 最大化
win.maximize();

// 最小化
win.minimize();

// 恢复
win.restore();

// 关闭
win.close();

// 无边框窗口
const framelessWin = new BrowserWindow({
  frame: false,
  titleBarStyle: 'hidden'
});`

const appMenu = `// 应用菜单
import { Menu } from 'electron';

const template = [
  {
    label: '文件',
    submenu: [
      { label: '新建', accelerator: 'CmdOrCtrl+N' },
      { label: '打开', accelerator: 'CmdOrCtrl+O' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);`

const contextMenu = `// 上下文菜单
import { Menu, MenuItem } from 'electron';

const contextMenu = new Menu();
contextMenu.append(new MenuItem({ label: '复制', role: 'copy' }));
contextMenu.append(new MenuItem({ label: '粘贴', role: 'paste' }));

// 在渲染进程中显示
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  contextMenu.popup({ window: remote.getCurrentWindow() });
});`

const electronBuilder = `// package.json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "scripts": {
    "start": "electron .",
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },
  "build": {
    "appId": "com.example.myapp",
    "productName": "My Electron App",
    "directories": {
      "output": "dist"
    },
    "files": ["dist/**/*"],
    "mac": {
      "category": "public.app-category.productivity"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}`

const electronForge = `# 使用 electron-forge 创建项目
npx create-electron-app my-app --template=typescript

# 启动开发模式
npm run start

# 打包应用
npm run package

# 发布应用
npm run publish`
</script>

<style lang="less" scoped>


:root {
  --primary-color: #47848f;
  --primary-light: #e6f4f1;
  --secondary-color: #6c757d;
  --background: #f8f9fa;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
  --text-primary: #212529;
  --text-secondary: #495057;
  --success: #28a745;
  --info: #17a2b8;
  --warning: #ffc107;
  --danger: #dc3545;
  --code-bg: #f5f7fa;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.05);
  --radius: 8px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.electron-guide-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text-primary);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, var(--primary-color), #2c6e7f);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;

    h1 {
      font-weight: 600;
      font-size: 1.75rem;
    }
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.electron-logo {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #9feaf9, #2c6e7f);
  border-radius: 50%;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
  }

  &::before {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #47848f, #1a4d5a);
    top: 8px;
    left: 8px;
  }

  &::after {
    width: 16px;
    height: 16px;
    background: white;
    top: 16px;
    left: 16px;
  }
}

.content-wrapper {
  display: flex;
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
}

.navigation {
  width: 240px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1rem 0;
  margin-right: 1.5rem;
  height: fit-content;

  .nav-item {
    display: flex;
    align-items: center;
    padding: 0.85rem 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    color: var(--text-secondary);

    &:hover {
      background: var(--primary-light);
      color: var(--primary-color);
    }

    &.active {
      background: var(--primary-light);
      color: var(--primary-color);
      border-left: 4px solid var(--primary-color);
      font-weight: 500;
    }
  }

  .nav-icon {
    font-size: 1.25rem;
    margin-right: 0.75rem;
    width: 24px;
    text-align: center;
  }

  .nav-text {
    font-size: 0.95rem;
  }
}

.main-content {
  flex: 1;
}

.content-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
    display: flex;
    align-items: center;

    .icon {
      margin-right: 0.75rem;
    }
  }

  h3 {
    font-size: 1.2rem;
    margin: 1.5rem 0 1rem;
    color: var(--text-primary);
    font-weight: 500;
  }

  p {
    margin-bottom: 1.25rem;
    color: var(--text-secondary);
    line-height: 1.7;
  }
}

.process-diagram {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;

  .process {
    flex: 1;
    background: var(--primary-light);
    border-radius: var(--radius);
    padding: 1.5rem;
    border: 1px solid rgba(71, 132, 143, 0.2);

    h3 {
      color: var(--primary-color);
      margin-top: 0;
    }

    ul {
      padding-left: 1.25rem;
      margin: 1rem 0;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }

  .arrow {
    font-size: 1.5rem;
    padding: 0 1.5rem;
    color: var(--secondary-color);
  }
}

.ipc-flow {
  .flow-step {
    display: flex;
    margin-bottom: 1.5rem;

    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      font-weight: 600;
      margin-right: 1rem;
      flex-shrink: 0;
    }

    .step-content {
      flex: 1;
      background: var(--code-bg);
      border-radius: var(--radius);
      padding: 1.25rem;
      border-left: 3px solid var(--primary-color);
    }
  }
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .api-card {
    background: var(--primary-light);
    border-radius: var(--radius);
    padding: 1.5rem;
    border: 1px solid rgba(71, 132, 143, 0.2);

    .api-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
    }
  }
}

.window-menu-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;

  .window-controls,
  .menu-controls {
    background: var(--code-bg);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
}

.context-menu {
  background: var(--code-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.packaging-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin: 1.5rem 0;

  .option {
    background: var(--code-bg);
    border-radius: var(--radius);
    padding: 1.5rem;
  }
}

.distribution-tips {
  background: var(--primary-light);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1.5rem;

  ul {
    padding-left: 1.5rem;
    margin-top: 1rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.footer {
  text-align: center;
  padding: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  background: var(--card-bg);
  margin-top: auto;
}

@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
  }

  .navigation {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1.5rem;
    display: flex;
    overflow-x: auto;

    .nav-item {
      flex-shrink: 0;
    }
  }

  .process-diagram {
    flex-direction: column;

    .arrow {
      padding: 1.5rem 0;
      transform: rotate(90deg);
    }
  }

  .window-menu-demo,
  .packaging-options {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;

    .logo-container h1 {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .content-section {
    padding: 1.5rem;
  }

  .api-grid {
    grid-template-columns: 1fr;
  }
}
</style>
