<template>
  <div class="clickjacking-guide">
    <!-- 头部介绍 -->
    <header class="header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo">🛡️</div>
        </div>
        <div class="title-container">
          <h1>点击劫持攻击与防护</h1>
          <p class="subtitle">理解、识别并防御这种隐蔽的Web安全威胁</p>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">63%</div>
          <div class="stat-label">网站易受攻击</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">0.5秒</div>
          <div class="stat-label">攻击完成时间</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">3种</div>
          <div class="stat-label">主要防御方案</div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 基本概念 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🎯</span> 什么是点击劫持？</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="definition">
            <div class="quote">
              "点击劫持（Clickjacking）是一种欺骗用户点击非预期目标元素的攻击技术，通过覆盖或隐藏的方式诱导用户执行恶意操作。"
            </div>
          </div>

          <div class="comparison">
            <h3>攻击特征</h3>

            <div class="features">
              <div class="feature-card">
                <div class="feature-icon">👁️</div>
                <h4>视觉欺骗</h4>
                <p>隐藏恶意元素在可见UI之下</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🎭</div>
                <h4>界面伪装</h4>
                <p>创建与合法网站相似的界面</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h4>精准诱导</h4>
                <p>引导用户点击特定区域</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🔄</div>
                <h4>用户无感知</h4>
                <p>受害者完全不知情</p>
              </div>
            </div>
          </div>

          <div class="example">
            <h3>典型攻击场景</h3>
            <div class="attack-flow">
              <div class="step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h4>创建恶意页面</h4>
                  <p>攻击者设计一个看似无害的网页</p>
                </div>
              </div>
              <div class="step-arrow">➡️</div>
              <div class="step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h4>嵌入目标网站</h4>
                  <p>使用iframe加载目标网站（如银行页面）</p>
                </div>
              </div>
              <div class="step-arrow">➡️</div>
              <div class="step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h4>覆盖透明层</h4>
                  <p>在iframe上叠加透明或诱骗元素</p>
                </div>
              </div>
              <div class="step-arrow">➡️</div>
              <div class="step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h4>诱导用户点击</h4>
                  <p>用户以为点击的是可见内容，实际操作的是隐藏页面</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 攻击类型 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🔍</span> 点击劫持攻击类型</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="attack-types">
            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">💰</div>
                <h3>账户劫持</h3>
              </div>
              <div class="type-content">
                <ul>
                  <li>诱导用户授权应用</li>
                  <li>修改账户设置（邮箱/密码）</li>
                  <li>发起转账交易</li>
                </ul>
                <div class="code-snippet">
                  <pre>&lt;iframe src="https://bank.com/transfer"&gt;&lt;/iframe&gt;
&lt;button style="opacity:0.01; position:absolute; top:100px; left:200px;"&gt;
  点击赢取大奖
&lt;/button&gt;</pre>
                </div>
              </div>
            </div>

            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">📱</div>
                <h3>移动端劫持</h3>
              </div>
              <div class="type-content">
                <ul>
                  <li>利用触摸事件劫持</li>
                  <li>诱导用户下载恶意应用</li>
                  <li>获取设备权限授权</li>
                </ul>
                <div class="code-snippet">
                  <pre>/* 恶意CSS */
#malicious-button {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 9999;
}</pre>
                </div>
              </div>
            </div>

            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">🔒</div>
                <h3>权限提升</h3>
              </div>
              <div class="type-content">
                <ul>
                  <li>诱导用户启用摄像头/麦克风</li>
                  <li>获取位置信息授权</li>
                  <li>获取通知权限</li>
                </ul>
                <div class="code-snippet">
                  <pre>// 使用JavaScript触发点击
document.getElementById('hidden-iframe')
  .contentDocument.getElementById('enable-camera')
  .click();</pre>
                </div>
              </div>
            </div>

            <div class="type-card">
              <div class="type-header">
                <div class="type-icon">📢</div>
                <h3>社交媒体劫持</h3>
              </div>
              <div class="type-content">
                <ul>
                  <li>自动分享恶意内容</li>
                  <li>关注特定账户</li>
                  <li>发布不当内容</li>
                </ul>
                <div class="code-snippet">
                  <pre>&lt;div style="position:relative;"&gt;
  &lt;iframe src="https://social.com/post"&gt;&lt;/iframe&gt;
  &lt;div style="position:absolute; top:0; left:0;"&gt;
    &lt;img src="cute-cat.jpg" alt="点击查看猫咪"&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 攻击原理 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">⚙️</span> 攻击原理与技术实现</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="attack-demo">
            <div class="demo-visual">
              <div class="browser-frame">
                <div class="browser-header">
                  <div class="browser-dot red"></div>
                  <div class="browser-dot yellow"></div>
                  <div class="browser-dot green"></div>
                </div>
                <div class="browser-content">
                  <div class="malicious-site">
                    <div class="site-title">🎁 免费领取iPhone 14！</div>
                    <div class="site-content">
                      <div class="malicious-overlay">
                        <div class="overlay-text">点击这里领取奖品</div>
                      </div>
                      <iframe class="hidden-frame" src="#"></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div class="demo-legend">
                <div class="legend-item">
                  <div class="color-swatch overlay"></div>
                  <div class="legend-label">恶意覆盖层（用户可见）</div>
                </div>
                <div class="legend-item">
                  <div class="color-swatch frame"></div>
                  <div class="legend-label">隐藏的iframe（实际被点击）</div>
                </div>
              </div>
            </div>

            <div class="technical-details">
              <h3>核心技术要素</h3>
              <div class="details-grid">
                <div class="detail">
                  <h4>iframe嵌套</h4>
                  <p>嵌入目标网站到透明iframe中</p>
                </div>
                <div class="detail">
                  <h4>CSS欺骗</h4>
                  <p>使用opacity、z-index等属性隐藏真实元素</p>
                </div>
                <div class="detail">
                  <h4>事件冒泡</h4>
                  <p>利用浏览器事件传播机制</p>
                </div>
                <div class="detail">
                  <h4>视觉诱导</h4>
                  <p>创建吸引用户点击的诱饵</p>
                </div>
              </div>

              <h3>攻击实施步骤</h3>
              <ol class="attack-steps">
                <li>攻击者创建恶意网页，包含透明iframe加载目标网站</li>
                <li>在iframe上方创建诱骗用户的可见元素</li>
                <li>用户被诱导点击可见元素（实际点击在iframe上）</li>
                <li>iframe内的操作被执行（如转账、授权等）</li>
                <li>用户完全不知情，攻击完成</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <!-- 防护方案 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🛡️</span> 点击劫持防护方案</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="defense-methods">
            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">1</span> X-Frame-Options 响应头</h3>
              </div>
              <div class="method-content">
                <p>HTTP响应头，控制页面是否可以被嵌入到iframe中</p>

                <div class="options">
                  <div class="option">
                    <h4>DENY</h4>
                    <p>完全禁止任何框架嵌入</p>
                    <div class="code-snippet">
                      <pre>// Nginx配置
add_header X-Frame-Options DENY;</pre>
                    </div>
                  </div>

                  <div class="option">
                    <h4>SAMEORIGIN</h4>
                    <p>仅允许同源网站嵌入</p>
                    <div class="code-snippet">
                      <pre>// Apache配置
Header always set X-Frame-Options "SAMEORIGIN"</pre>
                    </div>
                  </div>

                  <div class="option">
                    <h4>ALLOW-FROM</h4>
                    <p>指定允许嵌入的域名（已废弃）</p>
                    <div class="code-snippet">
                      <pre>// 不推荐使用
X-Frame-Options: ALLOW-FROM https://trusted.com</pre>
                    </div>
                  </div>
                </div>

                <div class="note info">
                  <strong>注意：</strong> 这是最广泛支持的防护方案，兼容IE8+
                </div>
              </div>
            </div>

            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">2</span> Content Security Policy (CSP)</h3>
              </div>
              <div class="method-content">
                <p>更现代化的安全策略，提供更细粒度的控制</p>

                <div class="options">
                  <div class="option">
                    <h4>frame-ancestors 指令</h4>
                    <p>控制哪些页面可以嵌入当前页面</p>
                    <div class="code-snippet">
                      <pre>// 禁止所有嵌入
Content-Security-Policy: frame-ancestors 'none'

// 允许同源嵌入
Content-Security-Policy: frame-ancestors 'self'

// 允许指定域名
Content-Security-Policy: frame-ancestors trusted.com *.trusted-domain.com</pre>
                    </div>
                  </div>
                </div>

                <div class="note warning">
                  <strong>重要：</strong> CSP是现代Web应用的推荐安全方案，但需要仔细配置
                </div>
              </div>
            </div>

            <div class="method">
              <div class="method-header">
                <h3><span class="method-icon">3</span> 客户端防御技术</h3>
              </div>
              <div class="method-content">
                <p>在网站代码中添加防护逻辑</p>

                <div class="defense-techniques">
                  <div class="technique">
                    <h4>Frame Busting 脚本</h4>
                    <p>检测页面是否在iframe中加载并尝试跳出</p>
                    <div class="code-snippet">
                      <pre>if (top !== self) {
  top.location = self.location;
}</pre>
                    </div>
                    <div class="note caution">
                      <strong>局限：</strong> 可通过X-Frame-Options绕过或使用sandbox属性阻止
                    </div>
                  </div>

                  <div class="technique">
                    <h4>敏感操作验证</h4>
                    <p>对关键操作添加二次验证</p>
                    <ul>
                      <li>重要操作前要求输入密码</li>
                      <li>使用CAPTCHA验证</li>
                      <li>实施多因素认证</li>
                    </ul>
                  </div>

                  <div class="technique">
                    <h4>UI防欺骗设计</h4>
                    <p>通过设计降低被劫持风险</p>
                    <ul>
                      <li>关键按钮添加随机位移</li>
                      <li>使用拖拽操作代替点击</li>
                      <li>实施操作延迟确认</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践建议</h3>
            <div class="practices-grid">
              <div class="practice">
                <div class="practice-icon">✅</div>
                <div class="practice-content">
                  <h4>组合使用防护措施</h4>
                  <p>同时使用X-Frame-Options和CSP提供深度防御</p>
                </div>
              </div>
              <div class="practice">
                <div class="practice-icon">✅</div>
                <div class="practice-content">
                  <h4>关键操作双重验证</h4>
                  <p>对金融交易、权限更改等操作要求重新认证</p>
                </div>
              </div>
              <div class="practice">
                <div class="practice-icon">✅</div>
                <div class="practice-content">
                  <h4>定期安全扫描</h4>
                  <p>使用自动化工具检测点击劫持漏洞</p>
                </div>
              </div>
              <div class="practice">
                <div class="practice-icon">✅</div>
                <div class="practice-content">
                  <h4>安全意识培训</h4>
                  <p>教育用户识别可疑界面和请求</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">📝</span> 总结</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="conclusion">
            <div class="summary">
              <p>点击劫持是一种利用界面伪装和视觉欺骗的攻击技术，能够诱导用户在不知情的情况下执行恶意操作。</p>

              <div class="key-points">
                <h3>核心防护原则：</h3>
                <ul>
                  <li>🛡️ <strong>限制嵌入能力</strong>：使用X-Frame-Options和CSP控制页面嵌入</li>
                  <li>🔐 <strong>增强用户验证</strong>：对敏感操作实施多重验证</li>
                  <li>👁️ <strong>提高用户意识</strong>：教育用户识别可疑界面</li>
                  <li>🔍 <strong>定期安全审计</strong>：使用自动化工具检测漏洞</li>
                </ul>
              </div>
            </div>

            <div class="next-steps">
              <h3>安全实施检查表</h3>
              <div class="checklist">
                <div class="check-item">
                  <input type="checkbox" id="check1" checked>
                  <label for="check1">设置X-Frame-Options响应头</label>
                </div>
                <div class="check-item">
                  <input type="checkbox" id="check2">
                  <label for="check2">配置CSP frame-ancestors指令</label>
                </div>
                <div class="check-item">
                  <input type="checkbox" id="check3">
                  <label for="check3">关键操作添加双重验证</label>
                </div>
                <div class="check-item">
                  <input type="checkbox" id="check4">
                  <label for="check4">实施定期安全扫描</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a href="https://owasp.org/www-community/attacks/Clickjacking" target="_blank">OWASP点击劫持指南</a>
          <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Frame-Options" target="_blank">MDN文档</a>
          <a href="https://csp.withgoogle.com/docs/index.html" target="_blank">CSP参考</a>
        </div>
        <p> Web安全指南 | 保护用户免受点击劫持攻击</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以放置组件逻辑（如果有的话）
</script>

<style lang="less" scoped>
@primary: #4a6cf7;
@dark-primary: #3a56d8;
@secondary: #2c3e50;
@accent: #4caf50;
@light-bg: #f8f9fa;
@border: #e1e4e8;
@text: #2c3e50;
@code-bg: #f5f7fa;
@warning: #ff9800;
@success: #4caf50;
@info: #2196f3;
@danger: #f44336;

.clickjacking-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #4a6cf7 0%, #2c3e50 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  color: white;
  padding: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '🛡️';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 6rem;
    opacity: 0.1;
    transform: rotate(25deg);
  }

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    z-index: 2;

    .logo-container {
      margin-right: 20px;

      .logo {
        width: 80px;
        height: 80px;
        background: white;
        color: @dark-primary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        box-shadow: 0 5px 15px rgba(74, 108, 247, 0.5);
      }
    }

    .title-container {
      h1 {
        font-size: 2.5rem;
        margin: 0 0 10px 0;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin: 0;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    z-index: 2;

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.8;
      }
    }
  }
}

.section {
  margin-bottom: 50px;
  background: @light-bg;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  .section-header {
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      margin: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 15px;
        font-size: 1.5rem;
      }
    }

    .divider {
      height: 3px;
      width: 80px;
      background: @primary;
      margin-top: 15px;
      border-radius: 3px;
    }
  }
}

.definition {
  background: white;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .quote {
    font-size: 1.3rem;
    font-style: italic;
    text-align: center;
    position: relative;
    padding: 20px 40px;
    margin: 0;

    &::before,
    &::after {
      content: '"';
      font-size: 5rem;
      opacity: 0.1;
      position: absolute;
      color: @primary;
    }

    &::before {
      top: -30px;
      left: 10px;
    }

    &::after {
      bottom: -60px;
      right: 10px;
    }
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 0;
    font-size: 0.95rem;
  }
}

.example {
  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 25px;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 3px;
      background: @primary;
      border-radius: 3px;
    }
  }
}

.attack-flow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.step {
  flex: 1;
  min-width: 200px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;

  .step-icon {
    width: 40px;
    height: 40px;
    background: @primary;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 auto 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 0;
    font-size: 0.95rem;
  }
}

.step-arrow {
  font-size: 1.5rem;
  color: @primary;
}

.attack-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.type-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .type-header {
    padding: 20px;
    display: flex;
    align-items: center;
    background: rgba(@primary, 0.1);

    .type-icon {
      font-size: 2rem;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
    }
  }

  .type-content {
    padding: 20px;

    ul {
      padding-left: 20px;
      margin-top: 0;
      margin-bottom: 15px;

      li {
        margin-bottom: 8px;
      }
    }
  }
}

.attack-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.browser-frame {
  border: 1px solid @border;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  .browser-header {
    background: #f1f3f4;
    padding: 10px;
    display: flex;

    .browser-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-right: 8px;

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

  .browser-content {
    background: white;
    height: 300px;
    position: relative;
    overflow: hidden;
  }
}

.malicious-site {
  height: 100%;
  display: flex;
  flex-direction: column;

  .site-title {
    background: linear-gradient(to right, #ff9966, #ff5e62);
    color: white;
    padding: 15px;
    text-align: center;
    font-weight: 700;
  }

  .site-content {
    flex: 1;
    position: relative;
  }
}

.malicious-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #ff9966, #ff5e62);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 10;
}

.hidden-frame {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 200px;
  height: 150px;
  border: 2px dashed @danger;
  opacity: 0.5;
  z-index: 5;
}

.demo-legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;

  .color-swatch {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 10px;

    &.overlay {
      background: linear-gradient(to bottom, #ff9966, #ff5e62);
    }

    &.frame {
      background: @danger;
      opacity: 0.5;
    }
  }
}

.technical-details {
  h3 {
    font-size: 1.5rem;
    margin-top: 0;
  }
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.detail {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h4 {
    margin-top: 0;
    margin-bottom: 8px;
    color: @primary;
  }
}

.attack-steps {
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    line-height: 1.6;
  }
}

.defense-methods {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.method {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .method-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid @border;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      display: flex;
      align-items: center;

      .method-icon {
        width: 30px;
        height: 30px;
        background: @primary;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        font-weight: 700;
      }
    }
  }
}

.options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.option {
  background: rgba(@primary, 0.05);
  border-radius: 8px;
  padding: 20px;

  h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: @primary;
  }
}

.defense-techniques {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.technique {
  background: rgba(@primary, 0.05);
  border-radius: 8px;
  padding: 20px;

  h4 {
    margin-top: 0;
    margin-bottom: 15px;
    color: @primary;
  }

  ul {
    padding-left: 20px;
    margin-top: 0;
    margin-bottom: 15px;
  }
}

.best-practices {
  margin-top: 40px;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.practice {
  display: flex;
  align-items: flex-start;
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .practice-icon {
    font-size: 1.5rem;
    margin-right: 15px;
    color: @success;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 8px;
  }
}

.conclusion {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.summary {
  p {
    font-size: 1.1rem;
    line-height: 1.7;
  }
}

.key-points {
  margin-top: 25px;

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 15px;
      position: relative;
      padding-left: 40px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(@primary, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
    }
  }
}

.next-steps {
  h3 {
    margin-top: 0;
    text-align: center;
    margin-bottom: 25px;
  }
}

.checklist {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    accent-color: @primary;
  }

  label {
    font-size: 1.1rem;
    font-weight: 500;
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border-left: 3px solid @primary;
  overflow-x: auto;

  pre {
    margin: 0;
    line-height: 1.5;
  }
}

.note {
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
  font-size: 0.9rem;

  &.info {
    background: lighten(@info, 45%);
    border-left: 3px solid @info;

    strong {
      color: @info;
    }
  }

  &.warning {
    background: lighten(@warning, 40%);
    border-left: 3px solid @warning;

    strong {
      color: @warning;
    }
  }

  &.caution {
    background: lighten(@danger, 40%);
    border-left: 3px solid @danger;

    strong {
      color: @danger;
    }
  }
}

.footer {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid @border;

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    a {
      color: @primary;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin: 0;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;

    .logo-container {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  .attack-flow {
    flex-direction: column;

    .step {
      margin-bottom: 30px;
    }

    .step-arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }
}
</style>
