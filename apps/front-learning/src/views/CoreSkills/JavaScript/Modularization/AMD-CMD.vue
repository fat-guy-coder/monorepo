<template>
  <div class="amd-cmd-container">
    <!-- 顶部标题区 -->
    <div class="header-banner">
      <div class="logo-container">
        <div class="amd-logo">AMD</div>
        <div class="vs-text">VS</div>
        <div class="cmd-logo">CMD</div>
      </div>
      <div class="header-content">
        <h1 class="main-title">前端模块化规范基础介绍</h1>
        <p class="subtitle">JavaScript模块化演进历程中的两种重要规范</p>
        <div class="features">
          <span>异步加载</span>
          <span>依赖管理</span>
          <span>模块定义</span>
          <span>浏览器兼容</span>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="content-wrapper">
      <!-- 模块化演变 -->
      <section class="evolution-section">
        <div class="section-header">
          <div class="icon">🕰️</div>
          <h2>JavaScript模块化演进历程</h2>
        </div>

        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-year">2009</div>
            <div class="timeline-content">
              <h3>CommonJS规范诞生</h3>
              <p>Node.js采用的模块化规范，使用require()导入、module.exports导出</p>
              <p>主要设计用于服务端，同步加载机制</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2011</div>
            <div class="timeline-content">
              <h3>AMD规范诞生</h3>
              <p>Asynchronous Module Definition（异步模块定义）</p>
              <p>RequireJS推广，解决浏览器端异步加载问题</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2011</div>
            <div class="timeline-content">
              <h3>CMD规范诞生</h3>
              <p>Common Module Definition（通用模块定义）</p>
              <p>SeaJS推广，结合CommonJS和AMD的优点</p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-year">2015</div>
            <div class="timeline-content">
              <h3>ES Modules标准化</h3>
              <p>ES6(ES2015)引入原生模块化支持</p>
              <p>使用import/export语法，成为现代JavaScript标准</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AMD基础介绍 -->
      <section class="amd-section">
        <div class="section-header">
          <div class="icon amd-icon">A</div>
          <h2>AMD规范基础介绍</h2>
          <div class="section-subtitle">Asynchronous Module Definition (异步模块定义)</div>
        </div>

        <div class="spec-grid">
          <div class="spec-card">
            <div class="spec-icon">📖</div>
            <h3>定义与特点</h3>
            <ul>
              <li>异步加载模块，不阻塞页面渲染</li>
              <li>依赖前置：提前声明依赖项</li>
              <li>设计目标：浏览器环境模块化</li>
              <li>主要实现：RequireJS</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">⚙️</div>
            <h3>核心原理</h3>
            <ul>
              <li>使用define()定义模块</li>
              <li>使用require()加载模块</li>
              <li>依赖项通过数组声明</li>
              <li>模块加载完成后执行回调</li>
              <li>通过创建script标签加载资源</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">✅</div>
            <h3>优点</h3>
            <ul>
              <li>浏览器友好，支持异步加载</li>
              <li>清晰的依赖声明</li>
              <li>支持并行加载多个模块</li>
              <li>模块可以按需加载</li>
              <li>良好的错误处理机制</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">⚠️</div>
            <h3>缺点</h3>
            <ul>
              <li>依赖前置导致冗余加载</li>
              <li>代码组织不符合书写习惯</li>
              <li>调试困难，代码执行顺序不直观</li>
              <li>增加项目复杂度</li>
            </ul>
          </div>
        </div>

        <div class="code-section">
          <h3 class="code-title">AMD规范代码示例</h3>
          <div class="code-grid">
            <div class="code-card">
              <h4>模块定义</h4>
              <pre class="code-block">// 定义math模块
define('math', ['dependency'], function(dep) {
  // 模块逻辑
  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;

  // 导出模块
  return {
    add,
    subtract
  };
});</pre>
            </div>

            <div class="code-card">
              <h4>模块加载</h4>
              <pre class="code-block">// 加载模块
require(['math'], function(math) {
  // 使用模块
  console.log(math.add(5, 3)); // 8
  console.log(math.subtract(5, 3)); // 2
});</pre>
            </div>

            <div class="code-card">
              <h4>配置RequireJS</h4>
              <pre class="code-block">require.config({
  // 基础路径
  baseUrl: 'js/libs',

  // 路径映射
  paths: {
    'jquery': 'jquery.min',
    'lodash': 'lodash.custom.min'
  },

  // 非AMD模块的shim配置
  shim: {
    'jquery.scroll': {
      deps: ['jquery'],
      exports: 'jQuery.fn.scroll'
    }
  }
});</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- CMD基础介绍 -->
      <section class="cmd-section">
        <div class="section-header">
          <div class="icon cmd-icon">C</div>
          <h2>CMD规范基础介绍</h2>
          <div class="section-subtitle">Common Module Definition (通用模块定义)</div>
        </div>

        <div class="spec-grid">
          <div class="spec-card">
            <div class="spec-icon">📖</div>
            <h3>定义与特点</h3>
            <ul>
              <li>按需加载依赖，延迟执行</li>
              <li>依赖就近：在需要时加载依赖</li>
              <li>设计目标：通用模块定义（浏览器+服务端）</li>
              <li>主要实现：SeaJS</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">⚙️</div>
            <h3>核心原理</h3>
            <ul>
              <li>使用define()定义模块</li>
              <li>使用require()加载依赖</li>
              <li>依赖项在需要时引入</li>
              <li>模块执行顺序与书写顺序一致</li>
              <li>模块加载完成后执行factory函数</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">✅</div>
            <h3>优点</h3>
            <ul>
              <li>依赖就近，符合书写习惯</li>
              <li>延迟执行，避免冗余加载</li>
              <li>调试方便，执行顺序直观</li>
              <li>与Node.js模块风格类似</li>
              <li>易于在Node.js环境中实现</li>
            </ul>
          </div>

          <div class="spec-card">
            <div class="spec-icon">⚠️</div>
            <h3>缺点</h3>
            <ul>
              <li>依赖加载分散，管理复杂</li>
              <li>执行性能略低于AMD</li>
              <li>模块加载顺序需要额外处理</li>
              <li>社区支持不如AMD广泛</li>
            </ul>
          </div>
        </div>

        <div class="code-section">
          <h3 class="code-title">CMD规范代码示例</h3>
          <div class="code-grid">
            <div class="code-card">
              <h4>模块定义</h4>
              <pre class="code-block">// 定义模块
define(function(require, exports, module) {
  // 按需引入依赖
  const $ = require('jquery');
  const utils = require('./utils');

  // 模块逻辑
  const init = () => {
    $('.btn').on('click', utils.handleClick);
  };

  // 导出接口
  module.exports = {
    init
  };
});</pre>
            </div>

            <div class="code-card">
              <h4>模块加载</h4>
              <pre class="code-block">// 加载模块
seajs.use(['main'], function(main) {
  // 使用模块
  main.init();
});</pre>
            </div>

            <div class="code-card">
              <h4>配置SeaJS</h4>
              <pre class="code-block">seajs.config({
  // 基础路径
  base: './js',

  // 路径映射
  alias: {
    'jquery': 'libs/jquery.js',
    'utils': 'modules/utils.js'
  },

  // 文件编码
  charset: 'utf-8',

  // 超时时间
  timeout: 5000
});</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- 对比分析 -->
      <section class="comparison-section">
        <div class="section-header">
          <div class="icon">🆚</div>
          <h2>AMD与CMD对比分析</h2>
        </div>

        <div class="comparison-table">
          <div class="table-header">
            <div>对比维度</div>
            <div>AMD (RequireJS)</div>
            <div>CMD (SeaJS)</div>
          </div>

          <div class="table-row">
            <div>设计理念</div>
            <div>异步模块定义，依赖前置</div>
            <div>通用模块定义，依赖就近</div>
          </div>

          <div class="table-row">
            <div>加载方式</div>
            <div>异步并行加载</div>
            <div>异步顺序加载</div>
          </div>

          <div class="table-row">
            <div>执行顺序</div>
            <div>依赖加载后立即执行</div>
            <div>延迟执行，直到require调用</div>
          </div>

          <div class="table-row">
            <div>适用场景</div>
            <div>浏览器环境为主</div>
            <div>浏览器+Node.js通用</div>
          </div>

          <div class="table-row">
            <div>代码风格</div>
            <div>依赖数组前置，不符合自然书写</div>
            <div>依赖就近，符合书写习惯</div>
          </div>

          <div class="table-row">
            <div>性能特点</div>
            <div>加载性能更好，可能执行冗余代码</div>
            <div>执行性能更好，避免冗余执行</div>
          </div>

          <div class="table-row">
            <div>调试体验</div>
            <div>调试相对困难</div>
            <div>调试更直观</div>
          </div>

          <div class="table-row">
            <div>社区支持</div>
            <div>社区更广泛</div>
            <div>社区相对较小</div>
          </div>
        </div>

        <div class="comparison-summary">
          <div class="summary-card">
            <h3>选择AMD的场景：</h3>
            <ul>
              <li>需要高度模块化的复杂前端应用</li>
              <li>需要并行加载多个模块</li>
              <li>项目依赖关系复杂且明确</li>
              <li>对加载性能要求较高</li>
              <li>需要处理非AMD兼容库</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>选择CMD的场景：</h3>
            <ul>
              <li>追求代码组织更自然直观</li>
              <li>需要代码执行顺序与书写顺序一致</li>
              <li>项目需要在浏览器和Node.js环境运行</li>
              <li>项目模块依赖关系相对简单</li>
              <li>需要更好的调试体验</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 现代应用 -->
      <section class="modern-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>现代模块化方案</h2>
        </div>

        <div class="modern-grid">
          <div class="modern-card">
            <div class="modern-icon">📦</div>
            <h3>ES Modules (ESM)</h3>
            <p>ECMAScript官方标准模块系统</p>
            <ul>
              <li>使用import/export语法</li>
              <li>静态分析，支持tree-shaking</li>
              <li>浏览器原生支持</li>
              <li>成为现代开发标准</li>
            </ul>
          </div>

          <div class="modern-card">
            <div class="modern-icon">🔄</div>
            <h3>模块打包工具</h3>
            <p>现代构建工具支持多种模块规范</p>
            <ul>
              <li>Webpack：支持AMD、CMD、CommonJS、ESM</li>
              <li>Rollup：专注于ES模块打包</li>
              <li>Vite：基于ESM的下一代构建工具</li>
              <li>Parcel：零配置打包工具</li>
            </ul>
          </div>

          <div class="modern-card">
            <div class="modern-icon">🔮</div>
            <h3>未来展望</h3>
            <p>模块化发展趋势</p>
            <ul>
              <li>ES Modules成为主流标准</li>
              <li>AMD/CMD作为过渡方案逐渐退出</li>
              <li>浏览器原生支持ESM</li>
              <li>import maps标准化模块映射</li>
              <li>HTTP/2优化模块加载性能</li>
            </ul>
          </div>
        </div>

        <div class="modern-code">
          <h3>ES Modules使用示例</h3>
          <div class="code-grid">
            <div class="code-card">
              <h4>模块定义 (math.js)</h4>
              <pre class="code-block">// 导出函数
export const add = (a, b) => a + b;

export const subtract = (a, b) => a - b;

// 默认导出
export default {
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};</pre>
            </div>

            <div class="code-card">
              <h4>模块使用 (app.js)</h4>
              <pre class="code-block">// 命名导入
import { add, subtract } from './math.js';

// 默认导入
import math from './math.js';

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
console.log(math.multiply(5, 3)); // 15</pre>
            </div>

            <div class="code-card">
              <h4>HTML中使用 (type="module")</h4>
              <pre class="code-block">&lt;script type="module"&gt;
  import { add } from './math.js';
  console.log(add(2, 3)); // 5
&lt;/script&gt;

&lt;script type="module" src="app.js"&gt;&lt;/script&gt;</pre>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <div class="footer">
      <p>模块化开发演进史 | AMD/CMD规范基础介绍 | 现代ES Modules标准 | </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 组件逻辑部分
// 此组件为展示型组件，无复杂逻辑
</script>

<style lang="less" scoped>
@font-main: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@font-code: 'Fira Code', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;

.amd-cmd-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: @font-main;
  background-color: #f8fafc;
  color: #334155;
  line-height: 1.6;
}

.header-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #6a5acd, #8a2be2);
  color: white;
  padding: 3rem 2rem;
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;

  .logo-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  .amd-logo,
  .cmd-logo {
    font-size: 3.5rem;
    font-weight: 800;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .amd-logo {
    background: linear-gradient(135deg, #ff7f50, #ff4500);
    box-shadow: 0 5px 15px rgba(255, 69, 0, 0.3);
  }

  .cmd-logo {
    background: linear-gradient(135deg, #3cb371, #2e8b57);
    box-shadow: 0 5px 15px rgba(46, 139, 87, 0.3);
  }

  .vs-text {
    font-size: 1.8rem;
    font-weight: 700;
    color: #e0e0ff;
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

.features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 0.95rem;
  opacity: 0.9;

  span {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.4rem 0.8rem;
    border-radius: 100px;
  }
}

.content-wrapper {
  padding: 0 2rem 3rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0 1.5rem;

  .icon {
    font-size: 1.8rem;
    background: #e0e0ff;
    color: #6a5acd;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }

  .amd-icon {
    background: #ffefe0;
    color: #ff4500;
  }

  .cmd-icon {
    background: #e0f5ea;
    color: #2e8b57;
  }

  h2 {
    font-size: 1.8rem;
    margin: 0;
    color: #1e293b;
  }

  .section-subtitle {
    margin: 0.5rem 0 0;
    color: #64748b;
    font-size: 1.05rem;
  }
}

.evolution-section {
  margin-bottom: 3rem;
}

.timeline {
  position: relative;
  padding-left: 30px;
  margin-left: 10px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: #6a5acd;
    border-radius: 2px;
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: -13px;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #8a2be2;
    z-index: 1;
  }
}

.timeline-year {
  font-weight: 700;
  font-size: 1.2rem;
  color: #6a5acd;
  margin-bottom: 0.5rem;
}

.timeline-content {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    color: #6a5acd;
    font-size: 1.3rem;
  }

  p {
    margin: 0.5rem 0;
    color: #64748b;
  }
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.spec-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .spec-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #6a5acd;
  }

  h3 {
    margin-top: 0;
    color: #1e293b;
    font-size: 1.3rem;
    border-left: 4px solid #8a2be2;
    padding-left: 0.8rem;
  }

  ul {
    padding-left: 1.2rem;
    margin: 1rem 0 0;

    li {
      margin-bottom: 0.6rem;
      line-height: 1.5;
    }
  }
}

.code-section {
  margin-top: 2rem;
}

.code-title {
  font-size: 1.4rem;
  color: #1e293b;
  border-bottom: 2px solid #e0e0ff;
  padding-bottom: 0.8rem;
  margin-bottom: 1.5rem;
}

.code-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.code-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  h4 {
    margin: 0;
    padding: 1rem;
    background: #f0f0ff;
    color: #6a5acd;
    font-size: 1.1rem;
  }
}

.comparison-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
}

.comparison-table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid #e0e0ff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.table-header {
  display: contents;

  >div {
    padding: 1.2rem;
    background: #f0f0ff;
    font-weight: 600;
    text-align: center;
    color: #6a5acd;

    &:first-child {
      background: #e0e0ff;
    }
  }
}

.table-row {
  display: contents;

  >div {
    padding: 1rem;
    border-bottom: 1px solid #e0e0ff;
    display: flex;
    align-items: center;

    &:first-child {
      font-weight: 600;
      background: #f8f8ff;
      color: #6a5acd;
    }
  }

  &:nth-child(even)>div:not(:first-child) {
    background: #fcfcff;
  }

  &:last-child>div {
    border-bottom: none;
  }
}

.comparison-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  background: #f8f8ff;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #8a2be2;

  h3 {
    margin-top: 0;
    color: #6a5acd;
  }

  ul {
    padding-left: 1.2rem;
    margin: 1rem 0 0;

    li {
      margin-bottom: 0.6rem;
      line-height: 1.5;
    }
  }
}

.modern-section {
  margin-bottom: 3rem;
}

.modern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.modern-card {
  background: white;
  border-radius: 12px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;

  .modern-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #8a2be2;
  }

  h3 {
    margin: 0 0 1rem;
    color: #6a5acd;
    font-size: 1.4rem;
  }

  p {
    margin: 0 0 1rem;
    color: #64748b;
    font-weight: 500;
  }

  ul {
    text-align: left;
    padding-left: 1.2rem;
    margin: 1rem 0 0;

    li {
      margin-bottom: 0.6rem;
      line-height: 1.5;
    }
  }
}

.modern-code {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
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
  margin: 0;
}

.footer {
  text-align: center;
  padding: 2.5rem;
  color: #94a3b8;
  font-size: 0.95rem;
  border-top: 1px solid #e2e8f0;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .header-banner {
    padding: 2rem 1rem;

    .amd-logo,
    .cmd-logo {
      width: 80px;
      height: 80px;
      font-size: 2.8rem;
    }

    .vs-text {
      font-size: 1.5rem;
    }
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .comparison-table {
    grid-template-columns: 1fr;
    overflow-x: auto;

    .table-header>div,
    .table-row>div {
      min-width: 200px;
    }
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0 1rem 2rem;
  }

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
