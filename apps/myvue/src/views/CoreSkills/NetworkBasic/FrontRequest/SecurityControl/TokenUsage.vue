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
              <p>
                Token是服务器生成的加密字符串，用于验证用户身份和权限。它取代了传统的Session机制，成为现代Web应用的标准身份验证方式。
              </p>
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
                <pre>
{
  "alg": "HS256",
  "typ": "JWT"
}</pre
                >
                <h4>编码：base64UrlEncode(其他hash算法)</h4>
              </div>
              <div class="composition-item">
                <h3>Payload</h3>
                <p>包含声明（用户信息、权限等）</p>
                <pre>
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "exp": 1620000000
}</pre
                >
                <h4>编码：base64UrlEncode(其他hash算法)</h4>
              </div>
              <div class="composition-item">
                <h3>Signature</h3>
                <p>使用密钥对编码后的Header和Payload进行签名</p>
                <pre>
HMACSHA256(//使用(头里面设置的算法)HMAC算法，使用服务器端密钥对编码后的Header和Payload进行签名
  base64UrlEncode(header) + "." +//编码后的Header和Payload
  base64UrlEncode(payload),//编码后的Header和Payload
  secret//服务器端密钥
)</pre
                >
              </div>
              <div class="composition-item">
                <h3>token</h3>
                <p>
                  token=base64UrlEncode(header) + "." + base64UrlEncode(payload) + "." + signature
                </p>
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
      <h2>Access Token 与 Refresh Token 介绍</h2>
      <div class="token-detail-container">
        <div class="token-detail-card">
          <h3>Access Token（访问令牌）</h3>
          <p>
            <strong>Access Token</strong>
            是用户成功登录后，服务器颁发给前端的短期有效令牌。前端每次请求受保护的资源或API时，都需要携带该令牌，服务器通过验证令牌来判断用户身份和权限。
          </p>
          <ul>
            <li>有效期短（如几分钟到一小时）</li>
            <li>暴露风险低，适合频繁校验</li>
            <li>通常存储在内存、localStorage或cookie中</li>
          </ul>
        </div>
        <div class="token-detail-card">
          <h3>Refresh Token（刷新令牌）</h3>
          <p>
            <strong>Refresh Token</strong> 是一种长期有效的令牌，主要用于获取新的 Access Token。当
            Access Token 过期后，前端可以用 Refresh Token 向服务器申请新的 Access
            Token，而无需重新登录。
          </p>
          <ul>
            <li>有效期长（如7天、30天）</li>
            <li>只在需要续期时发送，暴露频率低</li>
            <li>建议只存储在 HttpOnly Cookie，防止 XSS 攻击</li>
          </ul>
        </div>
      </div>
      <div class="why-two-tokens">
        <h3>为什么需要 Access Token 和 Refresh Token 两种令牌？</h3>
        <ol>
          <li>
            <strong>安全性提升：</strong>Access Token
            有效期短，即使被窃取，攻击者可利用的时间也有限。Refresh Token
            只在续期时使用，暴露频率低，降低被盗风险。
          </li>
          <li>
            <strong>用户体验更好：</strong>用户 Access Token 过期后，无需重新登录，前端可自动用
            Refresh Token 换取新令牌，实现“无感续期”。
          </li>
          <li>
            <strong>权限控制灵活：</strong>可以单独吊销 Refresh
            Token，实现强制下线等安全策略，而不影响已发放的 Access Token。
          </li>
          <li>
            <strong>分离职责：</strong>Access Token 只用于访问资源，Refresh Token
            只用于续期，降低单一令牌被滥用的风险。
          </li>
        </ol>
        <div class="tips">
          <strong>小贴士：</strong>前端应避免将 Refresh Token 暴露给 JavaScript，推荐存储在 HttpOnly
          Cookie 中，最大限度防止 XSS 攻击。
        </div>
      </div>

      <div class="why-two-tokens">
        <h3>1.通过 Set-Cookie 响应头，将长期有效的 Refresh Token 设置为 HttpOnly Cookie</h3>
        <h3>2.Access Token 过期时：自动用 Refresh Token 接口 刷新 Access Token</h3>
        <h3>
          3.HttpOnly Cookie 会由浏览器自动携带到同域的请求中（符合 Cookie 的域名、路径、 Secure
          等属性配置）
        </h3>
        <h3>
          4.当 Access Token 过期时，前端只需向后端的 “刷新令牌接口” 发送请求，浏览器会自动把
          HttpOnly 的 Refresh Token 带入请求，后端验证通过后返回新的 Access Token，前端用新 Token
          继续请求接口。
        </h3>
      </div>
    </section>

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
          <pre>
// 存储到localStorage
localStorage.setItem('auth_token', token);

// 存储到cookie（推荐HttpOnly）
document.cookie = `auth_token=${token}; Secure; HttpOnly; SameSite=Strict;`;</pre
          >
        </div>

        <div class="code-block">
          <h3>发送请求</h3>
          <pre>
// 使用Axios发送带Token的请求
axios.get('/api/protected', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});</pre
          >
        </div>

        <div class="code-block">
          <h3>处理Token过期</h3>
          <pre>
// 使用Axios拦截器处理401错误
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // 刷新Token或重定向到登录
      refreshTokenOrRedirect();
    }
    return Promise.reject(error);
  }
);</pre
          >
        </div>
      </div>
    </section>
    <section class="section">
      <h2>Token安全限制与常见攻击方式</h2>
      <div class="security-limitations">
        <ul>
          <li>
            <strong>易受XSS攻击：</strong>
            如果Token存储在<code>localStorage</code>或<code>sessionStorage</code>，一旦前端存在XSS漏洞，攻击者可轻松窃取Token。
          </li>
          <li>
            <strong>Token被盗用：</strong>
            Token一旦被截获（如通过中间人攻击或浏览器插件），攻击者可冒充用户进行操作，直到Token过期。
          </li>
          <li>
            <strong>Token重放攻击：</strong>
            攻击者获取到Token后，可以在有效期内多次使用，造成安全隐患。
          </li>
          <li>
            <strong>CSRF风险：</strong>
            如果Token存储在Cookie且未设置<code>SameSite</code>属性，可能被用于跨站请求伪造攻击。
          </li>
          <li>
            <strong>刷新Token机制被滥用：</strong>
            如果Refresh Token保护不当，攻击者可长期维持会话，难以及时失效。
          </li>
        </ul>
        <h3>常见破解手段</h3>
        <ul>
          <li>
            <strong>XSS脚本注入：</strong>
            通过注入恶意脚本，读取<code>localStorage</code>或<code>sessionStorage</code>中的Token。
          </li>
          <li>
            <strong>中间人攻击（MITM）：</strong>
            在未加密的HTTP传输中拦截Token，或通过伪造证书窃取Token。
          </li>
          <li><strong>社工/钓鱼：</strong> 诱导用户在钓鱼网站输入Token或登录凭据。</li>
          <li><strong>Token重放：</strong> 捕获有效Token后，在有效期内反复使用，绕过身份验证。</li>
          <li>
            <strong>暴力破解：</strong>
            针对弱签名算法或过期机制不严的Token，尝试伪造或猜测有效Token。
          </li>
        </ul>
        <div class="security-tips">
          <strong>安全建议：</strong>
          <ul>
            <li>优先将Token存储在<code>HttpOnly</code> Cookie，防止JS读取。</li>
            <li>始终使用HTTPS加密传输Token。</li>
            <li>Token设置短有效期，并结合Refresh Token机制。</li>
            <li>对敏感操作增加二次验证（如MFA、多因子认证）。</li>
            <li>后端校验Token唯一性、来源IP、设备指纹等，防止重放。</li>
            <li>定期轮换密钥，及时失效被盗Token。</li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>
        Token是现代Web应用安全架构的核心组件，正确实现Token机制可以显著提升应用的安全性和用户体验
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 示例数据
const tokenLifespans = ref([
  { type: 'Access Token', duration: '15-30分钟', purpose: '短期资源访问' },
  { type: 'Refresh Token', duration: '7-30天', purpose: '获取新Access Token' },
  { type: 'ID Token', duration: '与Access Token相同', purpose: '传递用户身份信息' },
])

const securityThreats = ref([
  { threat: 'XSS攻击', risk: '高', prevention: '使用HttpOnly Cookie, CSP' },
  { threat: 'CSRF攻击', risk: '中', prevention: 'SameSite Cookie, CSRF Token' },
  { threat: 'Token盗窃', risk: '高', prevention: 'HTTPS, 短有效期, Refresh Token轮换' },
  { threat: 'Token重放', risk: '中', prevention: 'JTI声明, 短期有效' },
])
</script>

<style lang="less" scoped>
@primary-color: #4285f4;
@secondary-color: #34a853;
@accent-color: #ea4335;
@warning-color: #fbbc05;
@text-color: #202124;
@light-bg: #f8f9fa;
@border-color: #dadce0;
@card-shadow:
  0 1px 2px rgba(60, 64, 67, 0.3),
  0 1px 3px 1px rgba(60, 64, 67, 0.15);

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

  & > .section {
    flex: 1;
  }
}

.security-limitations {
  display: flex;
  flex-direction: column;
  gap: 15px;
  ul {
    padding-left: 20px;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 15px;
    box-shadow: @card-shadow;
    margin-bottom: 20px;
    li {
      margin-bottom: 8px;
    }
  }
}

.composition-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.token-detail-container {
  display: flex;
  gap: 20px;
  .token-detail-card {
    flex: 1;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 15px;
    box-shadow: @card-shadow;
    margin-bottom: 20px;
  }
}

.why-two-tokens {
  flex: 1;
  border: 1px solid @border-color;
  border-radius: 8px;
  padding: 30px;
  box-shadow: @card-shadow;
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
      content: '✓';
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
