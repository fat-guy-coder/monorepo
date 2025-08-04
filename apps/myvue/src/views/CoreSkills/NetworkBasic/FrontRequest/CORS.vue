<script setup lang="ts">
import { ref } from 'vue'

// 当前选中的跨域方案
const activeSolution = ref('cors')

// 跨域解决方案数据
const solutions = ref([
  {
    id: 'cors',
    title: 'CORS（跨域资源共享）',
    description: '最主流的跨域解决方案，通过HTTP头部实现跨域访问控制',
    method: '后端配置',
    usage: `// 后端配置示例（Node.js Express）
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://yourdomain.com'); // 或 '*' 允许所有
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // 允许发送凭证
  next();
});`,
    scenarios: ['现代浏览器环境', '需要安全控制的跨域请求', '需要携带凭证（如cookie）的请求'],
    pros: ['标准化方案', '支持所有HTTP方法', '安全性高', '现代浏览器广泛支持'],
    cons: ['需要后端配合', '复杂请求会触发预检', 'IE9及以下不支持']
  },
  {
    id: 'jsonp',
    title: 'JSONP',
    description: '利用script标签不受同源策略限制的特性实现跨域',
    method: '前端实现',
    usage: `// 前端实现
function jsonp(url, callback) {
  const script = document.createElement('script');
  const callbackName = 'jsonp_callback_' + Date.now();

  window[callbackName] = function(data) {
    callback(data);
    delete window[callbackName];
    document.body.removeChild(script);
  };

  script.src = \`\${url}?callback=\${callbackName}\`;
  document.body.appendChild(script);
}

// 后端响应（Node.js Express）
app.get('/api/data', (req, res) => {
  const callback = req.query.callback;
  const data = { message: 'Hello from JSONP!' };
  res.send(\`\${callback}(\${JSON.stringify(data)})\`);
});`,
    scenarios: ['支持老旧浏览器', '仅需GET请求', '不需要安全控制的简单场景'],
    pros: ['兼容性好（支持IE6+）', '不需要后端特殊配置', '实现简单'],
    cons: ['仅支持GET方法', '安全性差（XSS风险）', '错误处理困难', '无法设置请求头']
  },
  {
    id: 'proxy',
    title: '代理服务器',
    description: '通过同源服务器转发请求，绕过浏览器同源策略',
    method: '开发环境/服务器配置',
    usage: `// 开发环境配置（Vite）
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://target-domain.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\\/api/, '')
      }
    }
  }
})

// Nginx配置
server {
  listen 80;
  server_name your-domain.com;

  location /api/ {
    proxy_pass http://target-domain.com/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}`,
    scenarios: ['开发环境调试', '生产环境部署', '需要完全控制跨域请求', '需要支持所有HTTP方法'],
    pros: ['前端无需特殊处理', '支持所有HTTP方法', '可添加认证和缓存', '解决所有浏览器兼容性问题'],
    cons: ['需要服务器支持', '增加网络跳转', '生产环境需要额外配置', '可能增加延迟']
  },
  {
    id: 'cdn',
    title: 'CDN',
    description: '通过CDN服务提供跨域资源',
    method: 'CDN服务',
    usage: `// CDN服务配置
// 配置CDN服务提供跨域资源
`,
    scenarios: ['需要跨域资源', '需要缓存资源', '需要支持所有HTTP方法'],
    pros: ['前端无需特殊处理', '支持所有HTTP方法', '可添加认证和缓存', '解决所有浏览器兼容性问题'],
    cons: ['需要服务器支持', '增加网络跳转', '生产环境需要额外配置', '可能增加延迟']
  },
  {
    id: 'websocket',
    title: 'WebSocket',
    description: '使用WebSocket协议实现跨域双向通信',
    method: '前后端实现',
    usage: `// 前端实现
const socket = new WebSocket('ws://cross-domain-server.com');

socket.onopen = () => {
  socket.send(JSON.stringify({ type: 'message', data: 'Hello' }));
};

socket.onmessage = (event) => {
  console.log('Received:', JSON.parse(event.data));
};

// 后端实现（Node.js ws库）
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    ws.send(\`Echo: \${message}\`);
  });
});`,
    scenarios: ['实时通信应用', '聊天系统', '实时数据监控', '多人协作工具'],
    pros: ['双向实时通信', '不受同源策略限制', '高效（少头部开销）', '支持跨域'],
    cons: ['需要服务端支持WebSocket', '协议升级需要额外处理', '连接状态管理复杂', '老浏览器兼容性问题']
  },
  {
    id: 'postMessage',
    title: 'postMessage API',
    description: '允许不同源的窗口/iframe间安全地传递消息',
    method: '前端实现',
    usage: `// 发送消息方（父页面）
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage({ key: 'value' }, 'https://target-domain.com');

// 接收消息方（iframe内）
window.addEventListener('message', (event) => {
  // 验证来源
  if (event.origin !== 'https://parent-domain.com') return;

  console.log('Received data:', event.data);

  // 可选：回传消息
  event.source.postMessage({ response: 'ACK' }, event.origin);
});`,
    scenarios: ['跨域iframe通信', '多窗口应用', '微前端架构', '第三方插件集成'],
    pros: ['安全（需验证origin）', '支持任意数据结构', '现代浏览器广泛支持', '不需要服务器参与'],
    cons: ['仅适用于窗口/iframe间通信', '需要建立信任关系', '需要精确控制消息来源', 'IE8+部分支持']
  },
  {
    id: 'other',
    title: '其他方法',
    description: '一些特殊场景下的跨域解决方案',
    method: '多种',
    usage: `// 1. document.domain（仅限同主域）
// 页面A：a.yourdomain.com
document.domain = 'yourdomain.com';

// 页面B：b.yourdomain.com
document.domain = 'yourdomain.com';

// 2. window.name
// 页面A设置
window.name = JSON.stringify(data);

// 页面B读取
const data = JSON.parse(window.name);

// 3. location.hash
// 页面A设置iframe的hash
iframe.src = 'https://target.com#' + encodeURIComponent(data);

// 页面B监听hash变化
window.onhashchange = () => {
  const data = decodeURIComponent(location.hash.substring(1));
};`,
    scenarios: ['同主域不同子域', '简单数据传递', '老旧浏览器支持'],
    pros: ['兼容老浏览器', '实现简单'],
    cons: ['功能有限', '安全性问题', '现代应用不推荐']
  }
])

// 设置当前激活的解决方案
const setActiveSolution = (id: string) => {
  activeSolution.value = id
}
</script>

<template>
  <div class="cross-origin-container">
    <header class="header">
      <h1>前端跨域解决方案基础介绍</h1>
      <div class="subtitle">基础解析跨域问题及其应对策略</div>
    </header>

    <main class="content">
      <section class="intro-section">
        <h2>什么是跨域？</h2>
        <div class="definition-card">
          <p><strong>跨域（Cross-Origin）</strong>是指浏览器出于安全考虑，限制了从不同源（协议+域名+端口）加载的资源或脚本的交互。</p>
          <p>同源策略（Same-Origin Policy）是浏览器的核心安全机制，它阻止一个域的文档或脚本与另一个域的资源进行交互。</p>
          <p>跨域限制了js的访问其他域页面，比如js不能访问其他域的cookie、localStorage、html等</p>
          <p>但是跨域不限制img、link、script、video、audio、iframe等标签的访问</p>
        </div>

        <h3>为什么需要跨域解决方案？</h3>
        <div class="reasons">
          <div class="reason-card">
            <div class="icon">🌐</div>
            <h4>微服务架构</h4>
            <p>现代应用通常由多个独立服务组成，需要跨域通信</p>
          </div>
          <div class="reason-card">
            <div class="icon">🔌</div>
            <h4>第三方API集成</h4>
            <p>集成支付、地图等第三方服务需要跨域访问</p>
          </div>
          <div class="reason-card">
            <div class="icon">🏗️</div>
            <h4>前后端分离</h4>
            <p>前端应用独立部署时需访问后端API</p>
          </div>
          <div class="reason-card">
            <div class="icon">🧩</div>
            <h4>多系统集成</h4>
            <p>企业内多个系统间需要安全通信</p>
          </div>
        </div>
      </section>

      <section class="same-origin-section">
        <h2>同源策略基础介绍</h2>
        <div class="origin-examples">
          <div class="example-card">
            <h3>同源示例</h3>
            <p>假设当前页面的URL是: <code>http://example.com/page.html</code></p>
            <ul>
              <li class="success">✅ http://example.com/other.html</li>
              <li class="success">✅ http://example.com/subdirectory/page.html</li>
              <li class="success">✅ http://example.com:80/page.html</li>
            </ul>
          </div>
          <div class="example-card">
            <h3>非同源示例</h3>
            <ul>
              <li class="error">❌ https://example.com/page.html <span>(协议不同)</span></li>
              <li class="error">❌ http://sub.example.com/page.html <span>(子域名不同)</span></li>
              <li class="error">❌ http://example.com:8080/page.html <span>(端口不同)</span></li>
              <li class="error">❌ http://other-domain.com/page.html <span>(域名不同)</span></li>
            </ul>
          </div>
        </div>

        <div class="restriction-card">
          <h3>同源策略限制内容</h3>
          <div class="restrictions">
            <div class="restriction-item">
              <span class="icon">🔒</span>
              <h4>Cookie、LocalStorage 和 IndexDB</h4>
              <p>不同源的网页无法读取对方的 Cookie、LocalStorage 或 IndexDB 数据</p>
            </div>
            <div class="restriction-item">
              <span class="icon">📄</span>
              <h4>DOM 访问</h4>
              <p>不同源的网页无法获取对方的 DOM</p>
            </div>
            <div class="restriction-item">
              <span class="icon">🔌</span>
              <h4>AJAX 请求</h4>
              <p>不同源的网页无法发送 AJAX 请求（除非采用跨域解决方案）</p>
            </div>
          </div>
        </div>
      </section>

      <section class="solutions-section">
        <h2>跨域解决方案</h2>
        <div class="solution-selector">
          <button v-for="solution in solutions" :key="solution.id" :class="{ active: activeSolution === solution.id }"
            @click="setActiveSolution(solution.id)">
            {{ solution.title }}
          </button>
        </div>

        <div class="solution-details">
          <div v-for="solution in solutions" :key="solution.id" v-show="activeSolution === solution.id"
            class="solution-card">
            <h3>{{ solution.title }}</h3>
            <p class="description">{{ solution.description }}</p>

            <div class="detail-grid">
              <div class="detail-item">
                <h4>实现方式</h4>
                <p>{{ solution.method }}</p>
              </div>
              <div class="detail-item">
                <h4>使用场景</h4>
                <ul>
                  <li v-for="(scenario, index) in solution.scenarios" :key="index">{{ scenario }}</li>
                </ul>
              </div>
              <div class="detail-item pros">
                <h4>优点</h4>
                <ul>
                  <li v-for="(pro, index) in solution.pros" :key="index">{{ pro }}</li>
                </ul>
              </div>
              <div class="detail-item cons">
                <h4>缺点</h4>
                <ul>
                  <li v-for="(con, index) in solution.cons" :key="index">{{ con }}</li>
                </ul>
              </div>
            </div>

            <div class="code-sample">
              <h4>配置/使用示例</h4>
              <pre>{{ solution.usage }}</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="summary-section">
        <h2>跨域方案选择建议</h2>
        <div class="recommendation">
          <div class="recommendation-card">
            <h3>开发环境</h3>
            <p>推荐使用代理服务器（如Vite/Webpack代理）</p>
            <p>优点：配置简单，无需修改生产代码</p>
          </div>
          <div class="recommendation-card">
            <h3>生产环境</h3>
            <p>优先使用CORS（需后端配合）</p>
            <p>备选：代理服务器（Nginx反向代理）</p>
          </div>
          <div class="recommendation-card">
            <h3>特殊场景</h3>
            <p>实时通信：WebSocket</p>
            <p>第三方脚本集成：JSONP/postMessage</p>
            <p>跨窗口通信：postMessage</p>
          </div>
        </div>
      </section>
    </main>


    <section class="options-section">
      <h2>预检请求(OPTIONS)基础介绍</h2>
      <div class="options-content">
        <div class="options-card">
          <h3>什么是预检请求?</h3>
          <p>预检请求是浏览器在发送实际跨域请求之前,先发送一个 OPTIONS 请求,用于检查实际请求是否被服务器允许。</p>
        </div>

        <div class="options-card">
          <h3>触发条件</h3>
          <ul>
            <li>使用非简单请求方法: PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH</li>
            <li>包含自定义请求头</li>
            <li>Content-Type 为 application/json 等非简单值</li>
          </ul>
        </div>

        <div class="options-card">
          <h3>预检请求头部</h3>
          <div class="code-block">
            <pre>
OPTIONS /api/data HTTP/1.1
Origin: http://example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type</pre>
          </div>
        </div>

        <div class="options-card">
          <h3>预检响应要求</h3>
          <ul>
            <li>Access-Control-Allow-Origin: 允许的源</li>
            <li>Access-Control-Allow-Methods: 允许的方法</li>
            <li>Access-Control-Allow-Headers: 允许的头部</li>
            <li>Access-Control-Max-Age: 预检结果缓存时间</li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2023 前端跨域解决方案指南 | 使用Vue 3 + TypeScript实现</p>
      <p>同源策略是浏览器的安全基石，跨域解决方案需在安全与功能间取得平衡</p>
    </footer>
  </div>
</template>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4895ef;
@light-color: #f8f9fa;
@dark-color: #212529;
@success-color: #4cc9f0;
@warning-color: #f72585;
@border-radius: 8px;
@box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
@transition: all 0.3s ease;

.cross-origin-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @dark-color;
  background-color: #f5f7ff;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  border-radius: @border-radius;
  margin-bottom: 30px;
  box-shadow: @box-shadow;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content {
  background: white;
  border-radius: @border-radius;
  padding: 30px;
  box-shadow: @box-shadow;
  margin-bottom: 30px;
}

h2 {
  color: @primary-color;
  font-size: 1.8rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid @accent-color;
}

h3 {
  color: @secondary-color;
  font-size: 1.5rem;
  margin: 25px 0 15px;
}

h4 {
  color: @primary-color;
  font-size: 1.2rem;
  margin: 15px 0 10px;
}

.intro-section {
  .definition-card {
    background-color: @light-color;
    padding: 20px;
    border-radius: @border-radius;
    margin-bottom: 30px;
    border-left: 4px solid @accent-color;

    p {
      line-height: 1.6;
      margin-bottom: 10px;
    }
  }

  .reasons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;

    .reason-card {
      background: white;
      border-radius: @border-radius;
      padding: 20px;
      text-align: center;
      box-shadow: @box-shadow;
      transition: @transition;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h4 {
        color: @secondary-color;
        margin: 10px 0;
      }

      p {
        color: #666;
        font-size: 0.95rem;
      }
    }
  }
}

.solutions-section {
  .solution-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;

    button {
      background: white;
      border: 2px solid @primary-color;
      color: @primary-color;
      padding: 10px 20px;
      border-radius: 30px;
      cursor: pointer;
      font-weight: 600;
      transition: @transition;

      &:hover {
        background: lighten(@primary-color, 45%);
      }

      &.active {
        background: @primary-color;
        color: white;
      }
    }
  }

  .solution-card {
    background: @light-color;
    border-radius: @border-radius;
    padding: 25px;
    box-shadow: @box-shadow;

    .description {
      font-size: 1.1rem;
      margin-bottom: 20px;
      color: #555;
      padding-bottom: 15px;
      border-bottom: 1px solid #ddd;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 25px;

      .detail-item {
        background: white;
        padding: 15px;
        border-radius: @border-radius;

        ul {
          padding-left: 20px;
          margin: 10px 0;

          li {
            margin-bottom: 8px;
            line-height: 1.4;
          }
        }

        &.pros {
          border-left: 4px solid @success-color;
        }

        &.cons {
          border-left: 4px solid @warning-color;
        }
      }
    }

    .code-sample {
      background: #2d3748;
      color: #e2e8f0;
      border-radius: @border-radius;
      padding: 20px;
      overflow-x: auto;

      h4 {
        color: #81e6d9;
        margin-top: 0;
      }

      pre {
        margin: 0;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }
}

.summary-section {
  .recommendation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .recommendation-card {
      background: white;
      border-radius: @border-radius;
      padding: 25px;
      box-shadow: @box-shadow;
      border-top: 4px solid @accent-color;

      h3 {
        color: @primary-color;
        margin-top: 0;
      }

      p {
        line-height: 1.6;
        margin-bottom: 10px;
      }
    }
  }
}

.footer {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 0.9rem;

  p {
    margin: 5px 0;
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .solution-selector {
    flex-direction: column;

    button {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}


.same-origin-section {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 2rem 0;
}

.origin-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.example-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.example-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.example-card code {
  background: #f1f1f1;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

.example-card ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.example-card li {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.error {
  background: #ffebee;
  color: #c62828;
}

.error span {
  margin-left: auto;
  font-size: 0.9em;
  color: #666;
}

.restriction-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.restrictions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.restriction-item {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.restriction-item .icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  display: block;
}

.restriction-item h4 {
  color: #2c3e50;
  margin: 0.5rem 0;
}

.restriction-item p {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}
</style>
