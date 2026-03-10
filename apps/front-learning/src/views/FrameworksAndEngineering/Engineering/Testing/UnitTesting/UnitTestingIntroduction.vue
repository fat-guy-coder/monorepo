<template>
  <div class="unit-test-container">
    <header class="header">
      <h1>前端 <span class="highlight">单元测试</span> 介绍</h1>
      <p class="subtitle">构建可靠前端应用的基石</p>
    </header>

    <div class="content">
      <!-- 基本介绍部分 -->
      <section class="intro-section">
        <div class="intro-content">
          <div class="intro-text">
            <h2><i class="fas fa-flask"></i> 什么是单元测试？</h2>
            <p>
              单元测试是针对软件中最小可测试单元（通常是函数或组件）进行的验证过程，确保其按预期工作。
            </p>
          </div>
          <div class="testing-pyramid">
            <div class="pyramid-layer end-to-end">
              <div class="layer-label">端到端测试 (E2E)</div>
              <div class="layer-percentage">10%</div>
            </div>
            <div class="pyramid-layer integration">
              <div class="layer-label">集成测试</div>
              <div class="layer-percentage">20%</div>
            </div>
            <div class="pyramid-layer unit">
              <div class="layer-label">单元测试</div>
              <div class="layer-percentage">70%</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 作用与价值 -->
      <section class="benefits-section">
        <h2 class="section-title">
          <i class="fas fa-medal"></i>
          单元测试的作用与价值
        </h2>

        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon bug">
              <i class="fas fa-bug"></i>
            </div>
            <h3>缺陷预防</h3>
            <p>在开发早期发现并修复错误，减少后期修复成本</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon docs">
              <i class="fas fa-file-alt"></i>
            </div>
            <h3>活文档</h3>
            <p>测试用例作为代码的文档，展示功能如何使用</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon refactor">
              <i class="fas fa-sync-alt"></i>
            </div>
            <h3>重构保障</h3>
            <p>确保重构不会破坏现有功能，提升代码质量</p>
          </div>

          <div class="benefit-card">
            <div class="benefit-icon design">
              <i class="fas fa-drafting-compass"></i>
            </div>
            <h3>设计改进</h3>
            <p>促进模块化、低耦合的设计，提高可测试性</p>
          </div>
        </div>
      </section>

      <!-- 工具与使用 -->
      <section class="tools-section">
        <h2 class="section-title">
          <i class="fas fa-tools"></i>
          常用工具与使用
        </h2>

        <div class="tools-overview">
          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo jest"></div>
              <h3>Jest</h3>
            </div>
            <div class="tool-description">
              <p>Facebook 开发的零配置测试框架，支持快照测试、覆盖率报告等</p>
            </div>
            <div class="tool-install">
              <pre>npm install --save-dev jest</pre>
            </div>
          </div>

          <div class="tool-card">
            <div class="tool-header">
              <div class="tool-logo vitest"></div>
              <h3>Vitest</h3>
            </div>
            <div class="tool-description">
              <p>基于 Vite 的极速测试框架，兼容 Jest API，专为现代前端设计</p>
            </div>
            <div class="tool-install">
              <pre>npm install --save-dev vitest</pre>
            </div>
          </div>
        </div>

        <div class="code-examples">
          <div class="example-card">
            <h3><i class="fas fa-code"></i> 测试纯函数示例</h3>
            <pre>
// 被测函数
function sum(a, b) {
  return a + b;
}

// 测试用例
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});</pre
            >
          </div>

          <div class="example-card">
            <h3><i class="fab fa-vuejs"></i> Vue 组件测试示例</h3>
            <pre>
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

test('renders button with correct text', () => {
  const wrapper = mount(Button, {
    props: {
      label: 'Submit'
    }
  });

  expect(wrapper.text()).toContain('Submit');
  expect(wrapper.attributes('type')).toBe('button');
});</pre
            >
          </div>
        </div>
      </section>

      <!-- 适用场景 -->
      <section class="scenarios-section">
        <h2 class="section-title">
          <i class="fas fa-check-circle"></i>
          适用场景
        </h2>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <h3>核心业务逻辑</h3>
            <p>验证支付计算、数据处理等关键业务逻辑</p>
            <div class="suitability high">高度适用</div>
          </div>

          <div class="scenario-card">
            <h3>工具函数</h3>
            <p>测试日期格式化、数据处理等纯函数</p>
            <div class="suitability high">高度适用</div>
          </div>

          <div class="scenario-card">
            <h3>UI组件</h3>
            <p>验证组件渲染、Props处理、事件触发</p>
            <div class="suitability medium">中度适用</div>
          </div>

          <div class="scenario-card">
            <h3>第三方库集成</h3>
            <p>验证自定义封装逻辑，而非测试库本身</p>
            <div class="suitability medium">中度适用</div>
          </div>

          <div class="scenario-card">
            <h3>复杂交互逻辑</h3>
            <p>验证多步骤交互的状态变化</p>
            <div class="suitability low">低度适用</div>
          </div>

          <div class="scenario-card">
            <h3>视觉样式</h3>
            <p>颜色、布局等视觉元素验证</p>
            <div class="suitability low">低度适用</div>
          </div>
        </div>
      </section>

      <!-- 优缺点分析 -->
      <section class="pros-cons-section">
        <h2 class="section-title">
          <i class="fas fa-balance-scale"></i>
          优缺点分析
        </h2>

        <div class="pros-cons">
          <div class="pros">
            <h3><i class="fas fa-plus-circle"></i> 优点</h3>
            <ul>
              <li v-for="(pro, index) in pros" :key="index">
                <i class="fas fa-check"></i> {{ pro }}
              </li>
            </ul>
          </div>

          <div class="cons">
            <h3><i class="fas fa-minus-circle"></i> 缺点</h3>
            <ul>
              <li v-for="(con, index) in cons" :key="index">
                <i class="fas fa-times"></i> {{ con }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <h2 class="section-title">
          <i class="fas fa-star"></i>
          最佳实践
        </h2>

        <div class="practices">
          <div class="practice-card">
            <div class="practice-number">1</div>
            <div class="practice-content">
              <h3>测试行为而非实现</h3>
              <p>关注函数输出而非内部实现，避免因重构导致测试失败</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">2</div>
            <div class="practice-content">
              <h3>遵循 FIRST 原则</h3>
              <p>
                Fast（快速）、Independent（独立）、Repeatable（可重复）、Self-Validating（自验证）、Timely（及时）
              </p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">3</div>
            <div class="practice-content">
              <h3>合理使用 Mock</h3>
              <p>隔离外部依赖，但避免过度模拟导致测试失真</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">4</div>
            <div class="practice-content">
              <h3>测试覆盖率目标</h3>
              <p>设置合理的覆盖率目标（通常 70-80%），关键路径 100%</p>
            </div>
          </div>

          <div class="practice-card">
            <div class="practice-number">5</div>
            <div class="practice-content">
              <h3>持续集成</h3>
              <p>将测试纳入 CI/CD 流程，确保每次提交都通过测试</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 测试覆盖率 -->
      <section class="coverage-section">
        <h2 class="section-title">
          <i class="fas fa-chart-pie"></i>
          测试覆盖率报告
        </h2>

        <div class="coverage-chart">
          <div class="chart-container">
            <div class="coverage-metric">
              <div class="metric-value" :style="{ '--percentage': coverageData.statements }">
                85%
              </div>
              <div class="metric-label">语句覆盖率</div>
            </div>
            <div class="coverage-metric">
              <div class="metric-value" :style="{ '--percentage': coverageData.branches }">75%</div>
              <div class="metric-label">分支覆盖率</div>
            </div>
            <div class="coverage-metric">
              <div class="metric-value" :style="{ '--percentage': coverageData.functions }">
                90%
              </div>
              <div class="metric-label">函数覆盖率</div>
            </div>
            <div class="coverage-metric">
              <div class="metric-value" :style="{ '--percentage': coverageData.lines }">87%</div>
              <div class="metric-label">行覆盖率</div>
            </div>
          </div>
          <div class="coverage-legend">
            <div><span class="legend-high"></span> 80-100%</div>
            <div><span class="legend-medium"></span> 60-79%</div>
            <div><span class="legend-low"></span> 0-59%</div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>单元测试不是银弹，但却是构建可维护、高质量前端应用不可或缺的工具</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 测试覆盖率数据
const coverageData = ref({
  statements: 85,
  branches: 75,
  functions: 90,
  lines: 87,
})

// 单元测试优点
const pros = ref([
  '提高代码质量和可靠性',
  '减少回归缺陷，增强重构信心',
  '作为代码文档，说明功能预期行为',
  '促进模块化设计，降低耦合度',
  '缩短调试时间，提高开发效率',
  '支持持续集成和自动化部署',
])

// 单元测试缺点
const cons = ref([
  '初期增加开发时间和成本',
  '需要学习测试框架和工具',
  '过度测试可能导致维护负担',
  '无法发现集成问题或设计缺陷',
  '测试代码本身也需要维护',
  '可能产生虚假安全感（覆盖率高≠质量高）',
])
</script>

<style lang="less" scoped>
:root {
  --primary: #4361ee;
  --primary-light: #eef2ff;
  --secondary: #3a0ca3;
  --success: #2ec4b6;
  --warning: #ff9f1c;
  --danger: #e71d36;
  --dark: #1e1e2c;
  --light: #f8f9fa;
  --gray: #6c757d;
  --border: #dee2e6;
  --card-bg: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unit-test-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%);
  color: var(--dark);
  line-height: 1.6;
  padding: 20px;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 50px 20px;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  border-radius: 16px;
  box-shadow: var(--shadow);
  color: white;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 15px;

    .highlight {
      color: #ffd166;
      font-weight: bold;
    }
  }

  .subtitle {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.85);
    max-width: 700px;
    margin: 0 auto;
    font-weight: 500;
  }
}

.content {
  background-color: var(--card-bg);
  border-radius: 16px;
  box-shadow: var(--shadow);
  overflow: hidden;
  padding: 40px;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.8rem;
  margin: 40px 0 30px;
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 15px;
  border-bottom: 2px solid var(--primary-light);

  i {
    color: var(--primary);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-light);
    border-radius: 50%;
  }
}

.intro-section {
  .intro-content {
    display: flex;
    gap: 40px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .intro-text {
      flex: 1;

      h2 {
        font-size: 2rem;
        margin-bottom: 20px;
        color: var(--secondary);
        display: flex;
        align-items: center;
        gap: 15px;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.8;
      }
    }

    .testing-pyramid {
      flex: 1;
      display: flex;
      flex-direction: column;
      max-width: 400px;

      .pyramid-layer {
        padding: 20px;
        color: white;
        position: relative;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
        }

        .layer-label {
          font-weight: bold;
          font-size: 1.2rem;
        }

        .layer-percentage {
          position: absolute;
          right: 20px;
          top: 20px;
          font-size: 1.5rem;
          font-weight: bold;
        }
      }

      .unit {
        background: #2ec4b6;
        height: 140px;
        border-radius: 8px 8px 0 0;
      }

      .integration {
        background: #4361ee;
        height: 100px;
      }

      .end-to-end {
        background: #ff9f1c;
        height: 60px;
        border-radius: 0 0 8px 8px;
      }
    }
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.benefit-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-hover);
  }

  .benefit-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-size: 2rem;

    &.bug {
      background: rgba(231, 29, 54, 0.1);
      color: var(--danger);
    }
    &.docs {
      background: rgba(67, 97, 238, 0.1);
      color: var(--primary);
    }
    &.refactor {
      background: rgba(46, 196, 182, 0.1);
      color: var(--success);
    }
    &.design {
      background: rgba(255, 159, 28, 0.1);
      color: var(--warning);
    }
  }

  h3 {
    margin-bottom: 15px;
    color: var(--secondary);
  }
}

.tools-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.tool-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;

  .tool-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f8fafc;

    .tool-logo {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      margin-right: 15px;

      &.jest {
        background: #99425b;
        position: relative;

        &::before {
          content: 'Jest';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-weight: bold;
        }
      }

      &.vitest {
        background: #729b1b;
        position: relative;

        &::before {
          content: 'Vitest';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-weight: bold;
          font-size: 0.7rem;
        }
      }
    }
  }

  .tool-description {
    padding: 20px;
  }

  .tool-install {
    background: #1e1e2c;
    color: white;
    padding: 15px 20px;
    font-family: 'Courier New', monospace;
    border-radius: 0 0 12px 12px;
  }
}

.code-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin: 40px 0;
}

.example-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;

  h3 {
    padding: 20px;
    background: #f8fafc;
    color: var(--secondary);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  pre {
    padding: 20px;
    font-family: 'Courier New', monospace;
    background: #2d3748;
    color: #e2e8f0;
    overflow-x: auto;
    line-height: 1.5;
  }
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.scenario-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 25px;
  position: relative;
  overflow: hidden;

  h3 {
    margin-bottom: 15px;
    color: var(--secondary);
  }

  .suitability {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px 15px;
    border-radius: 0 0 0 12px;
    font-weight: bold;

    &.high {
      background: var(--success);
    }
    &.medium {
      background: var(--warning);
    }
    &.low {
      background: var(--danger);
    }
  }
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .pros,
  .cons {
    border-radius: 12px;
    padding: 30px;
  }

  .pros {
    background: rgba(46, 196, 182, 0.1);
    border: 1px solid rgba(46, 196, 182, 0.3);

    h3 {
      color: var(--success);
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
  }

  .cons {
    background: rgba(231, 29, 54, 0.05);
    border: 1px solid rgba(231, 29, 54, 0.2);

    h3 {
      color: var(--danger);
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
  }

  ul {
    list-style-type: none;

    li {
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: flex-start;
      gap: 10px;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.practice-card {
  display: flex;
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  overflow: hidden;

  .practice-number {
    width: 60px;
    background: var(--primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    flex-shrink: 0;
  }

  .practice-content {
    padding: 20px;
    flex: 1;

    h3 {
      margin-bottom: 10px;
      color: var(--secondary);
    }
  }
}

.coverage-chart {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 30px;
  margin-top: 30px;

  .chart-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
  }

  .coverage-metric {
    text-align: center;

    .metric-value {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      margin: 0 auto 15px;
      position: relative;
      background:
        radial-gradient(closest-side, white 79%, transparent 80% 100%),
        conic-gradient(var(--success) calc(var(--percentage) * 1%), #e2e8f0 0);

      &::before {
        content: attr(data-value);
      }
    }

    .metric-label {
      font-weight: 500;
      color: var(--gray);
    }
  }

  .coverage-legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;

    div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .legend-high {
      width: 20px;
      height: 20px;
      background: var(--success);
      border-radius: 4px;
    }

    .legend-medium {
      width: 20px;
      height: 20px;
      background: var(--warning);
      border-radius: 4px;
    }

    .legend-low {
      width: 20px;
      height: 20px;
      background: var(--danger);
      border-radius: 4px;
    }
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
  color: var(--gray);
  font-size: 1.1rem;
  font-style: italic;
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .header {
    padding: 30px 15px;

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .content {
    padding: 20px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .intro-content {
    flex-direction: column;
  }

  .testing-pyramid {
    margin-top: 30px;
  }
}
</style>
