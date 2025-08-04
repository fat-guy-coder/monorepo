<template>
  <div class="mock-container">
    <header class="mock-header">
      <h1>前端 Mock 方案基本介绍</h1>
      <p class="subtitle">高效模拟 API 数据，提升开发体验</p>
      <div class="mock-visual">
        <div class="frontend">前端应用</div>
        <div class="arrows">⬅️ ➡️</div>
        <div class="mock-server">Mock 服务</div>
        <div class="mock-data">📄 模拟数据</div>
      </div>
    </header>

    <div class="content-wrapper">
      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📚</span>
          为什么需要 Mock 数据？
        </h2>
        <div class="reasons">
          <div class="reason">
            <div class="icon">⏱️</div>
            <h3>前后端并行开发</h3>
            <p>前端不依赖后端 API 完成进度</p>
          </div>
          <div class="reason">
            <div class="icon">🧪</div>
            <h3>测试边界情况</h3>
            <p>模拟各种异常场景和极端数据</p>
          </div>
          <div class="reason">
            <div class="icon">🚀</div>
            <h3>开发效率提升</h3>
            <p>避免等待后端接口，加速开发进程</p>
          </div>
          <div class="reason">
            <div class="icon">📱</div>
            <h3>离线开发能力</h3>
            <p>在没有网络或后端服务时继续开发</p>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🛠️</span>
          Mock 方案对比
        </h2>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>方案</th>
                <th>安装难度</th>
                <th>灵活性</th>
                <th>真实性</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>手动 Mock</strong></td>
                <td>⭐️</td>
                <td>⭐️⭐️</td>
                <td>⭐️⭐️</td>
                <td>简单场景、快速原型</td>
              </tr>
              <tr>
                <td><strong>Mock.js</strong></td>
                <td>⭐️⭐️</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>⭐️⭐️⭐️</td>
                <td>数据驱动型应用</td>
              </tr>
              <tr>
                <td><strong>JSON Server</strong></td>
                <td>⭐️⭐️⭐️</td>
                <td>⭐️⭐️⭐️</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>RESTful API 模拟</td>
              </tr>
              <tr>
                <td><strong>MSW</strong></td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>⭐️⭐️⭐️⭐️⭐️</td>
                <td>生产环境、测试环境</td>
              </tr>
              <tr>
                <td><strong>本地 JSON</strong></td>
                <td>⭐️</td>
                <td>⭐️</td>
                <td>⭐️⭐️</td>
                <td>静态数据展示</td>
              </tr>
              <tr>
                <td><strong>代理服务器</strong></td>
                <td>⭐️⭐️⭐️</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>⭐️⭐️⭐️⭐️</td>
                <td>复杂请求拦截</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💻</span>
          Mock.js 方案
        </h2>
        <div class="mock-solution">
          <div class="solution-header">
            <div class="logo">M</div>
            <div class="solution-info">
              <h3>Mock.js</h3>
              <p>数据生成与拦截库</p>
              <div class="install">npm install mockjs</div>
            </div>
          </div>
          <div class="solution-content">
            <div class="solution-detail">
              <h4>核心功能</h4>
              <ul>
                <li>随机数据生成</li>
                <li>拦截 Ajax 请求</li>
                <li>自定义数据模板</li>
                <li>支持 RESTful API</li>
              </ul>

              <h4>使用方式</h4>
              <pre class="code-block">import Mock from 'mockjs';

// 模拟用户数据
Mock.mock('/api/users', {
  'list|10': [{
    'id|+1': 1,
    'name': '@cname',
    'age|20-60': 1,
    'email': '@email',
    'address': '@county(true)'
  }]
});

// 拦截 GET /api/users 请求
// 返回模拟数据</pre>
            </div>
            <div class="solution-scenario">
              <h4>适用场景</h4>
              <ul>
                <li>需要大量随机数据的应用</li>
                <li>快速原型开发</li>
                <li>前后端分离开发模式</li>
                <li>数据可视化项目</li>
              </ul>

              <h4>优点</h4>
              <ul class="pros">
                <li>丰富的随机数据生成器</li>
                <li>简单易用的 API</li>
                <li>与前端框架无缝集成</li>
                <li>支持多种数据格式</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">🔌</span>
          MSW (Mock Service Worker)
        </h2>
        <div class="mock-solution">
          <div class="solution-header">
            <div class="logo">MSW</div>
            <div class="solution-info">
              <h3>Mock Service Worker</h3>
              <p>基于 Service Worker 的 API Mocking</p>
              <div class="install">npm install msw --save-dev</div>
            </div>
          </div>
          <div class="solution-content">
            <div class="solution-detail">
              <h4>核心功能</h4>
              <ul>
                <li>拦截网络请求</li>
                <li>支持 REST 和 GraphQL</li>
                <li>浏览器和 Node.js 环境</li>
                <li>无缝切换真实 API</li>
              </ul>

              <h4>使用方式</h4>
              <pre class="code-block">// handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' }
        ]
      })
    );
  })
];

// 浏览器环境
// worker.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
worker.start();

// 测试环境
// server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);</pre>
            </div>
            <div class="solution-scenario">
              <h4>适用场景</h4>
              <ul>
                <li>单元测试和集成测试</li>
                <li>开发环境 API 模拟</li>
                <li>离线 PWA 应用</li>
                <li>生产环境降级处理</li>
              </ul>

              <h4>优点</h4>
              <ul class="pros">
                <li>基于标准 Service Worker</li>
                <li>支持浏览器和 Node.js</li>
                <li>不影响应用代码</li>
                <li>可以模拟网络错误</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📡</span>
          JSON Server 方案
        </h2>
        <div class="mock-solution">
          <div class="solution-header">
            <div class="logo">JS</div>
            <div class="solution-info">
              <h3>JSON Server</h3>
              <p>零编码创建 REST API</p>
              <div class="install">npm install -g json-server</div>
            </div>
          </div>
          <div class="solution-content">
            <div class="solution-detail">
              <h4>核心功能</h4>
              <ul>
                <li>基于 JSON 文件的 REST API</li>
                <li>支持 GET, POST, PUT, PATCH, DELETE</li>
                <li>过滤、排序、分页</li>
                <li>关系数据支持</li>
              </ul>

              <h4>使用方式</h4>
              <pre class="code-block">// db.json
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
  ],
  "posts": [
    { "id": 1, "userId": 1, "title": "Hello World" }
  ]
}

// 启动服务器
json-server --watch db.json --port 3001

// 前端访问
fetch('http://localhost:3001/users')
  .then(res => res.json())
  .then(users => console.log(users));</pre>
            </div>
            <div class="solution-scenario">
              <h4>适用场景</h4>
              <ul>
                <li>全功能 REST API 模拟</li>
                <li>前端开发原型验证</li>
                <li>后端 API 设计验证</li>
                <li>演示和教学环境</li>
              </ul>

              <h4>优点</h4>
              <ul class="pros">
                <li>零编码创建完整 API</li>
                <li>支持所有 REST 操作</li>
                <li>数据持久化到文件</li>
                <li>支持自定义路由</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">⚙️</span>
          其他 Mock 方案
        </h2>
        <div class="other-solutions">
          <div class="solution">
            <div class="icon">📝</div>
            <h3>手动 Mock</h3>
            <pre class="code-block">// api.js
export const getUsers = () => {
  if (process.env.NODE_ENV === 'development') {
    return Promise.resolve([
      { id: 1, name: 'Mock User' }
    ]);
  }
  return fetch('/api/users').then(res => res.json());
};</pre>
            <p><strong>场景：</strong>简单项目、快速原型、少量数据</p>
          </div>

          <div class="solution">
            <div class="icon">📂</div>
            <h3>本地 JSON 文件</h3>
            <pre class="code-block">import mockData from './mockData.json';

fetch('/api/users')
  .catch(() => {
    // 请求失败时使用本地数据
    return { json: () => mockData.users };
  });</pre>
            <p><strong>场景：</strong>静态数据展示、离线应用、演示环境</p>
          </div>

          <div class="solution">
            <div class="icon">🔄</div>
            <h3>代理服务器</h3>
            <pre class="code-block">// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        pathRewrite: { '^/api': '/mock-api' }
      }
    }
  }
};</pre>
            <p><strong>场景：</strong>复杂请求转发、跨域处理、多环境配置</p>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">📊</span>
          Mock 方案选择指南
        </h2>
        <div class="selection-guide">
          <div class="criteria">
            <h3>选择标准</h3>
            <div class="criterion">
              <div class="icon">🏢</div>
              <div class="content">
                <h4>项目复杂度</h4>
                <p>简单项目使用手动Mock，复杂项目使用MSW或JSON Server</p>
              </div>
            </div>
            <div class="criterion">
              <div class="icon">🔄</div>
              <div class="content">
                <h4>API 类型</h4>
                <p>REST API 选 JSON Server，混合API选MSW</p>
              </div>
            </div>
            <div class="criterion">
              <div class="icon">🧪</div>
              <div class="content">
                <h4>测试需求</h4>
                <p>需要单元测试选MSW，只需开发Mock选Mock.js</p>
              </div>
            </div>
            <div class="criterion">
              <div class="icon">🚀</div>
              <div class="content">
                <h4>性能要求</h4>
                <p>高性能场景选代理服务器或Service Worker方案</p>
              </div>
            </div>
          </div>

          <div class="decision-tree">
            <h3>决策流程图</h3>
            <div class="tree">
              <div class="node">需要拦截网络请求？</div>
              <div class="branch">
                <div class="yes">是 → 需要支持测试？</div>
                <div class="no">否 → 只需要静态数据？</div>
              </div>
              <div class="branch">
                <div class="no-space"></div>
                <div class="yes">是 → 使用 MSW</div>
                <div class="no">否 → 使用 Mock.js</div>
              </div>
              <div class="branch">
                <div class="no-space"></div>
                <div class="no-space"></div>
                <div class="yes">是 → 使用本地JSON</div>
                <div class="no">否 → 需要完整REST API？</div>
              </div>
              <div class="branch">
                <div class="no-space"></div>
                <div class="no-space"></div>
                <div class="no-space"></div>
                <div class="yes">是 → 使用 JSON Server</div>
                <div class="no">否 → 使用手动Mock</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2 class="section-title">
          <span class="icon">💎</span>
          Mock 最佳实践
        </h2>
        <div class="best-practices">
          <div class="practice">
            <div class="icon">1</div>
            <div class="content">
              <h3>分层设计</h3>
              <p>将 Mock 逻辑与业务代码分离，便于切换真实 API</p>
            </div>
          </div>
          <div class="practice">
            <div class="icon">2</div>
            <div class="content">
              <h3>环境区分</h3>
              <p>根据环境变量启用/禁用 Mock，避免生产环境使用</p>
            </div>
          </div>
          <div class="practice">
            <div class="icon">3</div>
            <div class="content">
              <h3>数据真实性</h3>
              <p>模拟数据应尽可能接近真实数据结构</p>
            </div>
          </div>
          <div class="practice">
            <div class="icon">4</div>
            <div class="content">
              <h3>错误模拟</h3>
              <p>模拟各种 HTTP 状态码和网络错误</p>
            </div>
          </div>
          <div class="practice">
            <div class="icon">5</div>
            <div class="content">
              <h3>文档同步</h3>
              <p>保持 Mock 数据与 API 文档同步更新</p>
            </div>
          </div>
          <div class="practice">
            <div class="icon">6</div>
            <div class="content">
              <h3>性能优化</h3>
              <p>避免复杂计算，使用轻量级 Mock 方案</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="mock-footer">
      <p>合理使用 Mock 方案可以显著提升前端开发效率和应用质量</p>
      <div class="conclusion">根据项目需求选择适合的 Mock 方案，构建更健壮的前端应用</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑可以在这里添加
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

// 颜色变量
@primary-color: #3498db;
@secondary-color: #2ecc71;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;
@mock-color: #9b59b6;
@msw-color: #e74c3c;
@json-server-color: #f39c12;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.mock-container {
  font-family: 'Inter', sans-serif;
  background-color: @background-color;
  color: @text-color;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.6;
}

.mock-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    color: @mock-color;
    margin-bottom: 10px;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: @light-text;
    max-width: 600px;
    margin: 0 auto 30px;
  }
}

.mock-visual {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  .frontend,
  .mock-server {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    font-weight: 600;
    font-size: 1.2rem;
    min-width: 150px;
    text-align: center;
  }

  .arrows {
    font-size: 1.5rem;
  }

  .mock-data {
    background: @mock-color;
    color: white;
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 1.1rem;
    margin-top: 10px;
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 30px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: @text-color;
  font-weight: 600;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 10px;

  .icon {
    margin-right: 12px;
    font-size: 1.5rem;
    color: @mock-color;
  }
}

// 原因部分
.reasons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;

  .reason {
    text-align: center;
    padding: 25px 15px;
    background: #f5f1fa;
    border-radius: 8px;
    border-top: 4px solid @mock-color;

    .icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: @mock-color;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: @text-color;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

// 对比表格
.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #eaeaea;
    }

    th {
      background: #f5f1fa;
      color: @mock-color;
      font-weight: 600;
      position: sticky;
      top: 0;
    }

    tr:hover {
      background: #f9fbfd;
    }

    td {

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        text-align: center;
      }
    }
  }
}

// Mock 方案
.mock-solution {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eaeaea;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
}

.solution-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f5f1fa;
  border-bottom: 1px solid #eaeaea;

  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: white;
    font-size: 1.8rem;
    margin-right: 20px;
    flex-shrink: 0;

    background: @mock-color;
  }

  .solution-info {
    flex: 1;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 5px;
      color: @text-color;
    }

    p {
      color: @light-text;
      margin-bottom: 8px;
    }

    .install {
      font-family: 'Fira Code', monospace;
      background: #e9e3f3;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.9rem;
      display: inline-block;
      color: @mock-color;
    }
  }
}

.solution-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 30px;
  padding: 25px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.solution-detail {
  h4 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @mock-color;
  }

  ul {
    list-style-type: none;
    margin-bottom: 20px;

    li {
      padding: 8px 0;
      position: relative;
      padding-left: 25px;

      &:before {
        content: '•';
        position: absolute;
        left: 10px;
        color: @mock-color;
        font-size: 1.2rem;
      }
    }
  }
}

.solution-scenario {
  background: #f9fbfd;
  border-radius: 8px;
  padding: 20px;

  h4 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @mock-color;
  }

  ul {
    list-style-type: none;
    margin-bottom: 20px;

    li {
      padding: 8px 0;
      position: relative;
      padding-left: 25px;

      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: @secondary-color;
      }
    }

    &.pros li:before {
      color: @secondary-color;
    }
  }
}

// 代码块
.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 15px 0;
  border: 1px solid #e1e4e8;
}

// 其他方案
.other-solutions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;

  .solution {
    background: #f9fbfd;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid @mock-color;

    .icon {
      font-size: 2rem;
      margin-bottom: 15px;
      color: @mock-color;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: @text-color;
    }

    p {
      color: @light-text;
      margin-top: 15px;
      font-size: 0.95rem;

      strong {
        color: @mock-color;
      }
    }
  }
}

// 选择指南
.selection-guide {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.criteria {
  .criterion {
    display: flex;
    gap: 15px;
    padding: 15px;
    margin-bottom: 15px;
    background: #f5f1fa;
    border-radius: 8px;

    .icon {
      font-size: 2rem;
      flex-shrink: 0;
      color: @mock-color;
    }

    h4 {
      font-size: 1.2rem;
      margin-bottom: 5px;
      color: @text-color;
    }

    p {
      color: @light-text;
      font-size: 0.95rem;
    }
  }
}

.decision-tree {
  background: #f9fbfd;
  border-radius: 8px;
  padding: 20px;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: @text-color;
  }

  .tree {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .node {
      background: @mock-color;
      color: white;
      padding: 10px 15px;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }

    .branch {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-left: 30px;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -20px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #eaeaea;
      }
    }

    .yes,
    .no {
      padding: 8px 15px;
      border-radius: 20px;
      font-weight: 500;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: -20px;
        top: 50%;
        width: 20px;
        height: 2px;
        background: #eaeaea;
      }
    }

    .yes {
      background: @secondary-color;
      color: white;
    }

    .no {
      background: #f5f1fa;
    }

    .no-space {
      height: 15px;
    }
  }
}

// 最佳实践
.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

  .practice {
    display: flex;
    gap: 15px;
    padding: 20px;
    background: #f5f1fa;
    border-radius: 8px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    .icon {
      min-width: 40px;
      height: 40px;
      background: @mock-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .content {
      h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: @text-color;
      }

      p {
        color: @light-text;
        font-size: 0.95rem;
      }
    }
  }
}

.mock-footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 30px;
  border-top: 1px solid @border-color;
  color: @light-text;
  font-size: 1rem;

  .conclusion {
    margin-top: 15px;
    font-size: 1.2rem;
    font-weight: 600;
    color: @mock-color;
    max-width: 800px;
    margin: 20px auto 0;
    padding: 15px;
    background: rgba(155, 89, 182, 0.1);
    border-radius: 8px;
  }
}

// 响应式调整
@media (max-width: 768px) {
  .mock-header h1 {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .solution-content {
    grid-template-columns: 1fr;
  }
}
</style>
