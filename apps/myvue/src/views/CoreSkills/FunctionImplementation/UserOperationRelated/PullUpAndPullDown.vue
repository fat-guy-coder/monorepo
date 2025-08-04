<template>
  <div class="pull-container">
    <!-- 头部区域 -->
    <header class="header">
      <h1 class="title">上拉加载 & 下拉刷新</h1>
      <p class="subtitle">移动端列表交互的核心功能实现</p>
    </header>

    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-group">
        <label>列表类型：</label>
        <div class="radio-group">
          <label v-for="type in listTypes" :key="type.value">
            <input type="radio" v-model="listType" :value="type.value">
            {{ type.label }}
          </label>
        </div>
      </div>

      <div class="control-group">
        <label>加载动画：</label>
        <div class="radio-group">
          <label v-for="anim in animations" :key="anim.value">
            <input type="radio" v-model="animationType" :value="anim.value">
            {{ anim.label }}
          </label>
        </div>
      </div>

      <div class="control-group">
        <label>模拟延迟：</label>
        <input type="range" min="200" max="2000" step="100" v-model="simulateDelay">
        <span>{{ simulateDelay }}ms</span>
      </div>

      <div class="control-group">
        <button @click="resetDemo">重置演示</button>
        <button @click="toggleDebugMode">
          {{ debugMode ? '关闭' : '开启' }}调试模式
        </button>
      </div>
    </div>

    <!-- 演示区域 -->
    <div class="demo-container" ref="scrollContainer" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
      @touchend="handleTouchEnd">
      <!-- 下拉刷新区域 -->
      <div class="refresh-indicator" :class="{ active: isRefreshing }" :style="{ height: `${pullDownHeight}px` }">
        <div class="indicator-content">
          <div class="loader" v-if="isRefreshing" :class="animationType"></div>
          <template v-else>
            <div class="pull-text" v-if="pullDownHeight < refreshThreshold">
              下拉刷新...
            </div>
            <div class="release-text" v-else>
              释放刷新...
            </div>
          </template>
        </div>
      </div>

      <!-- 列表内容区域 -->
      <ul class="content-list">
        <li v-for="(item, index) in listData" :key="item.id" class="list-item" :class="{
          'even-item': index % 2 === 0,
          'odd-item': index % 2 !== 0
        }">
          <div class="item-header">
            <div class="avatar" :style="{ backgroundColor: stringToColor(item.name) }">
              {{ item.name.charAt(0) }}
            </div>
            <div class="item-info">
              <div class="name">{{ item.name }}</div>
              <div class="date">{{ formatDate(item.date) }}</div>
            </div>
          </div>
          <div class="item-content">
            {{ item.content }}
          </div>
        </li>
      </ul>

      <!-- 上拉加载区域 -->
      <div class="load-more-indicator" :class="{ active: isLoadingMore }">
        <div class="indicator-content">
          <div class="loader" v-if="isLoadingMore" :class="animationType"></div>
          <div v-else-if="!hasMoreData">
            没有更多数据了
          </div>
          <div v-else>
            上拉加载更多
          </div>
        </div>
      </div>
    </div>

    <!-- 原理说明 -->
    <div class="explanation-section">
      <h2 class="section-title">实现原理</h2>

      <div class="principle-card">
        <div class="principle-header">
          <div class="icon">⬇️</div>
          <h3>下拉刷新机制</h3>
        </div>
        <div class="principle-content">
          <ol>
            <li>监听容器的 <code>touchstart</code>、<code>touchmove</code> 和 <code>touchend</code> 事件</li>
            <li>在 <code>touchstart</code> 中记录初始位置</li>
            <li>在 <code>touchmove</code> 中计算下拉距离，并应用阻尼效果</li>
            <li>当下拉距离超过阈值时，提示"释放刷新"</li>
            <li>在 <code>touchend</code> 中判断下拉距离是否达到阈值：
              <ul>
                <li>达到阈值：触发刷新操作，显示加载动画</li>
                <li>未达到：平滑回弹到初始位置</li>
              </ul>
            </li>
            <li>刷新完成后重置状态</li>
          </ol>
        </div>
      </div>

      <div class="principle-card">
        <div class="principle-header">
          <div class="icon">⬆️</div>
          <h3>上拉加载机制</h3>
        </div>
        <div class="principle-content">
          <ol>
            <li>监听容器的滚动事件</li>
            <li>计算滚动容器是否滚动到底部：
              <pre>scrollTop + clientHeight >= scrollHeight - threshold</pre>
            </li>
            <li>当接近底部时触发加载更多操作</li>
            <li>显示加载动画，请求新数据</li>
            <li>数据加载完成后更新列表</li>
            <li>如果没有更多数据，显示提示信息</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- 代码实现 -->
    <div class="code-section">
      <h2 class="section-title">核心代码实现</h2>

      <div class="code-tabs">
        <div v-for="tab in codeTabs" :key="tab.id" class="tab-item" :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id">
          {{ tab.label }}
        </div>
      </div>

      <div class="code-content">
        <pre v-if="activeTab === 'template'"><code>{{ templateCode }}</code></pre>
        <pre v-if="activeTab === 'script'"><code>{{ scriptCode }}</code></pre>
        <pre v-if="activeTab === 'style'"><code>{{ styleCode }}</code></pre>
      </div>
    </div>

    <!-- 调试信息 -->
    <div class="debug-info" v-if="debugMode">
      <h3>调试信息</h3>
      <div>下拉距离: {{ pullDownHeight.toFixed(1) }}px</div>
      <div>状态: {{ pullState }}</div>
      <div>列表数量: {{ listData.length }} 条</div>
      <div>上次刷新: {{ lastRefreshTime }}</div>
      <div>上次加载: {{ lastLoadTime }}</div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2023 前端交互设计 | 上拉加载与下拉刷新提供流畅的移动端用户体验</p>
      <p>提示：在实际项目中应考虑节流、防抖和边界情况处理</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';

// 配置选项
const listTypes = [
  { label: '文本列表', value: 'text' },
  { label: '图片列表', value: 'image' },
  { label: '混合内容', value: 'mixed' }
];

const animations = [
  { label: '旋转动画', value: 'rotate' },
  { label: '跳动动画', value: 'bounce' },
  { label: '波浪动画', value: 'wave' }
];

// 状态管理
const listType = ref('text');
const animationType = ref('rotate');
const simulateDelay = ref(800);
const debugMode = ref(false);
const scrollContainer = ref<HTMLElement | null>(null);

// 下拉刷新状态
const startY = ref(0);
const currentY = ref(0);
const isRefreshing = ref(false);
const pullDownHeight = ref(0);
const isPulling = ref(false);
const lastRefreshTime = ref('');

// 上拉加载状态
const isLoadingMore = ref(false);
const hasMoreData = ref(true);
const lastLoadTime = ref('');

// 列表数据
const listData = reactive<Array<{
  id: number;
  name: string;
  date: Date;
  content: string;
}>>([]);

// 初始化数据
const initData = () => {
  listData.splice(0, listData.length);
  for (let i = 1; i <= 15; i++) {
    listData.push(generateItem(i));
  }
  hasMoreData.value = true;
  lastRefreshTime.value = '';
  lastLoadTime.value = '';
};

// 生成列表项
const generateItem = (id: number) => {
  const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
  const contents = [
    '这是一条测试内容，用于展示下拉刷新和上拉加载效果。',
    '前端交互设计是用户体验的重要组成部分。',
    'Vue3的Composition API提供了更灵活的代码组织方式。',
    '移动端应用中，流畅的滚动体验至关重要。',
    '上拉加载和下拉刷新是移动端列表的标配功能。',
    '响应式设计确保在不同设备上都有良好的体验。'
  ];

  return {
    id,
    name: names[Math.floor(Math.random() * names.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    content: contents[Math.floor(Math.random() * contents.length)]
  };
};

// 格式化日期
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 生成颜色
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 65%)`;
  return color;
};

// 下拉刷新阈值
const refreshThreshold = 80;

// 触摸事件处理
const handleTouchStart = (e: TouchEvent) => {
  // 只有在顶部且没有刷新时才处理
  if (scrollContainer.value && scrollContainer.value.scrollTop === 0 && !isRefreshing.value) {
    startY.value = e.touches[0].pageY;
    isPulling.value = true;
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isPulling.value) return;

  currentY.value = e.touches[0].pageY;
  const distance = currentY.value - startY.value;

  // 只有下拉才处理
  if (distance > 0) {
    // 应用阻尼效果：距离越大，阻力越大
    pullDownHeight.value = Math.pow(distance, 0.8);
    e.preventDefault();
  }
};

const handleTouchEnd = () => {
  if (!isPulling.value) return;

  isPulling.value = false;

  if (pullDownHeight.value >= refreshThreshold) {
    // 触发刷新
    triggerRefresh();
  } else {
    // 未达到阈值，回弹
    resetPullDown();
  }
};

// 触发刷新
const triggerRefresh = () => {
  isRefreshing.value = true;
  lastRefreshTime.value = new Date().toLocaleTimeString();

  // 模拟异步请求
  setTimeout(() => {
    // 清空数据并重新加载
    listData.splice(0, listData.length);
    for (let i = 1; i <= 15; i++) {
      listData.push(generateItem(i));
    }

    // 重置状态
    isRefreshing.value = false;
    resetPullDown();
    hasMoreData.value = true;
  }, simulateDelay.value);
};

// 重置下拉状态
const resetPullDown = () => {
  const resetAnimation = () => {
    if (pullDownHeight.value > 0) {
      pullDownHeight.value = Math.max(0, pullDownHeight.value - 20);
      requestAnimationFrame(resetAnimation);
    }
  };
  resetAnimation();
};

// 监听滚动事件
const handleScroll = () => {
  if (!scrollContainer.value || isLoadingMore.value || !hasMoreData.value) return;

  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
  const threshold = 50; // 距离底部50px触发加载

  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    loadMoreData();
  }
};

// 加载更多数据
const loadMoreData = () => {
  isLoadingMore.value = true;
  lastLoadTime.value = new Date().toLocaleTimeString();

  // 模拟异步请求
  setTimeout(() => {
    const currentLength = listData.length;

    // 模拟数据限制
    if (currentLength >= 45) {
      hasMoreData.value = false;
    } else {
      for (let i = 1; i <= 10; i++) {
        listData.push(generateItem(currentLength + i));
      }
    }

    isLoadingMore.value = false;
  }, simulateDelay.value);
};

// 重置演示
const resetDemo = () => {
  isRefreshing.value = false;
  isLoadingMore.value = false;
  pullDownHeight.value = 0;
  initData();
};

// 切换调试模式
const toggleDebugMode = () => {
  debugMode.value = !debugMode.value;
};

// 计算下拉状态
const pullState = computed(() => {
  if (isRefreshing.value) return '刷新中...';
  if (isPulling.value) {
    return pullDownHeight.value >= refreshThreshold
      ? '释放刷新'
      : '下拉刷新';
  }
  return '等待操作';
});

// 代码展示
const codeTabs = [
  { id: 'template', label: '模板代码' },
  { id: 'script', label: '脚本代码' },
  { id: 'style', label: '样式代码' }
];
const activeTab = ref('template');

const templateCode = `<div
  class="demo-container"
  ref="scrollContainer"
  @touchstart="handleTouchStart"
  @touchmove="handleTouchMove"
  @touchend="handleTouchEnd"
>
  <!-- 下拉刷新指示器 -->
  <div
    class="refresh-indicator"
    :style="{ height: \`\${pullDownHeight}px\` }"
  >
    <!-- 指示器内容 -->
  </div>

  <!-- 列表内容 -->
  <ul class="content-list">
    <li v-for="item in listData" :key="item.id">
      <!-- 列表项内容 -->
    </li>
  </ul>

  <!-- 上拉加载指示器 -->
  <div class="load-more-indicator">
    <!-- 指示器内容 -->
  </div>
</div>`;

const scriptCode = `// 下拉刷新逻辑
const handleTouchStart = (e) => {
  if (scrollTop === 0) {
    startY = e.touches[0].pageY;
    isPulling = true;
  }
};

const handleTouchMove = (e) => {
  if (!isPulling) return;

  const distance = e.touches[0].pageY - startY;
  if (distance > 0) {
    // 应用阻尼效果
    pullDownHeight = Math.pow(distance, 0.8);
  }
};

const handleTouchEnd = () => {
  if (!isPulling) return;

  isPulling = false;
  if (pullDownHeight >= threshold) {
    triggerRefresh();
  } else {
    resetPullDown();
  }
};

// 上拉加载逻辑
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = container;

  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    loadMoreData();
  }
};`;

const styleCode = `/* 下拉刷新指示器 */
.refresh-indicator {
  position: relative;
  overflow: hidden;
  transition: height 0.2s ease;
}

/* 加载动画 */
.loader {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 上拉加载指示器 */
.load-more-indicator {
  padding: 15px;
  text-align: center;
}`;

// 生命周期钩子
onMounted(() => {
  initData();
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style lang="less" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --accent: #9b59b6;
  --dark: #2c3e50;
  --light: #f8f9fa;
  --gray: #95a5a6;
  --border-radius: 12px;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.pull-container {
  font-family: 'Noto Sans SC', sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  background: var(--light);
  color: var(--dark);
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem 1rem;

  .title {
    font-size: 2.2rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--gray);
    font-weight: 400;
  }
}

.control-panel {
  background: white;
  border-radius: var(--border-radius);
  padding: 1.2rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--box-shadow);

  .control-group {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    label {
      margin-right: 0.8rem;
      font-weight: 500;
      min-width: 80px;
    }

    .radio-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.8rem;

      label {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: normal;

        input {
          margin-right: 0.3rem;
        }
      }
    }

    input[type="range"] {
      flex: 1;
      max-width: 200px;
      margin-right: 0.8rem;
    }

    button {
      padding: 0.5rem 1rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 0.8rem;
      transition: var(--transition);

      &:hover {
        background: #2980b9;
      }
    }
  }
}

.demo-container {
  flex: 1;
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  overflow-y: auto;
  touch-action: pan-y;

  .refresh-indicator {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    transition: height 0.2s ease;

    .indicator-content {
      position: absolute;
      bottom: 15px;
      width: 100%;
      text-align: center;
      color: var(--gray);
      font-size: 0.95rem;

      .pull-text,
      .release-text {
        padding: 5px 0;
      }

      .release-text {
        color: var(--primary);
        font-weight: 500;
      }
    }
  }

  .content-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .list-item {
      padding: 1.2rem;
      border-bottom: 1px solid #eee;
      transition: var(--transition);

      &.even-item {
        background: rgba(240, 240, 245, 0.3);
      }

      .item-header {
        display: flex;
        align-items: center;
        margin-bottom: 0.8rem;

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin-right: 0.8rem;
          flex-shrink: 0;
        }

        .item-info {
          flex: 1;

          .name {
            font-weight: 500;
            margin-bottom: 0.2rem;
          }

          .date {
            font-size: 0.8rem;
            color: var(--gray);
          }
        }
      }

      .item-content {
        font-size: 0.95rem;
        line-height: 1.5;
        color: #555;
      }
    }
  }

  .load-more-indicator {
    padding: 1.5rem;
    text-align: center;
    color: var(--gray);
    font-size: 0.9rem;
    transition: var(--transition);

    &.active {
      background: rgba(52, 152, 219, 0.05);
    }
  }
}

// 加载动画
.loader {
  display: inline-block;
  width: 24px;
  height: 24px;

  &.rotate {
    border: 3px solid rgba(52, 152, 219, 0.2);
    border-radius: 50%;
    border-top-color: var(--primary);
    animation: spin 1s linear infinite;
  }

  &.bounce {
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--primary);
      animation: bounce 1.4s infinite ease-in-out both;
    }

    &::before {
      left: 0;
      animation-delay: -0.32s;
    }

    &::after {
      left: 16px;
      animation-delay: -0.16s;
    }
  }

  &.wave {
    display: flex;
    justify-content: space-between;
    width: 36px;

    div {
      width: 6px;
      height: 100%;
      background: var(--primary);
      animation: wave 1.2s infinite ease-in-out;

      &:nth-child(1) {
        animation-delay: -1.2s;
      }

      &:nth-child(2) {
        animation-delay: -1.1s;
      }

      &:nth-child(3) {
        animation-delay: -1.0s;
      }

      &:nth-child(4) {
        animation-delay: -0.9s;
      }

      &:nth-child(5) {
        animation-delay: -0.8s;
      }
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1.0);
  }
}

@keyframes wave {

  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1.0);
  }
}

.explanation-section {
  margin-top: 2rem;

  .section-title {
    font-size: 1.8rem;
    color: var(--dark);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary);
  }

  .principle-card {
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 1.5rem;
    overflow: hidden;

    .principle-header {
      display: flex;
      align-items: center;
      padding: 1rem 1.2rem;
      background: linear-gradient(to right, var(--primary), #3a7bd5);
      color: white;

      .icon {
        font-size: 1.5rem;
        margin-right: 0.8rem;
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 500;
      }
    }

    .principle-content {
      padding: 1.2rem;

      ol,
      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.8rem;
          line-height: 1.6;
        }
      }

      pre {
        background: #2c3e50;
        color: #f8f8f2;
        padding: 0.8rem;
        border-radius: 6px;
        margin: 0.8rem 0;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
      }

      code {
        background: #f1f1f1;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
      }
    }
  }
}

.code-section {
  margin-top: 2rem;

  .section-title {
    font-size: 1.8rem;
    color: var(--dark);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary);
  }

  .code-tabs {
    display: flex;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;

    .tab-item {
      padding: 0.8rem 1.2rem;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: var(--transition);
      font-weight: 500;

      &.active {
        border-bottom-color: var(--primary);
        color: var(--primary);
      }
    }
  }

  .code-content {
    background: #2c3e50;
    border-radius: var(--border-radius);
    padding: 1.2rem;
    overflow-x: auto;

    pre {
      margin: 0;
      color: #f8f8f2;
      font-family: 'Source Code Pro', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
}

.debug-info {
  background: #2c3e50;
  color: #ecf0f1;
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-top: 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;

  h3 {
    margin-bottom: 0.5rem;
    color: var(--secondary);
  }

  div {
    margin-bottom: 0.3rem;
  }
}

.footer {
  text-align: center;
  padding: 1.5rem 0;
  margin-top: 2rem;
  color: var(--gray);
  font-size: 0.9rem;

  p {
    margin-bottom: 0.3rem;
  }
}

@media (max-width: 600px) {
  .pull-container {
    padding: 0.8rem;
  }

  .header {
    padding: 1rem 0;

    .title {
      font-size: 1.8rem;
    }
  }

  .control-panel {
    padding: 1rem;

    .control-group {
      flex-direction: column;
      align-items: flex-start;

      label {
        margin-bottom: 0.5rem;
      }

      .radio-group {
        margin-bottom: 0.5rem;
      }

      button {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>