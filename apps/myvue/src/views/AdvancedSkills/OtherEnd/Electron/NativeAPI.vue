<template>
  <div class="electron-api-container">
    <header class="header">
      <div class="title-wrapper">
        <h1>Electron Native API</h1>
        <div class="logo">
          <div class="logo-circle">E</div>
        </div>
      </div>
      <p class="subtitle">构建跨平台桌面应用的核心能力</p>
    </header>

    <div class="content">
      <div class="api-stats">
        <div class="stat-card">
          <div class="stat-value">100+</div>
          <div class="stat-label">Native API数量</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">20+</div>
          <div class="stat-label">核心模块</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">3</div>
          <div class="stat-label">进程类型</div>
        </div>
      </div>

      <div class="process-info">
        <div class="process-card">
          <div class="process-icon bg-main">
            <i class="icon icon-main"></i>
          </div>
          <h3>主进程 (Main Process)</h3>
          <p>Node.js环境，负责应用生命周期、窗口管理、原生API调用</p>
        </div>
        <div class="process-card">
          <div class="process-icon bg-renderer">
            <i class="icon icon-renderer"></i>
          </div>
          <h3>渲染进程 (Renderer Process)</h3>
          <p>浏览器环境，负责UI渲染，通过IPC与主进程通信</p>
        </div>
        <div class="process-card">
          <div class="process-icon bg-utility">
            <i class="icon icon-utility"></i>
          </div>
          <h3>工具进程 (Utility Process)</h3>
          <p>隔离环境，用于运行不受信任的代码或CPU密集型任务</p>
        </div>
      </div>

      <div class="api-category">
        <h2 class="category-title">
          <i class="icon icon-app"></i>
          <span>应用生命周期 API</span>
          <span class="badge">最常用</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-blue">
                <i class="icon icon-event"></i>
              </div>
              <h3>app.on('ready')</h3>
              <span class="usage-rate">100%</span>
            </div>
            <div class="api-body">
              <p>应用初始化完成事件</p>
              <div class="params">
                <h4>使用说明</h4>
                <ul>
                  <li>在应用初始化完成后创建窗口</li>
                  <li>Electron应用入口点</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>const { app } = require('electron')

app.on('ready', () => {
  // 创建浏览器窗口
  createWindow()
})</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-green">
                <i class="icon icon-window"></i>
              </div>
              <h3>app.on('window-all-closed')</h3>
              <span class="usage-rate">95%</span>
            </div>
            <div class="api-body">
              <p>所有窗口关闭事件</p>
              <div class="params">
                <h4>使用说明</h4>
                <ul>
                  <li>监听所有窗口关闭事件</li>
                  <li>在macOS上通常不退出应用</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category">
        <h2 class="category-title">
          <i class="icon icon-window"></i>
          <span>窗口管理 API</span>
          <span class="badge">最常用</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-purple">
                <i class="icon icon-browser"></i>
              </div>
              <h3>new BrowserWindow()</h3>
              <span class="usage-rate">100%</span>
            </div>
            <div class="api-body">
              <p>创建浏览器窗口</p>
              <div class="params">
                <h4>常用配置参数</h4>
                <ul>
                  <li><strong>width/height</strong>: 窗口尺寸</li>
                  <li><strong>minWidth/minHeight</strong>: 最小尺寸</li>
                  <li><strong>webPreferences</strong>: Web相关设置</li>
                  <li><strong>frame</strong>: 是否显示边框</li>
                  <li><strong>titleBarStyle</strong>: 标题栏样式</li>
                  <li><strong>backgroundColor</strong>: 背景色</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>const { BrowserWindow } = require('electron')

const win = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
})

win.loadFile('index.html')</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-orange">
                <i class="icon icon-frameless"></i>
              </div>
              <h3>win.setWindowButtonVisibility()</h3>
              <span class="usage-rate">85%</span>
            </div>
            <div class="api-body">
              <p>设置窗口按钮可见性</p>
              <div class="params">
                <h4>使用说明</h4>
                <ul>
                  <li>控制窗口最小化/最大化/关闭按钮</li>
                  <li>常用于无边框窗口自定义标题栏</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>// macOS系统
win.setWindowButtonVisibility(true)

// Windows系统
win.setWindowButtonVisibility({
  minimize: true,
  maximize: true,
  close: true
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category">
        <h2 class="category-title">
          <i class="icon icon-dialog"></i>
          <span>对话框与文件系统 API</span>
          <span class="badge">高频</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-teal">
                <i class="icon icon-open"></i>
              </div>
              <h3>dialog.showOpenDialog()</h3>
              <span class="usage-rate">90%</span>
            </div>
            <div class="api-body">
              <p>显示打开文件对话框</p>
              <div class="params">
                <h4>常用参数</h4>
                <ul>
                  <li><strong>title</strong>: 对话框标题</li>
                  <li><strong>defaultPath</strong>: 默认路径</li>
                  <li><strong>buttonLabel</strong>: 确认按钮文本</li>
                  <li><strong>filters</strong>: 文件类型过滤器</li>
                  <li><strong>properties</strong>: 对话框属性</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>const { dialog } = require('electron')

dialog.showOpenDialog({
  properties: ['openFile', 'multiSelections'],
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}).then(result => {
  if (!result.canceled) {
    console.log('Selected files:', result.filePaths)
  }
})</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-pink">
                <i class="icon icon-save"></i>
              </div>
              <h3>dialog.showSaveDialog()</h3>
              <span class="usage-rate">85%</span>
            </div>
            <div class="api-body">
              <p>显示保存文件对话框</p>
              <div class="params">
                <h4>常用参数</h4>
                <ul>
                  <li><strong>title</strong>: 对话框标题</li>
                  <li><strong>defaultPath</strong>: 默认保存路径</li>
                  <li><strong>buttonLabel</strong>: 保存按钮文本</li>
                  <li><strong>filters</strong>: 文件类型过滤器</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>dialog.showSaveDialog({
  title: '保存文件',
  defaultPath: '/path/to/default',
  filters: [{ name: 'Text Files', extensions: ['txt'] }]
}).then(result => {
  if (!result.canceled) {
    fs.writeFileSync(result.filePath, content)
  }
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category">
        <h2 class="category-title">
          <i class="icon icon-ipc"></i>
          <span>进程间通信 API</span>
          <span class="badge">最常用</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-indigo">
                <i class="icon icon-ipc"></i>
              </div>
              <h3>ipcMain.handle()</h3>
              <span class="usage-rate">100%</span>
            </div>
            <div class="api-body">
              <p>主进程处理渲染进程的请求</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>channel</strong>: 通信频道名称</li>
                  <li><strong>listener</strong>: 处理函数</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>// 主进程
const { ipcMain } = require('electron')

ipcMain.handle('get-system-info', async (event) => {
  return {
    platform: process.platform,
    version: process.getSystemVersion()
  }
})</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-light-blue">
                <i class="icon icon-ipc"></i>
              </div>
              <h3>ipcRenderer.invoke()</h3>
              <span class="usage-rate">100%</span>
            </div>
            <div class="api-body">
              <p>渲染进程调用主进程方法</p>
              <div class="params">
                <h4>参数</h4>
                <ul>
                  <li><strong>channel</strong>: 通信频道名称</li>
                  <li><strong>...args</strong>: 传递给主进程的参数</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>// 渲染进程
const { ipcRenderer } = require('electron')

async function loadSystemInfo() {
  const info = await ipcRenderer.invoke('get-system-info')
  console.log('System info:', info)
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category">
        <h2 class="category-title">
          <i class="icon icon-menu"></i>
          <span>菜单与系统托盘 API</span>
          <span class="badge">高频</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-brown">
                <i class="icon icon-menu"></i>
              </div>
              <h3>Menu.buildFromTemplate()</h3>
              <span class="usage-rate">90%</span>
            </div>
            <div class="api-body">
              <p>从模板创建菜单</p>
              <div class="params">
                <h4>菜单模板结构</h4>
                <ul>
                  <li><strong>label</strong>: 菜单项标签</li>
                  <li><strong>click</strong>: 点击处理函数</li>
                  <li><strong>accelerator</strong>: 快捷键</li>
                  <li><strong>role</strong>: 预定义角色 (copy, paste等)</li>
                  <li><strong>type</strong>: 类型 (normal, separator, submenu)</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>const { Menu } = require('electron')

const template = [
  {
    label: '文件',
    submenu: [
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
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-deep-orange">
                <i class="icon icon-tray"></i>
              </div>
              <h3>new Tray()</h3>
              <span class="usage-rate">80%</span>
            </div>
            <div class="api-body">
              <p>创建系统托盘图标</p>
              <div class="params">
                <h4>常用方法</h4>
                <ul>
                  <li><strong>setImage(image)</strong>: 设置托盘图标</li>
                  <li><strong>setToolTip(toolTip)</strong>: 设置提示文本</li>
                  <li><strong>setContextMenu(menu)</strong>: 设置上下文菜单</li>
                  <li><strong>on('click')</strong>: 点击事件监听</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>const { Tray, Menu } = require('electron')
const path = require('path')

const tray = new Tray(path.join(__dirname, 'icon.png'))

tray.setToolTip('我的应用')
tray.setContextMenu(Menu.buildFromTemplate([
  { label: '显示', click: () => win.show() },
  { label: '退出', click: () => app.quit() }
]))</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="api-category">
        <h2 class="category-title">
          <i class="icon icon-system"></i>
          <span>系统集成 API</span>
          <span class="badge">中频</span>
        </h2>

        <div class="api-grid">
          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-cyan">
                <i class="icon icon-clipboard"></i>
              </div>
              <h3>clipboard</h3>
              <span class="usage-rate">85%</span>
            </div>
            <div class="api-body">
              <p>系统剪贴板操作</p>
              <div class="params">
                <h4>常用方法</h4>
                <ul>
                  <li><strong>readText()</strong>: 读取剪贴板文本</li>
                  <li><strong>writeText(text)</strong>: 写入文本到剪贴板</li>
                  <li><strong>readImage()</strong>: 读取剪贴板图片</li>
                  <li><strong>writeImage(image)</strong>: 写入图片到剪贴板</li>
                  <li><strong>clear()</strong>: 清空剪贴板</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>const { clipboard } = require('electron')

// 写入文本
clipboard.writeText('Hello Electron!')

// 读取文本
const text = clipboard.readText()
console.log('剪贴板内容:', text)

// 写入图片
const image = nativeImage.createFromPath('image.png')
clipboard.writeImage(image)</code></pre>
              </div>
            </div>
          </div>

          <div class="api-card">
            <div class="api-header">
              <div class="api-icon bg-light-green">
                <i class="icon icon-shortcut"></i>
              </div>
              <h3>globalShortcut</h3>
              <span class="usage-rate">75%</span>
            </div>
            <div class="api-body">
              <p>全局快捷键注册</p>
              <div class="params">
                <h4>常用方法</h4>
                <ul>
                  <li><strong>register(accelerator, callback)</strong>: 注册快捷键</li>
                  <li><strong>unregister(accelerator)</strong>: 注销快捷键</li>
                  <li><strong>unregisterAll()</strong>: 注销所有快捷键</li>
                  <li><strong>isRegistered(accelerator)</strong>: 检查是否注册</li>
                </ul>
              </div>
              <div class="code-example">
                <pre><code>const { globalShortcut } = require('electron')

app.on('ready', () => {
  // 注册全局快捷键
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    win.webContents.openDevTools()
  })
})

app.on('will-quit', () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll()
})</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="other-apis">
        <h2 class="section-title">
          <i class="icon icon-more"></i>
          <span>其他重要 API</span>
        </h2>
        <div class="api-table">
          <table>
            <thead>
              <tr>
                <th>API名称</th>
                <th>功能描述</th>
                <th>使用频率</th>
                <th>所属模块</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>shell.openExternal()</td>
                <td>在系统默认应用中打开URL/文件</td>
                <td>90%</td>
                <td>shell</td>
              </tr>
              <tr>
                <td>powerMonitor</td>
                <td>监听系统电源状态变化</td>
                <td>60%</td>
                <td>powerMonitor</td>
              </tr>
              <tr>
                <td>nativeTheme</td>
                <td>管理系统主题和颜色模式</td>
                <td>70%</td>
                <td>nativeTheme</td>
              </tr>
              <tr>
                <td>screen</td>
                <td>获取屏幕信息（尺寸、DPI等）</td>
                <td>80%</td>
                <td>screen</td>
              </tr>
              <tr>
                <td>net</td>
                <td>发出HTTP/HTTPS请求</td>
                <td>65%</td>
                <td>net</td>
              </tr>
              <tr>
                <td>session</td>
                <td>管理浏览器会话、cookie、缓存</td>
                <td>75%</td>
                <td>session</td>
              </tr>
              <tr>
                <td>desktopCapturer</td>
                <td>捕获屏幕和窗口媒体流</td>
                <td>50%</td>
                <td>desktopCapturer</td>
              </tr>
              <tr>
                <td>autoUpdater</td>
                <td>应用自动更新功能</td>
                <td>85%</td>
                <td>autoUpdater</td>
              </tr>
              <tr>
                <td>crashReporter</td>
                <td>应用崩溃报告</td>
                <td>40%</td>
                <td>crashReporter</td>
              </tr>
              <tr>
                <td>inAppPurchase</td>
                <td>应用内购买功能</td>
                <td>30%</td>
                <td>inAppPurchase</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <footer class="footer">
      <p>Electron Native API 参考 | 构建强大的跨平台桌面应用</p>
      <div class="links">
        <a href="https://www.electronjs.org/docs/latest" target="_blank">
          <i class="icon icon-doc"></i> 官方文档
        </a>
        <a href="https://github.com/electron/electron" target="_blank">
          <i class="icon icon-github"></i> GitHub 仓库
        </a>
        <a href="https://www.electronjs.org/apps" target="_blank">
          <i class="icon icon-apps"></i> 应用示例
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 当前选中的API类别
const activeCategory = ref('all');
</script>

<style lang="less" scoped>


// 基础变量
@primary-color: #47848f; // Electron主题色
@secondary-color: #9d50bb;
@background-light: #f8f9fa;
@text-primary: #2c3e50;
@text-secondary: #5a6d82;
@border-color: #e8e8e8;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
@success-color: #07c160;
@warning-color: #fa5151;
@info-color: #10aeff;

// 颜色变量
@blue: #10aeff;
@green: #07c160;
@orange: #f0ad4e;
@purple: #8e44ad;
@cyan: #1abc9c;
@pink: #e84393;
@red: #e74c3c;
@yellow: #f1c40f;
@teal: #1abc9c;
@indigo: #3498db;
@deep-orange: #e67e22;
@brown: #795548;
@light-green: #8bc34a;
@light-blue: #03a9f4;
@amber: #ffc107;
@deep-purple: #673ab7;

// 进程颜色
@bg-main: #47848f;
@bg-renderer: #9d50bb;
@bg-utility: #e67e22;

// 布局和基础样式
.electron-api-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: @text-primary;
  background-color: #fff;
  line-height: 1.6;
  padding-bottom: 40px;
}

.header {
  text-align: center;
  padding: 50px 0 30px;
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: @text-primary;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    .logo-circle {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, @primary-color, @secondary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: @text-secondary;
    font-weight: 400;
    margin-top: 15px;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.api-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px 30px;
  text-align: center;
  box-shadow: @card-shadow;
  border: 1px solid @border-color;
  min-width: 150px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .stat-value {
    font-size: 2.2rem;
    font-weight: 700;
    color: @primary-color;
    margin-bottom: 8px;
  }

  .stat-label {
    color: @text-secondary;
    font-size: 0.95rem;
  }
}

.process-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.process-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: @card-shadow;
  border: 1px solid @border-color;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .process-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: white;
    font-size: 1.8rem;

    &.bg-main {
      background: @bg-main;
    }

    &.bg-renderer {
      background: @bg-renderer;
    }

    &.bg-utility {
      background: @bg-utility;
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 15px;
    color: @text-primary;
  }

  p {
    color: @text-secondary;
    margin: 0;
    line-height: 1.6;
  }
}

.api-category {
  margin-top: 40px;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 25px;
  color: @text-primary;
  position: relative;
  padding-bottom: 12px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    border-radius: 2px;
  }

  .icon {
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 15%);
    color: @primary-color;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }

  .badge {
    background: @warning-color;
    color: white;
    font-size: 0.8rem;
    padding: 3px 10px;
    border-radius: 30px;
    margin-left: 10px;
  }
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.api-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid @border-color;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

.api-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f9fbfd;
  border-bottom: 1px solid @border-color;
  position: relative;
}

.api-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-size: 1.5rem;

  // 背景颜色类
  &.bg-blue {
    background: @blue;
  }

  &.bg-green {
    background: @green;
  }

  &.bg-orange {
    background: @orange;
  }

  &.bg-purple {
    background: @purple;
  }

  &.bg-cyan {
    background: @cyan;
  }

  &.bg-pink {
    background: @pink;
  }

  &.bg-red {
    background: @red;
  }

  &.bg-yellow {
    background: @yellow;
  }

  &.bg-teal {
    background: @teal;
  }

  &.bg-indigo {
    background: @indigo;
  }

  &.bg-deep-orange {
    background: @deep-orange;
  }

  &.bg-brown {
    background: @brown;
  }

  &.bg-light-green {
    background: @light-green;
  }

  &.bg-light-blue {
    background: @light-blue;
  }
}

.usage-rate {
  position: absolute;
  top: 15px;
  right: 20px;
  background: fade(@primary-color, 10%);
  color: @primary-color;
  padding: 3px 10px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}

.api-body {
  padding: 20px;

  p {
    color: @text-secondary;
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 1.05rem;
    font-weight: 500;
  }
}

.params {
  margin-bottom: 20px;

  h4 {
    font-size: 1.1rem;
    margin-bottom: 10px;
    color: @text-primary;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 16px;
      background: @primary-color;
      border-radius: 3px;
      margin-right: 10px;
    }
  }

  ul {
    padding-left: 20px;
    margin: 0;

    li {
      margin-bottom: 8px;
      color: @text-secondary;
      line-height: 1.6;

      strong {
        color: @text-primary;
        font-weight: 600;
      }
    }
  }
}

.code-example {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  overflow-x: auto;
  border: 1px solid #e8e8e8;

  pre {
    margin: 0;
    font-size: 0.9rem;

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      color: #2c3e50;
      line-height: 1.5;
    }
  }
}

.other-apis {
  margin-top: 60px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: @text-primary;
  position: relative;
  padding-bottom: 10px;
  margin-top: 40px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, @primary-color, @secondary-color);
    border-radius: 2px;
  }

  .icon {
    width: 40px;
    height: 40px;
    background: fade(@primary-color, 15%);
    color: @primary-color;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
}

.api-table {
  background: white;
  border-radius: 12px;
  box-shadow: @card-shadow;
  padding: 25px;
  border: 1px solid @border-color;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: fade(@primary-color, 8%);
      color: @primary-color;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: fade(@primary-color, 4%);
    }

    td:first-child {
      font-weight: 500;
      color: @text-primary;
    }

    td:last-child {
      font-weight: 600;
      color: @primary-color;
    }
  }
}

// 页脚
.footer {
  text-align: center;
  padding: 40px 0 20px;
  margin-top: 50px;
  border-top: 1px solid @border-color;
  color: @text-secondary;

  p {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }

  .links {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;

    a {
      color: @primary-color;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;

      &:hover {
        color: darken(@primary-color, 10%);
        transform: translateY(-2px);
      }

      .icon {
        font-size: 1.2rem;
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .header {
    padding: 30px 0 20px;

    h1 {
      font-size: 2rem;
    }
  }

  .category-title {
    font-size: 1.4rem;
  }

  .api-grid {
    grid-template-columns: 1fr;
  }

  .api-stats {
    gap: 10px;

    .stat-card {
      min-width: 120px;
      padding: 15px 20px;

      .stat-value {
        font-size: 1.8rem;
      }
    }
  }

  .process-info {
    grid-template-columns: 1fr;
  }
}
</style>
