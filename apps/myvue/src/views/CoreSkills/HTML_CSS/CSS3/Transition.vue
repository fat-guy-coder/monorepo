<template>
  <div class="transition-container">
    <header class="header">
      <h1>CSS <span class="highlight">Transition</span> 动画</h1>
      <p class="subtitle">创建流畅的CSS过渡效果，提升用户体验</p>
    </header>

    <div class="content">
      <section class="card intro">
        <div class="intro-content">
          <div class="intro-text">
            <h2>什么是 CSS Transition？</h2>
            <p>CSS Transition 是一种在属性值发生变化时创建平滑动画效果的机制。它允许你在状态改变时定义过渡效果，而不是瞬间变化。</p>

            <div class="key-benefits">
              <div class="benefit">
                <div class="icon">🚀</div>
                <h3>性能优化</h3>
                <p>硬件加速，高效流畅</p>
              </div>
              <div class="benefit">
                <div class="icon">🎨</div>
                <h3>简洁优雅</h3>
                <p>几行代码实现复杂动画</p>
              </div>
              <div class="benefit">
                <div class="icon">🔄</div>
                <h3>状态过渡</h3>
                <p>元素状态变化的平滑过渡</p>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <div class="transition-visual">
              <div class="box" :class="{ active: transitionActive }" @click="toggleTransition">
                <span>{{ transitionActive ? '结束' : '开始' }}过渡</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card api">
        <h2>Transition API 与参数</h2>
        <div class="api-content">
          <div class="css-api">
            <h3>CSS Transition 属性</h3>
            <div class="property-table">
              <table>
                <thead>
                  <tr>
                    <th>属性</th>
                    <th>描述</th>
                    <th>可选值</th>
                    <th>默认值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>transition-property</code></td>
                    <td>指定应用过渡的CSS属性</td>
                    <td>all, none, 或特定属性名</td>
                    <td>all</td>
                  </tr>
                  <tr>
                    <td><code>transition-duration</code></td>
                    <td>过渡动画持续时间</td>
                    <td>时间值 (s 或 ms)</td>
                    <td>0s</td>
                  </tr>
                  <tr>
                    <td><code>transition-timing-function</code></td>
                    <td>过渡的时间曲线</td>
                    <td>ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier()</td>
                    <td>ease</td>
                  </tr>
                  <tr>
                    <td><code>transition-delay</code></td>
                    <td>过渡开始前的延迟时间</td>
                    <td>时间值 (s 或 ms)</td>
                    <td>0s</td>
                  </tr>
                  <tr>
                    <td><code>transition</code></td>
                    <td>简写属性</td>
                    <td>[property] [duration] [timing-function] [delay]</td>
                    <td>all 0s ease 0s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="vue-api">
            <h3>Vue Transition 组件</h3>
            <div class="property-table">
              <table>
                <thead>
                  <tr>
                    <th>属性</th>
                    <th>描述</th>
                    <th>可选值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>name</code></td>
                    <td>过渡类名前缀</td>
                    <td>自定义字符串</td>
                  </tr>
                  <tr>
                    <td><code>appear</code></td>
                    <td>初始渲染是否应用过渡</td>
                    <td>Boolean</td>
                  </tr>
                  <tr>
                    <td><code>mode</code></td>
                    <td>过渡模式</td>
                    <td>out-in, in-out</td>
                  </tr>
                  <tr>
                    <td><code>css</code></td>
                    <td>是否使用CSS过渡类</td>
                    <td>Boolean (默认true)</td>
                  </tr>
                  <tr>
                    <td><code>type</code></td>
                    <td>指定过渡事件类型</td>
                    <td>transition, animation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="transition-classes">
          <h3>Vue Transition 类名</h3>
          <div class="classes-diagram">
            <div class="phase enter">
              <div class="phase-title">进入 (Enter)</div>
              <div class="class-name"><code>v-enter-from</code></div>
              <div class="class-name"><code>v-enter-active</code></div>
              <div class="class-name"><code>v-enter-to</code></div>
            </div>
            <div class="arrow">→</div>
            <div class="phase leave">
              <div class="phase-title">离开 (Leave)</div>
              <div class="class-name"><code>v-leave-from</code></div>
              <div class="class-name"><code>v-leave-active</code></div>
              <div class="class-name"><code>v-leave-to</code></div>
            </div>
          </div>
        </div>
      </section>

      <section class="card examples">
        <h2>Transition 使用示例</h2>
        <div class="examples-grid">
          <div class="example">
            <h3>基础淡入淡出</h3>
            <div class="example-content">
              <button @click="showFade = !showFade">切换显示</button>
              <transition name="fade">
                <div v-if="showFade" class="demo-box fade">淡入淡出效果</div>
              </transition>
            </div>
            <pre class="code-block">/* CSS */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}</pre>
          </div>

          <div class="example">
            <h3>滑动效果</h3>
            <div class="example-content">
              <button @click="showSlide = !showSlide">切换显示</button>
              <transition name="slide">
                <div v-if="showSlide" class="demo-box slide">滑动效果</div>
              </transition>
            </div>
            <pre class="code-block">/* CSS */
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}</pre>
          </div>

          <div class="example">
            <h3>缩放效果</h3>
            <div class="example-content">
              <button @click="showScale = !showScale">切换显示</button>
              <transition name="scale" @before-enter="beforeEnterScale" @after-enter="afterEnterScale">
                <div v-if="showScale" class="demo-box scale">缩放效果</div>
              </transition>
            </div>
            <pre class="code-block">/* CSS */
.scale-enter-from, .scale-leave-to {
  transform: scale(0);
  opacity: 0;
}
.scale-enter-active, .scale-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}</pre>
          </div>

          <div class="example">
            <h3>复杂过渡</h3>
            <div class="example-content">
              <button @click="showComplex = !showComplex">切换显示</button>
              <transition name="complex" mode="out-in">
                <div v-if="showComplex" key="a" class="demo-box complex">状态A</div>
                <div v-else key="b" class="demo-box complex">状态B</div>
              </transition>
            </div>
            <pre class="code-block">/* CSS */
.complex-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.complex-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.complex-enter-active, .complex-leave-active {
  transition: all 0.5s ease;
}
.complex-enter-active {
  transition-delay: 0.2s;
}</pre>
          </div>
        </div>
      </section>

      <section class="card use-cases">
        <h2>Transition 使用场景</h2>
        <div class="scenarios">
          <div class="scenario">
            <div class="scenario-icon">💼</div>
            <h3>UI 状态变化</h3>
            <p>菜单展开/收起、模态框显示/隐藏、选项卡切换</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">📊</div>
            <h3>数据可视化</h3>
            <p>图表变化、数据更新动画、进度条填充</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">📱</div>
            <h3>移动界面</h3>
            <p>页面切换、手势反馈、元素拖拽</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">🔄</div>
            <h3>加载状态</h3>
            <p>骨架屏切换、加载指示器、内容刷新</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">🎮</div>
            <h3>交互反馈</h3>
            <p>按钮点击效果、表单验证、悬停效果</p>
          </div>
          <div class="scenario">
            <div class="scenario-icon">✨</div>
            <h3>视觉引导</h3>
            <p>焦点引导、新功能提示、元素强调</p>
          </div>
        </div>
      </section>

      <section class="card pros-cons">
        <h2>Transition 优缺点</h2>
        <div class="comparison">
          <div class="pros">
            <h3>✅ 优点</h3>
            <ul>
              <li>
                <strong>性能高效</strong>
                <p>浏览器原生支持，硬件加速，性能优于JavaScript动画</p>
              </li>
              <li>
                <strong>简单易用</strong>
                <p>几行CSS代码即可实现复杂动画效果</p>
              </li>
              <li>
                <strong>流畅平滑</strong>
                <p>提供更自然的用户界面过渡效果</p>
              </li>
              <li>
                <strong>响应式友好</strong>
                <p>自动适应不同设备和屏幕尺寸</p>
              </li>
            </ul>
          </div>
          <div class="cons">
            <h3>⚠️ 缺点与限制</h3>
            <ul>
              <li>
                <strong>控制能力有限</strong>
                <p>无法实现复杂的动画序列和逻辑控制</p>
              </li>
              <li>
                <strong>浏览器兼容问题</strong>
                <p>旧版本浏览器需要前缀或替代方案</p>
              </li>
              <li>
                <strong>状态管理困难</strong>
                <p>难以在动画过程中精确控制状态</p>
              </li>
              <li>
                <strong>调试复杂</strong>
                <p>时间曲线和复合动画调试相对困难</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>优先使用 <code>transform</code> 和 <code>opacity</code> 属性，它们不会触发重排</li>
            <li>避免在 <code>transition-property</code> 中使用 <code>all</code>，指定具体属性</li>
            <li>使用 <code>will-change</code> 属性提示浏览器哪些元素将变化</li>
            <li>合理使用 <code>cubic-bezier()</code> 创建自定义缓动函数</li>
            <li>对于复杂动画，结合CSS Animation使用</li>
          </ul>
        </div>
      </section>
    </div>

    <footer class="footer">
      <p>CSS Transition | 创建流畅的用户体验</p>
      <div class="links">
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions"
          target="_blank">MDN 文档</a>
        <a href="https://cubic-bezier.com/" target="_blank">缓动函数生成器</a>
        <a href="https://vuejs.org/guide/built-ins/transition.html" target="_blank">Vue Transition 文档</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const transitionActive = ref(false);
const showFade = ref(true);
const showSlide = ref(true);
const showScale = ref(true);
const showComplex = ref(true);

const toggleTransition = () => {
  transitionActive.value = !transitionActive.value;
};

const beforeEnterScale = (el: Element) => {
  (el as HTMLElement).style.transform = 'scale(0)';
};

const afterEnterScale = (el: Element) => {
  (el as HTMLElement).style.transform = 'scale(1)';
};
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.transition-container {
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fafc;
  color: #334155;
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 12px;
    font-weight: 700;
    color: #1e293b;

    .highlight {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e2e8f0;
    color: #1e293b;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 80px;
      height: 2px;
      background: #3b82f6;
    }
  }
}

.intro {
  .intro-content {
    display: flex;
    gap: 30px;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .intro-text {
    flex: 1;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
      color: #475569;
    }

    .key-benefits {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 30px;

      .benefit {
        text-align: center;
        padding: 25px 15px;
        background: #f0f7ff;
        border-radius: 10px;
        border: 1px solid #dbeafe;
        transition: all 0.3s ease;

        &:hover {
          background: #dbeafe;
          transform: translateY(-5px);
        }

        .icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #1e293b;
        }

        p {
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 0;
        }
      }
    }
  }

  .intro-image {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .transition-visual {
    width: 100%;
    max-width: 400px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f1f5f9;
    border-radius: 12px;
    padding: 20px;

    .box {
      width: 150px;
      height: 150px;
      background: #3b82f6;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      text-align: center;
      transition: all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);

      &.active {
        background: #8b5cf6;
        transform: rotate(360deg) scale(1.2);
        border-radius: 50%;
      }
    }
  }
}

.api {
  .api-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .css-api,
  .vue-api {
    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }
  }

  .property-table {
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }

      th {
        background: #f1f5f9;
        font-weight: 600;
        color: #1e293b;
      }

      tr:hover {
        background: #f8fafc;
      }

      code {
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9rem;
      }
    }
  }

  .transition-classes {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    margin-top: 30px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
      text-align: center;
    }
  }

  .classes-diagram {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    flex-wrap: wrap;

    .phase {
      background: white;
      border-radius: 10px;
      padding: 25px;
      border: 1px solid #e2e8f0;
      min-width: 200px;
      text-align: center;

      .phase-title {
        font-weight: 600;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e2e8f0;
      }
    }

    .enter {
      border-top: 4px solid #10b981;
    }

    .leave {
      border-top: 4px solid #ef4444;
    }

    .class-name {
      background: #f1f5f9;
      padding: 10px;
      margin: 10px 0;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }

    .arrow {
      font-size: 2rem;
      color: #94a3b8;
      font-weight: bold;
    }
  }
}

.examples {
  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .example {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;

    &:hover {
      border-color: #3b82f6;
      box-shadow: 0 6px 15px rgba(59, 130, 246, 0.1);
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 15px;
      color: #1e293b;
    }
  }

  .example-content {
    margin-bottom: 20px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      margin-bottom: 20px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s ease;

      &:hover {
        background: #2563eb;
      }
    }
  }

  .demo-box {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 600;
    text-align: center;
    border-radius: 8px;
  }

  .fade {
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
  }

  .slide {
    background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  }

  .scale {
    background: linear-gradient(135deg, #ec4899, #f472b6);
  }

  .complex {
    background: linear-gradient(135deg, #10b981, #34d399);
  }
}

.use-cases {
  .scenarios {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .scenario {
    background: white;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
      border-color: #3b82f6;
    }

    .scenario-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: #3b82f6;
    }

    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
      color: #1e293b;
    }

    p {
      color: #64748b;
      font-size: 0.95rem;
    }
  }
}

.pros-cons {
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .pros,
  .cons {
    background: #f8fafc;
    border-radius: 10px;
    padding: 25px;
    border: 1px solid #e2e8f0;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid;
    }
  }

  .pros {
    border-top: 4px solid #10b981;

    h3 {
      color: #10b981;
      border-bottom-color: #10b981;
    }
  }

  .cons {
    border-top: 4px solid #ef4444;

    h3 {
      color: #ef4444;
      border-bottom-color: #ef4444;
    }
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;

      &:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      strong {
        display: block;
        font-size: 1.1rem;
        margin-bottom: 8px;
        color: #1e293b;
      }

      p {
        color: #64748b;
        font-size: 0.95rem;
      }
    }
  }

  .best-practices {
    background: #f0f7ff;
    border-radius: 10px;
    padding: 25px;
    border-left: 4px solid #3b82f6;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 20px;
      color: #1e293b;
    }

    ul {
      padding-left: 25px;

      li {
        margin-bottom: 12px;
        position: relative;
        padding-left: 25px;

        &::before {
          content: '•';
          position: absolute;
          left: 10px;
          color: #3b82f6;
          font-weight: bold;
        }
      }
    }

    code {
      background: #e2e8f0;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
  }
}

.code-block {
  background: #1e293b;
  color: #e2e8f0;
  padding: 18px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 15px 0;
  line-height: 1.5;
  border: 1px solid #334155;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px 8px 0 0;
  }
}

.footer {
  text-align: center;
  margin-top: 50px;
  padding: 30px 0;
  border-top: 1px solid #e2e8f0;
  color: #64748b;

  .links {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;

    a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
      position: relative;
      padding: 5px 10px;

      &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 2px;
        background: #3b82f6;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2.2rem;
  }
}

/* Transition 效果样式 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.complex-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.complex-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.complex-enter-active,
.complex-leave-active {
  transition: all 0.5s ease;
}

.complex-enter-active {
  transition-delay: 0.2s;
}
</style>
