<template>
  <div class="browser-rendering">
    <header class="page-header">
      <h1>浏览器渲染机制详解</h1>
      <p class="subtitle">探索从HTML到像素的奇妙旅程</p>
    </header>

    <main class="content">
      <section class="intro-section">
        <p>当您在浏览器中输入网址并按下回车后，浏览器会执行一系列复杂的操作将代码转换为可视化的网页。这个过程被称为"浏览器渲染机制"。</p>
        <div class="interactive-demo" @click="startDemo">
          <div class="demo-text" :class="{ active: isDemoActive }">
            {{ isDemoActive ? '渲染过程演示中...' : '点击此处开始渲染过程演示' }}
          </div>
          <div class="demo-progress" :style="{ width: demoProgress + '%' }"></div>
        </div>
      </section>

      <section class="rendering-steps">
        <h2>浏览器渲染流程</h2>
        <div class="timeline">
          <div
            v-for="(step, index) in renderingSteps"
            :key="step.id"
            class="timeline-item"
            :class="{ active: activeStep >= index }"
            @mouseenter="setActiveStep(index)"
            @mouseleave="resetActiveStep"
          >
            <div class="timeline-marker">{{ index + 1 }}</div>
            <div class="timeline-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-details" v-if="step.details">
                <ul>
                  <li v-for="detail in step.details" :key="detail">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="key-concepts">
        <h2>关键概念</h2>
        <div class="concept-cards">
          <div
            v-for="concept in keyConcepts"
            :key="concept.id"
            class="concept-card"
            :class="{ expanded: expandedConcept === concept.id }"
            @click="toggleConcept(concept.id)"
          >
            <div class="concept-header">
              <h3>{{ concept.title }}</h3>
              <span class="expand-icon">{{ expandedConcept === concept.id ? '−' : '+' }}</span>
            </div>
            <div class="concept-body">
              <p>{{ concept.description }}</p>
              <div class="concept-details" v-if="concept.details">
                <ul>
                  <li v-for="detail in concept.details" :key="detail">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="performance-tips">
        <h2>优化渲染性能的建议</h2>
        <div class="tips-grid">
          <div class="tip-card" v-for="tip in performanceTips" :key="tip.id">
            <div class="tip-icon">{{ tip.icon }}</div>
            <h3>{{ tip.title }}</h3>
            <p>{{ tip.description }}</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <p>深入理解浏览器渲染机制有助于开发高性能的Web应用</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const isDemoActive = ref(false)
const demoProgress = ref(0)
const activeStep = ref(-1)
const expandedConcept = ref('')

let demoInterval: number | null = null

// 渲染步骤数据
const renderingSteps = ref([
  {
    id: 'parsing',
    title: 'HTML解析与DOM构建',
    description: '浏览器解析HTML文档，构建DOM（文档对象模型）树',
    details: [
      '将HTML标签转换为DOM节点',
      '处理脚本和样式表',
      '构建完整的DOM树结构'
    ]
  },
  {
    id: 'cssom',
    title: 'CSS解析与CSSOM构建',
    description: '解析CSS样式规则，构建CSSOM（CSS对象模型）树',
    details: [
      '解析外部、内部和内联样式',
      '计算样式优先级和继承',
      '构建完整的CSSOM树'
    ]
  },
  {
    id: 'render-tree',
    title: '渲染树构建',
    description: '结合DOM和CSSOM，构建渲染树（Render Tree）',
    details: [
      '排除不可见元素（如display:none）',
      '匹配DOM节点与CSS规则',
      '构建包含所有可见元素的渲染树'
    ]
  },
  {
    id: 'layout',
    title: '布局（重排）',
    description: '计算渲染树中每个节点的几何位置和大小',
    details: [
      '计算元素在视口中的精确位置',
      '确定元素的大小和间距',
      '处理浮动和定位'
    ]
  },
  {
    id: 'painting',
    title: '绘制',
    description: '将渲染树的每个节点转换为屏幕上的实际像素',
    details: [
      '填充颜色、绘制边框',
      '处理文本和图像',
      '应用阴影和其他视觉效果'
    ]
  },
  {
    id: 'compositing',
    title: '合成',
    description: '将各层绘制结果合成为最终页面显示',
    details: [
      '处理图层和透明度',
      '应用变换和动画',
      '最终输出到屏幕'
    ]
  }
])

// 关键概念数据
const keyConcepts = ref([
  {
    id: 'dom',
    title: 'DOM（文档对象模型）',
    description: 'HTML文档的对象表示，提供与文档交互的编程接口',
    details: [
      '以树形结构组织HTML元素',
      '提供JavaScript操作HTML的能力',
      'DOM操作可能触发重排和重绘'
    ]
  },
  {
    id: 'cssom',
    title: 'CSSOM（CSS对象模型）',
    description: 'CSS样式表的对象表示，包含所有样式规则及其层级关系',
    details: [
      '从CSS规则构建的树状结构',
      '影响元素最终样式的计算',
      'CSS选择器复杂度影响CSSOM构建性能'
    ]
  },
  {
    id: 'render-tree',
    title: '渲染树',
    description: 'DOM和CSSOM的结合，包含所有可见元素及其样式信息',
    details: [
      '只包含需要渲染的元素',
      '每个节点包含完整的样式信息',
      '是布局和绘制的基础'
    ]
  },
  {
    id: 'reflow',
    title: '重排（回流）',
    description: '当元素的几何属性发生变化时，浏览器重新计算元素位置和大小',
    details: [
      '触发条件：改变窗口大小、修改元素尺寸/位置等',
      '性能开销较大，应尽量避免',
      '一次重排通常导致后续重绘'
    ]
  },
  {
    id: 'repaint',
    title: '重绘',
    description: '当元素外观改变但不影响布局时，浏览器重新绘制元素',
    details: [
      '触发条件：改变颜色、背景、边框等',
      '性能开销比重排小',
      '避免频繁重绘以提升性能'
    ]
  }
])

// 性能优化建议
const performanceTips = ref([
  {
    id: 'css',
    title: '优化CSS',
    description: '使用简单的选择器，避免深层嵌套，将动画属性置于独立图层',
    icon: '🎨'
  },
  {
    id: 'javascript',
    title: '优化JavaScript',
    description: '避免强制同步布局，使用requestAnimationFrame，批量DOM操作',
    icon: '⚡'
  },
  {
    id: 'layout',
    title: '减少重排',
    description: '避免频繁读取布局属性，使用transform和opacity实现动画',
    icon: '📐'
  },
  {
    id: 'resources',
    title: '资源优化',
    description: '压缩图片，使用CSS雪碧图，延迟加载非关键资源',
    icon: '📦'
  }
])

// 方法
const startDemo = () => {
  if (isDemoActive.value) return

  isDemoActive.value = true
  demoProgress.value = 0

  demoInterval = window.setInterval(() => {
    demoProgress.value += 1
    if (demoProgress.value >= 100) {
      if (demoInterval) clearInterval(demoInterval)
      setTimeout(() => {
        isDemoActive.value = false
        demoProgress.value = 0
      }, 2000)
    }
  }, 50)
}

const setActiveStep = (index: number) => {
  activeStep.value = index
}

const resetActiveStep = () => {
  activeStep.value = -1
}

const toggleConcept = (conceptId: string) => {
  expandedConcept.value = expandedConcept.value === conceptId ? '' : conceptId
}

// 生命周期
onMounted(() => {
  // 可以添加初始化逻辑
})

onUnmounted(() => {
  if (demoInterval) {
    clearInterval(demoInterval)
  }
})
</script>

<style lang="less" scoped>
.browser-rendering {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f8f9fa;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eaeaea;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 700;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #7f8c8d;
    font-weight: 300;
  }
}

.content {
  margin-bottom: 3rem;
}

section {
  margin-bottom: 4rem;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.5rem;
  }
}

.intro-section {
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  .interactive-demo {
    position: relative;
    height: 60px;
    background: #ecf0f1;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #bdc3c7;

    &:hover {
      border-color: #3498db;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }

    .demo-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      z-index: 2;
      transition: all 0.3s ease;

      &.active {
        color: white;
      }
    }

    .demo-progress {
      height: 100%;
      background: linear-gradient(90deg, #3498db, #2ecc71);
      transition: width 0.05s linear;
    }
  }
}

.timeline {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 30px;
    width: 2px;
    background: #3498db;
    z-index: 1;
  }
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 8px;
  padding: 1rem;

  &:hover {
    background: #f8f9fa;
  }

  &.active {
    background: #e8f4fc;

    .timeline-marker {
      background: #3498db;
      color: white;
      transform: scale(1.1);
    }
  }

  .timeline-marker {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: white;
    border: 2px solid #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    z-index: 2;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .timeline-content {
    margin-left: 1.5rem;
    flex: 1;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }

    p {
      margin-bottom: 0.5rem;
    }

    .step-details {
      margin-top: 0.5rem;

      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.3rem;
          position: relative;

          &::before {
            content: '•';
            color: #3498db;
            font-weight: bold;
            position: absolute;
            left: -1rem;
          }
        }
      }
    }
  }
}

.concept-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.concept-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &.expanded {
    .concept-body {
      max-height: 500px;
      opacity: 1;
    }

    .expand-icon {
      transform: rotate(0deg);
    }
  }

  .concept-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    background: #f8f9fa;
    border-bottom: 1px solid #eaeaea;

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #2c3e50;
    }

    .expand-icon {
      font-size: 1.5rem;
      font-weight: bold;
      color: #3498db;
      transition: transform 0.3s ease;
      transform: rotate(90deg);
    }
  }

  .concept-body {
    padding: 0 1.2rem;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s ease;

    p {
      margin: 1rem 0;
    }

    .concept-details {
      margin-bottom: 1rem;

      ul {
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.5rem;
          position: relative;

          &::before {
            content: '→';
            color: #3498db;
            font-weight: bold;
            position: absolute;
            left: -1rem;
          }
        }
      }
    }
  }
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.tip-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f9fa;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background: white;
  }

  .tip-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    color: #2c3e50;
  }

  p {
    font-size: 0.95rem;
    color: #555;
  }
}

.page-footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid #eaeaea;
  color: #7f8c8d;
  font-style: italic;
}

// 响应式设计
@media (max-width: 768px) {
  .browser-rendering {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .concept-cards,
  .tips-grid {
    grid-template-columns: 1fr;
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-marker {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
