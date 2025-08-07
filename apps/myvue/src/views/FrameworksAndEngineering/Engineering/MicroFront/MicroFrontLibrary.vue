<template>
  <div class="microfrontend-container">
    <header>
      <div class="header-content">
        <h1>微前端框架基本介绍</h1>
        <p>构建现代化企业级前端架构的核心解决方案</p>
        <div class="header-stats">
          <div class="stat">
            <div class="stat-value">70%</div>
            <div class="stat-label">大型应用采用率</div>
          </div>
          <div class="stat">
            <div class="stat-value">5+</div>
            <div class="stat-label">主流框架</div>
          </div>
          <div class="stat">
            <div class="stat-value">40%</div>
            <div class="stat-label">开发效率提升</div>
          </div>
        </div>
      </div>
      <div class="header-visual">
        <div class="architecture">
          <div class="host-app">主应用</div>
          <div class="micro-apps">
            <div v-for="(app, index) in microApps" :key="index" :class="['app', `app-${index + 1}`]">
              <span>{{ app }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content-grid">
      <!-- 微前端介绍 -->
      <section class="intro-section">
        <div class="section-header">
          <h2><i class="icon-intro"></i> 微前端概念</h2>
          <div class="divider"></div>
        </div>

        <div class="intro-content">
          <div class="definition-card">
            <h3>什么是微前端？</h3>
            <p>微前端是一种将前端应用分解为多个更小、更易于管理的部分的架构风格，允许独立开发、测试和部署各个部分，同时又能组合成一个完整的应用程序。</p>
          </div>

          <div class="benefits-grid">
            <div class="benefit">
              <div class="benefit-icon">
                <i class="icon-team"></i>
              </div>
              <h4>团队自治</h4>
              <p>不同团队独立开发部署</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">
                <i class="icon-tech"></i>
              </div>
              <h4>技术栈无关</h4>
              <p>混合使用不同技术框架</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">
                <i class="icon-deploy"></i>
              </div>
              <h4>独立部署</h4>
              <p>模块单独部署上线</p>
            </div>
            <div class="benefit">
              <div class="benefit-icon">
                <i class="icon-scale"></i>
              </div>
              <h4>渐进升级</h4>
              <p>逐步替换遗留系统</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 框架详情 -->
      <section class="frameworks-section">
        <div class="section-header">
          <h2><i class="icon-framework"></i> 主流微前端框架</h2>
          <div class="divider"></div>
        </div>

        <div class="framework-tabs">
          <div class="tab-header">
            <button v-for="(framework, index) in frameworks" :key="index" :class="{ active: activeFramework === index }"
              @click="activeFramework = index">
              <i :class="framework.icon"></i>
              {{ framework.name }}
              <span class="rating">
                <i class="icon-star" v-for="star in 5" :key="star"></i>
                <span class="rating-value">{{ framework.rating }}/5</span>
              </span>
            </button>
          </div>

          <div class="tab-content">
            <div v-if="activeFramework !== null" class="framework-details">
              <div class="framework-header">
                <div class="framework-icon">
                  <i :class="frameworks[activeFramework].icon"></i>
                </div>
                <div class="framework-info">
                  <h3>{{ frameworks[activeFramework].name }}</h3>
                  <div class="meta">
                    <span>最新版本: {{ frameworks[activeFramework].version }}</span>
                    <span>GitHub Stars: {{ frameworks[activeFramework].stars }}</span>
                    <span>推荐指数:
                      <span class="rating-stars">
                        <i class="icon-star" v-for="star in frameworks[activeFramework].rating" :key="star"></i>
                        <i class="icon-star-o" v-for="star in (5 - frameworks[activeFramework].rating)"
                          :key="'empty' + star"></i>
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div class="framework-content">
                <div class="description">
                  <h4>框架介绍</h4>
                  <p>{{ frameworks[activeFramework].description }}</p>
                </div>

                <div class="implementation">
                  <h4>实现技术</h4>
                  <div class="tech-tags">
                    <span v-for="(tech, idx) in frameworks[activeFramework].technologies" :key="idx">{{ tech }}</span>
                  </div>
                </div>

                <div class="use-cases">
                  <h4>使用场景</h4>
                  <ul>
                    <li v-for="(scenario, idx) in frameworks[activeFramework].useCases" :key="idx">{{ scenario }}</li>
                  </ul>
                </div>

                <div class="pros-cons">
                  <div class="pros">
                    <h4>优点</h4>
                    <ul>
                      <li v-for="(pro, idx) in frameworks[activeFramework].pros" :key="'pro' + idx">
                        <i class="icon-check"></i> {{ pro }}
                      </li>
                    </ul>
                  </div>

                  <div class="cons">
                    <h4>缺点</h4>
                    <ul>
                      <li v-for="(con, idx) in frameworks[activeFramework].cons" :key="'con' + idx">
                        <i class="icon-warning"></i> {{ con }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="code-sample">
                  <h4>代码示例</h4>
                  <pre><code>{{ frameworks[activeFramework].code }}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 框架对比 -->
      <section class="comparison-section">
        <div class="section-header">
          <h2><i class="icon-comparison"></i> 框架对比</h2>
          <div class="divider"></div>
        </div>

        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>框架</th>
                <th>技术核心</th>
                <th>上手难度</th>
                <th>样式隔离</th>
                <th>JS隔离</th>
                <th>预加载</th>
                <th>推荐指数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(framework, index) in frameworks" :key="index">
                <td>
                  <i :class="framework.icon"></i>
                  {{ framework.name }}
                </td>
                <td>{{ framework.coreTech }}</td>
                <td>
                  <div class="difficulty">
                    <div class="level" :style="{ width: framework.difficulty * 20 + '%' }"></div>
                    <span>{{ ['简单', '中等', '较难', '复杂'][framework.difficulty - 1] }}</span>
                  </div>
                </td>
                <td>
                  <span v-if="framework.cssIsolation" class="success">✓</span>
                  <span v-else class="error">✗</span>
                </td>
                <td>
                  <span v-if="framework.jsIsolation" class="success">✓</span>
                  <span v-else class="error">✗</span>
                </td>
                <td>
                  <span v-if="framework.preload" class="success">✓</span>
                  <span v-else class="error">✗</span>
                </td>
                <td>
                  <span class="rating-stars">
                    <i class="icon-star" v-for="star in framework.rating" :key="star"></i>
                    <i class="icon-star-o" v-for="star in (5 - framework.rating)" :key="'empty' + star"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="selection-guide">
          <h3>框架选择指南</h3>
          <div class="guide-grid">
            <div class="guide-item">
              <div class="guide-icon">
                <i class="icon-enterprise"></i>
              </div>
              <h4>大型企业应用</h4>
              <p>推荐: qiankun, Module Federation</p>
              <p>理由: 完善的功能和社区支持</p>
            </div>

            <div class="guide-item">
              <div class="guide-icon">
                <i class="icon-legacy"></i>
              </div>
              <h4>遗留系统现代化</h4>
              <p>推荐: single-spa, micro-app</p>
              <p>理由: 渐进式迁移能力</p>
            </div>

            <div class="guide-item">
              <div class="guide-icon">
                <i class="icon-lightweight"></i>
              </div>
              <h4>轻量级应用</h4>
              <p>推荐: micro-app, Piral</p>
              <p>理由: 简单易用，低侵入性</p>
            </div>

            <div class="guide-item">
              <div class="guide-icon">
                <i class="icon-webpack"></i>
              </div>
              <h4>Webpack项目</h4>
              <p>推荐: Module Federation</p>
              <p>理由: 原生集成，性能优异</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <div class="footer-content">
        <div class="footer-summary">
          <h3>微前端实施建议</h3>
          <p>微前端不是银弹，适合大型复杂应用。实施前需评估团队结构、技术栈和项目规模，选择合适框架并建立共享组件库和设计系统。</p>
        </div>

        <div class="footer-links">
          <a href="#">实施指南</a>
          <a href="#">性能优化</a>
          <a href="#">最佳实践</a>
          <a href="#">案例研究</a>
        </div>
      </div>

      <div class="footer-copyright">
        <p>© 2023 前端架构实验室 | 微前端技术指南 v2.0</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeFramework = ref(1); // 默认选择qiankun

const microApps = ref(['产品管理', '订单系统', '用户中心', '数据分析']);

const frameworks = ref([
  {
    name: "single-spa",
    version: "5.9.4",
    stars: "12.5k",
    icon: "icon-single-spa",
    rating: 4,
    difficulty: 3, // 1-4
    coreTech: "应用生命周期管理",
    cssIsolation: false,
    jsIsolation: false,
    preload: false,
    description: "single-spa是一个用于前端微服务化的JavaScript框架，它将多个单页面应用聚合为一个整体应用。它主要负责应用的生命周期管理（加载、初始化、挂载、卸载），但不处理样式隔离、JS隔离等具体问题，需要开发者自行实现或配合其他库使用。",
    technologies: ["应用生命周期管理", "路由集成", "独立部署"],
    useCases: [
      "渐进式迁移遗留系统",
      "多团队协作的大型应用",
      "混合不同框架的项目"
    ],
    pros: [
      "框架无关性强",
      "轻量级核心（仅2KB）",
      "灵活度高，可定制性强",
      "社区活跃，生态系统丰富"
    ],
    cons: [
      "需要自行解决样式/JS隔离",
      "配置复杂，学习曲线陡峭",
      "缺乏开箱即用的解决方案",
      "文档不够友好"
    ],
    code: `// 注册应用
singleSpa.registerApplication({
  name: 'app1',
  app: () => import('src/app1/main.js'),
  activeWhen: '/app1'
});

// 启动single-spa
singleSpa.start();`
  },
  {
    name: "qiankun",
    version: "2.8.6",
    stars: "14.3k",
    icon: "icon-qiankun",
    rating: 5,
    difficulty: 2,
    coreTech: "基于single-spa的封装",
    cssIsolation: true,
    jsIsolation: true,
    preload: true,
    description: "qiankun 是阿里开源的微前端框架，基于 single-spa 封装，提供了更完整的微前端解决方案。它解决了 single-spa 的主要痛点，如样式隔离、JS 沙箱、资源预加载等，并提供了开箱即用的功能，大大降低了微前端的实施门槛。",
    technologies: ["JS沙箱", "样式隔离", "资源预加载", "应用通信"],
    useCases: [
      "企业级大型应用",
      "需要强隔离的金融系统",
      "多团队协作项目",
      "渐进式重构遗留系统"
    ],
    pros: [
      "开箱即用的完整解决方案",
      "完善的样式和JS隔离机制",
      "支持多种前端框架",
      "丰富的功能和API",
      "活跃的中文社区支持"
    ],
    cons: [
      "包体积相对较大（~50KB）",
      "某些场景下通信机制复杂",
      "对Web Components支持不够完善",
      "文档以中文为主"
    ],
    code: `// 主应用注册微应用
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:7100',
    container: '#subapp-container',
    activeRule: '/react',
    props: { /* 传递数据 */ }
  }
]);

// 启动qiankun
start();`
  },
  {
    name: "micro-app",
    version: "1.0.0",
    stars: "4.2k",
    icon: "icon-micro-app",
    rating: 4,
    difficulty: 1,
    coreTech: "Web Components",
    cssIsolation: true,
    jsIsolation: true,
    preload: true,
    description: "micro-app 是京东开源的微前端框架，基于 Web Components 实现。它采用组件化的思维实现微前端，将子应用封装成 Web Component，然后像普通组件一样使用。这种设计使得集成更加简单，无需修改子应用的打包配置。",
    technologies: ["Web Components", "Custom Elements", "Shadow DOM"],
    useCases: [
      "快速集成现有应用",
      "需要简单易用的解决方案",
      "组件化微前端架构",
      "低侵入性改造项目"
    ],
    pros: [
      "使用简单，学习成本低",
      "零依赖，轻量级（~10KB）",
      "基于Web标准，未来兼容性好",
      "无需修改子应用配置",
      "样式隔离效果优秀"
    ],
    cons: [
      "社区和生态相对较小",
      "复杂场景支持不够完善",
      "通信机制相对简单",
      "文档和案例较少"
    ],
    code: `// 主应用中使用
import microApp from '@micro-zoe/micro-app'

// 初始化
microApp.start()

// 使用微应用
<micro-app
  name="app1"
  url="http://localhost:3000/"
  baseroute="/app1"
></micro-app>`
  },
  {
    name: "Module Federation",
    version: "Webpack 5+",
    stars: "-",
    icon: "icon-module-federation",
    rating: 4,
    difficulty: 3,
    coreTech: "Webpack运行时模块共享",
    cssIsolation: false,
    jsIsolation: false,
    preload: true,
    description: "Webpack 5 的 Module Federation 功能允许在运行时动态加载远程模块，实现微前端架构。它不是专门的微前端框架，而是提供了构建微前端应用的基础能力。通过模块联邦，应用可以共享依赖、按需加载远程模块，实现应用间的解耦和独立部署。",
    technologies: ["Webpack模块联邦", "动态模块加载", "共享依赖"],
    useCases: [
      "Webpack项目微前端化",
      "应用间共享组件和工具库",
      "需要高性能的微前端方案",
      "模块化程度高的项目"
    ],
    pros: [
      "原生Webpack支持，性能优异",
      "真正的按需加载和依赖共享",
      "减少重复代码，优化包体积",
      "支持跨应用热更新",
      "无额外框架依赖"
    ],
    cons: [
      "仅限于Webpack项目",
      "需要统一依赖版本管理",
      "样式隔离需要自行处理",
      "配置相对复杂",
      "通信机制需要自行实现"
    ],
    code: `// 配置远程应用
// webpack.config.js (远程应用)
new ModuleFederationPlugin({
  name: 'remoteApp',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
  }
});

// 配置主应用
new ModuleFederationPlugin({
  name: 'hostApp',
  remotes: {
    remoteApp: 'remoteApp@http://remote-domain.com/remoteEntry.js'
  }
});`
  },
  {
    name: "Piral",
    version: "1.5.0",
    stars: "1.8k",
    icon: "icon-piral",
    rating: 3,
    difficulty: 3,
    coreTech: "模块化应用壳",
    cssIsolation: true,
    jsIsolation: true,
    preload: true,
    description: "Piral 是一个基于 React 的微前端框架，采用应用壳（App Shell）架构。它提供了一个中央门户应用（Pilet Host）和多个独立模块（Pilet），这些模块可以独立开发、测试和部署。Piral 提供了丰富的工具链和插件系统，适合企业级应用开发。",
    technologies: ["React应用壳", "插件系统", "模块化架构"],
    useCases: [
      "大型企业门户应用",
      "需要丰富工具链的项目",
      "React技术栈为主的应用",
      "需要强类型支持的项目"
    ],
    pros: [
      "完善的开发工具链",
      "强大的类型支持（TypeScript）",
      "丰富的插件生态系统",
      "内置状态管理和扩展机制",
      "优秀的开发者体验"
    ],
    cons: [
      "主要面向React技术栈",
      "学习曲线较陡峭",
      "社区规模较小",
      "配置相对复杂",
      "文档不够完善"
    ],
    code: `// 创建Pilet（微应用）
import * as React from 'react';
import { PiletApi } from 'sample-piral';

export function setup(app: PiletApi) {
  // 注册页面
  app.registerPage('/sample', () => (
    <div>
      <h1>Sample Page</h1>
      <p>Welcome to this pilet!</p>
    </div>
  ));
}`
  }
]);
</script>

<style lang="less" scoped>


// 颜色变量
@primary-color: #4361ee;
@secondary-color: #3f37c9;
@accent-color: #4cc9f0;
@success-color: #2a9d8f;
@warning-color: #f8961e;
@error-color: #e63946;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-dark: #212529;
@text-light: #6c757d;
@border-color: #dee2e6;
@code-bg: #f1f3f5;

// 混合
.box-shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

.border-radius {
  border-radius: 10px;
}

.transition {
  transition: all 0.3s ease;
}

// 基础样式
.microfrontend-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: @light-bg;
  color: @text-dark;
  line-height: 1.6;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;

  header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #f0f4ff, #e6f7ff);
    .border-radius();
    .box-shadow();

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    .header-content {
      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: @primary-color;
        margin-bottom: 10px;
      }

      p {
        font-size: 1.2rem;
        color: @text-light;
        margin-bottom: 30px;
      }

      .header-stats {
        display: flex;
        gap: 20px;

        .stat {
          text-align: center;
          padding: 15px;
          background: rgba(255, 255, 255, 0.7);
          .border-radius();
          .box-shadow();

          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: @primary-color;
          }

          .stat-label {
            font-size: 0.9rem;
            color: @text-light;
          }
        }
      }
    }

    .header-visual {
      display: flex;
      align-items: center;
      justify-content: center;

      .architecture {
        width: 100%;
        max-width: 400px;
        height: 300px;
        position: relative;

        .host-app {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 80px;
          background: lighten(@primary-color, 35%);
          border: 2px solid @primary-color;
          .border-radius();
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: darken(@primary-color, 15%);
          z-index: 2;
        }

        .micro-apps {
          position: absolute;
          top: 100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          width: 100%;

          .app {
            height: 80px;
            background: white;
            .box-shadow();
            .border-radius();
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid @border-color;
            position: relative;
            overflow: hidden;
            .transition();

            &:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 4px;
            }

            span {
              font-weight: 500;
              z-index: 1;
            }
          }

          .app-1:before {
            background: @accent-color;
          }

          .app-2:before {
            background: @success-color;
          }

          .app-3:before {
            background: @warning-color;
          }

          .app-4:before {
            background: #f72585;
          }

          .app:hover {
            transform: translateY(-5px);
          }
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .section-header {
    margin-bottom: 25px;
    display: flex;
    align-items: center;

    h2 {
      font-size: 1.6rem;
      font-weight: 700;
      color: @text-dark;
      display: flex;
      align-items: center;

      i {
        margin-right: 12px;
        font-size: 1.8rem;
        color: @primary-color;
      }
    }

    .divider {
      flex-grow: 1;
      height: 2px;
      background: linear-gradient(90deg, @primary-color, transparent);
      margin-left: 20px;
    }
  }

  // 介绍部分
  .intro-section {
    .intro-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }

      .definition-card {
        background: @card-bg;
        .box-shadow();
        .border-radius();
        padding: 30px;
        border-top: 4px solid @primary-color;

        h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: @primary-color;
        }

        p {
          color: @text-light;
          line-height: 1.7;
        }
      }

      .benefits-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;

        .benefit {
          background: @card-bg;
          .box-shadow();
          .border-radius();
          padding: 20px;
          text-align: center;
          .transition();

          &:hover {
            transform: translateY(-5px);
          }

          .benefit-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: lighten(@primary-color, 45%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;

            i {
              font-size: 1.8rem;
              color: @primary-color;
            }
          }

          h4 {
            font-size: 1.1rem;
            margin-bottom: 8px;
          }

          p {
            color: @text-light;
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  // 框架部分
  .frameworks-section {
    .framework-tabs {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      overflow: hidden;

      .tab-header {
        display: flex;
        flex-wrap: wrap;
        background: @light-bg;
        border-bottom: 1px solid @border-color;

        button {
          padding: 15px 25px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          color: @text-light;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          .transition();
          position: relative;

          i {
            font-size: 1.3rem;
            margin-right: 10px;
          }

          .rating {
            margin-left: 10px;
            position: relative;

            .icon-star {
              font-size: 0.8rem;
              color: #ccc;
            }

            .rating-value {
              position: absolute;
              top: -10px;
              right: -5px;
              font-size: 0.7rem;
              background: @primary-color;
              color: white;
              padding: 2px 6px;
              border-radius: 10px;
            }
          }

          &:hover {
            background: rgba(@primary-color, 0.05);
            color: @primary-color;

            .icon-star {
              color: #ffc107;
            }
          }

          &.active {
            border-bottom: 3px solid @primary-color;
            color: @primary-color;
            font-weight: 600;
            background: rgba(@primary-color, 0.1);

            .rating .icon-star {
              color: #ffc107;
            }
          }
        }
      }

      .tab-content {
        padding: 30px;

        .framework-details {
          .framework-header {
            display: flex;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid @border-color;

            .framework-icon {
              width: 80px;
              height: 80px;
              border-radius: 16px;
              background: lighten(@primary-color, 40%);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 20px;

              i {
                font-size: 2.5rem;
                color: @primary-color;
              }
            }

            .framework-info {
              h3 {
                font-size: 1.8rem;
                margin-bottom: 10px;
                color: @text-dark;
              }

              .meta {
                display: flex;
                gap: 20px;
                color: @text-light;
                font-size: 0.9rem;

                .rating-stars {
                  .icon-star {
                    color: #ffc107;
                    font-size: 0.9rem;
                  }

                  .icon-star-o {
                    color: #ddd;
                    font-size: 0.9rem;
                  }
                }
              }
            }
          }

          .framework-content {
            >div {
              margin-bottom: 25px;
            }

            h4 {
              font-size: 1.2rem;
              margin-bottom: 15px;
              color: @secondary-color;
              padding-bottom: 8px;
              border-bottom: 1px solid @border-color;
            }

            .tech-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;

              span {
                background: lighten(@primary-color, 45%);
                color: @primary-color;
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 500;
              }
            }

            ul {
              padding-left: 20px;

              li {
                margin-bottom: 10px;
                position: relative;
                padding-left: 25px;

                &:before {
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 8px;
                  width: 12px;
                  height: 12px;
                  background: @primary-color;
                  border-radius: 50%;
                }

                i {
                  margin-right: 8px;
                }
              }
            }

            .pros-cons {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;

              @media (max-width: 768px) {
                grid-template-columns: 1fr;
              }

              .pros,
              .cons {
                padding: 20px;
                border-radius: 8px;
              }

              .pros {
                background: lighten(@success-color, 50%);
                border: 1px solid fade(@success-color, 30%);

                ul li:before {
                  background: @success-color;
                }
              }

              .cons {
                background: lighten(@warning-color, 45%);
                border: 1px solid fade(@warning-color, 30%);

                ul li:before {
                  background: @warning-color;
                }
              }
            }

            .code-sample {
              pre {
                background: @code-bg;
                padding: 20px;
                border-radius: 8px;
                overflow-x: auto;
                border-left: 3px solid @primary-color;

                code {
                  font-family: 'Fira Code', monospace;
                  font-size: 0.9rem;
                  line-height: 1.6;
                }
              }
            }
          }
        }
      }
    }
  }

  // 对比部分
  .comparison-section {
    .comparison-table {
      background: @card-bg;
      .box-shadow();
      .border-radius();
      padding: 25px;
      margin-bottom: 40px;
      overflow-x: auto;

      table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid @border-color;
        }

        thead {
          background: @primary-color;
          color: white;

          th {
            font-weight: 600;
          }
        }

        tbody tr:nth-child(even) {
          background: @light-bg;
        }

        tbody tr:hover {
          background: lighten(@primary-color, 45%);
        }

        .difficulty {
          position: relative;
          height: 6px;
          background: #eee;
          border-radius: 3px;
          overflow: hidden;

          .level {
            height: 100%;
            background: @primary-color;
            border-radius: 3px;
          }

          span {
            position: absolute;
            top: -25px;
            left: 0;
            font-size: 0.85rem;
          }
        }

        .success {
          color: @success-color;
          font-weight: bold;
        }

        .error {
          color: @error-color;
          font-weight: bold;
        }

        .rating-stars {
          .icon-star {
            color: #ffc107;
            font-size: 0.9rem;
          }

          .icon-star-o {
            color: #ddd;
            font-size: 0.9rem;
          }
        }
      }
    }

    .selection-guide {
      .guide-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;

        .guide-item {
          background: @card-bg;
          .box-shadow();
          .border-radius();
          padding: 25px;
          text-align: center;
          border-top: 4px solid @primary-color;
          .transition();

          &:hover {
            transform: translateY(-5px);
          }

          .guide-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: lighten(@primary-color, 40%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;

            i {
              font-size: 1.8rem;
              color: @primary-color;
            }
          }

          h4 {
            font-size: 1.2rem;
            margin-bottom: 10px;
          }

          p {
            color: @text-light;
            font-size: 0.95rem;
            margin-bottom: 5px;

            &:last-child {
              margin-bottom: 0;
              color: @secondary-color;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  // 页脚样式
  footer {
    margin-top: 50px;
    padding-top: 30px;
    border-top: 1px solid @border-color;

    .footer-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 30px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .footer-summary {
        h3 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: @primary-color;
        }

        p {
          color: @text-light;
          line-height: 1.7;
        }
      }

      .footer-links {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        align-items: center;
        justify-content: flex-end;

        @media (max-width: 768px) {
          justify-content: flex-start;
        }

        a {
          padding: 10px 20px;
          background: lighten(@primary-color, 40%);
          color: @primary-color;
          border-radius: 30px;
          font-weight: 500;
          text-decoration: none;
          .transition();

          &:hover {
            background: @primary-color;
            color: white;
          }
        }
      }
    }

    .footer-copyright {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid @border-color;
      color: @text-light;
      font-size: 0.9rem;
    }
  }
}

// 图标字体
@font-face {
  font-family: 'mf-icons';
  src: url('data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAf0AAsAAAAADFQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIFDGNtYXAAAAFoAAAAVAAAAFQXVtGJZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAqAAAAKgzQc2C2hlYWQAAARgAAAANgAAADYD5wOzaGhlYQAABJQAAAAkAAAAJAdCA4dobXR4AAAEvAAAABQAAAAUCAQAAGxvY2EAAATQAAAAEAAAABAB4gGcbWF4cAAABOAAAAAgAAAAIAETAChuYW1lAAAE4AAAAXkAAAF5ChzBxXBvc3QAAAY4AAAAIAAAACAAAwAAAAMD7AGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QMDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkD//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAQAAAAEAAAAAAAAAAAAA') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
  font-family: 'mf-icons' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-intro:before {
  content: "\e900";
}

.icon-team:before {
  content: "\e901";
}

.icon-tech:before {
  content: "\e902";
}

.icon-deploy:before {
  content: "\e903";
}

.icon-scale:before {
  content: "\e904";
}

.icon-framework:before {
  content: "\e905";
}

.icon-single-spa:before {
  content: "\e906";
}

.icon-qiankun:before {
  content: "\e907";
}

.icon-micro-app:before {
  content: "\e908";
}

.icon-module-federation:before {
  content: "\e909";
}

.icon-piral:before {
  content: "\e90a";
}

.icon-comparison:before {
  content: "\e90b";
}

.icon-star:before {
  content: "\e90c";
}

.icon-star-o:before {
  content: "\e90d";
}

.icon-check:before {
  content: "\e90e";
}

.icon-warning:before {
  content: "\e90f";
}

.icon-enterprise:before {
  content: "\e910";
}

.icon-legacy:before {
  content: "\e911";
}

.icon-lightweight:before {
  content: "\e912";
}

.icon-webpack:before {
  content: "\e913";
}
</style>
