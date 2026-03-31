<template>
  <div class="flexbox-container">
    <h1 class="main-title">CSS弹性盒交互指南</h1>

    <h2>Flexbox布局是一种强大的CSS布局系统，允许开发者创建复杂的网页布局。通过定义主轴和交叉轴，开发者可以精确控制元素的排列和对齐，使得网页设计更加灵活和响应式。</h2>

    <section class="concept-section">
      <div class="concept-card">
        <div class="axis-container">
          <div class="main-axis"></div>
          <div class="cross-axis"></div>
          <div class="axis-label main-axis-label">主轴</div>
          <div class="axis-label cross-axis-label">交叉轴</div>
        </div>
        <div class="concept-text">
          <h2>📌 核心概念</h2>
          <p>
            弹性布局由<strong>弹性容器</strong>和<strong>弹性项目</strong>组成，通过主轴和交叉轴进行布局控制。
          </p>
          <p>
            弹性容器使用 <code>display: flex;</code> 或 <code>display: inline-flex;</code> 声明。
          </p>
          <p>主轴（Main Axis）是弹性项目的排列方向，交叉轴（Cross Axis）是与主轴垂直的方向。</p>
        </div>
      </div>
    </section>
    <!-- 演示区域 -->
    <div class="demo-container" :style="{
      flexDirection: container.flexDirection,
      flexWrap: container.flexWrap,
      justifyContent: container.justifyContent,
      alignItems: container.alignItems,
      alignContent: container.alignContent,
      gap: container.gap + 'px',
      position: 'sticky',
      top: '0',
      zIndex: '10',
    }">
      <div v-for="(item, index) in items" :key="index" class="demo-item" :style="{
        order: item.order,
        flexGrow: item.flexGrow,
        flexShrink: item.flexShrink,
        flexBasis: item.flexBasis,
        alignSelf: item.alignSelf,
        backgroundColor: itemColors[index],
      }">
        <div class="item-info">
          <span>项目 {{ index + 1 }}</span>
          <div v-if="item.order !== 0">order: {{ item.order }}</div>
          <div v-if="item.flexGrow !== 0">grow: {{ item.flexGrow }}</div>
          <div v-if="item.flexShrink !== 1">shrink: {{ item.flexShrink }}</div>
          <div v-if="item.flexBasis !== 'auto'">basis: {{ item.flexBasis }}</div>
          <div v-if="item.alignSelf !== 'auto'">align: {{ item.alignSelf }}</div>
        </div>
      </div>
    </div>

    <div class="code-area">
      <CodeBlock language="css" :code="code" hidden-toolbar />
      <CodeBlock language="css" :code="code2" hidden-toolbar />
    </div>

    <div class="controls-container">
      <!-- 容器属性控制 -->
      <div class="control-group">
        <h2 class="control-title">容器属性</h2>
        <div class="button-group">
          <div v-for="prop in containerProps" :key="prop.name">
            <h3>{{ prop.label }}</h3>
            <h4>{{ prop.description }}</h4>
            <button v-for="value in prop.values" :key="value" @click="
              updateContainerProp(
                prop.name as keyof ContainerProps,
                value as ContainerProps[keyof ContainerProps],
              )
              " :class="{ active: container[prop.name as keyof ContainerProps] === value }">
              {{ value }}
            </button>
          </div>
        </div>
      </div>

      <!-- 子项属性控制 -->
      <div class="control-group">
        <h2 class="control-title">子项属性</h2>
        <div class="button-group">
          <div class="item-selector">
            <button v-for="(item, index) in items" :key="index" @click="selectedItem = index"
              :class="{ active: selectedItem === index }">
              项目 {{ index + 1 }}
            </button>
          </div>
          <div v-for="prop in itemProps" :key="prop.name">
            <h3>{{ prop.label }}</h3>
            <h4>{{ prop.description }}</h4>
            <button v-for="value in prop.values" :key="value"
              @click="updateItemProp(prop.name as keyof ItemProps, value)"
              :class="{ active: items[selectedItem][prop.name as keyof ItemProps] === value }">
              {{ value }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from 'components/Code/index.vue'
import { ref, reactive, computed } from 'vue'

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'
type flexFlow =
  | 'row nowrap'
  | 'row wrap'
  | 'row wrap-reverse'
  | 'column nowrap'
  | 'column wrap'
  | 'column wrap-reverse'
  | ''
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
type AlignItems = 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
type AlignContent =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
type AlignSelf = 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'

interface ContainerProps {
  flexDirection: FlexDirection
  flexWrap: FlexWrap
  flexFlow: flexFlow
  justifyContent: JustifyContent
  alignItems: AlignItems
  alignContent: AlignContent
  gap: number
}

interface ItemProps {
  order: number
  flexGrow: number
  flexShrink: number
  flexBasis: string
  alignSelf: AlignSelf
}

const container = reactive<ContainerProps>({
  flexDirection: 'row',
  flexWrap: 'nowrap',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  gap: 10,
})


const code = computed(() => `.demo-container{
  display: flex;
  flex-direction: ${container.flexDirection};
  flex-wrap: ${container.flexWrap};
  justify-content: ${container.justifyContent};
  align-items: ${container.alignItems};
  align-content: ${container.alignContent};
  gap: ${container.gap} px;
}`)

const selectedItem = ref(0)

const code2 = computed(() => `.demo-item:nth-child(${selectedItem.value + 1}){
  order: ${items[selectedItem.value].order};
  flex-grow: ${items[selectedItem.value].flexGrow};
  flex-shrink: ${items[selectedItem.value].flexShrink};
  flex-basis: ${(typeof items[selectedItem.value].flexBasis === 'number') ? (items[selectedItem.value].flexBasis + 'px') : items[selectedItem.value].flexBasis};
  align-self: ${items[selectedItem.value].alignSelf}
}`)

const items = reactive<ItemProps[]>([
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
  { order: 0, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
])


const itemColors = [
  '#3498db',
  '#2ecc71',
  '#9b59b6',
  '#e74c3c',
  '#f39c12',
  '#1abc9c',
  '#34495e',
  '#7f8c8d',
  '#c0392b',
  '#d35400',
]

const containerProps = [
  {
    name: 'flexDirection',
    label: 'flex-direction (主轴方向)',
    values: ['row', 'row-reverse', 'column', 'column-reverse'],
    description:
      '定义弹性容器内项目的排列方向。可以是水平（row）、反向水平（row-reverse）、垂直（column）或反向垂直（column-reverse）。',
  },
  {
    name: 'flexWrap',
    label: 'flex-wrap (换行方式)',
    values: ['nowrap', 'wrap', 'wrap-reverse'],
    description: '定义如果一条轴线排不下，如何换行。',
  },
  {
    name: 'flexFlow',
    label: 'flex-flow (主轴方向 + 换行方式)',

    description: 'flex-direction 和 flex-wrap 的简写形式，定义主轴的方向和换行方式。',
  },
  {
    name: 'justifyContent',
    label: 'justify-content (主轴对齐)',
    values: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    description: '定义项目在主轴上的对齐方式。',
  },
  {
    name: 'alignItems',
    label: 'align-items (交叉轴对齐)',
    values: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    description: '定义项目在交叉轴上的对齐方式。',
  },
  {
    name: 'alignContent',
    label: 'align-content (多轴线对齐)',
    values: ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
    description:
      '定义多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。可以是起始对齐（flex-start）、结束对齐（flex-end）、居中对齐（center）、两端对齐（space-between）、均匀分布（space-around）或拉伸对齐（stretch）',
  },
]

const itemProps = [
  {
    name: 'order',
    label: 'order (排列顺序)',
    values: [-1, 0, 1, 2],
    description: '定义项目的排列顺序。数值越小，排列越靠前。',
  },
  {
    name: 'flex',
    label: 'flex (flex-grow, flex-shrink 和 flex-basis的简写)',
    description: 'flex-grow, flex-shrink 和 flex-basis 的简写形式。',
  },
  {
    name: 'flexGrow',
    label: 'flex-grow (放大比例)',
    values: [0, 1, 2],
    description: '定义项目的放大比例。数值越大，项目占据的空间越大。',
  },
  {
    name: 'flexShrink',
    label: 'flex-shrink (缩小比例)',
    values: [0, 1, 2],
    description: '定义项目的缩小比例。数值越大，项目缩小的比例越大。',
  },
  {
    name: 'flexBasis',
    label: 'flex-basis (初始大小)',
    values: ['auto', '100px', '200px', '30%'],
    description: '定义项目的初始大小，可以是具体的像素值或百分比。',
  },
  {
    name: 'alignSelf',
    label: 'align-self (自身对齐)',
    values: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
    description: '定义项目在交叉轴上的对齐方式，覆盖 align-items 属性。',
  },
]

const updateContainerProp = (
  prop: keyof ContainerProps,
  value: ContainerProps[keyof ContainerProps],
) => {
  ; (container as any)[prop] = value as ContainerProps[keyof ContainerProps]
}

const updateItemProp = <K extends keyof ItemProps>(prop: K, value: ItemProps[K]) => {
  items[selectedItem.value][prop] = value
}
</script>

<style scoped>
h2,
h3,
li,
p,
div,
button {
  color: #000;
}

.concept-section {
  margin: 3rem 0;
}

.concept-card {
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.axis-container {
  width: 300px;
  height: 200px;
  border: 2px dashed #4a90e2;
  position: relative;
  border-radius: 8px;
}

.main-axis,
.cross-axis {
  position: absolute;
  background: rgba(74, 144, 226, 0.2);
}

.main-axis {
  width: 100%;
  height: 2px;
  top: 50%;
  left: 0;
}

.cross-axis {
  width: 2px;
  height: 100%;
  left: 50%;
  top: 0;
}

.axis-label {
  position: absolute;
  color: #4a90e2;
  font-weight: bold;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
}

.main-axis-label {
  bottom: 10px;
  right: 10px;
}

.cross-axis-label {
  top: 10px;
  left: 10px;
}

.flexbox-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  font-family: 'Segoe UI', system-ui;
}

.main-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  position: relative;
}

.main-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3498db, #2ecc71, #9b59b6);
  margin: 1rem auto;
}

.controls-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.control-group {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.control-title {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2em;
}

.button-group {
  display: grid;
  gap: 1rem;
}

.button-group>div {
  margin-bottom: 1rem;
}

button {
  padding: 0.6rem 1rem;
  margin: 0.3rem;
  border: 2px solid #3498db;
  border-radius: 6px;
  background: white;
  color: #3498db;
  cursor: pointer;
  transition: all 0.2s ease;
}

button.active {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(52, 152, 219, 0.3);
}

.item-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.demo-container {
  min-height: 400px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  border: 2px dashed #bdc3c7;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.demo-item {
  padding: 1.5rem;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 100px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.item-info {
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  border-radius: 4px;
  color: #2c3e50;
  font-size: 0.9em;
}

.code-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  justify-content: space-between;
}
</style>
