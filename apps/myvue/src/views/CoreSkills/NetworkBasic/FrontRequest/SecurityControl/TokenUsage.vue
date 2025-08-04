<template>
  <div class="token-container">
    <header class="header">
      <h1>前端Token基本介绍</h1>
      <p class="subtitle">现代Web应用身份验证的核心机制</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>Token基本概念</h2>
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">🔑</div>
              <h3>什么是Token</h3>
              <p>Token是服务器生成的加密字符串，用于验证用户身份和权限。它取代了传统的Session机制，成为现代Web应用的标准身份验证方式。</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <h3>为什么使用Token</h3>
              <ul>
                <li>无状态：服务器不需要存储会话信息</li>
                <li>跨域支持：适用于微服务和分布式系统</li>
                <li>安全性：减少CSRF攻击风险</li>
                <li>可扩展性：适用于移动应用和API</li>
              </ul>
            </div>
          </div>
        </section>

        <div class="columns-container">
          <section class="section">
            <h2>Token核心组成</h2>
            <div class="composition-container">
              <div class="composition-item">
                <h3>Header</h3>
                <p>包含令牌类型和签名算法</p>
                <pre>{
  "alg": "HS256",
  "typ": "JWT"
}</pre>
              </div>
              <div class="composition-item">
                <h3>Payload</h3>
                <p>包含声明（用户信息、权限等）</p>
                <pre>{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "exp": 1620000000
}</pre>
              </div>
              <div class="composition-item">
                <h3>Signature</h3>
                <p>使用密钥对编码后的Header和Payload进行签名</p>
                <pre>HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)</pre>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>Token使用流程</h2>
            <div class="workflow">
              <div class="step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h3>用户登录</h3>
                  <p>客户端发送凭据（用户名/密码）到认证服务器</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h3>生成Token</h3>
                  <p>服务器验证凭据，生成Token并返回给客户端</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h3>存储Token</h3>
                  <p>客户端存储Token（Cookie、LocalStorage等）</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h3>发送请求</h3>
                  <p>客户端在请求头中包含Token（通常为Authorization头）</p>
                </div>
              </div>
              <div class="step">
                <div class="step-icon">5</div>
                <div class="step-content">
                  <h3>验证Token</h3>
                  <p>服务器验证Token有效性并处理请求</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section class="section">
          <h2>常见Token类型</h2>
          <div class="token-types">
            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">🔐</div>
                <h3>JWT (JSON Web Token)</h3>
              </div>
              <div class="type-content">
                <p>自包含的JSON对象，包含Header、Payload和Signature三部分</p>
                <ul>
                  <li><strong>优点：</strong>标准化、自包含、易于验证</li>
                  <li><strong>缺点：</strong>无法撤销、大小较大</li>
                </ul>
              </div>
            </div>

            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">🔄</div>
                <h3>OAuth 2.0 Tokens</h3>
              </div>
              <div class="type-content">
                <p>授权框架，包含多种令牌类型：</p>
                <ul>
                  <li><strong>Access Token：</strong>访问资源</li>
                  <li><strong>Refresh Token：</strong>获取新Access Token</li>
                  <li><strong>ID Token：</strong>用户身份信息（OpenID Connect）</li>
                </ul>
              </div>
            </div>

            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">🔒</div>
                <h3>Session Tokens</h3>
              </div>
              <div class="type-content">
                <p>传统会话标识符，通常存储在Cookie中</p>
                <ul>
                  <li><strong>优点：</strong>浏览器自动管理</li>
                  <li><strong>缺点：</strong>CSRF风险、服务器状态</li>
                </ul>
              </div>
            </div>

            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">🔑</div>
                <h3>API Keys</h3>
              </div>
              <div class="type-content">
                <p>简单的静态令牌，用于API认证</p>
                <ul>
                  <li><strong>优点：</strong>简单易用</li>
                  <li><strong>缺点：</strong>安全性低、难以撤销</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="storage-card">
          <h3>Token存储方式</h3>
          <div class="storage-option">
            <h4>HttpOnly Cookies</h4>
            <p>最安全，防止XSS攻击，但可能受CSRF攻击</p>
          </div>
          <div class="storage-option">
            <h4>LocalStorage</h4>
            <p>易于访问，但易受XSS攻击</p>
          </div>
          <div class="storage-option">
            <h4>SessionStorage</h4>
            <p>会话级存储，关闭浏览器后失效</p>
          </div>
          <div class="storage-option">
            <h4>Memory</h4>
            <p>最安全但刷新页面后失效</p>
          </div>
        </div>

        <div class="security-card">
          <h3>安全最佳实践</h3>
          <ul class="security-list">
            <li>使用HTTPS传输Token</li>
            <li>设置合理的Token过期时间</li>
            <li>对敏感操作使用二次验证</li>
            <li>使用Refresh Token轮换Access Token</li>
            <li>实施Token撤销机制</li>
            <li>设置适当的CORS策略</li>
            <li>使用Content Security Policy (CSP)</li>
          </ul>
        </div>

        <div class="comparison-card">
          <h3>Token vs Session</h3>
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Token</th>
                <th>Session</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>状态</td>
                <td>无状态</td>
                <td>有状态</td>
              </tr>
              <tr>
                <td>存储位置</td>
                <td>客户端</td>
                <td>服务器</td>
              </tr>
              <tr>
                <td>跨域支持</td>
                <td>✅ 支持</td>
                <td>❌ 有限</td>
              </tr>
              <tr>
                <td>CSRF风险</td>
                <td>低</td>
                <td>高</td>
              </tr>
              <tr>
                <td>扩展性</td>
                <td>高</td>
                <td>低</td>
              </tr>
              <tr>
                <td>移动端支持</td>
                <td>✅ 优秀</td>
                <td>❌ 有限</td>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>Token使用场景</h2>
      <div class="use-cases">
        <div class="use-case-card">
          <div class="case-icon">👤</div>
          <h3>用户认证</h3>
          <p>登录后获取Token，用于后续请求的身份验证</p>
        </div>
        <div class="use-case-card">
          <div class="case-icon">🔐</div>
          <h3>API访问控制</h3>
          <p>保护API端点，只允许持有有效Token的请求访问</p>
        </div>
        <div class="use-case-card">
          <div class="case-icon">🔄</div>
          <h3>单点登录(SSO)</h3>
          <p>在多个相关系统间共享认证状态</p>
        </div>
        <div class="use-case-card">
          <div class="case-icon">📱</div>
          <h3>移动应用认证</h3>
          <p>适用于原生移动应用与后端的通信</p>
        </div>
        <div class="use-case-card">
          <div class="case-icon">🌐</div>
          <h3>第三方授权</h3>
          <p>OAuth流程中授权第三方应用访问用户资源</p>
        </div>
        <div class="use-case-card">
          <div class="case-icon">🔗</div>
          <h3>无密码登录</h3>
          <p>通过邮件/短信发送一次性Token实现登录</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>前端Token处理示例</h2>
      <div class="code-examples">
        <div class="code-block">
          <h3>存储Token</h3>
          <pre>// 存储到localStorage
localStorage.setItem('auth_token', token);

// 存储到cookie（推荐HttpOnly）
document.cookie = `auth_token=${token}; Secure; HttpOnly; SameSite=Strict;`;</pre>
        </div>

        <div class="code-block">
          <h3>发送请求</h3>
          <pre>// 使用Axios发送带Token的请求
axios.get('/api/protected', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});</pre>
        </div>

        <div class="code-block">
          <h3>处理Token过期</h3>
          <pre>// 使用Axios拦截器处理401错误
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // 刷新Token或重定向到登录
      refreshTokenOrRedirect();
    }
    return Promise.reject(error);
  }
);</pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>Token是现代Web应用安全架构的核心组件，正确实现Token机制可以显著提升应用的安全性和用户体验</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const tokenLifespans = ref([
  { type: 'Access Token', duration: '15-30分钟', purpose: '短期资源访问' },
  { type: 'Refresh Token', duration: '7-30天', purpose: '获取新Access Token' },
  { type: 'ID Token', duration: '与Access Token相同', purpose: '传递用户身份信息' }
]);

const securityThreats = ref([
  { threat: 'XSS攻击', risk: '高', prevention: '使用HttpOnly Cookie, CSP' },
  { threat: 'CSRF攻击', risk: '中', prevention: 'SameSite Cookie, CSRF Token' },
  { threat: 'Token盗窃', risk: '高', prevention: 'HTTPS, 短有效期, Refresh Token轮换' },
  { threat: 'Token重放', risk: '中', prevention: 'JTI声明, 短期有效' }
]);
</script>

<style lang="less" scoped>
@primary-color: #4285f4;
@secondary-color: #34a853;
@accent-color: #ea4335;
@warning-color: #fbbc05;
@text-color: #202124;
@light-bg: #f8f9fa;
@border-color: #dadce0;
@card-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.token-container {
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #5f6368;
  }
}

.content-wrapper {
  display: flex;
  gap: 25px;
  margin-bottom: 30px;
}

.main-content {
  flex: 3;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

.section {
  background: @light-bg;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h2 {
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 20%);
    font-size: 1.8rem;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.concept-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
  border-left: 4px solid @primary-color;

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    font-size: 1.4rem;
  }

  p,
  ul {
    line-height: 1.7;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.columns-container {
  display: flex;
  gap: 20px;

  &>.section {
    flex: 1;
  }
}

.composition-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.composition-item {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: @card-shadow;

  h3 {
    color: @secondary-color;
    margin-bottom: 10px;
  }

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.9rem;
    margin-top: 10px;
    line-height: 1.5;
  }
}

.workflow {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.step {
  display: flex;
  gap: 15px;
  align-items: flex-start;

  .step-icon {
    background: @primary-color;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-weight: bold;
    margin-top: 3px;
  }

  .step-content {
    h3 {
      color: @primary-color;
      margin-bottom: 5px;
    }

    p {
      color: #5f6368;
    }
  }
}

.token-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.type-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: @card-shadow;

  .type-header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background: fade(@primary-color, 8%);
    border-bottom: 1px solid @border-color;

    .type-icon {
      font-size: 1.8rem;
      margin-right: 12px;
    }

    h3 {
      color: @primary-color;
      font-size: 1.3rem;
    }
  }

  .type-content {
    padding: 20px;

    ul {
      padding-left: 20px;
      margin-top: 10px;

      li {
        margin-bottom: 8px;
        line-height: 1.5;
      }
    }
  }
}

.storage-card,
.security-card,
.comparison-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

.storage-option {
  padding: 12px 0;
  border-bottom: 1px solid fade(@border-color, 50%);

  &:last-child {
    border-bottom: none;
  }

  h4 {
    color: @secondary-color;
    margin-bottom: 5px;
  }
}

.security-list {
  list-style: none;

  li {
    padding: 10px 0;
    border-bottom: 1px solid fade(@border-color, 30%);
    display: flex;
    align-items: center;

    &:before {
      content: "✓";
      color: @secondary-color;
      font-weight: bold;
      margin-right: 10px;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background-color: fade(@primary-color, 8%);
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.use-case-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .case-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }
}

.code-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.code-block {
  background: #2d2d2d;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: @card-shadow;

  h3 {
    background: #3d3d3d;
    color: #f8f8f2;
    padding: 12px 15px;
    font-size: 1.1rem;
    margin: 0;
  }

  pre {
    padding: 15px;
    color: #f8f8f2;
    overflow-x: auto;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid @border-color;
  color: #5f6368;
  font-style: italic;
}

@media (max-width: 1100px) {
  .content-wrapper {
    flex-direction: column;
  }

  .columns-container {
    flex-direction: column;
  }
}

@media (max-width: 768px) {

  .concept-grid,
  .composition-container,
  .token-types,
  .use-cases,
  .code-examples {
    grid-template-columns: 1fr;
  }
}
</style>
