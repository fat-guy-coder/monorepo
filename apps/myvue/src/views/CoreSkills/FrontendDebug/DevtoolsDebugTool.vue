<template>
  <div class="devtools-container">
    <!-- 头部区域 -->
    <div class="header-section">
      <div class="logo-container">
        <div class="devtools-logo">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17h18v2H3zm0-7h18v2H3zm0-7h18v2H3z" fill="#4285F4" />
            <path d="M11 15h2v2h-2zm0-7h2v2h-2zm0-7h2v2h-2z" fill="#EA4335" />
            <path d="M7 15h2v2H7zm0-7h2v2H7zm0-7h2v2H7z" fill="#34A853" />
            <path d="M15 15h2v2h-2zm0-7h2v2h-2zm0-7h2v2h-2z" fill="#FBBC05" />
          </svg>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">浏览器开发者工具 DevTools 基础介绍</h1>
        <p class="subtitle">前端开发者必备的调试利器</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 快速导航 -->
      <div class="quick-nav">
        <div v-for="(panel, index) in panels" :key="index" @click="scrollToPanel(panel.id)" class="nav-item">
          <div class="nav-icon">{{ panel.icon }}</div>
          <div class="nav-text">{{ panel.title }}</div>
        </div>
      </div>

      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🔍</div>
          <h2>DevTools 简介</h2>
        </div>

        <div class="intro-content">
          <p>
            <strong>浏览器开发者工具（DevTools）</strong>是前端开发者日常工作中不可或缺的调试工具集。它提供了丰富的功能来检查、调试和优化网页应用。主流浏览器（Chrome、Firefox、Edge、Safari）都内置了开发者工具，快捷键通常是
            <kbd>F12</kbd> 或 <kbd>Ctrl+Shift+I</kbd>。
          </p>

          <div class="key-features">
            <h3 class="section-subtitle">核心功能价值</h3>
            <ul>
              <li><strong>实时检查和修改</strong>：查看和编辑 HTML、CSS</li>
              <li><strong>JavaScript 调试</strong>：断点、调用栈、作用域检查</li>
              <li><strong>网络分析</strong>：监控资源加载和请求详情</li>
              <li><strong>性能分析</strong>：定位性能瓶颈和优化点</li>
              <li><strong>移动适配</strong>：模拟不同设备和网络环境</li>
              <li><strong>安全审计</strong>：检测 HTTPS 问题和安全漏洞</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 面板介绍 -->
      <section v-for="(panel, index) in panels" :key="index" :id="panel.id" class="panel-section">
        <div class="section-header">
          <div class="icon">{{ panel.icon }}</div>
          <h2>{{ panel.title }}</h2>
        </div>

        <div class="panel-content">
          <div class="panel-card">
            <div class="card-header">
              <div class="card-title">功能作用</div>
            </div>
            <div class="card-body">
              <p>{{ panel.description }}</p>
              <ul v-if="panel.keyFeatures">
                <li v-for="(feature, i) in panel.keyFeatures" :key="i">{{ feature }}</li>
              </ul>
            </div>
          </div>

          <div class="panel-card">
            <div class="card-header">
              <div class="card-title">调试方法基础介绍</div>
            </div>
            <div class="card-body">
              <ol v-if="panel.debugSteps">
                <li v-for="(step, i) in panel.debugSteps" :key="i">{{ step }}</li>
              </ol>
              <div v-if="panel.codeExample" class="code-example">
                <pre>{{ panel.codeExample }}</pre>
              </div>
            </div>
          </div>

          <div class="panel-card">
            <div class="card-header">
              <div class="card-title">典型使用场景</div>
            </div>
            <div class="card-body">
              <ul class="use-cases">
                <li v-for="(scenario, i) in panel.useCases" :key="i">
                  <div class="scenario-icon">🔹</div>
                  <div class="scenario-text">{{ scenario }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 进阶技巧 -->
      <section class="advanced-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>DevTools 进阶技巧</h2>
        </div>

        <div class="advanced-grid">
          <div class="advanced-card">
            <div class="adv-icon">⚡</div>
            <h3>全局搜索</h3>
            <p>使用 <kbd>Ctrl+Shift+F</kbd> 在所有文件中搜索内容</p>
          </div>

          <div class="advanced-card">
            <div class="adv-icon">📝</div>
            <h3>控制台实用方法</h3>
            <pre class="code-block">console.table(data) // 表格展示数据
copy(variable) // 复制变量到剪贴板</pre>
          </div>

          <div class="advanced-card">
            <div class="adv-icon">🔄</div>
            <h3>重写请求响应</h3>
            <p>在 Network 面板中右键请求，选择 Override content 进行修改</p>
          </div>

          <div class="advanced-card">
            <div class="adv-icon">📱</div>
            <h3>模拟传感器</h3>
            <p>在 Sensors 面板模拟设备地理位置、加速计和陀螺仪</p>
          </div>

          <div class="advanced-card">
            <div class="adv-icon">📊</div>
            <h3>性能监控</h3>
            <p>使用 Performance Monitor 实时监控 CPU、JS 堆等指标</p>
          </div>

          <div class="advanced-card">
            <div class="adv-icon">🔒</div>
            <h3>调试生产代码</h3>
            <pre class="code-block">//# sourceURL=app.js
// 添加sourceURL映射压缩代码</pre>
          </div>
        </div>
      </section>

      <!-- 快捷键汇总 -->
      <section class="shortcuts-section">
        <div class="section-header">
          <div class="icon">⌨️</div>
          <h2>DevTools 快捷键大全</h2>
        </div>

        <div class="shortcuts-grid">
          <div class="shortcuts-column">
            <h3>全局快捷键</h3>
            <div class="shortcut-item">
              <div class="key">F12 / Ctrl+Shift+I</div>
              <div class="desc">打开/关闭 DevTools</div>
            </div>
            <div class="shortcut-item">
              <div class="key">Ctrl+Shift+C</div>
              <div class="desc">元素选择器</div>
            </div>
            <div class="shortcut-item">
              <div class="key">Ctrl+Shift+M</div>
              <div class="desc">切换设备模式</div>
            </div>
            <div class="shortcut-item">
              <div class="key">Ctrl+[ / Ctrl+]</div>
              <div class="desc">切换面板</div>
            </div>
          </div>

          <div class="shortcuts-column">
            <h3>Elements 面板</h3>
            <div class="shortcut-item">
              <div class="key">H</div>
              <div class="desc">显示/隐藏元素</div>
            </div>
            <div class="shortcut-item">
              <div class="key">方向键</div>
              <div class="desc">遍历 DOM 元素</div>
            </div>
            <div class="shortcut-item">
              <div class="key">Ctrl+F</div>
              <div class="desc">搜索 DOM 节点</div>
            </div>
            <div class="shortcut-item">
              <div class="key">Alt+点击</div>
              <div class="desc">展开/折叠所有子节点</div>
            </div>
          </div>

          <div class="shortcuts-column">
            <h3>Console 面板</h3>
            <div class="shortcut-item">
              <div class="key">Esc</div>
              <div class="desc">打开/关闭控制台抽屉</div>
            </div>
            <div class="shortcut-item">
              <div class="key">Ctrl+L</div>
              <div class="desc">清空控制台</div>
            </div>
            <div class="shortcut-item">
              <div class="key">Shift+Enter</div>
              <div class="desc">多行输入模式</div>
            </div>
            <div class="shortcut-item">
              <div class="key">↑ / ↓</div>
              <div class="desc">命令历史记录</div>
            </div>
          </div>

          <div class="shortcuts-column">
            <h3>Sources 面板</h3>
            <div class="shortcut-item">
              <div class="key">Ctrl+P</div>
              <div class="desc">快速打开文件</div>
            </div>
            <div class="shortcut-item">
              <div class="key">Ctrl+Shift+O</div>
              <div class="desc">导航到函数</div>
            </div>
            <div class="shortcut-item">
              <div class="key">F8</div>
              <div class="desc">继续执行</div>
            </div>
            <div class="shortcut-item">
              <div class="key">F10</div>
              <div class="desc">单步跳过</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 移动端调试 -->
      <section class="mobile-section">
        <div class="section-header">
          <div class="icon">📱</div>
          <h2>移动端远程调试</h2>
        </div>

        <div class="mobile-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Android 设备</h3>
              <p>Chrome 调试 Android 设备:</p>
              <ol>
                <li>启用开发者选项和 USB 调试</li>
                <li>使用 USB 连接设备</li>
                <li>在 Chrome 中访问 <code>chrome://inspect</code></li>
                <li>选择设备并开始调试</li>
              </ol>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>iOS 设备</h3>
              <p>Safari 调试 iOS 设备:</p>
              <ol>
                <li>启用 Web 检查器（设置 > Safari > 高级）</li>
                <li>使用 USB 连接设备</li>
                <li>Mac 上 Safari > 开发 > 选择设备</li>
                <li>开始调试移动端网页</li>
              </ol>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>无线调试</h3>
              <p>Android 无线调试:</p>
              <ol>
                <li>连接同一 Wi-Fi</li>
                <li>启用无线调试（开发者选项）</li>
                <li>配对设备 IP 和端口</li>
                <li>在 <code>chrome://inspect</code> 中调试</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>浏览器开发者工具 DevTools 基础介绍 | 前端调试必备手册 | © 2023</p>
      <div class="footer-links">
        <a href="https://developer.chrome.com/docs/devtools/" target="_blank">Chrome DevTools</a>
        <a href="https://firefox-source-docs.mozilla.org/devtools-user/index.html" target="_blank">Firefox DevTools</a>
        <a href="https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/" target="_blank">Edge
          DevTools</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const panels = ref([
  {
    id: 'elements',
    icon: '🏗️',
    title: 'Elements 面板',
    description: '用于检查、编辑和调试 HTML 与 CSS',
    keyFeatures: [
      '实时修改 DOM 结构和样式',
      '查看盒模型和布局信息',
      '可视化 DOM 事件监听器',
      '检查可访问性（ARIA）属性'
    ],
    debugSteps: [
      '右键页面元素 > 检查（或 Ctrl+Shift+C）',
      '在 DOM 树中导航元素',
      '在 Styles 面板修改 CSS 属性',
      '使用 Box Model 视图调试布局',
      '在 Event Listeners 面板查看事件绑定'
    ],
    codeExample: '',
    useCases: [
      '修复页面布局问题',
      '调试 CSS 选择器优先级',
      '模拟伪类状态（:hover, :focus）',
      '检查元素的盒模型尺寸'
    ]
  },
  {
    id: 'console',
    icon: '💻',
    title: 'Console 面板',
    description: '运行 JavaScript 代码、查看日志和错误信息',
    keyFeatures: [
      '执行任意 JavaScript 命令',
      '捕获日志、警告和错误信息',
      '过滤和分组控制台输出',
      '使用 XPath 和 CSS 选择器查询 DOM'
    ],
    debugSteps: [
      '使用 console.log() 输出调试信息',
      'console.table() 表格化展示对象',
      'console.time() 和 console.timeEnd() 计时',
      '使用 console.assert() 进行断言调试',
      'console.trace() 查看调用堆栈'
    ],
    codeExample: `// 调试示例代码
console.log('当前用户:', user);
console.table(users);
console.assert(isLoggedin, '用户未登录');
console.time('loadTime');
// ...
console.timeEnd('loadTime');`,
    useCases: [
      '调试 JavaScript 运行时错误',
      '检查 API 返回数据',
      '测量代码执行时间',
      '页面加载时执行临时脚本'
    ]
  },
  {
    id: 'sources',
    icon: '🔎',
    title: 'Sources 面板',
    description: '调试 JavaScript 代码的核心面板',
    keyFeatures: [
      '源代码查看和编辑',
      '设置断点进行逐步调试',
      '调用堆栈和作用域检查',
      '代码片段（Snippets）保存和执行'
    ],
    debugSteps: [
      '打开 JavaScript 文件',
      '在行号左侧点击设置断点',
      '触发断点后使用调试工具栏（继续、单步跳过、单步进入等）',
      '在 Scope 面板检查变量值',
      '在 Call Stack 面板查看函数调用栈'
    ],
    codeExample: '',
    useCases: [
      '调试复杂逻辑错误',
      '分析异步代码执行流程',
      '检查变量作用域问题',
      '测试代码片段'
    ]
  },
  {
    id: 'network',
    icon: '📡',
    title: 'Network 面板',
    description: '监控和分析网络请求',
    keyFeatures: [
      '记录所有网络请求（XHR, Fetch, JS, CSS 等）',
      '查看请求和响应详细信息',
      '模拟慢速网络连接（Throttling）',
      '导出 HAR 文件'
    ],
    debugSteps: [
      '刷新页面开始记录网络活动',
      '筛选特定类型的请求（XHR, JS, Img）',
      '查看请求头和响应内容',
      '使用 Waterfall 视图分析请求时序',
      '模拟慢速网络（Online > Fast 3G）'
    ],
    codeExample: '',
    useCases: [
      '分析 API 请求和响应',
      '识别性能瓶颈（大文件、慢请求）',
      '调试跨域（CORS）问题',
      '检查缓存行为'
    ]
  },
  {
    id: 'performance',
    icon: '⏱️',
    title: 'Performance 面板',
    description: '分析和优化页面运行时性能',
    keyFeatures: [
      '记录和可视化 CPU、内存使用',
      '识别长任务和卡顿',
      '分析帧率（FPS）',
      '检测内存泄漏'
    ],
    debugSteps: [
      '点击 Record 开始记录性能',
      '执行用户操作（如滚动、点击）',
      '停止记录并分析结果',
      '查看 Main 线程活动',
      '识别长任务（超过 50ms）'
    ],
    codeExample: '',
    useCases: [
      '优化页面加载性能',
      '解决交互卡顿问题',
      '减少 JavaScript 执行时间',
      '识别强制同步布局（Layout Thrashing）'
    ]
  },
  {
    id: 'application',
    icon: '🗄️',
    title: 'Application 面板',
    description: '管理应用数据、存储和缓存',
    keyFeatures: [
      '查看和管理 LocalStorage、SessionStorage',
      '检查 IndexedDB 数据库',
      '管理 Service Workers',
      '查看和清除缓存'
    ],
    debugSteps: [
      '查看各种存储类型的数据',
      '编辑或删除存储项',
      '在 Service Workers 面板调试 PWA',
      '在 Cache Storage 查看缓存资源',
      '清除所有站点数据'
    ],
    codeExample: '',
    useCases: [
      '调试本地存储问题',
      '开发 Progressive Web App (PWA)',
      '清理特定网站数据',
      '检查 Cookie 设置'
    ]
  },
  {
    id: 'security',
    icon: '🔒',
    title: 'Security 面板',
    description: '检查网站安全性问题',
    keyFeatures: [
      '检查 HTTPS 实现情况',
      '查看证书信息',
      '识别混合内容问题',
      '检测安全策略问题'
    ],
    debugSteps: [
      '查看安全状态概览',
      '检查主要来源的安全性',
      '识别非安全内容（HTTP）',
      '验证证书有效性',
      '检查内容安全策略（CSP）'
    ],
    codeExample: '',
    useCases: [
      '排查 HTTPS 安全问题',
      '解决混合内容警告',
      '调试内容安全策略（CSP）',
      '验证证书链'
    ]
  },
  {
    id: 'lighthouse',
    icon: '🚀',
    title: 'Lighthouse 面板',
    description: '自动化网站质量审计工具',
    keyFeatures: [
      '性能、可访问性、PWA 等审计',
      '生成优化建议报告',
      '提供最佳实践指导',
      '移动端和桌面端测试'
    ],
    debugSteps: [
      '选择审计项目（性能、PWA 等）',
      '选择设备类型（移动端/桌面端）',
      '点击 Generate report 运行审计',
      '查看评分和优化建议',
      '根据建议实施优化'
    ],
    codeExample: '',
    useCases: [
      '全面性能优化',
      '改进网站可访问性',
      '提升 SEO 效果',
      '实施 PWA 最佳实践'
    ]
  }
]);

const scrollToPanel = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.devtools-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #4285F4, #1a73e8);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .devtools-logo {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    svg {
      width: 50px;
      height: 50px;
    }
  }
}

.main-title {
  font-size: 2.5rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0 0 1.5rem;
  font-weight: 400;
}

.content-wrapper {
  padding: 0 2rem;
}

.quick-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px;
    padding: 1rem 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #e8f0fe;
      transform: translateY(-3px);
    }

    .nav-icon {
      font-size: 2rem;
      margin-bottom: 0.8rem;
    }

    .nav-text {
      font-size: 0.9rem;
      font-weight: 500;
      text-align: center;
      line-height: 1.3;
    }
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;

  .icon {
    font-size: 1.8rem;
    background: #e8f0fe;
    color: #4285F4;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: #1e293b;
  }
}

.intro-content {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.key-features {
  margin-top: 2.5rem;

  .section-subtitle {
    font-size: 1.4rem;
    color: #4285F4;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #dbeafe;
  }

  ul {
    list-style-type: none;
    padding-left: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;

    li {
      position: relative;
      padding-left: 1.8rem;
      margin-bottom: 0.8rem;
      font-size: 1.05rem;

      &:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #4285F4;
        font-size: 1.5rem;
        line-height: 1;
      }

      strong {
        color: #1a73e8;
      }
    }
  }
}

.panel-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.panel-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-top: 3px solid #4285F4;
  height: 100%;
  display: flex;
  flex-direction: column;

  .card-header {
    padding: 1.2rem 1.5rem;
    background: #e8f0fe;
    border-bottom: 1px solid #dbeafe;

    .card-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1a73e8;
    }
  }

  .card-body {
    padding: 1.5rem;
    flex-grow: 1;

    p {
      margin: 0 0 1rem;
      color: #4b5563;
      line-height: 1.6;
    }

    ul,
    ol {
      padding-left: 1.2rem;
      margin: 1rem 0;

      li {
        margin-bottom: 0.8rem;
        font-size: 0.95rem;
        line-height: 1.5;
      }
    }

    .use-cases {
      list-style: none;
      padding-left: 0;

      li {
        display: flex;
        gap: 0.8rem;
        margin-bottom: 1rem;
      }

      .scenario-icon {
        color: #4285F4;
        font-weight: bold;
      }

      .scenario-text {
        flex: 1;
      }
    }

    .code-example {
      background-color: #f1f8ff;
      border-left: 4px solid #4285F4;
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 0 4px 4px 0;
      overflow-x: auto;

      pre {
        font-family: @font-code;
        font-size: 0.9rem;
        margin: 0;
        white-space: pre;
        color: #1e293b;
      }
    }
  }
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .advanced-card {
    background: white;
    border-radius: 12px;
    padding: 1.8rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .adv-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #4285F4;
    }

    h3 {
      margin: 0 0 1rem;
      font-size: 1.2rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.shortcuts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.shortcuts-column {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  h3 {
    font-size: 1.2rem;
    color: #1a73e8;
    margin-top: 0;
    margin-bottom: 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
  }
}

.shortcut-item {
  display: flex;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #e2e8f0;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .key {
    min-width: 120px;
    font-family: @font-code;
    background: #e8f0fe;
    color: #1a73e8;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    font-weight: 600;
  }

  .desc {
    flex: 1;
    padding-left: 1rem;
    color: #4b5563;
  }
}

.mobile-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.step {
  display: flex;
  gap: 1.2rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-left: 4px solid #4285F4;

  .step-number {
    font-size: 1.6rem;
    font-weight: 700;
    color: #4285F4;
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    background: #e8f0fe;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-content {
    flex: 1;

    h3 {
      margin: 0 0 0.8rem;
      font-size: 1.3rem;
      color: #1e293b;
    }

    p {
      margin: 0 0 1rem;
      color: #4b5563;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    ol {
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        line-height: 1.5;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 2rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: #4285F4;
      text-decoration: none;
      margin: 0 1rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.code-block {
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 0.8rem 0;
}

@media (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }

  .panel-content {
    grid-template-columns: 1fr;
  }

  .mobile-steps {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .devtools-logo {
    width: 60px;
    height: 60px;

    svg {
      width: 40px;
      height: 40px;
    }
  }

  .quick-nav {
    .nav-item {
      width: 80px;
      padding: 0.8rem 0.3rem;

      .nav-icon {
        font-size: 1.6rem;
      }

      .nav-text {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
