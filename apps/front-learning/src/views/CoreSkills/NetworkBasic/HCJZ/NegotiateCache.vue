<template>
  <div class="negotiation-cache-container">
    <!-- 头部区域 -->
    <header class="cache-hero">
      <div class="hero-content">
        <h1>协商缓存 <span class="subtitle">智能的资源更新机制</span></h1>
        <p class="tagline">高效的缓存验证策略，平衡性能与资源更新</p>
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-value">30-50%</div>
            <div class="stat-label">带宽节省</div>
          </div>
          <div class="stat">
            <div class="stat-value">200-300ms</div>
            <div class="stat-label">平均加载提升</div>
          </div>
          <div class="stat">
            <div class="stat-value">99.9%</div>
            <div class="stat-label">现代浏览器支持</div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="cache-flow">
          <div class="flow-step">
            <div class="step-client">浏览器</div>
            <div class="step-arrow">→</div>
            <div class="step-server">服务器</div>
          </div>
          <div class="flow-step">
            <div class="step-header">If-Modified-Since / If-None-Match</div>
            <div class="step-arrow">↓</div>
          </div>
          <div class="flow-step">
            <div class="step-response">304 Not Modified</div>
            <div class="step-arrow">↑</div>
          </div>
          <div class="flow-step">
            <div class="step-cache">使用缓存</div>
          </div>
        </div>
      </div>
    </header>

    <!-- 基本概念 -->
    <section class="concepts-section">
      <div class="section-header">
        <h2>协商缓存是什么？</h2>
        <p>客户端与服务器协作的资源缓存验证机制</p>
      </div>

      <div class="concept-cards">
        <div class="concept-card">
          <div class="card-icon">🤝</div>
          <div class="card-content">
            <h3>核心概念</h3>
            <p>
              协商缓存是一种客户端和服务器协同工作的缓存验证机制。浏览器携带缓存标识请求服务器，服务器检查资源是否变更，未变更则返回304状态码，通知浏览器使用本地缓存。
            </p>
          </div>
        </div>

        <div class="concept-card">
          <div class="card-icon">🔄</div>
          <div class="card-content">
            <h3>与强缓存的区别</h3>
            <div class="comparison-table">
              <div class="table-row header">
                <div>特性</div>
                <div>强缓存</div>
                <div>协商缓存</div>
              </div>
              <div class="table-row">
                <div>HTTP状态码</div>
                <div>200 (from cache)</div>
                <div>304 Not Modified</div>
              </div>
              <div class="table-row">
                <div>网络请求</div>
                <div>无</div>
                <div>有（验证请求）</div>
              </div>
              <div class="table-row">
                <div>缓存控制</div>
                <div>Cache-Control/Expires</div>
                <div>Last-Modified/ETag</div>
              </div>
              <div class="table-row">
                <div>资源更新</div>
                <div>到期前不更新</div>
                <div>每次验证更新</div>
              </div>
            </div>
          </div>
        </div>

        <div class="concept-card">
          <div class="card-icon">📊</div>
          <div class="card-content">
            <h3>工作流程</h3>
            <ol class="workflow-list">
              <li>浏览器首次请求资源</li>
              <li>服务器返回资源 + Last-Modified/ETag</li>
              <li>浏览器再次请求时发送 If-Modified-Since/If-None-Match</li>
              <li>服务器验证资源是否修改</li>
              <li>未修改 → 返回304，使用缓存</li>
              <li>已修改 → 返回200 + 新资源</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- 验证机制 -->
    <section class="validation-section">
      <div class="section-header">
        <h2>验证机制</h2>
        <p>两种主流的资源验证方式</p>
      </div>

      <div class="validation-methods">
        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">📅</div>
            <h3>Last-Modified / If-Modified-Since</h3>
          </div>
          <div class="method-body">
            <p>基于时间戳的验证机制</p>
            <div class="method-details">
              <div class="detail">
                <span class="detail-label">工作原理：</span>
                <span>服务器返回资源最后修改时间，浏览器后续请求携带该时间</span>
              </div>
              <div class="detail">
                <span class="detail-label">响应头：</span>
                <code>Last-Modified: Fri, 12 May 2023 07:28:00 GMT</code>
              </div>
              <div class="detail">
                <span class="detail-label">请求头：</span>
                <code>If-Modified-Since: Fri, 12 May 2023 07:28:00 GMT</code>
              </div>
            </div>
            <div class="method-pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>实现简单，兼容性好</li>
                  <li>时间信息直观易懂</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>精度到秒，秒内修改无法识别</li>
                  <li>文件修改时间改变但内容未变时会失效</li>
                  <li>分布式服务器时间可能不一致</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="method-card">
          <div class="method-header">
            <div class="method-icon">🏷️</div>
            <h3>ETag / If-None-Match</h3>
          </div>
          <div class="method-body">
            <p>基于内容标识的验证机制</p>
            <div class="method-details">
              <div class="detail">
                <span class="detail-label">工作原理：</span>
                <span>服务器生成资源唯一标识（通常为hash），浏览器后续请求携带该标识</span>
              </div>
              <div class="detail">
                <span class="detail-label">响应头：</span>
                <code>ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"</code>
              </div>
              <div class="detail">
                <span class="detail-label">请求头：</span>
                <code>If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"</code>
              </div>
            </div>
            <div class="method-pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>精确验证内容变化</li>
                  <li>不受时间精度限制</li>
                  <li>分布式环境更可靠</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>计算ETag消耗服务器资源</li>
                  <li>实现复杂度较高</li>
                  <li>标识符需要合理生成算法</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 配置方法 -->
    <section class="configuration-section">
      <div class="section-header">
        <h2>配置方法</h2>
        <p>主流服务器中的协商缓存配置</p>
      </div>

      <div class="config-examples">
        <div class="example-card">
          <div class="example-header">
            <div class="server-icon">🔄</div>
            <h3>Nginx 配置</h3>
          </div>
          <div class="example-body">
            <pre><code>server {
  listen 80;
  server_name example.com;

  location / {
    # 启用ETag验证
    etag on;

    # 配置Last-Modified
    if_modified_since before;

    # 静态资源缓存设置
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
      # 同时使用两种验证方式
      add_header Last-Modified "";
      add_header ETag "";

      # 设置缓存时间（配合强缓存）
      expires 7d;
    }
  }
}</code></pre>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="server-icon">🔧</div>
            <h3>Apache 配置</h3>
          </div>
          <div class="example-body">
            <pre><code>&lt;IfModule mod_headers.c&gt;
  # 启用ETag支持
  FileETag MTime Size

  # 针对特定文件类型配置
  &lt;FilesMatch "\.(html|css|js|png|jpg)$"&gt;
    # 启用协商缓存
    Header set Cache-Control "public, must-revalidate, proxy-revalidate"

    # 设置Last-Modified
    Header unset Last-Modified
    Header unset ETag
  &lt;/FilesMatch&gt;
&lt;/IfModule&gt;

&lt;IfModule mod_expires.c&gt;
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
&lt;/IfModule&gt;</code></pre>
          </div>
        </div>

        <div class="example-card">
          <div class="example-header">
            <div class="server-icon">🚀</div>
            <h3>Node.js 实现</h3>
          </div>
          <div class="example-body">
            <pre><code>const http = require('http');
const fs = require('fs');
const crypto = require('crypto');

http.createServer((req, res) => {
  // 获取文件路径
  const filePath = './static' + req.url;

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404);
      return res.end('File not found');
    }

    // 读取文件内容
    fs.readFile(filePath, (err, content) => {
      if (err) throw err;

      // 生成ETag
      const hash = crypto.createHash('sha1');
      hash.update(content);
      const etag = hash.digest('hex');

      // 获取客户端If-None-Match
      const clientETag = req.headers['if-none-match'];

      // 验证ETag
      if (clientETag === etag) {
        res.writeHead(304);
        return res.end();
      }

      // 设置ETag响应头
      res.setHeader('ETag', etag);
      res.setHeader('Last-Modified', stats.mtime.toUTCString());
      res.setHeader('Cache-Control', 'no-cache'); // 协商缓存

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  });
}).listen(3000);</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="use-cases">
      <div class="section-header">
        <h2>使用场景</h2>
        <p>协商缓存的适用领域</p>
      </div>

      <div class="scenario-container">
        <div class="scenario-card">
          <div class="scenario-header">
            <div class="scenario-icon">📄</div>
            <h3>HTML文档</h3>
          </div>
          <div class="scenario-body">
            <p>经常修改的核心页面文件，需要及时更新但变更频率不高</p>
            <div class="scenario-metrics">
              <div class="metric">
                <span>缓存命中率：</span>
                <span class="metric-value">60-80%</span>
              </div>
              <div class="metric">
                <span>带宽节省：</span>
                <span class="metric-value">40-60%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="scenario-card">
          <div class="scenario-header">
            <div class="scenario-icon">🎨</div>
            <h3>CSS样式表</h3>
          </div>
          <div class="scenario-body">
            <p>网站样式文件，更新频率中等，用户需要及时获取最新样式</p>
            <div class="scenario-metrics">
              <div class="metric">
                <span>缓存命中率：</span>
                <span class="metric-value">70-85%</span>
              </div>
              <div class="metric">
                <span>带宽节省：</span>
                <span class="metric-value">50-70%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="scenario-card">
          <div class="scenario-header">
            <div class="scenario-icon">⚙️</div>
            <h3>JavaScript文件</h3>
          </div>
          <div class="scenario-body">
            <p>应用脚本文件，更新频率较高但文件大小较大</p>
            <div class="scenario-metrics">
              <div class="metric">
                <span>缓存命中率：</span>
                <span class="metric-value">65-80%</span>
              </div>
              <div class="metric">
                <span>带宽节省：</span>
                <span class="metric-value">45-65%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="scenario-card">
          <div class="scenario-header">
            <div class="scenario-icon">📰</div>
            <h3>API响应数据</h3>
          </div>
          <div class="scenario-body">
            <p>频繁更新的动态数据，适用于对实时性要求不高的场景</p>
            <div class="scenario-metrics">
              <div class="metric">
                <span>缓存命中率：</span>
                <span class="metric-value">30-50%</span>
              </div>
              <div class="metric">
                <span>带宽节省：</span>
                <span class="metric-value">20-40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 优缺点分析 -->
    <section class="pros-cons-section">
      <div class="section-header">
        <h2>优缺点分析</h2>
        <p>协商缓存的实际应用评估</p>
      </div>

      <div class="analysis-container">
        <div class="pros-section">
          <h3 class="section-title"><span>✅</span> 协商缓存优势</h3>
          <ul class="benefit-list">
            <li>
              <div class="benefit-icon">💾</div>
              <div class="benefit-content">
                <h4>降低带宽消耗</h4>
                <p>304响应显著减少数据传输量，节省服务器带宽</p>
              </div>
            </li>
            <li>
              <div class="benefit-icon">⚡</div>
              <div class="benefit-content">
                <h4>提升加载速度</h4>
                <p>减少完整资源加载时间，尤其在慢速网络上</p>
              </div>
            </li>
            <li>
              <div class="benefit-icon">🔄</div>
              <div class="benefit-content">
                <h4>及时资源更新</h4>
                <p>相比强缓存能更及时地获取资源更新</p>
              </div>
            </li>
            <li>
              <div class="benefit-icon">🌐</div>
              <div class="benefit-content">
                <h4>减轻服务器负载</h4>
                <p>减少完整响应处理，降低服务器CPU使用率</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="cons-section">
          <h3 class="section-title"><span>⚠️</span> 协商缓存局限</h3>
          <ul class="limitation-list">
            <li>
              <div class="limitation-icon">⏱️</div>
              <div class="limitation-content">
                <h4>额外请求开销</h4>
                <p>每次都需要发起验证请求，增加网络延迟</p>
              </div>
            </li>
            <li>
              <div class="limitation-icon">🧩</div>
              <div class="limitation-content">
                <h4>实现复杂度高</h4>
                <p>需要服务器正确配置和标识生成逻辑</p>
              </div>
            </li>
            <li>
              <div class="limitation-icon">🔌</div>
              <div class="limitation-content">
                <h4>弱网环境体验差</h4>
                <p>在慢速网络中验证请求可能造成感知延迟</p>
              </div>
            </li>
            <li>
              <div class="limitation-icon">🛠️</div>
              <div class="limitation-content">
                <h4>配置不当风险</h4>
                <p>错误配置可能导致内容不更新或过度请求</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 最佳实践 -->
    <section class="best-practices">
      <div class="section-header">
        <h2>最佳实践指南</h2>
        <p>高效使用协商缓存的专业建议</p>
      </div>

      <div class="practices-container">
        <div class="practice-card">
          <div class="practice-number">1</div>
          <div class="practice-content">
            <h3>结合强缓存使用</h3>
            <p>设置适当的max-age，在缓存过期后才进行协商验证</p>
            <code>Cache-Control: public, max-age=3600, must-revalidate</code>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">2</div>
          <div class="practice-content">
            <h3>优先使用ETag</h3>
            <p>ETag比Last-Modified更可靠，优先实现ETag验证</p>
            <code>ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"</code>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">3</div>
          <div class="practice-content">
            <h3>分布式系统注意点</h3>
            <p>在多服务器环境中确保Last-Modified时间同步或使用ETag</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">4</div>
          <div class="practice-content">
            <h3>避免过度验证</h3>
            <p>对频繁变化的资源使用短max-age，减少不必要验证</p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">5</div>
          <div class="practice-content">
            <h3>配置合适的缓存层次</h3>
            <p>
              HTML文件 → 协商缓存<br />
              静态资源 → 强缓存 + 协商缓存<br />
              API数据 → 短时间协商缓存
            </p>
          </div>
        </div>

        <div class="practice-card">
          <div class="practice-number">6</div>
          <div class="practice-content">
            <h3>监控缓存效率</h3>
            <p>使用工具监控304响应率，优化缓存策略</p>
            <div class="practice-tools">
              <span>Chrome DevTools</span>
              <span>WebPageTest</span>
              <span>Lighthouse</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="cache-footer">
      <div class="footer-content">
        <div class="quote">
          <blockquote>
            "协商缓存是现代Web性能优化的基石，在资源效率和内容实时性之间提供了完美平衡。"
          </blockquote>
          <div class="author">—— Web性能优化专家</div>
        </div>
        <div class="footer-links">
          <h3>进阶学习资源</h3>
          <ul>
            <li>HTTP缓存机制基础介绍 - MDN文档</li>
            <li>高性能浏览器缓存策略</li>
            <li>Nginx缓存配置基本指南</li>
            <li>分布式系统缓存一致性解决方案</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="copyright"> HTTP缓存技术 | 协商缓存权威指南</div>
        <div class="stats">
          <span class="cache-hits">本页缓存命中: <span class="metric-value">4次</span></span>
          <span class="bandwidth-saved">带宽节省: <span class="metric-value">1.2MB</span></span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 模拟缓存统计数据
const cacheHits = ref(4)
const bandwidthSaved = ref('1.2MB')
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2980b9;
@accent-color: #e74c3c;
@background-color: #f8fafd;
@text-color: #2c3e50;
@card-bg: #ffffff;
@border-color: #e5e9f2;
@success-color: #2ecc71;
@warning-color: #f39c12;
@danger-color: #e74c3c;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.negotiation-cache-container {
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
  color: @text-color;
  background-color: @background-color;
  line-height: 1.6;
}

/* 头部样式 */
.cache-hero {
  border-radius: 0 0 40px 40px;
  padding: 60px 20px 40px;
  margin-bottom: 50px;
  color: white;
  position: relative;
  overflow: hidden;

  .hero-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 40px;
    position: relative;
    z-index: 2;

    h1 {
      font-size: 3rem;
      margin: 0 0 15px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.5rem;
      font-weight: 300;
      opacity: 0.9;
      display: block;
      margin-top: 10px;
    }

    .tagline {
      font-size: 1.25rem;
      max-width: 600px;
      margin: 25px auto 0;
      font-weight: 300;
      opacity: 0.85;
    }
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;

    .stat {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      padding: 20px 25px;
      min-width: 150px;

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 1.05rem;
        opacity: 0.9;
      }
    }
  }

  .hero-visual {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    max-width: 800px;
    margin: 50px auto 0;

    .cache-flow {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 25px;

      .flow-step {
        display: flex;
        align-items: center;
        gap: 15px;
        width: 100%;

        > div {
          padding: 15px 25px;
          border-radius: 12px;
          text-align: center;
          flex: 1;
        }

        .step-client,
        .step-server {
          background: rgba(255, 255, 255, 0.15);
          font-size: 1.1rem;
          font-weight: 500;
        }

        .step-header {
          background: linear-gradient(90deg, @primary-color, lighten(@primary-color, 15%));
          font-family: monospace;
          font-size: 0.9rem;
        }

        .step-response {
          background: linear-gradient(90deg, @success-color, lighten(@success-color, 10%));
          font-weight: 600;
        }

        .step-cache {
          background: rgba(46, 204, 113, 0.25);
          font-size: 1.1rem;
          font-weight: 600;
        }

        .step-arrow {
          font-size: 1.8rem;
          flex: 0;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: 1;
  }
}

/* 通用分区头部样式 */
.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
  padding: 0 20px;

  h2 {
    font-size: 2.3rem;
    margin-bottom: 15px;
    color: @text-color;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 5px;
      background: linear-gradient(to right, @primary-color, @secondary-color);
      border-radius: 3px;
    }
  }

  p {
    font-size: 1.15rem;
    color: #7f8c8d;
    margin-top: 25px;
  }
}

/* 基本概念部分 */
.concepts-section {
  margin-bottom: 70px;

  .concept-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .concept-card {
    background: @card-bg;
    border-radius: 18px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-7px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    }

    .card-icon {
      font-size: 3.5rem;
      text-align: center;
      margin-bottom: 25px;
      color: @primary-color;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 20px;
      color: darken(@primary-color, 15%);
      text-align: center;
    }

    p {
      color: #555;
      line-height: 1.7;
      font-size: 1.05rem;
    }
  }

  .comparison-table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;

    .table-row {
      display: flex;
      border-bottom: 1px solid @border-color;
      padding: 12px 0;

      &:first-child {
        border-top: 1px solid @border-color;
      }

      &.header {
        font-weight: 600;
        background: rgba(@primary-color, 0.05);
      }

      > div {
        flex: 1;
        text-align: center;
        padding: 8px;

        &:first-child {
          text-align: left;
          flex: 1.5;
          padding-left: 15px;
        }
      }
    }
  }

  .workflow-list {
    padding-left: 25px;
    margin-top: 15px;

    li {
      margin-bottom: 15px;
      padding-left: 10px;
      position: relative;
      font-size: 1.05rem;

      &::before {
        content: '';
        position: absolute;
        left: -25px;
        top: 8px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: @primary-color;
      }

      &:nth-child(5) {
        font-weight: 600;
        color: @success-color;
      }
    }
  }
}

/* 验证机制部分 */
.validation-section {
  margin-bottom: 70px;

  .validation-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .method-card {
    background: @card-bg;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

    .method-header {
      padding: 25px 30px;
      display: flex;
      align-items: center;
      gap: 20px;
      background: linear-gradient(90deg, @primary-color, darken(@primary-color, 10%));
      color: white;

      .method-icon {
        font-size: 2.2rem;
      }

      h3 {
        margin: 0;
        font-size: 1.4rem;
      }
    }

    .method-body {
      padding: 30px;

      p {
        font-size: 1.1rem;
        margin-bottom: 20px;
        font-weight: 500;
        color: #444;
      }
    }

    .method-details {
      background: #f8fafd;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 25px;

      .detail {
        margin-bottom: 15px;

        &:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          font-weight: 600;
          color: #555;
        }

        code {
          display: block;
          background: #2c3e50;
          color: #ecf0f1;
          padding: 10px 15px;
          border-radius: 6px;
          margin-top: 8px;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          overflow-x: auto;
        }
      }
    }

    .method-pros-cons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      .pros,
      .cons {
        background: #f8fafd;
        border-radius: 12px;
        padding: 20px;

        h4 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.2rem;
          position: relative;
          padding-bottom: 10px;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
          }
        }

        ul {
          padding-left: 20px;

          li {
            margin-bottom: 10px;
            font-size: 1.05rem;
          }
        }
      }

      .pros {
        h4::after {
          background: @success-color;
        }

        ul li::marker {
          color: @success-color;
        }
      }

      .cons {
        h4::after {
          background: @warning-color;
        }

        ul li::marker {
          color: @warning-color;
        }
      }
    }
  }
}

/* 配置方法部分 */
.configuration-section {
  margin-bottom: 70px;

  .config-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .example-card {
    background: @card-bg;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

    .example-header {
      padding: 20px 25px;
      display: flex;
      align-items: center;
      gap: 15px;
      background: linear-gradient(90deg, @secondary-color, lighten(@primary-color, 5%));
      color: white;

      .server-icon {
        font-size: 1.8rem;
      }

      h3 {
        margin: 0;
        font-size: 1.3rem;
      }
    }

    .example-body {
      pre {
        margin: 0;
        padding: 25px;
        overflow-x: auto;

        code {
          font-family: 'Fira Code', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
        }
      }
    }
  }
}

/* 使用场景部分 */
.use-cases {
  margin-bottom: 1rem;
}
</style>
