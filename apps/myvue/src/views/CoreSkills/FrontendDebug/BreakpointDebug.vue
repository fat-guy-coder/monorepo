<template>
  <div class="debugger-guide">
    <header class="header">
      <h1>前端断点调试基本介绍</h1>
      <p>深入理解调试技巧，提升开发效率</p>
      <div class="browser-icons">
        <div v-for="browser in browsers" :key="browser.name" class="browser-icon">
          <i :class="browser.icon" />
          <span>{{ browser.name }}</span>
        </div>
      </div>
    </header>

    <div class="content-container">
      <aside class="sidebar">
        <nav>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`" @click.prevent="scrollTo(section.id)"
                :class="{ active: activeSection === section.id }">
                {{ section.title }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="main-content">
        <section id="introduction" class="section">
          <h2>什么是断点调试？</h2>
          <p>断点调试是开发过程中定位和修复代码问题的重要技术。通过在代码中设置断点，开发者可以暂停代码执行，检查变量状态，单步执行代码，从而深入理解代码执行流程。</p>

          <div class="analogy">
            <div class="analogy-icon">
              <i class="fas fa-microscope"></i>
            </div>
            <div class="analogy-content">
              <h3>调试就像显微镜</h3>
              <p>断点调试允许开发者像使用显微镜一样深入观察代码执行过程，查看变量在特定时刻的值，跟踪函数调用栈，从而精确定位问题所在。</p>
            </div>
          </div>
        </section>

        <section id="methods" class="section">
          <h2>断点调试方法</h2>

          <div class="method-cards">
            <div class="method-card">
              <div class="method-header">
                <i class="fas fa-code"></i>
                <h3>1. 源代码断点</h3>
              </div>
              <p>在浏览器开发者工具的Sources面板中，直接点击行号设置断点。</p>
              <div class="code-snippet">
                <pre><code>function calculateTotal(items) {
  let total = 0;
  // 点击左侧行号设置断点
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}</code></pre>
              </div>
            </div>

            <div class="method-card">
              <div class="method-header">
                <i class="fas fa-terminal"></i>
                <h3>2. debugger语句</h3>
              </div>
              <p>在代码中直接插入<code>debugger;</code>语句，当开发者工具打开时会自动暂停。</p>
              <div class="code-snippet">
                <pre><code>function processUserData(user) {
  debugger; // 执行到这里会暂停
  const profile = buildProfile(user);
  // ...
}</code></pre>
              </div>
            </div>

            <div class="method-card">
              <div class="method-header">
                <i class="fas fa-mouse-pointer"></i>
                <h3>3. 事件监听断点</h3>
              </div>
              <p>在开发者工具的Sources面板右侧，可以设置特定事件（点击、键盘等）的断点。</p>
              <ul>
                <li>Mouse events (click, dblclick, etc.)</li>
                <li>Keyboard events (keydown, keyup)</li>
                <li>XHR/Fetch 请求</li>
              </ul>
            </div>
          </div>

          <div class="controls">
            <h3>调试控制按钮</h3>
            <div class="control-icons">
              <div v-for="control in debugControls" :key="control.name" class="control-icon">
                <i :class="control.icon"></i>
                <span>{{ control.name }}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="scenarios" class="section">
          <h2>使用场景</h2>

          <div class="scenario-grid">
            <div class="scenario">
              <div class="scenario-icon error">
                <i class="fas fa-bug"></i>
              </div>
              <h3>定位运行时错误</h3>
              <p>当代码抛出异常时，在调用栈中设置断点，追踪错误根源。</p>
            </div>

            <div class="scenario">
              <div class="scenario-icon logic">
                <i class="fas fa-project-diagram"></i>
              </div>
              <h3>理解复杂逻辑</h3>
              <p>在复杂函数或算法中设置断点，观察每一步执行结果。</p>
            </div>

            <div class="scenario">
              <div class="scenario-icon async">
                <i class="fas fa-sync-alt"></i>
              </div>
              <h3>调试异步代码</h3>
              <p>在Promise、async/await、setTimeout等异步操作前后设置断点。</p>
            </div>

            <div class="scenario">
              <div class="scenario-icon data">
                <i class="fas fa-database"></i>
              </div>
              <h3>跟踪数据流</h3>
              <p>在数据变更的关键位置设置断点，观察数据如何流转和处理。</p>
            </div>
          </div>

          <div class="advanced-section">
            <h3>高级调试场景</h3>
            <div class="advanced-cards">
              <div class="advanced-card">
                <h4>条件断点</h4>
                <p>右键点击断点 → 编辑断点 → 添加条件表达式</p>
                <div class="code-snippet small">
                  <pre><code>// 仅当userId为admin时暂停
userId === 'admin'</code></pre>
                </div>
              </div>
              <div class="advanced-card">
                <h4>日志点</h4>
                <p>右键点击行号 → 添加日志点，输出变量值而不暂停执行</p>
                <div class="code-snippet small">
                  <pre><code>计算价格: {price}, 数量: {quantity}, 总计: {price*quantity}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pros-cons" class="section">
          <h2>优缺点分析</h2>

          <div class="comparison">
            <div class="pros">
              <h3><i class="fas fa-check-circle"></i> 优点</h3>
              <ul>
                <li><strong>精确诊断问题</strong> - 直接观察代码执行状态</li>
                <li><strong>节省时间</strong> - 比console.log更高效定位问题</li>
                <li><strong>深入理解</strong> - 了解代码执行流程和数据变化</li>
                <li><strong>交互式调试</strong> - 实时修改变量值测试不同场景</li>
                <li><strong>调用栈分析</strong> - 查看函数调用层次关系</li>
              </ul>
            </div>

            <div class="cons">
              <h3><i class="fas fa-exclamation-circle"></i> 缺点</h3>
              <ul>
                <li><strong>学习曲线</strong> - 初学者需要时间掌握调试工具</li>
                <li><strong>开发环境依赖</strong> - 需要浏览器开发者工具</li>
                <li><strong>生产环境限制</strong> - 难以在生产环境调试</li>
                <li><strong>异步调试复杂</strong> - 异步代码调试相对困难</li>
                <li><strong>可能遗漏问题</strong> - 断点设置不当可能错过某些执行路径</li>
              </ul>
            </div>
          </div>

          <div class="best-practices">
            <h3>最佳实践</h3>
            <ol>
              <li>结合使用断点和console.log进行调试</li>
              <li>使用条件断点减少不必要的暂停</li>
              <li>调试完成后移除所有debugger语句</li>
              <li>利用"跳过"功能避免进入第三方库代码</li>
              <li>使用Source Maps调试压缩后的代码</li>
            </ol>
          </div>
        </section>

        <section class="section conclusion">
          <h2>总结</h2>
          <p>断点调试是现代前端开发不可或缺的核心技能。通过掌握各种调试技巧，开发者可以快速定位问题、理解复杂代码逻辑并验证解决方案。</p>
          <p>虽然断点调试有学习曲线，但投入时间学习这些技能将在长期开发中带来巨大的效率提升。</p>
          <div class="tip-box">
            <i class="fas fa-lightbulb"></i>
            <p>建议：每周花30分钟探索开发者工具的新功能，逐步提升调试技能</p>
          </div>
        </section>
      </main>
    </div>

    <footer class="footer">
      <p>前端断点调试指南 | 使用Vue3 + TypeScript实现</p>
      <p>© 2023 前端开发工具集</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 浏览器支持列表
const browsers = ref([
  { name: 'Chrome', icon: 'fab fa-chrome' },
  { name: 'Firefox', icon: 'fab fa-firefox' },
  { name: 'Edge', icon: 'fab fa-edge' },
  { name: 'Safari', icon: 'fab fa-safari' }
]);

// 调试控制按钮
const debugControls = ref([
  { name: '继续执行', icon: 'fas fa-play' },
  { name: '跳过函数', icon: 'fas fa-arrow-right' },
  { name: '进入函数', icon: 'fas fa-arrow-down' },
  { name: '跳出函数', icon: 'fas fa-arrow-up' }
]);

// 导航部分
const sections = ref([
  { id: 'introduction', title: '简介' },
  { id: 'methods', title: '调试方法' },
  { id: 'scenarios', title: '使用场景' },
  { id: 'pros-cons', title: '优缺点分析' }
]);

const activeSection = ref('introduction');

// 滚动监听
const handleScroll = () => {
  const sectionElements = sections.value.map(s =>
    document.getElementById(s.id)
  ).filter(Boolean) as HTMLElement[];

  const scrollPosition = window.scrollY + 100;

  sectionElements.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight) {
      activeSection.value = section.id;
    }
  });
};

// 滚动到指定区域
const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    activeSection.value = id;
  }
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 初始触发一次
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="less">



// 变量定义
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4cc9f0;
@text-color: #2b2d42;
@light-bg: #f8f9fa;
@border-color: #e9ecef;
@success-color: #2ec4b6;
@error-color: #e71d36;
@warning-color: #ff9f1c;
@info-color: #4361ee;

// 基础样式
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  color: @text-color;
  line-height: 1.6;
  background-color: #f0f2f5;
}

.debugger-guide {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

// 页眉样式
.header {
  background: linear-gradient(135deg, @secondary-color, @primary-color);
  color: white;
  text-align: center;
  padding: 3rem 2rem 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 1.5rem;
  }
}

.browser-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;

  .browser-icon {
    display: flex;
    flex-direction: column;
    align-items: center;

    i {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
    }

    span {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
}

// 内容布局
.content-container {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  background: @light-bg;
  border-right: 1px solid @border-color;
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  height: calc(100vh - 80px);
  overflow-y: auto;

  nav ul {
    list-style: none;

    li {
      margin-bottom: 0.2rem;
    }

    a {
      display: block;
      padding: 0.8rem 1.5rem;
      text-decoration: none;
      color: @text-color;
      font-weight: 500;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;

      &:hover {
        background: rgba(@primary-color, 0.05);
        color: @primary-color;
      }

      &.active {
        background: rgba(@primary-color, 0.1);
        color: @primary-color;
        border-left: 3px solid @primary-color;
        font-weight: 600;
      }
    }
  }
}

.main-content {
  flex: 1;
  padding: 2rem 3rem;
}

// 章节样式
.section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid @border-color;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: @secondary-color;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: @accent-color;
      border-radius: 3px;
    }
  }

  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
    color: @primary-color;
  }

  h4 {
    font-size: 1.2rem;
    margin: 1.2rem 0 0.8rem;
    color: darken(@text-color, 10%);
  }

  p {
    margin-bottom: 1rem;
  }
}

// 类比部分
.analogy {
  display: flex;
  background: rgba(@accent-color, 0.08);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-left: 4px solid @accent-color;

  .analogy-icon {
    margin-right: 1.5rem;

    i {
      font-size: 3rem;
      color: @accent-color;
    }
  }

  .analogy-content {
    flex: 1;

    h3 {
      margin-top: 0;
    }
  }
}

// 方法卡片
.method-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.method-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid @border-color;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .method-header {
    display: flex;
    align-items: center;
    padding: 1.2rem;
    background: rgba(@primary-color, 0.05);
    border-bottom: 1px solid @border-color;

    i {
      font-size: 1.5rem;
      color: @primary-color;
      margin-right: 0.8rem;
    }

    h3 {
      margin: 0;
      font-size: 1.3rem;
    }
  }

  p {
    padding: 0 1.2rem;
    margin: 1rem 0;
  }
}

// 代码片段
.code-snippet {
  background: #2b2b2b;
  color: #f8f8f2;
  border-radius: 6px;
  overflow: hidden;
  margin: 1rem;
  font-family: 'Source Code Pro', monospace;

  pre {
    margin: 0;
    padding: 1.2rem;
    overflow-x: auto;

    code {
      display: block;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }

  &.small {
    pre {
      padding: 0.8rem;

      code {
        font-size: 0.85rem;
      }
    }
  }
}

// 控制图标
.controls {
  margin: 2rem 0;

  .control-icons {
    display: flex;
    justify-content: space-around;
    margin-top: 1.5rem;

    .control-icon {
      display: flex;
      flex-direction: column;
      align-items: center;

      i {
        font-size: 2rem;
        color: @primary-color;
        margin-bottom: 0.5rem;
        background: rgba(@primary-color, 0.1);
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

// 使用场景网格
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
}

.scenario {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-top: 4px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .scenario-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.8rem;

    &.error {
      background: rgba(@error-color, 0.1);
      color: @error-color;
    }

    &.logic {
      background: rgba(@warning-color, 0.1);
      color: @warning-color;
    }

    &.async {
      background: rgba(@accent-color, 0.1);
      color: @accent-color;
    }

    &.data {
      background: rgba(@success-color, 0.1);
      color: @success-color;
    }
  }

  h3 {
    font-size: 1.2rem;
    margin: 0.5rem 0 1rem;
  }

  p {
    font-size: 0.95rem;
  }
}

// 高级卡片
.advanced-section {
  margin-top: 2rem;

  .advanced-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .advanced-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid @border-color;

    h4 {
      margin-top: 0;
    }
  }
}

// 优缺点比较
.comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 1.5rem 0;
}

.pros,
.cons {
  padding: 1.5rem;
  border-radius: 8px;

  h3 {
    display: flex;
    align-items: center;
    margin-top: 0;

    i {
      margin-right: 0.8rem;
    }
  }
}

.pros {
  background: rgba(@success-color, 0.08);
  border: 1px solid rgba(@success-color, 0.2);

  h3 i {
    color: @success-color;
  }
}

.cons {
  background: rgba(@error-color, 0.05);
  border: 1px solid rgba(@error-color, 0.15);

  h3 i {
    color: @error-color;
  }
}

ul,
ol {
  padding-left: 1.5rem;
  margin: 1rem 0;

  li {
    margin-bottom: 0.8rem;
  }
}

.best-practices {
  background: rgba(@warning-color, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  border-left: 4px solid @warning-color;

  ol {
    padding-left: 1.8rem;

    li {
      margin-bottom: 1rem;
    }
  }
}

// 结论部分
.conclusion {
  border-bottom: none;

  p {
    margin-bottom: 1.2rem;
  }
}

.tip-box {
  display: flex;
  align-items: flex-start;
  background: rgba(@accent-color, 0.1);
  border-radius: 8px;
  padding: 1.2rem;
  margin-top: 1.5rem;

  i {
    font-size: 1.5rem;
    color: @accent-color;
    margin-right: 1rem;
  }
}

// 页脚
.footer {
  text-align: center;
  padding: 1.5rem;
  background: @light-bg;
  color: darken(@text-color, 20%);
  font-size: 0.9rem;
  border-top: 1px solid @border-color;

  p:first-child {
    margin-bottom: 0.5rem;
  }
}

// 响应式调整
@media (max-width: 900px) {
  .content-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid @border-color;
  }

  .main-content {
    padding: 1.5rem;
  }

  .header {
    padding: 2rem 1rem;

    h1 {
      font-size: 2rem;
    }
  }

  .browser-icons {
    gap: 1rem;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {

  .method-cards,
  .scenario-grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 1.8rem;
  }
}
</style>
