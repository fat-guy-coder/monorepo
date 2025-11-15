<template>
  <div class="cache-optimization-container">
    <!-- 头部区域 -->
    <header class="cache-header">
      <div class="header-content">
        <h1>前端缓存优化加载性能指南</h1>
        <p class="subtitle">加速网页加载，提升用户体验</p>
      </div>
      <div class="performance-stats">
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">60%+</div>
          <div class="stat-label">加载加速</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📦</div>
          <div class="stat-value">80%+</div>
          <div class="stat-label">重复访问加速</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📶</div>
          <div class="stat-value">50%+</div>
          <div class="stat-label">带宽节省</div>
        </div>
      </div>
    </header>

    <!-- 方法导航 -->
    <nav class="methods-nav">
      <button v-for="method in cachingMethods" :key="method.id"
        :class="['method-btn', { active: activeMethod === method.id }]" @click="activeMethod = method.id">
        <span class="method-icon">{{ method.icon }}</span>
        {{ method.name }}
      </button>
    </nav>

    <!-- 缓存方法详情 -->
    <div class="method-details" v-if="selectedMethod">
      <div class="method-header">
        <h2>
          <span class="method-icon">{{ selectedMethod.icon }}</span>
          {{ selectedMethod.name }}
        </h2>
        <div class="method-description">{{ selectedMethod.description }}</div>
      </div>

      <div class="method-grid">
        <!-- 配置方式 -->
        <div class="detail-card">
          <h3>⚙️ 配置方式</h3>
          <div v-html="selectedMethod.configuration"></div>

          <div class="code-example" v-if="selectedMethod.configCode">
            <pre><code>{{ selectedMethod.configCode }}</code></pre>
          </div>
        </div>

        <!-- 使用场景 -->
        <div class="detail-card">
          <h3>🎯 最佳使用场景</h3>
          <ul class="usage-list">
            <li v-for="(scenario, index) in selectedMethod.useCases" :key="index">
              {{ scenario }}
            </li>
          </ul>
        </div>

        <!-- 优缺点 -->
        <div class="detail-card">
          <h3>📊 优缺点分析</h3>
          <div class="pros-cons">
            <div class="pros">
              <h4><span class="icon">✅</span> 优点</h4>
              <ul>
                <li v-for="(pro, index) in selectedMethod.pros" :key="'pro' + index">{{ pro }}</li>
              </ul>
            </div>
            <div class="cons">
              <h4><span class="icon">⚠️</span> 缺点</h4>
              <ul>
                <li v-for="(con, index) in selectedMethod.cons" :key="'con' + index">{{ con }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 性能比较图表 -->
      <div class="performance-chart" v-if="selectedMethod.chartData">
        <h3>📈 性能影响比较</h3>
        <div class="chart-container">
          <div v-for="(item, index) in selectedMethod.chartData" :key="index" class="chart-bar"
            :style="{ height: item.value + '%', backgroundColor: item.color }">
            <div class="bar-value">{{ item.value }}%</div>
            <div class="bar-label">{{ item.label }}</div>
          </div>
        </div>
        <div class="chart-legend">
          <div v-for="(item, index) in selectedMethod.chartData" :key="index" class="legend-item">
            <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- 缓存策略选择指南 -->
    <div class="strategy-guide">
      <h2><span class="icon">🧩</span> 缓存策略选择指南</h2>
      <div class="strategy-grid">
        <div class="strategy-card" v-for="(guide, index) in strategyGuides" :key="index">
          <div class="strategy-icon">{{ guide.icon }}</div>
          <h3>{{ guide.title }}</h3>
          <p>{{ guide.description }}</p>
        </div>
      </div>
    </div>

    <!-- 最佳实践 -->
    <div class="best-practices">
      <h2><span class="icon">🌟</span> 缓存最佳实践</h2>
      <div class="practices-list">
        <div v-for="(practice, index) in bestPractices" :key="index" class="practice-item">
          <div class="practice-number">{{ index + 1 }}</div>
          <div>
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具推荐 -->
    <div class="tools-section">
      <h2><span class="icon">🛠️</span> 缓存优化工具推荐</h2>
      <div class="tools-grid">
        <div v-for="(tool, index) in optimizationTools" :key="index" class="tool-card">
          <div class="tool-icon">{{ tool.icon }}</div>
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.description }}</p>
          <a :href="tool.link" target="_blank" class="tool-link">访问工具</a>
        </div>
      </div>
    </div>

    <footer class="cache-footer">
      <p> 前端性能优化指南 | 缓存技术是现代Web应用性能优化的关键</p>
      <p>使用合理的缓存策略可以将页面加载时间减少60%以上</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 缓存方法数据
const cachingMethods = ref([
  {
    id: 'http-cache',
    name: 'HTTP缓存',
    icon: '🌐',
    description: '利用HTTP协议内置的缓存机制，通过响应头控制资源的缓存行为',
    configuration: `
      <p>通过设置HTTP响应头来控制缓存行为：</p>
      <ul>
        <li><code>Cache-Control: max-age=31536000</code> - 资源有效期1年</li>
        <li><code>ETag</code> - 资源标识符，用于验证资源是否变更</li>
        <li><code>Expires</code> - 指定资源的过期时间（HTTP/1.0）</li>
        <li><code>Last-Modified</code> - 资源最后修改时间</li>
      </ul>
    `,
    configCode: `// Nginx 配置示例
location /static/ {
  # 设置缓存1年
  expires 1y;
  add_header Cache-Control "public, immutable";

  # 启用ETag验证
  etag on;
}`,
    useCases: [
      '静态资源（CSS、JS、图片、字体等）',
      '不经常变化的API响应',
      '内容稳定的页面',
      '公共库（如jQuery、Vue等）'
    ],
    pros: [
      '浏览器原生支持，无需额外代码',
      '性能开销几乎为零',
      '大幅减少重复请求',
      '有效降低服务器负载'
    ],
    cons: [
      '需要服务器配置支持',
      '缓存过期前无法更新文件',
      '需要版本控制或文件名哈希解决缓存问题',
      '不同浏览器实现可能有细微差异'
    ],
    chartData: [
      { label: '首次加载', value: 0, color: '#3498db' },
      { label: '重复访问', value: 95, color: '#2ecc71' },
      { label: '带宽节省', value: 90, color: '#9b59b6' }
    ]
  },
  {
    id: 'service-worker',
    name: 'Service Worker缓存',
    icon: '👷',
    description: '使用Service Worker拦截网络请求并提供缓存策略，实现离线体验',
    configuration: `
      <p>通过JavaScript注册Service Worker并实现缓存策略：</p>
      <ul>
        <li>注册Service Worker</li>
        <li>在install事件中缓存关键资源</li>
        <li>在fetch事件中拦截请求并返回缓存</li>
        <li>使用Cache API管理缓存存储</li>
      </ul>
    `,
    configCode: `// 注册Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('SW注册成功');
    });
}

// sw.js - 缓存策略示例
const CACHE_NAME = 'v1';
const urlsToCache = ['/', '/styles.css', '/app.js'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});`,
    useCases: [
      '渐进式Web应用(PWA)',
      '需要离线功能的场景',
      '对性能要求极高的应用',
      '单页面应用(SPA)',
      '需要后台同步的应用'
    ],
    pros: [
      '提供完全离线的能力',
      '细粒度的缓存控制',
      '支持后台同步和推送通知',
      '可编程的缓存策略',
      '提高重复访问性能'
    ],
    cons: [
      '需要HTTPS环境',
      '实现相对复杂',
      '缓存更新需要特殊处理',
      '首次加载需要额外下载Worker脚本',
      '浏览器兼容性问题（IE不支持）'
    ],
    chartData: [
      { label: '首次加载', value: 10, color: '#3498db' },
      { label: '重复访问', value: 98, color: '#2ecc71' },
      { label: '离线访问', value: 100, color: '#e74c3c' }
    ]
  },
  {
    id: 'local-storage',
    name: '本地存储',
    icon: '💾',
    description: '使用Web Storage API存储关键数据，减少网络请求',
    configuration: `
      <p>使用localStorage API存储和获取数据：</p>
      <ul>
        <li><code>localStorage.setItem(key, value)</code> - 存储数据</li>
        <li><code>localStorage.getItem(key)</code> - 获取数据</li>
        <li><code>localStorage.removeItem(key)</code> - 移除数据</li>
        <li><code>localStorage.clear()</code> - 清空所有数据</li>
      </ul>
    `,
    configCode: `// 存储数据
localStorage.setItem('userData', JSON.stringify({
  name: 'John',
  preferences: { theme: 'dark' }
}));

// 获取数据
const userData = JSON.parse(localStorage.getItem('userData'));

// 检查数据是否过期
const cacheTime = localStorage.getItem('cacheTime');
if (cacheTime && Date.now() - cacheTime > 24 * 60 * 60 * 1000) {
  localStorage.removeItem('userData');
}`,
    useCases: [
      '用户偏好设置',
      '应用状态持久化',
      '表单数据自动保存',
      '缓存小型API响应',
      '存储不敏感的用户数据'
    ],
    pros: [
      '简单的键值存储API',
      '几乎所有的浏览器都支持',
      '存储空间较大（约5-10MB）',
      '同步API，使用简单',
      '数据持久保留，直到手动清除'
    ],
    cons: [
      '仅存储字符串（需序列化）',
      '同步API可能会阻塞主线程',
      '不适合存储敏感数据',
      '无法在Web Workers中使用',
      '存储空间有限'
    ],
    chartData: [
      { label: '数据加载速度', value: 85, color: '#3498db' },
      { label: '减少API请求', value: 70, color: '#2ecc71' },
      { label: '存储容量', value: 65, color: '#f1c40f' }
    ]
  },
  {
    id: 'indexedDB',
    name: 'IndexedDB',
    icon: '🗃️',
    description: '客户端数据库，用于存储大量结构化数据',
    configuration: `
      <p>使用IndexedDB API存储结构化数据：</p>
      <ul>
        <li>打开/创建数据库</li>
        <li>创建对象存储空间（类似表）</li>
        <li>执行事务（读写操作）</li>
        <li>使用索引高效查询</li>
      </ul>
    `,
    configCode: `// 打开数据库
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // 创建对象存储
  const store = db.createObjectStore('products', {
    keyPath: 'id',
    autoIncrement: true
  });

  // 创建索引
  store.createIndex('category', 'category', { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;

  // 添加数据
  const tx = db.transaction('products', 'readwrite');
  const store = tx.objectStore('products');

  store.add({
    name: 'Laptop',
    price: 999,
    category: 'electronics'
  });

  tx.oncomplete = () => console.log('Data added');
};`,
    useCases: [
      '存储大型数据集',
      '需要复杂查询的应用',
      '离线数据访问',
      '缓存大量API响应',
      '客户端数据分析'
    ],
    pros: [
      '存储空间大（通常为50%磁盘空间）',
      '支持索引和高效查询',
      '异步API，不阻塞主线程',
      '支持事务处理',
      '可存储复杂数据类型'
    ],
    cons: [
      'API复杂，学习曲线陡峭',
      '需要手动处理版本迁移',
      '浏览器兼容性问题（旧浏览器支持有限）',
      '相比localStorage实现更复杂',
      '需要处理异步操作'
    ],
    chartData: [
      { label: '存储容量', value: 95, color: '#3498db' },
      { label: '查询性能', value: 80, color: '#2ecc71' },
      { label: '数据复杂度', value: 90, color: '#f1c40f' }
    ]
  }
]);

// 当前选中的缓存方法
const activeMethod = ref('http-cache');
const selectedMethod = computed(() =>
  cachingMethods.value.find(method => method.id === activeMethod.value)
);

// 策略指南
const strategyGuides = ref([
  {
    icon: '🚀',
    title: '静态资源',
    description: 'CSS、JS、图片等静态资源使用强缓存（Cache-Control: max-age）并添加文件哈希'
  },
  {
    icon: '📊',
    title: 'API响应',
    description: '动态API响应使用ETag/Last-Modified验证缓存，或短期缓存（max-age=60）'
  },
  {
    icon: '🔐',
    title: '用户数据',
    description: '用户偏好设置使用localStorage，大型用户数据使用IndexedDB'
  },
  {
    icon: '📱',
    title: '离线应用',
    description: 'PWA应用使用Service Worker预缓存关键资源，动态缓存API响应'
  }
]);

// 最佳实践
const bestPractices = ref([
  {
    title: '缓存分层策略',
    description: '针对不同资源类型采用不同缓存策略：静态资源长期缓存，API响应短期缓存'
  },
  {
    title: '内容哈希版本控制',
    description: '在文件名中添加内容哈希（如app.a3f8c9.js），实现永久缓存和即时更新'
  },
  {
    title: '缓存失效机制',
    description: '实现合理的缓存失效策略，如版本号、时间戳或主动通知更新'
  },
  {
    title: '缓存大小限制',
    description: '对Service Worker和IndexedDB设置缓存大小限制，避免过度占用用户存储'
  },
  {
    title: '渐进式缓存策略',
    description: '优先缓存关键资源，再逐步缓存非关键资源，确保首次加载速度'
  },
  {
    title: '缓存性能监控',
    description: '监控缓存命中率、节省带宽和加载时间，持续优化缓存策略'
  }
]);

// 优化工具
const optimizationTools = ref([
  {
    icon: '🔧',
    name: 'Webpack',
    description: '模块打包工具，内置内容哈希和资源缓存优化',
    link: 'https://webpack.js.org/'
  },
  {
    icon: '📊',
    name: 'Lighthouse',
    description: '自动化性能检测工具，提供缓存优化建议',
    link: 'https://developers.google.com/web/tools/lighthouse'
  },
  {
    icon: '🔄',
    name: 'Workbox',
    description: 'Google开发的Service Worker工具库，简化缓存策略实现',
    link: 'https://developers.google.com/web/tools/workbox'
  },
  {
    icon: '📦',
    name: 'IndexedDB Promised',
    description: 'IndexedDB的Promise封装，简化异步操作',
    link: 'https://github.com/jakearchibald/idb'
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;
@dark-color: #2c3e50;
@light-bg: #f8f9fa;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
@border-color: #e9ecef;
@text-color: #34495e;

.cache-optimization-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: @text-color;
  background: #fff;
  line-height: 1.6;
}

.cache-header {
  background: linear-gradient(135deg, #2c3e50, #1a2530);
  color: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, @primary-color, @success-color, @warning-color, @danger-color);
  }

  .header-content {
    max-width: 800px;
    margin: 0 auto 1.5rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.85;
      margin-bottom: 1.5rem;
    }
  }

  .performance-stats {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;

    .stat-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(5px);
      border-radius: 8px;
      padding: 1rem 1.5rem;
      min-width: 140px;
      text-align: center;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.25);
      }

      .stat-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
      }

      .stat-label {
        font-size: 0.9rem;
        opacity: 0.85;
      }
    }
  }
}

.methods-nav {
  display: flex;
  overflow-x: auto;
  gap: 0.8rem;
  padding: 0.5rem 0 1.5rem;
  margin-bottom: 1.5rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .method-btn {
    flex: none;
    background: @light-bg;
    border: 2px solid transparent;
    border-radius: 50px;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    transition: all 0.3s ease;
    box-shadow: @card-shadow;

    &:hover {
      background: darken(@light-bg, 5%);
    }

    &.active {
      color: white;
      border-color: white;
      background: @primary-color;
      box-shadow: 0 6px 12px rgba(52, 152, 219, 0.3);
    }

    .method-icon {
      font-size: 1.2rem;
    }
  }
}

.method-details {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: @card-shadow;

  .method-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid @border-color;

    h2 {
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }

    .method-description {
      font-size: 1.1rem;
      color: #7f8c8d;
      max-width: 800px;
      margin: 0 auto;
    }
  }

  .method-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.8rem;
    margin-bottom: 2.5rem;

    .detail-card {
      background: @light-bg;
      border-radius: 10px;
      padding: 1.8rem;
      box-shadow: @card-shadow;

      h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0;
        margin-bottom: 1.5rem;
        font-size: 1.3rem;
      }

      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 1.2rem;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: @primary-color;
            font-weight: bold;
          }
        }
      }

      .code-example {
        background: #2c3e50;
        border-radius: 8px;
        padding: 1.2rem;
        margin-top: 1.2rem;
        overflow-x: auto;

        pre {
          margin: 0;

          code {
            color: #f8f9fa;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    .pros,
    .cons {
      padding: 1rem;
      border-radius: 8px;

      h4 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0;
        margin-bottom: 1rem;
      }
    }

    .pros {
      background: rgba(@success-color, 0.1);
      border-left: 3px solid @success-color;

      h4 {
        color: darken(@success-color, 15%);
      }
    }

    .cons {
      background: rgba(@danger-color, 0.08);
      border-left: 3px solid @danger-color;

      h4 {
        color: darken(@danger-color, 10%);
      }
    }
  }

  .performance-chart {
    background: @light-bg;
    border-radius: 10px;
    padding: 1.8rem;
    margin-top: 1.5rem;

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0;
      margin-bottom: 1.5rem;
      text-align: center;
      justify-content: center;
    }

    .chart-container {
      display: flex;
      justify-content: center;
      height: 250px;
      gap: 3rem;
      align-items: flex-end;
      padding: 0 2rem 2rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid @border-color;

      .chart-bar {
        width: 80px;
        position: relative;
        border-radius: 8px 8px 0 0;
        transition: height 0.5s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        .bar-value {
          position: absolute;
          top: -30px;
          left: 0;
          right: 0;
          text-align: center;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .bar-label {
          position: absolute;
          bottom: -40px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.9rem;
        }
      }
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 4px;
      }
    }
  }
}

.strategy-guide {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: @card-shadow;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.8rem;
    text-align: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .strategy-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .strategy-card {
      background: @light-bg;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: @card-shadow;
      }

      .strategy-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      p {
        color: #7f8c8d;
        margin-bottom: 0;
      }
    }
  }
}

.best-practices {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: @card-shadow;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.8rem;
    text-align: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .practices-list {
    max-width: 800px;
    margin: 0 auto;

    .practice-item {
      display: flex;
      gap: 1.5rem;
      padding: 1.2rem 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }

      .practice-number {
        background: @primary-color;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: 700;
        flex-shrink: 0;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      p {
        color: #7f8c8d;
        margin-bottom: 0;
      }
    }
  }
}

.tools-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: @card-shadow;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.8rem;
    text-align: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .tool-card {
      background: @light-bg;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s;
      position: relative;
      padding-top: 3rem;

      &:hover {
        transform: translateY(-5px);
        box-shadow: @card-shadow;
      }

      .tool-icon {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        box-shadow: @card-shadow;
      }

      h3 {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }

      p {
        color: #7f8c8d;
        margin-bottom: 1.5rem;
      }

      .tool-link {
        display: inline-block;
        background: @primary-color;
        color: white;
        padding: 0.6rem 1.5rem;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        transition: background 0.3s;

        &:hover {
          background: darken(@primary-color, 10%);
        }
      }
    }
  }
}

.cache-footer {
  text-align: center;
  padding: 1.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  border-top: 1px solid @border-color;
}

// 响应式调整
@media (max-width: 768px) {
  .cache-header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }

    .performance-stats {
      flex-direction: column;
      align-items: center;

      .stat-card {
        width: 100%;
        max-width: 250px;
      }
    }
  }

  .method-grid,
  .pros-cons {
    grid-template-columns: 1fr !important;
  }

  .strategy-grid,
  .tools-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .chart-container {
    gap: 1.5rem !important;

    .chart-bar {
      width: 60px !important;
    }
  }
}

@media (max-width: 480px) {
  .cache-header {
    padding: 1.2rem;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .methods-nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  .detail-card {
    padding: 1.2rem !important;
  }

  .practice-item {
    flex-direction: column;
    text-align: center;

    .practice-number {
      margin: 0 auto;
    }
  }
}
</style>
