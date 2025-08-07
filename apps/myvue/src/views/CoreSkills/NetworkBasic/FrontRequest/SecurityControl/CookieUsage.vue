<template>
  <div class="cookie-container">
    <header class="header">
      <h1><i class="icon-cookie"></i> 前端 Cookie 基本解析</h1>
      <p>深入理解 Cookie 的工作原理、应用场景和安全实践</p>
    </header>

    <div class="content-wrapper">
      <nav class="sidebar">
        <ul>
          <li v-for="(item, index) in navItems" :key="index" :class="{ active: activeSection === item.id }"
            @click="activeSection = item.id">
            <i :class="item.icon"></i> {{ item.title }}
          </li>
        </ul>
      </nav>

      <main class="main-content">
        <!-- 基础概念部分 -->
        <section v-show="activeSection === 'concept'" class="section-card">
          <h2><i class="icon-info"></i> Cookie 基础概念</h2>
          <div class="concept-grid">
            <div class="concept-item">
              <div class="concept-icon">
                <i class="icon-definition"></i>
              </div>
              <h3>什么是 Cookie？</h3>
              <p>Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。</p>
            </div>

            <div class="concept-item">
              <div class="concept-icon">
                <i class="icon-storage"></i>
              </div>
              <h3>存储特性</h3>
              <ul>
                <li>每个域名下的 Cookie 大小限制通常为 4KB</li>
                <li>浏览器一般允许每个域名存储 50 个左右的 Cookie</li>
                <li>Cookie 可以设置有效期，分为会话期和持久性两种</li>
              </ul>
            </div>

            <div class="concept-item">
              <div class="concept-icon">
                <i class="icon-structure"></i>
              </div>
              <h3>Cookie 结构</h3>
              <div class="cookie-structure">
                <div class="cookie-name">sessionId</div>
                <div class="cookie-value">=abc123xyz;</div>
                <div class="cookie-attr">Domain=.example.com; Path=/; Expires=Wed, 21 Oct 2025 07:28:00 GMT; Secure;
                  HttpOnly; SameSite=Lax</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 业务场景部分 -->
        <section v-show="activeSection === 'scenarios'" class="section-card">
          <h2><i class="icon-scenario"></i> 业务使用场景</h2>
          <div class="scenarios-container">
            <div class="scenario-card">
              <div class="scenario-icon auth"></div>
              <h3>用户认证与会话管理</h3>
              <p>存储用户的登录凭证（如 session ID 或 JWT），实现用户状态保持。</p>
              <div class="code-snippet">
                <pre><code>// 登录成功后设置认证 Cookie
setCookie('auth_token', response.data.token, {
  expires: 7, // 7天后过期
  secure: true,
  sameSite: 'Strict'
});</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon personalization"></div>
              <h3>个性化设置</h3>
              <p>存储用户的主题偏好、语言设置等个性化选项。</p>
              <div class="code-snippet">
                <pre><code>// 保存用户选择的主题
function saveThemePreference(theme) {
  setCookie('user_theme', theme, {
    expires: 365, // 保存一年
    path: '/'
  });
}</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon tracking"></div>
              <h3>用户行为追踪</h3>
              <p>记录用户访问信息，用于分析和改善用户体验。</p>
              <div class="code-snippet">
                <pre><code>// 记录用户首次访问时间
if (!getCookie('first_visit')) {
  const now = new Date();
  setCookie('first_visit', now.toISOString(), {
    expires: 365
  });
}</code></pre>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-icon cart"></div>
              <h3>购物车功能</h3>
              <p>在电商网站中临时保存用户选择的商品。</p>
              <div class="code-snippet">
                <pre><code>// 添加商品到购物车
function addToCart(productId) {
  const cart = JSON.parse(getCookie('shopping_cart') || '[]');
  cart.push(productId);
  setCookie('shopping_cart', JSON.stringify(cart), {
    expires: 1 // 一天有效期
  });
}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- 代码实现部分 -->
        <section v-show="activeSection === 'implementation'" class="section-card">
          <h2><i class="icon-code"></i> 代码实现与示例</h2>
          <div class="implementation-container">
            <div class="implementation-tabs">
              <button :class="{ active: implementationType === 'native' }"
                @click="implementationType = 'native'">原生实现</button>
              <button :class="{ active: implementationType === 'library' }"
                @click="implementationType = 'library'">js-cookie 库</button>
            </div>

            <div v-show="implementationType === 'native'" class="implementation-content">
              <h3>原生 JavaScript 实现</h3>
              <div class="code-group">
                <div class="code-block">
                  <h4>设置 Cookie</h4>
                  <pre><code>function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const [key, value] of Object.entries(options)) {
    updatedCookie += '; ' + key;
    if (value !== true) {
      updatedCookie += '=' + value;
    }
  }

  document.cookie = updatedCookie;
}</code></pre>
                </div>

                <div class="code-block">
                  <h4>获取 Cookie</h4>
                  <pre><code>function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}</code></pre>
                </div>

                <div class="code-block">
                  <h4>删除 Cookie</h4>
                  <pre><code>function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1
  });
}</code></pre>
                </div>
              </div>
            </div>

            <div v-show="implementationType === 'library'" class="implementation-content">
              <h3>使用 js-cookie 库</h3>
              <p class="lib-desc">安装：<code>npm install js-cookie</code></p>

              <div class="code-group">
                <div class="code-block">
                  <h4>设置 Cookie</h4>
                  <pre><code>import Cookies from 'js-cookie';

// 设置简单 Cookie
Cookies.set('name', 'value');

// 设置带选项的 Cookie
Cookies.set('name', 'value', {
  expires: 7,     // 7天后过期
  path: '/admin', // 只在 /admin 路径下可用
  secure: true,   // 仅通过 HTTPS 传输
  sameSite: 'strict'
});</code></pre>
                </div>

                <div class="code-block">
                  <h4>获取 Cookie</h4>
                  <pre><code>// 获取 Cookie
const value = Cookies.get('name');

// 获取所有 Cookie
const allCookies = Cookies.get(); // { name: "value", ... }</code></pre>
                </div>

                <div class="code-block">
                  <h4>删除 Cookie</h4>
                  <pre><code>// 删除 Cookie
Cookies.remove('name');

// 删除带特定选项的 Cookie
Cookies.remove('name', { path: '/admin' });</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 配置项部分 -->
        <section v-show="activeSection === 'configurations'" class="section-card">
          <h2><i class="icon-settings"></i> Cookie 配置项基础介绍</h2>
          <div class="config-table-container">
            <table class="config-table">
              <thead>
                <tr>
                  <th>属性</th>
                  <th>描述</th>
                  <th>示例值</th>
                  <th>默认值</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>expires</code></td>
                  <td>Cookie 的过期时间（GMT 格式）</td>
                  <td><code>Wed, 21 Oct 2025 07:28:00 GMT</code></td>
                  <td>会话期（关闭浏览器失效）</td>
                </tr>
                <tr>
                  <td><code>max-age</code></td>
                  <td>Cookie 有效期（秒数）</td>
                  <td><code>3600</code> (1小时)</td>
                  <td>会话期</td>
                </tr>
                <tr>
                  <td><code>domain</code></td>
                  <td>Cookie 有效的域名</td>
                  <td><code>.example.com</code></td>
                  <td>当前域名</td>
                </tr>
                <tr>
                  <td><code>path</code></td>
                  <td>Cookie 有效的路径</td>
                  <td><code>/admin</code></td>
                  <td><code>/</code></td>
                </tr>
                <tr>
                  <td><code>secure</code></td>
                  <td>仅通过 HTTPS 传输</td>
                  <td><code>true</code></td>
                  <td><code>false</code></td>
                </tr>
                <tr>
                  <td><code>samesite</code></td>
                  <td>控制跨站请求时是否发送 Cookie</td>
                  <td><code>Strict</code>, <code>Lax</code>, <code>None</code></td>
                  <td><code>Lax</code>（现代浏览器）</td>
                </tr>
                <tr>
                  <td><code>httponly</code></td>
                  <td>禁止 JavaScript 访问 Cookie</td>
                  <td><code>true</code></td>
                  <td><code>false</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="config-examples">
            <h3>配置示例</h3>
            <div class="code-snippet">
              <pre><code>// 安全配置示例
document.cookie = `sessionId=abc123;
  expires=${new Date(Date.now() + 86400e3).toUTCString()};
  domain=.example.com;
  path=/;
  secure;
  samesite=Strict;
  httponly`;</code></pre>
            </div>
          </div>
        </section>

        <!-- 安全控制部分 -->
        <section v-show="activeSection === 'security'" class="section-card">
          <h2><i class="icon-security"></i> Cookie 安全控制</h2>
          <div class="security-container">
            <div class="security-card critical">
              <h3>安全风险</h3>
              <ul>
                <li><strong>跨站脚本攻击 (XSS)</strong>：恶意脚本窃取 Cookie</li>
                <li><strong>跨站请求伪造 (CSRF)</strong>：利用用户 Cookie 执行未授权操作</li>
                <li><strong>会话劫持</strong>：攻击者获取会话 Cookie 冒充用户</li>
                <li><strong>敏感信息泄露</strong>：在 Cookie 中存储敏感数据</li>
              </ul>
            </div>

            <div class="security-card">
              <h3>安全措施</h3>
              <div class="security-measures">
                <div class="measure">
                  <div class="measure-icon">
                    <i class="icon-httponly"></i>
                  </div>
                  <div>
                    <h4>HttpOnly 标志</h4>
                    <p>防止 JavaScript 访问 Cookie，缓解 XSS 攻击</p>
                  </div>
                </div>

                <div class="measure">
                  <div class="measure-icon">
                    <i class="icon-secure"></i>
                  </div>
                  <div>
                    <h4>Secure 标志</h4>
                    <p>仅通过 HTTPS 传输 Cookie，防止中间人攻击</p>
                  </div>
                </div>

                <div class="measure">
                  <div class="measure-icon">
                    <i class="icon-samesite"></i>
                  </div>
                  <div>
                    <h4>SameSite 属性</h4>
                    <p>控制跨站请求是否发送 Cookie</p>
                    <ul>
                      <li><strong>Strict</strong>：完全禁止跨站发送</li>
                      <li><strong>Lax</strong>：允许安全跨站请求（GET）</li>
                      <li><strong>None</strong>：允许所有跨站请求（需配合 Secure）</li>
                    </ul>
                  </div>
                </div>

                <div class="measure">
                  <div class="measure-icon">
                    <i class="icon-expiry"></i>
                  </div>
                  <div>
                    <h4>合理设置有效期</h4>
                    <p>会话 Cookie 更安全，敏感操作使用较短有效期</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="security-card">
              <h3>最佳实践</h3>
              <ol class="best-practices">
                <li>永远不要在 Cookie 中存储敏感数据（密码、支付信息等）</li>
                <li>认证 Cookie 应同时设置 HttpOnly 和 Secure 标志</li>
                <li>使用 SameSite=Lax 或 Strict 作为默认策略</li>
                <li>为 Cookie 设置合理的作用域（domain 和 path）</li>
                <li>实现 CSRF 保护机制（如 CSRF token）</li>
                <li>定期轮换会话标识符</li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Cookie 跨域分享部分 -->
        <section v-show="activeSection === 'domain'" class="section-card">
          <h2><i class="icon-other"></i> Cookie 跨域分享</h2>
          <div class="domain-share-container">
            <h3>原理解析</h3>
            <p>
              浏览器的同源策略（Same-Origin Policy）默认限制 Cookie 只能在设置它的域名下被访问。<br>
              但通过合理配置 <code>domain</code> 属性，可以实现同一主域下不同子域之间的 Cookie 共享。例如：<br>
              <code>www.example.com</code>、<code>admin.example.com</code>、<code>api.example.com</code> 都属于
              <code>example.com</code> 主域。
            </p>
            <div class="code-snippet">
              <pre><code>// 设置 Cookie 可被主域下所有子域访问
document.cookie = "token=abc123; domain=.example.com; path=/";
              </code></pre>
            </div>

            <h3>配置方法</h3>
            <ul>
              <li>
                <strong>domain 属性：</strong>
                <ul>
                  <li>设置为主域（如 <code>.example.com</code>），则所有子域都能访问该 Cookie。</li>
                  <li>如果不设置，默认只在当前域名下有效。</li>
                </ul>
              </li>
              <li>
                <strong>path 属性：</strong>
                <ul>
                  <li>设置为 <code>/</code>，则主域下所有路径都可访问。</li>
                </ul>
              </li>
              <li>
                <strong>安全属性：</strong>
                <ul>
                  <li>建议配合 <code>Secure</code> 和 <code>SameSite</code> 属性，提升安全性。</li>
                </ul>
              </li>
            </ul>
            <div class="code-snippet">
              <pre><code>// js-cookie 库设置主域共享 Cookie
Cookies.set('user_id', 'u001', {
  domain: '.example.com',
  path: '/',
  secure: true,
  sameSite: 'Lax'
});
              </code></pre>
            </div>

            <h3>典型使用场景</h3>
            <ul>
              <li>单点登录（SSO）：主域下多个子系统共享登录态。</li>
              <li>多子域业务数据同步：如用户偏好、主题设置等。</li>
              <li>跨子域统计与追踪：如全站分析、广告投放等。</li>
            </ul>
            <div class="alert alert-warning" style="margin-top:1rem;">
              <strong>注意：</strong> Cookie 不能跨主域（如 <code>example.com</code> 与 <code>other.com</code>
              之间无法直接共享），且跨子域共享时需注意安全风险，避免敏感信息泄露。
            </div>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>© 2023 前端开发技术文档 | Cookie 使用指南</p>
      <p>在实际项目中，请根据具体需求和安全要求合理使用 Cookie</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导航项
const navItems = ref([
  { id: 'concept', title: '基础概念', icon: 'icon-info' },
  { id: 'scenarios', title: '业务场景', icon: 'icon-scenario' },
  { id: 'implementation', title: '代码实现', icon: 'icon-code' },
  { id: 'configurations', title: '配置选项', icon: 'icon-settings' },
  { id: 'security', title: '安全控制', icon: 'icon-security' },
  { id: 'domain', title: '不同域的cookie分享', icon: 'icon-other' }
]);

const activeSection = ref('concept');
const implementationType = ref('library'); // 'native' 或 'library'
</script>

<style lang="less" scoped>


:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --accent-color: #e74c3c;
  --success-color: #2ecc71;
  --warning-color: #f39c12;
  --light-bg: #f8f9fa;
  --dark-bg: #2c3e50;
  --card-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', sans-serif;
  background-color: #f0f2f5;
  color: #333;
  line-height: 1.6;
}

.cookie-container {
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, var(--secondary-color), #1a2530);
  color: white;
  padding: 2rem;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.content-wrapper {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  background: var(--light-bg);
  border-right: 1px solid #eaeaea;
  padding: 1.5rem 0;

  ul {
    list-style: none;
  }

  li {
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;

    &:hover {
      background: #e3f2fd;
      color: var(--primary-color);
    }

    &.active {
      background: var(--primary-color);
      color: rgba(231, 101, 101, 0.8);
      border-left: 4px solid var(--secondary-color);
    }
  }
}

.main-content {
  flex: 1;
  padding: 2rem;
  background: #fafafa;
}

.section-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 2rem;
  margin-bottom: 2rem;

  h2 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

/* 基础概念样式 */
.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.concept-item {
  background: var(--light-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow);
  }

  h3 {
    color: var(--secondary-color);
    margin: 1rem 0;
  }
}

.concept-icon {
  background: var(--primary-color);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
}

.cookie-structure {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.6;

  .cookie-name {
    color: #f39c12;
    display: inline;
  }

  .cookie-value {
    color: #3498db;
    display: inline;
  }

  .cookie-attr {
    color: #95a5a6;
    display: block;
    margin-top: 5px;
  }
}

/* 业务场景样式 */
.scenarios-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  border: 1px solid #eaeaea;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow);
  }

  h3 {
    color: var(--secondary-color);
    margin: 1rem 0 0.8rem;
  }
}

.scenario-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;

  &.auth {
    background: #e74c3c;
  }

  &.personalization {
    background: #9b59b6;
  }

  &.tracking {
    background: #3498db;
  }

  &.cart {
    background: #2ecc71;
  }
}

.code-snippet {
  background: #2c3e50;
  color: #ecf0f1;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
  overflow-x: auto;

  pre {
    margin: 0;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

/* 代码实现样式 */
.implementation-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 1.5rem;

  button {
    padding: 0.6rem 1.2rem;
    background: #e0e0e0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);

    &:hover {
      background: #d0d0d0;
    }

    &.active {
      background: var(--primary-color);
      color: rgba(231, 101, 101, 0.8);
    }
  }
}

.code-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.code-block {
  background: var(--light-bg);
  border-radius: var(--border-radius);
  overflow: hidden;

  h4 {
    background: var(--secondary-color);
    color: white;
    padding: 0.8rem 1rem;
    margin: 0;
    font-size: 1rem;
  }

  pre {
    padding: 1rem;
    margin: 0;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
    }
  }
}

.lib-desc {
  background: #e3f2fd;
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;

  code {
    background: #bbdefb;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
  }
}

/* 配置项样式 */
.config-table-container {
  overflow-x: auto;
  margin-bottom: 2rem;
}

.config-table {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eaeaea;
  }

  th {
    background: var(--light-bg);
    font-weight: 600;
  }

  tr:hover {
    background: #f5f7fa;
  }

  code {
    background: #e3f2fd;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Fira Code', monospace;
  }
}

/* 安全控制样式 */
.security-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.security-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: var(--border-radius);
  padding: 1.5rem;

  &.critical {
    border-left: 4px solid var(--accent-color);
  }

  h3 {
    color: var(--secondary-color);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #f0f0f0;
  }
}

.security-measures {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
}

.measure {
  display: flex;
  gap: 15px;
  align-items: flex-start;

  .measure-icon {
    background: var(--primary-color);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  h4 {
    color: var(--secondary-color);
    margin-bottom: 0.3rem;
  }
}

.best-practices {
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.8rem;
    line-height: 1.5;
  }
}

/* 页脚样式 */
.footer {
  background: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;

  p {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 图标样式 */
[class^="icon-"] {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

.icon-cookie::before {
  content: "cookie";
}

.icon-info::before {
  content: "info";
}

.icon-scenario::before {
  content: "scatter_plot";
}

.icon-code::before {
  content: "code";
}

.icon-settings::before {
  content: "settings";
}

.icon-security::before {
  content: "security";
}

.icon-definition::before {
  content: "description";
}

.icon-storage::before {
  content: "storage";
}

.icon-structure::before {
  content: "account_tree";
}

.icon-httponly::before {
  content: "http";
}

.icon-secure::before {
  content: "lock";
}

.icon-samesite::before {
  content: "compare_arrows";
}

.icon-expiry::before {
  content: "schedule";
}
</style>
