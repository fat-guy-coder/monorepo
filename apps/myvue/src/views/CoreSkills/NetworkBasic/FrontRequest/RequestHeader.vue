<template>
  <div class="headers-container">
    <header class="header-banner">
      <div class="title-container">
        <h1>HTTP请求头基本介绍</h1>
        <p class="subtitle">前端开发必备的HTTP知识</p>
      </div>
      <div class="network-icon">
        <div class="server">🌐 服务器</div>
        <div class="arrows">
          <div class="arrow">➡️</div>
          <div class="arrow">⬅️</div>
        </div>
        <div class="client">💻 客户端</div>
      </div>
    </header>

    <div class="content-wrapper">
      <section class="intro-section">
        <h2>什么是HTTP请求头？</h2>
        <p>
          HTTP请求头（HTTP Request Headers）是HTTP协议中客户端向服务器发送请求时附加的元数据信息。它们以键值对的形式传递，位于HTTP请求的起始行之后、请求体之前。
        </p>
        <div class="http-example">
          <pre>GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Language: en-US</pre>
        </div>
      </section>

      <section class="purpose-section">
        <h2>请求头的主要作用</h2>
        <div class="purpose-cards">
          <div class="purpose-card">
            <div class="icon">🌐</div>
            <h3>内容协商</h3>
            <p>告诉服务器客户端能够处理的内容类型、编码和语言</p>
          </div>
          <div class="purpose-card">
            <div class="icon">🔐</div>
            <h3>身份验证</h3>
            <p>携带认证凭据如token、cookies等</p>
          </div>
          <div class="purpose-card">
            <div class="icon">⚡</div>
            <h3>缓存控制</h3>
            <p>指定缓存策略以优化性能</p>
          </div>
          <div class="purpose-card">
            <div class="icon">🛡️</div>
            <h3>安全控制</h3>
            <p>防止跨站攻击和确保安全传输</p>
          </div>
        </div>
      </section>

      <section class="config-section">
        <h2>常用请求头配置项</h2>
        <div class="table-container">
          <table class="headers-table">
            <thead>
              <tr>
                <th>请求头</th>
                <th>示例值</th>
                <th>作用</th>
                <th>使用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="header in headers" :key="header.name">
                <td><code>{{ header.name }}</code></td>
                <td><code>{{ header.example }}</code></td>
                <td>{{ header.purpose }}</td>
                <td>{{ header.scenario }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="code-section">
        <h2>在Vue3中设置请求头</h2>
        <div class="code-examples">
          <div class="code-block">
            <h3>使用axios</h3>
            <pre>import axios from 'axios';

axios.get('/api/data', {
  headers: {
    'Authorization': 'Bearer token123',
    'X-Custom-Header': 'value'
  }
});</pre>
          </div>
          <div class="code-block">
            <h3>使用fetch API</h3>
            <pre>fetch('/api/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  }
});</pre>
          </div>
        </div>
      </section>

      <section class="best-practices">
        <h2>最佳实践</h2>
        <ul>
          <li>仅发送必要的请求头，减少请求体积</li>
          <li>敏感信息使用安全头（如Authorization）</li>
          <li>设置适当的缓存头优化性能</li>
          <li>使用CORS头处理跨域请求</li>
          <li>遵循HTTP规范，使用标准头部名称</li>
        </ul>
      </section>
    </div>

    <footer class="page-footer">
      <p>© 2023 HTTP请求头基本介绍 | Vue3技术演示</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface HeaderInfo {
  name: string;
  example: string;
  purpose: string;
  scenario: string;
}

const headers = ref<HeaderInfo[]>([
  {
    name: 'Accept',
    example: 'application/json',
    purpose: '指定客户端能够处理的内容类型',
    scenario: 'API请求，内容协商'
  },
  {
    name: 'Authorization',
    example: 'Bearer token123',
    purpose: '携带身份验证凭据',
    scenario: '访问受保护的资源'
  },
  {
    name: 'Content-Type',
    example: 'application/json',
    purpose: '指示请求体的媒体类型',
    scenario: 'POST/PUT请求发送数据'
  },
  {
    name: 'User-Agent',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    purpose: '标识客户端应用程序',
    scenario: '服务器适配不同设备'
  },
  {
    name: 'Accept-Language',
    example: 'zh-CN, en-US;q=0.9',
    purpose: '指定客户端首选的自然语言',
    scenario: '多语言网站内容协商'
  },
  {
    name: 'Cache-Control',
    example: 'no-cache',
    purpose: '指定请求/响应链上的缓存机制',
    scenario: '控制资源缓存行为'
  },
  {
    name: 'Credentials',
    example: 'include',
    purpose: '是否发送cookie',
    scenario: '跨域请求'
  },
  {
    name: 'Cookie',
    example: 'sessionId=abc123',
    purpose: '携带服务器设置的cookie信息',
    scenario: '维护用户会话状态'
  },
  {
    name: 'Referer',
    example: 'https://example.com/page',
    purpose: '指示当前请求的来源页面',
    scenario: '分析流量来源，安全控制'
  },
  {
    name: 'Origin',
    example: 'https://yourdomain.com',
    purpose: '指示跨域请求的来源',
    scenario: 'CORS跨域请求'
  },
  {
    name: 'X-Requested-With',
    example: 'XMLHttpRequest',
    purpose: '标识AJAX请求',
    scenario: '服务器区分普通请求和AJAX请求'
  },
  {
    name: 'X-CSRF-Token',
    example: '1234567890',
    purpose: '防止CSRF攻击',
    scenario: 'CSRF保护'
  }
]);
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@secondary-color: #2c3e50;
@accent-color: #e74c3c;
@light-bg: #f8f9fa;
@dark-bg: #2c3e50;
@border-color: #e0e0e0;
@shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.headers-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: @shadow;
}

.header-banner {
  background: linear-gradient(135deg, @secondary-color, #1a2530);
  color: white;
  padding: 2rem 1.5rem;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .title-container {
    text-align: center;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.85;
    }
  }

  .network-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 1rem;

    .server,
    .client {
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .arrows {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .arrow {
        font-size: 1.5rem;
        animation: pulse 2s infinite;

        &:nth-child(2) {
          animation-delay: 0.5s;
        }
      }
    }
  }
}

.content-wrapper {
  padding: 2rem;
}

section {
  margin-bottom: 3rem;

  h2 {
    color: @secondary-color;
    border-left: 4px solid @primary-color;
    padding-left: 1rem;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
}

.intro-section {
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .http-example {
    background: @light-bg;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 1rem;
    border-left: 3px solid @primary-color;

    pre {
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
      line-height: 1.8;
      color: #2c3e50;
    }
  }
}

.purpose-section {
  .purpose-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;

    .purpose-card {
      background: @light-bg;
      border-radius: 10px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: @shadow;
      }

      .icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        color: @primary-color;
        margin-bottom: 0.5rem;
      }

      p {
        color: #666;
      }
    }
  }
}

.config-section {
  .table-container {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: @shadow;
  }

  .headers-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;

    th,
    td {
      padding: 1rem;
      text-align: left;
    }

    thead {
      background: @primary-color;
      color: white;

      th {
        font-weight: 600;
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid @border-color;

        &:nth-child(even) {
          background: @light-bg;
        }

        &:hover {
          background: #e3f2fd;
        }

        code {
          background: rgba(52, 152, 219, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          color: #2c3e50;
        }
      }
    }
  }
}

.code-section {
  .code-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;

    .code-block {
      background: #2c3e50;
      border-radius: 8px;
      overflow: hidden;

      h3 {
        background: lighten(@secondary-color, 10%);
        color: white;
        padding: 0.75rem 1rem;
        font-size: 1.1rem;
      }

      pre {
        padding: 1.5rem;
        color: #f8f9fa;
        font-family: 'Fira Code', 'Courier New', monospace;
        overflow-x: auto;
        line-height: 1.5;
      }
    }
  }
}

.best-practices {
  ul {
    background: @light-bg;
    border-radius: 8px;
    padding: 1.5rem 1.5rem 1.5rem 3rem;

    li {
      margin-bottom: 0.75rem;
      position: relative;

      &::before {
        content: '✓';
        position: absolute;
        left: -1.5rem;
        top: 0;
        color: @primary-color;
        font-weight: bold;
      }
    }
  }
}

.page-footer {
  background: @secondary-color;
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 10px 10px 0 0;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .header-banner {
    .title-container {
      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }
    }

    .network-icon {
      flex-direction: column;
      gap: 1rem;

      .arrows {
        flex-direction: row;
        gap: 0.5rem;
      }
    }
  }

  .content-wrapper {
    padding: 1.5rem;
  }

  section {
    margin-bottom: 2rem;

    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
