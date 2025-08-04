<template>
  <div class="cache-strategy-container">
    <header class="header">
      <h1>浏览器缓存策略基础介绍</h1>
      <p>优化网页加载速度的关键技术</p>
    </header>

    <div class="intro-section">
      <div class="cache-flow">
        <div class="cache-flow-diagram">
          <div class="step">
            <div class="step-icon">1</div>
            <div class="step-text">浏览器发起请求</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">2</div>
            <div class="step-text">检查强缓存</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">3</div>
            <div class="step-text">检查协商缓存</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">4</div>
            <div class="step-text">Service Worker</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-icon">5</div>
            <div class="step-text">发送服务器请求</div>
          </div>
        </div>
      </div>

      <div class="intro-text">
        <h2>缓存策略概述</h2>
        <p>浏览器缓存是提升网页性能的关键技术，通过将资源存储在本地，减少网络请求，从而加快页面加载速度。</p>
        <p>主要缓存策略包括：</p>
        <ul>
          <li><strong>强缓存</strong> - 不发送请求，直接使用本地缓存</li>
          <li><strong>协商缓存</strong> - 向服务器验证资源是否过期</li>
          <li><strong>Service Worker 缓存</strong> - 完全控制缓存策略</li>
        </ul>
      </div>
    </div>

    <div class="strategies">
      <!-- 强缓存 -->
      <div class="strategy-card strategy-strong">
        <div class="strategy-header">
          <div class="icon-box">
            <svg-icon name="strong-cache" />
          </div>
          <h2>强缓存</h2>
          <div class="storage-location">内存/磁盘</div>
        </div>

        <div class="strategy-content">
          <h3>配置方法</h3>
          <div class="code-block">
            <pre>// HTTP 响应头设置
Cache-Control: max-age=31536000
Expires: Wed, 21 Oct 2025 07:28:00 GMT</pre>
          </div>

          <div class="details-grid">
            <div class="detail-item">
              <h4>使用场景</h4>
              <ul>
                <li>静态资源（JS、CSS、图片）</li>
                <li>长期不变的资源</li>
                <li>版本控制的文件</li>
              </ul>
            </div>

            <div class="detail-item">
              <h4>优点</h4>
              <ul>
                <li>加载速度最快</li>
                <li>减少服务器压力</li>
                <li>节省带宽</li>
              </ul>
            </div>

            <div class="detail-item">
              <h4>缺点</h4>
              <ul>
                <li>资源更新不及时</li>
                <li>需要版本控制解决缓存问题</li>
                <li>缓存时间设置不当会导致问题</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 协商缓存 -->
      <div class="strategy-card strategy-negotiate">
        <div class="strategy-header">
          <div class="icon-box">
            <svg-icon name="negotiate-cache" />
          </div>
          <h2>协商缓存</h2>
          <div class="storage-location">内存/磁盘</div>
        </div>

        <div class="strategy-content">
          <h3>配置方法</h3>
          <div class="code-block">
            <pre>// HTTP 响应头设置
Cache-Control: no-cache
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 21 Oct 2022 07:28:00 GMT</pre>
          </div>

          <div class="details-grid">
            <div class="detail-item">
              <h4>使用场景</h4>
              <ul>
                <li>频繁更新的资源</li>
                <li>HTML文件</li>
                <li>需要实时性的数据</li>
              </ul>
            </div>

            <div class="detail-item">
              <h4>优点</h4>
              <ul>
                <li>资源更新及时</li>
                <li>比强缓存更灵活</li>
                <li>节省带宽（304响应）</li>
              </ul>
            </div>

            <div class="detail-item">
              <h4>缺点</h4>
              <ul>
                <li>仍需要向服务器发起请求</li>
                <li>缓存失效需要额外请求</li>
                <li>配置相对复杂</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Worker缓存 -->
      <div class="strategy-card strategy-sw">
        <div class="strategy-header">
          <div class="icon-box">
            <svg-icon name="sw-cache" />
          </div>
          <h2>Service Worker 缓存</h2>
          <div class="storage-location">独立存储区</div>
        </div>

        <div class="strategy-content">
          <h3>配置方法</h3>
          <div class="code-block">
            <pre>// 注册 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// sw.js 示例
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});</pre>
          </div>

          <div class="details-grid">
            <div class="detail-item">
              <h4>使用场景</h4>
              <ul>
                <li>离线应用</li>
                <li>渐进式Web应用(PWA)</li>
                <li>需要精细控制缓存的场景</li>
              </ul>
            </div>

            <div class="detail-item">
              <h4>优点</h4>
              <ul>
                <li>完全控制缓存策略</li>
                <li>支持离线访问</li>
                <li>可编程缓存管理</li>
              </ul>
            </div>

            <div class="detail-item">
              <h4>缺点</h4>
              <ul>
                <li>实现复杂</li>
                <li>需要HTTPS</li>
                <li>更新机制需要额外处理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2>缓存策略对比</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>策略类型</th>
              <th>存储位置</th>
              <th>网络请求</th>
              <th>更新机制</th>
              <th>适用场景</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>强缓存</td>
              <td>内存缓存/磁盘缓存</td>
              <td>无请求</td>
              <td>过期时间</td>
              <td>静态资源、长期不变内容</td>
            </tr>
            <tr>
              <td>协商缓存</td>
              <td>内存缓存/磁盘缓存</td>
              <td>有条件请求(304)</td>
              <td>校验ETag/Last-Modified</td>
              <td>HTML、频繁更新资源</td>
            </tr>
            <tr>
              <td>Service Worker</td>
              <td>独立缓存存储</td>
              <td>可完全控制</td>
              <td>编程控制</td>
              <td>PWA、离线应用</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="best-practices">
      <h2>最佳实践建议</h2>
      <div class="practices-grid">
        <div class="practice-card">
          <div class="practice-icon">1</div>
          <h3>静态资源</h3>
          <p>使用强缓存 + 文件名哈希（如app.a1b2c3.js）</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">2</div>
          <h3>HTML文件</h3>
          <p>使用协商缓存（no-cache）或短时间强缓存</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">3</div>
          <h3>API请求</h3>
          <p>根据需求使用Cache-Control: no-store或max-age=0</p>
        </div>
        <div class="practice-card">
          <div class="practice-icon">4</div>
          <h3>离线应用</h3>
          <p>使用Service Worker实现离线缓存和资源预加载</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑，但当前组件主要是展示
import { ref } from 'vue';

// 示例数据
const cacheStrategies = ref([
  {
    type: '强缓存',
    location: '内存/磁盘',
    request: '无请求',
    update: '过期时间',
    useCase: '静态资源、长期不变内容'
  },
  // 其他策略...
]);
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #4361ee;
  --secondary: #3f37c9;
  --success: #4cc9f0;
  --info: #4895ef;
  --warning: #f72585;
  --danger: #e63946;
  --light: #f8f9fa;
  --dark: #212529;
  --gray: #6c757d;
  --light-gray: #e9ecef;
}

.cache-strategy-container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #4361ee, var(--secondary));

  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(67, 97, 238, 0.15);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.intro-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .cache-flow {
    flex: 1;

    .cache-flow-diagram {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .step {
        text-align: center;

        .step-icon {
          width: 50px;
          height: 50px;
          background: #4361ee;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin: 0 auto 10px;
        }

        .step-text {
          font-weight: 500;
        }
      }

      .arrow {
        font-size: 1.5rem;
        color: var(--gray);
        margin: 0 -10px;
      }
    }
  }

  .intro-text {
    flex: 1;

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #4361ee;
    }

    p {
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
    }
  }
}

.strategies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.strategy-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }

  .strategy-header {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    color: white;

    .icon-box {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;

      svg {
        width: 30px;
        height: 30px;
      }
    }

    h2 {
      font-size: 1.5rem;
      margin: 0;
      flex: 1;
    }

    .storage-location {
      background: rgba(0, 0, 0, 0.1);
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.9rem;
    }
  }

  .strategy-content {
    padding: 1.5rem;

    h3 {
      font-size: 1.2rem;
      color: #4361ee;
      margin-top: 0;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--light-gray);
      padding-bottom: 0.5rem;
    }

    .code-block {
      background: #2d3748;
      color: #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      font-family: 'Consolas', monospace;
      font-size: 0.9rem;
      overflow-x: auto;

      pre {
        margin: 0;
      }
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;

      .detail-item {
        h4 {
          margin-top: 0;
          margin-bottom: 0.8rem;
          color: var(--secondary);
          font-size: 1.1rem;
        }

        ul {
          padding-left: 1.2rem;
          margin: 0;

          li {
            margin-bottom: 0.5rem;
            line-height: 1.4;
          }
        }
      }
    }
  }
}

.strategy-strong .strategy-header {
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
}

.strategy-negotiate .strategy-header {
  background: linear-gradient(135deg, #4cc9f0, #4895ef);
}

.strategy-sw .strategy-header {
  background: linear-gradient(135deg, #f72585, #b5179e);
}

.comparison-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;

  h2 {
    text-align: center;
    color: #4361ee;
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--light-gray);
      }

      th {
        background: #4361ee;
        color: white;
        font-weight: 500;
      }

      tbody tr:nth-child(even) {
        background: rgba(67, 97, 238, 0.05);
      }

      tbody tr:hover {
        background: rgba(67, 97, 238, 0.1);
      }
    }
  }
}

.best-practices {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h2 {
    text-align: center;
    color: #4361ee;
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;

    .practice-card {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .practice-icon {
        width: 50px;
        height: 50px;
        background: #4361ee;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin: 0 auto 1rem;
      }

      h3 {
        color: var(--secondary);
        margin-top: 0;
        margin-bottom: 1rem;
      }

      p {
        margin: 0;
        line-height: 1.5;
      }
    }
  }
}

@media (max-width: 768px) {
  .intro-section {
    flex-direction: column;
  }

  .cache-flow-diagram {
    flex-wrap: wrap;
    justify-content: center !important;

    .step,
    .arrow {
      margin: 10px;
    }
  }

  .strategies {
    grid-template-columns: 1fr;
  }
}
</style>
