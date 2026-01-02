<template>
  <div class="http-module-container">
    <header class="header">
      <h1>Node.js HTTP模块基本介绍</h1>
      <p class="subtitle">深入探索HTTP服务器与客户端的创建与管理</p>
    </header>

    <div class="content">
      <section class="card intro-section">
        <h2 class="section-title">HTTP模块概述</h2>
        <div class="module-description">
          <p>Node.js的<code>http</code>模块是构建Web应用程序的核心模块，它允许你创建HTTP服务器和客户端。</p>
          <p>使用<code>http</code>模块，你可以：</p>
          <ul>
            <li>创建HTTP服务器处理请求和响应</li>
            <li>发起HTTP请求到其他服务器</li>
            <li>处理HTTP事务</li>
            <li>实现RESTful API</li>
            <li>构建Web服务器和代理</li>
          </ul>
        </div>
      </section>

      <div class="columns">
        <section class="card methods-section">
          <h2 class="section-title">核心方法</h2>
          <div class="method">
            <h3><code>http.createServer([options][, requestListener])</code></h3>
            <p>创建一个HTTP服务器实例</p>
            <div class="code-block">
              <pre><code>const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
});
server.listen(3000);</code></pre>
            </div>
          </div>

          <div class="method">
            <h3><code>http.request(options[, callback])</code></h3>
            <p>发起HTTP请求到服务器</p>
            <div class="code-block">
              <pre><code>const req = http.request({
  hostname: 'example.com',
  port: 80,
  path: '/api/data',
  method: 'GET'
}, (res) => {
  // 处理响应
});</code></pre>
            </div>
          </div>

          <div class="method">
            <h3><code>http.get(options[, callback])</code></h3>
            <p>执行HTTP GET请求（简化版的request）</p>
            <div class="code-block">
              <pre><code>http.get('http://example.com/data', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
});</code></pre>
            </div>
          </div>
        </section>

        <section class="card classes-section">
          <h2 class="section-title">核心类与接口</h2>
          <div class="class">
            <h3><code>http.Server</code></h3>
            <p>HTTP服务器类，监听端口处理请求</p>
            <ul>
              <li><strong>事件</strong>: request, connection, close</li>
              <li><strong>方法</strong>: listen(), close()</li>
            </ul>
          </div>

          <div class="class">
            <h3><code>http.ServerResponse</code></h3>
            <p>服务器响应对象</p>
            <ul>
              <li><strong>方法</strong>: writeHead(), write(), end()</li>
              <li><strong>属性</strong>: statusCode, statusMessage</li>
            </ul>
          </div>

          <div class="class">
            <h3><code>http.IncomingMessage</code></h3>
            <p>传入的消息对象（请求或响应）</p>
            <ul>
              <li><strong>属性</strong>: method, url, headers</li>
              <li><strong>事件</strong>: data, end</li>
            </ul>
          </div>

          <div class="class">
            <h3><code>http.ClientRequest</code></h3>
            <p>客户端发出的请求对象</p>
            <ul>
              <li><strong>方法</strong>: write(), end(), abort()</li>
              <li><strong>事件</strong>: response, error</li>
            </ul>
          </div>
        </section>
      </div>

      <section class="card use-cases-section">
        <h2 class="section-title">使用场景</h2>
        <div class="use-case">
          <div class="case-card">
            <h3>Web服务器开发</h3>
            <p>创建自定义HTTP服务器处理客户端请求</p>
          </div>

          <div class="case-card">
            <h3>API服务</h3>
            <p>构建RESTful API接口服务</p>
          </div>

          <div class="case-card">
            <h3>代理服务器</h3>
            <p>创建HTTP代理转发请求</p>
          </div>

          <div class="case-card">
            <h3>Webhook接收器</h3>
            <p>接收和处理第三方服务的Webhook请求</p>
          </div>
        </div>
      </section>

      <section class="card best-practices-section">
        <h2 class="section-title">最佳实践与注意事项</h2>
        <ul class="practices-list">
          <li>始终处理错误事件，避免进程崩溃</li>
          <li>使用流式处理处理大数据请求/响应</li>
          <li>设置超时防止挂起连接耗尽资源</li>
          <li>在生产环境中使用成熟的框架（如Express）</li>
          <li>使用HTTPS（通过https模块）保证安全性</li>
          <li>正确处理请求头防止注入攻击</li>
        </ul>
      </section>
    </div>

    <footer class="footer">
      <p>Node.js HTTP模块提供了强大而灵活的低级HTTP功能，是构建Web应用的基础</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据（在实际应用中可能需要）
const serverExamples = ref([
  '创建HTTP服务器',
  '处理路由和请求',
  '设置响应头和状态码',
  '流式处理请求体'
]);

const clientExamples = ref([
  '向API发送GET/POST请求',
  '处理JSON响应',
  '管理请求头',
  '处理重定向和错误'
]);
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #41b883;
@secondary-color: #34495e;
@accent-color: #3498db;
@background-color: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2c3e50;
@border-color: #e0e0e0;
@code-bg: #f5f7fa;

// 布局
.http-module-container {
  font-family: 'Roboto', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: @background-color;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid @border-color;

  h1 {
    font-size: 2.5rem;
    margin: 0;
    color: @secondary-color;
    position: relative;
    padding-bottom: 15px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: @primary-color;
      border-radius: 2px;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: lighten(@text-color, 20%);
    margin-top: 10px;
  }
}

.content {
  display: grid;
  gap: 30px;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// 卡片通用样式
.card {
  background: @card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  font-size: 1.8rem;
  color: @primary-color;
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid lighten(@primary-color, 40%);
}

// 方法部分样式
.methods-section,
.classes-section {

  .method,
  .class {
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px dashed @border-color;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    h3 {
      font-size: 1.2rem;
      color: @accent-color;
      margin-top: 0;
      margin-bottom: 10px;
      font-family: 'Source Code Pro', monospace;
    }

    p {
      margin-top: 0;
      color: lighten(@text-color, 15%);
      line-height: 1.6;
    }
  }
}

// 使用场景样式
.use-cases-section {
  .use-case {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }

  .case-card {
    background: lighten(@primary-color, 50%);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      background: lighten(@primary-color, 45%);
      transform: translateY(-3px);
    }

    .icon {
      width: 60px;
      height: 60px;
      margin: 0 auto 15px;
      background: @primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 30px;
        height: 30px;
        fill: white;
      }
    }

    h3 {
      margin: 0 0 10px;
      color: @secondary-color;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      color: lighten(@text-color, 15%);
    }
  }
}

// 最佳实践样式
.best-practices-section {
  .practices-list {
    list-style-type: none;
    padding: 0;

    li {
      padding: 12px 15px;
      margin-bottom: 10px;
      background: lighten(@accent-color, 40%);
      border-left: 4px solid @accent-color;
      border-radius: 0 5px 5px 0;
      position: relative;
      padding-left: 35px;

      &::before {
        content: '✓';
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: @accent-color;
        font-weight: bold;
      }
    }
  }
}

// 代码块样式
.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  margin-top: 12px;
  overflow-x: auto;
  border: 1px solid darken(@code-bg, 5%);

  pre {
    margin: 0;
    font-family: 'Source Code Pro', monospace;
    font-size: 0.9rem;
    line-height: 1.5;

    code {
      color: darken(@accent-color, 15%);
    }
  }
}

// 页脚样式
.footer {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  color: lighten(@text-color, 30%);
  font-size: 0.95rem;
  border-top: 1px solid @border-color;
}

// 响应式调整
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .card {
    padding: 20px;
  }
}
</style>
