<template>
  <div class="angular-container">
    <div class="angular-header">
      <div class="angular-logo">
        <div class="logo-shield">A</div>
        <div class="logo-text">ngular</div>
      </div>
      <div class="header-content">
        <h1>Angular 框架基本介绍</h1>
        <p class="subtitle">企业级前端开发的首选解决方案</p>
        <p><a href="https://angular.cn" target="_blank">官方文档</a></p>
      </div>
    </div>

    <div class="angular-content">
      <!-- 来历部分 -->
      <div class="section history">
        <div class="section-header">
          <div class="section-icon">📜</div>
          <h2>框架来历</h2>
        </div>
        <div class="section-content">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-date">2009</div>
              <div class="timeline-content">
                <h3>AngularJS诞生</h3>
                <p>Google工程师Miško Hevery创建了AngularJS（1.x版本），引入了双向数据绑定和依赖注入等创新概念</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2016</div>
              <div class="timeline-content">
                <h3>Angular 2发布</h3>
                <p>完全重写框架，采用TypeScript，引入组件化架构，性能大幅提升</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-date">2017-今</div>
              <div class="timeline-content">
                <h3>持续演进</h3>
                <p>每半年发布一个新版本，目前最新稳定版本为Angular 17+</p>
                <div class="version-chip">v17.3.0</div>
              </div>
            </div>
          </div>

          <div class="key-points">
            <div class="key-point">
              <div class="point-icon">🏢</div>
              <h3>Google主导开发</h3>
              <p>由Google工程师团队维护，背靠强大技术资源</p>
            </div>
            <div class="key-point">
              <div class="point-icon">♻️</div>
              <h3>完整重写</h3>
              <p>Angular 2+是完全不同于AngularJS的新框架</p>
            </div>
            <div class="key-point">
              <div class="point-icon">🧩</div>
              <h3>组件化架构</h3>
              <p>基于组件的设计思想，提高代码复用性</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 学习难度部分 -->
      <div class="section difficulty">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h2>学习难度</h2>
        </div>
        <div class="section-content">
          <div class="difficulty-meter">
            <div class="meter-labels">
              <span>简单</span>
              <span>中等</span>
              <span>困难</span>
            </div>
            <div class="meter-bar">
              <div class="meter-fill" style="width: 80%"></div>
            </div>
            <div class="meter-value">高级难度</div>
          </div>

          <div class="learning-aspects">
            <div class="aspect-card">
              <div class="aspect-icon">📘</div>
              <h3>概念复杂度</h3>
              <div class="complexity-bar">
                <div class="complexity-fill" style="width: 90%"></div>
              </div>
              <p>模块、组件、服务、依赖注入、RxJS等概念需要系统学习</p>
            </div>
            <div class="aspect-card">
              <div class="aspect-icon">⚙️</div>
              <h3>配置复杂度</h3>
              <div class="complexity-bar">
                <div class="complexity-fill" style="width: 75%"></div>
              </div>
              <p>CLI简化了配置，但Webpack、TypeScript等底层配置较复杂</p>
            </div>
            <div class="aspect-card">
              <div class="aspect-icon">📐</div>
              <h3>学习曲线</h3>
              <div class="complexity-bar">
                <div class="complexity-fill" style="width: 85%"></div>
              </div>
              <p>初期陡峭，掌握后开发效率高，适合长期项目</p>
            </div>
          </div>

          <div class="learning-tips">
            <h3>学习建议</h3>
            <ul>
              <li>先掌握TypeScript基础</li>
              <li>从官方文档和教程入手</li>
              <li>理解依赖注入和RxJS核心概念</li>
              <li>使用Angular CLI工具</li>
              <li>练习组件通信和状态管理</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 热度和使用情况 -->
      <div class="section popularity">
        <div class="section-header">
          <div class="section-icon">📊</div>
          <h2>热度与国内使用情况</h2>
        </div>
        <div class="section-content">
          <div class="popularity-grid">
            <div class="popularity-card">
              <div class="popularity-icon">🌐</div>
              <h3>全球使用率</h3>
              <div class="popularity-value">22.9%</div>
              <p>2023年专业开发者使用率</p>
            </div>
            <div class="popularity-card">
              <div class="popularity-icon">🇨🇳</div>
              <h3>国内使用率</h3>
              <div class="popularity-value">18.3%</div>
              <p>大型企业和金融领域占比较高</p>
            </div>
            <div class="popularity-card">
              <div class="popularity-icon">📈</div>
              <h3>趋势变化</h3>
              <div class="trend-indicator up">+7%</div>
              <p>企业级应用需求增长</p>
            </div>
          </div>

          <div class="usage-by-company">
            <h3>国内使用Angular的企业</h3>
            <div class="company-logos">
              <div class="company-logo">阿里巴巴</div>
              <div class="company-logo">腾讯</div>
              <div class="company-logo">华为</div>
              <div class="company-logo">中国银行</div>
              <div class="company-logo">招商银行</div>
              <div class="company-logo">小米</div>
            </div>
          </div>

          <div class="popularity-comparison">
            <h3>三大框架比较 (2024)</h3>
            <div class="comparison-bars">
              <div class="comparison-bar">
                <div class="bar-label">React</div>
                <div class="bar-container">
                  <div class="bar-fill react" style="width: 42%">42%</div>
                </div>
              </div>
              <div class="comparison-bar">
                <div class="bar-label">Vue</div>
                <div class="bar-container">
                  <div class="bar-fill vue" style="width: 21%">21%</div>
                </div>
              </div>
              <div class="comparison-bar">
                <div class="bar-label">Angular</div>
                <div class="bar-container">
                  <div class="bar-fill angular" style="width: 23%">23%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 生态系统 -->
      <div class="section ecosystem">
        <div class="section-header">
          <div class="section-icon">🌱</div>
          <h2>生态系统</h2>
        </div>
        <div class="section-content">
          <div class="ecosystem-grid">
            <div class="ecosystem-card">
              <div class="ecosystem-icon">🛠️</div>
              <h3>核心工具</h3>
              <ul>
                <li>Angular CLI</li>
                <li>RxJS</li>
                <li>Zone.js</li>
                <li>Angular Material</li>
              </ul>
            </div>
            <div class="ecosystem-card">
              <div class="ecosystem-icon">🧩</div>
              <h3>状态管理</h3>
              <ul>
                <li>NgRx</li>
                <li>Akita</li>
                <li>NGXS</li>
                <li>RxAngular</li>
              </ul>
            </div>
            <div class="ecosystem-card">
              <div class="ecosystem-icon">📚</div>
              <h3>UI框架</h3>
              <ul>
                <li>Angular Material</li>
                <li>PrimeNG</li>
                <li>NG-ZORRO</li>
                <li>Clarity</li>
              </ul>
            </div>
            <div class="ecosystem-card">
              <div class="ecosystem-icon">🔌</div>
              <h3>服务器渲染</h3>
              <ul>
                <li>Angular Universal</li>
                <li>Scully (静态站点)</li>
                <li>NestJS (后端)</li>
              </ul>
            </div>
          </div>

          <div class="community-stats">
            <div class="stat-card">
              <div class="stat-value">2.7M+</div>
              <div class="stat-label">GitHub Stars</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">31K+</div>
              <div class="stat-label">npm 周下载量</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">1.2K+</div>
              <div class="stat-label">官方库贡献者</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">200+</div>
              <div class="stat-label">官方认证合作伙伴</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 性能 -->
      <div class="section performance">
        <div class="section-header">
          <div class="section-icon">⚡</div>
          <h2>性能特点</h2>
        </div>
        <div class="section-content">
          <div class="performance-grid">
            <div class="perf-card">
              <div class="perf-icon">🚀</div>
              <h3>变更检测</h3>
              <p>Zone.js驱动的自动变更检测机制，优化后性能提升显著</p>
            </div>
            <div class="perf-card">
              <div class="perf-icon">📦</div>
              <h3>AOT编译</h3>
              <p>提前编译(Ahead-of-Time)减小包体积，提升运行时性能</p>
            </div>
            <div class="perf-card">
              <div class="perf-icon">🌐</div>
              <h3>服务端渲染</h3>
              <p>Angular Universal提升首屏加载速度和SEO</p>
            </div>
          </div>

          <div class="performance-stats">
            <div class="perf-stat">
              <h3>包大小比较 (Hello World)</h3>
              <div class="size-comparison">
                <div class="size-bar">
                  <div class="size-label">Angular</div>
                  <div class="size-value">150KB</div>
                  <div class="size-visual" style="width: 75%"></div>
                </div>
                <div class="size-bar">
                  <div class="size-label">React</div>
                  <div class="size-value">45KB</div>
                  <div class="size-visual" style="width: 22%"></div>
                </div>
                <div class="size-bar">
                  <div class="size-label">Vue</div>
                  <div class="size-value">30KB</div>
                  <div class="size-visual" style="width: 15%"></div>
                </div>
              </div>
            </div>

            <div class="perf-stat">
              <h3>Lighthouse 性能评分</h3>
              <div class="score-cards">
                <div class="score-card">
                  <div class="score-value">92</div>
                  <div class="score-label">小型应用</div>
                </div>
                <div class="score-card">
                  <div class="score-value">85</div>
                  <div class="score-label">中型应用</div>
                </div>
                <div class="score-card">
                  <div class="score-value">78</div>
                  <div class="score-label">大型企业应用</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用场景 -->
      <div class="section use-cases">
        <div class="section-header">
          <div class="section-icon">🏢</div>
          <h2>适用场景</h2>
        </div>
        <div class="section-content">
          <div class="case-grid">
            <div class="case-card">
              <div class="case-icon">🏦</div>
              <h3>企业级应用</h3>
              <p>大型后台管理系统、CRM、ERP系统</p>
            </div>
            <div class="case-card">
              <div class="case-icon">📱</div>
              <h3>跨平台应用</h3>
              <p>使用Ionic或NativeScript开发移动应用</p>
            </div>
            <div class="case-card">
              <div class="case-icon">🛒</div>
              <h3>电子商务</h3>
              <p>复杂的产品目录和购物流程</p>
            </div>
            <div class="case-card">
              <div class="case-icon">📊</div>
              <h3>数据看板</h3>
              <p>实时数据监控和可视化展示</p>
            </div>
            <div class="case-card">
              <div class="case-icon">🧪</div>
              <h3>内部工具</h3>
              <p>公司内部使用的复杂工具系统</p>
            </div>
            <div class="case-card">
              <div class="case-icon">🚫</div>
              <h3>不适用场景</h3>
              <p>小型项目、简单页面、轻量级应用</p>
            </div>
          </div>

          <div class="case-study">
            <h3>典型案例分析</h3>
            <div class="study-card">
              <div class="study-logo">Gmail</div>
              <div class="study-content">
                <h4>Google Workspace</h4>
                <p>Angular用于构建Gmail、Google Docs等复杂Web应用，处理大量实时数据和用户交互</p>
                <div class="study-stats">
                  <div class="stat">2亿+ 用户</div>
                  <div class="stat">100+ 组件</div>
                  <div class="stat">毫秒级响应</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="angular-footer">
      <p>Angular - 由Google维护的企业级Web框架</p>
      <p>© 2024 前端框架分析报告 | 数据来源：State of JS 2023, npm trends</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 可以添加交互逻辑
import { ref } from 'vue';

// 示例：切换学习难度详情
const showDifficultyDetails = ref(false);
</script>

<style lang="less" scoped>
@primary-color: #dd0031;
@secondary-color: #1976d2;
@accent-color: #4CAF50;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@border-color: #e0e0e0;
@text-color: #2c3e50;
@light-text: #7f8c8d;
@code-bg: #f5f5f5;
@code-border: #e0e0e0;
@angular-gradient: linear-gradient(135deg, @primary-color, @secondary-color);

.angular-container {
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: @light-bg;
  color: @text-color;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  line-height: 1.6;
}

.angular-header {
  background: @angular-gradient;
  color: white;
  border-radius: 0 0 20px 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 6px 20px rgba(221, 0, 49, 0.15);

  .angular-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .logo-shield {
      background: white;
      color: @primary-color;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: bold;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .logo-text {
      font-size: 2.2rem;
      font-weight: 700;
    }
  }

  .header-content {
    h1 {
      margin: 0;
      font-size: 2.2rem;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-top: 0.5rem;
      font-weight: 300;
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  margin-bottom: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem 1.5rem;
    background: rgba(@secondary-color, 0.05);
    border-bottom: 1px solid @border-color;

    .section-icon {
      font-size: 1.5rem;
      color: @primary-color;
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      color: @text-color;
    }
  }

  .section-content {
    padding: 1.5rem;
  }
}

// 历史部分
.history {
  .timeline {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 2rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: @secondary-color;
      border-radius: 2px;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
      padding-left: 1.5rem;

      &::before {
        content: '';
        position: absolute;
        left: -8px;
        top: 0;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: @primary-color;
        border: 3px solid white;
        box-shadow: 0 0 0 2px @primary-color;
      }

      .timeline-date {
        font-weight: 600;
        color: @primary-color;
        margin-bottom: 0.5rem;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0.5rem 0;
      }

      .version-chip {
        display: inline-block;
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }

  .key-points {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;

    .key-point {
      background: rgba(@secondary-color, 0.03);
      border: 1px solid @border-color;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .point-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.8rem;
        font-size: 1.2rem;
        color: @text-color;
      }

      p {
        margin: 0;
        color: @light-text;
        font-size: 0.95rem;
      }
    }
  }
}

// 学习难度部分
.difficulty {
  .difficulty-meter {
    margin-bottom: 2rem;

    .meter-labels {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      color: @light-text;
      font-size: 0.9rem;
    }

    .meter-bar {
      height: 20px;
      background: #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      position: relative;

      .meter-fill {
        height: 100%;
        background: @primary-color;
        border-radius: 10px;
      }
    }

    .meter-value {
      text-align: center;
      margin-top: 0.5rem;
      font-weight: 600;
      color: @primary-color;
    }
  }

  .learning-aspects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;

    .aspect-card {
      background: rgba(@secondary-color, 0.03);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid @border-color;

      .aspect-icon {
        font-size: 2rem;
        color: @primary-color;
        margin-bottom: 1rem;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.8rem;
      }

      .complexity-bar {
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        margin-bottom: 1rem;

        .complexity-fill {
          height: 100%;
          background: @primary-color;
          border-radius: 4px;
        }
      }

      p {
        margin: 0;
        color: @light-text;
        font-size: 0.95rem;
      }
    }
  }

  .learning-tips {
    background: rgba(@accent-color, 0.05);
    border-radius: 12px;
    padding: 1.5rem;
    border-left: 4px solid @accent-color;

    h3 {
      margin-top: 0;
      color: @accent-color;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0;

      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
    }
  }
}

// 热度和使用情况
.popularity {
  .popularity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;

    .popularity-card {
      background: @card-bg;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      border: 1px solid @border-color;

      .popularity-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }

      .popularity-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0;
        color: @light-text;
        font-size: 0.9rem;
      }

      .trend-indicator {
        font-weight: 700;
        font-size: 1.3rem;

        &.up {
          color: @accent-color;
        }
      }
    }
  }

  .usage-by-company {
    margin-bottom: 1.5rem;

    h3 {
      text-align: center;
      margin-bottom: 1rem;
      color: @text-color;
    }

    .company-logos {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;

      .company-logo {
        background: rgba(@secondary-color, 0.08);
        border: 1px solid rgba(@secondary-color, 0.2);
        border-radius: 8px;
        padding: 0.5rem 1.5rem;
        font-weight: 500;
      }
    }
  }

  .popularity-comparison {
    h3 {
      text-align: center;
      margin-bottom: 1rem;
    }

    .comparison-bars {
      .comparison-bar {
        margin-bottom: 1rem;

        .bar-label {
          font-weight: 500;
          margin-bottom: 0.3rem;
        }

        .bar-container {
          height: 30px;
          background: #e0e0e0;
          border-radius: 15px;
          overflow: hidden;
          position: relative;

          .bar-fill {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 1rem;
            font-weight: 600;
            color: white;

            &.react {
              background: #61dafb;
            }

            &.vue {
              background: #42b883;
            }

            &.angular {
              background: @primary-color;
            }
          }
        }
      }
    }
  }
}

// 生态系统
.ecosystem {
  .ecosystem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;

    .ecosystem-card {
      background: rgba(@secondary-color, 0.03);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid @border-color;

      .ecosystem-icon {
        font-size: 2rem;
        color: @primary-color;
        margin-bottom: 1rem;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 1rem;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;

        li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
      }
    }
  }

  .community-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;

    .stat-card {
      background: rgba(@primary-color, 0.05);
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      border: 1px solid rgba(@primary-color, 0.1);

      .stat-value {
        font-size: 1.8rem;
        font-weight: 700;
        color: @primary-color;
      }

      .stat-label {
        font-size: 0.95rem;
        color: @light-text;
      }
    }
  }
}

// 性能部分
.performance {
  .performance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;

    .perf-card {
      background: rgba(@accent-color, 0.05);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(@accent-color, 0.1);
      text-align: center;

      .perf-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.8rem;
      }

      p {
        margin: 0;
        color: @light-text;
        font-size: 0.95rem;
      }
    }
  }

  .performance-stats {
    .perf-stat {
      margin-bottom: 2rem;

      h3 {
        text-align: center;
        margin-bottom: 1rem;
      }

      .size-comparison {
        .size-bar {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;

          .size-label {
            width: 100px;
            font-weight: 500;
          }

          .size-value {
            width: 70px;
            text-align: right;
            padding-right: 1rem;
            font-weight: 500;
          }

          .size-visual {
            height: 20px;
            background: @primary-color;
            border-radius: 10px;
          }
        }
      }

      .score-cards {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;

        .score-card {
          background: rgba(@accent-color, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          min-width: 120px;

          .score-value {
            font-size: 2rem;
            font-weight: 700;
            color: @accent-color;
          }

          .score-label {
            font-size: 0.95rem;
            color: @light-text;
          }
        }
      }
    }
  }
}

// 使用场景
.use-cases {
  .case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
    margin-bottom: 1.5rem;

    .case-card {
      background: rgba(@secondary-color, 0.05);
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      border: 1px solid rgba(@secondary-color, 0.1);
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .case-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: @primary-color;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
      }

      p {
        margin: 0;
        color: @light-text;
        font-size: 0.9rem;
      }
    }
  }

  .case-study {
    .study-card {
      background: rgba(@primary-color, 0.03);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      border: 1px solid rgba(@primary-color, 0.1);

      .study-logo {
        background: @primary-color;
        color: white;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        flex-shrink: 0;
      }

      .study-content {
        h4 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: @primary-color;
        }

        p {
          margin: 0.5rem 0;
          color: @light-text;
        }

        .study-stats {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;

          .stat {
            background: rgba(@primary-color, 0.1);
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

.angular-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  color: @light-text;
  font-size: 0.95rem;
  border-top: 1px solid @border-color;

  p {
    margin: 0.3rem 0;
  }
}

@media (max-width: 768px) {
  .angular-header {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
    gap: 1rem;

    .angular-logo {
      .logo-shield {
        width: 50px;
        height: 50px;
        font-size: 2rem;
      }

      .logo-text {
        font-size: 1.8rem;
      }
    }

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }

  .section-header h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .popularity-comparison .comparison-bar .bar-container {
    height: 22px;

    .bar-fill {
      font-size: 0.8rem;
      padding-right: 0.5rem;
    }
  }

  .case-study .study-card {
    flex-direction: column;
    text-align: center;

    .study-stats {
      justify-content: center;
    }
  }
}
</style>
