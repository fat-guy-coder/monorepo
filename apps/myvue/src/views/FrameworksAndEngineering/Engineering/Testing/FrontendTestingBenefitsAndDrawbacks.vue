<template>
  <div class="testing-guide-container">
    <header class="guide-header">
      <h1>前端测试的利与弊</h1>
      <p>深入分析测试对开发工程量、速度和质量的影响</p>
    </header>

    <div class="content-wrapper">
      <!-- 导航 -->
      <nav class="navigation">
        <ul>
          <li v-for="section in sections" :key="section.id" @click="scrollToSection(section.id)">
            {{ section.title }}
          </li>
        </ul>
      </nav>

      <!-- 内容区域 -->
      <div class="content">
        <!-- 介绍部分 -->
        <section id="introduction" class="guide-section">
          <h2>前端测试概述</h2>
          <p>
            前端测试是确保 Web 应用质量的关键环节，包括单元测试、集成测试和端到端测试等多种形式。
            它能显著提升代码质量，但同时也带来额外的开发负担。
          </p>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <h3>质量提升</h3>
              <p>全面测试的应用减少 40-80% 的生产环境缺陷</p>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <h3>开发时间</h3>
              <p>测试通常增加 15-30% 的开发时间</p>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔄</div>
              <h3>维护成本</h3>
              <p>良好测试的应用降低 25-50% 的维护成本</p>
            </div>
          </div>
        </section>

        <!-- 测试的优势 -->
        <section id="advantages" class="guide-section">
          <h2>前端测试的优势</h2>

          <div class="aspect-section">
            <h3 class="aspect-title">🛠️ 工程量方面</h3>
            <div class="aspect-content">
              <div class="pros-cons-card pros">
                <div class="pros-cons-header">
                  <div class="icon">✅</div>
                  <h4>优势</h4>
                </div>
                <ul>
                  <li><strong>减少调试时间</strong>：测试帮助快速定位问题，减少后期调试时间</li>
                  <li>
                    <strong>降低重构风险</strong>：完善的测试用例使重构更安全，减少引入新错误的风险
                  </li>
                  <li><strong>提高团队协作</strong>：测试用例作为文档，帮助新成员理解代码功能</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="aspect-section">
            <h3 class="aspect-title">⚡ 速度方面</h3>
            <div class="aspect-content">
              <div class="pros-cons-card pros">
                <div class="pros-cons-header">
                  <div class="icon">✅</div>
                  <h4>优势</h4>
                </div>
                <ul>
                  <li><strong>快速反馈循环</strong>：自动化测试提供即时反馈，减少手动测试时间</li>
                  <li><strong>持续集成加速</strong>：测试集成到CI/CD流程中，确保每次提交的质量</li>
                  <li><strong>减少回归测试时间</strong>：自动化测试替代重复的手动回归测试</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="aspect-section">
            <h3 class="aspect-title">🏆 质量方面</h3>
            <div class="aspect-content">
              <div class="pros-cons-card pros">
                <div class="pros-cons-header">
                  <div class="icon">✅</div>
                  <h4>优势</h4>
                </div>
                <ul>
                  <li><strong>提高代码质量</strong>：编写可测试代码促进更好的设计和架构</li>
                  <li><strong>减少生产环境错误</strong>：测试捕获边缘情况，防止错误进入生产环境</li>
                  <li><strong>增强用户信心</strong>：经过充分测试的应用提供更稳定的用户体验</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 测试的挑战 -->
        <section id="challenges" class="guide-section">
          <h2>前端测试的挑战</h2>

          <div class="aspect-section">
            <h3 class="aspect-title">🛠️ 工程量方面</h3>
            <div class="aspect-content">
              <div class="pros-cons-card cons">
                <div class="pros-cons-header">
                  <div class="icon">⚠️</div>
                  <h4>挑战</h4>
                </div>
                <ul>
                  <li>
                    <strong>初始投入大</strong>：建立测试基础设施和编写初始测试用例需要大量时间
                  </li>
                  <li><strong>维护成本高</strong>：随着应用变化，测试用例需要持续更新维护</li>
                  <li><strong>学习曲线陡峭</strong>：测试框架和工具需要团队学习掌握</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="aspect-section">
            <h3 class="aspect-title">⚡ 速度方面</h3>
            <div class="aspect-content">
              <div class="pros-cons-card cons">
                <div class="pros-cons-header">
                  <div class="icon">⚠️</div>
                  <h4>挑战</h4>
                </div>
                <ul>
                  <li><strong>开发速度降低</strong>：编写测试增加开发时间，特别是短期项目</li>
                  <li><strong>测试执行时间</strong>：大型测试套件可能需要较长时间运行</li>
                  <li><strong>调试测试耗时</strong>：测试本身可能有缺陷，需要时间调试</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="aspect-section">
            <h3 class="aspect-title">🏆 质量方面</h3>
            <div class="aspect-content">
              <div class="pros-cons-card cons">
                <div class="pros-cons-header">
                  <div class="icon">⚠️</div>
                  <h4>挑战</h4>
                </div>
                <ul>
                  <li><strong>虚假安全感</strong>：测试覆盖率不等于质量，可能遗漏重要场景</li>
                  <li><strong>UI测试脆弱</strong>：前端UI测试容易因微小变化而失败</li>
                  <li><strong>难以测试视觉问题</strong>：自动化测试难以捕捉设计缺陷和视觉不一致</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 测试策略 -->
        <section id="strategy" class="guide-section">
          <h2>平衡测试的策略</h2>

          <div class="strategy-grid">
            <div class="strategy-card">
              <div class="strategy-icon">📊</div>
              <h3>测试金字塔原则</h3>
              <p>70% 单元测试<br />20% 集成测试<br />10% 端到端测试</p>
            </div>

            <div class="strategy-card">
              <div class="strategy-icon">🎯</div>
              <h3>关键路径优先</h3>
              <p>优先测试核心业务逻辑<br />和用户常用功能</p>
            </div>

            <div class="strategy-card">
              <div class="strategy-icon">🔄</div>
              <h3>渐进式测试</h3>
              <p>新功能添加测试<br />逐步补充遗留代码测试</p>
            </div>
          </div>

          <h3>推荐测试工具组合</h3>
          <div class="tools-table">
            <table>
              <thead>
                <tr>
                  <th>测试类型</th>
                  <th>推荐工具</th>
                  <th>最佳适用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>单元测试</td>
                  <td>Jest, Vitest</td>
                  <td>纯函数、工具类、组件逻辑</td>
                </tr>
                <tr>
                  <td>组件测试</td>
                  <td>Testing Library, Vue Test Utils</td>
                  <td>UI组件交互、Props验证</td>
                </tr>
                <tr>
                  <td>端到端测试</td>
                  <td>Cypress, Playwright</td>
                  <td>用户流程、跨页面交互</td>
                </tr>
                <tr>
                  <td>视觉测试</td>
                  <td>Storybook, Percy</td>
                  <td>UI一致性、跨设备渲染</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 决策指南 -->
        <section id="decision" class="guide-section">
          <h2>测试决策指南</h2>

          <div class="decision-guide">
            <div class="scenario">
              <h3>何时应该投入测试</h3>
              <ul class="checklist">
                <li>✅ 长期维护的项目</li>
                <li>✅ 核心业务逻辑复杂的应用</li>
                <li>✅ 大型团队协作开发</li>
                <li>✅ 高可用性要求的应用</li>
                <li>✅ 频繁迭代更新的产品</li>
              </ul>
            </div>

            <div class="scenario">
              <h3>何时可以简化测试</h3>
              <ul class="checklist">
                <li>⏱️ 短期原型或概念验证</li>
                <li>⏱️ 简单静态展示页面</li>
                <li>⏱️ 个人小型项目</li>
                <li>⏱️ 即将重构的遗留代码</li>
              </ul>
            </div>
          </div>

          <div class="quote-box">
            <p>
              "测试不是全有或全无的命题。聪明的团队会平衡测试投入与项目需求，在质量和速度之间找到最佳平衡点。"
            </p>
          </div>
        </section>

        <!-- 结论 -->
        <section id="conclusion" class="guide-section">
          <h2>结论</h2>
          <div class="conclusion-content">
            <p>
              前端测试是双刃剑，正确使用可以显著提升项目质量和开发效率，但不当使用会增加开发负担。
            </p>

            <div class="balance-scale">
              <div class="scale-side pros">
                <h4>测试的价值</h4>
                <ul>
                  <li>减少生产环境错误</li>
                  <li>提升长期开发效率</li>
                  <li>增强代码可维护性</li>
                  <li>提高团队协作质量</li>
                </ul>
              </div>

              <div class="scale-divider">
                <div class="scale-pointer"></div>
              </div>

              <div class="scale-side cons">
                <h4>测试的成本</h4>
                <ul>
                  <li>增加初始开发时间</li>
                  <li>需要持续维护投入</li>
                  <li>学习曲线和工具复杂性</li>
                  <li>可能产生虚假安全感</li>
                </ul>
              </div>
            </div>

            <div class="final-tip">
              <h3>最佳实践建议</h3>
              <p>
                从关键路径开始，采用渐进式测试策略，根据项目阶段和规模调整测试深度，避免教条主义地追求100%覆盖率。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航部分
const sections = ref([
  { id: 'introduction', title: '概述' },
  { id: 'advantages', title: '测试优势' },
  { id: 'challenges', title: '测试挑战' },
  { id: 'strategy', title: '测试策略' },
  { id: 'decision', title: '决策指南' },
  { id: 'conclusion', title: '结论' },
])

// 滚动到指定部分
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped lang="less">
@primary-color: #4a7bf7;
@secondary-color: #6c5ce7;
@pros-color: #2ecc71;
@cons-color: #e74c3c;
@text-color: #2d3436;
@light-bg: #f8f9fa;
@border-color: #e0e0e0;
@card-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

.testing-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: @text-color;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.guide-header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    color: lighten(@text-color, 20%);
  }
}

.content-wrapper {
  display: flex;
  gap: 2rem;
}

.navigation {
  flex: 0 0 200px;
  position: sticky;
  top: 2rem;
  height: fit-content;
  background: @light-bg;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 0.8rem 1rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;

      &:hover {
        background: lighten(@primary-color, 40%);
        color: @primary-color;
      }

      &:active {
        transform: translateY(1px);
      }
    }
  }
}

.content {
  flex: 1;
}

.guide-section {
  margin-bottom: 3rem;
  padding: 1.5rem 2rem;
  background: @light-bg;
  border-radius: 8px;
  box-shadow: @card-shadow;

  h2 {
    color: @secondary-color;
    font-size: 1.8rem;
    margin-top: 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid lighten(@secondary-color, 40%);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .stat-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
    color: lighten(@text-color, 20%);
    margin: 0;
  }
}

.aspect-section {
  margin-bottom: 2rem;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  .aspect-title {
    font-size: 1.3rem;
    color: @primary-color;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.pros-cons-card {
  border-radius: 8px;
  overflow: hidden;

  &.pros {
    border-left: 4px solid @pros-color;
  }

  &.cons {
    border-left: 4px solid @cons-color;
  }
}

.pros-cons-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .icon {
    font-size: 1.5rem;
  }

  h4 {
    margin: 0;
    font-size: 1.2rem;
  }

  .pros & {
    background: lighten(@pros-color, 45%);
    color: darken(@pros-color, 15%);
  }

  .cons & {
    background: lighten(@cons-color, 40%);
    color: darken(@cons-color, 15%);
  }
}

ul {
  padding-left: 1.5rem;
  margin: 1rem 0;

  li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
  }
}

.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.strategy-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .strategy-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0 1rem;
    color: @primary-color;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }
}

.tools-table {
  overflow-x: auto;
  margin: 1.5rem 0;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: @card-shadow;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background: lighten(@primary-color, 45%);
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
}

.decision-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.scenario {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: @card-shadow;

  h3 {
    margin-top: 0;
    color: @primary-color;
  }
}

.checklist {
  list-style: none;
  padding-left: 0;

  li {
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    background: @light-bg;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    &:before {
      content: '•';
      font-size: 1.5rem;
    }
  }
}

.quote-box {
  background: lighten(@primary-color, 48%);
  border-left: 4px solid @primary-color;
  border-radius: 0 8px 8px 0;
  padding: 1.5rem;
  margin: 2rem 0;
  font-style: italic;

  p {
    margin: 0;
    line-height: 1.6;
  }
}

.conclusion-content {
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
}

.balance-scale {
  display: flex;
  margin: 2rem 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: @card-shadow;

  .scale-side {
    flex: 1;
    padding: 1.5rem;

    &.pros {
      background: lighten(@pros-color, 48%);
    }

    &.cons {
      background: lighten(@cons-color, 40%);
    }

    h4 {
      margin-top: 0;
      text-align: center;
    }

    ul {
      padding-left: 1.2rem;
    }
  }

  .scale-divider {
    width: 2px;
    background: @border-color;
    position: relative;

    .scale-pointer {
      position: absolute;
      top: 50%;
      left: -15px;
      width: 30px;
      height: 30px;
      background: @secondary-color;
      border-radius: 50%;
      transform: translateY(-50%);
    }
  }
}

.final-tip {
  background: lighten(@secondary-color, 50%);
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid @secondary-color;

  h3 {
    margin-top: 0;
    color: @secondary-color;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .navigation {
    position: static;
    margin-bottom: 1.5rem;
  }

  .balance-scale {
    flex-direction: column;

    .scale-divider {
      width: 100%;
      height: 2px;

      .scale-pointer {
        top: -15px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
