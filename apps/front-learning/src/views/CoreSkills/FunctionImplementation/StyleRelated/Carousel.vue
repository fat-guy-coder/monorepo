<template>
  <div class="carousel-container">
    <header class="header">
      <h1>手动实现轮播图组件</h1>
      <p class="subtitle">深入理解轮播图实现原理与最佳实践</p>
    </header>

    <div class="content-wrapper">
      <main class="main-content">
        <section class="section">
          <h2>轮播图实现思路</h2>
          <div class="concept-grid">
            <div class="concept-card">
              <div class="concept-icon">🔄</div>
              <h3>核心原理</h3>
              <p>通过改变元素位置实现图片切换，核心是控制容器的transform: translateX属性</p>
            </div>
            <div class="concept-card">
              <div class="concept-icon">⚙️</div>
              <h3>关键技术</h3>
              <ul>
                <li>使用CSS transform实现平滑过渡</li>
                <li>JavaScript定时器控制自动轮播</li>
                <li>无缝轮播技术（首尾复制）</li>
                <li>触摸事件支持移动端滑动</li>
              </ul>
            </div>
            <div class="concept-card">
              <div class="concept-icon">📊</div>
              <h3>性能优化</h3>
              <ul>
                <li>使用will-change提升动画性能</li>
                <li>合理使用requestAnimationFrame</li>
                <li>避免布局抖动</li>
                <li>图片懒加载</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>轮播图实现演示</h2>
          <div class="carousel-demo">
            <div class="carousel-wrapper" ref="carouselWrapper">
              <div class="carousel-track" :style="trackStyle" @touchstart="handleTouchStart"
                @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                <div v-for="(item, index) in slides" :key="index" class="carousel-slide">
                  <img :src="item.image" :alt="item.title" class="slide-image">
                  <div class="slide-content">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-controls">
              <button class="control-btn prev" @click="prevSlide">‹</button>
              <div class="indicators">
                <div v-for="(_, index) in slidesCount" :key="index" class="indicator"
                  :class="{ active: currentIndex === index }" @click="goToSlide(index)"></div>
              </div>
              <button class="control-btn next" @click="nextSlide">›</button>
            </div>
          </div>

          <div class="status-info">
            <div>当前索引: {{ currentIndex + 1 }} / {{ slidesCount }}</div>
            <div>偏移位置: {{ offset }}px</div>
            <div>自动播放: {{ autoPlay ? '开启' : '暂停' }}</div>
          </div>
        </section>

        <section class="section">
          <h2>实现代码基本介绍</h2>
          <div class="code-tabs">
            <div class="tab-buttons">
              <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }"
                @click="activeTab = tab.id">
                {{ tab.label }}
              </button>
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 'template'">
                <pre>{{ templateCode }}</pre>
              </div>

              <div v-if="activeTab === 'script'">
                <pre>{{ scriptCode }}</pre>
              </div>

              <div v-if="activeTab === 'style'">
                <pre>{{ styleCode }}</pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside class="sidebar">
        <div class="feature-card">
          <h3>核心功能实现</h3>
          <ul class="feature-list">
            <li>自动轮播</li>
            <li>手动切换（上一张/下一张）</li>
            <li>指示器导航</li>
            <li>触摸滑动（移动端）</li>
            <li>无缝循环</li>
            <li>暂停/继续控制</li>
            <li>过渡动画</li>
            <li>响应式设计</li>
          </ul>
        </div>

        <div class="optimization-card">
          <h3>性能优化技巧</h3>
          <ul class="optimization-list">
            <li>使用CSS transform代替left/top</li>
            <li>合理使用requestAnimationFrame</li>
            <li>避免频繁DOM操作</li>
            <li>使用will-change提升动画性能</li>
            <li>图片懒加载</li>
            <li>使用防抖/节流优化事件处理</li>
            <li>移除隐藏图片减少内存占用</li>
          </ul>
        </div>

        <div class="best-practice-card">
          <h3>最佳实践</h3>
          <ul class="practice-list">
            <li>添加键盘导航支持（左右箭头）</li>
            <li>实现无障碍访问（ARIA属性）</li>
            <li>提供暂停/播放按钮</li>
            <li>添加加载状态</li>
            <li>支持自定义过渡效果</li>
            <li>添加预加载机制</li>
            <li>提供API控制方法</li>
          </ul>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2>常见问题与解决方案</h2>
      <div class="problems-grid">
        <div class="problem-card">
          <h3>图片加载导致布局抖动</h3>
          <p><strong>解决方案：</strong>为图片容器设置固定宽高比，使用占位符</p>
          <pre>.slide-image-container {
  aspect-ratio: 16/9;
  background: #f0f0f0;
}</pre>
        </div>

        <div class="problem-card">
          <h3>切换时出现空白</h3>
          <p><strong>解决方案：</strong>使用首尾复制技术实现无缝轮播</p>
          <pre>// 在slides数组首尾添加复制项
slides = [lastItem, ...originalSlides, firstItem];</pre>
        </div>

        <div class="problem-card">
          <h3>移动端触摸不灵敏</h3>
          <p><strong>解决方案：</strong>添加触摸事件支持，计算滑动距离和速度</p>
          <pre>handleTouchStart(e) {
  this.startX = e.touches[0].clientX;
  this.startTime = Date.now();
}</pre>
        </div>

        <div class="problem-card">
          <h3>自动轮播与用户交互冲突</h3>
          <p><strong>解决方案：</strong>用户交互时暂停自动轮播，结束后恢复</p>
          <pre>pauseAutoPlay() {
  clearInterval(this.timer);
  this.autoPlay = false;
}

resumeAutoPlay() {
  this.startAutoPlay();
}</pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>手动实现轮播图组件是提升前端开发能力的重要练习，掌握核心原理后可以应对各种定制化需求</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';

// 轮播图数据
const slides = ref([
  {
    image: 'https://images.unsplash.com/photo-1682685797769-481b48222adf?auto=format&fit=crop&q=80&w=2070',
    title: '自然风光',
    description: '探索大自然的壮丽景观'
  },
  {
    image: 'https://images.unsplash.com/photo-1695653422906-6d5aa8a5d25a?auto=format&fit=crop&q=80&w=1974',
    title: '城市建筑',
    description: '现代都市的摩天大楼与历史建筑'
  },
  {
    image: 'https://images.unsplash.com/photo-1695805716805-0d6b9c4e0e3f?auto=format&fit=crop&q=80&w=1974',
    title: '科技未来',
    description: '创新科技改变人类生活'
  },
  {
    image: 'https://images.unsplash.com/photo-1695915299849-3f5c5e0b0b0f?auto=format&fit=crop&q=80&w=1974',
    title: '艺术文化',
    description: '传统与现代艺术的完美融合'
  }
]);

// 轮播图状态
const currentIndex = ref(0);
const offset = ref(0);
const autoPlay = ref(true);
const carouselWrapper = ref<HTMLElement | null>(null);

// 计算属性
const slidesCount = computed(() => slides.value.length);
const slideWidth = computed(() => {
  return carouselWrapper.value?.clientWidth || 0;
});
const trackStyle = computed(() => {
  return {
    transform: `translateX(${offset.value}px)`,
    width: `${slidesCount.value * 100}%`,
    transition: 'transform 0.5s ease'
  };
});

// 触摸事件相关
const touchState = reactive({
  startX: 0,
  startTime: 0,
  isSwiping: false
});

// 自动播放
let timer: number | null = null;

const startAutoPlay = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    nextSlide();
  }, 3000) as unknown as number;
  autoPlay.value = true;
};

const stopAutoPlay = () => {
  if (timer) clearInterval(timer);
  autoPlay.value = false;
};

// 切换幻灯片
const goToSlide = (index: number) => {
  currentIndex.value = index;
  offset.value = -index * slideWidth.value;
};

const nextSlide = () => {
  const nextIndex = (currentIndex.value + 1) % slidesCount.value;
  goToSlide(nextIndex);
};

const prevSlide = () => {
  const prevIndex = (currentIndex.value - 1 + slidesCount.value) % slidesCount.value;
  goToSlide(prevIndex);
};

// 触摸事件处理
const handleTouchStart = (e: TouchEvent) => {
  touchState.startX = e.touches[0].clientX;
  touchState.startTime = Date.now();
  touchState.isSwiping = true;
  stopAutoPlay();
};

const handleTouchMove = (e: TouchEvent) => {
  if (!touchState.isSwiping) return;

  const currentX = e.touches[0].clientX;
  const diff = currentX - touchState.startX;
  offset.value = -currentIndex.value * slideWidth.value + diff;
};

const handleTouchEnd = (e: TouchEvent) => {
  if (!touchState.isSwiping) return;

  const endX = e.changedTouches[0].clientX;
  const diff = endX - touchState.startX;
  const timeDiff = Date.now() - touchState.startTime;
  const velocity = Math.abs(diff) / timeDiff;

  // 根据滑动距离和速度决定是否切换
  const threshold = slideWidth.value / 4;

  if (diff < -threshold || (diff < 0 && velocity > 0.3)) {
    nextSlide();
  } else if (diff > threshold || (diff > 0 && velocity > 0.3)) {
    prevSlide();
  } else {
    goToSlide(currentIndex.value);
  }

  touchState.isSwiping = false;
  startAutoPlay();
};

// 初始化
onMounted(() => {
  startAutoPlay();

  // 窗口大小变化时重置轮播图
  window.addEventListener('resize', () => {
    offset.value = -currentIndex.value * (carouselWrapper.value?.clientWidth || 0);
  });
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// 代码展示相关
const activeTab = ref('template');
const tabs = [
  { id: 'template', label: '模板代码' },
  { id: 'script', label: '脚本代码' },
  { id: 'style', label: '样式代码' }
];

const templateCode = `<div class="carousel-wrapper" ref="carouselWrapper">
  <div
    class="carousel-track"
    :style="trackStyle"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div
      v-for="(item, index) in slides"
      :key="index"
      class="carousel-slide"
    >
      <img :src="item.image" :alt="item.title" class="slide-image">
      <div class="slide-content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</div>

<div class="carousel-controls">
  <button class="control-btn prev" @click="prevSlide">‹</button>
  <div class="indicators">
    <div
      v-for="(_, index) in slidesCount"
      :key="index"
      class="indicator"
      :class="{ active: currentIndex === index }"
      @click="goToSlide(index)"
    ></div>
  </div>
  <button class="control-btn next" @click="nextSlide">›</button>
</div>`;

const scriptCode = `import { ref, computed, onMounted, onUnmounted, reactive } from 'vue';

const slides = ref([...]); // 幻灯片数据

const currentIndex = ref(0);
const offset = ref(0);
const autoPlay = ref(true);
const carouselWrapper = ref(null);

// 计算属性
const slidesCount = computed(() => slides.value.length);
const slideWidth = computed(() => {
  return carouselWrapper.value?.clientWidth || 0;
});
const trackStyle = computed(() => {
  return {
    transform: \`translateX(\${offset.value}px)\`,
    width: \`\${slidesCount.value * 100}%\`,
    transition: 'transform 0.5s ease'
  };
});

// 自动播放
let timer = null;

const startAutoPlay = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    nextSlide();
  }, 3000);
  autoPlay.value = true;
};

const stopAutoPlay = () => {
  if (timer) clearInterval(timer);
  autoPlay.value = false;
};

// 切换幻灯片
const goToSlide = (index) => {
  currentIndex.value = index;
  offset.value = -index * slideWidth.value;
};

const nextSlide = () => {
  const nextIndex = (currentIndex.value + 1) % slidesCount.value;
  goToSlide(nextIndex);
};

const prevSlide = () => {
  const prevIndex = (currentIndex.value - 1 + slidesCount.value) % slidesCount.value;
  goToSlide(prevIndex);
};

// 触摸事件处理
const handleTouchStart = (e) => {
  // 触摸开始处理
};

const handleTouchMove = (e) => {
  // 触摸移动处理
};

const handleTouchEnd = (e) => {
  // 触摸结束处理
};

// 生命周期
onMounted(() => {
  startAutoPlay();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('resize', handleResize);
});`;

const styleCode = `.carousel-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.carousel-track {
  display: flex;
  height: 400px;
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 20px;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #4285f4;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #3367d6;
    transform: scale(1.1);
  }
}

.indicators {
  display: flex;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background: #4285f4;
    transform: scale(1.2);
  }

  &:hover {
    background: #3367d6;
  }
}`;
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

.carousel-container {
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

.carousel-demo {
  margin-bottom: 30px;
  border: 1px solid @border-color;
  border-radius: 12px;
  padding: 20px;
  background: white;
  box-shadow: @card-shadow;
}

.carousel-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 400px;
}

.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 20px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
  }
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
}

.control-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: @primary-color;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: darken(@primary-color, 10%);
    transform: scale(1.1);
  }
}

.indicators {
  display: flex;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background: @primary-color;
    transform: scale(1.2);
  }

  &:hover {
    background: darken(@primary-color, 10%);
  }
}

.status-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
  font-size: 0.9rem;
  color: #5f6368;
  background: #f1f3f4;
  padding: 10px;
  border-radius: 6px;
}

.code-tabs {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: @card-shadow;

  .tab-buttons {
    display: flex;
    border-bottom: 1px solid @border-color;

    button {
      flex: 1;
      padding: 12px 20px;
      border: none;
      background: #f8f9fa;
      cursor: pointer;
      font-size: 1rem;
      color: #5f6368;
      transition: all 0.3s ease;

      &.active {
        background: white;
        color: @primary-color;
        font-weight: 500;
        border-bottom: 2px solid @primary-color;
      }

      &:hover:not(.active) {
        background: #e8eaed;
      }
    }
  }

  .tab-content {
    pre {
      padding: 20px;
      overflow-x: auto;
      background: #f8f9fa;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      max-height: 400px;
    }
  }
}

.feature-card,
.optimization-card,
.best-practice-card {
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

.feature-list,
.optimization-list,
.practice-list {
  list-style: none;

  li {
    padding: 10px 0;
    border-bottom: 1px solid fade(@border-color, 30%);
    position: relative;
    padding-left: 25px;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: @primary-color;
      font-size: 1.2rem;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.problems-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.problem-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: @card-shadow;
  border-left: 4px solid @accent-color;

  h3 {
    color: @accent-color;
    margin-bottom: 15px;
  }

  pre {
    background: #f1f3f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 0.85rem;
    margin-top: 15px;
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
  .problems-grid {
    grid-template-columns: 1fr;
  }

  .carousel-wrapper {
    height: 300px;
  }

  .status-info {
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }
}
</style>
