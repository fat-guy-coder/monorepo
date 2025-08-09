<template>
  <div class="resize-container">
    <header class="header">
      <h1>Resize事件基本介绍</h1>
      <p class="subtitle">掌握窗口与元素尺寸变化的监听与处理</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>基本概念</h2>
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <h3>什么是Resize事件</h3>
              <p>当浏览器窗口或元素尺寸发生变化时触发的事件，用于响应式布局和动态调整UI</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">🎯</div>
              <h3>主要应用场景</h3>
              <ul>
                <li>响应式布局调整</li>
                <li>图表重绘</li>
                <li>元素位置重新计算</li>
                <li>媒体查询替代方案</li>
                <li>自适应组件</li>
              </ul>
            </div>
          </div>
        </section>

        <div class="columns-container">
          <section class="section">
            <h2>窗口Resize事件</h2>
            <div class="window-resize-demo">
              <div class="demo-container">
                <div class="window-frame">
                  <div class="window-content">
                    <div class="size-indicator">
                      <span>Width: {{ windowSize.width }}px</span>
                      <span>Height: {{ windowSize.height }}px</span>
                    </div>
                    <div class="aspect-ratio">
                      宽高比: {{ aspectRatio }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="property-card">
                <h3>监听窗口Resize</h3>
                <pre>window.addEventListener('resize', handleResize);

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // 处理尺寸变化逻辑
}</pre>
              </div>
            </div>

            <div class="property-grid">
              <div class="property-card">
                <h3>window.innerWidth</h3>
                <p>浏览器窗口的视口宽度（包括垂直滚动条）</p>
                <div class="property-value">
                  {{ windowSize.width }}px
                </div>
              </div>

              <div class="property-card">
                <h3>window.innerHeight</h3>
                <p>浏览器窗口的视口高度（包括水平滚动条）</p>
                <div class="property-value">
                  {{ windowSize.height }}px
                </div>
              </div>

              <div class="property-card">
                <h3>window.outerWidth</h3>
                <p>浏览器窗口的外部宽度（包括界面元素）</p>
                <div class="property-value">
                  {{ windowSize.outerWidth }}px
                </div>
              </div>

              <div class="property-card">
                <h3>window.outerHeight</h3>
                <p>浏览器窗口的外部高度（包括界面元素）</p>
                <div class="property-value">
                  {{ windowSize.outerHeight }}px
                </div>
              </div>
            </div>
          </section>

          <section class="section">
            <h2>元素Resize事件</h2>
            <div class="element-resize-demo">
              <div class="resizable-element" ref="resizableElement">
                <div class="element-info">
                  <div>Width: {{ elementSize.width }}px</div>
                  <div>Height: {{ elementSize.height }}px</div>
                </div>
                <div class="resize-handles">
                  <div class="handle right" @mousedown="startResize('right')"></div>
                  <div class="handle bottom" @mousedown="startResize('bottom')"></div>
                  <div class="handle corner" @mousedown="startResize('both')"></div>
                </div>
              </div>
            </div>

            <div class="property-grid">
              <div class="property-card">
                <h3>offsetWidth</h3>
                <p>元素布局宽度（内容+内边距+边框+垂直滚动条）</p>
                <div class="property-value">
                  {{ elementSize.offsetWidth }}px
                </div>
              </div>

              <div class="property-card">
                <h3>offsetHeight</h3>
                <p>元素布局高度（内容+内边距+边框+水平滚动条）</p>
                <div class="property-value">
                  {{ elementSize.offsetHeight }}px
                </div>
              </div>

              <div class="property-card">
                <h3>clientWidth</h3>
                <p>元素可见宽度（内容+内边距，不包括滚动条）</p>
                <div class="property-value">
                  {{ elementSize.clientWidth }}px
                </div>
              </div>

              <div class="property-card">
                <h3>clientHeight</h3>
                <p>元素可见高度（内容+内边距，不包括滚动条）</p>
                <div class="property-value">
                  {{ elementSize.clientHeight }}px
                </div>
              </div>
            </div>
          </section>
        </div>

        <section class="section">
          <h2>ResizeObserver API</h2>
          <div class="observer-grid">
            <div class="observer-card">
              <div class="observer-icon">👁️</div>
              <h3>现代解决方案</h3>
              <p>ResizeObserver提供更高效的元素尺寸变化监听，避免性能问题</p>
            </div>

            <div class="code-card">
              <h3>使用ResizeObserver</h3>
              <pre>const observer = new ResizeObserver(entries => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;
    // 处理尺寸变化
  }
});

observer.observe(element);</pre>
            </div>

            <div class="comparison-card">
              <h3>对比传统Resize事件</h3>
              <table>
                <thead>
                  <tr>
                    <th>特性</th>
                    <th>window.resize</th>
                    <th>ResizeObserver</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>监听对象</td>
                    <td>仅窗口</td>
                    <td>任意元素</td>
                  </tr>
                  <tr>
                    <td>性能</td>
                    <td>可能影响性能</td>
                    <td>高效，异步处理</td>
                  </tr>
                  <tr>
                    <td>精度</td>
                    <td>仅窗口尺寸</td>
                    <td>精确元素尺寸</td>
                  </tr>
                  <tr>
                    <td>浏览器支持</td>
                    <td>所有浏览器</td>
                    <td>现代浏览器</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="performance-card">
          <h3>性能优化技巧</h3>
          <ul class="performance-list">
            <li>使用<span class="highlight">防抖(debounce)</span>减少事件触发频率</li>
            <li>避免在resize处理函数中进行重排操作</li>
            <li>使用<span class="highlight">requestAnimationFrame</span>优化渲染</li>
            <li>优先使用<span class="highlight">CSS媒体查询</span>替代JS方案</li>
            <li>使用<span class="highlight">ResizeObserver</span>替代传统事件</li>
            <li>在不需要时及时移除事件监听</li>
          </ul>
        </div>

        <div class="code-card">
          <h3>防抖实现</h3>
          <pre>function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 使用防抖
window.addEventListener('resize', debounce(handleResize, 250));</pre>
        </div>

        <div class="code-card">
          <h3>节流实现</h3>
          <pre>function throttle(func, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      func.apply(this, args);
      lastCall = now;
    }
  };
}

// 使用节流
window.addEventListener('resize', throttle(handleResize, 100));</pre>
        </div>

        <div class="best-practices">
          <h3>最佳实践</h3>
          <ul>
            <li>对于复杂布局变化，优先使用CSS Flexbox/Grid</li>
            <li>将尺寸相关的JS操作限制在必要元素上</li>
            <li>使用CSS变量减少JS操作</li>
            <li>在移动端增加防抖延迟（300ms以上）</li>
            <li>使用容器查询替代元素尺寸监听</li>
          </ul>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>常见使用场景</h2>
      <div class="use-cases">
        <div class="use-case-card">
          <div class="case-icon">📱</div>
          <h3>响应式布局</h3>
          <p>根据窗口大小调整布局结构</p>
          <pre>if (window.innerWidth < 768) {
  // 移动端布局
} else if (window.innerWidth < 1024) {
  // 平板布局
} else {
  // 桌面布局
}</pre>
        </div>

        <div class="use-case-card">
          <div class="case-icon">📊</div>
          <h3>图表重绘</h3>
          <p>在容器尺寸变化时重新渲染图表</p>
          <pre>const chart = new Chart(ctx, config);
const observer = new ResizeObserver(() => {
  chart.resize();
});
observer.observe(chartContainer);</pre>
        </div>

        <div class="use-case-card">
          <div class="case-icon">🔄</div>
          <h3>动态调整元素</h3>
          <p>根据父容器尺寸调整子元素</p>
          <pre>const observer = new ResizeObserver(entries => {
  const container = entries[0];
  elements.forEach(el => {
    el.style.width = `${container.contentRect.width / 3}px`;
  });
});
observer.observe(container);</pre>
        </div>

        <div class="use-case-card">
          <div class="case-icon">🎚️</div>
          <h3>自适应组件</h3>
          <p>创建随容器尺寸变化的组件</p>
          <pre>const resizeHandler = () => {
  if (container.offsetWidth < 300) {
    component.setCompactMode();
  } else {
    component.setNormalMode();
  }
};
window.addEventListener('resize', resizeHandler);</pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>Resize事件是实现响应式界面的关键技术，合理使用ResizeObserver和优化技巧可以创建高性能的自适应应用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 窗口尺寸数据
const windowSize = ref({
  width: window.innerWidth,
  height: window.innerHeight,
  outerWidth: window.outerWidth,
  outerHeight: window.outerHeight
});

// 计算宽高比
const aspectRatio = ref((windowSize.value.width / windowSize.value.height).toFixed(2));

// 元素尺寸数据
const elementSize = ref({
  width: 300,
  height: 200,
  offsetWidth: 0,
  offsetHeight: 0,
  clientWidth: 0,
  clientHeight: 0
});

// 获取可调整大小的元素引用
const resizableElement = ref<HTMLElement | null>(null);

// 更新元素尺寸信息
const updateElementSize = () => {
  if (resizableElement.value) {
    const el = resizableElement.value;
    elementSize.value.offsetWidth = el.offsetWidth;
    elementSize.value.offsetHeight = el.offsetHeight;
    elementSize.value.clientWidth = el.clientWidth;
    elementSize.value.clientHeight = el.clientHeight;
  }
};

// 处理窗口resize事件
const handleWindowResize = () => {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight
  };
  aspectRatio.value = (windowSize.value.width / windowSize.value.height).toFixed(2);
};

// 添加防抖的resize处理
let resizeTimeout: number;
const debouncedResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleWindowResize, 100) as unknown as number;
};

// 处理元素调整大小
let isResizing = false;
let resizeDirection = '';
let startX = 0;
let startY = 0;
let startWidth = 0;
let startHeight = 0;

const startResize = (direction: string) => {
  if (!resizableElement.value) return;

  isResizing = true;
  resizeDirection = direction;
  startX = (event as MouseEvent).clientX;
  startY = (event as MouseEvent).clientY;
  startWidth = resizableElement.value.offsetWidth;
  startHeight = resizableElement.value.offsetHeight;

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', stopResize);
};

const handleMouseMove = (e: MouseEvent) => {
  if (!isResizing || !resizableElement.value) return;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  if (resizeDirection === 'right' || resizeDirection === 'both') {
    elementSize.value.width = Math.max(100, startWidth + deltaX);
  }

  if (resizeDirection === 'bottom' || resizeDirection === 'both') {
    elementSize.value.height = Math.max(50, startHeight + deltaY);
  }

  updateElementSize();
};

const stopResize = () => {
  isResizing = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', stopResize);
};

// 初始化
onMounted(() => {
  window.addEventListener('resize', debouncedResize);
  updateElementSize();

  // 使用ResizeObserver监听元素变化
  if (resizableElement.value) {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === resizableElement.value) {
          updateElementSize();
        }
      }
    });

    observer.observe(resizableElement.value);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', debouncedResize);
  clearTimeout(resizeTimeout);
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

.resize-container {
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

.window-resize-demo {
  margin-bottom: 25px;

  .demo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .window-frame {
    width: 100%;
    max-width: 500px;
    height: 300px;
    border: 3px solid @primary-color;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    position: relative;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);

    .window-content {
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;

      .size-indicator {
        background: rgba(255, 255, 255, 0.9);
        padding: 15px 25px;
        border-radius: 30px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        font-weight: bold;
        color: @primary-color;
      }

      .aspect-ratio {
        background: rgba(255, 255, 255, 0.9);
        padding: 10px 20px;
        border-radius: 20px;
        font-weight: bold;
        color: @secondary-color;
      }
    }
  }
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
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

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.9rem;
    margin: 15px 0;
    line-height: 1.5;
  }
}

.property-value {
  background: fade(@primary-color, 10%);
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
  color: @primary-color;
  font-size: 1.1rem;
}

.element-resize-demo {
  margin-bottom: 25px;

  .resizable-element {
    width: v-bind('elementSize.width + "px"');
    height: v-bind('elementSize.height + "px"');
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

    .element-info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.9);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-weight: bold;
      color: #6a11cb;
    }

    .resize-handles {
      .handle {
        position: absolute;
        background: @accent-color;
        z-index: 10;

        &.right {
          top: 0;
          right: 0;
          width: 10px;
          height: 100%;
          cursor: ew-resize;
        }

        &.bottom {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 10px;
          cursor: ns-resize;
        }

        &.corner {
          bottom: 0;
          right: 0;
          width: 20px;
          height: 20px;
          cursor: nwse-resize;
          border-radius: 50% 0 0 0;
        }
      }
    }
  }
}

.observer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.observer-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: @card-shadow;

  .observer-icon {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  h3 {
    color: @primary-color;
    margin-bottom: 10px;
  }
}

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

.performance-card,
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

.best-practices ul {
  padding-left: 20px;

  li {
    margin-bottom: 10px;
    line-height: 1.6;
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
  .property-grid,
  .observer-grid,
  .use-cases {
    grid-template-columns: 1fr;
  }

  .window-resize-demo .window-frame {
    height: 250px;
  }
}
</style>
