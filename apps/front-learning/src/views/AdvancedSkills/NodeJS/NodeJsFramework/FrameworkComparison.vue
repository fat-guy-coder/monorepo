<template>
  <div class="framework-comparison">
    <header class="header">
      <h1>Node.js 框架对比指南</h1>
      <p>Express、Koa 和 NestJS 的全面比较</p>
      <div class="badges">
        <span class="badge badge-express">Express</span>
        <span class="badge badge-koa">Koa</span>
        <span class="badge badge-nest">NestJS</span>
      </div>
    </header>

    <div class="intro-section">
      <div class="intro-card">
        <h2>三大 Node.js 框架概览</h2>
        <p>在 Node.js 生态系统中，Express、Koa 和 NestJS 是最受欢迎的 Web 框架。它们各有特点，适用于不同的场景。</p>

        <div class="framework-icons">
          <div class="icon-card">
            <div class="icon express">
              <span>E</span>
            </div>
            <h3>Express</h3>
            <p>Node.js 最老牌的框架</p>
          </div>

          <div class="icon-card">
            <div class="icon koa">
              <span>K</span>
            </div>
            <h3>Koa</h3>
            <p>Express 原班人马打造</p>
          </div>

          <div class="icon-card">
            <div class="icon nest">
              <span>N</span>
            </div>
            <h3>NestJS</h3>
            <p>企业级 TypeScript 框架</p>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-header">
        <i class="fas fa-graduation-cap"></i>
        <h2>学习曲线对比</h2>
      </div>

      <div class="learning-curve">
        <div class="curve-item">
          <div class="curve-header express">
            <h3>Express</h3>
            <div class="difficulty easy">简单</div>
          </div>
          <div class="curve-content">
            <ul>
              <li>最简单的入门框架</li>
              <li>基于中间件的设计易于理解</li>
              <li>海量教程和示例代码</li>
              <li>不需要理解高级 JavaScript 概念</li>
              <li>非强制约束，自由度高</li>
            </ul>
          </div>
        </div>

        <div class="curve-item">
          <div class="curve-header koa">
            <h3>Koa</h3>
            <div class="difficulty medium">中等</div>
          </div>
          <div class="curve-content">
            <ul>
              <li>需要理解 async/await 和 Promise</li>
              <li>基于生成器函数的设计</li>
              <li>中间件处理方式与 Express 不同</li>
              <li>更少的自带功能，需要自行组合</li>
              <li>文档和社区资源相对较少</li>
            </ul>
          </div>
        </div>

        <div class="curve-item">
          <div class="curve-header nest">
            <h3>NestJS</h3>
            <div class="difficulty hard">复杂</div>
          </div>
          <div class="curve-content">
            <ul>
              <li>需要熟悉 TypeScript 和装饰器</li>
              <li>理解 Angular 风格的架构</li>
              <li>掌握依赖注入和控制反转概念</li>
              <li>模块化设计需要一定的学习成本</li>
              <li>需要理解面向对象编程原则</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-header">
        <i class="fas fa-plug"></i>
        <h2>生态系统对比</h2>
      </div>

      <div class="ecosystem">
        <div class="metric-grid">
          <div class="metric-card">
            <h3>中间件数量</h3>
            <div class="metric-bar">
              <div class="bar express" style="width: 100%">
                <span>Express: 100%</span>
              </div>
              <div class="bar koa" style="width: 70%">
                <span>Koa: 70%</span>
              </div>
              <div class="bar nest" style="width: 85%">
                <span>NestJS: 85%</span>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <h3>社区活跃度</h3>
            <div class="metric-bar">
              <div class="bar express" style="width: 100%">
                <span>Express: 100%</span>
              </div>
              <div class="bar koa" style="width: 45%">
                <span>Koa: 45%</span>
              </div>
              <div class="bar nest" style="width: 75%">
                <span>NestJS: 75%</span>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <h3>文档质量</h3>
            <div class="metric-bar">
              <div class="bar express" style="width: 90%">
                <span>Express: 90%</span>
              </div>
              <div class="bar koa" style="width: 75%">
                <span>Koa: 75%</span>
              </div>
              <div class="bar nest" style="width: 95%">
                <span>NestJS: 95%</span>
              </div>
            </div>
          </div>

          <div class="metric-card">
            <h3>集成工具</h3>
            <div class="metric-bar">
              <div class="bar express" style="width: 95%">
                <span>Express: 95%</span>
              </div>
              <div class="bar koa" style="width: 65%">
                <span>Koa: 65%</span>
              </div>
              <div class="bar nest" style="width: 100%">
                <span>NestJS: 100%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="ecosystem-details">
          <div class="detail-card">
            <div class="card-header express">
              <h3>Express 生态</h3>
            </div>
            <div class="card-body">
              <ul>
                <li>庞大的中间件生态系统（body-parser, cors, morgan等）</li>
                <li>与几乎所有Node.js库兼容</li>
                <li>10年+的社区支持</li>
                <li>大量教程和Stack Overflow解答</li>
                <li>企业级支持（IBM, Uber等）</li>
              </ul>
            </div>
          </div>

          <div class="detail-card">
            <div class="card-header koa">
              <h3>Koa 生态</h3>
            </div>
            <div class="card-body">
              <ul>
                <li>中间件较少但更现代化</li>
                <li>许多Express中间件有Koa版本</li>
                <li>较小的核心团队维护</li>
                <li>在大型项目中应用较少</li>
                <li>社区规模较小但更专业</li>
              </ul>
            </div>
          </div>

          <div class="detail-card">
            <div class="card-header nest">
              <h3>NestJS 生态</h3>
            </div>
            <div class="card-body">
              <ul>
                <li>官方维护的丰富模块（@nestjs/typeorm, @nestjs/graphql等）</li>
                <li>集成了TypeORM、Mongoose、Passport等流行库</li>
                <li>强大的CLI工具</li>
                <li>活跃的Discord社区</li>
                <li>企业级支持（Adidas, Roche等）</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-header">
        <i class="fas fa-tachometer-alt"></i>
        <h2>性能对比</h2>
      </div>

      <div class="performance">
        <div class="performance-chart">
          <div class="chart-header">
            <div class="chart-title">每秒请求处理数 (RPS)</div>
            <div class="chart-subtitle">基准测试: Node.js 18, 4核CPU, 8GB内存</div>
          </div>
          <div class="chart-bars">
            <div class="bar express" style="height: 70%">
              <div class="bar-value">8,900</div>
              <div class="bar-label">Express</div>
            </div>
            <div class="bar koa" style="height: 85%">
              <div class="bar-value">10,700</div>
              <div class="bar-label">Koa</div>
            </div>
            <div class="bar nest" style="height: 65%">
              <div class="bar-value">7,800</div>
              <div class="bar-label">NestJS</div>
            </div>
          </div>
        </div>

        <div class="performance-details">
          <div class="detail">
            <h3>Express 性能特点</h3>
            <ul>
              <li>成熟的性能优化方案</li>
              <li>中间件层数影响性能</li>
              <li>回调地狱可能影响性能</li>
              <li>良好的集群支持</li>
              <li>实际性能接近原生Node.js</li>
            </ul>
          </div>

          <div class="detail">
            <h3>Koa 性能特点</h3>
            <ul>
              <li>更轻量级，无内置中间件</li>
              <li>基于生成器的异步流程控制</li>
              <li>更少的抽象层，更接近Node.js核心</li>
              <li>更快的错误处理机制</li>
              <li>在相同硬件上通常优于Express</li>
            </ul>
          </div>

          <div class="detail">
            <h3>NestJS 性能特点</h3>
            <ul>
              <li>抽象层带来轻微性能开销</li>
              <li>优秀的优化后性能</li>
              <li>支持Fastify适配器提升性能</li>
              <li>依赖注入容器有启动开销</li>
              <li>适合需要长期维护的大型应用</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <div class="section-header">
        <i class="fas fa-lightbulb"></i>
        <h2>框架选择指南</h2>
      </div>

      <div class="recommendation">
        <div class="scenario-card">
          <div class="card-header express">
            <h3>选择 Express 当...</h3>
          </div>
          <div class="card-body">
            <ul>
              <li>你需要快速开发小型项目或API</li>
              <li>你希望利用庞大的中间件生态系统</li>
              <li>项目团队熟悉回调风格的编程</li>
              <li>你需要大量社区资源支持</li>
              <li>项目需要尽快上线</li>
            </ul>
          </div>
        </div>

        <div class="scenario-card">
          <div class="card-header koa">
            <h3>选择 Koa 当...</h3>
          </div>
          <div class="card-body">
            <ul>
              <li>你希望使用更现代的异步处理方式</li>
              <li>你需要更高的性能和更简洁的代码</li>
              <li>项目不需要大量第三方中间件</li>
              <li>你希望避免回调地狱</li>
              <li>团队熟悉ES6+特性</li>
            </ul>
          </div>
        </div>

        <div class="scenario-card">
          <div class="card-header nest">
            <h3>选择 NestJS 当...</h3>
          </div>
          <div class="card-body">
            <ul>
              <li>你正在构建大型企业级应用</li>
              <li>项目需要严格的架构规范</li>
              <li>你希望使用TypeScript和面向对象设计</li>
              <li>项目需要高度可测试性和可维护性</li>
              <li>团队有Angular或Java Spring背景</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-table">
      <h2>三大框架核心特性对比</h2>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>Express</th>
            <th>Koa</th>
            <th>NestJS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>创建年份</td>
            <td>2010</td>
            <td>2013</td>
            <td>2017</td>
          </tr>
          <tr>
            <td>编程范式</td>
            <td>中间件/回调</td>
            <td>中间件/生成器</td>
            <td>面向对象/函数式</td>
          </tr>
          <tr>
            <td>异步处理</td>
            <td>回调函数</td>
            <td>Async/Await</td>
            <td>RxJS/Async/Await</td>
          </tr>
          <tr>
            <td>内置中间件</td>
            <td>无</td>
            <td>无</td>
            <td>丰富（HTTP、WebSocket等）</td>
          </tr>
          <tr>
            <td>TypeScript支持</td>
            <td>社区支持</td>
            <td>社区支持</td>
            <td>原生支持</td>
          </tr>
          <tr>
            <td>依赖注入</td>
            <td>无</td>
            <td>无</td>
            <td>原生支持</td>
          </tr>
          <tr>
            <td>学习曲线</td>
            <td>简单</td>
            <td>中等</td>
            <td>陡峭</td>
          </tr>
          <tr>
            <td>适用项目规模</td>
            <td>小型到中型</td>
            <td>小型到中型</td>
            <td>中型到大型</td>
          </tr>
          <tr>
            <td>GitHub星标数</td>
            <td>61k+</td>
            <td>34k+</td>
            <td>58k+</td>
          </tr>
        </tbody>
      </table>
    </div>

    <footer class="footer">
      <p> Node.js 框架对比指南 | Express、Koa 和 NestJS 的全面比较</p>
      <p>本页面使用 Vue3、TypeScript、Setup 语法、LESS 和 Scoped 样式构建</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 此组件为静态展示组件，无需响应式数据
// 这里仅为了展示setup语法和TypeScript的使用
const expressVersion = ref('4.18.2');
const koaVersion = ref('2.14.1');
const nestVersion = ref('9.0.0');
</script>

<style lang="less" scoped>


.framework-comparison {
   max-width: 1200px;
   margin: 0 auto;
   background: linear-gradient(135deg, #f8f9fa 0%, #eef2f6 100%);
   color: #2c3e50;
   min-height: 100vh;
   padding: 20px;

  .header {
    text-align: center;
    padding: 30px 0;
    margin-bottom: 30px;
    border-bottom: 2px solid #4d5bf9;

    h1 {
      font-size: 2.5rem;
      color: #4263eb;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.2rem;
      color: #495057;
      max-width: 800px;
      margin: 0 auto;
    }

    .badges {
      margin-top: 15px;
    }

    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: bold;
      margin: 0 8px;
    }

    .badge-express {
      background: #68a063;
      color: white;
    }

    .badge-koa {
      background: #d97706;
      color: white;
    }

    .badge-nest {
      background: #e11d48;
      color: white;
    }
  }

  .intro-section {
    max-width: 1200px;
    margin: 0 auto 40px;

    .intro-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      padding: 30px;

      h2 {
        color: #4263eb;
        text-align: center;
        margin-bottom: 20px;
      }

      p {
        text-align: center;
        max-width: 800px;
        margin: 0 auto 30px;
        color: #495057;
        line-height: 1.7;
      }
    }

    .framework-icons {
      display: flex;
      justify-content: center;
      gap: 40px;
      flex-wrap: wrap;

      .icon-card {
        text-align: center;

        .icon {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 15px;
          font-size: 3rem;
          font-weight: bold;
          color: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

          &.express {
            background: #68a063;
          }

          &.koa {
            background: #d97706;
          }

          &.nest {
            background: #e11d48;
          }
        }

        h3 {
          color: #2c3e50;
          margin-bottom: 5px;
        }

        p {
          color: #6c757d;
          font-size: 0.95rem;
        }
      }
    }
  }

  .comparison-section {
    max-width: 1200px;
    margin: 0 auto 40px;

    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e9ecef;

      i {
        font-size: 1.8rem;
        color: #4263eb;
        margin-right: 15px;
      }

      h2 {
        color: #4263eb;
        font-size: 1.8rem;
      }
    }
  }

  .learning-curve {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .curve-item {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }
    }

    .curve-header {
      padding: 20px;
      color: white;

      h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      .difficulty {
        display: inline-block;
        padding: 5px 12px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 0.9rem;
      }

      &.express {
        background: #68a063;

        .difficulty {
          background: #2b8a3e;
        }
      }

      &.koa {
        background: #d97706;

        .difficulty {
          background: #b45309;
        }
      }

      &.nest {
        background: #e11d48;

        .difficulty {
          background: #be123c;
        }
      }
    }

    .curve-content {
      padding: 20px;

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        padding: 10px 0;
        border-bottom: 1px solid #e9ecef;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .ecosystem {
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .metric-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      h3 {
        margin-bottom: 15px;
        color: #4263eb;
      }
    }

    .metric-bar {
      height: 30px;
      background: #e9ecef;
      border-radius: 15px;

      position: relative;

      .bar {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        font-weight: bold;
        color: white;
        font-size: 0.8rem;

        &.express {
          background: #68a063;
          z-index: 3;
        }

        &.koa {
          background: #d97706;
          z-index: 2;
        }

        &.nest {
          background: #e11d48;
          z-index: 1;
        }
      }
    }

    .ecosystem-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }

    .detail-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;

      .card-header {
        padding: 20px;
        color: white;

        h3 {
          font-size: 1.3rem;
        }

        &.express {
          background: #68a063;
        }

        &.koa {
          background: #d97706;
        }

        &.nest {
          background: #e11d48;
        }
      }

      .card-body {
        padding: 20px;

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          padding: 10px 0;
          border-bottom: 1px solid #e9ecef;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  .performance {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .performance-chart {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

      .chart-header {
        margin-bottom: 20px;

        .chart-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #4263eb;
        }

        .chart-subtitle {
          font-size: 0.9rem;
          color: #6c757d;
        }
      }

      .chart-bars {
        display: flex;
        height: 300px;
        align-items: flex-end;
        gap: 30px;
        padding: 0 20px;

        .bar {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;

          .bar-value {
            position: absolute;
            top: -30px;
            font-weight: bold;
          }

          .bar-label {
            padding: 10px 0;
            font-weight: bold;
          }

          &.express {
            background: #68a063;
          }

          &.koa {
            background: #d97706;
          }

          &.nest {
            background: #e11d48;
          }
        }
      }
    }

    .performance-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;

      .detail {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);

        h3 {
          color: #4263eb;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e9ecef;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          padding: 8px 0;
          border-bottom: 1px solid #f1f3f5;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  .recommendation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;

    .scenario-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .card-header {
        padding: 20px;
        color: white;

        h3 {
          font-size: 1.3rem;
        }

        &.express {
          background: #68a063;
        }

        &.koa {
          background: #d97706;
        }

        &.nest {
          background: #e11d48;
        }
      }

      .card-body {
        padding: 20px;

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          padding: 10px 0;
          border-bottom: 1px solid #e9ecef;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  .comparison-table {
    max-width: 1200px;
    margin: 40px auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    padding: 30px;
    overflow-x: auto;

    h2 {
      text-align: center;
      color: #4263eb;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #e9ecef;
      }

      th {
        background: #f8f9fa;
        font-weight: bold;
        color: #4263eb;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tr:hover {
        background: #f8f9fa;
      }

      td:nth-child(2) {
        color: #68a063;
        font-weight: 500;
      }

      td:nth-child(3) {
        color: #d97706;
        font-weight: 500;
      }

      td:nth-child(4) {
        color: #e11d48;
        font-weight: 500;
      }
    }
  }

  .footer {
    text-align: center;
    padding: 30px 0;
    color: #495057;
    font-size: 0.9rem;
    border-top: 1px solid #e9ecef;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .header h1 {
      font-size: 2rem;
    }

    .framework-icons {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
