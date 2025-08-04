<template>
  <div class="scroll-snap-guide">
    <h1>CSS滚动捕捉（吸附）基础介绍</h1>

    <section class="intro-section">
      <p>滚动捕捉（Scroll Snap）是CSS3提供的布局模块，用于创建精准的滚动定位体验。当用户滚动容器时，内容会自动吸附到指定位置，常见于轮播图、全屏滚动等场景。</p>
    </section>

    <!-- 核心属性列表 -->
    <SectionTitle title="核心属性" />
    <div class="attribute-grid">
      <AttributeCard v-for="(attr, index) in attributes" :key="index" v-bind="attr" />
    </div>

    <!-- 实时示例 -->
    <SectionTitle title="实时演示" />
    <div class="demo-container">
      <div class="scroll-snap-demo"
        :style="{ scrollSnapType: `${scrollContainerStyle.scrollSnapTypeAxis} ${scrollContainerStyle.scrollSnapTypeAttachment}`, scrollBehavior: (scrollContainerStyle.scrollBehavior as any), scrollPadding: (scrollContainerStyle.scrollPadding as any) }">
        <div v-for="n in 6" :key="n" class="demo-item"
          :style="{ backgroundColor: colors[(n - 1) % 6], scrollSnapAlign: scrollItemStyle.scrollSnapAlign, scrollMargin: scrollItemStyle.scrollMargin, scrollSnapStop: (scrollItemStyle.scrollSnapStop as any) }">
          Slide {{ n }}
        </div>
      </div>
      <div class="code-container">
        <pre><code>.father{
{{ scrollContainerStyleString }}
.son{
{{ scrollItemStyleString }}
}</code></pre>
      </div>
      <div class="controller">
        <div class="controller-item">
          <div class="controller-item-name">scroll-snap-type</div>
          <div class="controller-item-content">
            scrollSnapTypeAxis(定义滚动轴)，scrollSnapTypeAttachment(定义吸附方式)
          </div>
        </div>
        <div v-for="attr in attributes.filter(attr => !attr.hiddenInList)" :key="attr.name" class="controller-item">
          <div class="controller-item-name">{{ attr.name }}</div>
          <div class="controller-item-content" v-if="scrollContainerStyleList.includes(attr.index)">
            <a-select v-if="attr.type === 'select'" style="width: 100%"
              v-model:value="(scrollContainerStyle as any)[attr.index]" :options="attr.values" />
            <a-input v-if="attr.type === 'input'" v-model:value="(scrollContainerStyle as any)[attr.index]" />
          </div>
          <div class="controller-item-content" v-if="scrollItemStyleList.includes(attr.index)">
            <a-select v-if="attr.type === 'select'" v-model:value="(scrollItemStyle as any)[attr.index]"
              :options="attr.values" />
            <a-input v-if="attr.type === 'input'" v-model:value="(scrollItemStyle as any)[attr.index]" />
          </div>
        </div>


      </div>
    </div>

    <!-- 使用场景 -->
    <SectionTitle title="使用场景" />
    <div class="scenario-grid">
      <ScenarioBox v-for="(scene, index) in scenarios" :key="index" :title="scene.title" :desc="scene.desc"
        :example="scene.example" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, reactive, computed, watch } from 'vue'
import AttributeCard from '../Components/AttributeCard.vue'
import ScenarioBox from '../Components/ScenarioBox.vue'
import SectionTitle from '../Components/SectionTitle.vue'

const colors = ref(['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead', '#ff9999'])

const list = ref<{ value: number; label: string }[]>(Array.from({ length: 6 }, (_, i) => ({ value: i + 1, label: `第${i + 1}个Slide` })))

const currentSlide = ref(1)

const changeCurrentSlide = (value: number) => {
  currentSlide.value = value
}

interface Attribute {
  name: string
  index: string
  desc: string
  content: string
  hiddenInList: boolean
  type: 'select' | 'input'
  values: { value: string; label: string }[]
  example: string
  tip: string
}

const attributes = ref<Attribute[]>([])

onBeforeMount(async () => {
  const { default: data } = await import('../JSON/ScrollSnap.json')
  attributes.value = data as Attribute[]
})

const scrollContainerStyle = reactive<{
  scrollSnapTypeAxis: string
  scrollSnapTypeAttachment: string
  scrollBehavior: string
  scrollPadding: string
}>({
  scrollSnapTypeAxis: 'x',
  scrollSnapTypeAttachment: 'mandatory',
  scrollBehavior: 'smooth',
  scrollPadding: '20px',
})


const scrollItemStyle = reactive({
  scrollSnapAlign: 'start',
  scrollSnapStop: 'normal',
  scrollMargin: '20px',
})

const scrollContainerStyleList = computed(() => Object.keys(scrollContainerStyle))

const scrollItemStyleList = computed(() => Object.keys(scrollItemStyle))

const scrollContainerStyleString = computed(() => {
  return `scroll-snap-type: ${scrollContainerStyle.scrollSnapTypeAxis} ${scrollContainerStyle.scrollSnapTypeAttachment};
scroll-behavior: ${scrollContainerStyle.scrollBehavior};
scroll-padding: ${scrollContainerStyle.scrollPadding};`
})

const scrollItemStyleString = computed(() => {
  return `scroll-snap-align: ${scrollItemStyle.scrollSnapAlign};
scroll-snap-stop: ${scrollItemStyle.scrollSnapStop};
scroll-margin: ${scrollItemStyle.scrollMargin};`
})


const scenarios = ref([
  {
    title: '全屏滚动',
    desc: '实现页面分屏滚动效果',
    example: '单页应用的章节切换'
  },
  {
    title: '轮播图',
    desc: '精准定位图片位置',
    example: '电商产品图片轮播'
  },
  {
    title: '表单步骤',
    desc: '分步骤表单滚动定位',
    example: '多步骤注册流程'
  }
])
</script>

<style lang="less" scoped>
.scroll-snap-guide {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    color: #2c3e50;
    border-bottom: 3px solid #45b7d1;
    padding-bottom: 1rem;
  }

  .intro-section {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 2rem 0;
    line-height: 1.6;
  }

  .attribute-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .demo-container {
    border: 2px solid #eee;
    border-radius: 12px;
    padding: 1rem;
    margin: 2rem 0;

    .scroll-snap-demo {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      height: 300px;
      border-radius: 8px;

      .demo-item {
        flex: 0 0 100%;
        scroll-snap-align: start;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
        font-weight: bold;
        transition: transform 0.3s;

        &:hover {
          transform: scale(0.98);
        }
      }
    }
  }

  .scenario-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }
}

// AttributeCard组件样式
.attribute-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #45b7d1;

  .attribute-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #2c3e50;
      background: linear-gradient(90deg, #45b7d1, #96ceb4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .values-list {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
    font-family: 'Fira Code', monospace;
  }

  .example-code {
    background: #2c3e50;
    color: white;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;

    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.85em;
      white-space: pre;
    }
  }

  .tip {
    color: #7f8c8d;
    font-size: 0.9em;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px dashed #eee;
  }
}

// ScenarioBox组件样式
.scenario-box {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  h4 {
    color: #45b7d1;
    margin: 0 0 1rem 0;
  }

  .desc {
    color: #7f8c8d;
    line-height: 1.6;
    min-height: 60px;
  }

  .example {
    background: #f8f9fa;
    padding: 0.5rem;
    border-radius: 4px;
    margin-top: 1rem;
    font-size: 0.9em;
  }
}

.code-container {
  background: rgba(0, 0, 0, 1);
  padding: 1rem;
  border-radius: 6px;

  code {
    color: white;
  }
}

.controller {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
