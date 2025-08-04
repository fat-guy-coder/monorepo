<template>
  <div class="sso-container">
    <header class="sso-header">
      <div class="header-content">
        <h1>单点登录 (SSO) 技术基础介绍</h1>
        <p class="subtitle">一处登录，处处通行</p>
        <div class="sso-animation">
          <div class="user">👤</div>
          <div class="arrow">➡️</div>
          <div class="app app-1">🔐</div>
          <div class="arrow">➡️</div>
          <div class="app app-2">📧</div>
          <div class="arrow">➡️</div>
          <div class="app app-3">📊</div>
        </div>
      </div>
    </header>

    <div class="sso-content">
      <div class="card definition-card">
        <div class="card-header">
          <div class="icon">🔑</div>
          <h2>什么是单点登录？</h2>
        </div>
        <div class="card-body">
          <p>
            单点登录(Single Sign-On, SSO)是一种身份验证方案，允许用户使用<strong>一组登录凭证</strong>
            访问多个相关但独立的软件系统。用户只需登录一次，即可访问所有相互信任的应用系统。
          </p>
          <div class="sso-diagram">
            <div class="user">用户</div>
            <div class="sso-center">
              <div class="sso-server">SSO认证中心</div>
              <div class="tokens">
                <div class="token">🔑</div>
                <div class="token">🔑</div>
                <div class="token">🔑</div>
              </div>
            </div>
            <div class="applications">
              <div class="app">应用A</div>
              <div class="app">应用B</div>
              <div class="app">应用C</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card workflow-card">
        <div class="card-header">
          <div class="icon">🔄</div>
          <h2>SSO 工作流程</h2>
        </div>
        <div class="card-body">
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>用户访问应用</h3>
              <p>用户尝试访问受保护的应用程序</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <h3>重定向到认证中心</h3>
              <p>应用将未认证用户重定向到SSO认证中心</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <h3>用户认证</h3>
              <p>用户提供凭证进行身份验证</p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <h3>发放令牌</h3>
              <p>认证中心颁发令牌给用户</p>
            </div>
            <div class="step">
              <div class="step-number">5</div>
              <h3>令牌验证</h3>
              <p>应用使用令牌验证用户身份</p>
            </div>
            <div class="step">
              <div class="step-number">6</div>
              <h3>访问授权</h3>
              <p>应用允许用户访问资源</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-row">
        <div class="card implementation-card">
          <div class="card-header">
            <div class="icon">⚙️</div>
            <h2>实现方式</h2>
          </div>
          <div class="card-body">
            <div class="implementation-method">
              <h3>基于Token的SSO</h3>
              <p>使用JSON Web Token (JWT) 作为认证令牌</p>
              <div class="code-snippet">
                <pre>{
  "user_id": "12345",
  "name": "John Doe",
  "exp": 1672527600,
  "iss": "sso-auth-center",
  "aud": "app-domain.com"
}</pre>
              </div>
            </div>
            <div class="implementation-method">
              <h3>SAML协议</h3>
              <p>安全断言标记语言，使用XML格式交换认证和授权数据</p>
            </div>
            <div class="implementation-method">
              <h3>OAuth 2.0</h3>
              <p>开放授权标准，允许应用在用户授权下访问资源</p>
            </div>
            <div class="implementation-method">
              <h3>OpenID Connect</h3>
              <p>基于OAuth 2.0的身份层，提供身份验证功能</p>
            </div>
          </div>
        </div>

        <div class="card scenarios-card">
          <div class="card-header">
            <div class="icon">🌐</div>
            <h2>使用场景</h2>
          </div>
          <div class="card-body">
            <div class="scenario">
              <div class="scenario-icon">🏢</div>
              <div class="scenario-content">
                <h3>企业应用集成</h3>
                <p>统一访问CRM、ERP、HR系统等内部应用</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🛒</div>
              <div class="scenario-content">
                <h3>电子商务平台</h3>
                <p>购物车、支付系统、用户中心的统一登录</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🎓</div>
              <div class="scenario-content">
                <h3>教育系统</h3>
                <p>学生管理系统、在线课程、图书馆资源统一访问</p>
              </div>
            </div>
            <div class="scenario">
              <div class="scenario-icon">🏥</div>
              <div class="scenario-content">
                <h3>医疗系统</h3>
                <p>电子病历、预约系统、药品管理的统一认证</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card pros-cons-card">
        <div class="card-header">
          <div class="icon">⚖️</div>
          <h2>优缺点分析</h2>
        </div>
        <div class="card-body">
          <div class="pros-cons-container">
            <div class="pros">
              <h3>✅ 优点</h3>
              <ul>
                <li>提升用户体验 - 减少多次登录的麻烦</li>
                <li>简化密码管理 - 只需记住一组凭证</li>
                <li>增强安全性 - 减少密码泄露风险</li>
                <li>降低管理成本 - 集中管理用户账户</li>
                <li>提高生产力 - 减少登录时间</li>
              </ul>
            </div>
            <div class="cons">
              <h3>⚠️ 缺点</h3>
              <ul>
                <li>单点故障 - 认证中心宕机影响所有系统</li>
                <li>实现复杂性 - 集成多个系统需要额外开发</li>
                <li>安全风险集中 - 主凭证泄露危及所有系统</li>
                <li>跨域问题 - 不同域名下的实现挑战</li>
                <li>退出问题 - 所有应用完全退出需要额外处理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="card security-card">
        <div class="card-header">
          <div class="icon">🛡️</div>
          <h2>安全最佳实践</h2>
        </div>
        <div class="card-body">
          <div class="security-practices">
            <div class="practice">
              <div class="practice-icon">🔐</div>
              <div class="practice-content">
                <h3>强密码策略</h3>
                <p>要求复杂密码并定期更换</p>
              </div>
            </div>
            <div class="practice">
              <div class="practice-icon">📱</div>
              <div class="practice-content">
                <h3>多因素认证</h3>
                <p>增加短信/邮箱/生物识别验证</p>
              </div>
            </div>
            <div class="practice">
              <div class="practice-icon">⏱️</div>
              <div class="practice-content">
                <h3>令牌有效期</h3>
                <p>设置合理的令牌过期时间</p>
              </div>
            </div>
            <div class="practice">
              <div class="practice-icon">🔍</div>
              <div class="practice-content">
                <h3>安全审计</h3>
                <p>记录所有登录和访问活动</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="sso-footer">
      <p>单点登录是现代企业应用集成的关键技术，在提升用户体验的同时需要平衡安全性与实现复杂度</p>
      <div class="tech-stack">
        <span>常见SSO技术栈：</span>
        <span class="tech">OAuth 2.0</span>
        <span class="tech">OpenID Connect</span>
        <span class="tech">SAML 2.0</span>
        <span class="tech">JWT</span>
        <span class="tech">Keycloak</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 这里可以添加组件逻辑
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

.sso-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans SC', sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8f9fc 0%, #e6e9f5 100%);
  min-height: 100vh;

  .sso-header {
    text-align: center;
    padding: 40px 20px;
    margin-bottom: 30px;
    background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
    border-radius: 16px;
    color: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, #4cc9f0, #4361ee, #3a0ca3);
    }

    h1 {
      font-size: 2.8rem;
      margin: 0 0 10px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .subtitle {
      font-size: 1.5rem;
      opacity: 0.9;
      margin-bottom: 30px;
    }

    .sso-animation {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      gap: 20px;

      .user,
      .app {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(5px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      }

      .app-1 {
        background: rgba(76, 201, 240, 0.3);
      }

      .app-2 {
        background: rgba(67, 97, 238, 0.3);
      }

      .app-3 {
        background: rgba(58, 12, 163, 0.3);
      }

      .arrow {
        font-size: 1.8rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .sso-content {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

    .card-header {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #f0f4ff;

      .icon {
        font-size: 2.5rem;
        margin-right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
        color: white;
        box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
      }

      h2 {
        font-size: 1.8rem;
        color: #2c3e50;
        margin: 0;
      }
    }

    .card-body {
      p {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #4a5568;
      }
    }
  }

  .definition-card {
    .sso-diagram {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      background: #f8f9ff;
      padding: 30px;
      border-radius: 12px;

      .user,
      .app {
        width: 100px;
        height: 100px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        background: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      }

      .sso-center {
        display: flex;
        flex-direction: column;
        align-items: center;

        .sso-server {
          background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
          color: white;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: bold;
          margin-bottom: 20px;
          box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
        }

        .tokens {
          display: flex;
          gap: 10px;

          .token {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #4cc9f0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            color: white;
            animation: float 3s infinite ease-in-out;

            &:nth-child(2) {
              background: #4361ee;
              animation-delay: 0.5s;
            }

            &:nth-child(3) {
              background: #3a0ca3;
              animation-delay: 1s;
            }
          }
        }
      }

      .applications {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .app {
          &:nth-child(1) {
            background: #e0f7fa;
          }

          &:nth-child(2) {
            background: #e3f2fd;
          }

          &:nth-child(3) {
            background: #ede7f6;
          }
        }
      }
    }
  }

  .workflow-card {
    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }

      .step {
        background: #f8f9ff;
        border-radius: 12px;
        padding: 25px;
        text-align: center;
        border-left: 4px solid #4361ee;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(67, 97, 238, 0.15);
        }

        .step-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 20px;
        }

        h3 {
          margin: 0 0 15px;
          color: #2c3e50;
        }

        p {
          margin: 0;
          color: #4a5568;
          font-size: 1rem;
        }
      }
    }
  }

  .card-row {
    display: flex;
    gap: 25px;

    @media (max-width: 992px) {
      flex-direction: column;
    }

    .card {
      flex: 1;
    }
  }

  .implementation-card {
    .implementation-method {
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 1px solid #f0f4ff;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      h3 {
        color: #3a0ca3;
        margin-top: 0;
      }

      p {
        color: #4a5568;
      }

      .code-snippet {
        background: #2d3748;
        border-radius: 8px;
        padding: 20px;
        margin-top: 15px;
        overflow-x: auto;

        pre {
          margin: 0;
          color: #cbd5e0;
          font-family: 'Fira Code', monospace;
          font-size: 0.95rem;
          line-height: 1.5;
        }
      }
    }
  }

  .scenarios-card {
    .scenario {
      display: flex;
      align-items: center;
      margin-bottom: 25px;
      padding: 20px;
      border-radius: 12px;
      background: #f8f9ff;
      transition: all 0.3s ease;

      &:hover {
        transform: translateX(5px);
        background: linear-gradient(to right, #f8f9ff, #eef1ff);
      }

      .scenario-icon {
        font-size: 2rem;
        margin-right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(67, 97, 238, 0.1);
        color: #4361ee;
      }

      .scenario-content {
        h3 {
          margin: 0 0 10px;
          color: #2c3e50;
        }

        p {
          margin: 0;
          color: #4a5568;
        }
      }
    }
  }

  .pros-cons-card {
    .pros-cons-container {
      display: flex;
      gap: 25px;

      @media (max-width: 768px) {
        flex-direction: column;
      }

      .pros,
      .cons {
        flex: 1;
        padding: 25px;
        border-radius: 12px;

        h3 {
          margin-top: 0;
          padding-bottom: 15px;
          border-bottom: 2px solid;
        }
      }

      .pros {
        background: rgba(123, 220, 181, 0.1);

        h3 {
          color: #16c79a;
          border-color: rgba(22, 199, 154, 0.3);
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            padding: 12px 0;
            border-bottom: 1px solid rgba(22, 199, 154, 0.1);
            position: relative;
            padding-left: 30px;

            &::before {
              content: '✓';
              position: absolute;
              left: 0;
              color: #16c79a;
              font-weight: bold;
            }
          }
        }
      }

      .cons {
        background: rgba(255, 107, 107, 0.05);

        h3 {
          color: #ff6b6b;
          border-color: rgba(255, 107, 107, 0.3);
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 107, 107, 0.1);
            position: relative;
            padding-left: 30px;

            &::before {
              content: '⚠️';
              position: absolute;
              left: 0;
            }
          }
        }
      }
    }
  }

  .security-card {
    .security-practices {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .practice {
        display: flex;
        align-items: center;
        background: #f8f9ff;
        padding: 20px;
        border-radius: 12px;
        transition: all 0.3s ease;
        border-left: 4px solid #4361ee;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(67, 97, 238, 0.15);
        }

        .practice-icon {
          font-size: 2rem;
          margin-right: 20px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(67, 97, 238, 0.1);
          color: #4361ee;
        }

        .practice-content {
          h3 {
            margin: 0 0 8px;
            color: #2c3e50;
          }

          p {
            margin: 0;
            color: #4a5568;
          }
        }
      }
    }
  }

  .sso-footer {
    text-align: center;
    margin-top: 50px;
    padding: 30px;
    background: #2c3e50;
    color: white;
    border-radius: 16px;

    p {
      font-size: 1.1rem;
      max-width: 800px;
      margin: 0 auto 20px;
      line-height: 1.7;
    }

    .tech-stack {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 15px;

      .tech {
        background: rgba(255, 255, 255, 0.15);
        padding: 8px 20px;
        border-radius: 30px;
        font-weight: 500;
      }
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(0);
    }
  }
}
</style>
