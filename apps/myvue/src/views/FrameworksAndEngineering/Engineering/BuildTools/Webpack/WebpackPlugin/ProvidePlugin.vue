<template>
  <div class="provide-plugin-container">
    <!-- 顶部标题区 -->
    <div class="header-section">
      <div class="logo-container">
        <div class="webpack-logo">
          <span>P</span><span>r</span><span>o</span><span>v</span><span>i</span><span>d</span><span>e</span>
          <span>P</span><span>l</span><span>u</span><span>g</span><span>i</span><span>n</span>
        </div>
      </div>
      <div class="header-content">
        <h1 class="main-title">Webpack ProvidePlugin 基础介绍</h1>
        <p class="subtitle">全局模块注入工具，优化前端依赖管理</p>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 简介部分 -->
      <section class="intro-section">
        <div class="section-header">
          <div class="icon">🔌</div>
          <h2>什么是 ProvidePlugin?</h2>
        </div>

        <div class="intro-content">
          <div class="plugin-definition">
            <p>ProvidePlugin 是 Webpack 的核心插件，用于在<b>模块作用域内自动加载模块</b>，无需在每个文件中显式 import 或 require。</p>

            <div class="benefit-grid">
              <div class="benefit-card">
                <div class="benefit-icon">📦</div>
                <h3>减少重复导入</h3>
                <p>无需在每个文件导入常用库</p>
              </div>

              <div class="benefit-card">
                <div class="benefit-icon">⚡</div>
                <h3>简化代码</h3>
                <p>消除冗余的 import 语句</p>
              </div>

              <div class="benefit-card">
                <div class="benefit-icon">🧩</div>
                <h3>兼容旧库</h3>
                <p>支持非模块化库的自动加载</p>
              </div>
            </div>
          </div>

          <div class="how-it-works">
            <h3 class="section-subtitle">工作原理</h3>
            <div class="workflow">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>配置映射</h4>
                  <p>在 webpack 配置中定义标识符到模块的映射</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>自动注入</h4>
                  <p>当 Webpack 检测到标识符时自动引入模块</p>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>替换引用</h4>
                  <p>将标识符替换为模块的导出内容</p>
                </div>
              </div>
            </div>

            <div class="workflow-diagram">
              <div class="diagram-item config">
                <div class="node">Webpack 配置</div>
                <div class="code">new ProvidePlugin({<br>&nbsp;&nbsp;_: 'lodash',<br>&nbsp;&nbsp;$: 'jquery'<br>})</div>
              </div>

              <div class="arrow">→</div>

              <div class="diagram-item module">
                <div class="node">源代码文件</div>
                <div class="code">const element = $('#app');<br>const sum = _.sum([1,2,3]);</div>
              </div>

              <div class="arrow">→</div>

              <div class="diagram-item result">
                <div class="node">打包输出</div>
                <div class="code">const $ = __webpack_require__('jquery');<br>const _ =
                  __webpack_require__('lodash');<br>// 原始代码...</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 配置详情 -->
      <section class="config-section">
        <div class="section-header">
          <div class="icon">⚙️</div>
          <h2>配置基础介绍</h2>
        </div>

        <div class="config-overview">
          <h3 class="section-subtitle">基本配置格式</h3>
          <pre class="code-block">const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      // 标识符: 模块路径
      identifier: 'module-name',

      // 标识符: [模块路径, 导出项]
      identifier: ['module-name', 'export'],

      // 多个标识符指向同一个模块
      identifier1: 'module',
      identifier2: 'module'
    })
  ]
};</pre>

          <div class="config-params">
            <div class="param-card">
              <div class="param-header">
                <div class="param-name">identifier</div>
                <div class="param-type">string | Array</div>
              </div>
              <div class="param-desc">
                <p>在代码中使用的变量名或标识符</p>
                <ul>
                  <li><strong>单个字符串</strong>：直接作为变量名使用</li>
                  <li><strong>数组形式</strong>：['模块路径', '导出项']</li>
                </ul>
              </div>
            </div>

            <div class="param-card">
              <div class="param-header">
                <div class="param-name">module-name</div>
                <div class="param-type">string</div>
              </div>
              <div class="param-desc">
                <p>需要自动加载的模块路径</p>
                <ul>
                  <li>可以是 npm 包名（如 'lodash'）</li>
                  <li>也可以是项目中的相对路径（如 './src/utils'）</li>
                </ul>
              </div>
            </div>

            <div class="param-card">
              <div class="param-header">
                <div class="param-name">export</div>
                <div class="param-type">string | Array</div>
              </div>
              <div class="param-desc">
                <p>从模块中导出的特定项</p>
                <ul>
                  <li>默认为模块的默认导出</li>
                  <li>可以是具名导出（如 'map'）</li>
                  <li>支持多层嵌套（如 'moment.locale'）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="config-examples">
          <h3 class="section-subtitle">配置示例</h3>

          <div class="example-tabs">
            <div v-for="(example, index) in examples" :key="index" @click="activeExample = index"
              :class="['example-tab', { active: activeExample === index }]">
              {{ example.title }}
            </div>
          </div>

          <div class="example-content">
            <!-- 基本用法 -->
            <div v-show="activeExample === 0" class="example-detail">
              <h4 class="example-title">基本用法：注入单个模块</h4>
              <div class="example-grid">
                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">📝</div>
                    <h5>Webpack 配置</h5>
                  </div>
                  <pre class="code-block">const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      // 注入 jQuery 为全局变量 $
      $: 'jquery',

      // 注入 lodash 为全局变量 _
      _: 'lodash'
    })
  ]
};</pre>
                </div>

                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">💻</div>
                    <h5>源代码</h5>
                  </div>
                  <pre class="code-block">// 无需 import $ from 'jquery';
// 无需 import _ from 'lodash';

$(function() {
  // 直接使用 $
  $('.btn').click(() => {
    // 直接使用 _
    const random = _.random(1, 100);
    console.log(random);
  });
});</pre>
                </div>

                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">✨</div>
                    <h5>效果</h5>
                  </div>
                  <ul class="effect-list">
                    <li>所有文件中自动注入 $ 和 _</li>
                    <li>无需在每个文件导入 jQuery 和 lodash</li>
                    <li>打包时自动处理依赖关系</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 指定导出项 -->
            <div v-show="activeExample === 1" class="example-detail">
              <h4 class="example-title">指定导出项：精确控制注入内容</h4>
              <div class="example-grid">
                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">📝</div>
                    <h5>Webpack 配置</h5>
                  </div>
                  <pre class="code-block">const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      // 注入 lodash 的 map 方法
      lodashMap: ['lodash', 'map'],

      // 注入 moment 的 locale 方法
      momentLocale: ['moment', 'locale'],

      // 注入自定义模块的导出项
      formatDate: ['./src/utils/date', 'format']
    })
  ]
};</pre>
                </div>

                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">💻</div>
                    <h5>源代码</h5>
                  </div>
                  <pre class="code-block">// 直接使用特定方法
const users = lodashMap(data, 'name');

// 设置 moment 语言环境
momentLocale('zh-cn');

// 使用自定义日期格式化函数
const today = formatDate(new Date(), 'YYYY-MM-DD');</pre>
                </div>

                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">✨</div>
                    <h5>优势</h5>
                  </div>
                  <ul class="effect-list">
                    <li>仅注入所需方法，减小打包体积</li>
                    <li>避免导入整个库</li>
                    <li>支持自定义模块的特定导出</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- 多标识符 -->
            <div v-show="activeExample === 2" class="example-detail">
              <h4 class="example-title">多标识符：灵活映射</h4>
              <div class="example-grid">
                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">📝</div>
                    <h5>Webpack 配置</h5>
                  </div>
                  <pre class="code-block">const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      // 多个标识符指向同一个模块
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',

      // 多个标识符指向同一个导出
      map: ['lodash', 'map'],
      each: ['lodash', 'forEach'],
      filter: ['lodash', 'filter']
    })
  ]
};</pre>
                </div>

                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">💻</div>
                    <h5>源代码</h5>
                  </div>
                  <pre class="code-block">// jQuery 的多种使用方式
$('#button').click();
jQuery('#button').hide();
window.jQuery('#button').show();

// 使用不同名称的 lodash 方法
const names = map(users, 'name');
each(users, user => console.log(user));
const adults = filter(users, u => u.age >= 18);</pre>
                </div>

                <div class="example-card">
                  <div class="example-header">
                    <div class="example-icon">✨</div>
                    <h5>最佳实践</h5>
                  </div>
                  <ul class="effect-list">
                    <li>兼容需要不同标识符的库</li>
                    <li>创建方法别名提升可读性</li>
                    <li>统一项目中的工具方法命名</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>典型使用场景</h2>
        </div>

        <div class="cases-grid">
          <div class="case-card">
            <div class="case-header">
              <div class="case-icon">💵</div>
              <h3>jQuery 插件兼容</h3>
            </div>
            <div class="case-content">
              <p>许多遗留 jQuery 插件依赖全局 $ 或 jQuery 变量</p>
              <pre class="code-block">new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery'
})</pre>
            </div>
          </div>

          <div class="case-card">
            <div class="case-header">
              <div class="case-icon">📊</div>
              <h3>工具库全局注册</h3>
            </div>
            <div class="case-content">
              <p>项目中常用工具方法的全局访问</p>
              <pre class="code-block">new webpack.ProvidePlugin({
  _: 'lodash',
  moment: 'moment',
  axios: 'axios',
  formatCurrency: ['./utils', 'currency'],
  logger: ['./logger', 'default']
})</pre>
            </div>
          </div>

          <div class="case-card">
            <div class="case-header">
              <div class="case-icon">🧪</div>
              <h3>特定环境注入</h3>
            </div>
            <div class="case-content">
              <p>根据环境变量注入不同实现</p>
              <pre class="code-block">new webpack.ProvidePlugin({
  // 开发环境使用 mock API
  api: process.env.NODE_ENV === 'production'
    ? './api/prod'
    : './api/mock'
})</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践与注意事项 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">✅</div>
          <h2>最佳实践与注意事项</h2>
        </div>

        <div class="practices-container">
          <div class="practices-column">
            <h3 class="column-title">最佳实践</h3>
            <div class="practice-card">
              <div class="practice-icon">👍</div>
              <div class="practice-content">
                <h4>特定方法注入</h4>
                <p>仅注入需要的方法而非整个库，避免打包体积膨胀</p>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-icon">👍</div>
              <div class="practice-content">
                <h4>项目工具集中管理</h4>
                <p>将常用工具函数集中在 utils 模块通过 ProvidePlugin 注入</p>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-icon">👍</div>
              <div class="practice-content">
                <h4>结合 Tree Shaking</h4>
                <p>对于 ES6 模块，结合 tree shaking 移除未使用代码</p>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-icon">👍</div>
              <div class="practice-content">
                <h4>命名规范</h4>
                <p>使用清晰一致的命名避免冲突</p>
              </div>
            </div>
          </div>

          <div class="practices-column">
            <h3 class="column-title">注意事项</h3>
            <div class="practice-card">
              <div class="practice-icon">⚠️</div>
              <div class="practice-content">
                <h4>作用域限制</h4>
                <p>仅在模块内有效，不会创建真正的全局变量</p>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-icon">⚠️</div>
              <div class="practice-content">
                <h4>依赖关系隐藏</h4>
                <p>可能使代码依赖关系变得不明确</p>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-icon">⚠️</div>
              <div class="practice-content">
                <h4>类型安全</h4>
                <p>在 TypeScript 中需要添加类型声明</p>
                <pre class="code-block">// global.d.ts
declare const $: typeof import('jquery');
declare const _: typeof import('lodash');</pre>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-icon">⚠️</div>
              <div class="practice-content">
                <h4>第三方库兼容性</h4>
                <p>某些库可能依赖特定加载顺序</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 替代方案 -->
      <section class="alternatives">
        <div class="section-header">
          <div class="icon">🔄</div>
          <h2>替代方案对比</h2>
        </div>

        <div class="alternatives-table">
          <table>
            <thead>
              <tr>
                <th>方案</th>
                <th>优点</th>
                <th>缺点</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ProvidePlugin</strong></td>
                <td>自动注入，无需修改源代码</td>
                <td>隐藏依赖关系，类型问题</td>
                <td>全局工具库、兼容旧库</td>
              </tr>
              <tr>
                <td><strong>全局 imports</strong></td>
                <td>显式依赖，类型安全</td>
                <td>需要修改每个文件</td>
                <td>新项目，小型代码库</td>
              </tr>
              <tr>
                <td><strong>Webpack externals</strong></td>
                <td>避免打包库文件</td>
                <td>需要外部加载库</td>
                <td>大型库如 React、Vue</td>
              </tr>
              <tr>
                <td><strong>Window 全局变量</strong></td>
                <td>简单直接</td>
                <td>污染全局空间</td>
                <td>传统遗留项目</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>Webpack ProvidePlugin 基础介绍 | 模块注入工具 | © 2023</p>
      <div class="footer-links">
        <a href="https://webpack.js.org/plugins/provide-plugin/" target="_blank">官方文档</a>
        <a href="https://github.com/webpack/webpack" target="_blank">GitHub</a>
        <a href="https://webpack.js.org/plugins/" target="_blank">插件参考</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const examples = ref([
  { title: '基本用法' },
  { title: '指定导出项' },
  { title: '多标识符' }
]);

const activeExample = ref(0);
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.provide-plugin-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
  padding-bottom: 2rem;
}

.header-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    margin-bottom: 1.5rem;
  }

  .webpack-logo {
    font-size: 2.8rem;
    font-weight: 800;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
    letter-spacing: -1px;

    span {
      transition: all 0.25s ease;

      &:hover {
        transform: translateY(-5px);
      }

      &:nth-child(1) {
        color: #dbeafe;
      }

      &:nth-child(2) {
        color: #bfdbfe;
      }

      &:nth-child(3) {
        color: #93c5fd;
      }

      &:nth-child(4) {
        color: #60a5fa;
      }

      &:nth-child(5) {
        color: #3b82f6;
      }

      &:nth-child(6) {
        color: #2563eb;
      }

      &:nth-child(7) {
        color: #1d4ed8;
      }

      &:nth-child(8) {
        color: #dbeafe;
      }

      &:nth-child(9) {
        color: #bfdbfe;
      }

      &:nth-child(10) {
        color: #93c5fd;
      }

      &:nth-child(11) {
        color: #60a5fa;
      }

      &:nth-child(12) {
        color: #3b82f6;
      }
    }
  }
}

.main-title {
  font-size: 2.5rem;
  margin: 0 0 0.8rem;
  font-weight: 800;
}

.subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
  margin: 0 0 1.5rem;
  font-weight: 400;
}

.content-wrapper {
  padding: 0 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;

  .icon {
    font-size: 1.8rem;
    background: #dbeafe;
    color: #3b82f6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: #1e293b;
  }
}

.intro-content {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);

  .plugin-definition {
    p {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
  }
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;

  .benefit-card {
    background: #dbeafe;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .benefit-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #3b82f6;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.3rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
    }
  }
}

.how-it-works {
  margin-top: 2.5rem;

  .section-subtitle {
    font-size: 1.4rem;
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid #dbeafe;
  }
}

.workflow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  .step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;

    .step-number {
      width: 36px;
      height: 36px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
      font-size: 1.2rem;
    }

    .step-content {
      h4 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
        color: #1e293b;
      }

      p {
        margin: 0;
        color: #4b5563;
        font-size: 0.95rem;
      }
    }
  }
}

.workflow-diagram {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eff6ff;
  border-radius: 12px;
  padding: 2rem 1rem;
  margin-top: 2rem;

  .diagram-item {
    background: white;
    border-radius: 10px;
    padding: 1rem;
    width: 30%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    .node {
      font-weight: 600;
      color: #1e40af;
      margin-bottom: 0.8rem;
      text-align: center;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #dbeafe;
    }

    .code {
      font-family: @font-code;
      font-size: 0.85rem;
      line-height: 1.5;
      color: #334155;
      background: #f8fafc;
      padding: 0.8rem;
      border-radius: 6px;
    }
  }

  .arrow {
    font-size: 1.8rem;
    color: #93c5fd;
    font-weight: 700;
    margin: 0 -15px;
  }
}

.config-overview {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  margin-bottom: 2rem;

  .section-subtitle {
    font-size: 1.3rem;
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1.2rem;
  }
}

.config-params {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  .param-card {
    background: #eff6ff;
    border-radius: 10px;
    padding: 1.5rem;
    border-left: 4px solid #3b82f6;

    .param-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      .param-name {
        font-weight: 700;
        font-size: 1.1rem;
        color: #1e40af;
      }

      .param-type {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.2rem 0.8rem;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }

    .param-desc {
      p {
        margin: 0 0 0.8rem;
        color: #4b5563;
        line-height: 1.5;
      }

      ul {
        padding-left: 1.2rem;

        li {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          line-height: 1.5;

          strong {
            color: #1e40af;
          }
        }
      }
    }
  }
}

.config-examples {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.example-tabs {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;

  .example-tab {
    flex-shrink: 0;
    padding: 0.8rem 1.5rem;
    background: #dbeafe;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #bfdbfe;
    }

    &.active {
      background: #3b82f6;
      color: white;
    }
  }
}

.example-detail {
  .example-title {
    font-size: 1.3rem;
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1.2rem;
  }
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: #f8fafc;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

  .example-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    background: #eff6ff;
    border-bottom: 1px solid #dbeafe;

    .example-icon {
      font-size: 1.4rem;
      color: #3b82f6;
    }

    h5 {
      margin: 0;
      font-size: 1.1rem;
      color: #1e293b;
    }
  }

  .code-block {
    margin: 0;
    border-radius: 0;
    border: none;
  }

  .effect-list {
    padding: 1rem;
    margin: 0;

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;
      font-size: 0.95rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.use-cases {
  margin-top: 2rem;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.case-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  .case-header {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1.2rem;
    background: #eff6ff;

    .case-icon {
      font-size: 1.8rem;
      color: #3b82f6;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
      color: #1e293b;
    }
  }

  .case-content {
    padding: 1.2rem;

    p {
      margin-top: 0;
      color: #4b5563;
      margin-bottom: 1rem;
    }
  }
}

.best-practices {
  margin-top: 2rem;
}

.practices-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
}

.practices-column {
  .column-title {
    font-size: 1.3rem;
    color: #1e40af;
    margin-top: 0;
    margin-bottom: 1.2rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #dbeafe;
  }
}

.practice-card {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }

  .practice-icon {
    font-size: 1.4rem;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #dbeafe;
    color: #3b82f6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .practice-content {
    flex: 1;

    h4 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
      color: #1e293b;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
}

.alternatives {
  margin-top: 2rem;
}

.alternatives-table {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    th {
      background: #eff6ff;
      color: #1e40af;
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }

    td:first-child {
      font-weight: 600;
      color: #1e40af;
    }
  }
}

.footer {
  text-align: center;
  padding: 2.5rem 2rem 1rem;
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 2rem;

  .footer-links {
    margin-top: 1rem;

    a {
      color: #3b82f6;
      text-decoration: none;
      margin: 0 1rem;
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.code-block {
  background-color: #1e293b;
  color: #e2e8f0;
  border-radius: 8px;
  padding: 1.2rem;
  font-family: @font-code;
  font-size: 0.92rem;
  line-height: 1.5;
  overflow-x: auto;
  tab-size: 2;
  margin: 0.8rem 0;
}

@media (max-width: 768px) {
  .header-section {
    padding: 2rem 1rem;

    .webpack-logo {
      font-size: 2.4rem;
    }
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  .workflow-diagram {
    flex-direction: column;
    gap: 2rem;

    .diagram-item {
      width: 100%;
    }

    .arrow {
      transform: rotate(90deg);
      margin: 0.5rem 0;
    }
  }

  .practices-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.7rem;
  }

  .section-header {
    h2 {
      font-size: 1.5rem;
    }
  }
}
</style>
