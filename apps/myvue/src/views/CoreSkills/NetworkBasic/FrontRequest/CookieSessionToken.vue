<template>
  <div class="session-management-container">
    <header class="header">
      <div class="title-section">
        <h1>会话管理三剑客：<span class="highlight">Cookie</span>、<span class="highlight">Session</span>、<span
            class="highlight">Token</span></h1>
        <p class="subtitle">深入理解Web应用的身份验证与状态管理机制</p>
      </div>
      <div class="stats-card">
        <div class="stat-item">
          <div class="stat-value">1994</div>
          <div class="stat-label">Cookie诞生年份</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">94%</div>
          <div class="stat-label">网站使用Cookie</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">80%</div>
          <div class="stat-label">现代应用使用Token</div>
        </div>
      </div>
    </header>

    <div class="intro-section">
      <div class="intro-card">
        <h2>什么是会话管理？</h2>
        <p>会话管理是Web应用中维护用户状态的核心机制，允许服务器识别连续请求是否来自同一用户，从而提供个性化体验和安全访问控制。</p>

        <div class="session-flow">
          <div class="flow-step">
            <div class="flow-icon">👤</div>
            <div class="flow-text">用户登录</div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="flow-icon">📦</div>
            <div class="flow-text">服务器认证</div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="flow-icon">🔑</div>
            <div class="flow-text">返回凭证</div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="flow-icon">🔄</div>
            <div class="flow-text">后续请求验证</div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2 class="section-title">📊 三者对比概览</h2>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>Cookie</th>
              <th>Session</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>存储位置</td>
              <td>客户端浏览器</td>
              <td>服务器内存/数据库</td>
              <td>客户端本地存储</td>
            </tr>
            <tr>
              <td>安全性</td>
              <td>较低 (易受CSRF/XSS攻击)</td>
              <td>中等 (依赖Cookie)</td>
              <td>较高 (可签名加密)</td>
            </tr>
            <tr>
              <td>跨域支持</td>
              <td>有限 (需配置CORS)</td>
              <td>有限 (需配置CORS)</td>
              <td>良好 (通过Authorization头)</td>
            </tr>
            <tr>
              <td>扩展性</td>
              <td>有限 (4KB大小限制)</td>
              <td>服务器资源依赖</td>
              <td>良好 (无状态服务器)</td>
            </tr>
            <tr>
              <td>移动端支持</td>
              <td>良好</td>
              <td>良好</td>
              <td>优秀 (原生支持)</td>
            </tr>
            <tr>
              <td>使用场景</td>
              <td>会话跟踪、用户偏好</td>
              <td>传统Web应用</td>
              <td>API、SPA、跨平台应用</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="tech-container">
      <!-- Cookie 部分 -->
      <section class="tech-section cookie-section">
        <div class="section-header">
          <div class="section-icon">🍪</div>
          <h2>Cookie</h2>
          <div class="tech-tag">客户端存储</div>
        </div>

        <div class="tech-description">
          <p>Cookie是服务器发送到用户浏览器并保存在本地的小型文本文件，每次请求时浏览器会自动将其发送回服务器。</p>
        </div>

        <div class="tech-details">
          <div class="detail-card">
            <h3><span class="icon">⚙️</span> 工作原理</h3>
            <ol>
              <li>用户登录后，服务器通过<b>Set-Cookie</b>响应头设置Cookie</li>
              <li>浏览器保存Cookie并在后续请求中通过<b>Cookie</b>请求头自动发送</li>
              <li>服务器验证Cookie内容识别用户</li>
            </ol>
          </div>

          <div class="detail-card">
            <h3><span class="icon">🔐</span> 安全设置</h3>
            <ul>
              <li><b>HttpOnly</b> - 阻止JavaScript访问，防止XSS攻击</li>
              <li><b>Secure</b> - 仅通过HTTPS传输</li>
              <li><b>SameSite</b> - 限制跨站请求发送Cookie，防止CSRF攻击</li>
              <li><b>Expires/Max-Age</b> - 设置有效期限</li>
            </ul>
          </div>
        </div>

        <div class="code-example">
          <h3><span class="icon">💻</span> 代码示例 - 设置HTTP Cookie</h3>
          <div class="tabs">
            <button :class="{ active: activeTab === 'backend' }" @click="activeTab = 'backend'">
              后端设置
            </button>
            <button :class="{ active: activeTab === 'frontend' }" @click="activeTab = 'frontend'">
              前端操作
            </button>
          </div>

          <div v-if="activeTab === 'backend'" class="code-block">
            <pre>// Node.js/Express 设置Cookie
res.cookie('sessionId', 'abc123xyz', {
  maxAge: 24 * 60 * 60 * 1000, // 1天
  httpOnly: true,
  secure: true,
  sameSite: 'Strict'
});

// 读取Cookie
const sessionId = req.cookies.sessionId;</pre>
          </div>

          <div v-if="activeTab === 'frontend'" class="code-block">
            <pre>// JavaScript 读取Cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 设置Cookie (通常由服务器设置)
document.cookie = `username=john_doe; max-age=${24*60*60}; path=/; secure`;</pre>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3><span class="icon">✅</span> 优势</h3>
            <ul>
              <li>自动随请求发送，无需手动处理</li>
              <li>广泛支持，所有浏览器兼容</li>
              <li>简单易用，开发快速</li>
              <li>可设置过期时间</li>
            </ul>
          </div>
          <div class="cons">
            <h3><span class="icon">⚠️</span> 缺点</h3>
            <ul>
              <li>大小限制（4KB）</li>
              <li>安全风险（CSRF/XSS）</li>
              <li>跨域问题需要额外配置</li>
              <li>用户可禁用或清除Cookie</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Session 部分 -->
      <section class="tech-section session-section">
        <div class="section-header">
          <div class="section-icon">🗂️</div>
          <h2>Session</h2>
          <div class="tech-tag">服务器端状态</div>
        </div>

        <div class="tech-description">
          <p>Session是基于服务器端的状态管理机制，服务器为每个会话创建唯一ID（通常存储在Cookie中），并在服务器存储会话数据。</p>
        </div>

        <div class="tech-details">
          <div class="detail-card">
            <h3><span class="icon">⚙️</span> 工作原理</h3>
            <ol>
              <li>用户登录后，服务器创建Session并存储用户数据</li>
              <li>服务器发送包含<b>Session ID</b>的Cookie给客户端</li>
              <li>客户端后续请求自动发送Session ID</li>
              <li>服务器根据Session ID查找会话数据</li>
            </ol>
          </div>

          <div class="detail-card">
            <h3><span class="icon">🔧</span> 存储方式</h3>
            <ul>
              <li><b>内存存储</b> - 简单但重启丢失，不适用分布式环境</li>
              <li><b>数据库存储</b> - MySQL、PostgreSQL等（持久化）</li>
              <li><b>缓存存储</b> - Redis、Memcached（高性能，推荐）</li>
            </ul>
          </div>
        </div>

        <div class="code-example">
          <h3><span class="icon">💻</span> 代码示例 - Express Session</h3>
          <div class="code-block">
            <pre>const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();

// 配置Session中间件
app.use(session({
  store: new RedisStore({ host: 'localhost', port: 6379 }), // Redis存储
  secret: 'my_secret_key', // 签名密钥
  resave: false, // 避免重复保存
  saveUninitialized: false, // 不保存未初始化的session
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1天
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));

// 登录时设置Session
app.post('/login', (req, res) => {
  // 验证用户凭证...
  req.session.userId = user.id; // 存储用户ID
  req.session.authenticated = true;
  res.send('登录成功');
});

// 访问受保护路由
app.get('/profile', (req, res) => {
  if (!req.session.authenticated) {
    return res.status(401).send('未授权');
  }
  // 从Session获取用户数据
  const userId = req.session.userId;
  // 返回用户数据...
});</pre>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3><span class="icon">✅</span> 优势</h3>
            <ul>
              <li>敏感数据存储在服务器，更安全</li>
              <li>可存储较多数据（不受浏览器限制）</li>
              <li>服务器完全控制会话生命周期</li>
              <li>易于撤销会话（直接删除服务器数据）</li>
            </ul>
          </div>
          <div class="cons">
            <h3><span class="icon">⚠️</span> 缺点</h3>
            <ul>
              <li>服务器资源消耗（内存/数据库）</li>
              <li>分布式环境下需要共享存储</li>
              <li>依赖Cookie传输Session ID</li>
              <li>扩展性有限（服务器状态）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Token 部分 -->
      <section class="tech-section token-section">
        <div class="section-header">
          <div class="section-icon">🔑</div>
          <h2>Token (JWT)</h2>
          <div class="tech-tag">无状态验证</div>
        </div>

        <div class="tech-description">
          <p>Token（通常指JWT - JSON Web Token）是无状态的验证机制，服务器生成包含用户信息的Token，客户端存储并在请求时发送，服务器验证签名。</p>

          <div class="jwt-structure">
            <div class="jwt-part header">
              <div class="jwt-label">HEADER</div>
              <div class="jwt-content">{ "alg": "HS256", "typ": "JWT" }</div>
            </div>
            <div class="jwt-separator">.</div>
            <div class="jwt-part payload">
              <div class="jwt-label">PAYLOAD</div>
              <div class="jwt-content">{ "sub": "123", "name": "John", "exp": 1718928000 }</div>
            </div>
            <div class="jwt-separator">.</div>
            <div class="jwt-part signature">
              <div class="jwt-label">SIGNATURE</div>
              <div class="jwt-content">HMACSHA256(base64Header + "." + base64Payload, secret)</div>
            </div>
          </div>
        </div>

        <div class="tech-details">
          <div class="detail-card">
            <h3><span class="icon">⚙️</span> 工作原理</h3>
            <ol>
              <li>用户登录后，服务器生成包含用户信息的JWT</li>
              <li>客户端存储JWT（通常在localStorage或Cookie中）</li>
              <li>后续请求在<b>Authorization头</b>中发送Token</li>
              <li>服务器验证签名并提取用户信息</li>
            </ol>
          </div>

          <div class="detail-card">
            <h3><span class="icon">🔧</span> 最佳实践</h3>
            <ul>
              <li>使用<strong>https</strong>防止Token被拦截</li>
              <li>设置合理的<strong>过期时间</strong>(exp)</li>
              <li>使用<strong>刷新Token</strong>机制更新访问Token</li>
              <li>敏感操作要求<strong>二次验证</strong></li>
              <li>使用<strong>强密钥</strong>和<strong>强算法</strong>(如RS256)</li>
            </ul>
          </div>
        </div>

        <div class="code-example">
          <h3><span class="icon">💻</span> 代码示例 - JWT实现</h3>
          <div class="tabs">
            <button :class="{ active: activeTokenTab === 'backend' }" @click="activeTokenTab = 'backend'">
              后端生成/验证
            </button>
            <button :class="{ active: activeTokenTab === 'frontend' }" @click="activeTokenTab = 'frontend'">
              前端处理
            </button>
          </div>

          <div v-if="activeTokenTab === 'backend'" class="code-block">
            <pre>// Node.js 使用jsonwebtoken库
const jwt = require('jsonwebtoken');

// 生成JWT
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // 1小时后过期
  );
}

// 验证中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 刷新Token
app.post('/refresh-token', (req, res) => {
  const refreshToken = req.body.refreshToken;
  // 验证刷新令牌...
  const newAccessToken = generateToken(user);
  res.json({ accessToken: newAccessToken });
});</pre>
          </div>

          <div v-if="activeTokenTab === 'frontend'" class="code-block">
            <pre>// Vue3 中处理Token
import { ref } from 'vue';

// 保存Token到localStorage
function saveToken(token) {
  localStorage.setItem('access_token', token);
}

// 从请求头发送Token
function useAuthHeader() {
  const token = localStorage.getItem('access_token');
  return { Authorization: `Bearer ${token}` };
}

// 示例API调用
async function fetchUserData() {
  const response = await fetch('/api/user', {
    headers: useAuthHeader()
  });

  if (response.status === 401) {
    // 令牌过期，尝试刷新
    await refreshToken();
    return fetchUserData();
  }

  return response.json();
}

// 刷新令牌
async function refreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  const response = await fetch('/api/refresh-token', {
    method: 'POST',
    body: JSON.stringify({ refreshToken })
  });

  const { access_token } = await response.json();
  saveToken(access_token);
}</pre>
          </div>
        </div>

        <div class="pros-cons">
          <div class="pros">
            <h3><span class="icon">✅</span> 优势</h3>
            <ul>
              <li>无状态，服务器不需要存储会话信息</li>
              <li>跨域友好，适合微服务架构</li>
              <li>移动端和SPA支持良好</li>
              <li>可包含自定义声明（claims）</li>
              <li>自带过期机制</li>
            </ul>
          </div>
          <div class="cons">
            <h3><span class="icon">⚠️</span> 缺点</h3>
            <ul>
              <li>Token一旦签发无法撤销（需额外机制）</li>
              <li>令牌大小大于Session ID</li>
              <li>需要手动处理令牌过期和刷新</li>
              <li>安全存储挑战（XSS攻击）</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 选择指南 -->
      <section class="selection-guide">
        <div class="section-header">
          <div class="section-icon">✅</div>
          <h2>如何选择会话管理方案？</h2>
        </div>

        <div class="guide-cards">
          <div class="guide-card">
            <div class="guide-icon">🛒</div>
            <h3>传统Web应用</h3>
            <p>使用 <strong>Session + Cookie</strong>：服务器渲染页面，需要维护用户状态</p>
          </div>

          <div class="guide-card">
            <div class="guide-icon">📱</div>
            <h3>单页面应用(SPA)</h3>
            <p>使用 <strong>Token</strong>：前后端分离，API驱动，无状态服务</p>
          </div>

          <div class="guide-card">
            <div class="guide-icon">🌐</div>
            <h3>跨平台/微服务</h3>
            <p>使用 <strong>Token</strong>：跨域支持，统一认证，分布式系统</p>
          </div>

          <div class="guide-card">
            <div class="guide-icon">🔒</div>
            <h3>高安全性应用</h3>
            <p><strong>混合方案</strong>：敏感操作使用Session，API使用Token</p>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <h3>会话安全最佳实践</h3>
        <div class="principles">
          <div class="principle">
            <div class="principle-icon">🔐</div>
            <p>始终使用HTTPS传输凭证</p>
          </div>
          <div class="principle">
            <div class="principle-icon">⏳</div>
            <p>设置合理的凭证过期时间</p>
          </div>
          <div class="principle">
            <div class="principle-icon">🔄</div>
            <p>实施令牌刷新机制</p>
          </div>
          <div class="principle">
            <div class="principle-icon">👁️</div>
            <p>监控异常登录活动</p>
          </div>
        </div>
        <p class="footer-note">安全无小事 - 正确实施会话管理是保护用户数据的第一道防线</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeTab = ref('backend');
const activeTokenTab = ref('backend');
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --primary-color: #3498db;
  --cookie-color: #e67e22;
  --session-color: #9b59b6;
  --token-color: #2ecc71;
  --light-bg: #f8f9fa;
  --card-bg: #ffffff;
  --border-color: #eaeaea;
  --text-dark: #2c3e50;
  --text-light: #7f8c8d;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.session-management-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--text-dark);
  line-height: 1.6;
  background-color: var(--light-bg);
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);

  .title-section {
    flex: 1;
    min-width: 300px;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 0.5rem;

      .highlight {
        font-weight: 800;

        &:nth-child(1) {
          color: var(--cookie-color);
        }

        &:nth-child(2) {
          color: var(--session-color);
        }

        &:nth-child(3) {
          color: var(--token-color);
        }
      }
    }

    .subtitle {
      font-size: 1.25rem;
      color: var(--text-light);
      font-weight: 400;
      max-width: 600px;
    }
  }

  .stats-card {
    display: flex;
    gap: 1.5rem;
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-md);

    .stat-item {
      text-align: center;
      min-width: 100px;

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: 0.25rem;
      }

      .stat-label {
        font-size: 0.9rem;
        color: var(--text-light);
      }
    }
  }
}

.intro-section {
  margin-bottom: 3rem;

  .intro-card {
    background: var(--card-bg);
    border-radius: var(--radius-md);
    padding: 2rem;
    box-shadow: var(--shadow-sm);

    h2 {
      font-size: 1.8rem;
      color: var(--text-dark);
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: var(--text-light);
      margin-bottom: 1.5rem;
    }

    .session-flow {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
      flex-wrap: wrap;

      .flow-step {
        text-align: center;
        flex: 1;
        min-width: 130px;

        .flow-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          background: rgba(52, 152, 219, 0.1);
          width: 60px;
          height: 60px;
          line-height: 60px;
          border-radius: 50%;
          margin: 0 auto 0.5rem;
        }

        .flow-text {
          font-weight: 500;
          font-size: 0.95rem;
        }
      }

      .flow-arrow {
        font-size: 1.5rem;
        color: var(--text-light);
        margin: 0 0.5rem;
      }
    }
  }
}

.section-title {
  font-size: 1.75rem;
  margin: 2rem 0 1.5rem;
  color: var(--text-dark);
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border-color);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background-color: var(--primary-color);
  }
}

.comparison-section {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-sm);

  .comparison-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1.5rem;

      th,
      td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--border-color);
      }

      thead {
        background: var(--light-bg);

        th {
          font-weight: 600;
          color: var(--text-dark);
        }
      }

      tbody tr:hover {
        background-color: rgba(52, 152, 219, 0.03);
      }

      td:nth-child(1) {
        font-weight: 500;
      }

      td:nth-child(2) {
        color: var(--cookie-color);
      }

      td:nth-child(3) {
        color: var(--session-color);
      }

      td:nth-child(4) {
        color: var(--token-color);
      }
    }
  }
}

.tech-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.tech-section {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
  }

  &.cookie-section::before {
    background: var(--cookie-color);
  }

  &.session-section::before {
    background: var(--session-color);
  }

  &.token-section::before {
    background: var(--token-color);
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .section-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h2 {
      font-size: 1.8rem;
      color: var(--text-dark);
    }

    .tech-tag {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-left: auto;
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .tech-description {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);

    .jwt-structure {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.5rem;
      background: #f5f8fa;
      padding: 1rem;
      border-radius: var(--radius-sm);
      border: 1px solid #e1e8ed;

      .jwt-part {
        padding: 0.5rem;
        border-radius: 6px;
        text-align: center;
        overflow: hidden;

        &.header {
          background: rgba(52, 152, 219, 0.1);
        }

        &.payload {
          background: rgba(46, 204, 113, 0.1);
        }

        &.signature {
          background: rgba(155, 89, 182, 0.1);
        }

        .jwt-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .jwt-content {
          font-size: 0.85rem;
          font-family: 'JetBrains Mono', monospace;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 250px;
        }
      }

      .jwt-separator {
        color: var(--text-light);
        font-weight: bold;
      }
    }
  }
}

.tech-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .detail-card {
    background: var(--light-bg);
    border-radius: var(--radius-sm);
    padding: 1.5rem;

    h3 {
      font-size: 1.2rem;
      color: var(--text-dark);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .icon {
        font-size: 1.25rem;
      }
    }

    ol,
    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.75rem;
        font-size: 1rem;
        color: var(--text-light);
        line-height: 1.5;

        b {
          font-weight: 600;
          color: var(--text-dark);
        }
      }
    }
  }
}

.code-example {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.2rem;
    color: var(--text-dark);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .icon {
      font-size: 1.25rem;
    }
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;

    button {
      padding: 0.5rem 1rem;
      background: var(--light-bg);
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;

      &.active {
        background: #e67e22;
        color: white;
      }

      &:hover:not(.active) {
        background: rgba(52, 152, 219, 0.1);
      }
    }
  }
}

.code-block {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1.25rem;
  margin: 0;
  font-size: 0.9rem;
  font-family: 'JetBrains Mono', monospace;
  overflow-x: auto;
  line-height: 1.5;
  border-radius: var(--radius-sm);
}

.pros-cons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  .pros,
  .cons {
    padding: 1.5rem;
    border-radius: var(--radius-sm);

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;
        font-size: 1rem;
        line-height: 1.5;
      }
    }
  }

  .pros {
    background: rgba(46, 204, 113, 0.05);
    border: 1px solid rgba(46, 204, 113, 0.2);

    h3 {
      color: #27ae60;
    }
  }

  .cons {
    background: rgba(231, 76, 60, 0.05);
    border: 1px solid rgba(231, 76, 60, 0.2);

    h3 {
      color: #c0392b;
    }
  }
}

.selection-guide {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2rem;
  margin-top: 3rem;
  box-shadow: var(--shadow-sm);

  .guide-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;

    .guide-card {
      background: var(--light-bg);
      border-radius: var(--radius-sm);
      padding: 1.5rem;
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-md);
      }

      .guide-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 1.2rem;
        color: var(--text-dark);
        margin-bottom: 0.75rem;
      }

      p {
        font-size: 0.95rem;
        color: var(--text-light);
      }
    }
  }
}

.footer {
  background: var(--card-bg);
  border-radius: var(--radius-md);
  padding: 2.5rem;
  margin-top: 3rem;
  box-shadow: var(--shadow-sm);

  .footer-content {
    h3 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: var(--text-dark);
      text-align: center;
    }

    .principles {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem;

      .principle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.25rem;
        background: var(--light-bg);
        border-radius: 50px;

        .principle-icon {
          font-size: 1.5rem;
        }

        p {
          font-weight: 500;
          margin: 0;
        }
      }
    }

    .footer-note {
      font-style: italic;
      color: var(--text-light);
      font-size: 1.1rem;
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }
  }
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;

    .stats-card {
      width: 100%;
      justify-content: space-around;
    }
  }

  .session-flow {
    flex-direction: column;
    gap: 1rem !important;

    .flow-arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0 !important;
    }
  }

  .tech-details {
    grid-template-columns: 1fr;
  }

  .pros-cons {
    grid-template-columns: 1fr;
  }

  .comparison-table {
    font-size: 0.85rem;

    th,
    td {
      padding: 0.65rem !important;
    }
  }
}

@media (max-width: 480px) {
  .header .title-section h1 {
    font-size: 1.8rem;
  }

  .intro-card h2 {
    font-size: 1.5rem;
  }

  .stats-card {
    gap: 0.5rem;
    padding: 1rem !important;

    .stat-item {
      .stat-value {
        font-size: 1.5rem !important;
      }
    }
  }

  .code-block {
    font-size: 0.8rem;
    padding: 1rem;
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--light-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

html {
  scroll-behavior: smooth;
}

[id] {
  scroll-margin-top: 80px;
}
</style>
