<template>
  <div class="service-worker-container">
    <div class="header">
      <h1>Service Worker 技术基础介绍</h1>
      <p class="subtitle">构建离线优先的现代 Web 应用</p>
    </div>

    <div class="content">
      <section class="concept-section">
        <h2 class="section-title">什么是 Service Worker？</h2>
        <div class="concept-card">
          <div class="concept-desc">
            <p>Service Worker 是一种运行在浏览器后台的脚本，独立于网页，为现代 Web 应用提供了强大的功能支持：</p>
            <ul>
              <li><span class="highlight">独立的执行环境</span> - 在浏览器后台运行，不阻塞主线程</li>
              <li><span class="highlight">网络代理</span> - 拦截和处理网络请求</li>
              <li><span class="highlight">离线支持</span> - 缓存资源提供离线访问能力</li>
              <li><span class="highlight">事件驱动</span> - 响应推送通知和后台同步</li>
              <li><span class="highlight">安全限制</span> - 仅在 HTTPS 或 localhost 环境下工作</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="use-cases">
        <h2 class="section-title">Service Worker 使用场景</h2>
        <div class="cases-grid">
          <div class="case-card">
            <div class="case-icon offline"></div>
            <h3>离线应用</h3>
            <p>缓存关键资源，在网络不可用时提供基本功能</p>
          </div>
          <div class="case-card">
            <div class="case-icon performance"></div>
            <h3>性能优化</h3>
            <p>缓存静态资源，减少网络请求，提升加载速度</p>
          </div>
          <div class="case-card">
            <div class="case-icon push"></div>
            <h3>推送通知</h3>
            <p>即使用户关闭了浏览器也能接收通知</p>
          </div>
          <div class="case-card">
            <div class="case-icon background"></div>
            <h3>后台同步</h3>
            <p>在后台同步数据，确保用户操作不会丢失</p>
          </div>
        </div>
      </section>

      <section class="implementation">
        <h2 class="section-title">Service Worker 实现</h2>

        <div class="code-section">
          <h3>1. 注册 Service Worker</h3>
          <pre class="code-block"><code>// main.ts 或 App.vue
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        '/service-worker.js',
        { scope: '/' }
      );

      console.log('ServiceWorker 注册成功: ', registration);

      // 检查更新
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('发现新版本: ', newWorker);
      });
    } catch (error) {
      console.error('ServiceWorker 注册失败: ', error);
    }
  });
}</code></pre>
        </div>

        <div class="code-section">
          <h3>2. Service Worker 文件示例 (service-worker.js)</h3>
          <pre class="code-block"><code>// 定义缓存名称和要缓存的资源
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

// 安装阶段 - 缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('已打开缓存');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活阶段 - 清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1 {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求 - 缓存优先策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有资源，则返回缓存
        if (response) {
          return response;
        }

        // 否则从网络请求
        return fetch(event.request).then(response => {
          // 检查是否收到有效响应
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 克隆响应
          const responseToCache = response.clone();

          // 将新资源添加到缓存
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});</code></pre>
        </div>

        <div class="code-section">
          <h3>3. Vue 项目集成配置</h3>
          <pre class="code-block"><code>// vue.config.js
const { defineConfig } = require('@vue/cli-service');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30天
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.example\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      })
    ]
  }
});</code></pre>
        </div>
      </section>

      <section class="best-practices">
        <h2 class="section-title">最佳实践</h2>
        <div class="practices-list">
          <div class="practice-item">
            <div class="practice-number">1</div>
            <div>
              <h3>缓存策略选择</h3>
              <p>根据资源类型选择合适的缓存策略：</p>
              <ul>
                <li><strong>CacheFirst</strong>: 静态资源（CSS, JS, 图片）</li>
                <li><strong>StaleWhileRevalidate</strong>: 频繁更新的API数据</li>
                <li><strong>NetworkFirst</strong>: 关键实时数据</li>
              </ul>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-number">2</div>
            <div>
              <h3>缓存版本管理</h3>
              <p>每次更新应用时更新缓存名称，确保用户获取最新资源</p>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-number">3</div>
            <div>
              <h3>缓存清理</h3>
              <p>在activate事件中清理旧缓存，避免占用过多存储空间</p>
            </div>
          </div>

          <div class="practice-item">
            <div class="practice-number">4</div>
            <div>
              <h3>用户体验</h3>
              <p>当有新版本时，提示用户刷新页面获取更新</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // 模拟注册Service Worker的状态
  console.log('Service Worker 文档已加载');
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@light-bg: #f8f9fa;
@dark-bg: #2c3e50;
@text-color: #34495e;
@border-color: #e0e0e0;

.service-worker-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @dark-bg, lighten(@dark-bg, 10%));
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.section-title {
  font-size: 1.8rem;
  margin: 2.5rem 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid @accent-color;
  color: @secondary-color;
}

.concept-section {
  margin-bottom: 3rem;

  .concept-card {
    display: flex;
    gap: 2rem;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .concept-visual {
    flex: 1;
    padding: 1.5rem;
    background: lighten(@primary-color, 45%);
    display: flex;
    align-items: center;
    justify-content: center;

    .sw-diagram {
      position: relative;
      width: 100%;
      height: 300px;

      >div {
        position: absolute;
        padding: 12px 20px;
        border-radius: 8px;
        text-align: center;
        font-weight: bold;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      }

      .browser {
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 180px;
        background: @accent-color;
        color: white;
      }

      .network {
        top: 120px;
        left: 20%;
        background: #9b59b6;
        color: white;
      }

      .server {
        top: 120px;
        right: 20%;
        background: #e74c3c;
        color: white;
      }

      .sw {
        top: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: @primary-color;
        color: white;
        width: 200px;
      }

      .cache {
        top: 220px;
        left: 50%;
        transform: translateX(-50%);
        background: #f39c12;
        color: white;
      }

      .line {
        position: absolute;
        height: 2px;
        background: #7f8c8d;
        transform-origin: left center;

        &.br-sw {
          top: 70px;
          left: 50%;
          width: 0;
          height: 50px;
          transform: translateX(-50%);
        }

        &.sw-cache {
          top: 170px;
          left: 50%;
          width: 0;
          height: 50px;
          transform: translateX(-50%);
        }

        &.sw-network {
          top: 140px;
          left: 50%;
          width: 25%;
          transform: translate(0, -50%) rotate(-30deg);
        }

        &.network-server {
          top: 140px;
          left: 50%;
          width: 50%;
          transform: translate(0, -50%);
        }
      }
    }
  }

  .concept-desc {
    flex: 1;
    padding: 2rem;

    p {
      margin-bottom: 1.5rem;
    }

    ul {
      list-style-type: none;
      padding-left: 0;

      li {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
        position: relative;

        &:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: @accent-color;
          font-weight: bold;
        }
      }
    }

    .highlight {
      background: lighten(@accent-color, 40%);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-weight: 600;
    }
  }
}

.use-cases {
  margin-bottom: 3rem;

  .cases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .case-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    h3 {
      color: @primary-color;
      margin: 1rem 0 0.5rem;
    }

    p {
      color: lighten(@text-color, 20%);
      font-size: 0.95rem;
    }

    .case-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: @light-bg;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin-bottom: 1rem;

      &.offline:before {
        content: "📶";
      }

      &.performance:before {
        content: "⚡";
      }

      &.push:before {
        content: "🔔";
      }

      &.background:before {
        content: "🔄";
      }
    }
  }
}

.implementation {
  background: @light-bg;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;

  .code-section {
    margin-bottom: 2.5rem;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    h3 {
      background: @secondary-color;
      color: white;
      padding: 0.8rem 1.5rem;
      margin: 0;
      font-size: 1.2rem;
    }
  }

  .code-block {
    margin: 0;
    padding: 1.5rem;
    background: #2d2d2d;
    color: #f8f8f2;
    overflow-x: auto;
    font-family: 'Fira Code', 'Courier New', monospace;
    font-size: 0.95rem;
    border-radius: 0 0 8px 8px;

    code {
      display: block;
      line-height: 1.5;

      .comment {
        color: #75715e;
      }

      .keyword {
        color: #f92672;
      }

      .string {
        color: #a6e22e;
      }

      .function {
        color: #66d9ef;
      }

      .variable {
        color: #fd971f;
      }
    }
  }
}

.best-practices {
  .practices-list {
    display: grid;
    gap: 1.5rem;
  }

  .practice-item {
    display: flex;
    gap: 1.5rem;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }

    .practice-number {
      width: 40px;
      height: 40px;
      background: @primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 0.8rem;
      color: @secondary-color;
    }

    ul {
      margin-top: 0.5rem;
      padding-left: 1.2rem;

      li {
        margin-bottom: 0.4rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .section-title {
    font-size: 1.5rem;
  }

  .concept-card {
    flex-direction: column;
  }
}
</style>
