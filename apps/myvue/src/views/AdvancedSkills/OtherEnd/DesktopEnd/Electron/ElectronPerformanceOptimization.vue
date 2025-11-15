<template>
  <div class="electron-apis-container">
    <header class="page-header">
      <h1>Electron 原生接口与功能</h1>
      <p class="subtitle">跨平台桌面应用开发的核心能力</p>
    </header>

    <div class="intro-section">
      <p>Electron 提供了丰富的原生 API，让开发者能够构建功能完整的桌面应用程序。这些 API 涵盖了从窗口管理到系统集成的各个方面。</p>
    </div>

    <div class="apis-grid">
      <!-- 应用生命周期 -->
      <section class="api-section">
        <div class="section-header">
          <div class="section-icon">🚀</div>
          <h2>应用生命周期</h2>
          <div class="process-tag">主进程</div>
        </div>

        <div class="api-content">
          <div class="api-item">
            <h3>app 模块</h3>
            <p>控制应用程序的事件生命周期，管理整个应用程序的生命周期。</p>

            <div class="code-example">
              <h4>核心方法</h4>
              <pre><code>const { app } = require('electron')

// 应用程序事件
app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 应用配置
app.setAppUserModelId('com.example.app')
app.setLoginItemSettings({
  openAtLogin: true,
  openAsHidden: false
})</code></pre>
            </div>

            <div class="feature-list">
              <h4>主要功能</h4>
              <ul>
                <li>应用程序启动和退出管理</li>
                <li>单实例应用程序控制</li>
                <li>开机自启动配置</li>
                <li>应用程序事件监听</li>
                <li>协议处理注册</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 窗口管理 -->
      <section class="api-section">
        <div class="section-header">
          <div class="section-icon">🪟</div>
          <h2>窗口管理</h2>
          <div class="process-tag">主进程</div>
        </div>

        <div class="api-content">
          <div class="api-item">
            <h3>BrowserWindow</h3>
            <p>创建和控制浏览器窗口，提供丰富的窗口定制选项。</p>

            <div class="code-example">
              <h4>窗口创建与配置</h4>
              <pre><code>const { BrowserWindow } = require('electron')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    titleBarStyle: 'hiddenInset',
    frame: false,
    transparent: true
  })

  // 窗口事件
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 窗口操作
  mainWindow.loadFile('index.html')
  mainWindow.maximize()
  mainWindow.setAlwaysOnTop(true)
}</code></pre>
            </div>

            <div class="feature-list">
              <h4>窗口特性</h4>
              <ul>
                <li>自定义窗口框架和无边框窗口</li>
                <li>透明背景和视觉特效</li>
                <li>多显示器支持和窗口定位</li>
                <li>窗口状态管理（最大化、最小化）</li>
                <li>模态窗口和子窗口</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 进程间通信 -->
      <section class="api-section">
        <div class="section-header">
          <div class="section-icon">📡</div>
          <h2>进程间通信</h2>
          <div class="process-tags">
            <span class="process-tag main">主进程</span>
            <span class="process-tag renderer">渲染进程</span>
          </div>
        </div>

        <div class="api-content">
          <div class="api-item">
            <h3>ipcMain 和 ipcRenderer</h3>
            <p>在主进程和渲染进程之间进行异步通信。</p>

            <div class="code-example">
              <h4>双向通信示例</h4>
              <div class="code-columns">
                <div class="code-column">
                  <h5>主进程 (main.js)</h5>
                  <pre><code>const { ipcMain } = require('electron')

// 处理来自渲染进程的消息
ipcMain.handle('get-app-version', () => {
  return process.env.npm_package_version
})

ipcMain.on('window-action', (event, action) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  switch (action) {
    case 'minimize':
      win.minimize()
      break
    case 'maximize':
      win.isMaximized() ?
        win.unmaximize() : win.maximize()
      break
    case 'close':
      win.close()
      break
  }
})

// 主动发送消息到渲染进程
const sendToRenderer = (window, channel, data) => {
  window.webContents.send(channel, data)
}</code></pre>
                </div>
                <div class="code-column">
                  <h5>渲染进程 (renderer.js)</h5>
                  <pre><code>const { ipcRenderer } = require('electron')

// 调用主进程方法
const getVersion = async () => {
  const version = await ipcRenderer.invoke('get-app-version')
  console.log('App version:', version)
}

// 发送消息到主进程
const minimizeWindow = () => {
  ipcRenderer.send('window-action', 'minimize')
}

// 监听主进程消息
ipcRenderer.on('app-update', (event, updateInfo) => {
  showUpdateNotification(updateInfo)
})

// 双向通信示例
const fetchData = async () => {
  try {
    const result = await ipcRenderer.invoke('fetch-data', {
      url: 'https://api.example.com/data'
    })
    return result
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 原生UI集成 -->
      <section class="api-section">
        <div class="section-header">
          <div class="section-icon">🎨</div>
          <h2>原生UI集成</h2>
          <div class="process-tag">主进程</div>
        </div>

        <div class="api-content">
          <div class="api-items-grid">
            <div class="api-item">
              <h3>Menu & ContextMenu</h3>
              <p>创建原生应用程序菜单和上下文菜单。</p>
              <pre><code>const { Menu, MenuItem } = require('electron')

// 应用菜单
const template = [
  {
    label: '文件',
    submenu: [
      {
        label: '新建',
        accelerator: 'CmdOrCtrl+N',
        click: () => { /* 处理新建 */ }
      },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// 上下文菜单
const contextMenu = new Menu()
contextMenu.append(new MenuItem({
  label: '复制',
  role: 'copy'
}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  contextMenu.popup()
})</code></pre>
            </div>

            <div class="api-item">
              <h3>Dialog</h3>
              <p>显示原生系统对话框。</p>
              <pre><code>const { dialog } = require('electron')

// 文件对话框
const result = await dialog.showOpenDialog({
  properties: ['openFile', 'multiSelections'],
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'All Files', extensions: ['*'] }
  ]
})

// 消息对话框
const response = await dialog.showMessageBox({
  type: 'question',
  buttons: ['是', '否'],
  title: '确认',
  message: '确定要删除这个文件吗？'
})</code></pre>
            </div>

            <div class="api-item">
              <h3>Tray</h3>
              <p>创建系统托盘图标和菜单。</p>
              <pre><code>const { Tray, Menu } = require('electron')
const path = require('path')

let tray = new Tray(path.join(__dirname, 'icon.png'))

const contextMenu = Menu.buildFromTemplate([
  { label: '显示', click: () => mainWindow.show() },
  { label: '退出', click: () => app.quit() }
])

tray.setToolTip('我的应用')
tray.setContextMenu(contextMenu)

// 点击托盘图标
tray.on('click', () => {
  mainWindow.isVisible() ?
    mainWindow.hide() : mainWindow.show()
})</code></pre>
            </div>

            <div class="api-item">
              <h3>Notification</h3>
              <p>显示原生系统通知。</p>
              <pre><code>const { Notification } = require('electron')

// 主进程通知
new Notification({
  title: '任务完成',
  body: '文件已成功下载',
  icon: path.join(__dirname, 'icon.png'),
  actions: [
    { type: 'button', text: '查看' }
  ]
}).show()

// 渲染进程通知（现代浏览器API）
new window.Notification('新消息', {
  body: '您收到一条新消息',
  icon: '/path/to/icon.png',
  badge: '/path/to/badge.png'
})</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 系统集成 -->
      <section class="api-section">
        <div class="section-header">
          <div class="section-icon">⚙️</div>
          <h2>系统集成</h2>
          <div class="process-tags">
            <span class="process-tag main">主进程</span>
            <span class="process-tag renderer">渲染进程</span>
          </div>
        </div>

        <div class="api-content">
          <div class="api-items-grid">
            <div class="api-item">
              <h3>Shell</h3>
              <p>使用默认应用程序管理文件和 URL。</p>
              <pre><code>const { shell } = require('electron')

// 打开外部链接
shell.openExternal('https://electronjs.org')

// 在文件管理器中显示文件
shell.showItemInFolder('/path/to/file')

// 移动文件到回收站
shell.trashItem('/path/to/file')

// 打开文件
shell.openPath('/path/to/document.pdf')</code></pre>
            </div>

            <div class="api-item">
              <h3>Clipboard</h3>
              <p>系统剪贴板操作。</p>
              <pre><code>const { clipboard } = require('electron')

// 写入剪贴板
clipboard.writeText('要复制的文本')
clipboard.writeHTML('&lt;b&gt;HTML内容&lt;/b&gt;')
clipboard.writeImage(nativeImage)

// 读取剪贴板
const text = clipboard.readText()
const html = clipboard.readHTML()
const image = clipboard.readImage()

// 剪贴板格式检查
const availableFormats = clipboard.availableFormats()</code></pre>
            </div>

            <div class="api-item">
              <h3>Screen</h3>
              <p>获取屏幕信息和多显示器支持。</p>
              <pre><code>const { screen } = require('electron')

// 获取所有显示器
const displays = screen.getAllDisplays()
const primaryDisplay = screen.getPrimaryDisplay()

// 显示器信息
console.log('显示器数量:', displays.length)
displays.forEach((display, index) => {
  console.log(`显示器 ${index}:`, {
    bounds: display.bounds,
    workArea: display.workArea,
    scaleFactor: display.scaleFactor,
    size: display.size
  })
})

// 监听显示器变化
screen.on('display-added', (event, newDisplay) => {
  console.log('新显示器添加:', newDisplay)
})</code></pre>
            </div>

            <div class="api-item">
              <h3>PowerMonitor</h3>
              <p>监控电源状态变化。</p>
              <pre><code>const { powerMonitor } = require('electron')

// 电源状态事件
powerMonitor.on('suspend', () => {
  console.log('系统即将挂起')
  // 保存状态，暂停任务等
})

powerMonitor.on('resume', () => {
  console.log('系统从挂起恢复')
  // 恢复任务等
})

powerMonitor.on('on-ac', () => {
  console.log('切换到交流电源')
})

powerMonitor.on('on-battery', () => {
  console.log('切换到电池电源')
})

// 获取系统空闲状态
const idleTime = powerMonitor.getSystemIdleTime()</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 文件系统 -->
      <section class="api-section">
        <div class="section-header">
          <div class="section-icon">📁</div>
          <h2>文件系统访问</h2>
          <div class="process-tags">
            <span class="process-tag main">主进程</span>
            <span class="process-tag renderer">渲染进程</span>
          </div>
        </div>

        <div class="api-content">
          <div class="api-item">
            <h3>文件操作</h3>
            <p>通过主进程安全地访问文件系统。</p>

            <div class="code-example">
              <h4>文件读写示例</h4>
              <div class="code-columns">
                <div class="code-column">
                  <h5>主进程 (main.js)</h5>
                  <pre><code>const fs = require('fs').promises
const path = require('path')

// 处理文件读取
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

// 处理文件保存
ipcMain.handle('save-file', async (event, { filePath, content }) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

// 文件操作
ipcMain.handle('file-operations', async (event, operation) => {
  const { type, source, destination } = operation

  switch (type) {
    case 'copy':
      await fs.copyFile(source, destination)
      break
    case 'move':
      await fs.rename(source, destination)
      break
    case 'delete':
      await fs.unlink(source)
      break
  }
})</code></pre>
                </div>
                <div class="code-column">
                  <h5>渲染进程 (renderer.js)</h5>
                  <pre><code>const { ipcRenderer } = require('electron')

// 读取文件
const readConfigFile = async () => {
  const result = await ipcRenderer.invoke('read-file', './config.json')
  if (result.success) {
    return JSON.parse(result.data)
  } else {
    throw new Error(result.error)
  }
}

// 保存文件
const saveData = async (data) => {
  const result = await ipcRenderer.invoke('save-file', {
    filePath: './data.json',
    content: JSON.stringify(data, null, 2)
  })

  if (!result.success) {
    alert('保存失败: ' + result.error)
  }
}

// 文件操作
const copyFile = async (source, dest) => {
  await ipcRenderer.invoke('file-operations', {
    type: 'copy',
    source,
    destination: dest
  })
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 硬件访问 -->
      <section class="api-section">
        <div class="section-header">
          <div class="section-icon">🔧</div>
          <h2>硬件访问</h2>
          <div class="process-tags">
            <span class="process-tag main">主进程</span>
            <span class="process-tag renderer">渲染进程</span>
          </div>
        </div>

        <div class="api-content">
          <div class="api-items-grid">
            <div class="api-item">
              <h3>GlobalShortcut</h3>
              <p>注册全局键盘快捷键。</p>
              <pre><code>const { globalShortcut } = require('electron')

// 注册全局快捷键
app.whenReady().then(() => {
  // 注册快捷键
  const ret = globalShortcut.register('CommandOrControl+Shift+I', () => {
    console.log('全局快捷键触发')
    // 执行自定义操作
  })

  if (!ret) {
    console.log('快捷键注册失败')
  }

  // 检查快捷键是否注册
  console.log(globalShortcut.isRegistered('CommandOrControl+Shift+I'))
})

// 应用退出时注销所有快捷键
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})</code></pre>
            </div>

            <div class="api-item">
              <h3>NativeImage</h3>
              <p>处理原生图像。</p>
              <pre><code>const { nativeImage } = require('electron')

// 从文件创建图像
const image = nativeImage.createFromPath('/path/to/image.png')

// 从Buffer创建图像
const imageFromBuffer = nativeImage.createFromBuffer(buffer)

// 从Data URL创建图像
const imageFromDataUrl = nativeImage.createFromDataURL('data:image/png;base64,...')

// 图像操作
const resized = image.resize({ width: 100, height: 100 })
const cropped = image.crop({ x: 0, y: 0, width: 50, height: 50 })

// 转换为不同格式
const pngBuffer = image.toPNG()
const jpegBuffer = image.toJPEG(85)

// 设置托盘图标
tray.setImage(image)</code></pre>
            </div>

            <div class="api-item">
              <h3>DesktopCapturer</h3>
              <p>捕获屏幕和窗口内容。</p>
              <pre><code>const { desktopCapturer } = require('electron')

// 在渲染进程中获取屏幕源
desktopCapturer.getSources({
  types: ['screen', 'window'],
  thumbnailSize: { width: 800, height: 600 }
}).then(sources => {
  sources.forEach(source => {
    console.log('源名称:', source.name)
    console.log('源ID:', source.id)
    console.log('缩略图:', source.thumbnail)

    // 创建视频元素显示屏幕共享
    if (source.name === 'Entire Screen') {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id
          }
        }
      }).then(stream => {
        videoElement.srcObject = stream
      })
    }
  })
})</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 安全最佳实践 -->
    <section class="best-practices">
      <div class="section-header">
        <h2>安全最佳实践</h2>
        <div class="section-tag">重要</div>
      </div>

      <div class="practices-grid">
        <div class="practice-item">
          <h3>上下文隔离</h3>
          <p>启用上下文隔离以防止预加载脚本中的潜在安全风险。</p>
          <pre><code>new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
})</code></pre>
        </div>

        <div class="practice-item">
          <h3>禁用Node.js集成</h3>
          <p>在不需要Node.js集成的窗口中禁用该功能。</p>
          <pre><code>new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    enableRemoteModule: false
  }
})</code></pre>
        </div>

        <div class="practice-item">
          <h3>内容安全策略</h3>
          <p>实施CSP来限制资源加载。</p>
          <pre><code>&lt;meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"&gt;</code></pre>
        </div>

        <div class="practice-item">
          <h3>会话权限</h3>
          <p>限制会话权限，只授予必要的权限。</p>
          <pre><code>session.defaultSession.setPermissionRequestHandler(
  (webContents, permission, callback) => {
    const allowedPermissions = ['notifications']
    callback(allowedPermissions.includes(permission))
  }
)</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.electron-apis-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #64748b;
    font-weight: 400;
  }
}

.intro-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.7;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.apis-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.api-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-bottom: 1px solid #e2e8f0;

  .section-icon {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
    flex: 1;
  }
}

.process-tags {
  display: flex;
  gap: 0.5rem;
}

.process-tag {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.main {
    background: #dbeafe;
    color: #1e40af;
    border: 1px solid #bfdbfe;
  }

  &.renderer {
    background: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
  }
}

.api-content {
  padding: 2rem;
}

.api-item {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.8rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
}

.api-items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .api-item {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    margin-bottom: 0;

    h3 {
      font-size: 1.2rem;
      border-bottom: 1px solid #e2e8f0;
    }
  }
}

.code-example {
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;

  h4 {
    background: #e2e8f0;
    padding: 1rem 1.5rem;
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #475569;
    border-bottom: 1px solid #cbd5e1;
  }
}

.code-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  .code-column {
    h5 {
      background: #e2e8f0;
      padding: 0.8rem 1rem;
      margin: 0;
      font-size: 0.9rem;
      font-weight: 600;
      color: #475569;
      border-bottom: 1px solid #cbd5e1;
    }
  }
}

pre {
  margin: 0;
  padding: 1.5rem;
  background: #1e293b;
  overflow-x: auto;

  code {
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.85rem;
    color: #e2e8f0;
    line-height: 1.5;
  }
}

.feature-list {
  background: #f0f9ff;
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #0ea5e9;

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #0369a1;
    margin-bottom: 1rem;
  }

  ul {
    color: #475569;
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
}

.best-practices {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  .section-header {
    background: none;
    padding: 0 0 1.5rem;
    border-bottom: 2px solid #e2e8f0;

    h2 {
      font-size: 2rem;
      color: #1e293b;
    }

    .section-tag {
      background: #fef3c7;
      color: #92400e;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      border: 1px solid #fcd34d;
    }
  }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.practice-item {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.8rem;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  pre {
    border-radius: 8px;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .electron-apis-container {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2.2rem;
  }

  .api-content {
    padding: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;

    h2 {
      font-size: 1.5rem;
    }
  }

  .api-items-grid {
    grid-template-columns: 1fr;
  }

  .code-columns {
    grid-template-columns: 1fr;
  }

  .practices-grid {
    grid-template-columns: 1fr;
  }
}
</style>
