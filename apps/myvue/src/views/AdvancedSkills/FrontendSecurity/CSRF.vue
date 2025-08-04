<template>
  <div class="csrf-container">
    <header class="app-header">
      <h1>CSRF 跨站请求伪造基础介绍</h1>
      <p class="subtitle">理解、防范和应对 Web 安全中的隐形威胁</p>
    </header>

    <div class="content-wrapper">
      <!-- 概念介绍 -->
      <section class="concept-section">
        <div class="info-card">
          <div class="header-with-icon">
            <div class="icon">🛡️</div>
            <h2>什么是 CSRF？</h2>
          </div>
          <p>CSRF（Cross-Site Request Forgery，跨站请求伪造）是一种 Web 安全漏洞，攻击者诱使已认证用户在不知情的情况下执行非预期的操作。</p>

          <div class="key-points">
            <div class="point">
              <div class="point-icon">🔑</div>
              <h3>核心概念</h3>
              <p>利用用户已登录的身份，在用户不知情的情况下执行恶意操作</p>
            </div>
            <div class="point">
              <div class="point-icon">🎯</div>
              <h3>攻击目标</h3>
              <p>状态更改操作（转账、改密、发帖等）而非数据窃取</p>
            </div>
            <div class="point">
              <div class="point-icon">⏱️</div>
              <h3>必要条件</h3>
              <p>用户已登录目标站点 + 用户访问恶意页面</p>
            </div>
          </div>

          <div class="impact-card">
            <h3>潜在危害</h3>
            <div class="impact-grid">
              <div class="impact">
                <div class="impact-icon">💸</div>
                <p>资金转账</p>
              </div>
              <div class="impact">
                <div class="impact-icon">🔓</div>
                <p>密码更改</p>
              </div>
              <div class="impact">
                <div class="impact-icon">📧</div>
                <p>邮件发送</p>
              </div>
              <div class="impact">
                <div class="impact-icon">🛒</div>
                <p>购物操作</p>
              </div>
              <div class="impact">
                <div class="impact-icon">📝</div>
                <p>数据篡改</p>
              </div>
              <div class="impact">
                <div class="impact-icon">👤</div>
                <p>账户接管</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 攻击原理 -->
      <section class="principle-section">
        <h2 class="section-title">CSRF 攻击原理</h2>

        <div class="attack-flow">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>用户登录</h3>
              <p>用户登录可信网站（如 bank.com），服务器返回认证 Cookie</p>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>访问恶意网站</h3>
              <p>用户访问攻击者创建的恶意网站（如 evil-site.com）</p>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>自动触发请求</h3>
              <p>恶意页面自动向 bank.com 发送请求（如转账请求）</p>
              <pre class="code-block">&lt;img src="https://bank.com/transfer?to=attacker&amount=1000"&gt;</pre>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>携带认证信息</h3>
              <p>浏览器自动附加 bank.com 的 Cookie 到请求中</p>
            </div>
          </div>

          <div class="arrow">↓</div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>服务器处理请求</h3>
              <p>bank.com 服务器验证 Cookie 有效，执行转账操作</p>
            </div>
          </div>
        </div>

        <div class="technical-details">
          <h3>技术细节</h3>
          <ul>
            <li>浏览器会自动发送与目标域关联的 Cookie</li>
            <li>攻击者不需要知道用户的 Cookie 内容</li>
            <li>请求可以隐藏在图片、iframe、表单等元素中</li>
            <li>攻击成功的关键：请求参数可预测且无二次验证</li>
          </ul>
        </div>
      </section>

      <!-- 攻击示例 -->
      <section class="example-section">
        <h2 class="section-title">CSRF 攻击示例</h2>

        <div class="example-tabs">
          <div class="tabs">
            <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
              @click="activeTab = index">
              {{ tab.title }}
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeTab === 0" class="example-content">
              <h3>GET 请求攻击</h3>
              <pre class="code-block">&lt;!-- 恶意页面中的攻击代码 --&gt;
&lt;img src="https://bank.com/transfer?to=attacker&amount=1000"&gt;

&lt;!-- 等效的合法请求 --&gt;
GET /transfer?to=attacker&amount=1000 HTTP/1.1
Host: bank.com
Cookie: session_id=user_session_cookie</pre>
              <div class="explanation">
                <h4>攻击原理：</h4>
                <ul>
                  <li>利用 GET 请求改变状态的错误设计</li>
                  <li>浏览器自动加载图片时发送请求</li>
                  <li>用户无感知</li>
                </ul>
              </div>
            </div>

            <div v-if="activeTab === 1" class="example-content">
              <h3>POST 请求攻击</h3>
              <pre class="code-block">&lt;!-- 恶意页面中的攻击代码 --&gt;
&lt;form action="https://bank.com/transfer" method="POST" id="csrf-form"&gt;
  &lt;input type="hidden" name="to" value="attacker"&gt;
  &lt;input type="hidden" name="amount" value="1000"&gt;
&lt;/form&gt;
&lt;script&gt;document.getElementById('csrf-form').submit();&lt;/script&gt;

&lt;!-- 等效的合法请求 --&gt;
POST /transfer HTTP/1.1
Host: bank.com
Cookie: session_id=user_session_cookie

to=attacker&amount=1000</pre>
              <div class="explanation">
                <h4>攻击原理：</h4>
                <ul>
                  <li>自动提交隐藏表单</li>
                  <li>适用于需要 POST 请求的操作</li>
                  <li>用户可能看到页面刷新，但操作已完成</li>
                </ul>
              </div>
            </div>

            <div v-if="activeTab === 2" class="example-content">
              <h3>JSON API 攻击</h3>
              <pre class="code-block">&lt;script&gt;
fetch('https://api.bank.com/transfer', {
  method: 'POST',
  credentials: 'include', // 包含 cookie
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ to: 'attacker', amount: 1000 })
});
&lt;/script&gt;

&lt;!-- 等效的合法请求 --&gt;
POST /transfer HTTP/1.1
Host: api.bank.com
Cookie: session_id=user_session_cookie
Content-Type: application/json

{"to":"attacker","amount":1000}</pre>
              <div class="explanation">
                <h4>攻击原理：</h4>
                <ul>
                  <li>现代单页应用常见漏洞</li>
                  <li>利用 fetch API 自动发送请求</li>
                  <li>需要处理 CORS，但简单请求会自动发送</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 防护方案 -->
      <section class="protection-section">
        <h2 class="section-title">CSRF 防护方案</h2>

        <div class="protection-methods">
          <div class="method-card">
            <div class="method-header">
              <div class="icon">🔐</div>
              <h3>CSRF Tokens</h3>
              <div class="effectiveness">最常用且有效</div>
            </div>
            <div class="method-content">
              <h4>工作原理：</h4>
              <ol>
                <li>服务器为每个会话生成唯一 Token</li>
                <li>Token 嵌入表单或作为 HTTP 头</li>
                <li>服务器验证每个状态更改请求的 Token</li>
              </ol>

              <div class="implementation">
                <h4>实现示例：</h4>
                <div class="code-group">
                  <div class="server-code">
                    <h5>服务器端 (Node.js)：</h5>
                    <pre class="code-block">// 生成 CSRF Token
const csrf = require('csrf');
const tokens = csrf();
const secret = await tokens.secret();
const token = tokens.create(secret);

// 发送给客户端
res.cookie('XSRF-TOKEN', token);
res.render('form', { csrfToken: token });</pre>
                  </div>
                  <div class="client-code">
                    <h5>客户端 (HTML)：</h5>
                    <pre class="code-block">&lt;form action="/transfer" method="POST"&gt;
  &lt;input type="hidden" name="_csrf" value="&lt;%= csrfToken %&gt;"&gt;
  &lt;!-- 其他表单字段 --&gt;
&lt;/form&gt;

&lt;!-- 或者作为 HTTP 头 --&gt;
fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCookie('XSRF-TOKEN')
  },
  body: JSON.stringify(data)
});</pre>
                  </div>
                </div>
              </div>

              <div class="advantages">
                <h4>优点：</h4>
                <ul>
                  <li>高效防御 CSRF 攻击</li>
                  <li>与框架无关，通用性强</li>
                  <li>适用于各种请求类型</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <div class="icon">🍪</div>
              <h3>SameSite Cookie 属性</h3>
              <div class="effectiveness">现代浏览器有效防御</div>
            </div>
            <div class="method-content">
              <h4>工作原理：</h4>
              <p>设置 Cookie 的 SameSite 属性，限制第三方网站发送 Cookie</p>

              <div class="samesite-options">
                <div class="option">
                  <h5>Strict</h5>
                  <pre class="code-block">Set-Cookie: session_id=abc123; SameSite=Strict</pre>
                  <p>完全禁止第三方网站发送 Cookie</p>
                </div>
                <div class="option">
                  <h5>Lax</h5>
                  <pre class="code-block">Set-Cookie: session_id=abc123; SameSite=Lax</pre>
                  <p>允许安全方法（GET）的跨站请求发送 Cookie</p>
                </div>
                <div class="option">
                  <h5>None</h5>
                  <pre class="code-block">Set-Cookie: session_id=abc123; SameSite=None; Secure</pre>
                  <p>允许跨站发送 Cookie，但必须同时设置 Secure 属性</p>
                </div>
              </div>

              <div class="browser-support">
                <h4>浏览器支持：</h4>
                <ul>
                  <li>Chrome ≥ 51 ✅</li>
                  <li>Firefox ≥ 60 ✅</li>
                  <li>Safari ≥ 12.1 ✅</li>
                  <li>Edge ≥ 79 ✅</li>
                  <li>Internet Explorer ❌</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <div class="icon">🔄</div>
              <h3>双重提交 Cookie</h3>
              <div class="effectiveness">简单易实现</div>
            </div>
            <div class="method-content">
              <h4>工作原理：</h4>
              <ol>
                <li>服务器设置包含随机值的 Cookie</li>
                <li>客户端在请求中包含相同的值（表单字段或 HTTP 头）</li>
                <li>服务器比较两个值是否匹配</li>
              </ol>

              <pre class="code-block">// 服务器设置 Cookie
Set-Cookie: CSRF-TOKEN=random_value; Secure; HttpOnly

// 客户端发送请求
POST /transfer HTTP/1.1
Host: example.com
Cookie: CSRF-TOKEN=random_value
X-CSRF-Token: random_value

// 服务器验证
if (req.cookies['CSRF-TOKEN'] === req.headers['x-csrf-token']) {
  // 请求合法
}</pre>

              <div class="advantages">
                <h4>优点：</h4>
                <ul>
                  <li>实现简单</li>
                  <li>不需要服务器存储状态</li>
                  <li>适用于 RESTful API</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <div class="icon">👁️</div>
              <h3>用户交互验证</h3>
              <div class="effectiveness">高安全性但影响体验</div>
            </div>
            <div class="method-content">
              <h4>实现方式：</h4>
              <ul>
                <li><strong>重新认证</strong>：敏感操作前要求再次输入密码</li>
                <li><strong>CAPTCHA</strong>：添加人机验证</li>
                <li><strong>二次确认</strong>：操作前显示确认对话框</li>
                <li><strong>OTP验证</strong>：通过短信/邮件发送一次性密码</li>
              </ul>

              <div class="use-cases">
                <h4>适用场景：</h4>
                <ul>
                  <li>高风险操作（转账、改密）</li>
                  <li>管理员后台操作</li>
                  <li>关键数据修改</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <h2 class="section-title">CSRF 防护最佳实践</h2>

        <div class="practice-grid">
          <div class="practice-card">
            <div class="practice-icon">🔒</div>
            <h3>深度防御策略</h3>
            <ul>
              <li>同时使用 CSRF Token 和 SameSite Cookie</li>
              <li>对敏感操作添加用户验证</li>
              <li>关键操作使用 POST 而非 GET</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🚫</div>
            <h3>避免反模式</h3>
            <ul>
              <li>不要依赖 Referer 头验证</li>
              <li>不要将 CSRF Token 存储在 Cookie 中</li>
              <li>不要仅依赖请求方法进行验证</li>
            </ul>
          </div>

          <div class="practice-card">
            <div class="practice-icon">🔍</div>
            <h3>安全审计</h3>
            <ul>
              <li>定期进行安全扫描</li>
              <li>使用自动化工具检测漏洞</li>
              <li>进行渗透测试</li>
            </ul>
          </div>
        </div>

        <div class="framework-integration">
          <h3>框架集成</h3>
          <div class="framework-examples">
            <div class="example">
              <h4>Express.js (csurf 中间件)</h4>
              <pre class="code-block">const csrf = require('csurf');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(csrf({ cookie: true }));

// 提供 CSRF token 给视图
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// 验证所有 POST 请求
app.post('/process', (req, res) => {
  // 自动验证 CSRF token
  res.send('Success');
});</pre>
            </div>

            <div class="example">
              <h4>Django (内置 CSRF 防护)</h4>
              <pre class="code-block"># settings.py
MIDDLEWARE = [
    # ...
    'django.middleware.csrf.CsrfViewMiddleware',
]

# 模板中
&lt;form method="post"&gt;
  {% csrf_token %}
  &lt;!-- 表单内容 --&gt;
&lt;/form&gt;

# 视图中
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def my_view(request):
    # 受保护视图
    return HttpResponse('Success')</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="summary-section">
        <h2 class="section-title">总结与关键要点</h2>

        <div class="summary-grid">
          <div class="key-point">
            <div class="point-icon">❗</div>
            <h3>CSRF 本质</h3>
            <p>利用浏览器的 Cookie 发送机制，而非直接窃取凭证</p>
          </div>

          <div class="key-point">
            <div class="point-icon">🛡️</div>
            <h3>核心防御</h3>
            <p>验证请求是否来自合法源，而非仅验证用户身份</p>
          </div>

          <div class="key-point">
            <div class="point-icon">🔑</div>
            <h3>防护方案</h3>
            <p>CSRF Token + SameSite Cookie 是最佳组合方案</p>
          </div>

          <div class="key-point">
            <div class="point-icon">✅</div>
            <h3>实践建议</h3>
            <p>对状态更改操作实施防御，特别是敏感操作</p>
          </div>
        </div>

        <div class="final-tips">
          <h3>安全开发原则</h3>
          <ul>
            <li><strong>最小权限原则</strong>：用户只能访问必要的资源</li>
            <li><strong>深度防御</strong>：多层安全措施防止单点失效</li>
            <li><strong>持续更新</strong>：保持框架和库的最新版本</li>
            <li><strong>安全审计</strong>：定期进行代码审查和渗透测试</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = ref([
  { title: 'GET 请求攻击' },
  { title: 'POST 请求攻击' },
  { title: 'JSON API 攻击' }
]);

const activeTab = ref(0);
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@code-bg: #2d2d2d;
@danger-color: #e74c3c;
@success-color: #2ecc71;

.csrf-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  background-color: @light-bg;
  color: #333;
  min-height: 100vh;
  line-height: 1.6;
}

.app-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color, @secondary-color);
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .subtitle {
    margin: 10px 0 0;
    font-size: 1.2rem;
    opacity: 0.9;
    font-weight: 300;
  }
}

.content-wrapper {
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.8rem;
  color: @secondary-color;
  border-bottom: 2px solid @primary-color;
  padding-bottom: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
}

// 概念介绍部分
.concept-section {
  .info-card {
    background-color: #eef2ff;
    border-left: 4px solid @primary-color;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;

    .header-with-icon {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .icon {
        font-size: 2rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h2 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.6rem;
      }
    }

    p {
      font-size: 1.1rem;
      margin-bottom: 20px;
    }
  }

  .key-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 25px 0;

    .point {
      background-color: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

      .point-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0 0 10px 0;
        color: @secondary-color;
      }

      p {
        margin: 0;
        color: #555;
        font-size: 0.95rem;
      }
    }
  }

  .impact-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 20px;
    margin-top: 25px;

    h3 {
      margin-top: 0;
      color: @secondary-color;
      font-size: 1.4rem;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
  }

  .impact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 15px;

    .impact {
      text-align: center;
      padding: 15px;
      background-color: #ffebee;
      border-radius: 8px;
      border-left: 4px solid @danger-color;

      .impact-icon {
        font-size: 2rem;
        margin-bottom: 10px;
      }

      p {
        margin: 0;
        font-weight: 500;
      }
    }
  }
}

// 攻击原理部分
.principle-section {
  .attack-flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;

    .step {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 700px;
      margin: 15px 0;
      padding: 20px;
      background-color: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);

      .step-number {
        width: 40px;
        height: 40px;
        background-color: @primary-color;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin-right: 20px;
        flex-shrink: 0;
      }

      .step-content {
        h3 {
          margin: 0 0 10px 0;
          color: @secondary-color;
          font-size: 1.3rem;
        }

        p {
          margin: 0;
          color: #555;
        }
      }
    }

    .arrow {
      font-size: 2rem;
      color: @primary-color;
      margin: 5px 0;
    }
  }

  .technical-details {
    background-color: #fff8e1;
    border-radius: 8px;
    padding: 25px;
    margin-top: 30px;
    border-left: 4px solid #ffc107;

    h3 {
      margin-top: 0;
      color: #ff9800;
    }

    ul {
      padding-left: 20px;
      margin: 15px 0 0;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 25px;

        &::before {
          content: "•";
          color: #ff9800;
          font-weight: bold;
          position: absolute;
          left: 10px;
          font-size: 1.2rem;
        }
      }
    }
  }
}

// 代码块样式
.code-block {
  background-color: @code-bg;
  color: #f8f8f2;
  border-radius: 8px;
  padding: 18px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow: auto;
  margin: 15px 0;
}

// 攻击示例部分
.example-section {
  .example-tabs {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .tabs {
    display: flex;
    background-color: #f0f4ff;
    border-bottom: 1px solid @border-color;

    button {
      flex: 1;
      padding: 15px 20px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 500;
      color: #555;
      transition: all 0.3s;

      &.active {
        background-color: @primary-color;
        color: white;
      }

      &:not(.active):hover {
        background-color: #e0e6ff;
      }
    }
  }

  .tab-content {
    padding: 25px;

    .example-content {
      h3 {
        margin-top: 0;
        color: @secondary-color;
        font-size: 1.4rem;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }
    }
  }

  .explanation {
    background-color: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;

    h4 {
      margin-top: 0;
      color: @primary-color;
    }

    ul {
      padding-left: 20px;
      margin: 10px 0 0;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

// 防护方案部分
.protection-section {
  .protection-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 25px;
    margin-top: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .method-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    .method-header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: linear-gradient(to right, #f0f4ff, #e6f7ff);
      border-bottom: 1px solid @border-color;

      .icon {
        font-size: 1.8rem;
        margin-right: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0;
        color: @secondary-color;
        font-size: 1.3rem;
        flex: 1;
      }

      .effectiveness {
        background-color: #e8f5e9;
        color: #2e7d32;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .method-content {
      padding: 20px;

      h4 {
        color: @primary-color;
        margin-top: 0;
      }
    }
  }
}

.code-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .server-code,
  .client-code {
    h5 {
      margin: 0 0 10px;
      color: @secondary-color;
      font-size: 1rem;
    }
  }
}

.samesite-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 20px 0;

  .option {
    background-color: #f5f7fa;
    border-radius: 8px;
    padding: 15px;

    h5 {
      margin: 0 0 10px;
      color: @secondary-color;
    }

    p {
      margin: 10px 0 0;
      font-size: 0.9rem;
      color: #555;
    }
  }
}

.browser-support {
  ul {
    padding-left: 20px;
    margin: 15px 0 0;

    li {
      margin-bottom: 8px;
      position: relative;
      padding-left: 25px;

      &::before {
        content: "•";
        font-weight: bold;
        position: absolute;
        left: 10px;
      }
    }
  }
}

// 最佳实践部分
.best-practices {
  .practice-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .practice-card {
    background-color: @card-bg;
    border: 1px solid @border-color;
    border-radius: 8px;
    padding: 25px 20px;
    text-align: center;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

    .practice-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: @primary-color;
    }

    h3 {
      margin: 0 0 15px 0;
      color: @secondary-color;
      font-size: 1.3rem;
    }

    ul {
      padding-left: 20px;
      margin: 0;
      text-align: left;

      li {
        margin-bottom: 10px;
      }
    }
  }

  .framework-integration {
    margin-top: 40px;

    h3 {
      color: @secondary-color;
      font-size: 1.5rem;
      margin-bottom: 20px;
    }

    .framework-examples {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 25px;

      .example {
        background-color: @card-bg;
        border: 1px solid @border-color;
        border-radius: 8px;
        padding: 20px;

        h4 {
          margin-top: 0;
          color: @primary-color;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}

// 总结部分
.summary-section {
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;

    .key-point {
      background-color: @card-bg;
      border: 1px solid @border-color;
      border-radius: 8px;
      padding: 25px 20px;
      text-align: center;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);

      .point-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
        color: @primary-color;
      }

      h3 {
        margin: 0 0 10px 0;
        color: @secondary-color;
        font-size: 1.3rem;
      }

      p {
        margin: 0;
        color: #555;
      }
    }
  }

  .final-tips {
    background-color: #e8f5e9;
    border-radius: 8px;
    padding: 25px;
    margin-top: 30px;
    border-left: 4px solid #4caf50;

    h3 {
      margin-top: 0;
      color: #2e7d32;
    }

    ul {
      padding-left: 20px;
      margin: 15px 0 0;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 25px;

        &::before {
          content: "•";
          color: #2e7d32;
          font-weight: bold;
          position: absolute;
          left: 10px;
          font-size: 1.2rem;
        }

        strong {
          color: @secondary-color;
        }
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.6rem;
  }

  .key-points,
  .impact-grid,
  .protection-methods,
  .framework-examples {
    grid-template-columns: 1fr !important;
  }

  .attack-flow .step {
    flex-direction: column;
    text-align: center;

    .step-number {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
}
</style>
