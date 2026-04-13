<template>
  <div class="pwa-container">
    <header class="page-header">
      <div class="header-content">
        <h1>PWA - 渐进式Web应用</h1>
        <p class="subtitle">下一代Web应用体验</p>
        <div class="header-badges">
          <span class="badge offline">离线可用</span>
          <span class="badge installable">可安装</span>
          <span class="badge responsive">响应式</span>
          <span class="badge fast">快速加载</span>
        </div>
      </div>
      <div class="header-visual">
        <div class="pwa-demo">
          <div class="phone-mockup">
            <div class="phone-screen">
              <div class="app-icon">📱</div>
              <div class="app-name">My PWA App</div>
              <div class="network-status" :class="networkStatus">
                {{ networkStatus === 'online' ? '在线' : '离线' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="intro-section">
        <div class="card">
          <h2>什么是PWA?</h2>
          <p class="intro-text">
            <strong>渐进式Web应用（Progressive Web App）</strong>是一种通过现代Web技术构建的应用程序，它结合了Web和原生应用的优点，提供类似原生应用的体验。
          </p>
          <div class="definition-grid">
            <div class="definition-item">
              <h3>渐进式</h3>
              <p>适用于所有用户，无论使用什么浏览器</p>
            </div>
            <div class="definition-item">
              <h3>响应式</h3>
              <p>适配所有设备尺寸和屏幕类型</p>
            </div>
            <div class="definition-item">
              <h3>连接无关</h3>
              <p>通过Service Worker实现离线工作</p>
            </div>
            <div class="definition-item">
              <h3>类似应用</h3>
              <p>提供类似原生应用的用户体验</p>
            </div>
          </div>
        </div>
      </section>

      <div class="two-column-layout">
        <section class="features-section">
          <div class="card">
            <h2>核心特性</h2>
            <div class="features-tabs">
              <button
                v-for="feature in features"
                :key="feature.id"
                @click="activeFeature = feature.id"
                class="feature-tab"
                :class="{ active: activeFeature === feature.id }"
              >
                <span class="feature-icon">{{ feature.icon }}</span>
                <span class="feature-name">{{ feature.name }}</span>
              </button>
            </div>

            <div class="feature-content">
              <h3>{{ getActiveFeature().title }}</h3>
              <p class="feature-description">{{ getActiveFeature().description }}</p>

              <div class="feature-details">
                <div class="detail-item">
                  <strong>实现方式:</strong> {{ getActiveFeature().implementation }}
                </div>
                <div class="detail-item">
                  <strong>用户体验:</strong>
                  <span class="ux-rating">
                    <span
                      v-for="n in 5"
                      :key="n"
                      class="star"
                      :class="{ filled: n <= getActiveFeature().uxImpact }"
                    >★</span>
                  </span>
                </div>
                <div class="detail-item">
                  <strong>开发复杂度:</strong>
                  <span class="complexity" :class="getActiveFeature().complexity">
                    {{ getActiveFeature().complexity }}
                  </span>
                </div>
              </div>

              <div class="code-example" v-if="getActiveFeature().code">
                <h4>实现示例</h4>
                <pre class="code-block"><code>{{ getActiveFeature().code }}</code></pre>
              </div>
            </div>
          </div>

          <div class="card">
            <h2>技术组成</h2>
            <div class="tech-stack">
              <div class="tech-item" v-for="tech in techStack" :key="tech.name">
                <div class="tech-icon">{{ tech.icon }}</div>
                <div class="tech-info">
                  <h4>{{ tech.name }}</h4>
                  <p>{{ tech.description }}</p>
                </div>
                <div class="tech-importance">
                  <div class="importance-bar">
                    <div
                      class="importance-fill"
                      :style="{ width: tech.importance + '%' }"
                    ></div>
                  </div>
                  <span class="importance-text">{{ getImportanceText(tech.importance) }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="demo-section">
          <div class="card">
            <h2>PWA体验演示</h2>

            <div class="demo-controls">
              <div class="control-group">
                <button
                  @click="toggleNetwork"
                  class="btn"
                  :class="networkStatus === 'online' ? 'secondary' : 'primary'"
                >
                  {{ networkStatus === 'online' ? '模拟离线' : '模拟在线' }}
                </button>
                <button @click="showInstallPrompt" class="btn primary">安装应用</button>
                <button @click="sendNotification" class="btn outline">发送通知</button>
              </div>
            </div>

            <div class="demo-stats">
              <div class="stat-card">
                <div class="stat-icon">📊</div>
                <div class="stat-info">
                  <div class="stat-value">{{ cacheSize }}</div>
                  <div class="stat-label">缓存资源</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">⚡</div>
                <div class="stat-info">
                  <div class="stat-value">{{ loadTime }}ms</div>
                  <div class="stat-label">加载时间</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">💾</div>
                <div class="stat-info">
                  <div class="stat-value">{{ storageUsage }}</div>
                  <div class="stat-label">存储使用</div>
                </div>
              </div>
            </div>

            <div class="pwa-benefits">
              <h3>用户体验优势</h3>
              <div class="benefits-grid">
                <div class="benefit-item">
                  <div class="benefit-icon">🚀</div>
                  <h4>快速加载</h4>
                  <p>即使在不稳定的网络环境下也能快速启动</p>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">📱</div>
                  <h4>全屏体验</h4>
                  <p>可安装到主屏幕，提供全屏应用体验</p>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">🔔</div>
                  <h4>推送通知</h4>
                  <p>及时向用户发送重要信息和更新</p>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">🔄</div>
                  <h4>后台同步</h4>
                  <p>在网络恢复后自动同步数据</p>
                </div>
              </div>
            </div>

            <div class="comparison-section">
              <h3>与传统Web应用对比</h3>
              <div class="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>特性</th>
                      <th>传统Web应用</th>
                      <th>PWA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>离线访问</td>
                      <td>❌ 不可用</td>
                      <td>✅ 完全支持</td>
                    </tr>
                    <tr>
                      <td>安装到设备</td>
                      <td>❌ 不可用</td>
                      <td>✅ 支持安装</td>
                    </tr>
                    <tr>
                      <td>推送通知</td>
                      <td>❌ 有限支持</td>
                      <td>✅ 完全支持</td>
                    </tr>
                    <tr>
                      <td>加载速度</td>
                      <td>依赖网络</td>
                      <td>瞬间加载</td>
                    </tr>
                    <tr>
                      <td>用户体验</td>
                      <td>浏览器内</td>
                      <td>类似原生应用</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="use-cases-section">
        <div class="card">
          <h2>适用场景</h2>
          <div class="use-cases-tabs">
            <button
              v-for="scene in useCases"
              :key="scene.id"
              @click="activeUseCase = scene.id"
              class="use-case-tab"
              :class="{ active: activeUseCase === scene.id }"
            >
              {{ scene.name }}
            </button>
          </div>

          <div class="use-case-content">
            <h3>{{ getActiveUseCase().title }}</h3>
            <p class="use-case-description">{{ getActiveUseCase().description }}</p>

            <div class="case-examples">
              <h4>典型案例</h4>
              <div class="examples-grid">
                <div
                  v-for="example in getActiveUseCase().examples"
                  :key="example.name"
                  class="example-card"
                >
                  <div class="example-icon">{{ example.icon }}</div>
                  <h5>{{ example.name }}</h5>
                  <p>{{ example.description }}</p>
                  <div class="example-benefits">
                    <span
                      v-for="benefit in example.benefits"
                      :key="benefit"
                      class="benefit-tag"
                    >
                      {{ benefit }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="implementation-tips">
              <h4>实现建议</h4>
              <ul>
                <li v-for="tip in getActiveUseCase().tips" :key="tip">{{ tip }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="implementation-section">
        <div class="card">
          <h2>开始使用PWA</h2>
          <div class="implementation-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>创建Web App Manifest</h3>
                <p>定义应用的元数据，包括名称、图标、主题色等</p>
                <pre class="code-small"><code>{
  "name": "我的PWA应用",
  "short_name": "MyPWA",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2196f3",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}</code></pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>注册Service Worker</h3>
                <p>在应用中注册Service Worker以启用离线功能</p>
                <pre class="code-small"><code>if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      console.log('SW registered');
    })
    .catch(err => {
      console.log('SW registration failed');
    });
}</code></pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>实现缓存策略</h3>
                <p>定义资源缓存策略，确保离线可用性</p>
                <pre class="code-small"><code>const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});</code></pre>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>添加安装提示</h3>
                <p>引导用户将应用安装到主屏幕</p>
                <pre class="code-small"><code>let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPrompt();
});

function showInstallPrompt() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
    });
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="tools-section">
        <div class="card">
          <h2>开发工具</h2>
          <div class="tools-grid">
            <div class="tool-card">
              <h3>Workbox</h3>
              <p>Google提供的PWA开发工具库，简化Service Worker开发</p>
              <div class="tool-features">
                <span class="feature">预缓存</span>
                <span class="feature">运行时缓存</span>
                <span class="feature">策略管理</span>
              </div>
              <pre class="code-tiny"><code>import { precacheAndRoute } from 'workbox-precaching';
precacheAndRoute(self.__WB_MANIFEST);</code></pre>
            </div>
            <div class="tool-card">
              <h3>Lighthouse</h3>
              <p>自动化工具，用于评估PWA质量和性能</p>
              <div class="tool-features">
                <span class="feature">性能检测</span>
                <span class="feature">PWA审核</span>
                <span class="feature">最佳实践</span>
              </div>
              <div class="tool-score">
                <span class="score-label">PWA评分:</span>
                <span class="score-value">92/100</span>
              </div>
            </div>
            <div class="tool-card">
              <h3>PWA Builder</h3>
              <p>微软提供的PWA开发和测试平台</p>
              <div class="tool-features">
                <span class="feature">Manifest生成</span>
                <span class="feature">图标生成</span>
                <span class="feature">商店发布</span>
              </div>
              <div class="tool-link">
                <a href="https://pwabuilder.com" target="_blank">访问网站</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="limitations-section">
        <div class="card">
          <h2>限制与考虑</h2>
          <div class="limitations-grid">
            <div class="limitation-item">
              <h3>🔋 系统资源</h3>
              <p>Service Worker在后台运行，可能增加电池消耗</p>
            </div>
            <div class="limitation-item">
              <h3>📱 iOS限制</h3>
              <p>iOS对PWA的某些功能支持有限（如推送通知）</p>
            </div>
            <div class="limitation-item">
              <h3>🔒 安全要求</h3>
              <p>必须使用HTTPS，Service Worker有严格的安全限制</p>
            </div>
            <div class="limitation-item">
              <h3>🔄 缓存管理</h3>
              <p>需要仔细设计缓存策略，避免存储过时内容</p>
            </div>
          </div>

          <div class="browser-support">
            <h3>浏览器支持情况</h3>
            <div class="browser-grid">
              <div class="browser-item" v-for="browser in browserSupport" :key="browser.name">
                <div class="browser-icon">{{ browser.icon }}</div>
                <div class="browser-name">{{ browser.name }}</div>
                <div class="support-level" :class="browser.support">
                  {{ browser.support === 'excellent' ? '优秀' :
                     browser.support === 'good' ? '良好' : '一般' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 安装提示模态框 -->
    <div v-if="showInstallModal" class="modal-overlay">
      <div class="install-modal">
        <div class="modal-header">
          <h3>安装应用</h3>
          <button @click="showInstallModal = false" class="close-btn">×</button>
        </div>
        <div class="modal-content">
          <div class="app-preview">
            <div class="app-icon-large">📱</div>
            <div class="app-info">
              <h4>My PWA App</h4>
              <p>体验更好的应用功能</p>
            </div>
          </div>
          <div class="install-steps">
            <div class="install-step">
              <span class="step-number">1</span>
              <span>点击分享按钮</span>
            </div>
            <div class="install-step">
              <span class="step-number">2</span>
              <span>选择"添加到主屏幕"</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 通知演示 -->
    <div v-if="notification" class="notification-demo">
      <div class="notification">
        <div class="notification-icon">🔔</div>
        <div class="notification-content">
          <div class="notification-title">{{ notification.title }}</div>
          <div class="notification-body">{{ notification.body }}</div>
        </div>
        <button @click="notification = null" class="close-notification">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 响应式数据
const activeFeature = ref('offline')
const activeUseCase = ref('ecommerce')
const networkStatus = ref('online')
const showInstallModal = ref(false)
const notification = ref<any>(null)

// 模拟数据
const cacheSize = ref(24)
const loadTime = ref(320)
const storageUsage = ref('1.2MB')

// 核心特性数据
const features = reactive([
  {
    id: 'offline',
    name: '离线功能',
    icon: '📶',
    title: '离线访问能力',
    description: '通过Service Worker缓存关键资源，即使在没有网络连接的情况下也能访问应用。',
    implementation: 'Service Worker + Cache API',
    uxImpact: 5,
    complexity: '中等',
    code: `// Service Worker 安装时缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles/main.css',
        '/scripts/app.js',
        '/images/logo.png'
      ]);
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});`
  },
  {
    id: 'installable',
    name: '可安装',
    icon: '📱',
    title: '添加到主屏幕',
    description: '用户可以将PWA安装到设备主屏幕，像原生应用一样启动和使用。',
    implementation: 'Web App Manifest + beforeinstallprompt',
    uxImpact: 4,
    complexity: '简单',
    code: `// 检测安装提示
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

// 触发安装
function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('用户接受了安装');
      }
      deferredPrompt = null;
    });
  }
}`
  },
  {
    id: 'push',
    name: '推送通知',
    icon: '🔔',
    title: '推送通知功能',
    description: '即使应用未打开，也能向用户发送重要通知，提升用户参与度。',
    implementation: 'Push API + Notification API',
    uxImpact: 4,
    complexity: '中等',
    code: `// 请求通知权限
function requestNotificationPermission() {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      subscribeUserToPush();
    }
  });
}

// 订阅推送
function subscribeUserToPush() {
  navigator.serviceWorker.ready.then(registration => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    });
  }).then(subscription => {
    // 发送subscription到服务器
  });
}`
  },
  {
    id: 'performance',
    name: '性能优化',
    icon: '⚡',
    title: '卓越的性能',
    description: '通过预缓存、懒加载等技术，实现快速加载和流畅的用户体验。',
    implementation: '多种缓存策略 + 性能优化',
    uxImpact: 5,
    complexity: '中等',
    code: `// 使用Workbox进行运行时缓存
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// 缓存图片
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images'
  })
);

// API请求使用网络优先
registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache'
  })
);`
  }
])

// 技术栈数据
const techStack = reactive([
  {
    name: 'Service Worker',
    icon: '⚙️',
    description: '在后台运行的脚本，用于拦截和处理网络请求',
    importance: 100
  },
  {
    name: 'Web App Manifest',
    icon: '📄',
    description: 'JSON文件，定义应用的外观和行为',
    importance: 95
  },
  {
    name: 'Cache API',
    icon: '💾',
    description: '用于存储和检索网络请求的缓存',
    importance: 90
  },
  {
    name: 'Push API',
    icon: '🔔',
    description: '允许服务器向应用推送消息',
    importance: 80
  },
  {
    name: 'IndexedDB',
    icon: '🗄️',
    description: '客户端存储大量结构化数据',
    importance: 75
  }
])

// 使用场景数据
const useCases = reactive([
  {
    id: 'ecommerce',
    name: '电子商务',
    title: '电商平台PWA',
    description: '为在线商店提供快速、可靠的购物体验，即使在网络不稳定的情况下也能流畅浏览商品和完成购买。',
    examples: [
      {
        name: '商品浏览',
        icon: '🛍️',
        description: '快速加载商品图片和详情，支持离线浏览',
        benefits: ['快速加载', '离线访问', '流畅体验']
      },
      {
        name: '购物车',
        icon: '🛒',
        description: '离线状态下添加商品，网络恢复后同步',
        benefits: ['离线操作', '数据同步', '无缝体验']
      },
      {
        name: '订单跟踪',
        icon: '📦',
        description: '实时推送订单状态更新',
        benefits: ['实时通知', '用户参与', '及时反馈']
      }
    ],
    tips: [
      '预缓存商品图片和关键页面',
      '实现购物车的离线功能',
      '使用推送通知提醒用户促销活动'
    ]
  },
  {
    id: 'media',
    name: '媒体内容',
    title: '媒体和内容平台',
    description: '为新闻、博客和流媒体平台提供即时加载的内容体验，支持离线阅读和推送更新。',
    examples: [
      {
        name: '新闻阅读',
        icon: '📰',
        description: '离线阅读已缓存的文章和新闻',
        benefits: ['离线阅读', '快速访问', '内容预加载']
      },
      {
        name: '视频流',
        icon: '🎬',
        description: '智能缓存热门内容，减少缓冲时间',
        benefits: ['减少缓冲', '智能缓存', '流畅播放']
      },
      {
        name: '内容更新',
        icon: '🔄',
        description: '后台同步最新内容',
        benefits: ['内容同步', '及时更新', '用户留存']
      }
    ],
    tips: [
      '实现内容的智能预缓存',
      '使用后台同步更新内容',
      '为音频视频内容提供离线访问'
    ]
  },
  {
    id: 'social',
    name: '社交网络',
    title: '社交媒体应用',
    description: '提供快速、响应式的社交体验，支持离线发布和实时通知。',
    examples: [
      {
        name: '消息发送',
        icon: '💬',
        description: '离线状态下编写消息，网络恢复后自动发送',
        benefits: ['离线操作', '自动同步', '无缝沟通']
      },
      {
        name: '推送通知',
        icon: '🔔',
        description: '实时接收好友动态和消息提醒',
        benefits: ['实时通知', '用户参与', '及时互动']
      },
      {
        name: '内容缓存',
        icon: '📸',
        description: '缓存好友动态和图片，快速加载',
        benefits: ['快速加载', '流畅浏览', '数据节省']
      }
    ],
    tips: [
      '实现消息的离线队列',
      '使用推送通知提高用户参与度',
      '优化图片和媒体的缓存策略'
    ]
  },
  {
    id: 'productivity',
    name: '生产力工具',
    title: '生产力应用',
    description: '为文档编辑、项目管理等工具提供可靠的离线功能和实时同步。',
    examples: [
      {
        name: '文档编辑',
        icon: '📝',
        description: '离线创建和编辑文档，自动同步到云端',
        benefits: ['离线工作', '自动保存', '数据安全']
      },
      {
        name: '任务管理',
        icon: '✅',
        description: '随时随地管理任务，实时同步状态',
        benefits: ['多设备同步', '实时更新', '灵活工作']
      },
      {
        name: '团队协作',
        icon: '👥',
        description: '离线状态下查看项目信息，网络恢复后更新',
        benefits: ['团队协作', '信息同步', '工作效率']
      }
    ],
    tips: [
      '实现数据的离线优先策略',
      '使用冲突解决机制处理多设备同步',
      '优化大文件的缓存和同步'
    ]
  }
])

// 浏览器支持数据
const browserSupport = reactive([
  { name: 'Chrome', icon: '🔴', support: 'excellent' },
  { name: 'Firefox', icon: '🟠', support: 'excellent' },
  { name: 'Edge', icon: '🔵', support: 'excellent' },
  { name: 'Safari', icon: '🔵', support: 'good' },
  { name: 'Samsung Internet', icon: '🟣', support: 'excellent' }
])

// 方法
const getActiveFeature = () => {
  return features.find(feature => feature.id === activeFeature.value) || features[0]
}

const getActiveUseCase = () => {
  return useCases.find(scene => scene.id === activeUseCase.value) || useCases[0]
}

const getImportanceText = (importance: number) => {
  if (importance >= 90) return '关键'
  if (importance >= 70) return '重要'
  return '有用'
}

// 演示功能
const toggleNetwork = () => {
  networkStatus.value = networkStatus.value === 'online' ? 'offline' : 'online'
  // 模拟网络状态变化的影响
  if (networkStatus.value === 'offline') {
    loadTime.value = 120 // 离线时加载更快
  } else {
    loadTime.value = 320
  }
}

const showInstallPrompt = () => {
  showInstallModal.value = true
}

const sendNotification = () => {
  notification.value = {
    title: 'PWA演示通知',
    body: '这是一个PWA推送通知的演示'
  }

  // 3秒后自动关闭
  setTimeout(() => {
    notification.value = null
  }, 3000)
}

// 模拟数据更新
onMounted(() => {
  const interval = setInterval(() => {
    // 轻微波动模拟真实场景
    cacheSize.value = 24 + Math.floor(Math.random() * 5)
    storageUsage.value = (1.2 + Math.random() * 0.3).toFixed(1) + 'MB'
  }, 2000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<style lang="less" scoped>
.pwa-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.page-header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  border-radius: 15px;
  color: white;
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.3);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.header-content {
  h1 {
    margin: 0 0 10px;
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1.1;
  }

  .subtitle {
    margin: 0 0 20px;
    font-size: 1.3rem;
    opacity: 0.9;
  }
}

.header-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.offline {
    background: rgba(76, 175, 80, 0.2);
    border: 1px solid #4caf50;
  }

  &.installable {
    background: rgba(156, 39, 176, 0.2);
    border: 1px solid #9c27b0;
  }

  &.responsive {
    background: rgba(255, 152, 0, 0.2);
    border: 1px solid #ff9800;
  }

  &.fast {
    background: rgba(244, 67, 54, 0.2);
    border: 1px solid #f44336;
  }
}

.header-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pwa-demo {
  perspective: 1000px;
}

.phone-mockup {
  width: 200px;
  height: 400px;
  background: #2c3e50;
  border-radius: 30px;
  padding: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: rotateY(-10deg) rotateX(5deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotateY(-5deg) rotateX(2deg);
  }
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}

.app-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.app-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.network-status {
  position: absolute;
  bottom: 20px;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;

  &.online {
    background: rgba(46, 204, 113, 0.3);
    border: 1px solid #2ecc71;
  }

  &.offline {
    background: rgba(231, 76, 60, 0.3);
    border: 1px solid #e74c3c;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  h2 {
    margin-top: 0;
    margin-bottom: 24px;
    color: #2c3e50;
    border-bottom: 2px solid #eaecef;
    padding-bottom: 12px;
    font-size: 1.6rem;
    font-weight: 700;
  }
}

.intro-section {
  .card {
    p.intro-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #555;
      margin-bottom: 24px;
    }
  }
}

.definition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.definition-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2196f3;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    color: #666;
    line-height: 1.4;
  }
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.features-tabs {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.feature-tab {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  background: #f8f9fa;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: #e9ecef;
  }

  &.active {
    background: #2196f3;
    color: white;
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);

    .feature-icon {
      transform: scale(1.1);
    }
  }

  .feature-icon {
    font-size: 1.3rem;
    margin-right: 12px;
    transition: transform 0.2s;
  }

  .feature-name {
    font-weight: 600;
    font-size: 1rem;
  }
}

.feature-content {
  h3 {
    margin-top: 0;
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1.4rem;
  }
}

.feature-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.feature-details {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;

  strong {
    color: #2c3e50;
    min-width: 100px;
  }
}

.ux-rating {
  display: flex;
  gap: 2px;
}

.star {
  color: #ddd;
  font-size: 1.1rem;

  &.filled {
    color: #ffc107;
  }
}

.complexity {
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;

  &.简单 {
    background: #d4edda;
    color: #155724;
  }

  &.中等 {
    background: #fff3cd;
    color: #856404;
  }

  &.困难 {
    background: #f8d7da;
    color: #721c24;
  }
}

.code-example {
  h4 {
    margin-bottom: 12px;
    color: #2c3e50;
  }
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
  font-size: 0.85rem;
  border-left: 4px solid #2196f3;
}

.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tech-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
  }
}

.tech-icon {
  font-size: 1.8rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tech-info {
  h4 {
    margin: 0 0 6px;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.tech-importance {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.importance-bar {
  width: 100px;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
}

.importance-fill {
  height: 100%;
  background: #2196f3;
  transition: width 0.3s ease;
}

.importance-text {
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: 500;
}

.demo-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;

  &.primary {
    background-color: #2196f3;
    color: white;

    &:hover {
      background-color: #1976d2;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
    }
  }

  &.secondary {
    background-color: #4caf50;
    color: white;

    &:hover {
      background-color: #388e3c;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }
  }

  &.outline {
    background-color: transparent;
    border: 2px solid #bdc3c7;
    color: #7f8c8d;

    &:hover {
      background-color: #ecf0f1;
      border-color: #95a5a6;
    }
  }
}

.demo-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
}

.stat-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-info {
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.85rem;
    color: #7f8c8d;
    margin-top: 4px;
  }
}

.pwa-benefits {
  margin-bottom: 24px;

  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #2c3e50;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.benefit-item {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
    display: block;
  }

  h4 {
    margin: 0 0 8px;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.comparison-section {
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #2c3e50;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    th, td {
      padding: 14px 16px;
      text-align: left;
      border-bottom: 1px solid #eaecef;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover {
      background: #f8f9fa;
    }
  }
}

.use-cases-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.use-case-tab {
  padding: 10px 20px;
  background: #f8f9fa;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: #e9ecef;
  }

  &.active {
    background: #2196f3;
    color: white;
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
  }
}

.use-case-content {
  h3 {
    margin-top: 0;
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1.4rem;
  }
}

.use-case-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: 1.05rem;
}

.case-examples {
  margin-bottom: 24px;

  h4 {
    margin-bottom: 16px;
    color: #2c3e50;
  }
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.example-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  .example-icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }

  h5 {
    margin: 0 0 8px;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 12px;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.example-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.benefit-tag {
  background: #2196f3;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
}

.implementation-tips {
  h4 {
    margin-bottom: 12px;
    color: #2c3e50;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      line-height: 1.5;
      color: #555;
    }
  }
}

.implementation-steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.step {
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
}

.step-number {
  width: 40px;
  height: 40px;
  background: #2196f3;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  font-size: 1.1rem;
}

.step-content {
  flex: 1;

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #2c3e50;
  }

  p {
    margin-bottom: 12px;
    color: #666;
    line-height: 1.5;
  }
}

.code-small {
  background: #2d3748;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
  font-size: 0.8rem;
  border-left: 3px solid #2196f3;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.tool-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  p {
    margin-bottom: 15px;
    color: #666;
    line-height: 1.5;
  }
}

.tool-features {
  display: flex;
  gap: 6px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.feature {
  background: #2196f3;
  color: white;
  padding: 4px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 500;
}

.code-tiny {
  background: #2d3748;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  line-height: 1.4;
  font-size: 0.7rem;
}

.tool-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 8px;
  background: white;
  border-radius: 6px;

  .score-label {
    font-size: 0.8rem;
    color: #7f8c8d;
  }

  .score-value {
    font-weight: 700;
    color: #4caf50;
  }
}

.tool-link {
  margin-top: 10px;

  a {
    color: #2196f3;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

.limitations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.limitation-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #e74c3c;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #2c3e50;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #666;
    line-height: 1.5;
  }
}

.browser-support {
  h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #2c3e50;
  }
}

.browser-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.browser-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: center;

  .browser-icon {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  .browser-name {
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 8px;
  }

  .support-level {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 500;

    &.excellent {
      background: #d4edda;
      color: #155724;
    }

    &.good {
      background: #fff3cd;
      color: #856404;
    }

    &.fair {
      background: #f8d7da;
      color: #721c24;
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.install-modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #eaecef;

  h3 {
    margin: 0;
    color: #2c3e50;
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;

  &:hover {
    color: #2c3e50;
  }
}

.modal-content {
  padding: 20px;
}

.app-preview {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.app-icon-large {
  font-size: 3rem;
}

.app-info {
  h4 {
    margin: 0 0 5px;
    color: #2c3e50;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
}

.install-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.install-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;

  .step-number {
    width: 24px;
    height: 24px;
    background: #2196f3;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
  }
}

.notification-demo {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
}

.notification {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #2196f3;
  max-width: 300px;
}

.notification-icon {
  font-size: 1.5rem;
}

.notification-content {
  flex: 1;

  .notification-title {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 4px;
  }

  .notification-body {
    color: #666;
    font-size: 0.9rem;
  }
}

.close-notification {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #7f8c8d;

  &:hover {
    color: #2c3e50;
  }
}

@media (max-width: 768px) {
  .pwa-container {
    padding: 10px;
  }

  .card {
    padding: 20px;
  }

  .page-header {
    padding: 20px;
  }

  .header-content h1 {
    font-size: 2.2rem;
  }

  .demo-stats {
    grid-template-columns: 1fr;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .examples-grid {
    grid-template-columns: 1fr;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
