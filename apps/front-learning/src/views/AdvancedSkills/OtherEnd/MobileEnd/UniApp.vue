<template>
  <div class="unipp-container">
    <header class="header">
      <div class="logo-wrapper">
        <div class="unipp-logo">Uni</div>
        <h1>UniApp 跨平台开发框架</h1>
      </div>
      <p class="subtitle">一套代码，多端运行</p>
    </header>

    <section class="intro-section">
      <div class="intro-content">
        <h2>什么是 UniApp？</h2>
        <p>UniApp 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到 iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/字节跳动/QQ/钉钉/淘宝）、快应用等多个平台。</p>

        <div class="platforms">
          <div v-for="platform in platforms" :key="platform.name" class="platform-card">
            <div class="platform-icon" :style="{ backgroundColor: platform.color }">
              <i :class="platform.icon"></i>
            </div>
            <div class="platform-name">{{ platform.name }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="content-grid">
      <section class="feature-section">
        <h2 class="section-title">
          <span class="icon">🚀</span>
          核心特性
        </h2>

        <div class="features">
          <div class="feature-card">
            <div class="feature-icon" style="background-color: #4e6ef2;">
              <i class="icon-code"></i>
            </div>
            <h3>跨平台开发</h3>
            <p>一次开发，可同时生成 iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、字节跳动小程序、QQ 小程序、快应用等多个平台的应用。</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon" style="background-color: #07c160;">
              <i class="icon-vue"></i>
            </div>
            <h3>基于 Vue.js</h3>
            <p>采用 Vue.js 作为开发框架，支持 Vue 语法和 Vuex 状态管理，学习成本低，上手快，生态丰富。</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon" style="background-color: #ff976a;">
              <i class="icon-performance"></i>
            </div>
            <h3>高性能</h3>
            <p>通过优化运行时性能、减少包体积、原生渲染等方式，接近原生应用的性能体验。</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon" style="background-color: #1989fa;">
              <i class="icon-components"></i>
            </div>
            <h3>组件生态</h3>
            <p>提供丰富的跨平台 UI 组件和 API，涵盖界面、导航、媒体、文件、网络等各方面功能。</p>
          </div>
        </div>
      </section>

      <section class="usage-section">
        <h2 class="section-title">
          <span class="icon">💻</span>
          快速上手
        </h2>

        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>安装开发环境</h3>
              <pre><code class="language-bash"># 安装 Vue CLI
npm install -g @vue/cli

# 创建 UniApp 项目
vue create -p dcloudio/uni-preset-vue my-project</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>创建简单页面</h3>
              <pre><code class="language-html">&lt;template&gt;
  &lt;view class="content"&gt;
    &lt;image class="logo" src="/static/logo.png"&gt;&lt;/image&gt;
    &lt;text class="title"&gt;你好 UniApp!&lt;/text&gt;
    &lt;button @click="counter++"&gt;点击计数: {{ counter }}&lt;/button&gt;
  &lt;/view&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';

const counter = ref(0);
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>运行项目</h3>
              <pre><code class="language-bash"># 运行到 H5
npm run dev:h5

# 运行到微信小程序
npm run dev:mp-weixin

# 运行到支付宝小程序
npm run dev:mp-alipay

# 运行到 App
npm run dev:app</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="scenarios-section">
      <h2 class="section-title">
        <span class="icon">📍</span>
        适用场景
      </h2>

      <div class="scenarios">
        <div class="scenario-card">
          <div class="scenario-icon" style="background-color: #7232dd;">
            <i class="icon-apps"></i>
          </div>
          <h3>跨平台应用开发</h3>
          <p>需要同时发布到多个平台（小程序 + H5 + App）的项目，最大化代码复用率。</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon" style="background-color: #19be6b;">
            <i class="icon-speed"></i>
          </div>
          <h3>快速原型开发</h3>
          <p>使用熟悉的 Vue 技术栈快速开发 MVP 产品，验证业务模式。</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon" style="background-color: #ff9900;">
            <i class="icon-team"></i>
          </div>
          <h3>小型开发团队</h3>
          <p>资源有限的小团队可以快速覆盖多端，降低开发成本。</p>
        </div>

        <div class="scenario-card">
          <div class="scenario-icon" style="background-color: #2b85e4;">
            <i class="icon-upgrade"></i>
          </div>
          <h3>小程序转原生 App</h3>
          <p>将已有小程序项目快速迁移到原生 App，共享业务逻辑。</p>
        </div>
      </div>
    </section>

    <section class="pros-cons-section">
      <h2 class="section-title">
        <span class="icon">⚖️</span>
        优势与局限性
      </h2>

      <div class="comparison">
        <div class="pros">
          <h3>优势</h3>
          <ul>
            <li>
              <strong>高效开发</strong>
              <p>一套代码多端运行，大幅减少开发成本和维护成本</p>
            </li>
            <li>
              <strong>学习曲线平缓</strong>
              <p>基于 Vue.js，前端开发者容易上手</p>
            </li>
            <li>
              <strong>生态丰富</strong>
              <p>插件市场提供大量组件和扩展，加速开发进程</p>
            </li>
            <li>
              <strong>性能优化</strong>
              <p>通过条件编译、原生渲染等技术优化多端性能</p>
            </li>
            <li>
              <strong>多端统一</strong>
              <p>统一 API、组件、样式，减少平台差异处理</p>
            </li>
          </ul>
        </div>

        <div class="cons">
          <h3>局限性</h3>
          <ul>
            <li>
              <strong>性能瓶颈</strong>
              <p>复杂动画或高性能要求的场景不如原生应用</p>
            </li>
            <li>
              <strong>平台差异</strong>
              <p>某些平台特有功能仍需要条件编译或平台特定代码</p>
            </li>
            <li>
              <strong>插件质量参差</strong>
              <p>插件市场质量不一，需要仔细筛选</p>
            </li>
            <li>
              <strong>学习新概念</strong>
              <p>需要学习 UniApp 特有的 API 和组件</p>
            </li>
            <li>
              <strong>包体积限制</strong>
              <p>小程序平台有严格的包体积限制</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="resources-section">
      <h2 class="section-title">
        <span class="icon">📚</span>
        学习资源
      </h2>

      <div class="resources">
        <a href="https://uniapp.dcloud.net.cn/" target="_blank" class="resource-card">
          <div class="resource-icon">
            <i class="icon-docs"></i>
          </div>
          <h3>官方文档</h3>
          <p>全面、详细的 UniApp 开发指南</p>
        </a>

        <a href="https://hellouniapp.dcloud.net.cn/" target="_blank" class="resource-card">
          <div class="resource-icon">
            <i class="icon-examples"></i>
          </div>
          <h3>示例项目</h3>
          <p>官方示例项目，快速上手</p>
        </a>

        <a href="https://ext.dcloud.net.cn/" target="_blank" class="resource-card">
          <div class="resource-icon">
            <i class="icon-plugins"></i>
          </div>
          <h3>插件市场</h3>
          <p>丰富的插件和组件库</p>
        </a>

        <a href="https://ask.dcloud.net.cn/explore/" target="_blank" class="resource-card">
          <div class="resource-icon">
            <i class="icon-community"></i>
          </div>
          <h3>社区论坛</h3>
          <p>开发者交流与问题解答</p>
        </a>
      </div>
    </section>

    <footer class="footer">
      <p>UniApp 为多端开发提供了高效解决方案，适合需要兼顾小程序和 App 的业务场景</p>
      <p>在项目选型前，需根据具体需求权衡其优势与局限性</p>
      <div class="links">
        <a href="https://uniapp.dcloud.net.cn/" target="_blank" class="link-button">访问 UniApp 官网</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 支持的平台数据
const platforms = ref([
  { name: '微信小程序', icon: 'icon-wechat', color: '#07c160' },
  { name: '支付宝小程序', icon: 'icon-alipay', color: '#1677ff' },
  { name: 'H5 网站', icon: 'icon-h5', color: '#4e6ef2' },
  { name: 'iOS App', icon: 'icon-apple', color: '#000000' },
  { name: 'Android App', icon: 'icon-android', color: '#3ddc84' },
  { name: '百度小程序', icon: 'icon-baidu', color: '#2932e1' },
  { name: '字节小程序', icon: 'icon-douyin', color: '#000000' },
  { name: 'QQ 小程序', icon: 'icon-qq', color: '#12b7f5' },
  { name: '快应用', icon: 'icon-quickapp', color: '#f5222d' },
]);
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'UniApp Icons';
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALgAA4AAAAABxQAAAKRAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GYACCUhEICoJIgncLgzwAATYCJAOHMAQgBYR4B4V4G4QdG1FVi2QjErYXJdijYQd5dR62tXqQxN9/28gYH/UwIgwKxwHYdWzXjFk5ISQq0lZ//yQhQRQ0B0WZg7Y5fY4IPQkQqK3qSZJQlGk9bZv0IuG0SiGfXl2JhSx9UQKNSzLeYx51jYrF9V9J+Bb3mZvUJZv9HZQHvR1x4Qk8Ue3GAnQyQqH/SQC6sCkfFbXkG4rZ1Tv6WvA4nmvz1I2c1kU5PiVlB3PXM9pYfT1b1tL4LdFv3GjqqtcR4sKtbB7pK0JcK3dTdZf1v1J5SQP8Iamx8F0CwRgRYsYAIEgSFSkXHXe+fO6uL8ywj5vDf0BfSg4Lg9Jtq8TpJgKpRhQChv2O3Y3uL3uElpRCRxw5JZxr6uQZ7Qn9yiBzN6K6QH3UL9wX1BHqB2pSf0KfCwQKkQoOggKjCKqUaZx6kKd7Jd9E8mGWoQ6Z4X1n4f4SqE4zrXf8lO3L6wl9d5iNnLQ4kXJdDqZ9E1PcjlC3C1qg7K/TIhHq8QP3BQv3AQr3AQr1eQv3BQv2/Qv3DQv2+hPqChfo8Q/1eQv2/Qv3BQv2/Qv2/Qv2/Qp3BQn1eQr1eQr1eQr1eQr1eQn1eQr1eQv2/Qv3BQv2/Qv3BQv2/Qv3BQv2/Qv3BQr1eQr1eQr1eQr1eQr1eQr1eQr1eQv2/Qv3BQv2/Qv3BQv2/Qv3BQv2/Qv3BQr1eQr1eQr1eQr1eQr1eQr1eQr1eQv2/Qv3BQv2/Qv2/Qv3BQv2/Qv3BQv2/Qv3BQr1eQr1eQr1eQr1eQr1eQr1eQr1eQv2/Qv3BQv2/Qv3BQv2/Qv3BQv2/Qv3BQr1eQr1eQr1eQr1eQr1eQr1eQr1eQv2/Qv3BQv2/Qv3BQv2/Qv3BQv2/Qv3BQr1eQr1eQr1eQr1eQr1eQhcAAAA=') format('woff2');
}

.icon {
  font-family: 'UniApp Icons' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-wechat:before { content: "\e600"; }
.icon-alipay:before { content: "\e601"; }
.icon-h5:before { content: "\e602"; }
.icon-apple:before { content: "\e603"; }
.icon-android:before { content: "\e604"; }
.icon-baidu:before { content: "\e605"; }
.icon-douyin:before { content: "\e606"; }
.icon-qq:before { content: "\e607"; }
.icon-quickapp:before { content: "\e608"; }
.icon-code:before { content: "\e609"; }
.icon-vue:before { content: "\e610"; }
.icon-performance:before { content: "\e611"; }
.icon-components:before { content: "\e612"; }
.icon-apps:before { content: "\e613"; }
.icon-speed:before { content: "\e614"; }
.icon-team:before { content: "\e615"; }
.icon-upgrade:before { content: "\e616"; }
.icon-docs:before { content: "\e617"; }
.icon-examples:before { content: "\e618"; }
.icon-plugins:before { content: "\e619"; }
.icon-community:before { content: "\e620"; }

.unipp-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f8fafc;

  .header {
    text-align: center;
    margin-bottom: 3rem;

    .logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1rem;

      .unipp-logo {
        font-size: 2.5rem;
        font-weight: 800;
        padding: 0.5rem 1.5rem;
        background: linear-gradient(135deg, #4e6ef2 0%, #2b85e4 100%);
        color: white;
        border-radius: 12px;
        box-shadow: 0 4px 10px rgba(78, 110, 242, 0.3);
      }

      h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #2c3e50;
        margin: 0;
      }
    }

    .subtitle {
      font-size: 1.25rem;
      color: #7f8c8d;
      font-weight: 400;
    }
  }

  .intro-section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);

    h2 {
      font-size: 1.8rem;
      color: #2c3e50;
      margin-top: 0;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      color: #475569;
      margin-bottom: 2rem;
      text-align: center;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }

    .platforms {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.2rem;
      max-width: 900px;
      margin: 0 auto;

      .platform-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 120px;

        .platform-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.8rem;

          i {
            font-size: 2rem;
            color: white;
          }
        }

        .platform-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: #475569;
          text-align: center;
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2.5rem;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .section-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .feature-section {
    margin-bottom: 2rem;

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .feature-card {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;

          i {
            font-size: 1.8rem;
            color: white;
          }
        }

        h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        p {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      }
    }
  }

  .usage-section {
    .steps {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      .step {
        display: flex;
        gap: 1.2rem;

        .step-number {
          min-width: 36px;
          height: 36px;
          background: #4e6ef2;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          margin-top: 0.5rem;
        }

        .step-content {
          flex: 1;

          h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin-top: 0;
            margin-bottom: 0.8rem;
          }

          pre {
            background: #2d3748;
            border-radius: 8px;
            padding: 1.2rem;
            overflow-x: auto;
            margin: 0;

            code {
              font-family: 'Fira Code', monospace;
              font-size: 0.9rem;
              color: #e2e8f0;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }

  .scenarios-section {
    margin-bottom: 2.5rem;

    .scenarios {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .scenario-card {
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .scenario-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;

          i {
            font-size: 1.8rem;
            color: white;
          }
        }

        h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.8rem;
        }

        p {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      }
    }
  }

  .pros-cons-section {
    margin-bottom: 2.5rem;

    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .pros, .cons {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);

        h3 {
          font-size: 1.4rem;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 1.2rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid;
        }
      }

      .pros {
        h3 { border-color: #4e6ef2; }

        ul li {
          border-left: 3px solid #4e6ef2;
        }
      }

      .cons {
        h3 { border-color: #ff976a; }

        ul li {
          border-left: 3px solid #ff976a;
        }
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 1rem 1rem 1rem 1.2rem;
          margin-bottom: 1rem;
          background: #f8fafc;
          border-radius: 0 8px 8px 0;

          strong {
            display: block;
            font-size: 1.1rem;
            color: #2c3e50;
            margin-bottom: 0.3rem;
          }

          p {
            margin: 0;
            color: #64748b;
            font-size: 0.95rem;
            line-height: 1.5;
          }
        }
      }
    }
  }

  .resources-section {
    margin-bottom: 2.5rem;

    .resources {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;

      .resource-card {
        display: block;
        background: white;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        transition: transform 0.3s, box-shadow 0.3s;
        text-decoration: none;
        color: inherit;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          background: linear-gradient(135deg, #4e6ef2 0%, #2b85e4 100%);
          color: white;

          h3, p, .resource-icon {
            color: white;
          }

          .resource-icon {
            background: rgba(255, 255, 255, 0.2);
          }
        }

        .resource-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
          background: #f1f5f9;
          color: #4e6ef2;
          font-size: 1.8rem;
        }

        h3 {
          font-size: 1.3rem;
          font-weight: 600;
          color: #2c3e50;
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        p {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      }
    }
  }

  .footer {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);

    p {
      color: #64748b;
      font-size: 1.05rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .links {
      margin-top: 1.5rem;
    }

    .link-button {
      display: inline-block;
      padding: 0.8rem 1.8rem;
      background: linear-gradient(135deg, #4e6ef2 0%, #2b85e4 100%);
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 600;
      font-size: 1rem;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(78, 110, 242, 0.3);
      }
    }
  }
}
</style>
