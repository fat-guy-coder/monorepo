<template>
  <div class="loader-guide-container">
    <header class="header">
      <div class="title-group">
        <webpack-icon />
        <h1>Webpack Loader 实现指南</h1>
      </div>
      <p class="subtitle">掌握自定义 Loader 开发，扩展 Webpack 构建能力</p>
    </header>

    <div class="content">
      <section class="section concept">
        <div class="section-header">
          <h2><concept-icon /> Loader 核心概念</h2>
        </div>
        <div class="section-content">
          <p class="highlight">
            <strong>Loader 是 Webpack 的核心功能之一</strong>，它允许你在模块加载时对文件内容进行转换。Loader 本质上是接收源代码作为输入，进行处理后返回新代码的函数。
          </p>

          <div class="comparison">
            <div class="loader-process">
              <h3>Loader 处理流程</h3>
              <div class="process-diagram">
                <div class="step">
                  <div class="step-label">源代码</div>
                  <div class="file">app.js</div>
                </div>

                <div class="arrow">➔</div>

                <div class="step">
                  <div class="step-label">Loader 1</div>
                  <div class="loader-card">Babel Loader</div>
                </div>

                <div class="arrow">➔</div>

                <div class="step">
                  <div class="step-label">Loader 2</div>
                  <div class="loader-card">自定义 Loader</div>
                </div>

                <div class="arrow">➔</div>

                <div class="step">
                  <div class="step-label">输出</div>
                  <div class="file">转换后源码</div>
                </div>
              </div>
            </div>
          </div>

          <div class="characteristics">
            <h3>Loader 关键特性</h3>
            <div class="features-grid">
              <div class="feature-card">
                <div class="icon chain"></div>
                <h4>链式调用</h4>
                <p>多个 Loader 按声明顺序从右向左/从下向上执行</p>
              </div>
              <div class="feature-card">
                <div class="icon functional"></div>
                <h4>函数式设计</h4>
                <p>每个 Loader 都是单一职责的纯函数</p>
              </div>
              <div class="feature-card">
                <div class="icon async"></div>
                <h4>支持异步</h4>
                <p>可以同步或异步地返回转换结果</p>
              </div>
              <div class="feature-card">
                <div class="icon state"></div>
                <h4>无状态</h4>
                <p>不保存状态，除接收内容外不应有副作用</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section implementation">
        <div class="section-header">
          <h2><code-icon /> 实现自定义 Loader</h2>
        </div>
        <div class="section-content">
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>创建 Loader 文件</h3>
              <p>创建 JavaScript 文件作为 Loader 入口</p>
              <pre>// my-loader.js
module.exports = function(source) {
  // 处理源代码
  return transformedSource;
};</pre>
            </div>

            <div class="step">
              <div class="step-number">2</div>
              <h3>实现转换逻辑</h3>
              <p>在函数中实现核心转换逻辑</p>
              <pre>module.exports = function(source) {
  // 添加自定义处理
  const result = source.replace(/console\.log$$.*?$$;/g, '');

  // 返回处理结果
  return result;
};</pre>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <h3>处理异步操作</h3>
              <p>使用 this.async() 处理异步转换</p>
              <pre>module.exports = function(source) {
  const callback = this.async();

  // 模拟异步操作
  setTimeout(() => {
    const result = processSource(source);
    callback(null, result);
  }, 100);
};</pre>
            </div>

            <div class="step">
              <div class="step-number">4</div>
              <h3>配置 Webpack</h3>
              <p>在 Webpack 配置中引用自定义 Loader</p>
              <pre>// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
          path.resolve(__dirname, 'loaders/my-loader.js')
        ]
      }
    ]
  }
};</pre>
            </div>
          </div>
        </div>
      </section>

      <section class="section principles">
        <div class="section-header">
          <h2><principle-icon /> Loader 工作原理</h2>
        </div>
        <div class="section-content">
          <div class="workflow">
            <h3>Loader 执行流程</h3>
            <div class="workflow-steps">
              <div class="flow-step">
                <div class="step-icon">1</div>
                <div class="step-content">
                  <h4>解析模块路径</h4>
                  <p>Webpack 根据模块请求路径解析需要应用的 Loader</p>
                </div>
              </div>

              <div class="flow-step">
                <div class="step-icon">2</div>
                <div class="step-content">
                  <h4>创建 Loader 上下文</h4>
                  <p>为每个 Loader 调用创建执行上下文，包含资源和配置信息</p>
                </div>
              </div>

              <div class="flow-step">
                <div class="step-icon">3</div>
                <div class="step-content">
                  <h4>执行 Loader 链</h4>
                  <p>按 pitch → normal 顺序执行 Loader 链中的每个 Loader</p>
                </div>
              </div>

              <div class="flow-step">
                <div class="step-icon">4</div>
                <div class="step-content">
                  <h4>生成最终模块</h4>
                  <p>将 Loader 处理结果转换为 Webpack 可识别的模块</p>
                </div>
              </div>
            </div>
          </div>

          <div class="pitching-phase">
            <h3>Loader Pitch 阶段</h3>
            <div class="pitch-diagram">
              <div class="phase">
                <div class="phase-label">Loader1 Pitch</div>
                <div class="arrow down">↓</div>
              </div>

              <div class="phase">
                <div class="phase-label">Loader2 Pitch</div>
                <div class="arrow down">↓</div>
              </div>

              <div class="phase">
                <div class="phase-label">Loader3 Pitch</div>
                <div class="arrow down">↓</div>
              </div>

              <div class="target">
                <div class="module">读取模块</div>
              </div>

              <div class="phase reverse">
                <div class="arrow up">↑</div>
                <div class="phase-label">Loader3 Normal</div>
              </div>

              <div class="phase reverse">
                <div class="arrow up">↑</div>
                <div class="phase-label">Loader2 Normal</div>
              </div>

              <div class="phase reverse">
                <div class="arrow up">↑</div>
                <div class="phase-label">Loader1 Normal</div>
              </div>
            </div>

            <div class="pitch-explanation">
              <p>
                <strong>Pitch 阶段</strong>: Loader 从右向左执行 pitch 方法<br>
                <strong>Normal 阶段</strong>: Loader 从左向右执行 normal 方法
              </p>
              <p>如果某个 pitch 方法有返回，则跳过后续 pitch 和读取操作</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section best-practices">
        <div class="section-header">
          <h2><practice-icon /> 最佳实践与注意事项</h2>
        </div>
        <div class="section-content">
          <div class="practices-grid">
            <div class="practice-card">
              <div class="icon chain"></div>
              <h3>保持简单单一</h3>
              <p>每个 Loader 只做一件事，复杂转换通过链式调用实现</p>
            </div>

            <div class="practice-card">
              <div class="icon async"></div>
              <h3>异步优先</h3>
              <p>尽可能使用异步模式，避免阻塞构建过程</p>
            </div>

            <div class="practice-card">
              <div class="icon state"></div>
              <h3>保持无状态</h3>
              <p>确保 Loader 无副作用，不保存模块间状态</p>
            </div>

            <div class="practice-card">
              <div class="icon cache"></div>
              <h3>利用缓存</h3>
              <p>使用 this.cacheable() 启用 Loader 结果缓存</p>
            </div>
          </div>

          <div class="warnings">
            <h3>常见陷阱</h3>
            <div class="warning-grid">
              <div class="warning-card">
                <div class="icon path"></div>
                <h4>绝对路径处理</h4>
                <p>使用 this.utils.contextify 处理资源路径</p>
              </div>

              <div class="warning-card">
                <div class="icon json"></div>
                <h4>JSON 序列化</h4>
                <p>返回 JSON 时需要 module.exports = ${JSON.stringify(data)}</p>
              </div>

              <div class="warning-card">
                <div class="icon binary"></div>
                <h4>二进制数据处理</h4>
                <p>设置 raw=true 接收 Buffer，处理二进制文件</p>
              </div>

              <div class="warning-card">
                <div class="icon dependency"></div>
                <h4>文件依赖</h4>
                <p>使用 this.addDependency() 添加文件依赖</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section examples">
        <div class="section-header">
          <h2><example-icon /> 实用 Loader 示例</h2>
        </div>
        <div class="section-content">
          <div class="example-tabs">
            <div class="tabs">
              <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
                @click="activeTab = index">
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 0" class="example-code">
                <h3>注释清理 Loader</h3>
                <pre>// remove-comments-loader.js
module.exports = function(source) {
  // 移除单行注释
  const noSingleLine = source.replace(/\/\/.*$/gm, '');
  // 移除多行注释
  const noMultiLine = noSingleLine.replace(/\/\*[\s\S]*?\*\//g, '');

  return noMultiLine;
};</pre>
              </div>

              <div v-if="activeTab === 1" class="example-code">
                <h3>文本替换 Loader</h3>
                <pre>// replace-loader.js
module.exports = function(source) {
  const options = this.getOptions();
  let result = source;

  for (const [key, value] of Object.entries(options.replacements)) {
    const regex = new RegExp(key, 'g');
    result = result.replace(regex, value);
  }

  return result;
};</pre>

                <div class="usage">
                  <h4>使用方式</h4>
                  <pre>// webpack.config.js
{
  test: /\.txt$/,
  use: [
    {
      loader: path.resolve(__dirname, 'replace-loader.js'),
      options: {
        replacements: {
          '{APP_NAME}': 'MyApp',
          '{VERSION}': '1.0.0'
        }
      }
    }
  ]
}</pre>
                </div>
              </div>

              <div v-if="activeTab === 2" class="example-code">
                <h3>模板加载 Loader</h3>
                <pre>// template-loader.js
module.exports = function(source) {
  // 将模板转换为可执行的 JavaScript 函数
  const template = source
    .replace(/\\/g, '\\\\')
    .replace(/\`/g, '\\`')
    .replace(/\$/g, '\\$');

  return `
    import { render } from 'template-engine';

    const template = \`${template}\`;

    export default function(props) {
      return render(template, props);
    }
  `;
};</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section testing">
        <div class="section-header">
          <h2><test-icon /> Loader 测试</h2>
        </div>
        <div class="section-content">
          <div class="testing-methods">
            <h3>测试方法</h3>

            <div class="method">
              <h4>1. 使用 Jest 单元测试</h4>
              <pre>// my-loader.test.js
const myLoader = require('./my-loader');

test('removes console logs', () => {
  const input = `console.log('test');\nconst a = 1;`;
  const output = myLoader(input);

  expect(output).toBe('const a = 1;');
});</pre>
            </div>

            <div class="method">
              <h4>2. 使用 loader-runner 集成测试</h4>
              <pre>const { runLoaders } = require('loader-runner');

runLoaders({
  resource: './test.txt',
  loaders: [path.resolve(__dirname, 'my-loader')],
  context: {
    emitWarning: (warning) => console.warn(warning)
  },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  // 验证转换结果
  console.log(result.result[0]);
});</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 图标组件
const WebpackIcon = { template: '<span class="icon webpack">w</span>' };
const ConceptIcon = { template: '<span class="icon concept">ℹ</span>' };
const CodeIcon = { template: '<span class="icon code">{ }</span>' };
const PrincipleIcon = { template: '<span class="icon principle">Ψ</span>' };
const PracticeIcon = { template: '<span class="icon practice">✓</span>' };
const ExampleIcon = { template: '<span class="icon example">✎</span>' };
const TestIcon = { template: '<span class="icon test">✔</span>' };

const activeTab = ref(0);
const tabs = ref([
  { label: '注释清理' },
  { label: '文本替换' },
  { label: '模板加载' }
]);
</script>

<style lang="less" scoped>
@webpack-color: #8dd6f9;
/* Webpack 主题色 */
@secondary-color: #2b3a42;
@accent-color: #f7df1e;
@light-bg: #f5f7fa;
@dark-bg: #2b3a42;
@border-color: #dde2e8;
@success-color: #27ae60;
@warning-color: #e74c3c;
@info-color: #3498db;

.loader-guide-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  background: linear-gradient(135deg, #f8fbff 0%, #edf5ff 100%);
  border-radius: 10px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.04);
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  background: linear-gradient(to right, @secondary-color, lighten(@webpack-color, 10%));
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  .title-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-bottom: 10px;

    h1 {
      margin: 0;
      font-size: 2.5rem;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.85;
    font-weight: 300;
  }
}

.section {
  background: white;
  border-radius: 8px;
  margin-bottom: 30px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  }
}

.section-header {
  background: linear-gradient(to right, @secondary-color, lighten(@webpack-color, 5%));
  color: white;
  padding: 15px 25px;

  h2 {
    margin: 0;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.section-content {
  padding: 25px;

  p {
    line-height: 1.7;
    font-size: 1.05rem;
    color: #444;
  }

  .highlight {
    background: rgba(141, 214, 249, 0.1);
    padding: 20px;
    border-radius: 8px;
    font-weight: 500;
    border-left: 4px solid @webpack-color;
    line-height: 1.8;
    margin-bottom: 25px;
  }
}

.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  font-weight: bold;

  &.webpack {
    background: @webpack-color;
    color: @secondary-color;
  }

  &.concept {
    background: @info-color;
  }

  &.code {
    background: #9b59b6;
  }

  &.principle {
    background: #e67e22;
  }

  &.practice {
    background: @success-color;
  }

  &.example {
    background: #d35400;
  }

  &.test {
    background: #16a085;
  }
}

// 流程图样式
.comparison {
  margin: 30px 0;
}

.loader-process {
  background: @light-bg;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid @border-color;

  h3 {
    margin-top: 0;
    text-align: center;
    color: @secondary-color;
    padding-bottom: 10px;
    border-bottom: 1px dashed @border-color;
  }
}

.process-diagram {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;

  .step {
    text-align: center;
    min-width: 120px;

    .step-label {
      font-weight: 600;
      color: @secondary-color;
      margin-bottom: 10px;
    }
  }

  .arrow {
    font-size: 1.5rem;
    color: #888;
  }

  .file,
  .loader-card {
    padding: 15px;
    border-radius: 6px;
    font-weight: 500;
  }

  .file {
    background: @info-color;
    color: white;
  }

  .loader-card {
    background: @webpack-color;
    color: @secondary-color;
    border: 1px solid darken(@webpack-color, 10%);
  }
}

// 特性网格样式
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  border: 1px solid @border-color;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
    border-color: @webpack-color;
  }

  .icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 15px;
    border-radius: 12px;
    font-size: 24px;
    background: @webpack-color;
    color: @secondary-color;

    &.chain {
      background: linear-gradient(135deg, @webpack-color, darken(@webpack-color, 15%));
    }

    &.functional {
      background: linear-gradient(135deg, #2ecc71, #27ae60);
    }

    &.async {
      background: linear-gradient(135deg, #3498db, #2980b9);
    }

    &.state {
      background: linear-gradient(135deg, #9b59b6, #8e44ad);
    }
  }

  h4 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #555;
  }
}

// 实现步骤样式
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.step {
  background: white;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  border: 1px solid @border-color;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;

  &:hover {
    border-color: @webpack-color;
    box-shadow: 0 5px 15px rgba(141, 214, 249, 0.1);
  }

  .step-number {
    width: 40px;
    height: 40px;
    background: @webpack-color;
    color: @secondary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 15px;
    color: #555;
  }

  pre {
    display: block;
    background: @secondary-color;
    color: #f8f8f2;
    padding: 12px;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-top: 10px;
    font-family: 'Fira Code', monospace;
    overflow-x: auto;
    line-height: 1.5;
  }
}

// 工作流程样式
.workflow-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 15px;

  .step-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: @webpack-color;
    color: @secondary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
  }

  h4 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 5px;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #555;
  }
}

// Pitch 阶段图
.pitching-phase {
  margin-top: 40px;
}

.pitch-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 20px auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: @border-color;
    z-index: 1;
  }
}

.phase {
  margin: 10px 0;
  position: relative;
  z-index: 2;
  width: 100%;

  .phase-label {
    background: @webpack-color;
    color: @secondary-color;
    padding: 8px 15px;
    border-radius: 20px;
    text-align: center;
    font-weight: 500;
    margin: 0 auto;
    max-width: 200px;
  }

  .arrow {
    text-align: center;
    font-size: 1.5rem;
    color: #888;
    margin: 5px 0;
  }

  &.reverse {
    .arrow {
      transform: rotate(180deg);
    }
  }
}

.target {
  position: relative;
  z-index: 2;
  margin: 15px 0;

  .module {
    background: @info-color;
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    text-align: center;
    font-weight: 500;
  }
}

.pitch-explanation {
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  background: rgba(141, 214, 249, 0.1);
  border-radius: 8px;

  p {
    margin: 10px 0;
    line-height: 1.6;
  }
}

// 最佳实践样式
.practices-grid,
.warning-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.practice-card,
.warning-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid @border-color;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
  }

  .icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 15px;
    border-radius: 12px;
    font-size: 24px;
    background: @webpack-color;
    color: @secondary-color;

    &.chain {
      background: linear-gradient(135deg, @webpack-color, darken(@webpack-color, 15%));
    }

    &.async {
      background: linear-gradient(135deg, #3498db, #2980b9);
    }

    &.state {
      background: linear-gradient(135deg, #9b59b6, #8e44ad);
    }

    &.cache {
      background: linear-gradient(135deg, #f1c40f, #f39c12);
    }

    &.path {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
    }

    &.json {
      background: linear-gradient(135deg, #27ae60, #219653);
    }

    &.binary {
      background: linear-gradient(135deg, #2c3e50, #1a2530);
    }

    &.dependency {
      background: linear-gradient(135deg, #8e44ad, #732d91);
    }
  }

  h3,
  h4 {
    color: @secondary-color;
    margin-top: 0;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #555;
  }
}

// 示例标签页
.example-tabs {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid @border-color;

  .tabs {
    display: flex;
    border-bottom: 1px solid @border-color;

    button {
      flex: 1;
      padding: 15px;
      background: none;
      border: none;
      font-size: 1rem;
      font-weight: 500;
      color: #666;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(141, 214, 249, 0.1);
      }

      &.active {
        color: @webpack-color;
        border-bottom: 3px solid @webpack-color;
        background: rgba(141, 214, 249, 0.15);
      }
    }
  }

  .tab-content {
    padding: 25px;
  }

  .example-code {
    pre {
      background: @secondary-color;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      overflow-x: auto;
      line-height: 1.5;
      margin: 15px 0;
    }
  }

  .usage {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px dashed @border-color;
  }
}

// 测试方法样式
.testing-methods {
  .method {
    margin-bottom: 30px;

    h4 {
      color: @secondary-color;
      margin-top: 0;
      margin-bottom: 15px;
    }

    pre {
      background: @secondary-color;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      overflow-x: auto;
      line-height: 1.5;
    }
  }
}

@media (max-width: 768px) {
  .header {
    .title-group h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .process-diagram {
    flex-direction: column;

    .arrow {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }
}
</style>