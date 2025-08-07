<template>
  <div class="infinite-scroll">
    <header class="header">
      <h1>无限滚动技术解析</h1>
      <p>优化用户体验的高效内容加载方案</p>
    </header>

    <div class="content-container">
      <!-- 概念介绍 -->
      <section class="concept-section">
        <div class="section-header">
          <div class="icon">📚</div>
          <h2>无限滚动概念</h2>
        </div>

        <div class="concept-grid">
          <div class="concept-card">
            <div class="concept-icon">🔄</div>
            <h3>什么是无限滚动？</h3>
            <p>无限滚动（Infinite Scroll）是一种前端技术，当用户滚动到页面底部时自动加载新内容，无需手动点击翻页按钮。</p>
          </div>

          <div class="concept-card">
            <div class="concept-icon">⚙️</div>
            <h3>核心机制</h3>
            <ul>
              <li>监听滚动事件</li>
              <li>计算滚动位置</li>
              <li>触发数据加载</li>
              <li>渲染新内容</li>
              <li>更新滚动位置</li>
            </ul>
          </div>

          <div class="concept-card">
            <div class="concept-icon">📱</div>
            <h3>应用场景</h3>
            <ul>
              <li>社交媒体动态流</li>
              <li>电商商品列表</li>
              <li>新闻资讯应用</li>
              <li>图片/视频画廊</li>
              <li>评论区加载</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 实现思路 -->
      <section class="implementation-section">
        <div class="section-header">
          <div class="icon">🔧</div>
          <h2>实现思路</h2>
        </div>

        <div class="implementation-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>设置滚动容器</h3>
              <p>确定滚动容器（通常是窗口或自定义容器）并设置固定高度</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>初始化数据</h3>
              <p>加载第一页数据并渲染初始内容</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>监听滚动事件</h3>
              <p>添加滚动事件监听器（使用防抖优化性能）</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>计算触发点</h3>
              <p>当滚动条接近底部（如距离底部200px）时触发加载</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3>加载新数据</h3>
              <p>发起API请求获取下一页数据</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">6</div>
            <div class="step-content">
              <h3>渲染新内容</h3>
              <p>将新数据追加到现有列表</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">7</div>
            <div class="step-content">
              <h3>状态管理</h3>
              <p>处理加载状态、错误状态和数据结束状态</p>
            </div>
          </div>
        </div>

        <div class="visualization">
          <h3>滚动触发机制示意图</h3>
          <div class="scroll-container">
            <div class="scroll-content">
              <div class="item" v-for="i in 8" :key="i">已加载内容 {{ i }}</div>
              <div class="trigger-area" v-if="!allLoaded">
                <div class="loader">正在加载更多内容...</div>
              </div>
              <div class="end-message" v-else>
                ⭐ 所有内容已加载完毕
              </div>
            </div>
          </div>
          <div class="scroll-indicator">
            <div class="scroll-bar"></div>
          </div>
          <div class="scroll-labels">
            <div class="label top">顶部</div>
            <div class="label trigger">触发点</div>
            <div class="label bottom">底部</div>
          </div>
        </div>
      </section>

      <!-- 代码实现 -->
      <section class="code-section">
        <div class="section-header">
          <div class="icon">💻</div>
          <h2>代码实现</h2>
        </div>

        <div class="code-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="code-content">
          <div v-if="activeTab === 'composition'" class="composition-code">
            <h3>Vue Composition API 实现</h3>
            <pre><code>import { ref, onMounted, onUnmounted } from 'vue';

// 模拟数据服务
const fetchItems = async (page: number, pageSize = 10): Promise&lt;string[]&gt; => {
  return new Promise(resolve => {
    setTimeout(() => {
      const items = Array.from({ length: pageSize },
        (_, i) => `项目 ${(page - 1) * pageSize + i + 1}`
      );
      resolve(items);
    }, 800);
  });
};

export function useInfiniteScroll(containerRef: Ref&lt;HTMLElement | null&gt;) {
  const items = ref&lt;string[]&gt;([]);
  const page = ref(1);
  const loading = ref(false);
  const allLoaded = ref(false);

  // 加载更多数据
  const loadMore = async () => {
    if (loading.value || allLoaded.value) return;

    loading.value = true;
    try {
      const newItems = await fetchItems(page.value);

      if (newItems.length === 0) {
        allLoaded.value = true;
        return;
      }

      items.value = [...items.value, ...newItems];
      page.value += 1;
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      loading.value = false;
    }
  };

  // 检查是否需要加载
  const checkScroll = () => {
    if (!containerRef.value) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.value;
    const threshold = 200; // 距离底部200px触发

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMore();
    }
  };

  // 防抖函数
  const debounce = (fn: Function, delay: number) => {
    let timeoutId: number;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedCheck = debounce(checkScroll, 100);

  // 设置事件监听
  onMounted(() => {
    if (!containerRef.value) return;
    containerRef.value.addEventListener('scroll', debouncedCheck);
    loadMore(); // 初始加载
  });

  onUnmounted(() => {
    if (!containerRef.value) return;
    containerRef.value.removeEventListener('scroll', debouncedCheck);
  });

  return {
    items,
    loading,
    allLoaded,
    loadMore
  };
}</code></pre>
          </div>

          <div v-if="activeTab === 'component'" class="component-code">
            <h3>组件使用示例</h3>
            <pre><code>&lt;template&gt;
  &lt;div class="infinite-scroll-demo"&gt;
    &lt;div
      ref="scrollContainer"
      class="scroll-container"
    &gt;
      &lt;div class="item" v-for="(item, index) in items" :key="index"&gt;
      &#123;&#123; item &#125;&#125;
      &lt;/div&gt;

      &lt;div v-if="loading" class="loader"&gt;
        加载中...
      &lt;/div&gt;

      &lt;div v-if="allLoaded" class="end-message"&gt;
        🎉 所有内容已加载完毕
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue';
import { useInfiniteScroll } from './useInfiniteScroll';

const scrollContainer = ref&lt;HTMLElement | null&gt;(null);
const { items, loading, allLoaded } = useInfiniteScroll(scrollContainer);
&lt;/script&gt;

&lt;style scoped&gt;
.scroll-container {
  height: 500px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}

.item {
  padding: 20px;
  margin-bottom: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.loader, .end-message {
  text-align: center;
  padding: 20px;
  color: #666;
}
&lt;/style&gt;</code></pre>
          </div>

          <div v-if="activeTab === 'options'" class="options-code">
            <h3>配置选项与优化</h3>
            <pre><code>// 无限滚动的高级配置
interface InfiniteScrollOptions {
  container?: Ref&lt;HTMLElement | null&gt; // 自定义容器
  threshold?: number // 触发加载的阈值（像素）
  pageSize?: number // 每页加载数量
  debounceTime?: number // 防抖时间（毫秒）
  initialLoad?: boolean // 是否初始加载
}

// 增强版Hook
export function useAdvancedInfiniteScroll(
  options: InfiniteScrollOptions = {}
) {
  const {
    container,
    threshold = 200,
    pageSize = 10,
    debounceTime = 100,
    initialLoad = true
  } = options;

  // 实现逻辑...

  // 滚动到指定位置
  const scrollToPosition = (position: number) => {
    if (container?.value) {
      container.value.scrollTop = position;
    }
  };

  // 重置状态
  const reset = () => {
    page.value = 1;
    items.value = [];
    allLoaded.value = false;
    if (initialLoad) loadMore();
  };

  return {
    // 原有属性...
    scrollToPosition,
    reset
  };
}

// 使用虚拟列表优化大数据量
import { useVirtualList } from '@vueuse/core';

const { list, containerProps, wrapperProps } = useVirtualList(
  items,
  {
    itemHeight: 60, // 每项高度
    overscan: 10 // 额外渲染的数量
  }
);</code></pre>
          </div>
        </div>
      </section>

      <!-- 实际演示 -->
      <section class="demo-section">
        <div class="section-header">
          <div class="icon">🚀</div>
          <h2>实际演示</h2>
        </div>

        <div class="demo-container">
          <div class="demo-controls">
            <div class="control-group">
              <label>触发阈值:</label>
              <input type="range" min="50" max="500" v-model="threshold">
              <span>{{ threshold }}px</span>
            </div>

            <div class="control-group">
              <label>加载速度:</label>
              <input type="range" min="100" max="2000" v-model="loadDelay">
              <span>{{ loadDelay }}ms</span>
            </div>

            <button @click="resetDemo">重置演示</button>
          </div>

          <div
            ref="scrollContainer"
            class="scroll-container"
            :style="{ height: containerHeight + 'px' }"
          >
            <div
              v-for="(item, index) in demoItems"
              :key="index"
              class="demo-item"
            >
              <div class="item-number">#{{ item.id }}</div>
              <div class="item-content">
                <div class="avatar"></div>
                <div class="details">
                  <h3>项目 {{ item.id }}</h3>
                  <p>创建于 {{ item.date }}</p>
                </div>
              </div>
            </div>

            <div v-if="loading" class="loader">
              <div class="spinner"></div>
              <p>正在加载更多项目...</p>
            </div>

            <div v-if="allLoaded" class="end-message">
              🎉 已加载所有 {{ demoItems.length }} 个项目
            </div>
          </div>
        </div>
      </section>

      <!-- 最佳实践 -->
      <section class="best-practices">
        <div class="section-header">
          <div class="icon">✅</div>
          <h2>最佳实践</h2>
        </div>

        <div class="practices-grid">
          <div class="practice-card">
            <div class="practice-icon">1️⃣</div>
            <h3>使用防抖/节流</h3>
            <p>避免滚动事件频繁触发，优化性能</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">2️⃣</div>
            <h3>添加加载指示器</h3>
            <p>明确提示用户正在加载新内容</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">3️⃣</div>
            <h3>提供结束标识</h3>
            <p>当所有内容加载完毕时显示提示</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">4️⃣</div>
            <h3>错误处理</h3>
            <p>处理加载失败情况并提供重试选项</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">5️⃣</div>
            <h3>虚拟滚动</h3>
            <p>对于大型列表使用虚拟滚动优化性能</p>
          </div>
          <div class="practice-card">
            <div class="practice-icon">6️⃣</div>
            <h3>键盘导航支持</h3>
            <p>确保键盘用户也能访问所有内容</p>
          </div>
        </div>
      </section>

      <!-- 替代方案 -->
      <section class="alternatives-section">
        <div class="section-header">
          <div class="icon">🔄</div>
          <h2>替代方案</h2>
        </div>

        <div class="alternatives-grid">
          <div class="alternative-card">
            <div class="alt-icon">📖</div>
            <h3>分页导航</h3>
            <p>传统页码导航，适合精确查找内容</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>明确的导航结构</li>
                  <li>容易定位特定页</li>
                  <li>SEO友好</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>需要用户主动点击</li>
                  <li>中断浏览体验</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="alternative-card">
            <div class="alt-icon">⏬</div>
            <h3>"加载更多"按钮</h3>
            <p>手动触发的无限滚动变体</p>
            <div class="pros-cons">
              <div class="pros">
                <h4>优点</h4>
                <ul>
                  <li>用户控制加载时机</li>
                  <li>避免意外加载</li>
                  <li>更易实现</li>
                </ul>
              </div>
              <div class="cons">
                <h4>缺点</h4>
                <ul>
                  <li>需要用户操作</li>
                  <li>中断浏览流程</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 标签页
const tabs = [
  { id: 'composition', label: 'Composition API' },
  { id: 'component', label: '组件示例' },
  { id: 'options', label: '高级配置' }
];
const activeTab = ref('composition');

// 演示数据
const scrollContainer = ref<HTMLElement | null>(null);
const demoItems = ref<any[]>([]);
const page = ref(1);
const loading = ref(false);
const allLoaded = ref(false);
const threshold = ref(200);
const loadDelay = ref(800);
const containerHeight = ref(500);

// 生成演示数据
const generateDemoItems = (page: number, pageSize = 10) => {
  return Array.from({ length: pageSize }, (_, i) => {
    const id = (page - 1) * pageSize + i + 1;
    return {
      id,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString()
    };
  });
};

// 加载更多数据
const loadMore = async () => {
  if (loading.value || allLoaded.value) return;

  loading.value = true;

  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, loadDelay.value));

  const newItems = generateDemoItems(page.value);
  demoItems.value = [...demoItems.value, ...newItems];
  page.value += 1;

  // 模拟数据结束
  if (page.value > 5) {
    allLoaded.value = true;
  }

  loading.value = false;
};

// 检查滚动位置
const checkScroll = () => {
  if (!scrollContainer.value) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;

  if (scrollHeight - scrollTop - clientHeight < threshold.value) {
    loadMore();
  }
};

// 防抖函数
const debounce = (fn: Function, delay: number) => {
  let timeoutId: number;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const debouncedCheck = debounce(checkScroll, 100);

// 设置事件监听
onMounted(() => {
  if (!scrollContainer.value) return;
  scrollContainer.value.addEventListener('scroll', debouncedCheck);
  loadMore(); // 初始加载
});

onUnmounted(() => {
  if (!scrollContainer.value) return;
  scrollContainer.value.removeEventListener('scroll', debouncedCheck);
});

// 重置演示
const resetDemo = () => {
  page.value = 1;
  demoItems.value = [];
  allLoaded.value = false;
  loadMore();
};
</script>

<style lang="less" scoped>
@primary-color: #4361ee;
@secondary-color: #3a0ca3;
@accent-color: #4895ef;
@light-bg: #f8f9fa;
@card-bg: #ffffff;
@text-color: #2b2d42;
@border-color: #e9ecef;
@success-color: #06d6a0;
@warning-color: #ffd166;
@error-color: #ef476f;

.infinite-scroll {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: @text-color;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  min-height: 100vh;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 2rem;
  background: linear-gradient(120deg, @primary-color, @secondary-color);
  border-radius: 16px;
  color: white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);

  h1 {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid @primary-color;

  .icon {
    font-size: 2rem;
    background: @primary-color;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.8rem;
    color: @secondary-color;
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2.5rem;
}

.concept-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .concept-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: @primary-color;
  }

  ul {
    padding-left: 1.2rem;

    li {
      padding: 0.5rem 0;
      border-bottom: 1px dashed @border-color;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

.implementation-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.step {
  display: flex;
  background: @card-bg;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  .step-number {
    width: 40px;
    height: 40px;
    background: @primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1.2rem;
    flex-shrink: 0;
  }

  .step-content {
    h3 {
      color: @secondary-color;
      margin-bottom: 0.8rem;
      font-size: 1.3rem;
    }
  }
}

.visualization {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  margin-top: 2rem;

  h3 {
    text-align: center;
    color: @secondary-color;
    margin-bottom: 1.5rem;
  }
}

.scroll-container {
  height: 300px;
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin: 0 auto 2rem;
  max-width: 400px;
}

.scroll-content {
  padding: 1rem;

  .item {
    background: @light-bg;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    text-align: center;
  }

  .trigger-area {
    background: fade(@primary-color, 10%);
    padding: 1.5rem;
    text-align: center;
    color: @primary-color;
    font-weight: 500;
    border: 2px dashed @primary-color;
    border-radius: 8px;
  }

  .end-message {
    background: fade(@success-color, 10%);
    padding: 1.5rem;
    text-align: center;
    color: darken(@success-color, 20%);
    font-weight: 500;
    border-radius: 8px;
  }
}

.scroll-indicator {
  height: 20px;
  background: @light-bg;
  border-radius: 10px;
  margin: 0 auto;
  max-width: 400px;
  position: relative;

  .scroll-bar {
    position: absolute;
    left: 30%;
    width: 40%;
    height: 100%;
    background: linear-gradient(90deg, @primary-color, @accent-color);
    border-radius: 10px;
  }
}

.scroll-labels {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0.5rem auto 0;

  .label {
    padding: 0.3rem 0.8rem;
    background: @light-bg;
    border-radius: 20px;
    font-size: 0.9rem;

    &.trigger {
      background: fade(@primary-color, 10%);
      color: @primary-color;
    }
  }
}

.code-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  button {
    padding: 0.8rem 1.5rem;
    background: @light-bg;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: lighten(@primary-color, 40%);
    }

    &.active {
      background: @primary-color;
      color: white;
      box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
    }
  }
}

.code-content {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  overflow-x: auto;

  pre {
    background: #2b2d42;
    border-radius: 8px;
    padding: 1.5rem;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      line-height: 1.6;
      color: #f8f9fa;
    }
  }
}

.demo-container {
  background: @card-bg;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: center;

  .control-group {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    label {
      font-weight: 500;
    }

    input[type="range"] {
      width: 150px;
    }
  }

  button {
    background: @primary-color;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: darken(@primary-color, 10%);
      transform: translateY(-2px);
    }
  }
}

.scroll-container {
  border: 1px solid @border-color;
  border-radius: 8px;
  overflow-y: auto;
  background: @light-bg;
}

.demo-item {
  background: white;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  .item-number {
    font-weight: bold;
    color: @primary-color;
    margin-bottom: 0.5rem;
  }

  .item-content {
    display: flex;
    gap: 1rem;

    .avatar {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, @primary-color, @accent-color);
      border-radius: 50%;
    }

    .details {
      flex: 1;

      h3 {
        margin: 0 0 0.3rem;
        font-size: 1.1rem;
      }

      p {
        color: lighten(@text-color, 30%);
        margin: 0;
        font-size: 0.9rem;
      }
    }
  }
}

.loader {
  text-align: center;
  padding: 2rem;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid fade(@primary-color, 20%);
    border-top: 3px solid @primary-color;
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  p {
    color: @primary-color;
    margin: 0;
  }
}

.end-message {
  text-align: center;
  padding: 2rem;
  background: fade(@success-color, 10%);
  color: darken(@success-color, 20%);
  font-weight: 500;
  border-radius: 8px;
  margin: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.8rem;
  margin-bottom: 2rem;
}

.practice-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .practice-icon {
    font-size: 2.5rem;
    margin-bottom: 1.2rem;
    color: @primary-color;
  }

  h3 {
    color: @secondary-color;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
}

.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.8rem;
}

.alternative-card {
  background: @card-bg;
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);

  .alt-icon {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1rem;
    color: @primary-color;
  }

  h3 {
    text-align: center;
    color: @secondary-color;
    margin-bottom: 1rem;
  }

  .pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1.5rem;

    .pros, .cons {
      background: @light-bg;
      border-radius: 8px;
      padding: 1rem;

      h4 {
        color: @secondary-color;
        margin-top: 0;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid @border-color;
      }

      ul {
        padding-left: 1.2rem;
        margin-bottom: 0;

        li {
          padding: 0.3rem 0;
        }
      }
    }

    .pros {
      border-left: 3px solid @success-color;
    }

    .cons {
      border-left: 3px solid @error-color;
    }
  }
}

@media (max-width: 768px) {
  .header {
    padding: 1.5rem;

    h1 {
      font-size: 2rem;
    }
  }

  .demo-controls {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
