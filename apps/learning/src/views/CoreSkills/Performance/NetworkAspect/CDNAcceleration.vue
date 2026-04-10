<template>
  <div class="cdn-container">
    <header class="cdn-header">
      <h1>CDN加速前端应用指南</h1>
      <p class="subtitle">提升网站全球访问速度的最佳实践</p>
      <div class="cdn-stats">
        <div class="stat">
          <div class="stat-value">50-70%</div>
          <div class="stat-label">加载时间减少</div>
        </div>
        <div class="stat">
          <div class="stat-value">99.9%</div>
          <div class="stat-label">可用性保证</div>
        </div>
        <div class="stat">
          <div class="stat-value">全球</div>
          <div class="stat-label">节点覆盖</div>
        </div>
      </div>
    </header>

    <div class="cdn-content">
      <section class="cdn-section">
        <h2>什么是CDN？</h2>
        <div class="definition-card">
          <p>
            <strong>CDN (Content Delivery Network)</strong> 即内容分发网络，
            是一种分布式服务器系统，通过在全球多个位置部署节点服务器，
            将网站内容缓存到离用户更近的地方，从而加速内容传输。
          </p>
          <div class="cdn-benefits">
            <div class="benefit">
              <div class="benefit-icon">⚡</div>
              <h3>加速加载</h3>
              <p>减少延迟，提升页面加载速度</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">🛡️</div>
              <h3>增强安全</h3>
              <p>抵御DDoS攻击，提供HTTPS支持</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">📈</div>
              <h3>提升可用性</h3>
              <p>服务器故障时自动切换节点</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cdn-section">
        <h2>CDN加速原理</h2>
        <div class="principle-diagram">
          <div class="user">用户</div>
          <div class="arrow">→</div>
          <div class="edge-cdn">边缘CDN节点</div>
          <div class="arrow">→</div>
          <div class="origin-server">源服务器</div>

          <div class="explanation">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">用户请求资源</div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">CDN智能路由到最近的节点</div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">节点返回缓存的资源</div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">未缓存资源从源服务器获取并缓存</div>
            </div>
          </div>

          <div class="cache-process">
            <h3>缓存过程</h3>
            <div class="cache-visual">
              <div class="cache-item">首次请求</div>
              <div class="cache-arrow">→</div>
              <div class="cache-item">回源获取</div>
              <div class="cache-arrow">→</div>
              <div class="cache-item">边缘缓存</div>
              <div class="cache-arrow">→</div>
              <div class="cache-item">后续请求直接响应</div>
            </div>
          </div>
        </div>
      </section>

      <section class="cdn-section">
        <h2>如何开启CDN加速</h2>
        <div class="steps-container">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>选择CDN提供商</h3>
            <ul>
              <li><strong>Cloudflare</strong> - 免费基础套餐</li>
              <li><strong>AWS CloudFront</strong> - 深度AWS集成</li>
              <li><strong>Akamai</strong> - 企业级解决方案</li>
              <li><strong>阿里云CDN</strong> - 中国地区优化</li>
            </ul>
          </div>

          <div class="step-card">
            <div class="step-number">2</div>
            <h3>配置CDN服务</h3>
            <div class="code-block">
              <pre><code>// 示例：Cloudflare配置
1. 添加网站到Cloudflare
2. 更新域名的DNS服务器
3. 配置缓存规则：
   - 静态资源缓存1年
   - HTML文件缓存2小时
4. 启用HTTPS和HTTP/2
5. 配置性能优化选项</code></pre>
            </div>
          </div>

          <div class="step-card">
            <div class="step-number">3</div>
            <h3>修改资源引用</h3>
            <p>将资源URL替换为CDN URL：</p>
            <div class="code-block">
              <pre><code>&lt;!-- 原始引用 --&gt;
&lt;script src="/js/app.js"&gt;&lt;/script&gt;

&lt;!-- CDN引用 --&gt;
&lt;script src="https://cdn.yourdomain.com/js/app.js"&gt;&lt;/script&gt;</code></pre>
            </div>
            <p class="tip">使用构建工具自动替换：</p>
            <div class="code-block">
              <pre><code>// webpack.config.js
output: {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://cdn.yourdomain.com/'
    : '/'
}</code></pre>
            </div>
          </div>

          <div class="step-card">
            <div class="step-number">4</div>
            <h3>验证与测试</h3>
            <ul>
              <li>使用浏览器开发者工具检查资源来源</li>
              <li>全球速度测试工具（WebPageTest）</li>
              <li>验证缓存头（Cache-Control, ETag）</li>
              <li>检查HTTPS是否正常工作</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="cdn-section">
        <h2>CDN最佳实践</h2>
        <div class="best-practices">
          <div class="practice">
            <div class="practice-icon">📦</div>
            <h3>缓存策略</h3>
            <ul>
              <li>静态资源设置长期缓存（1年）</li>
              <li>使用文件哈希实现缓存破坏</li>
              <li>设置合适的Cache-Control头</li>
            </ul>
          </div>

          <div class="practice">
            <div class="practice-icon">⚡</div>
            <h3>性能优化</h3>
            <ul>
              <li>启用HTTP/2或HTTP/3</li>
              <li>配置Brotli/Gzip压缩</li>
              <li>启用TCP快速打开</li>
            </ul>
          </div>

          <div class="practice">
            <div class="practice-icon">🔒</div>
            <h3>安全配置</h3>
            <ul>
              <li>强制HTTPS连接</li>
              <li>配置WAF防护规则</li>
              <li>设置CSP安全策略</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="comparison-table">
        <h3>CDN加速效果对比</h3>
        <table>
          <thead>
            <tr>
              <th>指标</th>
              <th>无CDN</th>
              <th>启用CDN</th>
              <th>提升幅度</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>首字节时间(TTFB)</td>
              <td>320ms</td>
              <td>45ms</td>
              <td>86%</td>
            </tr>
            <tr>
              <td>页面完全加载</td>
              <td>2.8s</td>
              <td>1.2s</td>
              <td>57%</td>
            </tr>
            <tr>
              <td>全球延迟差异</td>
              <td>300-600ms</td>
              <td>30-100ms</td>
              <td>80-85%</td>
            </tr>
            <tr>
              <td>服务器负载</td>
              <td>100%</td>
              <td>15-30%</td>
              <td>70-85%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer class="cdn-footer">
      <p> 前端性能优化指南 | CDN加速实践</p>
      <div class="footer-links">
        <a href="#">Cloudflare文档</a>
        <a href="#">AWS CloudFront指南</a>
        <a href="#">阿里云CDN配置</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例响应式数据
const cdnProviders = ref([
  { name: 'Cloudflare', free: true, global: true },
  { name: 'AWS CloudFront', free: false, global: true },
  { name: 'Akamai', free: false, global: true },
  { name: '阿里云CDN', free: true, global: false }
]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #42b983;
@background-light: #f8f9fa;
@text-color: #34495e;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@code-color: #f8f8f2;
@warning-color: #e74c3c;

.cdn-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  line-height: 1.6;
}

.cdn-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, @secondary-color, lighten(@secondary-color, 10%));
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
}

.cdn-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  .stat {
    background: rgba(255, 255, 255, 0.15);
    padding: 1rem 1.8rem;
    border-radius: 8px;
    backdrop-filter: blur(5px);

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }
  }
}

.cdn-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: @secondary-color;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: @accent-color;
      border-radius: 3px;
    }
  }
}

.definition-card {
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
}

.cdn-benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.benefit {
  background: lighten(@accent-color, 45%);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;

  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    color: @secondary-color;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: lighten(@text-color, 20%);
  }
}

.principle-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;

  >div {
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    background: white;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  .user {
    background: lighten(@primary-color, 40%);
    color: darken(@primary-color, 20%);
  }

  .edge-cdn {
    background: lighten(@accent-color, 40%);
    color: darken(@accent-color, 20%);
  }

  .origin-server {
    background: lighten(@warning-color, 40%);
    color: darken(@warning-color, 20%);
  }

  .arrow {
    font-size: 1.5rem;
    color: @accent-color;
    background: none;
    box-shadow: none;
  }
}

.explanation {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.step {
  display: flex;
  gap: 1rem;
  background: @background-light;
  padding: 1rem;
  border-radius: 8px;

  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: @accent-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-content {
    font-weight: 500;
  }
}

.cache-process {
  width: 100%;
  margin-top: 2rem;

  h3 {
    text-align: center;
    margin-bottom: 1rem;
    color: @secondary-color;
  }
}

.cache-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cache-item {
  padding: 0.8rem 1.2rem;
  background: lighten(@primary-color, 40%);
  border-radius: 8px;
  font-weight: 500;
}

.cache-arrow {
  color: @accent-color;
  font-size: 1.2rem;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.step-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  .step-number {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background: @accent-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 0 0 0 12px;
  }

  h3 {
    margin-top: 0;
    color: @primary-color;
    padding-right: 40px;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
}

.code-block {
  background: @code-bg;
  color: @code-color;
  border-radius: 8px;
  padding: 1.2rem;
  overflow-x: auto;
  margin: 1rem 0;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.9rem;

  pre {
    margin: 0;
  }

  code {
    display: block;
    line-height: 1.5;

    .comment {
      color: #75715e;
    }
  }
}

.tip {
  font-size: 0.9rem;
  color: lighten(@text-color, 20%);
  margin: 0.5rem 0;
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.practice {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

  .practice-icon {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  h3 {
    text-align: center;
    margin-top: 0;
    color: @secondary-color;
  }

  ul {
    padding-left: 1.2rem;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;
    }
  }
}

.comparison-table {
  width: 100%;
  overflow-x: auto;
  margin: 2rem 0;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: @background-light;
      font-weight: 600;
      color: @secondary-color;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:nth-child(even) {
      background: lighten(@background-light, 1%);
    }
  }
}

.cdn-footer {
  text-align: center;
  padding: 2rem 0;
  color: lighten(@text-color, 30%);
  font-size: 0.9rem;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1rem;

    a {
      color: @primary-color;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media (max-width: 768px) {
  .cdn-header {
    padding: 1.5rem;

    h1 {
      font-size: 1.8rem;
    }
  }

  .cdn-stats {
    flex-direction: column;
    align-items: center;

    .stat {
      width: 100%;
      max-width: 200px;
    }
  }

  .principle-diagram {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
