<template>
  <div class="strong-caching">
    <header class="header">
      <div class="header-content">
        <h1>🚀 网络强缓存 (Strong Caching)</h1>
        <p>提升Web应用性能的关键技术</p>
      </div>
      <div class="cache-visualization">
        <div class="cache-flow">
          <div class="flow-item">客户端请求</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item cache-hit">缓存命中</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">本地资源</div>
        </div>
        <div class="cache-flow">
          <div class="flow-item">客户端请求</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item cache-miss">缓存未命中</div>
          <div class="flow-arrow">→</div>
          <div class="flow-item">服务器资源</div>
        </div>
      </div>
    </header>

    <div class="content-container">
      <!-- 概念部分 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>强缓存概念</h2>
        </div>
        <div class="concept-content">
          <div class="definition-card">
            <p>
              <strong>强缓存</strong>是HTTP缓存机制的一种，当浏览器请求资源时，会先检查缓存是否有效。
              如果有效（未过期），浏览器直接从缓存中读取资源，<strong>不会发送请求到服务器</strong>。
            </p>
          </div>

          <div class="cache-mechanism">
            <h3>缓存机制流程</h3>
            <div class="mechanism-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>浏览器发起资源请求</h4>
                  <p>浏览器检查本地是否有缓存副本</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>检查缓存有效性</h4>
                  <p>根据HTTP头部判断缓存是否过期</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>缓存有效（未过期）</h4>
                  <p>直接从缓存读取资源（状态码200 from cache）</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h4>缓存无效（已过期）</h4>
                  <p>向服务器发送请求获取最新资源</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 缓存头部 -->
      <section class="headers-section">
        <div class="section-header">
          <div class="section-icon">🔧</div>
          <h2>缓存控制头部</h2>
        </div>

        <div class="headers-tabs">
          <button v-for="(header, index) in cacheHeaders" :key="index"
            :class="['header-tab', { active: activeHeaderTab === index }]" @click="activeHeaderTab = index">
            {{ header.name }}
          </button>
        </div>

        <div class="header-content">
          <div v-show="activeHeaderTab === 0" class="header-detail">
            <h3>Cache-Control</h3>
            <p>HTTP/1.1 中用于控制缓存行为的通用头部字段，优先级高于 Expires</p>

            <div class="directives-grid">
              <div class="directive-card" v-for="(directive, index) in cacheControlDirectives" :key="index">
                <div class="directive-name">{{ directive.name }}</div>
                <div class="directive-value">{{ directive.value }}</div>
                <div class="directive-desc">{{ directive.description }}</div>
              </div>
            </div>

            <div class="code-example">
              <h4>配置示例：</h4>
              <pre>// 设置强缓存时间为1年
Cache-Control: max-age=31536000

// 公共缓存（CDN等）
Cache-Control: public, max-age=31536000

// 私有缓存（仅浏览器）
Cache-Control: private, max-age=86400

// 禁止缓存
Cache-Control: no-store</pre>
            </div>
          </div>

          <div v-show="activeHeaderTab === 1" class="header-detail">
            <h3>Expires</h3>
            <p>HTTP/1.0 中用于指定资源过期时间的头部字段，使用绝对时间</p>

            <div class="expires-card">
              <div class="expires-info">
                <div class="info-item">
                  <span class="info-label">格式：</span>
                  <span class="info-value">格林威治时间（GMT）</span>
                </div>
                <div class="info-item">
                  <span class="info-label">示例：</span>
                  <span class="info-value">Expires: Wed, 21 Oct 2025 07:28:00 GMT</span>
                </div>
                <div class="info-item">
                  <span class="info-label">优先级：</span>
                  <span class="info-value">低于 Cache-Control</span>
                </div>
              </div>

              <div class="expires-note">
                <div class="note-icon">⚠️</div>
                <div class="note-content">
                  由于依赖客户端和服务端的时间同步，且使用绝对时间，Expires 在现代Web应用中已逐渐被 Cache-Control 取代
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置示例 -->
      <section class="config-section">
        <div class="section-header">
          <div class="section-icon">💻</div>
          <h2>配置示例</h2>
        </div>

        <div class="config-tabs">
          <button v-for="(tab, index) in serverConfigs" :key="index"
            :class="['config-tab', { active: activeConfigTab === index }]" @click="activeConfigTab = index">
            {{ tab.name }}
          </button>
        </div>

        <div class="config-content">
          <div v-for="(config, index) in serverConfigs[activeConfigTab].configs" :key="index" class="config-example">
            <h3>{{ config.title }}</h3>
            <pre>{{ config.code }}</pre>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="usage-section">
        <div class="section-header">
          <div class="section-icon">💡</div>
          <h2>使用场景</h2>
        </div>

        <div class="usage-grid">
          <div class="usage-card" v-for="(scenario, index) in usageScenarios" :key="index">
            <div class="usage-icon">{{ scenario.icon }}</div>
            <h3>{{ scenario.title }}</h3>
            <p>{{ scenario.description }}</p>
            <div class="cache-duration">
              <span class="duration-label">推荐缓存时间：</span>
              <span class="duration-value">{{ scenario.duration }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 优缺点 -->
      <section class="pros-cons-section">
        <div class="section-header">
          <div class="section-icon">⚖️</div>
          <h2>优缺点分析</h2>
        </div>

        <div class="comparison">
          <div class="pros">
            <h3>✅ 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">
                <div class="icon">✔️</div>
                <div>{{ pro }}</div>
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3>❌ 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">
                <div class="icon">⚠️</div>
                <div>{{ con }}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="section-icon">🌟</div>
          <h2>最佳实践</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card" v-for="(practice, index) in bestPractices" :key="index">
            <div class="practice-number">{{ index + 1 }}</div>
            <div class="practice-content">
              <h3>{{ practice.title }}</h3>
              <p>{{ practice.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="summary">
          <h3>强缓存总结</h3>
          <p>
            强缓存是Web性能优化的核心技术，通过减少不必要的网络请求显著提升用户体验。
            合理配置Cache-Control头部，结合资源版本控制，可以在保持资源新鲜度的同时最大化缓存效益。
          </p>
        </div>
        <div class="footer-links">
          <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching" target="_blank">MDN HTTP缓存文档</a>
          <a href="https://web.dev/http-cache/" target="_blank">web.dev缓存指南</a>
          <a href="https://tools.ietf.org/html/rfc7234" target="_blank">RFC 7234规范</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const cacheHeaders = [
  { name: 'Cache-Control' },
  { name: 'Expires' }
];

const activeHeaderTab = ref(0);
const activeConfigTab = ref(0);

const cacheControlDirectives = [
  { name: 'max-age', value: '=秒数', description: '资源最大缓存时间（秒）' },
  { name: 'public', value: '', description: '响应可被任何中间节点缓存' },
  { name: 'private', value: '', description: '响应仅可被浏览器缓存' },
  { name: 'no-cache', value: '', description: '强制向服务器验证缓存' },
  { name: 'no-store', value: '', description: '禁止缓存任何响应内容' },
  { name: 'immutable', value: '', description: '资源永不变，无需重新验证' },
  { name: 'must-revalidate', value: '', description: '缓存必须验证过期资源' }
];

const serverConfigs = [
  {
    name: 'Nginx',
    configs: [
      {
        title: '静态资源强缓存',
        code: `location ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {
  # 设置强缓存1年
  add_header Cache-Control "public, max-age=31536000, immutable";

  # 可选：添加ETag验证
  etag on;
}`
      },
      {
        title: '字体文件缓存',
        code: `location ~* \\.(woff|woff2|ttf|eot|svg)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}`
      }
    ]
  },
  {
    name: 'Apache',
    configs: [
      {
        title: '.htaccess 配置',
        code: `<IfModule mod_expires.c>
  ExpiresActive On
  # 图片缓存1年
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"

  # CSS和JS缓存1年
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(jpg|jpeg|png|gif|css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>`
      }
    ]
  },
  {
    name: 'Node.js',
    configs: [
      {
        title: 'Express中间件',
        code: `const express = require('express');
const app = express();

// 静态资源强缓存
app.use(express.static('public', {
  maxAge: '1y',
  immutable: true
}));

// 特定资源类型
app.get('/static/*.js', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.sendFile(path.join(__dirname, req.path));
});`
      },
      {
        title: '设置Cache-Control头部',
        code: `app.get('/styles.css', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=31536000',
    'Content-Type': 'text/css'
  });
  res.send(cssContent);
});`
      }
    ]
  }
];

const usageScenarios = [
  {
    icon: '🖼️',
    title: '静态图片资源',
    description: '不经常变更的图片、图标等',
    duration: '1年'
  },
  {
    icon: '🎨',
    title: '样式表文件',
    description: 'CSS文件，特别是使用内容哈希的文件名',
    duration: '1年'
  },
  {
    icon: '📜',
    title: 'JavaScript库',
    description: '第三方库如React、Vue、jQuery等',
    duration: '1年'
  },
  {
    icon: '🅰️',
    title: '字体文件',
    description: 'Web字体文件（woff, woff2, ttf）',
    duration: '1年'
  },
  {
    icon: '📹',
    title: '媒体文件',
    description: '视频、音频等大型媒体文件',
    duration: '30天'
  },
  {
    icon: '📄',
    title: '下载文件',
    description: '用户下载的静态文档（PDF、ZIP等）',
    duration: '7天'
  }
];

const pros = [
  '极速加载：直接从缓存读取，无需网络请求',
  '减少带宽：节省服务器带宽和流量成本',
  '降低延迟：消除网络往返时间（RTT）',
  '减轻服务器压力：减少不必要的资源请求',
  '提升用户体验：页面加载更快更流畅'
];

const cons = [
  '更新困难：资源变更后需要等待缓存过期',
  '版本控制问题：需要文件名哈希等技术解决',
  '缓存失效：用户可能看到过期内容',
  '存储限制：浏览器缓存空间有限',
  '配置复杂：需要合理设置缓存时间'
];

const bestPractices = [
  {
    title: '文件名哈希',
    description: '使用内容哈希生成文件名（如app.a1b2c3.js），确保内容变更时URL改变'
  },
  {
    title: '合理设置缓存时间',
    description: '静态资源设置较长时间（1年），动态资源设置较短时间'
  },
  {
    title: '区分公共和私有资源',
    description: '公共资源（如图片）使用public，私有资源使用private'
  },
  {
    title: '使用immutable特性',
    description: '对于不会变更的资源使用immutable，避免验证请求'
  },
  {
    title: '组合使用缓存策略',
    description: '强缓存与协商缓存（ETag/Last-Modified）结合使用'
  },
  {
    title: '监控缓存命中率',
    description: '使用工具监控缓存效果，持续优化缓存策略'
  }
];
</script>

<style lang="less" scoped>


.strong-caching {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #2d3748;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  min-height: 100vh;

  * {
    box-sizing: border-box;
  }
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(120deg, #0ea5e9 0%, #0284c7 100%);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(2, 132, 199, 0.3);
  color: white;

  .header-content {
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    p {
      font-size: 1.2rem;
      color: #e0f2fe;
      margin-top: 0;
    }
  }
}

.cache-visualization {
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.cache-flow {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .flow-item {
    background: rgba(255, 255, 255, 0.9);
    color: #2563eb;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    text-align: center;

    &.cache-hit {
      background: #86efac;
      color: #166534;
    }

    &.cache-miss {
      background: #fca5a5;
      color: #b91c1c;
    }
  }

  .flow-arrow {
    font-size: 1.8rem;
    color: white;
    font-weight: bold;
  }
}

.content-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(120deg, #e0f2fe 0%, #bae6fd 100%);
  border-bottom: 2px solid #7dd3fc;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #0369a1;
  }

  .section-icon {
    font-size: 1.8rem;
    margin-right: 1.2rem;
    background: #0ea5e9;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}

.concept-section {
  .concept-content {
    padding: 2rem;
  }
}

.definition-card {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #0ea5e9;

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4b5563;
    margin: 0;

    strong {
      color: #0369a1;
    }
  }
}

.cache-mechanism {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;

  h3 {
    color: #0369a1;
    margin-top: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }
}

.mechanism-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.step {
  display: flex;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;

  .step-number {
    width: 40px;
    height: 40px;
    background: #0ea5e9;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }

  .step-content {
    h4 {
      color: #075985;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    p {
      color: #4b5563;
      margin: 0;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  }
}

.headers-section {
  .headers-tabs {
    display: flex;
    padding: 0 2rem;
    background: #f1f5f9;
    border-bottom: 1px solid #e5e7eb;
  }
}

.header-tab {
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: #e0f2fe;
    color: #0369a1;
  }

  &.active {
    background: white;
    color: #0369a1;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #0ea5e9;
    }
  }
}

.header-content {
  padding: 1.5rem 2rem;
}

.header-detail {
  h3 {
    color: #075985;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
}

.directives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.directive-card {
  background: white;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(14, 165, 233, 0.1);
  }

  .directive-name {
    font-weight: 700;
    color: #0c4a6e;
    margin-bottom: 0.3rem;
    font-family: 'Fira Code', monospace;
  }

  .directive-value {
    color: #0284c7;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-family: 'Fira Code', monospace;
  }

  .directive-desc {
    color: #4b5563;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.code-example {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;

  h4 {
    color: #075985;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }

  pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.2rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;

    code {
      display: block;
    }
  }
}

.expires-card {
  background: #f0f9ff;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #bae6fd;
}

.expires-info {
  margin-bottom: 1.5rem;

  .info-item {
    display: flex;
    margin-bottom: 0.8rem;

    .info-label {
      font-weight: 600;
      color: #075985;
      min-width: 80px;
    }

    .info-value {
      color: #4b5563;
      font-family: 'Fira Code', monospace;
    }
  }
}

.expires-note {
  display: flex;
  background: #fffbeb;
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid #f59e0b;

  .note-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    color: #d97706;
    flex-shrink: 0;
  }

  .note-content {
    color: #92400e;
  }
}

.config-section {
  .config-tabs {
    display: flex;
    padding: 0 2rem;
    background: #f1f5f9;
    border-bottom: 1px solid #e5e7eb;
  }
}

.config-tab {
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: #e0f2fe;
    color: #0369a1;
  }

  &.active {
    background: white;
    color: #0369a1;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #0ea5e9;
    }
  }
}

.config-content {
  padding: 1.5rem 2rem;
}

.config-example {
  margin-bottom: 2rem;

  h3 {
    color: #075985;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }

  pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.2rem;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    white-space: pre-wrap;

    code {
      display: block;
    }
  }
}

.usage-section {
  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }
}

.usage-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15);
  }

  .usage-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: #0ea5e9;
  }

  h3 {
    color: #075985;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    margin: 0 0 1.5rem;
    line-height: 1.6;
  }
}

.cache-duration {
  background: #e0f2fe;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  display: inline-block;

  .duration-label {
    color: #075985;
    font-weight: 500;
  }

  .duration-value {
    color: #0c4a6e;
    font-weight: 700;
  }
}

.pros-cons-section {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 0 2rem 2rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}

.pros,
.cons {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #bae6fd;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    padding: 0.8rem 0;
    border-bottom: 1px solid #f1f5f9;

    &:last-child {
      border-bottom: none;
    }

    .icon {
      margin-right: 0.8rem;
      font-size: 1.2rem;
      width: 24px;
      flex-shrink: 0;
    }
  }
}

.pros {
  border-left: 4px solid #10b981;

  h3 {
    color: #10b981;
  }

  li {
    color: #047857;
  }
}

.cons {
  border-left: 4px solid #ef4444;

  h3 {
    color: #ef4444;
  }

  li {
    color: #b91c1c;
  }
}

.best-practices {
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem 2rem;
  }
}

.practice-card {
  display: flex;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;

  .practice-number {
    width: 40px;
    height: 40px;
    background: #0ea5e9;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }

  .practice-content {
    h3 {
      color: #075985;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    p {
      color: #4b5563;
      margin: 0;
      line-height: 1.6;
    }
  }
}

.footer {
  background: linear-gradient(120deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 3rem 2rem;

  .summary {
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #e0f2fe;
    }

    p {
      font-size: 1.1rem;
      color: #cbd5e1;
      line-height: 1.7;
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;

    a {
      color: #7dd3fc;
      text-decoration: none;
      padding: 0.8rem 1.5rem;
      border-radius: 50px;
      border: 1px solid #334155;
      transition: all 0.3s ease;

      &:hover {
        background: #0ea5e9;
        color: white;
        border-color: #0ea5e9;
      }
    }
  }
}

@media (max-width: 768px) {
  .strong-caching {
    padding: 1rem;
  }

  .header {
    padding: 1.5rem;

    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .cache-flow {
    flex-direction: column;
    gap: 0.5rem;

    .flow-arrow {
      transform: rotate(90deg);
    }
  }

  .section-header {
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
    }
  }

  .mechanism-steps {
    grid-template-columns: 1fr;
  }
}
</style>
