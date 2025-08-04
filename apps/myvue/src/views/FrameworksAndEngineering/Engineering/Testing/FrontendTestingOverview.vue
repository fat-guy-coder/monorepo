<template>
  <div class="frontend-testing-guide">
    <header class="header">
      <div class="title-container">
        <h1>前端测试基本指南</h1>
        <p class="subtitle">构建稳健应用的测试策略与工具</p>
      </div>
      <div class="stats">
        <div class="stat-card">
          <div class="stat-value">85%</div>
          <div class="stat-label">开发者认为测试对项目成功很重要</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">70%</div>
          <div class="stat-label">项目使用自动化测试</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">3x</div>
          <div class="stat-label">测试覆盖率高的项目bug减少</div>
        </div>
      </div>
    </header>

    <main class="content">
      <section class="section">
        <h2 class="section-title">📚 前端测试基本概念</h2>
        <div class="columns">
          <div class="concept-card">
            <div class="concept-icon">🔍</div>
            <h3>什么是前端测试？</h3>
            <p>前端测试是验证Web应用用户界面、交互逻辑和功能的实践过程，确保应用在不同环境和场景下按预期工作。</p>
          </div>
          <div class="concept-card">
            <div class="concept-icon">🎯</div>
            <h3>测试目标</h3>
            <ul>
              <li>确保功能正确性</li>
              <li>防止回归错误</li>
              <li>提升代码质量</li>
              <li>增强开发信心</li>
              <li>优化用户体验</li>
            </ul>
          </div>
          <div class="concept-card">
            <div class="concept-icon">📊</div>
            <h3>测试金字塔模型</h3>
            <div class="pyramid">
              <div class="layer e2e">E2E测试 (10%)</div>
              <div class="layer integration">集成测试 (20%)</div>
              <div class="layer unit">单元测试 (70%)</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">🧪 如何进行前端测试</h2>
        <div class="test-types">
          <div class="test-card">
            <div class="test-header">
              <div class="test-icon">🧩</div>
              <h3>单元测试 (Unit Testing)</h3>
            </div>
            <div class="test-content">
              <p><strong>目的：</strong>测试独立的代码单元（函数、组件）</p>
              <p><strong>示例：</strong></p>
              <div class="code-block">
                <pre><code>// 测试工具函数
function sum(a: number, b: number) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// 测试Vue组件
test('renders greeting', () => {
  const wrapper = mount(Greeting, {
    props: { name: 'John' }
  });
  expect(wrapper.text()).toContain('Hello, John!');
});</code></pre>
              </div>
              <div class="test-tips">
                <h4>最佳实践：</h4>
                <ul>
                  <li>测试单一职责</li>
                  <li>使用模拟(mock)隔离依赖</li>
                  <li>覆盖率目标70-80%</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="test-card">
            <div class="test-header">
              <div class="test-icon">🧩🧩</div>
              <h3>集成测试 (Integration Testing)</h3>
            </div>
            <div class="test-content">
              <p><strong>目的：</strong>验证多个组件/模块如何协同工作</p>
              <p><strong>示例：</strong></p>
              <div class="code-block">
                <pre><code>// 测试表单提交流程
test('form submission flow', async () => {
  render(LoginForm); // 渲染组件

  // 填写表单
  const emailInput = screen.getByLabelText('Email');
  await userEvent.type(emailInput, 'test@example.com');

  // 提交表单
  fireEvent.click(screen.getByText('Submit'));

  // 验证结果
  await waitFor(() => {
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });
});</code></pre>
              </div>
              <div class="test-tips">
                <h4>最佳实践：</h4>
                <ul>
                  <li>测试关键用户旅程</li>
                  <li>模拟外部服务</li>
                  <li>避免过度测试UI细节</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="test-card">
            <div class="test-header">
              <div class="test-icon">🌐</div>
              <h3>端到端测试 (E2E Testing)</h3>
            </div>
            <div class="test-content">
              <p><strong>目的：</strong>模拟真实用户场景验证整个应用</p>
              <p><strong>示例：</strong></p>
              <div class="code-block">
                <pre><code>// 使用Cypress测试用户登录流程
describe('Login Test', () => {
  it('successfully logs in', () => {
    cy.visit('https://app.example.com/login');
    cy.get('#email').type('user@example.com');
    cy.get('#password').type('password123');
    cy.get('#login-button').click();

    // 验证登录后重定向
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, User!').should('be.visible');
  });
});</code></pre>
              </div>
              <div class="test-tips">
                <h4>最佳实践：</h4>
                <ul>
                  <li>测试关键业务路径</li>
                  <li>使用真实数据环境</li>
                  <li>保持测试独立</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">🧰 前端测试工具库</h2>
        <div class="tools-grid">
          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo jest">J</div>
              <div class="tool-title">
                <h3>Jest</h3>
                <div class="tool-tag">单元/组件测试</div>
              </div>
            </div>
            <div class="tool-features">
              <ul>
                <li>零配置启动</li>
                <li>强大的模拟(mock)功能</li>
                <li>交互式观察模式</li>
                <li>覆盖率报告</li>
              </ul>
            </div>
            <div class="tool-install">
              <span class="command">npm install jest --save-dev</span>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo vitest">V</div>
              <div class="tool-title">
                <h3>Vitest</h3>
                <div class="tool-tag">单元/组件测试</div>
              </div>
            </div>
            <div class="tool-features">
              <ul>
                <li>Vite原生支持</li>
                <li>极快的运行速度</li>
                <li>兼容Jest API</li>
                <li>支持ESM/TS开箱即用</li>
              </ul>
            </div>
            <div class="tool-install">
              <span class="command">npm install vitest --save-dev</span>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo cypress">C</div>
              <div class="tool-title">
                <h3>Cypress</h3>
                <div class="tool-tag">E2E测试</div>
              </div>
            </div>
            <div class="tool-features">
              <ul>
                <li>时间旅行调试</li>
                <li>实时重载测试</li>
                <li>自动等待机制</li>
                <li>强大的可视化界面</li>
              </ul>
            </div>
            <div class="tool-install">
              <span class="command">npm install cypress --save-dev</span>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo rtl">RTL</div>
              <div class="tool-title">
                <h3>Testing Library</h3>
                <div class="tool-tag">用户行为测试</div>
              </div>
            </div>
            <div class="tool-features">
              <ul>
                <li>模拟真实用户交互</li>
                <li>避免测试实现细节</li>
                <li>支持多种框架</li>
                <li>无障碍测试辅助</li>
              </ul>
            </div>
            <div class="tool-install">
              <span class="command">npm install @testing-library/react</span>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">⚖️ 前端测试优缺点分析</h2>
        <div class="comparison">
          <div class="pros">
            <h3><span class="icon">✅</span> 前端测试优势</h3>
            <ul>
              <li><strong>早期错误检测</strong>：编码阶段发现错误，减少后期修复成本</li>
              <li><strong>重构信心</strong>：确保修改不会破坏现有功能</li>
              <li><strong>文档作用</strong>：测试作为活文档说明功能预期行为</li>
              <li><strong>设计改进</strong>：测试驱动开发(TDD)促进更好架构设计</li>
              <li><strong>持续集成</strong>：自动化测试支持CI/CD流水线</li>
            </ul>
          </div>

          <div class="cons">
            <h3><span class="icon">⚠️</span> 前端测试挑战</h3>
            <ul>
              <li><strong>初始成本高</strong>：设置测试环境和编写测试耗时</li>
              <li><strong>维护负担</strong>：UI变化频繁时需要更新测试</li>
              <li><strong>测试脆弱性</strong>：过度依赖实现细节导致测试易碎</li>
              <li><strong>速度问题</strong>：大型测试套件运行时间增加</li>
              <li><strong>假阳性/阴性</strong>：错误配置可能导致误报或漏报</li>
            </ul>
          </div>
        </div>

        <div class="recommendation">
          <h3>💡 测试策略建议</h3>
          <div class="strategy">
            <div class="strategy-step">
              <div class="step-number">1</div>
              <p>从关键业务逻辑单元测试开始</p>
            </div>
            <div class="strategy-step">
              <div class="step-number">2</div>
              <p>为核心用户流程编写集成测试</p>
            </div>
            <div class="strategy-step">
              <div class="step-number">3</div>
              <p>为关键路径添加少量E2E测试</p>
            </div>
            <div class="strategy-step">
              <div class="step-number">4</div>
              <p>在CI/CD中自动化测试流程</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>前端测试最佳实践 © 2023 | 覆盖单元测试、集成测试、E2E测试 | 推荐测试覆盖率：70-80%</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 可以添加交互逻辑
import { ref } from 'vue';

const activeSection = ref('concepts');
</script>

<style lang="less" scoped>
.frontend-testing-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #2c3e50;
  background: #f8fafc;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 12px;
  padding: 40px 30px;
  margin-bottom: 40px;
  color: white;
  box-shadow: 0 10px 30px rgba(106, 17, 203, 0.2);

  .title-container {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 2.8rem;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
    }
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 30px;

    .stat-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      border-radius: 10px;
      padding: 20px;
      width: 180px;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.85;
      }
    }
  }
}

.section {
  margin-bottom: 50px;

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #eaecef;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #3498db;
  }

  p {
    color: #555;
  }

  .pyramid {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .layer {
      padding: 15px;
      text-align: center;
      color: white;
      font-weight: 600;

      &.unit {
        background: #3498db;
        border-radius: 8px 8px 0 0;
      }

      &.integration {
        background: #9b59b6;
        width: 80%;
        align-self: center;
      }

      &.e2e {
        background: #e74c3c;
        width: 60%;
        align-self: center;
        border-radius: 0 0 8px 8px;
      }
    }
  }
}

.test-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.test-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);

  .test-header {
    padding: 20px 25px;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    color: white;
    display: flex;
    align-items: center;
    gap: 15px;

    .test-icon {
      font-size: 1.8rem;
    }

    h3 {
      margin: 0;
      font-size: 1.4rem;
    }
  }

  .test-content {
    padding: 25px;

    p {
      color: #555;
      margin-top: 0;
    }
  }

  .test-tips {
    background: #f8f9fc;
    border-left: 4px solid #3498db;
    padding: 15px;
    border-radius: 0 8px 8px 0;
    margin-top: 20px;

    h4 {
      margin-bottom: 10px;
      color: #2c3e50;
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 8px;
        color: #555;
      }
    }
  }
}

.code-block {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 18px;
  margin: 20px 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.92rem;

  pre {
    margin: 0;

    code {
      color: #f8f8f2;
      line-height: 1.5;
    }
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.tool-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  .tool-header {
    display: flex;
    padding: 20px;
    gap: 15px;
    align-items: center;
    background: linear-gradient(135deg, #f8f9fc 0%, #eef2f7 100%);

    .tool-logo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.5rem;
      color: white;

      &.jest {
        background: linear-gradient(135deg, #99425b 0%, #c6426e 100%);
      }

      &.vitest {
        background: linear-gradient(135deg, #41d1ff 0%, #647eff 100%);
      }

      &.cypress {
        background: linear-gradient(135deg, #5a5a5a 0%, #3a3a3a 100%);
      }

      &.rtl {
        background: linear-gradient(135deg, #e3342f 0%, #f6993f 100%);
      }
    }

    .tool-title {
      h3 {
        margin: 0 0 5px 0;
        color: #2c3e50;
      }

      .tool-tag {
        background: rgba(52, 152, 219, 0.15);
        color: #3498db;
        font-size: 0.8rem;
        padding: 3px 10px;
        border-radius: 20px;
        display: inline-block;
      }
    }
  }

  .tool-features {
    padding: 20px;

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 12px;
        color: #555;
        line-height: 1.5;
      }
    }
  }

  .tool-install {
    padding: 15px 20px;
    background: #f8f9fc;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;

    .command {
      color: #3498db;
      font-weight: 500;
    }
  }
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;

  .pros,
  .cons {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

    h3 {
      margin-top: 0;
      display: flex;
      align-items: center;
      gap: 10px;

      .icon {
        font-size: 1.5rem;
      }
    }

    ul {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 18px;
        color: #555;
        line-height: 1.6;
      }
    }
  }

  .pros {
    border-top: 4px solid #2ecc71;

    h3 {
      color: #27ae60;
    }
  }

  .cons {
    border-top: 4px solid #e74c3c;

    h3 {
      color: #c0392b;
    }
  }
}

.recommendation {
  background: linear-gradient(135deg, #f8f9fc 0%, #eef2f7 100%);
  border-radius: 12px;
  padding: 30px;

  h3 {
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #3498db;
  }
}

.strategy {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-top: 20px;

  .strategy-step {
    background: white;
    border-radius: 10px;
    padding: 25px 20px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-8px);
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: #3498db;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.3rem;
      margin: 0 auto 15px auto;
    }

    p {
      margin: 0;
      color: #555;
      font-weight: 500;
    }
  }
}

.footer {
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
  border-top: 1px solid #eaecef;
  color: #7f8c8d;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .header .stats {
    flex-direction: column;
    align-items: center;

    .stat-card {
      width: 100%;
      max-width: 300px;
    }
  }

  .comparison {
    grid-template-columns: 1fr;
  }

  .test-types {
    grid-template-columns: 1fr;
  }

  .header {
    padding: 25px 15px;

    h1 {
      font-size: 1.9rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem !important;
  }

  .strategy {
    grid-template-columns: 1fr;
  }
}
</style>
