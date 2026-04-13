<template>
  <div class="scroll-container">
    <header class="header">
      <h1>Scroll事件基本介绍</h1>
      <p class="subtitle">掌握滚动事件及其相关属性在前端开发中的应用</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>Scroll事件基础</h2>
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <h3>什么是Scroll事件</h3>
              <p>当用户滚动页面或元素内容时触发的事件，是前端开发中常用的交互事件之一。</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🎯</div>
              <h3>为什么需要Scroll事件</h3>
              <ul>
                <li>实现无限滚动加载内容</li>
                <li>创建视差滚动效果</li>
                <li>实现导航栏固定效果</li>
                <li>检测元素是否进入视口</li>
                <li>创建滚动进度指示器</li>
              </ul>
            </div>
          </div>
        </section>

        <div class="columns-container">
          <section class="section">
            <h2>关键滚动属性</h2>
            <div class="property-container">
              <div class="property-card">
                <h3>scrollTop</h3>
                <p>获取或设置元素内容垂直滚动的像素数</p>
                <pre>element.scrollTop</pre>
                <div class="property-demo">
                  <div class="demo-bar">
                    <div class="bar-fill" :style="{ height: scrollDemo.scrollTop + 'px' }"></div>
                  </div>
                  <span>当前值: {{ scrollDemo.scrollTop }}</span>
                </div>
              </div>

              <div class="property-card">
                <h3>scrollLeft</h3>
                <p>获取或设置元素内容水平滚动的像素数</p>
                <pre>element.scrollLeft</pre>
                <div class="property-demo">
                  <div class="demo-bar horizontal">
                    <div class="bar-fill" :style="{ width: scrollDemo.scrollLeft + 'px' }"></div>
                  </div>
                  <span>当前值: {{ scrollDemo.scrollLeft }}</span>
                </div>
              </div>

              <div class="property-card">
                <h3>scrollHeight</h3>
                <p>元素内容的总高度，包括不可见部分</p>
                <pre>element.scrollHeight</pre>
                <div class="property-value">
                  总高度: {{ scrollDemo.scrollHeight }}px
                </div>
              </div>

              <div class="property-card">
                <h3>scrollWidth</h3>
                <p>元素内容的总宽度，包括不可见部分</p>
                <pre>element.scrollWidth</pre>
                <div class="property-value">
                  总宽度: {{ scrollDemo.scrollWidth }}px
                </div>
              </div>

              <div class="property-card">
                <h3>clientHeight</h3>
                <p>元素可见内容区域的高度（包括内边距）</p>
                <pre>element.clientHeight</pre>
                <div class="property-value">
                  可见高度: {{ scrollDemo.clientHeight }}px
                </div>
              </div>

              <div class="property-card">
                <h3>clientWidth</h3>
                <p>元素可见内容区域的宽度（包括内边距）</p>
                <pre>element.clientWidth</pre>
                <div class="property-value">
                  可见宽度: {{ scrollDemo.clientWidth }}px
                </div>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>滚动位置计算</h2>
            <div class="calculation-container">
              <div class="calculation-card">
                <h3>滚动百分比</h3>
                <pre>const scrollPercent =
  (element.scrollTop /
  (element.scrollHeight - element.clientHeight)) * 100</pre>
                <div class="calculation-result">
                  垂直滚动百分比: {{ scrollPercent.toFixed(1) }}%
                </div>
              </div>

              <div class="calculation-card">
                <h3>是否滚动到底部</h3>
                <pre>const isBottom =
  element.scrollHeight - element.scrollTop
  <= element.clientHeight + threshold</pre>
                <div class="calculation-result">
                  是否到底部: {{ isBottom ? '是' : '否' }}
                </div>
              </div>

              <div class="calculation-card">
                <h3>元素是否在视口中</h3>
                <pre>function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}</pre>
                <div class="calculation-result">
                  元素在视口中: {{ isInViewport ? '是' : '否' }}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section class="section">
          <h2>常见使用场景</h2>
          <div class="use-cases">
            <div class="use-case-card">
              <div class="case-icon">📜</div>
              <h3>无限滚动加载</h3>
              <p>当用户滚动接近底部时加载更多内容</p>
            </div>
            <div class="use-case-card">
              <div class="case-icon">🎚️</div>
              <h3>滚动进度条</h3>
              <p>显示页面或文章的阅读进度</p>
            </div>
            <div class="use-case-card">
              <div class="case-icon">📌</div>
              <h3>固定导航栏</h3>
              <p>当页面滚动超过阈值时固定导航栏</p>
            </div>
            <div class="use-case-card">
              <div class="case-icon">🌈</div>
              <h3>视差滚动效果</h3>
              <p>不同元素以不同速度滚动创造深度感</p>
            </div>
            <div class="use-case-card">
              <div class="case-icon">🔍</div>
              <h3>滚动触发动画</h3>
              <p>当元素进入视口时触发动画效果</p>
            </div>
            <div class="use-case-card">
              <div class="case-icon">📊</div>
              <h3>滚动分析</h3>
              <p>跟踪用户滚动行为进行数据分析</p>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="performance-card">
          <h3>性能优化技巧</h3>
          <ul class="performance-list">
            <li>使用<span class="highlight">requestAnimationFrame</span>节流滚动事件</li>
            <li>避免在scroll事件中修改DOM</li>
            <li>使用<span class="highlight">IntersectionObserver</span>替代滚动检测</li>
            <li>添加事件监听时使用<span class="highlight">{ passive: true }</span></li>
            <li>避免强制同步布局（布局抖动）</li>
            <li>使用CSS的<span class="highlight">will-change</span>属性</li>
            <li>在不需要时及时移除事件监听</li>
          </ul>
        </div>

        <div class="code-card">
          <h3>添加Scroll事件监听</h3>
          <pre>// 添加事件监听
window.addEventListener('scroll', handleScroll, { passive: true });

// 事件处理函数
function handleScroll() {
  const scrollTop = window.scrollY;
  // 执行滚动相关逻辑
}

// 移除事件监听
window.removeEventListener('scroll', handleScroll);</pre>
        </div>

        <div class="comparison-card">
          <h3>滚动事件 vs IntersectionObserver</h3>
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>Scroll事件</th>
                <th>IntersectionObserver</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>性能影响</td>
                <td>高（频繁触发）</td>
                <td>低（异步回调）</td>
              </tr>
              <tr>
                <td>使用复杂度</td>
                <td>中等</td>
                <td>简单</td>
              </tr>
              <tr>
                <td>浏览器支持</td>
                <td>所有浏览器</td>
                <td>现代浏览器</td>
              </tr>
              <tr>
                <td>适用场景</td>
                <td>需要实时滚动位置</td>
                <td>检测元素可见性</td>
              </tr>
              <tr>
                <td>节流需求</td>
                <td>需要</td>
                <td>不需要</td>
              </tr>
            </tbody>
          </table>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>滚动事件最佳实践</h2>
      <div class="best-practices">
        <div class="practice-card">
          <div class="practice-icon">⏱️</div>
          <h3>事件节流</h3>
          <p>使用requestAnimationFrame或自定义节流函数减少事件触发频率</p>
          <pre>function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn.apply(this, args);
  };
}</pre>
        </div>

        <div class="practice-card">
          <div class="practice-icon">📐</div>
          <h3>避免布局抖动</h3>
          <p>不要在滚动处理中读取和写入布局属性交替进行</p>
          <pre>// 错误做法（导致布局抖动）
function handleScroll() {
  const height = element.clientHeight; // 读取
  element.style.height = (height + 10) + 'px'; // 写入
}

// 正确做法（批量读取和写入）
function handleScroll() {
  // 先读取所有需要值
  const values = readLayoutValues();

  // 然后一次性写入
  updateLayout(values);
}</pre>
        </div>

        <div class="practice-card">
          <div class="practice-icon">🚀</div>
          <h3>使用现代API</h3>
          <p>优先使用IntersectionObserver和ScrollTimeline等现代API</p>
          <pre>// 使用IntersectionObserver检测元素可见性
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 元素进入视口
    }
  });
});

observer.observe(element);</pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>Scroll事件是创建丰富交互体验的基础，合理使用可以提升用户体验，但需要注意性能优化</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 创建模拟滚动数据
const scrollDemo = ref({
  scrollTop: 0,
  scrollLeft: 0,
  scrollHeight: 800,
  scrollWidth: 1200,
  clientHeight: 400,
  clientWidth: 600
});

// 计算滚动百分比
const scrollPercent = ref(0);
// 是否滚动到底部
const isBottom = ref(false);
// 元素是否在视口中
const isInViewport = ref(false);

// 模拟滚动效果
let scrollTopValue = 0;
let scrollLeftValue = 0;

const simulateScroll = () => {
  if (scrollTopValue < scrollDemo.value.scrollHeight) {
    scrollTopValue += 5;
    scrollDemo.value.scrollTop = scrollTopValue;

    // 计算滚动百分比
    scrollPercent.value = (scrollDemo.value.scrollTop /
      (scrollDemo.value.scrollHeight - scrollDemo.value.clientHeight)) * 100;

    // 检查是否滚动到底部
    isBottom.value = scrollDemo.value.scrollHeight - scrollDemo.value.scrollTop <=
      scrollDemo.value.clientHeight + 10;
  } else {
    scrollTopValue = 0;
  }

  if (scrollLeftValue < scrollDemo.value.scrollWidth) {
    scrollLeftValue += 3;
    scrollDemo.value.scrollLeft = scrollLeftValue;
  } else {
    scrollLeftValue = 0;
  }

  // 随机设置元素是否在视口
  isInViewport.value = Math.random() > 0.5;
};

let scrollInterval: number;

onMounted(() => {
  scrollInterval = setInterval(simulateScroll, 100) as unknown as number;
});

onUnmounted(() => {
  clearInterval(scrollInterval);
});
</script>

<style lang="less" scoped>
@primary-color: #4285f4;
@secondary-color: #34a853;
@accent-color: #ea4335;
@text-color: #202124;
@light-bg: #f8f9fa;
@border-color: #dadce0;
@card-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.scroll-container {
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  color: @text-color;
  background-color: #fff;
  line-height: 1.6;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid @border-color;

  h1 {
    color: @primary-color;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #5f6368;
  }
}

.content-wrapper {
  display: flex;
  gap: 25px;
  margin-bottom: 30px;
}

.main-content {
  flex: 3;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

.section {
  background: @light-bg;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h2 {
    color: @primary-color;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid fade(@primary-color, 20%);
    font-size: 1.8rem;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.concept-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    font-size: 1.4rem;
  }

  p,
  ul {
    line-height: 1.7;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
}

.columns-container {
  display: flex;
  gap: 20px;

  &>.section {
    flex: 1;
  }
}

.property-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.property-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
  border-left: 4px solid @secondary-color;

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.9rem;
    margin: 10px 0;
    line-height: 1.5;
  }
}

.property-demo {
  margin-top: 15px;

  .demo-bar {
    width: 100%;
    height: 20px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 8px;

    &.horizontal {
      height: 10px;
    }

    .bar-fill {
      background: @primary-color;
      width: 100%;
    }
  }

  span {
    display: block;
    text-align: center;
    font-size: 0.9rem;
    color: #5f6368;
  }
}

.property-value {
  background: #f1f3f4;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  color: @primary-color;
}

.calculation-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.calculation-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.9rem;
    margin: 10px 0;
    line-height: 1.5;
  }
}

.calculation-result {
  background: fade(@secondary-color, 10%);
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  color: darken(@secondary-color, 20%);
  margin-top: 10px;
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.use-case-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .case-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: @primary-color;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }
}

.performance-card,
.code-card,
.comparison-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid @border-color;
  }
}

.performance-list {
  list-style: none;

  li {
    padding: 10px 0;
    border-bottom: 1px solid fade(@border-color, 30%);

    &:last-child {
      border-bottom: none;
    }

    .highlight {
      background: fade(@primary-color, 10%);
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
    }
  }
}

.code-card pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid @border-color;
  }

  th {
    background-color: fade(@primary-color, 8%);
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
}

.best-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.practice-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  .practice-icon {
    font-size: 2rem;
    color: @primary-color;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.85rem;
    margin-top: 15px;
    line-height: 1.4;
  }
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid @border-color;
  color: #5f6368;
  font-style: italic;
}

@media (max-width: 1100px) {
  .content-wrapper {
    flex-direction: column;
  }

  .columns-container {
    flex-direction: column;
  }
}

@media (max-width: 768px) {

  .concept-grid,
  .property-container,
  .calculation-container,
  .use-cases,
  .best-practices {
    grid-template-columns: 1fr;
  }
}
</style>
