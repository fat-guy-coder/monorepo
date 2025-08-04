<template>
  <div class="workbox-container">
    <header class="header">
      <h1>Workbox Webpack Plugin 基础介绍</h1>
      <p class="subtitle">现代PWA应用的离线缓存解决方案</p>
    </header>

    <div class="card">
      <h2><i class="icon icon-intro"></i> Workbox 是什么？</h2>
      <div class="intro-content">
        <div class="intro-text">
          <p>Workbox 是由 Google 开发的一套用于构建渐进式 Web 应用（PWA）的 JavaScript 库集合。</p>
          <p><strong>workbox-webpack-plugin</strong> 是 Workbox 的 Webpack 插件，它简化了在 Webpack 构建流程中集成 Workbox 的过程。</p>
        </div>
        <div class="intro-features">
          <div class="feature">
            <i class="icon icon-offline"></i>
            <span>离线体验</span>
          </div>
          <div class="feature">
            <i class="icon icon-cache"></i>
            <span>智能缓存</span>
          </div>
          <div class="feature">
            <i class="icon icon-sync"></i>
            <span>后台同步</span>
          </div>
          <div class="feature">
            <i class="icon icon-push"></i>
            <span>推送通知</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2><i class="icon icon-why"></i> 为什么要使用 Workbox？</h2>
      <div class="benefits">
        <div class="benefit">
          <div class="benefit-icon">
            <i class="icon icon-rocket"></i>
          </div>
          <div class="benefit-content">
            <h3>提升加载性能</h3>
            <p>通过缓存策略减少网络请求，显著提升页面加载速度</p>
          </div>
        </div>

        <div class="benefit">
          <div class="benefit-icon">
            <i class="icon icon-offline"></i>
          </div>
          <div class="benefit-content">
            <h3>完整的离线体验</h3>
            <p>即使在网络不可用的情况下也能访问应用</p>
          </div>
        </div>

        <div class="benefit">
          <div class="benefit-icon">
            <i class="icon icon-update"></i>
          </div>
          <div class="benefit-content">
            <h3>智能资源更新</h3>
            <p>自动检测资源变更并更新缓存</p>
          </div>
        </div>

        <div class="benefit">
          <div class="benefit-icon">
            <i class="icon icon-pwa"></i>
          </div>
          <div class="benefit-content">
            <h3>简化 PWA 开发</h3>
            <p>提供开箱即用的 PWA 功能实现</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2><i class="icon icon-config"></i> 核心配置参数</h2>
      <div class="params-table">
        <div class="param-header">
          <div class="param-name">参数</div>
          <div class="param-type">类型</div>
          <div class="param-desc">描述</div>
          <div class="param-default">默认值</div>
        </div>

        <div class="param-row">
          <div class="param-name"><code>clientsClaim</code></div>
          <div class="param-type">boolean</div>
          <div class="param-desc">Service Worker 激活后立即控制所有客户端</div>
          <div class="param-default"><code>false</code></div>
        </div>

        <div class="param-row">
          <div class="param-name"><code>skipWaiting</code></div>
          <div class="param-type">boolean</div>
          <div class="param-desc">Service Worker 安装后立即激活</div>
          <div class="param-default"><code>false</code></div>
        </div>

        <div class="param-row">
          <div class="param-name"><code>exclude</code></div>
          <div class="param-type">Array&lt;RegExp|string&gt;</div>
          <div class="param-desc">排除不需要缓存的资源</div>
          <div class="param-default"><code>[]</code></div>
        </div>

        <div class="param-row">
          <div class="param-name"><code>runtimeCaching</code></div>
          <div class="param-type">Array&lt;Object&gt;</div>
          <div class="param-desc">定义运行时缓存策略</div>
          <div class="param-default"><code>[]</code></div>
        </div>

        <div class="param-row">
          <div class="param-name"><code>swDest</code></div>
          <div class="param-type">string</div>
          <div class="param-desc">生成的 Service Worker 文件路径</div>
          <div class="param-default"><code>'service-worker.js'</code></div>
        </div>

        <div class="param-row">
          <div class="param-name"><code>maximumFileSizeToCacheInBytes</code></div>
          <div class="param-type">number</div>
          <div class="param-desc">最大缓存文件大小（字节）</div>
          <div class="param-default"><code>2097152</code> (2MB)</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2><i class="icon icon-cache"></i> 缓存策略基础介绍</h2>
      <div class="cache-strategies">
        <div class="strategy">
          <div class="strategy-header">
            <h3>StaleWhileRevalidate</h3>
            <div class="strategy-tag">推荐</div>
          </div>
          <div class="strategy-desc">
            <p>优先使用缓存响应，同时在后台更新缓存</p>
            <p><strong>适用场景：</strong> 频繁更新的资源（如API数据）</p>
          </div>
          <pre class="code-block">runtimeCaching: [{
  urlPattern: /\/api\/.*/,
  handler: 'StaleWhileRevalidate',
  options: {
    cacheName: 'api-cache',
    expiration: { maxEntries: 50 }
  }
}]</pre>
        </div>

        <div class="strategy">
          <div class="strategy-header">
            <h3>CacheFirst</h3>
            <div class="strategy-tag">静态资源</div>
          </div>
          <div class="strategy-desc">
            <p>优先使用缓存，无缓存时请求网络并缓存</p>
            <p><strong>适用场景：</strong> 静态资源（如图片、字体）</p>
          </div>
          <pre class="code-block">runtimeCaching: [{
  urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
  handler: 'CacheFirst',
  options: {
    cacheName: 'image-cache',
    expiration: { maxEntries: 100 }
  }
}]</pre>
        </div>

        <div class="strategy">
          <div class="strategy-header">
            <h3>NetworkFirst</h3>
            <div class="strategy-tag">重要内容</div>
          </div>
          <div class="strategy-desc">
            <p>优先请求网络，失败时使用缓存</p>
            <p><strong>适用场景：</strong> 需要最新内容（如文章页面）</p>
          </div>
          <pre class="code-block">runtimeCaching: [{
  urlPattern: /\.html$/,
  handler: 'NetworkFirst',
  options: {
    cacheName: 'html-cache',
    networkTimeoutSeconds: 3
  }
}]</pre>
        </div>

        <div class="strategy">
          <div class="strategy-header">
            <h3>NetworkOnly</h3>
            <div class="strategy-tag">实时数据</div>
          </div>
          <div class="strategy-desc">
            <p>只从网络请求，不使用缓存</p>
            <p><strong>适用场景：</strong> 实时数据（如股票行情）</p>
          </div>
          <pre class="code-block">runtimeCaching: [{
  urlPattern: /\/real-time\/.*/,
  handler: 'NetworkOnly'
}]</pre>
        </div>
      </div>
    </div>

    <div class="card">
      <h2><i class="icon icon-scene"></i> 使用场景</h2>
      <div class="usage-scenarios">
        <div class="scenario">
          <div class="scenario-icon">
            <i class="icon icon-ecommerce"></i>
          </div>
          <div class="scenario-content">
            <h3>电子商务网站</h3>
            <ul>
              <li>缓存产品图片和描述</li>
              <li>离线浏览产品目录</li>
              <li>后台同步购物车操作</li>
            </ul>
          </div>
        </div>

        <div class="scenario">
          <div class="scenario-icon">
            <i class="icon icon-news"></i>
          </div>
          <div class="scenario-content">
            <h3>新闻/博客应用</h3>
            <ul>
              <li>离线阅读已加载的文章</li>
              <li>缓存最新文章列表</li>
              <li>推送新文章通知</li>
            </ul>
          </div>
        </div>

        <div class="scenario">
          <div class="scenario-icon">
            <i class="icon icon-map"></i>
          </div>
          <div class="scenario-content">
            <h3>地图/导航应用</h3>
            <ul>
              <li>离线访问地图区域</li>
              <li>缓存导航路线</li>
              <li>后台更新位置数据</li>
            </ul>
          </div>
        </div>

        <div class="scenario">
          <div class="scenario-icon">
            <i class="icon icon-dashboard"></i>
          </div>
          <div class="scenario-content">
            <h3>仪表盘应用</h3>
            <ul>
              <li>缓存静态资源加速加载</li>
              <li>后台同步用户操作</li>
              <li>离线查看历史数据</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2><i class="icon icon-setup"></i> 安装与配置</h2>
      <div class="setup-steps">
        <div class="step">
          <div class="step-header">
            <div class="step-number">1</div>
            <h3>安装依赖</h3>
          </div>
          <pre class="code-block">npm install workbox-webpack-plugin --save-dev</pre>
        </div>

        <div class="step">
          <div class="step-header">
            <div class="step-number">2</div>
            <h3>配置 webpack.config.js</h3>
          </div>
          <pre class="code-block">const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  // ...其他配置
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 100 }
        }
      }, {
        urlPattern: /\.(?:js|css)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources'
        }
      }]
    })
  ]
};</pre>
        </div>

        <div class="step">
          <div class="step-header">
            <div class="step-number">3</div>
            <h3>注册 Service Worker</h3>
          </div>
          <pre class="code-block">// 在入口文件中
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      }).catch(error => {
        console.log('SW registration failed: ', error);
      });
  });
}</pre>
        </div>
      </div>
    </div>

    <div class="card">
      <h2><i class="icon icon-tips"></i> 最佳实践与技巧</h2>
      <div class="tips">
        <div class="tip">
          <div class="tip-icon">
            <i class="icon icon-lightbulb"></i>
          </div>
          <div class="tip-content">
            <h3>版本控制</h3>
            <p>在缓存名称中加入版本号，便于缓存更新管理</p>
            <pre class="code-inline">cacheName: 'my-cache-v1'</pre>
          </div>
        </div>

        <div class="tip">
          <div class="tip-icon">
            <i class="icon icon-lightbulb"></i>
          </div>
          <div class="tip-content">
            <h3>缓存清理</h3>
            <p>使用 expiration 选项限制缓存条目，避免过度占用存储</p>
            <pre class="code-inline">expiration: { maxEntries: 100 }</pre>
          </div>
        </div>

        <div class="tip">
          <div class="tip-icon">
            <i class="icon icon-lightbulb"></i>
          </div>
          <div class="tip-content">
            <h3>预缓存策略</h3>
            <p>使用 InjectManifest 插件精确控制预缓存资源</p>
            <pre class="code-inline">new InjectManifest({ swSrc: './src/sw.js' })</pre>
          </div>
        </div>

        <div class="tip">
          <div class="tip-icon">
            <i class="icon icon-lightbulb"></i>
          </div>
          <div class="tip-content">
            <h3>开发环境处理</h3>
            <p>在开发环境中禁用 Workbox 避免缓存干扰</p>
            <pre class="code-inline">plugins: process.env.NODE_ENV === 'production' ? [new GenerateSW()] : []</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 响应式数据示例
const activeStrategy = ref('StaleWhileRevalidate');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #4285f4;
  --primary-light: #8ab4f8;
  --secondary: #34a853;
  --accent: #fbbc05;
  --error: #ea4335;
  --text: #202124;
  --text-light: #5f6368;
  --bg: #f8f9fa;
  --card-bg: #ffffff;
  --border: #dadce0;
  --shadow: rgba(0, 0, 0, 0.05);
  --success: #34a853;
  --warning: #fbbc05;
  --code-bg: #f1f3f4;
  --icon-bg: #e8f0fe;
  --table-header: #f1f3f4;
  --strategy-1: #e8f0fe;
  --strategy-2: #e6f4ea;
  --strategy-3: #fef7e0;
  --strategy-4: #fce8e6;
}

.workbox-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--text);
  background-color: var(--bg);
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  border-radius: 12px;
  color: white;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    font-weight: 400;
    opacity: 0.9;
  }
}

.card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 5px 15px var(--shadow);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  h2 {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: var(--text);
    padding-bottom: 0.8rem;
    border-bottom: 2px solid var(--primary);

    .icon {
      margin-right: 12px;
      background: var(--icon-bg);
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-weight: 600;
    }
  }
}

.intro-content {
  display: flex;
  gap: 2rem;

  .intro-text {
    flex: 1;

    p {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      line-height: 1.7;

      &:last-child {
        margin-bottom: 0;
      }

      strong {
        color: var(--primary);
      }
    }
  }

  .intro-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    min-width: 250px;

    .feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border-radius: 8px;
      background: white;
      border: 1px solid var(--border);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        color: var(--primary);
      }

      span {
        font-weight: 500;
      }
    }
  }
}

.benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .benefit {
    display: flex;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 10px;
    background: linear-gradient(to bottom right, #f0f9ff, #e0f2fe);
    border: 1px solid rgba(66, 133, 244, 0.15);

    .benefit-icon {
      .icon {
        background: var(--icon-bg);
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
        font-size: 1.5rem;
        font-weight: bold;
      }
    }

    .benefit-content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.5rem;
        color: var(--text);
      }

      p {
        color: var(--text-light);
        font-size: 0.95rem;
      }
    }
  }
}

.params-table {
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .param-header {
    display: grid;
    grid-template-columns: 1.5fr 1fr 2.5fr 1fr;
    background: var(--table-header);
    color: var(--primary);
    font-weight: 600;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .param-row {
    display: grid;
    grid-template-columns: 1.5fr 1fr 2.5fr 1fr;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);

    &:nth-child(odd) {
      background: rgba(66, 133, 244, 0.03);
    }

    &:last-child {
      border-bottom: none;
    }

    .param-name {
      font-weight: 600;
      color: var(--text);

      code {
        background: rgba(66, 133, 244, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
      }
    }

    .param-type {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: var(--text-light);
    }

    .param-desc {
      color: var(--text);
      font-size: 0.95rem;
    }

    .param-default {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      color: var(--text-light);

      code {
        background: var(--code-bg);
        padding: 2px 6px;
        border-radius: 4px;
      }
    }
  }
}

.cache-strategies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .strategy {
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border);
    background: white;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    &:nth-child(1) {
      border-top: 4px solid var(--primary);
    }

    &:nth-child(2) {
      border-top: 4px solid var(--secondary);
    }

    &:nth-child(3) {
      border-top: 4px solid var(--accent);
    }

    &:nth-child(4) {
      border-top: 4px solid var(--error);
    }

    .strategy-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem;
      background: rgba(66, 133, 244, 0.03);
      border-bottom: 1px solid var(--border);

      h3 {
        font-size: 1.3rem;
        margin: 0;
        color: var(--text);
      }

      .strategy-tag {
        background: rgba(66, 133, 244, 0.1);
        color: var(--primary);
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }

    .strategy-desc {
      padding: 1.2rem;

      p {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;

        &:last-child {
          margin-bottom: 0;
        }

        strong {
          color: var(--primary);
        }
      }
    }
  }
}

.usage-scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  .scenario {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem;
    border-radius: 10px;
    background: white;
    border: 1px solid var(--border);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .scenario-icon {
      .icon {
        background: var(--icon-bg);
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
        font-size: 1.8rem;
        font-weight: bold;
      }
    }

    .scenario-content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        margin-bottom: 0.8rem;
        color: var(--text);
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 0.4rem 0;
          position: relative;
          padding-left: 20px;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: bold;
          }
        }
      }
    }
  }
}

.setup-steps {
  .step {
    margin-bottom: 2rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    overflow: hidden;

    &:last-child {
      margin-bottom: 0;
    }

    .step-header {
      display: flex;
      align-items: center;
      padding: 1.2rem;
      background: rgba(66, 133, 244, 0.05);
      border-bottom: 1px solid var(--border);

      .step-number {
        width: 32px;
        height: 32px;
        background: var(--primary);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 12px;
      }

      h3 {
        font-size: 1.3rem;
        margin: 0;
        color: var(--text);
      }
    }
  }
}

.tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  .tip {
    display: flex;
    gap: 1.2rem;
    padding: 1.5rem;
    border-radius: 10px;
    background: white;
    border: 1px solid var(--border);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

    .tip-icon {
      .icon {
        color: var(--accent);
        font-size: 1.8rem;
        min-width: 40px;
      }
    }

    .tip-content {
      flex: 1;

      h3 {
        font-size: 1.2rem;
        margin-bottom: 0.8rem;
        color: var(--text);
      }

      p {
        margin-bottom: 0.5rem;
        color: var(--text);
      }
    }
  }
}

.code-block {
  display: block;
  background: var(--code-bg);
  border-radius: 8px;
  padding: 1.2rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid var(--border);
  color: var(--text);
  line-height: 1.5;
}

.code-inline {
  display: inline-block;
  background: var(--code-bg);
  border-radius: 4px;
  padding: 0.2rem 0.4rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  border: 1px solid var(--border);
  color: var(--text);
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .card {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
    }
  }

  .intro-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .params-table {

    .param-header,
    .param-row {
      grid-template-columns: 1fr;
      padding: 0.8rem;

      &>div {
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
