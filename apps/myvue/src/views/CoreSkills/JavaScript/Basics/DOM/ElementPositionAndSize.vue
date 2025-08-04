<template>
  <div class="element-container">
    <header class="header">
      <h1>元素位置与宽高基本介绍</h1>
      <p class="subtitle">基本介绍DOM元素的各种位置与尺寸属性</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>核心概念</h2>
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">📐</div>
              <h3>内容区域 (Content)</h3>
              <p>元素的实际内容区域，不包括内边距、边框和外边距</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">📦</div>
              <h3>内边距区域 (Padding)</h3>
              <p>内容区域与边框之间的空间，背景色/背景图会延伸到这里</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🖼️</div>
              <h3>边框区域 (Border)</h3>
              <p>围绕内边距和内容的边框</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">↔️</div>
              <h3>外边距区域 (Margin)</h3>
              <p>边框外的透明区域，用于分隔相邻元素</p>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="dom-image-container">
            <img :src="domImage" alt="dom" loading="lazy">
          </div>
          <a href="https://www.runoob.com/jsref/dom-obj-document.html" target="_blank">摘自菜鸟教程</a>
        </section>

        <section class="section">
          <h2>滚动相关属性</h2>
          <div class="property-grid">
            <div class="property-card">
              <h3>scrollTop</h3>
              <p>元素内容垂直滚动的像素数</p>
              <div class="property-demo">
                <div class="demo-bar">
                  <div class="bar-fill" :style="{ height: elementProps.scrollTop + 'px' }"></div>
                </div>
                <span>{{ elementProps.scrollTop }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>scrollLeft</h3>
              <p>元素内容水平滚动的像素数</p>
              <div class="property-demo">
                <div class="demo-bar horizontal">
                  <div class="bar-fill" :style="{ width: elementProps.scrollLeft + 'px' }"></div>
                </div>
                <span>{{ elementProps.scrollLeft }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>scrollHeight</h3>
              <p>元素内容的总高度（包括不可见部分）</p>
              <div class="property-value">
                <span>{{ elementProps.scrollHeight }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>scrollWidth</h3>
              <p>元素内容的总宽度（包括不可见部分）</p>
              <div class="property-value">
                <span>{{ elementProps.scrollWidth }}px</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>客户区相关属性</h2>
          <div class="property-grid">
            <div class="property-card">
              <h3>clientWidth</h3>
              <p>元素内容区宽度 + 内边距（不包括滚动条）</p>
              <div class="property-value">
                <span>{{ elementProps.clientWidth }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>clientHeight</h3>
              <p>元素内容区高度 + 内边距（不包括滚动条）</p>
              <div class="property-value">
                <span>{{ elementProps.clientHeight }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>clientLeft</h3>
              <p>元素左边框宽度（垂直滚动条在左侧时包括滚动条宽度）</p>
              <div class="property-value">
                <span>{{ elementProps.clientLeft }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>clientTop</h3>
              <p>元素上边框宽度（水平滚动条在上方时包括滚动条高度）</p>
              <div class="property-value">
                <span>{{ elementProps.clientTop }}px</span>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>偏移量相关属性</h2>
          <div class="property-grid">
            <div class="property-card">
              <h3>offsetWidth</h3>
              <p>元素可见宽度（内容 + 内边距 + 边框 + 垂直滚动条）</p>
              <div class="property-value">
                <span>{{ elementProps.offsetWidth }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>offsetHeight</h3>
              <p>元素可见高度（内容 + 内边距 + 边框 + 水平滚动条）</p>
              <div class="property-value">
                <span>{{ elementProps.offsetHeight }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>offsetLeft</h3>
              <p>元素左上角相对于offsetParent元素的水平偏移</p>
              <div class="property-value">
                <span>{{ elementProps.offsetLeft }}px</span>
              </div>
            </div>

            <div class="property-card">
              <h3>offsetTop</h3>
              <p>元素左上角相对于offsetParent元素的垂直偏移</p>
              <div class="property-value">
                <span>{{ elementProps.offsetTop }}px</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="visualization">
          <h3>元素尺寸可视化</h3>
          <div class="element-box">
            <div class="margin-area">
              <div class="border-area">
                <div class="padding-area">
                  <div class="content-area">
                    <div class="scroll-indicator">
                      <div class="scroll-top" :style="{ bottom: scrollTopPercent + '%' }">scrollTop</div>
                      <div class="scroll-left" :style="{ right: scrollLeftPercent + '%' }">scrollLeft</div>
                    </div>

                    <div class="dimension-label top">offsetTop: {{ elementProps.offsetTop }}px</div>
                    <div class="dimension-label left">offsetLeft: {{ elementProps.offsetLeft }}px</div>
                    <div class="dimension-label width">offsetWidth: {{ elementProps.offsetWidth }}px</div>
                    <div class="dimension-label height">offsetHeight: {{ elementProps.offsetHeight }}px</div>
                    <div class="dimension-label client-width">clientWidth: {{ elementProps.clientWidth }}px</div>
                    <div class="dimension-label client-height">clientHeight: {{ elementProps.clientHeight }}px</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <h3>属性对比</h3>
          <table>
            <thead>
              <tr>
                <th>属性</th>
                <th>包含内容</th>
                <th>是否包含滚动条</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>scrollWidth/Height</td>
                <td>内容总宽高（含不可见部分）</td>
                <td>❌ 不包含</td>
              </tr>
              <tr>
                <td>clientWidth/Height</td>
                <td>内容 + 内边距</td>
                <td>❌ 不包含</td>
              </tr>
              <tr>
                <td>offsetWidth/Height</td>
                <td>内容 + 内边距 + 边框</td>
                <td>✅ 包含</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>使用<code>getBoundingClientRect()</code>获取精确位置</li>
            <li>避免在布局变化后立即读取位置属性</li>
            <li>使用<code>window.innerWidth/Height</code>获取视口尺寸</li>
            <li>使用<code>ResizeObserver</code>监听元素尺寸变化</li>
            <li>使用CSS <code>transform</code>代替位置改变优化性能</li>
          </ul>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>常见使用场景</h2>
      <div class="use-cases">
        <div class="use-case-card">
          <div class="case-icon">🎯</div>
          <h3>元素居中定位</h3>
          <pre>element.style.left = `calc(50% - ${element.offsetWidth / 2}px)`</pre>
        </div>
        <div class="use-case-card">
          <div class="case-icon">📜</div>
          <h3>无限滚动加载</h3>
          <pre>if (element.scrollHeight - element.scrollTop
  <= element.clientHeight + threshold) {
  // 加载更多内容
}</pre>
        </div>
        <div class="use-case-card">
          <div class="case-icon">📊</div>
          <h3>滚动进度指示器</h3>
          <pre>const progress =
  (scrollTop / (scrollHeight - clientHeight)) * 100</pre>
        </div>
        <div class="use-case-card">
          <div class="case-icon">🔍</div>
          <h3>元素进入视口检测</h3>
          <pre>function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}</pre>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>位置获取方法对比</h2>
      <div class="comparison-grid">
        <div class="comparison-card">
          <h3>offsetLeft/offsetTop</h3>
          <p>相对于offsetParent的位置</p>
          <ul>
            <li><strong>优点：</strong>直接获取，性能好</li>
            <li><strong>缺点：</strong>受定位上下文影响</li>
          </ul>
        </div>

        <div class="comparison-card">
          <h3>getBoundingClientRect()</h3>
          <p>相对于视口的位置</p>
          <ul>
            <li><strong>优点：</strong>精确，包含子像素值</li>
            <li><strong>缺点：</strong>触发重排，性能开销大</li>
          </ul>
        </div>

        <div class="comparison-card">
          <h3>elementFromPoint()</h3>
          <p>获取指定坐标处的元素</p>
          <ul>
            <li><strong>优点：</strong>精确获取特定点元素</li>
            <li><strong>缺点：</strong>坐标需相对于视口</li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>理解元素位置与宽高属性是前端开发的核心技能，合理使用这些属性可以创建精确的布局和交互效果</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import domImage from '@/assets/js/nodeInfo.png'

// 元素属性数据
const elementProps = ref({
  scrollTop: 0,
  scrollLeft: 0,
  scrollHeight: 800,
  scrollWidth: 1200,
  clientHeight: 300,
  clientWidth: 400,
  clientLeft: 5,
  clientTop: 5,
  offsetWidth: 410,
  offsetHeight: 310,
  offsetLeft: 50,
  offsetTop: 50
});

// 计算滚动百分比
const scrollTopPercent = ref(0);
const scrollLeftPercent = ref(0);

// 模拟滚动效果
let scrollTopValue = 0;
let scrollLeftValue = 0;

const simulateScroll = () => {
  if (scrollTopValue < elementProps.value.scrollHeight) {
    scrollTopValue += 5;
    elementProps.value.scrollTop = scrollTopValue;

    // 计算滚动百分比
    scrollTopPercent.value = (elementProps.value.scrollTop /
      (elementProps.value.scrollHeight - elementProps.value.clientHeight)) * 100;
  } else {
    scrollTopValue = 0;
  }

  if (scrollLeftValue < elementProps.value.scrollWidth) {
    scrollLeftValue += 3;
    elementProps.value.scrollLeft = scrollLeftValue;

    // 计算水平滚动百分比
    scrollLeftPercent.value = (elementProps.value.scrollLeft /
      (elementProps.value.scrollWidth - elementProps.value.clientWidth)) * 100;
  } else {
    scrollLeftValue = 0;
  }
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

.element-container {
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
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.sidebar {
  flex: 1;
  min-width: 300px;
}

.section {
  background: @light-bg;
  border-radius: 8px;
  padding: 25px;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.concept-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: @card-shadow;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.property-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  p {
    color: #5f6368;
    margin-bottom: 15px;
    min-height: 40px;
  }
}

.property-demo {
  .demo-bar {
    width: 100%;
    height: 20px;
    background: #e0e0e0;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 8px;
    position: relative;

    &.horizontal {
      height: 10px;
    }

    .bar-fill {
      background: @primary-color;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  span {
    display: block;
    text-align: center;
    font-weight: bold;
    color: @primary-color;
  }
}

.property-value {
  background: fade(@primary-color, 8%);
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  color: @primary-color;
  font-size: 1.1rem;
}

.visualization {
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

.element-box {
  position: relative;
  height: 300px;

  .margin-area {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background: fade(@secondary-color, 10%);
    border: 1px dashed @secondary-color;

    .border-area {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      background: fade(@accent-color, 10%);
      border: 3px solid @accent-color;

      .padding-area {
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;
        background: fade(@primary-color, 10%);
        border: 1px dashed @primary-color;

        .content-area {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          bottom: 20px;
          background: white;
          border: 1px solid #ddd;
          overflow: auto;
          position: relative;

          .scroll-indicator {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            .scroll-top {
              position: absolute;
              left: 0;
              width: 100%;
              height: 2px;
              background: @primary-color;
              font-size: 10px;
              text-align: center;
              color: @primary-color;
              line-height: 1;
            }

            .scroll-left {
              position: absolute;
              top: 0;
              width: 2px;
              height: 100%;
              background: @primary-color;
              font-size: 10px;
              writing-mode: vertical-lr;
              text-align: center;
              color: @primary-color;
            }
          }

          .dimension-label {
            position: absolute;
            font-size: 12px;
            color: #5f6368;
            background: rgba(255, 255, 255, 0.8);
            padding: 2px 4px;
            border-radius: 3px;
            white-space: nowrap;

            &.top {
              top: -25px;
              left: 50%;
              transform: translateX(-50%);
            }

            &.left {
              top: 50%;
              left: -70px;
              transform: translateY(-50%) rotate(-90deg);
            }

            &.width {
              bottom: -25px;
              left: 50%;
              transform: translateX(-50%);
            }

            &.height {
              top: 50%;
              right: -70px;
              transform: translateY(-50%) rotate(90deg);
            }

            &.client-width {
              top: 10px;
              left: 50%;
              transform: translateX(-50%);
            }

            &.client-height {
              left: 10px;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
  }
}

.comparison-card,
.best-practices {
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

.best-practices ul {
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    line-height: 1.6;

    code {
      background: fade(@primary-color, 10%);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
  }
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.use-case-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  .case-icon {
    font-size: 2rem;
    color: @primary-color;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
  }

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.4;
  }
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.comparison-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 20px;
    margin-top: 10px;

    li {
      margin-bottom: 8px;
    }
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
}

@media (max-width: 768px) {

  .concept-grid,
  .property-grid,
  .use-cases,
  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .element-box {
    height: 250px;

    .margin-area {
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;

      .border-area {
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;

        .padding-area {
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;

          .content-area {
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
