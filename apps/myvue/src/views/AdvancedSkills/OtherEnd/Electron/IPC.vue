<template>
  <div class="electron-ipc-container">
    <header class="header">
      <div class="logo-container">
        <div class="electron-logo"></div>
        <h1>Electron IPC 进程间通信</h1>
      </div>
      <p class="subtitle">连接主进程与渲染进程的桥梁</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">📡</span> IPC 基础概念</h2>
            <div class="section-badge">核心机制</div>
          </div>

          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">💻</div>
              <h3>主进程 (Main Process)</h3>
              <p>拥有完整的 Node.js 环境，负责创建窗口、管理应用生命周期和访问系统资源。</p>
            </div>

            <div class="concept-card">
              <div class="concept-icon">🌐</div>
              <h3>渲染进程 (Renderer Process)</h3>
              <p>运行在 Chromium 中，负责呈现 Web 内容，每个窗口一个独立进程。</p>
            </div>

            <div class="concept-card">
              <div class="concept-icon">🔌</div>
              <h3>IPC 通信 (Inter-Process Communication)</h3>
              <p>允许主进程和渲染进程之间安全地传递消息和数据。</p>
            </div>
          </div>

          <div class="ipc-flow-diagram">
            <div class="process main-process">
              <div class="process-header">主进程</div>
              <div class="ipc-method">
                <div class="method-name">ipcMain.on()</div>
                <div class="method-desc">监听渲染进程消息</div>
              </div>
              <div class="ipc-method">
                <div class="method-name">ipcMain.handle()</div>
                <div class="method-desc">处理渲染进程请求</div>
              </div>
              <div class="ipc-method">
                <div class="method-name">webContents.send()</div>
                <div class="method-desc">向渲染进程发送消息</div>
              </div>
            </div>

            <div class="communication">
              <div class="arrow right">⇨</div>
              <div class="arrow left">⇦</div>
              <div class="ipc-protocol">IPC 通道</div>
            </div>

            <div class="process renderer-process">
              <div class="process-header">渲染进程</div>
              <div class="ipc-method">
                <div class="method-name">ipcRenderer.send()</div>
                <div class="method-desc">向主进程发送消息</div>
              </div>
              <div class="ipc-method">
                <div class="method-name">ipcRenderer.invoke()</div>
                <div class="method-desc">调用主进程方法</div>
              </div>
              <div class="ipc-method">
                <div class="method-name">ipcRenderer.on()</div>
                <div class="method-desc">监听主进程消息</div>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">🚀</span> IPC 使用场景</h2>
            <div class="section-badge">实际应用</div>
          </div>

          <div class="scenario-cards">
            <div class="scenario-card">
              <div class="scenario-icon">📁</div>
              <h3>文件系统操作</h3>
              <p>渲染进程请求主进程读写文件</p>
              <div class="code-snippet">
                <pre>ipcRenderer.invoke('read-file', path)</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">⚙️</div>
              <h3>系统功能调用</h3>
              <p>访问原生对话框、菜单、托盘等</p>
              <div class="code-snippet">
                <pre>ipcRenderer.send('show-dialog')</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🔔</div>
              <h3>应用状态同步</h3>
              <p>窗口状态、应用设置同步更新</p>
              <div class="code-snippet">
                <pre>ipcRenderer.on('window-maximized', ...)</pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon">🔐</div>
              <h3>安全敏感操作</h3>
              <p>执行需要特权的操作（如加密）</p>
              <div class="code-snippet">
                <pre>ipcRenderer.invoke('encrypt-data', data)</pre>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">💻</span> IPC 示例代码</h2>
            <div class="section-badge">实战演示</div>
          </div>

          <div class="ipc-demo">
            <div class="demo-tabs">
              <div v-for="(tab, index) in tabs" :key="index" :class="['demo-tab', { active: activeTab === index }]"
                @click="activeTab = index">
                {{ tab.title }}
              </div>
            </div>

            <div class="demo-content">
              <div v-if="activeTab === 0" class="code-example">
                <div class="code-header">渲染进程 (Renderer Process)</div>
                <pre class="code-block">// 向主进程发送消息（单向）
ipcRenderer.send('perform-action', {
  type: 'save-data',
  data: payload
});

// 调用主进程方法并等待结果（双向）
const result = await ipcRenderer.invoke('read-file', '/path/to/file');

// 监听来自主进程的消息
ipcRenderer.on('app-status', (event, status) => {
  console.log('App status:', status);
});</pre>

                <div class="code-header">主进程 (Main Process)</div>
                <pre class="code-block">// 监听渲染进程消息
ipcMain.on('perform-action', (event, args) => {
  if (args.type === 'save-data') {
    saveDataToFile(args.data);
  }
});

// 处理渲染进程的调用请求
ipcMain.handle('read-file', async (event, filePath) => {
  return fs.promises.readFile(filePath, 'utf-8');
});

// 向所有渲染进程广播消息
mainWindow.webContents.send('app-status', 'ready');</pre>
              </div>

              <div v-if="activeTab === 1" class="code-example">
                <div class="code-header">预加载脚本 (Preload Script)</div>
                <pre class="code-block">// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// 安全地暴露 IPC 方法给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveData: (data) => ipcRenderer.send('data:save', data),
  onUpdate: (callback) => {
    ipcRenderer.on('data:update', (event, data) => callback(data));
  }
});</pre>

                <div class="code-header">渲染进程 (Renderer Process)</div>
                <pre class="code-block">// 使用暴露的 API
const openFile = async () => {
  const filePath = await window.electronAPI.openFile();
  console.log('Selected file:', filePath);
};

const saveData = () => {
  window.electronAPI.saveData({ key: 'value' });
};

// 监听更新
window.electronAPI.onUpdate((data) => {
  console.log('Data updated:', data);
});</pre>
              </div>

              <div v-if="activeTab === 2" class="code-example">
                <div class="code-header">渲染进程 (Renderer Process)</div>
                <pre class="code-block">// 发送消息到主进程
ipcRenderer.send('message:send', {
  text: 'Hello from renderer!',
  timestamp: Date.now()
});

// 监听主进程回复
ipcRenderer.once('message:reply', (event, reply) => {
  console.log('Main process reply:', reply);
});</pre>

                <div class="code-header">主进程 (Main Process)</div>
                <pre class="code-block">// 监听消息并回复
ipcMain.on('message:send', (event, message) => {
  console.log('Renderer says:', message.text);

  // 回复消息
  event.sender.send('message:reply', {
    status: 'received',
    original: message
  });
});</pre>
              </div>
            </div>
          </div>
        </section>

        <section class="content-section">
          <div class="section-header">
            <h2><span class="icon">🛡️</span> IPC 安全最佳实践</h2>
            <div class="section-badge">安全指南</div>
          </div>

          <div class="security-grid">
            <div class="security-card">
              <div class="security-icon">🔒</div>
              <h3>启用上下文隔离</h3>
              <p>隔离预加载脚本和渲染进程</p>
              <pre class="inline-code">contextIsolation: true</pre>
            </div>

            <div class="security-card">
              <div class="security-icon">⚠️</div>
              <h3>禁用 Node.js 集成</h3>
              <p>在渲染进程中禁用 Node.js</p>
              <pre class="inline-code">nodeIntegration: false</pre>
            </div>

            <div class="security-card">
              <div class="security-icon">🛡️</div>
              <h3>使用预加载脚本</h3>
              <p>安全暴露有限 API 给渲染进程</p>
              <pre class="inline-code">contextBridge.exposeInMainWorld</pre>
            </div>

            <div class="security-card">
              <div class="security-icon">🔍</div>
              <h3>验证 IPC 消息</h3>
              <p>始终验证发送和接收的数据</p>
              <pre class="inline-code">if (typeof data !== 'string') return</pre>
            </div>
          </div>

          <div class="security-tips">
            <h3>安全注意事项：</h3>
            <ul>
              <li>永远不要暴露整个 ipcRenderer 给渲染进程</li>
              <li>限制暴露给渲染进程的 API 数量</li>
              <li>对 IPC 消息进行严格的输入验证</li>
              <li>使用 invoke() 而不是 send() 进行敏感操作</li>
              <li>定期更新 Electron 版本</li>
            </ul>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>Electron 26.0.0 | Vue 3 | TypeScript | IPC 进程通信指南</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { title: '基础通信' },
  { title: '预加载脚本' },
  { title: '消息模式' }
];
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

.electron-ipc-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  background: linear-gradient(135deg, #9FEAF9, #2c6e7f);
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
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-section {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2rem;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;

    h2 {
      font-size: 1.5rem;
      color: var(--primary-color);
      display: flex;
      align-items: center;

      .icon {
        margin-right: 0.75rem;
      }
    }

    .section-badge {
      background: var(--primary-light);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .concept-card {
    background: var(--primary-light);
    border-radius: var(--radius);
    padding: 1.5rem;
    border: 1px solid rgba(71, 132, 143, 0.2);
    text-align: center;

    .concept-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      margin-top: 0;
      color: var(--primary-color);
    }

    p {
      color: var(--text-secondary);
    }
  }
}

.ipc-flow-diagram {
  display: flex;
  background: var(--code-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1.5rem 0;

  .process {
    flex: 1;
    padding: 1rem;
    text-align: center;

    &.main-process {
      background: rgba(71, 132, 143, 0.1);
      border-radius: var(--radius) 0 0 var(--radius);
    }

    &.renderer-process {
      background: rgba(108, 117, 125, 0.1);
      border-radius: 0 var(--radius) var(--radius) 0;
    }

    .process-header {
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--primary-color);
    }

    .ipc-method {
      background: white;
      padding: 0.75rem;
      margin-bottom: 0.75rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      .method-name {
        font-weight: 500;
        font-family: monospace;
        font-size: 0.9rem;
      }

      .method-desc {
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-top: 0.25rem;
      }
    }
  }

  .communication {
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .arrow {
      font-size: 1.5rem;
      margin: 0.5rem 0;
      color: var(--primary-color);
    }

    .ipc-protocol {
      font-weight: 500;
      color: var(--primary-color);
      background: rgba(71, 132, 143, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      margin-top: 0.5rem;
    }
  }
}

.scenario-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .scenario-card {
    background: white;
    border-radius: var(--radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border: 1px solid var(--border-color);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
    }

    .scenario-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    h3 {
      margin-top: 0;
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
      margin: 0.5rem 0 1rem;
      font-size: 0.95rem;
    }

    .code-snippet {
      background: var(--code-bg);
      border-radius: 4px;
      padding: 0.75rem;
      font-family: monospace;
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.ipc-demo {
  background: var(--code-bg);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 1.5rem 0;

  .demo-tabs {
    display: flex;
    background: var(--primary-light);
    border-bottom: 1px solid var(--border-color);

    .demo-tab {
      padding: 0.85rem 1.5rem;
      cursor: pointer;
      font-weight: 500;
      color: var(--text-secondary);
      transition: var(--transition);
      border-bottom: 3px solid transparent;

      &:hover {
        color: var(--primary-color);
        background: rgba(255, 255, 255, 0.4);
      }

      &.active {
        color: var(--primary-color);
        border-bottom: 3px solid var(--primary-color);
        background: white;
      }
    }
  }

  .demo-content {
    padding: 1.5rem;

    .code-example {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .code-header {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--primary-color);
      font-size: 1.1rem;
      display: flex;
      align-items: center;

      &::before {
        content: '▹';
        margin-right: 0.5rem;
        color: var(--primary-color);
      }
    }

    .code-block {
      background: #2c3e50;
      color: #ecf0f1;
      padding: 1.5rem;
      border-radius: var(--radius);
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre;
      tab-size: 2;
    }
  }
}

.security-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;

  .security-card {
    background: white;
    border-radius: var(--radius);
    padding: 1.5rem;
    border-left: 4px solid var(--primary-color);
    box-shadow: var(--shadow);

    .security-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--primary-color);
    }

    h3 {
      margin-top: 0;
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
      margin: 0.5rem 0 1rem;
      font-size: 0.95rem;
    }

    .inline-code {
      background: var(--code-bg);
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      font-family: monospace;
      font-size: 0.9rem;
      display: inline-block;
    }
  }
}

.security-tips {
  background: var(--primary-light);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-top: 1.5rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.75rem;
      position: relative;
      padding-left: 1.5rem;

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--primary-color);
        font-weight: bold;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 1.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  background: var(--card-bg);
  margin-top: 2rem;
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

  .ipc-flow-diagram {
    flex-direction: column;

    .process {
      &.main-process {
        border-radius: var(--radius) var(--radius) 0 0;
      }

      &.renderer-process {
        border-radius: 0 0 var(--radius) var(--radius);
      }
    }

    .communication {
      width: 100%;
      flex-direction: row;
      padding: 1rem 0;

      .arrow {
        transform: rotate(90deg);
        margin: 0 1rem;
      }
    }
  }

  .demo-tabs {
    overflow-x: auto;

    .demo-tab {
      flex-shrink: 0;
    }
  }
}
</style>
