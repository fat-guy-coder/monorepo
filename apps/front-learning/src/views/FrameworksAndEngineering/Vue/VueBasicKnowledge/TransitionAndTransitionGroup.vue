<template>
  <div class="transitions-container">
    <header class="header">
      <div class="banner">
        <h1>Vue过渡动画系统</h1>
        <p class="subtitle">深入解析Transition与TransitionGroup组件</p>
      </div>
      <div class="features">
        <div class="feature-card">
          <div class="icon">🎭</div>
          <h3>平滑过渡</h3>
          <p>元素显示/隐藏时的无缝动画</p>
        </div>
        <div class="feature-card">
          <div class="icon">🔄</div>
          <h3>状态切换</h3>
          <p>组件切换时的优雅过渡效果</p>
        </div>
        <div class="feature-card">
          <div class="icon">📋</div>
          <h3>列表动画</h3>
          <p>动态列表项的排序和位置变化动画</p>
        </div>
      </div>
    </header>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">📘</span>
        Transition组件基础
      </h2>

      <div class="card-grid">
        <div class="info-card">
          <h3><span class="highlight">Transition</span>组件是什么？</h3>
          <p>Vue内置的<code>Transition</code>组件用于在元素或组件进入和离开DOM时应用过渡动画效果。</p>
          <p>它可以应用于以下场景：</p>
          <ul>
            <li>条件渲染(v-if)</li>
            <li>条件展示(v-show)</li>
            <li>动态组件</li>
            <li>组件根节点</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>基本结构</h3>
          <div class="code-snippet">
            <pre><code>&lt;Transition name="fade"&gt;
  &lt;div v-if="show"&gt;内容&lt;/div&gt;
&lt;/Transition&gt;</code></pre>
          </div>
          <p>然后添加CSS过渡类：</p>
          <div class="code-snippet">
            <pre><code>.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🎨</span>
        过渡动画类名
      </h2>

      <div class="animation-flow">
        <div class="stage">
          <div class="label">进入动画</div>
          <div class="step">
            <div class="step-label">v-enter-from</div>
            <div class="step-box enter-from">初始状态</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-label">v-enter-active</div>
            <div class="step-box enter-active">过渡过程</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-label">v-enter-to</div>
            <div class="step-box enter-to">最终状态</div>
          </div>
        </div>

        <div class="stage">
          <div class="label">离开动画</div>
          <div class="step">
            <div class="step-label">v-leave-from</div>
            <div class="step-box leave-from">初始状态</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-label">v-leave-active</div>
            <div class="step-box leave-active">过渡过程</div>
          </div>
          <div class="arrow">→</div>
          <div class="step">
            <div class="step-label">v-leave-to</div>
            <div class="step-box leave-to">最终状态</div>
          </div>
        </div>
      </div>

      <div class="note">
        <strong>注意：</strong>如果为<code>Transition</code>组件设置了<code>name</code>属性，类名中的<code>v-</code>将替换为设置的名称前缀
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">⚙️</span>
        Transition高级特性
      </h2>

      <div class="card-grid">
        <div class="info-card">
          <h3>过渡模式</h3>
          <p>处理同时发生的进入和离开动画</p>
          <div class="code-snippet">
            <pre><code>&lt;Transition <span class="highlight">mode="out-in"</span>&gt;
  &lt;component :is="currentComponent"&gt;&lt;/component&gt;
&lt;/Transition&gt;</code></pre>
          </div>
          <p><strong>模式类型：</strong></p>
          <ul>
            <li><code>out-in</code>: 当前元素先离开，然后新元素进入</li>
            <li><code>in-out</code>: 新元素先进入，然后当前元素离开</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>JavaScript钩子</h3>
          <p>使用JavaScript控制动画过程</p>
          <div class="code-snippet">
            <pre><code>&lt;Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
&gt;
  &lt;!-- ... --&gt;
&lt;/Transition&gt;</code></pre>
          </div>
          <p>每个钩子函数接收元素作为参数，<code>enter</code>和<code>leave</code>还有第二个参数<code>done</code>回调</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">📋</span>
        TransitionGroup组件
      </h2>

      <div class="card-grid">
        <div class="info-card">
          <h3>TransitionGroup是什么？</h3>
          <p><code>TransitionGroup</code>是用于管理列表中多个元素的过渡动画的内置组件。</p>
          <p>与<code>Transition</code>的区别：</p>
          <ul>
            <li>处理多个元素而非单个元素</li>
            <li>元素需要唯一的<code>key</code>属性</li>
            <li>默认使用<code>&lt;span&gt;</code>作为容器标签</li>
            <li>提供<code>v-move</code>类处理位置变化</li>
          </ul>
        </div>

        <div class="info-card">
          <h3>基本用法</h3>
          <div class="code-snippet">
            <pre><code>&lt;TransitionGroup name="list" tag="ul"&gt;
  &lt;li v-for="item in items" :key="item.id"&gt;
  &#123;&#123; item.text &#125;&#125;
  &lt;/li&gt;
&lt;/TransitionGroup&gt;</code></pre>
          </div>
          <p>CSS示例：</p>
          <div class="code-snippet">
            <pre><code>.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保离开的元素从布局流中删除 */
.list-leave-active {
  position: absolute;
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">
        <span class="icon">🎯</span>
        最佳实践与技巧
      </h2>

      <div class="tips-grid">
        <div class="tip-card">
          <div class="tip-icon">💡</div>
          <h3>性能优化</h3>
          <ul>
            <li>优先使用CSS过渡而非JavaScript动画</li>
            <li>对复杂动画使用<code>transform</code>和<code>opacity</code>属性</li>
            <li>避免使用<code>box-shadow</code>等高消耗属性</li>
          </ul>
        </div>

        <div class="tip-card">
          <div class="tip-icon">🛠️</div>
          <h3>常见问题解决</h3>
          <ul>
            <li>初始渲染动画：使用<code>appear</code>属性</li>
            <li>动画跳跃：为离开元素设置<code>position: absolute</code></li>
            <li>列表闪烁：确保元素有唯一且稳定的key</li>
          </ul>
        </div>

        <div class="tip-card">
          <div class="tip-icon">🎭</div>
          <h3>动画库集成</h3>
          <ul>
            <li>与Animate.css集成</li>
            <li>使用GreenSock(GSAP)创建复杂动画</li>
            <li>集成Motion One轻量级动画库</li>
          </ul>
        </div>
      </div>

      <div class="integration-example">
        <h3>Animate.css集成示例</h3>
        <div class="code-snippet">
          <pre><code>&lt;Transition
  enter-active-class="animate__animated animate__bounceIn"
  leave-active-class="animate__animated animate__bounceOut"
&gt;
  &lt;div v-if="show"&gt;使用Animate.css&lt;/div&gt;
&lt;/Transition&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h2 class="section-title">
        <span class="icon">⚖️</span>
        Transition vs TransitionGroup
      </h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>特性</th>
              <th>Transition</th>
              <th>TransitionGroup</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>用途</td>
              <td>单个元素的进入/离开动画</td>
              <td>多个元素的列表动画</td>
            </tr>
            <tr>
              <td>DOM结构</td>
              <td>不添加额外DOM元素</td>
              <td>默认包裹在span标签中</td>
            </tr>
            <tr>
              <td>元素要求</td>
              <td>无需特殊要求</td>
              <td>每个元素需要唯一key</td>
            </tr>
            <tr>
              <td>特殊类</td>
              <td>v-enter/leave类</td>
              <td>额外v-move类</td>
            </tr>
            <tr>
              <td>动画模式</td>
              <td>支持mode="out-in/in-out"</td>
              <td>不支持过渡模式</td>
            </tr>
            <tr>
              <td>适用场景</td>
              <td>模态框、标签切换、条件渲染</td>
              <td>列表排序、增删动画、网格布局变化</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="resources-section">
      <h2 class="section-title">
        <span class="icon">📚</span>
        学习资源
      </h2>

      <div class="resources-grid">
        <a href="https://vuejs.org/guide/built-ins/transition.html" target="_blank" class="resource-card">
          <div class="doc-icon">📘</div>
          <h3>官方文档</h3>
          <p>Vue Transition指南</p>
        </a>

        <a href="https://animate.style/" target="_blank" class="resource-card">
          <div class="animate-icon">🎭</div>
          <h3>Animate.css</h3>
          <p>即用型CSS动画库</p>
        </a>

        <a href="https://greensock.com/gsap/" target="_blank" class="resource-card">
          <div class="gsap-icon">🟢</div>
          <h3>GSAP</h3>
          <p>专业级JavaScript动画</p>
        </a>

        <a href="https://motion.dev/" target="_blank" class="resource-card">
          <div class="motion-icon">⚡</div>
          <h3>Motion One</h3>
          <p>轻量高性能动画库</p>
        </a>
      </div>
    </div>

    <footer class="conclusion">
      <div class="summary">
        <h2>Vue过渡动画核心要点</h2>
        <p>Vue的<code>Transition</code>和<code>TransitionGroup</code>组件为创建平滑的用户体验提供了强大支持：</p>
        <ul>
          <li>使用预设CSS类名轻松实现基本过渡效果</li>
          <li>JavaScript钩子提供完整的动画控制能力</li>
          <li>过渡模式解决组件切换的动画协调问题</li>
          <li><code>TransitionGroup</code>专门处理动态列表的排序和位置变化</li>
          <li>可与主流CSS/JS动画库无缝集成</li>
        </ul>
      </div>

      <div class="callout">
        <p>合理使用过渡动画可以显著提升用户体验，但要注意：</p>
        <p class="highlight">动画应该增强而非干扰用户交互</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 示例逻辑仅用于演示
import { ref } from 'vue';

const show = ref(true);
const currentComponent = ref('ComponentA');
const items = ref([
  { id: 1, text: '项目 1' },
  { id: 2, text: '项目 2' },
  { id: 3, text: '项目 3' }
]);

// 示例方法
const toggleShow = () => {
  show.value = !show.value;
};

const addItem = () => {
  const newId = Math.max(0, ...items.value.map(i => i.id)) + 1;
  items.value.push({ id: newId, text: `项目 ${newId}` });
};

const removeItem = (id: number) => {
  items.value = items.value.filter(item => item.id !== id);
};
</script>

<style lang="less" scoped>
@font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
@primary-color: #42b983;
@secondary-color: #35495e;
@text-primary: #2c3e50;
@text-secondary: #5c677d;
@border-color: #e1e4e8;
@background-light: #f8f9fa;
@card-bg: #ffffff;
@enter-color: #42b983;
@leave-color: #ff6b6b;
@move-color: #3498db;
@warning-color: #ff9800;

.transitions-container {
  font-family: @font-family;
  max-width: 1200px;
  margin: 0 auto;
  padding: 25px;
  background-color: @background-light;
  color: @text-primary;
  line-height: 1.6;
}

.header {
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 35px;
  border: 1px solid fade(@primary-color, 15%);

  .banner {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 15px;
      color: @text-primary;
    }

    .subtitle {
      font-size: 1.3rem;
      color: @text-secondary;
      max-width: 700px;
      margin: 0 auto;
    }
  }

  .features {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;

    .feature-card {
      flex: 1;
      min-width: 200px;
      background: rgba(255, 255, 255, 0.7);
      padding: 20px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      .icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 10px;
        color: darken(@primary-color, 15%);
      }

      p {
        margin: 0;
        color: @text-secondary;
        font-size: 0.95rem;
      }
    }
  }
}

.section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.7rem;
    margin-top: 0;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid fade(@primary-color, 10%);
    display: flex;
    align-items: center;
    gap: 12px;

    .icon {
      font-size: 1.5rem;
    }
  }
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.info-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;

  h3 {
    margin-top: 0;
    color: @secondary-color;
    font-size: 1.3rem;

    .highlight {
      color: @primary-color;
      font-weight: 600;
    }
  }

  p {
    color: @text-secondary;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
      position: relative;

      &::before {
        content: "•";
        position: absolute;
        left: -15px;
        color: @primary-color;
      }
    }
  }
}

.tip-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid @border-color;

  .tip-icon {
    font-size: 2rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    margin-top: 0;
    color: @secondary-color;
    font-size: 1.3rem;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 10px;
    }
  }
}

.animation-flow {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .stage {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;

    .label {
      width: 100px;
      font-weight: 600;
      font-size: 1.1rem;
      color: @secondary-color;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;

      .step-label {
        font-size: 0.85rem;
        margin-bottom: 10px;
        padding: 5px 10px;
        background: fade(@primary-color, 10%);
        border-radius: 30px;
        font-family: monospace;
      }

      .step-box {
        width: 100px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .enter-from {
        background: fade(@enter-color, 15%);
        border: 2px solid fade(@enter-color, 30%);
      }

      .enter-active {
        background: fade(@enter-color, 25%);
        border: 2px solid fade(@enter-color, 40%);
      }

      .enter-to {
        background: fade(@enter-color, 35%);
        border: 2px solid fade(@enter-color, 50%);
      }

      .leave-from {
        background: fade(@leave-color, 15%);
        border: 2px solid fade(@leave-color, 30%);
      }

      .leave-active {
        background: fade(@leave-color, 25%);
        border: 2px solid fade(@leave-color, 40%);
      }

      .leave-to {
        background: fade(@leave-color, 35%);
        border: 2px solid fade(@leave-color, 50%);
      }
    }

    .arrow {
      font-size: 1.8rem;
      opacity: 0.7;
    }
  }
}

.note {
  background: fade(@warning-color, 8%);
  border-left: 4px solid @warning-color;
  padding: 15px;
  border-radius: 0 8px 8px 0;
  margin-top: 25px;
  font-size: 0.95rem;
}

.code-snippet {
  background: #282c34;
  color: #abb2bf;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  overflow-x: auto;
  margin: 15px 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);

  code {
    display: block;

    .highlight {
      color: #e06c75;
      font-weight: bold;
    }
  }
}

.comparison-section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.comparison-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th,
    td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid @border-color;
    }

    th {
      background-color: fade(@primary-color, 8%);
      color: @secondary-color;
      font-weight: 600;
    }

    tr {
      &:hover {
        background-color: fade(@primary-color, 3%);
      }
    }
  }
}

.resources-section {
  background: @card-bg;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  .resource-card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid @border-color;
    text-decoration: none;
    color: inherit;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .doc-icon,
    .animate-icon,
    .gsap-icon,
    .motion-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .doc-icon {
      color: #42b983;
    }

    .animate-icon {
      color: #e06c75;
    }

    .gsap-icon {
      color: #88c040;
    }

    .motion-icon {
      color: #3498db;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 1.3rem;
    }

    p {
      margin: 0;
      color: @text-secondary;
      font-size: 0.95rem;
    }
  }
}

.conclusion {
  background: linear-gradient(135deg, fade(@primary-color, 8%), fade(@primary-color, 4%));
  border-radius: 16px;
  padding: 35px;
  border: 1px solid fade(@primary-color, 15%);

  .summary {
    max-width: 800px;
    margin: 0 auto;

    h2 {
      text-align: center;
      font-size: 1.8rem;
      margin-top: 0;
      margin-bottom: 25px;
      color: @secondary-color;
    }

    ul {
      padding-left: 20px;

      li {
        margin-bottom: 15px;
        padding-left: 10px;
        position: relative;

        &::before {
          content: "•";
          position: absolute;
          left: -10px;
          color: @primary-color;
          font-weight: bold;
        }
      }
    }
  }

  .callout {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    padding: 20px;
    margin-top: 30px;
    text-align: center;

    p {
      margin: 10px 0;
      font-size: 1.1rem;
    }

    .highlight {
      font-size: 1.3rem;
      font-weight: 600;
      color: @primary-color;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    padding: 20px 15px;

    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }

    .features {
      flex-direction: column;

      .feature-card {
        min-width: 100%;
        margin-bottom: 15px;
      }
    }
  }

  .section {
    padding: 20px 15px;

    .section-title {
      font-size: 1.5rem;
    }
  }

  .animation-flow {
    .stage {
      flex-direction: column;

      .arrow {
        transform: rotate(90deg);
        margin: 15px 0;
      }
    }
  }
}
</style>
