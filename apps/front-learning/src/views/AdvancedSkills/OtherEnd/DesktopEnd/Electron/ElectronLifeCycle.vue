<template>
  <div class="electron-lifecycle-container">
    <header>
      <div class="header-content">
        <h1><i class="fas fa-atom"></i> Electron 应用生命周期介绍</h1>
        <p class="subtitle">掌握桌面应用从启动到退出的完整生命周期管理</p>
      </div>
    </header>

    <div class="lifecycle-overview">
      <div class="lifecycle-diagram">
        <div
          class="app-state"
          v-for="(state, index) in lifecycleStates"
          :key="index"
          :class="state.class"
        >
          <div class="state-icon">
            <i :class="state.icon"></i>
          </div>
          <div class="state-info">
            <h3>{{ state.title }}</h3>
            <p>{{ state.description }}</p>
          </div>
          <div class="state-arrow" v-if="index < lifecycleStates.length - 1">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- 主进程生命周期 -->
      <section class="card main-process">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-microchip"></i>
          </div>
          <div>
            <h2>主进程生命周期</h2>
            <div class="tag">核心控制</div>
          </div>
        </div>

        <div class="card-body">
          <div class="lifecycle-events">
            <div class="event" v-for="(event, index) in mainProcessEvents" :key="index">
              <div class="event-header">
                <div class="event-name">{{ event.name }}</div>
                <div class="event-tag" :class="event.tagClass">{{ event.tag }}</div>
              </div>
              <div class="event-description">
                {{ event.description }}
              </div>
              <div class="event-code">
                <pre><code>{{ event.code }}</code></pre>
              </div>
              <div class="event-scenario"><strong>适用场景：</strong> {{ event.scenario }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 渲染进程生命周期 -->
      <section class="card renderer-process">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-window-maximize"></i>
          </div>
          <div>
            <h2>渲染进程生命周期</h2>
            <div class="tag">窗口管理</div>
          </div>
        </div>

        <div class="card-body">
          <div class="lifecycle-events">
            <div class="event" v-for="(event, index) in rendererProcessEvents" :key="index">
              <div class="event-header">
                <div class="event-name">{{ event.name }}</div>
                <div class="event-tag" :class="event.tagClass">{{ event.tag }}</div>
              </div>
              <div class="event-description">
                {{ event.description }}
              </div>
              <div class="event-code">
                <pre><code>{{ event.code }}</code></pre>
              </div>
              <div class="event-scenario"><strong>适用场景：</strong> {{ event.scenario }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 生命周期实践 -->
      <section class="card best-practices">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-clipboard-check"></i>
          </div>
          <div>
            <h2>生命周期最佳实践</h2>
            <div class="tag">专业建议</div>
          </div>
        </div>

        <div class="card-body">
          <div class="practices">
            <div class="practice" v-for="(practice, index) in bestPractices" :key="index">
              <div class="practice-icon">
                <i :class="practice.icon"></i>
              </div>
              <div class="practice-content">
                <h3>{{ practice.title }}</h3>
                <p>{{ practice.description }}</p>
                <div class="code-example" v-if="practice.code">
                  <pre><code>{{ practice.code }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 应用场景 -->
      <section class="card use-cases">
        <div class="card-header">
          <div class="icon">
            <i class="fas fa-lightbulb"></i>
          </div>
          <div>
            <h2>生命周期应用场景</h2>
            <div class="tag">实战示例</div>
          </div>
        </div>

        <div class="card-body">
          <div class="scenarios">
            <div class="scenario" v-for="(scenario, index) in useCases" :key="index">
              <div class="scenario-header">
                <div class="scenario-number">{{ index + 1 }}</div>
                <h3>{{ scenario.title }}</h3>
              </div>
              <div class="scenario-description">
                <p>{{ scenario.description }}</p>
              </div>
              <div class="scenario-solution">
                <strong>解决方案：</strong> {{ scenario.solution }}
              </div>
              <div class="scenario-code">
                <pre><code>{{ scenario.code }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>Electron 应用开发指南 &copy; {{ new Date().getFullYear() }} - 生命周期管理最佳实践</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 生命周期状态
const lifecycleStates = ref([
  {
    title: '应用启动',
    description: 'Electron主进程初始化',
    icon: 'fas fa-power-off',
    class: 'startup',
  },
  {
    title: '准备就绪',
    description: '主进程初始化完成，创建浏览器窗口',
    icon: 'fas fa-check-circle',
    class: 'ready',
  },
  {
    title: '窗口创建',
    description: '渲染进程加载页面内容',
    icon: 'fas fa-window-restore',
    class: 'window-creation',
  },
  {
    title: '运行状态',
    description: '应用正常运行，处理用户交互',
    icon: 'fas fa-play-circle',
    class: 'running',
  },
  {
    title: '窗口事件',
    description: '处理最小化、最大化、关闭等窗口事件',
    icon: 'fas fa-window-minimize',
    class: 'window-events',
  },
  {
    title: '应用关闭',
    description: '用户请求退出应用，执行清理操作',
    icon: 'fas fa-window-close',
    class: 'shutdown',
  },
  {
    title: '退出完成',
    description: '所有进程终止，应用完全退出',
    icon: 'fas fa-stop-circle',
    class: 'terminated',
  },
])

// 主进程生命周期事件
const mainProcessEvents = ref([
  {
    name: 'ready',
    tag: '初始化',
    tagClass: 'init',
    description: '当Electron完成初始化时触发，此时可以创建浏览器窗口',
    code: `app.on('ready', () => {
  createWindow();
});`,
    scenario: '创建主窗口、初始化应用状态、设置全局快捷键',
  },
  {
    name: 'window-all-closed',
    tag: '窗口事件',
    tagClass: 'window',
    description: '当所有窗口都已关闭时触发，在非macOS系统上通常退出应用',
    code: `app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});`,
    scenario: '处理多窗口应用关闭逻辑，决定是否退出应用',
  },
  {
    name: 'before-quit',
    tag: '退出前',
    tagClass: 'quit',
    description: '在应用开始关闭窗口之前触发，可以阻止退出操作',
    code: `app.on('before-quit', (event) => {
  if (unsavedChanges) {
    event.preventDefault();
    showSaveDialog();
  }
});`,
    scenario: '检查未保存更改、阻止应用退出、执行清理前操作',
  },
  {
    name: 'will-quit',
    tag: '即将退出',
    tagClass: 'quit',
    description: '当所有窗口都已关闭且应用即将退出时触发',
    code: `app.on('will-quit', () => {
  // 释放资源
  globalShortcut.unregisterAll();
  // 保存应用状态
  saveAppState();
});`,
    scenario: '释放资源、保存应用状态、清理临时文件',
  },
  {
    name: 'quit',
    tag: '退出',
    tagClass: 'quit',
    description: '当应用退出时触发，此时所有窗口都已关闭',
    code: `app.on('quit', () => {
  console.log('应用已退出');
});`,
    scenario: '记录退出日志、执行最终清理操作',
  },
])

// 渲染进程生命周期事件
const rendererProcessEvents = ref([
  {
    name: 'dom-ready',
    tag: '页面加载',
    tagClass: 'load',
    description: '当窗口中的网页完成加载时触发',
    code: `win.webContents.on('dom-ready', () => {
  // 页面加载完成，可以执行DOM操作
});`,
    scenario: '操作DOM、注入脚本、初始化UI组件',
  },
  {
    name: 'did-finish-load',
    tag: '加载完成',
    tagClass: 'load',
    description: '当网页完成加载（包括所有资源）时触发',
    code: `win.webContents.on('did-finish-load', () => {
  // 所有资源加载完成
});`,
    scenario: '显示主界面、执行初始化逻辑、加载用户数据',
  },
  {
    name: 'close',
    tag: '窗口关闭',
    tagClass: 'window',
    description: '当窗口将要关闭时触发，可以取消关闭操作',
    code: `win.on('close', (event) => {
  if (unsavedChanges) {
    event.preventDefault();
    showSaveDialog();
  }
});`,
    scenario: '检查未保存更改、阻止窗口关闭、保存数据',
  },
  {
    name: 'closed',
    tag: '窗口关闭后',
    tagClass: 'window',
    description: '当窗口已关闭且资源释放后触发',
    code: `win.on('closed', () => {
  win = null; // 删除窗口引用
});`,
    scenario: '清理窗口引用、释放资源、更新应用状态',
  },
  {
    name: 'blur/focus',
    tag: '窗口焦点',
    tagClass: 'focus',
    description: '当窗口失去或获得焦点时触发',
    code: `win.on('blur', () => {
  // 窗口失去焦点
});
win.on('focus', () => {
  // 窗口获得焦点
});`,
    scenario: '暂停/恢复动画、节省资源、更新UI状态',
  },
])

// 最佳实践
const bestPractices = ref([
  {
    icon: 'fas fa-save',
    title: '处理未保存数据',
    description: '在窗口关闭前检查未保存的更改，提示用户保存',
    code: `win.on('close', (e) => {
  if (documentEdited) {
    e.preventDefault();
    showSaveDialog().then((result) => {
      if (result === 'save') saveDocument();
      if (result !== 'cancel') win.close();
    });
  }
});`,
  },
  {
    icon: 'fas fa-tachometer-alt',
    title: '优化启动性能',
    description: '使用 ready-to-show 事件延迟显示窗口直到内容完全加载',
    code: `const win = new BrowserWindow({ show: false });
win.once('ready-to-show', () => {
  win.show();
});`,
  },
  {
    icon: 'fas fa-memory',
    title: '管理窗口引用',
    description: '在窗口关闭时删除引用，避免内存泄漏',
    code: `let win = null;

function createWindow() {
  win = new BrowserWindow({ /* ... */ });

  win.on('closed', () => {
    win = null; // 清除引用
  });
}`,
  },
  {
    icon: 'fas fa-cogs',
    title: '应用状态持久化',
    description: '在应用退出前保存窗口大小和位置，下次启动时恢复',
    code: `// 保存窗口状态
win.on('close', () => {
  const bounds = win.getBounds();
  store.set('windowBounds', bounds);
});

// 恢复窗口状态
const bounds = store.get('windowBounds') || { width: 800, height: 600 };
const win = new BrowserWindow(bounds);`,
  },
])

// 应用场景
const useCases = ref([
  {
    title: '多窗口应用管理',
    description: '在包含多个窗口的应用中，当所有窗口关闭时退出应用',
    solution: '使用 window-all-closed 事件和窗口引用计数',
    code: `let windowCount = 0;

function createWindow() {
  const win = new BrowserWindow();
  windowCount++;

  win.on('closed', () => {
    windowCount--;
    if (windowCount === 0) app.quit();
  });
}

app.on('window-all-closed', () => {
  // 在MacOS上通常不退出
  if (process.platform !== 'darwin') {
    app.quit();
  }
});`,
  },
  {
    title: '后台任务处理',
    description: '在应用最小化或隐藏时暂停资源密集型任务',
    solution: '监听窗口的 blur 和 focus 事件控制任务执行',
    code: `let backgroundTaskInterval = null;

win.on('focus', () => {
  // 恢复后台任务
  backgroundTaskInterval = setInterval(doBackgroundTask, 5000);
});

win.on('blur', () => {
  // 暂停后台任务以节省资源
  clearInterval(backgroundTaskInterval);
});`,
  },
  {
    title: '优雅处理应用退出',
    description: '在应用退出前执行必要的清理操作',
    solution: '使用 before-quit 和 will-quit 事件进行资源释放',
    code: `app.on('before-quit', async (event) => {
  if (unsavedChanges) {
    event.preventDefault();
    const result = await showSaveDialog();
    if (result === 'save') await saveData();
    if (result !== 'cancel') app.quit();
  }
});

app.on('will-quit', () => {
  // 释放资源
  globalShortcut.unregisterAll();
  database.close();
  // 保存应用状态
  saveAppConfig();
});`,
  },
  {
    title: '单实例应用',
    description: '确保应用只有一个实例运行',
    solution: '使用 app.requestSingleInstanceLock() 方法',
    code: `const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // 当第二个实例启动时，聚焦到现有窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // 创建窗口等初始化代码
}`,
  },
])
</script>

<style lang="less" scoped>
.electron-lifecycle-container {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #343a40;
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
}

header {
  background: linear-gradient(135deg, #4a69bd 0%, #6a89cc 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  .header-content {
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-weight: 600;

    i {
      font-size: 2.2rem;
      color: #78e08f;
      animation: pulse 2s infinite;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 800px;
    margin: 0 auto;
    font-weight: 300;
    color: #e0e7ff;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.lifecycle-overview {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.lifecycle-diagram {
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  padding: 20px 0;

  .app-state {
    display: flex;
    align-items: center;
    min-width: 200px;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin: 0 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .state-icon {
      width: 50px;
      height: 50px;
      background: #4a69bd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;

      i {
        font-size: 1.5rem;
        color: white;
      }
    }

    .state-info {
      flex: 1;

      h3 {
        font-size: 1.1rem;
        margin-bottom: 5px;
        color: #2d3748;
      }

      p {
        font-size: 0.9rem;
        color: #6c757d;
      }
    }

    .state-arrow {
      margin-left: 15px;
      color: #4a69bd;
      font-size: 1.5rem;
    }
  }
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &.main-process {
    border-top: 4px solid #4a69bd;
  }
  &.renderer-process {
    border-top: 4px solid #78e08f;
  }
  &.best-practices {
    border-top: 4px solid #f6b93b;
  }
  &.use-cases {
    border-top: 4px solid #e55039;
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;

  .icon {
    width: 50px;
    height: 50px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    i {
      font-size: 1.5rem;
      color: #4a69bd;
    }
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 5px;
    color: #2d3748;
  }

  .tag {
    display: inline-block;
    background: #e9ecef;
    color: #495057;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
}

.card-body {
  padding: 20px;
}

.lifecycle-events {
  .event {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    border-left: 4px solid #4a69bd;

    &:last-child {
      margin-bottom: 0;
    }

    .event-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .event-name {
        font-size: 1.2rem;
        font-weight: 500;
        color: #2d3748;
      }

      .event-tag {
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;

        &.init {
          background: #dff9fb;
          color: #0652dd;
        }
        &.window {
          background: #d6a2e8;
          color: #6f1e51;
        }
        &.quit {
          background: #ffcccc;
          color: #ea2027;
        }
        &.load {
          background: #c4e538;
          color: #006266;
        }
        &.focus {
          background: #7ed6df;
          color: #1289a7;
        }
      }
    }

    .event-description {
      margin-bottom: 15px;
      color: #495057;
      line-height: 1.6;
    }

    .event-code {
      background: #2d3748;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 6px;
      font-family: 'Source Code Pro', monospace;
      font-size: 14px;
      line-height: 1.5;
      overflow-x: auto;
      margin-bottom: 15px;

      pre {
        margin: 0;
      }

      code {
        font-family: 'Source Code Pro', monospace;
      }
    }

    .event-scenario {
      font-size: 0.9rem;
      color: #6c757d;
      padding: 8px 12px;
      background: #edf2f7;
      border-radius: 6px;
    }
  }
}

.practices {
  .practice {
    display: flex;
    gap: 15px;
    padding: 15px;
    margin-bottom: 20px;
    background: #f8f9fa;
    border-radius: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    .practice-icon {
      width: 50px;
      height: 50px;
      background: #4a69bd;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      i {
        font-size: 1.5rem;
        color: white;
      }
    }

    .practice-content {
      flex: 1;

      h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: #2d3748;
      }

      p {
        margin-bottom: 10px;
        color: #495057;
      }

      .code-example {
        background: #2d3748;
        color: #e2e8f0;
        padding: 15px;
        border-radius: 6px;
        font-family: 'Source Code Pro', monospace;
        font-size: 14px;
        overflow-x: auto;

        pre {
          margin: 0;
        }

        code {
          font-family: 'Source Code Pro', monospace;
        }
      }
    }
  }
}

.scenarios {
  .scenario {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .scenario-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .scenario-number {
        width: 30px;
        height: 30px;
        background: #4a69bd;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 15px;
      }

      h3 {
        font-size: 1.2rem;
        color: #2d3748;
      }
    }

    .scenario-description {
      margin-bottom: 10px;
      color: #495057;
    }

    .scenario-solution {
      margin-bottom: 15px;
      padding: 10px;
      background: #e3f2fd;
      border-radius: 6px;
      color: #1976d2;
    }

    .scenario-code {
      background: #2d3748;
      color: #e2e8f0;
      padding: 15px;
      border-radius: 6px;
      font-family: 'Source Code Pro', monospace;
      font-size: 14px;
      overflow-x: auto;

      pre {
        margin: 0;
      }

      code {
        font-family: 'Source Code Pro', monospace;
      }
    }
  }
}

footer {
  text-align: center;
  padding: 25px;
  background: white;
  color: #495057;
  font-size: 0.9rem;
  border-radius: 12px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

@media (max-width: 768px) {
  .lifecycle-diagram {
    flex-direction: column;

    .app-state {
      margin: 10px 0;
      width: 100%;

      .state-arrow {
        transform: rotate(90deg);
      }
    }
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  header h1 {
    font-size: 1.5rem;

    i {
      font-size: 1.8rem;
    }
  }

  .subtitle {
    font-size: 1rem;
  }

  .card-header {
    flex-direction: column;
    text-align: center;

    .icon {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
}
</style>
