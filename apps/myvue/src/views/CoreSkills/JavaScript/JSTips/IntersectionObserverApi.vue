<template>
  <div class="intersection-observer-demo">
    <h1>IntersectionObserver 基础介绍</h1>

    <h3>
      <p>IntersectionObserver 是一个用于异步观察目标元素与其祖先元素或视口的交叉状态的 API。它可以用于实现懒加载、无限滚动等功能，极大地提高了性能和用户体验。</p>
      <p>通过使用 IntersectionObserver，开发者可以在元素进入或离开视口时执行特定的操作，而无需频繁地监听滚动事件，从而减少了性能开销。</p>
      <p>该 API 提供了灵活的配置选项，如根元素、边距和阈值，使得开发者可以根据需求精确控制观察行为。</p>
    </h3>

    <!-- 使用方法示例 -->
    <section>
      <h2>使用方法示例</h2>
      <div class="method-example">
        <h3>基本用法</h3>
        <p>以下是如何创建和使用 IntersectionObserver 的示例代码：</p>
        <pre>
        <code>
        // 创建一个 IntersectionObserver 实例 var observer = new IntersectionObserver(callback[, options])
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
          // 当目标元素进入视口时执行的操作
          if (entry.isIntersecting) {
            console.log('元素进入视口');
          } else {
            console.log('元素离开视口');
          }
          });
        }, {
          // 配置选项
          threshold: 0.5 // 当 50% 的目标元素可见时触发
        });

        // 选择要观察的目标元素
        const target = document.querySelector('.observer-target');
        if (target) {
          observer.observe(target); // 开始观察目标元素
        }
        </code>
      </pre>
      </div>
      <div>
        <h3>IntersectionObserver 的回调函数</h3>
        <p>当观察的目标元素的交叉状态发生变化时，回调函数会被调用。该函数接收两个参数：</p>
        <ul>
          <li>
            <strong>entries</strong>: 一个 IntersectionObserverEntry 对象的数组，包含了每个被观察元素的状态信息。
          </li>
          <li>
            <strong>observer</strong>: 当前的 IntersectionObserver 实例，可以用于进一步的操作。
          </li>
        </ul>
        <p>每个IntersectionObserverEntry对象包含以下属性：</p>
        <ul>
          <li><strong>target</strong>: 被观察的目标元素。</li>
          <li><strong>isIntersecting</strong>: 布尔值，表示目标元素是否与视口相交。</li>
          <li><strong>intersectionRatio</strong>: 目标元素与视口相交的比例。</li>
          <li><strong>boundingClientRect</strong>: 目标元素的边界矩形。</li>
          <li><strong>intersectionRect</strong>: 目标元素与视口相交的矩形。</li>
        </ul>
      </div>
    </section>

    <!-- IntersectionObserver options 参数介绍 -->
    <section>
      <h2>IntersectionObserver options 参数介绍</h2>
      <div class="options-description">
        <p>在创建 IntersectionObserver 实例时，可以传入一个可选的配置对象，包含以下属性：</p>
        <ul>
          <li>
            <strong>root</strong>: 观察器的根元素，默认为浏览器视口。
          </li>
          <li>
            <strong>rootMargin</strong>: 观察区域的边距，可以用来提前触发观察，格式为 "10px 20px 30px 40px"（上 右 下 左）。
          </li>
          <li>
            <strong>threshold</strong>: 一个数字或数组，表示目标元素与根元素相交的比例，只有当比例达到该值时，回调函数才会被触发。
          </li>
        </ul>
        <p>通过合理配置这些选项，开发者可以精确控制观察行为，以满足不同的需求。</p>
      </div>
    </section>

    <!-- IntersectionObserver API 介绍 -->
    <section>
      <h2>IntersectionObserver API 介绍</h2>
      <div class="api-description">
        <h3>IntersectionObserver</h3>
        <p>IntersectionObserver 是一个用于异步观察目标元素与其祖先元素或视口的交叉状态的 API。它提供了以下主要方法：</p>
        <ul>
          <li>
            <strong>observe(target: Element): void</strong>
            <p>开始观察指定的目标元素。</p>
          </li>
          <li>
            <strong>unobserve(target: Element): void</strong>
            <p>停止观察指定的目标元素。</p>
          </li>
          <li>
            <strong>disconnect(): void</strong>
            <p>停止观察所有目标元素，并清除观察器的所有状态。</p>
          </li>
        </ul>
        <p>通过这些方法，开发者可以灵活地控制哪些元素需要被观察，以及在何时停止观察。</p>
      </div>
    </section>

    <!-- 基本用法演示 -->
    <section>
      <h2>基本用法</h2>
      <div class="demo-box">
        <div ref="targetElement" class="observer-target">
          {{ targetVisible ? "元素在视口中" : "滚动使元素进入视口" }}
        </div>
        <div class="scroll-area"></div>
      </div>
      <div class="status">可见状态: {{ targetVisible }}</div>
    </section>

    <!-- 配置选项说明 -->
    <section>
      <h2>配置选项</h2>
      <div class="options-grid">
        <div class="option-card">
          <h3>root</h3>
          <p>观察器的根元素，默认是浏览器视口</p>
        </div>
        <div class="option-card">
          <h3>rootMargin</h3>
          <p>"10px 20px 30px 40px" (上 右 下 左)</p>
          <p>提前触发观察的边距</p>
        </div>
        <div class="option-card">
          <h3>threshold</h3>
          <p>可见比例阈值: {{ thresholds.join(', ') }}</p>
          <input type="range" min="0" max="1" step="0.1" v-model="currentThreshold">
        </div>
      </div>
    </section>

    <!-- 使用场景示例 -->
    <section>
      <h2>使用场景</h2>
      <div class="use-cases">
        <!-- 图片懒加载 -->
        <div class="use-case">
          <h3>图片懒加载</h3>
          <div v-for="(img, index) in lazyImages" :key="index" class="lazy-image-container">
            <img v-if="img.isVisible" :src="img.src" alt="Lazy loaded image">
            <div v-else class="image-placeholder"></div>
          </div>
        </div>

        <!-- 无限滚动 -->
        <div class="use-case">
          <h3>无限滚动</h3>
          <div v-for="item in items" :key="item" class="list-item">
            Item {{ item }}
          </div>
          <div ref="loaderElement" class="loading-trigger">
            {{ isLoading ? '加载中...' : '滚动加载更多' }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 基本用法相关
const targetElement = ref<HTMLElement | null>(null)
const targetVisible = ref(false)

// 配置选项相关
const thresholds = ref([0, 0.5, 1])
const currentThreshold = ref(0)

// 图片懒加载相关
const lazyImages = ref(
  Array.from({ length: 10 }, (_, i) => ({
    src: `https://picsum.photos/200/150?random=${i}`,
    isVisible: false
  }))
)

// 无限滚动相关
const items = ref(Array.from({ length: 20 }, (_, i) => i + 1))
const loaderElement = ref<HTMLElement | null>(null)
const isLoading = ref(false)

// 初始化 IntersectionObserver
let observer: IntersectionObserver | null = null
let lazyLoadObserver: IntersectionObserver | null = null
let infiniteScrollObserver: IntersectionObserver | null = null

onMounted(() => {
  // 基本观察器
  if (targetElement.value) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        targetVisible.value = entry.isIntersecting
      })
    }, {
      threshold: currentThreshold.value
    })
    observer.observe(targetElement.value)
  }

  // 图片懒加载
  lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Number((entry.target as HTMLElement).dataset.index)
        lazyImages.value[index].isVisible = true
        lazyLoadObserver?.unobserve(entry.target)
      }
    })
  }, {
    rootMargin: '200px 0px' // 提前200px加载
  })

  document.querySelectorAll('.lazy-image-container').forEach((container, index) => {
    (container as HTMLElement).dataset.index = index.toString()
    lazyLoadObserver?.observe(container)
  })

  // 无限滚动
  infiniteScrollObserver = new IntersectionObserver(async ([entry]) => {
    if (entry.isIntersecting && !isLoading.value) {
      isLoading.value = true
      // 模拟异步加载
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newItems = Array.from(
        { length: 10 },
        (_, i) => items.value.length + i + 1
      )
      items.value.push(...newItems)
      isLoading.value = false
    }
  })

  if (loaderElement.value) {
    infiniteScrollObserver.observe(loaderElement.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
  lazyLoadObserver?.disconnect()
  infiniteScrollObserver?.disconnect()
})
</script>

<style scoped>
pre {
  background: #000;
}

code {
  color: #fff;
}

.intersection-observer-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.demo-box {
  border: 2px solid #eee;
  padding: 1rem;
  margin: 1rem 0;
  position: relative;
  height: 300px;
  overflow-y: scroll;
}

.scroll-area {
  height: 150vh;
}

.observer-target {
  width: 200px;
  height: 100px;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 200px 0;
  transition: all 0.3s;
  border: 2px solid #2196f3;
}

.observer-target[data-visible="true"] {
  background: #c8e6c9;
  transform: scale(1.05);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.option-card {
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.use-cases {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.lazy-image-container {
  min-height: 200px;
  margin: 1rem 0;
}

.image-placeholder {
  width: 200px;
  height: 150px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-item {
  padding: 1rem;
  margin: 0.5rem 0;
  background: #f0f4c3;
  border-radius: 4px;
}

.loading-trigger {
  padding: 2rem;
  text-align: center;
  background: #ffecb3;
  margin: 2rem 0;
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  margin-top: 2rem;
}

.status {
  margin: 1rem 0;
  padding: 1rem;
  background: #e8f5e9;
}
</style>
