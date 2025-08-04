<template>
  <div class="xss-container">
    <header class="header">
      <h1>跨站脚本攻击(XSS)基本介绍</h1>
      <div class="subtitle">Web安全的首要威胁与防御策略</div>
    </header>

    <div class="alert-banner">
      <div class="alert-content">
        <div class="alert-icon">⚠️</div>
        <div>
          <strong>安全警告：</strong> XSS攻击长期位列OWASP Top 10安全风险，占所有Web应用漏洞的65%以上
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <div class="title-icon">🔍</div>
        <span>XSS攻击原理</span>
      </h2>
      <div class="content">
        <div class="definition-box">
          <strong>跨站脚本攻击(XSS)</strong> 是一种将恶意脚本注入到可信网站中的攻击方式。当用户访问被注入恶意脚本的页面时，这些脚本会在用户浏览器中执行。
        </div>

        <div class="attack-flow">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>攻击者构造恶意脚本</h3>
              <p>包含窃取cookie、会话劫持、钓鱼等功能的恶意JavaScript代码</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>注入到目标网站</h3>
              <p>通过输入表单、URL参数、评论区域等注入点</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>用户访问被感染的页面</h3>
              <p>恶意脚本随正常页面加载执行</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>敏感数据泄露</h3>
              <p>用户会话、个人信息、凭证等被发送到攻击者服务器</p>
            </div>
          </div>
        </div>

        <div class="illustration">
          <div class="browser">
            <div class="browser-header">
              <div class="browser-dots">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
              </div>
              <div class="browser-url">https://yourbank.com/account?search=<span
                  class="malicious">&lt;script&gt;stealCookies()&lt;/script&gt;</span></div>
            </div>
            <div class="browser-content">
              <div class="user-content">欢迎回来，用户名</div>
              <div class="malicious-script">
                <div class="script-box">
                  &lt;script&gt;
                  <div class="malicious-line">sendToAttacker(document.cookie);</div>
                  &lt;/script&gt;
                </div>
                <div class="data-flow">
                  <div class="data-dot"></div>
                  <div class="data-line"></div>
                  <div class="attacker-server">攻击者服务器</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section attack-types">
      <h2 class="section-title">
        <div class="title-icon">⚠️</div>
        <span>XSS攻击类型</span>
      </h2>
      <div class="content">
        <div class="type-cards">
          <div class="type-card reflective">
            <h3>反射型XSS</h3>
            <div class="type-icon">↪️</div>
            <ul>
              <li>恶意脚本来自当前HTTP请求</li>
              <li>通常通过URL参数注入</li>
              <li>需要诱骗用户点击恶意链接</li>
            </ul>
            <div class="example">
              <code>https://site.com?search=&lt;script&gt;alert(1)&lt;/script&gt;</code>
            </div>
          </div>

          <div class="type-card stored">
            <h3>存储型XSS</h3>
            <div class="type-icon">💾</div>
            <ul>
              <li>恶意脚本永久存储在服务器</li>
              <li>影响所有访问受影响页面的用户</li>
              <li>常见于评论、论坛帖子等</li>
            </ul>
            <div class="example">
              <code>评论区注入: &lt;script&gt;malicious()&lt;/script&gt;</code>
            </div>
          </div>

          <div class="type-card dom">
            <h3>基于DOM的XSS</h3>
            <div class="type-icon">🌐</div>
            <ul>
              <li>完全在客户端发生的漏洞</li>
              <li>修改DOM环境在前端执行恶意代码</li>
              <li>不涉及服务器端处理</li>
            </ul>
            <div class="example">
              <code>location.hash导致脚本执行</code>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section reflective-xss-demo">
      <h2 class="section-title">
        <div class="title-icon">🎯</div>
        <span>反射型XSS演示</span>
      </h2>
      <div class="content">
        <div class="demo-container">
          <div class="demo-description">
            <h3>反射型XSS攻击流程</h3>
            <p>反射型XSS是最常见的XSS攻击类型之一。攻击者通常通过构造特殊的URL,诱导用户点击,从而执行恶意代码。</p>
          </div>

          <div class="attack-flow-diagram">
            <div class="flow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>构造恶意链接</h4>
                <code>http://example.com/search?q=&lt;script&gt;alert('已被攻击')&lt;/script&gt;</code>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>用户点击链接</h4>
                <p>攻击者通过社交工程等手段诱导用户点击</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>服务器响应</h4>
                <p>服务器将参数未经处理直接返回页面</p>
              </div>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>执行恶意代码</h4>
                <p>浏览器解析并执行注入的脚本</p>
              </div>
            </div>
          </div>

          <div class="prevention-tips">
            <h3>防护建议</h3>
            <ul>
              <li>对URL参数进行严格过滤和转义</li>
              <li>实施输入验证和规范化</li>
              <li>使用CSP限制脚本执行</li>
              <li>避免直接在页面中反射用户输入</li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <div class="section reflective-xss-demo">
      <h2 class="section-title">
        <div class="title-icon">💾</div>
        <span>存储型XSS攻击演示</span>
      </h2>
      <div class="demo-container">
        <div class="demo-description">
          <h3>什么是存储型XSS?</h3>
          <p>存储型XSS是最危险的XSS攻击类型之一。攻击者将恶意脚本提交到目标网站的数据库中，当其他用户浏览包含此恶意脚本的页面时，脚本会被执行。常见的攻击场景包括论坛帖子、评论系统、个人信息等允许用户输入的地方。</p>
        </div>

        <div class="attack-flow-diagram">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>提交恶意内容</h4>
              <code>&lt;script&gt;stealCookie()&lt;/script&gt;</code>
              <p>攻击者在评论框中提交包含恶意代码的内容</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>服务器存储</h4>
              <p>恶意代码被保存到数据库中</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>用户访问</h4>
              <p>其他用户访问包含恶意代码的页面</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>代码执行</h4>
              <p>恶意脚本在受害者浏览器中执行</p>
            </div>
          </div>
        </div>

        <div class="prevention-tips">
          <h3>防护建议</h3>
          <ul>
            <li>在存储数据前进行严格的输入过滤</li>
            <li>输出时进行HTML实体编码</li>
            <li>使用富文本编辑器时采用白名单过滤</li>
            <li>定期扫描数据库中的可疑内容</li>
          </ul>
        </div>
      </div>
    </div>


    <div class="section dom-xss">
      <h2 class="section-title">
        <div class="title-icon">🔍</div>
        <span>基于DOM的XSS攻击</span>
      </h2>
      <div class="content">
        <div class="demo-description">
          <h3>什么是DOM型XSS?</h3>
          <p>DOM型XSS是一种特殊的跨站脚本攻击，它的特点是攻击代码不需要服务器端的参与，而是通过浏览器端的DOM操作触发。攻击者通常通过修改页面URL中的参数或其他客户端数据来实现攻击。</p>
        </div>

        <div class="attack-flow-diagram">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>构造恶意URL</h4>
              <code>http://example.com?name=&lt;script&gt;alert(1)&lt;/script&gt;</code>
              <p>攻击者构造包含恶意代码的URL参数</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>用户访问</h4>
              <p>受害者点击恶意链接访问页面</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>DOM操作</h4>
              <p>JavaScript代码读取URL参数并更新DOM</p>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>攻击执行</h4>
              <p>恶意代码通过DOM操作被执行</p>
            </div>
          </div>
        </div>

        <div class="prevention-tips">
          <h3>防护建议</h3>
          <ul>
            <li>使用安全的DOM API和操作方法</li>
            <li>对URL参数和DOM数据进行严格过滤</li>
            <li>避免使用eval()等危险函数</li>
            <li>使用textContent替代innerHTML</li>
          </ul>
        </div>
      </div>
    </div>


    <div class="section protection">
      <h2 class="section-title">
        <div class="title-icon">🛡️</div>
        <span>XSS防护策略</span>
      </h2>
      <div class="content">
        <div class="defense-grid">
          <div class="defense-card">
            <div class="defense-icon">✂️</div>
            <h3>输入验证与过滤</h3>
            <ul>
              <li>使用白名单过滤输入内容</li>
              <li>移除特殊字符和脚本标签</li>
              <li>验证数据类型和格式</li>
            </ul>
          </div>

          <div class="defense-card">
            <div class="defense-icon">🔒</div>
            <h3>输出编码</h3>
            <ul>
              <li>HTML实体编码: &amp;lt; &amp;gt; &amp;amp;</li>
              <li>JavaScript编码</li>
              <li>URL编码</li>
            </ul>
            <div class="code-example">
              <pre><code>// Vue中自动编码
&lt;div&gt; userInput &lt;/div&gt;

// 手动编码函数
function encodeHTML(str) {
  return str.replace(/[&<>"']/g,
    match => `&amp;${map[match]};`);
}</code></pre>
            </div>
          </div>

          <div class="defense-card">
            <div class="defense-icon">📜</div>
            <h3>内容安全策略(CSP)</h3>
            <ul>
              <li>限制脚本来源</li>
              <li>禁止内联脚本</li>
              <li>报告策略违规</li>
            </ul>
            <div class="code-example">
              <pre><code>// HTTP响应头
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://trusted.cdn;
  style-src 'self' 'unsafe-inline';
  img-src * data:;</code></pre>
            </div>
          </div>

          <div class="defense-card">
            <div class="defense-icon">🍪</div>
            <h3>HttpOnly Cookies</h3>
            <ul>
              <li>阻止JavaScript访问敏感cookie</li>
              <li>会话cookie必须设置HttpOnly</li>
              <li>降低会话劫持风险</li>
            </ul>
            <div class="code-example">
              <pre><code>// 设置HttpOnly Cookie
Set-Cookie: sessionId=abc123;
  HttpOnly; Secure; SameSite=Strict</code></pre>
            </div>
          </div>

          <div class="defense-card">
            <div class="defense-icon">🛡️</div>
            <h3>安全框架</h3>
            <ul>
              <li>使用现代前端框架(Vue/React/Angular)</li>
              <li>利用内置的XSS防护机制</li>
              <li>避免使用v-html/dangerouslySetInnerHTML</li>
            </ul>
          </div>

          <div class="defense-card">
            <div class="defense-icon">🔍</div>
            <h3>安全扫描与测试</h3>
            <ul>
              <li>自动化漏洞扫描工具</li>
              <li>手动渗透测试</li>
              <li>代码审计</li>
            </ul>
          </div>
        </div>

        <div class="comparison">
          <div class="vulnerable">
            <h3>存在漏洞的代码</h3>
            <pre><code>// 危险：直接输出未编码的用户输入
document.getElementById('output').innerHTML =
  userInput;</code></pre>
            <div class="risk-level">高风险</div>
          </div>
          <div class="safe">
            <h3>修复后的安全代码</h3>
            <pre><code>// 安全：使用textContent代替innerHTML
document.getElementById('output')
  .textContent = userInput;

// 或使用编码库
safeOutput.innerHTML =
  DOMPurify.sanitize(userInput);</code></pre>
            <div class="risk-level safe">安全</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section best-practices">
      <h2 class="section-title">
        <div class="title-icon">✅</div>
        <span>XSS防护最佳实践</span>
      </h2>
      <div class="content">
        <ul class="practices-list">
          <li><strong>深度防御：</strong> 组合使用多种防护措施</li>
          <li><strong>自动转义：</strong> 使用模板引擎的自动转义功能</li>
          <li><strong>安全库：</strong> 使用DOMPurify等净化库处理HTML内容</li>
          <li><strong>避免危险API：</strong> 不使用eval()、document.write()等危险函数</li>
          <li><strong>持续教育：</strong> 对开发团队进行安全编码培训</li>
          <li><strong>安全响应头：</strong> 设置X-XSS-Protection, X-Content-Type-Options等</li>
        </ul>
      </div>
    </div>

    <footer class="footer">
      <p>© 2023 Web安全中心 | XSS防护是每个开发者的责任</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 示例数据，实际应用中可能从API获取
const stats = ref({
  prevalence: "65%",
  topVulnerability: true,
  reportedCases: "150,000+"
});
</script>

<style lang="less" scoped>
@primary-color: #3498db;
@danger-color: #e74c3c;
@warning-color: #f39c12;
@success-color: #2ecc71;
@dark-color: #2c3e50;
@light-color: #ecf0f1;

.xss-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: #fff;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 3px solid @danger-color;

  h1 {
    font-size: 2.8rem;
    color: @dark-color;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, @dark-color, @danger-color);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.3rem;
    color: #7f8c8d;
    font-weight: 500;
  }
}

.alert-banner {
  background: linear-gradient(90deg, #ffeb3b, #ff9800);
  color: #333;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .alert-content {
    display: flex;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;

    .alert-icon {
      font-size: 2rem;
      margin-right: 1rem;
    }

    div {
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
}

.section {
  margin-bottom: 3.5rem;

  .section-title {
    display: flex;
    align-items: center;
    color: @dark-color;
    font-size: 2rem;
    margin-bottom: 1.8rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid @light-color;

    .title-icon {
      font-size: 1.8rem;
      margin-right: 12px;
      width: 50px;
      height: 50px;
      background: #f1f8ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .content {
    font-size: 1.1rem;
    color: #555;
  }
}

.definition-box {
  background: #f8f9fa;
  border-left: 4px solid @danger-color;
  padding: 1.2rem 1.5rem;
  border-radius: 0 8px 8px 0;
  margin-bottom: 2rem;
  font-size: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.attack-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2.5rem 0;

  .flow-step {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 1.2rem;
    width: 22%;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
      border-color: @danger-color;
    }

    .step-number {
      width: 36px;
      height: 36px;
      background: @danger-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-weight: bold;
      font-size: 1.2rem;
    }

    h3 {
      color: @danger-color;
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }

    p {
      color: #7f8c8d;
      font-size: 0.95rem;
    }
  }

  .flow-arrow {
    font-size: 2rem;
    color: #bbb;
    margin: 0 -10px;
  }
}

.illustration {
  margin: 3rem 0;

  .browser {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    .browser-header {
      background: #f1f1f1;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;

      .browser-dots {
        display: flex;
        gap: 6px;
        margin-right: 15px;

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;

          &.red {
            background: #ff5f56;
          }

          &.yellow {
            background: #ffbd2e;
          }

          &.green {
            background: #27c93f;
          }
        }
      }

      .browser-url {
        flex: 1;
        background: white;
        padding: 5px 15px;
        border-radius: 15px;
        font-family: monospace;
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;

        .malicious {
          color: @danger-color;
          font-weight: bold;
        }
      }
    }

    .browser-content {
      padding: 1.5rem;
      background: white;
      min-height: 200px;
      position: relative;

      .user-content {
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
      }

      .malicious-script {
        background: #fff8f8;
        border: 1px solid #ffdddd;
        border-radius: 6px;
        padding: 1rem;
        font-family: monospace;
        color: @danger-color;
        position: relative;
        overflow: hidden;

        .malicious-line {
          color: #c0392b;
          font-weight: bold;
        }

        .data-flow {
          position: absolute;
          top: 50%;
          right: -100px;
          display: flex;
          align-items: center;

          .data-dot {
            width: 12px;
            height: 12px;
            background: @danger-color;
            border-radius: 50%;
            position: relative;
            z-index: 2;
          }

          .data-line {
            width: 100px;
            height: 2px;
            background: repeating-linear-gradient(to right,
                @danger-color,
                @danger-color 5px,
                transparent 5px,
                transparent 10px);
          }

          .attacker-server {
            background: #f1c40f;
            color: #333;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.85rem;
            white-space: nowrap;
          }
        }
      }
    }
  }
}

.type-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;

  .type-card {
    border-radius: 10px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-7px);
    }

    h3 {
      margin-top: 0;
      font-size: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    }

    .type-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 2rem;
      opacity: 0.2;
    }

    ul {
      padding-left: 1.5rem;
      margin: 1.5rem 0;

      li {
        margin-bottom: 0.8rem;
        position: relative;
        padding-left: 1rem;

        &::before {
          content: "•";
          position: absolute;
          left: 0;
          color: @danger-color;
          font-weight: bold;
        }

      }
    }

    .example {
      background: rgba(0, 0, 0, 0.05);
      padding: 0.8rem;
      border-radius: 5px;
      font-family: monospace;
      font-size: 0.9rem;
      margin-top: 1rem;
    }
  }

  .reflective {
    background: linear-gradient(135deg, #ffeded, #fff4f4);
    border-top: 4px solid @danger-color;
  }

  .stored {
    background: linear-gradient(135deg, #fff4e6, #fff8f0);
    border-top: 4px solid @warning-color;
  }

  .dom {
    background: linear-gradient(135deg, #e6f4ff, #f0f8ff);
    border-top: 4px solid @primary-color;
  }
}

.defense-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.8rem;

  .defense-card {
    background: white;
    border-radius: 10px;
    padding: 1.8rem 1.5rem;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    transition: all 0.3s;
    border: 1px solid #eee;

    &:hover {
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transform: translateY(-3px);
      border-color: @primary-color;
    }

    .defense-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      color: @dark-color;
      font-size: 1.4rem;
      margin: 0.5rem 0 1.2rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed #ddd;
    }

    ul {
      padding-left: 1.2rem;
      margin-bottom: 1.5rem;

      li {
        margin-bottom: 0.8rem;
        color: #555;
      }
    }

    .code-example {
      background: #2d2d2d;
      color: #f8f8f2;
      border-radius: 6px;
      padding: 1rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      overflow-x: auto;

      pre {
        margin: 0;
      }

      code {
        line-height: 1.5;
      }
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  .vulnerable,
  .safe {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

    h3 {
      margin: 0;
      padding: 1.2rem;
      font-size: 1.3rem;
    }

    pre {
      margin: 0;
      padding: 1.5rem;
      font-size: 0.95rem;
      font-family: 'Fira Code', monospace;
      white-space: pre-wrap;
      background: #f8f9fa;
    }

    .risk-level {
      text-align: center;
      padding: 0.8rem;
      font-weight: bold;
      font-size: 1.1rem;
      text-transform: uppercase;
    }
  }

  .vulnerable {
    h3 {
      background: linear-gradient(45deg, #e74c3c, #c0392b);
      color: white;
    }

    pre {
      background: #fff5f5;
      color: #c0392b;
    }

    .risk-level {
      background: #e74c3c;
      color: white;
    }
  }

  .safe {
    h3 {
      background: linear-gradient(45deg, #2ecc71, #27ae60);
      color: white;
    }

    pre {
      background: #f0fff4;
      color: #27ae60;
    }

    .risk-level {
      background: #2ecc71;
      color: white;
    }
  }
}

.practices-list {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 10px;
  padding: 2rem;
  list-style-type: none;

  li {
    margin-bottom: 1.2rem;
    padding-left: 2rem;
    position: relative;
    font-size: 1.1rem;

    &::before {
      content: "✓";
      position: absolute;
      left: 0;
      top: 0;
      width: 24px;
      height: 24px;
      background: @success-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
    }

    strong {
      color: @dark-color;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #ecf0f1;
  color: #7f8c8d;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .xss-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .attack-flow {
    flex-direction: column;
    gap: 1.5rem;

    .flow-arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
  }

  .type-cards,
  .defense-grid,
  .comparison {
    grid-template-columns: 1fr;
  }
}

.reflective-xss-demo {
  margin: 2rem 0;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .demo-container {
    padding: 1.5rem;
  }

  .demo-description {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;

    h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      line-height: 1.6;
    }
  }

  .attack-flow-diagram {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
    flex-wrap: wrap;
    gap: 1rem;

    .flow-step {
      flex: 1;
      min-width: 200px;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

      .step-number {
        width: 30px;
        height: 30px;
        background: #3498db;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .step-content {
        h4 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        code {
          display: block;
          padding: 0.5rem;
          background: #f1f3f5;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #e74c3c;
          word-break: break-all;
        }

        p {
          color: #666;
          font-size: 0.9rem;
        }
      }
    }

    .flow-arrow {
      color: #3498db;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .prevention-tips {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #e8f4fc;
    border-radius: 8px;

    h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        color: #444;

        &:before {
          content: "•";
          color: #3498db;
          font-weight: bold;
          position: absolute;
          left: 0;
        }
      }
    }
  }
}
</style>
