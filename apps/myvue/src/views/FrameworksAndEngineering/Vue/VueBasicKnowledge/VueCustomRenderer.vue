<template>
  <div class="custom-renderer-container">
    <!-- 头部介绍 -->
    <header class="header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo">🎨</div>
        </div>
        <div class="title-container">
          <h1>Vue自定义渲染器基础介绍</h1>
          <p class="subtitle">突破DOM限制，扩展Vue的渲染能力</p>
        </div>
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">1</div>
          <div class="stat-label">核心API</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">4+</div>
          <div class="stat-label">关键方法</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">∞</div>
          <div class="stat-label">应用场景</div>
        </div>
      </div>
    </header>

    <main class="content">
      <!-- 基本概念 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">📚</span> 什么是自定义渲染器</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-header">
                <div class="concept-icon">🔍</div>
                <h3>定义</h3>
              </div>
              <div class="concept-content">
                <p>自定义渲染器允许开发者重写Vue的底层渲染逻辑，将组件树渲染到非DOM环境中</p>
                <p>Vue将虚拟节点的创建和更新操作委托给开发者定义的渲染函数</p>
              </div>
            </div>

            <div class="concept-card">
              <div class="concept-header">
                <div class="concept-icon">⚙️</div>
                <h3>核心原理</h3>
              </div>
              <div class="concept-content">
                <p>Vue的渲染流程分为编译时和运行时：</p>
                <ol>
                  <li>编译：模板 → 渲染函数</li>
                  <li>运行时：渲染函数 → 虚拟DOM</li>
                  <li>渲染：虚拟DOM → 实际渲染目标</li>
                </ol>
                <p>自定义渲染器重写第三步</p>
              </div>
            </div>

            <div class="concept-card">
              <div class="concept-header">
                <div class="concept-icon">🎯</div>
                <h3>解决的问题</h3>
              </div>
              <div class="concept-content">
                <ul>
                  <li>在非浏览器环境中使用Vue（如Canvas、WebGL）</li>
                  <li>渲染到原生应用（React Native、Weex）</li>
                  <li>服务端渲染到特定格式（PDF、邮件）</li>
                  <li>创建领域特定渲染器（终端、物联网设备）</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="architecture">
            <h3>Vue渲染架构</h3>
            <div class="architecture-diagram">
              <div class="layer">
                <div class="layer-title">Vue核心</div>
                <div class="layer-items">
                  <div class="item">响应式系统</div>
                  <div class="item">组件系统</div>
                  <div class="item">虚拟DOM</div>
                </div>
              </div>

              <div class="layer-arrow">↓</div>

              <div class="layer">
                <div class="layer-title">渲染器接口</div>
                <div class="layer-items">
                  <div class="item">createRenderer</div>
                  <div class="item">patch函数</div>
                  <div class="item">节点操作</div>
                </div>
              </div>

              <div class="layer-arrow">↓</div>

              <div class="layer target-layer">
                <div class="layer-title">渲染目标</div>
                <div class="layer-items">
                  <div class="item">DOM渲染器</div>
                  <div class="item">Canvas渲染器</div>
                  <div class="item">终端渲染器</div>
                  <div class="item">PDF渲染器</div>
                  <div class="item">自定义渲染器</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 核心API -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🔧</span> 核心API与实现</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="api-grid">
            <div class="api-card">
              <div class="api-header">
                <h3>createRenderer 函数</h3>
                <div class="api-icon">📦</div>
              </div>
              <div class="api-content">
                <p>创建自定义渲染器的入口函数</p>
                <div class="code-snippet">
                  <pre>import { createRenderer } from 'vue';

const { render, createApp } = createRenderer({
  // 渲染器选项
  patchProp,
  insert,
  remove,
  createElement,
  // ...
});</pre>
                </div>
              </div>
            </div>

            <div class="api-card">
              <div class="api-header">
                <h3>必需实现的方法</h3>
                <div class="api-icon">⚙️</div>
              </div>
              <div class="api-content">
                <table class="api-methods">
                  <thead>
                    <tr>
                      <th>方法</th>
                      <th>作用</th>
                      <th>调用时机</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>createElement</code></td>
                      <td>创建元素节点</td>
                      <td>创建新节点时</td>
                    </tr>
                    <tr>
                      <td><code>createText</code></td>
                      <td>创建文本节点</td>
                      <td>创建文本节点时</td>
                    </tr>
                    <tr>
                      <td><code>insert</code></td>
                      <td>插入节点</td>
                      <td>节点挂载或移动时</td>
                    </tr>
                    <tr>
                      <td><code>remove</code></td>
                      <td>移除节点</td>
                      <td>节点卸载时</td>
                    </tr>
                    <tr>
                      <td><code>patchProp</code></td>
                      <td>更新属性</td>
                      <td>属性变化时</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="implementation">
            <h3>实现示例：Canvas渲染器</h3>
            <div class="code-tabs">
              <div class="tab-buttons">
                <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }"
                  @click="activeTab = index">
                  {{ tab.label }}
                </button>
              </div>
              <div class="tab-content">
                <div v-if="activeTab === 0" class="code-block">
                  <pre>// 创建Canvas元素
function createElement(type) {
  if (type === 'canvas') {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    return {
      canvas,
      ctx: canvas.getContext('2d')
    };
  }
  return null;
}

// 插入节点
function insert(child, parent) {
  if (child.canvas && parent.canvas) {
    // 在父Canvas上绘制子元素
    parent.ctx.drawImage(child.canvas, 0, 0);
  }
}

// 更新属性
function patchProp(el, key, prevValue, nextValue) {
  if (key === 'fillStyle') {
    el.ctx.fillStyle = nextValue;
  } else if (key === 'font') {
    el.ctx.font = nextValue;
  }
  // 其他属性处理...
}</pre>
                </div>

                <div v-if="activeTab === 1" class="code-block">
                  <pre>// 创建文本节点
function createText(text) {
  return {
    type: 'text',
    text
  };
}

// 绘制矩形组件
const Rectangle = {
  render() {
    return h('rect', {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      fillStyle: this.color
    });
  },
  props: ['x', 'y', 'width', 'height', 'color']
};

// 绘制文本组件
const Text = {
  render() {
    return h('text', {
      text: this.content,
      x: this.x,
      y: this.y,
      font: this.font,
      fillStyle: this.color
    }, this.content);
  },
  props: ['content', 'x', 'y', 'font', 'color']
};</pre>
                </div>

                <div v-if="activeTab === 2" class="code-block">
                  <pre>// 创建自定义渲染器
const { createApp } = createRenderer({
  createElement,
  createText,
  patchProp,
  insert,
  remove: () => {} // 简化实现
});

// 创建Vue应用
const app = createApp({
  render() {
    return h('canvas', null, [
      h(Rectangle, {
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        color: 'blue'
      }),
      h(Text, {
        content: 'Hello Canvas!',
        x: 150,
        y: 175,
        font: '24px Arial',
        color: 'white'
      })
    ]);
  }
});

// 挂载到Canvas容器
const container = document.getElementById('canvas-container');
app.mount(container);</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 使用场景 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🚀</span> 使用场景与应用</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="scenarios">
            <div class="scenario-card">
              <div class="scenario-header">
                <div class="scenario-icon">🎮</div>
                <h3>Canvas/WebGL渲染</h3>
              </div>
              <div class="scenario-content">
                <ul>
                  <li>使用Vue组件化方式构建游戏UI</li>
                  <li>创建复杂的数据可视化组件</li>
                  <li>构建交互式图形编辑器</li>
                </ul>
                <div class="example">
                  <h4>实际应用：</h4>
                  <p>Vue-Konva：基于Konva的Canvas渲染库</p>
                  <p>TroisJS：Vue 3的Three.js渲染器</p>
                </div>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-header">
                <div class="scenario-icon">📱</div>
                <h3>原生应用渲染</h3>
              </div>
              <div class="scenario-content">
                <ul>
                  <li>在React Native中渲染Vue组件</li>
                  <li>构建跨平台原生应用</li>
                  <li>创建小程序框架</li>
                </ul>
                <div class="example">
                  <h4>实际应用：</h4>
                  <p>Weex：阿里巴巴的跨平台移动框架</p>
                  <p>NativeScript-Vue：使用Vue构建原生应用</p>
                </div>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-header">
                <div class="scenario-icon">🖨️</div>
                <h3>服务端渲染扩展</h3>
              </div>
              <div class="scenario-content">
                <ul>
                  <li>生成PDF文档</li>
                  <li>创建电子邮件模板</li>
                  <li>输出纯文本格式（如终端输出）</li>
                </ul>
                <div class="example">
                  <h4>实际应用：</h4>
                  <p>Vue PDF Renderer：生成PDF文档</p>
                  <p>Vue Terminal：终端界面渲染器</p>
                </div>
              </div>
            </div>

            <div class="scenario-card">
              <div class="scenario-header">
                <div class="scenario-icon">🧪</div>
                <h3>测试与无头渲染</h3>
              </div>
              <div class="scenario-content">
                <ul>
                  <li>创建无头组件测试环境</li>
                  <li>实现组件截图测试</li>
                  <li>构建自定义测试工具</li>
                </ul>
                <div class="example">
                  <h4>实际应用：</h4>
                  <p>Vue Testing Library：组件测试工具</p>
                  <p>自定义测试渲染器</p>
                </div>
              </div>
            </div>
          </div>

          <div class="comparison">
            <h3>自定义渲染器 vs 普通组件</h3>
            <div class="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>自定义渲染器</th>
                    <th>普通Vue组件</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>渲染目标</td>
                    <td>任意目标（Canvas, Native, Terminal）</td>
                    <td>仅限DOM</td>
                  </tr>
                  <tr>
                    <td>抽象级别</td>
                    <td>底层渲染控制</td>
                    <td>高级组件抽象</td>
                  </tr>
                  <tr>
                    <td>性能开销</td>
                    <td>取决于实现，可高度优化</td>
                    <td>DOM操作开销</td>
                  </tr>
                  <tr>
                    <td>使用复杂度</td>
                    <td>高（需要实现渲染逻辑）</td>
                    <td>低（开箱即用）</td>
                  </tr>
                  <tr>
                    <td>适用场景</td>
                    <td>特殊渲染需求、非DOM环境</td>
                    <td>常规Web应用</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">🌟</span> 最佳实践与技巧</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="practices">
            <div class="practice-card">
              <div class="practice-header">
                <h3>性能优化</h3>
              </div>
              <div class="practice-content">
                <ul>
                  <li><strong>批处理操作：</strong> 合并多次渲染更新</li>
                  <li><strong>脏检查：</strong> 仅更新变化的元素</li>
                  <li><strong>重用资源：</strong> 对象池、缓存纹理</li>
                  <li><strong>离屏渲染：</strong> 复杂元素预渲染</li>
                </ul>
                <div class="code-snippet">
                  <pre>// 批处理示例
let updateQueue = [];
let isPending = false;

function queueUpdate(fn) {
  updateQueue.push(fn);
  if (!isPending) {
    isPending = true;
    requestAnimationFrame(() => {
      const queue = updateQueue.slice();
      updateQueue = [];
      isPending = false;
      queue.forEach(fn => fn());
    });
  }
}</pre>
                </div>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-header">
                <h3>组件设计</h3>
              </div>
              <div class="practice-content">
                <ul>
                  <li><strong>声明式API：</strong> 保持Vue的声明式特性</li>
                  <li><strong>Props设计：</strong> 使用Vue的props验证</li>
                  <li><strong>插槽支持：</strong> 实现作用域插槽</li>
                  <li><strong>生命周期：</strong> 映射Vue生命周期到渲染环境</li>
                </ul>
                <div class="code-snippet">
                  <pre>// 组件生命周期映射
function onMounted(fn) {
  // 在渲染环境中的挂载完成后调用
  // ...
}

function onUpdated(fn) {
  // 在渲染环境更新后调用
  // ...
}</pre>
                </div>
              </div>
            </div>

            <div class="practice-card">
              <div class="practice-header">
                <h3>开发工具集成</h3>
              </div>
              <div class="practice-content">
                <ul>
                  <li><strong>Devtools支持：</strong> 实现自定义检查器</li>
                  <li><strong>调试工具：</strong> 创建可视化调试面板</li>
                  <li><strong>性能监控：</strong> 集成性能分析</li>
                </ul>
                <div class="code-snippet">
                  <pre>// 注册自定义渲染器到Devtools
app.config.globalProperties.__VUE_RENDERER__ = 'MyCustomRenderer';

// 在Devtools中显示自定义信息
const inspector = {
  id: 'my-renderer-inspector',
  label: 'My Renderer',
  icon: 'grid',
  // ...
};</pre>
                </div>
              </div>
            </div>
          </div>

          <div class="limitations">
            <h3>限制与注意事项</h3>
            <div class="limitations-grid">
              <div class="limitation">
                <div class="limitation-icon">⚠️</div>
                <div class="limitation-content">
                  <h4>不完全兼容</h4>
                  <p>部分DOM特性（如事件冒泡）需要手动实现</p>
                </div>
              </div>

              <div class="limitation">
                <div class="limitation-icon">🧠</div>
                <div class="limitation-content">
                  <h4>学习曲线</h4>
                  <p>需要深入理解Vue渲染机制和虚拟DOM</p>
                </div>
              </div>

              <div class="limitation">
                <div class="limitation-icon">🔌</div>
                <div class="limitation-content">
                  <h4>插件兼容性</h4>
                  <p>依赖DOM的Vue插件可能需要适配</p>
                </div>
              </div>

              <div class="limitation">
                <div class="limitation-icon">⚡</div>
                <div class="limitation-content">
                  <h4>性能调优</h4>
                  <p>需要针对特定环境进行性能优化</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 总结 -->
      <section class="section">
        <div class="section-header">
          <h2><span class="icon">📝</span> 总结</h2>
          <div class="divider"></div>
        </div>
        <div class="section-content">
          <div class="conclusion">
            <div class="key-points">
              <h3>核心价值</h3>
              <ul>
                <li>🚀 <strong>扩展渲染能力：</strong> 突破DOM限制，渲染到任意目标</li>
                <li>🧩 <strong>复用Vue生态：</strong> 在非Web环境中使用Vue的强大功能</li>
                <li>⚡ <strong>性能优化：</strong> 针对特定环境优化渲染性能</li>
                <li>🛠️ <strong>创新应用：</strong> 创建全新类型的应用和框架</li>
              </ul>
            </div>

            <div class="resources">
              <h3>学习资源</h3>
              <div class="resource-list">
                <a href="https://vuejs.org/api/custom-renderer.html" target="_blank">
                  <div class="resource-icon">📘</div>
                  <div class="resource-content">
                    <h4>Vue官方文档</h4>
                    <p>Custom Renderer API</p>
                  </div>
                </a>

                <a href="https://github.com/vuejs/vue-next/tree/master/packages/runtime-test" target="_blank">
                  <div class="resource-icon">💻</div>
                  <div class="resource-content">
                    <h4>Vue测试渲染器</h4>
                    <p>官方测试渲染器实现</p>
                  </div>
                </a>

                <a href="https://github.com/troisjs/trois" target="_blank">
                  <div class="resource-icon">🎮</div>
                  <div class="resource-content">
                    <h4>TroisJS</h4>
                    <p>Three.js Vue渲染器</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a href="https://vuejs.org" target="_blank">Vue官方文档</a>
          <a href="https://github.com/vuejs/core" target="_blank">Vue源码</a>
          <a href="https://github.com/troisjs/trois" target="_blank">TroisJS案例</a>
        </div>
        <p> Vue高级渲染技术 | 自定义渲染器开发指南</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 代码标签页状态
const activeTab = ref(0);
const tabs = [
  { label: '渲染方法' },
  { label: '组件定义' },
  { label: '应用创建' }
];
</script>

<style lang="less" scoped>
@primary: #42b983;
@dark-primary: #339c6f;
@secondary: #2c3e50;
@accent: #4a6cf7;
@light-bg: #f8f9fa;
@border: #e1e4e8;
@text: #2c3e50;
@code-bg: #f5f7fa;
@canvas-renderer: #4a6cf7;
@native-renderer: #ff6b6b;
@server-renderer: #1dd1a1;

.custom-renderer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: @text;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, @primary 0%, darken(@primary, 15%) 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  color: white;
  padding: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '🎨';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 6rem;
    opacity: 0.1;
    transform: rotate(25deg);
  }

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    position: relative;
    z-index: 2;

    .logo-container {
      margin-right: 20px;

      .logo {
        width: 80px;
        height: 80px;
        background: white;
        color: @dark-primary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        box-shadow: 0 5px 15px rgba(66, 185, 131, 0.5);
      }
    }

    .title-container {
      h1 {
        font-size: 2.5rem;
        margin: 0 0 10px 0;
        font-weight: 700;
      }

      .subtitle {
        font-size: 1.2rem;
        opacity: 0.9;
        margin: 0;
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    padding: 20px;
    position: relative;
    z-index: 2;

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: 2.2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 5px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.8;
      }
    }
  }
}

.section {
  margin-bottom: 50px;
  background: @light-bg;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  .section-header {
    margin-bottom: 30px;

    h2 {
      font-size: 1.8rem;
      margin: 0;
      display: flex;
      align-items: center;

      .icon {
        margin-right: 15px;
        font-size: 1.5rem;
      }
    }

    .divider {
      height: 3px;
      width: 80px;
      background: @primary;
      margin-top: 15px;
      border-radius: 3px;
    }
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .concept-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .concept-icon {
      font-size: 2.5rem;
      margin-right: 15px;
    }

    h3 {
      margin: 0;
      font-size: 1.6rem;
    }
  }

  p,
  ol,
  ul {
    margin: 0 0 15px 0;
  }

  ol,
  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.architecture {
  margin-top: 40px;

  h3 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 30px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 3px;
      background: @primary;
      border-radius: 3px;
    }
  }
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.layer {
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;

  &.target-layer {
    background: linear-gradient(135deg, lighten(@primary, 40%) 0%, lighten(@accent, 40%) 100%);
  }

  .layer-title {
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: @dark-primary;
  }

  .layer-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;

    .item {
      background: @light-bg;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 0.9rem;
    }
  }
}

.layer-arrow {
  font-size: 1.5rem;
  color: @primary;
  padding: 10px 0;
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.api-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .api-header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(@accent, 0.05);

    h3 {
      margin: 0;
      font-size: 1.4rem;
    }

    .api-icon {
      font-size: 2rem;
    }
  }

  .api-content {
    padding: 20px;

    p {
      margin-top: 0;
    }
  }
}

.api-methods {
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border;
  }

  th {
    background: @light-bg;
    font-weight: 600;
  }

  tr:last-child td {
    border-bottom: none;
  }

  code {
    background: @code-bg;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
}

.implementation {
  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border;
  }
}

.code-tabs {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .tab-buttons {
    display: flex;
    background: @light-bg;
    border-bottom: 1px solid @border;

    button {
      padding: 12px 20px;
      background: none;
      border: none;
      font-family: inherit;
      font-size: 1rem;
      cursor: pointer;
      position: relative;

      &.active {
        font-weight: 600;
        color: @primary;

        &::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background: @primary;
        }
      }
    }
  }

  .tab-content {
    padding: 20px;
  }
}

.code-block {
  background: @code-bg;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;

  pre {
    margin: 0;
    font-family: 'Fira Code', monospace;
    line-height: 1.5;
    font-size: 0.9rem;
  }
}

.scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .scenario-header {
    padding: 20px;
    display: flex;
    align-items: center;
    background: rgba(@primary, 0.05);

    .scenario-icon {
      font-size: 2rem;
      margin-right: 15px;
      width: 50px;
      height: 50px;
      background: @light-bg;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      margin: 0;
      font-size: 1.4rem;
    }
  }

  .scenario-content {
    padding: 20px;

    ul {
      padding-left: 20px;
      margin-bottom: 20px;

      li {
        margin-bottom: 10px;
      }
    }

    .example {
      background: @light-bg;
      border-radius: 8px;
      padding: 15px;

      h4 {
        margin-top: 0;
        color: @primary;
      }
    }
  }
}

.comparison {
  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
  }
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border;
    }

    th {
      background: @primary;
      color: white;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: @light-bg;
    }

    tr:last-child td {
      border-bottom: none;
    }
  }
}

.practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.practice-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  .practice-header {
    border-bottom: 1px solid @border;
    padding-bottom: 15px;
    margin-bottom: 20px;

    h3 {
      margin: 0;
      font-size: 1.5rem;
      color: @primary;
    }
  }

  ul {
    padding-left: 20px;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.limitations {
  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
  }
}

.limitations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.limitation {
  display: flex;
  align-items: flex-start;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  .limitation-icon {
    font-size: 1.8rem;
    margin-right: 15px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 8px;
  }
}

.conclusion {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.key-points {
  ul {
    padding-left: 20px;

    li {
      margin-bottom: 15px;
      padding-left: 40px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(@primary, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
    }
  }
}

.resources {
  h3 {
    margin-top: 0;
    text-align: center;
    margin-bottom: 25px;
  }
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

a {
  text-decoration: none;
  color: inherit;
}

.resource-link {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  .resource-icon {
    font-size: 1.8rem;
    margin-right: 15px;
    width: 50px;
    height: 50px;
    background: @light-bg;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    margin: 0 0 5px 0;
    color: @primary;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
  }
}

.code-snippet {
  background: @code-bg;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  border-left: 3px solid @primary;
  overflow-x: auto;

  pre {
    margin: 0;
    line-height: 1.5;
  }
}

.footer {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid @border;

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    a {
      color: @primary;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin: 0;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;

    .logo-container {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  .conclusion {
    grid-template-columns: 1fr;
  }
}
</style>
