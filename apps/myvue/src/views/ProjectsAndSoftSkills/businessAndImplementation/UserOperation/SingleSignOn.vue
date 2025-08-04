<template>
  <div class="sso-guide">
    <header>
      <h1>单点登录 (SSO) 实现指南</h1>
      <p>探索跨系统无缝登录的核心技术与实现方案</p>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">4</div>
          <div class="stat-label">核心流程</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">3</div>
          <div class="stat-label">主要协议</div>
        </div>
      </div>
    </header>

    <div class="content-wrapper">
      <!-- 概述部分 -->
      <div class="section">
        <h2>📌 单点登录概述</h2>
        <div class="overview-grid">
          <div class="overview-card">
            <h3>什么是单点登录？</h3>
            <p>单点登录（Single Sign-On, SSO）是一种身份认证方案，允许用户使用一组凭证（如用户名和密码）登录多个相关但独立的系统。</p>
          </div>
          <div class="overview-card">
            <h3>SSO的核心价值</h3>
            <ul>
              <li>提升用户体验：减少重复登录</li>
              <li>增强安全性：减少密码暴露风险</li>
              <li>简化管理：集中用户身份管理</li>
              <li>提高生产力：减少登录时间消耗</li>
            </ul>
          </div>
          <div class="overview-card">
            <h3>典型应用场景</h3>
            <div class="scenarios">
              <div class="scenario">企业内网系统群</div>
              <div class="scenario">SaaS应用生态系统</div>
              <div class="scenario">多服务电商平台</div>
              <div class="scenario">校园管理系统</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心流程 -->
      <div class="section">
        <h2>🔄 SSO 核心流程</h2>
        <div class="sso-flow">
          <div class="flow-step">
            <div class="step-header">
              <div class="step-number">1</div>
              <h3>用户访问应用A</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>用户尝试访问受保护的资源：</p>
                <pre class="code-block">https://app-a.example.com/dashboard</pre>
                <p>前端检查本地无有效Token，重定向到认证中心：</p>
                <pre class="code-block">// 重定向到认证中心
window.location.href = `https://sso-auth-center.com/login?
  redirect_uri=${encodeURIComponent('https://app-a.example.com/callback')}
  &client_id=app_a_id`;</pre>
              </div>
              <div class="step-visual">
                <div class="user-flow">
                  <div class="user-icon">👤</div>
                  <div class="arrow">→</div>
                  <div class="app-icon">🅰️</div>
                  <div class="arrow">→</div>
                  <div class="sso-icon">🔑</div>
                </div>
              </div>
            </div>
          </div>

          <div class="flow-step">
            <div class="step-header">
              <div class="step-number">2</div>
              <h3>认证中心验证身份</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>认证中心检查用户登录状态：</p>
                <ul>
                  <li>若已登录：直接生成授权码</li>
                  <li>若未登录：展示登录表单</li>
                </ul>
                <p>用户提交凭证后，认证中心：</p>
                <pre class="code-block">// 验证凭证
if (validateCredentials(username, password)) {
  // 创建全局会话
  createSession(userId);
  // 生成授权码
  const authCode = generateAuthCode(clientId);
  // 重定向回应用
  redirectTo(redirect_uri, { code: authCode });
}</pre>
              </div>
              <div class="step-visual">
                <div class="login-form">
                  <div class="form-header">SSO 登录</div>
                  <div class="form-field">
                    <label>用户名</label>
                    <input type="text" placeholder="user@example.com">
                  </div>
                  <div class="form-field">
                    <label>密码</label>
                    <input type="password" placeholder="••••••••">
                  </div>
                  <button class="login-btn">登录</button>
                </div>
              </div>
            </div>
          </div>

          <div class="flow-step">
            <div class="step-header">
              <div class="step-number">3</div>
              <h3>应用A获取Token</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>应用A通过回调URL接收授权码：</p>
                <pre class="code-block">https://app-a.example.com/callback?code=AUTH_CODE_123</pre>
                <p>应用A后端使用授权码向认证中心请求Token：</p>
                <pre class="code-block">POST /oauth/token
{
  grant_type: "authorization_code",
  client_id: "app_a_id",
  client_secret: "app_a_secret",
  redirect_uri: "https://app-a.example.com/callback",
  code: "AUTH_CODE_123"
}</pre>
                <p>认证中心返回访问令牌和ID令牌：</p>
                <pre class="code-block">{
  access_token: "ACCESS_TOKEN_XYZ",
  token_type: "Bearer",
  expires_in: 3600,
  id_token: "JWT_ID_TOKEN"
}</pre>
              </div>
              <div class="step-visual">
                <div class="token-flow">
                  <div class="app-icon">🅰️</div>
                  <div class="arrow">⇄</div>
                  <div class="sso-icon">🔑</div>
                  <div class="token">🔐</div>
                </div>
              </div>
            </div>
          </div>

          <div class="flow-step">
            <div class="step-header">
              <div class="step-number">4</div>
              <h3>访问其他应用</h3>
            </div>
            <div class="step-content">
              <div class="step-desc">
                <p>用户访问应用B：</p>
                <pre class="code-block">https://app-b.example.com/profile</pre>
                <p>应用B检查无本地会话，重定向到认证中心：</p>
                <pre class="code-block">window.location.href = `https://sso-auth-center.com/login?
  redirect_uri=${encodeURIComponent('https://app-b.example.com/callback')}
  &client_id=app_b_id`;</pre>
                <p>认证中心检测到全局会话存在：</p>
                <pre class="code-block">// 跳过登录页面
const authCode = generateAuthCode('app_b_id');
redirectTo(redirect_uri, { code: authCode });</pre>
                <p>应用B使用授权码获取Token，用户自动登录</p>
              </div>
              <div class="step-visual">
                <div class="multi-app-flow">
                  <div class="user-icon">👤</div>
                  <div class="arrow">→</div>
                  <div class="app-icon">🅱️</div>
                  <div class="arrow">→</div>
                  <div class="sso-icon">🔑</div>
                  <div class="arrow">✓</div>
                  <div class="app-icon">🅱️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 前端实现 -->
      <div class="section">
        <h2>💻 前端关键实现</h2>
        <div class="implementation-grid">
          <div class="impl-card">
            <h3>检查登录状态</h3>
            <pre class="code-block">// 检查本地Token有效性
function checkAuth() {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  // 验证Token是否过期
  const { exp } = parseJwt(token);
  if (exp * 1000 < Date.now()) {
    return false;
  }
  return true;
}

// 解析JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}</pre>
          </div>
          <div class="impl-card">
            <h3>处理认证回调</h3>
            <pre class="code-block">// 在回调页面处理认证码
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    // 使用code交换Token
    exchangeCodeForToken(code);
  } else if (urlParams.get('error')) {
    // 处理错误
    showError(urlParams.get('error_description'));
  }
});

async function exchangeCodeForToken(code) {
  try {
    const response = await fetch('/api/sso/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const data = await response.json();
    // 存储Token
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('id_token', data.id_token);

    // 重定向到原始请求页面
    const redirect = sessionStorage.getItem('sso_redirect') || '/';
    router.push(redirect);
  } catch (error) {
    console.error('Token交换失败:', error);
  }
}</pre>
          </div>
          <div class="impl-card">
            <h3>Token管理</h3>
            <pre class="code-block">// 封装API请求拦截器
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 处理Token过期
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token过期，重新认证
      initiateSSOFlow();
    }
    return Promise.reject(error);
  }
);

// 存储原始请求URL
function initiateSSOFlow() {
  sessionStorage.setItem('sso_redirect', router.currentRoute.value.fullPath);
  redirectToAuthCenter();
}</pre>
          </div>
          <div class="impl-card">
            <h3>单点注销</h3>
            <pre class="code-block">// 前端注销
function logout() {
  // 清除本地Token
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');

  // 重定向到认证中心注销端点
  window.location.href = `https://sso-auth-center.com/logout?
    post_logout_redirect_uri=${encodeURIComponent(window.location.origin)}
    &id_token_hint=${localStorage.getItem('id_token')}`;
}

// 监听全局注销事件
function setupGlobalLogoutListener() {
  window.addEventListener('storage', (event) => {
    if (event.key === 'sso_logout' && event.newValue === 'true') {
      // 清除本地Token
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      // 跳转到登录页
      router.push('/login');
    }
  });

  // 广播注销事件
  function broadcastLogout() {
    localStorage.setItem('sso_logout', 'true');
    // 立即清除，避免循环触发
    setTimeout(() => {
      localStorage.removeItem('sso_logout');
    }, 100);
  }
}</pre>
          </div>
        </div>
      </div>

      <!-- 安全机制 -->
      <div class="section">
        <h2>🔒 SSO 安全机制</h2>
        <div class="security-grid">
          <div class="security-card">
            <div class="security-icon">https</div>
            <h3>HTTPS 全程加密</h3>
            <p>所有通信必须使用HTTPS，防止凭证泄露</p>
          </div>
          <div class="security-card">
            <div class="security-icon">⏱️</div>
            <h3>Token 短期有效</h3>
            <p>访问令牌设置短有效期（通常1小时）</p>
          </div>
          <div class="security-card">
            <div class="security-icon">🔄</div>
            <h3>刷新令牌机制</h3>
            <p>使用长期有效的刷新令牌获取新访问令牌</p>
          </div>
          <div class="security-card">
            <div class="security-icon">🎯</div>
            <h3>PKCE 增强保护</h3>
            <p>OAuth 2.0 PKCE防止授权码截获攻击</p>
          </div>
          <div class="security-card">
            <div class="security-icon">🔐</div>
            <h3>JWT 签名验证</h3>
            <p>严格验证ID令牌签名，防止篡改</p>
          </div>
          <div class="security-card">
            <div class="security-icon">🚫</div>
            <h3>同源策略限制</h3>
            <p>使用CSP和SameSite Cookie防止CSRF攻击</p>
          </div>
        </div>
      </div>

      <!-- 协议对比 -->
      <div class="section">
        <h2>⚖️ SSO 协议对比</h2>
        <div class="protocol-comparison">
          <table>
            <thead>
              <tr>
                <th>协议</th>
                <th>OAuth 2.0</th>
                <th>OpenID Connect</th>
                <th>SAML 2.0</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>类型</td>
                <td>授权框架</td>
                <td>身份认证层</td>
                <td>身份认证协议</td>
              </tr>
              <tr>
                <td>数据格式</td>
                <td>JSON</td>
                <td>JSON (JWT)</td>
                <td>XML</td>
              </tr>
              <tr>
                <td>主要用途</td>
                <td>API访问授权</td>
                <td>用户身份认证</td>
                <td>企业级SSO</td>
              </tr>
              <tr>
                <td>前端友好度</td>
                <td>高</td>
                <td>高</td>
                <td>低</td>
              </tr>
              <tr>
                <td>移动端支持</td>
                <td>优秀</td>
                <td>优秀</td>
                <td>一般</td>
              </tr>
              <tr>
                <td>典型场景</td>
                <td>第三方API访问</td>
                <td>消费者应用SSO</td>
                <td>企业内网SSO</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 最佳实践 -->
      <div class="section">
        <h2>🏆 SSO 最佳实践</h2>
        <div class="best-practices">
          <div class="practice-card">
            <div class="practice-icon">1</div>
            <div class="practice-content">
              <h3>集中式会话管理</h3>
              <p>在认证中心统一管理用户会话，各应用不存储会话状态</p>
            </div>
          </div>
          <div class="practice-card">
            <div class="practice-icon">2</div>
            <div class="practice-content">
              <h3>实现全局注销</h3>
              <p>用户一处注销，所有应用会话立即终止</p>
            </div>
          </div>
          <div class="practice-card">
            <div class="practice-icon">3</div>
            <div class="practice-content">
              <h3>使用标准协议</h3>
              <p>优先采用OpenID Connect等标准协议，避免自定义实现</p>
            </div>
          </div>
          <div class="practice-card">
            <div class="practice-icon">4</div>
            <div class="practice-content">
              <h3>实施多因素认证</h3>
              <p>在认证中心实施MFA，提升整体安全性</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>单点登录实现指南 © 2023 | 使用Vue3 + TypeScript实现</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// 模拟SSO功能
onMounted(() => {
  // 这里可以添加一些交互逻辑的模拟
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.sso-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #2c3e50;
  background-color: #f8fafc;
  min-height: 100vh;
  line-height: 1.6;

  header {
    text-align: center;
    margin-bottom: 30px;
    padding: 30px 20px;
    background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2.4rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 700px;
      margin: 0 auto 25px;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;

      .stat-card {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 10px;
        padding: 15px 25px;
        min-width: 120px;

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }
    }
  }

  .content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 30px;
  }

  .section {
    margin-bottom: 40px;

    h2 {
      font-size: 1.8rem;
      color: #4361ee;
      margin-bottom: 25px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eef2ff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 80px;
        height: 3px;
        background: #4361ee;
        border-radius: 3px;
      }
    }
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;

    .overview-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;

      h3 {
        font-size: 1.3rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p,
      ul {
        font-size: 0.95rem;
        color: #475569;
        margin: 0;
        line-height: 1.6;
      }

      ul {
        padding-left: 20px;

        li {
          margin-bottom: 8px;
          position: relative;

          &::before {
            content: '•';
            color: #4361ee;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }

      .scenarios {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;

        .scenario {
          background: #eef2ff;
          color: #4361ee;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
      }
    }
  }

  .sso-flow {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .flow-step {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.07);
    border-left: 4px solid #4361ee;

    .step-header {
      display: flex;
      align-items: center;
      padding: 18px 25px;
      background: #f8f9fe;
      border-bottom: 1px solid #eef0f9;

      .step-number {
        background: #4361ee;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: 15px;
      }

      h3 {
        margin: 0;
        font-size: 1.4rem;
        color: #3a0ca3;
      }
    }

    .step-content {
      display: flex;
      padding: 25px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .step-desc {
        flex: 3;
        padding-right: 25px;

        p,
        ul {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.6;
        }

        ul {
          padding-left: 20px;
          margin: 15px 0;

          li {
            margin-bottom: 8px;
            position: relative;

            &::before {
              content: '•';
              color: #4361ee;
              font-weight: bold;
              display: inline-block;
              width: 1em;
              margin-left: -1em;
            }
          }
        }
      }

      .step-visual {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 250px;
      }
    }
  }

  .user-flow,
  .token-flow,
  .multi-app-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 2rem;

    .user-icon,
    .app-icon,
    .sso-icon,
    .token {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eef2ff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    .arrow {
      color: #4361ee;
      font-weight: bold;
    }
  }

  .login-form {
    width: 100%;
    max-width: 280px;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    border: 1px solid #e2e8f0;

    .form-header {
      font-size: 1.2rem;
      font-weight: 600;
      color: #3a0ca3;
      margin-bottom: 20px;
      text-align: center;
    }

    .form-field {
      margin-bottom: 15px;

      label {
        display: block;
        margin-bottom: 5px;
        font-size: 0.9rem;
        color: #475569;
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        font-size: 0.95rem;

        &:focus {
          outline: none;
          border-color: #4361ee;
          box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }
      }
    }

    .login-btn {
      width: 100%;
      padding: 12px;
      background: linear-gradient(to right, #4361ee, #3a0ca3);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
      }
    }
  }

  .implementation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .impl-card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      }

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }
    }
  }

  .security-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;

    .security-card {
      background: white;
      border-radius: 10px;
      padding: 25px 20px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-top: 3px solid #4361ee;

      .security-icon {
        font-size: 2rem;
        margin-bottom: 15px;
        background: #eef2ff;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        color: #4361ee;
      }

      h3 {
        font-size: 1.2rem;
        color: #3a0ca3;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 0.95rem;
        color: #475569;
        margin: 0;
        line-height: 1.5;
      }
    }
  }

  .protocol-comparison {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      overflow: hidden;

      th,
      td {
        padding: 16px 20px;
        text-align: left;
        border-bottom: 1px solid #eee;
        font-size: 0.95rem;
      }

      thead {
        background: linear-gradient(to right, #4361ee, #3a0ca3);
        color: white;

        th {
          font-weight: 600;
          text-align: center;
        }
      }

      tbody {
        tr {
          &:nth-child(even) {
            background-color: #f9f9f9;
          }

          &:hover {
            background-color: #f0f4ff;
          }

          td:first-child {
            font-weight: 500;
          }
        }
      }
    }
  }

  .best-practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    .practice-card {
      display: flex;
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .practice-icon {
        background: #4361ee;
        color: white;
        min-width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        font-weight: bold;
        margin-right: 15px;
      }

      .practice-content {
        h3 {
          font-size: 1.2rem;
          color: #3a0ca3;
          margin-top: 0;
          margin-bottom: 8px;
        }

        p {
          font-size: 0.95rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
      }
    }
  }

  .code-block {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: 15px;
    border-radius: 8px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    line-height: 1.5;
    margin: 15px 0;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #64748b;
    font-size: 0.9rem;
    border-top: 1px solid #e2e8f0;
  }

  @media (max-width: 768px) {
    header {
      h1 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }

      .stats {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }

    .flow-step .step-content {
      flex-direction: column;
      gap: 20px;

      .step-desc {
        padding-right: 0;
      }
    }
  }
}
</style>
